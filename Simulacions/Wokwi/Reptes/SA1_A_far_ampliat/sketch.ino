/*
  Solucionari Repte SA1-A · Far costaner (AMPLIAT)
  AMPLIACIO 1: temps en variables (patro facil de canviar).
  AMPLIACIO 2: dos patrons combinats (una llum llarga + 3 flaixos curts) amb un for.
  AMPLIACIO 3: segon far amb ritme propi i SIMULTANI (amb millis(), sense delay).
  Circuit: FAR principal pin 13 ; FAR secundari pin 12 (+220 ohm a GND).
*/

const int FAR  = 13;
const int FAR2 = 12;

// AMPLIACIO 1: temps parametritzats
const int T_LLARG = 2000;
const int T_CURT  = 200;
const int T_PAUSA = 400;

// AMPLIACIO 3: control no bloquejant del segon far
unsigned long tFar2 = 0;
const unsigned long INTERVAL_FAR2 = 250;  // ritme propi del far secundari
bool estatFar2 = false;

void actualitzaFar2() {
  // Parpelleja el FAR2 amb el seu ritme sense aturar el programa
  if (millis() - tFar2 >= INTERVAL_FAR2) {
    tFar2 = millis();
    estatFar2 = !estatFar2;
    digitalWrite(FAR2, estatFar2);
  }
}

// Encen el far principal un temps mantenint viu el far secundari
void encenFar(int durada) {
  unsigned long inici = millis();
  digitalWrite(FAR, HIGH);
  while (millis() - inici < (unsigned long)durada) actualitzaFar2();
  digitalWrite(FAR, LOW);
}

void pausaFar(int durada) {
  unsigned long inici = millis();
  while (millis() - inici < (unsigned long)durada) actualitzaFar2();
}

void setup() {
  pinMode(FAR, OUTPUT);
  pinMode(FAR2, OUTPUT);
}

void loop() {
  // AMPLIACIO 2: una llum llarga + 3 flaixos curts
  encenFar(T_LLARG); pausaFar(T_PAUSA);
  for (int i = 0; i < 3; i++) {
    encenFar(T_CURT); pausaFar(T_PAUSA);
  }
}
