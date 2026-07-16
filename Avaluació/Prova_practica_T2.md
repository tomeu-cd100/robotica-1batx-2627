# Prova pràctica — Trimestre 2 (SA4-SA6)
## "Control climàtic + estació remota"

**Durada:** una sessió sencera — **la S4 de la SA6** (~95-100' efectius de prova, més instruccions i recollida) · **Individual** · **Material:** Arduino UNO + motor/ventilador amb pont H (o LED PWM com a substitut) + NTC/potenciòmetre; 2 micro:bit. Es permet consultar esquemes i quadern.

### Competències i criteris avaluats
- **CE-R3** (control) → CA3.1 · **CE-R1** (programar) → CA1.1, CA1.2
- Rúbriques: **R1** (codi), **R3** (control), **R4** (documentació).

---

## Enunciat (dues parts)

### PART A — Control amb Arduino (nucli, 6 punts)
Construeix un **control de temperatura** que reguli un ventilador (o LED PWM):
1. Llegeix un sensor (NTC o potenciòmetre com a simulació de temperatura).
2. **Nivell satisfactori:** control **tot/res amb histèresi** (engega per sobre d'un llindar, atura per sota d'un altre).
3. **Ampliació (notable):** afegeix **indicador** d'estat (LED verd/vermell).
4. **Ampliació (excel·lent):** implementa **control proporcional** (la velocitat depèn de l'error) i visualitza-ho al **Serial Plotter**.

### PART B — micro:bit (4 punts)

> 🐍 Fa setmanes que treballes en C++: **repassa MicroPython abans de la prova** amb la targeta `Classes/00_General/00_Repas_expres_MicroPython.md` (el docent la reparteix a la S2 de la SA6).

Programa una **estació remota** en MicroPython:
1. **Nivell satisfactori:** mostra la temperatura/llum i, si supera un llindar, mostra una alerta (Image.NO).
2. **Ampliació:** **envia la lectura per ràdio** a una segona placa que la rep i la mostra.

### Lliurament
Tots dos programes funcionant + **quadern**: diagrama de blocs del control (Part A) i taula d'una lectura enviada/rebuda (Part B).

### Pla de millora personal (després de la prova — 3 línies, no puntua)
> Quan rebis el retorn, escriu al quadern: **(1)** què m'ha fallat o m'ha costat més · **(2)** què practicaré concretament · **(3)** com comprovaré que ja ho tinc.
> El docent **recupera aquestes 3 línies a l'inici de la SA7**. Al 3r trimestre tot conflueix al projecte: el que quedi coix aquí, allà es notarà — millor tapar-ho ara.

---

## Graella de correcció (10 punts)

| Criteri | Punts | Rúbrica |
|---|---|---|
| Part A: control tot/res amb histèresi funcional | 3 | R1, R3 |
| Part A: indicador d'estat (ampliació) | 1 | R3 |
| Part A: control proporcional + Serial Plotter (ampliació) | 2 | R1, R3 |
| Part B: lectura i alerta a micro:bit | 2 | R1 |
| Part B: enviament/recepció per ràdio (ampliació) | 1 | R1 |
| Documentació (diagrama de blocs + dades) | 1 | R4 |

---

## Solució orientativa (docent)

> ⚠️ **Nota física:** `analogRead` d'una NTC dona un valor ADC (0-1023), **no graus**. Comparar amb `CONSIGNA=500` és una simplificació acceptada per a la prova (per això es permet el potenciòmetre com a simulació); si surt a la conversa, deixa clar que convertir ADC → °C demana calibratge (equació de Steinhart-Hart o taula), fora de l'abast de la prova.

### Part A — solució del NUCLI: control tot/res amb histèresi (3 punts)

El mínim exigible és aquest (dos llindars per evitar el «clic-clic» al voltant de la consigna):

```cpp
const int SENSOR=A0, VENTILADOR=9, LED_V=7, LED_R=8;
const int LLINDAR_ON=520;    // engega per sobre (mes calent)
const int LLINDAR_OFF=480;   // atura per sota (mes fred) -> banda de 40
bool refrigerant = false;
void setup(){ pinMode(VENTILADOR,OUTPUT); pinMode(LED_V,OUTPUT); pinMode(LED_R,OUTPUT); Serial.begin(9600); }
void loop(){
  int t = analogRead(SENSOR);
  if (t > LLINDAR_ON)  refrigerant = true;    // massa calent: engega
  if (t < LLINDAR_OFF) refrigerant = false;   // prou fred: atura
  // entre els dos llindars NO canvia d'estat: aixo es la histeresi
  digitalWrite(VENTILADOR, refrigerant ? HIGH : LOW);
  digitalWrite(LED_R, refrigerant ? HIGH : LOW);
  digitalWrite(LED_V, refrigerant ? LOW : HIGH);
  Serial.print(t); Serial.print(" "); Serial.println(refrigerant ? 255 : 0);
  delay(50);
}
```

**Què mirar en corregir el nucli:** (1) dos llindars diferents i separats (no un de sol); (2) l'estat es manté dins la banda; (3) l'indicador coincideix amb l'estat. Error típic: un sol `if (t > LLINDAR)` — això és tot/res **sense** histèresi (satisfactori incomplet).

### Part A — ampliació d'excel·lent: control proporcional
```cpp
const int SENSOR=A0, VENTILADOR=9, LED_V=7, LED_R=8;
const int CONSIGNA=500;
const float Kp=0.8;
void setup(){ pinMode(VENTILADOR,OUTPUT); pinMode(LED_V,OUTPUT); pinMode(LED_R,OUTPUT); Serial.begin(9600); }
void loop(){
  int t = analogRead(SENSOR);
  int error = t - CONSIGNA;
  int sortida = constrain((int)(Kp*error), 0, 255);
  analogWrite(VENTILADOR, sortida);
  digitalWrite(LED_R, sortida > 0 ? HIGH : LOW);   // refrigerant
  digitalWrite(LED_V, sortida == 0 ? HIGH : LOW);  // en repos
  Serial.print(CONSIGNA); Serial.print(" "); Serial.print(t); Serial.print(" "); Serial.println(sortida);
  delay(50);
}
```

### Part B — micro:bit emissor (amb alerta)
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)
LLINDAR = 28
while True:
    t = temperature()
    display.show(Image.NO if t > LLINDAR else Image.YES)
    radio.send(str(t))
    sleep(2000)
```
Receptor:
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)
while True:
    m = radio.receive()
    if m:
        display.scroll(m)
    sleep(50)
```
