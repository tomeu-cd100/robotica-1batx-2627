/*
  Solucionari Repte SA6-B · Homing + sequencia segura (AMPLIAT)
  AMPLIACIO 1: la sequencia es RELATIVA al zero trobat pel homing: si el
               sensor es mou, la tasca es desplaca amb ell.
  AMPLIACIO 2: la sequencia va amb millis() (sense delay): el xoc es
               detecta a l'INSTANT, no al final de cada gest.
  AMPLIACIO 3: despres d'un xoc, el polsador A REARMA: nou homing i torna a
               comencar (nomes si el sensor ja no toca).
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           sensor de col.lisio D2 (LOW = toca); polsador A entre D3 i GND.
*/

#include <Servo.h>

const int PIN_COLLISIO = 2;
const int BOTO_A = 3;
const unsigned long PAUSA_GEST = 600;

Servo base, esquerre, dret, pinca;

// Gestos: base RELATIVA al zero (AMPLIACIO 1), la resta absoluts
const int NUM_GESTOS = 4;
const int GEST_BASE[NUM_GESTOS] = {40, 40, 100, 100};
const int GEST_ESQ[NUM_GESTOS]  = {120, 120, 90, 90};
const int GEST_DRET[NUM_GESTOS] = {110, 110, 90, 90};
const int GEST_PIN[NUM_GESTOS]  = {120, 60, 60, 120};

enum Estat { TREBALLANT, ATURAT };
Estat estat = TREBALLANT;
int zeroBase = 0;
int gest = 0;
unsigned long tGest = 0;

bool toca() {
  return digitalRead(PIN_COLLISIO) == LOW;
}

void homing() {
  int angle = 90;
  base.write(angle);
  delay(500);
  while (!toca() && angle > 0) {
    angle--;
    base.write(angle);
    delay(30);
  }
  zeroBase = angle;
  Serial.print("Zero de la base a ");
  Serial.println(zeroBase);
  base.write(zeroBase + 10);
  delay(300);
  gest = 0;
  tGest = millis();
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  pinMode(BOTO_A, INPUT_PULLUP);
  esquerre.write(90);
  dret.write(90);
  pinca.write(60);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  base.attach(9);
  homing();
}

void loop() {
  switch (estat) {
    case TREBALLANT:
      if (toca()) {                               // AMPLIACIO 2: a l'instant
        estat = ATURAT;
        Serial.println("XOC: brac aturat. Allibera el sensor i prem A");
      } else if (millis() - tGest >= PAUSA_GEST) {
        tGest = millis();
        base.write(constrain(zeroBase + GEST_BASE[gest], 0, 180));
        esquerre.write(GEST_ESQ[gest]);
        dret.write(GEST_DRET[gest]);
        pinca.write(GEST_PIN[gest]);
        gest = (gest + 1) % NUM_GESTOS;
      }
      break;

    case ATURAT:                                  // AMPLIACIO 3
      if (!toca() && digitalRead(BOTO_A) == LOW) {
        Serial.println("Rearmat: nou homing");
        while (digitalRead(BOTO_A) == LOW) { }
        homing();
        estat = TREBALLANT;
      }
      break;
  }
}
