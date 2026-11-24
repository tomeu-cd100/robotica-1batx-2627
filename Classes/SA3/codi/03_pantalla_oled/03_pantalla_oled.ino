/*
  SA3 - 03_pantalla_oled.ino
  La pantalla OLED: text, una barra i una cara que canvia amb la llum.
  Circuit: OLED KS0271 (SSD1306 0,96" I2C) -> SDA a A4, SCL a A5, VCC a 5V, GND a GND.
           Sensor de llum de la Practica 2 -> A1.
  Llibreries: Adafruit SSD1306 i Adafruit GFX
              (Eines > Gestiona les biblioteques > "Adafruit SSD1306" > Instal.la-ho tot).
  Quan: S3 - primera part (~25')
*/

// Aquesta linia ha d'anar la PRIMERA: obliga el Web Editor a fer servir les
// llibreries bones d'Adafruit (sense ella, a vegades n'agafa una altra i no compila).
#include <Adafruit_BusIO_Register.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Pantalla KS0271: 128 x 64 punts, adreca I2C 0x3C.
// La llibreria guarda la imatge sencera a la RAM: 1 KB dels 2 KB del UNO.
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

const int SENSOR_LLUM = A1;

void setup() {
  Serial.begin(9600);
  if (!pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("La pantalla no arrenca: revisa els cables"));
    while (true) {}                          // s'atura aqui
  }
  pantalla.setTextColor(SSD1306_WHITE);      // el text es pinta en blanc
}

void loop() {
  int llum = analogRead(SENSOR_LLUM);        // 0 (fosc) ... 1023 (molta llum)
  int amplada = map(llum, 0, 1023, 0, 100);  // la barra fa de 0 a 100 pixels

  // 0. Esborra la imatge anterior (nomes a la RAM: encara no es veu)
  pantalla.clearDisplay();

  // 1. Text a dalt a l'esquerra (x = 0, y = 0 es la cantonada de dalt del text)
  pantalla.setCursor(0, 0);
  pantalla.print("Hola!");

  // 2. Una cara: el cap i els dos ulls
  pantalla.drawCircle(64, 34, 14, SSD1306_WHITE);
  pantalla.fillCircle(58, 30, 2, SSD1306_WHITE);
  pantalla.fillCircle(70, 30, 2, SSD1306_WHITE);
  if (amplada > 30) {
    // contenta: boca cap amunt (tres linies en forma de somriure)
    pantalla.drawLine(57, 39, 61, 42, SSD1306_WHITE);
    pantalla.drawLine(61, 42, 67, 42, SSD1306_WHITE);
    pantalla.drawLine(67, 42, 71, 39, SSD1306_WHITE);
  } else {
    // trista: boca cap avall
    pantalla.drawLine(57, 42, 61, 39, SSD1306_WHITE);
    pantalla.drawLine(61, 39, 67, 39, SSD1306_WHITE);
    pantalla.drawLine(67, 39, 71, 42, SSD1306_WHITE);
  }

  // 3. Una barra a baix: la vora i l'interior segons la llum
  pantalla.drawRect(14, 54, 100, 8, SSD1306_WHITE);
  pantalla.fillRect(14, 54, amplada, 8, SSD1306_WHITE);

  // 4. Envia tota la imatge a la pantalla d'un sol cop
  pantalla.display();

  delay(100);
}
