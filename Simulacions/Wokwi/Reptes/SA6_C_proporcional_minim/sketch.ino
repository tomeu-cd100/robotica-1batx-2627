/*
  Solucionari Repte SA6-C · Regulador proporcional (REQUISIT MINIM)
  La sortida (PWM) es proporcional a l'error respecte d'una consigna.
  Exemple: mantenir el nivell de llum (LDR a A0) a prop d'una consigna ajustant un LED.
  Circuit: LDR en divisor amb 10k -> A0 ; LED al pin 9 (~PWM) + 220 ohm.
*/

const int SENSOR = A0;
const int SORTIDA = 9;
const int CONSIGNA = 500;     // valor objectiu (0..1023)
const float Kp = 0.8;         // constant proporcional

void setup() {
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int v = analogRead(SENSOR);
  int error = CONSIGNA - v;             // com de lluny estem de l'objectiu
  int sortida = (int)(Kp * error);
  sortida = constrain(sortida, 0, 255); // rang valid de PWM
  analogWrite(SORTIDA, sortida);

  // Per al Serial Plotter: consigna, lectura i sortida
  Serial.print(CONSIGNA); Serial.print(" ");
  Serial.print(v);        Serial.print(" ");
  Serial.println(sortida);
  delay(50);
}
