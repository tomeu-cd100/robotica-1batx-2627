# Pràctica 1 · El selector d'articulació: benvingut a Python

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_selector_articulacio.py` · **Entorn:** [python.microbit.org](https://python.microbit.org) · [connexions i entorn](../SA5_connexions.md) (no cal muntatge)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../SA5_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Canvi de plataforma i de llenguatge: deixes l'Arduino i el C++ i passes a la
**micro:bit** amb **Python**. Però el robot no canvia: en aquesta SA
construiràs el **comandament sense fils del teu braç MeArm**, i avui en fas la
primera peça. Un comandament de grua té un selector per triar quina
articulació mous; el teu el farà amb els botons A i B i la pantalla de LED:
**B** (base), **E** (esquerre), **D** (dret), **P** (pinça).

El programa és curt a propòsit, perquè el protagonista no és el *què* fa sinó
el *com* està escrit: **en Python la indentació no és estètica, és sintaxi**.
No hi ha `;` al final de les línies ni claus `{}`: el que a C++ feien les
claus, aquí ho fan els **espais del començament de cada línia**. I estrenes una
eina nova que el C++ de la SA4 feia servir poc: la **llista**.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense executar-lo**. Quina
lletra surt en engegar? Què passa si prems **B** cinc vegades seguides? I si
prems **A** just en engegar? Escriu la predicció a l'Activitat 1 de la
[fitxa](../SA5_fitxa_alumnat.md) i comprova-la al
[simulador](https://python.microbit.org) (els botons es cliquen amb el ratolí).

## 🧠 El codi, per blocs

### Bloc 1 — Una sola línia per tenir-ho tot

```python
from microbit import *
```

Aquesta línia importa **tota** la micro:bit: la matriu de LED (`display`),
els botons (`button_a`, `button_b`), les imatges (`Image`), els sensors… És
la mateixa idea que el `#include <Servo.h>` de la SA4: «vull eines que no
venen de sèrie». La diferència és que en Python **tot** es demana
explícitament, també el bàsic.

Fixa't també en el que **no** hi ha: ni `setup()` ni `loop()`. En Python el
programa s'executa **des de la primera línia**, de dalt a baix.

### Bloc 2 — Una llista amb les articulacions

```python
ARTICULACIONS = ["B", "E", "D", "P"]
triada = 0          # posicio dins de la llista (0 = la base)

display.scroll("BRAC")
```

Una **llista** és una fila de calaixos numerats: el primer és el **0**, no
l'1. `ARTICULACIONS[0]` és `"B"` i `ARTICULACIONS[3]` és `"P"`. La variable
`triada` diu en quin calaix som. Fixa't que no hi ha `int` davant de
`triada`: en Python les variables **no declaren el tipus**.

`display.scroll()` **desplaça** el text per la matriu (25 LED són pocs per a
una paraula sencera). Mentre el text passa, el programa no fa res més.

### Bloc 3 — El bucle infinit i els botons

```python
while True:
    if button_a.was_pressed():
        triada = triada - 1
        if triada < 0:
            triada = len(ARTICULACIONS) - 1   # de la base salta a la pinca
    elif button_b.was_pressed():
        triada = triada + 1
        if triada >= len(ARTICULACIONS):
            triada = 0                        # de la pinca torna a la base
```

`while True:` és el `loop()` d'Arduino: un bucle que no s'acaba mai. Les
línies de sota van **indentades 4 espais**, i això és el que diu a Python que
són *dins* del bucle. Els dos punts `:` al final de `while` i d'`if` són
obligatoris: anuncien que ve un bloc indentat. I `elif` és el `else if` del
C++.

`was_pressed()` és diferent de l'`is_pressed()` que potser has vist: no
pregunta *«està premut ara?»* sinó *«s'ha premut des de l'última vegada que
t'ho he preguntat?»*. Així, una premuda = un pas, encara que mantinguis el
dit. (A la SA3 això ho feies a mà amb l'antirebot!)

`len(ARTICULACIONS)` és la mida de la llista (4). Quan `triada` surt per un
extrem, torna per l'altre: el selector és **circular**, com les hores d'un
rellotge.

### Bloc 4 — Mostrar la tria

```python
    display.show(ARTICULACIONS[triada])
    sleep(100)
```

`display.show()` mostra una lletra o una imatge **fixa**, sense desplaçar-la.
`sleep(100)` és el `delay(100)` d'Arduino, en mil·lisegons.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| `IndentationError` en carregar | Has barrejat tabs i espais, o una línia del bloc no està al mateix nivell que les altres. Usa **4 espais** coherents. |
| `IndexError: list index out of range` | `triada` ha sortit de la llista (val 4 o -1): falta l'`if` que la fa tornar per l'altre extrem. |
| Cada premuda salta dues o tres lletres | Has fet servir `is_pressed()` en lloc de `was_pressed()`. |
| `NameError: name ... is not defined` | Falta `from microbit import *` a dalt, o has escrit malament un nom (`ARTICULACIO`). |

## 🔗 On ho aplicaràs

- **Repte de la S1:** que en triar una articulació es vegi una **imatge** pròpia (una fletxa per a la base, una «pinça» feta a mà amb `Image("...")` per a la pinça…).
- **Al braç:** a la S3, el comandament per ràdio enviarà ordres que comencen amb aquestes mateixes lletres (`B+`, `D-`, `P`…). El [repte A](../../../Reptes/Reptes_SA5.md) combina el selector amb la ràdio.
- **Taula comparativa:** ja pots omplir la primera fila (estructura, final d'instrucció, blocs de codi, tipus de les variables) de l'Activitat 4 de la [fitxa](../SA5_fitxa_alumnat.md).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA5](../../../Reptes/Reptes_SA5.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).
