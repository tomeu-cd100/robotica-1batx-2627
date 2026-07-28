# Pla d'implementació · Codi de referència dels tres robots (vista docent)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementació completa de referència de cada robot trimestral (3 `.ino` + 3 `.py`) publicada al web només en vista docent, dins dels solucionaris trimestrals.

**Architecture:** Fitxers de codi reals a `Classes/Solucionari/codi/` (ruta amb `Solucionari` → docent automàtic). Secció nova a cada `Solucionari_Tn_*.md` amb el codi explicat per blocs. Enllaços 🔑 des de dossiers i portades. CI compila els `.ino` nous; el QA ja cobreix els `.py`.

**Tech Stack:** Arduino C++ (UNO, `arduino:avr:uno`), MicroPython micro:bit, arduino-cli 1.5.1 local, generador web propi.

**Spec:** `Memòria treball/2026-07-28_Spec_codi_referencia_robots.md`

## Global Constraints

- Comentaris del codi en **català SENSE accents** (regla del projecte per a `.ino`/`.py` — CLAUDE.md).
- Text dels `.md` en català normal (amb accents).
- Pins EXACTES de l'spec (taules de cablatge dels dossiers) — no canviar-ne cap.
- Verificació local dels `.ino`: `arduino-cli compile --fqbn arduino:avr:uno <carpeta>` (instal·lant abans les llibreries de la tasca). Dels `.py`: `py -3.11 -m py_compile <fitxer>` (el codi micro:bit no s'executa a PC, només sintaxi).
- `py -3.11 tools/qa.py` ha d'acabar «✅ QA net.» abans de cada commit que toqui fonts.
- Fitxers amb Edit/Write (LF). Commits en català, Conventional Commits, línia final `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`. NO push (el fa el controlador al final).
- Decisió d'interpretació de l'spec (telemetria rover): el patró SA8 existent és **ràdio + display 5×5 + print serie** (cap codi OLED al repo). El `.py` de telemetria segueix aquest patró; l'OLED KS0271 queda anotat al solucionari com a ampliació pendent de validar amb maquinari (setembre).

---

### Task 1: `T1_mascota.ino`

**Files:**
- Create: `Classes/Solucionari/codi/T1_mascota/T1_mascota.ino`

**Interfaces:**
- Produces: sketch complet compilable; noms d'estats i funcions que la Task 4 citarà als blocs explicats: `enum Emocio { CONTENT, ESPANTAT, ADORMIT, CURIOS }`, `canviaEmocio()`, `mostraUlls()`, `melodia()`, `llegeixSensors()`.

- [ ] **Step 1: Instal·lar llibreries locals**

```bash
arduino-cli lib install "Adafruit NeoPixel" "DHT sensor library" "Adafruit Unified Sensor"
```

- [ ] **Step 2: Crear el sketch** (contingut complet):

```cpp
// Codi de referencia del Projecte T1 - La mascota reactiva (NOMES DOCENT)
// Integra el que s'apren a SA2 (sortides: llum i so) i SA3 (entrades: sensors).
// Emocions amb maquina d'estats + 3 comportaments sensor->resposta.
// Cablatge: el del dossier 00_Projecte_T1_Mascota.md (apartat Cablatge).

#include <Adafruit_NeoPixel.h>
#include <DHT.h>

// --- Pins (taula de cablatge del dossier) ---
const int PIN_NEOPIXEL = 6;   // ulls (tira WS2812B)
const int PIN_RGB_R = 9;      // LED RGB indicador d'humor
const int PIN_RGB_G = 10;
const int PIN_RGB_B = 11;
const int PIN_BRUNZIDOR = 8;
const int PIN_PIR = 2;        // nas (presencia)
const int PIN_POLSADOR = 3;   // caricia (pull-up intern)
const int PIN_DHT = 4;        // temperatura/humitat (extra)
const int PIN_MICROFON = A0;  // soroll
const int PIN_LLUM = A1;      // TEMT6000 (foscor)

// --- Ajustos que cada parella ha de calibrar ---
const int NUM_LEDS = 8;            // LEDs de la tira dels ulls (ajusta als reals)
const int LLINDAR_SOROLL = 600;    // 0-1023: per sobre = espant (calibra amb Serial)
const int LLINDAR_FOSCOR = 150;    // 0-1023: per sota = son (calibra amb Serial)
const unsigned long TEMPS_CALMA = 8000;  // ms sense estimuls per tornar a CONTENT

Adafruit_NeoPixel ulls(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);
DHT dht(PIN_DHT, DHT11);

// --- Maquina d'estats de les emocions ---
enum Emocio { CONTENT, ESPANTAT, ADORMIT, CURIOS };
Emocio emocio = CONTENT;
unsigned long tUltimEstimul = 0;
unsigned long tUltimPolsador = 0;   // debounce de la caricia

void setup() {
  Serial.begin(9600);
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_POLSADOR, INPUT_PULLUP);
  pinMode(PIN_RGB_R, OUTPUT);
  pinMode(PIN_RGB_G, OUTPUT);
  pinMode(PIN_RGB_B, OUTPUT);
  pinMode(PIN_BRUNZIDOR, OUTPUT);
  ulls.begin();
  dht.begin();
  // El PIR necessita 30-60 s d'estabilitzacio en engegar: la mascota "es desperta"
  canviaEmocio(ADORMIT);
}

void loop() {
  llegeixSensors();

  // Si fa estona que no passa res, torna a CONTENT (tret que dormi per foscor)
  if (emocio != ADORMIT && millis() - tUltimEstimul > TEMPS_CALMA) {
    canviaEmocio(CONTENT);
  }
  delay(50);
}

// --- Comportaments sensor->resposta (els 3 minims del producte) ---
void llegeixSensors() {
  int soroll = analogRead(PIN_MICROFON);
  int llum = analogRead(PIN_LLUM);

  // Traça per calibrar els llindars: obre el Serial Monitor a 9600
  Serial.print("soroll="); Serial.print(soroll);
  Serial.print(" llum="); Serial.print(llum);
  Serial.print(" temp="); Serial.println(dht.readTemperature());

  // 1) Soroll fort -> ESPANTAT
  if (soroll > LLINDAR_SOROLL) {
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
  if (digitalRead(PIN_PIR) == HIGH && emocio != CURIOS) {
    canviaEmocio(CURIOS);
    return;
  }
  // Extra: caricia al polsador -> CONTENT (amb debounce de 200 ms)
  if (digitalRead(PIN_POLSADOR) == LOW && millis() - tUltimPolsador > 200) {
    tUltimPolsador = millis();
    canviaEmocio(CONTENT);
  }
  // Extra (comentat al dossier): reaccionar a la temperatura del DHT11,
  // p. ex. si temp > 28 la mascota "te calor" -> afegiu un estat nou.
}

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

- [ ] **Step 3: Compilar**

```bash
cd "Classes/Solucionari/codi" && arduino-cli compile --fqbn arduino:avr:uno T1_mascota
```
Esperat: `Sketch uses ...` sense errors.

- [ ] **Step 4: Commit**

```bash
git add Classes/Solucionari/codi/T1_mascota
git commit -m "feat: codi de referencia del robot mascota (T1, solucionari docent)"
```

---

### Task 2: `T2_brac.ino` + 2 `.py` micro:bit

**Files:**
- Create: `Classes/Solucionari/codi/T2_brac/T2_brac.ino`
- Create: `Classes/Solucionari/codi/T2_brac_microbit_comandament.py`
- Create: `Classes/Solucionari/codi/T2_brac_microbit_receptor.py`

**Interfaces:**
- Produces: noms per a la Task 4: estats `NORMAL`/`EMERGENCIA`, funcions `.ino` `mouServos()`, `aturadaEmergencia()`; protocol de ràdio de texts `"B+" "B-" "C+" "C-" "P"` compartit pels dos `.py`; helper MicroPython `angle_a_analog()`.

- [ ] **Step 1: Crear `T2_brac.ino`:**

```cpp
// Codi de referencia del Projecte T2 - El brac robotic (NOMES DOCENT)
// Fase Arduino (SA4): 3 servos amb 3 potenciometres + aturada d'emergencia
// per sensor de col.lisio (maquina d'estats, estil SA6).
// Cablatge: el del dossier 00_Projecte_T2_Brac.md (fase Arduino).
// ATENCIO: els 3 servos amb ALIMENTACIO EXTERNA (piles AA) i GND comu. Mai per USB.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_COLZE = 10;
const int PIN_SERVO_PINCA = 11;
const int PIN_POT_BASE = A0;
const int PIN_POT_COLZE = A1;
const int PIN_POT_PINCA = A2;
const int PIN_COLLISIO = 2;    // LOW = xoc (modul KS0021)

// Limits d'angle REALS de cada servo: anoteu-los abans de programar res mes
// (rubrica del dossier: el servo mai ha de forcar el topall mecanic).
const int BASE_MIN = 10,  BASE_MAX = 170;
const int COLZE_MIN = 20, COLZE_MAX = 160;
const int PINCA_MIN = 40, PINCA_MAX = 120;  // tancada .. oberta

const unsigned long TEMPS_REARMAMENT = 2000;  // ms alliberat per tornar a NORMAL

Servo base, colze, pinca;

enum Estat { NORMAL, EMERGENCIA };
Estat estat = NORMAL;
unsigned long tAlliberat = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  base.attach(PIN_SERVO_BASE);
  colze.attach(PIN_SERVO_COLZE);
  pinca.attach(PIN_SERVO_PINCA);
}

