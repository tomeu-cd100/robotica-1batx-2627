/*
  Solucionari Repte SA7-A · Robot repartidor (REQUISIT MINIM)
  Trajectoria definida amb FUNCIONS de moviment: va recte, gira i para.
  === PINS (AJUSTAR segons el manual de la Imagina 3dBot) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int VEL = 180;

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

  // Trajectoria minima: recte -> gir -> recte -> parar
  endavant();   delay(1500);
  atura();      delay(300);
  gira_dreta(); delay(600);
  atura();      delay(300);
  endavant();   delay(1500);
  atura();
}

void loop() {
  // La trajectoria es fa una sola vegada al setup().
}
