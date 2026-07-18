# Fil conductor de robots trimestrals — Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Afegir la capa «robot per parella i trimestre» (mascota T1, braç T2, rover T3) al material del curs sense reescriure les SA: 4 documents transversals, plantilles de fabricació (SVG làser + SCAD 3D), blocs «Cap al robot» a cada banc de reptes i notes de calendari.

**Architecture:** Capa additiva sobre material validat. Documents nous a `Classes/00_General/` (convenció transversal), plantilles de fabricació generades per script a `Recursos/plantilles_laser/` i `Recursos/peces_3d/` (tot text pla, versionable), i modificacions lleus als 8 `Reptes/Reptes_SAn.md`, 4 guies docents (+ els seus documents 1:1) i 2 documents de programació (08, 09c).

**Tech Stack:** Markdown en català, Python 3 (script generador d'SVG), OpenSCAD (fitxers `.scad`, render manual del docent), `tools/qa.py` com a verificador, `web/_generador/generar.py` per regenerar la web.

**Spec:** `docs/superpowers/specs/2026-07-18-fil-conductor-robots-trimestrals-design.md` (llegeix-la abans de començar).

## Global Constraints

- **Tot en català** als documents; comentaris del codi d'alumnat (`.ino`, `.py`) en català **sense accents**. (`tools/genera_plantilles_laser.py` és eina del docent, no codi d'alumnat: accents permesos.)
- **`web/` no s'edita a mà** — només via `py web/_generador/generar.py`.
- **`py tools/qa.py` ha d'acabar amb codi de sortida 0** (cap línia `[error]`) abans de cada commit.
- **La taula d'hores de `08_Sequenciacio_temporal_anual.md` no canvia** (QA la parseja: SA8 continua declarant 6 h; la compressió 6→4 h i la sessió 0 del T3 són notes de prosa).
- Enllaços des de documents publicats a fitxers de `Recursos/` (no presents a la web): embolcallats amb `<!-- web:only-github -->` … `<!-- /web:only-github -->`.
- Transversals nous: nom `00_Nom.md` a `Classes/00_General/`, primer `# H1`, línia `> **Per a qui és?** …` i línia `**Durada:** … · **Maquinari:** …`.
- Guies docents modificades → **sincronitzar el document 1:1** de `Programació didàctica/` (SA2→`11_…`, SA4→`13_…`, SA7→`16_…`, SA8→`17_…`).
- Cap fitxer binari nou al repositori (SVG i SCAD són text).
- Commits en català, Conventional Commits, un per tasca.
- Pins per defecte dels robots (usar-los coherentment a TOTS els documents):
  - **Mascota (UNO):** NeoPixel DIN=6 · LED RGB=9/10/11 · brunzidor=8 · PIR=2 · polsador=3 · DHT11=4 · micròfon=A0 · TEMT6000=A1.
  - **Braç (UNO, SA4):** servo base=9 · servo colze=10 · servo pinça=11 · potenciòmetres A0/A1/A2 · sensor col·lisió=2. **(micro:bit, SA5-SA6):** servos P0/P1/P2 al Micro:shield · grup de ràdio = número de parella.
  - **Rover (UNO):** L298N ENA=5, IN1=4, IN2=3, ENB=6, IN3=7, IN4=8 · HC-SR04 TRIG=12, ECHO=11 · línia esquerra=A0, dreta=A1 · para-xocs (col·lisió)=2.

---

### Task 1: Plantilles de fabricació (script SVG + peces SCAD)

