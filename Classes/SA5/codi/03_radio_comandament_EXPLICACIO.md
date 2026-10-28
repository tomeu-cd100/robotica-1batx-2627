# Pràctica 3 · Ràdio: el comandament del braç

**Quan es fa:** Sessió 3 (modelatge + taller) · **Fitxer:** `03_radio_comandament.py` · **Entorn:** [python.microbit.org](https://python.microbit.org) · [connexions](../SA5_connexions.md) (dues micro:bit; el pont, connectat a l'Arduino del braç)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../SA5_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

Avui el braç es mou **sense fils**. Una micro:bit a la mà (el
**comandament**) mira la inclinació i envia **ordres de text** per ràdio. Una
segona micro:bit les rep. Primer només les mostrarà (per comprovar que la
ràdio funciona); després farà de **pont**: les passarà per un cable a
l'Arduino del braç, que ja sap obeir-les des de la S2.

```
comandament ──ràdio──▶ pont ──cable P1→D0──▶ Arduino ──▶ servos del braç
 (Python)              (Python)              (C++)
```

És la mateixa arquitectura dels robots de debò: el comandament no mou cap
motor, només **parla un protocol**. Qui l'entengui (la pantalla, el pont,
l'Arduino) farà la seva part.

## 🔮 Abans d'executar: prediu

Si la teva placa té `GRUP = 10` i la del teu company `GRUP = 12`, què passarà
quan inclinis la teva? I si totes dues tenen el 10 i esteu a la mateixa taula?
Què creus que passaria si el comandament enviés ordres 1000 vegades per segon?

## 🧠 El codi, per blocs

### Bloc 1 — Encendre la ràdio i triar el canal

```python
import radio

GRUP = 10        # CANVIA'L pel teu numero de llista (les 2 plaques igual)

radio.on()
radio.config(group=GRUP)
```

La ràdio de la micro:bit és com un walkie-talkie: tothom qui estigui al
**mateix grup** (0-255) sent tothom. Si tota la classe fa servir el 10, el teu
braç obeirà el comandament del company! Per això el grup és el teu **número
de llista**: comandament i pont amb el mateix número, i diferent de la resta.

### Bloc 2 — De la inclinació a l'ordre

```python
    ordre = ""
    if button_a.is_pressed() and button_b.is_pressed():
        ordre = "P"
    elif x > LLINDAR:
        ordre = "B+"
    elif x < -LLINDAR:
        ordre = "B-"
    elif y < -LLINDAR:
        ordre = "D-"
    elif y > LLINDAR:
        ordre = "D+"
```

És la cadena de fletxes de la [pràctica 2](02_inclinacio_EXPLICACIO.md),
però en lloc de dibuixar una fletxa guarda una **ordre**: un text curt amb
l'articulació (la lletra del [selector de la S1](01_selector_articulacio_EXPLICACIO.md))
i el sentit. `ordre = ""` (text buit) vol dir *res a enviar*. Aquest acord de
quines paraules existeixen i què volen dir és el **protocol**: el mateix que
entén l'Arduino del braç ([dossier](../../00_General/00_Projecte_T2_Brac.md#el-protocol-dordres)).

### Bloc 3 — Enviar (i no saturar)

```python
    if ordre != "":
        radio.send(ordre)
        display.show(ordre[0])     # la primera lletra: B, D o P
    else:
        display.show(Image.DIAMOND_SMALL)

    if ordre == "P":
        sleep(500)    # una sola "P" per premuda: si no, la pinca tremolaria
    sleep(150)        # ~6 ordres per segon
```

`radio.send()` envia el text a tot el grup. `ordre[0]` és el **primer
caràcter** del text (els textos també es numeren des del 0, com les
llistes). Cada ordre mou el servo 3°: amb unes 6 ordres per segon, el braç
gira uns 18° per segon, prou suau per controlar-lo. La pausa extra després de
`P` evita que, amb A i B premuts, la pinça s'obri i es tanqui sense parar.

### La segona placa, pas 1: el receptor (per provar la ràdio)

Abans de tocar el braç, comprova que les ordres arriben. Flasheja això a la
**segona** micro:bit:

```python
# SA5 - receptor de prova: mostra les ordres que arriben per radio
from microbit import *
import radio

radio.on()
radio.config(group=10)    # el MATEIX grup que el comandament

while True:
    ordre = radio.receive()
    if ordre:                       # None (res) compta com a fals
        display.show(ordre[0])
    sleep(10)
```

`radio.receive()` retorna el text rebut, o `None` si no ha arribat res.
Inclina el comandament: la lletra ha d'aparèixer a les dues plaques alhora.

### La segona placa, pas 2: el pont cap al braç (taller)

Quan el receptor funcioni, converteix-lo en **pont**. Ara la placa no mostra
l'ordre: la reenvia per un cable a l'Arduino, que té carregat el
[`04_brac_ordres`](04_brac_ordres/EXPLICACIO.md).

```python
# SA5 - pont: reenvia per cable (P1 -> D0 de l'Arduino) les ordres de radio
from microbit import *
import radio

radio.on()
radio.config(group=10)    # el MATEIX grup que el comandament
uart.init(baudrate=9600, tx=pin1, rx=pin2)

display.show(Image.ARROW_W)   # fletxa cap al brac: "estic passant ordres"

while True:
    ordre = radio.receive()
    if ordre:
        uart.write(ordre + "\n")    # el salt de linia marca el final
    sleep(10)
```

`uart.init()` converteix el pin P1 en una **sortida sèrie** a 9600 bauds,
exactament la velocitat del `Serial.begin(9600)` de l'Arduino. El `"\n"` final
és el «canvi i tanco» de cada ordre: l'Arduino llegeix fins al salt de línia.
Connexions: **P1 → D0** i **GND → GND** ([esquema](../SA5_connexions.md#el-pont-cap-al-brac-sa5-s3)).

> ⚠️ **El cable va només de la micro:bit cap a l'Arduino.** Mai connectis un
> pin de l'Arduino (5 V) a la micro:bit (3,3 V). I desconnecta el **D0** per
> pujar programes a l'Arduino.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El receptor no mostra res | Grups diferents a les dues plaques, o el receptor no té `radio.on()`. |
| El teu braç es mou sol | Algú altre fa servir el teu grup. Canvieu-vos-el. |
| El pont rep però el braç no es mou | Falta el **GND comú** entre el pont i l'Arduino, o el cable no és al P1 / D0. Prova les ordres pel Monitor sèrie per saber de quina banda és el problema. |
| L'Arduino no es deixa programar | El cable del pont és al D0: desconnecta'l per pujar. |
| Després d'`uart.init()` el pont «no diu res» per l'USB | Normal: la sèrie de la micro:bit ara va al P1. Flashejar-la de nou funciona igual. |

## 🔗 On ho aplicaràs

- **Repte de la S3:** afegir el servo **esquerre** amb els botons A i B (`E+` / `E-`).
- **A la SA6:** el pont també enviarà ordres d'**estat** (`A` i `R`, amb els seus botons) i el braç tindrà una **màquina d'estats** que les obeeix.
- **Taula comparativa:** tens el mateix protocol escrit en **dos llenguatges** (el comandament en Python, el receptor de l'Arduino en C++): és la millor fila per a la comparació C++ ↔ Python de l'Activitat 4.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA5](../../../Reptes/Reptes_SA5.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).
