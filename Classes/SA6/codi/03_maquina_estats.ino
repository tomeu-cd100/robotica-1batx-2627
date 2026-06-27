/*
  SA6 - 03_maquina_estats.ino
  Maquina d'estats finits amb enum + switch.
  Exemple: procés de 4 estats (ESPERA -> FASE1 -> FASE2 -> FET) que avança
  amb un polsador (pin 2) i amb temps. LEDs d'estat als pins 7 i 8, sortida 9.
  No fa servir delay llargs: usa millis() per no bloquejar.
*/

const int POLSADOR = 2;
const int LED_VERD = 7;
const int LED_VERMELL = 8;
const int SORTIDA = 9;

enum Estat { ESPERA, FASE1, FASE2, FET };
Estat estat = ESPERA;

unsigned long tEstat = 0;   // marca de temps d'entrada a l'estat

void canviaEstat(Estat nou) {
  estat = nou;
  tEstat = millis();
}

bool polsat() {
  // true nomes en el moment de premer (lectura simple)
  return digitalRead(POLSADOR) == LOW;
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
      digitalWrite(LED_VERMELL, HIGH);
      digitalWrite(LED_VERD, LOW);
      analogWrite(SORTIDA, 0);
      if (polsat()) { canviaEstat(FASE1); delay(250); }  // arrenca en premer
      break;

    case FASE1:
      digitalWrite(LED_VERMELL, LOW);
      digitalWrite(LED_VERD, HIGH);
      analogWrite(SORTIDA, 120);
      if (millis() - tEstat > 3000) canviaEstat(FASE2);  // 3 s
      break;

    case FASE2:
      analogWrite(SORTIDA, 255);
      if (millis() - tEstat > 3000) canviaEstat(FET);    // 3 s
      break;

    case FET:
      analogWrite(SORTIDA, 0);
      // parpelleig del verd per indicar final
      digitalWrite(LED_VERD, (millis() / 300) % 2);
      if (polsat()) { canviaEstat(ESPERA); delay(250); }
      break;
  }
}
