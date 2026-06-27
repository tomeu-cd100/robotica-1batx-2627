/*
  Solucionari Repte SA2-C · Indicador de nivell (AMPLIAT)
  AMPLIACIO 1: recorre els LED amb un for i un array de pins.
  AMPLIACIO 2: el nivell puja i baixa en bucle (efecte VU-metre).
  AMPLIACIO 3: un LED RGB final que passa de verd a vermell segons el nivell.
  Circuit: LEDs de barra als pins 4,5,6,7 ; LED RGB R=9,G=10,B=11 (220 ohm).
*/

const int barra[] = {4, 5, 6, 7};   // AMPLIACIO 1: array de pins
const int N = 4;
const int R = 9, G = 10, B = 11;     // AMPLIACIO 3: LED RGB indicador

void mostraNivell(int nivell) {
  for (int i = 0; i < N; i++) {
    digitalWrite(barra[i], (i < nivell) ? HIGH : LOW);
  }
  // AMPLIACIO 3: color del RGB segons el nivell (verd -> vermell)
  int vermell = map(nivell, 0, N, 0, 255);
  int verd    = map(nivell, 0, N, 255, 0);
  analogWrite(R, vermell); analogWrite(G, verd); analogWrite(B, 0);
}

void setup() {
  for (int i = 0; i < N; i++) pinMode(barra[i], OUTPUT);
  pinMode(R, OUTPUT); pinMode(G, OUTPUT); pinMode(B, OUTPUT);
}

void loop() {
  // AMPLIACIO 2: puja i baixa (VU-metre)
  for (int n = 0; n <= N; n++) { mostraNivell(n); delay(300); }
  for (int n = N; n >= 0; n--) { mostraNivell(n); delay(300); }
}
