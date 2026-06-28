# Memòria de treball — 2026-06-28 · Escalat de la Capa 2 (Wokwi): projectes text

## Objectiu
Reprendre l'escalat de la **Capa 2 (Wokwi)**, més enllà de la mostra SA1+SA2, generant
**tots els projectes en format text** (`diagram.json` + `sketch.ino`) al repositori abans de
publicar-los, segons la decisió del docent ("tot el text primer").

## Què s'ha fet
Generades 4 carpetes noves a `Simulacions/Wokwi/`, una pràctica representativa per SA:

| SA | Carpeta | Pràctica origen (`Classes/`) | Circuit |
|---|---|---|---|
| SA3 | `SA3_alarma_aparcament/` | `04_alarma_aparcament.ino` | HC-SR04 (TRIG=12, ECHO=11) + LED=8 (220 Ω) + buzzer=6 |
| SA4 | `SA4_servo_potenciometre/` | `01_servo_potenciometre.ino` | servo (PWM=9, V+, GND) + potenciòmetre (SIG=A0) |
| SA6 | `SA6_termostat_histeresi/` | `02_termostat_histeresi.ino` | potenciòmetre (=temperatura, A0) + LED=9 (220 Ω) |
| SA8 | `SA8_telemetria_esp32/` | `04_esp32_telemetria.ino` | ESP32 DevKit + potenciòmetre (GPIO34) |

Total a `Simulacions/Wokwi/`: **6 projectes text** (SA1, SA2 ja hi eren).

## Descobriment clau (rectificació)
**Wokwi NO simula el BBC micro:bit amb MicroPython.** Comprovat a la documentació oficial
(`docs.wokwi.com/getting-started/supported-hardware` i `/diagram-format`): les plaques amb
MicroPython a Wokwi són **només Raspberry Pi Pico i ESP32**; el micro:bit només s'hi pot
córrer via TinyGo (Go), no amb el codi `.py` del curs.

**Conseqüència:** la suposició anterior ("Wokwi cobreix micro:bit") era **falsa**. Per tant:
- **SA5** (micro:bit/MicroPython): **no simulable** → es queda amb diagrama i codi a `Classes/SA5/` (com SA7).
- **SA8**: la **part de gestos** (micro:bit) no és simulable, però la **part IoT amb ESP32 sí**.
  És la que s'ha portat a Wokwi.

S'han corregit les afirmacions errònies al `Simulacions/Wokwi/README.md` (ja no diu que
Wokwi executi MicroPython del micro:bit) i s'hi ha afegit una taula de **cobertura per SA**.

## Adaptacions tècniques
- **SA8 / ESP32:** la simulació de Wokwi només es connecta a la xarxa **`Wokwi-GUEST`**
  (SSID fix, sense contrasenya). El `sketch.ino` del projecte Wokwi usa aquestes credencials;
  el sketch original de `Classes/SA8` (amb `EL_TEU_WIFI`) es manté per a placa real.
- **SA3 / HC-SR04:** a Wokwi es prova clicant el sensor i ajustant el control de distància.
- **Part type ESP32 usat:** `board-esp32-devkit-c-v4`; pin analògic `esp:34`, alimentació `esp:3V3`.

## Publicació a Wokwi (feta el mateix dia)
Els 4 projectes s'han **simulat i desat com a públics**. Tots compilen i la simulació funciona:

| SA | Enllaç públic | Verificació |
|---|---|---|
| SA3 | https://wokwi.com/projects/468087916595757057 | LED + brunzidor actius, sèrie mostra ~19,9 cm |
| SA4 | https://wokwi.com/projects/468088128427008001 | servo segueix el potenciòmetre (cal llibreria Servo) |
| SA6 | https://wokwi.com/projects/468088291274023937 | sèrie mostra `actiu=0/1` segons el potenciòmetre |
| SA8 | https://wokwi.com/projects/468088488537422849 | ESP32 compila i arrenca (WiFi `Wokwi-GUEST`) |

Enllaços afegits a: `Simulacions/Wokwi/README.md`, `Classes/SA3/SA3_esquemes_connexions.md`,
`Classes/SA4/SA4_esquemes_connexions.md`, `Classes/SA6/SA6_esquemes_connexions.md`,
`Classes/SA8/SA8_connexions.md`.

## Aprenentatge tècnic nou (publicació)
- **La llibreria `Servo.h` NO ve inclosa a Wokwi**: en compilar surt un botó *Install "Servo"
  library* que crea un `libraries.txt`. S'ha afegit `libraries.txt` al projecte SA4 del repo
  i s'ha corregit el comentari del sketch (deia erròniament "ja inclosa a Wokwi").
- **Model `vfs:diagram.json`**: no existeix fins que s'obre la pestanya *diagram.json* a l'editor;
  cal clicar-la abans del `setValue`.
- **Modal SAVE**: la pàgina té diversos `<input>`; cal triar el del modal per geometria
  (`getBoundingClientRect`, top 250-340, width>200), no `querySelector('input')` (agafa el del
  monitor sèrie). Després, setter natiu + event `input` i clic a SAVE.
- **ESP32**: `type` de placa `board-esp32-devkit-c-v4`, pin analògic `esp:34`, alimentació
  `esp:3V3`. La compilació triga força més (cua de build pública, ~25-40 s).

## No aplicable
SA5 i SA7 (no simulables a Wokwi).
