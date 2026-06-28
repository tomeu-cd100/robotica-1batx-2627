/*
  Solucionari Repte SA1-C · Missatge en Morse (AMPLIAT)
  AMPLIACIO 1: el temps del punt es una variable i la ratlla se'n deriva (x3).
  AMPLIACIO 2: funcions punt() i ratlla() per compondre el missatge.
  AMPLIACIO 3: enviar unes inicials respectant les pauses entre lletres i paraules.
  Exemple: inicials "TC" (T = - ; C = -.-.). Canvia-les per les teves.
  Circuit: LED al pin 13 (o LED + 220 ohm a GND).
*/

const int LED = 13;

// AMPLIACIO 1: tot deriva del temps del punt
const int PUNT = 250;
const int RATLLA = PUNT * 3;
const int PAUSA_SENYAL = PUNT;       // entre punts/ratlles d'una lletra
const int PAUSA_LLETRA = PUNT * 3;   // entre lletres
const int PAUSA_PARAULA = PUNT * 7;  // entre paraules

// AMPLIACIO 2: funcions basiques
void punt()   { digitalWrite(LED, HIGH); delay(PUNT);   digitalWrite(LED, LOW); delay(PAUSA_SENYAL); }
void ratlla() { digitalWrite(LED, HIGH); delay(RATLLA); digitalWrite(LED, LOW); delay(PAUSA_SENYAL); }

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  // AMPLIACIO 3: inicials "TC"
  // T = -
  ratlla();
  delay(PAUSA_LLETRA);
  // C = -.-.
  ratlla(); punt(); ratlla(); punt();
  delay(PAUSA_PARAULA);   // fi del missatge, pausa de paraula abans de repetir
}
