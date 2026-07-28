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
  return pulseIn(ECHO,HIGH) * 0.034 / 2.0;
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

## 🤖 Codi de referència del robot del trimestre: la mascota

> Implementació completa d'exemple del producte final (dossier
> [🐣 Projecte T1](../00_General/00_Projecte_T1_Mascota.md)): emocions amb
> màquina d'estats + 3 comportaments sensor→resposta. És UNA solució
> possible: les parelles en poden fer variants. Fitxer complet:
> [`T1_mascota.ino`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T1_mascota/T1_mascota.ino).

### La màquina d'estats de les emocions

Quatre emocions (`enum Emocio`) i una única funció `canviaEmocio()` que
centralitza la transició: només actua (llums + so) quan l'emoció **canvia**,
no a cada volta del `loop()`, i reinicia el temporitzador `tUltimEstimul`.

```cpp
// --- Maquina d'estats de les emocions ---
enum Emocio { CONTENT, ESPANTAT, ADORMIT, CURIOS };
Emocio emocio = CONTENT;
unsigned long tUltimEstimul = 0;
unsigned long tUltimPolsador = 0;   // debounce de la caricia
```

```cpp
// --- Transicio d'estat: llums + so nomes quan canvia ---
void canviaEmocio(Emocio nova) {
  if (nova == emocio) return;
  emocio = nova;
  tUltimEstimul = millis();
  switch (emocio) {
    case CONTENT:
      mostraUlls(0, 180, 40);      // verd calid
      colorHumor(0, 255, 0);
      melodia(523, 659, 784);      // do-mi-sol (alegre)
      break;
    case ESPANTAT:
      mostraUlls(255, 0, 0);       // vermell
      colorHumor(255, 0, 0);
      melodia(880, 740, 622);      // descendent (ensurt)
      break;
    case ADORMIT:
      mostraUlls(0, 0, 30);        // blau molt tenue
      colorHumor(0, 0, 60);
      melodia(262, 0, 0);          // una nota greu i prou
      break;
    case CURIOS:
      mostraUlls(200, 120, 0);     // taronja
      colorHumor(255, 160, 0);
      melodia(659, 784, 988);      // ascendent (hola!)
      break;
  }
}
```

### Els 3 comportaments sensor→resposta

`llegeixSensors()` aplica les tres regles per ordre de prioritat (soroll >
foscor > presència), amb la carícia del polsador com a extra que torna la
mascota a l'estat `CONTENT` amb antirebot de 200 ms.

```cpp
// --- Comportaments sensor->resposta (els 3 minims del producte) ---
void llegeixSensors() {
  int soroll = analogRead(PIN_MICROFON);
  int llum = analogRead(PIN_LLUM);

  // Traca per calibrar els llindars: obre el Serial Monitor a 9600
  Serial.print("soroll="); Serial.print(soroll);
  Serial.print(" llum="); Serial.print(llum);
  Serial.print(" temp="); Serial.println(dht.readTemperature());

  // 1) Soroll fort -> ESPANTAT
  if (soroll > LLINDAR_SOROLL) {
    if (emocio == ESPANTAT) tUltimEstimul = millis();  // refresca el temporitzador si ja estem espantats
    canviaEmocio(ESPANTAT);
    return;
  }
  // 2) Foscor -> ADORMIT (i la llum el desperta)
  if (llum < LLINDAR_FOSCOR) {
    canviaEmocio(ADORMIT);
    return;
  } else if (emocio == ADORMIT) {
    canviaEmocio(CURIOS);   // acaba de despertar-se
    return;
  }
  // 3) Algu s'acosta (PIR) -> CURIOS (saluda)
  if (digitalRead(PIN_PIR) == HIGH) {
    if (emocio != CURIOS) {
      canviaEmocio(CURIOS);
      return;
    }
    tUltimEstimul = millis();  // refresca si ja estem curiosos, deixa que la caricia funcione
  }
  // Extra: caricia al polsador -> CONTENT (amb debounce de 200 ms)
  if (digitalRead(PIN_POLSADOR) == LOW && millis() - tUltimPolsador > 200) {
    tUltimPolsador = millis();
    canviaEmocio(CONTENT);
  }
  // Extra (comentat al dossier): reaccionar a la temperatura del DHT11,
  // p. ex. si temp > 28 la mascota "te calor" -> afegiu un estat nou.
}
```

### Llums i so

Tres funcions auxiliars, cridades des de `canviaEmocio()`: `mostraUlls()`
pinta tota la tira NeoPixel d'un color, `colorHumor()` fa el mateix amb el
LED RGB via PWM, i `melodia()` toca fins a tres notes seguides (bloqueja
~450 ms, però només quan canvia l'emoció, no a cada volta del `loop()`).

```cpp
void mostraUlls(int r, int g, int b) {
  for (int i = 0; i < NUM_LEDS; i++) {
    ulls.setPixelColor(i, ulls.Color(r, g, b));
  }
  ulls.show();
}

void colorHumor(int r, int g, int b) {
  analogWrite(PIN_RGB_R, r);
  analogWrite(PIN_RGB_G, g);
  analogWrite(PIN_RGB_B, b);
}

// Tres notes seguides (freq. en Hz; 0 = silenci). Bloqueja ~450 ms: acceptable
// perque nomes sona quan CANVIA l'emocio, no a cada volta del loop.
void melodia(int n1, int n2, int n3) {
  int notes[3] = {n1, n2, n3};
  for (int i = 0; i < 3; i++) {
    if (notes[i] > 0) tone(PIN_BRUNZIDOR, notes[i], 120);
    delay(150);
  }
  noTone(PIN_BRUNZIDOR);
}
```

### Calibratge

Cada parella ha d'ajustar tres valors amb el Monitor Sèrie obert: els
llindars de soroll i foscor (traça `soroll=... llum=...` de
`llegeixSensors()`), el `NUM_LEDS` real de la seva tira i el
`TEMPS_CALMA` (ms sense estímuls per tornar a `CONTENT`).
