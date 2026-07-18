"""Genera les plantilles SVG base dels tres robots del curs (mides en mm).

Conveni de capes per a xTool Creative Space:
  - negre  (#000000) = tall
  - vermell (#ff0000) = gravat (zones de personalització i etiquetes)

Ús:  py tools/genera_plantilles_laser.py
Sortida:  Recursos/plantilles_laser/{mascota,brac,rover}.svg
Material de referència: DM de 3 mm. Forats M3 = diàmetre 3,2 mm.
"""
from pathlib import Path

SORTIDA = Path(__file__).resolve().parent.parent / "Recursos" / "plantilles_laser"
TALL = 'fill="none" stroke="#000000" stroke-width="0.2"'
GRAVAT = 'fill="none" stroke="#ff0000" stroke-width="0.2"'
M3 = 3.2  # diàmetre de forat per a cargol M3


def rect(x, y, w, h, estil=TALL, r=0):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" '
            f'rx="{r}" {estil}/>')


def cercle(cx, cy, d, estil=TALL):
    return f'<circle cx="{cx}" cy="{cy}" r="{d / 2}" {estil}/>'


def etiqueta(x, y, txt, mida=5):
    return (f'<text x="{x}" y="{y}" font-family="sans-serif" '
            f'font-size="{mida}" fill="#ff0000">{txt}</text>')


def desa(nom, ample, alt, elements):
    cos = "\n".join(elements)
    doc = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{ample}mm" '
           f'height="{alt}mm" viewBox="0 0 {ample} {alt}">\n{cos}\n</svg>\n')
    SORTIDA.mkdir(parents=True, exist_ok=True)
    (SORTIDA / nom).write_text(doc, encoding="utf-8")
    print(f"  {nom}: {ample}x{alt} mm")


def mascota():
    """Caixa 120x100x100 (frontal, darrere, 2 laterals, base, tapa).
    Unió amb escaires impreses en 3D i cargols M3 (forats a 8 mm del caire)."""
    e = []

    def forats_escaire(x, y, w, h):
        for fx, fy in [(x + 8, y + 8), (x + w - 8, y + 8),
                       (x + 8, y + h - 8), (x + w - 8, y + h - 8)]:
            e.append(cercle(fx, fy, M3))

    def orella(x, y):
        """Peça d'orella retallable: contorn de tall (cercle Ø45 + pestanya
        10x15 mm per encolar-la al caire superior del frontal) i un contorn
        de gravat interior perque cada equip hi retalli la seva forma."""
        cx, cy = x + 22.5, y + 15 + 22.5
        e.append(rect(x + 17.5, y, 10, 15))          # pestanya d'enganxar
        e.append(cercle(cx, cy, 45))                 # contorn de tall
        e.append(cercle(cx, cy, 30, GRAVAT))          # contorn de gravat (personalitzable)
        e.append(etiqueta(x, y + 15 + 45 + 8, "ORELLA x2 - retalla la teva forma"))

    # Frontal 120x100: ulls, PIR, reixeta brunzidor, zona de cara gravable
    e.append(rect(0, 0, 120, 100))
    forats_escaire(0, 0, 120, 100)
    e.append(cercle(40, 35, 16))            # ull esquerre (difusor NeoPixel)
    e.append(cercle(80, 35, 16))            # ull dret
    e.append(cercle(60, 78, 23))            # finestra del sensor PIR
    for i in range(5):                      # reixeta del brunzidor
        e.append(rect(20, 60 + i * 4, 18, 2))
    e.append(rect(30, 15, 60, 55, GRAVAT, r=4))   # zona de cara personalitzable
    e.append(etiqueta(34, 12, "FRONTAL - personalitza la cara"))
    # Darrere 120x100: forat USB + alimentacio
    e.append(rect(125, 0, 120, 100))
    forats_escaire(125, 0, 120, 100)
    e.append(rect(170, 80, 14, 9))          # pas del cable USB
    e.append(etiqueta(129, 12, "DARRERE"))
    # Laterals 100x100 (x2)
    for i, nom in enumerate(["LATERAL A", "LATERAL B"]):
        x0 = 250 + i * 105
        e.append(rect(x0, 0, 100, 100))
        forats_escaire(x0, 0, 100, 100)
        e.append(etiqueta(x0 + 4, 12, nom))
    # Base i tapa 120x106 (la tapa amb pas de cables)
    e.append(rect(0, 105, 120, 106))
    forats_escaire(0, 105, 120, 106)
    e.append(etiqueta(4, 117, "BASE"))
    e.append(rect(125, 105, 120, 106))
    forats_escaire(125, 105, 120, 106)
    e.append(rect(175, 150, 16, 10))        # pas de cables de la tapa
    e.append(etiqueta(129, 117, "TAPA"))
    # Orelles (x2): peces retallables per personalitzar, zona lliure del tauler
    orella(260, 105)
    orella(370, 105)
    desa("mascota.svg", 465, 215, e)