**Files:**
- Create: `tools/genera_plantilles_laser.py`
- Create: `Recursos/plantilles_laser/mascota.svg`, `Recursos/plantilles_laser/brac.svg`, `Recursos/plantilles_laser/rover.svg` (generats per l'script)
- Create: `Recursos/plantilles_laser/LLEGEIX-ME.md`
- Create: `Recursos/peces_3d/escaire_caixa.scad`, `difusor_ull.scad`, `suport_hcsr04.scad`, `roda_boja.scad`, `dit_pinca.scad`, `LLEGEIX-ME.md`

**Interfaces:**
- Produces: els 3 SVG i 5 SCAD que els dossiers de les Tasks 3-5 enllacen amb rutes exactes `../../Recursos/plantilles_laser/<nom>.svg` i `../../Recursos/peces_3d/<nom>.scad`.

- [ ] **Step 1: Escriure l'script generador d'SVG**

Conveni xTool Creative Space: **negre = tall**, **vermell = gravat**. Mides en mm reals (viewBox 1:1). Contingut complet:

```python
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
    e.append(etiqueta(4, 117, "BASE"))
    e.append(rect(125, 105, 120, 106))
    e.append(rect(175, 150, 16, 10))        # pas de cables de la tapa
    e.append(etiqueta(129, 117, "TAPA"))
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
    e.append(rect(185, 70, 120, 40, GRAVAT, r=4))  # nom de l'equip gravat
    e.append(etiqueta(215, 12, "PIS SUPERIOR - grava el nom"))
    desa("rover.svg", 330, 125, e)


if __name__ == "__main__":
    mascota()
    brac()
    rover()
    print("Plantilles generades a Recursos/plantilles_laser/.")
```

- [ ] **Step 2: Executar l'script i verificar els SVG**

Run: `py tools/genera_plantilles_laser.py`
Expected: `mascota.svg: 465x215 mm`, `brac.svg: 285x150 mm`, `rover.svg: 330x125 mm`, missatge final.

Run: `py -c "import xml.etree.ElementTree as ET; [ET.parse(f'Recursos/plantilles_laser/{n}.svg') for n in ('mascota','brac','rover')]; print('SVG ben formats')"`
Expected: `SVG ben formats`

- [ ] **Step 3: Escriure les 5 peces SCAD**

`Recursos/peces_3d/escaire_caixa.scad` (×8 per mascota):

```scad
// Escaire d'unio per a caixa de DM de 3 mm (mascota). Imprimir x8 per robot.
gruix_dm = 3;
costat = 15;
ample = 12;
paret = 3;
difference() {
    union() {
        cube([costat, paret, ample]);
        cube([paret, costat, ample]);
    }
    translate([costat - 6, -1, ample / 2])
        rotate([-90, 0, 0]) cylinder(h = paret + 2, d = 3.4, $fn = 24);
    translate([-1, costat - 6, ample / 2])
        rotate([0, 90, 0]) cylinder(h = paret + 2, d = 3.4, $fn = 24);
}
```

`Recursos/peces_3d/difusor_ull.scad` (×2, imprimir amb PLA blanc, farciment 10 %):

```scad
// Difusor d'ull per a NeoPixel (encaixa al forat de 16 mm del frontal).
difference() {
    union() {
        cylinder(h = 2, d = 20, $fn = 48);       // vora exterior
        translate([0, 0, 2]) cylinder(h = 4, d = 15.8, $fn = 48); // cos que encaixa
    }
    translate([0, 0, 3]) cylinder(h = 4, d = 12, $fn = 48);       // cavitat del LED
}
```

`Recursos/peces_3d/suport_hcsr04.scad` (×1, rover):

```scad
// Suport frontal de l'HC-SR04 (els "ulls" del rover). Cargols M3 a la placa.
difference() {
    union() {
        cube([46, 3, 22]);                        // placa frontal
        translate([0, 0, -3]) cube([46, 15, 3]);  // peu
    }
    translate([11, -1, 12]) rotate([-90, 0, 0]) cylinder(h = 5, d = 16.4, $fn = 48);
    translate([35, -1, 12]) rotate([-90, 0, 0]) cylinder(h = 5, d = 16.4, $fn = 48);
    translate([8, 7.5, -4]) cylinder(h = 5, d = 3.4, $fn = 24);
    translate([38, 7.5, -4]) cylinder(h = 5, d = 3.4, $fn = 24);
}
```

`Recursos/peces_3d/roda_boja.scad` (×1, rover; usa una bola/canica de 16 mm):

```scad
// Roda boja per a canica de 16 mm. Dos forats M3 cap al pis inferior.
difference() {
    cube([14, 30, 12]);
    translate([7, 20, 13]) sphere(d = 16.8, $fn = 64);  // llit de la canica
    translate([7, 5, -1]) cylinder(h = 14, d = 3.4, $fn = 24);
    translate([7, 12, -1]) cylinder(h = 14, d = 3.4, $fn = 24);
}
```

`Recursos/peces_3d/dit_pinca.scad` (×2, braç):

```scad
// Dit de la pinca del brac (x2, un per banda). Es cargola al casquet del servo.
difference() {
    union() {
        cube([8, 40, 6]);                          // dit
        for (i = [0 : 3]) translate([8, 28 + i * 3, 0]) cube([2, 2, 6]); // dents
    }
    translate([4, 5, -1]) cylinder(h = 8, d = 2.2, $fn = 24);  // cargols del casquet
    translate([4, 11, -1]) cylinder(h = 8, d = 2.2, $fn = 24);
}
```

- [ ] **Step 4: Escriure els dos LLEGEIX-ME**

`Recursos/plantilles_laser/LLEGEIX-ME.md` — contingut: títol `# Plantilles de tall làser dels robots`; paràgraf que explica el conveni (negre = tall, vermell = gravat, DM 3 mm, mides 1:1 en mm); taula de 3 files (fitxer, robot, mida del tauler); com regenerar-les (`py tools/genera_plantilles_laser.py` — **no editar els SVG a mà**, editar l'script); com importar-les a xTool Creative Space (importar SVG, assignar tall/gravat per color, potència segons material); nota que cada parella **només personalitza les zones vermelles** (cara de la mascota, nom del rover).

`Recursos/peces_3d/LLEGEIX-ME.md` — contingut: títol `# Peces impreses en 3D dels robots`; taula de 5 files (fitxer, robot, quantitat per robot, material/farciment); com renderitzar (`OpenSCAD → Export STL → Bambu Studio`, PLA, 0,2 mm, sense suports excepte `roda_boja.scad`); nota de la canica de 16 mm per a la roda boja.

- [ ] **Step 5: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: codi de sortida 0, cap línia nova `[error]`.

```bash
git add tools/genera_plantilles_laser.py Recursos/plantilles_laser/ Recursos/peces_3d/
git commit -m "feat: plantilles laser SVG i peces 3D SCAD dels tres robots"
```

---

### Task 2: Document transversal `00_Fil_conductor_robots.md`

**Files:**
- Create: `Classes/00_General/00_Fil_conductor_robots.md`
- Modify: `Classes/00_General/00_LLEGEIX-ME_Classes.md` (afegir 1 línia d'enllaç al nou document, seguint el format de llista existent del fitxer)

**Interfaces:**
- Consumes: rutes de plantilles de la Task 1.
- Produces: el document que les Tasks 3-5 enllacen com `00_Fil_conductor_robots.md`; els blocs «Cap al robot» hi apunten.

- [ ] **Step 1: Escriure el document**

Estructura obligatòria (redacta la prosa en el to dels transversals existents, p. ex. `00_Tauler_reptes.md`):

```markdown
# 🤖 El fil conductor del curs: tres robots, tres trimestres

> **Per a qui és?** Per a tothom. És el mapa dels tres robots que cada parella
> construeix durant el curs i de com cada SA hi aporta una peça. El docent hi
> té el calendari de fabricació; l'alumnat, la visió de cap a on va cada repte.

**Durada:** tot el curs · **Maquinari:** talladora làser xTool S1, impressora 3D Bambu Lab P2S Combo, kits d'aula

## Per què tres robots
[2-3 paràgrafs: l'assignatura es diu Robòtica → cada trimestre acaba amb un robot
real per parella; tres arquetips de la robòtica: social (percep i comunica),
manipulador (actua sobre el món), mòbil (es desplaça sol). El robot NO és una
activitat nova: és on convergeixen els reptes de cada SA.]

## Els tres robots
[Taula: Trimestre | Robot | Arquetip | SA que hi aporten | On es tanca (producte).
Contingut exacte de la taula de la spec, secció «Els tres robots».
Enllaç a cada dossier: 00_Projecte_T1_Mascota.md, 00_Projecte_T2_Brac.md,
00_Projecte_T3_Rover.md.]

## Calendari de fabricació
[Taula: Trimestre | Sessió de fabricació | D'on surt l'hora | Què s'hi fa.
T1: S4 de SA2 (el repte de la S3 fa de producte — palanca oficial del pla de
contingència) · T2: S4 de SA4 (mateixa palanca) · T3: sessió 0 del trimestre
(2 h de comprimir SA8 de 6 a 4 h). Nota en bloc citat: les palanques queden
gastades → el marge del curs és ≈ 0; senyal d'alerta: si el T1 no tanca SA3
al desembre, la mascota del gener passa a peces pretallades pel docent.]

## Com funciona una sessió de fabricació
[Llista numerada: 1) abans de la sessió cada parella té el fitxer personalitzat
validat pel docent; 2) el docent opera la làser, l'alumnat hi assisteix per
rotacions (grups de 2-3 parelles, 10-15 min) mentre la resta munta o programa;
3) impressions 3D llançades entre sessions (el docent gestiona la cua);
4) full de cua públic per màquina: parella | fitxer | estat (pendent / tallat /
lliurat).]

## Material i pressupost
[Taula de compres: DM 3 mm (~12 taulers/trimestre), PLA (2-3 bobines/curs),
portapiles 6xAA (x12), cargols M3 + separadors, L298N x14. Total orientatiu
130-180 EUR. La resta d'electrònica surt dels kits i ES RETORNA al juny
(robots desmuntables).]

## On són les plantilles
[Bloc <!-- web:only-github --> amb enllaços relatius a
../../Recursos/plantilles_laser/ (els 3 SVG + LLEGEIX-ME) i
../../Recursos/peces_3d/ (els 5 SCAD + LLEGEIX-ME), i la comanda de
regeneració py tools/genera_plantilles_laser.py. Tancar amb /web:only-github.]
```

- [ ] **Step 2: Enllaçar des de `00_LLEGEIX-ME_Classes.md`**

Llegeix el fitxer, localitza la llista/taula de transversals i afegeix una entrada per a `00_Fil_conductor_robots.md` amb el mateix format que les veïnes (una línia).

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0.

```bash
git add "Classes/00_General/00_Fil_conductor_robots.md" "Classes/00_General/00_LLEGEIX-ME_Classes.md"
git commit -m "feat: document transversal del fil conductor de robots"
```

---

### Task 3: Dossier T1 Mascota + blocs «Cap al robot» a SA2-SA3

**Files:**
- Create: `Classes/00_General/00_Projecte_T1_Mascota.md`
- Modify: `Reptes/Reptes_SA2.md` (bloc final), `Reptes/Reptes_SA3.md` (bloc final)

**Interfaces:**
- Consumes: `mascota.svg`, `escaire_caixa.scad`, `difusor_ull.scad` (Task 1); pins de la mascota (Global Constraints).
- Produces: dossier enllaçat pels blocs «Cap al robot» com `../Classes/00_General/00_Projecte_T1_Mascota.md`.

- [ ] **Step 1: Escriure el dossier de la mascota**

Estructura obligatòria (això és el patró de dossier; les Tasks 4 i 5 tenen el seu contingut propi però la MATEIXA estructura de seccions):

```markdown
# 🐣 Projecte T1 · La mascota reactiva

> **Per a qui és?** Per a cada parella durant el 1r trimestre. És el dossier del
> primer robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes de SA2
> i SA3 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 1r trimestre (SA2-SA3) · **Maquinari:** UNO + breadboard, NeoPixel, LED RGB, brunzidor, PIR, micròfon, TEMT6000, polsador, DHT11, caixa DM 3 mm

## El robot
[Paràgraf de presentació + diagrama ASCII de la caixa amb els ulls, el PIR i la
reixeta. Què fa: expressa emocions amb llum i so (SA2) i reacciona a l'entorn
amb >=3 comportaments sensor→resposta (SA3).]

## Llista de peces
[Taula: Peça | Origen | Quantitat. Files: 6 plaques DM (plantilla mascota.svg,
tall làser) · 8 escaires (escaire_caixa.scad, impressió 3D) · 2 difusors d'ull
(difusor_ull.scad) · UNO + breadboard (Kit 1) · tira NeoPixel WS2812B (Kit 2) ·
LED RGB KS0312 (Kit 3) · brunzidor (Kit 1/3) · PIR KS0052 (Kit 2) · micròfon
KS0035 (Kit 3) · TEMT6000 KS0098 (Kit 2) · polsador (Kit 1) · DHT11 (Kit 3) ·
cargols M3 x16.]

## Fabricació i personalització
[La plantilla comuna és fixa; cada parella personalitza NOMÉS la zona vermella
(cara: gravat de boca, celles, decoració) sobre una còpia del SVG. Flux: còpia
del fitxer → edició a xTool Creative Space o Inkscape → validació del docent →
cua de tall (S4 de SA2). Bloc web:only-github amb l'enllaç a la plantilla.]

## Muntatge
[Llista numerada de 6-8 passos: base + laterals amb escaires, breadboard
adherida a la base, frontal amb difusors i sensors, cablejat, tapa. Advertència
de polaritat del NeoPixel i del PIR.]

## Cablatge
[Taula: Component | Pin | Notes. EXACTAMENT els pins de Global Constraints
(NeoPixel 6, RGB 9/10/11, brunzidor 8, PIR 2, polsador 3, DHT11 4, micròfon A0,
TEMT6000 A1) + alimentació 5V/GND del NeoPixel amb nota de consum.]

## Què hi aporta cada SA
[Taula: SA | Sessions | Què s'hi construeix | Repte relacionat. SA2: expressions
(colors, animacions NeoPixel, so) → Reptes_SA2. SA3: cada sensor una reacció →
Reptes_SA3. Producte final a SA3-S3: mascota amb >=3 reaccions + fitxa de
personalitat (nom, caràcter, com reacciona i per què).]

## Rúbrica del robot (producte SA3)
[Taula 4 criteris x 4 nivells (Expert/Avançat/Aprenent/Novell), estil de les
rúbriques existents del curs: R1 Fabricació i muntatge (caixa ferma, cablejat
endreçat) · R2 Funcionament (les sortides i sensors funcionen) · R3 Comportaments
(>=3 reaccions sensor→resposta, coherents amb la personalitat) · R4 Fitxa de
personalitat i demostració.]

## Problemes freqüents
[Taula: Símptoma | Causa probable | Solució. Mínim 5 files: NeoPixel no s'encén
(DIN al revés / falta GND comú) · PIR dispara sempre (temps d'estabilització
30-60 s, potenciòmetres de sensibilitat) · micròfon no detecta (llindar
analògic mal calibrat) · DHT11 llegeix NaN (pin/llibreria) · la caixa no tanca
(escaires mal orientades).]
```

- [ ] **Step 2: Afegir el bloc «Cap al robot» als reptes de SA2 i SA3**

Al FINAL de `Reptes/Reptes_SA2.md`, després de l'últim repte:

```markdown
---

## 🤖 Cap al robot del trimestre

Aquest trimestre tot suma cap a la **mascota reactiva** ([dossier](../Classes/00_General/00_Projecte_T1_Mascota.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte A (semàfor)** → el codi de colors d'humor de la mascota (contenta/neutra/enfadada).
- **Repte B (llum d'ambient)** → la «respiració» dels ulls quan la mascota dorm.
- **Repte C** → la veu i les melodies d'estat de la mascota.

El que programes al repte és **directament** una expressió de la teva mascota: guarda el codi, que el reutilitzaràs quan la caixa estigui tallada.
```

(Adapta la línia del Repte C al contingut real de `Reptes_SA2.md` — llegeix el fitxer i mapa cada repte a una expressió de la mascota.)

Al FINAL de `Reptes/Reptes_SA3.md`, mateix format: cada repte de sensors mapat a una **reacció** de la mascota (p. ex. sensor de llum → dormir a les fosques; PIR → saludar quan algú s'acosta; micròfon → despertar-se amb una picada de mans). El paràgraf final recorda que el producte de SA3-S3 és la mascota muntada amb ≥3 reaccions.

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0.

```bash
git add "Classes/00_General/00_Projecte_T1_Mascota.md" Reptes/Reptes_SA2.md Reptes/Reptes_SA3.md
git commit -m "feat: dossier de la mascota T1 i blocs cap al robot a SA2-SA3"
```

---

### Task 4: Dossier T2 Braç + blocs «Cap al robot» a SA4-SA6

**Files:**
- Create: `Classes/00_General/00_Projecte_T2_Brac.md`
- Modify: `Reptes/Reptes_SA4.md`, `Reptes/Reptes_SA5.md`, `Reptes/Reptes_SA6.md` (bloc final a cadascun)

**Interfaces:**
- Consumes: `brac.svg`, `dit_pinca.scad` (Task 1); pins del braç (Global Constraints); patró de dossier (Task 3, Step 1).
- Produces: `00_Projecte_T2_Brac.md` enllaçat pels blocs de SA4-SA6.

- [ ] **Step 1: Escriure el dossier del braç**

MATEIXA estructura de 8 seccions que el dossier de la mascota (Task 3, Step 1). Contingut específic:

- **El robot:** braç de sobretaula de 3 GDL (base giratòria, colze, pinça) amb DOS cervells al llarg del trimestre: Arduino UNO (SA4) i micro:bit (SA5-SA6). Diagrama ASCII del braç.
- **Llista de peces:** 7 peces DM (`brac.svg`) · 2 dits de pinça (`dit_pinca.scad`) · servo Starter (base) + 2 micro servos KS0194 (colze i pinça) · 3 potenciòmetres (Kit 1) · sensor de col·lisió KS0021 (emergència) · UNO + breadboard · micro:bit + Micro:shield (SA5) · segona micro:bit (comandament) · cargols M3 i M2.
- **Cablatge:** DUES taules. Fase Arduino (SA4): servos 9/10/11, pots A0/A1/A2, col·lisió 2, alimentació externa dels servos (piles AA) amb GND comú — advertència en negreta: **mai alimentar 3 servos des de l'USB**. Fase micro:bit (SA5-SA6): servos P0/P1/P2 al Micro:shield amb alimentació externa del shield, grup de ràdio = número de parella.
- **Què hi aporta cada SA:** SA4 control per potenciòmetres + registre/replay · SA5 re-cablatge al micro:bit i comandament per ràdio amb la segona micro:bit (inclinació/botons) · SA6 màquina d'estats (repòs/manual/replay/emergència; el sensor de col·lisió atura els servos). Nota: la histèresi de SA6 es treballa al termòstat de les sessions de SA6, no al braç.
- **Rúbrica (producte SA6):** R1 fabricació i muntatge · R2 moviment (3 articulacions suaus, sense tremolor) · R3 modes i màquina d'estats (diagrama d'estats inclòs) · R4 comandament per ràdio i demostració (agafar i moure un objecte).
- **Problemes freqüents:** servo tremola (alimentació insuficient) · servo força el topall (recorregut 0-180 mal limitat al codi) · ràdio no arriba (grups diferents) · el braç cau (parell insuficient: escurçar segments o limitar càrrega) · micro:bit es reinicia en moure servos (alimentació per USB en lloc del shield).

- [ ] **Step 2: Blocs «Cap al robot» a SA4, SA5 i SA6**

Mateix format que Task 3 Step 2. Llegeix cada `Reptes_SAn.md` i mapa cada repte:
- SA4 → articulacions del braç (control de servo amb potenciòmetre = una articulació; seqüències = replay).
- SA5 → el comandament: ràdio entre les dues micro:bit de la parella, lectura d'inclinació/botons.
- SA6 → els modes del braç: màquina d'estats amb emergència (sensor de col·lisió).
Cada bloc enllaça `../Classes/00_General/00_Projecte_T2_Brac.md` i el fil conductor.

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py` → sortida 0.

```bash
git add "Classes/00_General/00_Projecte_T2_Brac.md" Reptes/Reptes_SA4.md Reptes/Reptes_SA5.md Reptes/Reptes_SA6.md
git commit -m "feat: dossier del brac T2 i blocs cap al robot a SA4-SA6"
```

---

### Task 5: Dossier T3 Rover + blocs «Cap al robot» a SA7-SA9

**Files:**
- Create: `Classes/00_General/00_Projecte_T3_Rover.md`
- Modify: `Reptes/Reptes_SA7.md`, `Reptes/Reptes_SA8.md` (bloc final; per a SA9 llegeix `Reptes/Reptes_SA9.md` **si existeix** — la cobertura QA només exigeix reptes fins a SA8; si no existeix, el mapatge de SA9 va NOMÉS al dossier)

**Interfaces:**
- Consumes: `rover.svg`, `suport_hcsr04.scad`, `roda_boja.scad` (Task 1); pins del rover (Global Constraints); patró de dossier (Task 3, Step 1).
- Produces: `00_Projecte_T3_Rover.md`, referenciat també per la Task 6 (guies SA7/SA8).

- [ ] **Step 1: Escriure el dossier del rover**

MATEIXA estructura de 8 seccions. Contingut específic:

- **El robot:** rover autònom de 2 pisos que substitueix la Imagina 3dBot a SA7: mateixos comportaments (seguir línia, evitar obstacles), però **construït i conegut per dins**. Avantatge clau: pins idèntics per a tota l'aula → el bloc `// === PINS (AJUSTAR) ===` dels `.ino` de SA7 es fixa una sola vegada amb la taula d'aquest dossier.
- **Llista de peces:** 2 plaques DM (`rover.svg`) · roda boja (`roda_boja.scad` + canica 16 mm) · suport HC-SR04 (`suport_hcsr04.scad`) · 2 motoreductors + rodes KS9008 (Kit 2) · L298N (compra de centre) · HC-SR04 (Kit 2) · 2 seguidors de línia KS0050 (un per alumne de la parella) · sensor de col·lisió KS0021 (para-xocs) · portapiles 6×AA · UNO + breadboard petita · brides · separadors M3.
- **Cablatge:** taula amb els pins de Global Constraints (L298N ENA=5/IN1=4/IN2=3/ENB=6/IN3=7/IN4=8, HC-SR04 TRIG=12/ECHO=11, línia A0/A1, para-xocs 2) + esquema d'alimentació: piles 6×AA al L298N, 5 V del L298N a la UNO, **GND comú** en negreta.
- **Sessió 0 de muntatge (2 h):** pla de la sessió en taula (0-15' repartiment i comprovació de peces · 15-60' xassís, motors, roda boja · 60-90' cablatge amb la taula del dossier · 90-120' test de fum: sketch de prova motors endavant/enrere i lectura d'ultrasò per Serial). El sketch de prova és el primer `.ino` de SA7 amb els pins del dossier.
- **Què hi aporta cada SA:** SA7 cinemàtica, trajectòries, línia i obstacles (el rover ÉS la plataforma de la SA) · SA8 micro:bit al pis superior: telemetria per ràdio (distància, estat) cap a una micro:bit base amb OLED KS0271; MPU6050 opcional (+ampliació) · SA9 repte final i competició amb el mateix rover; al juny, desmuntatge i retorn de l'electrònica als kits.
- **Rúbrica (avaluada dins el producte de SA9, dimensió «Projectes i productes»):** R1 fabricació i robustesa (aguanta la competició) · R2 comportaments autònoms (línia + obstacles) · R3 telemetria (dades per ràdio a la base) · R4 documentació tècnica (esquema + codi comentat + diari de proves).
- **Problemes freqüents:** un motor gira al revés (invertir IN1/IN2) · el rover no avança recte (PWM ENA/ENB desigual: calibratge) · L298N s'escalfa (normal amb moderació; piles fluixes) · lectures d'ultrasò erràtiques (GND comú / cable llarg) · la UNO es reinicia (alimentar-la del L298N, no de l'USB, quan els motors van).
- **Pla B (bloc citat):** si un rover no arriba viu a SA9, la parella passa a la Imagina 3dBot o al xassís de reserva del Kit 2; els `.ino` són els mateixos canviant el bloc PINS.

- [ ] **Step 2: Blocs «Cap al robot» a SA7 i SA8**

Mateix format que Task 3 Step 2:
- SA7: el bloc obre el trimestre — «el robot d'aquesta SA és el TEU rover» + enllaç al dossier i recordatori del bloc PINS fixat.
- SA8: telemetria i sensors → el rover connectat (micro:bit al rover + base amb OLED).
- SA9: si `Reptes/Reptes_SA9.md` existeix, bloc breu (el repte final es corre amb el rover); si no, res.

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py` → sortida 0.

```bash
git add "Classes/00_General/00_Projecte_T3_Rover.md" Reptes/Reptes_SA7.md Reptes/Reptes_SA8.md
git commit -m "feat: dossier del rover T3 i blocs cap al robot a SA7-SA8"
```

---

### Task 6: Notes a les guies docents i sincronia 1:1

**Files:**
- Modify: `Classes/SA2/SA2_guia_docent.md` (secció de la S4), `Classes/SA4/SA4_guia_docent.md` (secció de la S4), `Classes/SA7/SA7_guia_docent.md` (inici: sessió 0), `Classes/SA8/SA8_guia_docent.md` (nota de compressió 6→4 h)
- Modify (sincronia 1:1): `Programació didàctica/11_SA2_Sortides_digitals_PWM.md`, `Programació didàctica/13_SA4_Moviment_servos_motors.md`, `Programació didàctica/16_SA7_Robotica_mobil.md`, `Programació didàctica/17_SA8_IoT_IA.md`

**Interfaces:**
- Consumes: dossiers de les Tasks 3-5 (rutes d'enllaç des de `Classes/SAn/`: `../00_General/00_Projecte_…`).
- Produces: res per a tasques posteriors.

- [ ] **Step 1: Nota de fabricació a SA2 i SA4 (guia + doc 1:1)**

A `Classes/SA2/SA2_guia_docent.md`, dins la secció de la S4 (línia ~114, «S4 · `05_panell`»), afegir un bloc citat DESPRÉS del contingut existent (no esborrar-lo — la S4 clàssica queda com a alternativa si el fil conductor no s'aplica un curs):

```markdown
> 🤖 **Fil conductor de robots:** si el curs segueix el fil conductor
> ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md)),
> aquesta S4 és la **sessió de fabricació de la mascota**: el repte de la S3 fa
> de producte (palanca oficial del pla de contingència) i la sessió es dedica a
> personalitzar la cara i tallar les caixes per rotacions
> ([dossier](../00_General/00_Projecte_T1_Mascota.md)). El mini-check de la S4
> es manté a l'inici de la sessió.
```

Mateix patró a `Classes/SA4/SA4_guia_docent.md` (S4 → fabricació del braç, dossier `00_Projecte_T2_Brac.md`). Repercutir la mateixa nota (adaptada al to del document) a `11_SA2_…` i `13_SA4_…` a la secció de sessions corresponent.

- [ ] **Step 2: Sessió 0 a SA7 i compressió a SA8 (guia + doc 1:1)**

A `Classes/SA7/SA7_guia_docent.md`, després de la introducció, bloc citat: amb el fil conductor, el trimestre obre amb una **sessió 0 de muntatge del rover** (2 h provinents de comprimir SA8 de 6 a 4 h — palanca oficial); enllaç al dossier del rover i al pla de sessió que conté; la SA7 es fa amb el rover propi i la 3dBot queda de reserva (pla B del dossier).

A `Classes/SA8/SA8_guia_docent.md`, després de la introducció, bloc citat: amb el fil conductor, SA8 s'imparteix en **4 h** (S1+S2 fusionades: telemetria + disseny IoT — mateixa fusió que ja preveu el pla de contingència); les 2 h alliberades són la sessió 0 de SA7; la S3 d'IA es manté sencera.

Repercutir a `16_SA7_…` i `17_SA8_…`.

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0 — en particular `3) Hores:` sense canvis (la taula del doc 08 no s'ha tocat).

```bash
git add Classes/SA2/SA2_guia_docent.md Classes/SA4/SA4_guia_docent.md Classes/SA7/SA7_guia_docent.md Classes/SA8/SA8_guia_docent.md "Programació didàctica/11_SA2_Sortides_digitals_PWM.md" "Programació didàctica/13_SA4_Moviment_servos_motors.md" "Programació didàctica/16_SA7_Robotica_mobil.md" "Programació didàctica/17_SA8_IoT_IA.md"
git commit -m "docs: notes del fil conductor a les guies docents i docs 1:1"
```

---

### Task 7: Programació didàctica — doc 08 (palanques) i 09c (inventari)

**Files:**
- Modify: `Programació didàctica/08_Sequenciacio_temporal_anual.md` (nova subsecció, SENSE tocar la taula d'hores)
- Modify: `Programació didàctica/09c_Inventari_kits_disponibles.md` (secció «Altre maquinari» + compres)

**Interfaces:**
- Consumes: `00_Fil_conductor_robots.md` (Task 2).
- Produces: res.

- [ ] **Step 1: Subsecció al doc 08**

Afegir després de la secció «Pla de contingència temporal» una subsecció `## Fil conductor de robots i ús del marge` amb: (1) el curs aplica el fil conductor de tres robots (enllaç relatiu `../Classes/00_General/00_Fil_conductor_robots.md`); (2) taula de 3 files — trimestre, sessió de fabricació, palanca usada (S4 SA2 · S4 SA4 · SA8 6→4 h moguda a sessió 0 del T3); (3) advertència: les palanques 2 i 3 del pla de contingència queden **assignades** → el marge efectiu és ≈ 0 i l'única palanca restant és la 3a (SA7 8→6 h); (4) el senyal d'alerta del desembre (SA3 no tancada → mascota amb peces pretallades). **NO modificar la taula «Visió general» ni el subtotal** (el còmput de referència es manté; QA la parseja).

- [ ] **Step 2: Inventari al doc 09c**

A la taula «Altre maquinari (no inclòs als 3 kits)» afegir files: **talladora làser xTool S1** (fabricació dels 3 robots — sessions de fabricació) i **impressora 3D Bambu Lab P2S Combo** (peces auxiliars). Afegir subsecció final `## Compres del fil conductor de robots` amb la taula de consumibles de la spec (DM 3 mm ~12 taulers/trimestre · PLA 2-3 bobines · portapiles 6×AA ×12 · cargols M3 + separadors · canicas 16 mm ×15 · total orientatiu 130-180 EUR) i nota que el L298N ja consta com a compra pendent a la secció existent (ampliar-hi la quantitat a ×14 si cal). Actualitzar la línia de la Imagina 3dBot: passa a **reserva/pla B** de SA7 (enllaç al dossier del rover: `../Classes/00_General/00_Projecte_T3_Rover.md`).

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0 i la línia `3) Hores: … suma 68 h (declarat 68 h)` intacta.

```bash
git add "Programació didàctica/08_Sequenciacio_temporal_anual.md" "Programació didàctica/09c_Inventari_kits_disponibles.md"
git commit -m "docs: fil conductor al doc 08 i maquinari de fabricacio al 09c"
```

---

### Task 8: Regeneració de la web i verificació final

**Files:**
- Modify: `web/` (artefacte regenerat, no editat a mà)

**Interfaces:**
- Consumes: tots els documents de les Tasks 2-7.
- Produces: web publicable.

- [ ] **Step 1: Regenerar la web**

Run: `py web/_generador/generar.py`
Expected: acaba sense traça d'error i les pàgines noves existeixen (comprovar que s'ha generat l'HTML dels 4 transversals nous dins `web/`).

- [ ] **Step 2: QA complet**

Run: `py tools/qa.py`
Expected: sortida 0. Vigilar especialment `1) Enllaços del web` (els enllaços dels blocs «Cap al robot» cap als dossiers i el marcador `only-github` de les plantilles: cap referència trencada) i `6)` (ordre d'itinerari sense canvis).

Si apareix `[enllaç]` trencat: l'origen habitual és una ruta relativa mal calculada des de `Reptes/` cap a `Classes/00_General/` — corregir la ruta al `.md` d'origen i regenerar, mai tocar l'HTML.

- [ ] **Step 3: Committar la web i tancar**

```bash
git add web/
git commit -m "chore: regenera la web amb el fil conductor de robots"
```

Comprovació final de tancament: `git log --oneline -8` ha de mostrar els 8 commits del pla; `py tools/qa.py` verd.

---

## Self-review del pla (fet)

- **Cobertura de la spec:** documents transversals (T2-T5), plantilles (T1), blocs reptes (T3-T5), guies + 1:1 (T6), doc 08 + 09c (T7), QA + web (T8). ✔
- **Fora del pla (coherent amb la spec):** cap canvi a proves, solucionaris ni taula d'hores.
- **Consistència de noms:** `00_Fil_conductor_robots.md`, `00_Projecte_T1_Mascota.md`, `00_Projecte_T2_Brac.md`, `00_Projecte_T3_Rover.md`, `mascota.svg`, `brac.svg`, `rover.svg` — idèntics a totes les tasques. Pins definits una sola vegada a Global Constraints i referenciats. ✔