void loop() {
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);

  switch (estat) {
    case NORMAL:
      if (xoc) {
        aturadaEmergencia();
      } else {
        mouServos();
      }
      break;

    case EMERGENCIA:
      // Rearmament MANUAL: cal que el sensor quedi alliberat TEMPS_REARMAMENT
      // seguits; aixi el brac no rebota contra l'obstacle.
      if (xoc) {
        tAlliberat = 0;
      } else if (tAlliberat == 0) {
        tAlliberat = millis();
      } else if (millis() - tAlliberat > TEMPS_REARMAMENT) {
        estat = NORMAL;
        Serial.println("REARMAT: control actiu de nou");
      }
      break;
  }
  delay(20);   // ~50 actualitzacions/s: suficient i suau
}

void mouServos() {
  // map() de 0-1023 al rang SEGUR de cada servo (mai 0-180 a cegues)
  base.write(map(analogRead(PIN_POT_BASE), 0, 1023, BASE_MIN, BASE_MAX));
  colze.write(map(analogRead(PIN_POT_COLZE), 0, 1023, COLZE_MIN, COLZE_MAX));
  pinca.write(map(analogRead(PIN_POT_PINCA), 0, 1023, PINCA_MIN, PINCA_MAX));
}

void aturadaEmergencia() {
  estat = EMERGENCIA;
  tAlliberat = 0;
  // Els servos es queden on son (no es tornen a escriure): aturada immediata
  Serial.println("EMERGENCIA: xoc detectat, servos aturats");
}
```

- [ ] **Step 2: Crear `T2_brac_microbit_comandament.py`:**

```python
# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase micro:bit (SA5): COMANDAMENT (2a micro:bit, la que es te a la ma).
# Inclina per moure base i colze; boto A+B alhora obre/tanca la pinca.
# Protocol de radio (texts): "B+" "B-" (base), "C+" "C-" (colze), "P" (pinca).

