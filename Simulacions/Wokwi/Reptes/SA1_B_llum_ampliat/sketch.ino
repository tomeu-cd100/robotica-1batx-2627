/*
  Solucionari Repte SA1-B · Llum de bicicleta (AMPLIAT)
  AMPLIACIO 1: un segon mode (parpelleig lent) despres del primer.
  AMPLIACIO 2: seqüencia d'emergencia (3 flaixos rapids + pausa) amb for.
  AMPLIACIO 3: cada mode encapsulat en una FUNCIO propia.
  Circuit: LED al pin 13 (o LED + 220 ohm a GND).
*/

const int LLUM = 13;

// AMPLIACIO 3: cada mode es una funcio
void modeRapid(int repeticions) {
  for (int i = 0; i < repeticions; i++) {
    digitalWrite(LLUM, HIGH); delay(200);
    digitalWrite(LLUM, LOW);  delay(200);
  }
}

void modeLent(int repeticions) {
  for (int i = 0; i < repeticions; i++) {
    digitalWrite(LLUM, HIGH); delay(700);
    digitalWrite(LLUM, LOW);  delay(700);
  }
}

void modeEmergencia() {
  // AMPLIACIO 2: 3 flaixos rapids + pausa llarga
  for (int i = 0; i < 3; i++) {
    digitalWrite(LLUM, HIGH); delay(80);
    digitalWrite(LLUM, LOW);  delay(80);
  }
  delay(600);
}

void setup() {
  pinMode(LLUM, OUTPUT);
}

void loop() {
  modeRapid(5);        // mode 1
  modeLent(3);         // AMPLIACIO 1: mode 2
  modeEmergencia();    // AMPLIACIO 2
}
