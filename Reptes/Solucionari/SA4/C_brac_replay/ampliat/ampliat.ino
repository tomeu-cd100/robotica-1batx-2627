/*
  Solucionari Repte SA4-C · Brac que apren: registre i replay (AMPLIAT)
  AMPLIACIO 1: el replay va SUAU d'un punt al seguent (interpolacio).
  AMPLIACIO 2: el replay es fa amb millis(): el polsador A l'AVORTA a mig
               cami (el brac no es queda "sord" mentre reprodueix).
  AMPLIACIO 3: la sequencia es GUARDA a l'EEPROM i es recupera en engegar:
               el brac recorda la tasca encara que el desendollis.
               (Mantenir A i B alhora 1 s esborra la memoria.)
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3;
           polsador A entre D3 i GND, polsador B entre D4 i GND.
*/

#include <Servo.h>
#include <EEPROM.h>

Servo base, esquerre, dret, pinca;

const int BOTO_A = 3;     // grava / avorta
const int BOTO_B = 4;     // reprodueix
const int MAX_PUNTS = 10;
const int TRAMS = 40;                    // AMPLIACIO 1: trams entre punts
const unsigned long PAUSA_TRAM = 15;     // ms per tram

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

struct Punt { byte b, e, d, p; };        // un angle cap en un byte (0-255)
Punt seq[MAX_PUNTS];
int numPunts = 0;
const int ADR_NUM = 0;                   // AMPLIACIO 3: on es guarda numPunts
const int ADR_SEQ = 1;                   // i on comencen els punts

Punt ara;                                // posicio actual del brac
bool reproduint = false;
int puntDesti = 0, tram = 0;
Punt origen;
unsigned long tTram = 0;

int lectA = HIGH, lectB = HIGH;
unsigned long tAB = 0;

Punt llegeixPots() {
  Punt q;
  q.b = map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX);
  q.d = map(analogRead(A1), 0, 1023, DRET_MIN, DRET_MAX);
  q.p = map(analogRead(A2), 0, 1023, PINCA_MIN, PINCA_MAX);
  q.e = map(analogRead(A3), 0, 1023, ESQUERRE_MIN, ESQUERRE_MAX);
  return q;
}

void escriu(Punt q) {
  base.write(q.b);
  esquerre.write(q.e);
  dret.write(q.d);
  pinca.write(q.p);
}

void desaMemoria() {                     // AMPLIACIO 3
  EEPROM.update(ADR_NUM, numPunts);
  for (int i = 0; i < numPunts; i++) EEPROM.put(ADR_SEQ + i * sizeof(Punt), seq[i]);
}

void carregaMemoria() {                  // AMPLIACIO 3
  int n = EEPROM.read(ADR_NUM);
  numPunts = (n <= MAX_PUNTS) ? n : 0;   // EEPROM verge = 255: la ignorem
  for (int i = 0; i < numPunts; i++) EEPROM.get(ADR_SEQ + i * sizeof(Punt), seq[i]);
}

void comencaReplay() {
  reproduint = true;
  puntDesti = 0;
  tram = 0;
  origen = ara;
  Serial.println("Replay");
}

// AMPLIACIO 1 + 2: un tram de moviment cada PAUSA_TRAM, sense bloquejar
void passaReplay() {
  if (millis() - tTram < PAUSA_TRAM) return;
  tTram = millis();
  tram++;
  Punt q;
  q.b = map(tram, 0, TRAMS, origen.b, seq[puntDesti].b);
  q.e = map(tram, 0, TRAMS, origen.e, seq[puntDesti].e);
  q.d = map(tram, 0, TRAMS, origen.d, seq[puntDesti].d);
  q.p = map(tram, 0, TRAMS, origen.p, seq[puntDesti].p);
  ara = q;
  escriu(ara);
  if (tram >= TRAMS) {                   // arribat a aquest punt
    puntDesti++;
    tram = 0;
    origen = ara;
    if (puntDesti >= numPunts) {
      reproduint = false;
      Serial.println("Replay acabat");
    }
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(BOTO_A, INPUT_PULLUP);
  pinMode(BOTO_B, INPUT_PULLUP);
  carregaMemoria();
  Serial.print("Punts recuperats: ");
  Serial.println(numPunts);
  ara = llegeixPots();
  escriu(ara);
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
}

void loop() {
  int a = digitalRead(BOTO_A);
  int b = digitalRead(BOTO_B);
  bool premA = (a == LOW && lectA == HIGH);
  bool premB = (b == LOW && lectB == HIGH);
  lectA = a;
  lectB = b;

  // AMPLIACIO 3: A i B alhora durant 1 s esborren la memoria
  if (a == LOW && b == LOW) {
    if (tAB == 0) tAB = millis();
    if (millis() - tAB > 1000 && numPunts > 0) {
      numPunts = 0;
      desaMemoria();
      Serial.println("Memoria esborrada");
    }
    return;
  }
  tAB = 0;

  if (reproduint) {
    if (premA) {                         // AMPLIACIO 2: avorta
      reproduint = false;
      Serial.println("Replay avortat");
    } else {
      passaReplay();
    }
    return;
  }

  ara = llegeixPots();
  escriu(ara);

  if (premA && numPunts < MAX_PUNTS) {
    seq[numPunts] = ara;
    numPunts++;
    desaMemoria();
    Serial.print("Punt gravat: ");
    Serial.println(numPunts);
  }
  if (premB && numPunts > 0) {
    comencaReplay();
  }
  delay(20);
}
