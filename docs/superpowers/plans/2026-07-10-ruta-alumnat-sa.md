# «La teva ruta» — Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pàgina de SA neta i lineal per a l'alumnat: ruta per passos a la portada, pager que segueix la ruta, sidebar mínim; material opcional només a «Si vols més».

**Architecture:** La ruta viu al README de cada SA (secció «Itinerari…», font única). El generador (`generar.py`) l'embolcalla en `<section class="ruta">`, poda la portada i el pager en vista alumnat, i amaga ampliada/qüestionari del sidebar alumnat. CSS fa la resta (regles per `html[data-vista="alumnat"]`).

**Tech Stack:** Python 3 (script estàtic, llibreria `markdown`), CSS pur, Markdown. Sense tests automatitzats al repo: la verificació és regenerar + inspecció d'HTML generat (grep) + navegador.

**Spec:** `docs/superpowers/specs/2026-07-10-ruta-alumnat-sa-design.md`

## Global Constraints

- Vista **docent** ha de quedar **idèntica** a l'actual (només s'amaga per CSS en vista alumnat; no es treu res de l'HTML).
- Font única: cap contingut duplicat entre README, fitxa i generador.
- Regenerar sempre amb `py web/_generador/generar.py` (Windows; `python` no té `markdown` instal·lat).
- El web generat (`web/classes/…`) és gitignored: **no** es committa.
- Commits en català, sense accents als missatges (estil del repo), amb `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: `doc_ordre` = ordre de la ruta (generador)

**Files:**
- Modify: `web/_generador/generar.py:765-775` (funció `doc_ordre`)
- Modify: `web/_generador/generar.py:1192-1201` (funció local `ordre` dins `subindex_extra` — s'elimina i es reutilitza `doc_ordre`)

**Interfaces:**
- Produces: `doc_ordre(p: Page) -> tuple` — clau d'ordenació usada per sidebar, pager (`build_sequences`) i targetes de la portada (`subindex_extra`). L'ordre canònic nou és: guia → fitxa base → vocabulari → prova → normes → esquemes/connexions → pòster → recursos → pràctica → checklist alumnat → codi → fitxa ampliada → qüestionari → checklist docent.

- [ ] **Step 1: Substituir `doc_ordre`**

A `web/_generador/generar.py`, substituir la funció actual:

```python
def doc_ordre(p: Page):
    """Ordre pedagògic dels materials d'una SA (guia → fitxa → esquemes → codi)."""
    n = p.out_rel.lower()
    rang = 9
    for i, clau in enumerate(["guia", "fitxa-alumnat", "fitxa", "vocabulari",
                               "prova", "normes", "esquemes", "connexions",
                               "poster", "recursos", "practica"]):
        if clau in n:
            rang = i
            break
    return (p.kind == "code", rang, p.out_rel)
```

per aquesta versió (el codi passa a tenir rang explícit, i l'ampliada,
el qüestionari i el checklist docent van al final — és l'ordre de la ruta):

```python
# Ordre canònic dels materials d'una SA: primer el camí de l'alumnat
# (fitxa → suports → checklist → codi), després el material opcional
# (ampliada, qüestionari) i el del docent. "__codi__" és el rang de les
# pàgines de codi (kind == "code").
DOC_ORDRE_CLAUS = ["guia-docent", "guia", "fitxa-alumnat", "vocabulari",
                   "prova", "normes", "esquemes", "connexions", "poster",
                   "recursos", "practica", "checklist-alumnat", "__codi__",
                   "fitxa-ampliada", "questionari", "checklist-docent"]


def doc_ordre(p: Page):
    """Ordre pedagògic dels materials d'una SA (l'ordre de la ruta)."""
    n = p.out_rel.lower()
    if p.kind == "code":
        return (DOC_ORDRE_CLAUS.index("__codi__"), n)
    for i, clau in enumerate(DOC_ORDRE_CLAUS):
        if clau != "__codi__" and clau in n:
            return (i, n)
    return (len(DOC_ORDRE_CLAUS), n)
