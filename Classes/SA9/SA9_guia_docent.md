# SA9 · Guia docent — Repte final integrador (opció competició)

**Durada:** 10 h (5 sessions) · **Maquinari:** lliure (Arduino / micro:bit / Imagina 3dBot) · **Llenguatge:** lliure (C/C++ i/o Python)
**Referència:** `Programació didàctica/18_SA9_Projecte_final.md`

## Sentit de la SA
Projecte de **síntesi** del curs: en equip, l'alumnat dissenya, construeix, programa, documenta i defensa un **sistema robòtic autònom** que resol un repte real. Integra tot l'après (SA1-SA8). Opció de vincular-lo a una **competició** (WRO, RoboCup Junior, FTC) o al futur **Treball de Recerca**.

## Objectius
1. Gestionar un **projecte complet** (anàlisi → prototip → proves → millora).
2. **Integrar** electrònica, programació, control i robòtica.
3. Elaborar **documentació tècnica** i fer-ne una **defensa oral**.
4. Treballar **cooperativament** i valorar l'impacte ètic i de sostenibilitat.

## Materials i plantilles (`plantilles/`)
| Fitxer | Ús |
|---|---|
| `Banc_de_reptes.md` | Llista de reptes amb nivells de dificultat. |
| `Planificacio_agile_PLANTILLA.md` | Taulell de tasques (To Do / Fent / Fet) i rols. |
| `Dossier_tecnic_PLANTILLA.md` | Estructura del dossier a lliurar. |
| `Codi_base_PLANTILLA/` | Esquelet de codi modular per començar (sketch en carpeta pròpia, llest per a l'Arduino IDE). |

## Mètode de projecte (culminació del curs)
Aquesta SA **tanca el mètode de projecte** introduït a la **SA1** i practicat a totes les SA: *analitzar → dissenyar → prototipar → provar → millorar*. Les cinc fases de la seqüència s'hi corresponen directament:

| Fase del cicle (SA1) | Sessió SA9 |
|---|---|
| Analitzar | S1 (Idear): repte, requisits, esbós |
| Dissenyar | S1 (Idear): planificació i rols |
| Prototipar | S2 (Prototipar): MVP i primer codi |
| Provar | S3 (Provar): proves i 1a iteració |
| Millorar | S4 (Millorar): 2a iteració + dossier |
| *(Comunicar)* | S5 (Comunicar): defensa oral |

> A diferència de les altres SA, aquí l'alumnat **no llegeix codi donat** (no hi ha PRIMM): **escriu el seu propi codi** a partir de `Codi_base_PLANTILLA/`, aplicant de forma autònoma tot el que ha après.

---

## Seqüència de sessions (5 × 2 h)

| Sessió | Fase | Activitat docent | Activitat alumnat |
|---|---|---|---|
| **1** | **Idear** | Presenta el repte i el `Banc_de_reptes`. Forma equips i rols. | Trien repte, defineixen requisits, esbós, planificació (taulell àgil). |
| **2** | **Prototipar** | Acompanya el muntatge i el primer codi. | Munten el prototip mínim viable; primer codi (esquelet). |
| **3** | **Provar** | Fomenta proves sistemàtiques i registre d'errors. | Proven, detecten errors, **primera iteració** de millora. |
| **4** | **Millorar i documentar** | Revisa codi (code review); guia la documentació. | **Segona iteració**; redacten el dossier tècnic. |
| **5** | **Comunicar** | Organitza les defenses; modera. | **Defensa oral** + demostració; coavaluació; reflexió final. |

## Rols de l'equip (rotatius/repartits)
- **Coordinació/planificació** (manté el taulell i els terminis).
- **Maquinari/electrònica** (muntatge, esquemes).
- **Programació** (codi, depuració, repositori).
- **Documentació/comunicació** (dossier, defensa).

## Avaluació
- **Totes les rúbriques** (R1-R5). Pes destacat dins de la dimensió "Projectes i productes" del trimestre.
- Inclou **autoavaluació i coavaluació** (procés d'equip).
- Lliurables: **sistema funcional + dossier tècnic + defensa oral**.

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Sistema funcional | Integració d'electrònica, control i robòtica | CA2.1, CA3.1, CA4.1 | R1, R2, R3 |
| Dossier tècnic | Documentació completa i rigorosa del projecte | CA5.1, CA5.2 | R4 |
| Defensa oral + demostració | Comunicar i defensar la solució | CA5.2 | R4 |
| Procés (taulell, iteracions) | Gestió del projecte (anàlisi → prototip → millora) | CA5.1 | R5 |
| Coavaluació + reflexió ètica | Cooperació i impacte ètic/sostenibilitat (ODS) | CA5.3 | R5 |

*(CA5.1 = gestionar un projecte complet; CA5.2 = documentar i defensar; CA5.3 = valorar impacte ètic i cooperar. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix **totes** les rúbriques **abans** de començar.)*

## Orientacions per al docent
- Tenir el **banc de reptes amb nivells** perquè cada equip triï segons ambició (atenció a la diversitat).
- Oferir el **`Classes/00_Banc_objectes_disseny.md`** com a font d'idees: el projecte final pot ser un **objecte real amb carcassa/maqueta** (disseny de producte), no només un muntatge. Inclou rúbrica de producte i pautes de fabricació (cartró/impressió 3D, ecodisseny ODS 12).
- Fixar **fites parcials** (checklist) a cada sessió per evitar deixar-ho tot per al final.
- Recordar criteris d'**ètica i sostenibilitat** (reutilització de components, impacte).
- Si s'opta per **competició**, alinear el repte amb el reglament corresponent.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **integració** de tot el pensament computacional del curs (descomposició, abstracció, patrons, algorismes) aplicat de forma autònoma a un sistema propi.
- **Depuració:** l'alumnat aplica la **rutina DEPURA** i prova **per parts** (cada mòdul per separat) — clau per no quedar encallat (vegeu errors freqüents).

> **Síntesi de les 4 dimensions a la SA9:** la diversitat es cobreix amb el **banc de reptes amb nivells**; el cooperatiu, amb **rols i taulell àgil**; l'avaluació formativa, amb **diana, coavaluació i exit ticket final** (fitxa) a més de les rúbriques R1-R5; i el context real/ODS, amb la **tria d'un repte amb impacte** i la reflexió ètica de la defensa.

## Errors freqüents (gestió de projecte)
| Símptoma | Causa | Acció |
|---|---|---|
| Equip encallat el dia 1 | Repte massa ambiciós | Reduir abast; triar repte de nivell inferior. |
| Tot per fer l'últim dia | Sense fites parcials | Imposar lliuraments per sessió. |
| "No funciona i no sé per què" | Sense proves incrementals | Provar per parts (cada mòdul per separat). |
| Treball desigual | Rols difusos | Assignar i registrar rols al taulell. |
