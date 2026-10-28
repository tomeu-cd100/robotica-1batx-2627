/*
  Solucionari Repte SA6-A · Pinca automatica amb LED d'estat (MINIM)
  Histeresi: la pinca es tanca a menys de TANCA_CM i nomes s'obre a mes
  d'OBRE_CM. Un LED indica quan la pinca te una peca agafada.
  Circuit: servo pinca=11 (piles + GND comu); ultrasons TRIG=7, ECHO=8;
           LED (220 ohm) al D5.
*/

#include <Servo.h>

const int TRIG = 7, ECHO = 8;
const int LED_ESTAT = 5;
const int TANCA_CM = 6, OBRE_CM = 10;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

Servo pinca;
bool pincaTancada = false;

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);
  if (temps == 0) return 400;
  return temps * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED_ESTAT, OUTPUT);
  pinca.write(PINCA_OBERTA);
  pinca.attach(11);
}

void loop() {
  float d = mesuraDistancia();
  if (!pincaTancada && d < TANCA_CM) {
    pincaTancada = true;
    pinca.write(PINCA_TANCADA);
  } else if (pincaTancada && d > OBRE_CM) {
    pincaTancada = false;
    pinca.write(PINCA_OBERTA);
  }
  digitalWrite(LED_ESTAT, pincaTancada);   // el LED surt de l'estat
  delay(60);
}
