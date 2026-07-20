# SA6 · Sistemes de control: llaç obert/tancat i màquines d'estats

Sisena situació d'aprenentatge (**8 h · 4 sessions**, 2n trimestre). El sistema passa de *reaccionar* a **regular-se sol**: **llaç obert vs tancat**, realimentació, consigna i error, control **tot/res amb histèresi**, **màquines d'estats** (`enum`/`switch`) i introducció al **control proporcional**. Maquinari: Arduino UNO + sensors/actuadors. Programació oficial: [`Programació didàctica/15_SA6_Sistemes_control.md`](../../Programació%20didàctica/15_SA6_Sistemes_control.md).

![Control de llaç tancat: el sensor mesura la sortida i el sistema corregeix segons l'error](img/sa6-llac-tancat.svg)

## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Activitat 1 · Llaç obert vs llaç tancat](SA6_fitxa_alumnat.md#1-llac-obert-vs-llac-tancat-s1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE2NDU2MzYx/details) |
| S2 | [Activitat 2 · Termòstat amb histèresi](SA6_fitxa_alumnat.md#2-termostat-amb-histeresi-s2) | Mateixa tasca de Classroom |
| S3 | [Activitat 3 · Màquina d'estats](SA6_fitxa_alumnat.md#3-maquina-destats-s3) | Mateixa tasca de Classroom |
| S4 | **Prova pràctica T2 (individual)** | A l'aula, sessió sencera |
| ⭐ | [Repte triat (A, B o C)](../../Reptes/Reptes_SA6.md) | El docent el valida i pinteu l'estrella al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | El braç amb màquina d'estats i emergència (el producte de la SA, es tanca a la S3) | És el robot del trimestre: [dossier del braç](../00_General/00_Projecte_T2_Brac.md) |

## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA6_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment. Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE2NDU2MzYx/details)**.

1. **Sessió 1 · Què és un sistema de control?** — fes l'[Activitat 1 de la fitxa](SA6_fitxa_alumnat.md#1-llac-obert-vs-llac-tancat-s1).
2. **Sessió 2 · Control tot/res i histèresi** — fes l'[Activitat 2](SA6_fitxa_alumnat.md#2-termostat-amb-histeresi-s2), amb els [esquemes de connexió](SA6_esquemes_connexions.md) i el [diagrama de flux (histèresi + màquina d'estats)](SA6_diagrama_flux.md).
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
| `03_maquina_estats.ino` | Màquina d'estats finits amb `enum`/`switch` (amb esquelet «Si t'encalles» a la seva pàgina). |
| `04_control_proporcional.ino` | Regulació proporcional bàsica (base del PID). |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és a l'`EXPLICACIO.md` de la carpeta del sketch.

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb **diagrama de blocs** i anàlisi de la resposta. **Es tanca a la S3.**
- **Prova T2:** la S4 sencera, individual (`Avaluació/Prova_practica_T2.md`).
- **Criteris:** CA3.1, CA1.1 · **Rúbriques:** **R1** (codi), **R3** (control), **R4** (documentació).

## Continuïtat

Ve de la **SA5** (paradigmes de programació) i porta a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).
