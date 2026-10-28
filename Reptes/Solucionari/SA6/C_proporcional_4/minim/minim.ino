/*
  Solucionari Repte SA6-C · Moviment proporcional a les 4 articulacions (MINIM)
  Cada potenciometre marca la CONSIGNA de la seva articulacio, i cada servo
  s'hi acosta una fraccio K de l'error a cada volta (control P).
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3.
*/

#include <Servo.h>

const float K = 0.1;
const int PINS_SERVO[4] = {9, 6, 10, 11};      // base, esquerre, dret, pinca
const int PINS_POT[4]   = {A0, A3, A1, A2};
const int MINIM[4] = {0, 40, 40, 60};
const int MAXIM[4] = {180, 150, 150, 120};

Servo servos[4];
float angle[4] = {90, 90, 90, 90};

void setup() {
  for (int i = 0; i < 4; i++) {
    servos[i].write((int)angle[i]);
    servos[i].attach(PINS_SERVO[i]);
  }
}

void loop() {
  for (int i = 0; i < 4; i++) {
    int consigna = map(analogRead(PINS_POT[i]), 0, 1023, MINIM[i], MAXIM[i]);
    angle[i] = angle[i] + K * (consigna - angle[i]);
    servos[i].write((int)(angle[i] + 0.5));
  }
  delay(20);
}
