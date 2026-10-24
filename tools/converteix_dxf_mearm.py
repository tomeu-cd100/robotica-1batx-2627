"""Converteix el DXF oficial del MeArm V1.1 a l'SVG de tall del curs.

Font: https://github.com/phenoptix/MeArm  (hardware/Robot Chassis/v1/MeArmV1.1.dxf)
Disseny: MeArm, de Ben Gray (phenoptix; kits actuals: mearm.com),
llicència CC BY-SA 3.0. L'SVG resultant és una adaptació (només canvi de
format i de colors), amb la mateixa geometria.

El DXF és en CENTÍMETRES ($INSUNITS = 5): aquí es passa a mil·límetres reals,
amb el viewBox a escala 1:1, igual que la resta de plantilles del curs.

Capes del DXF → conveni de colors del curs (xTool Creative Space):
  - "First Cuts" (forats i finestres interiors) → negre = tall
  - "Layer 1"    (contorns de les peces)          → negre = tall
  - "Last Cut"   (contorn de la placa de base)    → negre = tall
  - "Vector Etch" (logotip i números de peça)     → vermell = gravat
A xTool cal activar «tallar primer l'interior» perquè les peces no es moguin
abans d'acabar-ne els forats (el DXF original ho resolia amb l'ordre de capes).

Ús (cal el paquet ezdxf; no forma part de les dependències del generador):
    py -3.11 tools/converteix_dxf_mearm.py <MeArmV1.1.dxf>
Sortida: Recursos/plantilles_laser/brac_MeArm_v1.1.svg
"""
import math
import sys
from pathlib import Path

import ezdxf
from ezdxf import bbox, path

SORTIDA = (Path(__file__).resolve().parent.parent / "Recursos" /
           "plantilles_laser" / "brac_MeArm_v1.1.svg")
ESCALA = 10.0       # cm -> mm
MARGE = 2.0         # mm al voltant del dibuix
PRECISIO = 0.02     # mm: error maxim en aproximar corbes amb segments
CAPES_TALL = {"First Cuts", "Layer 1", "Last Cut"}
CAPES_GRAVAT = {"Vector Etch"}
TALL = 'fill="none" stroke="#000000" stroke-width="0.2"'
GRAVAT = 'fill="none" stroke="#ff0000" stroke-width="0.2"'


def main(cami_dxf: str) -> None:
    doc = ezdxf.readfile(cami_dxf)
    msp = doc.modelspace()
    caixa = bbox.extents(msp)
    x0, y1 = caixa.extmin.x, caixa.extmax.y
    ample = caixa.size.x * ESCALA + 2 * MARGE
    alt = caixa.size.y * ESCALA + 2 * MARGE

    def punt(v):
        # DXF (y cap amunt, cm) -> SVG (y cap avall, mm)
        return ((v.x - x0) * ESCALA + MARGE, (y1 - v.y) * ESCALA + MARGE)

    traços = {"tall": [], "gravat": []}
    omeses = 0
    for e in msp:
        capa = e.dxf.layer
        if capa in CAPES_TALL:
            tipus = "tall"
        elif capa in CAPES_GRAVAT:
            tipus = "gravat"
        else:
            omeses += 1
            continue
        try:
            p = path.make_path(e)
            pts = [punt(v) for v in p.flattening(PRECISIO / ESCALA)]
        except Exception:
            omeses += 1
            continue
        pts = [q for q in pts if not (math.isnan(q[0]) or math.isnan(q[1]))]
        if len(pts) < 2:
            omeses += 1
            continue
        d = "M" + " L".join(f"{x:.3f},{y:.3f}" for x, y in pts)
        traços[tipus].append(d)

    linies = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{ample:.1f}mm" '
        f'height="{alt:.1f}mm" viewBox="0 0 {ample:.1f} {alt:.1f}">',
        "<!-- MeArm V1.1 (Ben Gray, phenoptix), "
        "CC BY-SA 3.0, github.com/phenoptix/MeArm. Adaptacio de format i "
        "colors: negre = tall, vermell = gravat. Mides en mm reals. -->",
    ]
    linies += [f'<path d="{d}" {TALL}/>' for d in traços["tall"]]
    linies += [f'<path d="{d}" {GRAVAT}/>' for d in traços["gravat"]]
    linies.append("</svg>")
    SORTIDA.write_text("\n".join(linies) + "\n", encoding="utf-8", newline="\n")
    print(f"{SORTIDA.name}: {ample:.1f} x {alt:.1f} mm · "
          f"{len(traços['tall'])} traços de tall, "
          f"{len(traços['gravat'])} de gravat, {omeses} entitats omeses")


if __name__ == "__main__":
    main(sys.argv[1])
