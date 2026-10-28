/*
  Solucionari Repte SA6-B · Homing + sequencia segura (MINIM)
  En engegar, la base fa HOMING fins al final de carrera. Despres el brac
  repeteix una sequencia de gestos; si el sensor de col.lisio toca enmig
  de la sequencia, el brac s'ATURA i ho diu pel Monitor serie.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           sensor de col.lisio D2 (LOW = toca).
*/

#include <Servo.h>

const int PIN_COLLISIO = 2;
Servo base, esquerre, dret, pinca;
bool aturat = false;

bool toca() {
  return digitalRead(PIN_COLLISIO) == LOW;
}

// Mou i espera, pero vigila el sensor cada 20 ms durant l'espera
void posa(int b, int e, int d, int p) {
  base.write(b);
  esquerre.write(e);
  dret.write(d);
  pinca.write(p);
  for (int i = 0; i < 25; i++) {        // 25 x 20 ms = 500 ms
    if (toca()) {
      aturat = true;
      return;
    }
    delay(20);
  }
}

void homing() {
  int angle = 90;
  base.write(angle);
  delay(500);
  while (!toca() && angle > 0) {
    angle--;
    base.write(angle);
    delay(30);
  }
  if (!toca()) {                        // guarda: sensor no trobat
    Serial.println("No he trobat el final de carrera! Revisa el sensor.");
    aturat = true;
    return;
  }
  Serial.print("Zero de la base a ");
  Serial.println(angle);
  base.write(angle + 10);               // se separa del sensor
  delay(300);
  if (toca()) {                         // si encara toca, no es pot treballar
    Serial.println("El sensor continua premut: allunya'l de la base.");
    aturat = true;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  base.attach(9);
  esquerre.write(90);
  dret.write(90);
  pinca.write(60);
  homing();
}

void loop() {
  if (aturat) return;                   // un xoc atura el brac per sempre
  posa(60, 120, 110, 120);
  if (!aturat) posa(60, 120, 110, 60);
  if (!aturat) posa(120, 90, 90, 60);
  if (!aturat) posa(120, 90, 90, 120);
  if (aturat) Serial.println("XOC: brac aturat");
}
