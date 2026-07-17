/*
  Solucionari Repte SA4-B · Ventilador/vehicle amb motor DC (AMPLIAT)
  AMPLIACIO 1: regula la velocitat amb PWM des d'un potenciometre.
  AMPLIACIO 2: canvi de sentit (endavant/enrere) amb el pont H i un polsador.
  AMPLIACIO 3: sequencia (accelera, mante, frena) amb funcions parametritzades.
  El loop executa la sequencia en bucle: el potenciometre fixa la velocitat
  objectiu de cada cicle (AMPLIACIO 1) i el polsador, premut mentre el motor
  esta aturat entre cicles, inverteix el sentit (AMPLIACIO 2).
  SEGURETAT: motor amb font EXTERNA i MASSA COMUNA.
  Circuit: ENA=5(PWM), IN1=7, IN2=8 ; potenciometre -> A0 ; polsador entre pin 2 i GND.
*/

const int ENA = 5, IN1 = 7, IN2 = 8;
const int POT = A0, POLSADOR = 2;
const int PAS = 5;         // increment de PWM a cada pas de rampa
const int TEMPS_PAS = 30;  // ms entre passos: rampa suau, sense salts audibles
bool endavantDir = true;
int velActual = 0;         // ultim PWM aplicat al motor

void aplica(bool dir, int velocitat) {
  digitalWrite(IN1, dir ? HIGH : LOW);
  digitalWrite(IN2, dir ? LOW : HIGH);
  analogWrite(ENA, velocitat);
}

// AMPLIACIO 3: rampa generica des de velActual fins a l'objectiu (puja o baixa).
// accelera(), mante() i frena() la comparteixen: cap codi duplicat.
void rampa(int objectiu, int pas, int tempsPas) {
  while (velActual != objectiu) {
    if (velActual < objectiu) velActual = min(velActual + pas, objectiu);
    else                      velActual = max(velActual - pas, objectiu);
    aplica(endavantDir, velActual);
    delay(tempsPas);
  }
}

// AMPLIACIO 3: les tres fases, com a funcions amb parametres
void accelera(int objectiu)           { rampa(objectiu, PAS, TEMPS_PAS); }
void mante(int velocitat, int durada) { rampa(velocitat, PAS, TEMPS_PAS); delay(durada); }
void frena(int objectiu)              { rampa(objectiu, PAS, TEMPS_PAS); }

// AMPLIACIO 2: amb el motor aturat, mante el polsador premut per invertir
// el sentit del cicle seguent (canviar de sentit en marxa castiga el pont H)
void actualitzaSentit() {
  if (digitalRead(POLSADOR) == LOW) { endavantDir = !endavantDir; delay(40); }
}

// AMPLIACIO 1: el potenciometre fixa la velocitat objectiu del cicle
int llegeixObjectiu() {
  return map(analogRead(POT), 0, 1023, 0, 255);
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
}

// AMPLIACIO 3: la sequencia completa, encadenada i llegible
void loop() {
  actualitzaSentit();            // AMPLIACIO 2
  accelera(llegeixObjectiu());   // AMPLIACIO 1 fixa l'objectiu
  mante(velActual, 1500);
  frena(0);
}
