/*
  SA6 - 03_maquina_estats.ino
  MAQUINA D'ESTATS del brac MeArm amb enum + switch i millis().
  Quatre estats:
    REPOS      - quiet. A -> MANUAL ; B -> REPLAY (si hi ha punts gravats)
    MANUAL     - els potenciometres mouen el brac. B grava el punt actual.
                 A -> REPOS
    REPLAY     - reprodueix sol els punts gravats, un cada PAUSA_PUNT ms
                 (amb millis(), sense delay()). A l'avorta. En acabar: REPOS
    EMERGENCIA - el sensor de col.lisio ha tocat: no es mou res.
                 Rearmament MANUAL: sensor alliberat I polsador A.
  L'emergencia es comprova ABANS del switch: mana per damunt de tot.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3;
           col.lisio D2 (LOW = xoc); polsador A D3, polsador B D4 (a GND).
  Quan: S3 - modelatge (i base del producte)
*/

#include <Servo.h>

const int PIN_COLLISIO = 2;
const int BOTO_A = 3;
const int BOTO_B = 4;

// BASE_MIN uns graus PER SOBRE del final de carrera (l'angle del homing de
// la S1): si la base hi pogues arribar, en manual tocaria el sensor, entraria
// en EMERGENCIA i, quieta a sobre del sensor, no se'n podria rearmar mai.
const int BASE_MIN = 15,     BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

const int MAX_PUNTS = 10;
const unsigned long PAUSA_PUNT = 700;   // ms entre punts del replay

Servo base, esquerre, dret, pinca;

enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA };
Estat estat = REPOS;

// Els punts gravats: una llista per servo
int seqBase[MAX_PUNTS], seqEsq[MAX_PUNTS], seqDret[MAX_PUNTS], seqPinca[MAX_PUNTS];
int numPunts = 0;
int puntReplay = 0;
unsigned long tPunt = 0;

int anteriorA = HIGH, anteriorB = HIGH;

// Cert NOMES en el moment de premer (flanc HIGH -> LOW)
bool premut(int pin, int &anterior) {
  int ara = digitalRead(pin);
  bool flanc = (ara == LOW && anterior == HIGH);
  anterior = ara;
  return flanc;
}

void escriu(int b, int e, int d, int p) {
  base.write(b);
  esquerre.write(e);
  dret.write(d);
  pinca.write(p);
}

void segueixPots() {
  escriu(map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX),
         map(analogRead(A3), 0, 1023, ESQUERRE_MIN, ESQUERRE_MAX),
         map(analogRead(A1), 0, 1023, DRET_MIN, DRET_MAX),
         map(analogRead(A2), 0, 1023, PINCA_MIN, PINCA_MAX));
}

void gravaPunt() {
  if (numPunts < MAX_PUNTS) {
    seqBase[numPunts] = base.read();     // read() torna l'ultim angle escrit
    seqEsq[numPunts] = esquerre.read();
    seqDret[numPunts] = dret.read();
    seqPinca[numPunts] = pinca.read();
    numPunts++;
    Serial.print("Punt gravat: ");
    Serial.println(numPunts);
  } else {
    Serial.println("Memoria plena");
  }
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

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  pinMode(BOTO_A, INPUT_PULLUP);
  pinMode(BOTO_B, INPUT_PULLUP);
  escriu(90, 90, 90, PINCA_MIN);
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  canviaEstat(REPOS);
}

void loop() {
  // --- Entrades: UNA lectura per volta, a variables ---
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);
  bool a = premut(BOTO_A, anteriorA);
  bool b = premut(BOTO_B, anteriorB);

  // --- Transicio prioritaria: el xoc mana per damunt de tot ---
  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);
  }

  switch (estat) {
    case REPOS:
      if (a) {
        canviaEstat(MANUAL);
      } else if (b && numPunts > 0) {
        puntReplay = 0;
        tPunt = millis() - PAUSA_PUNT;   // el primer punt surt de seguida
        canviaEstat(REPLAY);
      }
      break;

    case MANUAL:
      segueixPots();
      if (a) {
        canviaEstat(REPOS);
      } else if (b) {
        gravaPunt();
      }
      break;

    case REPLAY:
      if (a) {
        canviaEstat(REPOS);              // A avorta la reproduccio
      } else if (millis() - tPunt >= PAUSA_PUNT) {
        tPunt = millis();
        if (puntReplay < numPunts) {
          escriu(seqBase[puntReplay], seqEsq[puntReplay],
                 seqDret[puntReplay], seqPinca[puntReplay]);
          puntReplay++;
        } else {
          canviaEstat(REPOS);            // ha acabat sense incidents
        }
      }
      break;

    case EMERGENCIA:
      // No es mou res. Rearmament: sensor alliberat I A premut ARA.
      if (!xoc && a) {
        canviaEstat(REPOS);
      }
      break;
  }

  delay(20);
}
