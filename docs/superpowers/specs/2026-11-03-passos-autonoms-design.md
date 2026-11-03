# Disseny · Material en passos autònoms (SA2 S2 → SA9)

**Data:** 2026-11-03 · **Estat:** esborrany per aprovar pel docent

## Per què

El material actual no funciona a l'aula. El docent n'ha observat quatre símptomes, tots alhora:

1. **Massa text:** l'alumnat no llegeix les pàgines de pràctica i no troba què ha de fer.
2. **No entenen què se'ls demana:** munten i carreguen codi, però no saben què han de respondre ni per què.
3. **Classroom confós:** hi ha un sol formulari per a tota la SA, amb preguntes de les tres sessions i la consigna «no premis Envia fins a la S3». Hi ha tasques a mitja SA que no es poden completar fins que s'acaba la SA.
4. **Salten entre pàgines:** l'itinerari de la SA2 envia a l'esquema, a la pràctica, a Classroom i torna, i es perden.

**Objectiu:** que l'alumnat sigui més **independent**. Tot ha de ser **passos un darrere l'altre**, fàcils de llegir, que deixin clar què se'ls demana. L'explicació del professorat serveix perquè s'entengui la pràctica que faran; no és un bloc de teoria a llegir.

## Objectius

- Una pràctica es pot fer de principi a fi **sense sortir de la seva pàgina**.
- Cada pas és una acció concreta que l'alumne sap si ha fet bé.
- Cap tasca de Classroom demana coses que encara no s'han pogut fer.
- El format s'aplica igual de la **SA2 S2 (Pràctica 3) a la SA9**.

## No-objectius

- No es canvien els continguts curriculars, els sabers ni les rúbriques R1/R2/… de cada SA.
- No es reescriu el codi dels sketches (`.ino`, `.py`), llevat que un pas ho necessiti.
- La SA0, la SA1 i la SA2 S1 (Pràctiques 1, 2 i 2b) es queden com estan. Ja s'han fet a l'aula.
- No es fa la vista «un pas per pantalla» amb botó Següent: s'ha descartat.

## Anti-objectius (fracàs encara que «funcioni»)

- Una pàgina de pràctica que torna a créixer amb teoria entre els passos.
- Un formulari de pràctica que demana alguna cosa d'una pràctica posterior.
- Un pas que diu «mira l'esquema» amb un enllaç a una altra pàgina, en lloc de mostrar-lo allà mateix.
- Perdre les respostes ja recollides al formulari actual de la SA2.

## Decisions preses amb el docent

### 1. Pàgina de pràctica: una sola pàgina amb passos numerats (opció A)

Ordre fix de la pàgina:

1. **Capçalera de 3 línies:** 🎯 «Avui aconseguiràs: …» (una frase) · ⏱️ temps orientatiu · 📦 material.
2. **Passos numerats.** Cada pas:
   - comença amb un **verb** (Munta, Carrega, Canvia, Mesura, Apunta, Envia);
   - té com a màxim 2-3 línies d'instrucció;
   - porta **dins** el que cal: la imatge de l'esquema del muntatge, el bloc de codi amb el botó Copia, la taula de valors…;
   - pot acabar amb **«✅ Comprova: …»**, el senyal que el pas està ben fet.
   - Les preguntes van marcades amb **«✍️ Apunta-ho»**, i les mateixes preguntes, amb el mateix text, són al formulari de la pràctica.
3. **Últim pas: «📤 Respon i envia».** Botó al formulari de Classroom d'aquella pràctica (3-4 preguntes), que s'envia en acabar la pràctica. Després, un enllaç a la pràctica següent.
4. **«Si acabes abans…»:** una sola línia amb el repte ⭐.
5. **Al final, plegats:** «🧗 Si t'encalles» (bastides, com ara) i «🧠 Vols saber per què funciona?». Aquest segon és l'apartat actual «Com funciona, a trossos», mogut i plegat.

