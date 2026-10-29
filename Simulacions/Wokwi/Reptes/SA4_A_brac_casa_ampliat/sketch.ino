/*
  Solucionari Repte SA4-A · Brac amb boto de casa (AMPLIAT)
  AMPLIACIO 1: la tornada a casa es SUAU (un grau cada 15 ms a cada servo).
  AMPLIACIO 2: el boto es un COMMUTADOR amb antirebot: una premuda envia el
               brac a casa i s'hi queda; una altra el torna als potenciometres.
  AMPLIACIO 3: LED d'estat (ences = mode casa). L'estat viu en UNA variable
               (modeCasa) i el LED es pinta a partir d'ella.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3; polsador D3-GND;
           LED amb 220 ohm al D5.
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

const int BOTO_CASA = 3;
const int LED_CASA = 5;

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

const int CASA_BASE = 90, CASA_ESQUERRE = 90, CASA_DRET = 90, CASA_PINCA = PINCA_MIN;

const unsigned long PAS_SUAU = 15;   // ms per grau
const unsigned long ANTIREBOT = 50;  // ms

// Angle actual de cada servo (cal saber-lo per moure'l a poc a poc)
int aBase = CASA_BASE, aEsquerre = CASA_ESQUERRE, aDret = CASA_DRET, aPinca = CASA_PINCA;

bool modeCasa = false;               // AMPLIACIO 3: l'unic estat del sistema
int lecturaAnterior = HIGH;
unsigned long tCanvi = 0;
unsigned long tPas = 0;

// AMPLIACIO 1: acosta un angle un grau cap al seu objectiu
int acosta(int actual, int objectiu) {
  if (actual < objectiu) return actual + 1;
  if (actual > objectiu) return actual - 1;
  return actual;
}

void escriuTots() {
  base.write(aBase);
  esquerre.write(aEsquerre);
  dret.write(aDret);
  pinca.write(aPinca);
}

// AMPLIACIO 2: detecta la PREMUDA (flanc HIGH -> LOW) amb antirebot
bool hiHaPremuda() {
  int lectura = digitalRead(BOTO_CASA);
  bool premuda = false;
  if (lectura != lecturaAnterior && millis() - tCanvi > ANTIREBOT) {
    tCanvi = millis();
    if (lectura == LOW) premuda = true;
    lecturaAnterior = lectura;
  }
  return premuda;
}

void setup() {
  pinMode(BOTO_CASA, INPUT_PULLUP);
  pinMode(LED_CASA, OUTPUT);
  escriuTots();
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
}

void loop() {
  if (hiHaPremuda()) {
    modeCasa = !modeCasa;
  }
  digitalWrite(LED_CASA, modeCasa);   // el LED surt de l'estat, no del boto

  if (modeCasa) {
    if (millis() - tPas >= PAS_SUAU) {
      tPas = millis();
      aBase = acosta(aBase, CASA_BASE);
      aEsquerre = acosta(aEsquerre, CASA_ESQUERRE);
      aDret = acosta(aDret, CASA_DRET);
      aPinca = acosta(aPinca, CASA_PINCA);
      escriuTots();
    }
  } else {
    aBase = map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX);
    aDret = map(analogRead(A1), 0, 1023, DRET_MIN, DRET_MAX);
    aPinca = map(analogRead(A2), 0, 1023, PINCA_MIN, PINCA_MAX);
    aEsquerre = map(analogRead(A3), 0, 1023, ESQUERRE_MIN, ESQUERRE_MAX);
    escriuTots();
  }
}
