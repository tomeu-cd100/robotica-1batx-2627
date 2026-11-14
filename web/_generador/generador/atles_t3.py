"""Atles del T3: el rover autònom com a mapa del trimestre (dades de generador/atles.py).

El plànol és la pista vista de dalt: el rover sobre la línia, el quadrat de la
SA7, un obstacle, la base de telemetria amb el núvol de l'IoT i l'ordinador de
la IA (SA8), i a la dreta les quatre fases del projecte final (SA9)."""
from __future__ import annotations

from .atles import TRAÇ, Atles, pregunta  # noqa: F401

# n · sa · sessió · nom (targeta) · curt (plànol) · font · sortida web
# globus (bx, by) i punt de la peça on apunta (tx, ty), en unitats del viewBox
CAPITOLS: list[dict] = [
    dict(n=1, sa=7, ses="S1", nom="Moviment bàsic", curt="Moviment",
         src="Classes/SA7/codi/01_moviment_basic/EXPLICACIO.md",
         out="classes/sa7/codi/01-moviment-basic.html", b=(250, 386), t=(300, 362)),
    dict(n=2, sa=7, ses="S2", nom="Trajectòria en quadrat", curt="Quadrat",
         src="Classes/SA7/codi/02_trajectoria_quadrat/EXPLICACIO.md",
         out="classes/sa7/codi/02-trajectoria-quadrat.html", b=(112, 92), t=(150, 160)),
    dict(n=3, sa=7, ses="S3", nom="Evita-obstacles", curt="Obstacle",
         src="Classes/SA7/codi/03_evita_obstacles/EXPLICACIO.md",
         out="classes/sa7/codi/03-evita-obstacles.html", b=(474, 262), t=(452, 312)),
    dict(n=4, sa=7, ses="S4", nom="Seguidor de línia", curt="Línia",
         src="Classes/SA7/codi/04_seguidor_linia/EXPLICACIO.md",
         out="classes/sa7/codi/04-seguidor-linia.html", b=(386, 236), t=(366, 322)),
    dict(n=5, sa=8, ses="S1", nom="L'emissor", curt="Emissor",
         src="Classes/SA8/codi/01_telemetria_emissor_EXPLICACIO.md",
         out="classes/sa8/codi/01-telemetria-emissor.html", b=(250, 280), t=(306, 324)),
    dict(n=6, sa=8, ses="S1", nom="El receptor", curt="Receptor",
         src="Classes/SA8/codi/02_telemetria_receptor_EXPLICACIO.md",
         out="classes/sa8/codi/02-telemetria-receptor.html", b=(724, 246), t=(728, 286)),
    dict(n=7, sa=8, ses="S2", nom="Auditoria d'un producte IoT", curt="Auditoria IoT",
         src="Classes/SA8/SA8_auditoria_iot.md",
         out="classes/sa8/sa8-auditoria-iot.html", b=(636, 72), t=(690, 104)),
    dict(n=8, sa=8, ses="S3", nom="IA de gestos", curt="Gestos",
         src="Classes/SA8/codi/03_ia_gestos_EXPLICACIO.md",
         out="classes/sa8/codi/03-ia-gestos.html", b=(598, 246), t=(626, 282)),
    dict(n=9, sa=8, ses="S3", nom="Teachable Machine", curt="Teachable",
         src="Classes/SA8/SA8_practica_teachable_machine.md",
         out="classes/sa8/sa8-practica-teachable-machine.html", b=(552, 116), t=(568, 146)),
    dict(n=10, sa=9, ses="S1", nom="Idear", curt="Idear",
         src="Classes/SA9/SA9_practica_1_idear.md",
         out="classes/sa9/sa9-practica-1-idear.html", b=(850, 72), t=(902, 104)),
    dict(n=11, sa=9, ses="S2", nom="Prototipar", curt="Prototip",
         src="Classes/SA9/SA9_practica_2_prototipar.md",
         out="classes/sa9/sa9-practica-2-prototipar.html", b=(850, 158), t=(902, 190)),
    dict(n=12, sa=9, ses="S3", nom="Provar", curt="Provar",
         src="Classes/SA9/SA9_practica_3_provar.md",
         out="classes/sa9/sa9-practica-3-provar.html", b=(850, 244), t=(902, 276)),
    dict(n=13, sa=9, ses="S4", nom="Comunicar", curt="Defensa",
         src="Classes/SA9/SA9_practica_4_comunicar.md",
         out="classes/sa9/sa9-practica-4-comunicar.html", b=(850, 330), t=(902, 362)),
]

NOM_SA = {7: "Robòtica mòbil", 8: "IoT i IA", 9: "El projecte final"}

