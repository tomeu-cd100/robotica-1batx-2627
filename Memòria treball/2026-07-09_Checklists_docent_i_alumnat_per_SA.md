# 2026-07-09 · Checklists per SA (docent + alumnat)

## Objectiu
Crear, per a **cada SA (SA0–SA9)**, dos *checklists* d'una cara: un per al **docent** i un per a l'**alumnat**. No dupliquen la guia docent ni la fitxa: en són la **capa d'acció verificable** (caselles `[ ]`), pensada per imprimir/projectar i fer servir amb el material obert al costat.

## Decisions (acordades amb el docent)
- **Abast:** SA0–SA9 (10 SA × 2 fitxers = **20 checklists**).
- **Estructura:** 2 fitxers per carpeta → `SAx_checklist_docent.md` + `SAx_checklist_alumnat.md` dins `Classes/SAx/` (coherent amb `guia_docent`/`fitxa_alumnat`).
- **Checklist alumnat (combinat):** bloc *"Abans d'acabar aquesta SA he de…"* (tasques + entregables) + **autoavaluació amb semàfor** 🔴🟡🟢 dels criteris clau + recordatori DEPURA/rescat.
- **Checklist docent (4 blocs):** 1) Logística prèvia · 2) Moments (punts de control per sessió, amb ⚠️ errors a vigilar) · 3) Avaluació i evidències (rúbriques, producte, coavaluació, registre 0–10) · 4) Atenció a la diversitat (bastida/ampliació/rescat).
- **SA0 adaptada al seu rol transversal** (no qualifica, sense sessions): docent = desplegament + 3 escenaris d'integració + precisions tècniques; alumnat = autodiagnòstic amb semàfor, sense entregables ni rúbriques.
- **Validació prèvia:** es va presentar una **mostra completa de la SA1** (docent + alumnat) i, un cop aprovada, es va aplicar el patró a la resta llegint el material real de cada SA.

## Què s'ha fet
- **20 fitxers nous** a `Classes/SA0/`…`Classes/SA9/` (`*_checklist_docent.md` i `*_checklist_alumnat.md`).
- Contingut **específic i fidel** a cada SA: durada/sessions, maquinari real, sketches concrets, errors freqüents, referents, criteris CA i rúbriques (R1–R5), productes, proves trimestrals (T1 a SA3, T2 a SA6, T3 a SA9), llavors d'IA (SA3/SA6/SA7/SA8), racons de mesura, mini-checks, i mesures de diversitat (inclosa accessibilitat/daltonisme a SA2/SA6).
- **Enllaços** a material transversal (`00_Targetes_rescat`, `00_Guia_defensa_oral`, `SA0_guia_programacio`, `Reptes/`, proves, etc.) — verificats, cap trencat.

## Resultat
- Cada SA té ara una eina d'acció compacta per als dos públics, alineada amb les rutines del curs (mètode de projecte, PRIMM, DEPURA, rols, coavaluació, exit ticket, ODS).
- Verificat: els 20 fitxers existeixen; enllaços principals comprovats (OK); corregit un enllaç mal format a `SA9_checklist_docent.md`.

## Pendents / passos següents
- **Integrar els checklists als `README.md` de cada SA** (afegir-los a la taula "Contingut") perquè apareguin a l'índex i al web. *(Pendent d'acord.)*
- **Regenerar el web:** `py web/_generador/generar.py` perquè els nous `.md` es publiquin a GitHub Pages. *(Pendent d'acord.)*
- **Commit** dels 20 fitxers + memòria. *(Pendent d'acord.)*
