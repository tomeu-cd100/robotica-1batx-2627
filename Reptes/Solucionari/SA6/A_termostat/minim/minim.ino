/*
  Solucionari Repte SA6-A · Termostat (REQUISIT MINIM)
  Llac tancat: llegeix la "temperatura" (NTC o potenciometre a A0) i activa una
  sortida (LED/ventilador a pin 9) segons una consigna.
  Circuit: sensor/pot -> A0 ; sortida -> pin 9. Valors al Monitor Serie.
*/

const int SENSOR = A0;
const int SORTIDA = 9;
const int CONSIGNA = 500;   // valor objectiu (lectura 0..1023)

void setup() {
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int t = analogRead(SENSOR);
  Serial.println(t);

  if (t > CONSIGNA) {
    digitalWrite(SORTIDA, HIGH);   // massa "calor" -> activa
  } else {
    digitalWrite(SORTIDA, LOW);
  }
  delay(100);
}
