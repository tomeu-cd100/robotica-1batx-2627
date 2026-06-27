/*
  SA7 - 03_evita_obstacles.ino
  Comportament reactiu: el robot avanca i, si detecta un obstacle a prop,
  retrocedeix una mica i gira. Control en llac tancat (el sensor decideix).

  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;
const int TRIG = 12, ECHO = 11;     // ultrasons frontal (ajustar)
const int VEL = 180;
const int DIST_MIN = 15;            // cm: per sota, evita

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()   { motors(HIGH, VEL, HIGH, VEL); }
void enrere()     { motors(LOW, VEL, LOW, VEL); }
void gira_dreta() { motors(HIGH, VEL, LOW, VEL); }
void atura()      { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

float distancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms
  if (t == 0) return 400;                // res detectat -> lluny
  return t * 0.034 / 2.0;
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
}

void loop() {
  float d = distancia();

  if (d < DIST_MIN) {
    // Obstacle a prop: maniobra d'evasio
    atura();        delay(150);
    enrere();       delay(400);
    atura();        delay(150);
    gira_dreta();   delay(450);   // gir per buscar via lliure
    atura();        delay(150);
  } else {
    endavant();
  }
  delay(30);
}
