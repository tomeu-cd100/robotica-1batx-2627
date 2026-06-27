/*
  SA2 - 02_semafor.ino
  Semafor de 3 LED amb temporitzacio.
  Circuit: vermell=8, groc=9, verd=10 (cada un amb 220 ohm a GND)
  Repte resolt: variable NOCTURN per activar el groc intermitent.
*/

const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms
const int T_VERD    = 4000;
const int T_GROC    = 1500;

bool nocturn = false;   // posa true per al mode nocturn (groc intermitent)

void setup() {
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  if (nocturn) {
    // Mode nocturn: nomes groc intermitent
    digitalWrite(GROC, HIGH);
    delay(500);
    digitalWrite(GROC, LOW);
    delay(500);
  } else {
    // Cicle normal del semafor
    digitalWrite(VERMELL, HIGH);
    delay(T_VERMELL);
    digitalWrite(VERMELL, LOW);

    digitalWrite(VERD, HIGH);
    delay(T_VERD);
    digitalWrite(VERD, LOW);

    digitalWrite(GROC, HIGH);
    delay(T_GROC);
    digitalWrite(GROC, LOW);
  }
}
