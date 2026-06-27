/*
  SA1 - blink_repte.ino  (SOLUCIO del repte)
  Repte: 3 parpellejos rapids seguits d'una pausa llarga, repetint-se.
  Mostra l'us d'un bucle for i de variables per als temps.
*/

const int LED = 13;
const int T_RAPID = 150;    // durada del parpelleig rapid (ms)
const int T_PAUSA = 1000;   // durada de la pausa llarga (ms)

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  // 3 parpellejos rapids amb un bucle for
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED, HIGH);
    delay(T_RAPID);
    digitalWrite(LED, LOW);
    delay(T_RAPID);
  }
  // Pausa llarga abans de tornar a comencar
  delay(T_PAUSA);
}
