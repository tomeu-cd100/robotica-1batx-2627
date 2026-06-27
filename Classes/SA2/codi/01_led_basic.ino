/*
  SA2 - 01_led_basic.ino
  Encendre i apagar un LED extern (pin 8) usant una variable per al temps.
  Circuit: Pin 8 -> [220 ohm] -> LED(+) ; LED(-) -> GND
*/

const int LED = 8;     // pin del LED (constant)
int temps = 500;       // temps en ms (variable: la pots canviar)

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(temps);
  digitalWrite(LED, LOW);
  delay(temps);
}
