# -*- coding: utf-8 -*-
"""
Genera els PDF de les pàgines d'activitats de l'alumnat a partir de l'HTML
ja generat per generar.py, fent servir Chrome/Edge en mode headless.

Ús:
    py web/_generador/generar.py        # primer: HTML + botons + manifest
    py web/_generador/generar_pdf.py    # després: els PDF (a web/pdf/)

No necessita cap dependència de Python: només Chrome o Edge instal·lats.
"""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
WEB = SCRIPT_DIR.parent
MANIFEST = SCRIPT_DIR / "_activitats.json"

CHROME_CANDIDATES = [
    r"C:/Program Files/Google/Chrome/Application/chrome.exe",
    r"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    r"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    r"C:/Program Files/Microsoft/Edge/Application/msedge.exe",
]


def find_browser() -> str:
    for c in CHROME_CANDIDATES:
        if Path(c).exists():
            return c
    sys.exit("No s'ha trobat Chrome ni Edge. Instal·la'n un o edita CHROME_CANDIDATES.")


def main():
    if not MANIFEST.exists():
        sys.exit("Falta _activitats.json. Executa primer: py web/_generador/generar.py")
    entries = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if not entries:
        print("No hi ha activitats al manifest. Res a fer.")
        return

    browser = find_browser()
    print(f"Generant {len(entries)} PDF amb: {browser}")

    ok, fail = 0, 0
    with tempfile.TemporaryDirectory(prefix="pdfprofile_") as profile:
        for e in entries:
            html_abs = (WEB / e["html"]).resolve()
            pdf_abs = (WEB / e["pdf"]).resolve()
            if not html_abs.exists():
                print(f"  ⚠ falta HTML: {e['html']}")
                fail += 1
                continue
            pdf_abs.parent.mkdir(parents=True, exist_ok=True)
            cmd = [
                browser,
                "--headless=new",
                "--disable-gpu",
                "--no-pdf-header-footer",
                "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=4000",
                f"--user-data-dir={profile}",
                f"--print-to-pdf={pdf_abs}",
                html_abs.as_uri(),
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            if pdf_abs.exists() and pdf_abs.stat().st_size > 0:
                ok += 1
            else:
                fail += 1
                print(f"  ⚠ no s'ha generat: {e['pdf']}\n    {res.stderr.strip()[:300]}")

    print(f"Fet. {ok} PDF generats a web/pdf/" + (f", {fail} amb error." if fail else "."))
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
