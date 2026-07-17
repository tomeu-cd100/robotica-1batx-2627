#!/usr/bin/env python3
"""Canvia la contrasenya de la porta de la vista docent del web.

La porta és FRICCIÓ, no seguretat: el material és públic al repositori i al
codi font del web; només evita que l'alumnat entri per curiositat. Aquesta
eina calcula el hash (djb2, el mateix que fa servir `web/assets/js/lloc.js`)
i el substitueix al fitxer. La contrasenya en clar no queda enlloc.

Ús:
  py tools/canvia_contrasenya_docent.py            # la demana sense mostrar-la
  py tools/canvia_contrasenya_docent.py "secreta"  # o per argument

Després: commiteja i publica el web. Els navegadors on la porta ja estava
oberta hauran de tornar a posar la contrasenya (el hash guardat canvia).
"""

import getpass
import re
import sys
from pathlib import Path

LLOC_JS = Path(__file__).resolve().parent.parent / "web" / "assets" / "js" / "lloc.js"


def djb2(text: str) -> str:
    """Idèntic al clauDocent() de lloc.js (32 bits sense signe, hex)."""
    h = 5381
    for c in text:
        h = ((h << 5) + h + ord(c)) & 0xFFFFFFFF
    return format(h, "x")


def main() -> None:
    if len(sys.argv) > 1:
        contrasenya = sys.argv[1]
    else:
        contrasenya = getpass.getpass("Nova contrasenya de la vista docent: ")
    if not contrasenya:
        sys.exit("Cap contrasenya introduïda; res canviat.")

    text = LLOC_JS.read_text(encoding="utf-8")
    nou, canvis = re.subn(r'var DOCENT_HASH = "[0-9a-f]+";',
                          f'var DOCENT_HASH = "{djb2(contrasenya)}";', text)
    if canvis != 1:
        sys.exit(f"ERROR: esperava 1 línia DOCENT_HASH a {LLOC_JS} i n'he trobat {canvis}.")
    LLOC_JS.write_text(nou, encoding="utf-8")
    print(f"Fet: hash actualitzat a {LLOC_JS.name} ({djb2(contrasenya)}). "
          "Commiteja i publica el web.")


if __name__ == "__main__":
    main()
