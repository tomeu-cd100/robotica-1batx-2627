# SA2 · Diagrama de flux — Llum que respira amb PWM (bucle *fade*)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

```
        ┌──────────────────────────┐
        │ setup: pinMode(LED, OUT) │
        └──────────────────────────┘
                     ↓
        ┌──────────────────────────┐
   ┌──▶ │ v = 0  (comença a fosc)  │   ── PUJA la intensitat ──
   │    └──────────────────────────┘
   │                 ↓
   │       ┌───────────────────┐   NO
   │       <   v <= 255 ?      > ───────┐
   │       └───────────────────┘        │
   │                 │ SÍ               │
   │                 ↓                  │
   │    ┌──────────────────────────┐    │
   │    │ analogWrite(LED, v)      │    │
   │    │ delay(ESPERA)            │    │
   │    │ v = v + PAS              │    │
   │    └──────────────────────────┘    │
   │                 │                  │
   └─────────────────┘                  │
                                        ↓
        ┌──────────────────────────┐
   ┌──▶ │ v = 255  (comença brillant)   ── BAIXA la intensitat ──
   │    └──────────────────────────┘
   │                 ↓
   │       ┌───────────────────┐   NO
   │       <   v >= 0 ?        > ───────┐
   │       └───────────────────┘        │
   │                 │ SÍ               │
   │                 ↓                  │
   │    ┌──────────────────────────┐    │
   │    │ analogWrite(LED, v)      │    │
   │    │ delay(ESPERA)            │    │
   │    │ v = v - PAS              │    │
   │    └──────────────────────────┘    │
   │                 │                  │
   └─────────────────┘                  │
                                        ↓
        ┌──────────────────────────┐
        │  torna a començar (loop) │ ──▶ (amunt, a "v = 0")
        └──────────────────────────┘
```

## Llegenda
- `[ ... ]` = una **acció**.
- `< ... ? >` = una **decisió** (`if`): SÍ / NO.
- `↓` `→` = per on continua.

## Del diagrama al codi
- Cada caixa **PUJA / BAIXA** és un bucle `for`: `for (int v = 0; v <= 255; v += PAS)` i `for (int v = 255; v >= 0; v -= PAS)`.
- La decisió `< v <= 255 ? >` és la **condició** del `for`: mentre és SÍ, repeteix; quan és NO, surt.
- L'acció `[ analogWrite(LED, v); delay(ESPERA); ]` gradua la **intensitat** (0–255) i espera entre passos perquè es vegi suau.
- Un **semàfor** és el mateix esquelet però amb accions `[ digitalWrite(PIN, HIGH); delay(...) ]` en seqüència (vermell → verd → groc), sense el bucle `for`.
