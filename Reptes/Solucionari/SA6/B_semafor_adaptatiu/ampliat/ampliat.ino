/*
  Solucionari Repte SA6-B · Semafor adaptatiu (AMPLIAT)
  AMPLIACIO 1: polsador de vianants que avanca a vermell de forma segura.
  AMPLIACIO 2: estat de parpelleig groc (mode nocturn) amb el boto B.
  AMPLIACIO 3: coordina un segon semafor amb estats complementaris.
  Circuit: S1 VERD=10,GROC=9,VERMELL=8 ; S2 VERD=A1,GROC=A2,VERMELL=A3 (pins digitals) ;
           polsador vianants entre pin 2 i GND ; polsador mode nocturn entre pin 3 i GND.
*/

const int VERD = 10, GROC = 9, VERMELL = 8;
const int S2_VERD = A1, S2_GROC = A2, S2_VERMELL = A3;   // segon semafor
const int P_VIANANTS = 2, P_NOCTURN = 3;

enum Estat { E_VERD, E_GROC, E_VERMELL, E_NOCTURN };
Estat estat = E_VERD;
unsigned long tEstat = 0;
const unsigned long T_VERD = 4000, T_GROC = 1500, T_VERMELL = 4000;
bool peticioVianants = false;

void aplica() {
  bool v = (estat == E_VERD), g = (estat == E_GROC), r = (estat == E_VERMELL);
  digitalWrite(VERD, v); digitalWrite(GROC, g); digitalWrite(VERMELL, r);
  // AMPLIACIO 3: segon semafor complementari (vermell quan el primer no ho es)
  digitalWrite(S2_VERMELL, r ? LOW : HIGH);
  digitalWrite(S2_VERD, r ? HIGH : LOW);
  digitalWrite(S2_GROC, LOW);
}

void canvia(Estat nou) { estat = nou; tEstat = millis(); aplica(); }

void setup() {
  pinMode(VERD, OUTPUT); pinMode(GROC, OUTPUT); pinMode(VERMELL, OUTPUT);
  pinMode(S2_VERD, OUTPUT); pinMode(S2_GROC, OUTPUT); pinMode(S2_VERMELL, OUTPUT);
  pinMode(P_VIANANTS, INPUT_PULLUP); pinMode(P_NOCTURN, INPUT_PULLUP);
  canvia(E_VERD);
}

void loop() {
  // AMPLIACIO 1: peticio de vianants
  if (digitalRead(P_VIANANTS) == LOW) peticioVianants = true;
  // AMPLIACIO 2: mode nocturn
  if (digitalRead(P_NOCTURN) == LOW) canvia(E_NOCTURN);

  unsigned long ara = millis() - tEstat;
  switch (estat) {
    case E_VERD:
      // si hi ha vianants esperant, escurca el verd
      if (ara > (peticioVianants ? 1000UL : T_VERD)) canvia(E_GROC);
      break;
    case E_GROC:    if (ara > T_GROC) canvia(E_VERMELL); break;
    case E_VERMELL: if (ara > T_VERMELL) { peticioVianants = false; canvia(E_VERD); } break;
    case E_NOCTURN:
      // AMPLIACIO 2: groc intermitent; surt amb el boto de vianants
      digitalWrite(VERD, LOW); digitalWrite(VERMELL, LOW);
      digitalWrite(GROC, (millis() / 500) % 2);
      digitalWrite(S2_GROC, (millis() / 500) % 2);
      digitalWrite(S2_VERD, LOW); digitalWrite(S2_VERMELL, LOW);
      if (digitalRead(P_VIANANTS) == LOW) canvia(E_VERD);
      break;
  }
}
