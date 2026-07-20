/*
  SA7 - 05_robot_reactiu_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

  El patro dificil ja esta muntat: les funcions de MOVIMENT (control diferencial)
  i la de PERCEPCIO amb ultrasons (distancia()) estan completes i provades.
  Tu nomes has d'OMPLIR el loop(): el cicle PERCEPCIO -> DECISIO -> ACCIO.

  A cada volta el robot mesura una vegada la distancia i, segons el valor,
  ha de decidir que fa. Escriu la DECISIO i l'ACCIO dins de cada // TODO:
  cridant les funcions de moviment que ja tens (endavant, enrere,
  gira_dreta, gira_esquerra, atura).

  Munta: motors (2 pins per motor: DIRECCIO + VELOCITAT PWM) i un
  ultrasons frontal (TRIG i ECHO). AJUSTA els pins al teu maquinari.
  Quan: S3 - bastida de l'evita-obstacles
*/

// === PINS (AJUSTAR segons el manual de la teva placa) ===
const int ESQ_DIR = 4;    // direccio motor esquerre   <-- AJUSTAR
const int ESQ_VEL = 5;    // velocitat (PWM) esquerre  <-- AJUSTAR
const int DRET_DIR = 7;   // direccio motor dret       <-- AJUSTAR
const int DRET_VEL = 6;   // velocitat (PWM) dret      <-- AJUSTAR

const int TRIG = 12;      // ultrasons: TRIG surt      <-- AJUSTAR
const int ECHO = 11;      // ultrasons: ECHO entra     <-- AJUSTAR

const int VEL = 180;      // velocitat de marxa (0-255)

// Llindars de decisio en cm. Els has de CALIBRAR amb un regle.
// Consell: fes servir DOS valors (a prop / lluny) i deixa una zona
// intermedia, per evitar que el robot oscil-li just al limit.
const int A_PROP  = 12;   // cm: per sota d'aixo, hi ha un obstacle a prop
const int A_LLUNY = 25;   // cm: per sobre d'aixo, via lliure

// --- Funcions de MOVIMENT (ja donades, control diferencial) ---
void motors(int dirEsq, int velEsq, int dirDret, int velDret) {
  digitalWrite(ESQ_DIR, dirEsq);
  analogWrite(ESQ_VEL, velEsq);
  digitalWrite(DRET_DIR, dirDret);
  analogWrite(DRET_VEL, velDret);
}
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }   // dues rodes igual = recte
void enrere()        { motors(LOW,  VEL, LOW,  VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW,  VEL); }   // esq endavant, dret enrere
void gira_esquerra() { motors(LOW,  VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

// --- Funcio de PERCEPCIO (ja donada): distancia a l'obstacle, en cm ---
float distancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms (no bloqueja per sempre)
  if (t == 0) return 400;                // res detectat -> molt lluny
  return t * 0.034 / 2.0;                // temps (us) -> cm (anada i tornada)
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT);  pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(TRIG, OUTPUT);     pinMode(ECHO, INPUT);   // TRIG surt, ECHO entra
  atura();                   // arrenca aturat, per seguretat
}

void loop() {
  // 1) PERCEPCIO: mesura la distancia una vegada per cicle.
  float d = distancia();

  // 2) DECISIO + 3) ACCIO: decideix segons "d" i crida una funcio de moviment.
  if (d < A_PROP) {
    // TODO: hi ha un obstacle a prop. Que ha de fer el robot?
    // (p. ex. atura(); enrere() una mica; despres gira_dreta() per buscar sortida)
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  } else if (d > A_LLUNY) {
    // TODO: via lliure. Que fa el robot quan no te res al davant?
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  } else {
    // TODO: zona intermedia (entre A_PROP i A_LLUNY). Que decideixes aqui?
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  }

  // Ritme del cicle: prou curt per reaccionar de pressa. No hi posis
  // esperes llargues, o el robot quedaria "cec" mentre es mou.
  delay(30);
}
