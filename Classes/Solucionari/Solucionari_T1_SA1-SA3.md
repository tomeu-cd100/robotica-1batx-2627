# Solucionari de reptes — Trimestre 1 (SA1-SA3)

> Solucions orientatives dels reptes **"+ repte" / "+ ampliació"**. Els sketches base ja són a `Classes/SAx/codi/`. Hi pot haver més d'una solució vàlida.

---

## SA1

**Repte (3 parpellejos + pausa):** ja resolt a `SA1/codi/blink_repte.ino`.

**+ Ampliació (recerca d'un robot industrial/IA):** no té codi; s'avalua amb la rúbrica **R4** (documentació) — valorar rigor, fonts i claredat.

### + Ampliació: SOS en Morse (`SA1/codi/sos_morse.ino`)
> Emet "SOS" amb **funcions** per al punt i la ratlla (ampliació del Blink).
```cpp
const int LED = 8;
const int PUNT = 200;        // durada d'un punt (ms)
const int RATLLA = PUNT * 3; // ratlla = 3 punts
const int PAUSA = PUNT;      // pausa entre senyals

void senyal(int durada) {
  digitalWrite(LED, HIGH); delay(durada);
  digitalWrite(LED, LOW);  delay(PAUSA);
}
void setup() { pinMode(LED, OUTPUT); }
void loop() {
  // S = . . .
  senyal(PUNT); senyal(PUNT); senyal(PUNT);
  delay(RATLLA);
  // O = - - -
  senyal(RATLLA); senyal(RATLLA); senyal(RATLLA);
  delay(RATLLA);
  // S = . . .
  senyal(PUNT); senyal(PUNT); senyal(PUNT);
  delay(RATLLA * 2);   // pausa llarga entre paraules
}
```

---

## SA2

### + Repte: semàfor de vianants coordinat
```cpp
const int C_VERMELL = 8, C_VERD = 10;     // cotxes
const int V_VERMELL = 6, V_VERD = 5;      // vianants

void setup() {
  pinMode(C_VERMELL, OUTPUT); pinMode(C_VERD, OUTPUT);
  pinMode(V_VERMELL, OUTPUT); pinMode(V_VERD, OUTPUT);
}
void loop() {
  // Cotxes verd, vianants vermell
  digitalWrite(C_VERD, HIGH); digitalWrite(C_VERMELL, LOW);
  digitalWrite(V_VERMELL, HIGH); digitalWrite(V_VERD, LOW);
  delay(5000);
  // Transicio
  digitalWrite(C_VERD, LOW); digitalWrite(C_VERMELL, HIGH);
  delay(1000);
  // Vianants verd
  digitalWrite(V_VERMELL, LOW); digitalWrite(V_VERD, HIGH);
  delay(4000);
  digitalWrite(V_VERD, LOW);
}
```

### Transició suau entre dos colors (RGB)
```cpp
const int R = 9, G = 10, B = 11;
void color(int r, int g, int b){ analogWrite(R,r); analogWrite(G,g); analogWrite(B,b); }
void setup(){ pinMode(R,OUTPUT); pinMode(G,OUTPUT); pinMode(B,OUTPUT); }
void loop(){
  // de vermell (255,0,0) a blau (0,0,255)
  for (int i = 0; i <= 255; i++) { color(255 - i, 0, i); delay(10); }
  for (int i = 255; i >= 0; i--) { color(255 - i, 0, i); delay(10); }
}
```

### + Repte: arc de Sant Martí cíclic (roda de color)
```cpp
const int R = 9, G = 10, B = 11;
void color(int r,int g,int b){ analogWrite(R,r); analogWrite(G,g); analogWrite(B,b); }
void setup(){ pinMode(R,OUTPUT); pinMode(G,OUTPUT); pinMode(B,OUTPUT); }
void loop(){
  for (int i=0;i<=255;i++){ color(255-i, i, 0); delay(8); } // vermell->verd
  for (int i=0;i<=255;i++){ color(0, 255-i, i); delay(8); } // verd->blau
  for (int i=0;i<=255;i++){ color(i, 0, 255-i); delay(8); } // blau->vermell
}
```

---

## SA3

### + Repte: comptar fins a 5 i reiniciar
```cpp
const int POLSADOR = 2, LED = 8;
int comptador = 0, estatAnterior = HIGH;
void setup(){ pinMode(POLSADOR, INPUT_PULLUP); pinMode(LED, OUTPUT); Serial.begin(9600); }
void loop(){
  int estat = digitalRead(POLSADOR);
  if (estat == LOW && estatAnterior == HIGH) {   // flanc de premuda
    comptador++;
    if (comptador > 5) comptador = 0;            // reinicia
    Serial.println(comptador);
    delay(40);                                   // antirebot simple
  }
  estatAnterior = estat;
}
```

### + Repte: llindar ajustable amb potenciòmetre (llum automàtic)
```cpp
const int LDR = A1, POT = A0, LED = 9;
void setup(){ pinMode(LED, OUTPUT); Serial.begin(9600); }
void loop(){
  int llindar = analogRead(POT);   // el potenciometre fixa el llindar (0..1023)
  int llum = analogRead(LDR);
  analogWrite(LED, (llum < llindar) ? 255 : 0);
  Serial.print(llum); Serial.print(" / "); Serial.println(llindar);
  delay(100);
}
```

### + Repte: detectar si un objecte s'acosta o s'allunya
```cpp
const int TRIG = 12, ECHO = 11;
float anterior = 0;
float dist(){
  digitalWrite(TRIG,LOW); delayMicroseconds(2);
  digitalWrite(TRIG,HIGH); delayMicroseconds(10); digitalWrite(TRIG,LOW);
  long t = pulseIn(ECHO,HIGH,30000);   // timeout 30 ms
  if (t == 0) return 400;              // sense eco: fora de rang
  return t * 0.034 / 2.0;
}
void setup(){ pinMode(TRIG,OUTPUT); pinMode(ECHO,INPUT); Serial.begin(9600); }
void loop(){
  float d = dist();
  if (d < anterior - 1) Serial.println("S'ACOSTA");
  else if (d > anterior + 1) Serial.println("S'ALLUNYA");
  else Serial.println("ESTABLE");
  anterior = d;
  delay(200);
}
```

---

## 🤖 Codi de referència del robot del trimestre: el tamagotchi

> Implementació completa d'exemple del producte final (dossier
> [🐣 Projecte T1](../00_General/00_Projecte_T1_Mascota.md)): és l'esquelet de la
> [Pràctica 4 de la SA3](../SA3/codi/05_mascota/EXPLICACIO.md) amb tots els `// TODO`
> resolts. És UNA solució possible: cada alumne/a en pot fer variants (velocitats,
> llindars, cares, sons). Fitxer complet:
> [`T1_tamagotchi.ino`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T1_tamagotchi/T1_tamagotchi.ino).
> La solució de la mascota reactiva anterior (fins al 3-11-2026) és a `docs/arxiu/mascota_T1/`.