```

- [ ] **Step 2: Reutilitzar `doc_ordre` a `subindex_extra`**

Dins `subindex_extra` (línia ~1192) hi ha una còpia local:

```python
    def ordre(p):
        n = p.out_rel.lower()
        rang = 9
        for i, clau in enumerate(["guia", "fitxa-alumnat", "fitxa", "vocabulari",
                                   "prova", "normes", "esquemes", "connexions",
                                   "poster", "recursos", "practica"]):
            if clau in n:
                rang = i
                break
        return (p.kind == "code", rang, p.out_rel)
```

Eliminar-la, i a la línia `for p in sorted(gps, key=ordre):` canviar `key=ordre` per `key=doc_ordre`.

- [ ] **Step 3: Regenerar i comprovar l'ordre**

Run: `py web/_generador/generar.py`
Expected: acaba amb «Fet.» sense traceback.

Run (Git Bash):
```bash
python - <<'EOF'
import re
html = open('web/classes/sa2/index.html', encoding='utf-8').read()
m = re.search(r'<details class="sb-grup" open>.*?</details>', html, re.S)
print([t for _, t in re.findall(r'<li( class="nomes-docent")?><a href="[^"]*">([^<]+)</a>', m.group(0))])
EOF
```
Expected (ordre): Presentació, Guia docent, Fitxa base, Esquemes, El meu checklist, Codi, Fitxa ampliada, Checklist docent, Qüestionari… — l'ampliada i el qüestionari **després** del codi.

- [ ] **Step 4: Commit**

```bash
git add web/_generador/generar.py
git commit -m "Web: doc_ordre segueix l'ordre de la ruta (ampliada i questionari al final)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: pager alumnat sense ampliada ni qüestionari + sidebar amb `amagat-alumnat`

**Files:**
- Modify: `web/_generador/generar.py:838-842` (variant alumnat de `build_sequences`)
- Modify: `web/_generador/generar.py:605-609` (`_link`) i `sidebar_html` (crides dins del grup)

