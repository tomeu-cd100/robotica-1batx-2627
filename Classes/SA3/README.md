# SA3 · Entrades i sensors: el robot percep

Tercera situació d'aprenentatge (**8 h · 4 sessions**, 1r trimestre). El sistema comença a **percebre l'entorn**: entrades digitals (polsador amb *pull-up* i antirebot), entrades analògiques (potenciòmetre, LDR), sensor d'ultrasons i **funcions** pròpies, amb depuració pel monitor/traçador sèrie. Maquinari: Arduino UNO + Keyestudio. Programació oficial: [`Programació didàctica/12_SA3_Entrades_sensors.md`](../../Programació%20didàctica/12_SA3_Entrades_sensors.md).

## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA3_guia_docent.md`](SA3_guia_docent.md) | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA3_fitxa_alumnat.md`](SA3_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA3_fitxa_ampliada.md`](SA3_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA3_esquemes_connexions.md`](SA3_esquemes_connexions.md) | Esquemes i connexions (polsador, divisor de tensió, ultrasons…). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_polsador_debounce.ino` | Entrada digital amb `INPUT_PULLUP` i antirebot; comptador per sèrie. |
| `02_potenciometre_ldr.ino` | Entrades analògiques (`analogRead`), `map()` i llum automàtic. |
| `03_ultrasons_funcio.ino` | Funció `mesuraDistancia()` i Serial Plotter. |
| `04_alarma_aparcament.ino` | Producte: sensor → actuador segons distància. |

## Producte i avaluació

- **Producte:** sistema sensor → actuador (alarma de proximitat o llum automàtic) amb codi modular (funcions).
- **Criteris:** CA1.1, CA2.1, CA2.2 · **Rúbriques:** **R1** (codi) i **R2** (circuit).

## Continuïtat

Ve de la **SA2** (sortides i actuadors) i porta a la **SA4** (moviment): un cop el sistema **percep** (sensors), farem que la percepció **mogui** servos i motors.
