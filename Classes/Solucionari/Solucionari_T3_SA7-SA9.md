# Solucionari de reptes — Trimestre 3 (SA7-SA9)

> Solucions orientatives. A SA7 recorda **ajustar els pins** dels motors segons la placa.

---

## SA7 (Imagina 3dBot)

### + Repte: compensar per anar recte (offset de velocitats)
Si el robot tira cap a un costat, aplica un petit offset a una roda:
```cpp
const int VEL = 180;
const int OFFSET = 15;   // ajusta'l fins que vagi recte (pot ser negatiu)
void endavant(){
  motors(HIGH, VEL, HIGH, VEL - OFFSET);  // frena lleugerament una roda
}
```

### Repte: trajectòria en triangle
Un triangle equilàter requereix girs de **120°** (angle exterior):
```cpp
const int T_RECTE = 1200, T_GIR_120 = 800;  // CALIBRAR T_GIR_120
void setup(){
  // ... pinMode dels motors ...
  delay(1000);
  for (int i=0; i<3; i++){
    endavant(); delay(T_RECTE); atura(); delay(300);
    gira_dreta(); delay(T_GIR_120); atura(); delay(300);
  }
  atura();
}
void loop(){}
```

### + Repte: seguidor de línia PROPORCIONAL (sensors analògics)
Si els sensors donen lectura analògica, la correcció és proporcional a l'error:
```cpp
const int ESQ_VEL=5, DRET_VEL=6, ESQ_DIR=4, DRET_DIR=7;
const int S_ESQ=A0, S_DRET=A1;   // sensors analogics
const int BASE = 150;
const float Kp = 0.2;
void setup(){
  pinMode(ESQ_VEL,OUTPUT);pinMode(DRET_VEL,OUTPUT);
  pinMode(ESQ_DIR,OUTPUT);pinMode(DRET_DIR,OUTPUT);
  digitalWrite(ESQ_DIR,HIGH); digitalWrite(DRET_DIR,HIGH);
}
void loop(){
  int error = analogRead(S_ESQ) - analogRead(S_DRET);  // desviacio
  int corr = (int)(Kp * error);
  int vEsq = constrain(BASE - corr, 0, 255);
  int vDret = constrain(BASE + corr, 0, 255);
  analogWrite(ESQ_VEL, vEsq);
  analogWrite(DRET_VEL, vDret);
}
```
> Aquesta correcció **proporcional** dona un seguiment molt més suau que el tot/res (connecta amb SA6).

### + Repte: gir proporcional a la proximitat (evita-obstacles)
Com més a prop l'obstacle, gir més tancat (gira més estona):
```cpp
const int DIST_MIN = 25;
void loop(){
  float d = distancia();
  if (d < DIST_MIN) {
    int gir = map((int)d, 5, DIST_MIN, 600, 150);  // mes a prop -> gir mes llarg
    gir = constrain(gir, 150, 600);
    atura();      delay(100);
    gira_dreta(); delay(gir);
    atura();      delay(100);
  } else {
    endavant();
  }
  delay(30);
}
```

### + Repte: tornar al punt de sortida
Per a un recorregut en "L", fes el camí d'anada, fes mitja volta i refes-lo:
```cpp
void anada(){ endavant(); delay(1200); gira_dreta(); delay(600); endavant(); delay(1200); }
void mitja_volta(){ gira_dreta(); delay(1200); }   // ~180 graus (CALIBRAR)
void setup(){
  // ... pinMode dels motors ...
  delay(1000);
  anada();
  mitja_volta();
  anada();          // refa el cami per tornar a prop de l'origen
  atura();
}
void loop(){}
```

---

## SA8

### + Repte: afegir una classe de gest nova al classificador
Afegeix una regla nova a `classifica()` (p. ex. detectar "GIR" amb la brúixola o un llindar combinat):
```python
def classifica(x, y, z):
    if accelerometer.was_gesture("shake"):
        return "SACSEIG"
    if abs(x) < 200 and abs(y) < 200 and z < -700:
        return "PLA"
    if y > 600 and x > 600:          # NOVA classe combinada
        return "CANTONADA"
    # ... la resta de regles ...
    return "DRET"
```

### + Repte (ML real): nota
Per a **aprenentatge automàtic** real (no regles), usar l'entorn **MakeCode "Code & AI"** (https://microbit.org/code-ai/): recollir mostres de cada gest, **entrenar** el model i exportar-lo. És una bona pràctica per discutir dades d'entrenament i biaixos.

### + Repte: alerta per llindar (telemetria)
L'emissor envia una alerta quan supera un llindar; el receptor la mostra:
```python
# EMISSOR
from microbit import *
import radio
radio.on(); radio.config(group=10)
LLINDAR = 28
while True:
    if temperature() > LLINDAR:
        radio.send("ALERTA")
    sleep(1000)
```
```python
# RECEPTOR
from microbit import *
import radio, music
radio.on(); radio.config(group=10)
while True:
    if radio.receive() == "ALERTA":
        display.show(Image.SKULL)
        music.play(music.BA_DING)
    sleep(50)
```

---

## SA9

El projecte final és **obert**: no té solucionari tancat. L'avaluació es fa amb les **rúbriques R1-R5** i el **dossier tècnic** ([`SA9/plantilles/Dossier_tecnic_PLANTILLA.md`](../SA9/plantilles/Dossier_tecnic_PLANTILLA.md)). Per a cada repte del banc, el professorat pot preparar una solució de referència pròpia segons el material triat.
