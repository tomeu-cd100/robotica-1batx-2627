# -*- coding: utf-8 -*-
"""
Generador del web de Robòtica · 1r de Batxillerat.

Converteix tot el material .md del repositori en un lloc web estàtic
autocontingut (carpeta web/), amb enllaços interns reescrits, navegació
per seccions, distintius de trimestre, pàgines de codi per SA i cercador.

Ús:
    py web/_generador/generar.py

Dependències: markdown, pygments  ->  py -m pip install markdown pygments
"""
from __future__ import annotations

import html
import json
import re
import shutil
import unicodedata
import urllib.parse
from datetime import date
from pathlib import Path

import markdown
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name

# ---------------------------------------------------------------------------
# Rutes base
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent          # web/_generador
WEB = SCRIPT_DIR.parent                                # web
ROOT = WEB.parent                                      # arrel del repositori
ASSETS = WEB / "assets"
IMG_OUT = ASSETS / "img"

SITE_TITLE = "Robòtica · 1r de Batxillerat"
SITE_TAGLINE = "Material docent · LOMLOE Catalunya · curs 2026-2027"
REPO_URL = "https://github.com/tomeu-cd100/robotica-1batx-2627"
BUILD_DATE = date.today().isoformat()

CODE_EXT = {".ino", ".py", ".cpp", ".c", ".h"}
IMG_EXT = {".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"}
DOC_EXT = {".pdf", ".xlsx", ".xls", ".pptx", ".ppt", ".docx", ".doc",
           ".csv", ".odt", ".ods", ".zip"}

# Bases de GitHub per enllaçar/visualitzar documents sense copiar-los al web
REPO_SLUG = "tomeu-cd100/robotica-1batx-2627"
RAW_BASE = f"https://raw.githubusercontent.com/{REPO_SLUG}/main/"
TREE_BASE = f"https://github.com/{REPO_SLUG}/tree/main/"
BLOB_BASE = f"https://github.com/{REPO_SLUG}/blob/main/"

# ---------------------------------------------------------------------------
# Definició de seccions (cada apartat un color)
# ---------------------------------------------------------------------------
SECTIONS = [
    {"key": "programacio", "title": "Programació didàctica", "src": "Programació didàctica",
     "icon": "📘", "desc": "Objectius, sabers, metodologia, avaluació, rúbriques i les 9 SA."},
    {"key": "classes", "title": "Classes", "src": "Classes",
     "icon": "🧑‍🏫", "desc": "Material d'aula per SA: guies, fitxes, esquemes i codi."},
    {"key": "reptes", "title": "Reptes", "src": "Reptes",
     "icon": "🎯", "desc": "Reptes triables per SA amb el seu solucionari."},
    {"key": "avaluacio", "title": "Avaluació", "src": "Avaluació",
     "icon": "📝", "desc": "Proves pràctiques per trimestre i full de qualificació."},
    {"key": "normativa", "title": "Normativa", "src": "Normativa",
     "icon": "⚖️", "desc": "Marc legal LOMLOE i documents oficials."},
    {"key": "simulacions", "title": "Simulacions", "src": "Simulacions/Wokwi",
     "icon": "🔌", "desc": "Circuits Wokwi de pràctiques i reptes: codi i diagrama, reproduïbles."},
    {"key": "recursos", "title": "Recursos", "src": "Recursos",
     "icon": "📚", "desc": "Recursos de professorat en obert i materials de suport."},
]
SECTION_BY_KEY = {s["key"]: s for s in SECTIONS}

# Pàgines especials de l'arrel del repositori
ROOT_PAGES = [
    {"src": "GUIA_INICI_DOCENT.md", "out": "guia-inici.html", "title": "Guia d'inici docent"},
]

TRIMESTRES = {
    1: {"label": "1r trimestre", "sas": [1, 2, 3]},
    2: {"label": "2n trimestre", "sas": [4, 5, 6]},
    3: {"label": "3r trimestre", "sas": [7, 8, 9]},
}
# Etiquetes especials per a subcarpetes que no són SA (clau = slug de la carpeta)
GROUP_LABELS = {
    "00-general": "Material transversal del curs",
}
SA_TITLES = {
    0: "Vocabulari essencial i bases de programació",
    1: "Introducció a la robòtica",
    2: "Sortides digitals i PWM",
    3: "Entrades i sensors",
    4: "Moviment: servos i motors",
    5: "micro:bit i MicroPython",
    6: "Sistemes de control",
    7: "Robòtica mòbil",
    8: "IoT i IA",
    9: "Projecte final",
}


def sa_trimestre(n: int) -> int:
    return 1 if n <= 3 else 2 if n <= 6 else 3


# ---------------------------------------------------------------------------
# Utilitats
# ---------------------------------------------------------------------------
def strip_accents(text: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", text)
                   if not unicodedata.combining(c))


def slugify(text: str) -> str:
    text = strip_accents(text).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "x"


def detect_sa(name: str) -> int | None:
    m = re.search(r"sa\s*([0-9])", name, re.IGNORECASE)
    return int(m.group(1)) if m else None


def first_h1(md_text: str) -> str | None:
    for line in md_text.splitlines():
        s = line.strip()
        if s.startswith("# "):
            return re.sub(r"\s+", " ", s[2:].strip())
    return None


def rel_url(from_out: str, to_out: str) -> str:
    """Ruta relativa (POSIX) entre dues sortides relatives a l'arrel del web."""
    from pathlib import PurePosixPath
    import os
    base = PurePosixPath(from_out).parent
    rel = os.path.relpath(to_out, str(base))
    return rel.replace("\\", "/")


def depth_prefix(out_rel: str) -> str:
    d = out_rel.count("/")
    return "../" * d


# ---------------------------------------------------------------------------
# Markdown
# ---------------------------------------------------------------------------
def make_md() -> markdown.Markdown:
    return markdown.Markdown(extensions=[
        "extra", "toc", "sane_lists", "admonition",
        "codehilite", "attr_list",
    ], extension_configs={
        "toc": {"anchorlink": True, "permalink": False},
        "codehilite": {"guess_lang": False, "css_class": "highlight"},
    })


