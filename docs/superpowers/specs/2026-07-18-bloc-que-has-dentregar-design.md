# Disseny · Bloc «📦 Què has d'entregar» a cada SA

**Data:** 18-07-2026 · **Estat:** aprovat pel docent (brainstorming complet)

## Problema

Quan l'alumne entra a la pàgina d'una SA veu la introducció i l'«Itinerari per
sessions», però no té una vista **d'una sola ullada** de tots els lliurables
de la SA: activitats de la fitxa, repte, quadern tècnic en paper, prova
trimestral i peça del robot del trimestre.

## Decisions preses (amb el docent)

1. **Abast del contingut: només lliurables** — el que l'alumne ha d'entregar
   o superar. Fora: mini-checks, checklists d'autoavaluació, qüestionaris
   (rutines, no lliurables).
2. **Ubicació:** bloc nou a dalt del `README.md` de cada SA (després de la
   introducció i la imatge, abans de l'«Itinerari per sessions»). L'itinerari
   NO es toca.
3. **Format: taula markdown per sessió** (`| Quan | Lliurable | On es lliura |`).
   Cap CSS ni canvi de generador: funciona igual a GitHub i a la web.
4. **Manteniment: escrit a mà als 9 README + check nou a `tools/qa.py`** que
   peta si es desincronitza de `web/_generador/quadern_sessions.py`.

## El bloc (contracte de contingut)

Títol exacte: `## 📦 Què has d'entregar` (el QA hi ancora la detecció).

Taula amb capçalera `| Quan | Lliurable | On es lliura |` i aquestes files,
en aquest ordre:

1. **Una fila per sessió** (`S1` … `Sn`), amb el nombre de sessions REAL de la
   SA segons `quadern_sessions.py`:
   - Lliurable = l'activitat de la fitxa d'aquella sessió, amb **enllaç a
     l'àncora real** de `SAn_fitxa_alumnat.md` (les mateixes àncores que ja
     usa l'«Itinerari per sessions» — copiar-les d'allà).
   - «On es lliura» = la **tasca de Classroom** de la SA (enllaç ja present a
     la nota de l'itinerari del README; reutilitzar-lo).
   - La sessió que és **prova trimestral** (SA3-S4, SA6-S4, SA9-S5) porta el
     lliurable en negreta: **Prova pràctica Tx (individual)**, sense enllaç a
     fitxa; «On es lliura» = «A l'aula, sessió sencera».
   - La **sessió 0** del rover (SA7) NO és una fila pròpia: ja té el seu pas 0
     a l'itinerari i el test de fum no és un lliurable avaluable.
2. **Fila ⭐ (repte):** «Repte triat (A, B o C)» amb enllaç a
   `../../Reptes/Reptes_SAn.md`; «On es lliura» = enllaç al
   [Tauler de reptes](../00_General/00_Tauler_reptes.md) («el docent valida i
   pinteu l'estrella»). Present a totes les SA amb `Reptes_SAn.md` (SA1-SA8).
   SA9 no en té: la fila ⭐ de SA9 és el **repte final** amb enllaç al material
   propi de SA9.
3. **Fila 📓 (quadern):** «Full del quadern tècnic de cada sessió» ·
   «En paper, en acabar la sessió». Una sola fila (no una per sessió).
4. **Fila 🤖 (robot):** la peça que aquesta SA aporta al robot del trimestre,
   amb el text de contribució REAL (coherent amb el bloc «Cap al robot» dels
   reptes) i enllaç al dossier corresponent:
   - SA2, SA3 → `00_Projecte_T1_Mascota.md` (expressions / reaccions).
   - SA4, SA5, SA6 → `00_Projecte_T2_Brac.md` (articulacions / comandament / modes).
   - SA7, SA8, SA9 → `00_Projecte_T3_Rover.md` (plataforma / telemetria / repte final).
   - **SA1 no té fila 🤖** (el fil conductor comença a SA2).

To: llenguatge d'alumne, com l'itinerari («fes», «entrega», «pinta l'estrella»).

## Check nou de QA (`tools/qa.py`)

Funció nova `comprova_lliurables()` (check #12), per a cada SA1-SA9 sobre
`Classes/SAn/README.md`:

- El bloc `## 📦 Què has d'entregar` existeix.
- El nombre de files que comencen per `| S<n>` coincideix amb el nombre de
  sessions de la SA a `web/_generador/quadern_sessions.py` (importar-lo o
  parsejar-lo com ja fa `comprova_quadern()` — reutilitzar el mateix mecanisme).
- Si la SA té una sessió amb `prova=True`, la fila d'aquella sessió conté
  «Prova pràctica».
- Fila `| ⭐` present a totes les SA; fila `| 📓` present a totes; fila `| 🤖`
  present a SA2-SA9 i ABSENT a SA1.
- Errors amb el prefix `[lliurables]`, mateix estil que la resta de checks.

## Fora d'abast

- Cap canvi a fitxes, guies docents, itinerari, generador web ni CSS.
- Cap persistència d'estat (caselles marcables): la taula és informativa.
- Cap rèplica del bloc als documents 1:1 de `Programació didàctica/` (el bloc
  és material d'alumnat del README, no programació).

## Criteri d'èxit

L'alumne entra a la pàgina d'una SA i, sense fer scroll més enllà de la
primera pantalla i mitja, veu una taula amb tot el que haurà d'entregar en
aquella SA i on. `tools/qa.py` verd; CI vermell si algú canvia el nombre de
sessions d'una SA sense tocar la taula.
