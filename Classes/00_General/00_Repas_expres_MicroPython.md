# Repàs exprés de MicroPython (abans de la prova T2)

> **Per a qui és?** Per a tot l'alumnat, entre la **SA5** i la **prova T2**. Des de la SA5 no hem tocat Python (la SA6 és C++), i la **Part B de la prova T2 és en MicroPython**: aquesta targeta et refresca en 10 minuts tot el que hi surt. Repassa-la a casa després de la S2 de la SA6 i tingues-la al costat quan practiquis.

**Durada:** 10-15' de repàs autònom · **Maquinari:** cap (o un micro:bit / [simulador](https://python.microbit.org/v/3))

> 📄 **[Versió PDF per imprimir i repartir](pdf/00_Repas_expres_MicroPython.pdf)** (les solucions de l'autotest hi surten obertes)

## 1 · El canvi de xip: de C++ a Python

| Què | C++ (Arduino, SA6) | MicroPython (micro:bit, SA5) |
|---|---|---|
| Inici del programa | `void setup()` + `void loop()` | tot seguit, i el bucle és `while True:` |
| Blocs de codi | claus `{ }` | **indentació** (4 espais) i `:` |
| Final d'instrucció | `;` | res |
| Variables | `int t = 25;` | `t = 25` (sense tipus) |
| Esperar | `delay(1000)` | `sleep(1000)` |
| Condició | `if (t > 28) { ... }` | `if t > 28:` |

> ⚠️ L'error núm. 1 en tornar a Python: posar `;`, claus o parèntesis al `if`. El núm. 2: **oblidar la indentació** (a Python és sintaxi, no estètica).

## 2 · Els 5 patrons que surten a la prova

```python
from microbit import *
import radio

# 1. Pantalla: mostrar text o icones
display.scroll("hola")
display.show(Image.YES)      # o Image.NO per a l'alerta

# 2. Botons
if button_a.is_pressed():
    display.show("A")

# 3. Sensors integrats: temperatura i llum
t = temperature()            # graus (aprox.)
llum = display.read_light_level()   # 0-255

# 4. Llindar + alerta (com el termostat, pero en Python!)
if t > 28:
    display.show(Image.NO)   # alerta
else:
    display.show(Image.YES)

# 5. Radio: enviar i rebre
radio.on()
radio.config(group=10)       # mateix grup a les dues plaques!
radio.send(str(t))           # sempre s'envia TEXT (str)
m = radio.receive()          # None si no hi ha res
if m:
    display.scroll(m)
```

## 3 · Autotest (2') — sense mirar amunt

1. Escriu el `while True:` que mostra la temperatura i, si passa de 28, treu `Image.NO`.
2. Per què cal `radio.config(group=10)` a **totes dues** plaques?
3. Què retorna `radio.receive()` quan no ha arribat res, i com ho comproves?

<details markdown="1"><summary>Solucions</summary>

1.
```python
from microbit import *
while True:
    t = temperature()
    if t > 28:
        display.show(Image.NO)
    else:
        display.scroll(str(t))
    sleep(1000)
```
2. Perquè només es "senten" les plaques del **mateix grup**; si no coincideix, l'emissor envia i el receptor no rep res.
3. Retorna `None`; es comprova amb `if m:` abans de fer servir el missatge.

</details>

## On practicar

- **Fitxa de la SA5:** [`../SA5/SA5_fitxa_alumnat.md`](../SA5/SA5_fitxa_alumnat.md) (activitats 1-4) i el codi de [`../SA5/codi/`](../SA5/codi/).
- **Simulador sense maquinari:** [python.microbit.org](https://python.microbit.org/v/3) — hi pots fer tot l'autotest.
- **Enunciat de la Part B de la prova:** [`../../Avaluació/Prova_practica_T2.md`](../../Avaluació/Prova_practica_T2.md).
