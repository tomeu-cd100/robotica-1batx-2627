/*
  Solucionari Repte SA3-B · Sensor d'aparcament (REQUISIT MINIM)
  Mesura la distancia amb ultrasons i encen un LED quan estas per sota d'una distancia.
  Circuit: HC-SR04 TRIG=12, ECHO=11 ; LED=8 (+220 ohm a GND).
  La distancia es veu al Monitor Serie.
*/

const int TRIG = 12, ECHO = 11, LED = 8;
const int DIST_AVIS = 15;   // cm

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms
  if (t == 0) return 400;                // sense eco: fora de rang
  return t * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();
  Serial.println(d);

  digitalWrite(LED, (d < DIST_AVIS) ? HIGH : LOW);
  delay(60);
}
