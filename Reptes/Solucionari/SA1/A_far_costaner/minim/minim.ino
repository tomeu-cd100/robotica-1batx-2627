/*
  Solucionari Repte SA1-A · Far costaner (REQUISIT MINIM)
  Un LED repeteix un patro lluminos identificatiu propi (minim 2 temps diferents).
  Patro d'exemple: 2 s ences / 1 s apagat.
  Circuit: LED intern del pin 13 (o LED + 220 ohm a GND).
*/

const int FAR = 13;

void setup() {
  pinMode(FAR, OUTPUT);
}

void loop() {
  digitalWrite(FAR, HIGH);
  delay(2000);             // 2 s ences
  digitalWrite(FAR, LOW);
  delay(1000);             // 1 s apagat
}
