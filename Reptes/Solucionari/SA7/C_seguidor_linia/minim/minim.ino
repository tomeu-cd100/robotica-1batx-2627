/*
  Solucionari Repte SA7-C · Seguidor de linia (REQUISIT MINIM)
  Dos sensors IR sota el robot: si nomes un veu la linia, corregeix cap a aquell costat.
  Suposem lectura DIGITAL: LOW = linia negra detectada. (Inverteix-ho si cal.)
  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int S_ESQ = 2, S_DRET = 3;                                  // sensors IR
const int VEL = 150;

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()       { motors(HIGH, VEL, HIGH, VEL); }
void corregeix_dreta(){ motors(HIGH, VEL, HIGH, 0); }    // frena roda dreta
void corregeix_esq()  { motors(HIGH, 0,  HIGH, VEL); }   // frena roda esquerra

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(S_ESQ, INPUT); pinMode(S_DRET, INPUT);
}

void loop() {
  bool liniaEsq  = (digitalRead(S_ESQ) == LOW);
  bool liniaDret = (digitalRead(S_DRET) == LOW);

  if (liniaEsq && !liniaDret)      corregeix_esq();
  else if (!liniaEsq && liniaDret) corregeix_dreta();
  else                             endavant();   // tots dos igual: recte
  delay(10);
}
