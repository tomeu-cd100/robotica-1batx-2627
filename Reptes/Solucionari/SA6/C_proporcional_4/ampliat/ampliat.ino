/*
  Solucionari Repte SA6-C · Moviment proporcional a les 4 articulacions (AMPLIAT)
  AMPLIACIO 1: totes les articulacions ARRIBEN ALHORA: el pas de cada una
               s'escala segons l'error mes gran de les quatre.
  AMPLIACIO 2: VELOCITAT MAXIMA: cap articulacio es mou mes de PAS_MAX graus
               per volta, encara que l'error sigui enorme.
  AMPLIACIO 3: el polsador A canvia K entre 0.05, 0.1 i 0.3, i el Serial
               Plotter mostra les 4 posicions.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3; polsador A D3-GND.
*/

#include <Servo.h>

const int BOTO_A = 3;
const float PAS_MAX = 3.0;                     // graus per volta (AMPLIACIO 2)
const float VALORS_K[3] = {0.05, 0.1, 0.3};
const int PINS_SERVO[4] = {9, 6, 10, 11};      // base, esquerre, dret, pinca
const int PINS_POT[4]   = {A0, A3, A1, A2};
const int MINIM[4] = {0, 40, 40, 60};
const int MAXIM[4] = {180, 150, 150, 120};

Servo servos[4];
float angle[4] = {90, 90, 90, 90};
int quinaK = 1;
int anteriorA = HIGH;

void setup() {
  pinMode(BOTO_A, INPUT_PULLUP);
  for (int i = 0; i < 4; i++) {
    servos[i].write((int)angle[i]);
    servos[i].attach(PINS_SERVO[i]);
  }
  Serial.begin(9600);
}

void loop() {
  // AMPLIACIO 3: una premuda = la K seguent
  int a = digitalRead(BOTO_A);
  if (a == LOW && anteriorA == HIGH) quinaK = (quinaK + 1) % 3;
  anteriorA = a;
  float K = VALORS_K[quinaK];

  float error[4];
  float errorMax = 0;
  for (int i = 0; i < 4; i++) {
    int consigna = map(analogRead(PINS_POT[i]), 0, 1023, MINIM[i], MAXIM[i]);
    error[i] = consigna - angle[i];
    errorMax = max(errorMax, abs(error[i]));
  }

  if (errorMax > 0.5) {
    // AMPLIACIO 1: l'articulacio mes llunyana fa el pas proporcional;
    // les altres, la mateixa FRACCIO del seu error (arriben alhora)
    float pasGran = constrain(K * errorMax, 0, PAS_MAX);   // AMPLIACIO 2
    float fraccio = pasGran / errorMax;
    for (int i = 0; i < 4; i++) {
      angle[i] = angle[i] + fraccio * error[i];
      servos[i].write((int)(angle[i] + 0.5));
    }
  }

  for (int i = 0; i < 4; i++) {
    Serial.print(angle[i]);
    Serial.print(i < 3 ? " " : "\n");
  }
  delay(20);
}
