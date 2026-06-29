# Memòria de treball — 2026-06-29 · Anàlisi pedagògica i millores aplicades

## Objectiu
A petició del docent: **analitzar el projecte pedagògicament**, valorar les **sessions**, i **aplicar millores**. La feina s'ha fet en tres fases (anàlisi → valoració de sessions → implementació de millores), amb decisions consultades a cada pas.

## 1. Informes d'anàlisi (documents nous)
- `Memòria treball/2026-06-29_Informe_analisi_pedagogica_i_arrencada.md` — diagnòstic global del material (fortaleses + buits) i **guia d'arrencada per a un docent sense base**, amb un pla d'edicions prioritzat.
- `Memòria treball/2026-06-29_Valoracio_pedagogica_sessions.md` — valoració **sessió a sessió** (estructura, temps, progressió, càrrega cognitiva, viabilitat real), amb recomanacions §7.1–§7.8.

## 2. Millores de disseny de sessions (de la valoració)
- **`Programació didàctica/04_Metodologia.md`** — estructura tipus de sessió amb **fase 0 d'arrencada (5–10')** i **recollida (5')**, **Modelatge amb pas PRIMM "Predir"** explícit, rangs flexibles + "+repte" com a marge, i nota de **temps realista** (~95–105' efectius) i registre distribuït.
- **Guies docents SA2–SA8** — afegida l'**operativa PRIMM explícita** al preàmbul de cada SA.
- **`Classes/SA3` i `Classes/SA6` (guia docent)** — nota que la Sessió 4 **allotja la prova T1 / T2**.
- **`Classes/SA6` (guia docent)** — **bastida `millis()`** abans de la màquina d'estats (S3).
- **`Classes/SA5` (guia docent)** — **recordatori-disparador de la SA0** (Part B/C) a la S1.
- **`Programació didàctica/07_Rubriques.md`** — la **R5** es valora a escala **trimestral**.
- **Guies docents SA1–SA8** — nova secció **"Guió de modelatge (què verbalitzar)"**: frases/preguntes clau + error a anticipar per a cada sessió (mitiga el risc del live coding per a docent novell).

## 3. Millores del pla de l'informe general
- **`Avaluació/Full_qualificacio_competencies.md`** (nou) — plantilla de **qualificació per competències**: escala NA/AS/AN/AE→nota, mapa CA↔rúbrica↔SA, ponderació 45/25/20/10 i full de seguiment per alumne/a i trimestre. Enllaçat des de `Avaluació/README.md`.
- **`Programació didàctica/09b_Guia_compra_pressupost.md`** (nou) — llista de compra i **pressupost orientatiu** (kit per parella, micro:bit, robòtica mòbil, opcional) i estratègia de compra. Indexat a `00_Index_general.md`.
- **`Classes/SA8` (guia docent + fitxa)** — secció **"Ètica de dades i IA (RGPD, biaix, consentiment)"** amb mini-debats; fitxa ampliada amb dades personals, consentiment i biaix.
- **`Simulacions/Wokwi/README.md`** — **pla B explícit** per al que no és simulable (SA5/SA8 micro:bit → python.microbit.org; SA7 → demo/vídeo) i nota sobre la ràdio.
- **Coeducació** — caixa **"Referent"** a `Classes/SA1` (Carme Torras), `SA4` (Cynthia Breazeal) i `SA7` (Daniela Rus).

## No s'ha tocat
Codis `.ino/.py`, esquemes de connexions, solucionaris i diagrames Wokwi. Cap canvi estructural del currículum.

## Pendent (no fet, acordat)
- **Imatges reals de circuit** (no generables com a binaris en aquest entorn).
- **Accessibilitat per a daltònics** (nota transversal + pistes no cromàtiques) — proposat, no aplicat.
- Fitxes alleugerides i ítem de comparació C++↔MicroPython (impacte marginal).

## Sincronització
**Pendent de l'usuari:** aquest entorn no té git actiu; la publicació a GitHub la fa el docent des del seu entorn.