# ---------------------------------------------------------------------------
# Descobriment de pàgines
# ---------------------------------------------------------------------------
class Page:
    def __init__(self, src: Path, section: str, out_rel: str, title: str,
                 trimester: int | None = None, kind: str = "doc"):
        self.src = src
        self.section = section
        self.out_rel = out_rel
        self.title = title
        self.trimester = trimester
        self.kind = kind  # doc | index | code | special


def out_for_md(section_key: str, src: Path, src_dir: Path) -> str:
    """Calcula la ruta de sortida (relativa a web/) per a un .md d'una secció."""
    rel = src.relative_to(src_dir)
    parts = list(rel.parts)
    fname = parts[-1]
    is_readme = fname.lower() == "readme.md"
    sub = [slugify(p) for p in parts[:-1]]
    if is_readme:
        # README d'una carpeta -> index.html d'aquesta carpeta
        path = "/".join([section_key] + sub + ["index.html"])
    else:
        slug = slugify(fname[:-3])  # treu .md
        path = "/".join([section_key] + sub + [slug + ".html"])
    return path


def discover() -> tuple[list[Page], dict, dict, list[dict]]:
    """Retorna (pàgines, mapa_md_src->out, mapa_codi_src->(out,anchor), grups_codi)."""
    pages: list[Page] = []
    md_map: dict[str, str] = {}
    code_map: dict[str, tuple[str, str]] = {}
    code_groups: list[dict] = []

    # Pàgines de seccions
    for sec in SECTIONS:
        src_dir = ROOT / sec["src"]
        if not src_dir.exists():
            continue
        for md_path in sorted(src_dir.rglob("*.md")):
            out_rel = out_for_md(sec["key"], md_path, src_dir)
            text = md_path.read_text(encoding="utf-8")
            title = first_h1(text) or md_path.stem
            sa = detect_sa(md_path.name) or detect_sa(str(md_path.relative_to(src_dir)))
            tri = sa_trimestre(sa) if sa else None
            kind = "index" if md_path.name.lower() == "readme.md" else "doc"
            pages.append(Page(md_path, sec["key"], out_rel, title, tri, kind))
            md_map[str(md_path.resolve())] = out_rel

    # Pàgines especials de l'arrel
    for rp in ROOT_PAGES:
        src = ROOT / rp["src"]
        if src.exists():
            pages.append(Page(src, "inici", rp["out"], rp["title"], None, "special"))
            md_map[str(src.resolve())] = rp["out"]
    md_map[str((ROOT / "README.md").resolve())] = "index.html"

    # Grups de codi: Classes/SAx i Reptes/Solucionari/SAx
    def add_code_group(label: str, base: Path, out_rel: str, section_key: str,
                       tri: int | None):
        files = sorted([p for p in base.rglob("*") if p.suffix.lower() in CODE_EXT])
        if not files:
            return
        items = []
        for f in files:
            rel = f.relative_to(base)
            anchor = slugify(str(rel.with_suffix("")))
            items.append({"path": f, "rel": str(rel).replace("\\", "/"), "anchor": anchor})
            code_map[str(f.resolve())] = (out_rel, anchor)
        code_groups.append({"label": label, "out_rel": out_rel,
                            "section": section_key, "tri": tri, "items": items})
        pages.append(Page(base, section_key, out_rel, label, tri, "code"))

    classes_dir = ROOT / "Classes"
    for sa in range(1, 10):
        d = classes_dir / f"SA{sa}"
        if d.exists():
            add_code_group(f"Codi · SA{sa}", d, f"classes/sa{sa}/codi.html",
                           "classes", sa_trimestre(sa))
    sol_dir = ROOT / "Reptes" / "Solucionari"
    for sa in range(1, 10):
        d = sol_dir / f"SA{sa}"
        if d.exists():
            add_code_group(f"Codi solucionari reptes · SA{sa}", d,
                           f"reptes/solucionari/sa{sa}/codi.html", "reptes",
                           sa_trimestre(sa))

    # Simulacions Wokwi: una pàgina per projecte (carpeta amb sketch + diagram)
    sim_groups: list[dict] = []
    sim_map: dict[str, str] = {}
    sim_dir = ROOT / "Simulacions" / "Wokwi"
    if sim_dir.exists():
        for folder in sorted([p for p in sim_dir.rglob("*") if p.is_dir()]):
            files = sorted([f for f in folder.iterdir() if f.is_file()
                            and (f.suffix.lower() in CODE_EXT
                                 or f.suffix.lower() in {".json", ".txt"})])
            if not any(f.suffix.lower() in {".ino", ".py"} or f.name == "diagram.json"
                       for f in files):
                continue
            rel = folder.relative_to(sim_dir)
            is_repte = rel.parts[0].lower() == "reptes"
            sub = "reptes" if is_repte else "practiques"
            out_rel = f"simulacions/{sub}/{slugify(folder.name)}.html"
            sa = detect_sa(folder.name)
            tri = sa_trimestre(sa) if sa else None
            title = folder.name.replace("_", " ")
            sim_groups.append({"out_rel": out_rel, "folder": folder, "files": files,
                               "title": title, "tri": tri, "is_repte": is_repte})
            pages.append(Page(folder, "simulacions", out_rel, title, tri, "sim"))
            sim_map[str(folder.resolve())] = out_rel
            for f in files:
                sim_map[str(f.resolve())] = out_rel

    return pages, md_map, code_map, code_groups, sim_groups, sim_map


