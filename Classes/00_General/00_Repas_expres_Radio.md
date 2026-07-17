# Repàs exprés de la ràdio micro:bit (abans de la SA8)

> **Per a qui és?** Per a tot l'alumnat, entre la **SA7 i la SA8**. La ràdio la vas tocar un moment a la SA5 (S3) i des de llavors han passat setmanes de C++ i robots: la **S1 de la SA8 (telemetria)** comença donant-la per sabuda. Aquesta targeta te la retorna en 10 minuts. Repassa-la a casa abans de la primera sessió de la SA8.

**Durada:** 10' de repàs autònom · **Maquinari:** cap (la ràdio **no** funciona al simulador: repassa el codi i valida'l a classe amb 2 plaques)

## 1 · Les 5 línies que fan tota la ràdio

```python
from microbit import *
import radio                      # 1. importar el modul (a part de microbit)

radio.on()                        # 2. encendre la radio (si no, res no surt ni entra)
radio.config(group=10)            # 3. MATEIX grup a les dues plaques (0-255)

radio.send("hola")                # 4. enviar: sempre TEXT (str)
m = radio.receive()               # 5. rebre: retorna None si no hi ha res
```

> ⚠️ Els dos errors que es repeteixen cada any: (1) **grups diferents** a l'emissor i el receptor — no rebràs mai res i no hi ha cap missatge d'error; (2) enviar un **nombre sense convertir** — `radio.send(t)` peta: cal `radio.send(str(t))`.

## 2 · El patró complet de telemetria (el de la S1 de SA8)

```python
# EMISSOR: mesura i envia amb etiqueta
while True:
    t = temperature()
    radio.send("T:" + str(t))     # etiqueta "T:" per saber que es
    sleep(2000)

# RECEPTOR: rep, comprova i separa
while True:
    m = radio.receive()
    if m:                          # None = no ha arribat res
        etiqueta, valor = m.split(":")
        display.scroll(valor)
```

L'**etiqueta** (`"T:23"`, `"L:120"`) és el que permet enviar **més d'una magnitud** sense que es barregin: el receptor mira què hi ha abans dels dos punts.

## 3 · Autotest (2') — sense mirar amunt

1. Escriu les **tres línies** que preparen la ràdio abans d'enviar res.
2. La companya envia `radio.send(25)` i el programa peta. Per què, i com s'arregla?
3. El receptor no mostra mai res i cap dels dos programes dona error. Quina és la primera cosa que comproves?

<details><summary>Solucions</summary>

1.
```python
import radio
radio.on()
radio.config(group=10)
```
2. Perquè la ràdio només envia **text**: `25` és un nombre. S'arregla amb `radio.send(str(25))`.
3. El **grup**: `radio.config(group=...)` ha de ser idèntic a les dues plaques. És l'error silenciós per excel·lència — no hi ha error, simplement no arriba res.

</details>

## On practicar

- **Codi de la SA5:** [`../SA5/codi/`](../SA5/codi/) (el joc de ràdio de la S3) i la [fitxa de la SA5](../SA5/SA5_fitxa_alumnat.md).
- **El que ve ara:** [`../SA8/codi/01_telemetria_emissor.py`](../SA8/codi/01_telemetria_emissor.py) i [`02_telemetria_receptor.py`](../SA8/codi/02_telemetria_receptor.py) — mira'ls abans de la S1 i **prediu** què farà cadascun.
- **Sintaxi general de Python rovellada?** Torna a la targeta [Repàs exprés de MicroPython](00_Repas_expres_MicroPython.md).
