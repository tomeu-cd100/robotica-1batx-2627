# Solucionari de reptes — Trimestre 2 (SA4-SA6)

> Solucions orientatives dels reptes **"+ repte" / "+ ampliació"**. Hi pot haver més d'una solució vàlida.

---

## SA4

### Repte S1: escombrada del servo de la base (sweep)

Guarda-la: a la S2 és l'eina de calibratge del bloc D del MeArm.

```cpp
#include <Servo.h>
Servo servo;
void setup(){ servo.attach(9); }
void loop(){
  for (int a = 0; a <= 180; a++) { servo.write(a); delay(15); }
  for (int a = 180; a >= 0; a--) { servo.write(a); delay(15); }
}
```

### + Repte S1: dos servos coordinats (base i pinça)
```cpp
#include <Servo.h>
Servo base, pinca;
void setup(){ base.attach(9); pinca.attach(11); }
void loop(){
  // la base gira i la pinca actua a cada extrem
  base.write(45);  pinca.write(120); delay(600);   // estacio, pinca oberta
  base.write(135); pinca.write(60);  delay(600);   // desti, pinca tancada
}
```

### Repte S3: pinça proporcional a la distància + guarda de seguretat
```cpp
void loop(){
  float d = mesuraDistancia();
  if (d < 3) {
    // guarda: massa a prop (o lectura dolenta): no es mou res
  } else {
    int obertura = map(constrain((int)d, 3, 30), 3, 30, PINCA_OBERTA, PINCA_TANCADA);
    pinca.write(obertura);               // com mes a prop, mes oberta
    base.write(d < DIST_OBJECTE ? BASE_ESTACIO : BASE_REPOS);
  }
  delay(100);
}
```

Error esperable: posar el `constrain()` **després** del `map()` amb els límits de la distància (3, 30) en lloc dels de la pinça. Aquí es retalla l'**entrada** abans de traduir-la; així l'angle mai surt del rang segur de la pinça.

### Reptes A/B/C (missions del braç)