### Què han de resoldre i com

| `// TODO` de l'esquelet | Solució de referència | Error típic |
|---|---|---|
| Botons JUGAR i DORMIR | Còpia del patró de MENJAR: `ara == LOW && anterior == HIGH`, i `anterior = ara` al final. JUGAR no fa res si està `MALALTA`. DORMIR alterna `DORMINT` ↔ `CONTENTA`. | Comptar mentre està premut (sense `anterior`). |
| Llum | `esFosc = (llum < LLINDAR_FOSC);` (la resta de son la fa `baixaAmbElTemps()`). | Restar la son a cada volta del `loop()`. |
| Soroll | `if (soroll > LLINDAR_SOROLL && millis() - tUltimEspant > 2000)`: felicitat − 10, `so(880, 440)`, `tUltimEspant = millis()` i, si dormia, es desperta. | Sense temps d'espera: la felicitat cau a 0 en un segon. |
| PIR (completa) | Si `HIGH`, felicitat + 1 (amb `constrain`). | Oblidar els 30-60 s d'estabilització. |
| `calculaEstat()` | Comptador de necessitats per sota de `LLINDAR_TRISTA`: ≥ 2 → `MALALTA`, 1 → `TRISTA`, 0 → `CONTENTA`. | Fer un estat «mort» o que no surti de `MALALTA`. |

**Memòria:** compilat per a UNO, deixa **~1.150 bytes** de RAM lliure (U8g2 en mode pàgina). Si algú hi afegeix els NeoPixel o l'EEPROM, cal tornar a mirar-ho.

### El fitxer complet

<details markdown="1">
<summary>Desplega el codi complet (<code>T1_tamagotchi.ino</code>, compila tal qual)</summary>

```cpp
/*
  Codi de referencia del Projecte T1 - El tamagotchi (NOMES DOCENT)
  Es l'esquelet de la Practica 4 de la SA3 (Classes/SA3/codi/05_mascota) amb
  tots els // TODO resolts: botons JUGAR i DORMIR, llum (esFosc), soroll amb
  temps d'espera, PIR i calculaEstat(). Les // EXTRA (DHT11, EEPROM) no hi son.
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
  if (araJugar == LOW && anteriorJugar == HIGH && estat != MALALTA) {
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
  if (soroll > LLINDAR_SOROLL && millis() - tUltimEspant > 2000) {
    felicitat = constrain(felicitat - 10, 0, 100); so(880, 440); tUltimEspant = millis();
    if (estat == DORMINT) estat = CONTENTA;
  }
  if (digitalRead(PIN_PIR) == HIGH) felicitat = constrain(felicitat + 1, 0, 100);
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
```

</details>