# ---------------------------------------------------------------------------
# Reescriptura d'enllaços dins l'HTML generat
# ---------------------------------------------------------------------------
def rewrite_links(html_body: str, src_file: Path, out_rel: str,
                  md_map: dict, code_map: dict, sim_map: dict, copied_imgs: dict) -> str:
    prefix = depth_prefix(out_rel)
    src_dir = src_file.parent if src_file.is_file() else src_file

    def resolve(href: str) -> str | None:
        raw = urllib.parse.unquote(href.split("#")[0].split("?")[0])
        frag = ""
        if "#" in href:
            frag = "#" + href.split("#", 1)[1]
        if not raw:
            return href  # només àncora
        target = (src_dir / raw).resolve()
        key = str(target)
        if key in md_map:
            return rel_url(out_rel, md_map[key]) + frag
        if key in code_map:
            page, anchor = code_map[key]
            return rel_url(out_rel, page) + "#" + anchor
        if key in sim_map:
            return rel_url(out_rel, sim_map[key]) + frag
        # Carpeta -> index.html d'aquesta carpeta?
        readme = target / "README.md"
        if str(readme.resolve()) in md_map:
            return rel_url(out_rel, md_map[str(readme.resolve())]) + frag
        # Imatge -> copiar a assets/img
        if target.suffix.lower() in IMG_EXT and target.exists():
            name = copy_image(target, copied_imgs)
            return prefix + "assets/img/" + name + frag
        # .md NO convertit a pàgina -> enllaç al fitxer original a GitHub
        if target.suffix.lower() == ".md" and target.exists():
            try:
                relpath = target.relative_to(ROOT.resolve())
                return BLOB_BASE + urllib.parse.quote(str(relpath).replace("\\", "/")) + frag
            except ValueError:
                pass
        # Document (pdf, full de càlcul…) -> enllaç a GitHub
        if target.suffix.lower() in DOC_EXT and target.exists():
            try:
                relpath = target.relative_to(ROOT.resolve())
                return BLOB_BASE + urllib.parse.quote(str(relpath).replace("\\", "/"))
            except ValueError:
                pass
        return None

    def repl_href(m):
        href = m.group(2)
        if href.startswith(("http://", "https://", "mailto:", "#", "tel:")):
            extra = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
            return f'{m.group(1)}="{href}"{extra}'
        new = resolve(href)
        if new and new.startswith("http"):
            return f'{m.group(1)}="{new}" target="_blank" rel="noopener"'
        return f'{m.group(1)}="{new if new else href}"'

    html_body = re.sub(r'(href)="([^"]+)"', repl_href, html_body)

    def repl_src(m):
        src = m.group(1)
        if src.startswith(("http://", "https://", "data:")):
            return m.group(0)
        new = resolve(src)
        return f'src="{new if new else src}"' if new else m.group(0)

    html_body = re.sub(r'src="([^"]+)"', repl_src, html_body)
    return html_body


def copy_image(src: Path, copied: dict) -> str:
    key = str(src.resolve())
    if key in copied:
        return copied[key]
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    name = slugify(src.stem) + src.suffix.lower()
    # evita col·lisions
    dest = IMG_OUT / name
    i = 1
    while dest.exists() and str(dest.resolve()) not in copied.values():
        name = f"{slugify(src.stem)}-{i}{src.suffix.lower()}"
        dest = IMG_OUT / name
        i += 1
    shutil.copy2(src, dest)
    copied[key] = name
    return name


# ---------------------------------------------------------------------------
# Plantilla HTML
# ---------------------------------------------------------------------------
def topnav_html(out_rel: str, active: str) -> str:
    prefix = depth_prefix(out_rel)
    cls0 = ' class="actiu"' if active == "inici" else ""
    items = [f'<a href="{prefix}index.html"{cls0}>Inici</a>']
    for s in SECTIONS:
        cls = ' class="actiu"' if active == s["key"] else ""
        items.append(f'<a href="{prefix}{s["key"]}/index.html" data-sec="{s["key"]}"{cls}>{s["title"]}</a>')
    return "\n".join(items)


def page_group(section_key: str, out_rel: str) -> str:
    """Subcarpeta de la secció (p. ex. 'sa1', 'solucionari') o '' si és a l'arrel."""
    parts = out_rel.split("/")
    return parts[1] if len(parts) >= 3 else ""


def group_sort_key(gk: str):
    if gk in GROUP_LABELS:          # material transversal: sempre primer
        return (0, 0, gk)
    sa = detect_sa(gk)
    if sa is not None:
        return (1, sa, gk)
    if gk == "solucionari":
        return (3, 0, gk)
    return (2, 0, gk)


def group_label(gk: str) -> str:
    if gk in GROUP_LABELS:
        return GROUP_LABELS[gk]
    sa = detect_sa(gk)
    if sa is not None:
        return f"SA{sa} · {SA_TITLES.get(sa, '')}".strip(" ·")
    return gk.replace("-", " ").capitalize() if gk else ""


def group_tri(gk: str):
    sa = detect_sa(gk)
    return sa_trimestre(sa) if sa else None


def _link(href, label, actiu, tri=None):
    cls = ' class="actiu"' if actiu else ""
    dot = f' <span class="tri-dot" data-tri="{tri}"></span>' if tri else ""
    return f'<li><a href="{href}"{cls}>{label}{dot}</a></li>'


