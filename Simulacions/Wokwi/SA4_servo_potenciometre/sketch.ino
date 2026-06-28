/*
  SA4 - Servo controlat amb potenciometre (per a Wokwi)
  La posicio del servo (pin 9) segueix el gir del potenciometre (A0).
  Llibreria estandard Servo.h (ja inclosa a Wokwi).
  A Wokwi: clica el potenciometre i gira'l per moure el servo de 0 a 180 graus.
*/

#include <Servo.h>

Servo servo;
const int POT = A0;

void setup() {
  servo.attach(9);     // el servo esta connectat al pin 9
}

void loop() {
  int valor = analogRead(POT);              // 0..1023
  int angle = map(valor, 0, 1023, 0, 180);  // 0..180 graus
  servo.write(angle);
  delay(15);           // petita pausa perque el servo arribi
}
