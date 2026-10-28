# SA5 · Exemple resolt (model «jo ho faig») — El comandament de botons i el panell del braç

> 🧑‍🎓 **Quan toca mirar-lo?** Després del teu **primer intent** amb la ràdio de l'**Activitat 3 (S3)** — mai abans. És un problema **anàleg** per veure *com es pensa*, no la solució del teu comandament per inclinació.

> 🔗 **D'on ve i on va.** Aquest exemple és el **bessó comentat** de la pràctica [Ràdio: el comandament del braç](codi/03_radio_comandament_EXPLICACIO.md): el mateix **protocol d'ordres** (`B+`, `B-`, `P`) i la mateixa ràdio, però el comandament funciona amb **botons** en lloc d'inclinació, i l'altra placa fa de **panell** que mostra què arriba. Serveix per veure **com es pensa**, no per copiar-lo. Quan l'hagis entès, torna a la pàgina de la pràctica i fes-la teva.

> 🗺️ **Com es llegeix per apartats:** **🔑 El repte model** primer, per situar-te · **🧭 Com ho penso** abans d'escriure el **teu** codi (és l'apartat més important: el raonament) · **💡 La solució anotada** només **després del teu intent**, per comparar · **🔬 Provo i mesuro** quan provis el teu: copia'n el **mètode**, no el resultat · **⚠️ Contraexemple** quan una cosa no rutlli — i com a repàs abans d'entregar · **📔 Diari de bord** quan escriguis la teva entrada del quadern.

> **Nota docent:** mostra'l **després del primer intent** amb `03_radio_comandament.py`, mai abans.
> No és la solució del producte: és un problema **anàleg** resolt pas a pas perquè l'alumnat vegi
> *com es pensa*. Comenta en veu alta el pas «🧭 Com ho penso» (predicció abans de codi, PRIMM) i,
> sobretot, el «⚠️ Contraexemple» (grups de ràdio i tipus de dades).

---

![Comunicació per ràdio entre dues plaques micro:bit](img/sa5-radio.svg)

## 🔑 El repte model

> Algunes persones no poden inclinar bé la mà. Fes un **comandament de botons** per al braç: el botó
> **A** gira la base cap a un costat (`B-`), el **B** cap a l'altre (`B+`) i **A+B** obre o tanca la
> pinça (`P`). La segona placa fa de **panell**: mostra una fletxa o una P segons l'ordre que arriba
> i compta quantes ordres ha rebut.

Fa servir només conceptes de la SA5: `from microbit import *`, `while True:` amb **indentació**,
botons, la matriu de LED, la **ràdio** amb `group` i el **protocol d'ordres** del braç. Com que les
ordres són les mateixes, aquest comandament també mouria el braç a través del pont.

---

## 🧭 Com ho penso (abans d'escriure codi)

1. **Analitzo:** hi ha **dues plaques amb dues feines**. El comandament *decideix i envia*; el panell
   *rep i mostra*. Cap de les dues no mou cap servo: parlen el **protocol**, i qui l'entén actua.
