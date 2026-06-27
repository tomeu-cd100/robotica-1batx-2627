/*
  Solucionari Repte SA7-C · Seguidor de linia (AMPLIAT)
  AMPLIACIO 1: cronometre del recorregut (Monitor Serie).
  AMPLIACIO 2 + 3: correccio PROPORCIONAL (gir proporcional a la desviacio) -> mes suau.
  Aqui s'usen sensors IR ANALOGICS (mes informacio que el digital): error = esq - dret.
  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int S_ESQ = A0, S_DRET = A1;     // sensors IR ANALOGICS
const int BASE = 150;                  // velocitat base
const float Kp = 0.15;                 // AMPLIACIO 3: constant proporcional (ajusta-la)

unsigned long tInici;

void motorsVel(int vE, int vD) {
  digitalWrite(ESQ_DIR, HIGH); analogWrite(ESQ_VEL, constrain(vE, 0, 255));
  digitalWrite(DRET_DIR, HIGH); analogWrite(DRET_VEL, constrain(vD, 0, 255));
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  Serial.begin(9600);
  tInici = millis();   // AMPLIACIO 1: arrenca el cronometre
}

void loop() {
  int esq = analogRead(S_ESQ);
  int dret = analogRead(S_DRET);
  int error = esq - dret;            // desviacio respecte de la linia

  // AMPLIACIO 2+3: correccio proporcional i suau
  int correccio = (int)(Kp * error);
  motorsVel(BASE - correccio, BASE + correccio);

  // AMPLIACIO 1: temps transcorregut
  Serial.print("t(s)="); Serial.print((millis() - tInici) / 1000.0);
  Serial.print("  error="); Serial.println(error);
}
