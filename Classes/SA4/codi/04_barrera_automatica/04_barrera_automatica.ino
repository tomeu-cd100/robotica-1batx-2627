/*
  SA4 - 04_barrera_automatica.ino  (PRODUCTE integrador)
  Barrera amb servo que s'obre quan l'ultrasons detecta un vehicle a prop
  i es tanca passat un temps. LED indicador d'estat.
  Circuit: servo senyal=9 ; HC-SR04 TRIG=12 ECHO=11 ; LED=8.
*/

#include <Servo.h>

Servo barrera;
const int TRIG = 12, ECHO = 11, LED = 8;

const int ANGLE_TANCAT = 0;
const int ANGLE_OBERT  = 90;
const int DIST_DETECCIO = 15;   // cm
const int TEMPS_OBERT = 3000;   // ms

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH);
  return t * 0.034 / 2.0;
}

void setup() {
  barrera.attach(9);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  barrera.write(ANGLE_TANCAT);
}

void loop() {
  float d = mesuraDistancia();

  if (d > 0 && d < DIST_DETECCIO) {
    // Vehicle detectat: obre la barrera
    digitalWrite(LED, HIGH);
    barrera.write(ANGLE_OBERT);
    delay(TEMPS_OBERT);
    // Tanca
    barrera.write(ANGLE_TANCAT);
    digitalWrite(LED, LOW);
  }
  delay(60);
}
