# Pràctica 4 · Dau per ràdio: dues plaques que es parlen

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `04_radio_dau.py` · **Entorn:** [connexions i entorn](../SA5_connexions.md) (calen **2 micro:bit**, cap cable entre elles)

## 🎯 Per què fem aquesta pràctica

Fins ara cada placa vivia sola. Aquí en poses **dues a parlar-se sense cables**: sacseges una micro:bit, «llança el dau», i el resultat apareix a la placa de la teva parella. És la primera **comunicació sense fils** del curs, i la fa possible el mòdul `radio` amb una sola idea clau: el **`group`** és el canal — dues plaques només se senten si comparteixen el **mateix número de grup**.

De passada hi apareixen dues novetats més: els **gestos** de l'acceleròmetre (`was_gesture("shake")` — la placa detecta el sacseig per tu) i l'**atzar** (`random.randint`). I no és un joc qualsevol: aquest codi és la llavor del **comandament per ràdio del braç robòtic** del trimestre.

## 🔮 Abans d'executar: prediu

Sense executar el codi (a baix, plegat): si sacseges la placa A, què veurà la placa A i què veurà la B? Què passarà si una placa té `group=10` i l'altra `group=7`? I si a l'aula hi ha **tres** equips tots amb `group=10`? Apunta-ho a l'Activitat 3 de la [fitxa](../SA5_fitxa_alumnat.md) i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Importar el que cal

```python
from microbit import *
import random
import radio
```

A més de la placa, dos mòduls nous: `random` (nombres a l'atzar, el dau) i `radio` (la comunicació sense fils). En Python, cada capacitat extra es demana amb el seu `import` — a Arduino era l'`#include`.

### Bloc 2 — Engegar la ràdio (un sol cop, abans del bucle)

```python
radio.on()
radio.config(group=10)   # mateix numero a les dues plaques del teu equip
```

Dues línies que van **fora** del `while True:` perquè només calen **una vegada**, en engegar. `radio.on()` encén l'antena (si te'l deixes, `send` i `receive` no fan res, en silenci). `radio.config(group=10)` tria el **canal**: totes les micro:bit de l'aula comparteixen l'aire, i el `group` (0-255) és el que separa les converses. Regla d'or: **mateix `group` dins de l'equip, `group` diferent del dels altres equips** (per exemple, el número de la vostra taula) — si no, rebreu els daus dels veïns.

### Bloc 3 — Llançar el dau amb un gest

```python
while True:
    # Llançar el dau en sacsejar
    if accelerometer.was_gesture("shake"):
        n = random.randint(1, 6)
        display.show(str(n))
        radio.send(str(n))      # envia el resultat a l'altra placa
```

`was_gesture("shake")` pregunta: «*hi ha hagut* un sacseig des de l'última vegada que ho vaig mirar?» Compara-ho amb el comptapassos de la [Pràctica 2](02_passes_EXPLICACIO.md): allà el llindar i l'antirebot els programaves tu; aquí la placa ja porta el detector fet — un nivell més d'**abstracció**.

`random.randint(1, 6)` retorna un enter entre 1 i 6 (tots dos inclosos): el dau. I `radio.send(str(n))` l'envia per l'aire — fixa't en el `str()`: **la ràdio només envia text**, no números. Si envies `n` a pèl, error.

### Bloc 4 — Escoltar l'altra placa

```python
    # Rebre el resultat de l'altra placa
    missatge = radio.receive()
    if missatge is not None:
        display.scroll("R" + missatge)   # R = rebut

    sleep(50)
```

`radio.receive()` **no s'espera**: mira la bústia i torna de seguida. Si hi havia un missatge, te'l dona (com a text); si no, retorna **`None`** — el «res» de Python. Per això la comprovació és `is not None`: només mostrem alguna cosa si de debò ha arribat un missatge. Com que aquesta comprovació és **dins** del bucle, la placa escolta contínuament: cada placa és emissora **i** receptora alhora, amb el mateix programa.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| L'altra placa no rep mai res | `group` diferent a cada placa, o falta `radio.on()` (la ràdio apagada falla en silenci). |
| `TypeError` en enviar | Has fet `radio.send(n)` amb un número: la ràdio vol **text** — `radio.send(str(n))`. |
| Reps daus «fantasma» | Un altre equip de l'aula té el mateix `group`: canvieu-lo (número de taula). |
| El dau es llança quan camines amb la placa | `"shake"` és sensible: qualsevol sotragada forta compta. Per al comandament del braç triareu gestos més estables. |

## 🔗 On ho aplicaràs

- **Repte de la S3:** el «pedra-paper-tisora» per ràdio i el comandament a distància són aquest mateix esquema enviar/rebre amb altres missatges.
- **Exemple resolt:** la [sentinella de temperatura](../SA5_exemple_resolt.md) combina aquesta ràdio amb el patró de llindar de la S2 — mira-te-la després del teu primer intent.
- **Robot del trimestre:** aquest codi és la base del **comandament del braç** (una micro:bit envia ordres, l'altra les executa): guarda'l, el reaprofitaràs al [dossier del braç](../../00_General/00_Projecte_T2_Brac.md).
- **SA8:** la ràdio tornarà per enviar **telemetria** del rover i dades per al classificador de gestos.
