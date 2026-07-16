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
  5. Quadern tècnic: les sessions de `web/_generador/quadern_sessions.py`
     quadren amb el quadre d'hores (doc 08) i amb els títols de sessió de
     les guies docents; avisa si falten els PDF generats.
  6. Ordre de l'itinerari: cap pàgina de SA sense clau a DOC_ORDRE_CLAUS.
  7. PII: cap adreça de correu als fitxers versionats .md/.js/.py/.html
     (allowlist per als correus de coautoria; el del docent només avisa).
  8. PDF committats: capçalera %PDF- i mida > 1 KB.
  9. Mojibake: cap seqüència «Ã», «â€», «Â·» als .md versionats.
 10. Sintaxi dels `.py` del solucionari (Reptes/**), com el punt 4.

Ús:  py tools/qa.py          (cal haver generat el web abans per al punt 1;
                              si web/ no té HTML, el punt 1 s'omet amb avís)
"""
from __future__ import annotations

import html.parser
import os
import py_compile
import re
import subprocess
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
            base / f"{sa}_questionari_conceptes.md",  # retrieval (pas «Consolida»)
            base / f"{sa}_exemple_resolt.md",          # model «jo ho faig»
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


# --- 5 · Quadern tècnic: sincronitzat amb guies i quadre d'hores -------------
def comprova_quadern() -> None:
    sys.path.insert(0, str(ARREL / "web" / "_generador"))
    import quadern_sessions as q

    doc = (ARREL / "Programació didàctica" / "08_Sequenciacio_temporal_anual.md")
    text = doc.read_text(encoding="utf-8")
    hores = {f"SA{m.group(1)}": int(m.group(2)) for m in
             re.finditer(r"\|\s*SA(\d)\s*[*†]?\s*\|[^|]+\|\s*(\d+)\s*\|", text)}
    fallats = 0
    for t, sessions in q.SESSIONS.items():
        per_sa: dict[str, int] = {}
        for s in sessions:
            per_sa[s["sa"]] = per_sa.get(s["sa"], 0) + 1
        for sa, n in per_sa.items():
            if hores.get(sa) != n * 2:
                errors.append(f"[quadern] {sa}: {n} sessions ({n*2} h) però el "
                              f"doc 08 en declara {hores.get(sa)} h")
                fallats += 1
        if [s for s in sessions if s.get("prova")] != sessions[-1:]:
            errors.append(f"[quadern] T{t}: la sessió de prova ha de ser exactament l'última")
            fallats += 1
        # Títols coherents amb les guies docents (SA9 usa fases, no capçaleres SESSIÓ).
        for s in sessions:
            if s["sa"] == "SA9":
                continue
            guia = (ARREL / "Classes" / s["sa"] /
                    f"{s['sa']}_guia_docent.md").read_text(encoding="utf-8")
            cap = re.search(rf"^## SESSIÓ {s['s']} \(2 h\) — (.+)$", guia, re.M)
            if not cap or cap.group(1).strip() != s["titol"]:
                errors.append(f"[quadern] {s['sa']} S{s['s']}: títol «{s['titol']}» "
                              f"no coincideix amb la guia docent")
                fallats += 1
    for t in q.SESSIONS:
        pdf = ARREL / "Classes" / "00_General" / "pdf" / f"Quadern_tecnic_T{t}.pdf"
        if not pdf.exists():
            avisos.append(f"[quadern] falta {pdf.relative_to(ARREL)} "
                          f"(genera'l amb generar_quadern_tecnic.py)")
    total = sum(len(s) for s in q.SESSIONS.values())
    print(f"5) Quadern tècnic: {total} sessions, {fallats} incoherències.")


# --- 6 · Ordre de l'itinerari: cap pàgina sense clau a DOC_ORDRE_CLAUS -------
def comprova_ordre_itinerari() -> None:
    """Cada pàgina d'una SA ha de tenir una clau a DOC_ORDRE_CLAUS; si no,
    cau al calaix de sastre del final de l'itinerari sense avisar. Reutilitza
    la llista real de generar.py per no desincronitzar-se."""
    classes = WEB / "classes"
    sa_dirs = sorted(d for d in classes.glob("sa*") if d.is_dir()) if classes.exists() else []
    if not sa_dirs:
        avisos.append("web/classes sense SA: check d'ordre omès (genera el web abans).")
        return
    sys.path.insert(0, str(ARREL / "web" / "_generador"))
    import generar as g
    claus = [k for k in g.DOC_ORDRE_CLAUS if k != "__codi__"]
    sense_clau = 0
    for d in sa_dirs:
        for pag in sorted(d.rglob("*.html")):
            rel = pag.relative_to(d)
            nom = pag.name.lower()
            # Salta portada i pàgines de codi (ordre propi via __codi__).
            if nom in ("index.html", "codi.html") or "codi" in rel.parts:
                continue
            ruta = str(rel).lower().replace(os.sep, "/")
            if not any(c in ruta for c in claus):
                errors.append(f"[ordre] {pag.relative_to(WEB)}: cap clau a "
                              f"DOC_ORDRE_CLAUS (cauria al final de l'itinerari; "
                              f"afegeix-ne una a generar.py)")
                sense_clau += 1
    print(f"6) Ordre itinerari: {len(sa_dirs)} SA, {sense_clau} pàgines sense clau d'ordre.")


# --- 7 · PII: cap adreça de correu als fitxers versionats --------------------
def fitxers_versionats(*patrons: str) -> list[Path]:
    """Fitxers sota control de versions que casen amb els patrons donats.
    core.quotepath=false + -z: rutes amb accents senceres, separades per NUL."""
    try:
        sortida = subprocess.run(
            ["git", "-c", "core.quotepath=false", "ls-files", "-z", "--", *patrons],
            cwd=ARREL, capture_output=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        avisos.append("git ls-files no disponible: checks sobre fitxers versionats omesos.")
        return []
    return [ARREL / p for p in sortida.decode("utf-8").split("\0") if p]


CORREU_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
CORREUS_PERMESOS = {"noreply@anthropic.com"}  # coautoria dels commits
# Partit en dos perquè aquest mateix fitxer no dispari el check.
CORREU_DOCENT = "tomeu@" + "conselldecent.com"


def comprova_pii() -> None:
    fitxers = fitxers_versionats("*.md", "*.js", "*.py", "*.html")
    fallats = 0
    for f in fitxers:
        if not f.exists():
            continue
        for num, linia in enumerate(
                f.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            for m in CORREU_RE.finditer(linia):
                correu = m.group(0).rstrip(".")
                if correu in CORREUS_PERMESOS:
                    continue
                on = f"{f.relative_to(ARREL)}:{num}"
                if correu == CORREU_DOCENT:
                    avisos.append(f"[pii] {on}: correu del docent ({correu})")
                else:
                    errors.append(f"[pii] {on}: adreça de correu «{correu}»")
                    fallats += 1
    print(f"7) PII (correus): {len(fitxers)} fitxers, {fallats} adreces no permeses.")


# --- 8 · PDF committats: capçalera i mida mínimes -----------------------------
def comprova_pdfs() -> None:
    fitxers = fitxers_versionats("*.pdf")
    fallats = 0
    for f in fitxers:
        if not f.exists():
            errors.append(f"[pdf] {f.relative_to(ARREL)}: versionat però absent del disc")
            fallats += 1
            continue
        with f.open("rb") as fh:
            capçalera = fh.read(5)
        mida = f.stat().st_size
        if capçalera != b"%PDF-":
            errors.append(f"[pdf] {f.relative_to(ARREL)}: no comença per %PDF-")
            fallats += 1
        elif mida <= 1024:
            errors.append(f"[pdf] {f.relative_to(ARREL)}: només {mida} B (≤ 1 KB)")
            fallats += 1
    print(f"8) PDF versionats: {len(fitxers)} fitxers, {fallats} invàlids.")


# --- 9 · Mojibake als .md versionats ------------------------------------------
SEQ_MOJIBAKE = ("Ã", "â€", "Â·")  # «Ã», «â€», «Â·»


def comprova_mojibake() -> None:
    fitxers = fitxers_versionats("*.md")
    fallats = 0
    for f in fitxers:
        if not f.exists():
            continue
        for num, linia in enumerate(
                f.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            seqs = [s for s in SEQ_MOJIBAKE if s in linia]
            if seqs:
                errors.append(f"[mojibake] {f.relative_to(ARREL)}:{num}: "
                              f"conté {', '.join('«' + s + '»' for s in seqs)}")
                fallats += 1
    print(f"9) Mojibake: {len(fitxers)} .md, {fallats} línies sospitoses.")


# --- 10 · Sintaxi dels .py del solucionari (Reptes/**) ------------------------
def comprova_python_reptes() -> None:
    fitxers = sorted((ARREL / "Reptes").rglob("*.py"))
    fallats = 0
    for f in fitxers:
        try:
            py_compile.compile(str(f), doraise=True)
        except py_compile.PyCompileError as e:
            errors.append(f"[python-reptes] {f.relative_to(ARREL)}: {e.msg.splitlines()[0]}")
            fallats += 1
    print(f"10) Python del solucionari: {len(fitxers)} fitxers, {fallats} amb errors de sintaxi.")


def main() -> int:
    comprova_enllacos_web()
    comprova_cobertura_sa()
    comprova_hores()
    comprova_python()
    comprova_quadern()
    comprova_ordre_itinerari()
    comprova_pii()
    comprova_pdfs()
    comprova_mojibake()
    comprova_python_reptes()
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
