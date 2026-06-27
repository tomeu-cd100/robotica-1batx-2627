/*
  Solucionari Repte SA2-B · Llum d'ambient regulable (AMPLIAT)
  AMPLIACIO 1: velocitat del fade ajustable amb una variable.
  AMPLIACIO 2: LED RGB amb transicio entre dos colors.
  AMPLIACIO 3: cicle de colors (arc de Sant Marti) barrejant els tres canals.
  Circuit: LED RGB de catode comu R=9, G=10, B=11 (cada un 220 ohm), comu a GND.
*/

const int R = 9, G = 10, B = 11;

// AMPLIACIO 1: velocitat (ms entre passos)
int velocitat = 8;

void color(int r, int g, int b) {
  analogWrite(R, r); analogWrite(G, g); analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT); pinMode(G, OUTPUT); pinMode(B, OUTPUT);
}

void loop() {
  // AMPLIACIO 2: transicio de vermell (255,0,0) a blau (0,0,255) i tornada
  for (int i = 0; i <= 255; i++) { color(255 - i, 0, i); delay(velocitat); }
  for (int i = 255; i >= 0; i--) { color(255 - i, 0, i); delay(velocitat); }

  // AMPLIACIO 3: roda de color (vermell -> verd -> blau -> vermell)
  for (int i = 0; i <= 255; i++) { color(255 - i, i, 0); delay(velocitat); } // vermell->verd
  for (int i = 0; i <= 255; i++) { color(0, 255 - i, i); delay(velocitat); } // verd->blau
  for (int i = 0; i <= 255; i++) { color(i, 0, 255 - i); delay(velocitat); } // blau->vermell
}
