# Memòria de treball — Assignatura Robòtica (1r Batxillerat)
### Data: 26 de juny de 2026

Resum de la feina feta fins ara en la preparació de l'assignatura **Robòtica** per a **1r de Batxillerat científic i tecnològic**, curs **2026-2027** (LOMLOE · Catalunya).

---

## 1. Punt de partida i decisions preses

**Encàrrec:** preparar tota l'assignatura (2 h setmanals, anual, inclou programació), amb recerca de normativa oficial i de recursos de professorat en obert.

**Decisions confirmades amb l'usuari:**
| Qüestió | Decisió |
|---|---|
| Comunitat / marc legal | **Catalunya** (RD 243/2022 + Decret 171/2022) |
| Estatus de la matèria | A investigar → resolt (vegeu §2) |
| Llengua dels lliurables | **Català** |
| Abast dels recursos | **Només nivell alt**: Arduino, micro:bit, Python/C++ (descartats bloc/LEGO/mBot) |

**Decisió pedagògica pròpia (ajustable):** seqüència **Arduino C/C++ → micro:bit Python → robòtica mòbil + projecte final**.

---

## 2. Troballa normativa clau

A la **modificació del Decret 171/2022 per al curs 2026-2027** (oficial, actualitzada 22/01/2026):
- **"Robòtica"** = optativa **trimestral** oficial de 1r (especialitat **Tecnologia**).
- **"Programació"** = optativa **anual** oficial de 1r.
- Les optatives sumen **6 h** en **2-3 franges** → una matèria **anual de 2 h és viable**.
- Referent curricular: **Tecnologia i Enginyeria I**, **Competència específica 5** (control programat i robòtica) + bloc de sabers **Automatització**.

**Pendent de confirmar amb el centre:** optativa oficial vs pròpia (nom), hores exactes (2/3 h) i continuïtat a 2n.

---

## 3. Lliurables produïts

### 📁 `Normativa/` — Marc legal complet
- `01_Normativa_LOMLOE_Robotica_1Batx_Catalunya.md` — síntesi exhaustiva (marc legal, encaix de la matèria, currículum de referència, avaluació, checklist).
- PDF oficials descarregats: **RD 243/2022**, **Decret 171/2022** (complet), **Tecnologia i Enginyeria I-II**, **DOIGC** (concreció del currículum), **Infografia 1r Batx 2026-2027**.

### 📁 `Recursos/` — Banc de recursos de professorat
- `Recursos_Professorat_Robotica_1Batx.xlsx` — **54 recursos** en obert (12 columnes: títol, explicació, recursos, enllaç, paraules clau + categoria, maquinari, nivell, origen, idioma, accés), amb autofiltre. Cobreix Catalunya (XTEC, ROBOLOT, mSchools), Espanya (INTEF), plataformes (ArduinoBlocks, Tinkercad, Wokwi), micro:bit, Python de nivell alt (Isaac CS, CS50, Raspberry Pi Foundation), Europa (Code Week, Scientix) i competicions (WRO, RoboCup, FTC).
- `00_LLEGEIX-ME_Recursos.md` — llegenda i guia d'ús.

### 📁 `Programació didàctica/` — Programació completa (19 documents Markdown)
- **Marc (00-09):** índex, introducció/context, objectius i competències (CE-R1…CE-R5), sabers (blocs A-F), metodologia, atenció a la diversitat, avaluació i qualificació, rúbriques (R1-R5), seqüenciació anual, materials per unitat.
- **9 situacions d'aprenentatge (10-18 · SA1-SA9):** cada una amb vincle competencial, sabers, objectius, seqüència sessió a sessió, producte, avaluació amb rúbriques, atenció a la diversitat i recursos.

**Estructura de la seqüència (3 trimestres, ≈70 h):**
1. **Fonaments** — Arduino C/C++ (SA1-SA3).
2. **Control i sensors** — motors/servos, micro:bit/Python, sistemes de control (SA4-SA6).
3. **Robòtica i integració** — robòtica mòbil, IoT/IA, projecte final (SA7-SA9).

---

## 4. Recomanacions d'automatització (Claude Code)

Anàlisi feta (no implementada). Propostes principals:
- **Skills:** `nova-situacio-aprenentatge` (replicar la plantilla de SA), `exporta-docx-pdf` (versions Word/PDF compartibles).
- **Hook:** protegir els PDF oficials de `Normativa/` contra edició/sobreescriptura.
- **Subagents:** `revisor-curricular` (alineació amb el Decret 171/2022), `corrector-catala` (ortografia/claredat).
- **Guany ràpid:** crear un `CLAUDE.md` amb les convencions del projecte.

---

## 5. Estat i possibles passos següents

**Estat:** Normativa ✅ · Recursos ✅ · Programació didàctica ✅.

**Possibles passos següents:**
1. **Material d'aula per sessió:** codi comentat, esquemes de circuit i fitxes d'alumnat (començant per SA1-SA3).
2. **Versions DOCX/PDF** dels lliurables per compartir amb el departament/imprimir.
3. **Validar la decisió pedagògica** (Arduino-primer vs Python-primer) i les hores reals (2/3 h) amb el centre.
4. Implementar alguna de les automatitzacions proposades (CLAUDE.md, skill de SA, hook de protecció).

---

## 6. Estructura final del projecte

```
Curs 2627 1 Batx Robotica/
├── Normativa/            (1 síntesi MD + 5 PDF oficials)
├── Recursos/             (1 Excel + 1 LLEGEIX-ME)
├── Programació didàctica/ (19 documents MD)
└── Memòria treball/      (aquest document)
```
