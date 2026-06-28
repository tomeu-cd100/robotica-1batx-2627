/*
  Solucionari Repte SA1-C · Missatge en Morse (REQUISIT MINIM)
  El LED emet "S O S" amb temps de punt i ratlla diferenciats.
  Morse: punt = . (curt) ; ratlla = - (3 punts).
  Circuit: LED al pin 13 (o LED + 220 ohm a GND).
*/

const int LED = 13;
const int PUNT = 250;          // durada d'un punt (ms)
const int RATLLA = PUNT * 3;   // una ratlla son 3 punts
const int PAUSA = PUNT;        // pausa entre senyals d'una mateixa lletra

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  // S = . . .
  for (int i = 0; i < 3; i++) { digitalWrite(LED, HIGH); delay(PUNT);   digitalWrite(LED, LOW); delay(PAUSA); }
  delay(RATLLA);   // pausa entre lletres
  // O = - - -
  for (int i = 0; i < 3; i++) { digitalWrite(LED, HIGH); delay(RATLLA); digitalWrite(LED, LOW); delay(PAUSA); }
  delay(RATLLA);
  // S = . . .
  for (int i = 0; i < 3; i++) { digitalWrite(LED, HIGH); delay(PUNT);   digitalWrite(LED, LOW); delay(PAUSA); }
  delay(RATLLA * 2);  // pausa llarga abans de repetir
}
