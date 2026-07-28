# Spec · Codi de referència dels tres robots (només docent) (2026-07-28)

**Necessitat:** el docent vol una implementació completa de referència de cada
robot trimestral (mascota, braç, rover) per avaluar i desencallar parelles,
publicada al web **només en vista docent**. Avui els dossiers remeten a
sketches solts de cada SA; no hi ha codi integrat del producte final.

## Decisions preses (amb el docent)

1. **Implementació completa de referència** per robot (no esquelet, no només
   recull d'enllaços).
2. **Publicació**: fitxers de codi reals + secció «🤖 Codi de referència del
   robot» al solucionari trimestral existent (`Classes/Solucionari/
   Solucionari_Tn_*.md`, pàgines ja només-docent). Cap canvi al generador.
3. **Abast complet**: UNO + parts micro:bit (MicroPython).

## Fitxers nous

```
Classes/Solucionari/codi/
├── T1_mascota/T1_mascota.ino          (UNO)
├── T2_brac/T2_brac.ino                (UNO, fase SA4)
├── T2_brac_microbit_comandament.py    (micro:bit emissora, ràdio)
├── T2_brac_microbit_receptor.py       (micro:bit receptora, Micro:shield)
├── T3_rover/T3_rover.ino              (UNO)
└── T3_rover_microbit_telemetria.py    (micro:bit + OLED, SA8)
```

- Els `.ino` en carpeta pròpia amb el mateix nom (requisit d'arduino-cli).
- Comentaris del codi en **català sense accents** (regla del projecte).
- La ruta conté `Solucionari` → el generador classifica les pàgines com a
  docent automàticament; el codi no s'enllaça des de cap pàgina d'alumnat.

## Contingut per robot (pins = taules de cablatge dels dossiers)

### T1 · Mascota (`T1_mascota.ino`)
- Pins: NeoPixel DIN D6, LED RGB D9/D10/D11, brunzidor D8, PIR D2, polsador
  D3 (pull-up intern + debounce), DHT11 D4, micròfon A0, TEMT6000 A1.
- Màquina d'estats d'emocions (mínim: CONTENT, ESPANTAT, ADORMIT, CURIOS)
  amb ulls NeoPixel + RGB d'humor + melodies del brunzidor.
- Mínim 3 comportaments sensor→resposta (PIR→saluda, foscor→s'adorm,
  soroll→s'espanta; carícia al polsador→content; DHT com a extra comentat).
- Llindars de so/llum calibrables amb constants + lectura per Serial.

### T2 · Braç (`T2_brac.ino` + 2 `.py`)
- `.ino` (fase SA4): servos D9/D10/D11, potenciòmetres A0/A1/A2 amb `map()`
  i límits d'angle per servo (constants), sensor de col·lisió D2 com a
  aturada d'emergència amb màquina d'estats (NORMAL / EMERGENCIA, rearmament
  manual) — l'estil de SA6.
- `.py` comandament (SA5): ràdio, grup = número de parella (constant),
  acceleròmetre o botons → ordres de moviment.
- `.py` receptor: rep ordres, mou els 3 servos a P0/P1/P2 del Micro:shield,
  col·lisió = aturada.

### T3 · Rover (`T3_rover.ino` + 1 `.py`)
- Pins: L298N ENA D5, IN1 D4, IN2 D3, ENB D6, IN3 D7, IN4 D8; HC-SR04
  TRIG D12 / ECHO D11; seguidors de línia A0/A1; para-xocs D2.
- Màquina d'estats amb modes SEGUIR_LINIA / EVITAR_OBSTACLES / ATURAT
  (commutació documentada), funcions de moviment (endavant, enrere, girs,
  aturada), lectura d'ultrasò amb el 0 tractat com a «lluny» (coherent amb
  el criteri de SA3), para-xocs = aturada immediata.
- `.py` telemetria (SA8): micro:bit amb OLED KS0271 mostrant distància/estat
  (rebuts per UART o simulats, segons el muntatge de SA8 existent —
  respectar el patró del solucionari SA8 actual).

## Web (només docent)

- Secció nova «🤖 Codi de referència del robot» a CADA
  `Solucionari_Tn_*.md`: codi explicat per blocs (com el solucionari actual)
  + enllaç als fitxers font del repo.
- Enllaç a aquesta secció des del dossier del robot
  (`00_Projecte_Tn_*.md`) i des de la portada del projecte
  (`00_Projecte_Tn_portada.md`), amb la marca 🔑 (com els enllaços de
  solucionari existents): les pàgines de destí són invisibles en vista
  alumnat.

## CI i QA

- `.github/workflows/qa.yml`, job `compilar-sketches`: afegir
  `- Classes/Solucionari/codi` a `sketch-paths` i les llibreries
  `Adafruit NeoPixel`, `DHT sensor library`, `Adafruit Unified Sensor`
  (cap sketch actual les usa; només s'instal·len de més).
- `.py` micro:bit: coberts automàticament pel check 4 de `tools/qa.py`
  (rglob `codi/*.py` sota `Classes/`). Cap canvi al QA.
- Validació funcional en simulació NO inclosa (maquinari real al setembre,
  com la resta del material pendent de validar).

## Fora d'abast

- Cap canvi al generador web ni a les pàgines d'alumnat.
- Cap variant per a la fase micro:bit del braç amb els 3 potenciòmetres
  (el dossier només demana ràdio en aquesta fase).
- Cap EXPLICACIO.md (això és per a pràctiques d'alumnat; aquí el codi
  s'explica dins del solucionari).
