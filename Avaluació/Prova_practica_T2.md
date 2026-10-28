# Prova pràctica — Trimestre 2 (SA4-SA6)
## "La pinça intel·ligent + el comandament del braç"

**Durada:** una sessió sencera — **la S4 de la SA6**. Compta **~80-85' reals de prova**: la sessió de 2 h dona ~95-105' efectius i les instruccions (5-10') i la recollida (10') en surten. El **nucli (histèresi) està calibrat per a ~60'**; les ampliacions són per a qui acabi abans · **Individual** · **Material:** Arduino UNO + el teu braç MeArm (o, si no és disponible, un servo solt fent de pinça) + ultrasons HC-SR04 + LED amb 220 Ω; 2 micro:bit. Es permet consultar esquemes i quadern.

### Competències i criteris avaluats
- **CE-R3** (control) → CA3.1 · **CE-R1** (programar) → CA1.1, CA1.2
- Rúbriques: **R1** (codi), **R3** (control), **R4** (documentació).

---

## Enunciat (dues parts)

### PART A — La pinça intel·ligent amb Arduino (nucli, 6 punts)
Programa la **pinça automàtica** de l'estació de recollida:
1. Llegeix la distància amb l'ultrasons (TRIG = 7, ECHO = 8) i mou el servo de la pinça (D11).
2. **Nivell satisfactori:** control **tot/res amb histèresi**: la pinça es tanca quan l'objecte és a menys d'un llindar i només s'obre quan s'allunya més d'un altre llindar (tria'ls i justifica'ls).
3. **Ampliació (notable):** afegeix un **indicador** d'estat (LED al D5: encès = pinça tancada).
4. **Ampliació (excel·lent):** fes que la pinça **no salti**: s'acosta a l'angle objectiu amb **control proporcional** (cada volta, una fracció `K` de l'error) i mostra l'angle i l'objectiu al **Serial Plotter**.

### PART B — El comandament amb micro:bit (4 punts)

> 🐍 Fa setmanes que treballes en C++: **repassa MicroPython abans de la prova** amb la targeta `Classes/00_General/00_Repas_expres_MicroPython.md` (el docent la reparteix a la S2 de la SA6).

Programa un **comandament** en MicroPython:
1. **Nivell satisfactori:** segons la inclinació (`accelerometer.get_x()`), mostra una fletxa a la dreta o a l'esquerra (amb un llindar) i un símbol de repòs si la placa és plana.
2. **Ampliació:** **envia l'ordre per ràdio** (`"B+"` o `"B-"`) a una segona placa que la rep i la mostra.

### Lliurament
Tots dos programes funcionant + **quadern**: diagrama de blocs de la pinça (Part A) i taula d'una ordre enviada/rebuda (Part B).

### Pla de millora personal (després de la prova — 3 línies, no puntua)
> Quan rebis el retorn, escriu al quadern: **(1)** què m'ha fallat o m'ha costat més · **(2)** què practicaré concretament · **(3)** com comprovaré que ja ho tinc.
> El docent **recupera aquestes 3 línies a l'inici de la SA7**. Al 3r trimestre tot conflueix al projecte: el que quedi coix aquí, allà es notarà — millor tapar-ho ara.

---

## Graella de correcció (10 punts)

| Criteri | Punts | Rúbrica |
|---|---|---|
| Part A: pinça tot/res amb histèresi funcional | 3 | R1, R3 |
| Part A: indicador d'estat (ampliació) | 1 | R3 |
| Part A: moviment proporcional + Serial Plotter (ampliació) | 2 | R1, R3 |
| Part B: inclinació amb llindar i fletxes a la micro:bit | 2 | R1 |
| Part B: enviament/recepció de l'ordre per ràdio (ampliació) | 1 | R1 |
| Documentació (diagrama de blocs + dades) | 1 | R4 |

---

## Solució orientativa (docent)

> ⚠️ **Nota pràctica:** l'ultrasons dona lectures sorolloses a pocs centímetres. Si un alumne/a fa servir un **potenciòmetre** per simular la distància perquè l'ultrasons li falla, es valora igual (és el mateix control); anota-ho a la correcció.

### Part A — solució del NUCLI: pinça tot/res amb histèresi (3 punts)

El mínim exigible és aquest (dos llindars per evitar el «clic-clic» a la frontera):

```cpp
#include <Servo.h>
const int TRIG=7, ECHO=8, LED=5;
const int TANCA_CM=6, OBRE_CM=10;           // banda de 4 cm
const int TANCADA=60, OBERTA=120;
Servo pinca;
bool tancada = false;
float dist(){ digitalWrite(TRIG,LOW); delayMicroseconds(2);
  digitalWrite(TRIG,HIGH); delayMicroseconds(10); digitalWrite(TRIG,LOW);
  long t = pulseIn(ECHO,HIGH,30000); if (t==0) return 400; return t*0.034/2.0; }
void setup(){ pinMode(TRIG,OUTPUT); pinMode(ECHO,INPUT); pinMode(LED,OUTPUT);
  pinca.write(OBERTA); pinca.attach(11); Serial.begin(9600); }
void loop(){
  float d = dist();
  if (!tancada && d < TANCA_CM) tancada = true;    // a prop: agafa
  if (tancada && d > OBRE_CM)   tancada = false;   // lluny: deixa anar
  // entre els dos llindars NO canvia d'estat: aixo es la histeresi
  pinca.write(tancada ? TANCADA : OBERTA);
  digitalWrite(LED, tancada);                       // ampliacio: indicador
  Serial.print(d); Serial.print(" "); Serial.println(tancada ? 15 : 0);
  delay(60);
}
```

**Què mirar en corregir el nucli:** (1) dos llindars diferents i separats (no un de sol); (2) l'estat es manté dins la banda; (3) l'indicador coincideix amb l'estat. Error típic: un sol `if (d < LLINDAR)` — això és tot/res **sense** histèresi (satisfactori incomplet).

### Part A — ampliació d'excel·lent: moviment proporcional
```cpp
// substitueix el pinca.write(...) del nucli:
const float K = 0.15;
float angle = OBERTA;                               // global
// ... dins del loop(), despres de decidir 'tancada':
int objectiu = tancada ? TANCADA : OBERTA;
angle = angle + K * (objectiu - angle);             // proporcional a l'error
pinca.write((int)(angle + 0.5));
Serial.print(objectiu); Serial.print(" "); Serial.println(angle);
```

### Part B — micro:bit comandament (amb fletxes)
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)
LLINDAR = 300
while True:
    x = accelerometer.get_x()
    if x > LLINDAR:
        display.show(Image.ARROW_E)
        radio.send("B+")
    elif x < -LLINDAR:
        display.show(Image.ARROW_W)
        radio.send("B-")
    else:
        display.show(Image.DIAMOND_SMALL)
    sleep(150)
```
Receptor:
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)
while True:
    m = radio.receive()
    if m:
        display.show(m[1])     # "+" o "-"
    sleep(20)
```
