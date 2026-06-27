/*
  SA1 - blink.ino
  El primer programa: fer parpellejar un LED.
  Maquinari: LED intern de la placa (pin 13) o LED + resistencia 220 ohm al pin 13.
  Objectiu: entendre setup(), loop(), pinMode, digitalWrite i delay.
*/

const int LED = 13;   // Numero de pin on hi ha el LED (constant: no canvia)

void setup() {
  // setup() s'executa UNA sola vegada en encendre o reiniciar la placa.
  pinMode(LED, OUTPUT);   // Configurem el pin com a SORTIDA
}

void loop() {
  // loop() es repeteix indefinidament, una vegada i una altra.
  digitalWrite(LED, HIGH);  // Encen el LED (5 V)
  delay(1000);              // Espera 1000 ms = 1 segon
  digitalWrite(LED, LOW);   // Apaga el LED (0 V)
  delay(1000);              // Espera 1 segon
}