DIBUIX = f"""
<rect x="70" y="110" width="420" height="220" rx="80" stroke="#e8f1ff" stroke-width="5" fill="none" opacity=".9"/>
<text x="84" y="356" fill="#e8f1ff" font-size="11" opacity=".75">PISTA (línia negra)</text>
<rect x="150" y="160" width="100" height="100" stroke="#ffd166" stroke-width="1.6" stroke-dasharray="6 5" fill="none"/>
<path d="M226 160 A24 24 0 0 0 250 184" stroke="#ffd166" stroke-width="1.5" fill="none"/>
<text x="196" y="200" fill="#ffd166" font-size="11">90°</text>
<g {TRAÇ}><rect x="280" y="302" width="90" height="56" rx="6"/>
<rect x="290" y="292" width="34" height="10" rx="2"/><rect x="290" y="358" width="34" height="10" rx="2"/>
<circle cx="378" cy="318" r="7"/><circle cx="378" cy="342" r="7"/>
<rect x="296" y="316" width="22" height="18" rx="2"/></g>
<g fill="#ffd166"><rect x="303" y="321" width="3" height="3"/><rect x="309" y="321" width="3" height="3"/><rect x="306" y="327" width="3" height="3"/></g>
<path d="M362 322h8M362 338h8" stroke="#ffd166" stroke-width="3"/>
<g {TRAÇ}><rect x="430" y="300" width="40" height="40"/><path d="M430 300l40 40M470 300l-40 40" stroke-width="1.2"/></g>
<path d="M386 290 H428" stroke="#ffd166" stroke-width="1.4"/><path d="M386 286v8M428 286v8" stroke="#ffd166" stroke-width="1.4"/>
<text x="390" y="284" fill="#ffd166" font-size="10">15 cm</text>
<path d="M520 312 q16 14 0 28 M534 304 q26 22 0 44 M548 296 q36 30 0 60" stroke="#e8f1ff" stroke-width="2" fill="none" stroke-dasharray="2 6"/>
<g {TRAÇ}><rect x="600" y="280" width="80" height="60" rx="6"/><circle cx="614" cy="310" r="5"/><circle cx="666" cy="310" r="5"/>
<rect x="700" y="286" width="60" height="44" rx="3"/></g>
<g fill="#ffd166"><rect x="632" y="296" width="4" height="4"/><rect x="640" y="296" width="4" height="4"/><rect x="648" y="296" width="4" height="4"/><rect x="640" y="304" width="4" height="4"/><rect x="640" y="312" width="4" height="4"/></g>
<text x="708" y="313" fill="#ffd166" font-size="11">T:23</text>
<text x="604" y="360" fill="#e8f1ff" font-size="11" opacity=".75">BASE</text>
<path d="M684 104 a18 18 0 0 1 30 -16 a22 22 0 0 1 40 8 a16 16 0 0 1 4 32 h-70 a14 14 0 0 1 -4 -24z" stroke="#e8f1ff" stroke-width="2.2" fill="none"/>
<path d="M716 280 V140" stroke="#e8f1ff" stroke-width="1.4" stroke-dasharray="4 5"/>
<text x="722" y="214" fill="#e8f1ff" font-size="10" opacity=".8">WiFi</text>
<g {TRAÇ}><rect x="536" y="146" width="66" height="44" rx="3"/><path d="M526 196 h86 l-8 -6 h-70z"/></g>
<path d="M556 176 l10 -14 l10 10 l10 -16" stroke="#ffd166" stroke-width="1.6" fill="none"/>
<line x1="800" y1="40" x2="800" y2="390" stroke="#e8f1ff" stroke-width="1" stroke-dasharray="2 6" opacity=".5"/>
<text x="812" y="44" fill="#e8f1ff" font-size="10" opacity=".75">PROJECTE FINAL</text>
<g {TRAÇ}><circle cx="912" cy="104" r="12"/><path d="M906 118h12M908 124h8"/></g>
<g {TRAÇ}><path d="M896 200 l18 -18 a7 7 0 1 1 6 6 l-18 18z"/></g>
<g {TRAÇ}><rect x="900" y="266" width="24" height="30" rx="2"/><path d="M906 282 l5 5 l9 -11"/></g>
<g {TRAÇ}><path d="M904 382 V346"/><path d="M904 346 h22 l-6 8 l6 8 h-22"/></g>
"""

T3 = Atles(
    tri=3, sas=(7, 8, 9), capitols=CAPITOLS, nom_sa=NOM_SA, dibuix=DIBUIX,
    titol_planol="EL ROVER AUTÒNOM · PLÀNOL DEL 3R TRIMESTRE",
    robot="El rover autònom", pestanya="El rover", projecte_emoji="🚗",
    projecte="classes/projecte-t3/index.html",
    projecte_docs=[("classes/projecte-t3/00-projecte-t3-rover.html", "Dossier del rover")],
    teoria_extra=[("auditoria-iot", "Auditoria IoT"), ("banc-de-reptes", "Banc de reptes"),
                  ("planificacio-agile-plantilla", "Taulell àgil"), ("dossier-tecnic-plantilla", "Dossier tècnic")],
)
