/*
  Solucionari Repte SA1-B · Llum de bicicleta (REQUISIT MINIM)
  Un LED fa un mode intermitent clar i regular (200 ms ences / 200 ms apagat).
  Circuit: LED al pin 13 (o LED + 220 ohm a GND).
*/

const int LLUM = 13;

void setup() {
  pinMode(LLUM, OUTPUT);
}

void loop() {
  digitalWrite(LLUM, HIGH);
  delay(200);
  digitalWrite(LLUM, LOW);
  delay(200);
}
