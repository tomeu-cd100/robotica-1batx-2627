// Codi de referencia del Projecte T3 - El rover autonom (NOMES DOCENT)
// Integra els reptes de SA7: seguir linia i evitar obstacles, amb maquina
// d'estats i les funcions de moviment fixades al cablatge del dossier.
// Cablatge: el del dossier 00_Projecte_T3_Rover.md (apartat Cablatge).
// Alimentacio: portapiles 6xAA al L298N; MAI la UNO per USB amb motors en marxa.

const int PIN_ENA = 5;   // velocitat motor esquerre (PWM)
const int PIN_IN1 = 4;
const int PIN_IN2 = 3;
const int PIN_ENB = 6;   // velocitat motor dret (PWM)
const int PIN_IN3 = 7;
const int PIN_IN4 = 8;
const int PIN_TRIG = 12;
const int PIN_ECHO = 11;
const int PIN_LINIA_ESQ = A0;
const int PIN_LINIA_DRET = A1;
const int PIN_PARAXOCS = 2;   // LOW = xoc (KS0021)

// --- Ajustos a calibrar amb el vostre rover i la vostra pista ---
const int VEL_CREUER = 160;      // 0-255: velocitat de treball
const int VEL_GIR = 140;
const int LLINDAR_LINIA = 500;   // 0-1023: per sobre = veu la linia (calibreu!)
const int DIST_OBSTACLE = 20;    // cm: per sota, esquiva

// MODE del rover: canvieu aquesta constant per triar el comportament.
// (Ampliacio possible: commutar de mode amb un polsador o per temps.)
enum Mode { SEGUIR_LINIA, EVITAR_OBSTACLES, ATURAT };
Mode mode = SEGUIR_LINIA;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_IN1, OUTPUT); pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT); pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENA, OUTPUT); pinMode(PIN_ENB, OUTPUT);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_PARAXOCS, INPUT_PULLUP);
  atura();
}

void loop() {
  // Para-xocs: aturada immediata en QUALSEVOL mode (prioritat maxima)
  if (digitalRead(PIN_PARAXOCS) == LOW) {
    atura();
    mode = ATURAT;
    Serial.println("XOC: rover aturat (reinicia per tornar a comencar)");
  }

  switch (mode) {
    case SEGUIR_LINIA:    seguirLinia(); break;
    case EVITAR_OBSTACLES: evitarObstacles(); break;
    case ATURAT:          atura(); break;
  }
  delay(30);
}

// --- Comportament 1: seguir linia (2 sensors, control tot-o-res) ---
void seguirLinia() {
  bool esq = analogRead(PIN_LINIA_ESQ) > LLINDAR_LINIA;
  bool dret = analogRead(PIN_LINIA_DRET) > LLINDAR_LINIA;

  if (esq && dret) {
    endavant(VEL_CREUER);      // els dos veuen linia: recte
  } else if (esq) {
    giraEsquerra(VEL_GIR);     // la linia fuig cap a l'esquerra
  } else if (dret) {
    giraDreta(VEL_GIR);
  } else {
    // Linia perduda: gira lent sobre si mateix per retrobar-la
    giraDreta(VEL_GIR - 30);
  }
}

// Espera vigilant para-xocs: durant qualsevol maniobra, monitoritza si es
// detecta xoc. Si LOW, atura immediatament, posa ATURAT i retorna true.
// Sino, retorna false al cap de ms mil·lisegons (resolucio 10 ms).
bool esperaVigilantXoc(unsigned long ms) {
  unsigned long inici = millis();
  while (millis() - inici < ms) {
    if (digitalRead(PIN_PARAXOCS) == LOW) {
      atura();
      mode = ATURAT;
      Serial.println("XOC: rover aturat (reinicia per tornar a comencar)");
      return true;
    }
    delay(10);
  }
  return false;
}

// --- Comportament 2: evitar obstacles amb l'ultraso ---
void evitarObstacles() {
  long d = distanciaCm();
  Serial.print("distancia="); Serial.println(d);
  if (d < DIST_OBSTACLE) {
    atura();
    if (esperaVigilantXoc(200)) return;
    enrere(VEL_GIR);
    if (esperaVigilantXoc(400)) return;
    giraDreta(VEL_GIR);   // esquiva sempre per la dreta (senzill i predictible)
    if (esperaVigilantXoc(350)) return;
  } else {
    endavant(VEL_CREUER);
  }
}

// Lectura de l'HC-SR04. El 0 (sense eco) es tracta com a "molt lluny" (400):
// el mateix criteri que el sketch d'alarma de SA3, per evitar falses esquives.
long distanciaCm() {
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long durada = pulseIn(PIN_ECHO, HIGH, 25000);   // timeout 25 ms (~4 m)
  if (durada == 0) return 400;
  return durada / 58;
}

// --- Funcions de moviment (es fixen UNA vegada amb la taula de cablatge) ---
void endavant(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void enrere(int vel) {
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraEsquerra(int vel) {
  // Gir sobre l'eix: motor esquerre enrere, motor dret endavant
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraDreta(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void atura() {
  analogWrite(PIN_ENA, 0); analogWrite(PIN_ENB, 0);
}
