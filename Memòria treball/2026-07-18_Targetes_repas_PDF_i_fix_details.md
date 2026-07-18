# 2026-07-18 · Targetes de repàs en PDF imprimible + fix `<details>` (3a ronda)

**Context:** tercera passada de millora. Angles investigats i **descartats amb
evidència**: recuperació d'avaluacions (coberta a `06_Avaluacio` §6.4 amb pla
individual i instruments per dimensió), seguretat de bateries del rover (6×AA, no
LiPo; GND comú documentat al dossier), alt text de les imatges (63 amb alt, 0
buides; la galeria el deriva del nom de fitxer).

## Forat trobat i tapat: targetes de repàs sense versió paper

Les 3 targetes de repàs exprés (`MicroPython`, `Radio`, `Cpp`) diuen «reparteix la
targeta», però el circuit d'imprimibles només cobria normes + checklists + plantilles.

- **`generar_fulls_imprimibles.py`:** tipus nou `"targeta"` als `TARGETS` (les 3
  targetes) + CSS per a `<details>` + `<details open>` en paper (les solucions de
  l'autotest surten obertes: targeta d'autoestudi).
- **PDFs nous:** `Classes/00_General/pdf/00_Repas_expres_{MicroPython,Cpp,Radio}.pdf`
  amb marca de sincronia. **QA #8 els vigila automàticament** (importa `gfi.TARGETS`).
- **Enllaç «📄 Versió PDF»** afegit a la capçalera de cada targeta (patró dels
  checklists; `fora_callouts_de_pdf()` el filtra del paper).

## Bug trobat pel camí: markdown cru dins `<details>`

El contingut dels `<details><summary>Solucions</summary>` es renderitzava **sense
processar** (asteriscs `**` i accents greus literals) tant a la web com al PDF — el
`md_in_html` de python-markdown només processa l'interior de blocs HTML amb l'atribut
`markdown="1"`. Afectava les 3 targetes (la de MicroPython i la de Ràdio **des que es
van crear**). Fix: `<details markdown="1">` a les 3 fonts. Verificat: web renderitza
`<strong>`/`<code>` correctes i el PDF també.

Cap altre `.md` de material d'alumnat usa `<details>` (només docs interns).

## Estat

- QA net (el check #8 passa de 27 a 30 PDFs vigilats quan es committen).
- Nota: `py tools/qa.py | Select-Object -First N` retorna exit 255 (canonada
  tallada), no és cap error del QA.
