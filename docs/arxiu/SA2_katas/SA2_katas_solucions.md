# SA2 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA2](SA2_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *rèplica*: la solució coincideix amb el bloc corresponent del sketch.

## Solució · `01_led_basic`

```cpp
const int LED = 8;     // pin del LED (constant)
int temps = 500;       // durada en ms (variable)

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(temps);
  digitalWrite(LED, LOW);
  delay(temps);
}
```

**En comentar (els tres punts del kata):** ① el `pinMode(LED, OUTPUT)` va a `setup()`, que s'executa un sol cop; ② el `8` només apareix a la declaració de la constant — a la resta del programa sempre `LED`; ③ la variable `temps` surt als **dos** `delay()`: canviant una sola línia canvia tot el ritme.

## Solució · `02_semafor`

```cpp
const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms
const int T_VERD    = 4000;
const int T_GROC    = 1500;

void loop() {
  digitalWrite(VERMELL, HIGH);
  delay(T_VERMELL);
  digitalWrite(VERMELL, LOW);

  digitalWrite(VERD, HIGH);
  delay(T_VERD);
  digitalWrite(VERD, LOW);

  digitalWrite(GROC, HIGH);
  delay(T_GROC);
  digitalWrite(GROC, LOW);
}
```

**En comentar:** ① cada `delay()` usa la seva constant `T_...` (cap número solt dins del `loop()`); ② cada LED s'apaga abans que s'encengui el següent (el trio encén–espera–apaga es tanca sempre); ③ l'ordre és vermell → verd → groc, com un semàfor real. *(El sketch de la pràctica hi afegeix el mode nocturn amb `if (nocturn)`: no formava part del kata.)*

## Solució · `02b_semafor_switch`

```cpp
int fase = 0;   // 0=vermell, 1=verd, 2=groc

void loop() {
  switch (fase) {
    case 0:  // fase vermell
      digitalWrite(VERMELL, HIGH);
      delay(T_VERMELL);
      digitalWrite(VERMELL, LOW);
      fase = 1;
      break;

    case 1:  // fase verd
      digitalWrite(VERD, HIGH);
      delay(T_VERD);
      digitalWrite(VERD, LOW);
      fase = 2;
      break;

    case 2:  // fase groc
      digitalWrite(GROC, HIGH);
      delay(T_GROC);
      digitalWrite(GROC, LOW);
      fase = 0;
      break;
  }
}
```

**En comentar:** ① els tres `case` acaben en `break` — sense `break`, el programa «cau» al `case` següent; ② el `case 2` torna `fase` a `0` i tanca el cicle (si algú hi ha posat `fase = 3`, el semàfor es queda mort); ③ `fase` comença a `0` perquè el primer color sigui el vermell. Bona llavor per anunciar la màquina d'estats de la SA6.

## Solució · `03_fade_pwm`

```cpp
const int LED = 9;   // pin PWM (~)

void loop() {
  // Puja la intensitat de 0 a 255
  for (int valor = 0; valor <= 255; valor++) {
    analogWrite(LED, valor);
    delay(8);
  }
  // Baixa la intensitat de 255 a 0
  for (int valor = 255; valor >= 0; valor--) {
    analogWrite(LED, valor);
    delay(8);
  }
}
```

**En comentar:** ① el pin 9 duu `~` (PWM): amb un pin sense `~`, `analogWrite` no faria mig to; ② el segon `for` és el mirall del primer — valor inicial, condició i pas invertits alhora (l'error típic és invertir-ne només un i el bucle no s'executa mai o no s'atura); ③ el mateix `delay(8)` als dos bucles fa la pujada i la baixada simètriques.

## Solució · `04_rgb`

```cpp
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void loop() {
  color(255, 0, 0);   delay(1000);   // vermell
  color(0, 255, 0);   delay(1000);   // verd
  color(0, 0, 255);   delay(1000);   // blau
}
```

**En comentar:** ① la funció és `void`: fa una acció, no retorna cap valor; ② dins seu es fan servir els **paràmetres** `r`, `g`, `b` (minúscules) — escriure-hi `R`, `G`, `B` compila, però aleshores tots els colors sortirien dels pins, no dels valors rebuts... atenció: `analogWrite(R, r)` usa tots dos: el pin com a destinació i el paràmetre com a valor; ③ cada crida a `color(...)` va seguida del seu `delay(1000)`. *(El sketch de la pràctica afegeix groc, lila i apagat: mateixa estructura.)*

## Solució · `05_panell_senyalitzacio`

```cpp
void estatAvis() {
  color(255, 180, 0);        // groc calid (millor al LED que el 255,255,0)
  tone(PIEZO, 1000, 150);    // bip curt: 1 kHz, 150 ms
  digitalWrite(RELE, LOW);   // carrega desconnectada
}
```

**En comentar:** ① es crida `color(...)` en lloc de repetir tres `analogWrite` — la modularitat de la pràctica anterior dona fruit aquí; ② el groc demanat és `(255, 180, 0)`, el càlid de l'enunciat, no el `(255, 255, 0)` de la pràctica del RGB; ③ la funció cobreix **els tres actuadors** (RGB, piezo i relé): un estat és una foto completa del sistema, no només el color.
