/*
  Solucionari Repte SA2-B · Llum d'ambient regulable (REQUISIT MINIM)
  Un LED en un pin PWM fa l'efecte "fade" (puja i baixa d'intensitat) amb un for.
  Circuit: LED al pin 9 (~PWM) + 220 ohm a GND.
*/

const int LED = 9;   // pin amb ~ (PWM)

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  // Puja: 0 -> 255
  for (int v = 0; v <= 255; v++) {
    analogWrite(LED, v);
    delay(8);
  }
  // Baixa: 255 -> 0
  for (int v = 255; v >= 0; v--) {
    analogWrite(LED, v);
    delay(8);
  }
}
