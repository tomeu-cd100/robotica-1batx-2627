/*
  SA3 - 03_pantalla_oled.ino
  La pantalla OLED: text, una barra i una cara que canvia amb la llum.
  Circuit: OLED SSD1306 0,96" I2C -> SDA a A4, SCL a A5, VCC a 5V, GND a GND.
           Sensor de llum de la Practica 2 -> A1.
  Llibreria: U8g2 (Eines > Gestiona les biblioteques > "U8g2").
  Quan: S3 - primera part (~25')
*/

#include <U8g2lib.h>

// Mode "pagina" (el _1_ del nom): dibuixa la pantalla a trossos i gasta
// poca memoria. L'Arduino UNO nomes te 2 KB de RAM.
U8G2_SSD1306_128X64_NONAME_1_HW_I2C pantalla(U8G2_R0, U8X8_PIN_NONE);

const int SENSOR_LLUM = A1;

void setup() {
  pantalla.begin();
}

void loop() {
  int llum = analogRead(SENSOR_LLUM);        // 0 (fosc) ... 1023 (molta llum)
  int amplada = map(llum, 0, 1023, 0, 100);  // la barra fa de 0 a 100 pixels

  // Cada volta es dibuixa la pantalla sencera, pagina a pagina.
  pantalla.firstPage();
  do {
    // 1. Text a dalt a l'esquerra (x = 0, y = 12 es la linia de base)
    pantalla.setFont(u8g2_font_6x12_tr);
    pantalla.drawStr(0, 12, "Hola!");

    // 2. Una cara: el cap i els dos ulls
    pantalla.drawCircle(64, 34, 14);
    pantalla.drawDisc(58, 30, 2);
    pantalla.drawDisc(70, 30, 2);
    if (amplada > 30) {
      // contenta: boca cap amunt (tres linies en forma de somriure)
      pantalla.drawLine(57, 39, 61, 42);
      pantalla.drawLine(61, 42, 67, 42);
      pantalla.drawLine(67, 42, 71, 39);
    } else {
      // trista: boca cap avall
      pantalla.drawLine(57, 42, 61, 39);
      pantalla.drawLine(61, 39, 67, 39);
      pantalla.drawLine(67, 39, 71, 42);
    }

    // 3. Una barra a baix: la vora i l'interior segons la llum
    pantalla.drawFrame(14, 54, 100, 8);
    pantalla.drawBox(14, 54, amplada, 8);
  } while (pantalla.nextPage());

  delay(100);
}
