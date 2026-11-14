"""Atles del T2: el braç MeArm com a mapa del trimestre (dades de generador/atles.py)."""
from __future__ import annotations

from .atles import TRAÇ as _TRAÇ, Atles, pregunta  # noqa: F401

# n · sa · sessió · nom (targeta) · curt (plànol) · font · sortida web
# globus (bx, by) i punt de la peça on apunta (tx, ty), en unitats del viewBox
CAPITOLS: list[dict] = [
    dict(n=1, sa=4, ses="S1", nom="El servo", curt="Servo",
         src="Classes/SA4/codi/01_servo_potenciometre/EXPLICACIO.md",
         out="classes/sa4/codi/01-servo-potenciometre.html", b=(466, 232), t=(460, 280)),
    dict(n=2, sa=4, ses="S2", nom="El motor i el pont H", curt="Pont H",
         src="Classes/SA4/codi/02_motor_pont_h/EXPLICACIO.md",
         out="classes/sa4/codi/02-motor-pont-h.html", b=(300, 262), t=(292, 304)),
    dict(n=3, sa=4, ses="S3", nom="Del sensor al braç", curt="Ultrasons",
         src="Classes/SA4/codi/03_ultrasons_brac/EXPLICACIO.md",
         out="classes/sa4/codi/03-ultrasons-brac.html", b=(612, 266), t=(602, 308)),
    dict(n=4, sa=4, ses="S4", nom="El braç amb potenciòmetres", curt="4 servos",
         src="Classes/SA4/codi/04_brac_potenciometres/EXPLICACIO.md",
         out="classes/sa4/codi/04-brac-potenciometres.html", b=(330, 118), t=(398, 164)),
    dict(n=5, sa=5, ses="S1", nom="El selector d'articulació", curt="Selector",
         src="Classes/SA5/codi/01_selector_articulacio_EXPLICACIO.md",
         out="classes/sa5/codi/01-selector-articulacio.html", b=(856, 252), t=(836, 296)),
    dict(n=6, sa=5, ses="S2", nom="La inclinació com a gest", curt="Inclinació",
         src="Classes/SA5/codi/02_inclinacio_EXPLICACIO.md",
         out="classes/sa5/codi/02-inclinacio.html", b=(848, 200), t=(816, 268)),
    dict(n=7, sa=5, ses="S2", nom="El braç obeeix ordres", curt="Ordres",
         src="Classes/SA5/codi/04_brac_ordres/EXPLICACIO.md",
         out="classes/sa5/codi/04-brac-ordres.html", b=(110, 232), t=(112, 272)),
    dict(n=8, sa=5, ses="S3", nom="Ràdio: el comandament", curt="Ràdio",
         src="Classes/SA5/codi/03_radio_comandament_EXPLICACIO.md",
         out="classes/sa5/codi/03-radio-comandament.html", b=(716, 166), t=(716, 214)),
    dict(n=9, sa=6, ses="S1", nom="El homing del braç", curt="Final de carrera",
         src="Classes/SA6/codi/01_llac_obert_vs_tancat/EXPLICACIO.md",
         out="classes/sa6/codi/01-llac-obert-vs-tancat.html", b=(548, 214), t=(544, 314)),
    dict(n=10, sa=6, ses="S2", nom="La pinça automàtica", curt="Pinça",
         src="Classes/SA6/codi/02_pinca_histeresi/EXPLICACIO.md",
         out="classes/sa6/codi/02-pinca-histeresi.html", b=(664, 66), t=(612, 106)),
    dict(n=11, sa=6, ses="S3", nom="La màquina d'estats", curt="Estats",
         src="Classes/SA6/codi/03_maquina_estats/EXPLICACIO.md",
         out="classes/sa6/codi/03-maquina-estats.html", b=(234, 222), t=(186, 288)),
]

NOM_SA = {4: "Moviment", 5: "El comandament", 6: "El control"}

