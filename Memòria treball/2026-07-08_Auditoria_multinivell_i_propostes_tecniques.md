# Auditoria multinivell del material i propostes de millora

**Data:** 2026-07-08
**Abast:** tot el repositori (infraestructura, pipeline de build, frontend web, codi d'alumnat, contingut i CI/CD).
**Objectiu:** deixar cada troballa amb prou detall (fitxer, línia, causa i solució proposada) perquè un **programador sènior** pugui implementar-la sense context addicional.

> Nota d'abast: aquesta auditoria és **tècnica i estructural**. La qualitat *pedagògica* del material ja s'ha auditat en rondes anteriors (vegeu `2026-06-30_Auditoria_nivell_per_SA.md` i `2026-07-02/03`), i aquí només s'hi entra en el que és **automatitzable** (QA de coherència).

---

## 0. Resum executiu i taula de prioritats

El material és sòlid i coherent. Els problemes no són de contingut sinó de **cicle de vida de l'artefacte generat** i de **mantenibilitat del generador**. Tres decisions inicials (versionar la sortida, build no determinista, generador monolític) es reforcen mútuament i produeixen el símptoma més visible: un `.git` de **346 MB** i sincronitzacions lentes.

| # | Nivell | Troballa | Impacte | Esforç | Prioritat |
|---|--------|----------|---------|--------|-----------|
| P1 | Infra | El web generat (231 fitxers, 193 PDF, 18 MB) es versiona al repo | Alt | M | **Crítica** |
| P2 | Build | `BUILD_DATE = date.today()` fa el build no determinista | Alt | XS | **Crítica** |
| P3 | CI/CD | El CI puja `web/` precommitejat; no construeix res | Alt | S | **Crítica** |
| P4 | Build | `generar.py` monòlit de 1526 línies, sense tests ni mòduls | Mitjà | L | Alta |
| P5 | Build | Reescriptura d'enllaços per regex sobre HTML generat (fràgil) | Mitjà | M | Alta |
| P6 | Infra | Sense `requirements.txt`/`pyproject`, dependències no fixades | Mitjà | XS | Alta |
| P7 | QA | Cap validació: enllaços trencats, HTML, compilació de codi | Mitjà | M | Alta |
| P8 | Frontend | Cercador només indexa títol+secció, no el cos | Mitjà | S | Mitjana |
| P9 | Frontend | Visor depèn de CDN (pdf.js) i d'Office Online (privacitat) | Baix-Mitjà | M | Mitjana |
| P10 | Codi | Codi d'alumnat sense verificació de compilació ni capçalera comuna | Baix | M | Mitjana |
| P11 | Build | `discover()` amb signatura/docstring desfasada respecte del retorn | Baix | XS | Baixa |

Esforç: XS < 1 h · S ≈ mig dia · M ≈ 1-2 dies · L ≈ 3-5 dies.

**Ordre d'atac recomanat:** P2 → P6 → P3 → P1 (en aquest ordre; P2 i P6 desbloquegen que el build sigui reproduïble en CI, cosa que és prerequisit per treure la sortida del repo sense perdre el desplegament). Després P5/P7 i finalment el refactor P4.

---

## 1. Nivell infraestructura i repositori

### P1 · La sortida generada es versiona dins del repositori font

**Evidència:** `git ls-files web/ | wc -l` → 231 fitxers versionats sota `web/`, dels quals 193 són PDF binaris (`web/pdf/*.pdf`) i la resta HTML/CSS/JS generats per `generar.py`. `du -sh .git` → **346 MB**; `du -sh web` → 18 MB de working tree, però l'històric acumula **cada** versió de cada HTML i PDF regenerats.

**Causa arrel:** es tracta un artefacte de build (`web/`) com si fos codi font. Cada regeneració torna a escriure ~130 HTML + fins a 193 PDF; git en guarda totes les versions. Els PDF són binaris → no es poden delta-comprimir bé → l'històric creix molt de pressa. Això és el que explica el «fetch/pull lent per binaris» ja documentat.

**Proposta d'implementació:**
1. Moure la generació a CI (vegeu P3) perquè `web/` deixi de necessitar estar al repo.
2. Afegir a `.gitignore`:
   ```
   /web/*.html
   /web/classes/ /web/programacio/ /web/avaluacio/ /web/normativa/
   /web/reptes/ /web/recursos/ /web/simulacions/ /web/pdf/
   /web/assets/img/          # imatges copiades pel generador
   /web/assets/css/pygments.css   # generat
   /web/assets/js/cerca-index.js  # generat
   ```
   Mantenir versionats només els *fonts* d'assets no generats (`estil.css`, `lloc.js`).
3. Purgar l'històric amb `git filter-repo --path web/ --path-glob '*.pdf' --invert-paths` (o `--path web/pdf`). **Aquesta operació reescriu l'històric.** Com que el projecte el manté una sola persona, no cal coordinar amb ningú: n'hi ha prou de fer-la un cop, forçar el `push` i **reclonar qualsevol altre ordinador propi** on hi hagi una còpia (el repo se sincronitza ocasionalment des d'una segona màquina). Reduirà el `.git` d'ordres de magnitud. Recomanable fer abans un clon de seguretat complet (`git clone --mirror`).
4. Els PDF oficials de `Normativa/` (5 fitxers, immutables) poden quedar-se; el problema són els **regenerats**, no els estàtics.

