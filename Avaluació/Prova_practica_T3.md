# Prova pràctica — Trimestre 3 (SA7-SA9)
## "Robot autònom + sistema connectat"

**Durada:** 2 h (la **S5 de la SA9**, sencera) · **Material:** robot mòbil + pista de proves; micro:bit. Es permet consultar esquemes i quadern.

> 🤖 **Quin robot?** Amb el **fil conductor** actiu, cada alumne/a té el **seu rover** ([dossier T3](../Classes/00_General/00_Projecte_T3_Rover.md)) i el coll d'ampolla són **només les pistes**: amb 2-3 pistes i un grup petit, els torns són curts. Sense fil conductor, l'aula comparteix 2-3 **Imagina 3dBot** i llavors el que limita són els robots: els torns s'allarguen molt més i cal comptar-los bé.

> ℹ️ Al 3r trimestre **el pes principal de l'avaluació és el projecte final (SA9)** amb les rúbriques R1-R5 i el dossier tècnic. Aquesta prova pràctica és un instrument **separat i individual**: comprova destreses de robòtica i integració (SA7-SA8), puntua només a la dimensió «Proves pràctiques» (20 %) i **no reavalua el projecte** (que ja ha estat defensat a la S4).

### Logística: estacions rotatives

No es pot fer la Part A tothom alhora (les pistes no hi arriben). Organització de la sessió:

1. **Tota la classe comença per la Part B** (micro:bit, a la seva taula): és individual i no necessita robot. Temps recomanat: 40-45'.
2. **Part A per torns a les estacions de pista** (10-12' per persona i estació), mentre la resta acaba la Part B i **prepara i verifica el codi de la Part A al banc o al simulador** (Wokwi) abans del seu torn.
3. Ordre de torns publicat a l'inici; qui ha passat per la pista completa la documentació del quadern.
4. El docent només observa i cronometra a la pista; la correcció de codi es fa després amb el quadern i el codi lliurat.

> ⏱️ **El compte, amb els 15' de desmuntatge del final** (vegeu la guia de SA9): la sessió dona ~100' efectius i els últims 15' són per desmuntar i retornar el material, així que **la prova acaba al minut ~85**. Fes el teu compte amb la fórmula *(alumnes ÷ pistes) × minuts per torn*, i que l'últim torn tanqui abans del minut 85:
>
> | Grup | Pistes | Torn | Part A ocupa | Comença al minut |
> |---|---|---|---|---|
> | 5 alumnes | 2 | 10-12' | ~30' | 45-50' (va folgat) |
> | 20 alumnes | 2 | 8-10' | ~50' | 35' (just) |
>
> Publica la llista de torns amb l'hora d'inici a la pissarra.

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

### Reflexió final de curs (3 línies, no puntua)
> Última entrada del quadern: **(1)** la competència de què estic més orgullós/osa aquest curs · **(2)** el que encara em costa · **(3)** on ho continuaré (batxillerat tecnològic, Treball de Recerca, projecte propi, competició…). Tanca el quadern com el vas obrir: mirant el procés, no només la nota.

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
