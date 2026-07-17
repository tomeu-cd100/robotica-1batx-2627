/*
  Solucionari Repte SA4-C · Brac/dispensador amb servo (AMPLIAT)
  AMPLIACIO 1: controla l'angle directament amb un potenciometre.
  AMPLIACIO 2: NOMES UNA activacio per premuda (evita repeticions amb debounce).
  AMPLIACIO 3: coordina DOS servos (base + pinca) amb funcions propies
  (mou_base, mou_pinca) i repeteix el cicle "agafa i deixa" 3 cops seguits.
  Circuit: servo BASE=9, servo PINCA=10 ; potenciometre -> A0 ; polsador entre pin 2 i GND.
*/

#include <Servo.h>

Servo base, pinca;
const int POT = A0, POLSADOR = 2;
int estatAnterior = HIGH;
unsigned long ultimCanvi = 0;
const unsigned long ANTIREBOT = 50;

// AMPLIACIO 3: funcions propies per a cada servo. La pausa interna espera
// que el moviment acabi: la pinca no es mou mai mentre la base gira.
void mou_base(int angle)  { base.write(angle);  delay(500); }
void mou_pinca(int angle) { pinca.write(angle); delay(400); }

// AMPLIACIO 3: tasca amb dos servos (agafa i deixa), un cicle complet
void dispensaDosi() {
  mou_pinca(10);    // obre pinca
  mou_base(120);    // gira la base cap al diposit
  mou_pinca(80);    // tanca pinca (agafa)
  mou_base(0);      // torna
  mou_pinca(10);    // deixa la dosi
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
    // AMPLIACIO 3: el cicle "agafa i deixa" es repeteix 3 cops seguits
    // sense recol.locar res a ma (una sola premuda, gracies al debounce)
    if (estat == LOW) for (int i = 0; i < 3; i++) dispensaDosi();
    estatAnterior = estat;
  }
}
