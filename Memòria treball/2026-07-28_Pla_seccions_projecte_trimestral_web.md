# Pla d'implementació · Seccions «Projecte trimestral» al web

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tres seccions de projecte trimestral (🐣 mascota, 🦾 braç, 🚙 rover) intercalades a l'itinerari de Classes del web, amb portada índex pròpia, perquè l'alumnat trobi el robot en acabar el bloc de SA corresponent.

**Architecture:** Nova llista `PROJECTES` a `generar.py` que dona a cada projecte un grup propi dins la secció Classes (`classes/projecte-t1/…`), amb portada com a `index.html` i el dossier existent com a segona pàgina. Els helpers de grup (ordre, etiqueta, trimestre), el hub, la graella de SA, l'stepper i el paginador s'estenen per incloure aquests grups. Redireccions HTML a les URLs antigues dels dossiers. Cap fitxer font es mou.

**Tech Stack:** Python 3.11 (`py -3.11`), generador estàtic propi (`web/_generador/generar.py`), pytest (`web/_generador/tests/`), QA (`tools/qa.py`).

**Spec:** `Memòria treball/2026-07-28_Spec_seccions_projecte_trimestral_web.md`

## Global Constraints

- Tot el contingut en català. Commits en català, Conventional Commits, amb `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- `web/` (excepte `_generador/`) és artefacte generat: mai editar-lo a mà; regenerar amb `py -3.11 web/_generador/generar.py`.
- Fitxers `.md` del repo en **LF**: crear/editar amb les eines Write/Edit, mai amb PowerShell `Set-Content`.
- Abans de cada commit que toqui fonts: `py -3.11 tools/qa.py` ha de dir «✅ QA net.»
- Tests del generador: des de `web/_generador/`, `py -3.11 -m pytest tests/ -q`.
- Cap fitxer de `Classes/00_General/` es mou de carpeta; els dossiers `00_Projecte_T{1,2,3}_*.md` no es reanomenen.
- Posicions decidides: PT1 després de SA3, PT2 després de SA6, PT3 després de PT2 i abans de SA7.
- Emojis de navegació: 🐣 (T1), 🦾 (T2), 🚙 (T3 — expressament diferent del 🚗 de SA7 per no confondre passos a l'stepper).

---

### Task 1: Configuració `PROJECTES` i helpers de grup

**Files:**
- Modify: `web/_generador/generar.py` (després de `GROUP_LABELS`, ~línia 154; i funcions `group_sort_key`, `group_label`, `group_tri`, ~línies 624–646)
- Test: `web/_generador/tests/test_projectes.py` (nou)

**Interfaces:**
- Produces: `PROJECTES: list[dict]` amb claus `num, slug, emoji, after_sa, tri, nom, curt, producte, portada, dossier`; `PROJECTE_BY_SLUG: dict[str, dict]`; `PROJECTE_BY_SRC: dict[str, dict]` (nom de fitxer font → projecte). `group_sort_key/group_label/group_tri` accepten slugs `projecte-t{n}`.

- [ ] **Step 1: Escriure el test que falla**

Crear `web/_generador/tests/test_projectes.py`:

```python
"""Tests de les seccions de projecte trimestral (PROJECTES)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import generar  # noqa: E402
from generar import (  # noqa: E402
    PROJECTES, PROJECTE_BY_SLUG, PROJECTE_BY_SRC,
    group_label, group_sort_key, group_tri,
)


def test_projectes_definits():
    assert [p["slug"] for p in PROJECTES] == [
        "projecte-t1", "projecte-t2", "projecte-t3"]
    assert PROJECTE_BY_SLUG["projecte-t3"]["after_sa"] == 6
    assert PROJECTE_BY_SRC["00_Projecte_T1_Mascota.md"]["num"] == 1
    assert PROJECTE_BY_SRC["00_Projecte_T1_portada.md"]["num"] == 1


def test_ordre_grups_amb_projectes():
    """SA3 < PT1 < SA4 i SA6 < PT2 < PT3 < SA7 (i transversal sempre primer)."""
    ordre = sorted(["sa4", "projecte-t1", "sa3", "sa7", "projecte-t3",
                    "projecte-t2", "sa6", "00-general"], key=group_sort_key)
    assert ordre == ["00-general", "sa3", "projecte-t1", "sa4", "sa6",
                     "projecte-t2", "projecte-t3", "sa7"]


def test_etiqueta_i_trimestre():
    assert group_label("projecte-t1") == "🐣 Projecte T1 · La mascota reactiva"
    assert group_label("projecte-t2") == "🦾 Projecte T2 · El braç robòtic"
    assert group_label("projecte-t3") == "🚙 Projecte T3 · El rover autònom"
    assert group_tri("projecte-t1") == 1
    assert group_tri("projecte-t3") == 3
```

- [ ] **Step 2: Comprovar que falla**

Des de `web/_generador/`: `py -3.11 -m pytest tests/test_projectes.py -q`
Esperat: FAIL amb `ImportError: cannot import name 'PROJECTES'`.

- [ ] **Step 3: Implementació mínima**

A `generar.py`, just després del bloc `GROUP_LABELS` (~línia 154), afegir:

```python
# Projectes trimestrals (fil conductor): grup propi a Classes, entre SA.
# El rover (T3) va ABANS de SA7: es munta a la sessió 0 del 3r trimestre.
PROJECTES = [
    {"num": 1, "slug": "projecte-t1", "emoji": "🐣", "after_sa": 3, "tri": 1,
     "nom": "Projecte T1 · La mascota reactiva", "curt": "Mascota",
     "producte": "Robot social: es munta a final del 1r trimestre",
     "portada": "00_Projecte_T1_portada.md",
     "dossier": "00_Projecte_T1_Mascota.md"},
    {"num": 2, "slug": "projecte-t2", "emoji": "🦾", "after_sa": 6, "tri": 2,
     "nom": "Projecte T2 · El braç robòtic", "curt": "Braç",
     "producte": "Robot manipulador: es munta a final del 2n trimestre",
     "portada": "00_Projecte_T2_portada.md",
     "dossier": "00_Projecte_T2_Brac.md"},
    {"num": 3, "slug": "projecte-t3", "emoji": "🚙", "after_sa": 6, "tri": 3,
     "nom": "Projecte T3 · El rover autònom", "curt": "Rover",
     "producte": "Robot mòbil: es munta a la sessió 0 del 3r trimestre, abans de SA7",
     "portada": "00_Projecte_T3_portada.md",
     "dossier": "00_Projecte_T3_Rover.md"},
]
PROJECTE_BY_SLUG = {p["slug"]: p for p in PROJECTES}
PROJECTE_BY_SRC = {p[k]: p for p in PROJECTES for k in ("portada", "dossier")}
```

Modificar `group_sort_key` (l'actual retorna `(1, sa, gk)` per a SA; els projectes han d'anar just darrere de la seva `after_sa` i en ordre de `num` — el prefix `"z"` garanteix `"sa6" < "z2" < "z3"`):

```python
def group_sort_key(gk: str):
    if gk in GROUP_LABELS:          # material transversal: sempre primer
        return (0, 0, gk)
    pr = PROJECTE_BY_SLUG.get(gk)
    if pr is not None:              # projecte trimestral: darrere la seva SA
        return (1, pr["after_sa"], f"z{pr['num']}")
    sa = detect_sa(gk)
    if sa is not None:
        return (1, sa, gk)
    if gk == "solucionari":
        return (3, 0, gk)
    return (2, 0, gk)
```

Modificar `group_label` i `group_tri` (afegir la branca de projecte abans de la de SA):

```python
def group_label(gk: str) -> str:
    if gk in GROUP_LABELS:
        return GROUP_LABELS[gk]
    pr = PROJECTE_BY_SLUG.get(gk)
    if pr is not None:
        return f"{pr['emoji']} {pr['nom']}"
    sa = detect_sa(gk)
    if sa is not None:
        return f"SA{sa} · {SA_TITLES.get(sa, '')}".strip(" ·")
    return gk.replace("-", " ").capitalize() if gk else ""


def group_tri(gk: str):
    pr = PROJECTE_BY_SLUG.get(gk)
    if pr is not None:
        return pr["tri"]
    sa = detect_sa(gk)
    return sa_trimestre(sa) if sa else None
```

⚠️ `detect_sa("projecte-t1")` retorna `None` (el regex és `sa\s*([0-9])` i el slug no conté «sa» + dígit) — cap conflicte, però la branca de projecte va PRIMER per claredat.

- [ ] **Step 4: Comprovar que passa (i que res no es trenca)**

Des de `web/_generador/`: `py -3.11 -m pytest tests/ -q`
Esperat: tot PASS.

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py web/_generador/tests/test_projectes.py
git commit -m "feat: config PROJECTES i ordre de grups amb projectes trimestrals"
```

---

### Task 2: Rutes de sortida pròpies i classificació de les pàgines de projecte

**Files:**
- Modify: `web/_generador/generar.py` — `GENERAL_ALUMNAT` (~línia 197) i el bucle de descoberta de pàgines dins `scan_sources` (~línies 386–399)
- Test: `web/_generador/tests/test_projectes.py` (ampliar)

**Interfaces:**
- Consumes: `PROJECTE_BY_SRC` (Task 1).
- Produces: pàgines amb `out_rel = "classes/projecte-t{n}/index.html"` (portada, `kind="index"`) i `"classes/projecte-t{n}/<slug-dossier>.html"` (dossier, `kind="doc"`), totes dues amb `tri` del projecte i `public="alumnat"`. Funció nova `out_for_projecte(src: Path) -> str | None` que retorna la ruta de projecte o `None` si el fitxer no és de projecte.

- [ ] **Step 1: Escriure el test que falla**

Afegir a `web/_generador/tests/test_projectes.py`:

```python
from generar import ROOT, classify_public, out_for_projecte  # noqa: E402

GENERAL = ROOT / "Classes" / "00_General"


def test_out_for_projecte():
    assert (out_for_projecte(GENERAL / "00_Projecte_T1_portada.md")
            == "classes/projecte-t1/index.html")
    assert (out_for_projecte(GENERAL / "00_Projecte_T3_Rover.md")
            == "classes/projecte-t3/00-projecte-t3-rover.html")
    assert out_for_projecte(GENERAL / "00_Glossari_tecnic.md") is None


def test_projecte_public_alumnat():
    assert classify_public("classes", GENERAL / "00_Projecte_T1_portada.md") == "alumnat"
    assert classify_public("classes", GENERAL / "00_Projecte_T2_Brac.md") == "alumnat"
```

- [ ] **Step 2: Comprovar que falla**

`py -3.11 -m pytest tests/test_projectes.py -q` → FAIL (`out_for_projecte` no existeix; la portada nova tampoc és a `GENERAL_ALUMNAT`, el segon test cau amb "docent").

- [ ] **Step 3: Implementació**

1. A `GENERAL_ALUMNAT` afegir les tres portades (els dossiers ja hi són):

```python
    "00_Projecte_T1_portada.md", "00_Projecte_T2_portada.md",
    "00_Projecte_T3_portada.md",
```

2. Nova funció al costat de `out_for_md` (~línia 352):

```python
def out_for_projecte(src: Path) -> str | None:
    """Ruta de sortida pròpia per a les pàgines de projecte trimestral
    (grup classes/projecte-tN/ en lloc de classes/00-general/)."""
    pr = PROJECTE_BY_SRC.get(src.name)
    if pr is None:
        return None
    if src.name == pr["portada"]:
        return f"classes/{pr['slug']}/index.html"
    return f"classes/{pr['slug']}/{slugify(src.name[:-3])}.html"
```

3. Al bucle de descoberta dins `scan_sources` (on es calcula `out_rel = out_for_md(...)` i després `title/sa/tri/kind`), intercalar el cas de projecte:

```python
            out_rel = out_for_md(sec["key"], md_path, src_dir)
            pr = PROJECTE_BY_SRC.get(md_path.name) if sec["key"] == "classes" else None
            if pr is not None:
                out_rel = out_for_projecte(md_path)
            text = md_path.read_text(encoding="utf-8")
            title = first_h1(text) or md_path.stem
            sa = detect_sa(md_path.name) or detect_sa(str(md_path.relative_to(src_dir)))
            tri = sa_trimestre(sa) if sa else None
            kind = "index" if md_path.name.lower() == "readme.md" else "doc"
            if pr is not None:
                tri = pr["tri"]
                kind = "index" if md_path.name == pr["portada"] else "doc"
```

(la resta del bucle — `classify_public`, `pages.append`, `md_map` — queda igual: `classify_public` ja retorna "alumnat" pel punt 1).

⚠️ No crear encara les portades .md: el generador només descobreix fitxers existents, per tant fins a la Task 3 les seccions tindran només el dossier. Cap error esperat.

- [ ] **Step 4: Comprovar que passa + build de fum**

```bash
py -3.11 -m pytest tests/ -q          # des de web/_generador/ → tot PASS
cd ../.. && py -3.11 web/_generador/generar.py   # build sense errors
ls web/classes/projecte-t1/            # ha de contenir 00-projecte-t1-mascota.html
```

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py web/_generador/tests/test_projectes.py web/
git commit -m "feat: grup propi classes/projecte-tN per a les pàgines de projecte"
```

---

### Task 3: Les tres portades índex (contingut nou)

**Files:**
- Create: `Classes/00_General/00_Projecte_T1_portada.md`
- Create: `Classes/00_General/00_Projecte_T2_portada.md`
- Create: `Classes/00_General/00_Projecte_T3_portada.md`

**Interfaces:**
- Consumes: noms de fitxer exactes declarats a `PROJECTES` (Task 1). Els enllaços `.md` relatius els reescriu `rewrite_links` del generador (enllaça per ruta de font, no per URL).
- Produces: tres pàgines `classes/projecte-t{n}/index.html` amb totes les referències del projecte.

- [ ] **Step 1: Crear `00_Projecte_T1_portada.md`** (amb Write, LF):

```markdown
# 🐣 Projecte T1 · La mascota reactiva

> **Per a qui és?** Per a cada parella en acabar la SA3. Aquesta pàgina és el
> punt de partida del robot del 1r trimestre: aquí hi ha tot el que cal per
> construir la mascota, en l'ordre en què es necessita.

**Durada:** sessions finals del 1r trimestre · **Maquinari:** el de SA2 i SA3 + caixa DM 3 mm tallada a làser + peces impreses en 3D

## Què és

La mascota és el **robot social** del curs: una criatura de fusta que expressa
emocions amb llum i so (après a SA2) i reacciona a l'entorn amb sensors
(après a SA3). No és una activitat nova: és el lloc on conflueixen els reptes
que ja has fet. El context general dels tres robots del curs és al
[fil conductor](00_Fil_conductor_robots.md).

## Per on començo

1. **Llegeix el dossier complet del robot:**
   [🐣 Dossier de la mascota](00_Projecte_T1_Mascota.md) — peces, plantilles,
   muntatge, cablatge, rúbrica i problemes freqüents.
2. **Recupera els teus reptes**, que són les capacitats de la mascota:
   [Reptes de SA2](../../Reptes/Reptes_SA2.md) (llum i so: emocions) i
   [Reptes de SA3](../../Reptes/Reptes_SA3.md) (sensors: reaccions).
3. **Tria el caràcter.** Nom i personalitat de la mascota, coherents amb els
   3 comportaments sensor→resposta que programareu. Idees al
   [banc d'objectes de disseny](00_Banc_objectes_disseny.md).

## Referències de fabricació

- **Plantilla de tall làser** de la caixa: `mascota.svg`, al material de
  fabricació del docent ([Recursos · plantilles làser](../../Recursos/plantilles_laser/LLEGEIX-ME.md)).
- **Peces 3D** (escaires, difusors d'ull): [Recursos · peces 3D](../../Recursos/peces_3d/LLEGEIX-ME.md).
- **Calendari de la sessió de fabricació:** el fixa el docent segons la
  [seqüenciació anual](../../Programació didàctica/08_Sequenciacio_temporal_anual.md).

## Com s'avalua

La mascota **és el producte final de SA3**: la rúbrica és al
[dossier](00_Projecte_T1_Mascota.md), apartat «Rúbrica del robot». La prova
pràctica del trimestre (T1) és independent i individual.
```

- [ ] **Step 2: Crear `00_Projecte_T2_portada.md`:**

```markdown
# 🦾 Projecte T2 · El braç robòtic

> **Per a qui és?** Per a cada parella en acabar la SA6. Aquesta pàgina és el
> punt de partida del robot del 2n trimestre: el braç manipulador que recull
> tot el que s'ha après de moviment i control.

**Durada:** sessions finals del 2n trimestre · **Maquinari:** el de SA4–SA6 + estructura DM 3 mm tallada a làser + peces impreses en 3D

## Què és

El braç és el **robot manipulador** del curs: actua sobre el món movent
coses. Combina els servos i el control de moviment (SA4), la micro:bit i la
ràdio (SA5) i les màquines d'estats (SA6). El context general dels tres
robots del curs és al [fil conductor](00_Fil_conductor_robots.md).

## Per on començo

1. **Llegeix el dossier complet del robot:**
   [🦾 Dossier del braç](00_Projecte_T2_Brac.md) — peces, plantilles,
   muntatge, cablatge, rúbrica i problemes freqüents.
2. **Recupera els teus reptes**, que són les capacitats del braç:
   [Reptes de SA4](../../Reptes/Reptes_SA4.md) (servos i moviment),
   [Reptes de SA5](../../Reptes/Reptes_SA5.md) (micro:bit i ràdio) i
   [Reptes de SA6](../../Reptes/Reptes_SA6.md) (màquines d'estats).
3. **Decideix la tasca del braç.** Què agafa, què mou, amb quin control
   (potenciòmetres o ràdio). Idees al
   [banc d'objectes de disseny](00_Banc_objectes_disseny.md).

## Referències de fabricació

- **Plantilla de tall làser** de l'estructura: `brac.svg`, al material de
  fabricació del docent ([Recursos · plantilles làser](../../Recursos/plantilles_laser/LLEGEIX-ME.md)).
- **Peces 3D:** [Recursos · peces 3D](../../Recursos/peces_3d/LLEGEIX-ME.md).
- **Calendari de la sessió de fabricació:** el fixa el docent segons la
  [seqüenciació anual](../../Programació didàctica/08_Sequenciacio_temporal_anual.md).

## Com s'avalua

El braç **és el producte final de SA6**: la rúbrica és al
[dossier](00_Projecte_T2_Brac.md), apartat «Rúbrica del robot». La prova
pràctica del trimestre (T2) és independent i individual.
```

- [ ] **Step 3: Crear `00_Projecte_T3_portada.md`:**

```markdown
# 🚙 Projecte T3 · El rover autònom

> **Per a qui és?** Per a cada parella A L'INICI del 3r trimestre. ⚠️ A
> diferència de la mascota i el braç, el rover **es construeix ARA, abans de
> començar SA7**: és la plataforma amb què es treballaran els reptes de SA7,
> SA8 i SA9.

**Durada:** sessió 0 del 3r trimestre (muntatge) + tot el trimestre (ús) · **Maquinari:** UNO, L298N, 2 motoreductors, HC-SR04, seguidors de línia, micro:bit + OLED, caixa DM 3 mm de 2 pisos

## Què és

El rover és el **robot mòbil** del curs: es desplaça pel món. A SA7 és la
plataforma per seguir línia i evitar obstacles; a SA8 guanya telemetria amb
la micro:bit; a SA9 és la base del repte final. El context general dels tres
robots del curs és al [fil conductor](00_Fil_conductor_robots.md).

## Per on començo

1. **Llegeix el dossier complet del robot:**
   [🚗 Dossier del rover](00_Projecte_T3_Rover.md) — peces, plantilles,
   muntatge (sessió 0 pautada de 2 h), cablatge, rúbrica i problemes freqüents.
2. **Munta'l a la sessió 0** seguint l'apartat «Sessió 0 de muntatge (2 h)»
   del dossier: en acabar la sessió, el rover ha de rodar.
3. **A partir de SA7**, cada repte s'executa sobre el teu rover:
   [Reptes de SA7](../../Reptes/Reptes_SA7.md) (línia i obstacles) i
   [Reptes de SA8](../../Reptes/Reptes_SA8.md) (telemetria i IA).

## Referències de fabricació

- **Plantilla de tall làser** del xassís: `rover.svg`, al material de
  fabricació del docent ([Recursos · plantilles làser](../../Recursos/plantilles_laser/LLEGEIX-ME.md)).
- **Peces 3D** (suports de motor i sensors): [Recursos · peces 3D](../../Recursos/peces_3d/LLEGEIX-ME.md).
- **Calendari:** la sessió 0 surt de la
  [seqüenciació anual](../../Programació didàctica/08_Sequenciacio_temporal_anual.md).

## Com s'avalua

La rúbrica del rover s'avalua **dins el producte de SA9** (dimensió
«Projectes i productes»): és al [dossier](00_Projecte_T3_Rover.md). Les
proves pràctiques del trimestre són independents.
```

- [ ] **Step 4: Build + verificació**

```bash
py -3.11 web/_generador/generar.py
py -3.11 tools/qa.py                  # ✅ QA net (vigila enllaços dels .md nous)
```

Comprovar que existeixen `web/classes/projecte-t1/index.html`, `-t2`, `-t3`, i que la portada T1 enllaça el dossier (`grep "00-projecte-t1-mascota" web/classes/projecte-t1/index.html`).

⚠️ Si `qa.py` es queixa d'enllaços a `Reptes_SA4.md`…: comprovar el nom exacte dels fitxers a `Reptes/` i ajustar els enllaços de les portades (no el QA).

- [ ] **Step 5: Commit**

```bash
git add Classes/00_General/00_Projecte_T*_portada.md web/
git commit -m "feat: portades índex dels tres projectes trimestrals"
```

---

### Task 4: Hub de Classes, graella de SA i stepper amb els projectes

**Files:**
- Modify: `web/_generador/generar.py` — `section_index_extra` (~línia 1372, bucle «Subcarpetes»), `sa_grid_html` (~línia 1594), `stepper_html` (~línia 836)

**Interfaces:**
- Consumes: `PROJECTES`, `PROJECTE_BY_SLUG` (Task 1); pàgines de projecte amb grup propi (Task 2).
- Produces: targetes `sa-card` de projecte al hub de Classes i a la graella de portada; passos de projecte a l'stepper. Cap CSS nou (es reutilitzen `.sa-card`, `.step`, `data-tri`).

- [ ] **Step 1: Hub de Classes (`section_index_extra`)**

Al bucle «Subcarpetes», abans de la branca `if idx and sa is not None:`, afegir la branca de projecte. Les entrades de `tri_entries` s'ordenen pel segon element (numèric): fer servir `after_sa + num/10` perquè PT1 (3.1) vagi rere SA3, i PT2 (6.2) / PT3 (6.3) rere SA6 — PT3 té `tri=3`, per tant dins el bloc del 3r trimestre queda davant de SA7 (6.3 < 7):

```python
        pr = PROJECTE_BY_SLUG.get(gk)
        if idx and pr is not None:
            has_hubs = True
            mats = len([x for x in gps if x is not idx])
            meta = f"{mats} material{'s' if mats != 1 else ''}"
            card = (f'<a class="sa-card" href="{rel_url(current_out, idx.out_rel)}" '
                    f'data-tri="{pr["tri"]}">'
                    f'<span class="sa-ic" aria-hidden="true">{pr["emoji"]}</span>'
                    f'<span class="sa-body">'
                    f'<span class="sa-num">Projecte T{pr["num"]}</span>'
                    f'<span class="sa-nom">{html.escape(pr["curt"])}</span>'
                    f'<span class="sa-prod">{html.escape(pr["producte"])}</span>'
                    f'<span class="sa-meta">{html.escape(meta)}</span></span></a>')
            tri_entries.append((pr["tri"], pr["after_sa"] + pr["num"] / 10, card))
            continue
```

(el `continue` evita que caigui a la branca genèrica de `card-grid`).

- [ ] **Step 2: Graella de portada i hub d'alumnat (`sa_grid_html`)**

Dins el bucle `for t, info in TRIMESTRES.items():`, després del bucle de `info["sas"]`, injectar les targetes de projecte del trimestre — abans o després segons cronologia (PT3 va PRIMER al seu bloc):

```python
        for pr in PROJECTES:
            if pr["tri"] != t:
                continue
            hub = f"classes/{pr['slug']}/index.html"
            if hub not in outs:
                continue
            card = (
                f'<a class="sa-card" href="{hub}" data-tri="{t}">'
                f'<span class="sa-ic" aria-hidden="true">{pr["emoji"]}</span>'
                f'<span class="sa-body">'
                f'<span class="sa-num">Projecte T{pr["num"]}</span>'
                f'<span class="sa-nom">{html.escape(pr["curt"])}</span>'
                f'<span class="sa-prod">{html.escape(pr["producte"])}</span>'
                f'</span></a>')
            if pr["after_sa"] < min(info["sas"]):   # rover: obre el trimestre
                cards.insert(0, card)
            else:
                cards.append(card)
```

⚠️ `pr["after_sa"] < min(info["sas"])` és cert només per a PT3 (6 < 7): PT1 i PT2 tanquen el seu bloc, el rover l'obre.

- [ ] **Step 3: Stepper (`stepper_html`)**

Substituir el bucle `for sa in range(0, 10):` per una llista ordenada mixta. El pas actiu de projecte es detecta pel grup de la ruta:

```python
    cur = detect_sa(out_rel)
    cur_pr = page_group("classes", out_rel)
    passos: list[tuple] = []           # ("sa", n) | ("pr", dict)
    for sa in range(0, 10):
        passos.append(("sa", sa))
        for pr in PROJECTES:
            if pr["after_sa"] == sa:
                passos.append(("pr", pr))
    steps = []
    for tipus, val in passos:
        if tipus == "sa":
            sa = val
            tri = 0 if sa == 0 else sa_trimestre(sa)
            href = rel_url(out_rel, f"classes/sa{sa}/index.html")
            actiu = " actiu" if sa == cur else ""
            aria = ' aria-current="page"' if sa == cur else ""
            steps.append(f'<a class="step{actiu}" data-tri="{tri}" href="{href}"{aria} '
                         f'title="SA{sa} · {html.escape(SA_TITLES.get(sa, ""))}">'
                         f'<span class="step-ic">{SA_ICONES.get(sa, "")}</span>'
                         f'<span class="step-n">SA{sa}</span></a>')
        else:
            pr = val
            href = rel_url(out_rel, f"classes/{pr['slug']}/index.html")
            actiu = " actiu" if cur_pr == pr["slug"] else ""
            aria = ' aria-current="page"' if cur_pr == pr["slug"] else ""
            steps.append(f'<a class="step{actiu}" data-tri="{pr["tri"]}" href="{href}"{aria} '
                         f'title="{html.escape(pr["nom"])}">'
                         f'<span class="step-ic">{pr["emoji"]}</span>'
                         f'<span class="step-n">T{pr["num"]}</span></a>')
    return ('<nav class="stepper" aria-label="Progrés del curs (SA i projectes)">'
            + "".join(steps) + "</nav>")
```

⚠️ `detect_sa(out_rel)` per a pàgines de projecte retorna `None` (slug sense «sa»+dígit): cap SA queda ressaltada per error.

- [ ] **Step 4: Build + verificació visual per grep**

```bash
py -3.11 web/_generador/generar.py
grep -c "projecte-t1/index.html" web/classes/index.html     # ≥ 1 (targeta al hub)
grep -o 'class="step[^"]*"' web/classes/sa3/index.html | wc -l   # 13 passos (10 SA + 3 projectes)
grep "Projecte T3" web/index.html                            # targeta rover a portada
py -3.11 -m pytest web/_generador/tests -q                   # (des de l'arrel: cd web/_generador && py -3.11 -m pytest tests -q)
```

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py web/
git commit -m "feat: projectes trimestrals al hub, la graella de SA i l'stepper"
```

---

### Task 5: Paginador d'itinerari amb ponts SA ↔ projecte

**Files:**
- Modify: `web/_generador/generar.py` — `build_sequences` (~línia 917: bloc «Classes» i `render_pager`)
- Test: `web/_generador/tests/test_projectes.py` (ampliar)

**Interfaces:**
- Consumes: pàgines de projecte amb grup i `kind` correctes (Task 2).
- Produces: seqüències pròpies «🐣 Projecte T1» (portada → dossier) etc., i ponts al paginador: darrera pàgina de SA3 → portada PT1, darrera de PT1 → SA4; SA6 → PT2 → PT3 → SA7. `render_pager` accepta paràmetres nous `outer_prev: Page | None` i `outer_next: Page | None`.

- [ ] **Step 1: Escriure el test que falla**

Afegir a `test_projectes.py` (test d'integració lleuger sobre l'HTML generat — el paginador es construeix amb l'arbre real):

```python
def test_pager_pont_sa3_projecte_t1():
    """El web generat ha de tenir el pont SA3 → Projecte T1 al paginador."""
    web = ROOT / "web"
    sa3 = sorted((web / "classes" / "sa3").glob("*.html"))
    assert sa3, "cal haver generat el web abans dels tests de pont"
    tot = "".join(p.read_text(encoding="utf-8") for p in sa3)
    assert "../projecte-t1/index.html" in tot
    pt1 = (web / "classes" / "projecte-t1" / "index.html").read_text(encoding="utf-8")
    assert 'class="pager' in pt1
```

- [ ] **Step 2: Comprovar que falla**

`py -3.11 -m pytest tests/test_projectes.py -q` → FAIL (cap pont encara; l'enllaç `../projecte-t1/index.html` no apareix als paginadors de SA3 — pot aparèixer a l'stepper, per això el test del pont mira TOTS els html de sa3 i el de PT1 comprova que té paginador propi; si l'stepper ja fa passar el primer assert, endurir-lo buscant `pager-a next" href="../projecte-t1/index.html"`).

- [ ] **Step 3: Implementació**

1. `render_pager` (funció interna de `build_sequences`): afegir paràmetres i usar-los als extrems:

```python
    def render_pager(label, items, vista, outer_prev=None, outer_next=None):
        ...
        for i, p in enumerate(items):
            prev_p = items[i - 1] if i > 0 else outer_prev
            next_p = items[i + 1] if i < len(items) - 1 else outer_next
```

(la resta del cos no canvia: `prev_p`/`next_p` ja es renderitzen amb `p.title`).

2. Al bloc «Classes» de `build_sequences`, construir també les seqüències de projecte i encadenar els ponts. Substituir el bucle actual per:

```python
    # Classes: dins de cada SA, presentació → guia → fitxes → esquemes → codi.
    # Els projectes trimestrals s'intercalen amb ponts: SA3→PT1→SA4, SA6→PT2→PT3→SA7.
    blocs: dict[str, tuple[str, list[Page]]] = {}   # clau grup -> (label, items)
    for sa in range(0, 10):
        grp = [p for p in pages if p.section == "classes" and p.kind != "practica"
               and page_group("classes", p.out_rel) == f"sa{sa}"]
        if not grp:
            continue
        idx = [p for p in grp if p.kind == "index"]
        rest = sorted([p for p in grp if p.kind != "index"], key=doc_ordre)
        blocs[f"sa{sa}"] = (f"SA{sa}", idx + rest)
    for pr in PROJECTES:
        grp = [p for p in pages if p.section == "classes"
               and page_group("classes", p.out_rel) == pr["slug"]]
        if not grp:
            continue
        idx = [p for p in grp if p.kind == "index"]
        rest = sorted([p for p in grp if p.kind != "index"], key=doc_ordre)
        blocs[pr["slug"]] = (f"{pr['emoji']} Projecte T{pr['num']}", idx + rest)

    PONTS = [("sa3", "projecte-t1"), ("projecte-t1", "sa4"),
             ("sa6", "projecte-t2"), ("projecte-t2", "projecte-t3"),
             ("projecte-t3", "sa7")]
    pont_next = {a: b for a, b in PONTS if a in blocs and b in blocs}
    pont_prev = {b: a for a, b in PONTS if a in blocs and b in blocs}
```

3. Les seqüències de Classes ja no van per `add_seq` genèric: guardar-les amb els ponts. Substituir l'acumulació final (el bucle que crida `render_pager` per a cada `(label, items)` de `seqs`) o, més quirúrgic, afegir els blocs de Classes a una llista pròpia i renderitzar-los amb ponts. Renderització per vista:

```python
    def vista_items(items, vista):
        if vista == "docent":
            return items
        return [p for p in items if p.public == "alumnat"
                and not any(k in p.out_rel.lower() for k in NOMES_CONSULTA)]

    for gk, (label, items) in blocs.items():
        for vista in ("docent", "alumnat"):
            its = vista_items(items, vista)
            if len(its) < 2 and not (gk in pont_next or gk in pont_prev):
                continue
            op = on = None
            if gk in pont_prev:
                prev_its = vista_items(blocs[pont_prev[gk]][1], vista)
                op = prev_its[-1] if prev_its else None
            if gk in pont_next:
                next_its = vista_items(blocs[pont_next[gk]][1], vista)
                on = next_its[0] if next_its else None
            if len(its) < 2 and not (op or on):
                continue
            full = render_pager(label, its, vista, outer_prev=op, outer_next=on)
            for out_rel, htmlp in full.items():
                pager[out_rel] = pager.get(out_rel, "") + htmlp
```

⚠️ Vigilar el patró existent: la variant docent s'afegia amb `pager[out_rel] = htmlp` (substitució) i l'alumnat amb `+=`. Mantenir l'ordre docent-primer i concatenació per a la segona vista, com fa el codi actual. Les seccions Programació i Reptes queden amb el mecanisme `add_seq` intacte.

- [ ] **Step 4: Build + tests**

```bash
py -3.11 web/_generador/generar.py
cd web/_generador && py -3.11 -m pytest tests/ -q   # tot PASS
```

Comprovació manual ràpida: obrir `web/classes/sa3/` (última pàgina del bloc) i veure «Següent → 🐣 Projecte T1 …»; `web/classes/projecte-t3/index.html` ha de tenir «← Anterior (dossier braç)» i «Següent → (primera pàgina SA7)».

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py web/_generador/tests/test_projectes.py web/
git commit -m "feat: itinerari amb ponts SA3→T1, SA6→T2→T3→SA7 al paginador"
```

---

### Task 6: Redireccions de les URLs antigues dels dossiers

**Files:**
- Modify: `web/_generador/generar.py` — al final del procés d'escriptura de pàgines (funció principal de generació, després d'escriure totes les pàgines)
- Test: `web/_generador/tests/test_projectes.py` (ampliar)

**Interfaces:**
- Consumes: `PROJECTES` (Task 1); rutes noves (Task 2).
- Produces: 3 fitxers HTML de redirecció a `web/classes/00-general/00-projecte-t1-mascota.html`, `00-projecte-t2-brac.html`, `00-projecte-t3-rover.html` (les URLs publicades abans del canvi, p. ex. al Classroom).

- [ ] **Step 1: Escriure el test que falla**

```python
def test_redireccions_dossiers():
    base = ROOT / "web" / "classes" / "00-general"
    for antic, nou in [
        ("00-projecte-t1-mascota.html", "../projecte-t1/00-projecte-t1-mascota.html"),
        ("00-projecte-t2-brac.html", "../projecte-t2/00-projecte-t2-brac.html"),
        ("00-projecte-t3-rover.html", "../projecte-t3/00-projecte-t3-rover.html"),
    ]:
        f = base / antic
        assert f.exists(), f"falta la redirecció {antic}"
        t = f.read_text(encoding="utf-8")
        assert nou in t and "refresh" in t.lower()
```

- [ ] **Step 2: Comprovar que falla**

Després d'un build net, els fitxers antics ja NO es generen (les pàgines han canviat de ruta) → FAIL per `exists()`.

- [ ] **Step 3: Implementació**

Funció nova + crida al final de l'escriptura de pàgines (al mateix nivell on s'escriuen `sitemap`/índex de cerca; localitzar el punt on acaba el bucle d'escriptura de `pages`):

```python
def write_redirects_projectes(out_dir: Path) -> None:
    """Les URLs antigues dels dossiers (classes/00-general/…) poden estar
    enllaçades des del Classroom: hi deixem una redirecció."""
    for pr in PROJECTES:
        slug_dossier = slugify(pr["dossier"][:-3]) + ".html"
        antic = out_dir / "classes" / "00-general" / slug_dossier
        nou = f"../{pr['slug']}/{slug_dossier}"
        antic.parent.mkdir(parents=True, exist_ok=True)
        antic.write_text(
            f'<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8">\n'
            f'<meta http-equiv="refresh" content="0; url={nou}">\n'
            f'<link rel="canonical" href="{nou}">\n'
            f'<title>{html.escape(pr["nom"])}</title></head>\n'
            f'<body><p>Aquesta pàgina s\'ha mogut: '
            f'<a href="{nou}">{html.escape(pr["nom"])}</a></p></body></html>\n',
            encoding="utf-8")
```

⚠️ Si el generador esborra `web/` abans de regenerar (comprovar si hi ha un `shutil.rmtree` o neteja inicial), la crida ha d'anar DESPRÉS de la neteja i de l'escriptura de pàgines. Si `tools/qa.py` valida enllaços interns del web generat, comprovar que no es queixi dels stubs (són HTML mínim sense capçalera del site: acceptable, són només per a enllaços externs antics).

- [ ] **Step 4: Build + tests**

```bash
py -3.11 web/_generador/generar.py
cd web/_generador && py -3.11 -m pytest tests/ -q
cd ../.. && py -3.11 tools/qa.py
```

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py web/_generador/tests/test_projectes.py web/
git commit -m "feat: redireccions de les URLs antigues dels dossiers de projecte"
```

---

### Task 7: Comprovació QA de les portades + verificació final i push

**Files:**
- Modify: `tools/qa.py` (nova funció `comprova_projectes_trimestrals()` + crida al `main`, seguint el patró de `comprova_ordre_itinerari()` de ~línia 208; `qa.py` ja importa el generador com a `g`)

**Interfaces:**
- Consumes: `g.PROJECTES` (Task 1); portades (Task 3).
- Produces: comprovació que falla el QA si una portada desapareix o deixa d'enllaçar el seu dossier.

- [ ] **Step 1: Implementar la comprovació** (el QA no té suite pytest pròpia: el «test» és executar-lo)

```python
# --- N · Projectes trimestrals: portada present i enllaçant el dossier -------
def comprova_projectes_trimestrals() -> None:
    """Cada projecte trimestral ha de tenir portada a Classes/00_General i
    la portada ha d'enllaçar el seu dossier (si no, la secció del web queda
    sense pàgina d'entrada o sense camí cap al dossier)."""
    base = ARREL / "Classes" / "00_General"
    for pr in g.PROJECTES:
        portada = base / pr["portada"]
        if not portada.exists():
            error(f"[projectes] falta la portada {pr['portada']}")
            continue
        text = portada.read_text(encoding="utf-8")
        if pr["dossier"] not in text:
            error(f"[projectes] {pr['portada']} no enllaça el dossier {pr['dossier']}")
    print(f"N) Projectes trimestrals: {len(g.PROJECTES)} portades comprovades.")
