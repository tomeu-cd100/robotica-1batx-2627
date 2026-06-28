/*
  Solucionari Repte SA4-A · Barrera automatica (REQUISIT MINIM)
  Un servo passa de tancat (0) a obert (90) quan s'activa un polsador, i torna.
  Circuit: servo senyal=9, V+=5V, GND=GND ; polsador entre pin 2 i GND.
*/

#include <Servo.h>

Servo barrera;
const int POLSADOR = 2;
const int ANGLE_TANCAT = 0;
const int ANGLE_OBERT = 90;

void setup() {
  barrera.attach(9);
  pinMode(POLSADOR, INPUT_PULLUP);
  barrera.write(ANGLE_TANCAT);
}

void loop() {
  if (digitalRead(POLSADOR) == LOW) {   // premut
    barrera.write(ANGLE_OBERT);
    delay(2000);                        // es manté oberta 2 s
    barrera.write(ANGLE_TANCAT);
    delay(500);
  }
}
