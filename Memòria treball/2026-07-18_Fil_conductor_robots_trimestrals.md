# 18-07-2026 · Fil conductor de robots trimestrals (mascota · braç · rover)

## Què s'ha fet

S'ha resolt la mancança que l'assignatura es digui *Robòtica* sense construir
cap robot: a partir d'ara **cada trimestre convergeix en un robot per parella**,
com a capa additiva dins les 9 SA existents (cap SA reescrita, cap prova tocada).

| Trim. | Robot | SA | Es fabrica | Producte |
|---|---|---|---|---|
| 1r | **Mascota reactiva** (robot social) | SA2-SA3 | S4 de SA2 | Producte de SA3 (S3) |
| 2n | **Braç robòtic 3 GDL** (manipulador) | SA4-SA6 | S4 de SA4 | Producte de SA6 (S3) |
| 3r | **Rover autònom** (mòbil) | SA7-SA9 | Sessió 0 del T3 (2 h de SA8 6→4 h) | Plataforma SA7 + repte final SA9 |

Fabricació amb la **talladora làser xTool S1** i la **impressora 3D Bambu Lab
P2S Combo** del centre. El rover **substitueix la Imagina 3dBot** a SA7 (queda
de reserva/pla B). Pressupost de consumibles: 130-180 € (DM 3 mm, PLA,
portapiles, cargols, caniques, L298N ×14).

## Material creat

- **Transversal de visió:** `Classes/00_General/00_Fil_conductor_robots.md`
  (per què, calendari de fabricació, pressupost, funcionament de les sessions).
- **3 dossiers de robot** a `Classes/00_General/`: `00_Projecte_T1_Mascota.md`,
  `00_Projecte_T2_Brac.md`, `00_Projecte_T3_Rover.md` — peces, muntatge,
  cablatge amb pins fixats, aportació de cada SA, rúbrica (escala oficial) i
  problemes freqüents.
- **Plantilles de tall:** `tools/genera_plantilles_laser.py` genera els SVG de
  `Recursos/plantilles_laser/` (mascota 465×215, braç 285×150, rover 330×125 mm;
  negre = tall, vermell = gravat). **No editar els SVG a mà.**
- **Peces 3D:** 5 fitxers `.scad` a `Recursos/peces_3d/` (escaires, difusors
  d'ull, suport HC-SR04, roda boja per a canica de 16 mm, dits de pinça).
- **Blocs «🤖 Cap al robot del trimestre»** al final de `Reptes/Reptes_SA2..SA8.md`,
  mapant cada repte real a una capacitat del robot.
- **Notes a les guies docents** de SA2/SA4/SA7/SA8 (+ docs 1:1 `11/13/16/17`) i
  subsecció nova al doc `08` (palanques de contingència assignades) i al `09c`
  (làser, impressora, consumibles, 3dBot com a reserva).

## Decisions

1. Fil conductor **dins** les SA (no projecte paral·lel ni redisseny).
2. **1 robot per parella**, **3 robots independents** (no evolutius).
3. Sessions de fabricació **dedicades**, pagades amb les palanques oficials del
   pla de contingència: la 1a (S4 de SA2 i SA4) i la 2a (SA8 6→4 h) queden
   **gastades** → marge del curs ≈ 0; només resta la 3a (SA7 8→6 h).
   **Senyal d'alerta:** si SA3 no es tanca al desembre, la mascota passa a
   peces pretallades pel docent.
4. Rúbriques dels robots amb l'**escala oficial** del curs (no una de pròpia).
5. Electrònica desmuntable: torna als kits al juny.

## Com s'ha treballat

Spec aprovada per seccions → pla de 8 tasques → execució amb subagents (un
implementador + un revisor per tasca, revisió final de branca sencera amb el
model més capaç). 14 commits, `tools/qa.py` verd a cada pas, 44 tests del
generador web OK. La revisió final va detectar i corregir 12 incoherències
(geometria de plantilles incloses: forats alineats escaire↔panells,
roda boja↔pis inferior, suport HC-SR04↔pis superior).

## Addenda (mateix dia): xassís del rover d'Antonio Romero

El docent ha aportat el material «Vehicle amb micro:bit» d'**Antonio Romero**
(CC BY-NC-SA 4.0, derivat del Taller 8 de «Connectem amb les plaques», XTEC):
guies PDF (cartó/làser/3D), 66 programes MakeCode i un **xassís de tall làser
JA PROVAT** en tall real. Decisió del docent: **adoptar aquest xassís com a
oficial del rover T3** (amb crèdit i llicència pròpia del fitxer,
`Recursos/plantilles_laser/xassis_rover_ARomero.svg`), mantenir la nostra
electrònica UNO + L298N fixada amb brides/velcro, i descartar la part de
càmera IA (el centre no en té). El `rover.svg` de 2 pisos queda com a
alternativa no provada. La carpeta font (`Recursos/rover/`, 101 MB de .hex i
PDF) queda **fora del repositori** (gitignored) — només es versiona l'SVG
amb el crèdit.

## Pendent

- **Setembre (maquinari real):** tall de prova de les plantilles pròpies amb
  DM real (mascota i braç; el xassís Romero ja està provat), impressió de
  prova dels 5 SCAD, validar l'alimentació dels 3 servos del braç i el L298N
  del rover, i decidir les posicions definitives de l'electrònica sobre el
  xassís Romero. S'afegeix a la llista de pendents de maquinari real.
- Fotos de robots muntats per als dossiers quan hi hagi prototips.
