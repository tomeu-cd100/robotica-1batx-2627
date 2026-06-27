// SA1 - Blink (per a Wokwi)
// Fa parpellejar el LED intern del pin 13 (LED_BUILTIN), sense cap cablejat.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
