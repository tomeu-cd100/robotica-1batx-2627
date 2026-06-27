/*
  SA3 - 01_polsador_debounce.ino
  Entrada digital amb pull-up intern + antirebot (debounce). Compta premudes.
  Circuit: polsador entre pin 2 i GND. (Opcional) LED al pin 8.
  Amb INPUT_PULLUP: en repos = HIGH, en premer = LOW.
*/

const int POLSADOR = 2;
const int LED = 8;

int comptador = 0;
int estatAnterior = HIGH;          // en repos esta a HIGH
unsigned long ultimCanvi = 0;
const unsigned long ANTIREBOT = 40;  // ms

void setup() {
  pinMode(POLSADOR, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int estat = digitalRead(POLSADOR);

  // Detecta el canvi HIGH -> LOW (premuda) amb antirebot
  if (estat != estatAnterior && (millis() - ultimCanvi) > ANTIREBOT) {
    ultimCanvi = millis();
    if (estat == LOW) {            // s'acaba de premer
      comptador++;
      Serial.print("Premudes: ");
      Serial.println(comptador);
      digitalWrite(LED, !digitalRead(LED));  // mode toggle del LED
    }
    estatAnterior = estat;
  }
}