from microbit import *
import radio

GRUP = 10   # CANVIA'L pel numero de la vostra parella (les 2 plaques igual)

radio.on()
radio.config(group=GRUP)

while True:
    x = accelerometer.get_x()   # inclinacio esquerra/dreta -> base
    y = accelerometer.get_y()   # inclinacio davant/enrere -> colze

    if x > 300:
        radio.send("B+")
    elif x < -300:
        radio.send("B-")

    if y > 300:
        radio.send("C+")
    elif y < -300:
        radio.send("C-")

    if button_a.was_pressed() and button_b.was_pressed():
        radio.send("P")          # obre/tanca la pinca (commutador)
        display.show(Image.TARGET)
    else:
        display.show(Image.ARROW_N)

    sleep(100)   # ~10 ordres/s: suficient per a un control suau
```

- [ ] **Step 3: Crear `T2_brac_microbit_receptor.py`:**

```python
# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase micro:bit (SA5-SA6): RECEPTOR (la micro:bit del brac, al Micro:shield).
# Rep ordres per radio i mou els 3 servos (P0 base, P1 colze, P2 pinca).
# Sensor de col.lisio a P8: aturada d'emergencia com a la fase Arduino.
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la placa.

from microbit import *
import radio

GRUP = 10       # el MATEIX numero que el comandament
PAS = 3         # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (anoteu els reals del vostre brac)
BASE_MIN, BASE_MAX = 10, 170
COLZE_MIN, COLZE_MAX = 20, 160
PINCA_TANCADA, PINCA_OBERTA = 40, 120

def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)

def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))

radio.on()
radio.config(group=GRUP)

