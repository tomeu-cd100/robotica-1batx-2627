# SA0 · Guia per aprendre a programar la placa

> **Objectiu:** que entenguis **com es programa** abans d'entrar a les unitats. Aquí tens els conceptes bàsics ben explicats, amb exemples curts. La part **A** és per a **Arduino (C/C++)**, que faràs servir a la majoria de SA; la part **B** és per a **MicroPython (micro:bit)**; la part **C** compara els dos.
>
> **Idea clau:** programar és **donar ordres molt precises** a una màquina que fa *exactament* el que dius (ni més, ni menys). Si una cosa no funciona, gairebé sempre és perquè l'ordre no era la que pensaves.

---

# PART A · Arduino (llenguatge C/C++)

## A0. El flux de treball

1. **Escrius** el programa (*sketch*) a l'**Arduino IDE**.
2. El **Verifiques** (botó ✔): l'ordinador comprova que no hi hagi errors d'escriptura (*compilar*).
3. El **Carregues** (botó →): el programa passa de l'ordinador a la placa per l'USB.
4. La placa **executa** el programa, encara que la desconnectis de l'ordinador (queda gravat).

> Pots fer tot això sense placa física a **Tinkercad Circuits** o **Wokwi**.

---

## A1. L'esquelet de tot programa Arduino

Tot *sketch* té sempre **dues parts obligatòries**:

```cpp
void setup() {
  // Es fa UNA sola vegada, en engegar la placa.
  // Aquí es PREPARA tot (configurar pins, iniciar comunicació...).
}

void loop() {
  // Es repeteix INFINITAMENT, una vegada i una altra.
  // Aquí va el comportament del robot.
}
```

> **Analogia:** `setup()` és **preparar-se abans de sortir de casa** (ho fas un cop). `loop()` és **el que fas durant tot el dia, en bucle**.

---

## A2. Comentaris (notes per a humans)

L'ordinador els **ignora**; serveixen perquè tu (i els altres) entengueu el codi.

```cpp
// Això és un comentari d'una línia

/* Això és un comentari
   de diverses línies */
```

> **Bona pràctica:** comenta *per què* fas una cosa, no *què* fa una línia òbvia.

---

## A3. Variables i tipus de dades

Una **variable** és una **caixa amb nom** on guardes un valor. Has de dir de **quin tipus** és:

```cpp
int comptador = 0;        // nombre enter: ...-2, -1, 0, 1, 2...
float temperatura = 21.5; // nombre amb decimals
bool ences = true;        // cert/fals (true / false)
char lletra = 'A';        // un sol caràcter
```

Una **constant** és una caixa que **no canviarà mai**; s'escriu amb `const`:

```cpp
const int PIN_LED = 13;   // el LED sempre serà al pin 13
```

> **Per què tipus?** Perquè la placa té poca memòria i necessita saber quant espai reservar. Triar bé el tipus evita errors. **Convenció:** les constants en MAJÚSCULES.

---

## A4. Configurar i usar els pins

### Configurar (dins `setup()`)

```cpp
pinMode(PIN_LED, OUTPUT);   // aquest pin serà una SORTIDA (LED, motor...)
pinMode(PIN_BOTO, INPUT);   // aquest pin serà una ENTRADA (botó, sensor...)
```

### Sortida i entrada DIGITAL (només 2 estats)

```cpp
digitalWrite(PIN_LED, HIGH);   // encén (posa 5 V)
digitalWrite(PIN_LED, LOW);    // apaga (posa 0 V)

int estat = digitalRead(PIN_BOTO);  // llegeix: HIGH o LOW
```

### Entrada i sortida ANALÒGICA (molts valors)

```cpp
int valor = analogRead(A0);     // llegeix 0..1023 (sensor, potenciòmetre)
analogWrite(PIN_LED, 128);      // PWM 0..255 (mitja brillantor). Pins amb ~
```

> **Recorda:** `analogRead` → **0–1023** (entrada). `analogWrite`/PWM → **0–255** (sortida, només pins `~`).

---

## A5. Esperes: `delay()`

```cpp
delay(1000);   // atura tot durant 1000 mil·lisegons = 1 segon
```

> ⚠️ `delay()` **bloqueja**: mentre espera, la placa no pot fer res més. Quan necessitis fer diverses coses alhora, s'usa `millis()` (un "cronòmetre" que no atura el programa). Ho veuràs com a ampliació.

**Exemple complet — fer parpellejar un LED (`Blink`):**

```cpp
const int PIN_LED = 13;

void setup() {
  pinMode(PIN_LED, OUTPUT);   // el pin del LED és sortida
}

void loop() {
  digitalWrite(PIN_LED, HIGH); // encén
  delay(500);                  // espera mig segon
  digitalWrite(PIN_LED, LOW);  // apaga
  delay(500);                  // espera mig segon
}
```

---

## A6. Prendre decisions: `if / else`

El programa fa una cosa **o una altra** segons una condició:

```cpp
if (temperatura > 25) {
  digitalWrite(VENTILADOR, HIGH);   // si fa calor, engega
} else {
  digitalWrite(VENTILADOR, LOW);    // si no, apaga
}
```

**Operadors de comparació:** `==` (igual), `!=` (diferent), `>`, `<`, `>=`, `<=`.
**Operadors lògics:** `&&` (i), `||` (o), `!` (no).

> ⚠️ Error clàssic: `=` **assigna** un valor; `==` **compara**. No són el mateix!

---

## A7. Repetir: bucles `for` i `while`

```cpp
// Repetir un nombre conegut de vegades:
for (int i = 0; i < 3; i++) {
  digitalWrite(PIN_LED, HIGH);
  delay(200);
  digitalWrite(PIN_LED, LOW);
  delay(200);
}   // parpelleja 3 cops

// Repetir MENTRE es compleixi una condició:
while (digitalRead(PIN_BOTO) == LOW) {
  // espera fins que premin el botó
}
```

