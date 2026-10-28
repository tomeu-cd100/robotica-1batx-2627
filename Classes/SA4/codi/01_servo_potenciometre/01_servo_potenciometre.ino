/*
  SA4 - 01_servo_potenciometre.ino
  Controla la posicio del servo de la BASE del brac (pin 9) amb un
  potenciometre (A0). Llibreria estandard Servo.h.
  Circuit: servo base senyal=9 ; potenciometre cursor=A0.
           Un sol servo: pot anar al 5V de l'Arduino. Amb mes d'un, piles.
  Al taller (pas 0 del MeArm): canvia servo.write(angle) per servo.write(90)
  i connecta els 4 servos un per un per centrar-los abans de muntar.
  Quan: S1 - modelatge
*/

#include <Servo.h>

Servo servo;
const int POT = A0;

void setup() {
  servo.attach(9);     // el servo de la base esta connectat al pin 9
}

void loop() {
  int valor = analogRead(POT);          // 0..1023
  int angle = map(valor, 0, 1023, 0, 180);  // 0..180 graus
  servo.write(angle);
  delay(15);           // petita pausa perque el servo arribi
}
