/*
  Solucionari Repte SA4-C · Brac/dispensador amb servo (REQUISIT MINIM)
  Un servo executa un moviment de tasca (0 -> 120 -> 0) quan es detecta una entrada.
  Circuit: servo senyal=9 ; polsador entre pin 2 i GND.
*/

#include <Servo.h>

Servo brac;
const int POLSADOR = 2;

void setup() {
  brac.attach(9);
  pinMode(POLSADOR, INPUT_PULLUP);
  brac.write(0);
}

void loop() {
  if (digitalRead(POLSADOR) == LOW) {   // activacio
    brac.write(120);   // executa la tasca (p. ex. dispensar)
    delay(600);
    brac.write(0);     // torna a la posicio inicial
    delay(600);
  }
}
