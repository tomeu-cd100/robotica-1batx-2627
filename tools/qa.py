#!/usr/bin/env python3
"""QA automàtic del material i del web generat.

Comprova (i falla amb exit != 0 si troba res):
  1. Enllaços i imatges locals del web generat (web/**/*.html) que apunten
     a fitxers inexistents.
  2. Cobertura de cada SA: que hi hagi guia docent, fitxa base, fitxa
     ampliada, checklists, README, esquemes/connexions (SA1-SA8) i el
     repte + solucionari corresponent (SA1-SA8).
  3. Coherència horària: la taula de `08_Sequenciacio_temporal_anual.md`
     ha de sumar les hores del subtotal declarat.
  4. Sintaxi de tots els `.py` d'alumnat (py_compile; no s'executen).

Ús:  py tools/qa.py          (cal haver generat el web abans per al punt 1;
                              si web/ no té HTML, el punt 1 s'omet amb avís)
"""
from __future__ import annotations

import html.parser
import os
import py_compile
import re
import sys
import urllib.parse
from pathlib import Path

# Consola Windows amb cp1252: força UTF-8 per no petar amb accents/fletxes.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ARREL = Path(__file__).resolve().parent.parent
WEB = ARREL / "web"
errors: list[str] = []
avisos: list[str] = []


# --- 1 · Enllaços locals del web generat -----------------------------------
class Enllacos(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[str] = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for at in ("href", "src"):
            v = d.get(at)
            if v:
                self.refs.append(v)


def comprova_enllacos_web() -> None:
    pagines = sorted(WEB.rglob("*.html"))
    if not pagines:
        avisos.append("web/ sense HTML: link-check omès (genera el web abans).")
        return
    trencats = 0
    for pag in pagines:
        p = Enllacos()
        p.feed(pag.read_text(encoding="utf-8", errors="replace"))
        for ref in p.refs:
            if ref.startswith(("http:", "https:", "mailto:", "data:", "#", "javascript:")):
                continue
            ruta = urllib.parse.unquote(ref.split("#", 1)[0].split("?", 1)[0])
            if not ruta:
                continue
            desti = (WEB / ruta) if ruta.startswith("/") else (pag.parent / ruta)
            try:
                desti = desti.resolve()
            except OSError:
                pass
            if not desti.exists():
                # Els PDF es generen amb generar_pdf.py: a CI corre sempre
                # abans del QA (error si falta); en local web/pdf/ pot estar
                # desactualitzat i només avisa.
                if "pdf/" in ref and not os.environ.get("CI"):
                    avisos.append(f"[pdf local desactualitzat] {pag.relative_to(WEB)} → {ref}")
                    continue
                errors.append(f"[enllaç] {pag.relative_to(WEB)} → {ref}")
                trencats += 1
    print(f"1) Enllaços del web: {len(pagines)} pàgines, {trencats} referències trencades.")


# --- 2 · Cobertura de cada SA ------------------------------------------------
def comprova_cobertura_sa() -> None:
    fallats = 0
    for n in range(1, 10):
        sa = f"SA{n}"
        base = ARREL / "Classes" / sa
        esperats = [
            base / "README.md",
            base / f"{sa}_guia_docent.md",
            base / f"{sa}_fitxa_alumnat.md",
            base / f"{sa}_fitxa_ampliada.md",
            base / f"{sa}_checklist_docent.md",
            base / f"{sa}_checklist_alumnat.md",
        ]
        if n <= 8:
            esq = base / f"{sa}_esquemes_connexions.md"
            con = base / f"{sa}_connexions.md"
            if not esq.exists() and not con.exists():
                errors.append(f"[cobertura] {sa}: falta esquemes/connexions")
                fallats += 1
            esperats.append(ARREL / "Reptes" / f"Reptes_{sa}.md")
            sol = ARREL / "Reptes" / "Solucionari" / sa
            if not sol.is_dir():
                errors.append(f"[cobertura] {sa}: falta Reptes/Solucionari/{sa}/")
                fallats += 1
        for f in esperats:
            if not f.exists():
                errors.append(f"[cobertura] {sa}: falta {f.relative_to(ARREL)}")
                fallats += 1
    print(f"2) Cobertura SA1-SA9: {fallats} mancances.")


# --- 3 · Coherència horària --------------------------------------------------
def comprova_hores() -> None:
    doc = (ARREL / "Programació didàctica" / "08_Sequenciacio_temporal_anual.md")
    text = doc.read_text(encoding="utf-8")
    hores = [int(m.group(2)) for m in re.finditer(r"\|\s*SA(\d)\s*[*†]?\s*\|[^|]+\|\s*(\d+)\s*\|", text)]
    m = re.search(r"Subtotal SA\*\*\s*\|\s*\*\*(\d+)\s*h", text)
    if len(hores) != 9 or not m:
        errors.append(f"[hores] no s'ha pogut llegir la taula del doc 08 (files SA: {len(hores)})")
    else:
        suma, declarat = sum(hores), int(m.group(1))
        if suma != declarat:
            errors.append(f"[hores] la taula suma {suma} h però declara {declarat} h")
        print(f"3) Hores: {hores} → suma {suma} h (declarat {declarat} h).")


# --- 4 · Sintaxi dels .py d'alumnat ------------------------------------------
def comprova_python() -> None:
    fitxers = sorted((ARREL / "Classes").rglob("codi/**/*.py")) + \
              sorted((ARREL / "Classes").rglob("codi/*.py"))
    fallats = 0
    for f in sorted(set(fitxers)):
        try:
            py_compile.compile(str(f), doraise=True)
        except py_compile.PyCompileError as e:
            errors.append(f"[python] {f.relative_to(ARREL)}: {e.msg.splitlines()[0]}")
            fallats += 1
    print(f"4) Python d'alumnat: {len(set(fitxers))} fitxers, {fallats} amb errors de sintaxi.")


def main() -> int:
    comprova_enllacos_web()
    comprova_cobertura_sa()
    comprova_hores()
    comprova_python()
    for a in avisos:
        print(f"⚠️  {a}")
    if errors:
        print(f"\n❌ QA: {len(errors)} problemes:")
        for e in errors:
            print("   " + e)
        return 1
    print("\n✅ QA net.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
