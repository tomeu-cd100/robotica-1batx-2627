# SA7 · Diagrama de flux — Robot mòbil reactiu (percepció → decisió → acció)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

```
              ┌───────────────────────────┐
              │  INICI (setup)            │
              │  [ pinMode motors, OUTPUT]│
              │  [ pinMode TRIG/ECHO ]    │
              └───────────────────────────┘
                            │
                            ↓
        ╔═══════════════════════════════════════╗
        ║  BUCLE (loop) — es repeteix sempre    ║
        ╚═══════════════════════════════════════╝
                            │
                            ↓
              ┌───────────────────────────┐
              │ [ d = distancia() ]       │   ← PERCEPCIÓ: llegeixo l'ultrasons (cm)
              └───────────────────────────┘
                            │
                            ↓
                   < d < A_PROP ? >
                    │              │
                 SÍ │              │ NO
     (massa a prop) ↓              ↓
        ┌────────────────────┐     │
        │ [ enrere() ]       │     │
        │   recula           │     │
        └────────────────────┘     ↓
                    │        < d > A_LLUNY ? >
                    │          │            │
                    │       SÍ │            │ NO
                    │ (lliure) ↓            ↓ (zona de confort)
                    │  ┌──────────────┐  ┌──────────────┐
                    │  │ [ endavant()]│  │ [ atura() ]  │
                    │  │   avança     │  │   espera     │
                    │  └──────────────┘  └──────────────┘
                    │          │            │
                    └──────────┴─────┬──────┘
                                     ↓
                              [ delay(50) ]
                                     │
                                     └────────→ torna al BUCLE ↑
```

## Llegenda
- `[ ... ]` = una **acció**.
- `< ... ? >` = una **decisió** (`if`): SÍ / NO.
- `↓` `→` = per on continua.

## Del diagrama al codi
- `[ d = distancia() ]` → `float d = distancia();` — **PERCEPCIÓ**: una lectura de l'ultrasons per cicle.
- `< d < A_PROP ? >` i `< d > A_LLUNY ? >` → `if (d < A_PROP) {...} else if (d > A_LLUNY) {...} else {...}` — **DECISIÓ**: dos llindars, tres situacions.
- Branques → `enrere()` (massa a prop), `endavant()` (via lliure), `atura()` (zona de confort) — **ACCIÓ**: crido la funció de moviment.
- El bucle és el `loop()`: **percep → decideix → actua** → `delay(50)` → torna a començar. Aquest cicle és el cor de la SA7.
