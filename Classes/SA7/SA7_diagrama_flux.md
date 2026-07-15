# SA7 · Diagrama de flux — Robot mòbil reactiu (percepció → decisió → acció)

> **Per a qui és?** Alumnat. És el mateix que fa el programa, però **dibuixat**. Mira'l **abans de programar**; després l'exemple resolt i el codi.

## El flux

![Diagrama de flux de la SA7](img/sa7-flux.svg)
## Llegenda
- Caixa **fosca** = **inici**.
- Caixa **teal** `[ ... ]` = una **acció** (una instrucció o bloc de codi).
- **Rombe ambre** `< ... ? >` = una **decisió** (`if`): en surt una branca per cada cas.
- **Fletxa ambre** = **bucle**: torna enrere i es repeteix.

## Del diagrama al codi
- `[ d = distancia() ]` → `float d = distancia();` — **PERCEPCIÓ**: una lectura de l'ultrasons per cicle.
- `< d < A_PROP ? >` i `< d > A_LLUNY ? >` → `if (d < A_PROP) {...} else if (d > A_LLUNY) {...} else {...}` — **DECISIÓ**: dos llindars, tres situacions.
- Branques → `enrere()` (massa a prop), `endavant()` (via lliure), `atura()` (zona de confort) — **ACCIÓ**: crido la funció de moviment.
- El bucle és el `loop()`: **percep → decideix → actua** → `delay(50)` → torna a començar. Aquest cicle és el cor de la SA7.
