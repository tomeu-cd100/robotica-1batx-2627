# SA8 · Diagrama de flux — Telemetria IoT (micro:bit + MicroPython)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

```
         PLACA EMISSORA                    │              PLACA RECEPTORA
   (mesura i envia)                        │        (rep, registra i avisa)
                                           │
 ┌──────────────────────────────┐         │       ┌──────────────────────────────┐
 │ [ Engego la ràdio (FORA del  │         │       │ [ Engego la ràdio (FORA del  │
 │   bucle): radio.on() +       │         │       │   bucle): radio.on() +       │
 │   config(group=GROUP) ]      │         │       │   config(group=GROUP) ]      │
 └──────────────┬───────────────┘         │       └──────────────┬───────────────┘
                ↓                          │                      ↓
 ╔══════════════════════════════╗         │       ╔══════════════════════════════╗
 ║        while True:           ║         │       ║        while True:           ║
 ╚══════════════┬═══════════════╝         │       ╚══════════════┬═══════════════╝
                ↓                          │                      ↓
 ┌──────────────────────────────┐         │       ┌──────────────────────────────┐
 │ [ Mesuro el sensor →         │         │       │ [ missatge = radio.receive() │
 │   valor (ex. temperatura) ]  │         │       │   (None si no arriba res) ]  │
 └──────────────┬───────────────┘         │       └──────────────┬───────────────┘
                ↓                          │                      ↓
 ┌──────────────────────────────┐         │             < missatge existeix? >
 │ [ Construeixo la dada        │         │              │SÍ              │NO
 │   ETIQUETADA: "T:" + valor ] │         │              ↓                │
 └──────────────┬───────────────┘         │   ┌────────────────────┐      │
                ↓             ....ràdio....│...│ [ print(missatge)  │      │
 ┌──────────────────────────────┐   )))   │   │   → port sèrie ]   │      │
 │ [ radio.send(dada) ]  ─────────────────────▶└─────────┬──────────┘      │
 └──────────────┬───────────────┘         │              ↓                │
                ↓                          │   ┌────────────────────┐      │
 ┌──────────────────────────────┐         │   │ [ Separo etiqueta  │      │
 │ [ sleep(PERIODE) — espero ]  │         │   │   i valor pel ":" ]│      │
 └──────────────┬───────────────┘         │   └─────────┬──────────┘      │
                ↓                          │             ↓                 │
        └── torno amunt ──┐                │       < valor > LLINDAR ? >   │
        (una altra volta) │                │        │SÍ            │NO     │
                          ↑                │        ↓              │       │
                                           │  ┌───────────┐  ┌──────────┐  │
                                           │  │ [ AVÍS a  │  │ [ Tot    │  │
                                           │  │   pantalla]│ │   OK ]   │  │
                                           │  └─────┬─────┘  └────┬─────┘  │
                                           │        └──────┬──────┘        │
                                           │               ↓               │
                                           │        [ sleep — ritme ]      │
                                           │               ↓               ↓
                                           │        └──── torno amunt ─────┘
                                           │        (una altra volta)
```

## Llegenda
- `[ ... ]` = una **acció**.
- `< ... ? >` = una **decisió** (`if`): SÍ / NO.
- `↓` `→` = per on continua.

## Del diagrama al codi
- **Engegar la ràdio (fora del bucle)** → `radio.on()` i `radio.config(group=GROUP)` a **totes dues** plaques, **abans** del `while True:` i amb el **mateix** `GROUP`.
- **Emissora: mesuro → etiqueto → envio → espero** → `valor = temperature()`, `radio.send("T:" + str(valor))`, `sleep(PERIODE)`. La dada va **etiquetada** i com a **text** (`str(...)`).
- **Receptora: rebo → registro → interpreto** → `missatge = radio.receive()`; si no és `None`, `print(missatge)` i `etiqueta, valor = missatge.split(":")`.
- **Regla del llindar** → `if int(valor) > LLINDAR:` mostra l'**avís** (`display.show`), `else:` tot OK.