2. **Descomponc:** al comandament, primer miro **A i B alhora** (si no, mai arribaria a la `P`:
   la branca de només A ja l'agafaria abans). Al panell, una cadena `if`/`elif` amb una branca per
   ordre, i un comptador.
3. **🔮 PREDIU (fes-ho tu abans de llegir el codi):**
   - Si **cap** placa no ha enviat res, `radio.receive()` retorna… ☐ `0` ☐ `""` ☐ **`None`**.
   - Si poso primer `if button_a.is_pressed():` i després `elif ... and ...:`, la `P`… ☐ funciona ☐ **no s'envia mai**.
   - `radio.send(5)` (un número)… ☐ funciona ☐ **dona error: la ràdio envia text**.

---

## 💡 La solució anotada

**Placa 1 · El comandament de botons**

```python
# SA5 - exemple_comandament_botons.py  (EXEMPLE MODEL, no es el producte)
# A: gira la base a un costat; B: a l'altre; A+B: obre/tanca la pinca.
# Mateix protocol que el comandament per inclinacio.

from microbit import *
import radio

GRUP = 10
radio.on()
radio.config(group=GRUP)

while True:
    a = button_a.is_pressed()
    b = button_b.is_pressed()

    if a and b:                 # PRIMER el cas combinat
        radio.send("P")
        display.show("P")
        sleep(500)              # una sola P per premuda
    elif a:
        radio.send("B-")
        display.show(Image.ARROW_W)
    elif b:
        radio.send("B+")
        display.show(Image.ARROW_E)
    else:
        display.show(Image.DIAMOND_SMALL)
    sleep(150)
```

**Placa 2 · El panell**

```python
# SA5 - exemple_panell.py  (EXEMPLE MODEL)
# Mostra cada ordre que arriba i en porta el compte.

from microbit import *
import radio

GRUP = 10
radio.on()
radio.config(group=GRUP)
rebudes = 0

while True:
    ordre = radio.receive()
    if ordre:                          # None compta com a fals
        rebudes = rebudes + 1
        if ordre == "B+":
            display.show(Image.ARROW_E)
        elif ordre == "B-":
            display.show(Image.ARROW_W)
        elif ordre == "P":
            display.show("P")
    if button_a.was_pressed():
        display.scroll(str(rebudes))   # quantes n'han arribat
    sleep(10)
```

**Per què està escrit així (🌟):**
- **Els botons es llegeixen un cop a variables** (`a`, `b`) i després es decideix: així les tres branques miren el mateix instant.
- **El cas combinat va primer**: en una cadena `if`/`elif`, la primera condició certa guanya.
- **El protocol és text** i és **el mateix** que el del comandament per inclinació: el pont i l'Arduino no saben (ni els cal saber) quin comandament tenen al davant.
- Al panell, `str(rebudes)` converteix el número en text perquè `scroll()` el pugui mostrar.

---

## 🔬 Provo i mesuro

- **Predicció ✔:** sense res a l'aire, `radio.receive()` retorna `None`; amb l'`elif` combinat al final, la `P` no surt mai; `radio.send(5)` dona error.
- **Mètode:** prem A deu vegades i mira el comptador del panell. Si en compta més de deu, el comandament envia una ordre a cada volta mentre mantens premut: és el comportament esperat (moviment continu), i per això la `P` porta una pausa.
- **Racó de mesura:** cronometra 10 s mantenint A premut. Amb `sleep(150)`, haurien d'arribar unes **60-65 ordres** (cada ordre mou el braç 3°: uns 190°, mitja volta llarga).
- **Límit honest:** si un company fa servir el teu grup, el teu panell també comptarà les seves ordres. La ràdio de la micro:bit no té «contrasenya»: el grup és un canal, no un candau.

---

## ⚠️ Contraexemple (errors típics i com es detecten)

- **Grups diferents a les dues plaques** → el panell **no rep res**, encara que el codi sigui perfecte. *Solució:* el mateix `GRUP` (el teu número de llista) a totes dues.
- **`radio.on()` dins del bucle** → funciona, però reinicia la ràdio a cada volta i **es perden ordres**. *Solució:* encendre-la un cop, a dalt.
- **`if ordre == "B+"` sense comprovar abans que no és `None`** → aquí no peta, però si fessis `ordre[0]` amb `None` sí. *Solució:* `if ordre:` abans de mirar-ne res.
- **Barrejar tabs i espais** → `IndentationError` en flashejar. *Solució:* 4 espais coherents.

---

## 📔 Diari de bord (entrada model, 1a persona)

> **Sessió 3:** He fet un **comandament de botons** per al braç que envia les mateixes ordres que el
> d'inclinació (`B+`, `B-`, `P`) i un **panell** que les mostra i les compta. Al principi la `P` no
> sortia mai: tenia el cas `A+B` al final de la cadena i la branca de només A l'agafava abans. També
> m'he adonat que mantenir el botó envia moltes ordres (unes 6 per segon), i per això la pinça porta
> una pausa. **Evidència:** captura del codi de les dues plaques + vídeo del panell comptant.

**Per què és una bona entrada:** usa el **vocabulari clau** (protocol, grup de ràdio, `send`,
`receive`, `None`, indentació), explica *el com*, i és **honesta amb la dificultat** (la `P` que no
sortia) i com es va resoldre.

---

*Exemple resolt de la SA5. Model de treball per a l'alumnat (alliberament gradual: es mostra
després del primer intent). Es recolza en `codi/01_selector_articulacio.py` (botons) i
`codi/03_radio_comandament.py` (ràdio i protocol). Llicència CC BY-SA 4.0.*