def sidebar_html(section_key: str, current_out: str, pages: list[Page]) -> str:
    if section_key == "inici":
        return ""
    root_index = f"{section_key}/index.html"
    sec_pages = [p for p in pages if p.section == section_key and p.out_rel != root_index]

    groups: dict[str, list[Page]] = {}
    for p in sec_pages:
        groups.setdefault(page_group(section_key, p.out_rel), []).append(p)

    out = ['<nav class="sidebar-nav" aria-label="Pàgines de la secció">']
    out.append(f'<p class="sidebar-titol">{SECTION_BY_KEY[section_key]["title"]}</p>')

    # Presentació (índex de la secció)
    out.append("<ul class=\"sb-top\">")
    out.append(_link(rel_url(current_out, root_index), "Presentació",
                     current_out == root_index))
    # pàgines soltes a l'arrel de la secció
    for p in sorted(groups.pop("", []), key=lambda p: p.out_rel):
        out.append(_link(rel_url(current_out, p.out_rel), html.escape(p.title),
                         p.out_rel == current_out, p.trimester))
    out.append("</ul>")

    # grups (subcarpetes) plegables
    for gk in sorted(groups, key=group_sort_key):
        gps = groups[gk]
        gps.sort(key=lambda p: (p.kind != "index", p.kind == "code", p.out_rel))
        in_group = any(p.out_rel == current_out for p in gps)
        idx = next((p for p in gps if p.kind == "index"), None)
        tri = group_tri(gk)
        dot = f'<span class="tri-dot" data-tri="{tri}"></span>' if tri else ""
        open_attr = " open" if in_group else ""
        summary = f'<summary><span>{html.escape(group_label(gk))}</span>{dot}</summary>'
        items = []
        for p in gps:
            if p is idx:
                label = "Presentació"
            elif p.kind == "code":
                label = "Codi"
            else:
                label = html.escape(p.title)
            items.append(_link(rel_url(current_out, p.out_rel), label,
                               p.out_rel == current_out))
        out.append(f'<details class="sb-grup"{open_attr}>{summary}<ul>'
                   + "".join(items) + "</ul></details>")

    out.append("</nav>")
    return "\n".join(out)


def toc_html(md: markdown.Markdown) -> str:
    tokens = getattr(md, "toc_tokens", [])
    flat = []

    def walk(items, level):
        for it in items:
            if level <= 2:  # h2 i h3
                flat.append((level, it["id"], it["name"]))
            walk(it.get("children", []), level + 1)

    walk(tokens, 1)
    flat = [t for t in flat if t[0] in (1, 2)]
    if len(flat) < 3:
        return ""
    out = ['<nav class="toc" aria-label="En aquesta pàgina"><p class="toc-titol">En aquesta pàgina</p><ul>']
    for level, _id, name in flat:
        out.append(f'<li class="toc-l{level}"><a href="#{_id}">{html.escape(name)}</a></li>')
    out.append("</ul></nav>")
    return "\n".join(out)


def breadcrumb_html(out_rel: str, section_key: str, title: str) -> str:
    prefix = depth_prefix(out_rel)
    crumbs = [f'<a href="{prefix}index.html">Inici</a>']
    if section_key != "inici":
        sec = SECTION_BY_KEY.get(section_key)
        if sec:
            crumbs.append(f'<a href="{prefix}{section_key}/index.html">{sec["title"]}</a>')
    crumbs.append(f'<span aria-current="page">{html.escape(title)}</span>')
    return '<nav class="breadcrumb" aria-label="Ubicació">' + \
        ' <span class="sep">/</span> '.join(crumbs) + "</nav>"


