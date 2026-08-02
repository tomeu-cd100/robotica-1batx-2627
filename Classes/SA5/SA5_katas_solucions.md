# SA5 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA5](SA5_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *variació*: la solució usa **els valors del kata** (expressament diferents dels del sketch) — en comentar, insisteix que compta l'estructura, no els números.

## Solució · `01_name_badge`

```python
while True:
    if button_a.is_pressed():
        display.scroll("Ei!")          # text del kata (el sketch fa "Hola!")
    elif button_b.is_pressed():
        display.show(Image.HAPPY)
    else:
        display.show(Image.HEART)
    sleep(150)
```

**En comentar (els tres punts del kata):** ① el botó B va amb `elif`: si A ja s'ha complert, B ni es mira — amb dos `if` independents es podrien executar tots dos a la mateixa volta; ② la branca «cap botó» és l'`else` final, que garanteix que sempre passa exactament una de les tres coses; ③ les tres branques pengen del mateix nivell d'indentació, dins del `while True:` — a MicroPython la indentació **és** l'estructura.

## Solució · `02_passes`

```python
while True:
    forca = accelerometer.get_strength()
    if forca > LLINDAR:                  # kata: LLINDAR = 1300
        passes = passes + 1
        display.show(str(passes % 10))
        sleep(250)                       # antirebot del kata
    # Reinici amb el boto B: if independent, no elif
    if button_b.is_pressed():
        passes = 0
        display.scroll("0")
    sleep(30)                            # ritme general del bucle
```

**En comentar:** ① el `sleep(250)` d'antirebot és **dins** de l'`if` del llindar: només frena quan s'ha comptat un pas — com a pausa general alentiria també la lectura del botó; ② la comparació és `forca > LLINDAR`, estricta: si la força cau just al llindar, no compta (decisió de disseny, però cal saber quina s'ha pres); ③ el `sleep(30)` final s'executa **sempre**, a totes les voltes: és el ritme del bucle, no una conseqüència dels `if`.

## Solució · `03_nightlight`

```python
while True:
    llum = display.read_light_level()
    if llum < LLINDAR:                   # kata: LLINDAR = 40 (per sota = fosc)
        display.show(Image.SQUARE)
    else:
        display.clear()
    sleep(120)
```

**En comentar:** ① la condició és `llum < LLINDAR`: fosc = valor **baix** — escrita al revés, el llum s'encendria de dia; ② la lectura és **dins** del bucle, a cada volta: treta fora, quedaria congelada al valor del primer instant; ③ la branca «hi ha llum» fa `display.clear()` explícitament — sense això, el quadrat es queda encès per sempre.

## Solució · `04_radio_dau`

```python
while True:
    # Llancar el dau en sacsejar
    if accelerometer.was_gesture("shake"):
        n = random.randint(1, 6)
        display.show(str(n))
        radio.send(str(n))       # sempre text: str() abans d'enviar

    # Escoltar sempre, cada volta (independent del sacseig)
    missatge = radio.receive()
    if missatge is not None:
        display.scroll("R" + missatge)

    sleep(70)                    # pausa del kata
```

**En comentar:** ① `radio.send(str(n))` envia **text**: la ràdio de la micro:bit no envia `int` — l'error de tipus és el clàssic de la sessió; ② la comprovació canònica és `if missatge is not None:` — `if missatge:` sembla igual però descartaria un text buit; ③ el bloc de recepció és **fora** de l'`if` del sacseig: s'escolta a cada volta, no només quan es llança el dau (si no, només rebries mentre sacseges).
