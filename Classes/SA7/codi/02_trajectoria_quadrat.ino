/*
  SA7 - 02_trajectoria_quadrat.ino
  Recorre un quadrat: 4 vegades (endavant + gir de 90 graus).
  Cal CALIBRAR el temps de gir (T_GIR_90) perque el gir sigui de 90 graus reals.

  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;
const int VEL = 180;

const int T_RECTE  = 1200;  // ms per avancar un costat (ajustar)
const int T_GIR_90 = 600;   // ms per girar 90 graus (CALIBRAR!)

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()   { motors(HIGH, VEL, HIGH, VEL); }
void gira_dreta() { motors(HIGH, VEL, LOW, VEL); }
void atura()      { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  delay(1000);   // temps per deixar el robot a terra

  for (int costat = 0; costat < 4; costat++) {
    endavant();    delay(T_RECTE);
    atura();       delay(300);
    gira_dreta();  delay(T_GIR_90);
    atura();       delay(300);
  }
  atura();
}

void loop() {
  // El recorregut es fa una sola vegada al setup().
}
