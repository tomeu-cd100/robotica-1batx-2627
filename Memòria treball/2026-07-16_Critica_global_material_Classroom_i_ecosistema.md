# Crítica global del material, del Classroom i de l'ecosistema (16-07-2026)

Auditoria crítica completa demanada pel docent: material didàctic, Google Classroom
(scripts i definicions), tooling (generador web, QA, PDFs), higiene del repo i web
publicat. Feta amb el QA formal del projecte (build en còpia temporal + `tools/qa.py`)
més quatre anàlisis en profunditat (pedagogia, Classroom, higiene, tooling).

## 1. Què s'ha comprovat

- **QA formal**: `git archive` → build en còpia temporal. `pytest web/_generador/tests`
  → 10/10. `generar.py` → 180 pàgines doc, 17 de codi, 34 simulacions, 107 imatges,
  237 entrades de cerca, sense errors. `tools/qa.py` → **net** (els avisos de
  "pdf local desactualitzat" són perquè no s'han regenerat els PDF a la còpia; el CI
  els genera).
- **Web publicat**: https://tomeu-cd100.github.io/robotica-1batx-2627/ respon, generat
  el 16-07-2026 (al dia amb l'últim commit).
- **`web/`**: només 5 fitxers font versionats (CSS/JS/vendor); cap HTML generat
  committat. Correcte.
- **Higiene**: secrets (0 fuites, mai a l'historial), RGPD (cap dada d'alumnat, cap
  CSV, cap DNI), mojibake (0), `git status` net.
- **Pedagogia**: programació didàctica sencera, guies docents i fitxes de totes les SA,
  proves T1–T3, reptes, avaluació.
- **Classroom**: els 8 scripts versionats + `sa_definicions.js` + `_form_sa_lib.js`
  locals, `.gitignore`, historial de secrets.
- **Tooling**: `generar.py`, `generar_pdf.py`, `qa.py`, scripts d'impresos/quadern,
  tests, docs d'arrencada.

## 2. Problemes trobats (per gravetat)

### 🔴 Greus

**G1 — Copyright: 239 PDF de tercers versionats i enllaçats des del web.**
`Recursos/Fitxes STEAM Cards curs 2020-2021/` (~137 MB versionats del total de
Recursos) és material aliè dins un repo públic CC BY-SA. El `.gitignore` només exclou
el `.zip` i `_tercers_nomes_local/`, no la carpeta descomprimida. I
`section_documents()` (`web/_generador/generar.py:1124-1128`) la publica com a
targeta-enllaç a GitHub des de la secció Recursos del web. Incompatible amb la
llicència declarada d'obra pròpia. Acció: gitignore + treure l'enllaç + purga
d'historial (`git filter-repo`) — de passada reduiria el pack de `.git` (105 MB, clone
lent, era el pendent de la ronda del 12-07).

**G2 — Contradicció de la prova T3.** `08_Sequenciacio_temporal_anual.md:37` diu que
la prova T3 és el tancament de la SA9 (demostració + defensa); `Prova_practica_T3.md`
descriu una prova independent de 2 h, individual, amb robot sobre pista. La SA9 té 5
sessions sense cap forat per encabir-la, i no hi ha robots per fer-la individual.
A més, T3 i SA9 comparteixen CA4.1/CA4.2/CA3.1 → risc de doble avaluació del mateix
producte (20 % proves + 45 % projectes). Cal decidir: o la prova és la defensa (i
`Prova_practica_T3.md` sobra o es refà), o té sessió assignada i logística resolta.

**G3 — Sobrecàrrega temporal sistèmica.** `04_Metodologia.md:17,25` reconeix que el
temps efectiu d'una sessió de 2 h és de ~95-105'. Però **totes** les taules de sessió
de les guies docents sumen ~120' d'activitat nuclear (verificat a SA1 S1/S2, SA2 S1,
SA3 S1, SA6 S3, SA7 S4). ~15-20 % de sobrecàrrega a cada sessió, contradient la pròpia
metodologia. Pitjors casos: SA3 S3 (mini-check + primer HC-SR04 + funció nova +
integració + mini-defensa + documentar) i SA6 S3 (màquina d'estats — el concepte més
abstracte del trimestre — introduïda a la mateixa sessió del tancament de producte i
defensa, amb `millis()` com a dependència "si no s'ha fet, 10' ara",
`SA6_guia_docent.md:67`). Acció: re-cronometrar a 100' i marcar a cada sessió què cau
primer.

