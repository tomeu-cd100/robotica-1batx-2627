# Prova pràctica — Trimestre 3 (SA7-SA9)
## "Robot autònom + sistema connectat"

**Durada:** 2 h · **Material:** robot mòbil (Imagina 3dBot) + pista de proves; micro:bit. Es permet consultar esquemes i quadern.

> ℹ️ Al 3r trimestre **el pes principal de l'avaluació és el projecte final (SA9)** amb les rúbriques R1-R5 i el dossier tècnic. Aquesta prova pràctica **complementa** el projecte i comprova destreses de robòtica i integració.

### Competències i criteris avaluats
- **CE-R4** (robots) → CA4.1, CA4.2 · **CE-R3** (control) → CA3.1
- Rúbriques: **R1** (codi), **R3** (robot/control), **R4** (documentació).

---

## Enunciat (per nivells)

### PART A — Robòtica mòbil (6 punts)
Programa el robot perquè, en una **pista marcada**:
1. **Nivell satisfactori:** faci un **recorregut definit** (p. ex. recte + gir de 90° + recte) de manera fiable.
2. **Ampliació (notable):** **reaccioni a un obstacle** (s'atura o l'esquiva amb l'ultrasons).
3. **Ampliació (excel·lent):** **segueixi una línia** o faci una correcció **proporcional** del rumb.

### PART B — Integració IoT/IA (4 punts)
4. **Nivell satisfactori:** amb micro:bit, **mesura i transmet** una dada (telemetria per ràdio) o **classifica un gest**.
5. **Ampliació:** integra la dada/decisió en el comportament (p. ex. una ordre per ràdio atura el robot, o un gest dispara una acció).

### Lliurament
Demostració a la pista + **explicació al quadern**: estratègia del robot (diagrama de la decisió) i descripció del sistema connectat.

---

## Graella de correcció (10 punts)

| Criteri | Punts | Rúbrica |
|---|---|---|
| Recorregut definit fiable (nucli) | 3 | R1, R3 |
| Reacció a obstacle (ampliació) | 1,5 | R3 |
| Seguidor de línia / correcció proporcional (ampliació) | 1,5 | R3 |
| Telemetria o classificació de gest (nucli Part B) | 2 | R1 |
| Integració dada/decisió en l'acció (ampliació) | 1 | R3 |
| Documentació (estratègia + sistema) | 1 | R4 |

---

## Solució orientativa (docent)

### Part A — recorregut + reacció a obstacle (combinat)
> Ajustar pins i temps de gir segons la placa.
```cpp
const int ESQ_DIR=4, ESQ_VEL=5, DRET_DIR=7, DRET_VEL=6, TRIG=12, ECHO=11;
const int VEL=170; const int T_GIR_90=600;
void motors(int dE,int vE,int dD,int vD){ digitalWrite(ESQ_DIR,dE);analogWrite(ESQ_VEL,vE);
  digitalWrite(DRET_DIR,dD);analogWrite(DRET_VEL,vD); }
void endavant(){ motors(HIGH,VEL,HIGH,VEL); }
void gira(){ motors(HIGH,VEL,LOW,VEL); }
void atura(){ analogWrite(ESQ_VEL,0); analogWrite(DRET_VEL,0); }
float dist(){ digitalWrite(TRIG,LOW);delayMicroseconds(2);digitalWrite(TRIG,HIGH);
  delayMicroseconds(10);digitalWrite(TRIG,LOW); long t=pulseIn(ECHO,HIGH,30000);
  return t==0?400:t*0.034/2.0; }
void setup(){ pinMode(ESQ_DIR,OUTPUT);pinMode(ESQ_VEL,OUTPUT);pinMode(DRET_DIR,OUTPUT);
  pinMode(DRET_VEL,OUTPUT);pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT); delay(1000); }
void loop(){
  if (dist() < 15) { atura(); delay(200); gira(); delay(T_GIR_90); }  // esquiva
  else endavant();
  delay(30);
}
```

### Part B — micro:bit: ordre per ràdio que atura el robot
```python
from microbit import *
import radio
radio.on(); radio.config(group=10)
while True:
    if button_a.is_pressed():
        radio.send("STOP")      # envia ordre
        display.show(Image.NO)
    else:
        display.clear()
    sleep(100)
```
> (El robot, amb un receptor de ràdio, atura motors en rebre "STOP" — integració acció↔comunicació.)

> Avaluació global del trimestre: combinar el resultat d'aquesta prova amb la rúbrica del **projecte final (SA9)**.
