/*
  Solucionari Repte SA3-B · Sensor d'aparcament (AMPLIAT)
  AMPLIACIO 1: la mesura ja esta encapsulada en la funcio mesuraDistancia().
  AMPLIACIO 2: tres trams (lluny / mig / a prop) amb avisos diferents.
  AMPLIACIO 3: avis proporcional: el ritme del bip augmenta com mes a prop.
  Circuit: HC-SR04 TRIG=12, ECHO=11 ; LED=8 ; piezo=6.
*/

const int TRIG = 12, ECHO = 11, LED = 8, PIEZO = 6;
const int LLUNY = 30;   // cm
const int PROP  = 10;   // cm

// AMPLIACIO 1: funcio de mesura (amb timeout + filtre sense-eco)
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  if (t == 0) return 400;
  return t * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT); pinMode(PIEZO, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();
  Serial.println(d);

  if (d > LLUNY) {
    // AMPLIACIO 2: tram lluny -> tot tranquil
    digitalWrite(LED, LOW);
    noTone(PIEZO);
    delay(60);
  } else if (d > PROP) {
    // AMPLIACIO 2 + 3: tram mig -> bips amb ritme proporcional a la distancia
    int interval = map((int)d, PROP, LLUNY, 100, 600);  // mes a prop -> mes rapid
    tone(PIEZO, 1500, 50);
    digitalWrite(LED, HIGH); delay(interval);
    digitalWrite(LED, LOW);  delay(interval);
  } else {
    // tram a prop -> avis continu
    digitalWrite(LED, HIGH);
    tone(PIEZO, 2500);
    delay(60);
  }
}