def page_shell(*, out_rel, section_key, title, content_html, toc="",
               tri=None, pages):
    prefix = depth_prefix(out_rel)
    sec = SECTION_BY_KEY.get(section_key)
    accent_attr = f' data-section="{section_key}"'
    tri_badge = ""
    if tri:
        tri_badge = (f'<span class="badge-tri" data-tri="{tri}">'
                     f'{TRIMESTRES[tri]["label"]}</span>')
    sidebar = sidebar_html(section_key, out_rel, pages)
    has_sidebar = "amb-sidebar" if sidebar else "sense-sidebar"
    toc_block = toc or ""
    layout_class = "amb-toc" if toc_block else "sense-toc"

    return f"""<!DOCTYPE html>
<html lang="ca">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} · {html.escape(SITE_TITLE)}</title>
<meta name="description" content="{html.escape(SITE_TAGLINE)}">
<link rel="stylesheet" href="{prefix}assets/css/estil.css">
<link rel="stylesheet" href="{prefix}assets/css/pygments.css">
<script>(function(){{try{{var t=localStorage.getItem('tema');if(t==='fosc'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-tema','fosc');}}catch(e){{}}}})();</script>
</head>
<body{accent_attr} class="{has_sidebar} {layout_class}">
<a class="skip" href="#contingut">Salta al contingut</a>
<header class="topbar">
  <button class="menu-btn" aria-label="Obre el menú" aria-expanded="false">☰</button>
  <a class="brand" href="{prefix}index.html"><span class="brand-mark">◆</span> Robòtica <span class="brand-sub">1r Batx</span></a>
  <nav class="topnav" aria-label="Seccions">
    {topnav_html(out_rel, section_key)}
  </nav>
  <div class="topbar-eines">
    <div class="cercador">
      <input type="search" id="cerca" placeholder="Cerca…" autocomplete="off" aria-label="Cerca al web">
      <div id="cerca-resultats" class="cerca-resultats" hidden></div>
    </div>
    <button class="tema-btn" aria-label="Canvia el tema clar/fosc" title="Tema clar/fosc">◐</button>
  </div>
</header>
<div class="layout">
  <aside class="sidebar">{sidebar}</aside>
  <main id="contingut">
    {breadcrumb_html(out_rel, section_key, title)}
    {tri_badge}
    <article class="prose">
{content_html}
    </article>
  </main>
  {toc_block}
</div>
<footer class="peu">
  <p>{html.escape(SITE_TITLE)} · material sota llicència <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.ca" target="_blank" rel="noopener">CC BY-SA 4.0</a>.</p>
  <p><a href="{REPO_URL}" target="_blank" rel="noopener">Repositori a GitHub</a> · web generat el {BUILD_DATE}.</p>
</footer>
<script src="{prefix}assets/js/cerca-index.js"></script>
<script src="{prefix}assets/js/lloc.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Generació de pàgines de codi
# ---------------------------------------------------------------------------
def lexer_for(path: Path):
    suf = path.suffix.lower()
    name = {".ino": "cpp", ".cpp": "cpp", ".c": "c", ".h": "cpp",
            ".py": "python"}.get(suf, "text")
    try:
        return get_lexer_by_name(name)
    except Exception:
        return get_lexer_by_name("text")


def render_code_page(group: dict, pages: list[Page]) -> str:
    formatter = HtmlFormatter(cssclass="highlight", nowrap=False)
    parts = [f'<h1>{html.escape(group["label"])}</h1>',
             '<p class="codi-intro">Fitxers de codi font. Fes servir el botó '
             '<strong>Copia</strong> per dur-los a l\'IDE d\'Arduino o a l\'editor de micro:bit.</p>']
    # índex de fitxers
    parts.append('<ul class="codi-llista">')
    for it in group["items"]:
        parts.append(f'<li><a href="#{it["anchor"]}"><code>{html.escape(it["rel"])}</code></a></li>')
    parts.append("</ul>")
    for it in group["items"]:
        code = it["path"].read_text(encoding="utf-8", errors="replace")
        highlighted = highlight(code, lexer_for(it["path"]), formatter)
        parts.append(
            f'<section class="codi-bloc" id="{it["anchor"]}">'
            f'<header class="codi-cap"><code class="codi-nom">{html.escape(it["rel"])}</code>'
            f'<button class="copia-btn" type="button">Copia</button></header>'
            f'<div class="codi-cos">{highlighted}</div></section>'
        )
    content = "\n".join(parts)
    return page_shell(out_rel=group["out_rel"], section_key=group["section"],
                      title=group["label"], content_html=content,
                      tri=group["tri"], pages=pages)


def render_sim_page(group: dict, pages: list[Page]) -> str:
    formatter = HtmlFormatter(cssclass="highlight", nowrap=False)
    folder = group["folder"]
    relpath = str(folder.resolve().relative_to(ROOT.resolve())).replace("\\", "/")
    tree = TREE_BASE + urllib.parse.quote(relpath)
    mena = "Repte" if group["is_repte"] else "Pràctica"
    parts = [f'<h1>{html.escape(group["title"])}</h1>',
             f'<p class="codi-intro">Simulació Wokwi ({mena.lower()}). '
             f'Pots reproduir-la a <a href="https://wokwi.com/" target="_blank" rel="noopener">wokwi.com</a>: '
             f'crea un projecte nou i enganxa-hi el contingut de <code>diagram.json</code> i del '
             f'fitxer de codi. <a href="{tree}" target="_blank" rel="noopener">Veure la carpeta a GitHub ↗</a></p>']
    for f in group["files"]:
        code = f.read_text(encoding="utf-8", errors="replace")
        lang = "json" if f.suffix.lower() == "json" else None
        try:
            lexer = get_lexer_by_name(lang) if lang else lexer_for(f)
        except Exception:
            lexer = lexer_for(f)
        highlighted = highlight(code, lexer, formatter)
        anchor = slugify(f.name)
        parts.append(
            f'<section class="codi-bloc" id="{anchor}">'
            f'<header class="codi-cap"><code class="codi-nom">{html.escape(f.name)}</code>'
            f'<button class="copia-btn" type="button">Copia</button></header>'
            f'<div class="codi-cos">{highlighted}</div></section>'
        )
    content = "\n".join(parts)
    return page_shell(out_rel=group["out_rel"], section_key="simulacions",
                      title=group["title"], content_html=content,
                      tri=group["tri"], pages=pages)


# ---------------------------------------------------------------------------
# Pàgines índex de secció (targetes)
# ---------------------------------------------------------------------------
DOC_ICONS = {".pdf": "📕", ".xlsx": "📊", ".xls": "📊", ".csv": "📊", ".ods": "📊",
             ".pptx": "📽️", ".ppt": "📽️", ".docx": "📄", ".doc": "📄", ".odt": "📄",
             ".zip": "🗜️"}


def section_documents(section_key: str, current_out: str) -> str:
    """Llista de documents de la secció: visor in-situ per als de l'arrel,
    enllaç a GitHub per als de subcarpetes (arxius voluminosos)."""
    sec = SECTION_BY_KEY.get(section_key)
    if not sec:
        return ""
    src_dir = ROOT / sec["src"]
    if not src_dir.exists():
        return ""
    docs = sorted([p for p in src_dir.rglob("*") if p.suffix.lower() in DOC_EXT])
    if not docs:
        return ""
    prefix = depth_prefix(current_out)
    root_docs = [d for d in docs if d.parent == src_dir]
    subfolders: dict[str, list] = {}
    for d in docs:
        if d.parent != src_dir:
            subfolders.setdefault(d.relative_to(src_dir).parts[0], []).append(d)

    cards = []
    for d in root_docs:
        relpath = str(d.relative_to(ROOT)).replace("\\", "/")
        raw = RAW_BASE + urllib.parse.quote(relpath)
        title = d.stem.replace("_", " ")
        ext = d.suffix.lower().lstrip(".")
        href = (prefix + "visor.html?u=" + urllib.parse.quote(raw, safe="")
                + "&t=" + urllib.parse.quote(title, safe="") + "&x=" + ext)
        ic = DOC_ICONS.get(d.suffix.lower(), "📄")
        cards.append(f'<a class="card" href="{href}"><span class="card-ic">{ic}</span>'
                     f'<span class="card-tit">{html.escape(title)} '
                     f'<small class="doc-ext">{ext}</small></span></a>')
    for folder, items in sorted(subfolders.items()):
        tree = TREE_BASE + urllib.parse.quote(f"{sec['src']}/{folder}")
        cards.append(f'<a class="card doc-folder" href="{tree}" target="_blank" rel="noopener">'
                     f'<span class="card-ic">📁</span><span class="card-tit">{html.escape(folder)} '
                     f'<small>({len(items)} fitxers · obre a GitHub ↗)</small></span></a>')
    return ('<h2 class="seccio-sep">Documents</h2>'
            '<div class="card-grid">' + "\n".join(cards) + "</div>")
def section_gallery(section_key: str, current_out: str, copied_imgs: dict) -> str:
    """Galeria amb les imatges presents a la carpeta font de la secció."""
    sec = SECTION_BY_KEY.get(section_key)
    if not sec:
        return ""
    src_dir = ROOT / sec["src"]
    imgs = sorted([p for p in src_dir.rglob("*") if p.suffix.lower() in IMG_EXT])
    if not imgs:
        return ""
    prefix = depth_prefix(current_out)
    tiles = []
    for img in imgs:
        name = copy_image(img, copied_imgs)
        cap = html.escape(img.stem.replace("_", " ").replace("-", " "))
        tiles.append(f'<figure class="galeria-item"><img src="{prefix}assets/img/{name}" '
                     f'alt="{cap}" loading="lazy"><figcaption>{cap}</figcaption></figure>')
    return ('<h2 class="seccio-sep">Imatges i materials</h2>'
            '<div class="galeria">' + "\n".join(tiles) + "</div>")


def page_sa(p: Page):
    return detect_sa(p.src.name) or detect_sa(p.out_rel)


def doc_card(href, title, kind="doc", tri=None):
    icona = "💻" if kind == "code" else "📄"
    badge = (f'<span class="badge-tri mini" data-tri="{tri}">{TRIMESTRES[tri]["label"]}</span>'
             if tri else "")
    return (f'<a class="card" href="{href}"><span class="card-ic">{icona}</span>'
            f'<span class="card-tit">{html.escape(title)}</span>{badge}</a>')


def sa_hub_card(href, sa, name, meta, tri):
    meta_html = f'<span class="sa-meta">{html.escape(meta)}</span>' if meta else ""
    return (f'<a class="sa-card" href="{href}" data-tri="{tri}">'
            f'<span class="sa-num">SA{sa}</span>'
            f'<span class="sa-nom">{html.escape(name)}</span>{meta_html}</a>')


def tri_blocks_html(entries: list[tuple]) -> str:
    """entries: llista de (tri, sa_o_ordre, card_html)."""
    if not entries:
        return ""
    blocks = []
    for t, info in TRIMESTRES.items():
        cards = [c for (tri, _o, c) in sorted(entries, key=lambda e: (e[1],)) if tri == t]
        if not cards:
            continue
        blocks.append(
            f'<div class="tri-block" data-tri="{t}">'
            f'<h3 class="tri-tit"><span class="tri-pastilla" data-tri="{t}"></span>{info["label"]}</h3>'
            f'<div class="sa-grid">{"".join(cards)}</div></div>'
        )
    return ('<h2 class="seccio-sep">Situacions d\'aprenentatge</h2>'
            '<div class="tri-wrap">' + "".join(blocks) + "</div>")


def section_index_extra(section_key: str, current_out: str, pages: list[Page]) -> str:
    root_index = f"{section_key}/index.html"
    sec_pages = [p for p in pages if p.section == section_key and p.out_rel != root_index]

    groups: dict[str, list[Page]] = {}
    for p in sec_pages:
        groups.setdefault(page_group(section_key, p.out_rel), []).append(p)
    root_pages = groups.pop("", [])

    tri_entries: list[tuple] = []        # (tri, ordre, card)
    generals: list[Page] = []
    other_blocks: list[str] = []
    transversal_blocks: list[str] = []   # material transversal (no SA): va primer
    preamble_cards: list[str] = []
    has_hubs = False

    # Pàgines soltes a l'arrel: les que tenen trimestre van a blocs de SA
    for p in sorted(root_pages, key=lambda p: p.out_rel):
        if p.trimester:
            sa = page_sa(p) or 0
            tri_entries.append((p.trimester, sa,
                                sa_hub_card(rel_url(current_out, p.out_rel), sa or "",
                                            p.title, "", p.trimester)))
        else:
            generals.append(p)

    # Subcarpetes
    for gk in sorted(groups, key=group_sort_key):
        gps = groups[gk]
        idx = next((x for x in gps if x.kind == "index"), None)
        sa = detect_sa(gk)
        if idx and sa is not None:
            has_hubs = True
            mats = len([x for x in gps if x is not idx])
            meta = f"{mats} material{'s' if mats != 1 else ''}"
            href = rel_url(current_out, idx.out_rel)
            if sa == 0:
                preamble_cards.append(sa_hub_card(href, 0, SA_TITLES[0], meta, 0))
            else:
                tri_entries.append((sa_trimestre(sa), sa,
                                    sa_hub_card(href, sa, SA_TITLES.get(sa, gk),
                                                meta, sa_trimestre(sa))))
        else:
            cards = []
            for p in sorted(gps, key=lambda p: (p.kind != "index", p.out_rel)):
                title = "Presentació" if p.kind == "index" else p.title
                cards.append(doc_card(rel_url(current_out, p.out_rel), title, p.kind))
            block = (f'<h2 class="seccio-sep">{html.escape(group_label(gk) or gk)}</h2>'
                     f'<div class="card-grid">{"".join(cards)}</div>')
            (transversal_blocks if gk in GROUP_LABELS else other_blocks).append(block)

    generals_html = ""
    if generals:
        cards = [doc_card(rel_url(current_out, p.out_rel), p.title, p.kind, p.trimester)
                 for p in generals]
        generals_html = ('<h2 class="seccio-sep">Documents i recursos</h2>'
                         '<div class="card-grid">' + "".join(cards) + "</div>")

    sa_html = tri_blocks_html(tri_entries)
    preamble_html = ""
    if preamble_cards:
        preamble_html = ('<h2 class="seccio-sep">Preàmbul</h2>'
                         '<div class="sa-grid">' + "".join(preamble_cards) + "</div>")

    # Ordre: material transversal primer; després, si hi ha SA amb pàgina pròpia
    # (Classes), les SA; si no, els documents primer.
    if has_hubs:
        ordered = transversal_blocks + [preamble_html, sa_html, generals_html] + other_blocks
    else:
        ordered = transversal_blocks + [generals_html, preamble_html, sa_html] + other_blocks
    return "\n".join([b for b in ordered if b])


def subindex_extra(section_key: str, group_key: str, current_out: str,
                   pages: list[Page]) -> str:
    """Materials d'una sola SA (pàgina índex d'una subcarpeta)."""
    gps = [p for p in pages if p.section == section_key
           and page_group(section_key, p.out_rel) == group_key
           and p.out_rel != current_out]
    if not gps:
        return ""

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

    cards = []
    for p in sorted(gps, key=ordre):
        title = "Codi de les pràctiques" if p.kind == "code" else p.title
        cards.append(doc_card(rel_url(current_out, p.out_rel), title, p.kind))
    titol = ("Materials d'aquesta SA" if detect_sa(group_key) is not None
             else "Materials d'aquest apartat")
    return (f'<h2 class="seccio-sep">{titol}</h2>'
            '<div class="card-grid">' + "".join(cards) + "</div>")


# ---------------------------------------------------------------------------
# Home
# ---------------------------------------------------------------------------
def render_home(pages: list[Page]) -> str:
    # targetes de seccions
    sec_cards = []
    for s in SECTIONS:
        sec_cards.append(
            f'<a class="sec-card" href="{s["key"]}/index.html" data-section="{s["key"]}">'
            f'<span class="sec-ic">{s["icon"]}</span>'
            f'<span class="sec-tit">{s["title"]}</span>'
            f'<span class="sec-desc">{html.escape(s["desc"])}</span></a>'
        )
    # mapa de SA -> pàgina de programació
    sa_to_out = {}
    for p in pages:
        if p.section == "programacio":
            sa = detect_sa(p.src.name)
            if sa and sa not in sa_to_out:
                sa_to_out[sa] = p.out_rel
    tri_blocks = []
    for t, info in TRIMESTRES.items():
        cards = []
        for sa in info["sas"]:
            href = sa_to_out.get(sa, f"programacio/index.html")
            cards.append(
                f'<a class="sa-card" href="{href}" data-tri="{t}">'
                f'<span class="sa-num">SA{sa}</span>'
                f'<span class="sa-nom">{html.escape(SA_TITLES[sa])}</span></a>'
            )
        tri_blocks.append(
            f'<div class="tri-block" data-tri="{t}">'
            f'<h3 class="tri-tit"><span class="tri-pastilla" data-tri="{t}"></span>{info["label"]}</h3>'
            f'<div class="sa-grid">{"".join(cards)}</div></div>'
        )

    content = f"""
