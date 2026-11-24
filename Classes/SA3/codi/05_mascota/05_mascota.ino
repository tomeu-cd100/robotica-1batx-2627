/*
  Projecte T1 - El teu tamagotchi (ESQUELET per comencar)

  Una mascota virtual que has de cuidar. Te tres necessitats (gana, son i
  felicitat, de 0 a 100) que baixen amb el temps i amb el que noten els
  sensors. Amb els botons la cuides. Si no la cuides es posa TRISTA i
  despres MALALTA, pero MAI no es mor: sempre es recupera si l'atens.

  Ja esta fet (exemple):
    - la pantalla: la cara segons l'estat i les tres barres,
    - les necessitats que baixen soles amb millis(),
    - el boto MENJAR, amb antirebot (com a la Practica 1 de la SA3).
  Has d'OMPLIR els // TODO:
    - els botons JUGAR i DORMIR,
    - els sensors: llum (fosc -> te son) i micro (soroll -> s'espanta),
    - quan esta TRISTA o MALALTA (la funcio calculaEstat).
  Les // EXTRA son per a qui vulgui mes (PIR, DHT11, guardar a l'EEPROM).

  Compila tal qual: veuras la cara i les barres baixant a poc a poc.
  Llibreries: Adafruit SSD1306 i Adafruit GFX (pantalla KS0271). Cablatge: la taula de pins de sota (dossier del tamagotchi).
  Quan: S3 - producte (Practica 4 de la SA3)
*/

// Aquesta linia ha d'anar la PRIMERA: obliga el Web Editor a fer servir les
// llibreries bones d'Adafruit (sense ella, a vegades n'agafa una altra i no compila).
#include <Adafruit_BusIO_Register.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// --- Pins (taula del dossier: no els canviis) ---
// OLED: SDA a A4, SCL a A5
const int PIN_MICRO = A0;      // soroll
const int PIN_LLUM = A1;       // llum (TEMT6000 o LDR de la Practica 2)
const int PIN_PIR = 2;         // algu a prop (versio completa)
const int BOTO_MENJAR = 3;
const int BOTO_JUGAR = 5;
const int BOTO_DORMIR = 7;
const int PIN_BRUNZIDOR = 8;
const int PIN_R = 9, PIN_G = 10, PIN_B = 11;   // LED RGB de l'humor

// --- Ajustos (calibra'ls amb el Monitor serie obert) ---
const int LLINDAR_FOSC = 150;           // llum per sota = es fosc
const int LLINDAR_SOROLL = 600;         // micro per sobre = soroll fort
const int LLINDAR_TRISTA = 30;          // una necessitat per sota = trista
const unsigned long TEMPS_BAIXADA = 5000;  // cada 5 s baixen les necessitats
const unsigned long ANTIREBOT = 40;     // ms (com a la Practica 1)

// Pantalla KS0271: OLED SSD1306 de 128 x 64 punts, adreca I2C 0x3C.
// La llibreria guarda la imatge sencera a la RAM: 1 KB dels 2 KB del UNO.
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

// --- Necessitats (0 = fatal, 100 = perfecte) ---
int gana = 80;        // 100 = ben alimentada
int son = 80;         // 100 = ben descansada
int felicitat = 80;   // 100 = molt contenta

// --- Estats (const int, com a la SA2) ---
const int CONTENTA = 0;
const int TRISTA = 1;
const int MALALTA = 2;
const int DORMINT = 3;
int estat = CONTENTA;

unsigned long tUltimaBaixada = 0;
unsigned long tUltimBoto = 0;
unsigned long tUltimEspant = 0;
bool esFosc = false;          // el decideix llegeixSensors(), l'aplica baixaAmbElTemps()
bool aprop = false;           // EXTRA PIR: igual que esFosc
int anteriorMenjar = HIGH;    // per detectar quan es PREM (no mentre esta premut)

