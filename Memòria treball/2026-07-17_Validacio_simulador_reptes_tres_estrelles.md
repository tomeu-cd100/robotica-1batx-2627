# 2026-07-17 · Validació per simulació dels reptes ⭐⭐⭐ (sisena tanda)

Objectiu: descarregar del setembre el pendent «provar al maquinari real les
solucions ⭐⭐⭐». Tot el que és simulable s'ha validat avui **executant els
firmwares/scripts del solucionari** (no reimplementacions), amb tres eines:

1. **wokwi-cli** (simulació AVR/ESP32 del binari real + escenaris automatitzats),
2. **harness d'escriptori** per a la lògica ML de SA8-C (mòdul `microbit` simulat),
3. **simulador de python.microbit.org** via navegador (llum, gestos, botons, ràdio).

## Infraestructura nova (versionada)

- `Simulacions/Validacio/` — 17 projectes Wokwi (15 UNO + 2 ESP32), cadascun amb
  `diagram.json`, `wokwi.toml`, escenaris YAML derivats de les **fites** i
  `execucions.json`; `executar_validacio.py` (compila amb arduino-cli, llança
  wokwi-cli, reintenta talls de xarxa, fusiona resultats parcials, escriu
  `resultats.md`); `SA8_C_desktop/valida_sa8c.py`; README amb el mode d'ús.
- Eines locals: `arduino-cli` 1.5.1 + nuclis `arduino:avr` i `esp32:esp32` 3.3.10 +
  `wokwi-cli` 0.26.1 a `~/.local/bin` (descàrrega directa de GitHub bloquejada per
  la xarxa del centre: resolta via `gh release download`).
- Token Wokwi CI del docent desat com a variable d'entorn d'usuari `WOKWI_CLI_TOKEN`.
- CI: el job d'ESP32 compila també la còpia de validació `SA8_A_wokwi/src`.

## Resultats

- **27/27 execucions wokwi-cli passen**: 15 reptes UNO (SA1-SA4, SA6; 25
  execucions amb potenciòmetres/LDR/HC-SR04/polsadors moguts per escenari) +
  SA8-A ESP32 en dues variants: firmware **original intacte** (sense WiFi: no es
  penja, fita 3) i còpia `Wokwi-GUEST` (camí feliç complet amb **HTTP 200 real**
  per la passarel·la IoT de Wokwi, fites 1-2).
- **SA8-C (ML per centroides): TOT PASSA** al harness d'escriptori: 60 mostres
  guiades (3 perfils de gest), entrenament, **6/6 mostres noves encertades**,
  9 prediccions per ràdio (group=10) i prova de biaix 3/3 amb amplituds ×1,3.
- **micro:bit al navegador (validació visual, no automatitzada)**:
  - SA5-B: histèresi 40/80 confirmada en les DUES direccions (a llum=60 encès
    venint de fosc, apagat venint de clar) + brillantor variable (9→1).
  - SA5-A: comptador amb llindar 1500 (acceleròmetre a 2000 mg), barra de
    progrés per columnes, icona HAPPY a l'objectiu i reset amb botó B.
  - SA8-B receptor: `S1:GREU:31` → SKULL + `id=… nivell=… valor=…` + CSV per
    columnes; `S2:AVIS:12` → X; missatge corrupte → CONFUSED sense petar;
    **detecció de MUTS als 10 s exactes** (S1 i S2).
  - SA5-C: tirada rival «5» injectada per ràdio + gest shake → animació, dau
    propi, cara de resultat i marcador.

**Cap error trobat al codi del solucionari.** Les 3 fallades inicials eren del
harness, no del codi (vegeu troballes).

## Troballes tècniques (documentades al README de Validacio)

- `expect-pin` vol la clau **`value:`**; amb `expected:` compara contra
  `undefined` en silenci (tot falla amb «expected to be undefined»).
- **`wait-serial` només casa amb sortida posterior a l'inici del pas**: mai
  posar `delay` entre el `set-control` que dispara la impressió i l'espera.
- El mòdul `wokwi-photoresistor-sensor` té l'AO **invertida** (més lux → lectura
  més baixa) i rang útil ~39-250: llindars alts s'exerciten amb variant de
  diagrama amb potenciòmetre (SA3-A).
- La xarxa del centre talla de tant en tant el WebSocket de Wokwi (codi 1006):
  l'executor reintenta automàticament.
- El simulador de python.microbit.org pot **injectar missatges de ràdio
  entrants** (camp «Radio message»): els receptors de SA5-C/SA8-B són provables
  sense segona placa.

## Queda per al maquinari real (setembre)

- **SA7 (3dBot)**: pins i motors del robot propietari — no simulable.
- **Ràdio física** micro:bit↔micro:bit (abast, grups simultanis a l'aula) i
  **WiFi real** de l'ESP32 (xarxa 2,4 GHz del centre + Google Form real, 302).
- Sensacions físiques: LDR real (polaritat/rang del mòdul de l'aula), servos
  amb càrrega, brunzidor audible.
- Reclonar l'altra màquina (script llest) i esborrar els 2 backups.