base = 90
colze = 90
pinca = PINCA_TANCADA
mou(pin0, base)
mou(pin1, colze)
mou(pin2, pinca)

emergencia = False

while True:
    # Sensor de col.lisio (KS0021): 0 = xoc -> emergencia
    if pin8.read_digital() == 0:
        emergencia = True
        display.show(Image.NO)
    elif emergencia:
        # Rearmament: alliberat i prem el boto A de la placa del brac
        if button_a.was_pressed():
            emergencia = False
            display.show(Image.YES)

    ordre = radio.receive()
    if ordre is not None and not emergencia:
        if ordre == "B+":
            base = min(base + PAS, BASE_MAX)
            mou(pin0, base)
        elif ordre == "B-":
            base = max(base - PAS, BASE_MIN)
            mou(pin0, base)
        elif ordre == "C+":
            colze = min(colze + PAS, COLZE_MAX)
            mou(pin1, colze)
        elif ordre == "C-":
            colze = max(colze - PAS, COLZE_MIN)
            mou(pin1, colze)
        elif ordre == "P":
            pinca = PINCA_OBERTA if pinca == PINCA_TANCADA else PINCA_TANCADA
            mou(pin2, pinca)
        display.show(Image.DIAMOND_SMALL)
    sleep(20)
```

- [ ] **Step 4: Verificar**

```bash
cd "Classes/Solucionari/codi" && arduino-cli compile --fqbn arduino:avr:uno T2_brac
py -3.11 -m py_compile T2_brac_microbit_comandament.py T2_brac_microbit_receptor.py
```
Esperat: compilació neta; `py_compile` sense sortida. (Els `.py` importen `microbit`, que no existeix a PC: per això només sintaxi, mai executar-los.)

- [ ] **Step 5: Commit**

```bash
git add Classes/Solucionari/codi/T2_brac Classes/Solucionari/codi/T2_brac_microbit_*.py
git commit -m "feat: codi de referencia del brac robotic (T2, solucionari docent)"
```

---

### Task 3: `T3_rover.ino` + telemetria micro:bit

**Files:**
- Create: `Classes/Solucionari/codi/T3_rover/T3_rover.ino`
- Create: `Classes/Solucionari/codi/T3_rover_microbit_telemetria.py`

**Interfaces:**
- Produces: noms per a la Task 4: modes `SEGUIR_LINIA`/`EVITAR_OBSTACLES`/`ATURAT`, funcions `endavant()`, `enrere()`, `giraEsquerra()`, `giraDreta()`, `atura()`, `distanciaCm()`. El `.py` emet per ràdio al grup 10 (patró SA8) i el receptor és el `02_telemetria_receptor.py` de SA8 existent (es referencia, no es duplica).

- [ ] **Step 1: Crear `T3_rover.ino`:**

```cpp
// Codi de referencia del Projecte T3 - El rover autonom (NOMES DOCENT)
// Integra els reptes de SA7: seguir linia i evitar obstacles, amb maquina
// d'estats i les funcions de moviment fixades al cablatge del dossier.
// Cablatge: el del dossier 00_Projecte_T3_Rover.md (apartat Cablatge).
// Alimentacio: portapiles 6xAA al L298N; MAI la UNO per USB amb motors en marxa.

const int PIN_ENA = 5;   // velocitat motor esquerre (PWM)
const int PIN_IN1 = 4;
const int PIN_IN2 = 3;
const int PIN_ENB = 6;   // velocitat motor dret (PWM)
const int PIN_IN3 = 7;
const int PIN_IN4 = 8;
const int PIN_TRIG = 12;
const int PIN_ECHO = 11;
const int PIN_LINIA_ESQ = A0;
const int PIN_LINIA_DRET = A1;
const int PIN_PARAXOCS = 2;   // LOW = xoc (KS0021)

// --- Ajustos a calibrar amb el vostre rover i la vostra pista ---
const int VEL_CREUER = 160;      // 0-255: velocitat de treball
const int VEL_GIR = 140;
const int LLINDAR_LINIA = 500;   // 0-1023: per sobre = veu la linia (calibreu!)
const int DIST_OBSTACLE = 20;    // cm: per sota, esquiva

// MODE del rover: canvieu aquesta constant per triar el comportament.
// (Ampliacio possible: commutar de mode amb un polsador o per temps.)
enum Mode { SEGUIR_LINIA, EVITAR_OBSTACLES, ATURAT };
Mode mode = SEGUIR_LINIA;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_IN1, OUTPUT); pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT); pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENA, OUTPUT); pinMode(PIN_ENB, OUTPUT);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_PARAXOCS, INPUT_PULLUP);
  atura();
}

