# Millores d'usabilitat del web (vistes Docent/Alumnat) — Pla d'implementació

> **For agentic workers:** Aquest pla s'executa tasca a tasca. Els passos usen `- [ ]`. Com que el projecte no té tests unitaris, el cicle de cada tasca és **implementar → regenerar (`py web/_generador/generar.py`) → verificar (grep/navegador) → commit**.

**Goal:** Fer el web navegable per als dos públics amb un commutador Docent/Alumnat que filtra tot el web, una portada per vista i un bloc "Comença aquí" per SA.

**Architecture:** Tot es resol a `web/_generador/generar.py` marcant cada pàgina i enllaç amb un públic (`data-public`), i a `estil.css`/`lloc.js` amb un atribut `data-vista` a `<html>` (com el tema fosc) que amaga els elements `.nomes-docent`. El web segueix estàtic i reproduïble; cap dependència nova.

**Tech Stack:** Python 3 (markdown, pygments), CSS, JS vanilla. Generador: `web/_generador/generar.py`. Estils: `web/assets/css/estil.css`. Script: `web/assets/js/lloc.js`.

## Global Constraints

- Idioma de tota la interfície: **català**.
- Sense dependències noves; web estàtic i **build reproduïble** (no trencar `build_date()` ni el flux CI).
- Vista per defecte: **`alumnat`**. Persistència a `localStorage['vista']`.
- Filtre via CSS: `html[data-vista="alumnat"] .nomes-docent{display:none}`. Res de lògica de servidor.
- La **portada** (`index.html`) és l'excepció: no amaga res.
- Normes de seguretat i prova diagnòstica (SA1) → públic **alumnat**.
- Regenerar sempre amb `py web/_generador/generar.py` des de l'arrel del repo.

---

### Task 0: Branca de treball

- [ ] **Step 1:** Crear branca des de `main`.

```bash
cd "C:/Users/briera2/Documents/Curs 2627 1 Batx Robotica"
git checkout main && git checkout -b web-vistes-usabilitat
```

- [ ] **Step 2:** Confirmar arrencada del servidor local per verificar (si no corre ja):

```bash
cd "C:/Users/briera2/Documents/Curs 2627 1 Batx Robotica/web" && py -m http.server 8765 --bind 127.0.0.1
```

---

### Task 1: Model `data-public` al generador

**Files:**
- Modify: `web/_generador/generar.py` — classe `Page` (~270), `discover()` (~297), `add_code_group()` (~334), bloc de simulacions (~364).

**Interfaces:**
- Produces: `Page.public` (`"docent"|"alumnat"`); funció `classify_public(section_key, src) -> str`; clau `"public"` a cada dict de `code_groups` i `sim_groups`.

- [ ] **Step 1:** Afegir `public` al constructor de `Page`.

```python
class Page:
    def __init__(self, src, section, out_rel, title,
                 trimester=None, kind="doc", public="alumnat"):
        ...
        self.public = public
```

- [ ] **Step 2:** Afegir la funció de classificació (a prop de `is_activitat`, ~182).

```python
# Seccions senceres que són material del docent
DOCENT_SECTIONS = {"programacio", "normativa", "avaluacio", "recursos"}
# Fitxers de Classes que són del docent (per patró de nom)
DOCENT_NAME_HINTS = ("_guia_docent", "_checklist_docent")
# 00-general: material transversal visible a l'alumnat (la resta, docent)
GENERAL_ALUMNAT = {
    "00_Targetes_rescat.md", "00_Glossari_tecnic.md",
    "00_Avaluacio_per_alumnat.md", "00_Fitxes_referencia_tecnica.md",
    "00_Plantilla_disseny_objecte.md", "00_Galeria_exemples_objectes.md",
    "00_Poster_IA_us_assistents.md",
}

def classify_public(section_key: str, src: Path) -> str:
    """Retorna 'docent' o 'alumnat' per a una pàgina font."""
    if section_key in DOCENT_SECTIONS:
        return "docent"
    name = src.name
    parts = src.parts
    # Solucionari de reptes -> docent
    if section_key == "reptes" and "Solucionari" in parts:
        return "docent"
    # Material transversal 00-general
    if "00_General" in parts:
        return "alumnat" if name in GENERAL_ALUMNAT else "docent"
    # Classes per patró de nom
    if any(h in name.lower() for h in DOCENT_NAME_HINTS):
        return "docent"
    return "alumnat"
```

- [ ] **Step 3:** Assignar `public` en descobrir pàgines de secció (`discover()`, dins el bucle `for md_path in ...`).

