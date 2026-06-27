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
