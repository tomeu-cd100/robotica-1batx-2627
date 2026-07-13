# 2026-07-13 · Disseny — Quadern tècnic imprimible (PDF per trimestre) i proves al Classroom

## Objectiu

Donar **suport físic** al quadern tècnic: un PDF imprimible per trimestre, amb una pàgina
per hora lectiva, perquè l'alumnat hi prengui apunts i s'hi autoavaluï a cada sessió i el
pugui **consultar en paper durant les proves pràctiques** (el quadern és material permès i
pesa el 25 % de la nota, R4). A més, completar la secció «Proves i avaluació» del
Classroom (només hi havia la prova T1).

## Canvi de decisió respecte del 2026-07-09

El doc [`2026-07-09_Quadern_tecnic_material.md`](2026-07-09_Quadern_tecnic_material.md)
va materialitzar el quadern com a **Google Doc híbrid** (Doc per alumne + esquemes a mà
fotografiats). Decisió del docent (2026-07-13): el suport principal passa a ser el
**quadern imprès en paper** — és l'únic format consultable a les proves i força l'hàbit
d'escriure a cada sessió. Es conserva del model anterior:

- La **recollida d'evidències** via Classroom: l'alumne fotografia les pàgines del quadern
  i les puja a la tasca de cada SA (substitueix l'historial de revisions del Doc).
- El document `Classes/00_General/00_Quadern_tecnic.md` com a **punt únic d'explicació**
  (s'actualitza, no se'n crea un de nou; els enllaços des de les 8 fitxes i el hub
  d'alumnat es mantenen vàlids).

## Decisions de disseny (acordades amb el docent)

1. **Pàgina personalitzada per sessió** (no plantilla genèrica): cada pàgina porta impresos
   SA, número i títol de sessió, objectius «Avui» i vocabulari clau.
2. **Quadrícula de punts** (5 mm) com a fons de la zona d'apunts.
3. **Un PDF per trimestre**, imprès a **doble cara: 1 full físic per sessió de 2 h**
   (davant = 1a hora, darrere = 2a hora) — compleix «una fulla per hora».
4. **Classroom**: crear ara, en DRAFT, tot el que falta a «Proves i avaluació» i a les
   pràctiques avaluables (proves T2 i T3 + pràctiques SA4–SA9).

## Estructura de cada quadern

| Quadern | SA | Sessions | Pàgines de sessió |
|---|---|---|---|
| T1 | SA1 (3) + SA2 (4) + SA3 (4) | 11 | 22 |
| T2 | SA4 (4) + SA5 (3) + SA6 (4) | 11 | 22 |
| T3 | SA7 (4) + SA8 (3) + SA9 (5) | 12 | 24 |

Contingut, en ordre:

1. **Portada** — nom, grup, trimestre; recordatori: «material permès a la prova, 25 % de la nota».
2. **«Com s'usa i com s'avalua»** — resum de `00_Avaluacio_per_alumnat.md` (escriure cada
   sessió, errors documentats sumen R1+R4, criteris R4 en versió alumne).
3. **Fulls de sessió** (un per sessió de 2 h):
   - *Davant:* capçalera (trimestre · sessió n/total · SAx·Sy «títol» · data en blanc),
     caixa «🎯 Avui» (2-3 objectius en llenguatge d'alumne), «📚 Vocabulari» clau,
     quadrícula de punts.
   - *Darrere:* quadrícula de punts quasi completa + ritual de tancament: «🐞 Error del
     dia (DEPURA)» (què passava / com l'he resolt), autoavaluació semàfor («He entès» /
     «Sé fer-ho sol»), «Em queda pendent».
4. **Full de prova** (última sessió del trimestre: S4 de SA3/SA6, defensa SA9):
   *davant* = full de treball de la prova; *darrere* = **pla de millora personal**
   (3 línies: què m'ha fallat / què practicaré / com ho comprovaré) + semàfor de balanç
   del trimestre.

Estil visual idèntic als fulls imprimibles existents (mateix llenguatge CSS A4: caselles,
semàfors per pintar, línies per escriure).

## Generació (regenerable, data-driven)

- **Nou** `web/_generador/generar_quadern_tecnic.py`: HTML d'impressió → Chrome/Edge
  headless → PDF (reutilitza el motor de `generar_fulls_imprimibles.py`).
- **Nou** `web/_generador/quadern_sessions.py`: definicions per sessió (SA, número, títol,
  objectius «Avui», vocabulari), curades a mà des de les guies docents — patró
  data-driven com `sa_definicions.js`.
- **Guarda de sincronització a `tools/qa.py`**: (a) nombre de sessions per trimestre
  coherent amb el quadre d'hores de `08_Sequenciacio_temporal_anual.md`; (b) títols de
  sessió coincidents amb els `## SESSIÓ n` de les guies docents.
- Sortida: `Classes/00_General/pdf/Quadern_tecnic_T1.pdf` (i T2, T3), convenció actual de
  PDFs al costat del material.

## Referències del material

- `Classes/00_General/00_Quadern_tecnic.md` **actualitzat** al model paper: 5 regles
  adaptades (quadern imprès; escriure cada sessió; errors sumen; fotos com a evidència a
  Classroom; declarar IA) + enllaços als 3 PDFs. La plantilla d'entrada §4.5 es manté com
  a guia del contingut de cada pàgina.
- Enllaç des de `00_Avaluacio_per_alumnat.md` (fila del 25 % i §5 proves),
  `GUIA_INICI_DOCENT.md` (imprimir abans de començar el trimestre) i
  `00_LLEGEIX-ME_Classes.md`.
- **Classroom**: material «📓 Quadern tècnic del trimestre» amb l'enllaç al PDF de la web.

## Proves al Classroom

Diagnòstic: **no falta cap prova per dissenyar** (model = 1 prova/trimestre; les 3 són a
`Avaluació/Prova_practica_T1/T2/T3.md` i publicades a la web). El que faltava era
publicar-les: `crear_practiques_t1.js` només cobreix el T1.

- **Nous** `Material Classroom/crear_practiques_t2.js` i `crear_practiques_t3.js`:
  pràctiques avaluables SA4–SA9 + proves T2/T3, mateix patró que el T1 (ASSIGNMENT,
  DRAFT, 10 punts, idempotents via JSON de resultats, rúbriques enllaçades com a
  material).

## Fora d'abast

- Rúbrica nativa de Classroom (limitació de llicència ja coneguda: s'adjunta a mà).
- Versió digital (Google Doc) del quadern: deixa de ser el suport principal; no es manté
  plantilla Doc paral·lela.
