/*
  SA3 - 02_potenciometre_ldr.ino
  Entrades analogiques: potenciometre (A0) i LDR (A1).
  - El potenciometre regula la intensitat d'un LED (PWM, pin 9).
  - La LDR encen el LED si fa fosc (llum automatic) - repte resolt amb llindar.
  Circuit: pot. cursor -> A0 ; LDR en divisor amb 10k -> A1 ; LED pin 9 (~).
*/

const int POT = A0;
const int LDR = A1;
const int LED = 9;        // pin PWM

int llindar = 400;        // per sota d'aquest valor de LDR, considerem "fosc"

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int valorPot = analogRead(POT);   // 0..1023
  int valorLdr = analogRead(LDR);   // 0..1023

  // Opcio A: regular intensitat amb el potenciometre
  int brillantor = map(valorPot, 0, 1023, 0, 255);
  analogWrite(LED, brillantor);

  // Mostra les lectures al monitor serie (Eines > Serial Monitor)
  Serial.print("POT: ");  Serial.print(valorPot);
  Serial.print("  LDR: "); Serial.println(valorLdr);

  delay(100);
}

/*
  REPTE (llum automatic): substitueix el contingut de loop() per aixo
  per encendre el LED al maxim quan fa fosc:

  int valorLdr = analogRead(LDR);
  if (valorLdr < llindar) {
    analogWrite(LED, 255);   // fa fosc -> llum encesa
  } else {
    analogWrite(LED, 0);     // hi ha llum -> apagada
  }
*/
