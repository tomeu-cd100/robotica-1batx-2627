/*
  SA7 - 04_seguidor_linia.ino
  Seguidor de linia amb dos sensors IR (esquerre i dret) sota el robot.
  Logica: si nomes un sensor veu la linia, corregeix cap a aquell costat.
  Si la teva placa dona lectura ANALOGICA, usa analogRead i un llindar.

  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;
const int S_ESQ = 2;   // sensor linia esquerre (ajustar)
const int S_DRET = 3;  // sensor linia dret (ajustar)
const int VEL = 150;

// Suposem lectura DIGITAL: LOW = linia negra detectada, HIGH = fons.
// (Comprova-ho amb la teva placa; si cal, inverteix la logica.)

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void corregeix_dreta(){ motors(HIGH, VEL, HIGH, 0); }   // frena roda dreta
void corregeix_esq()  { motors(HIGH, 0,  HIGH, VEL); }  // frena roda esquerra
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(S_ESQ, INPUT); pinMode(S_DRET, INPUT);
}

void loop() {
  bool liniaEsq  = (digitalRead(S_ESQ) == LOW);
  bool liniaDret = (digitalRead(S_DRET) == LOW);

  if (liniaEsq && liniaDret) {
    endavant();                 // tots dos sobre la linia: recte
  } else if (liniaEsq && !liniaDret) {
    corregeix_esq();            // s'ha desviat: torna a l'esquerra
  } else if (!liniaEsq && liniaDret) {
    corregeix_dreta();
  } else {
    endavant();                 // cap sensor: continua (o busca la linia)
  }
  delay(10);
}
