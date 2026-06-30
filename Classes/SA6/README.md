# SA6 · Sistemes de control: llaç obert/tancat i màquines d'estats

Sisena situació d'aprenentatge (**8 h · 4 sessions**, 2n trimestre). El sistema passa de *reaccionar* a **regular-se sol**: **llaç obert vs tancat**, realimentació, consigna i error, control **tot/res amb histèresi**, **màquines d'estats** (`enum`/`switch`) i introducció al **control proporcional**. Maquinari: Arduino UNO + sensors/actuadors. Programació oficial: [`Programació didàctica/15_SA6_Sistemes_control.md`](../../Programació%20didàctica/15_SA6_Sistemes_control.md).

## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA6_guia_docent.md`](SA6_guia_docent.md) | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA6_fitxa_alumnat.md`](SA6_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA6_fitxa_ampliada.md`](SA6_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA6_esquemes_connexions.md`](SA6_esquemes_connexions.md) | Esquemes i connexions (NTC, LDR, actuador, realimentació). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_llac_obert_vs_tancat.ino` | Comparació dels dos tipus de control amb el mateix muntatge. |
| `02_termostat_histeresi.ino` | Control tot/res amb dos llindars (histèresi). |
| `03_maquina_estats.ino` | Màquina d'estats finits amb `enum`/`switch`. |
| `04_control_proporcional.ino` | Regulació proporcional bàsica (base del PID). |

## Producte i avaluació

- **Producte:** sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb **diagrama de blocs** i anàlisi de la resposta.
- **Criteris:** CA3.1, CA1.1 · **Rúbriques:** **R1** (codi), **R3** (control), **R4** (documentació).

## Continuïtat

Ve de la **SA5** (paradigmes de programació) i porta a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).
