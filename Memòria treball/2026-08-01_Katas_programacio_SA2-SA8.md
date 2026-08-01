# 2026-08-01 · Katas de programació de 10 minuts (SA2–SA8)

## Problema detectat

A cap sessió del nucli l'alumnat escrivia codi de zero: amb PRIMM el sketch
sempre arriba fet (i les EXPLICACIO el desglossen). Els dos moments
d'escriptura individual existents no ho cobrien: el mini-check és un radar
1×SA (memòria, sense apunts) i els reptes són ampliació ⭐ per a qui va al dia.

## Solució (19 commits + poliment, `9c7c3be..0c183dc`)

**Kata de 10'** com a primer pas de la pràctica guiada: després del modelatge
i abans d'obrir el sketch del dia, cada alumne escriu **de zero, individualment
i amb apunts permesos** el bloc central; després obre el sketch i **compara**
(no es recull ni qualifica).

1. **7 fitxers nous** `Classes/SAn/SAn_katas.md` (SA2–SA8): 31 katas, un per
   sketch, amb enunciat projectable (valors reals del codi), «què practica»,
   pista i 3 punts de comparació ①②③. *(Primer vista docent; el mateix dia
   van passar a vista alumnat amb enllaç des de cada pràctica: l'enunciat no
   regala res — la «solució» és el sketch — i així el kata funciona encara
   que el docent falti. Disparadors: casella a la checklist docent per
   sessió, rutina a la fitxa d'alumnat i ganxo-enllaç a cada EXPLICACIO.)*
2. **Ganxo «✍️ Kata primer!»** a les 31 EXPLICACIO + **línia de rutina** a les
   7 guies docents + entrada als 7 README de SA + referències creuades a
   `00_LLEGEIX-ME_Classes.md` i `00_Mini_checks_individuals.md`.
3. **Metodologia** (§4.2 fila «Pràctica guiada» i nota a §4.2 bis): el kata com
   a pràctica d'escriptura contínua que sosté la retirada de bastida.
4. **Generador**: `_katas` **fora** de `DOCENT_NAME_HINTS` (vista alumnat) i
   clau `katas` a `DOC_ORDRE_CLAUS` (itinerari, rere la guia docent).
5. **QA check 16**: per SA2–SA8 exigeix el fitxer de katas, un kata per sketch
   (matching per id entre backticks) i el ganxo a cada EXPLICACIO — un sketch
   nou sense kata fa fallar el CI.

## Criteri de qualitat après (aplicat a les 7 SA)

La **pista no pot respondre cap punt de comparació**: orienta el QUÈ (peces,
ordre de pensar-les) però mai QUINA estructura és la correcta (elif vs if,
dins vs fora, variable pròpia o no) — descobrir-ho és la feina del moment de
comparar. Els punts ①②③ mai repeteixen dades de l'enunciat, i cap enunciat
afirma com està construït el codi donat sense verificar-ho línia a línia
(va caçar una afirmació falsa sobre `atura()` a SA7 i regles que faltaven a
SA8). Cada SA va passar revisió independent + re-revisió del fix.

## Verificació

- `tools/qa.py` net (check 16: 31 sketches, 0/0/0) i 55 tests del generador.
- Web regenerada en local (7 pàgines noves `san-katas.html`, vista alumnat);
  la publicada la regenera el CI al push.