### 🟠 Mitjans

**M1 — Illa de Python i forat de retenció.** La seqüència promet "un llenguatge
consolidat i transferència posterior" (`08:75-76`), però el recorregut real és
C++ (SA2-4) → Python (SA5) → C++ (SA6-7) → Python (SA8). La prova T2 (final de SA6)
avalua Python a la Part B després de 4 setmanes de només C++, sense cap represa. El
curs combat l'"efecte passatger" amb mini-checks però no aplica cap bastida de
retenció de Python. Acció: micro-represa de Python dins SA6/SA7 o moure la Part B.

**M2 — Solució docent del T2 no cobreix el nucli.** El nucli avaluable de la Part A és
histèresi (3 punts, `Prova_practica_T2.md:39`), però la "Solució orientativa" només
mostra control proporcional (l'ampliació d'excel·lent, `:50-66`). Falta la solució
model del mínim exigible.

**M3 — Scripts de Classroom publicats trencats.** Dels 8 scripts versionats a
`Material Classroom/`, 7 fan `import ... from './_form_sa_lib.js'`, però ni
`_form_sa_lib.js` ni `sa_definicions.js` estan versionats (el whitelist del
`.gitignore:52-56` tampoc reflecteix els 8 fitxers reals). En un clone públic, el codi
publicat no s'executa. Cap dels dos fitxers conté secrets (llegeixen `token.json` en
runtime): es poden versionar. Acció: versionar la llibreria+definicions i alinear el
whitelist, o desversionar els scripts dependents.

**M4 — Idempotència del Classroom basada en fitxers locals.** `crearIPenjar`
(`_form_sa_lib.js:124,182`) sempre crea Form+tasca nous; la deduplicació viu a
`resultats_*.json` locals no versionats. `crear_questionaris_conceptes_forms.js:100-151`
amb `APPLY=1` dues vegades crea 9 Forms duplicats. Si `batchUpdate` o
`courseWork.create` fallen a mig fer, queda un Form orfe al Drive sense registre. Cap
reintent/backoff davant 429/5xx de Google. Acció: comprovar existència per
`fileId`/material dins la creació, no per títol ni per JSON local.