### 2. Pàgina de la SA: ruta de pràctiques amb fites (opció B, decisió de Claude; el docent no la va triar explícitament)

- Una sola llista ordenada de pràctiques (①②③…), que cadascú fa **al seu ritme**.
- **Fites 🚩** entre pràctiques: «Final de la Sessió n: hauries d'haver enviat el formulari de la ②».
- **Bloc final «🏁 Entrega final de la SAn»**, visualment separat i amb la condició «quan hagis acabat la pràctica X». Conté el producte i la defensa, l'autoavaluació i el quadern tècnic.
- A baix de tot, **«📚 Per repassar a casa»**: fitxa base, fitxa ampliada, exemple resolt, qüestionari de conceptes, diagrama de flux i reptes.
- Desapareixen les 4 «regles de com treballes» i la consigna «no premis Envia».

### 3. Explicació del docent: arrencada de 5-10' per sessió

- La guia docent de cada SA té, per a cada sessió, un **guió d'arrencada**: les 2-3 idees que cal explicar perquè s'entengui la pràctica del dia i una pregunta per fer a la classe. És l'evolució de la columna «🗣️ Explica» de l'actual xuleta de la SA2.
- Com que l'alumnat avança al seu ritme, l'arrencada explica **la pràctica a la qual ha d'arribar tothom aquell dia** (la de la fita 🚩), no la teoria de la SA sencera.

### 4. Classroom: un formulari per pràctica + una tasca d'entrega final

