/*
  Solucionari Repte SA7-A · Robot repartidor (AMPLIAT)
  AMPLIACIO 1: circuit tancat tornant al punt inicial (el quadrat es un cas particular).
  AMPLIACIO 2: temps de gir CALIBRABLES perque els angles siguin precisos.
  AMPLIACIO 3: ruta amb diverses parades senyalitzades amb un LED.
    La ruta es DADES, no codi duplicat: una TAULA de trams (accio + durada)
    que el programa recorre. Per canviar la ruta, nomes cal editar la taula.
  === PINS (AJUSTAR segons el manual de la Imagina 3dBot) ===
*/

const int ESQ_DIR = 4, ESQ_VEL = 5, DRET_DIR = 7, DRET_VEL = 6;   // <-- AJUSTAR
const int LED = 13;     // AMPLIACIO 3: indicador de parada
const int VEL = 180;

const int T_GIR_90 = 600;   // AMPLIACIO 2: CALIBRAR fins que el gir sigui de 90 graus
const int T_GIR_45 = 300;   // AMPLIACIO 2: aprox. la meitat del de 90 (calibrar tambe)

// AMPLIACIO 3: cada tram es una ACCIO i una DURADA en ms.
// Accions: 'R' = recte, 'D' = gir a la dreta, 'E' = gir a l'esquerra,
//          'P' = parada amb senyal LED (la durada s'ignora).
struct Tram {
  char accio;
  int durada;
};

// AMPLIACIO 3: la RUTA com a dades. Trams diversos: rectes de durades
// diferents, girs a banda i banda i 3 parades senyalitzades.
// AMPLIACIO 1: un quadrat seria simplement 4 cops { {'R',1200}, {'D',T_GIR_90} }.
const Tram RUTA[] = {
  {'R', 1500},        // recta llarga fins a la parada 1
  {'P', 0},           // parada 1 (senyal LED)
  {'D', T_GIR_90},
  {'R', 700},         // recta curta
  {'E', T_GIR_45},
  {'R', 1000},        // recta mitjana fins a la parada 2
  {'P', 0},           // parada 2
  {'D', T_GIR_90},
  {'D', T_GIR_45},    // els girs es poden encadenar (90 + 45 = 135 graus)
  {'R', 1200},
  {'P', 0}            // parada 3 (punt final)
};
const int N_TRAMS = sizeof(RUTA) / sizeof(RUTA[0]);

void motors(int dE, int vE, int dD, int vD) {
  digitalWrite(ESQ_DIR, dE); analogWrite(ESQ_VEL, vE);
  digitalWrite(DRET_DIR, dD); analogWrite(DRET_VEL, vD);
}
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW, VEL); }
void gira_esquerra() { motors(LOW, VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

void parada() {
  // AMPLIACIO 3: marca una parada amb el LED
  atura();
  digitalWrite(LED, HIGH); delay(600); digitalWrite(LED, LOW);
  delay(200);
}

// AMPLIACIO 3: executa UN tram de la taula.
// El codi de moviment NO es duplica: nomes hi ha una versio de cada accio.
void executaTram(char accio, int durada) {
  if (accio == 'R') {
    endavant(); delay(durada);
  } else if (accio == 'D') {
    gira_dreta(); delay(durada);       // AMPLIACIO 2 (temps calibrat)
  } else if (accio == 'E') {
    gira_esquerra(); delay(durada);    // AMPLIACIO 2 (temps calibrat)
  } else if (accio == 'P') {
    parada();
    return;
  }
  atura(); delay(200);
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT); pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(LED, OUTPUT);
  delay(1000);

  // AMPLIACIO 3: el programa nomes RECORRE la taula; la ruta son dades
  for (int i = 0; i < N_TRAMS; i++) {
    executaTram(RUTA[i].accio, RUTA[i].durada);
  }
  atura();
}

void loop() {
}