**Interfaces:**
- Consumes: `doc_ordre` de Task 1.
- Produces: constant `NOMES_CONSULTA = ("fitxa-ampliada", "questionari")` (mòdul); `_link(..., amagat=False)` amb paràmetre nou; classe CSS `amagat-alumnat` a `<li>` del sidebar (l'estil arriba a Task 3).

- [ ] **Step 1: Constant + filtre del pager**

Sota `DOC_ORDRE_CLAUS`, afegir:

```python
# Material que existeix per a l'alumnat però NOMÉS com a consulta opcional
# («Si vols més»): fora del pager i del sidebar en vista alumnat.
NOMES_CONSULTA = ("fitxa-ampliada", "questionari")
```

A `build_sequences`, canviar:

```python
        alum_items = [p for p in items if p.public == "alumnat"]
```

per:

```python
        alum_items = [p for p in items if p.public == "alumnat"
                      and not any(k in p.out_rel.lower() for k in NOMES_CONSULTA)]
```

- [ ] **Step 2: `_link` amb paràmetre `amagat`**

Substituir:

```python
def _link(href, label, actiu, tri=None, docent=False):
    cls = ' class="actiu"' if actiu else ""
    li_cls = ' class="nomes-docent"' if docent else ""
    dot = f' <span class="tri-dot" data-tri="{tri}"></span>' if tri else ""
    return f'<li{li_cls}><a href="{href}"{cls}>{label}{dot}</a></li>'
```

per:

```python
def _link(href, label, actiu, tri=None, docent=False, amagat=False):
    cls = ' class="actiu"' if actiu else ""
    li_classes = [c for c, on in (("nomes-docent", docent),
                                  ("amagat-alumnat", amagat)) if on]
    li_cls = f' class="{" ".join(li_classes)}"' if li_classes else ""
    dot = f' <span class="tri-dot" data-tri="{tri}"></span>' if tri else ""
    return f'<li{li_cls}><a href="{href}"{cls}>{label}{dot}</a></li>'
```

- [ ] **Step 3: Marcar els ítems de consulta al sidebar**

A `sidebar_html`, dins del bucle d'ítems del grup obert, canviar:

```python
            items.append(_link(rel_url(current_out, p.out_rel), label,
                               p.out_rel == current_out,
                               docent=(p.public == "docent")))
```

per:

```python
            items.append(_link(rel_url(current_out, p.out_rel), label,
                               p.out_rel == current_out,
                               docent=(p.public == "docent"),
                               amagat=any(k in p.out_rel.lower()
                                          for k in NOMES_CONSULTA)))
```

Excepció: si la pàgina actual ÉS una de consulta (l'alumne hi ha entrat des
de «Si vols més»), el seu ítem no s'amaga — afegir just abans de l'append:

```python
            es_consulta = any(k in p.out_rel.lower() for k in NOMES_CONSULTA)
            if p.out_rel == current_out:
                es_consulta = False
```

i passar `amagat=es_consulta`.

- [ ] **Step 4: Regenerar i comprovar**

Run: `py web/_generador/generar.py`

Run:
```bash
grep -c 'amagat-alumnat' web/classes/sa2/index.html
grep -o 'data-pager-vista="alumnat".*' web/classes/sa2/sa2-fitxa-alumnat.html | grep -oE 'pager-tit">[^<]+'
```
Expected: `amagat-alumnat` ≥ 2 (ampliada + qüestionari); pager alumnat de la fitxa: Anterior = Presentació, Següent = **Esquemes** (no «Fitxa ampliada»).

- [ ] **Step 5: Commit**

```bash
git add web/_generador/generar.py
git commit -m "Web: pager i sidebar d'alumnat sense ampliada ni questionari (NOMES_CONSULTA)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: embolcall `.ruta` + poda de portada + CSS

**Files:**
- Modify: `web/_generador/generar.py` (funció nova `marca_ruta` + crida al bucle principal; classe `material-sa` a `subindex_extra`)
- Modify: `web/assets/css/estil.css` (estils `.ruta`, capsa «Si vols més», regles d'amagat per vista)

**Interfaces:**
- Consumes: res de nou (HTML del body ja generat).
- Produces: `marca_ruta(body: str) -> str`; classes CSS `.ruta`, `.material-sa`, `.amagat-alumnat` amb regles per `html[data-vista="alumnat"]`.

- [ ] **Step 1: Funció `marca_ruta`**

Afegir a `generar.py` (al costat de `wrap_tables`):

```python
def marca_ruta(body: str) -> str:
    """A les portades de SA, embolcalla la secció «Itinerari…» (des del seu
    <h2> fins al <h2> següent) amb <section class="ruta"> perquè el CSS la
    renderitzi com a passos. Si no hi ha itinerari, no fa res."""
    m = re.search(r'<h2 id="itinerari[^>]*>.*?</h2>', body)
    if not m:
        return body
    nxt = body.find("<h2", m.end())
    end = nxt if nxt != -1 else len(body)
    return (body[:m.start()] + '<section class="ruta">'
            + body[m.start():end] + "</section>" + body[end:])
```

- [ ] **Step 2: Cridar-la només a portades de SA**

Al bucle principal (`main`), just després de `body = rewrite_links(...)`, afegir:

```python
        if p.kind == "index" and detect_sa(p.out_rel) is not None \
                and p.section == "classes":
            body = marca_ruta(body)
```

- [ ] **Step 3: Classe `material-sa` a la graella de la portada**

A `subindex_extra`, canviar el return final:

```python
    return ("".join(start)
            + f'<h2 class="seccio-sep">{titol}</h2>'
            + '<div class="card-grid">' + "".join(cards) + "</div>")
```

per:

```python
    return ("".join(start)
            + f'<div class="material-sa"><h2 class="seccio-sep">{titol}</h2>'
            + '<div class="card-grid">' + "".join(cards) + "</div></div>")
```

- [ ] **Step 4: CSS**

A `web/assets/css/estil.css`, després del bloc del `.stepper`, afegir:

```css
/* «La teva ruta» — passos de la SA (portada, vista alumnat i docent) */
.ruta { margin: 1.2rem 0; }
.ruta > ol {
  list-style: none; margin: 1rem 0 0; padding: 0;
  counter-reset: pas;
}
.ruta > ol > li {
  counter-increment: pas; position: relative;
  margin: 0 0 .6rem; padding: .7rem .9rem .7rem 3.4rem;
  border: 1px solid var(--border); border-left: 4px solid var(--tri, var(--accent));
  border-radius: var(--radi-s); background: var(--surface);
}
.ruta > ol > li::before {
  content: counter(pas); position: absolute; left: .9rem; top: 50%;
  transform: translateY(-50%);
  width: 1.9rem; height: 1.9rem; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--tri, var(--accent)) 14%, transparent);
  color: var(--tri, var(--accent));
  font-weight: 700; font-size: .95rem;
}
/* capsa «Si vols més» (h3 + llista que el segueix) */
.ruta h3 {
  margin: 1.4rem 0 .4rem; font-size: 1rem; color: var(--muted);
}
.ruta h3 + ul {
  margin: 0; padding: .8rem 1rem; list-style: none;
  border: 1px dashed var(--border-fort); border-radius: var(--radi-s);
  background: color-mix(in srgb, var(--surface) 60%, transparent);
}
.ruta h3 + ul li { margin: .25rem 0; }