```

Ajustar al patró real de `qa.py`: nom de la constant d'arrel (`ARREL` o equivalent), funció d'error (`error(...)` o acumulador), numeració del missatge (`N)` → següent número lliure) i afegir la crida al costat de `comprova_ordre_itinerari()` (~línia 534). Actualitzar el docstring-índex de capçalera de `qa.py` (línies ~10–20) amb la comprovació nova.

- [ ] **Step 2: Provar el QA en verd i en vermell**

```bash
py -3.11 tools/qa.py                       # ✅ QA net
# prova de foc: trencar-lo temporalment
git mv "Classes/00_General/00_Projecte_T1_portada.md" /tmp/portada.md 2>/dev/null || mv "Classes/00_General/00_Projecte_T1_portada.md" ../portada_tmp.md
py -3.11 tools/qa.py                       # ha de FALLAR amb [projectes]
mv ../portada_tmp.md "Classes/00_General/00_Projecte_T1_portada.md"
py -3.11 tools/qa.py                       # ✅ QA net altre cop
```

- [ ] **Step 3: Verificació final completa**

```bash
py -3.11 web/_generador/generar.py
cd web/_generador && py -3.11 -m pytest tests/ -q && cd ../..
py -3.11 tools/qa.py
```

Revisió manual (navegador, `web/index.html` local): targetes de projecte a portada i hub; stepper amb 🐣🦾🚙; pàgina SA3 última → «Següent: Projecte T1»; portada T3 amb l'avís de sessió 0; redirecció antiga funciona.

- [ ] **Step 4: Commit i push**

```bash
git add tools/qa.py web/
git commit -m "feat: comprovació QA de les portades de projecte trimestral"
git push
```

---

## Self-review (feta en escriure el pla)

- **Cobertura de l'spec:** seccions pròpies (T1–T3) ✔ Task 1–2 · posició cronològica ✔ Task 1 (`group_sort_key`) i Task 4 (hub/graella/stepper) · portada índex amb referències ✔ Task 3 · dossier com a 2a pàgina sense moure fitxers ✔ Task 2 · pont d'itinerari SA3→PT1 (i la resta) ✔ Task 5 · redireccions ✔ Task 6 · QA ✔ Task 7 · fora d'abast respectat (cap canvi a Programació didàctica ni Classroom).
- **Riscos assenyalats dins de cada task:** `detect_sa` amb slugs de projecte (T1/T4), patró docent/alumnat del pager (T5), neteja prèvia de `web/` abans dels stubs (T6), noms exactes de `Reptes_SAn.md` (T3).
- **Consistència de noms:** `PROJECTES`/`PROJECTE_BY_SLUG`/`PROJECTE_BY_SRC` i `out_for_projecte` usats amb la mateixa signatura a totes les tasks.
