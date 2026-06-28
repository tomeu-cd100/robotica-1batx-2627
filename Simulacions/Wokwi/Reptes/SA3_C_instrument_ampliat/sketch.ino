/*
  Solucionari Repte SA3-C · Instrument/comptador interactiu (AMPLIAT)
  Combina les DUES entrades del repte (potenciometre + polsador):
  AMPLIACIO 1: mostra valor i recompte clars al Monitor Serie.
  AMPLIACIO 2: map() del potenciometre a un rang util (0..255 de PWM).
  AMPLIACIO 3: combina dues entrades -> mini-instrument:
     - el potenciometre regula la brillantor d'un LED,
     - el polsador (amb debounce) compta premudes i les mostra.
  Circuit: POT cursor -> A0 ; LED al pin 9 (~PWM) ; polsador entre pin 2 i GND.
*/

const int POT = A0;
const int LED = 9;
const int POLSADOR = 2;

int comptador = 0;
int estatAnterior = HIGH;
unsigned long ultimCanvi = 0;
const unsigned long ANTIREBOT = 40;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  // AMPLIACIO 2: potenciometre -> brillantor (map a 0..255)
  int brillantor = map(analogRead(POT), 0, 1023, 0, 255);
  analogWrite(LED, brillantor);

  // AMPLIACIO 3: polsador amb debounce que compta
  int estat = digitalRead(POLSADOR);
  if (estat != estatAnterior && (millis() - ultimCanvi) > ANTIREBOT) {
    ultimCanvi = millis();
    if (estat == LOW) {                 // premuda
      comptador++;
      // AMPLIACIO 1: recompte i valor al Serial
      Serial.print("Premudes: "); Serial.print(comptador);
      Serial.print("  Brillantor: "); Serial.println(brillantor);
    }
    estatAnterior = estat;
  }
}
