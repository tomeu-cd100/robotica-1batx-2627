# 2026-06-30 · PDF de les activitats de l'alumnat + enllaços al web

## Objectiu
Generar en **PDF** tots els documents que recullen **activitats que ha de fer l'alumnat** i enllaçar-los des del web.

## Decisions (acordades amb el docent)
- **Abast (36 documents):** fitxes base (10), fitxes ampliades (9), plantilles imprimibles (5: pòster robot, plantilla disseny d'objecte, i les 3 de SA9), proves (4: diagnòstica + 3 pràctiques trimestrals) i fulls de reptes (8: Reptes_SA1–SA8).
- **Eina:** **Chrome/Edge headless `--print-to-pdf`** sobre l'HTML ja generat (zero dependències; PDF idèntic a la web). Descartat weasyprint (deps natives a Windows).
- **Ubicació/enllaç:** PDF a **`web/pdf/`** (committejats, ~11 MB) + botó **"⬇ Baixa PDF"** a cada pàgina d'activitat. (El botó es deixa a la pàgina, no a les targetes; les targetes ja hi porten.)

## Què s'ha fet
- **`web/assets/css/estil.css`:** full d'estil `@media print` (amaga topbar/sidebar/TOC/peu/breadcrumb/botó; article a una columna; capçalera d'impressió amb títol + "Robòtica · 1r Batx"; A4, colors forçats) i estil del botó `.baixa-pdf`.
- **`web/_generador/generar.py`:**
  - `is_activitat(src)` (predicat dels 36 documents) i `pdf_out_for(out_rel)`.
  - `page_shell` accepta `pdf_href`: afegeix el botó i la capçalera d'impressió (`.print-cap`).
  - Escriu el manifest `web/_generador/_activitats.json` (html→pdf→títol).
  - La neteja **preserva `web/pdf/`** (els PDF sobreviuen a cada regeneració d'HTML).
- **`web/_generador/generar_pdf.py` (nou):** llegeix el manifest i executa Chrome/Edge headless per a cada pàgina (amb `--user-data-dir` temporal per no xocar amb el navegador obert); sortida a `web/pdf/<ruta>.pdf`.

## Flux de treball (recordatori)
```
py web/_generador/generar.py       # HTML + botons + manifest
py web/_generador/generar_pdf.py   # els 36 PDF (a web/pdf/)
```

## Resultat / verificació
- **36 PDF** generats (~11 MB; 260–380 KB cadascun → contingut real).
- Botó "Baixa PDF" present a totes les pàgines d'activitat; href relatiu correcte.
- Verificació d'enllaços: **11.596 comprovats → 0 trencats** reals.

## Pendents / notes
- Si es reanomena/elimina una activitat, el PDF antic queda orfe a `web/pdf/` (la neteja no l'esborra). Esborrar-lo a mà si cal.
- Per veure els PDF a màxima qualitat, es generen amb el Chrome/Edge instal·lat.
