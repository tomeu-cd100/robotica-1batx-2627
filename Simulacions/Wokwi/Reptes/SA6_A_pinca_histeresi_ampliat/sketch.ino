/*
  Solucionari Repte SA6-A · Pinca automatica amb LED d'estat (AMPLIAT)
  AMPLIACIO 1: la FINESTRA d'histeresi es regula amb un potenciometre (A0):
               OBRE_CM va de TANCA_CM + 1 a TANCA_CM + 12.
  AMPLIACIO 2: FILTRE de soroll: mitjana de 5 mesures de l'ultrasons.
  AMPLIACIO 3: COMPTA les peces agafades i ho mostra al Monitor serie.
  Circuit: servo pinca=11 (piles + GND comu); ultrasons TRIG=7, ECHO=8;
           LED (220 ohm) al D5; potenciometre a A0.
*/

#include <Servo.h>

const int TRIG = 7, ECHO = 8;
const int LED_ESTAT = 5;
const int TANCA_CM = 6;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

Servo pinca;
bool pincaTancada = false;
int peces = 0;

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);
  if (temps == 0) return 400;
  return temps * 0.034 / 2.0;
}

// AMPLIACIO 2: mitjana de 5 mesures (el soroll es compensa)
float distanciaFiltrada() {
  float suma = 0;
  for (int i = 0; i < 5; i++) {
    suma += mesuraDistancia();
    delay(10);
  }
  return suma / 5.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED_ESTAT, OUTPUT);
  pinca.write(PINCA_OBERTA);
  pinca.attach(11);
  Serial.begin(9600);
}

void loop() {
  // AMPLIACIO 1: el llindar alt surt del potenciometre
  int obreCm = map(analogRead(A0), 0, 1023, TANCA_CM + 1, TANCA_CM + 12);
  float d = distanciaFiltrada();

  if (!pincaTancada && d < TANCA_CM) {
    pincaTancada = true;
    pinca.write(PINCA_TANCADA);
    peces++;                                // AMPLIACIO 3
    Serial.print("Peca agafada. Total: ");
    Serial.println(peces);
  } else if (pincaTancada && d > obreCm) {
    pincaTancada = false;
    pinca.write(PINCA_OBERTA);
  }
  digitalWrite(LED_ESTAT, pincaTancada);
  delay(10);
}
