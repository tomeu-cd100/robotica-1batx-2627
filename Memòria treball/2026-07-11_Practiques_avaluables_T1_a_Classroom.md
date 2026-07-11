# 2026-07-11 · Pràctiques avaluables del 1r trimestre a Classroom

Creades les tasques avaluables (producte a lliurar) de les SA del **1r trimestre** (SA1-SA3) més la **prova pràctica T1**, cadascuna al seu tema, en **DRAFT** i amb **10 punts**.

## Tasques creades

| Tasca | Tema | Rúbriques | Enllaç |
|---|---|---|---|
| SA1 · Pràctica: fitxa-pòster «Analitzem un robot real» | SA1 | R4 | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTM3Njc1NjQ3/details |
| SA2 · Pràctica: dispositiu de senyalització programable | SA2 | R1+R2 | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTM4NTU2ODIy/details |
| SA3 · Pràctica: sistema sensor → actuador | SA3 | R1+R2 | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTM4NTczMTgy/details |
| Prova pràctica T1 · «Llum de seguretat intel·ligent» | **Proves i avaluació** (tema nou) | R1+R2+R4 | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTM4NTcxOTgz/details |

Cada tasca porta un enllaç al **document de rúbriques** com a material i, on escau, a la pàgina web de la SA. La prova T1 té l'enunciat per nivells + graella de correcció a la descripció; **sense la solució docent**.

## Decisions

- **Abast:** productes SA1-SA3 + prova pràctica T1 (les 4 avaluables de T1). SA0 no qualifica; el pòster de SA1 s'avalua amb R4 (R5 es valora al llarg del trimestre, no per tasca).
- **Estat:** totes **DRAFT** (curs 26/27 no començat); es publiquen quan toqui.
- **Punts:** 10 (nota numèrica 0-10, com marca la programació).

## Limitació important: rúbrica NATIVA bloquejada per llicència

- L'API de Classroom torna **`@UserIneligibleToModifyRubrics`** en crear rúbriques: cal Google Workspace for Education **Plus** o **Teaching & Learning** ([doc](https://developers.google.com/classroom/rubrics/limitations#license-requirements)). El compte del centre no en té.
- **Decisió del docent:** crear les tasques amb la rúbrica **enllaçada** (document 07_Rubriques) i **adjuntar la graella a mà** des de la UI de Classroom (si la interfície ho permet amb la llicència actual).
- El recurs `courses.courseWork.rubrics` **no s'exposa** com a mètode a googleapis 144; s'hauria de cridar per REST (`auth.request`) — però igualment el bloqueja la llicència.

## Eina (`Material Classroom/`, local, fora del repo)

- `crear_practiques_t1.js` — executor (`node crear_practiques_t1.js sa1|sa2|sa3|provat1|tot`), idempotent via `resultats_practiques_t1.json`. Conté les definicions de R1/R2/R4 (`buildRubric`) com a referència per si la llicència habilita la rúbrica nativa.
- Neteja en cas d'error: si el pas de rúbrica fallava, esborrava la tasca per no deixar orfes (útil durant la depuració de la llicència).

## Pendent

- Publicar les 4 tasques quan comenci cada SA / la prova.
- Adjuntar la graella de rúbrica manualment a cada tasca (o valorar la llicència de Workspace).
- Decidir si el tema **«Proves i avaluació»** és el lloc definitiu de la prova T1 (o moure-la a SA3).
