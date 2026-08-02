# SA9 · Repte final integrador (opció competició)

Novena i última situació d'aprenentatge (**10 h · 5 sessions**, 3r trimestre). És el **projecte de síntesi** del curs: **cadascú** dissenya, construeix, programa, documenta i defensa **el seu** sistema robòtic autònom que resol un repte real, integrant **tot l'après (SA1-SA8)**. Opció de vincular-lo a una **competició** (WRO, RoboCup Junior, FTC) o al **Treball de Recerca**. Maquinari i llenguatge **lliures**. Programació oficial: [`Programació didàctica/18_SA9_Projecte_final.md`](../../Programació%20didàctica/18_SA9_Projecte_final.md).

![Mètode de projecte: analitzar, dissenyar, construir, provar i millorar de manera iterativa](img/sa9-metode-projecte.svg)

## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Sessió 1 · Idear (el meu disseny)](SA9_fitxa_alumnat.md#3-disseny) | [Tasca de Classroom (una per alumne/a)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3OTM1Nzkw/details) |
| S2 | [Sessió 2 · Prototipar (planificació)](SA9_fitxa_alumnat.md#4-planificacio) | Mateixa tasca de Classroom |
| S3 | [Sessió 3 · Provar (proves i iteracions)](SA9_fitxa_alumnat.md#5-proves-i-iteracions) | Mateixa tasca de Classroom |
| S4 | [Sessió 4 · Comunicar (defensa)](SA9_fitxa_alumnat.md#6-defensa-s4) | Mateixa tasca de Classroom |
| S5 | **Prova pràctica T3 (individual, per estacions)** | A l'aula, sessió sencera |
| ⭐ | [Repte final integrador](plantilles/Banc_de_reptes.md) | El docent el valida com a part del producte del projecte, a la defensa de la S4 |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | El rover al repte final, demostrat a la **mostra** de la S4 | Es tanca al dossier del rover: [dossier del rover](../00_General/00_Projecte_T3_Rover.md) |

## Itinerari per sessions (per fases)

> El projecte segueix el **mètode de projecte** del curs ([diagrama del mètode](SA9_diagrama_flux.md) — mira'l per saber sempre quin és el següent pas). La teva feina és a la **[fitxa base](SA9_fitxa_alumnat.md)** amb les [plantilles](plantilles/). Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3OTM1Nzkw/details)** (una per alumne/a).

> 👤 **El projecte és individual:** el teu repte, el teu dossier i la teva defensa. Si tu i un company voleu ajuntar-vos per a un repte més gros, proposeu-ho al docent: al dossier hi ha de constar **qui ha fet què** i **cadascú defensa tot el sistema** ell sol.

1. **Sessió 1 · Idear** — tria el teu repte al [banc de reptes](plantilles/Banc_de_reptes.md) i planifica amb el [taulell àgil](plantilles/Planificacio_agile_PLANTILLA.md); omple el [disseny de la fitxa](SA9_fitxa_alumnat.md#3-disseny). Amb el repte triat i abans d'omplir el taulell, mira l'[exemple resolt (el «robot repartidor»)](SA9_exemple_resolt.md): com es gestiona un projecte, no què s'ha de copiar.
2. **Sessió 2 · Prototipar** — munta el prototip mínim viable i el primer codi (pots partir de l'[esquelet de codi modular](plantilles/Codi_base_PLANTILLA/Codi_base_PLANTILLA.ino)); segueix la [planificació](SA9_fitxa_alumnat.md#4-planificacio).
3. **Sessió 3 · Provar** — proves sistemàtiques i **primera iteració** ([proves i iteracions](SA9_fitxa_alumnat.md#5-proves-i-iteracions)) + **revisió creuada** del codi d'un company. Si ja tens el prototip llest, potser defenses aquí (el docent avança 1-2 defenses).
4. **Sessió 4 · Comunicar i tancar el curs** — acaba el que quedi de la segona iteració, tanca el [dossier tècnic](plantilles/Dossier_tecnic_PLANTILLA.md) i fes la [defensa oral individual](SA9_fitxa_alumnat.md#6-defensa-s4) amb demostració (s'avalua amb **totes** les rúbriques R1-R5). És una **mostra**: hi haurà els tres robots del curs a la vista. Al final, la **retrospectiva de curs** (10'): l'**última entrada del quadern tècnic**, que el tanca com el teu portfolio de l'any. També hi ha el «Python flash» de ràdio, per preparar la Part B de la prova.
5. **Sessió 5 · Prova pràctica T3** — prova **individual, per torns** (sessió sencera; el projecte ja s'ha tancat a la S4). Els **últims 15'** es desmunta i es retorna l'electrònica als kits, entre tots. Tothom comença per la **Part B (micro:bit, MicroPython)**: si el teu projecte ha estat en C++, prepara-la abans amb la targeta de [repàs exprés de MicroPython](../00_General/00_Repas_expres_MicroPython.md) (10-15').
6. **Abans d'entregar** — repassa [el meu checklist](SA9_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA9_fitxa_ampliada.md) — guió complet i rutines.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA9_guia_docent.md`](SA9_guia_docent.md) | Guia del professorat: sentit, 4 sessions de projecte + prova T3 (S5), planificació individual, mapa d'avaluació i gestió de projecte. |
| [`SA9_fitxa_alumnat.md`](SA9_fitxa_alumnat.md) | **Fitxa base** individual: repte, les quatre feines, disseny, planificació, iteracions, defensa, checklist. |
| [`SA9_fitxa_ampliada.md`](SA9_fitxa_ampliada.md) | **Versió ampliada**: guió complet + rutines (revisió creuada, exit ticket final, PC). |
| [`SA9_checklist_docent.md`](SA9_checklist_docent.md) | **Checklist docent** (una cara): plantilles a punt, fites parcials per sessió, avaluació (R1–R5) i diversitat. |
| [`SA9_checklist_alumnat.md`](SA9_checklist_alumnat.md) | **Checklist de l'alumnat** (una cara): fites per sessió, entrega final i autoavaluació amb semàfor. |
| `plantilles/` | Plantilles de treball (vegeu la taula següent). |

### Plantilles (`plantilles/`)

| Plantilla | Ús |
|---|---|
| `Banc_de_reptes.md` | Llista de reptes amb nivells de dificultat (atenció a la diversitat). |
| `Planificacio_agile_PLANTILLA.md` | Taulell de tasques personal (To Do / Fent / Fet) amb etiquetes de feina. |
| `Dossier_tecnic_PLANTILLA.md` | Estructura del dossier tècnic a lliurar. |
| `Codi_base_PLANTILLA/` | Esquelet de codi modular per començar (sketch en carpeta pròpia). |

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** sistema robòtic autònom funcional + **dossier tècnic** + **defensa oral individual**.
- **Criteris:** CA1.x, CA2.1, CA3.1, CA4.1, **CA5.1, CA5.2, CA5.3** · **Rúbriques:** **R1, R2, R3, R4, R5** (totes).

## Continuïtat

És la **culminació del curs**: integra electrònica (SA2-SA4), programació en dos llenguatges (SA1-SA5, SA8), control (SA6), robòtica mòbil (SA7) i IoT/IA (SA8). Aquí es tanca el **mètode de projecte** introduït a la **SA1** (*analitzar → dissenyar → prototipar → provar → millorar*), ara aplicat de forma completa i autònoma.