<section class="hero">
  <p class="hero-kicker">{html.escape(SITE_TAGLINE)}</p>
  <h1 class="hero-titol">Robòtica a 1r de Batxillerat</h1>
  <p class="hero-lead">9 situacions d'aprenentatge amb Arduino, micro:bit i robòtica mòbil, en tres trimestres. Tot el material d'aula, la programació didàctica, els reptes i l'avaluació, en un sol lloc.</p>
  <div class="hero-cta">
    <a class="btn btn-primari" href="guia-inici.html">Comença per la guia d'inici</a>
    <a class="btn btn-secundari" href="programacio/index.html">Programació didàctica</a>
  </div>
</section>

<h2 class="seccio-sep">Apartats</h2>
<div class="sec-grid">
{"".join(sec_cards)}
</div>

<h2 class="seccio-sep">Les 9 situacions d'aprenentatge</h2>
<p class="seccio-intro">Cada trimestre té el seu color. Clica una SA per veure'n la programació didàctica.</p>
<div class="tri-wrap">
{"".join(tri_blocks)}
</div>
"""
    return page_shell(out_rel="index.html", section_key="inici",
                      title="Inici", content_html=content, pages=pages)


# ---------------------------------------------------------------------------
# CSS de Pygments (clar + fosc)
# ---------------------------------------------------------------------------
def write_pygments_css():
    ASSETS.joinpath("css").mkdir(parents=True, exist_ok=True)
    light = HtmlFormatter(style="default").get_style_defs(".highlight")
    dark = HtmlFormatter(style="monokai").get_style_defs(
        'html[data-tema="fosc"] .highlight')
    css = ("/* Generat per Pygments — no editar a mà */\n"
           ".highlight { background: transparent; }\n" + light +
           '\nhtml[data-tema="fosc"] .highlight { background: transparent; }\n' + dark)
    (ASSETS / "css" / "pygments.css").write_text(css, encoding="utf-8")


# ---------------------------------------------------------------------------
# Visor de documents (PDF.js per a PDF, visor d'Office per a fulls/diapos)
# ---------------------------------------------------------------------------
def render_visor() -> str:
    tpl = r"""<!DOCTYPE html>
