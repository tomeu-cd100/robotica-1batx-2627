# SA0 · Fitxa d'alumnat — Vocabulari i primeres passes amb el codi

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Aquesta fitxa és d'**autoaprenentatge**: pots fer-la sol/a o en parella, amb el `SA0_vocabulari_essencial.md` i el `SA0_guia_programacio.md` al costat. No es qualifica: serveix perquè arribis a la SA1 amb la base posada.

---

## Activitat 1 · Entrada – Procés – Sortida

Per a cada sistema, indica què **percep** (entrada), què **decideix** (procés) i què **fa** (sortida).

| Sistema | Entrada | Procés | Sortida |
|---|---|---|---|
| Llum automàtica del passadís | | | |
| Termòstat de la calefacció | | | |
| Porta automàtica d'un supermercat | | | |

---

## Activitat 2 · Digital o analògic?

Marca amb una **D** (digital) o una **A** (analògic):

- [ ] Un interruptor de la llum → ____
- [ ] El comandament del volum → ____
- [ ] Un botó del timbre → ____
- [ ] Un termòmetre → ____
- [ ] Un sensor de llum (LDR) → ____

> **Pista:** *digital* = només 2 estats; *analògic* = molts valors continus.

---

## Activitat 3 · Emparella terme i definició

Uneix amb una fletxa (o escriu el número):

| Terme | | Definició |
|---|---|---|
| 1. Sensor | | ___ Component que fa una acció física (motor, LED). |
| 2. Actuador | | ___ Petit "cervell" que executa el programa. |
| 3. Microcontrolador | | ___ Component que mesura una magnitud de l'entorn. |
| 4. Sketch | | ___ Error dins d'un programa. |
| 5. Bug | | ___ El programa que escrius a l'Arduino IDE. |

---

## Activitat 4 · Llegeix el codi i PREDIU (sense executar)

Mira aquest *sketch* d'Arduino. **Abans de res**, escriu què creus que farà:

```cpp
const int PIN_LED = 13;

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(1000);
  digitalWrite(PIN_LED, LOW);
  delay(1000);
}
```

**La meva predicció:** _______________________________________________

Respon:
- Què fa la línia de dins de `setup()`? __________________________________
- Quantes vegades s'executa `setup()`? _________________________________
- Què passaria si canviés els dos `delay(1000)` per `delay(100)`? ___________

---

## Activitat 5 · Detecta l'error

Aquest codi té **un error**. Troba'l i explica com l'arreglaries:

```cpp
void setup() {
  pinMode(13, OUTPUT)
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
}
```

**L'error és:** __________________________________________________________

> **Pista:** revisa el final de les línies (Part A, secció A2–A4 de la guia).

---

## Activitat 6 · Tradueix d'Arduino a MicroPython

Completa la versió en **MicroPython** (micro:bit) d'aquesta idea: *"mostra la lletra A mig segon, en bucle"*.

**Arduino (referència de la lògica):**
```cpp
void loop() {
  // mostrar "A" durant 500 ms
}
```

**MicroPython (completa-ho):**
```python
from microbit import *

while ____:
    display.show("____")
    sleep(____)
```

> **Pista:** mira la Part B i la taula comparativa (Part C) de la guia.

---

## Si t'encalles · com depurar un error

Quan un codi no fa el que esperes, segueix la **rutina DEPURA** (la faràs servir tot el curs):

> **D**escriu (què esperaves vs què passa) · **E**xamina (missatge d'error, la línia) · **P**rova una hipòtesi cada cop · **U**bica el problema · **R**epara i torna a provar · **A**punta-ho.

L'**Activitat 5** d'aquesta fitxa ja és una depuració: aplica-hi la **D** i la **E**.

## Pensament computacional d'aquesta SA

- **Abstracció:** posar nom als conceptes (sensor, actuador, sketch…) per pensar i comunicar millor.
- **Lectura d'algorismes:** seguir un codi pas a pas i **predir-ne** el resultat (Activitats 4 i 6).

## Exit ticket

1. Un terme nou que ja domino: ______________________
2. Un terme que encara em costa: ______________________
3. Una cosa del codi que vull entendre millor: ______________________

## Context real i ODS

Entendre els sistemes que ens envolten és **alfabetització tecnològica**. **ODS 4** (educació de qualitat): aprendre a programar t'obre portes. Quin aparell de casa t'agradaria entendre per dins? ______________________

---

## Autoavaluació (marca el teu nivell)

| Ja ho sé… | 🔴 Encara no | 🟡 A mitges | 🟢 Sí |
|---|---|---|---|
| Explicar entrada-procés-sortida | | | |
| Distingir digital i analògic | | | |
| Dir què fan `setup()` i `loop()` | | | |
| Llegir un codi senzill i predir què farà | | | |
| Saber on consultar un terme que no recordo | | | |

> Si tens dos o més 🔴, repassa el `SA0_vocabulari_essencial.md` i el `SA0_guia_programacio.md` abans de la SA1. **No passa res**: per això existeix la SA0.
