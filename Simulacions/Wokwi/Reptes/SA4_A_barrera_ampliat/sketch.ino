/*
  Solucionari Repte SA4-A · Barrera automatica (AMPLIAT)
  AMPLIACIO 1: moviment suau (graus de mica en mica amb un for).
  AMPLIACIO 2: obre amb ultrasons (detecta el vehicle) i tanca sol passat un temps.
  AMPLIACIO 3: LED/semafor coordinat (vermell tancada, verd oberta).
  Circuit: servo senyal=9 ; HC-SR04 TRIG=12 ECHO=11 ; LED_VERMELL=8, LED_VERD=7.
*/

#include <Servo.h>

Servo barrera;
const int TRIG = 12, ECHO = 11;
const int LED_VERMELL = 8, LED_VERD = 7;
const int ANGLE_TANCAT = 0, ANGLE_OBERT = 90;
const int DIST_DETECCIO = 15;   // cm
const int TEMPS_OBERT = 3000;   // ms

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  if (t == 0) return 400;
  return t * 0.034 / 2.0;
}

// AMPLIACIO 1: mou el servo suaument entre dos angles
void mouSuau(int desde, int fins) {
  if (desde < fins) for (int a = desde; a <= fins; a++) { barrera.write(a); delay(8); }
  else              for (int a = desde; a >= fins; a--) { barrera.write(a); delay(8); }
}

void semafor(bool oberta) {
  // AMPLIACIO 3
  digitalWrite(LED_VERD, oberta ? HIGH : LOW);
  digitalWrite(LED_VERMELL, oberta ? LOW : HIGH);
}

void setup() {
  barrera.attach(9);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED_VERMELL, OUTPUT); pinMode(LED_VERD, OUTPUT);
  barrera.write(ANGLE_TANCAT);
  semafor(false);
}

void loop() {
  float d = mesuraDistancia();
  if (d > 0 && d < DIST_DETECCIO) {   // AMPLIACIO 2: vehicle detectat
    mouSuau(ANGLE_TANCAT, ANGLE_OBERT);
    semafor(true);
    delay(TEMPS_OBERT);
    mouSuau(ANGLE_OBERT, ANGLE_TANCAT);
    semafor(false);
  }
  delay(60);
}
