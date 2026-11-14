"""Atles del T1: el tamagotchi com a mapa del trimestre (dades de generador/atles.py).

El plànol és el banc del 1r trimestre vist de cara: a l'esquerra, l'Arduino del
Blink (SA1), el semàfor i el LED que respira (SA2); al mig, l'ou del tamagotchi
amb la pantalla, els botons, el LED RGB, el sensor de llum i el brunzidor; a la
dreta, la cota de la carcassa."""
from __future__ import annotations

from .atles import TRAÇ, Atles, pregunta  # noqa: F401

# n · sa · sessió · nom (targeta) · curt (plànol) · font · sortida web
# globus (bx, by) i punt de la peça on apunta (tx, ty), en unitats del viewBox
CAPITOLS: list[dict] = [
    dict(n=1, sa=1, ses="S3", nom="Blink: el primer programa", curt="Blink", pr="",
         src="Classes/SA1/codi/blink/EXPLICACIO.md",
         out="classes/sa1/codi/blink.html", b=(96, 214), t=(186, 272)),
    dict(n=2, sa=2, ses="S1", nom="El semàfor", curt="Semàfor", pr="2",
         src="Classes/SA2/codi/02_semafor/EXPLICACIO.md",
         out="classes/sa2/codi/02-semafor.html", b=(196, 92), t=(258, 146)),
    dict(n=3, sa=2, ses="S1", nom="El semàfor amb switch", curt="Switch", pr="2b",
         src="Classes/SA2/codi/02b_semafor_switch/EXPLICACIO.md",
         out="classes/sa2/codi/02b-semafor-switch.html", b=(330, 120), t=(282, 244)),
    dict(n=4, sa=2, ses="S2", nom="La llum que respira", curt="Fade", pr="3",
         src="Classes/SA2/codi/03_fade_pwm/EXPLICACIO.md",
         out="classes/sa2/codi/03-fade-pwm.html", b=(330, 200), t=(356, 254)),
    dict(n=5, sa=2, ses="S2", nom="Colors RGB", curt="RGB", pr="4",
         src="Classes/SA2/codi/04_rgb/EXPLICACIO.md",
         out="classes/sa2/codi/04-rgb.html", b=(450, 54), t=(548, 104)),
    dict(n=6, sa=2, ses="S3", nom="Panell de senyalització", curt="Llum i so", pr="5",
         src="Classes/SA2/codi/05_panell_senyalitzacio/EXPLICACIO.md",
         out="classes/sa2/codi/05-panell-senyalitzacio.html", b=(784, 214), t=(704, 252)),
    dict(n=7, sa=3, ses="S1", nom="El polsador", curt="Botons",
         src="Classes/SA3/codi/01_polsador_debounce/EXPLICACIO.md",
         out="classes/sa3/codi/01-polsador-debounce.html", b=(380, 336), t=(520, 288)),
    dict(n=8, sa=3, ses="S2", nom="Potenciòmetre i sensor de llum", curt="Llum",
         src="Classes/SA3/codi/02_potenciometre_ldr/EXPLICACIO.md",
         out="classes/sa3/codi/02-potenciometre-ldr.html", b=(700, 70), t=(616, 106)),
    dict(n=9, sa=3, ses="S3", nom="La pantalla OLED", curt="Pantalla",
         src="Classes/SA3/codi/03_pantalla_oled/EXPLICACIO.md",
         out="classes/sa3/codi/03-pantalla-oled.html", b=(784, 148), t=(632, 182)),
    dict(n=10, sa=3, ses="S3", nom="El teu tamagotchi", curt="Tamagotchi",
         src="Classes/SA3/codi/05_mascota/EXPLICACIO.md",
         out="classes/sa3/codi/05-mascota.html", b=(784, 316), t=(676, 316)),
]

NOM_SA = {1: "Què és un robot?", 2: "Sortides: llum i so", 3: "Entrades i sensors"}

