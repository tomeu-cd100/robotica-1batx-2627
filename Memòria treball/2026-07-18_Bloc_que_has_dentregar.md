# 18-07-2026 · Bloc «📦 Què has d'entregar» a cada SA

## Què s'ha fet

Cada `Classes/SAn/README.md` (SA1-SA9) té ara, just després de la introducció
i abans de l'itinerari, una **taula de lliurables d'una ullada**: una fila per
sessió (activitat de la fitxa amb enllaç a l'àncora real i a la tasca de
Classroom; les sessions de prova en negreta), més les files ⭐ (repte triat i
tauler de reptes), 📓 (full del quadern tècnic en paper) i 🤖 (peça del robot
del trimestre, amb enllaç al dossier — SA2-SA9; SA1 no en té).

## Vigilància automàtica

Check nou **#12 `comprova_lliurables()`** a `tools/qa.py`: bloc present als 9
README, files S = sessions reals de `quadern_sessions.py`, fila de prova a
SA3-S4 / SA6-S4 / SA9-S5 i enlloc més, files ⭐/📓 sempre i 🤖 només a partir
de SA2. Provat en positiu i en negatiu (treure una fila fa sortir el QA amb
error `[lliurables]`). El CI es posa vermell si algú canvia sessions sense
tocar la taula.

## Bugs preexistents trobats i corregits pel camí

- **Itinerari de SA9**: deia «Sessió 5 · Comunicar» amb una àncora inexistent
  (`#6-defensa-s5`); les fonts canòniques (guia docent, doc 08, fitxa) diuen
  S4 = defensa i S5 = prova T3. Corregit.
- El producte de SA5 (Activitat 4, es tanca dins la S3) no era visible com a
  lliurable; ara surt a la fila S3.
- El pòster de SA1 (producte de la SA) ara consta com a entregable explícit.

## Decisions

- Contingut = **només lliurables** (fora mini-checks, checklists i
  qüestionaris de repàs); excepció puntual: la prova diagnòstica de SA1-S1,
  que és un lliurament real i va marcada «no qualifica».
- Format = taula markdown pura (res de CSS ni generador): es veu igual a
  GitHub i a la web.
- Manteniment = a mà + QA (opció triada sobre generar-ho des de dades).

## Com s'ha treballat

Spec + pla + 5 tasques amb subagents (implementador + revisor per tasca) i
revisió final de branca amb el model més capaç: veredicte «Llest» amb 5
minors, 4 arreglats i 1 adjudicat. 8 commits, QA i tests del generador verds.
