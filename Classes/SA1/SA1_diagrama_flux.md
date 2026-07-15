# SA1 · Diagrama de flux — el batec d'un robot (`setup` un cop, `loop` per sempre)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar** per tenir el pla al cap; després l'exemple resolt i el codi.

## El flux

```
           ┌─────────────────────────┐
           │  Encendre / reiniciar   │
           │        la placa         │
           └───────────┬─────────────┘
                       │
                       ↓
        ══════════ setup() ══════════   (s'executa UN SOL COP)
                       │
                       ↓
          [ Configurar el pin 13
            com a SORTIDA (OUTPUT) ]
                       │
                       ↓
        ═══════════ loop() ═══════════   (es repeteix per sempre)
                       │
                       ↓
   ┌──────────────────────────────────────┐
   │  [ Encendre el LED (HIGH) ]          │
   │                │                     │
   │                ↓                     │
   │  [ Esperar 100 ms  → batec curt ]    │
   │                │                     │
   │                ↓                     │
   │  [ Apagar el LED (LOW) ]             │
   │                │                     │
   │                ↓                     │
   │  [ Esperar 2000 ms → pausa llarga ]  │
   │                │                     │
   │                ↓                     │
   │        < S'ha aturat la placa ? >    │
   │            NO │        │ SÍ          │
   └───────────────┘        └────────────┘
                   │                │
       (torna a dalt del loop)      ↓
                   ↑            ┌────────┐
                   └────────────│  Fi    │
                                └────────┘
```

## Llegenda
- `[ ... ]` = una **acció** (una instrucció o bloc de codi).
- `< ... ? >` = una **decisió** (`if`): se surt per **SÍ** o per **NO**.
- `↓` `→` = per on continua el flux.

## Del diagrama al codi
- **Configurar el pin com a SORTIDA** → `pinMode(LED, OUTPUT);` dins de `setup()` (només un cop).
- **Encendre / Apagar el LED** → `digitalWrite(LED, HIGH);` i `digitalWrite(LED, LOW);`.
- **Esperar 100 ms / 2000 ms** → `delay(100);` i `delay(2000);` (el batec surt de fer els dos temps **diferents**).
- **El retorn NO** és el `loop()`: en acabar, torna a dalt i el batec no s'atura mai (el robot dona «senyal de vida»).
