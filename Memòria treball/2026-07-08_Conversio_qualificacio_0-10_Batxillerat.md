# Conversió de la qualificació a escala numèrica 0-10 (Batxillerat)

**Data:** 2026-07-08
**Motiu:** a Batxillerat les notes són **numèriques del 0 al 10**, no qualitatives. El material feia servir l'escala **NA/AS/AN/AE** (No assolit / Assoliment satisfactori / notable / excel·lent), que és terminologia **d'ESO**. A més, dos documents deien «enter **de l'1 al 10**» quan és **del 0 al 10** (error factual).

## Decisió

Consultada amb el docent: es mantenen **quatre bandes amb els descriptors oficials de Batxillerat**, però la **nota és sempre el número (0-10)**; els noms només indiquen la banda.

| Abans (ESO) | Ara (Batxillerat) | Banda de nota |
|---|---|---|
| NA · No assolit | **Insuficient** | 0–4 |
| AS · Assoliment satisfactori | **Suficient/Bé** | 5–6 |
| AN · Assoliment notable | **Notable** | 7–8 |
| AE · Assoliment excel·lent | **Excel·lent** | 9–10 |

Les dianes d'autoavaluació passen de «marca el teu nivell (NA/AS/AN/AE)» a «**situa't (0-10)**», amb les mateixes quatre columnes reanomenades.

## Abast (24 fitxers de material)

- **Model de qualificació:** `Programació didàctica/07_Rubriques.md` (intro + capçaleres de R1–R5), `06_Avaluacio_criteris_qualificacio.md`, `06b_...` (indicador docent «CA en NA» → «CA suspès (<5)»), `Avaluació/Full_qualificacio_competencies.md` (taula §1 de conversió, §4.1 —treta la columna «Nivell» redundant—, nota de recuperació), `Avaluació/README.md`, `Avaluació/Full_seguiment_grup.md`.
- **Guia i transversals:** `Classes/00_General/00_Avaluacio_per_alumnat.md` (§2), `00_LLEGEIX-ME_Classes.md`, `00_Plantilla_disseny_objecte.md`, `00_Banc_objectes_disseny.md`.
- **Fitxes de SA:** les 9 `SAx_fitxa_alumnat.md` (enllaç de capçalera + secció «M'autoavaluo» + taula), les fitxes ampliades amb autoavaluació, `SA8_practica_teachable_machine.md`, `Reptes/README.md`.
- **Correcció factual:** «de l'1 al 10» → «del 0 al 10» (a `06` i a `Full_qualificacio`).

## No tocat (a propòsit)

- **`Memòria treball/`**: registre històric datat; s'hi manté la terminologia original de quan es va escriure.
- El **web generat** (`web/`): es reconstrueix a CI a cada push (vegeu `2026-07-08_Auditoria...`), de manera que el lloc publicat reflectirà els canvis automàticament. La còpia HTML precommitejada queda obsoleta fins que la Fase 3 la tregui del repo.

## Mètode

Substitucions exactes amb script Python (UTF-8) + verificació per `grep`: **0 ocurrències** de NA/AS/AN/AE al material després del canvi.
