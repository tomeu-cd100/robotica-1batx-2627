/*
  Solucionari Repte SA7-A · Robot repartidor (AMPLIAT)
  AMPLIACIO 1: completa un quadrat (tornant al punt inicial).
  AMPLIACIO 2: temps de gir CALIBRABLE perque els angles siguin precisos.
  AMPLIACIO 3: ruta amb diverses parades, senyalitzades amb un LED.
  === PINS (AJUSTAR segons el manual de la Imagina 3dBot) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int LED = 13;     // AMPLIACIO 3: indicador de parada
const int VEL = 180;

const int T_RECTE = 1200;   // ms per costat
const int T_GIR_90 = 600;   // AMPLIACIO 2: CALIBRAR fins que el gir sigui de 90 graus

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()   { motors(HIGH, VEL, HIGH, VEL); }
void gira_dreta() { motors(HIGH, VEL, LOW, VEL); }
void atura()      { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

void parada() {
  // AMPLIACIO 3: marca una parada amb el LED
  atura();
  digitalWrite(LED, HIGH); delay(600); digitalWrite(LED, LOW);
  delay(200);
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(LED, OUTPUT);
  delay(1000);

  // AMPLIACIO 1 + 3: quadrat amb parada a cada cantonada
  for (int costat = 0; costat < 4; costat++) {
    endavant();   delay(T_RECTE);
    parada();                         // AMPLIACIO 3
    gira_dreta(); delay(T_GIR_90);    // AMPLIACIO 2 (calibrar)
    atura();      delay(200);
  }
  atura();
}

void loop() {
}