Solucions completes (`minim` i `ampliat`) a `Reptes/Solucionari/SA4/`:
`A_brac_casa` (botó de casa), `B_brac_dispensador` (agafar i deixar) i
`C_brac_replay` (registre i replay, amb EEPROM a l'ampliat).

---

## SA5 (MicroPython)

### Repte S1: una imatge pròpia per articulació
```python
from microbit import *

ARTICULACIONS = ["B", "E", "D", "P"]
IMATGES = [Image.ARROW_E,                     # base: gira
           Image("00900:09990:00900:00900:00900"),   # esquerre: puja
           Image("00900:00900:00900:09990:00900"),   # dret: avanca
           Image("90009:09090:00000:09090:90009")]   # pinca
triada = 0

while True:
    if button_a.was_pressed():
        triada = (triada - 1) % len(ARTICULACIONS)
    elif button_b.was_pressed():
        triada = (triada + 1) % len(ARTICULACIONS)
    display.show(IMATGES[triada])
    sleep(100)
```

Dues llistes **paral·leles** (mateix índex): és la llavor dels arrays per servo de la SA6. L'operador `%` fa el selector circular en una línia.

### Repte S2: zona morta proporcional (fletxa petita / gran)
```python
from microbit import *

while True:
    x = accelerometer.get_x()
    if x > 700:
        display.show(Image.ARROW_E)
    elif x > 300:
        display.show(Image("00000:00090:00009:00090:00000"))   # fletxa petita
    elif x < -700:
        display.show(Image.ARROW_W)
    elif x < -300:
        display.show(Image("00000:09000:90000:09000:00000"))
    else:
        display.show(Image.DIAMOND_SMALL)
    sleep(100)
```

Error esperable: posar `x > 300` **abans** de `x > 700` (la fletxa gran no surt mai: la primera condició certa guanya).

### Repte S3: el servo esquerre amb els botons
```python
    # dins del while True del 03_radio_comandament, abans de decidir la inclinacio
    if button_a.is_pressed() and not button_b.is_pressed():
        ordre = "E+"
    elif button_b.is_pressed() and not button_a.is_pressed():
        ordre = "E-"
```

Cal que A **sol** i B **sol** excloguin A+B (la `P`); si no, mantenint els dos, el braç alternaria `E+`, `E-` i `P`.

### Reptes A/B/C (comandament del braç)

Solucions completes (`minim` i `ampliat`) a `Reptes/Solucionari/SA5/`:
`A_selector_radio` (selector + bloqueig + saludet), `B_inclinacio_fina`
(zona morta, velocitat proporcional i calibratge) i `C_comandament_complet`
(les 4 articulacions, gravació i pont amb botons d'estat: és el
comandament de referència del braç).

---

## SA6

### Repte S1: el diagrama de blocs del braç

```
 consigna ──▶ [Arduino] ──▶ [servo base] ──▶ posició de la base
 (anar al zero)    ▲                               │
                   └──── [final de carrera] ◀──────┘   homing = llaç TANCAT

 punts gravats ──▶ [Arduino] ──▶ [4 servos] ──▶ posició del braç
                                                        replay = llaç OBERT
                                                        (ningú no comprova que hi arriba)
```

Error esperable: posar el sensor de col·lisió com a «sortida». La sortida és la posició; el sensor la **mesura** i la torna enrere.

### + Repte S2: LED d'estat de la pinça
```cpp
// al setup(): pinMode(5, OUTPUT);
// al final del loop(), despres de decidir:
digitalWrite(5, pincaTancada);   // el LED surt de l'ESTAT, no de la distancia
```

Si el LED es calcula amb `d < TANCA_CM`, a la finestra d'histèresi el LED i la pinça diuen coses diferents.

### Repte S3: afegir l'estat CASA a la màquina d'estats
```cpp
enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA, CASA };

// a REPOS: if (b && numPunts == 0) canviaEstat(CASA);
case CASA:
  escriu(90, 90, 90, PINCA_MIN);      // posicio de repos segura
  canviaEstat(REPOS);
  break;
```

Cal afegir el `case` també a `canviaEstat()` (el missatge) i al **diagrama d'estats**: si no hi és al dibuix, no ha d'existir al codi.

### Reptes A/B/C (control del braç)

Solucions completes (`minim` i `ampliat`) a `Reptes/Solucionari/SA6/`:
`A_pinca_histeresi` (LED, finestra regulable, filtre i comptador),
`B_homing_sequencia` (homing, seqüència relativa al zero amb `millis()` i
rearmament) i `C_proporcional_4` (les 4 articulacions arriben alhora amb
velocitat màxima).

---

## 🤖 Codi de referència del robot del trimestre: el braç

> Implementació completa d'exemple del producte final (dossier
> [🦾 Projecte T2](../00_General/00_Projecte_T2_Brac.md)): el **MeArm de 4
> servos** amb l'Arduino tot el trimestre, el comandament per ràdio a través
> d'una micro:bit **pont** i la màquina d'estats de la SA6. És UNA solució
> possible: cadascú en pot fer variants. Pins i protocol d'ordres: al
> [dossier](../00_General/00_Projecte_T2_Brac.md#cablatge).
> Fitxers: [`T2_mearm_arduino.ino`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_mearm_arduino/T2_mearm_arduino.ino) (producte de SA4),
> [`T2_brac_estats.ino`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac_estats/T2_brac_estats.ino) (producte de SA6),
> [`T2_brac_microbit_comandament.py`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac_microbit_comandament.py) (a la mà),
> [`T2_brac_microbit_pont.py`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac_microbit_pont.py) (pont) i, com a pla B,
> [`T2_mearm_microbit_receptor.py`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_mearm_microbit_receptor.py) (braç governat per la micro:bit).

### SA4 · El braç amb 4 potenciòmetres

Cada servo té el seu **rang segur** (`_MIN`/`_MAX`, anotats en muntar) i
`map()` converteix la lectura 0-1023 a aquest rang, mai a 0-180 a cegues.
Dues decisions per comentar a l'aula: la **zona morta** de 2° (sense ella el
soroll del potenciòmetre fa tremolar el braç) i el `write()` **abans** de
l'`attach()` (el braç arrenca on diu el potenciòmetre, sense saltar a 90°).
És el mateix codi que la pràctica `04_brac_potenciometres` de la SA4.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_mearm_arduino.ino</code>)</summary>

