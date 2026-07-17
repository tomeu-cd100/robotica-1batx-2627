/*
  Solucionari Repte SA1-B · Llum de bicicleta (AMPLIAT)
  AMPLIACIO 1: un segon mode (parpelleig lent) despres del primer.
  AMPLIACIO 2: seqüencia d'emergencia (3 flaixos rapids + pausa) amb for.
  AMPLIACIO 3: cada mode es una FUNCIO amb PARAMETRES; totes criden
  una unica funcio generica parpelleja() -> zero codi duplicat.
  Circuit: LED al pin 13 (o LED + 220 ohm a GND).
*/

const int LLUM = 13;

// AMPLIACIO 3: funcio generica parametritzada (l'unica que toca el LED)
void parpelleja(int repeticions, int durada) {
  for (int i = 0; i < repeticions; i++) {
    digitalWrite(LLUM, HIGH); delay(durada);
    digitalWrite(LLUM, LOW);  delay(durada);
  }
}

// AMPLIACIO 3: els modes nomes trien parametres, no dupliquen estructura
void modeRapid(int repeticions) { parpelleja(repeticions, 200); }

void modeLent(int repeticions)  { parpelleja(repeticions, 700); }

void modeEmergencia(int repeticions) {
  // AMPLIACIO 2: flaixos rapids + pausa llarga
  parpelleja(repeticions, 80);
  delay(600);
}

void setup() {
  pinMode(LLUM, OUTPUT);
}

void loop() {
  // AMPLIACIO 3: loop llegible, nomes crida els modes en ordre
  modeRapid(5);        // mode 1
  modeLent(3);         // AMPLIACIO 1: mode 2
  modeEmergencia(3);   // AMPLIACIO 2
}