- **Una tasca per pràctica**, amb un formulari curt (3-4 preguntes) que correspon 1:1 amb els «✍️ Apunta-ho» de la pàgina.
- **Les pràctiques porten nota (decisió del docent).** La suma dels formularis de pràctica d'una SA forma el **25 % del quadern tècnic**. Els punts de cada formulari, la manera de repartir-los i el càlcul sobre el 25 % es concreten al pla i es reflecteixen al mapa d'avaluació de la Programació didàctica.
- **Les 3 preguntes de reflexió del quadern tècnic** («concepte nou», «un error i com l'he resolt»…) es reparteixen pels formularis de pràctica: una pregunta de reflexió per formulari, com a última pregunta. *(Decisió de Claude: és la conseqüència de posar la nota del quadern a les pràctiques.)*
- **Una tasca «Entrega final SAn»**, publicada des del principi però clarament marcada «quan hagis acabat la pràctica X». Conté l'autoavaluació i la checklist d'alumnat, sense nota pròpia. La defensa i les rúbriques del producte es fan a l'aula, com ara.
- Les preguntes opcionals de repte (`pOpt`) passen al formulari de la pràctica on hi ha el repte.

### 4b. Transició de la SA2 (urgent; decisió del docent)

- El formulari actual de la SA2 (PUBLICAT, amb respostes de la S1 a mig fer) passa a ser **«SA2 · Sessió 1»**. **A l'inici de la S2, l'alumnat l'envia** tal com el tingui. Se'n treuen les seccions d'S2 i S3, si es pot fer sense perdre respostes. Si no, s'hi afegeix un avís perquè no les responguin.
- El títol i la descripció de la tasca de Classroom es canvien **a mà**, perquè l'API retorna `ProjectPermissionDenied`. El pla ha de donar al docent el text exacte que hi ha d'enganxar.
- A partir de la Pràctica 3, tot funciona amb el format nou: tasques noves per a les Pràctiques 3 i 4, més l'«Entrega final SA2».

### 5. Extres de cada sessió (decisió de Claude, acceptada amb «continua»)

- **Quadern en paper:** desapareix com a cosa a part. Tot el que s'escriu va al formulari. Si cal un esquema dibuixat, és un pas: «📷 Dibuixa'l i puja'n la foto al formulari».
- **Racó de mesura (multímetre):** passa a ser un pas «Mesura» dins de la pràctica que toca.
- **Mini-check en paper** (SA2 S3 i similars): es manté com a primer pas de la pràctica corresponent, perquè no depèn de Classroom.

### 6. Regles per encaixar-ho tot (decisions de Claude després de la revisió)

- **Què és una pràctica:** cada sketch d'alumnat amb pàgina `EXPLICACIO`. Les bastides no ho són, perquè ja viuen a «🧗 Si t'encalles». A la SA9, sense `codi/`, cada fase del projecte és una pràctica.
- **El producte** (SA2 P5, SA3 `04_alarma_aparcament`, SA4 `04_brac_potenciometres`…) té pàgina de passos com les altres pràctiques. Les seves preguntes, com ara el disseny previ dels estats, són passos «✍️» de la pàgina i van a un formulari de pràctica normal, amb nota. La defensa es fa a l'aula.
- **«Abans de començar»** (els objectius de la SA) queda com una línia «En acabar aquesta SA podràs…» a dalt de la pàgina de la SA. La **versió nucli** («per aprovar n'hi ha prou amb…») va al bloc «🏁 Entrega final».
- **Fitxes base i checklists:** no es reescriuen. Només se n'actualitzen les referències velles (activitats 1-3, quadern en paper, formulari únic) perquè no contradiguin el format nou.

## Restriccions

- Markdown com a font única. `web/` és generat i no s'edita a mà (`CLAUDE.md`).
- `tools/qa.py` ha de passar abans de cada commit. El CI compila els `.ino` de SA1-SA7.
- Cada SA té el seu document 1:1 a `Programació didàctica/`. Cal sincronitzar-hi els instruments d'avaluació: el quadern en paper surt i el quadern tècnic passa al formulari d'entrega final.
- Comentaris del codi d'alumnat: en català sense accents.
- Mobile-first: Chromebooks i mòbils.
- **El formulari actual de la SA2 és PUBLICAT i ja té respostes de la S1.** No es pot esborrar ni reestructurar de manera que les respostes es perdin.
- Les tasques de la SA2 creades amb l'antic projecte OAuth no es poden editar per API (`ProjectPermissionDenied`). Els canvis en aquestes tasques es fan a mà o amb tasques noves.
- Les SA5 i SA8 són de micro:bit (`.py`, amb `<nom>_EXPLICACIO.md` al costat). Hi aplica el mateix format.

## Abast i ordre

1. **Plantilla:** `Classes/00_General/` (o `*_PLANTILLA.md`) amb la pàgina de pràctica i la pàgina de SA del nou format. Suport al generador, si cal, per a la capçalera de 3 línies, els blocs «✅ Comprova» i «✍️ Apunta-ho», els plegats del final i les fites 🚩.
2. **SA2 des de la Pràctica 3** (Pràctiques 3, 4 i 5, portada de la SA, guia docent i formularis). **És urgent: l'alumnat hi és ara mateix.**
3. **SA3**, que va just després i té el formulari encara en esborrany (DRAFT).
4. **SA4-SA9**, en l'ordre del curs.

Cada SA és una entrega que es pot verificar i publicar per separat.

## Què queda a criteri de qui ho construeixi

- Com es marquen al Markdown els blocs nous (classes CSS, directives en comentari HTML, `<details>`) i com els pinta el generador, sempre que es vegin bé en mòbil.
- Com s'incrusta l'esquema dins del pas: copiar la imatge o fer una directiva que inclogui un apartat de `SAn_esquemes_connexions.md`. Els fitxers d'esquemes es mantenen com a referència.
- Com s'estenen `sa_definicions.js` i els scripts de `Material Classroom/` per generar un formulari per pràctica més el d'entrega final.
- Quines comprovacions noves val la pena afegir a `tools/qa.py`, per exemple: cada pràctica té la capçalera i el pas final «Respon i envia», i les preguntes «✍️» coincideixen amb el formulari.
- Redactar els passos i el «✅ Comprova» de cada pràctica a partir del «Pas a pas» actual de cada `EXPLICACIO.md`.