/* Vista alumnat: fora la graella de material, el «comença aquí» de la
   portada i la barra «Tot sobre la SAx» (a Classes). El docent ho veu tot. */
html[data-vista="alumnat"] [data-section="classes"] .material-sa,
html[data-vista="alumnat"] [data-section="classes"] .comenca-aqui.portada-alumnat,
html[data-vista="alumnat"] [data-section="classes"] .sa-fil,
html[data-vista="alumnat"] .sidebar .amagat-alumnat { display: none; }
```

Nota: la caixa alumnat de «Comença aquí» ja porta la classe
`comenca-aqui portada-alumnat` (generada a `subindex_extra`) — no cal tocar-la.

- [ ] **Step 5: Regenerar i comprovar**

Run: `py web/_generador/generar.py`

Run:
```bash
grep -c 'section class="ruta"' web/classes/sa2/index.html   # esperat: 1
grep -c 'material-sa' web/classes/sa2/index.html            # esperat: >=1
grep -c 'section class="ruta"' web/classes/sa0/index.html   # esperat: 0 (SA0 no té itinerari)
```

- [ ] **Step 6: Commit**

```bash
git add web/_generador/generar.py web/assets/css/estil.css
git commit -m "Web: seccio .ruta a portades de SA + poda de la vista alumnat (CSS)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: README de SA2 — ruta amb àncores (pilot)

**Files:**
- Modify: `Classes/SA2/README.md` (secció «Itinerari per sessions»)

**Interfaces:**
- Consumes: àncores de la fitxa generada (`web/classes/sa2/sa2-fitxa-alumnat.html`): `#1-led-basic-i-variables-s1`, `#2-semafor-s2`, `#3-pwm-intensitat-i-color-s3`, `#4-producte-panell-de-senyalitzacio-s4`.
- Produces: el patró de ruta que les Tasks 5-6 repliquen a la resta de SA.

- [ ] **Step 1: Reescriure la secció**

Substituir la secció «## Itinerari per sessions» sencera de
`Classes/SA2/README.md` (des del `## Itinerari…` fins just abans de
`<!-- web:only-github -->`) per:

```markdown
## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA2_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment.

1. **Sessió 1 · Variables i la primera sortida** — fes l'[Activitat 1 de la fitxa](SA2_fitxa_alumnat.md#1-led-basic-i-variables-s1).
2. **Sessió 2 · El semàfor** — fes l'[Activitat 2](SA2_fitxa_alumnat.md#2-semafor-s2), amb l'[esquema del circuit](SA2_esquemes_connexions.md).
3. **Sessió 3 · PWM: intensitat i color** — fes l'[Activitat 3](SA2_fitxa_alumnat.md#3-pwm-intensitat-i-color-s3), amb el [codi](codi/).
4. **Sessió 4 · Producte: panell de senyalització** — fes l'[Activitat 4](SA2_fitxa_alumnat.md#4-producte-panell-de-senyalitzacio-s4) (s'avalua amb R1 codi + R2 circuit).
5. **Abans d'entregar** — repassa [el meu checklist](SA2_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA2_fitxa_ampliada.md) — aprofundiment i ampliacions.
- [Qüestionari de conceptes](SA2_questionari_conceptes.md) — per repassar.
- [Reptes de la SA2](../../Reptes/Reptes_SA2.md) — tria el teu context.
```

