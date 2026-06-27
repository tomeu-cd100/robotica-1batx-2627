/*
  SA7 - 01_moviment_basic.ino
  Moviment basic d'un robot mobil diferencial (Imagina 3dBot / Arduino).
  Funcions: endavant, enrere, gira_dreta, gira_esquerra, atura.

  === PINS (AJUSTAR segons el manual de la teva placa) ===
  Cada motor te un pin de DIRECCIO i un de VELOCITAT (PWM).
  Si la teva placa usa dos pins de direccio per motor (IN1/IN2), adapta les funcions.
*/

const int ESQ_DIR = 4;    // direccio motor esquerre   <-- AJUSTAR
const int ESQ_VEL = 5;    // velocitat (PWM) esquerre  <-- AJUSTAR
const int DRET_DIR = 7;   // direccio motor dret       <-- AJUSTAR
const int DRET_VEL = 6;   // velocitat (PWM) dret      <-- AJUSTAR

const int VEL = 180;      // velocitat per defecte (0-255)

void motors(int dirEsq, int velEsq, int dirDret, int velDret) {
  digitalWrite(ESQ_DIR, dirEsq);
  analogWrite(ESQ_VEL, velEsq);
  digitalWrite(DRET_DIR, dirDret);
  analogWrite(DRET_VEL, velDret);
}

void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void enrere()        { motors(LOW,  VEL, LOW,  VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW,  VEL); }   // esq endavant, dret enrere
void gira_esquerra() { motors(LOW,  VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

void setup() {
  pinMode(ESQ_DIR, OUTPUT);  pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
}

void loop() {
  endavant();      delay(1500);
  atura();         delay(500);
  gira_dreta();    delay(600);
  atura();         delay(500);
}