void setup() {
  Serial.begin(9600);
  pinMode(BOTO_MENJAR, INPUT_PULLUP);
  pinMode(BOTO_JUGAR, INPUT_PULLUP);
  pinMode(BOTO_DORMIR, INPUT_PULLUP);
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_BRUNZIDOR, OUTPUT);
  pinMode(PIN_R, OUTPUT);
  pinMode(PIN_G, OUTPUT);
  pinMode(PIN_B, OUTPUT);
  if (!pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("La pantalla no arrenca: falta RAM o revisa els cables"));
    while (true) {}            // s'atura aqui
  }
  pantalla.setTextColor(SSD1306_WHITE);
}

void loop() {
  llegeixBotons();
  llegeixSensors();
  baixaAmbElTemps();
  calculaEstat();
  mostraHumor();
  dibuixa();
}

// ===================== BOTONS =====================
void llegeixBotons() {
  if (millis() - tUltimBoto < ANTIREBOT) return;   // antirebot

  // EXEMPLE RESOLT: boto MENJAR. Nomes compta quan PASSA de HIGH a LOW
  // (pull-up: premut = LOW), aixi mantenir-lo premut no suma cada volta.
  int araMenjar = digitalRead(BOTO_MENJAR);
  if (araMenjar == LOW && anteriorMenjar == HIGH) {
    gana = gana + 25;
    so(523, 659);              // do-mi: nyam!
    tUltimBoto = millis();
  }
  anteriorMenjar = araMenjar;

  // TODO boto JUGAR: copia l'exemple (et caldra una variable anteriorJugar).
  //      Jugar puja la felicitat (+20) pero cansa una mica (son - 5).
  //      Si esta MALALTA, no vol jugar: no facis res en aquest cas.

  // TODO boto DORMIR: si esta despert, passa a DORMINT; si dorm, el desperta
  //      (estat = CONTENTA i calculaEstat() ja decidira la resta).

  gana = constrain(gana, 0, 100);            // mai per sota de 0 ni per sobre de 100
  son = constrain(son, 0, 100);
  felicitat = constrain(felicitat, 0, 100);
}

// ===================== SENSORS =====================
void llegeixSensors() {
  int llum = analogRead(PIN_LLUM);
  int soroll = analogRead(PIN_MICRO);

  // Traca per calibrar els llindars: Monitor serie a 9600
  Serial.print(F("llum=")); Serial.print(llum);
  Serial.print(F(" soroll=")); Serial.println(soroll);

  // TODO llum: posa esFosc = true si llum < LLINDAR_FOSC, i false si no.
  //      Pista: es el mateix "llegeix -> compara -> decideix" de la Practica 2.
  //      (Qui fa servir esFosc es baixaAmbElTemps(): de nit, te mes son.)

  // TODO soroll: si NO dorm (estat != DORMINT), soroll > LLINDAR_SOROLL i fa
  //      mes de 2000 ms de l'ultim espant (millis() - tUltimEspant > 2000),
  //      la mascota s'espanta: felicitat - 10, un so d'espant (per exemple
  //      so(880, 440)) i tUltimEspant = millis().
  //      (Quan dorm, dorm profundament: el soroll no la desperta.)

  // EXTRA PIR (versio completa): fes com amb esFosc: aprop = true si
  //      digitalRead(PIN_PIR) == HIGH, i false si no. Qui puja la felicitat
  //      es baixaAmbElTemps(), cada 5 s (no a cada volta del loop!).
}

// ===================== EL TEMPS =====================
void baixaAmbElTemps() {
  if (millis() - tUltimaBaixada < TEMPS_BAIXADA) return;
  tUltimaBaixada = millis();

  gana = gana - 2;
  felicitat = felicitat - 1;
  if (estat == DORMINT) {
    son = son + 5;             // dormint, recupera la son
  } else if (esFosc) {
    son = son - 3;             // de nit li costa mes estar desperta
  } else {
    son = son - 1;
  }
  if (aprop) felicitat = felicitat + 2;   // EXTRA PIR: li agrada la companyia
  gana = constrain(gana, 0, 100);
  son = constrain(son, 0, 100);
  felicitat = constrain(felicitat, 0, 100);
}