def brac():
    """Braç 3 GDL: base, torre (x2), 2 segments, suport de pinça.
    Finestra de micro servo 9g: 23,5 x 12,5 mm."""
    e = []

    def finestra_servo(x, y):
        e.append(rect(x, y, 23.5, 12.5))
        e.append(cercle(x - 2.5, y + 6.25, 2))     # orelles de cargol
        e.append(cercle(x + 26, y + 6.25, 2))

    # Base 140x140 amb finestra de servo central i 4 forats M3
    e.append(rect(0, 0, 140, 140, r=6))
    finestra_servo(58, 64)
    for fx, fy in [(10, 10), (130, 10), (10, 130), (130, 130)]:
        e.append(cercle(fx, fy, M3))
    e.append(etiqueta(4, 8, "BASE"))
    # Torre (x2) 60x80
    for i in range(2):
        x0 = 145 + i * 65
        e.append(rect(x0, 0, 60, 80, r=4))
        finestra_servo(x0 + 18, 30)
        e.append(cercle(x0 + 30, 70, M3))
        e.append(etiqueta(x0 + 4, 8, f"TORRE {i + 1}"))
    # Segments del braç (x2) 80x25 amb forats M3 als extrems
    for i in range(2):
        y0 = 85 + i * 30
        e.append(rect(145, y0, 80, 25, r=4))
        e.append(cercle(155, y0 + 12.5, M3))
        e.append(cercle(215, y0 + 12.5, M3))
        e.append(etiqueta(147, y0 - 2, f"SEGMENT {i + 1}"))
    # Suport de la pinça 50x40 amb finestra de servo
    e.append(rect(230, 85, 50, 40, r=4))
    finestra_servo(243, 99)
    e.append(etiqueta(232, 83, "SUPORT PINCA"))
    desa("brac.svg", 285, 150, e)


def rover():
    """Xassís de 2 pisos 160x120, cantonades arrodonides.
    Motors TT (motoreductor groc) subjectats amb brides: parells de ranures."""
    e = []
    # Pis inferior: ranures de brida per als 2 motors, finestra de línia,
    # forats del suport de la roda boja i 4 forats M3 dels separadors
    e.append(rect(0, 0, 160, 120, r=10))
    for y0 in (18, 92):                     # motor esquerre / dret
        for x0 in (35, 65):
            e.append(rect(x0, y0, 3, 10))   # ranures per a brides
    e.append(rect(120, 50, 24, 20))         # finestra dels sensors de línia
    e.append(cercle(20, 55, M3))            # suport roda boja (2 forats)
    e.append(cercle(20, 65, M3))
    for fx, fy in [(10, 10), (150, 10), (10, 110), (150, 110)]:
        e.append(cercle(fx, fy, M3))        # separadors del pis superior
    e.append(etiqueta(50, 12, "PIS INFERIOR"))
    # Pis superior: mateixos 4 forats M3 + finestra de cables + zona gravable
    e.append(rect(165, 0, 160, 120, r=10))
    for fx, fy in [(175, 10), (315, 10), (175, 110), (315, 110)]:
        e.append(cercle(fx, fy, M3))
    e.append(rect(230, 50, 30, 12))         # pas de cables
    e.append(cercle(230, 20, M3))           # suport HC-SR04 (2 forats, 30 mm entre centres)
    e.append(cercle(260, 20, M3))
    e.append(rect(185, 70, 120, 40, GRAVAT, r=4))  # nom de l'equip gravat
    e.append(etiqueta(215, 12, "PIS SUPERIOR - grava el nom"))
    desa("rover.svg", 330, 125, e)


if __name__ == "__main__":
    mascota()
    brac()
    rover()
    print("Plantilles generades a Recursos/plantilles_laser/.")
