# 2026-07-13 · Implementació — Quadern tècnic imprimible i proves al Classroom

Execució del pla [`2026-07-13_Pla_quadern_tecnic_i_proves_Classroom.md`](2026-07-13_Pla_quadern_tecnic_i_proves_Classroom.md)
(disseny: [`2026-07-13_Disseny_quadern_tecnic_imprimible_i_proves_Classroom.md`](2026-07-13_Disseny_quadern_tecnic_imprimible_i_proves_Classroom.md)).

## Què s'ha fet

### Quadern tècnic en paper (canvi de model: de Google Doc a quadern imprès)

- **Nou** `web/_generador/quadern_sessions.py` — dades de les **34 sessions** del curs
  (títol canònic de la guia docent + objectius «Avui» + vocabulari clau, en llenguatge
  d'alumne) i de les 3 proves trimestrals.
- **Nou** `web/_generador/generar_quadern_tecnic.py` — genera
  `Classes/00_General/pdf/Quadern_tecnic_T{1,2,3}.pdf` (24/24/26 pàgines): portada,
  pàgina «Com s'usa i com s'avalua» amb índex del trimestre, un full per sessió
  (davant: objectius+vocabulari impresos i quadrícula de punts de 5 mm; darrere:
  quadrícula + «Error del dia» DEPURA + autoavaluació semàfor) i full de prova
  (pla de millora personal; al T3, reflexió final de curs).
- **QA (punt 5 nou)** a `tools/qa.py`: sessions per trimestre ↔ quadre d'hores del
  doc 08, títols ↔ capçaleres `## SESSIÓ n` de les guies, prova = última sessió,
  avís si falten els PDF.
- **Detall tècnic:** la quadrícula de punts es fa amb **files de caràcters «·»**
  (lletra Consolas espaiada a 5 mm). Chrome rasteritza els fons CSS (radial-gradient)
  i també l'SVG en imprimir → PDFs de 3-8 MB; amb text vectorial queden a ~0,85 MB.
- **Guia actualitzada al model paper**: `00_Quadern_tecnic.md` (regles 1 i 3, taula
  amb els 3 PDF, instrucció d'impressió a doble cara) i
  `00_Quadern_tecnic_tasca_classroom.md` (evidències = **fotos de les pàgines** a la
  tasca de cada SA; l'autoria es garanteix per l'escriptura a l'aula, no per
  l'historial del Doc). Enllaços des de `00_Avaluacio_per_alumnat.md`,
  `GUIA_INICI_DOCENT.md` (checklist: «imprimir els quaderns») i
  `00_LLEGEIX-ME_Classes.md`.

### Classroom: secció «Proves i avaluació» completa

Diagnòstic previ: les **3 proves ja estaven dissenyades** (una per trimestre,
`Avaluació/Prova_practica_T1/T2/T3.md`); al Classroom només hi havia la T1.

- **Nous scripts** (locals, `Material Classroom/` és fora del repo):
  `crear_practiques_t2.js` i `crear_practiques_t3.js` — mateix patró que el T1.
- **8 tasques DRAFT creades** al Classroom: SA4 (barrera automàtica, R1+R2+R3),
  SA5 (app micro:bit + comparació C++↔Python, R1+R4), SA6 (sistema de control,
  R1+R3+R4), **Prova T2**, SA7 (comportament autònom, R1+R3+R4), SA8 (sistema
  connectat/classificador + reflexió ètica, R1+R3+R4), SA9 (projecte final, R1-R5)
  i **Prova T3** — les proves al tema «Proves i avaluació», amb l'enunciat del web
  com a material.

## Pendent (cal acció del docent)

- **Material «📓 Quadern tècnic» al Classroom**: el script `crear_material_quadern.js`
  està a punt, però el token OAuth no té l'àmbit `classroom.courseworkmaterials`
  (les *tasques* usen `coursework.students`, per això s'han pogut crear). L'àmbit ja
  és afegit a `_form_sa_lib.js`; cal **esborrar `token.json` i tornar a executar**
  qualsevol script per reautoritzar al navegador, i llavors
  `node crear_material_quadern.js`. (Alternativa: crear el material a mà seguint
  `00_Quadern_tecnic_tasca_classroom.md`.)
- **Imprimir** els quaderns del T1 (un per alumne, **a doble cara**) abans de
  començar el curs — afegit a la checklist de la `GUIA_INICI_DOCENT.md`.

## Verificació

`tools/qa.py` net (34 sessions, 0 incoherències; enllaços 0 trencats) · PDFs amb
recompte de pàgines exacte (24/24/26) i inspecció visual de 6 pàgines tipus ·
web regenerat (208 pàgines) i 40 PDF d'activitat refets · sintaxi dels scripts
Node comprovada · 8 tasques DRAFT visibles al Classroom (enllaços al JSON de
resultats de cada script).
