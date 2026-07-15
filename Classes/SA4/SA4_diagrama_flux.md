# SA4 · Diagrama de flux — seqüència de moviment amb funcions (una funció per gest)

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
          [ Configurar ENA, IN1, IN2
              com a SORTIDA (OUTPUT) ]
                       │
                       ↓
        ═══════════ loop() ═══════════   (es repeteix per sempre)
                       │
                       ↓
   ┌──────────────────────────────────────────────┐
   │  [ endavant() ]                              │
   │     └─ IN1=HIGH, IN2=LOW  (sentit)           │
   │        analogWrite(ENA, velocitat) (PWM)     │
   │                │                             │
   │                ↓                             │
   │  [ Esperar un temps → avança ]               │
   │                │                             │
   │                ↓                             │
   │  [ atura() ]                                 │
   │     └─ IN1=LOW, IN2=LOW, ENA=0  (frena)      │
   │                │                             │
   │                ↓                             │
   │  [ enrere() ]                                │
   │     └─ IN1=LOW, IN2=HIGH  (sentit contrari)  │
   │        analogWrite(ENA, velocitat) (PWM)     │
   │                │                             │
   │                ↓                             │
   │  [ Esperar un temps → recula ]               │
   │                │                             │
   │                ↓                             │
   │  [ atura() ]                                 │
   │     └─ IN1=LOW, IN2=LOW, ENA=0  (frena)      │
   │                │                             │
   │                ↓                             │
   │        < S'ha aturat la placa ? >            │
   │            NO │            │ SÍ              │
   └───────────────┘            └────────────────┘
                   │                    │
       (torna a dalt del loop)          ↓
                   ↑                ┌────────┐
                   └────────────────│  Fi    │
                                    └────────┘
```

> **El truc del pont H:** `endavant()` i `enrere()` només es diferencien en **quin pin va a HIGH**. Intercanviar `IN1`/`IN2` inverteix el **sentit**; `analogWrite(ENA, …)` regula la **velocitat**. Tota la màgia del pont H és aquesta.

## Llegenda
- `[ ... ]` = una **acció** (aquí, cridar una funció-gest: `endavant()`, `atura()`, `enrere()`).
- `< ... ? >` = una **decisió** (`if`): se surt per **SÍ** o per **NO**.
- `↓` `→` = per on continua el flux.

## Del diagrama al codi
- **Configurar ENA, IN1, IN2 com a SORTIDA** → `pinMode(ENA, OUTPUT);` `pinMode(IN1, OUTPUT);` `pinMode(IN2, OUTPUT);` dins de `setup()` (només un cop).
- **endavant() / enrere()** → `digitalWrite(IN1, …);` `digitalWrite(IN2, …);` per al **sentit** + `analogWrite(ENA, velocitat);` per a la **velocitat** (PWM, 0–255).
- **atura()** → `IN1=LOW`, `IN2=LOW` i `analogWrite(ENA, 0);` (frena el motor del tot).
- **El retorn NO** és el `loop()`: en acabar, encadena els gestos una altra vegada. Cada **caixa és una funció**, i el `loop()` es llegeix com una frase (**abstracció**: una funció per gest).
