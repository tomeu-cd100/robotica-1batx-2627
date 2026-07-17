# -*- coding: utf-8 -*-
"""
Genera PDF imprimibles (per omplir/recollir en paper) dels fulls d'alumnat
que no passen pel pipeline d'activitats: el full de normes de seguretat (amb
signatura) i els 10 checklists d'alumnat (SA0-SA9, amb autoavaluació semàfor).

- Converteix el Markdown a un HTML d'impressió net (A4), amb caselles reals,
  graella semàfor per pintar i línies per escriure (nom, data, signatura).
- Imprimeix cada HTML a PDF amb Chrome/Edge headless (sense dependències).
- Desa cada PDF al costat del seu material: Classes/SAn/pdf/<nom>.pdf

Ús:
    py web/_generador/generar_fulls_imprimibles.py
"""
from __future__ import annotations

import html
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

SCRIPT_DIR = Path(__file__).resolve().parent
REPO = SCRIPT_DIR.parent.parent
CLASSES = REPO / "Classes"

# Fulls a convertir: (md relatiu a Classes, "checklist" | "normes")
TARGETS = [
    ("SA1/SA1_normes_seguretat.md", "normes"),
] + [(f"SA{n}/SA{n}_checklist_alumnat.md", "checklist") for n in range(0, 10)] + [
    ("SA1/SA1_poster_robot_plantilla.md", "checklist"),
    ("00_General/00_Plantilla_disseny_objecte.md", "checklist"),
]

# Fulls que JA són HTML complet i autocontingut (disseny propi per a A4): es
# converteixen a PDF tal qual, sense passar pel Markdown. Rellotge més llarg
# perquè carreguin fonts/icones de CDN abans d'imprimir.
RAW_HTML = [
    "00_General/impresos/Fitxes_Arduino_UNO.html",
    "00_General/impresos/Blocs_Programacio_Offline.html",
    "00_General/impresos/Blocs_Diagrames_Flux.html",
]

CSS = """
  @page { size: A4; margin: 15mm 15mm 13mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #111;
         font-size: 10.7pt; line-height: 1.4; }
  h1 { font-size: 16.5pt; margin: 0 0 8pt; }
  h2 { font-size: 12pt; margin: 13pt 0 5pt; padding-bottom: 2pt;
       border-bottom: 1px solid #ccc; }
  .callout { background: #eaf4fb; border-left: 4px solid #2b8ac6;
             padding: 6pt 10pt; margin: 8pt 0; font-size: 10pt; }
  p { margin: 5pt 0; }
  code { font-family: Consolas, "Courier New", monospace; font-size: 9.6pt;
         background: #f2f2f2; padding: 0 2px; border-radius: 3px; }
  /* Camps per omplir */
  .fields { display: flex; flex-wrap: wrap; gap: 8pt 22pt; margin: 6pt 0 4pt; }
  .field { display: flex; align-items: flex-end; gap: 7pt; flex: 1 1 200pt; }
  .field .et { white-space: nowrap; font-weight: 600; }
  .line { flex: 1 1 auto; border-bottom: 1px solid #333; height: 15pt; }
  .fill-inline { display: inline-block; min-width: 120pt;
                 border-bottom: 1px solid #333; }
  /* Llistes de verificació */
  ul.check { list-style: none; margin: 4pt 0; padding-left: 2pt; }
  ul.check li { display: flex; align-items: flex-start; gap: 8pt; margin: 4pt 0; }
  ul.check .box { flex: 0 0 auto; width: 12pt; height: 12pt; border: 1.3px solid #333;
                  border-radius: 2px; margin-top: 1.5pt; }
  ul.plain { margin: 4pt 0; padding-left: 20pt; }
  ul.plain li { margin: 3pt 0; }
  ol.normes, ol.num { margin: 4pt 0; padding-left: 20pt; }
  ol.normes li, ol.num li { margin: 3pt 0; }
  pre { font-family: Consolas, "Courier New", monospace; font-size: 8.4pt;
        line-height: 1.2; background: #f7f7f7; border: 1px solid #e0e0e0;
        border-radius: 4px; padding: 6pt 8pt; white-space: pre; overflow: hidden;
        margin: 6pt 0; }
  /* Graella semàfor */
  table.grid { width: 100%; border-collapse: collapse; margin: 6pt 0; }
  table.grid th, table.grid td { border: 1px solid #bbb; padding: 5pt 7pt; }
  table.grid thead th { background: #eef3f7; font-size: 9.8pt; text-align: center; }
  table.grid thead th:first-child { text-align: left; }
  table.grid td.lab { text-align: left; }
  table.grid td.paint { width: 15%; height: 22pt; }
  /* Signatura (normes) */
  .camp { margin: 13pt 0; display: flex; align-items: flex-end; gap: 10pt; }
  .camp .et { white-space: nowrap; font-weight: 600; }
  .camp .linia { flex: 1 1 auto; border-bottom: 1px solid #333; height: 15pt; }
  .fila2 { display: flex; gap: 26pt; }
  .fila2 .camp { flex: 1; }
  .destacats { margin-top: 15pt; border: 1px solid #2b8ac6; border-radius: 4px;
               padding: 9pt 12pt; background: #f6fbfe; page-break-inside: avoid; }
  .destacats .t { font-weight: 600; margin: 0 0 8pt; }
  strong { font-weight: 700; }
  hr { border: 0; border-top: 1px solid #ddd; margin: 9pt 0; }
"""


