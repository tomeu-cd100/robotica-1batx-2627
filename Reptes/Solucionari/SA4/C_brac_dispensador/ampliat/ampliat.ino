/*
  Solucionari Repte SA4-C · Brac/dispensador amb servo (AMPLIAT)
  AMPLIACIO 1: controla l'angle directament amb un potenciometre.
  AMPLIACIO 2: dispensa NOMES UNA dosi per activacio (evita repeticions amb debounce).
  AMPLIACIO 3: coordina DOS servos (base + pinca) per a una tasca completa.
  Circuit: servo BASE=9, servo PINCA=10 ; potenciometre -> A0 ; polsador entre pin 2 i GND.
*/

#include <Servo.h>

Servo base, pinca;
const int POT = A0, POLSADOR = 2;
int estatAnterior = HIGH;
unsigned long ultimCanvi = 0;
const unsigned long ANTIREBOT = 50;

// AMPLIACIO 3: tasca amb dos servos (agafa i deixa)
void dispensaDosi() {
  pinca.write(10);  delay(400);   // obre pinca
  base.write(120);  delay(500);   // gira la base cap al diposit
  pinca.write(80);  delay(400);   // tanca pinca (agafa)
  base.write(0);    delay(500);   // torna
  pinca.write(10);  delay(400);   // deixa la dosi
}

void setup() {
  base.attach(9);
  pinca.attach(10);
  pinMode(POT, INPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
  base.write(0); pinca.write(10);
}

void loop() {
  // AMPLIACIO 1: ajust manual de la base amb el potenciometre (mode repos)
  int angle = map(analogRead(POT), 0, 1023, 0, 180);
  base.write(angle);

  // AMPLIACIO 2: una sola dosi per premuda (debounce per flanc)
  int estat = digitalRead(POLSADOR);
  if (estat != estatAnterior && (millis() - ultimCanvi) > ANTIREBOT) {
    ultimCanvi = millis();
    if (estat == LOW) dispensaDosi();   // nomes un cop per premuda
    estatAnterior = estat;
  }
}