```cpp
// Codi de referencia del brac MeArm V1.1 - VERSIO ARDUINO
// 4 servos controlats amb 4 potenciometres, cadascun dins del seu rang segur.
// Cablatge: el de la guia 00_Muntatge_brac_MeArm.md (versio Arduino).
// ATENCIO: els 4 servos amb ALIMENTACIO EXTERNA (piles) i GND comu. Mai per USB
// ni pel pin 5V de l'UNO.
//
// Truc per trobar els angles limit: obre el Monitor serie (9600). Cada mig
// segon s'hi escriuen els 4 angles. Mou un potenciometre a poc a poc fins que
// la peca toqui, i anota l'angle una mica abans.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_ESQUERRE = 6;   // servo nou del MeArm
const int PIN_SERVO_DRET = 10;      // ocupa el lloc del colze del brac de 3 servos
const int PIN_SERVO_PINCA = 11;

const int PIN_POT_BASE = A0;
const int PIN_POT_DRET = A1;
const int PIN_POT_PINCA = A2;
const int PIN_POT_ESQUERRE = A3;    // 4t potenciometre (el kit en porta 3)

// Limits d'angle REALS de cada servo: canvieu-los pels que heu anotat al
// bloc D de la guia. El servo mai ha de forcar el topall mecanic.
const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;   // tancada .. oberta

// Zona morta: nomes es mou el servo si l'angle nou canvia mes d'aquests
// graus. Aixi el soroll del potenciometre no fa tremolar el brac.
const int ZONA_MORTA = 2;

Servo base, esquerre, dret, pinca;

int angleBase, angleEsquerre, angleDret, anglePinca;
unsigned long tDarrerInforme = 0;

// Llegeix un potenciometre i el converteix al rang segur del seu servo
int llegeixAngle(int pinPot, int minim, int maxim) {
  return map(analogRead(pinPot), 0, 1023, minim, maxim);
}

// Escriu l'angle nou nomes si s'allunya prou de l'actual
void mouSiCal(Servo &servo, int &actual, int nou) {
  if (abs(nou - actual) > ZONA_MORTA) {
    actual = nou;
    servo.write(actual);
  }
}

void setup() {
  Serial.begin(9600);

  // Primer es calcula la posicio dels potenciometres i despres s'engega cada
  // servo: aixi el brac no fa un salt a 90 graus en arrencar.
  angleBase = llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX);
  angleEsquerre = llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX);
  angleDret = llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX);
  anglePinca = llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX);

  base.write(angleBase);
  esquerre.write(angleEsquerre);
  dret.write(angleDret);
  pinca.write(anglePinca);

  base.attach(PIN_SERVO_BASE);
  esquerre.attach(PIN_SERVO_ESQUERRE);
  dret.attach(PIN_SERVO_DRET);
  pinca.attach(PIN_SERVO_PINCA);
}

void loop() {
  mouSiCal(base, angleBase, llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX));
  mouSiCal(esquerre, angleEsquerre, llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX));
  mouSiCal(dret, angleDret, llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX));
  mouSiCal(pinca, anglePinca, llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX));

  // Informe al Monitor serie sense delay(): el control no s'atura mai
  if (millis() - tDarrerInforme > 500) {
    tDarrerInforme = millis();
    Serial.print("base=");
    Serial.print(angleBase);
    Serial.print("  esquerre=");
    Serial.print(angleEsquerre);
    Serial.print("  dret=");
    Serial.print(angleDret);
    Serial.print("  pinca=");
    Serial.println(anglePinca);
  }

  delay(20);   // ~50 actualitzacions/s: suficient i suau
}
```

</details>

### SA5 · El comandament i el pont

El comandament envia ordres de text curtes per ràdio (`B±`, `D±`, `E±`, `P`,
`G`). El pont no mou res: reenvia cada ordre a l'Arduino per `uart`
(P1 → D0), acabada en salt de línia, i els seus botons són els botons d'estat
del braç (`A` i `R`).

