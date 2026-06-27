/*
  SA4 - 01_servo_potenciometre.ino
  Controla la posicio d'un servo (pin 9) amb un potenciometre (A0).
  Llibreria estandard Servo.h.
  Circuit: servo senyal=9, V+=5V, GND=GND ; potenciometre cursor=A0.
*/

#include <Servo.h>

Servo servo;
const int POT = A0;

void setup() {
  servo.attach(9);     // el servo esta connectat al pin 9
}

void loop() {
  int valor = analogRead(POT);          // 0..1023
  int angle = map(valor, 0, 1023, 0, 180);  // 0..180 graus
  servo.write(angle);
  delay(15);           // petita pausa perque el servo arribi
}
