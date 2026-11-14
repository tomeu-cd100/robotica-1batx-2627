/*
  SA3 - 02_potenciometre_ldr.ino
  Entrades analogiques: potenciometre (A0) i LDR (A1).
  - El potenciometre regula la intensitat d'un LED (PWM, pin 9).
  - La LDR encen el LED si fa fosc (llum automatic) - repte resolt amb llindar.
  Circuit: pot. cursor -> A0 ; LED pin 9 (~).
           LDR en divisor, EN AQUEST ORDRE: 5V -> LDR -> A1 -> 10k -> GND
           (amb llum el numero puja, tapada baixa). Si gires l'ordre, o fas
           servir un modul de llum de 3 potes, pot anar al reves: mira-ho al Monitor.
  Quan: S2 - modelatge
*/

const int POT = A0;
const int LDR = A1;
const int LED = 9;        // pin PWM

int llindar = 400;        // per sota d'aquest valor de LDR, considerem "fosc"
                          // 400 va be a Tinkercad; al teu muntatge CAL canviar-lo
                          // per un numero entre el de llum i el de tapat (Monitor)

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
  Serial.print("LDR: "); Serial.println(valorLdr);   // per comprovar el llindar
  if (valorLdr < llindar) {
    analogWrite(LED, 255);   // fa fosc -> llum encesa
  } else {
    analogWrite(LED, 0);     // hi ha llum -> apagada
  }
  delay(100);

  Si en TAPAR la LDR el numero PUJA (en lloc de baixar), la LDR i la 10k
  estan al reves: gira-les o canvia el < per > a l'if.
*/