Per què **D0** i no `SoftwareSerial`: `SoftwareSerial` atura les
interrupcions mentre rep cada lletra, i la llibreria `Servo` les necessita
per generar els polsos. El resultat són servos que peguen sotragades cada
cop que arriba una ordre. El preu de fer servir D0 és haver de
**desconnectar el cable per pujar el programa**.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_brac_microbit_comandament.py</code>)</summary>

```python
# Codi de referencia del Projecte T2 - Brac robotic MeArm (NOMES DOCENT)
# COMANDAMENT: la 2a micro:bit, la que es te a la ma. No mou cap servo:
# envia ordres de text per radio.
#   Inclina esquerra/dreta   -> "B+" / "B-"  base
#   Inclina davant/enrere    -> "D+" / "D-"  servo dret
#   Mantens el boto A        -> "E+"         servo esquerre
#   Mantens el boto B        -> "E-"         servo esquerre
#   A i B alhora             -> "P"          obre/tanca la pinca
#   Sacseja                  -> "G"          grava el punt actual (replay, SA6)
# Pla per defecte: les ordres les rep la micro:bit PONT, que les passa a
# l'Arduino (T2_brac_microbit_pont.py + T2_brac_estats.ino). Els botons A i B
# del PONT (no d'aquesta) canvien d'estat: A repos/manual, B reprodueix.
# Versio micro:bit del MeArm (contingencia): les rep
# T2_mearm_microbit_receptor.py, que ignora la "G".

from microbit import *
import radio

GRUP = 10        # CANVIA'L pel teu numero de llista (les 2 plaques igual)
LLINDAR = 300    # inclinacio minima perque compti (evita moure's sol)

radio.on()
radio.config(group=GRUP)

pinca_enviada = False   # per enviar "P" una sola vegada per cada A+B

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()

    if x > LLINDAR:
        radio.send("B+")
    elif x < -LLINDAR:
        radio.send("B-")

    if y > LLINDAR:
        radio.send("D+")
    elif y < -LLINDAR:
        radio.send("D-")

    # Es llegeixen els dos botons UNA vegada, a variables
    boto_a = button_a.is_pressed()
    boto_b = button_b.is_pressed()

    if boto_a and boto_b:
        # Si mantens A+B la pinca no ha d'obrir-se i tancar-se sense parar:
        # nomes s'envia la primera volta
        if not pinca_enviada:
            radio.send("P")
            pinca_enviada = True
        display.show(Image.TARGET)
    elif accelerometer.was_gesture("shake"):
        pinca_enviada = False
        # Nomes s'envia l'ordre: qui confirma que el punt s'ha gravat de debo
        # es el BRAC (Monitor serie). Aqui, una fletxa d'"enviat".
        radio.send("G")
        display.show(Image.ARROW_E)
        sleep(300)
    else:
        pinca_enviada = False
        if boto_a:
            radio.send("E+")
            display.show(Image.ARROW_N)
        elif boto_b:
            radio.send("E-")
            display.show(Image.ARROW_S)
        else:
            display.show(Image.DIAMOND_SMALL)

    sleep(100)   # ~10 ordres/s: suficient per a un control suau
```

</details>

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_brac_microbit_pont.py</code>)</summary>

```python
# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase SA5-SA6: PONT (la micro:bit que viu al costat del brac).
# No mou cap servo: rep les ordres del comandament per radio i les passa a
# l'Arduino del brac per un cable (serie). Els seus botons son els botons
# d'estat del brac: A envia "A" (repos/manual i rearmament), B envia "R"
# (reprodueix la seguencia gravada).
# Cablatge: P1 -> D0 (RX) de l'UNO, i GND comu. Res mes.
# ATENCIO: el cable va NOMES de la micro:bit cap a l'UNO (mai al reves:
# els 5 V de l'UNO cremarien la micro:bit).
# ATENCIO: despres d'uart.init() la micro:bit ja no parla per l'USB (no
# veureu prints). Per tornar-la a programar, n'hi ha prou de flashejar.

from microbit import *
import radio

GRUP = 10   # el MATEIX numero que el comandament (el teu numero de llista)

radio.on()
radio.config(group=GRUP)
uart.init(baudrate=9600, tx=pin1, rx=pin2)

display.show(Image.ARROW_W)   # fletxa cap al brac: "estic passant ordres"

while True:
    ordre = radio.receive()
    if ordre:
        # Cada ordre acaba en salt de linia: l'Arduino sap on acaba
        uart.write(ordre + "\n")

    if button_a.was_pressed():
        uart.write("A\n")
        display.show("A")
        sleep(200)
        display.show(Image.ARROW_W)
    elif button_b.was_pressed():
        uart.write("R\n")
        display.show("R")
        sleep(200)
        display.show(Image.ARROW_W)

    sleep(10)
```