**Criteri d'acceptació:** `git clone` nou < 20 MB; `web/` reconstruïble amb un sol comandament; cap `.html`/`.pdf` generat apareix a `git status` després d'un build.

### P6 · Dependències de Python no declarades ni fixades

**Evidència:** no existeix `requirements.txt` ni `pyproject.toml` (cerca buida). L'única pista és el docstring de `generar.py:12`: «`py -m pip install markdown pygments`». Les versions no estan fixades → un build futur amb una versió nova de `markdown` pot canviar la sortida silenciosament.

**Proposta:** crear `web/_generador/requirements.txt` amb versions fixades (p. ex. `markdown==3.7`, `pygments==2.18.0`) i, opcionalment, un `pyproject.toml` mínim amb `[project]` i `requires-python`. Documentar `python -m venv` al README del generador. És prerequisit per a un build reproduïble en CI.

**Criteri d'acceptació:** `pip install -r requirements.txt` en un entorn net produeix un `web/` idèntic (byte a byte un cop resolt P2) al de la màquina de desenvolupament.

---

## 2. Nivell pipeline de build (`generar.py`)

### P2 · Build no determinista per la data de compilació

**Evidència:** `generar.py:42` → `BUILD_DATE = date.today().isoformat()`, inserit al peu de **cada** pàgina a `generar.py:781` (`web generat el {BUILD_DATE}`). Resultat: regenerar el mateix contingut un altre dia canvia ~130 fitxers HTML.

**Impacte:** soroll enorme a git (amplifica P1), diffs il·legibles i impossibilitat de verificar que «el contingut no ha canviat».

**Proposta d'implementació (XS, fer-la primer):**
- Derivar la data del contingut, no del rellotge: usar la data de l'últim commit de git
  (`git log -1 --format=%cs`) via `subprocess`, amb *fallback* a una variable d'entorn `SOURCE_DATE_EPOCH` i, en últim terme, a una constant. Així el peu només canvia quan canvia el contingut.
- Alternativa mínima: treure la data del peu i mostrar-la només a la portada, o substituir-la per la versió/hash curt del commit.

**Criteri d'acceptació:** dos builds consecutius sense canvis de `.md` produeixen `web/` idèntic (`git status` net).

### P4 · Monòlit de 1526 línies sense separació de responsabilitats ni tests

**Evidència:** `web/_generador/generar.py` barreja en un sol fitxer: model de dades (`Page`), descobriment (`discover`), reescriptura d'enllaços (`rewrite_links`), plantilla HTML (`page_shell`, ~70 línies d'f-string), navegació (sidebar, breadcrumb, pager, fil de SA), render de codi/simulacions i orquestració (`main`). Zero tests (`find test_*.py` buit).

