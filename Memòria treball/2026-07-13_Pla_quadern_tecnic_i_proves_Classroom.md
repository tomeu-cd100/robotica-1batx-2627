# Quadern tècnic imprimible + proves al Classroom — Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Objectiu:** generar 3 PDFs imprimibles del quadern tècnic (un per trimestre, 1 pàgina/hora,
personalitzats per sessió), referenciar-los al material i al Classroom, i completar la secció
«Proves i avaluació» del Classroom (T2, T3 i pràctiques SA4–SA9).

**Arquitectura:** fitxer de dades pur (`quadern_sessions.py`) + generador HTML→PDF que
reutilitza el motor Chrome headless de `generar_fulls_imprimibles.py` + guarda de
sincronització a `tools/qa.py`. Classroom: scripts Node data-driven idèntics en patró a
`crear_practiques_t1.js`.

**Disseny aprovat:** `Memòria treball/2026-07-13_Disseny_quadern_tecnic_imprimible_i_proves_Classroom.md`

## Restriccions globals

- Tot el material en català; PDFs amb accents correctes (UTF-8).
- `web/` (excepte `_generador/`) és artefacte generat — mai editat a mà.
- `tools/qa.py` ha de passar abans de cada commit.
- Classroom: tot en `state: 'DRAFT'`, `maxPoints: 10`, idempotent via JSON de resultats.
- Commits en català, Conventional Commits.

---

### Tasca 1: `web/_generador/quadern_sessions.py` (dades)

**Fitxers:** Crear `web/_generador/quadern_sessions.py`

**Produeix (interfície per a les tasques 2 i 3):**
- `SESSIONS: dict[int, list[dict]]` — clau = trimestre (1/2/3); cada sessió:
  `{"sa": "SA2", "s": 3, "titol": str, "avui": str, "vocab": str, "prova": bool}`
  (la darrera sessió de cada trimestre porta `"prova": True`).
- `PROVES: dict[int, dict]` — per trimestre: `{"titol": str, "material": str, "consulta": str}`.
- `TOTAL = {1: 11, 2: 11, 3: 12}` sessions per trimestre (22 h / 22 h / 24 h).

