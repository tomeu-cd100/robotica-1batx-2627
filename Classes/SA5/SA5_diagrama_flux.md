# SA5 · Diagrama de flux — Sentinella de sensor per ràdio (micro:bit + MicroPython)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

![Diagrama de flux de la SA5](img/sa5-flux.svg)
## Llegenda
- Caixa **fosca** = **inici**.
- Caixa **teal** `[ ... ]` = una **acció** (una instrucció o bloc de codi).
- **Rombe ambre** `< ... ? >` = una **decisió** (`if`): en surt una branca per cada cas.
- **Fletxa ambre** = **bucle**: torna enrere i es repeteix.

## Del diagrama al codi
- **Engegar la ràdio (fora del bucle)** → `radio.on()` i `radio.config(group=GROUP)`, **abans** del `while True:` (només cal una vegada).
- **while True:** → el bucle infinit; tot el que es repeteix va **indentat a dins** (4 espais = la sintaxi de Python).
- **Llegir sensor + decisió** → `graus = temperature()` i `if graus >= LLINDAR:` … `else:` (mostrar amb `display.show`).
- **Enviar / rebre** → `radio.send("!")` dins l'alerta; `missatge = radio.receive()` i `if missatge == "!":` per reaccionar a l'altra placa.
