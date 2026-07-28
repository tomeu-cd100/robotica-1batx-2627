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
Afegeix una regla nova a `classifica()` (p. ex. detectar "GIR" amb un llindar combinat dels eixos):
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

---

## 🤖 Codi de referència del robot del trimestre: el rover

> Implementació completa d'exemple del producte final (dossier
> [🚗 Projecte T3](../00_General/00_Projecte_T3_Rover.md)): màquina d'estats
> de modes, seguir línia, evitar obstacles i telemetria per ràdio. És UNA
> solució possible: les parelles en poden fer variants.
> <!-- web:only-github -->Fitxers complets: [`T3_rover.ino`](codi/T3_rover/T3_rover.ino) i [`T3_rover_microbit_telemetria.py`](codi/T3_rover_microbit_telemetria.py).<!-- /web:only-github -->

### Modes i màquina d'estats

Tres modes (`enum Mode`); el `loop()` comprova primer el para-xocs amb
**prioritat màxima** (aturada immediata en QUALSEVOL mode) i després
delega al comportament del mode actiu.

```cpp
// MODE del rover: canvieu aquesta constant per triar el comportament.
// (Ampliacio possible: commutar de mode amb un polsador o per temps.)
enum Mode { SEGUIR_LINIA, EVITAR_OBSTACLES, ATURAT };
Mode mode = SEGUIR_LINIA;
```

```cpp
void loop() {
  // Para-xocs: aturada immediata en QUALSEVOL mode (prioritat maxima)
  if (digitalRead(PIN_PARAXOCS) == LOW) {
    atura();
    mode = ATURAT;
    Serial.println("XOC: rover aturat (reinicia per tornar a comencar)");
  }

  switch (mode) {
    case SEGUIR_LINIA:    seguirLinia(); break;
    case EVITAR_OBSTACLES: evitarObstacles(); break;
    case ATURAT:          atura(); break;
  }
  delay(30);
}
```

### Seguir línia

Control tot-o-res amb dos sensors: si els dos veuen línia va recte, si
només un la veu gira cap a aquell costat, i si cap dels dos la veu (línia
perduda) gira lent sobre si mateix per retrobar-la.

```cpp
// --- Comportament 1: seguir linia (2 sensors, control tot-o-res) ---
void seguirLinia() {
  bool esq = analogRead(PIN_LINIA_ESQ) > LLINDAR_LINIA;
  bool dret = analogRead(PIN_LINIA_DRET) > LLINDAR_LINIA;

  if (esq && dret) {
    endavant(VEL_CREUER);      // els dos veuen linia: recte
  } else if (esq) {
    giraEsquerra(VEL_GIR);     // la linia fuig cap a l'esquerra
  } else if (dret) {
    giraDreta(VEL_GIR);
  } else {
    // Linia perduda: gira lent sobre si mateix per retrobar-la
    giraDreta(VEL_GIR - 30);
  }
}
```

### Evitar obstacles i el 0 de l'ultrasò

La maniobra d'esquiva (aturar, enrere, girar) fa servir
`esperaVigilantXoc()` en lloc de `delay()`: així el para-xocs es continua
vigilant fins i tot **durant** la maniobra. La lectura de l'HC-SR04
(`distanciaCm()`) tracta el 0 (sense eco) com a "molt lluny" (400 cm) —
**el mateix criteri del sketch d'alarma de SA3**, per evitar falses esquives.

```cpp
// --- Comportament 2: evitar obstacles amb l'ultraso ---
void evitarObstacles() {
  long d = distanciaCm();
  Serial.print("distancia="); Serial.println(d);
  if (d < DIST_OBSTACLE) {
    atura();
    if (esperaVigilantXoc(200)) return;
    enrere(VEL_GIR);
    if (esperaVigilantXoc(400)) return;
    giraDreta(VEL_GIR);   // esquiva sempre per la dreta (senzill i predictible)
    if (esperaVigilantXoc(350)) return;
  } else {
    endavant(VEL_CREUER);
  }
}
```

```cpp
// Espera vigilant para-xocs: durant qualsevol maniobra, monitoritza si es
// detecta xoc. Si LOW, atura immediatament, posa ATURAT i retorna true.
// Sino, retorna false al cap de ms mil·lisegons (resolucio 10 ms).
bool esperaVigilantXoc(unsigned long ms) {
  unsigned long inici = millis();
  while (millis() - inici < ms) {
    if (digitalRead(PIN_PARAXOCS) == LOW) {
      atura();
      mode = ATURAT;
      Serial.println("XOC: rover aturat (reinicia per tornar a comencar)");
      return true;
    }
    delay(10);
  }
  return false;
}
```

```cpp
// Lectura de l'HC-SR04. El 0 (sense eco) es tracta com a "molt lluny" (400):
// el mateix criteri que el sketch d'alarma de SA3, per evitar falses esquives.
long distanciaCm() {
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long durada = pulseIn(PIN_ECHO, HIGH, 25000);   // timeout 25 ms (~4 m)
  if (durada == 0) return 400;
  return durada / 58;
}
```

### Funcions de moviment

Es fixen **una sola vegada** amb la taula de cablatge del dossier: cada
funció escriu directament els 4 pins de direcció del L298N i la velocitat
PWM als dos canals `ENA`/`ENB`.

```cpp
void endavant(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void enrere(int vel) {
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraEsquerra(int vel) {
  // Gir sobre l'eix: motor esquerre enrere, motor dret endavant
  digitalWrite(PIN_IN1, LOW); digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, HIGH); digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void giraDreta(int vel) {
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENA, vel); analogWrite(PIN_ENB, vel);
}

void atura() {
  analogWrite(PIN_ENA, 0); analogWrite(PIN_ENB, 0);
}
```

### Telemetria (micro:bit, patró SA8)

La micro:bit del pis superior emet l'estat per ràdio seguint el mateix
patró que `01_telemetria_emissor.py` de SA8 (mateix format de missatge
`"CLAU:valor;CLAU:valor"`).

```python
comptador_xocs = 0

while True:
    # La micro:bit va muntada al rover: l'accelerometre detecta sotracs
    # (xoc o frenada brusca) i el moviment general.
    if accelerometer.was_gesture("shake"):
        comptador_xocs += 1
        display.show(Image.SURPRISED)
    else:
        display.show(Image.HAPPY)

    x = accelerometer.get_x()
    y = accelerometer.get_y()

    # Mateix format de missatge que SA8: "CLAU:valor;CLAU:valor"
    missatge = "X:" + str(x) + ";Y:" + str(y) + ";XOCS:" + str(comptador_xocs)
    radio.send(missatge)
    print(missatge)   # tambe pel port serie, per registrar-ho a l'ordinador

    sleep(500)   # 2 enviaments per segon: suficient per a telemetria
```

> ⚠️ **Compte amb el receptor:** el
> [receptor `02_telemetria_receptor.py` de SA8](../SA8/codi/02_telemetria_receptor.py)
> mostra el missatge complet per pantalla i sèrie, però la seva alerta de
> llindar (`LLINDAR_TEMP=28` comparant `T:valor`) **no aplica** a aquest
> format `X/Y/XOCS`. Si es vol que el receptor detecti xocs, cal modificar-lo
> perquè llegeixi `XOCS` (en lloc de `T`) i el compari amb un llindar adequat.
>
> La pantalla OLED KS0271 del kit queda com a **ampliació pendent de validar
> amb el maquinari real** (setembre); mentrestant, display 5×5 + sèrie.