- [ ] **Step 2: Regenerar i verificar al navegador**

Run: `py web/_generador/generar.py`

Servir `web/` (`python -m http.server 8740` des de `web/`) i obrir
`http://localhost:8740/classes/sa2/index.html`:
- Vista alumnat (per defecte): títol + intro + **ruta amb passos numerats** +
  capsa «Si vols més» + pager. Sense graella de material, sense «Comença
  aquí», sense barra «Tot sobre la SA2».
- Clicar el pas 2 → ha d'aterrar a l'àncora `#2-semafor-s2` de la fitxa.
- Canviar a vista **docent** (botó 🎓/👩‍🏫): la graella «Tot el material», el
  «Comença aquí» docent i la barra tornen a ser-hi.

- [ ] **Step 3: Commit**

```bash
git add Classes/SA2/README.md
git commit -m "Aula: ruta d'alumnat amb ancores a la portada de SA2 (pilot)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: README de SA1, SA3, SA4 — ruta amb àncores

**Files:**
- Modify: `Classes/SA1/README.md`, `Classes/SA3/README.md`, `Classes/SA4/README.md`

**Interfaces:**
- Consumes: patró de Task 4. Les àncores reals s'extreuen amb:
  `grep -oE '<h3 id="[^"]+"' web/classes/saN/saN-fitxa-alumnat.html`
  (executar per a cada SA abans d'escriure els enllaços; el format és
  `#N-titol-slugificat`).

- [ ] **Step 1: Extreure àncores**

Run:
```bash
for n in 1 3 4; do echo "== SA$n =="; grep -oE '<h3 id="[^"]+"' web/classes/sa$n/sa$n-fitxa-alumnat.html; done
```

- [ ] **Step 2: SA1** — substituir la secció «## Itinerari de la SA (per sessions)» sencera (el format actual amb paràgrafs 🟦 es converteix en llista `1.`) per:

```markdown
## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA1_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment.

1. **Sessió 1 · Què és un robot?** — fes l'[Activitat 1 de la fitxa](SA1_fitxa_alumnat.md#ANCORA-ACT1) i respon la [prova diagnòstica](SA1_prova_diagnostica.md) (no qualifica).
2. **Sessió 2 · La placa i la seguretat** — fes l'[Activitat 2](SA1_fitxa_alumnat.md#ANCORA-ACT2) amb els [esquemes de la placa](SA1_esquemes_connexions.md), i llegeix i signa les [normes de seguretat](SA1_normes_seguretat.md) ([Activitat 3](SA1_fitxa_alumnat.md#ANCORA-ACT3)).
3. **Sessió 3 · El teu primer programa** — fes l'[Activitat 4](SA1_fitxa_alumnat.md#ANCORA-ACT4) amb el [codi](codi/), i comença la [fitxa-pòster](SA1_poster_robot_plantilla.md) (el producte de la SA).
4. **Abans d'entregar** — repassa [el meu checklist](SA1_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA1_fitxa_ampliada.md) — rols, coavaluació, ODS i ampliacions.
- [Qüestionari de conceptes](SA1_questionari_conceptes.md) — per repassar.
- [Reptes de la SA1](../../Reptes/Reptes_SA1.md) — tria el teu context.
```

