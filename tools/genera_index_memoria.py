#!/usr/bin/env python3
"""Regenera l'index (README.md) de `Memòria treball/`.

Per a cada `AAAA-MM-DD_*.md` agafa el titol (primer H1) i en fa una fila de
taula, ordenada per data i nom de fitxer. El bloc de capçalera (fites i
convencio) es mante fix aqui sota: si canvia, edita'l en aquest script.

Us:  py tools/genera_index_memoria.py
"""
from __future__ import annotations

import re
from pathlib import Path

ARREL = Path(__file__).resolve().parent.parent
CARPETA = ARREL / "Memòria treball"
README = CARPETA / "README.md"

CAPCALERA = """# Memòria de treball

Registre **datat** de l'evolució del projecte. Cada avenç important genera un document nou amb la data del dia, de manera que es pot resseguir l'històric de la feina.

## Fites (per orientar-se sense llegir-ho tot)

- **26-27 juny 2026** — Creació del material: normativa, recursos, programació didàctica (19 docs), material d'aula SA1-SA9, reptes, solucionaris i proves.
- **28-30 juny** — Rondes de millora pedagògica (DUA, PRIMM, Wokwi, fitxes base/ampliada) i **auditoria de nivell per SA** (sostre OK; punt calent SA6, mitigat).
- **2-3 juliol** — Anàlisi pedagògica global: 10 millores (P1-P10: repàs espaiat, mini-checks, fading de bastida…) + 5a ronda (Q1-Q8: targetes de rescat, versió nucli, doc 06b…). **Totes aplicades.**
- **4-9 juliol** — Web: accessibilitat WCAG, hubs d'audiència, vistes docent/alumnat; **auditoria tècnica** (11 propostes P1-P11) i **auditoria d'usabilitat**; checklists i quadern tècnic.
- **10-11 juliol** — Aterratge al **Google Classroom real**: fitxes SA0-SA9 com a tasques amb Forms, prova diagnòstica autocorrectiva, pràctiques avaluables T1, rúbriques importables.
- **12 juliol** — **6a ronda «ulls nous»** (professor nou + alumne) i aplicació dels blocs A (calendari/proves/Chromebook), B (repàs fora de l'aula) i C (manteniment/tècnic).

## Convenció

Cada nou avenç → **document nou** anomenat amb la data (`AAAA-MM-DD_descripcio.md`). No se sobreescriuen els anteriors. Aquest índex es regenera amb `py tools/genera_index_memoria.py`.

## Tots els documents

| Data | Document | Títol |
|---|---|---|
"""


def titol_de(md: Path) -> str:
    for linia in md.read_text(encoding="utf-8").splitlines():
        m = re.match(r"#\s+(.*)", linia)
        if m:
            t = m.group(1).strip()
            # Treu la data repetida del davant del titol, si hi es
            t = re.sub(r"^\d{4}-\d{2}-\d{2}\s*[·—-]\s*", "", t)
            return t
    return md.stem


def main() -> None:
    files = sorted(p for p in CARPETA.glob("2026-*.md"))
    files += sorted(p for p in CARPETA.glob("202[7-9]-*.md"))
    linies = []
    for p in files:
        data = p.name[:10]
        nom = p.name
        linies.append(f"| {data} | [`{nom}`]({nom.replace(' ', '%20')}) | {titol_de(p)} |")
    README.write_text(CAPCALERA + "\n".join(linies) + "\n", encoding="utf-8")
    print(f"README regenerat: {len(files)} documents indexats.")


if __name__ == "__main__":
    main()
