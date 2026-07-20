# Pràctica 2 · Motor DC i pont H: sentit, velocitat i funcions pròpies

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_motor_pont_h.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (ENA=5, IN1=7, IN2=8, alimentació externa + **massa comuna**)

## 🎯 Per què fem aquesta pràctica

La pregunta d'avui: *per què no puc connectar un motor directament a un pin?* Perquè un pin d'Arduino dona **molt poc corrent** — prou per a un LED, ridícul per a un motor. La solució és un **driver**: el pont H **L298N**, un amplificador de corrent que rep les ordres (fluixetes) de l'Arduino i mou el motor amb l'energia de les **piles**. D'aquí surten les dues regles de seguretat que sentiràs com un mantra: **massa comuna** (tots els GND units) i **mai alimentar el motor des del pin 5V**.

El pont H, a més, sap una cosa que cap pin sol sap fer: **invertir el sentit de gir**. Amb dos senyals (`IN1`/`IN2`) tries el sentit, i amb un tercer (`ENA`, per PWM — l'`analogWrite` de la SA2) la **velocitat**.

I la novetat de programació: escriuràs les teves primeres **funcions pròpies**. En lloc de repetir tres línies cada cop que vols avançar, empaquetes el gest amb un nom — `endavant(200)` — i el `loop()` es llegeix com una frase. Això és l'**abstracció**, i és el múscul que farà llegibles tots els programes grans que vénen.

## 🔮 Abans d'executar: prediu

Mira només el `loop()` (al final del codi): **descriu la coreografia** que farà el motor (què, quant de temps, en quin ordre). I una de trampa: què creus que passaria si `IN1` i `IN2` fossin tots dos `HIGH`? Apunta-ho a l'Activitat 2 de la [fitxa](../../SA4_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Els tres fils de control

```cpp
const int ENA = 5;   // PWM: velocitat
const int IN1 = 7;   // direccio
const int IN2 = 8;   // direccio
```

Tres constants, tres papers: `IN1` i `IN2` decideixen el **sentit** (quina banda del pont H s'activa) i `ENA` la **velocitat** (per PWM, per això va a un pin `~`). Repartir les feines entre pins és el disseny del L298N, no una casualitat del codi.

### Bloc 2 — La teva primera funció amb paràmetre

```cpp
void endavant(int velocitat) {   // velocitat 0..255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, velocitat);
}
```

Una **funció** és un tros de programa amb nom propi. Aquesta es diu `endavant` i té un **paràmetre**: `velocitat`, un valor que li passes quan la crides (`endavant(200)`). Per dins: `IN1` a `HIGH` i `IN2` a `LOW` seleccionen el sentit, i `analogWrite(ENA, velocitat)` fixa la velocitat amb PWM (0 aturat, 255 màxim). Definir-la no la fa executar: només queda **a punt** per quan algú la cridi.

### Bloc 3 — Invertir i aturar

```cpp
void enrere(int velocitat) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, velocitat);
}

void atura() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}
```

`enrere()` és `endavant()` amb `IN1`/`IN2` **intercanviats** — tota la màgia del pont H és aquesta: canviar quin costat del pont condueix inverteix el corrent que travessa el motor, i el motor gira al revés. `atura()` posa els dos IN a `LOW` i la velocitat a 0: cap costat activat, motor parat. Fixa't que `atura()` no necessita paràmetre: aturar-se no té velocitats.

### Bloc 4 — El loop llegit com una frase

```cpp
void loop() {
  endavant(200);  delay(2000);
  atura();        delay(1000);
  enrere(150);    delay(2000);
  atura();        delay(1000);
}
```

Aquest és el premi de l'abstracció: el `loop()` ja no parla de pins, parla de **gestos**. *Endavant ràpid 2 segons, atura, enrere més lent 2 segons, atura.* Compara-ho amb com quedaria amb els `digitalWrite` escampats: el mateix comportament, però il·legible.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El motor no gira | Falta la **massa comuna** (GND Arduino + GND piles + GND L298N units), o `ENA` sense senyal. |
| L'Arduino es reinicia quan el motor arrenca | Estàs alimentant el motor des del pin 5V de l'Arduino → pic de corrent. **Sempre** alimentació externa. |
| Gira sempre en el mateix sentit | `IN1`/`IN2` mal connectats o mal escrits: per canviar de sentit cal que s'**intercanviïn** (un HIGH, l'altre LOW). |
| La velocitat no canvia (tot o res) | `ENA` no és en un pin PWM (`~`), o el pontet (jumper) d'ENA del mòdul encara hi és posat. |

## 🧗 Si t'encalles: l'esquelet de les funcions de moviment

Si el repte de les funcions (`endavant`, `enrere`, `atura`) se't fa una muntanya, no et quedis en blanc: parteix d'aquest esquelet. Els pins, el `setup()` i un `loop()` que **ja crida les funcions en ordre** estan fets; tu només omples els `// TODO:` de dins de cada funció. Compila tal qual; el motor no es mourà fins que omplis les funcions.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA4 - moviment bastida (esquelet per comencar)

  El muntatge dificil ja esta fet: pins amb nom, pinMode() al setup()
  i un loop() que ja CRIDA les funcions de moviment en ordre.
  Tu nomes has d'OMPLIR els // TODO: de dins de cada funcio amb els
  digitalWrite() (sentit) i analogWrite() (velocitat) que calguin.

  Recorda (pont H L298N):
    - IN1 i IN2 decideixen el SENTIT de gir del motor.
    - ENA (pin PWM ~) regula la VELOCITAT amb analogWrite() (0..255).
    - Per anar ENDAVANT: un IN a HIGH i l'altre a LOW.
    - Per anar ENRERE: intercanvia HIGH i LOW.
    - Per ATURAR: els dos IN a LOW i analogWrite(ENA, 0).

  Circuit: ENA=5 (PWM), IN1=7, IN2=8. Motor amb alimentacio externa. MASSA COMUNA.
*/

const int ENA = 5;   // PWM: velocitat
const int IN1 = 7;   // direccio
const int IN2 = 8;   // direccio

void endavant(int velocitat) {   // velocitat 0..255
  // TODO: posa IN1 a HIGH i IN2 a LOW (sentit endavant)
  // TODO: aplica la velocitat amb analogWrite(ENA, velocitat)
}

void enrere(int velocitat) {     // velocitat 0..255
  // TODO: intercanvia els IN respecte a endavant() (sentit contrari)
  // TODO: aplica la velocitat amb analogWrite(ENA, velocitat)
}

void atura() {
  // TODO: posa IN1 i IN2 a LOW
  // TODO: analogWrite(ENA, 0) per aturar el motor
}

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  endavant(200);  delay(2000);
  atura();        delay(1000);
  enrere(150);    delay(2000);
  atura();        delay(1000);
}
```

</details>

## 🔗 On ho aplicaràs

- **Repte de la S2:** una seqüència de moviments pròpia amb les teves funcions; **+ repte:** rampa d'acceleració (un `for` que apuja la velocitat a poc a poc).
- **A la S3:** el [sensor de velocitat](../03_sensor_velocitat/03_sensor_velocitat.ino) reutilitza `endavant()` i `atura()` tal quals — les funcions ben fetes es reciclen.
- **Més enllà:** dos motors amb pont H són les **rodes del rover** de la robòtica mòbil (SA7).