_RATLLES = "".join(f"M{x} 340l14 14" for x in range(0, 960, 40))
DIBUIX = f"""
<line x1="0" y1="340" x2="960" y2="340" stroke="#e8f1ff" stroke-width="2"/>
<path d="{_RATLLES}" stroke="#e8f1ff" stroke-width="1" opacity=".45"/>
<g {_TRAÇ}><rect x="60" y="272" width="160" height="68" rx="4"/><rect x="150" y="296" width="40" height="28"/><rect x="70" y="280" width="56" height="8"/></g>
<text x="72" y="332" fill="#e8f1ff" font-size="11">ARDUINO UNO</text>
<g {_TRAÇ}><circle cx="90" cy="378" r="13"/><circle cx="130" cy="378" r="13"/><circle cx="170" cy="378" r="13"/><circle cx="210" cy="378" r="13"/></g>
<path d="M90 378v-11M130 378l8-8M170 378h11M210 378l-8-8" stroke="#e8f1ff" stroke-width="2"/>
<g {_TRAÇ}><rect x="264" y="306" width="56" height="30" rx="6"/><rect x="320" y="315" width="12" height="12"/><rect x="252" y="298" width="14" height="42" rx="2"/></g>
<g {_TRAÇ}><rect x="395" y="306" width="130" height="34" rx="4"/><rect x="430" y="282" width="60" height="26" rx="3"/>
<path d="M455 288 L392 172 L414 160 L478 276 Z"/><path d="M398 162 L560 114 L566 134 L408 184 Z"/>
<circle cx="403" cy="168" r="10"/><circle cx="460" cy="286" r="10"/><rect x="556" y="106" width="30" height="34" rx="3"/>
<path d="M586 110 l34 -10 l3 10 l-30 10Z M586 134 l34 10 l-3 10 l-30 -12Z"/>
<rect x="534" y="316" width="20" height="22" rx="2"/><path d="M536 316 l-10 -10"/></g>
<path d="M460 286 L460 96 M403 168 L372 112" stroke="#e8f1ff" stroke-width="1" stroke-dasharray="10 4 2 4" opacity=".55"/>
<path d="M520 286 A60 60 0 0 0 400 286" stroke="#ffd166" stroke-width="1.5" fill="none"/>
<path d="M520 286l-6 -8M400 286l6 -8" stroke="#ffd166" stroke-width="1.5"/>
<text x="436" y="262" fill="#ffd166" font-size="11">0°–180°</text>
<g {_TRAÇ}><rect x="570" y="308" width="84" height="32" rx="3"/><circle cx="592" cy="324" r="11"/><circle cx="632" cy="324" r="11"/></g>
<path d="M664 312 q14 12 0 24 M677 304 q22 20 0 40" stroke="#e8f1ff" stroke-width="2" fill="none"/>
<g {_TRAÇ}><rect x="740" y="268" width="96" height="72" rx="6"/><circle cx="758" cy="304" r="6"/><circle cx="818" cy="304" r="6"/></g>
<g fill="#ffd166"><rect x="776" y="286" width="5" height="5"/><rect x="786" y="286" width="5" height="5"/><rect x="796" y="286" width="5" height="5"/><rect x="786" y="296" width="5" height="5"/><rect x="786" y="306" width="5" height="5"/><rect x="776" y="316" width="5" height="5"/><rect x="796" y="316" width="5" height="5"/></g>
<path d="M740 238 q-20 -20 -44 0 M750 228 q-32 -34 -64 0" stroke="#e8f1ff" stroke-width="2" fill="none" stroke-dasharray="2 6"/>
"""

T2 = Atles(
    tri=2, sas=(4, 5, 6), capitols=CAPITOLS, nom_sa=NOM_SA, dibuix=DIBUIX,
    titol_planol="EL BRAÇ ROBÒTIC MEARM · PLÀNOL DEL 2N TRIMESTRE",
    robot="El braç robòtic MeArm", pestanya="El braç", projecte_emoji="🦾",
    projecte="classes/projecte-t2/index.html",
    projecte_docs=[("classes/projecte-t2/00-projecte-t2-brac.html", "Dossier del braç")],
)

# Noms de mòdul (els fan servir el generador i els tests)
capitol_de = T2.capitol_de
sa_de = T2.sa_de
mapa_html = T2.mapa_html
llista_peces_html = T2.llista_peces_html
panell_html = T2.panell_html
