# SA3 · Diagrama de flux — Decisió per llindar (llegir → comparar → actuar)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

```
              ┌───────────────────────────┐
              │  INICI (setup)            │
              │  [ pinMode LED, OUTPUT ]  │
              │  [ Serial.begin(9600) ]   │
              └───────────────────────────┘
                            │
                            ↓
        ╔═══════════════════════════════════════╗
        ║  BUCLE (loop) — es repeteix sempre    ║
        ╚═══════════════════════════════════════╝
                            │
                            ↓
              ┌───────────────────────────┐
              │ [ llum = analogRead(LDR) ]│   ← llegeixo el sensor (0..1023)
              └───────────────────────────┘
                            │
                            ↓
              ┌───────────────────────────┐
              │ [ Serial.println(llum) ]  │   ← mostro el valor per calibrar
              └───────────────────────────┘
                            │
                            ↓
                 < llum < LLINDAR ? >
                    │              │
                 SÍ │              │ NO
      (fa fosc)     ↓              ↓   (hi ha llum)
        ┌────────────────────┐  ┌────────────────────┐
        │ [ LED = HIGH ]     │  │ [ LED = LOW ]      │
        │   encén la llum    │  │   apaga la llum    │
        └────────────────────┘  └────────────────────┘
                    │              │
                    └──────┬───────┘
                           ↓
                    [ delay(100) ]
                           │
                           └────────→ torna al BUCLE ↑
```

## Llegenda
- `[ ... ]` = una **acció**.
- `< ... ? >` = una **decisió** (`if`): SÍ / NO.
- `↓` `→` = per on continua.

## Del diagrama al codi
- `[ llum = analogRead(LDR) ]` → `int llum = llegeixLlum();` (la funció fa `analogRead`, dona 0..1023).
- `< llum < LLINDAR ? >` → `if (llum < LLINDAR) { ... } else { ... }` — **el cor de la SA**: la decisió per llindar.
- Branca **SÍ** → `digitalWrite(LED, HIGH);` (fosc: encén). Branca **NO** → `digitalWrite(LED, LOW);` (clar: apaga).
- El bucle és el `loop()`: llegeix → mostra → decideix → `delay(100)` → torna a començar.
