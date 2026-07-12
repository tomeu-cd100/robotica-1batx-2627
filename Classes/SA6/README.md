# SA6 · Sistemes de control: llaç obert/tancat i màquines d'estats

Sisena situació d'aprenentatge (**8 h · 4 sessions**, 2n trimestre). El sistema passa de *reaccionar* a **regular-se sol**: **llaç obert vs tancat**, realimentació, consigna i error, control **tot/res amb histèresi**, **màquines d'estats** (`enum`/`switch`) i introducció al **control proporcional**. Maquinari: Arduino UNO + sensors/actuadors. Programació oficial: [`Programació didàctica/15_SA6_Sistemes_control.md`](../../Programació%20didàctica/15_SA6_Sistemes_control.md).

## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA6_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment. Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE2NDU2MzYx/details)**.

1. **Sessió 1 · Què és un sistema de control?** — fes l'[Activitat 1 de la fitxa](SA6_fitxa_alumnat.md#1-llac-obert-vs-llac-tancat-s1).
2. **Sessió 2 · Control tot/res i histèresi** — fes l'[Activitat 2](SA6_fitxa_alumnat.md#2-termostat-amb-histeresi-s2), amb els [esquemes de connexió](SA6_esquemes_connexions.md).
3. **Sessió 3 · Màquines d'estats + tancament del producte** — fes l'[Activitat 3](SA6_fitxa_alumnat.md#3-maquina-destats-s3), amb el [codi](codi/). El producte (s'avalua amb R1, R3, R4) i la defensa de 2-3' **es tanquen avui**.
4. **Sessió 4 · Prova pràctica T2** — individual, la sessió sencera; pots consultar el teu quadern i els esquemes. El [control proporcional](SA6_fitxa_alumnat.md#ampliacio-opcional--control-proporcional) és **+ampliació opcional**.
5. **Abans d'entregar** — repassa [el meu checklist](SA6_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA6_fitxa_ampliada.md) — aprofundiment i ampliacions.
- [Reptes de la SA6](../../Reptes/Reptes_SA6.md) — tria el teu context.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA6_guia_docent.md`](SA6_guia_docent.md) | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA6_fitxa_alumnat.md`](SA6_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA6_fitxa_ampliada.md`](SA6_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA6_checklist_docent.md`](SA6_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA6_checklist_alumnat.md`](SA6_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA6_esquemes_connexions.md`](SA6_esquemes_connexions.md) | Esquemes i connexions (NTC, LDR, actuador, realimentació). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_llac_obert_vs_tancat.ino` | Comparació dels dos tipus de control amb el mateix muntatge. |
| `02_termostat_histeresi.ino` | Control tot/res amb dos llindars (histèresi). |
| `03_maquina_estats.ino` | Màquina d'estats finits amb `enum`/`switch`. |
| `04_control_proporcional.ino` | Regulació proporcional bàsica (base del PID). |

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb **diagrama de blocs** i anàlisi de la resposta. **Es tanca a la S3.**
- **Prova T2:** la S4 sencera, individual (`Avaluació/Prova_practica_T2.md`).
- **Criteris:** CA3.1, CA1.1 · **Rúbriques:** **R1** (codi), **R3** (control), **R4** (documentació).

## Continuïtat

Ve de la **SA5** (paradigmes de programació) i porta a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).
