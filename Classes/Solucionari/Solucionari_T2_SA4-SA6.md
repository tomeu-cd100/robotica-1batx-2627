# Solucionari de reptes — Trimestre 2 (SA4-SA6)

> Solucions orientatives dels reptes **"+ repte" / "+ ampliació"**. Hi pot haver més d'una solució vàlida.

---

## SA4

### Repte: vaivé automàtic del servo (sweep)
```cpp
#include <Servo.h>
Servo servo;
void setup(){ servo.attach(9); }
void loop(){
  for (int a = 0; a <= 180; a++) { servo.write(a); delay(15); }
  for (int a = 180; a >= 0; a--) { servo.write(a); delay(15); }
}
```

### + Repte: rampa d'acceleració del motor (pont H)
```cpp
const int ENA=5, IN1=7, IN2=8;
void setup(){ pinMode(ENA,OUTPUT); pinMode(IN1,OUTPUT); pinMode(IN2,OUTPUT);
  digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); }      // sentit fix
void loop(){
  for (int v=0; v<=255; v++){ analogWrite(ENA,v); delay(20); }  // accelera
  for (int v=255; v>=0; v--){ analogWrite(ENA,v); delay(20); }  // frena
  delay(500);
}
```

### + Repte: invertir el sentit segons la distància
```cpp
const int ENA=5, IN1=7, IN2=8, TRIG=12, ECHO=11;
float dist(){ digitalWrite(TRIG,LOW);delayMicroseconds(2);
  digitalWrite(TRIG,HIGH);delayMicroseconds(10);digitalWrite(TRIG,LOW);
  return pulseIn(ECHO,HIGH)*0.034/2.0; }
void setup(){ pinMode(ENA,OUTPUT);pinMode(IN1,OUTPUT);pinMode(IN2,OUTPUT);
  pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT); }
void loop(){
  float d = dist();
  if (d < 15) { digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); } // enrere si a prop
  else        { digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); } // endavant
  analogWrite(ENA, 180);
  delay(50);
}
```

### Repte exprés: el traductor de distàncies (estendre el rang del `map()`)

El número que ho decideix és el **50** del `map()` (límit superior del rang d'entrada, en cm). Per estendre el gradient fins a 2 m:

```cpp
int vel = map((int)d, SEGURETAT, 200, 80, 255);  // abans: ..., 50, 80, 255
vel = constrain(vel, 80, 255);                   // aquest NO es toca: retalla la sortida (80..255)
```

Error esperable de l'alumnat: canviar el 50… del `constrain()` (que no en té cap) o tocar el 255 pensant que és la distància. El `map()` tradueix el rang d'**entrada** (cm) al de **sortida** (PWM); el `constrain()` només posa topalls a la sortida.

### + Repte: dos servos coordinats
```cpp
#include <Servo.h>
Servo base, pinca;
void setup(){ base.attach(9); pinca.attach(10); }
void loop(){
  // moviment coordinat: la base gira i la pinca actua a cada extrem
  base.write(0);   pinca.write(10);  delay(600);   // posicio A, pinca oberta
  base.write(120); pinca.write(80);  delay(600);   // posicio B, pinca tancada
}
```

---

## SA5 (MicroPython)

### Repte: badge d'emocions
```python
from microbit import *
while True:
    if button_a.is_pressed():
        display.show(Image.HAPPY)
    elif button_b.is_pressed():
        display.show(Image.SAD)
    else:
        display.show(Image.ASLEEP)
    sleep(100)
```

### + Repte: termòmetre amb màxim i mínim
```python
from microbit import *
maxim = temperature()
minim = temperature()
while True:
    t = temperature()
    if t > maxim: maxim = t
    if t < minim: minim = t
    if button_a.is_pressed():
        display.scroll("T" + str(t))
    if button_b.is_pressed():
        display.scroll("max" + str(maxim) + " min" + str(minim))
    sleep(200)
```

### Repte: pedra-paper-tisora per ràdio
```python
from microbit import *
import radio, random
radio.on(); radio.config(group=10)
JUGADES = ["PEDRA", "PAPER", "TISORA"]
while True:
    if accelerometer.was_gesture("shake"):
        jugada = random.choice(JUGADES)
        display.scroll(jugada[0])      # P / A(paper) / T -> mostra inicial
        radio.send(jugada)
    msg = radio.receive()
    if msg:
        display.scroll("R:" + msg[0])
    sleep(50)
```

### + Repte: animació pròpia (badge)
```python
from microbit import *
fotogrames = [Image.HEART_SMALL, Image.HEART]   # crea els teus fotogrames
while True:
    for img in fotogrames:
        display.show(img)
        sleep(300)
```

### + Repte: xarxa de 3+ plaques (cada placa amb un ID)
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)   # mateix group per a tota la xarxa
ID = "P1"   # canvia'l a cada placa: P1, P2, P3...
while True:
    if button_a.is_pressed():
        radio.send(ID + ":hola")     # envia identificat
    msg = radio.receive()
    if msg:
        display.scroll(msg)          # mostra qui ha enviat
    sleep(50)
