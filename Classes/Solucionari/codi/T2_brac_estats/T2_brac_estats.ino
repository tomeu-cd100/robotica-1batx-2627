// Codi de referencia del Projecte T2 - El brac robotic (NOMES DOCENT)
// Fase SA5-SA6: el brac CONTINUA amb l'Arduino UNO. El comandament per radio
// (2a micro:bit, a la ma) parla amb una micro:bit PONT que hi ha al costat del
// brac i que passa les ordres a l'UNO per un cable serie.
// Fitxers germans: T2_brac_microbit_comandament.py i T2_brac_microbit_pont.py.
// Cablatge: el del dossier 00_Projecte_T2_Brac.md (fase Arduino) + el pont:
//   P1 de la micro:bit pont -> D0 (RX) de l'UNO, i GND comu.
// ATENCIO: per PUJAR el programa, desconnecteu el cable del D0 (l'USB fa
// servir el mateix pin). Torneu-lo a connectar despres.
// ATENCIO: el cable va NOMES de la micro:bit cap a l'UNO. Mai connecteu un pin
// de l'UNO (5 V) a la micro:bit (3,3 V): la cremaria.
// ATENCIO: els 3 servos amb ALIMENTACIO EXTERNA (piles AA) i GND comu.
//
// Per que D0 i no SoftwareSerial: SoftwareSerial atura les interrupcions
// mentre rep cada lletra i la llibreria Servo les necessita per fer els polsos;
// el resultat son servos que peguen sotragades cada cop que arriba una ordre.
//
// MAQUINA D'ESTATS (l'aportacio de la SA6), el mateix patro enum + switch
// de 03_maquina_estats.ino:
//   REPOS      - quiet; ordre "A" -> MANUAL, ordre "R" -> REPLAY
//   MANUAL     - obeeix el comandament; "G" grava el punt actual
//   REPLAY     - reprodueix sol la seguencia gravada (amb millis, com a SA4)
//   EMERGENCIA - xoc al sensor de col.lisio: no mou res; rearmament manual
// Ordres que arriben pel cable: "B+" "B-" "C+" "C-" "P" "G" (del comandament)
// i "A" "R" (botons A i B de la micro:bit pont).
// Truc per provar-ho SENSE micro:bit: desconnecteu el pont, obriu el Monitor
// serie (9600, "Nova linia") i escriviu les ordres a ma.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_COLZE = 10;
const int PIN_SERVO_PINCA = 11;
const int PIN_COLLISIO = 2;    // LOW = xoc (modul KS0021)

// Limits d'angle REALS de cada servo: anoteu-los abans de programar res mes
const int BASE_MIN = 10,  BASE_MAX = 170;
const int COLZE_MIN = 20, COLZE_MAX = 160;
const int PINCA_TANCADA = 40, PINCA_OBERTA = 120;
const int PAS = 3;             // graus per cada ordre rebuda

const int MAX_PUNTS = 30;                  // quants punts es poden gravar
const unsigned long PAUSA_REPLAY = 400;    // ms entre punts en reproduir

Servo servoBase, servoColze, servoPinca;

enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA };
Estat estat = REPOS;

int base = 90, colze = 90, pinca = PINCA_TANCADA;

// La seguencia gravada: tres llistes, una per servo
int seqBase[MAX_PUNTS], seqColze[MAX_PUNTS], seqPinca[MAX_PUNTS];
int numPunts = 0;
int puntReplay = 0;
unsigned long tPunt = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  servoBase.attach(PIN_SERVO_BASE);
  servoColze.attach(PIN_SERVO_COLZE);
  servoPinca.attach(PIN_SERVO_PINCA);
  aplica();
  canviaEstat(REPOS);
}

void loop() {
  // --- Lectura d'entrades: UNA vegada per volta, a variables ---
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);
  String ordre = llegeixOrdre();

  // --- Transicio prioritaria: el xoc mana per damunt de tot ---
  // (la mateixa idea que la guarda de seguretat del 03_sensor_velocitat, SA4)
  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);
  }

  switch (estat) {
    case EMERGENCIA:
      // Rearmament MANUAL: sensor alliberat I boto A. Una emergencia que es
      // rearma sola no es una emergencia.
      if (!xoc && ordre == "A") {
        canviaEstat(REPOS);
      }
      break;

    case REPOS:
      if (ordre == "A") {
        canviaEstat(MANUAL);
      } else if (ordre == "R" && numPunts > 0) {
        comencaReplay();
      }
      break;

    case MANUAL:
      if (ordre == "A") {
        canviaEstat(REPOS);
      } else if (ordre == "R" && numPunts > 0) {
        comencaReplay();
      } else if (ordre == "B+") {
        base = min(base + PAS, BASE_MAX);
      } else if (ordre == "B-") {
        base = max(base - PAS, BASE_MIN);
      } else if (ordre == "C+") {
        colze = min(colze + PAS, COLZE_MAX);
      } else if (ordre == "C-") {
        colze = max(colze - PAS, COLZE_MIN);
      } else if (ordre == "P") {
        pinca = (pinca == PINCA_TANCADA) ? PINCA_OBERTA : PINCA_TANCADA;
      } else if (ordre == "G") {
        gravaPunt();
      }
      aplica();
      break;

    case REPLAY:
      // Sense delay(): cada volta es torna a mirar el sensor de dalt de tot,
      // aixi un xoc enmig de la reproduccio salta a EMERGENCIA a l'instant.
      if (ordre == "A") {
        canviaEstat(REPOS);          // el boto A avorta la reproduccio
      } else if (millis() - tPunt >= PAUSA_REPLAY) {
        if (puntReplay < numPunts) {
          base = seqBase[puntReplay];
          colze = seqColze[puntReplay];
          pinca = seqPinca[puntReplay];
          aplica();
          puntReplay++;
          tPunt = millis();
        } else {
          canviaEstat(REPOS);        // ha acabat sense incidents
        }
      }
      break;
  }
}

// Llegeix sense bloquejar: acumula lletres fins al salt de linia i retorna
// l'ordre sencera; mentre no n'hi ha cap de completa, retorna "".
String llegeixOrdre() {
  static String linia = "";
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '\n') {
      String ordre = linia;
      linia = "";
      ordre.trim();                  // treu el '\r' si n'hi ha
      return ordre;
    }
    linia += c;
  }
  return "";
}

void aplica() {
  servoBase.write(base);
  servoColze.write(colze);
  servoPinca.write(pinca);
}

void gravaPunt() {
  if (numPunts < MAX_PUNTS) {
    seqBase[numPunts] = base;
    seqColze[numPunts] = colze;
    seqPinca[numPunts] = pinca;
    numPunts++;
    Serial.print("Punt gravat: ");
    Serial.println(numPunts);
  } else {
    Serial.println("Seguencia plena: no es grava");
  }
}

void comencaReplay() {
  puntReplay = 0;
  tPunt = millis() - PAUSA_REPLAY;   // el primer punt surt de seguida
  canviaEstat(REPLAY);
}

// Un sol lloc per canviar d'estat: aixi el missatge mai no menteix
void canviaEstat(Estat nou) {
  estat = nou;
  switch (nou) {
    case REPOS:      Serial.println("Estat: REPOS");      break;
    case MANUAL:     Serial.println("Estat: MANUAL");     break;
    case REPLAY:     Serial.println("Estat: REPLAY");     break;
    case EMERGENCIA: Serial.println("Estat: EMERGENCIA"); break;
  }
}
