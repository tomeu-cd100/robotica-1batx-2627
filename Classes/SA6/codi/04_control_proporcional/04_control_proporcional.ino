/*
  SA6 - 04_control_proporcional.ino
  Control PROPORCIONAL (P) del moviment de la base del brac.
  La base no SALTA a la consigna: a cada volta s'hi acosta una fraccio K
  de l'error (la distancia que li falta). Lluny va rapid; a prop, frena.
  La consigna la marca el potenciometre de la base (A0).
  Prova K = 1 (salt directe), K = 0.1 i K = 0.02, i mira el Serial Plotter.
  Circuit: servo base=9 (piles + GND comu); potenciometre a A0.
  Quan: S3 - ampliacio (qui va sobrat)
*/

#include <Servo.h>

const float K = 0.1;          // constant proporcional (prova'n d'altres!)

Servo base;
float angle = 90;             // on es la base ARA (amb decimals)

void setup() {
  base.write((int)angle);
  base.attach(9);
  Serial.begin(9600);
}

void loop() {
  int consigna = map(analogRead(A0), 0, 1023, 0, 180);   // on volem anar
  float error = consigna - angle;                          // quant falta

  angle = angle + K * error;          // un tros proporcional a l'error
  base.write((int)(angle + 0.5));     // arrodonit al grau mes proper

  // Serial Plotter: consigna i posicio real
  Serial.print(consigna);
  Serial.print(" ");
  Serial.println(angle);

  delay(20);                          // 50 voltes per segon
}
