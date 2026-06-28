/*
  Solucionari Repte SA6-B · Semafor adaptatiu (REQUISIT MINIM)
  Maquina d'estats amb una variable d'estat i millis() (sense delay encadenats).
  Estats: VERD -> GROC -> VERMELL -> VERD...
  Circuit: VERD=10, GROC=9, VERMELL=8 (cada un amb 220 ohm a GND).
*/

const int VERD = 10, GROC = 9, VERMELL = 8;

enum Estat { E_VERD, E_GROC, E_VERMELL };
Estat estat = E_VERD;
unsigned long tEstat = 0;

const unsigned long T_VERD = 4000, T_GROC = 1500, T_VERMELL = 4000;

void aplica() {
  digitalWrite(VERD, estat == E_VERD ? HIGH : LOW);
  digitalWrite(GROC, estat == E_GROC ? HIGH : LOW);
  digitalWrite(VERMELL, estat == E_VERMELL ? HIGH : LOW);
}

void canvia(Estat nou) { estat = nou; tEstat = millis(); aplica(); }

void setup() {
  pinMode(VERD, OUTPUT); pinMode(GROC, OUTPUT); pinMode(VERMELL, OUTPUT);
  canvia(E_VERD);
}

void loop() {
  unsigned long ara = millis() - tEstat;
  switch (estat) {
    case E_VERD:    if (ara > T_VERD)    canvia(E_GROC);    break;
    case E_GROC:    if (ara > T_GROC)    canvia(E_VERMELL); break;
    case E_VERMELL: if (ara > T_VERMELL) canvia(E_VERD);    break;
  }
}
