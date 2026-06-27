/*
  Solucionari Repte SA2-A · Semafor d'un encreuament (AMPLIAT)
  AMPLIACIO 1: constants per als pins i variables per als temps.
  AMPLIACIO 2: semafor de vianants coordinat (verd vianants quan vermell cotxes).
  AMPLIACIO 3: cada fase encapsulada en una funcio.
  Circuit cotxes: VERMELL=8, GROC=9, VERD=10.
  Circuit vianants: V_VERMELL=11, V_VERD=12. (tots amb 220 ohm)
*/

const int VERMELL = 8, GROC = 9, VERD = 10;       // cotxes
const int V_VERMELL = 11, V_VERD = 12;            // vianants

// AMPLIACIO 1: temps en variables
int tVerd = 4000, tGroc = 1500, tVermell = 4000;

void setup() {
  pinMode(VERMELL, OUTPUT); pinMode(GROC, OUTPUT); pinMode(VERD, OUTPUT);
  pinMode(V_VERMELL, OUTPUT); pinMode(V_VERD, OUTPUT);
}

// AMPLIACIO 3: una funcio per fase
void faseCotxesPassen() {
  digitalWrite(VERD, HIGH); digitalWrite(GROC, LOW); digitalWrite(VERMELL, LOW);
  digitalWrite(V_VERMELL, HIGH); digitalWrite(V_VERD, LOW);   // vianants aturats
  delay(tVerd);
}

void faseAtencio() {
  digitalWrite(VERD, LOW); digitalWrite(GROC, HIGH);
  delay(tGroc);
}

void faseVianantsPassen() {
  digitalWrite(GROC, LOW); digitalWrite(VERMELL, HIGH);       // cotxes aturats
  digitalWrite(V_VERMELL, LOW); digitalWrite(V_VERD, HIGH);   // AMPLIACIO 2: vianants verd
  delay(tVermell);
}

void loop() {
  faseCotxesPassen();
  faseAtencio();
  faseVianantsPassen();
}
