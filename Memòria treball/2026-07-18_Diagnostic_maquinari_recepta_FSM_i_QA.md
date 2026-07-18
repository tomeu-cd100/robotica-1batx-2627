# 18-07-2026 · Diagnòstic exprés de maquinari, recepta FSM (SA6) i robustesa del QA

## Què s'ha fet

### 1 · Targeta de diagnòstic exprés de maquinari (nova)

`Classes/00_General/00_Checklist_taller_avaries.md`: arbre de decisió en **4 passos**
amb multímetre perquè l'alumnat descarti les avaries de taller més habituals **abans
de cridar el docent**:

1. **Continuïtat** (sense alimentació) — cables Dupont trencats per dins, files de la protoboard.
2. **Curts** (sense alimentació) — xiulet continu entre 5V i GND; truc de retirar mòduls d'un en un.
3. **Temperatura** (amb alimentació, 30 s) — toc ràpid a regulador, L298N, servos; polaritat i tensions.
4. **Masses comunes** — el clàssic invisible de la SA4+ (font externa amb GND unit a l'Arduino).

Inclou taula d'encaminament per símptoma, frase feta per «cridar el docent amb
evidències» i taula per al quadern tècnic (R4). Enllaçada des de les targetes de
rescat (bidireccional) i afegida a `GENERAL_ALUMNAT` (visible en vista alumnat).

### 2 · «La recepta» de la màquina d'estats a la SA6

`SA6_fitxa_ampliada.md`, nova secció rere l'activitat 3: contraexemple d'`if-else`
amb booleans contradictoris vs plantilla neta `enum` + `switch-case` +
`canviaEstat()` + `millis()` (els mateixos idiomes que `03_maquina_estats.ino` i la
BASTIDA), amb **les 3 regles del patró** (una sola variable d'estat; cada `case` =
què fa + quan surt; cap `delay()` llarg). La fitxa base hi enllaça des del consell
de l'activitat 3. Comentaris del codi sense accents (convenció del repo).

### 3 · Cercador i vista alumnat: bug de classificació, no de filtre

El filtre del cercador **ja existia** (`lloc.js`: `it.p === "docent"` s'omet en
vista alumnat, i tot l'índex de cerca porta el camp `p`). El problema real era de
**dades**: `00_Repas_expres_Cpp.md` i `00_Guia_defensa_oral.md` (capçalera «per a
l'alumnat» / «docent i alumnat») no eren a `GENERAL_ALUMNAT` de `generar.py`, i per
tant quedaven classificats «docent» i amagats a l'alumnat al menú **i** al cercador.
Afegits a l'allowlist. Lliçó: tot fitxer nou de `00_General/` cau a «docent» per
defecte — cal donar-lo d'alta explícitament si és per a l'alumnat.

### 4 · QA: dependències del generador comprovades d'hora

`tools/qa.py` petava amb `ModuleNotFoundError` a mig camí (checks 6 i 8 importen
`generar.py` i `generar_fulls_imprimibles.py`, que necessiten `markdown`/`pygments`)
si l'entorn local no tenia els paquets. Nou **punt 0** `comprova_dependencies()`:
`importlib.util.find_spec` sobre `markdown` i `pygments`; si en falta cap, missatge
net amb `py -m pip install -r web/_generador/requirements.txt` i `exit(2)`.
Provada la branca d'error simulant l'absència del paquet.

## Verificació

- Web regenerat (201 pàgines doc, 258 entrades d'índex) i `tools/qa.py` **net**
  (12 checks, 0 errors; només els avisos preexistents del correu del docent).
- Índex de cerca comprovat: la targeta nova i el repàs de C++ surten amb
  `"p": "alumnat"`.

## Pendents que obre

- Cap de nou. Recordatori vigent: provar la targeta de diagnòstic amb el maquinari
  real al setembre (multímetres del taller, protoboards amb rails partits o no).
