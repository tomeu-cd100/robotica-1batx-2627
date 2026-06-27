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

---

## SA9

El projecte final és **obert**: no té solucionari tancat. L'avaluació es fa amb les **rúbriques R1-R5** i el **dossier tècnic** (`SA9/plantilles/Dossier_tecnic_PLANTILLA.md`). Per a cada repte del banc, el professorat pot preparar una solució de referència pròpia segons el material triat.
