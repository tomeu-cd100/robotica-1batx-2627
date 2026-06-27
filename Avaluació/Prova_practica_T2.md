# Prova pràctica — Trimestre 2 (SA4-SA6)
## "Control climàtic + estació remota"

**Durada:** 2 h · **Material:** Arduino UNO + motor/ventilador amb pont H (o LED PWM com a substitut) + NTC/potenciòmetre; 2 micro:bit. Es permet consultar esquemes i quadern.

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
Programa una **estació remota** en MicroPython:
1. **Nivell satisfactori:** mostra la temperatura/llum i, si supera un llindar, mostra una alerta (Image.NO).
2. **Ampliació:** **envia la lectura per ràdio** a una segona placa que la rep i la mostra.

### Lliurament
Tots dos programes funcionant + **quadern**: diagrama de blocs del control (Part A) i taula d'una lectura enviada/rebuda (Part B).

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

### Part A — control proporcional (inclou la base de histèresi com a alternativa)
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
