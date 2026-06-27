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
