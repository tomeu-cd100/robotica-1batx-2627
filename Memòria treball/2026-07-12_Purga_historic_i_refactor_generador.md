# 2026-07-12 · Purga de l'històric git (C2) i primer pas del refactor del generador (P4+P5)

Decisió del docent: «1. fes purga. 2. endavant [P4/P5]».

## C2 · Purga executada

**Què ha sortit del repo (i de tot l'històric):**
- **Material de tercers de `Recursos/`** (~258 MB): STEAMakers FreeBook (90 MB), *Actividades con Imagina TDR*, *40 proyectos ArduinoBlocks*, manuals KEYBOT i Imagina 3dBot, *Guia didàctica de robòtica educativa*, CO2 STEAM Cantabria i les dues carpetes de *Libro Robótica Educativa*. Motiu doble: **copyright d'altri** en un repo públic CC BY-SA i **mida** (feien lent el clonatge). Es conserven: **còpia local** a `Recursos/_tercers_nomes_local/` (ignorada per git) i els **enllaços originals a l'Excel** de recursos. Nota afegida a `Recursos/README.md`.
- **Web generat històric** (~62 MB): `web/pdf`, `web/classes`, `web/…`, `web/assets/img`, HTML d'arrel, `cerca-index.js`, `pygments.css` (ja eren ignorats des del 08-07; ara també fora de l'històric).
- **Es queden**: les *Fitxes STEAM Cards curs 2020-2021* (material del centre, 135 MB), els apunts, l'Excel, les fotos de kits i tota la resta de material propi.

**Procediment:** còpia local dels tercers → commit de `.gitignore`+README → **mirror de seguretat** a `Documents/robotica-backup-mirror-20260712.git` (352 MB) → `git filter-repo --invert-paths --paths-from-file … --force` (119 commits reescrits en 6 s) → re-afegir `origin` → **`git push --force`** → CI verd.

**Resultat:** pack de **335 MB → 100 MB**. QA net després de la purga. ⚠️ **L'altra màquina ha de RECLONAR** (no fer pull: l'històric és nou). El mirror de seguretat es pot esborrar d'aquí a unes setmanes si tot va bé.

## P4 (primer pas) + P5 · Refactor del generador amb xarxa de seguretat

- **Nou paquet `web/_generador/generador/`** amb `utils.py`: tota la lògica pura extreta de `generar.py` (`slugify`, `strip_accents`, `detect_sa`, `first_h1`, `rel_url`, `pdf_out_for`, `text_pla_cerca`, `apply_outside_code`). `generar.py` la importa (1791 línies, abans 1834).
- **P5 resolt:** la reescriptura d'enllaços (`href`/`src`/text `.md`) ara passa per `apply_outside_code()` i **no entra mai dins de `<pre>`/`<code>`** — el codi d'exemple amb `href="…"` literal és contingut, no navegació. Era el punt fràgil de l'auditoria del 08-07.
- **Tests:** `web/_generador/tests/test_utils.py` (10 tests pytest, inclòs el **criteri d'acceptació literal de P5**: enllaç relatiu fora es reescriu, imatge es reescriu, bloc de codi queda intacte). Integrats al workflow `qa.yml` (corren abans de cada build).
- **Verificació de regressió:** build amb el codi antic vs nou → `diff -rq` **byte-idèntic** (el bug de P5 era latent: cap pàgina actual el disparava; ara és impossible per construcció).

**Què queda de P4 (per a una sessió llarga):** partir el que resta de `generar.py` (discovery, render/plantilles — valorar Jinja2 —, orquestració) en mòduls del paquet. Ara ja hi ha paquet, tests i QA de CI per fer-ho amb seguretat.