void loop() {
  // Para-xocs: aturada immediata en QUALSEVOL mode (prioritat maxima)
  if (digitalRead(PIN_PARAXOCS) == LOW) {
    atura();
    mode = ATURAT;
    Serial.println("XOC: rover aturat (reinicia per tornar a comencar)");
  }

  switch (mode) {
    case SEGUIR_LINIA:    seguirLinia(); break;
    case EVITAR_OBSTACLES: evitarObstacles(); break;
    case ATURAT:          atura(); break;
  }
  delay(30);
}

// --- Comportament 1: seguir linia (2 sensors, control tot-o-res) ---
void seguirLinia() {
  bool esq = analogRead(PIN_LINIA_ESQ) > LLINDAR_LINIA;
  bool dret = analogRead(PIN_LINIA_DRET) > LLINDAR_LINIA;

  if (esq && dret) {
    endavant(VEL_CREUER);      // els dos veuen linia: recte
  } else if (esq) {
    giraEsquerra(VEL_GIR);     // la linia fuig cap a l'esquerra
  } else if (dret) {
    giraDreta(VEL_GIR);
  } else {
    // Linia perduda: gira lent sobre si mateix per retrobar-la
    giraDreta(VEL_GIR - 30);
  }
}

// --- Comportament 2: evitar obstacles amb l'ultraso ---
void evitarObstacles() {
  long d = distanciaCm();
  Serial.print("distancia="); Serial.println(d);
  if (d < DIST_OBSTACLE) {
    atura();
    delay(200);
    enrere(VEL_GIR);
    delay(400);
    giraDreta(VEL_GIR);   // esquiva sempre per la dreta (senzill i predictible)
    delay(350);
  } else {
    endavant(VEL_CREUER);
  }
}

// Lectura de l'HC-SR04. El 0 (sense eco) es tracta com a "molt lluny" (400):
// el mateix criteri que el sketch d'alarma de SA3, per evitar falses esquives.
long distanciaCm() {
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long durada = pulseIn(PIN_ECHO, HIGH, 25000);   // timeout 25 ms (~4 m)
  if (durada == 0) return 400;
  return durada / 58;
}

