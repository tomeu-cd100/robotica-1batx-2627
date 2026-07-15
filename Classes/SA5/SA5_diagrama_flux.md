# SA5 · Diagrama de flux — Sentinella de sensor per ràdio (micro:bit + MicroPython)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

```
        ┌──────────────────────────────┐
        │ [ Engego la ràdio (una sola  │
        │   vegada, FORA del bucle):   │
        │   radio.on() + group ]       │
        └──────────────┬───────────────┘
                       ↓
        ╔══════════════════════════════╗
        ║        while True:           ║   ← es repeteix per sempre
        ╚══════════════┬═══════════════╝
                       ↓
        ┌──────────────────────────────┐
        │ [ Llegeixo el sensor         │
        │   integrat → graus ]         │
        └──────────────┬───────────────┘
                       ↓
              < graus >= LLINDAR ? >
               │SÍ              │NO
               ↓                ↓
   ┌────────────────────┐  ┌────────────────────┐
   │ [ Mostro alerta a  │  │ [ Mostro la mesura │
   │   la matriu +      │  │   a la matriu ]    │
   │   radio.send("!")] │  └─────────┬──────────┘
   └─────────┬──────────┘            │
             └───────────┬───────────┘
                         ↓
        ┌──────────────────────────────┐
        │ [ missatge = radio.receive() │
        │   (None si no arriba res) ]  │
        └──────────────┬───────────────┘
                       ↓
              < missatge == "!" ? >
               │SÍ              │NO
               ↓                │
   ┌────────────────────┐       │
   │ [ Mostro símbol    │       │
   │   d'alerta rebut ] │       │
   └─────────┬──────────┘       │
             └───────────┬──────┘
                         ↓
                 [ sleep — ritme ]
                         ↓
                 └──── torno amunt ────┐
                 (una altra volta del  │
                  while True:) ────────┘
```

## Llegenda
- `[ ... ]` = una **acció**.
- `< ... ? >` = una **decisió** (`if`): SÍ / NO.
- `↓` `→` = per on continua.

## Del diagrama al codi
- **Engegar la ràdio (fora del bucle)** → `radio.on()` i `radio.config(group=GROUP)`, **abans** del `while True:` (només cal una vegada).
- **while True:** → el bucle infinit; tot el que es repeteix va **indentat a dins** (4 espais = la sintaxi de Python).
- **Llegir sensor + decisió** → `graus = temperature()` i `if graus >= LLINDAR:` … `else:` (mostrar amb `display.show`).
- **Enviar / rebre** → `radio.send("!")` dins l'alerta; `missatge = radio.receive()` i `if missatge == "!":` per reaccionar a l'altra placa.