// ===================== ESTATS =====================
void calculaEstat() {
  if (estat == DORMINT) {
    if (son >= 100) estat = CONTENTA;   // s'ha despertat sola
    return;
  }

  // TODO: decideix l'estat a partir de les necessitats.
  //   - MALALTA si DUES necessitats son per sota de LLINDAR_TRISTA
  //     (pista: compta quantes ho son amb un comptador).
  //   - TRISTA si n'hi ha UNA per sota de LLINDAR_TRISTA.
  //   - CONTENTA si totes estan be.
  //   Recorda: MAI no es mor. Si l'atens, les necessitats pugen i torna a CONTENTA.
  estat = CONTENTA;
}

// ===================== LLUM I SO (SA2) =====================
void mostraHumor() {
  if (estat == CONTENTA) colorHumor(0, 255, 0);       // verd
  else if (estat == TRISTA) colorHumor(0, 0, 255);    // blau
  else if (estat == MALALTA) colorHumor(255, 0, 0);   // vermell
  else colorHumor(0, 0, 0);                           // dormint: apagat
}

void colorHumor(int r, int g, int b) {
  analogWrite(PIN_R, r);
  analogWrite(PIN_G, g);
  analogWrite(PIN_B, b);
}

void so(int nota1, int nota2) {
  tone(PIN_BRUNZIDOR, nota1, 100);
  delay(120);
  tone(PIN_BRUNZIDOR, nota2, 100);
  delay(120);
  noTone(PIN_BRUNZIDOR);
}

// ===================== PANTALLA =====================
void barra(int y, const char *nom, int valor) {
  pantalla.setCursor(0, y);
  pantalla.print(nom);
  pantalla.drawRect(28, y, 60, 7, SSD1306_WHITE);
  pantalla.fillRect(28, y, valor * 60 / 100, 7, SSD1306_WHITE);
}

void cara(int x, int y) {
  pantalla.drawCircle(x, y, 13, SSD1306_WHITE);
  if (estat == DORMINT) {
    pantalla.drawLine(x - 8, y - 3, x - 3, y - 3, SSD1306_WHITE);     // ulls tancats
    pantalla.drawLine(x + 3, y - 3, x + 8, y - 3, SSD1306_WHITE);
    pantalla.setCursor(x + 14, y - 15);
    pantalla.print("z");
    return;
  }
  pantalla.fillCircle(x - 5, y - 4, 2, SSD1306_WHITE);                  // ulls
  pantalla.fillCircle(x + 5, y - 4, 2, SSD1306_WHITE);
  if (estat == CONTENTA) {                              // boca
    pantalla.drawLine(x - 6, y + 4, x - 2, y + 7, SSD1306_WHITE);
    pantalla.drawLine(x - 2, y + 7, x + 2, y + 7, SSD1306_WHITE);
    pantalla.drawLine(x + 2, y + 7, x + 6, y + 4, SSD1306_WHITE);
  } else {
    pantalla.drawLine(x - 6, y + 7, x - 2, y + 4, SSD1306_WHITE);
    pantalla.drawLine(x - 2, y + 4, x + 2, y + 4, SSD1306_WHITE);
    pantalla.drawLine(x + 2, y + 4, x + 6, y + 7, SSD1306_WHITE);
  }
  if (estat == MALALTA) {                               // creu de malalta
    pantalla.drawLine(x + 15, y - 10, x + 15, y - 4, SSD1306_WHITE);
    pantalla.drawLine(x + 12, y - 7, x + 18, y - 7, SSD1306_WHITE);
  }
}

void dibuixa() {
  pantalla.clearDisplay();   // esborra la imatge (nomes a la RAM)
  cara(104, 32);
  barra(4, "Gana", gana);
  barra(28, "Son", son);
  barra(52, "Feli", felicitat);
  pantalla.display();        // envia la imatge a la pantalla
}
