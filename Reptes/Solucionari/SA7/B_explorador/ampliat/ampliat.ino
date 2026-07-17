/*
  Solucionari Repte SA7-B · Robot explorador (AMPLIAT)
  AMPLIACIO 1: mesura i maniobra encapsulades en funcions.
  AMPLIACIO 2: estrategia -> mira a banda i banda i tria el costat mes lliure.
  AMPLIACIO 3: detecta que esta ENCALLAT (massa maniobres seguides sense
    avanc net), ho SENYALITZA amb el LED i executa una sortida d'encallament
    que no entra en bucle (gir alternat + tram enrere mes llarg). El
    comptador de maniobres es reinicia nomes quan el robot avanca net.
  === PINS (AJUSTAR) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int TRIG = 12, ECHO = 11;
const int LED = 13;                 // AMPLIACIO 3: senyal d'encallament
const int VEL = 170;
const int DIST_MIN = 15;

const int MANIOBRES_ENCALLAT = 4;             // AMPLIACIO 3: llindar d'encallament
const unsigned long T_AVANC_NET = 1500;       // ms avancant seguits = avanc net

int maniobresSeguides = 0;    // AMPLIACIO 3: maniobres sense avanc net entremig
bool girAlternat = false;     // AMPLIACIO 3: alterna el sentit del gir de sortida
bool avancant = false;
unsigned long iniciAvanc = 0;

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

// AMPLIACIO 3: senyalitza l'encallament (LED parpelleja i queda ences
// fins que el robot torni a avancar net)
void senyalEncallat() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED, HIGH); delay(120);
    digitalWrite(LED, LOW);  delay(120);
  }
  digitalWrite(LED, HIGH);
}

// AMPLIACIO 3: sortida d'encallament que NO entra en bucle:
// - tram enrere MES LLARG que el de la maniobra normal
// - gir en sentit ALTERNAT (una vegada dreta, la seguent esquerra)
// - durada del gir amb component pseudoaleatoria (trenca simetries)
void sortidaEncallament() {
  enrere(); delay(900);
  atura();  delay(150);
  int durada = 500 + (int)(millis() % 400);   // 500..899 ms, imprevisible
  if (girAlternat) gira_dreta(); else gira_esquerra();
  girAlternat = !girAlternat;
  delay(durada);
  atura(); delay(150);
  // NOTA: no reiniciem el comptador aqui; nomes es reinicia quan el robot
  // torna a avancar net (aixi, si segueix encallat, repeteix la sortida
  // amb l'altre sentit de gir).
}

// AMPLIACIO 1: maniobra d'evitacio encapsulada
void maniobra() {
  atura();  delay(150);
  enrere(); delay(350);
  atura();  delay(150);

  // AMPLIACIO 3: compta maniobres seguides sense avanc net
  maniobresSeguides++;
  if (maniobresSeguides >= MANIOBRES_ENCALLAT) {
    senyalEncallat();
    sortidaEncallament();
    return;
  }

  // AMPLIACIO 2: tria el costat mes lliure
  float dDreta = miraCostat(true);
  float dEsq   = miraCostat(false);
  if (dDreta >= dEsq) gira_dreta(); else gira_esquerra();
  delay(450);
  atura(); delay(150);
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (distancia() < DIST_MIN) {
    avancant = false;
    maniobra();
  } else {
    if (!avancant) {
      avancant = true;
      iniciAvanc = millis();   // comenca un possible avanc net
    }
    endavant();
    // AMPLIACIO 3: si porta prou temps avancant sense obstacles,
    // considerem que ja no esta encallat: comptador a zero i LED apagat
    if (millis() - iniciAvanc > T_AVANC_NET && maniobresSeguides > 0) {
      maniobresSeguides = 0;
      digitalWrite(LED, LOW);
    }
  }
  delay(30);
}
