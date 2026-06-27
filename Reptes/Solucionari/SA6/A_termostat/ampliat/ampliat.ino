/*
  Solucionari Repte SA6-A · Termostat (AMPLIAT)
  AMPLIACIO 1: histeresi (arrenca a X, atura a X-marge) per evitar oscil-lacions.
  AMPLIACIO 2: consigna ajustable amb un potenciometre.
  AMPLIACIO 3: dos modes (fred/calor) amb una maquina d'estats senzilla.
  Circuit: sensor -> A0 ; potenciometre consigna -> A1 ; sortida -> pin 9 ;
           selector de mode: polsador entre pin 2 i GND.
*/

const int SENSOR = A0, POT = A1, SORTIDA = 9, POLSADOR = 2;
const int MARGE = 40;        // amplada de la histeresi
bool actiu = false;

enum Mode { CALOR, FRED };   // AMPLIACIO 3
Mode mode = CALOR;
int estatAnterior = HIGH;

void setup() {
  pinMode(SORTIDA, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int t = analogRead(SENSOR);
  int consigna = analogRead(POT);   // AMPLIACIO 2: consigna variable

  // AMPLIACIO 3: el polsador canvia de mode
  int estat = digitalRead(POLSADOR);
  if (estat == LOW && estatAnterior == HIGH) { mode = (mode == CALOR) ? FRED : CALOR; delay(40); }
  estatAnterior = estat;

  // AMPLIACIO 1: histeresi (la direccio depen del mode)
  if (mode == CALOR) {                 // refrigeracio: activa si fa massa calor
    if (!actiu && t > consigna + MARGE) actiu = true;
    else if (actiu && t < consigna - MARGE) actiu = false;
  } else {                             // calefaccio: activa si fa massa fred
    if (!actiu && t < consigna - MARGE) actiu = true;
    else if (actiu && t > consigna + MARGE) actiu = false;
  }

  digitalWrite(SORTIDA, actiu ? HIGH : LOW);

  Serial.print("mode="); Serial.print(mode == CALOR ? "CALOR" : "FRED");
  Serial.print(" t="); Serial.print(t);
  Serial.print(" consigna="); Serial.print(consigna);
  Serial.print(" actiu="); Serial.println(actiu);
  delay(100);
}
