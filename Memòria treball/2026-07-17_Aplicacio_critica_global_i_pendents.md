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

## ⚠️ Accions immediates la propera sessió

1. **Reautoritzar Google**: els scopes han canviat → **esborrar
   `Material Classroom/token.json`** i executar qualsevol script perquè torni a
   demanar autorització al navegador. Fins llavors, els scripts de Classroom fallaran
   amb el token vell si Google valida els àmbits.
2. **L'altra màquina ha de RECLONAR** (no fer pull): l'historial s'ha reescrit per
   segona vegada (filter-repo del 17-07).
3. **Verificar el CI verd** a GitHub després del force push (pages + qa + sketches).
4. Còpies de seguretat: bundle pre-purga a la carpeta temporal de la sessió (efímer) i
   mirror del 12-07 a `Documents/robotica-backup-mirror-20260712.git` (**anterior** a
   la feina d'avui; un cop el CI sigui verd i l'altra màquina recloni, es poden
   esborrar tots dos).

## Pendents de la crítica (no bloquejants, per ordre de valor)

- **Config central del Classroom**: `COURSE_ID`, `DRIVE_FOLDER_ID`, ids de categories
  de nota (caduquen cada curs!, `adjuntar_questionaris_classroom.js:18-22`) i
  `WEB_BASE` dispersos per ~10 fitxers → un únic `config.js`.
- **Parametritzar `REPO_SLUG`/`SITE_TITLE`** a `generar.py` (i el literal duplicat a
  `generar_quadern_tecnic.py`) perquè un fork no apunti al repo original.
- **Checks nous a `qa.py`**: PII/emails als md versionats, avís de PDF de tercers,
  validesa real dels PDF (pàgines, no només mida > 0), mojibake, `.py` de
  `Reptes/Solucionari/`; afegir SA5/SA8 al job de compilació de sketches si tenen .ino.
- **Tests de `resolve()`/`rewrite_links()`** (el codi més arriscat del generador, ara
  sense test unitari) i de `classify_public`/`is_activitat`.
- **Unificar**: `find_browser` copiat a 3 scripts → mòdul compartit; el parser
  Markdown artesà de `generar_fulls_imprimibles.py` vs python-markdown (dos motors).
- **Itinerari d'altes capacitats**: les «+ampliacions» d'una línia no són bastida;
  falten fites i solucionari per als reptes ⭐⭐⭐ (p. ex. PID de SA6).
- **CA2.2 / multímetres**: la mesura física real penja de 2-3 multímetres que potser
  no hi són; decidir pla B avaluable (o comprar-ne).
- **Traçabilitat Classroom**: estat global del que està publicat (reconciliar amb
  l'API), en lloc dels `resultats_*.json` per script.
- **Documentar l'arrencada d'un fork** al README (canviar config, activar Pages,
  dependència de Chrome per als PDF).
- **Neteja local**: esborrar els monolits morts `crear_i_penjar_sa0.js`/`sa1.js`
  (no versionats) quan es confirmi que res no en depèn.
- **Escales de nota**: conciliar en un paràgraf del 06 els tres sistemes (25 % intern
  de SA, /10 de la tasca Classroom, 20 % proves del global) per evitar confusions.
