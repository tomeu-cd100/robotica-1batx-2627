/*
  Solucionari Repte SA4-A · Brac amb boto de casa (MINIM)
  Els 4 potenciometres mouen el brac (com 04_brac_potenciometres) i, mentre
  es mante premut el polsador A, el brac va a la posicio de CASA.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3; polsador entre D3 i GND.
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

const int BOTO_CASA = 3;

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

// La posicio de casa: brac recollit, pinca tancada
const int CASA_BASE = 90, CASA_ESQUERRE = 90, CASA_DRET = 90, CASA_PINCA = PINCA_MIN;

void setup() {
  pinMode(BOTO_CASA, INPUT_PULLUP);    // premut = LOW
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
}

void loop() {
  if (digitalRead(BOTO_CASA) == LOW) {
    base.write(CASA_BASE);
    esquerre.write(CASA_ESQUERRE);
    dret.write(CASA_DRET);
    pinca.write(CASA_PINCA);
  } else {
    base.write(map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX));
    dret.write(map(analogRead(A1), 0, 1023, DRET_MIN, DRET_MAX));
    pinca.write(map(analogRead(A2), 0, 1023, PINCA_MIN, PINCA_MAX));
    esquerre.write(map(analogRead(A3), 0, 1023, ESQUERRE_MIN, ESQUERRE_MAX));
  }
  delay(20);
}
