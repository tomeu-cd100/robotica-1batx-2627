# Disseny · Katas de programació de 10 minuts (SA2–SA8)

**Data:** 2026-08-01 · **Estat:** aprovat pel docent

## Problema

Al nucli de cada sessió l'alumnat rep el sketch complet (amb pàgina EXPLICACIO):
carrega, observa i modifica poc — gairebé no escriu codi. Els dos moments
d'escriptura individual existents no ho cobreixen:

- **Mini-checks** (`Classes/00_General/00_Mini_checks_individuals.md`): 1×10' per SA,
  radar de memòria sense apunts. Detecta, no entrena.
- **Reptes** (`Reptes/Reptes_SAn.md`): ampliació ⭐, només per a qui va al dia.

Falta escriptura de codi **freqüent i de baix risc** per a tothom.

## Decisions preses (amb el docent)

| Qüestió | Decisió |
|---|---|
| Temps | Dins la pràctica guiada: el kata és el primer pas, abans d'obrir el sketch donat. No s'afegeix cap bloc nou a la sessió. |
| Format | Escriure **de zero** el bloc central del sketch d'avui (efecte generació). Després, obrir el sketch i comparar. |
| Modalitat | **Individual, apunts permesos** (paper o editor). No és examen: es diferencia del mini-check. |
| Abast | Cada sessió amb pràctica de codi, **SA2–SA8** (~40 katas, un per sketch amb EXPLICACIO). |
| Ubicació | Fitxer per SA `Classes/SAn/SAn_katas.md`, **vista docent** (el docent projecta l'enunciat; evita l'espòiler de tenir la solució a la mateixa pàgina). |

**Fora d'abast:** SA1 (encara no programen), SA9 (escriuen codi propi al projecte),
sessions de fabricació/muntatge, proves trimestrals. Cap canvi a avaluació ni rúbriques.

## Estructura d'un kata

Un per pràctica (id = nom de la carpeta del sketch a `Classes/SAn/codi/`):

1. **Enunciat projectable** (2–4 línies): especificació concreta del bloc central
   («LED al pin 9, encès si `llum < 300`»).
2. **Què practica** (1 línia): l'estructura objectiu (`if/else`, `for`, funció,
   `while True:`…).
3. **Pista DUA** (1 línia, opcional): per a qui es bloqueja davant la pàgina en blanc.
4. **On mirar en comparar** (3 punts): contrast amb el sketch donat. La «solució»
   és el sketch mateix — no es duplica codi.

## Rutina (capçalera de cada fitxer, estil mini-checks)

Modelatge → docent projecta el kata → **10' individuals, apunts permesos** →
obrir el sketch donat i **comparar** amb el propi (2') → seguir la pràctica.
**No es recull ni es qualifica.** La capçalera explicita la diferència amb el
mini-check (memòria, sense apunts, 1×SA) i amb els reptes (ampliació).

## Canvis per fitxer

### Nous (7)

- `Classes/SA2/SA2_katas.md` … `Classes/SA8/SA8_katas.md`: capçalera de rutina
  (4 línies) + un kata per sketch, en l'ordre de les pràctiques.

### Editats

- **35 pàgines EXPLICACIO**: línia-ganxo al principi:
  «✍️ Kata primer — escriu el teu bloc abans de llegir aquest codi.»
- **7 guies docents** (`SAn_guia_docent.md`): enllaç al fitxer de katas de la SA
  (a la secció de guió de modelatge o d'estructura de sessió).
- `Programació didàctica/04_Metodologia.md` §4.2: el kata com a primer pas de la
  pràctica guiada.
- Docs 1:1 de `Programació didàctica/` de cada SA, si detallen fases de sessió
  (sincronia obligada pel CLAUDE.md).

### Generador i QA

- `web/_generador/generar.py`: afegir `"_katas"` a `DOCENT_NAME_HINTS` (vista docent).
- `tools/qa.py`: check nou —
  1. SA2–SA8 tenen `SAn_katas.md`;
  2. cada sketch amb EXPLICACIO té la seva secció de kata (mapatge per nom de carpeta);
  3. cada EXPLICACIO duu la línia-ganxo.

## Riscos i mitigacions

- **Espòiler**: l'alumne pot obrir la pàgina de pràctica abans del kata. Mitigació:
  la línia-ganxo demana explícitament no llegir el codi; fricció, no seguretat
  (coherent amb la porta de la vista docent).
- **Temps de sessió**: el kata substitueix 10' de càrrega/còpia passiva, no retalla
  modelatge ni activació. Si una pràctica va justa, el docent pot escurçar la
  comparació, mai saltar-se l'escriptura.
- **Manteniment**: si s'afegeix un sketch nou, el QA obliga a afegir-ne el kata.
