/*
  Codi de referencia del Projecte T1 - El tamagotchi (NOMES DOCENT)
  Es l'esquelet de la Practica 4 de la SA3 (Classes/SA3/codi/05_mascota) amb
  tots els // TODO resolts: botons JUGAR i DORMIR, llum (esFosc), soroll amb
  temps d'espera (quan dorm no s'espanta), PIR amb la variable aprop i calculaEstat(). Les // EXTRA (DHT11, EEPROM) no hi son.
  Cablatge: el del dossier 00_Projecte_T1_Mascota.md (apartat Cablatge).
  Llibreria: U8g2.
*/

#include <U8g2lib.h>

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

U8G2_SSD1306_128X64_NONAME_1_HW_I2C pantalla(U8G2_R0, U8X8_PIN_NONE);

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
int anteriorMenjar = HIGH;
int anteriorJugar = HIGH;
int anteriorDormir = HIGH;    // per detectar quan es PREM (no mentre esta premut)

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
  pantalla.begin();
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

  int araJugar = digitalRead(BOTO_JUGAR);
  if (araJugar == LOW && anteriorJugar == HIGH && estat != MALALTA && estat != DORMINT) {
    felicitat = felicitat + 20; son = son - 5; so(659, 784); tUltimBoto = millis();
  }
  anteriorJugar = araJugar;
  int araDormir = digitalRead(BOTO_DORMIR);
  if (araDormir == LOW && anteriorDormir == HIGH) {
    if (estat == DORMINT) estat = CONTENTA; else estat = DORMINT;
    tUltimBoto = millis();
  }
  anteriorDormir = araDormir;

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

  esFosc = (llum < LLINDAR_FOSC);
  if (estat != DORMINT && soroll > LLINDAR_SOROLL && millis() - tUltimEspant > 2000) {
    felicitat = constrain(felicitat - 10, 0, 100); so(880, 440); tUltimEspant = millis();
  }
  aprop = (digitalRead(PIN_PIR) == HIGH);
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

  int baixes = 0;
  if (gana < LLINDAR_TRISTA) baixes++;
  if (son < LLINDAR_TRISTA) baixes++;
  if (felicitat < LLINDAR_TRISTA) baixes++;
  if (baixes >= 2) estat = MALALTA;
  else if (baixes == 1) estat = TRISTA;
  else estat = CONTENTA;
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
  pantalla.drawStr(0, y + 7, nom);
  pantalla.drawFrame(28, y, 60, 7);
  pantalla.drawBox(28, y, valor * 60 / 100, 7);
}

void cara(int x, int y) {
  pantalla.drawCircle(x, y, 13);
  if (estat == DORMINT) {
    pantalla.drawLine(x - 8, y - 3, x - 3, y - 3);     // ulls tancats
    pantalla.drawLine(x + 3, y - 3, x + 8, y - 3);
    pantalla.drawStr(x + 14, y - 8, "z");
    return;
  }
  pantalla.drawDisc(x - 5, y - 4, 2);                  // ulls
  pantalla.drawDisc(x + 5, y - 4, 2);
  if (estat == CONTENTA) {                              // boca
    pantalla.drawLine(x - 6, y + 4, x - 2, y + 7);
    pantalla.drawLine(x - 2, y + 7, x + 2, y + 7);
    pantalla.drawLine(x + 2, y + 7, x + 6, y + 4);
  } else {
    pantalla.drawLine(x - 6, y + 7, x - 2, y + 4);
    pantalla.drawLine(x - 2, y + 4, x + 2, y + 4);
    pantalla.drawLine(x + 2, y + 4, x + 6, y + 7);
  }
  if (estat == MALALTA) {                               // creu de malalta
    pantalla.drawLine(x + 15, y - 10, x + 15, y - 4);
    pantalla.drawLine(x + 12, y - 7, x + 18, y - 7);
  }
}

void dibuixa() {
  pantalla.firstPage();
  do {
    pantalla.setFont(u8g2_font_5x7_tr);
    cara(104, 32);
    barra(4, "Gana", gana);
    barra(28, "Son", son);
    barra(52, "Feli", felicitat);
  } while (pantalla.nextPage());
}
