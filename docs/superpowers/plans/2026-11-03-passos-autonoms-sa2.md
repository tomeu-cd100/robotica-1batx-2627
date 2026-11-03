# Passos autònoms · Pla 1: plantilla + SA2 des de la Pràctica 3

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que les Pràctiques 3, 4 i 5 de la SA2 i la portada de la SA2 segueixin el format «passos autònoms», amb un formulari de Classroom per pràctica i una entrega final. Que el generador i el `qa.py` suportin i vigilin aquest format per a les SA següents.

**Architecture:** El Markdown continua sent la font única. El generador (`render_practica_page`) afegeix una passada `marca_passos()` que converteix els `### Pas N` en targetes i acoloreix els paràgrafs ✅/✍️/📤. La capçalera i els plegats són HTML dins del Markdown (`md_in_html`, ja inclòs a `extra`). El `qa.py` comprova el format només a les pràctiques i SA declarades com a «nou format». A Classroom, un fitxer de definicions nou alimenta `crearIPenjar()`, que ja existeix.

**Tech Stack:** Python 3.11 (`markdown`, `pytest`), Node ESM (`googleapis`), CSS a `web/assets/css/estil.css`.

**Spec:** `docs/superpowers/specs/2026-11-03-passos-autonoms-design.md`

## Global Constraints

- Tot en català. Comentaris de `.ino`/`.py` d'alumnat: en català sense accents.
- `web/` (excepte `_generador/`) és generat: no s'edita a mà.
- Abans de cada commit: `py -3.11 web/_generador/generar.py`, `py -3.11 -m pytest web/_generador/tests -q` i `py -3.11 tools/qa.py` han de passar.
- Commits en català, Conventional Commits, acabats amb `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Push automàtic en acabar cada tasca verificada.
- `Material Classroom/credentials.json` i `token.json`: no s'obren, no es mostren, no es mouen.
- **Qualsevol execució amb `--aplica` contra Classroom/Forms necessita la confirmació explícita del docent** en el moment d'executar-la. El mode per defecte dels scripts és la simulació.
- Mobile-first: res que necessiti scroll horitzontal a 360 px.
- La SA2 S1 (Pràctiques 1, 2 i 2b) no es reescriu.

## Review Focus

1. **Esborranys de la S1 al formulari vell:** treure les seccions d'S2 i S3 no pot tocar els elements de la S1. S'esborren per índex, sense recrear res, i no s'executa mai `actualitzar_form_fitxa_sa.mjs sa2`, que ho substitueix tot. Ho prova la sortida de la simulació de la Tasca 3.
2. **Pas amb el codi complet:** la marca `<!-- codi-complet -->` dins d'un `### Pas` ha de quedar dins de la targeta, i no tancar-la abans d'hora. Test a la Tasca 1.
3. **Pàgina sense «Pas a pas»** (pràctiques velles com la `02_semafor`): `marca_passos` no les ha de canviar. Test a la Tasca 1.
4. **Mòbil:** les imatges d'esquema dins de les targetes no poden desbordar (`max-width:100%`). Verificació manual a 360 px a la Tasca 4.
5. **Formulari de pràctica que demana coses de després:** les preguntes de cada formulari han de coincidir 1:1 amb els «✍️» de la seva pàgina. Comprovació de la Tasca 4, pas 5.

---

### Task 1: Generador · targetes de pas i blocs ✅/✍️/📤

**Files:**
- Modify: `web/_generador/generar.py` (nova funció al costat de `marca_targetes`, ~línia 352; crida a `render_practica_page`, ~línia 1352)
- Modify: `web/assets/css/estil.css` (al final)
- Test: `web/_generador/tests/test_passos.py`

**Interfaces:**
- Produces: `marca_passos(body: str) -> str`. Markdown de pràctica que fan servir les Tasques 2 i 4:
  - capçalera: `<div class="cap-practica" markdown="1">` amb tres línies que comencen per 🎯, ⏱️ i 📦;
  - passos: `### Pas N · <Verb> …` sota `## 🚀 Pas a pas`;
  - paràgrafs que comencen per `✅`, `✍️` o `📤`;
  - plegats: `<details markdown="1"><summary>🧗 Si t'encalles</summary>` i `<details markdown="1"><summary>🧠 Vols saber per què funciona?</summary>`.

