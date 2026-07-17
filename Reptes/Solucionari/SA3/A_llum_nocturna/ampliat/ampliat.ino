/*
  Solucionari Repte SA3-A · Llum automatica nocturna (AMPLIAT)
  AMPLIACIO 1: calibratge del llindar observant valors al Monitor Serie.
  AMPLIACIO 2: histeresi (dos llindars) per evitar parpellejos al capvespre.
  AMPLIACIO 3: brillantor del LED amb PWM segons la foscor (mes fosc -> mes llum).
  Circuit: LDR en divisor amb 10k -> A0 ; LED al pin 9 (~PWM) + 220 ohm a GND.
*/

const int LDR = A0;
const int LED = 9;

// AMPLIACIO 2: histeresi
const int LLINDAR_FOSC = 350;   // per sota: encen
const int LLINDAR_CLAR = 450;   // per sobre: apaga
bool ences = false;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);   // AMPLIACIO 1: per calibrar els llindars
}

void loop() {
  int llum = analogRead(LDR);

  // AMPLIACIO 3: com mes fosc (llum baixa), mes brillantor
  int brillantor = map(llum, 0, LLINDAR_FOSC, 255, 0);
  brillantor = constrain(brillantor, 0, 255);   // sempre dins 0-255

  // AMPLIACIO 1 + 3: lectura crua i brillantor calculada pel Monitor Serie
  // (comprova que la brillantor no surt mai de 0-255 gracies a constrain)
  Serial.print("llum=");
  Serial.print(llum);
  Serial.print("  brillantor=");
  Serial.println(brillantor);

  // AMPLIACIO 2: decisio amb histeresi
  if (!ences && llum < LLINDAR_FOSC) ences = true;
  else if (ences && llum > LLINDAR_CLAR) ences = false;

  if (ences) {
    analogWrite(LED, brillantor);
  } else {
    analogWrite(LED, 0);
  }
  delay(100);
}
