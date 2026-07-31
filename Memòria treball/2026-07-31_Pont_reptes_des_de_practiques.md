# 2026-07-31 · Pont natural cap als reptes des de les pràctiques

## Problema detectat

Revisant el flux de l'alumne (fins a la SA5): qui acaba una pràctica no té cap
camí natural cap als reptes ⭐. Els enllaços a `Reptes/Reptes_SAn.md` existien
al README (itinerari), guia docent, checklist docent i fitxa ampliada — però no
al recorregut real de l'alumne (fitxa → pàgina de pràctica → final). De les 35
pàgines de pràctica, només 1 (SA6, control proporcional) enllaçava els reptes.

## Canvis (commit `8065ee3`)

1. **Bloc «⭐ Has acabat abans?»** al final de les **35 pàgines de pràctica**
   (SA1–SA8): enllaç al document de reptes de la SA i al tauler de reptes.
   Aplicat per script amb camins relatius segons profunditat (sketch en carpeta
   o fitxer solt micro:bit), LF i UTF-8 preservats.
2. **Fitxes d'alumnat (8)**: la línia final «📌 Vols més?» ara enllaça
   directament `Reptes/Reptes_SAn.md` (abans només la fitxa ampliada).
3. **QA (check 13 ampliat)**: cap EXPLICACIO sense enllaç a `Reptes_SAn.md` si
   la SA té document de reptes (SA9 no en té i queda exempta automàticament).

## Verificació

- `tools/qa.py` net (300 pàgines web, 0 enllaços trencats, «0 sense pont als
  reptes»).
- Web regenerada; comprovat que el generador reescriu el bloc correctament
  (`Reptes_SA5.md` → `reptes/reptes-sa5.html`).