_RATLLES = "".join(f"M{x} 372l14 14" for x in range(0, 960, 40))
DIBUIX = f"""
<line x1="0" y1="372" x2="960" y2="372" stroke="#e8f1ff" stroke-width="2"/>
<path d="{_RATLLES}" stroke="#e8f1ff" stroke-width="1" opacity=".45"/>
<g {TRAÇ}><rect x="40" y="262" width="170" height="74" rx="4"/><rect x="132" y="290" width="40" height="28"/><rect x="50" y="270" width="60" height="8"/>
<circle cx="186" cy="272" r="5"/></g>
<path d="M174 262 l-6 -10 M186 260 v-12 M198 262 l6 -10" stroke="#ffd166" stroke-width="1.6"/>
<text x="52" y="328" fill="#e8f1ff" font-size="11">ARDUINO UNO · 13</text>
<g {TRAÇ}><rect x="244" y="122" width="44" height="148" rx="8"/><circle cx="266" cy="148" r="13"/><circle cx="266" cy="196" r="13"/><circle cx="266" cy="244" r="13"/>
<path d="M266 270 V372"/></g>
<g {TRAÇ}><circle cx="356" cy="262" r="9"/><path d="M350 271 v20 M362 271 v20"/></g>
<path d="M338 244 a26 26 0 0 1 36 0 M330 236 a38 38 0 0 1 52 0" stroke="#ffd166" stroke-width="1.5" fill="none" stroke-dasharray="3 4"/>
<path d="M560 58 C 650 58, 700 190, 690 270 C 680 340, 620 366, 560 366 C 500 366, 440 340, 430 270 C 420 190, 470 58, 560 58 Z" stroke="#e8f1ff" stroke-width="2.6" fill="none"/>
<g {TRAÇ}><rect x="490" y="146" width="140" height="84" rx="4"/></g>
<g stroke="#ffd166" stroke-width="2" fill="none" stroke-linecap="round"><circle cx="532" cy="176" r="4"/><circle cx="588" cy="176" r="4"/><path d="M542 196 q18 14 36 0"/></g>
<g fill="#ffd166"><rect x="500" y="212" width="34" height="5"/><rect x="544" y="212" width="22" height="5"/><rect x="576" y="212" width="40" height="5"/></g>
<g {TRAÇ}><circle cx="520" cy="288" r="12"/><circle cx="560" cy="288" r="12"/><circle cx="600" cy="288" r="12"/></g>
<text x="508" y="318" fill="#e8f1ff" font-size="9" opacity=".8">MENJAR JUGAR DORMIR</text>
<g {TRAÇ}><circle cx="548" cy="104" r="9"/><path d="M542 113 v12 M548 113 v12 M554 113 v12"/></g>
<g {TRAÇ}><rect x="606" y="98" width="20" height="14" rx="3"/><path d="M610 105 h12"/></g>
<g {TRAÇ}><circle cx="704" cy="252" r="12"/></g>
<path d="M722 240 q10 12 0 24 M732 232 q18 20 0 40" stroke="#e8f1ff" stroke-width="1.8" fill="none"/>
<path d="M740 58 V366" stroke="#ffd166" stroke-width="1.3"/><path d="M734 58h12M734 366h12" stroke="#ffd166" stroke-width="1.3"/>
<text x="746" y="384" fill="#ffd166" font-size="10">carcassa en ou</text>
"""

T1 = Atles(
    tri=1, sas=(1, 2, 3), capitols=CAPITOLS, nom_sa=NOM_SA, dibuix=DIBUIX,
    titol_planol="EL TEU TAMAGOTCHI · PLÀNOL DEL 1R TRIMESTRE",
    robot="El teu tamagotchi", pestanya="El tamagotchi", projecte_emoji="🐣",
    projecte="classes/projecte-t1/index.html",
    projecte_docs=[("classes/projecte-t1/00-projecte-t1-mascota.html", "Dossier del tamagotchi")],
)