<html lang="ca">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Visor de documents · %%TITLE%%</title>
<link rel="stylesheet" href="assets/css/estil.css">
<script>(function(){try{var t=localStorage.getItem('tema');if(t==='fosc'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-tema','fosc');}catch(e){}})();</script>
</head>
<body data-section="recursos" class="sense-sidebar sense-toc">
<a class="skip" href="#contingut">Salta al contingut</a>
<header class="topbar">
  <a class="brand" href="index.html"><span class="brand-mark">◆</span> Robòtica <span class="brand-sub">1r Batx</span></a>
  <nav class="topnav" aria-label="Seccions"><a href="index.html">Inici</a></nav>
  <div class="topbar-eines">
    <a class="btn btn-secundari" id="doc-gh" href="#" target="_blank" rel="noopener">Obre a GitHub ↗</a>
    <button class="tema-btn" aria-label="Canvia el tema clar/fosc" title="Tema clar/fosc">◐</button>
  </div>
</header>
<div class="layout">
  <main id="contingut">
    <nav class="breadcrumb" aria-label="Ubicació"><a href="index.html">Inici</a> <span class="sep">/</span> <span>Documents</span> <span class="sep">/</span> <span id="doc-titol" aria-current="page">Document</span></nav>
    <h1 id="doc-h1" class="visor-h1">Document</h1>
    <div id="visor-cont" class="visor-cont"><div class="visor-msg">Carregant…</div></div>
  </main>
</div>
<footer class="peu">
  <p>%%TITLE%% · visor de documents. Els fitxers es carreguen des del <a href="%%REPO%%" target="_blank" rel="noopener">repositori a GitHub</a>.</p>
</footer>
<script type="module">
const p = new URLSearchParams(location.search);
const u = p.get('u'); const t = p.get('t') || 'Document'; const x = (p.get('x') || '').toLowerCase();
document.getElementById('doc-titol').textContent = t;
document.getElementById('doc-h1').textContent = t;
document.title = t + ' · %%TITLE%%';
let gh = u || '#';
if (u && u.indexOf('raw.githubusercontent.com') > -1) {
  gh = u.replace('https://raw.githubusercontent.com/', 'https://github.com/').replace('/main/', '/blob/main/');
}
document.getElementById('doc-gh').href = gh;
const cont = document.getElementById('visor-cont');
const office = ['xlsx','xls','pptx','ppt','docx','doc','ods','odt','csv'];
function msg(h){ cont.innerHTML = '<div class="visor-msg">' + h + '</div>'; }
if (!u) {
  msg('No s\'ha indicat cap document.');
} else if (x === 'pdf') {
  try {
    const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs';
    const pdf = await pdfjs.getDocument({ url: u }).promise;
    cont.innerHTML = '';
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const vp = page.getViewport({ scale: 1.6 });
      const c = document.createElement('canvas');
      c.className = 'visor-pagina'; c.width = vp.width; c.height = vp.height;
      cont.appendChild(c);
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    }
  } catch (e) {
    msg('No s\'ha pogut mostrar el PDF aquí (potser sense connexió). <a href="' + gh + '" target="_blank" rel="noopener">Obre\'l a GitHub ↗</a>');
  }
} else if (office.includes(x)) {
  const src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(u);
  cont.innerHTML = '<iframe class="visor-iframe" src="' + src + '" allowfullscreen></iframe>';
} else {
  msg('Aquest tipus de fitxer no es pot previsualitzar al web. <a href="' + gh + '" target="_blank" rel="noopener">Descarrega\'l des de GitHub ↗</a>');
}
</script>
<script src="assets/js/lloc.js"></script>
</body>
</html>
"""
    return (tpl.replace("%%TITLE%%", SITE_TITLE)
            .replace("%%REPO%%", REPO_URL))


# ---------------------------------------------------------------------------
# Procés principal
# ---------------------------------------------------------------------------
def main():
    print("Generant el web de Robòtica…")
    pages, md_map, code_map, code_groups, sim_groups, sim_map = discover()
    copied_imgs: dict = {}
    search_index = []

    # neteja de sortides HTML antigues (manté assets i _generador)
    for item in WEB.iterdir():
        if item.name in {"assets", "_generador", ".git"}:
            continue
        if item.is_dir():
            shutil.rmtree(item)
        elif item.suffix == ".html" or item.name == ".nojekyll":
            item.unlink()
    # imatges: es regeneren netes (evita duplicats acumulats entre tirades)
    if IMG_OUT.exists():
        shutil.rmtree(IMG_OUT)

    write_pygments_css()

    # Pàgines de documents
    for p in pages:
        if p.kind in ("code", "sim"):
            continue
        text = p.src.read_text(encoding="utf-8")
        md = make_md()
        body = md.convert(text)
        body = rewrite_links(body, p.src, p.out_rel, md_map, code_map, sim_map, copied_imgs)
        toc = toc_html(md)
        extra = ""
        if p.kind == "index":
            if p.out_rel == f"{p.section}/index.html":
                extra = section_index_extra(p.section, p.out_rel, pages)
                extra += section_gallery(p.section, p.out_rel, copied_imgs)
                extra += section_documents(p.section, p.out_rel)
            else:
                grp = page_group(p.section, p.out_rel)
                extra = subindex_extra(p.section, grp, p.out_rel, pages)
        content = body + ("\n" + extra if extra else "")
        full = page_shell(out_rel=p.out_rel, section_key=p.section,
                          title=p.title, content_html=content, toc=toc,
                          tri=p.trimester, pages=pages)
        dest = WEB / p.out_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(full, encoding="utf-8")
        search_index.append({"t": p.title, "s": SECTION_BY_KEY.get(p.section, {}).get("title", "Inici"),
                             "u": p.out_rel, "tri": p.trimester})

    # Pàgines de codi
    for g in code_groups:
        full = render_code_page(g, pages)
        dest = WEB / g["out_rel"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(full, encoding="utf-8")
        search_index.append({"t": g["label"], "s": SECTION_BY_KEY[g["section"]]["title"],
                             "u": g["out_rel"], "tri": g["tri"]})

    # Pàgines de simulacions Wokwi
    for g in sim_groups:
        full = render_sim_page(g, pages)
        dest = WEB / g["out_rel"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(full, encoding="utf-8")
        search_index.append({"t": g["title"], "s": "Simulacions",
                             "u": g["out_rel"], "tri": g["tri"]})

    # Visor de documents (PDF.js + visor d'Office), sense copiar fitxers
    (WEB / "visor.html").write_text(render_visor(), encoding="utf-8")

    # Home
    (WEB / "index.html").write_text(render_home(pages), encoding="utf-8")
    search_index.insert(0, {"t": "Inici", "s": "Inici", "u": "index.html", "tri": None})

    # Índex de cerca (com a JS per funcionar també en local file://)
    ASSETS.joinpath("js").mkdir(parents=True, exist_ok=True)
    (ASSETS / "js" / "cerca-index.js").write_text(
        "window.INDEX_CERCA = " + json.dumps(search_index, ensure_ascii=False) + ";",
        encoding="utf-8")

    # .nojekyll perquè GitHub Pages no processi amb Jekyll
    (WEB / ".nojekyll").write_text("", encoding="utf-8")

    print(f"  · {len([p for p in pages if p.kind not in ('code', 'sim')])} pàgines de document")
    print(f"  · {len(code_groups)} pàgines de codi")
    print(f"  · {len(sim_groups)} pàgines de simulació")
    print(f"  · {len(copied_imgs)} imatges copiades")
    print(f"  · {len(search_index)} entrades a l'índex de cerca")
    print("Fet. Obre web/index.html o publica la carpeta web/ a GitHub Pages.")


if __name__ == "__main__":
    main()
