/*
  SA4 - 05_dos_leds_millis.ino  (mini-practica de temporitzacio NO bloquejant)

  Objectiu: fer dues coses "alhora" sense delay(). Dos LEDs parpellegen a
  ritmes diferents. Amb delay() no es podria, perque delay() ATURA tot.
  Aquest patro amb millis() es la base de la maquina d'estats de la SA6.

  Munta: LED al pin 7 i LED al pin 8 (amb la seva resistencia).
*/

const int LED_A = 7;
const int LED_B = 8;

const unsigned long PERIODE_A = 250;   // LED A: canvia cada 250 ms
const unsigned long PERIODE_B = 1000;  // LED B: canvia cada 1000 ms

unsigned long tA = 0;   // ultim canvi del LED A
unsigned long tB = 0;   // ultim canvi del LED B
bool encesA = false;
bool encesB = false;

void setup() {
  pinMode(LED_A, OUTPUT);
  pinMode(LED_B, OUTPUT);
}

void loop() {
  unsigned long ara = millis();   // "cronometre" intern, no atura res

  // LED A: ha passat el seu periode?
  if (ara - tA >= PERIODE_A) {
    tA = ara;
    encesA = !encesA;             // inverteix l'estat
    digitalWrite(LED_A, encesA);
  }

  // LED B: ha passat el SEU periode (diferent)?
  if (ara - tB >= PERIODE_B) {
    tB = ara;
    encesB = !encesB;
    digitalWrite(LED_B, encesB);
  }

  // El loop no s'atura mai: per aixo els dos LEDs poden anar a ritmes diferents.
}
