/*
  Solucionari Repte SA7-B · Robot explorador (AMPLIAT)
  AMPLIACIO 1: mesura i maniobra encapsulades en funcions.
  AMPLIACIO 2: estrategia -> mira a banda i banda i tria el costat mes lliure.
  AMPLIACIO 3: mode de cerca (gira buscant pas) sense quedar encallat.
  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int TRIG = 12, ECHO = 11;
const int VEL = 170;
const int DIST_MIN = 15;

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void enrere()        { motors(LOW, VEL, LOW, VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW, VEL); }
void gira_esquerra() { motors(LOW, VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

// AMPLIACIO 1: funcio de mesura
float distancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  if (t == 0) return 400;
  return t * 0.034 / 2.0;
}

// AMPLIACIO 2: mira a un costat girant breument i mesura
float miraCostat(bool dreta) {
  if (dreta) gira_dreta(); else gira_esquerra();
  delay(300);
  atura(); delay(150);
  float d = distancia();
  // desfa el gir per tornar a mirar endavant
  if (dreta) gira_esquerra(); else gira_dreta();
  delay(300);
  atura(); delay(150);
  return d;
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
}

void loop() {
  if (distancia() < DIST_MIN) {
    atura();  delay(150);
    enrere(); delay(350);     // AMPLIACIO 3: retrocedeix abans de decidir
    atura();  delay(150);

    // AMPLIACIO 2: tria el costat mes lliure
    float dDreta = miraCostat(true);
    float dEsq   = miraCostat(false);
    if (dDreta >= dEsq) gira_dreta(); else gira_esquerra();
    delay(450);
    atura(); delay(150);
  } else {
    endavant();
  }
  delay(30);
}
