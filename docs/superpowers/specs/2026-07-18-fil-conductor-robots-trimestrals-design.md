# Disseny · Fil conductor de robots trimestrals (Mascota / Braç / Rover)

**Data:** 18-07-2026 · **Estat:** aprovat pel docent (brainstorming complet)

## Problema

L'assignatura es diu Robòtica però cap SA no construeix un robot complet: es fan
pràctiques amb components i només la SA7 usa un robot (Imagina 3dBot, de dotació).
Es vol que cada trimestre convergeixi en la construcció d'un robot per parella,
aprofitant la talladora làser **xTool S1** i la impressora 3D **Bambu Lab P2S Combo**.

## Decisions preses (amb el docent)

1. **Encaix:** fil conductor **dins** de les 9 SA actuals. Es mantenen sabers,
   sessions, proves T1/T2/T3 i material validat. Es reorienten reptes i productes.
2. **Agrupament:** **1 robot per parella** (mateix agrupament que els productes de SA).
3. **Tres robots independents** (no un d'evolutiu): un producte complet per trimestre.
4. **Pressupost ajustat (~100-200 €):** DM 3 mm com a material principal, peces 3D
   petites, robots desmuntables per recuperar l'electrònica dels kits.
5. **Sessions de fabricació dedicades** (1 per trimestre), finançades amb les
   **palanques oficials del pla de contingència** de `08_Sequenciacio_temporal_anual.md`.
6. **El rover del 3r trimestre substitueix la Imagina 3dBot** com a plataforma de SA7
   (la 3dBot queda de reserva/demo i pla B).

## Els tres robots

| Trim. | Robot | Arquetip | SA implicades | Sessió de fabricació | Producte avaluable |
|---|---|---|---|---|---|
| 1r | Mascota reactiva | robot social | SA2, SA3 | S4 de SA2 (alliberada: el repte de la S3 fa de producte) | Producte SA3 (tancat a S3; S4 = prova T1 intacta) |
| 2n | Braç robòtic | robot manipulador | SA4, SA5, SA6 | S4 de SA4 (mateixa palanca) | Producte SA6 (tancat a S3; S4 = prova T2 intacta) |
| 3r | Rover autònom | robot mòbil | SA7, SA8, SA9 | Sessió 0 del trimestre (2 h de comprimir SA8 6→4 h, mogudes davant de SA7) | Plataforma de SA7 i base del repte SA9 |

### T1 · Mascota reactiva (SA2 + SA3)

- **Estructura:** tòtem/criatura de DM 3 mm amb encaixos; **plantilla base comuna**
  (caixa), cara i orelles personalitzades per parella (tall/gravat làser).
  Peces 3D petites: difusors d'ulls per als NeoPixel, suport del PIR.
- **Electrònica (tota als kits):** UNO + breadboard a l'interior.
  Sortides (SA2): ulls NeoPixel WS2812B, LED RGB, brunzidor (veu).
  Entrades (SA3): PIR (presència), micròfon KS0035 (pica de mans), TEMT6000
  (dorm a les fosques), polsador (acaronar), DHT11.
- **Reptes reorientats:** SA2 = expressions (colors, sons, animacions);
  SA3 = cada sensor afegeix una reacció. Producte SA3-S3: mascota amb **≥3 reaccions
  sensor→comportament** + fitxa de personalitat.
- **Calendari:** SA1 (6 h) → SA2 (S1-S3 contingut, S4 = disseny de cares + tall en cua)
  → SA3 (muntatge i sensorització). Cap canvi d'hores.

### T2 · Braç robòtic (SA4 + SA5 + SA6)

- **Estructura:** braç MDF clàssic de **3 GDL**: base giratòria, colze, pinça.
  Cada parella disposa de 6 servos (2 micro KS0194 + 1 servo Starter, ×2 alumnes).
  Peces 3D: dents de pinça, adaptadors de casquet de servo.
- **SA4:** control amb potenciòmetres (1 per articulació), moviment suau,
  registre/replay de posicions.
- **SA5 (punt fort):** re-cablatge del braç al **micro:bit + Micro:shield** (servos al
  shield amb alimentació externa): mateix braç, **dos cervells, dos paradigmes**.
  Comandament sense fils = **la segona micro:bit de la parella** per ràdio
  (inclinació/botons).
- **SA6:** màquina d'estats al braç (repòs / manual / replay / emergència amb el sensor
  de col·lisió com a final de carrera). La **histèresi es manté al termòstat** de les
  sessions existents de SA6: el nucli avaluable de la prova T2 no es toca.
- **Calendari:** SA4 (S1-S3, S4 = fabricació del braç) → SA5 → SA6. Cap canvi d'hores.

### T3 · Rover autònom (SA7 + SA8 + SA9)