</details>

### SA6 · La màquina d'estats del braç

El producte de SA6 demana **quatre estats** —repòs, manual, replay i
emergència— i la rúbrica R3 del braç els avalua. És el mateix `enum` +
`switch` de la pràctica
[`03_maquina_estats.ino`](../SA6/codi/03_maquina_estats/03_maquina_estats.ino),
on les ordres surten dels polsadors D3/D4; aquí surten del pont. Tres
decisions que val la pena comentar a l'aula:

1. L'**emergència es comprova abans del `switch`**: mana per damunt de tot
   (la mateixa idea que la guarda de la pinça a `03_ultrasons_brac`, SA4).
2. El **replay fa servir `millis()`**: cada volta torna a mirar el sensor, i
   un xoc enmig de la reproducció salta a emergència a l'instant.
3. `llegeixOrdre()` acumula lletres fins al `'
'` **sense bloquejar** el
   `loop()` (res de `readStringUntil()`, que s'esperaria fins a un segon). I
   tot es pot provar **sense ràdio**, escrivint les ordres al Monitor sèrie.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_brac_estats.ino</code>)</summary>

```cpp
// Codi de referencia del Projecte T2 - El brac robotic MeArm (NOMES DOCENT)
// Fase SA5-SA6: el brac CONTINUA amb l'Arduino UNO. El comandament per radio
// (2a micro:bit, a la ma) parla amb una micro:bit PONT que hi ha al costat del
// brac i que passa les ordres a l'UNO per un cable serie.
// Fitxers germans: T2_brac_microbit_comandament.py i T2_brac_microbit_pont.py.
// Cablatge: el del dossier 00_Projecte_T2_Brac.md (fase Arduino) + el pont:
//   P1 de la micro:bit pont -> D0 (RX) de l'UNO, i GND comu.
// ATENCIO: per PUJAR el programa, desconnecteu el cable del D0 (l'USB fa
// servir el mateix pin). Torneu-lo a connectar despres.
// ATENCIO: el cable va NOMES de la micro:bit cap a l'UNO. Mai connecteu un pin
// de l'UNO (5 V) a la micro:bit (3,3 V): la cremaria.
// ATENCIO: els 4 servos amb ALIMENTACIO EXTERNA (piles AA) i GND comu.
// PLA B (brac de 3 servos, brac.svg): esborreu les linies del servo esquerre.
//
// Per que D0 i no SoftwareSerial: SoftwareSerial atura les interrupcions
// mentre rep cada lletra i la llibreria Servo les necessita per fer els polsos;
// el resultat son servos que peguen sotragades cada cop que arriba una ordre.
//
// MAQUINA D'ESTATS (l'aportacio de la SA6), el mateix patro enum + switch
// de 03_maquina_estats.ino:
//   REPOS      - quiet; ordre "A" -> MANUAL, ordre "R" -> REPLAY
//   MANUAL     - obeeix el comandament; "G" grava el punt actual
//   REPLAY     - reprodueix sol la seguencia gravada (amb millis, com a SA4)
//   EMERGENCIA - xoc al sensor de col.lisio: no mou res; rearmament manual
// Ordres que arriben pel cable: "B+" "B-" "D+" "D-" "E+" "E-" "P" "G" (del
// comandament)
// i "A" "R" (botons A i B de la micro:bit pont).
// Truc per provar-ho SENSE micro:bit: desconnecteu el pont, obriu el Monitor
// serie (9600, "Nova linia") i escriviu les ordres a ma.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_ESQUERRE = 6;
const int PIN_SERVO_DRET = 10;
const int PIN_SERVO_PINCA = 11;
const int PIN_COLLISIO = 2;    // LOW = xoc (modul KS0021)

// Limits d'angle REALS de cada servo: anoteu-los abans de programar res mes
const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;
const int PAS = 3;             // graus per cada ordre rebuda

const int MAX_PUNTS = 30;                  // quants punts es poden gravar
const unsigned long PAUSA_REPLAY = 400;    // ms entre punts en reproduir

Servo servoBase, servoEsquerre, servoDret, servoPinca;

enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA };
Estat estat = REPOS;

int base = 90, esquerre = 90, dret = 90, pinca = PINCA_TANCADA;

// La seguencia gravada: quatre llistes, una per servo
int seqBase[MAX_PUNTS], seqEsquerre[MAX_PUNTS], seqDret[MAX_PUNTS], seqPinca[MAX_PUNTS];
int numPunts = 0;
int puntReplay = 0;
unsigned long tPunt = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  servoBase.attach(PIN_SERVO_BASE);
  servoEsquerre.attach(PIN_SERVO_ESQUERRE);
  servoDret.attach(PIN_SERVO_DRET);
  servoPinca.attach(PIN_SERVO_PINCA);
  aplica();
  canviaEstat(REPOS);
}

void loop() {
  // --- Lectura d'entrades: UNA vegada per volta, a variables ---
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);
  String ordre = llegeixOrdre();

  // --- Transicio prioritaria: el xoc mana per damunt de tot ---
  // (la mateixa idea que la guarda de 03_ultrasons_brac, SA4)
  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);
  }

  switch (estat) {
    case EMERGENCIA:
      // Rearmament MANUAL: sensor alliberat I boto A. Una emergencia que es
      // rearma sola no es una emergencia.
      if (!xoc && ordre == "A") {
        canviaEstat(REPOS);
      }
      break;

    case REPOS:
      if (ordre == "A") {
        canviaEstat(MANUAL);
      } else if (ordre == "R" && numPunts > 0) {
        comencaReplay();
      }
      break;

    case MANUAL:
      if (ordre == "A") {
        canviaEstat(REPOS);
      } else if (ordre == "R" && numPunts > 0) {
        comencaReplay();
      } else if (ordre == "B+") {
        base = min(base + PAS, BASE_MAX);
      } else if (ordre == "B-") {
        base = max(base - PAS, BASE_MIN);
      } else if (ordre == "D+") {
        dret = min(dret + PAS, DRET_MAX);
      } else if (ordre == "D-") {
        dret = max(dret - PAS, DRET_MIN);
      } else if (ordre == "E+") {
        esquerre = min(esquerre + PAS, ESQUERRE_MAX);
      } else if (ordre == "E-") {
        esquerre = max(esquerre - PAS, ESQUERRE_MIN);
      } else if (ordre == "P") {
        pinca = (pinca == PINCA_TANCADA) ? PINCA_OBERTA : PINCA_TANCADA;
      } else if (ordre == "G") {
        gravaPunt();
      }
      aplica();
      break;

    case REPLAY:
      // Sense delay(): cada volta es torna a mirar el sensor de dalt de tot,
      // aixi un xoc enmig de la reproduccio salta a EMERGENCIA a l'instant.
      if (ordre == "A") {
        canviaEstat(REPOS);          // el boto A avorta la reproduccio
      } else if (millis() - tPunt >= PAUSA_REPLAY) {
        if (puntReplay < numPunts) {
          base = seqBase[puntReplay];
          esquerre = seqEsquerre[puntReplay];
          dret = seqDret[puntReplay];
          pinca = seqPinca[puntReplay];
          aplica();
          puntReplay++;
          tPunt = millis();
        } else {
          canviaEstat(REPOS);        // ha acabat sense incidents
        }
      }
      break;
  }
}

// Llegeix sense bloquejar: acumula lletres fins al salt de linia i retorna
// l'ordre sencera; mentre no n'hi ha cap de completa, retorna "".
String llegeixOrdre() {
  static String linia = "";
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '\n') {
      String ordre = linia;
      linia = "";
      ordre.trim();                  // treu el '\r' si n'hi ha
      return ordre;
    }
    linia += c;
  }
  return "";
}

void aplica() {
  servoBase.write(base);
  servoEsquerre.write(esquerre);
  servoDret.write(dret);
  servoPinca.write(pinca);
}

void gravaPunt() {
  if (numPunts < MAX_PUNTS) {
    seqBase[numPunts] = base;
    seqEsquerre[numPunts] = esquerre;
    seqDret[numPunts] = dret;
    seqPinca[numPunts] = pinca;
    numPunts++;
    Serial.print("Punt gravat: ");
    Serial.println(numPunts);
  } else {
    Serial.println("Seguencia plena: no es grava");
  }
}

void comencaReplay() {
  puntReplay = 0;
  tPunt = millis() - PAUSA_REPLAY;   // el primer punt surt de seguida
  canviaEstat(REPLAY);
}

// Un sol lloc per canviar d'estat: aixi el missatge mai no menteix
void canviaEstat(Estat nou) {
  estat = nou;
  switch (nou) {
    case REPOS:      Serial.println("Estat: REPOS");      break;
    case MANUAL:     Serial.println("Estat: MANUAL");     break;
    case REPLAY:     Serial.println("Estat: REPLAY");     break;
    case EMERGENCIA: Serial.println("Estat: EMERGENCIA"); break;
  }
}
```

