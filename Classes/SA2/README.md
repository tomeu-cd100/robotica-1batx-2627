# SA2 · Sortides digitals i PWM: dona vida als actuadors

Segona situació d'aprenentatge (**8 h · 4 sessions**, 1r trimestre). Es passa d'encendre un LED (SA1) a **controlar múltiples sortides digitals i regular-les amb PWM**: semàfors, efecte *fade*, LED RGB i un panell de senyalització amb so i relé. Maquinari: Arduino UNO + kit Keyestudio/BQ. Programació oficial: [`Programació didàctica/11_SA2_Sortides_digitals_PWM.md`](../../Programació%20didàctica/11_SA2_Sortides_digitals_PWM.md).

## Itinerari per sessions

> Ordre de treball recomanat. La font única de cada activitat és la **fitxa base** ([`SA2_fitxa_alumnat.md`](SA2_fitxa_alumnat.md)); la resta de documents hi donen suport.

1. **Sessió 1 · Variables i la primera sortida** — sortida digital amb constants i variables.
2. **Sessió 2 · Estructures de control: el semàfor** — `for`/`if` i temporització. Munta els circuits amb [esquemes i connexions](SA2_esquemes_connexions.md).
3. **Sessió 3 · PWM: intensitat i color** — `analogWrite`, `map()` i LED RGB. Codi a [`codi/`](codi/).
4. **Sessió 4 · Producte: panell de senyalització** — RGB (estat) + so + relé (rúbriques R1 codi, R2 circuit).

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA2_guia_docent.md`](SA2_guia_docent.md) | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA2_fitxa_alumnat.md`](SA2_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA2_fitxa_ampliada.md`](SA2_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA2_checklist_docent.md`](SA2_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA2_checklist_alumnat.md`](SA2_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA2_esquemes_connexions.md`](SA2_esquemes_connexions.md) | Esquemes i connexions de tots els circuits (LED, semàfor, fade, RGB, panell). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_led_basic.ino` | Sortida digital amb constants i variables. |
| `02_semafor.ino` | Estructures de control (`for`, `if`) i temporització. |
| `03_fade_pwm.ino` | PWM amb `analogWrite` i funció `map()`. |
| `04_rgb.ino` | Barreja de colors amb LED RGB. |
| `05_panell_senyalitzacio.ino` | Producte: RGB (estat) + piezo (avís) + relé (càrrega). |

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** dispositiu de senyalització programable (semàfor amb fase nocturna o panell d'estat RGB + so + càrrega).
- **Criteris:** CA1.1, CA2.1, CA2.2 · **Rúbriques:** **R1** (codi) i **R2** (circuit).

## Continuïtat

Ve de la **SA1** (parpelleig d'un LED) i porta a la **SA3** (entrades i sensors): després de fer que el sistema **actuï**, farem que **percebi** l'entorn.
