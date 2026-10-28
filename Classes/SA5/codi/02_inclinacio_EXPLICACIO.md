# Pràctica 2 · La inclinació com a gest del comandament

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_inclinacio.py` · **Entorn:** [python.microbit.org](https://python.microbit.org) · [connexions i entorn](../SA5_connexions.md) (no cal muntatge: l'acceleròmetre és dins la placa)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../SA5_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Un comandament amb botons està bé, però un comandament que **endevina el que
vols inclinant-lo** és molt més natural: inclines a la dreta i el braç gira a
la dreta. La micro:bit porta de sèrie un **acceleròmetre**, el mateix sensor
que fa girar la pantalla del mòbil. Mesura cap on «estira» la gravetat en
tres eixos (`x`, `y`, `z`), en mil·lèsimes de *g*.

Avui converteixes aquests números en **gestos**: inclinar a dreta o esquerra,
endavant o enrere, i sacsejar. És el mateix problema de la SA3 i de la SA4
(un sensor dona un número i tu decideixes a partir de quin valor «compta»),
amb un sensor nou: tot es resol amb un **llindar**.

## 🔮 Abans d'executar: prediu

Amb la placa **plana sobre la taula**, quant creus que valdran `x` i `y`? I si
la poses **dreta** (de cantell)? Quin número creus que tindrà `x` si la
inclines a la dreta 45°? Apunta-ho a l'Activitat 2 de la
[fitxa](../SA5_fitxa_alumnat.md) i comprova-ho amb el gràfic.

## 🧠 El codi, per blocs

### Bloc 1 — Llegir l'acceleròmetre i veure'l

```python
LLINDAR = 300    # inclinacio minima perque compti (sota d'aixo: placa plana)

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    print((x, y))              # una tupla: el Plotter en dibuixa dues linies
```

`get_x()` i `get_y()` donen un número entre −2000 i 2000 aproximadament: 0
vol dir plana en aquell eix, i uns 1000 vol dir que la gravetat hi estira del
tot (la placa és de cantell). El `print((x, y))` envia els dos valors junts
(una **tupla**) a l'ordinador: al simulador o a l'editor, el botó **Show
data** (o el *Plotter*) en dibuixa el gràfic en directe. És el Serial Plotter
de l'Arduino.

> 📓 **Sembra per a la SA8:** apunta al quadern els valors reals de `x` i `y`
> en quatre postures (plana, dreta, inclinada i sacsejant). A la SA8 seran el
> punt de partida d'un classificador de gestos amb IA.

### Bloc 2 — Del número al gest

```python
    if accelerometer.was_gesture("shake"):
        display.show("G")
        sleep(300)
    elif x > LLINDAR:
        display.show(Image.ARROW_E)    # dreta: la base giraria
    elif x < -LLINDAR:
        display.show(Image.ARROW_W)    # esquerra
    elif y < -LLINDAR:
        display.show(Image.ARROW_N)    # endavant: el servo dret
    elif y > LLINDAR:
        display.show(Image.ARROW_S)    # enrere
    else:
        display.show(Image.DIAMOND_SMALL)   # plana: quiet
```

Una sola cadena `if`/`elif`/`else`: a cada volta, **només una** branca. L'ordre
importa: primer el sacseig, després la dreta/esquerra, després
endavant/enrere. Si inclines en diagonal, guanya la base (és la primera que es
pregunta). Per què un llindar de 300 i no 0? Perquè la placa mai està
perfectament plana i la mà tremola: sense marge, el braç no pararia mai quiet.

`was_gesture("shake")` és un gest que la micro:bit ja reconeix sola. Com el
`was_pressed()` de la S1, respon *«ha passat des de l'última vegada?»*.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Les fletxes van al revés | Tens la placa girada (el logotip cap a tu). Gira-la o intercanvia les fletxes. |
| Amb la placa plana surt una fletxa | El llindar és massa baix per a la teva taula o la teva mà. Mira el gràfic i puja'l. |
| El gràfic no surt | Falta el `print()`, o no has obert **Show data**. |
| La G no surt mai | Sacseja més fort, o el `sleep()` és massa llarg i el gest se t'escapa. |

## 🔗 On ho aplicaràs

- **Al taller d'avui:** connectes el **cable del pont** a l'Arduino del braç i el proves amb ordres escrites a mà al Monitor sèrie: [`04_brac_ordres`](04_brac_ordres/EXPLICACIO.md).
- **A la S3:** cada fletxa d'avui es convertirà en una **ordre de ràdio** (`B+`, `B-`, `D+`, `D-`) al [comandament](03_radio_comandament_EXPLICACIO.md).
- **A la SA6:** el sacseig (`G`) **gravarà un punt** de la seqüència del braç (mode replay).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA5](../../../Reptes/Reptes_SA5.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).
