/*
  Solucionari Repte SA3-C · Instrument/comptador interactiu (REQUISIT MINIM)
  Opcio escollida: un potenciometre controla la brillantor d'un LED.
  (L'altra opcio, polsador amb debounce que compta, esta a la versio ampliada.)
  Circuit: potenciometre cursor -> A0 ; LED al pin 9 (~PWM) + 220 ohm a GND.
*/

const int POT = A0;
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int valor = analogRead(POT);            // 0..1023
  int brillantor = map(valor, 0, 1023, 0, 255);
  analogWrite(LED, brillantor);
  Serial.println(brillantor);
  delay(50);
}
