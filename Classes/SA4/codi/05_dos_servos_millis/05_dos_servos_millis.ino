/*
  SA4 - 05_dos_servos_millis.ino  (mini-practica de temporitzacio NO bloquejant)

  Objectiu: moure dues articulacions "alhora" sense delay(). La base escombra
  a poc a poc d'un costat a l'altre mentre la pinca s'obre i es tanca cada
  segon. Amb delay() no es podria: mentre la pinca espera, la base s'aturaria.
  Aquest patro amb millis() es la base de la maquina d'estats de la SA6.

  Circuit: servo base=9, servo pinca=11 (piles + GND comu amb l'Arduino).
  Quan: S3 - bastida per a qui acaba aviat (prepara la SA6)
*/

#include <Servo.h>

const int BASE_MIN = 60;
const int BASE_MAX = 120;
const int PINCA_TANCADA = 60;
const int PINCA_OBERTA = 120;

const unsigned long PERIODE_BASE = 20;     // la base es mou 1 grau cada 20 ms
const unsigned long PERIODE_PINCA = 1000;  // la pinca canvia cada 1000 ms

Servo base;
Servo pinca;

int angleBase = 90;
int pas = 1;                 // +1 cap a BASE_MAX, -1 cap a BASE_MIN
bool pincaOberta = false;

unsigned long tBase = 0;     // ultim moviment de la base
unsigned long tPinca = 0;    // ultim canvi de la pinca

void setup() {
  base.attach(9);
  pinca.attach(11);
  base.write(angleBase);
  pinca.write(PINCA_TANCADA);
}

void loop() {
  unsigned long ara = millis();   // "cronometre" intern, no atura res

  // Tasca 1: la base escombra, un grau cada PERIODE_BASE
  if (ara - tBase >= PERIODE_BASE) {
    tBase = ara;
    angleBase = angleBase + pas;
    if (angleBase >= BASE_MAX || angleBase <= BASE_MIN) {
      pas = -pas;                 // arriba a un extrem: canvia de sentit
    }
    base.write(angleBase);
  }

  // Tasca 2: la pinca s'obre i es tanca, cada PERIODE_PINCA
  if (ara - tPinca >= PERIODE_PINCA) {
    tPinca = ara;
    pincaOberta = !pincaOberta;
    if (pincaOberta) {
      pinca.write(PINCA_OBERTA);
    } else {
      pinca.write(PINCA_TANCADA);
    }
  }
}