// --- Funcions de moviment (es fixen UNA vegada amb la taula de cablatge) ---
void endavant(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void enrere(int vel) {
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraEsquerra(int vel) {
  // Gir sobre l'eix: motor esquerre enrere, motor dret endavant
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraDreta(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void atura() {
  analogWrite(PIN_ENA, 0); analogWrite(PIN_ENB, 0);
}
```

- [ ] **Step 2: Crear `T3_rover_microbit_telemetria.py`:**

```python
# Codi de referencia del Projecte T3 - Rover autonom (NOMES DOCENT)
# Telemetria (SA8): la micro:bit del pis superior del rover emet l'estat
# per radio, seguint el mateix patro que 01_telemetria_emissor.py de SA8.
# El receptor es el mateix 02_telemetria_receptor.py de SA8 (a l'ordinador
# del docent o en una segona placa).
# Nota: la pantalla OLED KS0271 del kit queda com a ampliacio pendent de
# validar amb el maquinari real (setembre); mentrestant, display 5x5 + serie.

from microbit import *
import radio

GRUP = 10   # CANVIA'L pel numero de la vostra parella

radio.on()
radio.config(group=GRUP)

comptador_xocs = 0

while True:
    # La micro:bit va muntada al rover: l'accelerometre detecta sotracs
    # (xoc o frenada brusca) i el moviment general.
    if accelerometer.was_gesture("shake"):
        comptador_xocs += 1
        display.show(Image.SURPRISED)
    else:
        display.show(Image.HAPPY)

    x = accelerometer.get_x()
    y = accelerometer.get_y()

    # Mateix format de missatge que SA8: "CLAU:valor;CLAU:valor"
    missatge = "X:" + str(x) + ";Y:" + str(y) + ";XOCS:" + str(comptador_xocs)
    radio.send(missatge)
    print(missatge)   # tambe pel port serie, per registrar-ho a l'ordinador

    sleep(500)   # 2 enviaments per segon: suficient per a telemetria
```

- [ ] **Step 3: Verificar**

```bash
cd "Classes/Solucionari/codi" && arduino-cli compile --fqbn arduino:avr:uno T3_rover
py -3.11 -m py_compile T3_rover_microbit_telemetria.py
```

- [ ] **Step 4: Commit**

```bash
git add Classes/Solucionari/codi/T3_rover Classes/Solucionari/codi/T3_rover_microbit_telemetria.py
git commit -m "feat: codi de referencia del rover autonom (T3, solucionari docent)"
```

---

### Task 4: Seccions al solucionari trimestral + enllaços des de dossiers i portades

**Files:**
- Modify: `Classes/Solucionari/Solucionari_T1_SA1-SA3.md` (afegir secció al final)
- Modify: `Classes/Solucionari/Solucionari_T2_SA4-SA6.md` (afegir secció al final)
- Modify: `Classes/Solucionari/Solucionari_T3_SA7-SA9.md` (afegir secció al final)
- Modify: `Classes/00_General/00_Projecte_T1_Mascota.md`, `00_Projecte_T2_Brac.md`, `00_Projecte_T3_Rover.md` (1 línia d'enllaç cadascun)
- Modify: `Classes/00_General/00_Projecte_T1_portada.md`, `00_Projecte_T2_portada.md`, `00_Projecte_T3_portada.md` (1 línia d'enllaç cadascun)

**Interfaces:**
- Consumes: els 6 fitxers de codi committats (Tasks 1–3) — el codi dels blocs es COPIA d'aquests fitxers (fragments literals, no reescrits), perquè fitxer i pàgina no diviergeixin.

- [ ] **Step 1: Secció a `Solucionari_T1_SA1-SA3.md`** — afegir al final:

Estructura fixa (el codi dels blocs, copiat LITERALMENT de `T1_mascota.ino`):

```markdown
---

## 🤖 Codi de referència del robot del trimestre: la mascota

> Implementació completa d'exemple del producte final (dossier
> [🐣 Projecte T1](../00_General/00_Projecte_T1_Mascota.md)): emocions amb
> màquina d'estats + 3 comportaments sensor→resposta. És UNA solució
> possible: les parelles en poden fer variants. Fitxer complet:
> [`T1_mascota.ino`](codi/T1_mascota/T1_mascota.ino).

### La màquina d'estats de les emocions
[explicació 2-4 línies + bloc de codi: enum Emocio + canviaEmocio()]

### Els 3 comportaments sensor→resposta
[explicació + bloc de codi: llegeixSensors()]

### Llums i so
[explicació + bloc de codi: mostraUlls() + colorHumor() + melodia()]

### Calibratge
[explicació 2-3 línies: llindars per Serial, NUM_LEDS, temps de calma]
```

Les explicacions es redacten (català normal), breus i didàctiques per al docent; cada bloc de codi és un fragment literal del fitxer.

- [ ] **Step 2: Secció a `Solucionari_T2_SA4-SA6.md`** — mateixa estructura amb títol «🤖 Codi de referència del robot del trimestre: el braç», enllaç al dossier T2 i tres fitxers; blocs: «Control amb potenciòmetres i límits d'angle» (`mouServos()` + constants de límits), «Aturada d'emergència (màquina d'estats)» (`enum Estat` + cas EMERGENCIA), «El comandament per ràdio (micro:bit)» (protocol d'ordres + fragment del comandament), «El receptor: servos amb MicroPython» (`angle_a_analog()` + `mou()`). Enllaços als 3 fitxers: `codi/T2_brac/T2_brac.ino`, `codi/T2_brac_microbit_comandament.py`, `codi/T2_brac_microbit_receptor.py`.

- [ ] **Step 3: Secció a `Solucionari_T3_SA7-SA9.md`** — títol «🤖 Codi de referència del robot del trimestre: el rover», enllaç al dossier T3; blocs: «Modes i màquina d'estats» (`enum Mode` + `loop()`), «Seguir línia» (`seguirLinia()`), «Evitar obstacles i el 0 de l'ultrasò» (`evitarObstacles()` + `distanciaCm()` amb la nota del criteri de SA3), «Funcions de moviment» (`endavant()`/girs/`atura()`), «Telemetria (micro:bit, patró SA8)» (fragment del `.py` + nota OLED pendent de maquinari + referència al receptor de SA8 `../SA8/codi/02_telemetria_receptor.py`... — compte: ruta font real `../../Classes/SA8/codi/02_telemetria_receptor.py` des de `Classes/Solucionari/`; verifica-la amb el link-checker del QA). Enllaços: `codi/T3_rover/T3_rover.ino`, `codi/T3_rover_microbit_telemetria.py`.

- [ ] **Step 4: Enllaços des dels dossiers** — a cada `00_Projecte_Tn_*.md`, al final de l'apartat «Cablatge» (T1/T2) o «Sessió 0 de muntatge» (T3), UNA línia:

```markdown
> 🔑 **Per al docent:** implementació completa de referència al
> [solucionari del trimestre](../Solucionari/Solucionari_T1_SA1-SA3.md) (secció «Codi de referència»).
```

(ajustant el nom del fitxer per a T2/T3 — `Solucionari_T2_SA4-SA6.md`, `Solucionari_T3_SA7-SA9.md`).

- [ ] **Step 5: Enllaços des de les portades** — a cada `00_Projecte_Tn_portada.md`, línia nova al final de la secció «Com s'avalua»:

```markdown
> 🔑 **Per al docent:** hi ha una implementació completa de referència al
> [solucionari del trimestre](../Solucionari/Solucionari_T1_SA1-SA3.md).
```

(mateix ajust de nom per a T2/T3).

- [ ] **Step 6: Build + QA + verificació docent-only**

```bash
py -3.11 web/_generador/generar.py
py -3.11 tools/qa.py     # ✅ QA net (el link-checker valida totes les rutes noves)
grep -l "Codi de referència" web/reptes/solucionari/*.html web/classes/*.html 2>/dev/null || true
```

Verificar en quin HTML surt cada secció i que la pàgina del solucionari trimestral es genera amb `public="docent"` (grep `data-public="docent"` al fitxer HTML corresponent de `web/`).

- [ ] **Step 7: Commit**

```bash
git add Classes/Solucionari/*.md Classes/00_General/00_Projecte_T*.md
git commit -m "feat: seccions de codi de referencia dels robots als solucionaris trimestrals"
```

---

### Task 5: CI (`qa.yml`) + verificació final

**Files:**
- Modify: `.github/workflows/qa.yml` (job `compilar-sketches`)

- [ ] **Step 1: Afegir ruta i llibreries** — al job `compilar-sketches`:

```yaml
          libraries: |
            - name: Servo
            - name: Adafruit NeoPixel
            - name: DHT sensor library
            - name: Adafruit Unified Sensor
```

i a `sketch-paths`, després de la línia `- Reptes/Solucionari/SA7`:

```yaml
            - Classes/Solucionari/codi
```

Actualitzar també el comentari del bloc si cal (els `.py` de `Classes/Solucionari/codi` els vigila `tools/qa.py`, com els de SA5/SA8).

- [ ] **Step 2: Verificació final completa**

```bash
cd "Classes/Solucionari/codi" && for s in T1_mascota T2_brac T3_rover; do arduino-cli compile --fqbn arduino:avr:uno $s || echo "ERROR $s"; done
py -3.11 tools/qa.py
py -3.11 web/_generador/generar.py
cd web/_generador && py -3.11 -m pytest tests/ -q
```

Tot verd.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/qa.yml
git commit -m "ci: compila els sketches de referencia dels robots trimestrals"
```

---

## Self-review (feta en escriure el pla)

- **Cobertura de l'spec:** 6 fitxers ✔ T1–T3 · pins exactes ✔ (contrastats amb les taules dels dossiers) · seccions solucionari + enllaços dossiers/portades ✔ T4 · CI + llibreries ✔ T5 · `.py` coberts pel QA sense canvis ✔ (rglob `codi/*.py`) · català sense accents als comentaris ✔ · decisió OLED→ràdio documentada a Global Constraints i al comentari del `.py`.
- **Sense placeholders:** tot el codi és complet i literal; les explicacions dels blocs de la Task 4 es redacten sobre fragments copiats dels fitxers (font única).
- **Consistència de noms:** funcions citades a la Task 4 = definides a Tasks 1–3 (`canviaEmocio`, `llegeixSensors`, `mouServos`, `angle_a_analog`, `seguirLinia`, `evitarObstacles`, `distanciaCm`).
- **Risc conegut:** la ruta relativa del receptor SA8 des de `Classes/Solucionari/` és `../SA8/codi/02_telemetria_receptor.py` (dins de `Classes/`) — el QA la validarà; la Task 4 ho ha de comprovar amb el link-checker abans de committar.