- [ ] **Pas 1:** escriure el fitxer amb les 34 sessions. Títols canònics (de les guies docents,
  capçaleres `## SESSIÓ n (2 h) — …`; SA9 per fases de la taula «Seqüència de sessions»):
  - T1: SA1 S1 «Què és un robot?» · S2 «Arquitectura i seguretat» · S3 «El primer programa» ·
    SA2 S1 «Variables i la primera sortida» · S2 «Estructures de control: el semàfor» ·
    S3 «PWM: intensitat i color» · S4 «Producte: panell de senyalització» ·
    SA3 S1 «Entrades digitals i monitor sèrie» · S2 «Entrades analògiques» ·
    S3 «Funcions + PRODUCTE: alarma/aparcament» · S4 «PROVA PRÀCTICA T1 (individual)» ← prova.
  - T2: SA4 S1 «El servomotor» · S2 «Motor DC i pont H» · S3 «Del sensor al moviment» ·
    S4 «Producte: barrera automàtica» · SA5 S1 «Primers passos amb MicroPython» ·
    S2 «Sensors integrats» · S3 «Ràdio i comparació de paradigmes» ·
    SA6 S1 «Què és un sistema de control?» · S2 «Control tot/res i histèresi» ·
    S3 «Màquines d'estats + tancament del producte» · S4 «PROVA PRÀCTICA T2 (individual)» ← prova.
  - T3: SA7 S1 «Moviment i cinemàtica diferencial» · S2 «Trajectòries programades» ·
    S3 «Evitar obstacles (comportament reactiu)» · S4 «Seguidor de línia + repte de pista» ·
    SA8 S1 «Telemetria: el robot que informa» · S2 «IoT: arquitectura, aplicacions i riscos» ·
    S3 «Introducció a la IA: de les regles a l'aprenentatge» · SA9 S1 «Projecte: idear» ·
    S2 «Projecte: prototipar» · S3 «Projecte: provar» · S4 «Projecte: millorar i documentar» ·
    S5 «Projecte: comunicar (defensa)» ← prova (T3 = demostració + defensa dins SA9).
  Els camps `avui` i `vocab` surten de l'extracció curada de les guies/fitxes (agents del
  2026-07-13); frases en llenguatge d'alumne, ≤ ~90 caràcters.
  `PROVES`: T1 «Llum de seguretat intel·ligent» · T2 «Control climàtic + estació remota» ·
  T3 «Robot autònom + sistema connectat» (títols d'`Avaluació/Prova_practica_Tn.md`).
- [ ] **Pas 2:** verificar sintaxi: `py -c "import sys; sys.path.insert(0,'web/_generador'); import quadern_sessions as q; print({t: len(s) for t,s in q.SESSIONS.items()})"` → `{1: 11, 2: 11, 3: 12}`.

### Tasca 2: guarda de sincronització a `tools/qa.py`

**Fitxers:** Modificar `tools/qa.py` (nova funció `comprova_quadern()` + crida a `main()`).

**Consumeix:** `quadern_sessions.SESSIONS`.

- [ ] **Pas 1:** afegir la comprovació:

```python
# --- 5 · Quadern tècnic: sincronitzat amb guies i quadre d'hores -------------
def comprova_quadern() -> None:
    sys.path.insert(0, str(ARREL / "web" / "_generador"))
    import quadern_sessions as q

    doc = (ARREL / "Programació didàctica" / "08_Sequenciacio_temporal_anual.md")
    text = doc.read_text(encoding="utf-8")
    hores = {f"SA{m.group(1)}": int(m.group(2)) for m in
             re.finditer(r"\|\s*SA(\d)\s*[*†]?\s*\|[^|]+\|\s*(\d+)\s*\|", text)}
    fallats = 0
    for t, sessions in q.SESSIONS.items():
        per_sa: dict[str, int] = {}
        for s in sessions:
            per_sa[s["sa"]] = per_sa.get(s["sa"], 0) + 1
        for sa, n in per_sa.items():
            if hores.get(sa) != n * 2:
                errors.append(f"[quadern] {sa}: {n} sessions ({n*2} h) però el doc 08 en declara {hores.get(sa)} h")
                fallats += 1
        if [s for s in sessions if s.get("prova")] != sessions[-1:]:
            errors.append(f"[quadern] T{t}: la sessió de prova ha de ser exactament l'última")
            fallats += 1
    # Títols coherents amb les guies docents (SA9 usa fases, no capçaleres SESSIÓ)
    for t, sessions in q.SESSIONS.items():
        for s in sessions:
            if s["sa"] == "SA9":
                continue
            guia = (ARREL / "Classes" / s["sa"] / f"{s['sa']}_guia_docent.md").read_text(encoding="utf-8")
            cap = re.search(rf"^## SESSIÓ {s['s']} \(2 h\) — (.+)$", guia, re.M)
            if not cap or cap.group(1).strip() != s["titol"]:
                errors.append(f"[quadern] {s['sa']} S{s['s']}: títol «{s['titol']}» no coincideix amb la guia docent")
                fallats += 1
    for t in q.SESSIONS:
        pdf = ARREL / "Classes" / "00_General" / "pdf" / f"Quadern_tecnic_T{t}.pdf"
        if not pdf.exists():
            avisos.append(f"[quadern] falta {pdf.relative_to(ARREL)} (genera'l amb generar_quadern_tecnic.py)")
    print(f"5) Quadern tècnic: {sum(len(s) for s in q.SESSIONS.values())} sessions, {fallats} incoherències.")
```

- [ ] **Pas 2:** cridar-la a `main()` i actualitzar el docstring. Executar `py tools/qa.py` → ha de passar.

### Tasca 3: `web/_generador/generar_quadern_tecnic.py`

**Fitxers:** Crear `web/_generador/generar_quadern_tecnic.py` ·
Sortida: `Classes/00_General/pdf/Quadern_tecnic_T{1,2,3}.pdf`

**Consumeix:** `quadern_sessions.SESSIONS/PROVES` · `find_browser()` i `print_pdf()` de
`generar_fulls_imprimibles.py` (import directe, mateix directori).

- [ ] **Pas 1:** implementar. Estructura de cada quadern (pàgines A4, `page-break-after`):
  1. **Portada** — «📓 Quadern tècnic — Robòtica · Trimestre n», camps Nom/Grup/Curs amb
     línia, caixa destacada: «Material permès a les proves · 25 % de la nota (R4)»,
     índex de sessions del trimestre.
  2. **Com s'usa i com s'avalua** — resum de les regles (escriure cada sessió, errors
     documentats sumen R1+R4, esquemes a mà, declarar IA) + criteris R4 en versió alumne.
  3. **Fulls de sessió** (davant: capçalera trimestre/sessió n de N/SA·S/títol/data +
     caixes «🎯 Avui» i «📚 Vocabulari» + quadrícula de punts; darrere: quadrícula quasi
     completa + «🐞 Error del dia (DEPURA)» + graella semàfor per pintar «He entès» /
     «Sé fer-ho sol» (columnes 🔴🟡🟢, estil dels checklists) + «Em queda pendent»).
  4. **Full de prova** (última sessió): davant = capçalera de prova + recordatori «pots
     consultar aquest quadern» + quadrícula; darrere = **pla de millora personal** (3
     línies: què m'ha fallat / què practicaré / com ho comprovaré) + semàfor de balanç del
     trimestre. Al T3 el darrere és la **reflexió final de curs** (3 línies de
     `Prova_practica_T3.md`).
  Quadrícula de punts: `background-image: radial-gradient(circle, #b9c4cc .45mm, transparent .55mm); background-size: 5mm 5mm;` amb `print-color-adjust: exact`. CSS base (tipografia, caselles, línies) coherent amb `generar_fulls_imprimibles.py`.
- [ ] **Pas 2:** executar `py web/_generador/generar_quadern_tecnic.py` → 3 PDFs; comprovar
  pàgines: T1/T2 = 2+2·11 = 24 pàg., T3 = 2+2·12 = 26 pàg. Inspecció visual (Read del PDF).
- [ ] **Pas 3:** `py tools/qa.py` → net (l'avís de PDFs desapareix). Commit:
  `feat(quadern): PDF imprimible del quadern tècnic per trimestre (dades + generador + QA)`.

### Tasca 4: referències al material i regeneració del web

**Fitxers:** Modificar `Classes/00_General/00_Quadern_tecnic.md` ·
`Classes/00_General/00_Avaluacio_per_alumnat.md` (§1 fila quadern i §5) ·
`GUIA_INICI_DOCENT.md` · `Classes/00_General/00_LLEGEIX-ME_Classes.md` · regenerar `web/`.

- [ ] **Pas 1:** actualitzar `00_Quadern_tecnic.md` al model paper: regla 1 passa de «Google
  Doc» a «quadern imprès del trimestre» amb enllaços als 3 PDFs (`pdf/Quadern_tecnic_Tn.pdf`);
  regla 3 (esquemes a mà) es simplifica (ja dibuixes directament al quadern); nova regla de
  lliurament: «fotografia les pàgines de la SA i puja-les a la tasca de Classroom»; la
  plantilla d'entrada es manté com a guia del que ha de contenir cada pàgina. Nota final del
  PDF actualitzada.
- [ ] **Pas 2:** enllaços des d'`00_Avaluacio_per_alumnat.md`, `GUIA_INICI_DOCENT.md`
  (recordatori d'imprimir un quadern per alumne abans de començar cada trimestre) i
  `00_LLEGEIX-ME_Classes.md`.
- [ ] **Pas 3:** `py web/_generador/generar.py` + `py web/_generador/generar_pdf.py` (pàgina
  del quadern al manifest) · `py tools/qa.py` → net. Commit:
  `docs(quadern): model paper, enllaços i web regenerat`.

### Tasca 5: Classroom — `crear_practiques_t2.js` i `crear_practiques_t3.js`

**Fitxers:** Crear `Material Classroom/crear_practiques_t2.js` i `crear_practiques_t3.js`
(+ `resultats_practiques_t2.json` / `..._t3.json` generats en executar).

**Consumeix:** patró exacte de `crear_practiques_t1.js` (`getAuthClient`, `COURSE_ID`,
`WEB_BASE`, `findOrCreateTopic`, tasques ASSIGNMENT/DRAFT/10 punts, rúbrica enllaçada com a
material). Afegir al bloc `RUBRIQUES` les definicions **R3** (projecte/robot) i **R5**
(actitud) de `Programació didàctica/07_Rubriques.md`.

- [ ] **Pas 1 (t2):** tasques: SA4 «Barrera automàtica» (R1+R2+R3) · SA5 «Producte micro:bit
  + comparació C++↔Python» (rúbriques segons fitxa SA5) · SA6 «Sistema de control
  documentat, tancat a la S3» (R1+R3+R4) · **Prova T2 «Control climàtic + estació remota»**
  (tema PROVES, R1+R3+R4, descripció amb les dues parts i la graella de correcció
  d'`Avaluació/Prova_practica_T2.md`).
- [ ] **Pas 2 (t3):** tasques: SA7 «Comportament autònom + registre d'iteracions» (R1+R3+R4) ·
  SA8 «Sistema connectat o classificador + reflexió ètica» (R1+R3+R4) · SA9 «Projecte final:
  dossier tècnic + defensa» (R1–R5) · **Prova T3 «Robot autònom + sistema connectat»**
  (tema PROVES, R1+R3+R4, descripció d'`Avaluació/Prova_practica_T3.md`).
- [ ] **Pas 3:** executar `node crear_practiques_t2.js tot` i `node crear_practiques_t3.js tot`
  → 8 tasques DRAFT noves; afegir com a **material** del Classroom l'enllaç «📓 Quadern
  tècnic del trimestre» (PDFs de la web). Commit:
  `feat(classroom): pràctiques i proves T2-T3 en DRAFT + material del quadern`.

### Tasca 6: verificació i tancament

- [ ] `py tools/qa.py` net · PDFs regenerats i comprovats (Read de mostres) · web regenerat.
- [ ] Document de tancament datat a `Memòria treball/` + regenerar índex
  (`py tools/genera_index_memoria.py`).
- [ ] Push a `main` (publica la web amb els PDFs).