- **Estructura:** xassís DM de 2 pisos amb plantilla comuna, roda boja impresa en 3D,
  suport d'ultrasò, seguidor de línia sota, para-xocs amb sensor de col·lisió.
  Personalització només gravada (es dissenya en ~20' al tancament del T2 o de casa).
- **Electrònica:** UNO + **L298N** + 2 motoreductors i rodes del Kit 2 + portapiles 6×AA.
  Avantatge sobre la 3dBot: **pins coneguts i idèntics per a tothom** — el bloc
  `// === PINS (AJUSTAR) ===` dels `.ino` de SA7 es fixa una sola vegada.
- **Reordenació (l'única del curs):** SA8 comprimida 6→4 h (palanca oficial: fusionar
  S1+S2) i les 2 h alliberades passen a **sessió 0 de muntatge** a l'inici del trimestre:
  muntatge (2 h) → SA7 (8 h) → SA8 (4 h) → SA9 (10 h) = **24 h, mateix total**.
- **Ús:** SA7 amb el rover propi; SA8 hi afegeix micro:bit (telemetria per ràdio cap a
  una micro:bit base amb OLED, MPU6050); SA9 = repte final/competició amb el mateix
  rover. Al juny es desmunta i l'electrònica torna als kits.

## Fabricació i logística

- **Rol de les màquines:** el docent opera la làser; l'alumnat prepara el fitxer i
  assisteix per rotacions durant la sessió dedicada. Impressions 3D llançades entre
  sessions. **Full de cua per màquina** (parella, fitxer, estat).
- **Plantilles de tall:** SVG a `Recursos/plantilles_laser/` (text pla, versionable,
  lleuger — no reintroduir binaris grans al repositori).
- **Compres (dins el pressupost 100-200 €):** DM 3 mm (~12 taulers/trimestre),
  2-3 bobines PLA, portapiles 6×AA, cargols M3 + separadors, **L298N ×14**
  (12 parelles + reserva; compra ja prevista a `09c`).

## Impacte al material del curs (capa additiva, no reescriptura)

1. **Nous documents transversals** a `Classes/00_General/` (convenció `00_Nom.md`,
   capçalera `> **Per a qui és?**`):
   - `00_Fil_conductor_robots.md` — visió del curs, els 3 robots, calendari de fabricació.
   - `00_Projecte_T1_Mascota.md`, `00_Projecte_T2_Brac.md`, `00_Projecte_T3_Rover.md` —
     llista de peces, esquema de muntatge, cablatge i rúbrica de cada robot.
2. **Plantilles SVG noves** a `Recursos/plantilles_laser/`.
3. **Modificacions lleus:**
   - Cada `Reptes_SAn.md` (SA2-SA9): bloc final **«🤖 Cap al robot del trimestre»**
     (el repte existent no canvia).
   - Guies docents: nota a les sessions afectades (S4 de SA2/SA4, sessió 0 del T3).
   - `08_Sequenciacio_temporal_anual.md`: nota que les palanques de contingència queden
     assignades a fabricació + reordenació del T3.
   - `09c_Inventari_kits_disponibles.md`: afegir xTool S1, Bambu Lab P2S, consumibles
     i L298N ×14.
4. **QA:** `tools/qa.py` ha de continuar passant (el còmput de referència d'hores del
   quadre de `08` no canvia; els enllaços nous, coberts).

## Riscos i mitigacions

| Risc | Mitigació |
|---|---|
| Marge de calendari ≈ 0 (les 3 palanques de contingència queden gastades) | Plantilles comunes (fabricació ràpida); **senyal d'alerta**: si el T1 no tanca SA3 al desembre, la mascota del gener passa a peces pretallades pel docent; única palanca restant: SA7 8→6 h |
| Robot no sobreviu setmanes a l'aula | Caixa d'emmagatzematge per parella; electrònica desmuntable; 3dBot + Kit 2 com a pla B per a SA7/SA9 |
| Servos al Micro:shield (SA5) | Alimentació externa obligatòria; validar amb maquinari real al setembre |
| Cua de màquines s'embussa | Full de cua públic; talls per lots (nesting de diverses parelles per tauler) |
| Validació amb maquinari real pendent | S'afegeix a la llista de pendents de setembre ja existent |

## Fora d'abast

- Reescriure reptes, solucionaris o proves existents.
- Robots individuals (1 per alumne) o robot únic de classe.
- Ús d'electrònica fora dels kits (excepte L298N i consumibles llistats).
- Automatitzar el disseny CAD de l'alumnat (cada parella personalitza sobre plantilla).

## Següent pas

Pla d'implementació (skill writing-plans): redactar els 4 documents transversals,
les plantilles SVG base, els blocs «Cap al robot» i les notes a `08`/`09c`,
amb `tools/qa.py` verd i web regenerada.
