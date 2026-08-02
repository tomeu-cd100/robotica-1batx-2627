# 2026-08-02 · Solucions dels katas per al docent

## Necessitat

El docent projectava l'enunciat del kata i, a l'hora de la posada en comú,
no tenia la solució escrita per anar-la comentant: a SA2–SA3 la solució és el
sketch (rèplica), però a SA4–SA6 els valors del kata són expressament
diferents dels del sketch (*variació*), i a SA7–SA8 el kata es fa abans del
modelatge — en cap d'aquests casos el sketch sol no basta com a guió.

## Decisió de disseny

- **Fitxer separat per SA** (`Classes/SAn/SAn_katas_solucions.md`, SA2–SA8),
  no un bloc dins de `SAn_katas.md`: l'spec original dels katas ja descartava
  «tenir la solució a la mateixa pàgina» (espòiler en projectar), i el fitxer
  de katas ara és vista alumnat.
- El sufix **`_solucions` ja el classifica com a vista docent** al generador
  (`DOCENT_NAME_HINTS`): cap canvi a `generar.py`.
- Cada solució duu: el **codi resolt** (amb els valors del kata a les SA de
  variació, marcats amb comentari) + un paràgraf **«En comentar»** que respon
  els tres punts «en comparar, mireu» del kata — el guió de la posada en comú.

## Fitxers

- **Nous (7):** `SA2..SA8_katas_solucions.md` — 31 solucions (6+4+5+4+4+4+4).
- **Editats:** les 7 guies docents (frase amb l'enllaç a la línia «✍️ Katas»),
  els 7 README de SA (fila nova a la taula de documents), i
  `tools/qa.py:comprova_katas()` — check nou: el fitxer de solucions existeix,
  té la solució de cada sketch (matching per id literal) i la guia docent
  l'enllaça.

## Verificació

`tools/qa.py` i tests del generador executats després del canvi (vegeu el
commit); web regenerada.
