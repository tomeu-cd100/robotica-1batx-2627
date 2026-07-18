/*
  SA2 - 02b_semafor_switch.ino
  El mateix semafor de 02_semafor.ino, pero escrit amb switch
  sobre una variable de fase (0=vermell, 1=verd, 2=groc).
  Mateixa sequencia, codi mes llegible: cada fase es un "case".
  Aquesta idea (una variable que diu en quin estat som) es la
  llavor de les maquines d'estats que veurem a la SA6.
  Circuit: vermell=8, groc=9, verd=10 (cada un amb 220 ohm a GND)
  Repte: afegeix una fase 3 (nocturna, groc intermitent).
*/

const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms
const int T_VERD    = 4000;
const int T_GROC    = 1500;

int fase = 0;   // 0=vermell, 1=verd, 2=groc

void setup() {
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  switch (fase) {
    case 0:  // fase vermell
      digitalWrite(VERMELL, HIGH);
      delay(T_VERMELL);
      digitalWrite(VERMELL, LOW);
      fase = 1;
      break;   // sense break, cauria al case seguent!

    case 1:  // fase verd
      digitalWrite(VERD, HIGH);
      delay(T_VERD);
      digitalWrite(VERD, LOW);
      fase = 2;
      break;

    case 2:  // fase groc
      digitalWrite(GROC, HIGH);
      delay(T_GROC);
      digitalWrite(GROC, LOW);
      fase = 0;
      break;
  }
}