```python
public = classify_public(sec["key"], md_path)
pages.append(Page(md_path, sec["key"], out_rel, title, tri, kind, public))
```

- [ ] **Step 4:** Propagar a codi i simulacions. A `add_code_group()` afegir `"public"` al dict i a la `Page` de codi (el codi és sempre visible a l'alumnat **excepte** el solucionari):

```python
pub = "docent" if "Solucionari" in base.parts else "alumnat"
code_groups.append({"label": label, "out_rel": out_rel,
                    "section": section_key, "tri": tri,
                    "items": items, "public": pub})
pages.append(Page(base, section_key, out_rel, label, tri, "code", pub))
```

Al bloc de simulacions, `Page(..., "sim")` → afegir `public="alumnat"`.

- [ ] **Step 5:** Verificar la classificació amb un one-liner.

```bash
cd "C:/Users/briera2/Documents/Curs 2627 1 Batx Robotica"
py -c "import sys; sys.path.insert(0,'web/_generador'); import generar as g; ps,*_=g.discover(); \
print({(p.section,p.src.name):p.public for p in ps if 'sa3' in p.out_rel})"
```

Expected: `sa3_guia_docent` i `sa3_checklist_docent` → `docent`; `sa3_fitxa_alumnat`, `sa3_checklist_alumnat`, `sa3_esquemes` → `alumnat`.

- [ ] **Step 6:** Commit.

```bash
git add web/_generador/generar.py
git commit -m "Web: model data-public per classificar material docent/alumnat"
```

---

### Task 2: Commutador de vista (capçal + CSS + JS)

**Files:**
- Modify: `web/_generador/generar.py` — `page_shell()` (~762): script inline del `<head>`, botó al capçal, `data-public` al `<body>`, banner docent.
- Modify: `web/assets/css/estil.css` — regles de vista i commutador.
- Modify: `web/assets/js/lloc.js` — toggle + `localStorage`.

**Interfaces:**
- Produces: atribut `data-vista` a `<html>`; classe CSS `.nomes-docent`; botó `.vista-btn`; body amb `data-public`.

- [ ] **Step 1:** Al script inline del `<head>` de `page_shell()`, afegir la lectura de la vista (dins el `try`):

```javascript
var v=localStorage.getItem('vista')||'alumnat';d.setAttribute('data-vista',v);
```

- [ ] **Step 2:** Al `<body>`, afegir `data-public` de la pàgina. Canviar la línia `<body{accent_attr} class=...>`:

```python
<body{accent_attr} data-public="{public}" class="{has_sidebar} {layout_class}">
```

I afegir el paràmetre `public="alumnat"` a la signatura de `page_shell(...)` i passar-lo des de tots els llocs que la criden (a `main()`, `render_code_page`, `render_sim_page`, home i hubs → passar `p.public`/`group["public"]`, portada `"alumnat"`).

- [ ] **Step 3:** Afegir el botó del commutador al capçal, abans del `tema-btn`:

```python
<button class="vista-btn" aria-label="Canvia entre vista d'alumnat i de docent"
        title="Vista alumnat / docent">
  <span class="vista-ic-alumnat">🎓 Alumnat</span>
  <span class="vista-ic-docent">👩‍🏫 Docent</span>
</button>
```

- [ ] **Step 4:** Afegir el banner de pàgina docent en vista alumnat, a l'inici del `<main>` (just abans de `{print_cap}`):

```python
<div class="avis-docent">📎 Aquesta pàgina és <strong>material per al docent</strong>.</div>
```

- [ ] **Step 5:** CSS a `estil.css` (al final):

```css
/* Vistes docent/alumnat */
.nomes-docent { }                                   /* visible per defecte (docent) */
html[data-vista="alumnat"] .nomes-docent { display: none !important; }
.vista-btn .vista-ic-docent { display: none; }
html[data-vista="docent"] .vista-btn .vista-ic-alumnat { display: none; }
html[data-vista="docent"] .vista-btn .vista-ic-docent { display: inline; }
.avis-docent { display: none; }
html[data-vista="alumnat"] body[data-public="docent"] .avis-docent,
html[data-vista="alumnat"] .avis-docent[data-force] { display: block;
  background: var(--accent-soft); border: 1px solid var(--border-fort);
  border-radius: var(--radi-s); padding: .5rem .8rem; margin-bottom: 1rem;
  font-size: .95em; }
.vista-btn { cursor: pointer; border: 1px solid var(--border-fort);
  background: var(--surface); color: var(--text); border-radius: var(--radi-s);
  padding: .3rem .6rem; font: inherit; }
```

> Nota: el selector `html[...] body[data-public="docent"] .avis-docent` no travessa `html>body`; cal `html[data-vista="alumnat"] body[data-public="docent"] .avis-docent`. Com que `.avis-docent` és dins `body`, funciona: `html[data-vista="alumnat"] body[data-public="docent"] .avis-docent`.

- [ ] **Step 6:** JS a `lloc.js` (afegir dins la inicialització existent):

```javascript
(function(){
  var btn = document.querySelector('.vista-btn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    var d = document.documentElement;
    var nova = d.getAttribute('data-vista') === 'docent' ? 'alumnat' : 'docent';
    d.setAttribute('data-vista', nova);
    try { localStorage.setItem('vista', nova); } catch(e){}
    btn.setAttribute('aria-pressed', nova === 'docent');
  });
})();
```

- [ ] **Step 7:** Regenerar i verificar.

```bash
py web/_generador/generar.py
```

Obrir `http://127.0.0.1:8765/classes/sa3/sa3-guia-docent.html`: en vista alumnat apareix el banner "material per al docent"; el botó del capçal alterna 🎓/👩‍🏫; recàrrega manté la vista.

- [ ] **Step 8:** Commit.

```bash
git add web/_generador/generar.py web/assets/css/estil.css web/assets/js/lloc.js
git commit -m "Web: commutador de vista alumnat/docent (data-vista + localStorage)"
```

---

### Task 3: Filtrar sidebar, fil de SA i topnav

**Files:**
- Modify: `web/_generador/generar.py` — `_link()` (~528), `sidebar_html()` (~534), `sa_fil_html()` (~676), `topnav_html()` (~484).

**Interfaces:**
- Consumes: `Page.public`.
- Produces: enllaços de navegació amb classe `nomes-docent` quan són docents; grups de sidebar sencers amagats si tots els fills són docents.

- [ ] **Step 1:** `_link()` accepta un flag de públic i afegeix la classe al `<li>`:

```python
def _link(href, label, actiu, tri=None, docent=False):
    cls = ' class="actiu"' if actiu else ""
    li_cls = ' class="nomes-docent"' if docent else ""
    dot = f' <span class="tri-dot" data-tri="{tri}"></span>' if tri else ""
    return f'<li{li_cls}><a href="{href}"{cls}>{label}{dot}</a></li>'
```

- [ ] **Step 2:** A `sidebar_html()`, passar `docent=(p.public=="docent")` a cada `_link(...)` de pàgina. Per als grups (SA), si **tots** els fills són docents, marcar el `<details>` amb `nomes-docent`:

```python
grp_docent = all(p.public == "docent" for p in gps)
grp_cls = ' class="sb-grup nomes-docent"' if grp_docent else ' class="sb-grup"'
out.append(f'<details{grp_cls}{open_attr}>{summary}<ul>' + "".join(items) + "</ul></details>")
```

- [ ] **Step 3:** A `sa_fil_html()`, marcar les pastilles docents. Les etiquetes docents són `📘 Programació`, `🔑 Solucionari`, `📝 …Prova…`:

```python
DOCENT_PILLS = ("📘", "🔑", "📝")
for label, out in items:
    dc = ' nomes-docent' if label[:1] in "📘🔑📝" else ''
    if out == current_out:
        pills.append(f'<span class="sa-fil-pill actiu{dc}">{label}</span>')
    else:
        pills.append(f'<a class="sa-fil-pill{dc}" href="{rel_url(current_out, out)}">{label}</a>')
```

- [ ] **Step 4:** A `topnav_html()`, marcar els items docents. Ampliar `TOPNAV_ITEMS` amb un flag i afegir Reptes/Simulacions:

```python
TOPNAV_ITEMS = [
    ("index.html", "Inici", "inici", False),
    ("classes/index.html", "Les 9 SA", "classes", False),
    ("reptes/index.html", "Reptes", "reptes", False),
    ("simulacions/index.html", "Simulacions", "simulacions", False),
    ("programacio/index.html", "Programació", "programacio", True),
    ("avaluacio/index.html", "Avaluació", "avaluacio", True),
    ("recursos/index.html", "Recursos", "recursos", True),
]
```

I al bucle de `topnav_html()`:

```python
for href, label, key, docent in TOPNAV_ITEMS:
    cls = ' actiu' if active == key else ''
    dc = ' nomes-docent' if docent else ''
    sec = f' data-sec="{key}"' if key in SECTION_BY_KEY else ''
    items.append(f'<a href="{prefix}{href}"{sec} class="{(cls+dc).strip()}">{label}</a>')
```

(Elimina els hubs `docent.html`/`alumnat.html` del topnav; els substitueix el commutador. `HUB_KEYS` i els renders de hub es poden deixar existint però ja no s'enllacen des del topnav.)

- [ ] **Step 5:** Regenerar i verificar en vista alumnat.

```bash
py web/_generador/generar.py
```

A `sa3/index.html` (vista alumnat): el sidebar NO mostra "Guia docent" ni "Checklist docent"; el fil de la SA no mostra "🔑 Solucionari" ni "📝 Prova"; el topnav no mostra Programació/Avaluació/Recursos. En vista docent reapareixen.

- [ ] **Step 6:** Commit.

```bash
git add web/_generador/generar.py
git commit -m "Web: filtrar sidebar, fil de SA i menú superior per vista"
```

---

### Task 4: Paginador per vista

**Files:**
- Modify: `web/_generador/generar.py` — `build_sequences()` (~707) i el punt on s'insereix el pager a `main()` (~1509).

**Interfaces:**
- Produces: `pager_map[out_rel]` amb DOS blocs `.pager` (un complet `data-vista-pager="docent"`, un només-alumnat `data-vista-pager="alumnat"`); CSS mostra el que correspon.

- [ ] **Step 1:** A `build_sequences()`, generar dues variants de cada seqüència: la completa i la filtrada a `public=="alumnat"`. Embolcallar cada `.pager` amb la classe de vista:

```python
def _wrap(pager_html, vista):
    return pager_html.replace('<nav class="pager"',
                              f'<nav class="pager" data-pager-vista="{vista}"', 1)
```

Construir `pager_map` amb la concatenació dels dos (complet marcat `docent`, filtrat marcat `alumnat`). Per a seccions sense material docent (Reptes), les dues variants coincideixen.

- [ ] **Step 2:** CSS a `estil.css`:

```css
.pager[data-pager-vista="alumnat"] { display: none; }
html[data-vista="alumnat"] .pager[data-pager-vista="docent"] { display: none; }
html[data-vista="alumnat"] .pager[data-pager-vista="alumnat"] { display: grid; }
```

- [ ] **Step 3:** Regenerar i verificar: a `sa3/sa3-fitxa-alumnat.html` en vista alumnat, "Anterior/Següent" no porta a la guia docent ni al checklist docent, i el comptador reflecteix només material d'alumnat.

- [ ] **Step 4:** Commit.

```bash
git add web/_generador/generar.py web/assets/css/estil.css
git commit -m "Web: paginador d'itinerari filtrat per vista"
```

---

### Task 5: Cerca filtrada per públic

**Files:**
- Modify: `web/_generador/generar.py` — `main()`, entrades de `search_index` (~1522, 1536, 1545) i inserts (~1555).
- Modify: `web/assets/js/cerca-index.js` (generat) via el codi que el produeix, i el filtre a `lloc.js` (cercador).

**Interfaces:**
- Produces: cada entrada de `search_index` amb clau `"p"` (`"docent"|"alumnat"`); el cercador descarta entrades docents si `data-vista=="alumnat"`.

- [ ] **Step 1:** Afegir `"p": p.public` (o `g["public"]`) a cada `search_index.append(...)`. Als tres `insert` fixos (Inici/Docent/Alumnat) → Inici `"p":"alumnat"`; l'entrada del hub docent es pot ometre o marcar `"docent"`.

- [ ] **Step 2:** Al codi del cercador (a `lloc.js`, funció que filtra `window.INDEX_CERCA`), descartar resultats docents en vista alumnat:

```javascript
var vista = document.documentElement.getAttribute('data-vista') || 'alumnat';
var resultats = window.INDEX_CERCA.filter(function(e){
  if (vista === 'alumnat' && e.p === 'docent') return false;
  return /* coincidència de text existent */;
});
```

- [ ] **Step 3:** Regenerar i verificar: en vista alumnat, cercar "guia docent" o "solucionari" no retorna aquestes pàgines; en vista docent, sí.

- [ ] **Step 4:** Commit.

```bash
git add web/_generador/generar.py web/assets/js/lloc.js
git commit -m "Web: cerca filtrada segons la vista activa"
```

---

### Task 6: Portada per vista

**Files:**
- Modify: `web/_generador/generar.py` — `render_home()` (~1201).

**Interfaces:**
- Produces: `index.html` amb `<div class="portada-alumnat">…</div>` i `<div class="portada-docent nomes-docent">…</div>`.

- [ ] **Step 1:** Reorganitzar `render_home()` en dos blocs. El bloc alumnat (hero curt + "Què vols fer?" amb 3 targetes: Les 9 SA / Simulacions-Reptes / Targetes de rescat + Glossari + graella de 9 SA). El bloc docent (`nomes-docent`) amb l'actual "Per on començo?" + apartats. Codi del bloc alumnat:

```python
alumnat_block = f"""
<div class="portada-alumnat">
<section class="hero">
  <p class="hero-kicker">// Robòtica · 1r de Batxillerat</p>
  <h1 class="hero-titol">La teva Robòtica</h1>
  <p class="hero-lead">Tot el material per treballar les 9 situacions d'aprenentatge.</p>
</section>
<h2 class="seccio-sep">Què vols fer?</h2>
<div class="ruta-grid">
  <div class="ruta-card"><p class="ruta-tit">📅 Treballar la SA de la setmana</p>
    <p><a href="classes/index.html">Entra a les 9 SA →</a></p></div>
  <div class="ruta-card"><p class="ruta-tit">🔌 Practicar a casa</p>
    <p><a href="simulacions/index.html">Simulacions</a> · <a href="reptes/index.html">Reptes</a></p></div>
  <div class="ruta-card"><p class="ruta-tit">🆘 M'he encallat</p>
    <p><a href="{u_targ}">Targetes de rescat</a> · <a href="{u_glos}">Glossari</a></p></div>
</div>
{sa_grid_html(pages)}
</div>
"""
```

El bloc docent embolcalla el contingut actual (`rutes` + SA + apartats) en `<div class="portada-docent nomes-docent">…</div>`.

- [ ] **Step 2:** Regenerar i verificar: en vista alumnat la portada mostra "Què vols fer?" i les 9 SA, sense la graella d'apartats; en vista docent, la portada completa.

- [ ] **Step 3:** Commit.

```bash
git add web/_generador/generar.py
git commit -m "Web: portada adaptada a la vista (alumnat neta / docent completa)"
```

---

### Task 7: "Comença aquí" per SA

**Files:**
- Modify: `web/_generador/generar.py` — `subindex_extra()` (~1093).

**Interfaces:**
- Produces: bloc `▶ Comença aquí` amb variant alumnat i variant docent (`nomes-docent`) al capdamunt de l'índex de cada SA.

- [ ] **Step 1:** A `subindex_extra()`, abans de la llista completa, afegir el bloc destacat. Localitzar dins `gps` les pàgines per rol:

```python
def _find(gps, *subs):
    for p in gps:
        if any(s in p.out_rel.lower() for s in subs):
            return p
    return None
fitxa = _find(gps, "fitxa-alumnat")
guia = _find(gps, "guia-docent", "guia-programacio")
codi = next((p for p in gps if p.kind == "code"), None)
start = []
if fitxa or codi:
    cards_al = "".join(doc_card(rel_url(current_out, p.out_rel), t, p.kind)
                       for p, t in [(fitxa, "Fitxa base"), (codi, "Codi")] if p)
    start.append(f'<div class="comenca-aqui portada-alumnat"><p class="ca-tit">▶ Comença aquí</p>'
                 f'<div class="card-grid">{cards_al}</div></div>')
if guia or fitxa:
    cards_do = "".join(doc_card(rel_url(current_out, p.out_rel), t, p.kind)
                       for p, t in [(guia, "Guia docent"), (fitxa, "Fitxa base")] if p)
    start.append(f'<div class="comenca-aqui nomes-docent"><p class="ca-tit">▶ Comença aquí</p>'
                 f'<div class="card-grid">{cards_do}</div></div>')
```

Anteposar `"".join(start)` al return, i canviar el títol de la llista completa a "Tot el material de la SA".

- [ ] **Step 2:** CSS mínim a `estil.css`:

```css
.comenca-aqui { background: var(--accent-soft); border-radius: var(--radi);
  padding: .8rem 1rem; margin: 1rem 0; }
.comenca-aqui .ca-tit { font-weight: 700; margin: 0 0 .5rem; }
.comenca-aqui.portada-alumnat { display: block; }
html[data-vista="docent"] .comenca-aqui.portada-alumnat { display: none; }
```

- [ ] **Step 3:** Regenerar i verificar a `sa3/index.html`: apareix "▶ Comença aquí" amb Fitxa base + Codi (alumnat) o Guia docent + Fitxa base (docent segons vista).

- [ ] **Step 4:** Commit.

```bash
git add web/_generador/generar.py web/assets/css/estil.css
git commit -m "Web: bloc «Comença aquí» per SA segons la vista"
```

---

### Task 8: Quick wins (ordre, etiquetes, jerga .md)

**Files:**
- Modify: `web/_generador/generar.py` — `sidebar_html()` (ordre), nova `short_label()`, `rewrite_links()` (~395).

- [ ] **Step 1:** **Ordre únic**: a `sidebar_html()`, canviar l'ordenació dels fills d'un grup perquè usi `doc_ordre` en lloc de l'alfabètic:

```python
gps.sort(key=lambda p: (p.kind == "index" and 0 or 1, doc_ordre(p)))
```

(la Presentació primer; la resta en ordre pedagògic).

- [ ] **Step 2:** **Etiquetes curtes**: nova funció i usar-la per a l'`html.escape(p.title)` del sidebar:

```python
def short_label(title: str) -> str:
    for sep in (" — ", " · *", "  ·  "):
        if sep in title:
            return title.split(sep)[0].strip()
    return title
```

Al sidebar: `_link(..., html.escape(short_label(p.title)), ...)`.

- [ ] **Step 3:** **Fora noms `.md`**: a `rewrite_links()`, quan el text visible de l'enllaç acaba en `.md` i el destí és una pàgina coneguda, substituir-lo pel títol. Dins `repl_href`, quan es resol a una pàgina interna, comprovar el text del `<a>`. *(Implementació: capturar el text de l'enllaç requereix processar `<a ...>TEXT</a>`; fer-ho amb una segona passada regex sobre `>([^<]+\.md)</a>` mapejant nom→títol via `md_title_map`.)*

```python
# a main(), abans de generar: md_title_map = {Path(k).name: t for ...}
# dins rewrite_links, després de reescriure hrefs:
def repl_mdtext(m):
    nom = m.group(1)
    return ">" + md_title_map.get(nom, nom) + "</a>"
html_body = re.sub(r'>([^<>]+\.md)</a>', repl_mdtext, html_body)
```

Passar `md_title_map` com a paràmetre de `rewrite_links`.

- [ ] **Step 4:** Regenerar i verificar: sidebar de SA3 en ordre Presentació → Guia → Fitxa base → Fitxa ampliada → Checklists → Esquemes → Codi; etiquetes curtes; la taula "Contingut" i "Vols més?" ja no mostren `SAx_*.md` sinó títols.

- [ ] **Step 5:** Commit.

```bash
git add web/_generador/generar.py
git commit -m "Web: ordre únic al sidebar, etiquetes curtes i fora noms .md a la vista"
```

---

### Task 9: Verificació completa, memòria i sincronització

**Files:**
- Create: `Memòria treball/2026-07-09_Implementacio_web_vistes.md`

- [ ] **Step 1:** Regenerar net i comprovar que no hi ha errors ni caiguda de pàgines:

```bash
py web/_generador/generar.py
```

- [ ] **Step 2:** Recórrer la llista de verificació de l'spec al navegador (vista alumnat i docent): topnav, sidebar/fil/paginador a SA3, cerca, banner de pàgina docent, portada per vista, "Comença aquí". Anotar resultats.

- [ ] **Step 3:** Escriure la memòria de treball datada de la implementació (què s'ha fet, resultat, verificació).

- [ ] **Step 4:** Commit final i fusió a `main` + push (previ vistiplau del docent per publicar).

```bash
git add "Memòria treball/2026-07-09_Implementacio_web_vistes.md"
git commit -m "Aula: memòria de la implementació de vistes al web"
git checkout main && git merge --ff-only web-vistes-usabilitat && git push origin main
```

---

## Self-review (cobertura de l'spec)

- Model `data-public` → Task 1. ✓
- Commutador + persistència + banner → Task 2. ✓
- Filtre topnav/sidebar/fil → Task 3. ✓
- Paginador per vista → Task 4. ✓
- Cerca filtrada → Task 5. ✓
- Portada per vista → Task 6. ✓
- "Comença aquí" per SA → Task 7. ✓
- Quick wins (ordre, etiquetes, .md) → Task 8. ✓
- Verificació + memòria + sync → Task 9. ✓

Sense placeholders de contingut; noms de funció coherents (`classify_public`, `short_label`, `data-vista`, `nomes-docent`) entre tasques.
