/*
  Solucionari Repte SA2-A · Semafor d'un encreuament (REQUISIT MINIM)
  3 LED (vermell, groc, verd) amb la seqüencia correcta i temps per fase.
  Circuit: VERMELL=8, GROC=9, VERD=10 (cada un amb 220 ohm a GND).
*/

const int VERMELL = 8;
const int GROC = 9;
const int VERD = 10;

void setup() {
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  // Verd: passen els cotxes
  digitalWrite(VERD, HIGH); digitalWrite(GROC, LOW); digitalWrite(VERMELL, LOW);
  delay(4000);
  // Groc: atencio
  digitalWrite(VERD, LOW); digitalWrite(GROC, HIGH);
  delay(1500);
  // Vermell: aturada
  digitalWrite(GROC, LOW); digitalWrite(VERMELL, HIGH);
  delay(4000);
}