</details>

### Pla B · El braç governat per la micro:bit

> Només si el pont sèrie falla amb el maquinari real. Cal una **micro:bit
> V2** amb Micro:shield (la V1 no mou 4 servos alhora). Esquema a la
> [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md#connexions-i-programa).
> Sense la llibreria `Servo`, MicroPython fabrica el pols a mà amb
> `write_analog()`: `angle_a_analog()` converteix graus a valor analògic
> sobre un període de 20 ms.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_mearm_microbit_receptor.py</code>)</summary>

```python
# Codi de referencia del brac MeArm V1.1 - VERSIO MICRO:BIT
# RECEPTOR: la micro:bit del brac, endollada al Micro:shield. Rep les ordres
# del COMANDAMENT (T2_brac_microbit_comandament.py) i mou els 4 servos:
#   P0 base, P1 dret, P2 pinca, P8 esquerre (el servo nou del MeArm)
# ATENCIO: cal una micro:bit V2. La V1 no pot generar senyal de servo a 4
# pins alhora (en te prou per a 3).
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la
# placa ni l'USB.
# En arrencar posa els 4 servos a 90 graus: serveix de "pas 0" de la guia.

from microbit import *
import radio

GRUP = 10   # el MATEIX numero que el comandament
PAS = 3     # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (els que heu anotat al bloc D)
BASE_MIN, BASE_MAX = 0, 180
ESQUERRE_MIN, ESQUERRE_MAX = 40, 150
DRET_MIN, DRET_MAX = 40, 150
PINCA_TANCADA, PINCA_OBERTA = 60, 120


def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)


def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))


def limita(valor, minim, maxim):
    # Mai fora del rang segur: un servo que forca el topall es crema
    return max(minim, min(valor, maxim))


radio.on()
radio.config(group=GRUP)

base = 90
esquerre = 90
dret = 90
pinca = 90
mou(pin0, base)
mou(pin8, esquerre)
mou(pin1, dret)
mou(pin2, pinca)
display.show(Image.YES)

while True:
    ordre = radio.receive()

    if ordre == "B+":
        base = limita(base + PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "B-":
        base = limita(base - PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "D+":
        dret = limita(dret + PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "D-":
        dret = limita(dret - PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "E+":
        esquerre = limita(esquerre + PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "E-":
        esquerre = limita(esquerre - PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "P":
        # Commutador: si esta oberta, la tanca; si no, l'obre
        if pinca == PINCA_OBERTA:
            pinca = PINCA_TANCADA
        else:
            pinca = PINCA_OBERTA
        mou(pin2, pinca)

    sleep(10)
```

</details>