**Proposta d'implementació:**
1. Dividir en paquet `generador/`:
   - `model.py` (`Page`, constants `SECTIONS`, `SA_TITLES`, `TRIMESTRES`).
   - `discovery.py` (`discover`, `out_for_md`, detecció de SA/trimestre).
   - `links.py` (resolució i reescriptura d'enllaços — vegeu P5).
   - `render/` amb plantilles (vegeu sota).
   - `build.py` (orquestració, l'actual `main`).
2. **Substituir les f-strings de plantilla per Jinja2.** El `page_shell` i els blocs HTML incrustats són el principal focus d'errors d'escapament i de manteniment. Jinja2 dona herència de plantilles (`base.html` → pàgina de doc / codi / índex / hub) i escapament automàtic. És el canvi que més redueix la superfície d'error.
3. Afegir `tests/` amb pytest cobrint el que és pura lògica i fàcil de trencar en un refactor: `slugify`, `out_for_md`, `rel_url`, `sa_trimestre`, `detect_sa`, `group_sort_key`, `doc_ordre`, i la resolució d'enllaços amb casos (relatiu, àncora, imatge, `.md` no convertit → GitHub, document → GitHub).

**Criteri d'acceptació:** cada mòdul < ~300 línies; `pytest` verd; la sortida HTML abans/després del refactor és equivalent (test de regressió: hash del `web/` generat amb un corpus fix).

### P5 · Reescriptura d'enllaços per regex sobre l'HTML ja renderitzat

**Evidència:** `generar.py:401` → `re.sub(r'(href)="([^"]+)"', repl_href, html_body)` i `:410` per `src`. Opera sobre la cadena HTML final.

**Problemes:**
- Només casa atributs amb **cometes dobles**; qualsevol `href='...'` s'ignora.
- Pot tocar cadenes que semblin `href="..."` **dins de blocs de codi** (`<pre>`), reescrivint text que l'alumnat ha de veure literal.
- Fràgil davant d'atributs multivalor o entitats HTML.

**Proposta d'implementació:** fer la reescriptura sobre l'**arbre**, no sobre el text. Dues vies:
- **Preferida:** un `Treeprocessor` de `python-markdown` (l'extensió ja s'usa) que recorri els nodes `<a>`/`<img>` i reescrigui `href`/`src` abans de serialitzar, saltant-se el que estigui sota `<pre>`/`<code>`. Reaprofita tota la lògica de `resolve()` sense tocar l'HTML com a text.
- **Alternativa:** parsejar l'HTML generat amb `lxml`/`BeautifulSoup` i modificar atributs al DOM.

**Criteri d'acceptació:** test amb un `.md` que contingui (a) un enllaç relatiu vàlid, (b) un bloc de codi amb un `href="..."` literal, (c) una imatge — verificar que només es reescriuen (a) i (c) i que el codi de (b) queda intacte.

### P11 · Signatura i docstring de `discover()` desfasades

**Evidència:** `generar.py:254` declara `def discover() -> tuple[list[Page], dict, dict, list[dict]]:` i el docstring diu «Retorna (pàgines, mapa..., mapa..., grups_codi)» (4 elements), però el `return` de `:340` retorna **6** valors (`pages, md_map, code_map, code_groups, sim_groups, sim_map`) i `main()` en desempaqueta 6.

**Impacte:** només documental/type-checking (mypy es queixaria), però indueix a error en mantenir.

**Proposta:** actualitzar l'anotació a `tuple[list[Page], dict, dict, list[dict], list[dict], dict]` (o, millor, retornar un `@dataclass DiscoverResult`) i corregir el docstring. Aprofitar per introduir `mypy` al CI (P3).

---

## 3. Nivell frontend web

### P8 · Cerca limitada a títol i secció

**Evidència:** `generar.py:1463` construeix cada entrada de l'índex només amb `{"t": títol, "s": secció, "u": url, "tri": ...}`; `lloc.js:124-127` filtra sobre `it.t + " " + it.s`. No hi ha text del cos indexat.

**Impacte:** l'alumnat que cerca un terme que apareix *dins* d'una fitxa (p. ex. «pull-up», «histèresi») no la troba si no és al títol.

**Proposta:** afegir un camp `b` (body) a cada entrada amb el text pla de la pàgina (retallat a ~2-3 KB, sense stop-words), generat a partir del `body` ja convertit (`re.sub('<[^>]+>','', body)`). Ponderar títol > cos al `filter` de `lloc.js`. Vigilar la mida de `cerca-index.js` (ara ~0; amb cos pot anar a centenars de KB → considerar comprimir o partir per secció). Si creix massa, avaluar `lunr.js` o `MiniSearch` precompilat.

**Criteri d'acceptació:** cercar «debounce» o «histèresi» retorna la fitxa/pràctica corresponent.

### P9 · El visor depèn de serveis externs

**Evidència:** `generar.py:1368-1369` carrega `pdf.js` des de `cdn.jsdelivr.net`; `:1384` incrusta els documents Office via `view.officeapps.live.com` passant-hi la **URL raw de GitHub del document**.

**Impacte:**
- **Offline / CDN caigut:** el visor de PDF falla (es gestiona l'error amb un enllaç a GitHub, cosa que és correcta, però no hi ha *fallback* funcional).
- **Privacitat:** els documents (fulls de qualificació, etc.) es reenvien als servidors de Microsoft per previsualitzar-los. En context escolar pot ser sensible; convé documentar-ho o oferir alternativa.

**Proposta:** (a) allotjar `pdf.js` localment a `web/assets/vendor/` (fixat de versió) per eliminar la dependència de CDN i complir la mateixa política d'«autocontingut» que la resta del web; (b) per als documents Office, valorar enllaçar directament a GitHub en lloc d'incrustar-los via tercers, o afegir un avís de privacitat. Prioritat mitjana perquè afecta pàgines secundàries.

*(La resta del frontend — `estil.css` 650 línies, `lloc.js` 164 línies — és de bona qualitat: sense dependències, amb `aria-live`, `aria-pressed`, navegació per teclat al cercador i gestió de tema/mida/tipografia. No requereix acció.)*

---

## 4. Nivell codi d'alumnat (Arduino / MicroPython)

Els 36 fitxers `.ino`/`.py` de `Classes/` són nets, ben comentats i pedagògicament correctes. Millores d'enginyeria, no de contingut:

### P10 · Sense verificació de compilació ni convenció de capçalera

**Evidència:** cap procés compila els `.ino` ni fa *lint* dels `.py`. Un canvi pot introduir un error de sintaxi que no es detecta fins que algú el carrega a la placa.

**Proposta d'implementació:**
- **Arduino:** afegir un job de CI amb [`arduino-cli`](https://arduino.github.io/arduino-cli/) o l'acció `arduino/compile-sketches` que compili tots els sketches de `Classes/**/codi/**` per a `arduino:avr:uno`. Cal declarar les llibreries usades (Servo, etc.).
- **micro:bit:** validar sintaxi amb `python -m py_compile` (no executa maquinari) i, si es vol, comprovar l'API amb un *stub* de `microbit`.
- Opcional: capçalera comuna (títol, SA, llicència, maquinari) via *snippet* o comprovada per un script.

**Observació menor (no bloquejant):** a `SA6/codi/03_maquina_estats.ino:24-27`, `polsat()` fa lectura directa sense antirebot i es mitiga amb `delay(250)` post-transició; és acceptable didàcticament i està comentat. Coherent amb el `debounce` que sí que s'ensenya a `SA3/codi/01_polsador_debounce.ino`.

**Nota d'encoding:** els comentaris eviten accents (p. ex. «Maquina», «Compta premudes»). Si és una decisió deliberada per l'IDE d'Arduino clàssic (problemes amb UTF-8), documenteu-la; si no, es poden restaurar els accents (l'IDE 2.x ja gestiona UTF-8).

---

## 5. Nivell QA de contingut (automatitzable)

### P7 · Cap validació automàtica del material generat ni de la coherència

**Evidència:** no hi ha *link checker*, ni validació d'HTML, ni comprovació de coherència de dades (p. ex. que la suma d'hores per SA de `08_Sequenciacio_temporal_anual.md` quadri amb les ~70 h anuals, o que cada SA tingui els seus 6 materials).

**Proposta d'implementació (script `tools/qa.py` + job de CI):**
1. **Enllaços interns:** després del build, recórrer tots els `<a href>` locals de `web/` i verificar que el fitxer destí existeix (detecta enllaços a `.md` que no s'han convertit, àncores mortes, etc.).
2. **Cobertura de SA:** assertar que cada `SAx` de `Classes/` té guia docent + fitxa alumnat + fitxa ampliada + esquemes + codi, i que existeix el `Reptes_SAx.md` i el solucionari corresponent (SA1-SA8).
3. **Coherència horària:** parsejar la taula de `08_Sequenciacio_temporal_anual.md` i comprovar que el total ≈ 70 h.
4. **HTML:** passar `html5validator` o `tidy` sobre una mostra de pàgines.

**Criteri d'acceptació:** el job falla el PR si hi ha un enllaç intern trencat o una SA incompleta.

---

## 6. Nivell CI/CD

### P3 · El CI desplega sortida precommitejada; no construeix res

**Evidència:** `.github/workflows/pages.yml` fa `checkout` → `upload-pages-artifact path: web` → `deploy-pages`. **No** executa `generar.py`. El build és 100 % manual i local, i el que es desplega és el que hi hagi commitejat a `web/`.

**Impacte:** és la peça que obliga a versionar la sortida (P1) i que permet que font i artefacte divergeixin. També lliga el projecte a la màquina Windows del docent (rutes de Chrome a `generar_pdf.py:24-29`).

**Proposta d'implementació (workflow nou):**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: pip }
      - run: pip install -r web/_generador/requirements.txt
      - run: python web/_generador/generar.py
      # PDF: en CI, usar chromium headless d'Ubuntu (no les rutes Windows)
      - run: |
          sudo apt-get update && sudo apt-get install -y chromium-browser
          python web/_generador/generar_pdf.py   # amb CHROME_CANDIDATES parametritzable
      - run: python tools/qa.py                   # P7
      - uses: actions/upload-pages-artifact@v3
        with: { path: web }
  deploy:
    needs: build
    # ... configure-pages + deploy-pages com ara
```
Cal parametritzar `generar_pdf.py` perquè accepti el navegador via variable d'entorn (`CHROME_BIN`) en lloc de només rutes de Windows fixes (`generar_pdf.py:24-29`), mantenint la llista actual com a *fallback* local.

**Criteri d'acceptació:** un `push` que canviï un `.md` desplega el web actualitzat sense que ningú hagi regenerat res localment; `web/` ja no cal al repo.

---

## 7. Full de ruta d'implementació proposat

Les fases estan ordenades perquè cada una desbloqueja la següent i el risc creixi de menys a més:

- **Fase 1 — Reproduïbilitat (½-1 dia, risc baix):** P2 (data determinista) + P6 (requirements fixats) + P11 (signatura `discover`). No canvia cap sortida visible; deixa el build net i verificable.
- **Fase 2 — Build a CI (½-1 dia, risc baix):** P3 (workflow que construeix) + parametritzar `generar_pdf.py`. Encara amb `web/` al repo, per validar que el CI reprodueix el mateix resultat.
- **Fase 3 — Treure l'artefacte del repo (½ dia + coordinació, risc mitjà per la reescriptura d'històric):** P1 (`.gitignore` + `git filter-repo` + re-clonatge coordinat). Aquí es recupera la mida del repo i la velocitat de fetch.
- **Fase 4 — Robustesa (2-3 dies, risc mitjà):** P5 (enllaços via arbre) + P7 (QA i link-checker) + P10 (compilació de sketches). Xarxa de seguretat abans del gran refactor.
- **Fase 5 — Mantenibilitat (3-5 dies, risc contingut per la xarxa de tests de la Fase 4):** P4 (modularitzar + Jinja2 + pytest). 
- **Fase 6 — Millores de producte (1-2 dies, opcional):** P8 (cerca al cos) + P9 (visor autocontingut).

---

## 8. El que **no** cal tocar (perquè funciona bé)

- L'arquitectura de dades de contingut (`.md` per SA, convenció de noms `SAx_...`) és clara i el generador s'hi recolza bé (detecció de SA/trimestre per nom).
- El frontend sense dependències (`lloc.js`) amb accessibilitat real (aria-live, teclat, tema/mida/tipografia persistents) és de bona qualitat.
- El codi d'alumnat és correcte, comentat i graduat en dificultat entre SA.
- La navegació pautada (fil de SA, breadcrumb, pager, pautes per secció) està ben pensada i és consistent.

L'esforç s'ha de concentrar en el **cicle de vida de l'artefacte** (Fases 1-3), que és on hi ha el retorn més gran amb menys risc.
