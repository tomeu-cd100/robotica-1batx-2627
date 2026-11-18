# -*- coding: utf-8 -*-
"""Genera el PDF per imprimir de la guia de muntatge del MeArm AMB les fotos
oficials de phenoptix (Instructables) encastades a cada pas.

Les fotos NO són del curs (llicència no comercial) i no es poden publicar al
repositori ni a la web, que són CC BY-SA. Per això:
  - el PDF oficial i les fotos extretes viuen a Recursos/_tercers_nomes_local/mearm/
    (gitignored), i
  - el PDF resultant va a web/pdf/ (gitignored). Només per imprimir a l'aula.

Ús (des de l'arrel del curs):
  py -3.11 web/_generador/generar.py        # primer: HTML al dia
  py -3.11 tools/genera_pdf_mearm_fotos.py  # després: els dos PDF

Surt:
  web/pdf/Muntatge_brac_MeArm_fotos_alumnat.pdf  (sense blocs .nomes-docent)
  web/pdf/Muntatge_brac_MeArm_fotos_docent.pdf   (amb tot)

Necessita pymupdf i Chrome/Edge. Si el PDF oficial no hi és, el baixa.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

ARREL = Path(__file__).resolve().parent.parent
WEB = ARREL / "web"
LOCAL = ARREL / "Recursos" / "_tercers_nomes_local" / "mearm"
PDF_OFICIAL = LOCAL / "MeArmV1.1.pdf"
URL_OFICIAL = ("https://github.com/phenoptix/MeArm/raw/master/hardware/"
               "Robot%20Chassis/v1/MeArmV1.1.pdf")
HTML = WEB / "classes" / "00-general" / "00-muntatge-brac-mearm.html"
SORTIDA = WEB / "pdf"

sys.path.insert(0, str(WEB / "_generador"))
from generador.navegador import find_browser  # noqa: E402
from generador.pdfutil import pdf_valid  # noqa: E402

import pymupdf  # noqa: E402

# Fotos que no s'encasten: a la guia oficial, el pas 1 comença amb el logotip
# d'Instructables i el pas 2 és el muntatge del comandament «Brains», que no
# fem servir (nosaltres centrem els servos amb l'Arduino al pas 0).
DESCARTA = {1: {1}, 2: "tot"}

# Hash de la vista docent de web/assets/js/lloc.js (la pàgina té porta).
DOCENT_HASH = re.search(r'DOCENT_HASH = "([0-9a-f]+)"',
                        (WEB / "assets" / "js" / "lloc.js").read_text(encoding="utf-8")).group(1)

CSS = """
.fotos-oficials { display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 2mm; margin: 2mm 0 4mm; }
.fotos-oficials figure { margin: 0; break-inside: avoid; }
.fotos-oficials img { width: 100%; display: block; border-radius: 2px; }
.fotos-oficials figcaption { font-size: 8pt; color: #555; text-align: center; }
.avis-fotos { font-size: 9pt; border-left: 3px solid #999; padding: 2mm 3mm;
  margin: 3mm 0; background: #f4f4f4; }
"""


def extreu_fotos() -> dict[int, list[Path]]:
    """Extreu les fotos (≥300 px d'amplada) del PDF oficial, agrupades pel
    «Step N» de la guia original. Una foto que surt abans d'un títol de pas a
    la mateixa pàgina pertany al pas anterior."""
    if not PDF_OFICIAL.exists():
        LOCAL.mkdir(parents=True, exist_ok=True)
        print(f"Baixant {URL_OFICIAL}")
        urllib.request.urlretrieve(URL_OFICIAL, PDF_OFICIAL)
    img_dir = LOCAL / "img"
    img_dir.mkdir(exist_ok=True)
    doc = pymupdf.open(PDF_OFICIAL)
    pas, fotos = 1, {}
    for pagina in doc:
        elements = []
        for b in pagina.get_text("blocks"):
            m = re.match(r"\s*Step (\d+)", b[4])
            if m:
                elements.append((b[1], b[0], "pas", int(m.group(1))))
        for im in pagina.get_image_info(xrefs=True):
            if im["width"] >= 300:
                elements.append((im["bbox"][1], im["bbox"][0], "img", im["xref"]))
        for _y, _x, tipus, valor in sorted(elements):
            if tipus == "pas":
                pas = valor
                continue
            llista = fotos.setdefault(pas, [])
            fitxer = img_dir / f"s{pas:02d}_{len(llista) + 1:02d}.jpg"
            if not fitxer.exists():
                pix = pymupdf.Pixmap(doc, valor)
                if pix.n - pix.alpha >= 4:
                    pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                pix.save(fitxer, jpg_quality=85)
            llista.append(fitxer)
    (LOCAL / "passos.json").write_text(
        json.dumps({k: [p.name for p in v] for k, v in fotos.items()}, indent=1),
        encoding="utf-8")
    return fotos


def fi_del_li(html: str, inici: int) -> int:
    """Posició del </li> que tanca el <li> que comença a `inici` (amb
    llistes niades a dins)."""
    profunditat, i = 0, inici
    patro = re.compile(r"<li[\s>]|</li>")
    for m in patro.finditer(html, inici):
        if m.group().startswith("</"):
            profunditat -= 1
            if profunditat == 0:
                return m.start()
        else:
            profunditat += 1
    raise ValueError("<li> sense tancar")


def galeria(pas: int, fotos: list[Path]) -> str:
    descarta = DESCARTA.get(pas, set())
    if descarta == "tot":
        return ""
    figs = []
    for n, f in enumerate(fotos, 1):
        if n in descarta:
            continue
        figs.append(f'<figure><img src="{f.as_uri()}" alt="Pas {pas}, foto {n}">'
                    f"<figcaption>{pas}.{n}</figcaption></figure>")
    return f'<div class="fotos-oficials">{"".join(figs)}</div>' if figs else ""


def html_amb_fotos(fotos: dict[int, list[Path]]) -> str:
    html = HTML.read_text(encoding="utf-8")
    marques = [m.start() for m in re.finditer(r"<li><strong>[^<]+</strong> \(PDF p\.", html)]
    if len(marques) != 18:
        sys.exit(f"Esperava 18 passos «(PDF p. …)» a l'HTML i n'hi ha {len(marques)}.")
    # De l'últim al primer, perquè les insercions no moguin les posicions.
    for pas, inici in reversed(list(enumerate(marques, 1))):
        fi = fi_del_li(html, inici)
        html = html[:fi] + galeria(pas, fotos.get(pas, [])) + html[fi:]
    avis = ('<p class="avis-fotos">📷 <strong>Fotos:</strong> guia oficial '
            '<em>MeArm V1.1 – Tiny Open Source Robot Arm</em>, de phenoptix (Ben Gray), '
            'a Instructables. Còpia impresa només per a ús a l\'aula, sense finalitat '
            'comercial; no es publica ni es distribueix. Numeració: <strong>pas.foto</strong>.</p>')
    html = html.replace('<h2 id="muntatge-pas-a-pas"', avis + '<h2 id="muntatge-pas-a-pas"', 1) \
        if 'id="muntatge-pas-a-pas"' in html else html
    return html


def imprimeix(html: str, vista: str, desti: Path) -> None:
    cap = (f'<head><script>localStorage.setItem("docentClau","{DOCENT_HASH}");'
           f'localStorage.setItem("vista","{vista}");</script>'
           f"<style>{CSS}{'.avis-docent{display:none!important}' if vista == 'alumnat' else ''}</style>")
    tmp = HTML.with_name(f"_tmp-fotos-{vista}.html")
    tmp.write_text(html.replace("<head>", cap, 1), encoding="utf-8")
    try:
        with tempfile.TemporaryDirectory(prefix="pdfprofile_") as perfil:
            for budget in (8000, 16000, 32000):
                subprocess.run([find_browser(), "--headless=new", "--disable-gpu",
                                "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                                "--allow-file-access-from-files",
                                f"--virtual-time-budget={budget}", f"--user-data-dir={perfil}",
                                f"--print-to-pdf={desti}", tmp.as_uri()], capture_output=True)
                if pdf_valid(desti):
                    break
    finally:
        tmp.unlink(missing_ok=True)
    if not pdf_valid(desti):
        sys.exit(f"No s'ha pogut generar {desti} (si és obert, tanca'l).")
    print(f"{desti.relative_to(ARREL)}: {len(pymupdf.open(desti))} pàgines")


def main() -> None:
    if not HTML.exists():
        sys.exit("Falta l'HTML. Executa primer: py -3.11 web/_generador/generar.py")
    fotos = extreu_fotos()
    html = html_amb_fotos(fotos)
    SORTIDA.mkdir(exist_ok=True)
    imprimeix(html, "alumnat", SORTIDA / "Muntatge_brac_MeArm_fotos_alumnat.pdf")
    imprimeix(html, "docent", SORTIDA / "Muntatge_brac_MeArm_fotos_docent.pdf")


if __name__ == "__main__":
    main()