- [ ] **Step 1: Escriu els tests** a `tests/test_passos.py` (mateix patró d'import que `test_ancores.py`):
  - `test_embolcalla_cada_pas`: `'<h3 id="pas-1">Pas 1 · Munta</h3><p>a</p><h3 id="pas-2">Pas 2 · Carrega</h3><p>b</p><h2 id="x">X</h2>'` dona exactament 2 `<section class="pas">`. El `<h2>` queda fora de les seccions.
  - `test_codi_complet_dins_del_pas`: un pas que conté `<div id="codi-complet"><details>…</details></div>` el conserva dins de la seva `<section class="pas">`.
  - `test_classes_comprova_apunta_envia`: `<p>✅ Comprova: x</p>` → `<p class="comprova">`. El mateix per a ✍️ → `apunta` i 📤 → `envia`.
  - `test_sense_passos_no_canvia`: un body sense cap `<h3 id="pas-` torna idèntic, llevat de les classes de paràgraf.
- [ ] **Step 2:** `cd web/_generador; py -3.11 -m pytest tests/test_passos.py -q` → FAIL (`marca_passos` no existeix).
- [ ] **Step 3: Implementa `marca_passos`.** Regex sobre els `<h3 id="pas-…">`: cada secció va des del seu h3 fins al proper `<h3`, `<h2` o el final. Les classes de paràgraf es fan amb `re.sub(r'<p>(✅|✍️|📤)', …)`. A `render_practica_page`, aplica-la just després de `wrap_tables(md.convert(text))` i **abans** de substituir la marca `codi-complet`. Així el comentari HTML encara és dins del pas quan es fan les seccions.
- [ ] **Step 4: Afegeix el CSS** de `.cap-practica` (requadre blau clar, vora esquerra), `.pas` (targeta amb vora i separació), `.pas img {max-width:100%;height:auto}`, `.comprova` (verd), `.apunta` (taronja, vora discontínua) i `.envia` (botó destacat per a l'enllaç). Que funcioni en mode clar i fosc, com la resta del fitxer.
- [ ] **Step 5:** `py -3.11 -m pytest tests -q` → tots PASS.
- [ ] **Step 6: Commit** `feat(web): targetes de pas i blocs comprova/apunta/envia a les pràctiques`.

### Task 2: QA · vigilar el nou format

**Files:**
- Modify: `tools/qa.py` (nova secció abans de `def main`, i crida a `main()`; ajust a `comprova_lliurables`, ~línia 476)
- Test: `tools/tests/test_format_passos.py` (crea `tools/tests/`; afegeix `python -m pytest tools/tests -q` a `.github/workflows/qa.yml` darrere dels tests del generador)
- Create: `docs/plantilles/PRACTICA_PLANTILLA.md`, `docs/plantilles/PORTADA_SA_PLANTILLA.md`

**Interfaces:**
- Consumes: el format Markdown de la Tasca 1.
- Produces:
  - `PRACTIQUES_NOU_FORMAT: set[str]`, amb els camins relatius a l'arrel, que la Tasca 4 omple: `Classes/SA2/codi/03_fade_pwm/EXPLICACIO.md`, `…/04_rgb/EXPLICACIO.md`, `…/05_panell_senyalitzacio/EXPLICACIO.md`;
  - `SA_NOU_FORMAT: set[int] = {2}`;
  - `errors_format_practica(text: str) -> list[str]` i `errors_format_portada(text: str) -> list[str]`, funcions pures;
  - `comprova_format_passos() -> None`.

- [ ] **Step 1: Escriu els tests** amb textos en línia:
  - `errors_format_practica` retorna `[]` per a la plantilla `PRACTICA_PLANTILLA.md` amb un enllaç `https://classroom.google.com/...` posat a l'últim pas.
  - Hi ha un error quan:
    - falta `class="cap-practica"`, o hi falta alguna de les línies 🎯/⏱️/📦;
    - hi ha menys de 2 `### Pas`;
    - l'últim `### Pas` no conté «Respon i envia», o la seva secció no té cap enllaç `classroom.google.com`;
    - hi ha un `## ` que comença amb 🧠 (la teoria ha d'anar plegada);
    - no hi ha cap paràgraf ✍️.
  - `errors_format_portada` retorna error si falta «🏁 Entrega final» o «🚩», o si conté «No premis «Envia»».
- [ ] **Step 2:** `py -3.11 -m pytest tools/tests -q` → FAIL.
- [ ] **Step 3: Implementa** les dues funcions i `comprova_format_passos()`. Recorre `PRACTIQUES_NOU_FORMAT` i el `README.md` de cada SA de `SA_NOU_FORMAT`, i afegeix `errors` amb el prefix `[passos]`. Imprimeix una línia de resum numerada com les altres seccions.
- [ ] **Step 4: Ajusta `comprova_lliurables`.** Per a les SA de `SA_NOU_FORMAT`, la fila 📓 deixa de ser obligatòria. Les files S-n, ⭐ i 🤖 continuen sent-ho.
- [ ] **Step 5: Escriu les plantilles.**
  - `PRACTICA_PLANTILLA.md`: capçalera, 4 passos d'exemple amb ✅ i ✍️, últim pas «📤 Respon i envia», línia «⭐ Si acabes abans» i els dos `<details>`.
  - `PORTADA_SA_PLANTILLA.md`: línia «En acabar aquesta SA podràs…», ruta ①②③ amb fites 🚩, bloc «🏁 Entrega final» amb la versió nucli, «📦 Què has d'entregar» i «📚 Per repassar a casa».
  - Totes dues segons la spec, apartats 1, 2 i 6.
- [ ] **Step 6:** `py -3.11 -m pytest tools/tests -q` → PASS. `PRACTIQUES_NOU_FORMAT` i `SA_NOU_FORMAT` es deixen **buits** fins a les Tasques 4 i 5, així que `py -3.11 tools/qa.py` ha de passar sencer.
- [ ] **Step 7: Commit** `feat(qa): comprovació del format de passos autònoms i plantilles`.

### Task 3: Classroom · formularis per pràctica i transició del formulari de la SA2

**Files:**
- Create: `Material Classroom/practiques_definicions.js`
- Create: `Material Classroom/crear_forms_practiques.mjs`
- Create: `Material Classroom/transicio_sa2_s1.mjs`
- Modify: `Material Classroom/sa_definicions.js` (entrada `sa2`: deixar només els elements de la S1, perquè coincideixi amb el formulari transformat)
- Output: `Material Classroom/resultats_forms_practiques.json`

**Interfaces:**
- Consumes: `crearIPenjar(def)`, `trobaTascaPerTitol`, `getAuthClient`, `ambReintents` i els helpers `t/p/pOpt/s/check/autoaval` de `_form_sa_lib.js`; `GRADE_CATEGORIES`, `SA_TRIMESTRE` i `WEB_BASE` de `config.js`.
- Produces:
  - `PRACTIQUES`: objecte de definicions, amb claus `'sa2-p3'`, `'sa2-p4'`, `'sa2-p5'` i `'sa2-final'`. Cada definició té els camps que espera `crearIPenjar`.
  - `resultats_forms_practiques.json`: `{ "<clau>": { taskUrl, formUrl, state } }`. La Tasca 4 en llegeix els `taskUrl`.

- [ ] **Step 1: Escriu `practiques_definicions.js`.** Comú a totes les definicions: `sa: 'sa2'`, `topicName: 'SA2 · Sortides digitals i PWM'`, `state: 'DRAFT'`, `gradeCategory: GRADE_CATEGORIES.T1` i `materials` amb l'enllaç a la pàgina web de la pràctica (`${WEB_BASE}/sa2/codi/03-fade-pwm.html`, `04-rgb.html`, `05-panell-senyalitzacio.html`). Contingut de cada formulari:
  - **`sa2-p3`** · títol `SA2 · Pràctica 3 · La llum que respira`, `maxPoints: 10`:
    - `s('Rang de valors d’analogWrite: de ____ a ____')`
    - `p('Què canvia quan poses delay(2)? I delay(20)?')`
    - `p('Què passa amb el LED al pin 8, que no té ~? Per què?')`
    - `p('Diferència entre digitalWrite i analogWrite')`
  - **`sa2-p4`** · `SA2 · Pràctica 4 · Colors RGB`, `maxPoints: 10`:
    - `p('Els teus 3 colors: valors R, G, B de cadascun')`
    - `pOpt('⭐ Repte: transició suau entre dos colors. Com ho has fet?')`
    - `p('El concepte nou més important d’aquesta sessió')`
  - **`sa2-p5`** · `SA2 · Pràctica 5 · Panell de senyalització`, `maxPoints: 10`:
    - els tres `p('Estat «…»: color RGB / so (piezo) / relé')` que ara són a `sa_definicions.js`
    - `p('Un error que has trobat i com l’has resolt')`
  - **`sa2-final`** · `SA2 · Entrega final`, **sense** `maxPoints`. La `descripcioTasca` comença amb «Fes-la quan hagis acabat la Pràctica 5.». Elements:
    - `t('Versió nucli', 'Per aprovar n’hi ha prou amb un panell amb 2 estats clarament distingibles amb color i so.')`
    - l'`autoaval([...])` que ara és a la `sa2` de `sa_definicions.js`
    - un `check('Checklist final', [...])` amb els ítems de `SA2_checklist_alumnat.md`, adaptats segons la Tasca 5
- [ ] **Step 2: Escriu `crear_forms_practiques.mjs <prefix> [--aplica]`.** Filtra les claus de `PRACTIQUES` que comencen per `<prefix>`. Sense `--aplica`, imprimeix per a cada clau el títol, els punts i la llista de preguntes, i acaba. Amb `--aplica`, crida `crearIPenjar(def)` per a cada clau (ja és idempotent per títol) i fusiona el resultat a `resultats_forms_practiques.json`.
- [ ] **Step 3: Escriu `transicio_sa2_s1.mjs [--aplica] [--forca]`.**
  - Llegeix `formId` de `resultats_sa1a9.json` (`.sa2.formId`) i fa `forms.get`.
  - Localitza l'índex del primer element amb títol que comença per `Activitat 2`. Tots els elements des d'aquest índex fins al final s'esborraran, **un `deleteItem` per índex en ordre descendent i en un sol `batchUpdate`**. No es crea ni es recrea res.
  - Canvia el títol del formulari a `SA2 · Sessió 1 — El semàfor` i la descripció a «Respostes de la Sessió 1 (semàfor, Racó de mesura i fase nocturna). Envia-ho a l'inici de la Sessió 2, tal com ho tinguis.».
  - Mateix guard de lliuraments `TURNED_IN` que `actualitzar_form_fitxa_sa.mjs`, línies 50-54.
  - En simulació, imprimeix els elements que es conserven i els que s'esborrarien.
  - En acabar (també en simulació), imprimeix el bloc «📋 A mà a Classroom» amb el títol i la descripció nous de la tasca, per enganxar-los (l'API dona `ProjectPermissionDenied`).
  - Si no troba cap «Activitat 2», s'atura sense fer res, perquè vol dir que ja s'ha aplicat.
- [ ] **Step 4: Retalla l'entrada `sa2` de `sa_definicions.js`** perquè coincideixi amb el que quedarà al formulari: `titol`, `descripcioForm`, `descripcioTasca` i els elements fins a «Activitat 1» inclosa. Afegeix-hi un comentari que digui que la resta viu a `practiques_definicions.js` des del 2026-11-03.
- [ ] **Step 5: Verifica en simulació.** `cd "Material Classroom"; node crear_forms_practiques.mjs sa2` i `node transicio_sa2_s1.mjs`.
  - La primera llista 4 formularis amb les preguntes del Step 1.
  - La segona mostra que només es conserven «Abans de començar», «Activitat 1» i les seves preguntes.
- [ ] **Step 6: ⛔ Atura't i demana confirmació al docent.** Ensenya-li la sortida del Step 5. Només amb un «sí» explícit, executa `node crear_forms_practiques.mjs sa2 --aplica` i `node transicio_sa2_s1.mjs --aplica`. Comprova que `resultats_forms_practiques.json` té 4 `taskUrl`.
- [ ] **Step 7: Commit** `feat(classroom): formularis per pràctica de la SA2 i transició del formulari de la S1`. Inclou el JSON de resultats; no conté secrets.

### Task 4: Contingut · Pràctiques 3, 4 i 5 en passos

**Files:**
- Modify: `Classes/SA2/codi/03_fade_pwm/EXPLICACIO.md`, `Classes/SA2/codi/04_rgb/EXPLICACIO.md`, `Classes/SA2/codi/05_panell_senyalitzacio/EXPLICACIO.md`
- Modify: `tools/qa.py` (omple `PRACTIQUES_NOU_FORMAT` amb aquests 3 camins)

**Interfaces:**
- Consumes: el format de la Tasca 1, `PRACTICA_PLANTILLA.md` i els `taskUrl` de `resultats_forms_practiques.json` (Tasca 3).

- [ ] **Step 1: Reescriu la Pràctica 3** amb la plantilla.
  - Capçalera: 🎯 «que un LED s'encengui i s'apagui a poc a poc» · ⏱️ 25 min · 📦 1 LED, 1 resistència de 220 Ω.
  - Passos:
    1. Munta: imatge `../../img/sa2-tinkercad-fade.png` dins del pas; ✅ «el cable va a un pin amb `~`».
    2. Carrega: `<!-- codi-complet -->`; ✅ «el LED respira».
    3. Canvia `delay`: ✍️ amb les mateixes preguntes que el formulari.
    4. Prova el pin 8: ✍️.
    5. 📤 Respon i envia: enllaç al `taskUrl` de `sa2-p3` i «Després, passa a la [Pràctica 4](../04_rgb/EXPLICACIO.md)».
  - Línia ⭐ «Si acabes abans». Els trossos «Com funciona», «On ho aplicaràs» i l'exemple resolt van dins del `<details>` 🧠. La taula «Errors que veuràs segur» va dins del `<details>` 🧗.
- [ ] **Step 2: Reescriu la Pràctica 4.**
  - Capçalera: ⏱️ 30 min · 📦 mòdul RGB i 4 cables.
  - Passos:
    1. Munta: la taula de connexions actual més la imatge `sa2-tinkercad-rgb.png`.
    2. Carrega i mira la seqüència: ✅.
    3. Crea 3 colors: ✍️.
    4. ✍️ Concepte nou.
    5. 📤 Enllaç a `sa2-p4` i a la Pràctica 5.
  - El repte de la transició suau, a la línia ⭐.
- [ ] **Step 3: Reescriu la Pràctica 5.**
  - Capçalera: ⏱️ tota la sessió · 📦 RGB, brunzidor, relé.
  - Passos:
    1. Mini-check en paper (10', no compta).
    2. Dissenya els estats: ✍️, amb les 3 preguntes d'estat del formulari, sense enllaç a la fitxa.
    3. Munta: taula més `sa2-tinkercad-panell.png`.
    4. Carrega: `codi-complet`, ✅ «fa clic el relé a l'alarma».
    5. Fes-lo teu: mínim i complet, com ara.
    6. Prepara la defensa d'1': ✅.
    7. ✍️ Un error i com l'has resolt.
    8. 📤 Enllaç a `sa2-p5` i després «🏁 Ara fes l'[Entrega final](../../README.md#entrega-final)».
- [ ] **Step 4:** Omple `PRACTIQUES_NOU_FORMAT`. Executa `py -3.11 web/_generador/generar.py` i `py -3.11 tools/qa.py`: ni errors `[passos]` ni `[explicacions]`.
- [ ] **Step 5: Coherència amb el formulari.** Per a cada pràctica, els textos ✍️ han de correspondre 1:1 amb les preguntes de la seva clau a `practiques_definicions.js`. Si no, corregeix la pàgina, no el formulari publicat.
- [ ] **Step 6: Mòbil.** Obre `web/classes/sa2/codi/03-fade-pwm.html` amb el navegador a 360 px d'amplada: ni scroll horitzontal ni imatges desbordades. Si hi ha eina de navegador disponible, captura de pantalla.
- [ ] **Step 7: Commit** `feat(sa2): pràctiques 3-5 en passos autònoms`.

### Task 5: Portada de la SA2, guia docent i documents vinculats

**Files:**
- Modify: `Classes/SA2/README.md` (de la línia 7, «Com treballes», fins al final de «📦 Què has d'entregar»)
- Modify: `Classes/SA2/SA2_guia_docent.md` (xuleta, línies 6-23; mapa d'avaluació, ~línia 99)
- Modify: `Classes/SA2/SA2_fitxa_alumnat.md` (línies 47, 74, 85-87), `Classes/SA2/SA2_checklist_alumnat.md` (línies 16-17)
- Modify: `Programació didàctica/11_SA2_Sortides_digitals_PWM.md` (instruments, ~línia 49)
- Modify: `tools/qa.py` (`SA_NOU_FORMAT = {2}`)

**Interfaces:**
- Consumes: els `taskUrl` de la Tasca 3, les pàgines de la Tasca 4 i `PORTADA_SA_PLANTILLA.md`.

- [ ] **Step 1: Portada de la SA2** segons `PORTADA_SA_PLANTILLA.md`.
  - Treu les 4 regles i «No premis «Envia»». Es manté el bloc de la sessió de marge i el «💻 Com carregar el codi».
  - Ruta:
    - ① Pràctica 2 · Semàfor, ② Pràctica 2b · `switch` (amb la Pràctica 1 com a ajuda), i la 🚩 «Final de la Sessió 1: envia el formulari **SA2 · Sessió 1 — El semàfor** a l'inici de la Sessió 2» amb l'enllaç a la tasca actual (`ODcwNTEzOTQ1NjAz`).
    - ③ Pràctica 3, ④ Pràctica 4, i la 🚩 «Final de la Sessió 2: has enviat el formulari de la ④».
    - ⑤ Pràctica 5.
    - `## 🏁 Entrega final`, amb `{#entrega-final}`: condició «quan hagis acabat la ⑤», defensa d'1', enllaç a `sa2-final`, versió nucli.
  - «📦 Què has d'entregar»: files S1, S2 i S3 actualitzades, sense la fila 📓 i amb les files ⭐ i 🤖 intactes. A baix, «📚 Per repassar a casa» amb els enllaços que ara són a «Si vols més».
- [ ] **Step 2: Xuleta de la guia docent.**
  - La columna «🗣️ Explica» de S2 i S3 passa a ser el **guió d'arrencada 5-10'**: les 2-3 idees per entendre la pràctica de la fita del dia, més una pregunta a la classe. Es conserva el contingut actual, que ja és això.
  - Afegeix una nota: «L'alumnat avança al seu ritme per la ruta; l'arrencada explica la pràctica de la 🚩 del dia».
  - La primera línia de la xuleta ha de dir «ruta de pràctiques», no «una sessió plegable per dia».
- [ ] **Step 3: Mapa d'avaluació** (guia docent i Programació didàctica). La fila del quadern tècnic queda: «Quadern tècnic (25 %) = mitjana dels formularis de pràctica (S1, P3, P4, P5), cadascun sobre 10», i segueix amb **R4**, perquè ho exigeix `comprova_rubrica_quadern`. A la Programació didàctica, a «Instruments», el quadern en paper surt i hi entren els formularis de pràctica.
- [ ] **Step 4: Fitxa base i checklist**, només treure el que és vell.
  - Fitxa, línia 47: «(al quadern)» → «(al formulari de la Sessió 1)».
  - DEPURA: «Apunta-ho» sense «al quadern».
  - Secció «Quadern tècnic»: «Les preguntes del quadern són l'última pregunta de cada formulari de pràctica».
  - Checklist: la línia 16 parla dels formularis de pràctica enviats, i la línia 17 diu «Enviar l'**Entrega final** quan acabis la Pràctica 5».
- [ ] **Step 5:** Posa `SA_NOU_FORMAT = {2}`. Executa el generador, `pytest` (generador i tools) i `qa.py`: tot verd.
- [ ] **Step 6: Commit i push** `feat(sa2): portada en ruta de pràctiques amb fites i entrega final`. Comprova que el workflow `qa.yml` de GitHub passa (`gh run watch`).
- [ ] **Step 7: Lliura al docent:**
  - el text «📋 A mà a Classroom» de la Tasca 3;
  - el recordatori de **publicar** (DRAFT → PUBLISHED) les tasques `sa2-p3`, `sa2-p4`, `sa2-p5` i `sa2-final` quan vulgui;
  - l'avís que el quadern tècnic imprès del T2 i del T3 (`generar_quadern_tecnic.py`) queda pendent de decidir abans de la SA4.
