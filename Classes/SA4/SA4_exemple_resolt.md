# SA4 · Exemple resolt (model «jo ho faig») — Ventilador orientable de sobretaula

> **Nota docent:** mostra'l **després del primer intent** amb `01_servo_potenciometre.ino` i
> `02_motor_pont_h.ino`, mai abans. No és la solució de la barrera (S4): és un problema **anàleg**
> resolt pas a pas perquè l'alumnat vegi *com es pensa*, no què s'ha de copiar. Comenta en veu alta
> el pas «🧭 Com ho penso» (predicció abans de codi, PRIMM) i, sobretot, el «⚠️ Contraexemple»
> (seguretat elèctrica: massa comuna i alimentació externa).

---

![Pont H L298N per controlar el sentit i la velocitat d'un motor](img/sa4-pont-h-l298n.svg)

## 🔑 El repte model

> Fer un **ventilador orientable de sobretaula**: un **servo** que **orienta el cap** (l'apunta a un
> angle i fa una passada d'esquerra a dreta) i un **motor DC** que mou les aspes amb **pont H**,
> canviant de **velocitat** (bufa fort / bufa suau) i de **sentit** (mode extractor) i que sap **aturar-se**.

Fa servir només conceptes de la SA4: llibreria `Servo.h` (`attach`, `write` 0–180°), pont H **L298N**
(`ENA` per velocitat amb PWM, `IN1`/`IN2` per al sentit), **alimentació externa** i **massa comuna**,
i **una funció per gest** (abstracció). El circuit és el mateix dels sketches: servo senyal → **pin 9**;
L298N **ENA → pin 5 (`~`)**, **IN1 → pin 7**, **IN2 → pin 8**; GND Arduino + GND piles units (**massa comuna**).

---

## 🧭 Com ho penso (abans d'escriure codi)

1. **Analitzo:** hi ha **dos actuadors diferents**. El servo controla **posició** (angle 0–180°) →
   això ja ho sé fer amb `Servo.h` i `write()`. El motor DC controla **velocitat i sentit** → això va
   pel **pont H**: `IN1`/`IN2` decideixen el sentit i `ENA` (PWM) la velocitat, com a `02_motor_pont_h`.
2. **Descomponc:** faré **una funció per gest** (`orienta()`, `bufa()`, `expulsa()`, `atura()`), com als
   sketches reals. Així el `loop()` es llegeix com una frase i puc reutilitzar els gestos.
3. **🔮 PREDIU (fes-ho tu abans de llegir el codi):** amb `cap.write(90)` el servo apuntarà a…
   ☐ 0° ☐ **al centre (90°)** ☐ 180°. I si a `bufa()` poso `IN1=HIGH`, `IN2=LOW` i canvio a
   `IN1=LOW`, `IN2=HIGH`, el motor… ☐ va més ràpid ☐ **gira al revés** ☐ s'atura. I `analogWrite(ENA, 0)`
   equival a… ☐ velocitat mitjana ☐ **motor aturat**.

---

## 💡 La solució anotada

```cpp
/*
  SA4 - exemple_ventilador_orientable.ino  (EXEMPLE MODEL, no es el producte)
  Ventilador de sobretaula: un SERVO orienta el cap (posicio, 0-180 graus)
  i un MOTOR DC (pont H L298N) mou les aspes (velocitat i sentit).
  Modelem UNA FUNCIO PER GEST: orienta(), bufa(), expulsa(), atura().

  Circuit:
    Servo:  senyal=9 ; V+=alimentacio externa 5V ; GND=MASSA COMUNA
    L298N:  ENA=5 (~PWM, velocitat) ; IN1=7, IN2=8 (sentit)
            OUT1/OUT2 -> motor ; +12V -> piles ; GND -> MASSA COMUNA
*/

#include <Servo.h>

Servo cap;                 // el servo que orienta el cap del ventilador

const int ENA = 5;         // ha de ser un pin PWM (~): regula la VELOCITAT
const int IN1 = 7;         // decideix el SENTIT de gir del motor
const int IN2 = 8;         // decideix el SENTIT de gir del motor

const int CENTRE = 90;     // angle mirant al davant
const int PAS = 2;         // graus per pas de la passada (com mes petit, mes suau)

// --- Gestos del SERVO (posicio) ---
void orienta(int angle) {
  cap.write(angle);        // write() espera un angle de 0 a 180 graus
}

// --- Gestos del MOTOR DC (velocitat i sentit) ---
void bufa(int velocitat) {     // aspes cap endavant ; velocitat 0..255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, velocitat); // PWM: 0 aturat, 255 maxim
}

void expulsa(int velocitat) {  // sentit CONTRARI (IN1/IN2 intercanviats)
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, velocitat);
}

void atura() {                 // frena el motor del tot
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void setup() {
  cap.attach(9);           // SENSE attach() el servo no rep senyal i no es mou
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  orienta(CENTRE);         // arrenca mirant al davant
}

void loop() {
  // 1) Fa una passada d'esquerra a dreta mentre bufa fort
  bufa(220);
  for (int a = 30; a <= 150; a += PAS) {
    orienta(a);
    delay(20);             // dona temps al servo a arribar a cada angle
  }
  // 2) Torna al centre i baixa a velocitat suau
  orienta(CENTRE);
  bufa(120);
  delay(3000);
  // 3) Mode extractor: gira al reves un moment
  expulsa(120);
  delay(2000);
  // 4) Atura del tot i descansa
  atura();
  delay(1000);
}
```

**Per què està escrit així (🌟):**
- **Una funció per gest** (`orienta`, `bufa`, `expulsa`, `atura`): el `loop()` es llegeix com una frase i reutilitzo els gestos. És la mateixa **abstracció** que als sketches reals de la SA4.
- **Constants amb nom** (`ENA`, `IN1`, `IN2`, `CENTRE`, `PAS`): si canvio un pin o l'angle central, ho toco en **un sol lloc**.
- Trio l'eina segons el que controlo: `write(angle)` per a la **posició** del servo; `IN1`/`IN2` per al **sentit** i `analogWrite(ENA, …)` per a la **velocitat** del motor. Posició i velocitat es controlen de maneres diferents.
- `bufa()` i `expulsa()` només es diferencien en **quin pin va a HIGH**: intercanviar `IN1`/`IN2` inverteix el sentit. Aquesta és tota la màgia del pont H.

---

## 🔬 Provo i mesuro

- **Predicció ✔:** `cap.write(90)` apunta al centre; intercanviar `IN1`/`IN2` inverteix el gir; `analogWrite(ENA, 0)` atura el motor.
- **Racó de mesura (multímetre):** amb el motor a `bufa(120)` la tensió mitjana a `ENA` és **menor** que a `bufa(220)` — el PWM encén i apaga molt de pressa i el motor «veu» una tensió mitjana més baixa, per això gira més lent.
- Si el servo **vibra o no arriba** a l'angle → segurament l'estic alimentant des del pin 5V de l'Arduino; passo a **alimentació externa** i mantinc la **massa comuna**.
- **Límit honest:** amb `delay()`, mentre el servo fa la passada el motor manté una velocitat fixa; si volgués **oscil·lar i canviar de velocitat alhora sense pauses**, hauria de fer servir `millis()` (com a `05_dos_leds_millis.ino`), no `delay()`.

---

## ⚠️ Contraexemple (errors típics i com es detecten)

- **Alimento el motor DC des del pin 5V de l'Arduino** → en arrencar el motor, l'Arduino **es reinicia** (pic de corrent). *Solució:* el motor sempre des d'**alimentació externa** (piles/font) via `+12V` del L298N; **mai** des del pin de l'Arduino.
- **Oblido la massa comuna** (no uneixo el GND de l'Arduino amb el GND de les piles) → el motor **no gira o va erràtic**, encara que el codi sigui correcte. *Solució:* GND Arduino + GND piles + GND L298N **units**.
- **Connecto `ENA` a un pin sense `~`** (p. ex. el pin 7) i faig `analogWrite(ENA, 120)` → el motor **no regula velocitat**: va a tope o parat. *Solució:* `ENA` a un pin PWM (3, 5, 6, 9, 10, 11).
- **Escric `cap.write(200)`** → el rang de `write()` és **0–180°**; per sobre el servo **satura** a 180 i no fa res de nou. (I si oblido `cap.attach(9)` al `setup()`, el servo **no es mou** encara que cridi `orienta()`.)

---

## 📔 Diari de bord (entrada model, 1a persona)

> **Sessió 2:** He fet un ventilador amb un **servo** (`Servo.h`, `write` 0–180°) que orienta el cap i
> un **motor DC** amb **pont H L298N**. He modelat **una funció per gest**: `orienta()`, `bufa()`,
> `expulsa()` i `atura()`. Al principi l'Arduino **es reiniciava** en arrencar el motor: l'alimentava
> des del pin 5V. En passar a **alimentació externa** amb **massa comuna** ja va anar. He entès que
> `IN1`/`IN2` decideixen el **sentit** i `ENA` (PWM) la **velocitat**, i que el servo es controla per
> **posició**, no per velocitat. **Evidència:** esquema del pont H + vídeo de la passada i del canvi de sentit.

**Per què és una bona entrada:** usa el **vocabulari clau** (servo, pont H, `ENA`/PWM, `IN1`/`IN2`,
massa comuna, alimentació externa), explica *el com*, i és **honesta amb la dificultat** (el reinici) i com es va resoldre.

---

*Exemple resolt de la SA4. Model de treball per a l'alumnat (alliberament gradual: es mostra
després del primer intent). Es recolza en `codi/01_servo_potenciometre`, `codi/02_motor_pont_h`
i `codi/04_barrera_automatica`. Llicència CC BY-SA 4.0.*