**M5 — Scopes OAuth més amplis que l'ús.** `_form_sa_lib.js:18-27` demana 9 scopes
(decisió conscient documentada al comentari), però `classroom.rosters` i
`classroom.profile.emails` (correus d'alumnat menor) no els fa servir cap flux de
publicació, i `actualitzar_fitxes_pdf.js:11` demana `drive` complet quan la resta usa
`drive.file`. El `token.json` en pla amb aquests scopes és un secret d'alt privilegi.
Acció recomanada: retirar els 2 scopes sense ús i reautoritzar.

**M6 — Hardcodes que trencaran el curs vinent.** `COURSE_ID`, `DRIVE_FOLDER_ID`,
`WEB_BASE` (`_form_sa_lib.js:33-35`) i sobretot els ids de categories de nota
(`adjuntar_questionaris_classroom.js:18-22`) es regeneren cada curs. Igual al
generador: `REPO_SLUG` duplicat a `generar.py:43,77` i literal a
`generar_quadern_tecnic.py:262`. Cap config central; migrar de curs = editar ~10
fitxers. Acció: `config` únic (Classroom) + parametritzar `REPO_SLUG` (web).

**M7 — Recuperació sense instruments.** `06_Avaluacio:44-46` resol la recuperació en
abstracte; no hi ha cap tasca/rúbrica/criteri de recuperació concret per trimestre ni
previsió de recuperació final de curs. En una programació de Batxillerat és un buit
formal real.

**M8 — Validació de PDF inexistent.** `generar_pdf.py:96` només comprova mida > 0;
un PDF en blanc per timeout de Chrome (`--virtual-time-budget=4000`, sense reintents)
passa el QA. I els PDF versionats (checklists, quadern, impresos) es regeneren a mà
sense cap check de sincronia amb el `.md` font.

### 🟡 Menors / higiene

- **Diversitat asimètrica**: molta bastida cap avall (targetes de rescat, versió nucli,
  MakeCode, SA0 — molt bo), però l'enriquiment per a alumnat avançat són "+ampliacions"
  d'una línia sense bastida ni solucionari (`Reptes_SA6.md:45`, PID). Itinerari d'altes
  capacitats per construir.
- **CA2.2 penja d'un recurs incert**: l'única mesura física real depèn de 2-3
  multímetres que "si no n'hi ha cap, fes-ho com a demo" (`SA2_guia_docent.md:42`);
  la rúbrica R2 l'exigeix igualment.
- **Punts cecs de `qa.py`**: no cobreix RGPD/PII, copyright, validesa real de PDF,
  enllaços externs, mojibake, `.py` de `Reptes/Solucionari/`; SA5/SA8 no es compilen
  al job d'sketches (`qa.yml:60-62`). El que el CI no mira, ningú ho mira.
- **Zero tests de `resolve()`/`rewrite_links()`** — el codi més arriscat del generador
  (els tests actuals només cobreixen `utils.py`). Nota positiva: els bugs històrics
  de reescriptura (backticks `.pdf`, URLs externes) estan **mitigats i coberts**.
- **Dos motors de Markdown** (python-markdown al web vs parser artesà a
  `generar_fulls_imprimibles.py:131-245`, sense tests) i `find_browser` copiat a 3
  scripts: deriva assegurada.
- **UX inconsistent dels PDF**: les activitats tenen botó local "⬇ Baixa PDF", però els
  checklists/normes enllacen el PDF via GitHub blob (perquè `is_activitat()` no els
  inclou) — treu l'usuari del web.
- **Fork no documentat**: cap instrucció de canviar `REPO_SLUG`, activar Pages, ni de
  la dependència de Chrome. Un docent que faci fork publica un web que apunta al repo
  original.
- **Traçabilitat Classroom**: cap registre global versionat del que està publicat;
  `sa1`/`sa2` `PUBLISHED` i la resta `DRAFT` a `sa_definicions.js`, però la ruta
  d'`adjuntar_questionaris` ho crea tot en DRAFT — dues fonts de veritat.
- **Tres escales de nota sense conciliar**: 25 % intern de SA (quadern), /10 de la
  tasca Classroom, 20 % de proves al global. No és cap error, però enlloc s'explica la
  correspondència.
- Codi mort: monolits `crear_i_penjar_sa0.js`/`sa1.js` amb scopes divergents.
- `tomeu@conselldecent.com` en un fitxer versionat
  (`Memòria treball/2026-06-27_Sincronitzacio_GitHub.md:32`) — públic i acceptable,
  però conscient.

## 3. Punts forts (per contrast, i són reals)

Traçabilitat instrument→criteri→rúbrica a cada SA; PRIMM amb retirada de bastida
planificada; mini-checks individuals contra l'efecte passatger; pla de contingència
temporal amb ordre de retallada; coeducació operativa (rotació de rols, referents
per SA, daltonisme); exemples resolts de qualitat professional (SA3); seguretat
elèctrica amb signatura; avaluació inicial diagnòstica; build determinista amb QA a
CI; zero secrets ni dades d'alumnat a l'historial; patró data-driven amb mode
descoberta abans d'`APPLY` i `drive.file` en lloc de `drive`.

## 4. Què NO s'ha comprovat

- Enllaços externs (arduino.cc, Wokwi, visor d'Office) — mai validats, ni aquí ni al CI.
- L'estat viu del Classroom real (no s'ha consultat l'API): què hi ha publicat de debò
  vs `sa_definicions.js`.
- Renderitzat visual pàgina a pàgina del web i contingut real dels PDF committats
  (no s'han regenerat, seguint el protocol de QA).
- Exactitud tècnica línia a línia de tots els solucionaris i sketches (el CI compila
  SA1–SA7; SA5/SA8 no).
- Contingut de `Recursos_Professorat_Robotica_1Batx.xlsx` (no obert).

## 5. Ordre d'atac suggerit

1. G1 (copyright STEAM Cards): gitignore + desenllaçar + `filter-repo`. Legal i ràpid.
2. G2 (T3): decisió de disseny, abans no comenci el curs.
3. G3 (temps): repassada de totes les taules de sessió a 100' efectius.
4. M3+M4+M5 (Classroom): versionar llibreria, dedup real, retallar scopes — una tarda.
5. M1+M2+M7 (Python, solució T2, recuperació): material nou petit.
6. Resta: manteniment incremental (config central, tests de `resolve()`, checks nous a
   `qa.py`).