from generador.navegador import find_browser  # noqa: E402  (re-exportat per a generar_quadern_tecnic)
from generador.pdfutil import escriu_marca, hash_font, pdf_valid  # noqa: E402


# --- Inline Markdown -> HTML -----------------------------------------------
def inline(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)   # enllaç -> text
    text = html.escape(text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(r"_{3,}", '<span class="fill-inline"></span>', text)
    return text


def is_identity(line: str) -> bool:
    return bool(re.match(r"\*\*[^*]+:\*\*\s*_+", line.strip()))


def render_identity(line: str) -> str:
    labels = re.findall(r"\*\*([^*]+?):\*\*\s*_+", line)
    fields = "".join(
        f'<div class="field"><span class="et">{html.escape(l)}</span>'
        f'<span class="line"></span></div>' for l in labels)
    return f'<div class="fields">{fields}</div>'


def render_table(rows: list[str]) -> str:
    def cells(r):
        return [c.strip() for c in r.strip().strip("|").split("|")]
    header = cells(rows[0])
    body = [cells(r) for r in rows[2:]]  # rows[1] = separador ---
    semaphore = any(("🔴" in c or "🟡" in c or "🟢" in c) for c in header)
    thead = "<tr>" + "".join(f"<th>{inline(c)}</th>" for c in header) + "</tr>"
    trs = []
    for r in body:
        first = f'<td class="lab">{inline(r[0]) if r else ""}</td>'
        if semaphore:
            paint = "".join('<td class="paint"></td>' for _ in header[1:])
            trs.append("<tr>" + first + paint + "</tr>")
        else:
            rest = "".join(f"<td>{inline(c)}</td>" for c in r[1:])
            trs.append("<tr>" + first + rest + "</tr>")
    return (f'<table class="grid"><thead>{thead}</thead>'
            f'<tbody>{"".join(trs)}</tbody></table>')


def md_to_body(md: str) -> tuple[str, str]:
    """Retorna (títol, html del cos) per a un full de checklist."""
    lines = md.splitlines()
    title = ""
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if not s:
            i += 1
            continue
        if s.startswith("```"):
            i += 1
            code = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code.append(lines[i])
                i += 1
            i += 1  # tanca ```
            out.append(f"<pre>{html.escape(chr(10).join(code))}</pre>")
        elif s.startswith("# "):
            title = s[2:].strip()
            out.append(f"<h1>{inline(title)}</h1>")
            i += 1
        elif s.startswith("## "):
            out.append(f"<h2>{inline(s[3:].strip())}</h2>")
            i += 1
        elif s.startswith("> "):
            block = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                block.append(lines[i].strip()[1:].strip())
                i += 1
            joined = " ".join(block)
            # Un full imprimible no s'enllaça a si mateix: salta l'avís del PDF.
            if ".pdf)" in joined or "](pdf/" in joined:
                continue
            out.append(f'<div class="callout">{inline(joined)}</div>')
        elif re.match(r"- \[[ xX]\] ", s):
            items = []
            while i < len(lines) and re.match(r"- \[[ xX]\] ", lines[i].strip()):
                txt = re.sub(r"- \[[ xX]\] ", "", lines[i].strip())
                items.append(f'<li><span class="box"></span><span>{inline(txt)}</span></li>')
                i += 1
            out.append(f'<ul class="check">{"".join(items)}</ul>')
        elif s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            out.append(render_table(rows))
        elif re.fullmatch(r"[-*_]{3,}", s):
            out.append("<hr>")
            i += 1
        elif is_identity(s):
            out.append(render_identity(s))
            i += 1
        elif s.startswith("- "):
            items = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                items.append(f"<li>{inline(lines[i].strip()[2:])}</li>")
                i += 1
            out.append(f'<ul class="plain">{"".join(items)}</ul>')
        elif re.match(r"\d+\.\s", s):
            items = []
            while i < len(lines) and re.match(r"\d+\.\s", lines[i].strip()):
                txt = re.sub(r"^\d+\.\s+", "", lines[i].strip())
                items.append(f"<li>{inline(txt)}</li>")
                i += 1
            out.append(f'<ol class="num">{"".join(items)}</ol>')
        else:
            out.append(f"<p>{inline(s)}</p>")
            i += 1
    return title, "\n".join(out)


def render_norms_body(md: str) -> tuple[str, str]:
    """Full de normes: llista numerada + bloc de signatura amb línies amples."""
    title = "SA1 · Normes de seguretat del laboratori de robòtica"
    intro = ("Es llegeixen en veu alta a la <strong>Sessió 2</strong>, es comenten amb "
             "exemples i cada alumne/a <strong>signa</strong> el compromís del final. "
             "El full signat es guarda a la carpeta del grup.")
    # Extreu les 12 normes (línies "N. ...") en ordre.
    normes = [inline(m.group(2)) for m in
              (re.match(r"(\d+)\.\s+(.*)", l.strip()) for l in md.splitlines()) if m]
    seccions = [
        ("1. Abans de connectar res", normes[0:3]),
        ("2. Connexions correctes", normes[3:7]),
        ("3. Durant el treball", normes[7:10]),
        ("4. En acabar", normes[10:12]),
    ]
    body = [f"<h1>{html.escape(title)}</h1>",
            f'<div class="callout">{intro}</div>']
    n0 = 1
    for h, items in seccions:
        body.append(f"<h2>{h}</h2>")
        lis = "".join(f"<li>{t}</li>" for t in items)
        body.append(f'<ol class="normes" start="{n0}">{lis}</ol>')
        n0 += len(items)
    body.append('<div class="sig"><h2>Compromís (signatura)</h2>'
                '<p>He llegit i entès les normes de seguretat del laboratori de robòtica '
                'i em comprometo a complir-les durant tot el curs.</p>'
                '<div class="camp"><span class="et">Nom i cognoms</span><span class="linia"></span></div>'
                '<div class="fila2">'
                '<div class="camp"><span class="et">Grup</span><span class="linia"></span></div>'
                '<div class="camp"><span class="et">Data</span><span class="linia"></span></div>'
                '</div>'
                '<div class="camp"><span class="et">Signatura de l\'alumne/a</span><span class="linia"></span></div>'
                '<div class="destacats"><p class="t">Les 2 normes que em semblen més '
                'importants (es traslladen a l\'Activitat 3 de la fitxa):</p>'
                '<div class="camp"><span class="et">1.</span><span class="linia"></span></div>'
                '<div class="camp"><span class="et">2.</span><span class="linia"></span></div>'
                '</div></div>')
    return title, "\n".join(body)


def wrap(title: str, body: str) -> str:
    return (f'<!doctype html><html lang="ca"><head><meta charset="utf-8">'
            f"<title>{html.escape(title)}</title><style>{CSS}</style></head>"
            f"<body>{body}</body></html>")


def print_pdf(browser: str, html_path: Path, pdf_path: Path, profile: str,
              budget: int = 4000) -> bool:
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    # Esborra la sortida abans de renderitzar: si Chrome falla, no queda el PDF
    # antic fent passar el check de mida (evita committar una versio desfasada).
    if pdf_path.exists():
        try:
            pdf_path.unlink()
        except PermissionError:
            print(f"  ⚠ {pdf_path.name}: bloquejat (tanca'l al visor). No regenerat.")
            return False
    # Perfil FRESC per render: compartir-lo entre molts renders fa que Chrome
    # reutilitzi la cau i de tant en tant surti una versio desfasada.
    # Si Chrome talla el render (PDF truncat o sense pàgines), es reintenta
    # amb el doble i el quàdruple de temps virtual.
    for factor in (1, 2, 4):
        with tempfile.TemporaryDirectory(prefix="fullpdf1_") as prof:
            cmd = [browser, "--headless=new", "--disable-gpu", "--disk-cache-size=1",
                   *([] if sys.platform == "win32" else ["--no-sandbox"]),
                   "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                   f"--virtual-time-budget={budget * factor}", f"--user-data-dir={prof}",
                   f"--print-to-pdf={pdf_path}", html_path.as_uri()]
            subprocess.run(cmd, capture_output=True, text=True)
        if pdf_valid(pdf_path):
            return True
    return False


def main():
    browser = find_browser()
    print(f"Generant {len(TARGETS)} fulls imprimibles amb: {browser}")
    ok, fail = 0, 0
    with tempfile.TemporaryDirectory(prefix="fullpdf_") as profile, \
         tempfile.TemporaryDirectory(prefix="fullhtml_") as htmldir:
        for rel, kind in TARGETS:
            md_path = CLASSES / rel
            if not md_path.exists():
                print(f"  ⚠ falta: {rel}")
                fail += 1
                continue
            md = md_path.read_text(encoding="utf-8")
            if kind == "normes":
                title, body = render_norms_body(md)
            else:
                title, body = md_to_body(md)
                # el <h1> ja surt del cos per als checklists
            html_doc = wrap(title, body)
            tmp_html = Path(htmldir) / (md_path.stem + ".html")
            tmp_html.write_text(html_doc, encoding="utf-8")
            pdf_path = md_path.parent / "pdf" / (md_path.stem + ".pdf")
            if print_pdf(browser, tmp_html, pdf_path, profile):
                # Marca de sincronia: tools/qa.py detecta un .md editat
                # sense regenerar el seu PDF comparant aquest hash.
                escriu_marca(pdf_path, hash_font(md))
                print(f"  ✓ {pdf_path.relative_to(REPO)}")
                ok += 1
            else:
                print(f"  ⚠ no generat: {rel}")
                fail += 1

        # Fulls que ja són HTML autocontingut: s'imprimeixen tal qual.
        for rel in RAW_HTML:
            src = CLASSES / rel
            if not src.exists():
                print(f"  ⚠ falta: {rel}")
                fail += 1
                continue
            pdf_path = CLASSES / "00_General" / "pdf" / (src.stem + ".pdf")
            if print_pdf(browser, src, pdf_path, profile, budget=10000):
                escriu_marca(pdf_path, hash_font(src.read_text(encoding="utf-8")))
                print(f"  ✓ {pdf_path.relative_to(REPO)}")
                ok += 1
            else:
                print(f"  ⚠ no generat: {rel}")
                fail += 1
    print(f"Fet. {ok} PDF generats" + (f", {fail} amb error." if fail else "."))
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