(substituir cada `ANCORA-ACTn` per l'id real del Step 1).

- [ ] **Step 3: SA3** — mateix patró amb les seves 4 sessions (entrades digitals · analògiques · ultrasons+funcions · producte alarma/aparcament), esquemes a la sessió que munta circuit, codi a la S3, checklist final, «Si vols més» amb ampliada + `../../Reptes/Reptes_SA3.md` (SA3 no té qüestionari).

- [ ] **Step 4: SA4** — mateix patró (servo · pont H · sensor→moviment · producte barrera), amb l'avís dels pins si cal, «Si vols més» amb ampliada + `Reptes_SA4.md`.

- [ ] **Step 5: Regenerar, comprovar, commit**

Run: `py web/_generador/generar.py` i
```bash
for n in 1 3 4; do grep -c 'section class="ruta"' web/classes/sa$n/index.html; done
```
Expected: `1` a cadascuna.

```bash
git add Classes/SA1/README.md Classes/SA3/README.md Classes/SA4/README.md
git commit -m "Aula: ruta d'alumnat a SA1, SA3 i SA4

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: README de SA5-SA9 — ruta amb àncores

**Files:**
- Modify: `Classes/SA5..SA9/README.md`

**Interfaces:**
- Consumes: patró de Task 4; àncores per `grep` com a Task 5.

- [ ] **Step 1: Extreure àncores** (`for n in 5 6 7 8 9; do …` com a Task 5).

- [ ] **Step 2: Reescriure cada itinerari** amb el patró:
  - **SA5** (3 sessions: MicroPython · sensors integrats · ràdio+comparativa); suport: `SA5_connexions.md` a la S1; «Si vols més»: ampliada + `Reptes_SA5.md`.
  - **SA6** (4 sessions: llaç · histèresi · màquina d'estats · proporcional); esquemes a la S2; «Si vols més»: ampliada + `Reptes_SA6.md`.
  - **SA7** (4 sessions: cinemàtica · trajectòries · obstacles · línia+pista); mantenir l'avís del bloc `// === PINS (AJUSTAR) ===` dins del pas 1; esquemes a la S3; «Si vols més»: ampliada + `Reptes_SA7.md` + `SA7_recursos_video_ia.md`.
  - **SA8** (3 sessions: telemetria · IoT · IA); connexions a la S1; «Si vols més»: ampliada + `Reptes_SA8.md` + `SA8_practica_teachable_machine.md` *(atenció: la pràctica de Teachable Machine s'enllaça DINS del pas 3 — és part de l'activitat — i no cal repetir-la a «Si vols més»)*.
  - **SA9** (5 fases, ja en llista): adaptar els enllaços perquè apuntin a les seccions de la fitxa (`#3-disseny`, `#4-planificacio`, `#5-proves-i-iteracions`, `#6-defensa-s5` — comprovar ids reals) i afegir pas final de checklist d'equip; «Si vols més»: ampliada + banc de reptes (ja enllaçat al pas 1, no repetir).
- Checklist final a totes.

- [ ] **Step 3: Regenerar, comprovar, commit**

```bash
for n in 5 6 7 8 9; do grep -c 'section class="ruta"' web/classes/sa$n/index.html; done
```
Expected: `1` a cadascuna.

```bash
git add Classes/SA5/README.md Classes/SA6/README.md Classes/SA7/README.md Classes/SA8/README.md Classes/SA9/README.md
git commit -m "Aula: ruta d'alumnat a SA5-SA9 (totes les SA amb ruta)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: verificació final al navegador (les dues vistes)

**Files:** cap (verificació).

- [ ] **Step 1: Regenerar net**

Run: `py web/_generador/generar.py` — sense errors.

- [ ] **Step 2: Vista alumnat** (navegador, `http.server` des de `web/`):
- `classes/sa1/index.html`, `classes/sa2/index.html`, `classes/sa9/index.html`:
  només títol + intro + ruta + «Si vols més» + pager. Passos amb número i
  color de trimestre.
- Des de la fitxa de SA2: pager Següent = Esquemes (mai ampliada).
- Sidebar SA2: Presentació · Fitxa base · Esquemes · El meu checklist · Codi
  (ampliada i qüestionari no visibles).
- Entrar a la fitxa ampliada des de «Si vols més»: la pàgina s'obre i el seu
  ítem del sidebar es veu (excepció de pàgina actual).

- [ ] **Step 3: Vista docent** (botó de la topbar):
- La portada recupera «Comença aquí» docent, graella «Tot el material» i
  barra «Tot sobre la SAx». Sidebar complet. Pager docent passa per tots els
  documents.

- [ ] **Step 4: Criteris de l'spec** — repassar la llista «Criteris d'èxit» de
`docs/superpowers/specs/2026-07-10-ruta-alumnat-sa-design.md` i marcar-los.

- [ ] **Step 5: Push** (l'usuari va autoritzar push en aquesta feina; confirmar-ho si el context ha canviat):

```bash
git push origin main
```