```

---

## SA6

### + Repte: termòstat amb indicador verd/vermell
```cpp
const int SENSOR=A0, SORTIDA=9, LED_V=7, LED_R=8;
const int ALT=600, BAIX=500;
bool actiu=false;
void setup(){ pinMode(SORTIDA,OUTPUT); pinMode(LED_V,OUTPUT); pinMode(LED_R,OUTPUT); }
void loop(){
  int t = analogRead(SENSOR);
  if (!actiu && t>ALT) actiu=true;
  else if (actiu && t<BAIX) actiu=false;
  digitalWrite(SORTIDA, actiu?HIGH:LOW);
  digitalWrite(LED_R, actiu?HIGH:LOW);   // vermell = refrigerant
  digitalWrite(LED_V, actiu?LOW:HIGH);   // verd = en repos
}
```

### + Repte: semàfor adaptatiu (polsador de vianant) amb màquina d'estats
```cpp
const int VERMELL=8, GROC=9, VERD=10, BOTO=2;
enum Estat { COTXES_VERD, GROC_TRANS, COTXES_VERMELL };
Estat estat = COTXES_VERD;
unsigned long t0 = 0;
bool peticio = false;

void setup(){
  pinMode(VERMELL,OUTPUT); pinMode(GROC,OUTPUT); pinMode(VERD,OUTPUT);
  pinMode(BOTO, INPUT_PULLUP); t0 = millis();
}
void loop(){
  if (digitalRead(BOTO)==LOW) peticio = true;   // vianant demana pas

  switch(estat){
    case COTXES_VERD:
      digitalWrite(VERD,HIGH); digitalWrite(GROC,LOW); digitalWrite(VERMELL,LOW);
      if (peticio && millis()-t0 > 3000){ estat=GROC_TRANS; t0=millis(); }
      break;
    case GROC_TRANS:
      digitalWrite(VERD,LOW); digitalWrite(GROC,HIGH);
      if (millis()-t0 > 1500){ estat=COTXES_VERMELL; t0=millis(); }
      break;
    case COTXES_VERMELL:
      digitalWrite(GROC,LOW); digitalWrite(VERMELL,HIGH);
      if (millis()-t0 > 5000){ estat=COTXES_VERD; t0=millis(); peticio=false; }
      break;
  }
}
```

### + Repte: què passa si Kp és massa gran? (control proporcional)
> **Resposta:** si **Kp** és massa gran, el sistema **sobrecorregeix**: oscil·la al voltant de la consigna i pot tornar-se **inestable** (no s'estabilitza mai). Si és massa petit, respon molt lentament i no arriba a la consigna. Cal buscar un valor **intermedi**. Es veu molt bé al **Serial Plotter** comparant la lectura amb la consigna.
```cpp
// Sobre SA6/codi/04_control_proporcional.ino, prova diferents valors:
const float Kp = 0.8;   // 0.2 = lent ; 0.8 = equilibrat ; 3.0 = oscil-la/inestable
```

---

## 🤖 Codi de referència del robot del trimestre: el braç

> Implementació completa d'exemple del producte final (dossier
> [🦾 Projecte T2](../00_General/00_Projecte_T2_Brac.md)): control per
> potenciòmetres, aturada d'emergència i, a la fase micro:bit, comandament
> per ràdio. És UNA solució possible: les parelles en poden fer variants.
> Fitxers complets: [`T2_brac.ino`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac/T2_brac.ino) (fase
> Arduino), [`T2_brac_microbit_comandament.py`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac_microbit_comandament.py)
> i [`T2_brac_microbit_receptor.py`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Classes/Solucionari/codi/T2_brac_microbit_receptor.py) (fase
> micro:bit).

### Control amb potenciòmetres i límits d'angle

Cada servo té el seu propi rang segur (`_MIN`/`_MAX`, anotats abans de
programar res més); `mouServos()` fa el `map()` de la lectura analògica
0-1023 a aquest rang, mai a 0-180 a cegues.

```cpp
// Limits d'angle REALS de cada servo: anoteu-los abans de programar res mes
// (rubrica del dossier: el servo mai ha de forcar el topall mecanic).
const int BASE_MIN = 10,  BASE_MAX = 170;
const int COLZE_MIN = 20, COLZE_MAX = 160;
const int PINCA_MIN = 40, PINCA_MAX = 120;  // tancada .. oberta
```

```cpp
void mouServos() {
  // map() de 0-1023 al rang SEGUR de cada servo (mai 0-180 a cegues)
  base.write(map(analogRead(PIN_POT_BASE), 0, 1023, BASE_MIN, BASE_MAX));
  colze.write(map(analogRead(PIN_POT_COLZE), 0, 1023, COLZE_MIN, COLZE_MAX));
  pinca.write(map(analogRead(PIN_POT_PINCA), 0, 1023, PINCA_MIN, PINCA_MAX));
}
```

### Aturada d'emergència (màquina d'estats)

Dos estats (`NORMAL`/`EMERGENCIA`): un xoc detectat pel sensor de col·lisió
força `EMERGENCIA` i els servos es queden on són (no es tornen a escriure);
el rearmament és manual i exigeix el sensor alliberat un temps seguit
(`TEMPS_REARMAMENT`), perquè el braç no rebati contra l'obstacle.

```cpp
enum Estat { NORMAL, EMERGENCIA };
Estat estat = NORMAL;
unsigned long tAlliberat = 0;
```

```cpp
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
```

### El comandament per ràdio (micro:bit)

Protocol de text senzill per ràdio: `"B+"`/`"B-"` mouen la base,
`"C+"`/`"C-"` el colze (segons la inclinació de l'acceleròmetre) i `"P"`
commuta la pinça (botó A+B alhora). El comandament és la 2a micro:bit, la
que es té a la mà.

```python
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

### El receptor: servos amb MicroPython

Sense la llibreria `Servo`, MicroPython mou servos escrivint directament el
valor analògic del PWM: `angle_a_analog()` converteix graus (0-180) a
aquest valor, i `mou()` fixa el període de 20 ms abans d'escriure'l.

```python
def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)

def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))
```
