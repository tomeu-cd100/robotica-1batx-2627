/*
  SA9 - Codi_base_PLANTILLA.ino
  Esquelet modular per comencar el projecte final.
  Idea: separar la PERCEPCIO (sensors), la DECISIO (control) i l'ACCIO (actuadors).
  Adapta els pins i omple les funcions segons el teu repte.
*/

// === PINS (AJUSTAR) ===
const int PIN_SENSOR = A0;     // exemple d'entrada
const int PIN_ACTUADOR = 9;    // exemple de sortida (PWM)

// === ESTAT DEL SISTEMA (si uses maquina d'estats) ===
enum Estat { INICI, FUNCIONANT, ATURAT };
Estat estat = INICI;

// --- PERCEPCIO: llegeix els sensors ---
int llegeixSensor() {
  return analogRead(PIN_SENSOR);
  // afegeix aqui mes sensors si cal
}

// --- DECISIO: logica de control ---
void decideix(int lectura) {
  // Exemple molt simple (substitueix per la teva logica):
  // - llac tancat / histeresi / maquina d'estats / control proporcional...
  switch (estat) {
    case INICI:
      // inicialitzacions o espera
      estat = FUNCIONANT;
      break;
    case FUNCIONANT:
      if (lectura > 600) actua(255);
      else actua(0);
      break;
    case ATURAT:
      actua(0);
      break;
  }
}

// --- ACCIO: mou els actuadors ---
void actua(int valor) {
  analogWrite(PIN_ACTUADOR, valor);
  // afegeix aqui mes actuadors si cal
}

void setup() {
  pinMode(PIN_ACTUADOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lectura = llegeixSensor();   // 1) percep
  decideix(lectura);               // 2) decideix
  // 3) actua() es crida des de decideix()

  Serial.println(lectura);         // per depurar / Serial Plotter
  delay(50);
}
