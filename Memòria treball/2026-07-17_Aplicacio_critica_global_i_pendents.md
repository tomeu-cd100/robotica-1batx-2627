# 2026-07-17 · Aplicació de la crítica global (G1-G3, M1-M7) i pendents

Decisions del docent sobre l'informe del 16-07: T3 = **prova independent amb sessió
pròpia**; **purga d'historial ara**; temps = **només notes de marge** (sense retallar
taules). «Endavant» a tota la resta.

## Fet en aquesta sessió

1. **G1 · Copyright STEAM Cards**: els 239 PDF (132 MB) mouen a
   `Recursos/_tercers_nomes_local/` (només local), el generador exclou les subcarpetes
   amb prefix `_` de la secció Recursos, i `git filter-repo` els ha tret de tot
   l'historial (165 commits reescrits). **Pack `.git`: 105 MB → 18 MB.** Nota afegida a
   `Recursos/README.md`. ⚠️ Reverteix la decisió del 12-07 de conservar-les («material
   del centre»): tot i ser d'ús del centre, l'autoria no és pròpia i no encaixa amb la
   CC BY-SA.
2. **G2 · Prova T3**: ara és **independent i individual**, a la **S5 de SA9** (el
   projecte es tanca a la S4 amb dossier + defensa; defenses esglaonades des de la S3).
   Logística per **estacions rotatives** documentada a `Prova_practica_T3.md` (Part B
   micro:bit a la taula, Part A per torns de 10-12' a 2-3 pistes). Sincronitzats: doc
   08 (nota †), 18_SA9, guia/fitxes/checklists/exemple/README de SA9,
   00_LLEGEIX-ME_Avaluacio, 00_Avaluacio_per_alumnat, `quadern_sessions.py` i els 3
   quaderns PDF regenerats.
3. **G3 · Marges temporals**: nota «⏱️ Marge» a **totes les sessions** de les guies
   SA1-SA9 (taules sumen ~120', temps efectiu ~100') amb «què cau primer» concret per
   sessió; imperativa a SA3 S3 i SA6 S3.
4. **M1 · Represa Python**: nova targeta `Classes/00_General/00_Repas_expres_MicroPython.md`
   (C++↔Python, 5 patrons de la prova, autotest amb solucions; vista alumnat via
   `GENERAL_ALUMNAT`), repartida a la S2 de SA6 + «Python flash» de 5' a la S3.
5. **M2 · Prova T2**: solució docent del **nucli (histèresi, dos llindars)** afegida
   abans de la proporcional + què mirar en corregir + nota ADC≠graus.
6. **M7 · Recuperació**: §6.4 amb instruments concrets (pla individual d'1 pàgina,
   taula per dimensió, criteri de «recuperat» amb substitució de nota, via SA9 +
   prova global de síntesi al juny, convocatòria extraordinària).
7. **M3-M5 · Classroom**: `_form_sa_lib.js` i `sa_definicions.js` **versionats**
   (whitelist del `.gitignore` alineat amb els 10 fitxers); **scopes retirats**
   (`classroom.rosters`, `classroom.profile.emails`); `crearIPenjar` amb **dedup
   contra Classroom** (per títol, esborranys inclosos), **reintents amb backoff**
   (429/5xx) i **neteja del Form orfe** si falla a mig fer;
   `crear_questionaris_conceptes_forms` no duplica Forms existents a la carpeta.

QA final: **net** (239 pàgines, 0 enllaços trencats, hores 68/68, 34 sessions
coherents, 10 tests del generador). Fulls imprimibles regenerats (16 PDF).

## Segona tanda (mateixa nit)

També s'han aplicat els pendents «no bloquejants» principals:

- **`Material Classroom/config.js`** (config única del curs: COURSE_ID, carpeta Drive,
  categories de nota amb avís de caducitat) + **`estat_classroom.js`** (estat real del
  Classroom via API, llista els ids de categories per al curs nou). Tots dos versionats.
- **`REPO_SLUG`/`SITE_TITLE`/`SITE_TAGLINE` parametritzats** per variable d'entorn a
  `generar.py`; `generar_quadern_tecnic.py` importa `PAGES_BASE` (fora el literal).
- **`qa.py` amb 4 checks nous** (7 PII amb allowlist, 8 validesa de PDF versionats,
  9 mojibake, 10 py_compile del solucionari). SA5 no té .ino; el de SA8 és ESP32
  (exclòs del job UNO expressament — decisió correcta, no es toca).
- **Tests nous del generador**: `tests/test_generar_nucli.py` (rewrite_links/resolve,
  classify_public, is_activitat) — 25 tests en total, tots verds.
- **`generador/navegador.py`**: `find_browser` únic per als 3 scripts de PDF.
- **Fites als 24 reptes ⭐⭐⭐** (SA1-SA8): 3 fites validables per repte.
- **Pla B de CA2.2 sense multímetres** (Tinkercad + `analogRead` calibrat) a la guia
  SA2 i nota a la R2.
- **README §«Publica la teva pròpia còpia»** (fork: Pages, REPO_SLUG, Chrome, OAuth).
- **06 §«Les tres escales que conviuen»** (pes intern de SA / /10 de Classroom /
  ponderació trimestral).
- **Neteja**: esborrats els monolits locals `crear_i_penjar_sa0.js`/`sa1.js` i el
  **`token.json`** (scopes reduïts: el proper script demanarà autorització al
  navegador amb els àmbits mínims).
- **Anàlisi de disseny instruccional**: vegeu
  `2026-07-17_Analisi_disseny_instruccional.md` (necessitats per subgrups, teories
  aplicades/pendents, proposta «Auditoria IoT» per a SA8 S2 i 5 recomanacions).

## Tercera tanda (17-07, continuació)

- **Solucionari ⭐⭐⭐ auditat i alineat:** els 24 `ampliat` ja contenien AMPLIACIO 3,
  però una auditoria fites↔codi (2 agents) va trobar **18 desalineats** (el codi no
  feia el que les fites, escrites ahir, exigeixen validar). Corregits tots (4 agents
  + revisió): paràmetres/dedup (SA1-B, SA4), Serial per validar (SA2-C, SA3-A/B),
  temps Morse exactes (SA1-C), variable d'estat (SA4-A), seqüència executada (SA4-B),
  columnes+redibuixat (SA5-A), mitjanes de lectures (SA5-B, SA6-C), joc amb marcador
  i timeout (SA5-C), termostat fred/calor automàtic amb banda morta i 2 actuadors
  (SA6-A), ruta com a dades (SA7-A), detecció d'encallament (SA7-B), **sketch ESP32
  nou** amb webhook i reconnexió no bloquejant (SA8-A,
  `Solucionari/SA8/A_estacio_meteo_esp32/`), CSV multi-emissor + detecció de muts
  (SA8-B) i **ML real per centroides** entrenat amb dades pròpies (SA8-C).
- **CI reforçat:** el job UNO ara compila **també el Solucionari** (SA1-SA4, SA6,
  SA7) i hi ha **job nou d'ESP32** (esp32:esp32:esp32) per a `04_esp32_telemetria` i
  el sketch nou del solucionari.
- **LXD aplicat — Auditoria IoT (SA8 S2):** nou `Classes/SA8/SA8_auditoria_iot.md`
  (8 targetes de producte genèric + informe d'auditoria d'1 pàgina + peritatge
  creuat); S2 de la guia reestructurada (ganxo/mini-lliçó/auditoria/peritatge/exit
  ticket), fitxa base (activitat 2), fitxa ampliada (disseny propi com a extensió),
  checklists, doc 17, README de SA8, quadern (títol S2) i mapa d'avaluació
  (informe → CA4.2+CA5.3, R4) sincronitzats.
- **LXD aplicat — targeta de represa de ràdio:** nou
  `Classes/00_General/00_Repas_expres_Radio.md` (5 línies de la ràdio + patró de
  telemetria + autotest; vista alumnat), enllaçada des del tancament de SA7 S4, la
  S1 de SA8 (guia) i la fitxa de SA8.
- **Validesa forta de PDF + sincronia .md↔PDF:** nou `generador/pdfutil.py`
  (recompte de pàgines reals, marca `%font-md-sha1:` després de l'%%EOF amb hash
  normalitzat a LF); `generar_pdf.py` i `generar_fulls_imprimibles.py` amb
  **reintents** amb pressupost creixent si Chrome talla; el quadern marca amb el
  hash de `quadern_sessions.py`; **check 8 del QA ampliat** (pàgines ≥ 1 + font
  canviada sense regenerar = error); 8 tests nous (33 en total). Els 19 PDF
  imprimibles/quaderns regenerats amb marca.
- **Check 11 nou (opt-in):** validació d'enllaços externs amb
  `QA_ENLLACOS_EXTERNS=1` (mai no bloqueja el CI; avisos).

## Quarta tanda (17-07): reauth Google + LXD restant

- **Google reautoritzat** ✅ (scopes mínims; el docent va acceptar el consentiment).
  Bug corregit a `estat_classroom.js` (`courses.get` vol `id`, no `courseId`).
  `estat_classroom.json` regenerat: 81 tasques, categories T1/T2/T3 confirmades.
- **Materials publicats al Classroom** (DRAFT, tema SA8) amb el nou
  `crear_materials_enllac.js` (idempotent, materials-enllaç al web): l'auditoria
  IoT i la targeta de ràdio. Publicar-los des del Classroom quan toqui.
- **LXD restant aplicat:** bloc **«🎨 Fes-lo teu»** (3 micro-eleccions de context)
  als 8 bancs de reptes; pregunta fixa d'**estratègia** («Com l'he resolt? Quina
  estratègia m'ha servit?») a la caixa Error del dia del quadern imprès (sense
  créixer d'alçada) i al mapa dels 6 apartats; nou
  `Classes/00_General/00_Tauler_reptes.md` (constel·lació per equips, imprimible
  17è, vista alumnat, enllaçat des de `Reptes/README.md`).

## ⚠️ Accions immediates la propera sessió

1. ~~Reautoritzar Google~~ ✅ FET a la 4a tanda (token nou amb scopes mínims).
2. **L'altra màquina ha de RECLONAR** (no fer pull): l'historial s'ha reescrit per
   segona vegada (filter-repo del 17-07).
3. **Verificar el CI verd** a GitHub (la 1a tanda ja era verda; la 2a s'ha pujat
   després).
4. Còpies de seguretat: bundle pre-purga a la carpeta temporal de la sessió (efímer) i
   mirror del 12-07 a `Documents/robotica-backup-mirror-20260712.git` (**anterior** a
   la feina d'avui; un cop el CI sigui verd i l'altra màquina recloni, es poden
   esborrar tots dos).

## Cinquena tanda (17-07): motor Markdown unificat

- **`generar_fulls_imprimibles.py` ja NO té parser artesà:** converteix amb
  **python-markdown** (les mateixes extensions que el web) + post-procés de
  paper (enllaços aplanats, caselles reals, camps `___` **protegits abans de
  convertir** — el motor els partiria com a èmfasi —, graella semàfor, filtre
  **per paràgraf** de l'avís del PDF perquè python-markdown fusiona blockquotes
  adjacents). Un sol comportament de render a tot el curs.
- **Verificació:** regressió de text visible abans/després als 14 fulls (cap
  pèrdua; els «:» d'etiquetes ara es conserven), 11 tests nous (44 en total),
  17 PDF regenerats i tots els fulls d'una cara segueixen sent d'1 pàgina.
- També: script `tools/reclonar_altra_maquina.ps1` (reclonatge segur d'un sol
  clic per a les altres màquines; one-liner amb iwr|iex al comentari).

## Pendents que queden (després de les CINC tandes)

- **Provar al maquinari real** les solucions ⭐⭐⭐ corregides (compilen i estan
  alineades amb les fites, però l'avís del solucionari segueix vigent: validar a
  placa/Tinkercad, especialment SA7 amb els pins del 3dBot i el nearest centroid
  de SA8-C).
- **Publicar (des de DRAFT)** els 2 materials nous del Classroom quan comenci la SA8.
- **Ullada visual del docent als 17 PDF imprimibles** (el motor ha canviat: el
  text està verificat, l'estètica fina no).
- **Reclonar l'altra màquina** (script llest) i, fet això, esborrar els backups.
