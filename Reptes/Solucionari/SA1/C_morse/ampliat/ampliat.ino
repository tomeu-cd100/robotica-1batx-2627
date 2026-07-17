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
const int PAUSA_SENYAL = PUNT;       // 1 unitat entre punts/ratlles d'una lletra
// punt() i ratlla() ja acaben amb PAUSA_SENYAL (1 unitat): les pauses
// addicionals son de 2 i 6 unitats perque els TOTALS siguin 3 i 7.
const int PAUSA_LLETRA = PUNT * 2;   // + 1 del final del simbol = 3 unitats totals
const int PAUSA_PARAULA = PUNT * 6;  // + 1 del final del simbol = 7 unitats totals

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
  delay(PAUSA_LLETRA);    // total 3 unitats (ja portem 1 unitat del final del simbol)
  // C = -.-.
  ratlla(); punt(); ratlla(); punt();
  delay(PAUSA_PARAULA);   // total 7 unitats entre repeticions (idem: ja en portem 1)
}
