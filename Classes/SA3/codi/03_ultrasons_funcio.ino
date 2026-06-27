/*
  SA3 - 03_ultrasons_funcio.ino
  Sensor d'ultrasons HC-SR04. Aprenem a escriure una FUNCIO que retorna un valor.
  Circuit: TRIG=12, ECHO=11, VCC=5V, GND=GND.
  Visualitza la distancia amb el Serial Plotter (Eines > Serial Plotter).
*/

const int TRIG = 12;
const int ECHO = 11;

// Funcio propia: mesura i RETORNA la distancia en cm
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long temps = pulseIn(ECHO, HIGH);   // temps de l'eco en us
  float dist = temps * 0.034 / 2.0;   // cm (velocitat del so ~0.034 cm/us)
  return dist;
}

// REPTE resolt: mitjana de 3 mesures (filtre simple)
float distanciaMitjana() {
  float suma = 0;
  for (int i = 0; i < 3; i++) {
    suma += mesuraDistancia();
    delay(20);
  }
  return suma / 3.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

void loop() {
  float d = distanciaMitjana();
  Serial.println(d);     // una sola dada per linia: ideal per al Serial Plotter
  delay(100);
}
