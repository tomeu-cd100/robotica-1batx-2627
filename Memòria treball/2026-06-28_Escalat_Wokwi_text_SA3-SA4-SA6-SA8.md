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

## Estat
- **Text fet i sincronitzable:** SA3, SA4, SA6, SA8.
- **Pendent (navegador):** publicar els 4 a wokwi.com com a públics i enganxar els enllaços
  al `README.md` i als `Classes/SAx/SAx_esquemes_connexions.md` corresponents (com es va fer
  amb SA1/SA2). Cost estimat ~8-10 passos/pràctica.
- **No aplicable:** SA5 i SA7 (no simulables a Wokwi).

## Per reprendre (publicació)
1. Obrir `https://wokwi.com/projects/new/arduino-uno` (o `.../esp32` per a SA8).
2. Injectar `sketch.ino` i `diagram.json` via `monaco.editor.getModels().setValue(...)`.
3. Simular, desar com a públic (setter natiu al modal SAVE), copiar la URL.
4. Actualitzar enllaços al repo.
