# 2026-08-02 · El curs passa a treball individual (grup de 5)

## Per què

El docent té **5 alumnes**. Amb material per a tothom, el treball en parella
deixa de ser una necessitat logística i només amaga qui no programa mai
(l'*efecte passatger*). Decisió: **totes les tasques passen a ser
individuals**; si algun dia convé ajuntar dues persones, ho decideix el docent
per a aquella sessió.

## La decisió difícil: CA5.3

El criteri **CA5.3** («valorar l'impacte ètic… **i treballar
cooperativament**») és **oficial** (CE-R5 / CPSAA). No es podia esborrar sense
deixar un CA sense evidència. Solució: **no canvia què s'avalua, canvia on
s'evidencia**. La cooperació passa del producte compartit a:

- **revisió creuada de codi** abans de tancar cada producte (una millora
  concreta i un dubte al company);
- **ajuda documentada** al quadern («qui m'ha ajudat / a qui he ajudat»), que
  és el que alimenta la R5;
- **depuració a dues veus** quan algú s'encalla;
- la **mostra** de final de curs, preparada entre tots.

És cooperació observable i evita el problema clàssic del producte d'equip: que
la nota de grup tapi qui no hi ha treballat.

## Abast

110 fitxers. El marc es va fixar primer (`04_Metodologia.md` §4.3 i la rúbrica
R5 de `07_Rubriques.md`) i després es va propagar; tres agents en paral·lel per
a SA1-SA3, SA4-SA6 i SA7-SA9, i la resta (transversals, dossiers dels robots,
avaluació, programació didàctica, inventari) a mà.

| Què | Com queda |
|---|---|
| «Material per parella» | «per alumne/a» a totes les guies i checklists |
| Rols cooperatius A/B | **«Els quatre barrets»** que porta cadascú (pòster d'aula); els rols escriu/verifica queden per a l'agrupament puntual |
| Coavaluació | **Revisió creuada de codi**, a tot el curs |
| Defenses | Individuals, amb minutatges refets per a 5 alumnes (SA6-S3 ~15' repartits; SA9, 5 defenses) |
| SA9 | Projecte, dossier, taulell i defensa **individuals**; si dos s'ajunten, al dossier consta **qui ha fet què** i la defensa segueix sent individual |
| Prova diagnòstica | Ja no forma parelles heterogènies: reparteix el suport |
| Ràdio (SA5/SA8) | Calen **dues plaques per persona**; si la dotació no hi arriba, agrupament puntual per a la transmissió, amb el codi escrit igualment per cadascú |
| Compra del fil conductor | Quantitats **per alumne/a**, amb l'exemple d'un grup de 5: **60-90 €** en lloc de 130-180. Amb rover propi no cal comprar 3dBot |

## Efecte secundari positiu

Amb 5 alumnes, les cinc sessions que anaven sobrecarregades **passen a cabre**:
el que no quadrava no era el contingut sinó la **cua d'ajuda** i la logística
de 12 parelles. Les mini-defenses passen de 12' a 3-5', i les de SA6 de 24-36'
a ~15'. L'únic que **no** arregla la ràtio és el dèficit de 2 h del T3, que és
calendari.

## Verificació

`tools/qa.py` net (18 checks), 61 tests del generador verds, PDF imprimibles i
quadern tècnic regenerats, web regenerada. Commit `2330158`.

## Pendent

- Confirmar la **dotació de micro:bit** (calen 2 per alumne/a per a la ràdio de
  SA5/SA8 sense agrupament puntual): els documents deixen les dues vies obertes
  expressament.
- El material continua servint per a grups grans: el que s'ha fixat és el
  **treball individual**, no la mida del grup. Qui el forki amb 24 alumnes
  haurà de decidir si pot mantenir-lo.
