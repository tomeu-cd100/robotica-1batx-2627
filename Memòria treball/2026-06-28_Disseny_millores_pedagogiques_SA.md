# Disseny — Millores pedagògiques de les classes (2026-06-28)

## Objectiu
Reforçar **4 dimensions pedagògiques** a **totes les SA** (SA0–SA9), de forma integrada
a cada guia docent i fitxa d'alumnat, homogeneïtzant el nivell (avui la SA1 és modèlica i
altres en tenen menys) i afegint elements nous que cap SA tenia del tot.

Dimensions: **(1) Atenció a la diversitat (DUA)** · **(2) Avaluació formativa** ·
**(3) Pensament computacional + depuració** · **(4) Treball cooperatiu + context real/ODS**.

## Principi
- **Afegir, no refer:** s'incorporen seccions/caixes noves; no es reescriu el que ja funciona.
- **Autocontingut per SA:** cada SA porta el bloc complet adaptat al seu contingut (decisió
  del docent: integració completa, no recursos transversals separats).
- Comentaris de codi sense accents; `.md` amb accents (convenció del projecte).

---

## Bloc per a la GUIA DOCENT (5 seccions, al final, abans del pont)
1. **Atenció a la diversitat (DUA)** — taula: *bastida* · *ampliació* (reptes ⭐ + enllaç a
   `Reptes/` i a la simulació Wokwi) · *representació múltiple* · *implicació* (tria).
2. **Treball cooperatiu amb rols** — 4 rols rotatius (vegeu sota) adaptats a la SA.
3. **Pensament computacional + depuració** — conceptes de PC que treballa la SA + rutina DEPURA.
4. **Avaluació formativa** — exit ticket, diana d'autoavaluació, pauta de coavaluació.
5. **Context real i ODS** — problema real + ODS concret(s) de la SA.

## Bloc per a la FITXA D'ALUMNAT (caixes, al final, abans del quadern tècnic)
- **Si t'encalles** (3 pistes graduades) + **rutina DEPURA**.
- **Vols més?** (enllaç reptes ⭐ + Wokwi).
- **Rols de la parella** (quadre + rotació).
- **Diana d'autoavaluació** (4 nivells: NA/AS/AN/AE).
- **Coavaluació** (2 estrelles + 1 desig).
- **Exit ticket** (3 preguntes).
- **Context real / ODS**.

---

## Plantilles comunes (mateix text a totes, adaptant exemples)

**Rols cooperatius rotatius** (en parella s'agrupen de 2 en 2 i es roten cada sessió):
| Rol | Funció |
|---|---|
| Coordinador/a | Gestiona el temps, llegeix l'enunciat, comprova que tothom participa. |
| Programador/a | Escriu i edita el codi (teclat). |
| Enginyer/a de maquinari | Munta el circuit, comprova connexions i seguretat. *(A SA5/SA8 micro:bit: prepara la placa i les entrades/sensors.)* |
| Provador/a–Documentador/a | Prova, aplica la rutina DEPURA i documenta al quadern. |

**Rutina de depuració DEPURA** (per a l'alumnat):
- **D**escriu: què esperaves que passés i què passa de debò.
- **E**xamina: missatges d'error, estat dels LED, Monitor Sèrie.
- **P**rova una hipòtesi cada cop: canvia **una sola cosa**.
- **U**bica el problema: aïlla'l (comenta parts del codi, revisa pin a pin).
- **R**epara i torna a provar.
- **A**punta al quadern què era i com ho has resolt.

**Exit ticket:** 1) una cosa que he après · 2) una cosa que encara no tinc clara ·
3) on ho faria servir al món real.

**Coavaluació (2 estrelles i un desig):** intercanvieu el producte amb una altra parella i
anoteu **2 coses ben fetes** + **1 millora**.

**Diana d'autoavaluació:** sobre 3 criteris clau de la SA, marca el nivell (NA/AS/AN/AE).

---

## Mapatge específic per SA (PC · ODS · context real)

| SA | Pensament computacional | ODS | Context real |
|---|---|---|---|
| SA0 | Vocabulari i abstracció (de problema a passos); lectura de codi | ODS 4 (educació de qualitat) | Alfabetització tecnològica: entendre els sistemes quotidians |
| SA1 | **Descomposició** (entrada-procés-sortida) | ODS 9 (indústria/innovació), 12 | Robots quotidians; ètica de l'automatització |
| SA2 | **Patrons** i **algorisme** (seqüència); abstracció (funcions) | ODS 11 (ciutats), 7 (LED eficient) | Senyalització urbana (semàfors), eficiència lumínica |
| SA3 | **Abstracció** (funció de mesura), condicionals | ODS 7, 12 | Llum automàtica, sensors d'estalvi, aparcaments |
| SA4 | Descomposició del moviment; funcions | ODS 9, 10 (accessibilitat) | Barreres, braços robòtics, robòtica assistencial |
| SA5 | Esdeveniments i abstracció (micro:bit) | ODS 3 (salut), 4 | Wearables, comptapassos, llum de nit |
| SA6 | **Màquina d'estats** i bucle de control | ODS 7, 11 | Termòstats, control de processos, climatització |
| SA7 | **Algorismes** (seguidor de línia), descomposició | ODS 9, 11 (mobilitat) | Vehicles autònoms, logística, AGV |
| SA8 | Dades i **classificació** (IA per regles) | ODS 11 (ciutat intel·ligent), 13 (clima) | IoT, telemetria ambiental, estacions meteo |
| SA9 | **Integració** de tot el pensament computacional | ODS triat segons el repte | Projecte propi amb impacte real |

*(SA0 i SA9 adapten el bloc: SA0 prioritza DUA lingüística i PC de lectura; SA9, que ja és
projecte cooperatiu, reforça rols rotatius, coavaluació i tria d'ODS.)*

---

## Abast i desplegament
- **Fitxers afectats:** 10 guies docent + 10 fitxes d'alumnat (SA0–SA9). On una secció ja
  existeix (p. ex. "Atenció a la diversitat" a SA1), es completa, no es duplica.
- **Ordre:** SA0 → SA9, en tandes, sincronitzant per blocs a GitHub.
- **No es toquen:** codis `.ino/.py`, esquemes, solucionaris, simulacions (ja fets).

## Criteri d'èxit
Cada SA té, de forma coherent i adaptada al seu contingut, les 5 seccions a la guia docent i
les 7 caixes a la fitxa, amb el mateix llenguatge de rúbriques i mètode ja vigents al curs.
