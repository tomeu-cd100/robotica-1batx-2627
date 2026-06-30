/*
  SA6 - 03_maquina_estats_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

  El patro dificil ja esta muntat: enum d'estats, switch, i temporitzacio
  NO bloquejant amb millis() (com a 05_dos_leds_millis.ino de la SA4).
  Tu nomes has d'OMPLIR els // TODO: que fa cada estat i quan canvia.

  Munta: polsador al pin 2 (INPUT_PULLUP), LEDs als pins 7 i 8, sortida al 9.
*/

const int POLSADOR = 2;
const int LED_VERD = 7;
const int LED_VERMELL = 8;
const int SORTIDA = 9;

// Pots afegir o treure estats segons el teu proces.
enum Estat { ESPERA, FASE1, FASE2, FET };
Estat estat = ESPERA;

unsigned long tEstat = 0;   // moment d'entrada a l'estat actual

void canviaEstat(Estat nou) {
  estat = nou;
  tEstat = millis();        // reinicia el "cronometre" de l'estat
}

bool polsat() {
  return digitalRead(POLSADOR) == LOW;
}

// Quants ms portem dins de l'estat actual (patro no bloquejant).
unsigned long tempsEnEstat() {
  return millis() - tEstat;
}

void setup() {
  pinMode(POLSADOR, INPUT_PULLUP);
  pinMode(LED_VERD, OUTPUT);
  pinMode(LED_VERMELL, OUTPUT);
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  switch (estat) {

    case ESPERA:
      // TODO: que ha de fer el sistema mentre espera? (LEDs, sortida)
      // TODO: quan ha de passar a FASE1? (p. ex. if (polsat()) canviaEstat(FASE1);)
      break;

    case FASE1:
      // TODO: comportament de FASE1
      // TODO: transicio per TEMPS -> if (tempsEnEstat() > 3000) canviaEstat(FASE2);
      break;

    case FASE2:
      // TODO: comportament de FASE2 i transicio cap a FET
      break;

    case FET:
      // TODO: indica que ha acabat; torna a ESPERA si es torna a polsar
      break;
  }
}
