# Pràctica 4 · Ràdio: el comandament del braç

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** moure el teu **MeArm sense fils**: inclines la micro:bit-comandament i la segona micro:bit (el pont) passa l'ordre a l'Arduino del braç. És el producte de la SA5.

⏱️ Tota la sessió (amb el torn de taller del pont)

📦 Dues micro:bit, el MeArm amb el codi de la Pràctica 3, 2 cables (P1 → D0 i GND → GND)

</div>

## 🚀 Pas a pas

### Pas 1 · Kata primer

✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../SA5_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

✅ **Comprova:** has escrit el teu bloc **abans** de mirar el codi d'aquesta pràctica.

### Pas 2 · Dissenya abans de programar

Escriu el **pseudocodi** del comandament (3-5 línies): què llegeix, com decideix l'ordre i què envia. El [diagrama de flux](../SA5_diagrama_flux.md) t'hi ajuda.

✍️ **Apunta-ho:** el teu pseudocodi del comandament (3-5 línies).

### Pas 3 · Endevina abans de provar

✍️ **Apunta-ho:** PREDIU: si la teva placa té `GRUP = 10` i la del company `GRUP = 12`, què passa quan inclines la teva?

### Pas 4 · Carrega el comandament

Canvia `GRUP = 10` pel teu **número de llista**: així el teu braç no obeirà el comandament d'un company. Després carrega'l a la **primera** micro:bit.

A l'editor **[python.microbit.org](https://python.microbit.org)**, esborra el que hi hagi, prem **Copia** aquí, enganxa-ho i prova-ho al **simulador**. Després connecta la micro:bit per USB i prem **Envia a la micro:bit**.

<!-- codi-complet -->

### Pas 5 · Prova la ràdio amb el receptor

Al receptor i, després, al pont, canvia el `group=10` pel **mateix número de llista** que has posat al comandament.

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

✅ **Comprova:** quan inclines el comandament, la lletra apareix a les dues plaques alhora.

✍️ **Apunta-ho:** què han de compartir les dues plaques perquè es «sentin»? I què ha de ser diferent del dels companys?

✍️ **Apunta-ho:** instrucció que envia / instrucció que rep.

### Pas 6 · Torn de taller: el pont cap al braç

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

✅ **Comprova:** quan inclines el comandament, el braç es mou.

### Pas 7 · Compara C++ i Python

El comandament (Python) i l'Arduino que obeeix les ordres (C++, Pràctica 3) fan servir el **mateix protocol**: només canvia la sintaxi. Completa la taula:

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Declarar una variable | `int aBase = 90;` | |
| Comparar un text | `if (ordre == "B+")` | |
| Mostrar un valor | `Serial.println(x)` | |

✍️ **Apunta-ho:** per a cada fila de la taula, com és en Python (al formulari hi ha una pregunta per fila).

✍️ **Apunta-ho:** un error que has trobat i com l'has resolt.

### Pas 8 · Respon i envia

📤 [Obre la tasca «SA5 · Pràctica 4» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDM1MDM2Nzc3/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara. Després, fes l'**[🏁 Entrega final de la SA5](../README.md#entrega-final)**: la defensa i l'autoavaluació.

⭐ **Si acabes abans:** mou també el servo **esquerre** amb els botons A i B (`E+` / `E-`) i explica-ho a la pregunta opcional del formulari. Més reptes a **[Reptes de la SA5](../../../Reptes/Reptes_SA5.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Símptoma | Causa probable |
|---|---|
| El receptor no mostra res | Grups diferents a les dues plaques, o el receptor no té `radio.on()`. |
| El teu braç es mou sol | Algú altre fa servir el teu grup. Canvieu-vos-el. |
| El pont rep però el braç no es mou | Falta el **GND comú** entre el pont i l'Arduino, o el cable no és al P1 / D0. Prova les ordres pel Monitor sèrie per saber de quina banda és el problema. |
| L'Arduino no es deixa programar | El cable del pont és al D0: desconnecta'l per pujar. |
| Després d'`uart.init()` el pont «no diu res» per l'USB | Normal: la sèrie de la micro:bit ara va al P1. Flashejar-la de nou funciona igual. |

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Per què fem aquesta pràctica

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
        if not pinca_enviada:      # mantenint A+B, la P nomes surt un cop
            ordre = "P"
        pinca_enviada = True
    else:
        pinca_enviada = False
        if x > LLINDAR:
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
i el sentit. `ordre = ""` (text buit) vol dir *res a enviar*. La variable
`pinca_enviada` recorda si ja s'ha enviat la `P` d'aquesta premuda: mentre
mantens A i B, només surt la primera vegada, i la pinça no s'obre i es tanca
sense parar. Aquest acord de
quines paraules existeixen i què volen dir és el **protocol**: el mateix que
entén l'Arduino del braç ([dossier](../../00_General/00_Projecte_T2_Brac.md#el-protocol-dordres)).

### Bloc 3 — Enviar (i no saturar)

```python
    if ordre != "":
        radio.send(ordre)
        display.show(ordre[0])     # la primera lletra: B, D o P
    else:
        display.show(Image.DIAMOND_SMALL)

    sleep(150)        # ~6 ordres per segon
```

`radio.send()` envia el text a tot el grup. `ordre[0]` és el **primer
caràcter** del text (els textos també es numeren des del 0, com les
llistes). Cada ordre mou el servo 3°: amb unes 6 ordres per segon, el braç
gira uns 18° per segon, prou suau per controlar-lo.

### On ho aplicaràs

- **Repte de la S3:** afegir el servo **esquerre** amb els botons A i B (`E+` / `E-`).
- **A la SA6:** el pont també enviarà ordres d'**estat** (`A` i `R`, amb els seus botons) i el braç tindrà una **màquina d'estats** que les obeeix.
- **Taula comparativa:** tens el mateix protocol escrit en **dos llenguatges** (el comandament en Python, el receptor de l'Arduino en C++): és la millor fila per a la comparació C++ ↔ Python del pas 7.

</details>
