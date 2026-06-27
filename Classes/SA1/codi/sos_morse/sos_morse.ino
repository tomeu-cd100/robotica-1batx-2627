/*
  SA1 - sos_morse.ino  (AMPLIACIO)
  Emet la senyal SOS en codi Morse amb el LED:  · · ·   — — —   · · ·
  Punt = parpelleig curt; ratlla = parpelleig llarg.
  Mostra com encapsular accions repetides en FUNCIONS propies
  (punt() i ratlla()), millorant la llegibilitat del codi (rubrica R1).
*/

const int LED = 13;
const int UNITAT = 200;   // durada base en ms (un "punt"). Pujar-la alenteix tot.

void setup() {
  pinMode(LED, OUTPUT);
}

// Un punt: encesa curta (1 unitat) + pausa entre senyals (1 unitat)
void punt() {
  digitalWrite(LED, HIGH);
  delay(UNITAT);
  digitalWrite(LED, LOW);
  delay(UNITAT);
}

// Una ratlla: encesa llarga (3 unitats) + pausa entre senyals (1 unitat)
void ratlla() {
  digitalWrite(LED, HIGH);
  delay(UNITAT * 3);
  digitalWrite(LED, LOW);
  delay(UNITAT);
}

void loop() {
  // S = tres punts
  punt(); punt(); punt();
  delay(UNITAT * 2);   // separacio entre lletres

  // O = tres ratlles
  ratlla(); ratlla(); ratlla();
  delay(UNITAT * 2);

  // S = tres punts
  punt(); punt(); punt();

  delay(UNITAT * 7);   // pausa llarga abans de repetir el missatge
}
