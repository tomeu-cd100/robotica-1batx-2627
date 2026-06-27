/*
  SA2 - 03_fade_pwm.ino
  Efecte "respiracio" (fade) d'un LED amb PWM.
  Circuit: Pin 9 (~PWM) -> [220 ohm] -> LED(+) ; LED(-) -> GND
  analogWrite() accepta valors de 0 (apagat) a 255 (maxima intensitat).
  Nomes funciona en pins amb el simbol ~ (3, 5, 6, 9, 10, 11).
*/

const int LED = 9;   // ha de ser un pin PWM (~)

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  // Puja la intensitat de 0 a 255
  for (int valor = 0; valor <= 255; valor++) {
    analogWrite(LED, valor);
    delay(8);
  }
  // Baixa la intensitat de 255 a 0
  for (int valor = 255; valor >= 0; valor--) {
    analogWrite(LED, valor);
    delay(8);
  }
}
