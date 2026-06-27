/*
  Solucionari Repte SA2-C · Indicador de nivell (REQUISIT MINIM)
  4 LED que s'encenen progressivament segons un nivell (0..4).
  Aqui el nivell puja sol amb un comptador per demostrar-ho.
  Circuit: LEDs als pins 8, 9, 10, 11 (cada un amb 220 ohm a GND).
*/

const int LED1 = 8, LED2 = 9, LED3 = 10, LED4 = 11;
int nivell = 0;   // 0..4

void setup() {
  pinMode(LED1, OUTPUT); pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT); pinMode(LED4, OUTPUT);
}

void loop() {
  // Encen tants LED com indiqui el nivell
  digitalWrite(LED1, nivell >= 1 ? HIGH : LOW);
  digitalWrite(LED2, nivell >= 2 ? HIGH : LOW);
  digitalWrite(LED3, nivell >= 3 ? HIGH : LOW);
  digitalWrite(LED4, nivell >= 4 ? HIGH : LOW);

  delay(600);
  nivell++;
  if (nivell > 4) nivell = 0;   // torna a començar
}
