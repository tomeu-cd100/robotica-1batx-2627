# 04 · Metodologia

## 4.1. Principis metodològics

La matèria adopta un **enfocament competencial** basat en **situacions d'aprenentatge** contextualitzades, coherent amb el Decret 171/2022. Principis:

- **Aprendre fent** (*learning by doing*) i **fes-ho tu mateix** (*DIY*): cada concepte es consolida amb una pràctica real.
- **Aprenentatge basat en projectes (ABP)** i en **reptes**: les unitats culminen en un producte/repte.
- **Design thinking i metodologies àgils**: iteració, prototip mínim viable, millora contínua.
- **L'error com a part de l'aprenentatge**: la depuració (*debugging*) és contingut, no fracàs.
- **Progressió del concret a l'abstracte**: del component físic al sistema autònom; del codi guiat al codi autònom.

## 4.2. Estructura tipus d'una sessió (2 h)

| Fase | Temps | Descripció |
|---|---|---|
| **0. Arrencada i preparació** | 5-10' | Repartiment i recompte de kits, encesa d'ordinadors, obrir l'IDE/simulador, seleccionar placa/port. **No es pot ometre:** és temps real d'aula. |
| **Activació** | 10' | Repte o pregunta inicial; recuperació del que se sap. Inclou la **graella de repàs espaiat** (5': 3 preguntes retrospectives — sessió anterior · SA anterior · trimestre —, tothom escriu, no qualifica). Banc complet per sessió: `../Classes/00_General/00_Banc_activacio_repas.md`. |
| **Modelatge (amb PRIMM)** | 20' | El docent mostra el concepte/codi clau (live coding). **Predir abans d'executar:** projecta el codi nou **sense executar-lo** i recull prediccions (~5') *abans* d'investigar-lo. |
| **Pràctica guiada** | 30-40' | L'alumnat replica i modifica en parelles. |
| **Pràctica autònoma / repte** | 30-40' | Repte obert que aplica el concepte. El **"+ repte"** fa de marge: s'escurça si la sessió va justa. |
| **Tancament i registre** | 10' | Posada en comú, autoavaluació i **quadern tècnic** (*logbook*). |
| **Recollida** | 5' | Desconnexió segura, recompte i ordre del material. |

> ⏱️ **Temps realista (important per a la planificació):** la suma de les fases nuclears és de ~110-120', però **l'arrencada i la recollida (15-20') són temps real** que sovint no es pressuposta. El temps lectiu efectiu d'una sessió de 2 h és de ~95-105'. Per no quedar endarrerit: tracta el **registre del quadern com a distribuït** (2-3' després del modelatge i del repte, no tot al final) i considera el **"+ repte" com a marge**, no com a obligatori.

## 4.2 bis. De llegir codi a escriure'l: retirada progressiva de la bastida

Amb PRIMM l'alumnat sempre parteix de **codi donat**; el projecte final (SA9) demana **escriure'n de propi**. Perquè el salt no es faci de cop, la bastida es retira **per graons planificats**:

| Tram | Bastida | Què fa l'alumnat |
|---|---|---|
| **SA1–SA3** | PRIMM complet sobre codi donat. | Prediu, modifica i amplia sketches. **Des de la SA3**, abans de codificar el repte escriu el **pseudocodi (3–5 línies)** al quadern: és el pas *Dissenyar* del mètode de projecte fet visible. |
| **SA4–SA6** | Codi donat com a **referència**, no com a plantilla. | La fase **Crea** de cada repte parteix del **pseudocodi propi**; el sketch de la sessió es consulta, no es retoca. |
| **SA7–SA8** | Full-xuleta d'API (les crides, sense estructura). | **Un repte per SA "a full en blanc"**: editor buit, només amb la xuleta i el pseudocodi propi. |
| **SA9** | Cap (plantilla d'esquelet opcional). | Escriu el seu propi codi (per això la SA9 **no** té PRIMM). |

**El pseudocodi, tal com el demanem** (paraules pròpies, sense sintaxi; una acció per línia):

```
REPETEIX sempre:
    llegeix la distància
    SI distància < 10  → encén el LED i fes sonar el piezo
    SINÓ               → apaga-ho tot
```

> Val igualment un **diagrama de flux** senzill (rombes per a decisions, rectangles per a accions). El pseudocodi/diagrama **s'ensenya abans d'obrir l'editor**: 2 minuts del docent per parella eviten 20 minuts de codi sense rumb, i és la bastida de "diagrames de flux" que promet `05_Atencio_a_la_diversitat.md`.

## 4.3. Agrupaments

- **Parelles de programació** (*pair programming*) heterogènies, amb rols rotatius (*driver* / *navigator*).
- **Els 4 rols en parella:** cadascú n'acumula **dos**, amb emparellament fix — **A:** Coordinador/a + Programador/a · **B:** Enginyer/a de maquinari + Provador/a-Documentador/a — i **s'intercanvien cada sessió**. La lògica: separa "escriure el codi" de "validar-lo" (control creuat) i evita que els dos rols tècnics recaiguin sempre en la mateixa persona.
- **Equips de projecte** de 2-3 per a SA7-SA9.
- Moments d'**individualització** per a proves i quadern tècnic personal.

## 4.4. Eines i entorns

- **Programació:** Arduino IDE (C/C++), editor Python de micro:bit / Thonny, MakeCode (transició).
- **Simulació:** **Tinkercad Circuits** i **Wokwi** (C++ i MicroPython) per a treball previ, aules nombroses o alumnat sense placa en un moment donat.
- **Documentació:** quadern tècnic digital (Markdown / document compartit), repositori d'evidències.
- **Gestió d'aula:** rúbriques compartides, llistes de verificació, exemples model.

> Els recursos concrets (lliçons, bancs de pràctiques, tutorials) són a `Recursos/Recursos_Professorat_Robotica_1Batx.xlsx`.

## 4.5. El quadern tècnic (*logbook*)

Element vertebrador de l'avaluació contínua. Per a cada pràctica/projecte, l'alumnat hi recull:
- Objectiu i esquema del circuit.
- **Pseudocodi o diagrama de flux** del repte (pas *Dissenyar* — vegeu §4.2 bis), abans del codi.
- Codi comentat i decisions de disseny.
- Proves realitzades, errors trobats i com s'han resolt.
- Conclusions i possibles millores.

**Dues entrades que tanquen el bucle metacognitiu** (el registre només ensenya si algú hi torna):
- **«Els meus 3 errors del trimestre»** (tancament de cada trimestre): rellegir els apunts DEPURA propis i triar els 3 errors més instructius — què va passar, com es va trobar, què faig diferent ara. És **repàs actiu** del propi material.
- **Pla de millora personal** després de cada prova trimestral (3 línies: què m'ha fallat · què practicaré · com ho comprovaré), que el docent recupera a l'inici de la SA següent (vegeu les proves de `Avaluació/`).

## 4.6. Perspectiva de gènere i coeducació

- Rotació de rols per evitar que els rols tècnics recaiguin sempre en els mateixos perfils.
- Referents femenins en enginyeria i tecnologia.
- Reptes contextualitzats en àmbits diversos (salut, sostenibilitat, accessibilitat) per ampliar l'interès.

## 4.7. Sostenibilitat i ètica (ODS)

- Reutilització de components, gestió de residus electrònics, consum energètic dels sistemes.
- Reflexió sobre l'impacte social de l'automatització i la IA.

## 4.8. Espais

- **Aula taller / laboratori** amb llocs de treball, alimentació i emmagatzematge de kits.
- Aula amb dispositius per a programació i simulació.
- Espai obert per a proves de robòtica mòbil (circuits de terra per a SA7 i SA9).

## 4.9. Atenció a la diversitat (resum)

Es despleguen mesures universals, addicionals i intensives detallades a `05_Atencio_a_la_diversitat.md`: activitats multinivell, reptes d'ampliació, bastides (codi base, plantilles) i parelles heterogènies.