---

## A8. Funcions pròpies (donar nom a una tasca)

Si repeteixes un bloc de codi, posa-li nom i crida'l. El codi queda més net i clar:

```cpp
void parpelleja(int temps) {     // defineixes la funció
  digitalWrite(PIN_LED, HIGH);
  delay(temps);
  digitalWrite(PIN_LED, LOW);
  delay(temps);
}

void loop() {
  parpelleja(200);   // la crides quan vulguis
  parpelleja(800);
}
```

> **Analogia:** una funció és una **recepta** que escrius un cop i pots fer servir tantes vegades com vulguis.

---

## A9. Depurar amb el Monitor Sèrie

El **Serial** envia missatges de la placa a l'ordinador: és la teva eina per **veure què passa per dins**.

```cpp
void setup() {
  Serial.begin(9600);          // inicia la comunicació
}

void loop() {
  int v = analogRead(A0);
  Serial.println(v);           // mostra el valor a la pantalla
  delay(500);
}
```

> Obre **Eines → Monitor sèrie** (a 9600 bauds). És com posar `print()` per espiar les variables.

---

# PART B · MicroPython (micro:bit)

A la **SA5** (i part de la SA8) no fas servir Arduino sinó el **micro:bit** amb **MicroPython**. Editors: **python.microbit.org** o **Thonny**.

## B1. L'esquelet d'un programa micro:bit

```python
from microbit import *   # porta totes les eines del micro:bit

while True:              # bucle infinit (com el loop() d'Arduino)
    display.show("A")    # mostra la lletra A a la pantalla de LEDs
    sleep(500)           # espera 500 ms
```

> **No hi ha `setup()`/`loop()`.** El que va abans del `while True:` es fa un cop (preparació); el que va dins es repeteix.

## B2. La gran diferència: la INDENTACIÓ

En Python **no hi ha claus `{}`**. El que mana és l'**espai a l'esquerra** (sagnat). Les línies amb el mateix sagnat formen un bloc:

```python
if temperature() > 25:
    display.show("!")    # AIXÒ va dins de l'if (està sagnat)
display.clear()          # AIXÒ ja és fora de l'if (sense sagnat)
```

> ⚠️ Si barreges espais i no sagnes bé, el programa fallarà. **La indentació és obligatòria**, no decorativa.

## B3. Variables (sense declarar tipus)

A diferència d'Arduino, **no escrius el tipus**:

```python
comptador = 0          # Python ja sap que és un enter
temperatura = 21.5     # decimal
nom = "robot"          # text
```

## B4. Entrades i sortides integrades

```python
if button_a.is_pressed():     # botó A premut?
    display.show(Image.HAPPY)  # mostra una cara contenta

x = accelerometer.get_x()     # llegeix la inclinació
nivell = display.read_light_level()  # sensor de llum integrat
```

## B5. Comunicació per ràdio (entre micro:bits)

```python
import radio
radio.on()
radio.config(group=7)     # mateix grup per parlar entre ells

radio.send("hola")        # l'emissor envia
missatge = radio.receive() # el receptor rep (o None si no hi ha res)
```

---

# PART C · Arduino vs MicroPython (taula comparativa)

| Concepte | Arduino (C/C++) | MicroPython (micro:bit) |
|---|---|---|
| **Preparació (un cop)** | `void setup() { }` | línies abans del `while True:` |
| **Bucle infinit** | `void loop() { }` | `while True:` |
| **Blocs de codi** | claus `{ }` | **indentació** (espais) |
| **Final de línia** | punt i coma `;` | salt de línia (res) |
| **Declarar variable** | amb tipus: `int x = 0;` | sense tipus: `x = 0` |
| **Comentari** | `// ...` o `/* ... */` | `# ...` |
| **Esperar** | `delay(500);` | `sleep(500)` |
| **Mostrar per depurar** | `Serial.println(x);` | `print(x)` |
| **Condició** | `if (x > 5) { }` | `if x > 5:` |
| **Bucle comptat** | `for (int i=0; i<3; i++){}` | `for i in range(3):` |

> **Conclusió:** els **conceptes són els mateixos** (variables, condicions, bucles, entrades/sortides). Només canvia la **manera d'escriure'ls** (la *sintaxi*). Si entens la lògica, canviar de llenguatge és qüestió de practicar la forma.

---

## Errors freqüents (i com resoldre'ls)

| Símptoma | Causa probable | Solució |
|---|---|---|
| No compila / "expected ;" | Falta un `;` (Arduino) | Revisa el final de cada línia. |
| "Port not found" en carregar | Placa o port mal seleccionats | Eines → Placa i Port correctes. |
| El LED no s'encén | Polaritat, sense resistència, pin equivocat | Revisa muntatge i el número de pin del codi. |
| `IndentationError` (Python) | Sagnat incorrecte | Alinea bé els espais del bloc. |
| Fa coses estranyes però compila | Error de **lògica** (no de sintaxi) | Posa `Serial.println`/`print` per veure els valors. |

---

## Mètode per llegir codi: PRIMM

No copiïs codi sense entendre'l. Segueix aquests passos:

1. **P**redir — abans d'executar, escriu què creus que farà.
2. **E**xecutar — carrega'l i comprova si encertaves.
3. **I**nvestigar — entén què fa cada línia.
4. **M**odificar — canvia coses i observa l'efecte.
5. **C**rear — escriu el teu propi a partir del que has après.

> Predir **abans** de provar és el pas que més t'ajuda a aprendre de veritat. → Practica-ho a **`SA0_fitxa_alumnat.md`**.
