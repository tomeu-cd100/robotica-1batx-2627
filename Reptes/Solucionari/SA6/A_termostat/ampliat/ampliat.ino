/*
  Solucionari Repte SA6-A · Termostat (AMPLIAT)
  AMPLIACIO 1: histeresi (dos llindars per mode) per evitar oscil-lacions.
  AMPLIACIO 2: consigna ajustable amb un potenciometre.
  AMPLIACIO 3: dos modes (fred/calor) amb maquina d'estats i commutacio AUTOMATICA.
    Diagrama d'estats (fita 1, dibuixa'l tambe en paper):
      REPOS -> CALOR  si t < consigna - MARGE   (fa massa fred: escalfa)
      REPOS -> FRED   si t > consigna + MARGE   (fa massa calor: refreda)
      CALOR -> REPOS  si t >= consigna          (histeresi del mode calor)
      FRED  -> REPOS  si t <= consigna          (histeresi del mode fred)
    Banda morta (fita 3): entre consigna-MARGE i consigna+MARGE cap actuador
    s'encen; per passar de calor a fred cal travessar TOTA la banda, per tant
    mai s'encenen tots dos ni oscil-la al voltant del canvi.
  Circuit: sensor -> A0 ; potenciometre consigna -> A1 ;
           calefactor (LED vermell) -> pin 9 ; ventilador (LED blau) -> pin 10.
*/

const int SENSOR = A0, POT = A1;
const int CALEFACTOR = 9, VENTILADOR = 10;
const int MARGE = 40;   // meitat de la banda morta (consigna +/- MARGE)

// AMPLIACIO 3: estats de la maquina (un estat = un actuador com a molt)
enum Estat { REPOS, CALOR, FRED };
Estat estat = REPOS;

void setup() {
  pinMode(CALEFACTOR, OUTPUT);
  pinMode(VENTILADOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int t = analogRead(SENSOR);
  int consigna = analogRead(POT);   // AMPLIACIO 2: consigna variable

  // AMPLIACIO 3: transicions automatiques segons la temperatura
  switch (estat) {
    case REPOS:
      if (t < consigna - MARGE) estat = CALOR;       // massa fred -> escalfa
      else if (t > consigna + MARGE) estat = FRED;   // massa calor -> refreda
      break;
    case CALOR:
      // AMPLIACIO 1 (fita 2): histeresi del mode calor amb dos llindars:
      // arrenca a consigna-MARGE (transicio des de REPOS), s'atura a la consigna
      if (t >= consigna) estat = REPOS;
      break;
    case FRED:
      // histeresi del mode fred: arrenca a consigna+MARGE, s'atura a la consigna
      if (t <= consigna) estat = REPOS;
      break;
  }

  // Sortides: cada estat encen com a molt UN actuador (mai tots dos)
  digitalWrite(CALEFACTOR, estat == CALOR ? HIGH : LOW);
  digitalWrite(VENTILADOR, estat == FRED ? HIGH : LOW);

  Serial.print("estat=");
  Serial.print(estat == CALOR ? "CALOR" : (estat == FRED ? "FRED" : "REPOS"));
  Serial.print(" t="); Serial.print(t);
  Serial.print(" consigna="); Serial.println(consigna);
  delay(100);
}
