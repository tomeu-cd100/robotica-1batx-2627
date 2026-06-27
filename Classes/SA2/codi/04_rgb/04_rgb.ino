/*
  SA2 - 04_rgb.ino
  Barreja de colors amb un LED RGB de catode comu.
  Circuit: R=9, G=10, B=11 (cada un amb 220 ohm). Catode comu a GND.
  Cada color es controla amb PWM (0-255).
  NOTA: si el teu LED es d'anode comu, el comu va a 5V i els valors s'inverteixen.
*/

const int R = 9;
const int G = 10;
const int B = 11;

// Funcio propia per fixar un color (modularitat)
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
}

void loop() {
  color(255, 0, 0);   delay(1000);   // vermell
  color(0, 255, 0);   delay(1000);   // verd
  color(0, 0, 255);   delay(1000);   // blau
  color(255, 255, 0); delay(1000);   // groc (R+G)
  color(128, 0, 128); delay(1000);   // lila
  color(0, 0, 0);     delay(1000);   // apagat
}
