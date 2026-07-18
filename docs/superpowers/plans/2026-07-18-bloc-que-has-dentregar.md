# Bloc «📦 Què has d'entregar» — Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Afegir a dalt del README de cada SA (SA1-SA9) una taula «d'una ullada» amb tots els lliurables de la SA, vigilada per un check nou de `tools/qa.py`.

**Architecture:** Contingut escrit a mà als 9 `Classes/SAn/README.md` (visible a GitHub i a la web sense tocar el generador), més una funció nova `comprova_lliurables()` a `tools/qa.py` que valida el bloc contra `web/_generador/quadern_sessions.py` (la font única de sessions per SA).

**Tech Stack:** Markdown en català, Python 3 (`tools/qa.py`, regex + import de `quadern_sessions`).

**Spec:** `docs/superpowers/specs/2026-07-18-bloc-que-has-dentregar-design.md` (llegeix-la abans de començar).

## Global Constraints

- Tot en català, llenguatge d'alumne (com l'«Itinerari per sessions»).
- Títol del bloc EXACTE (el QA hi ancora): `## 📦 Què has d'entregar`.
- Capçalera de taula EXACTA: `| Quan | Lliurable | On es lliura |`.
- Posició: després de la introducció i la imatge (si n'hi ha), ABANS de `## Itinerari per sessions`. L'itinerari NO es toca.
- **Sessions per SA (font: `quadern_sessions.py`, verificat):** SA1=3 · SA2=4 · SA3=4 · SA4=4 · SA5=3 · SA6=4 · SA7=4 · SA8=3 · SA9=5. **Proves:** SA3-S4 (T1), SA6-S4 (T2), SA9-S5 (T3).
- Ordre de files: S1…Sn, després ⭐ (repte), 📓 (quadern), 🤖 (robot; SA2-SA9, MAI a SA1).
- Els enllaços de cada fila S-n es COPIEN de l'«Itinerari per sessions» del mateix README (mateixes àncores de la fitxa, mateix enllaç de Classroom de la nota del principi de l'itinerari). No inventar àncores.
- La fila de prova: lliurable en negreta `**Prova pràctica Tx (individual)**`, sense enllaç a fitxa; «On es lliura» = `A l'aula, sessió sencera`.
- La sessió 0 del rover (SA7) NO té fila pròpia.
- `py tools/qa.py` sortida 0 abans de cada commit; branca main; Conventional Commits en català.
- Regenerar la web NO cal a cada tasca (gitignored, CI la refà); només a la verificació final.

---

### Task 1: Blocs a SA1, SA2 i SA3 (1r trimestre)

**Files:**
- Modify: `Classes/SA1/README.md`, `Classes/SA2/README.md`, `Classes/SA3/README.md`

**Interfaces:**
- Produces: el format canònic del bloc que les Tasks 2-3 repliquen i que la Task 4 valida (títol, capçalera i icones EXACTES de Global Constraints).

- [ ] **Step 1: Bloc a SA2 (model canònic)**

Llegeix `Classes/SA2/README.md` (itinerari a les línies ~7-15: àncores de les activitats i enllaç de Classroom). Insereix ABANS de `## Itinerari per sessions`:

```markdown
## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Activitat 1 · LED bàsic i variables](SA2_fitxa_alumnat.md#1-led-basic-i-variables-s1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) |
| S2 | [Activitat 2 · El semàfor](SA2_fitxa_alumnat.md#2-semafor-s2) | Mateixa tasca de Classroom |
| S3 | [Activitat 3 · PWM: intensitat i color](SA2_fitxa_alumnat.md#3-pwm-intensitat-i-color-s3) | Mateixa tasca de Classroom |
| S4 | [Activitat 4 · Producte: panell de senyalització](SA2_fitxa_alumnat.md#4-producte-panell-de-senyalitzacio-s4) | Mateixa tasca de Classroom |
| ⭐ | [Repte triat (A, B o C)](../../Reptes/Reptes_SA2.md) | El docent el valida i pinteu l'estrella al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | Les expressions de la mascota (llums, colors i sons dels reptes) | Es reaprofiten al robot del trimestre: [dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md) |
```

Els títols de cada activitat es poden ajustar al text real de l'itinerari de SA2; les àncores NO (còpia literal).

- [ ] **Step 2: Bloc a SA1**

Mateix format amb el contingut de l'itinerari REAL de `Classes/SA1/README.md` (3 sessions → 3 files S). Fila ⭐ amb `../../Reptes/Reptes_SA1.md`. Fila 📓 idèntica a SA2. **SENSE fila 🤖** (el fil conductor comença a SA2). Si l'itinerari de SA1 té lliuraments diferents (p. ex. prova diagnòstica, pòster), la columna «Lliurable» reflecteix el que diu l'itinerari real, no el model de SA2.

- [ ] **Step 3: Bloc a SA3**

4 files S; la **S4 és la prova**: `| S4 | **Prova pràctica T1 (individual)** | A l'aula, sessió sencera |`. Fila 🤖: «La mascota muntada amb ≥3 reaccions (el producte de la SA, es tanca a la S3)» amb enllaç `../00_General/00_Projecte_T1_Mascota.md`.

- [ ] **Step 4: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0 (el check nou encara no existeix; els 11 existents han de seguir verds — vigila l'itinerari intacte).

```bash
git add Classes/SA1/README.md Classes/SA2/README.md Classes/SA3/README.md
git commit -m "feat: bloc que has d'entregar a SA1-SA3"
```

---

### Task 2: Blocs a SA4, SA5 i SA6 (2n trimestre)

**Files:**
- Modify: `Classes/SA4/README.md`, `Classes/SA5/README.md`, `Classes/SA6/README.md`

**Interfaces:**
- Consumes: format canònic de la Task 1 (obre `Classes/SA2/README.md` i calca'l).

- [ ] **Step 1: Bloc a SA4**

4 files S (àncores i Classroom de l'itinerari real de SA4). Fila ⭐ amb `../../Reptes/Reptes_SA4.md`. Fila 🤖: «Les articulacions del braç (control de servos amb potenciòmetres)» amb enllaç `../00_General/00_Projecte_T2_Brac.md`.

- [ ] **Step 2: Bloc a SA5**

3 files S. Fila ⭐ amb `../../Reptes/Reptes_SA5.md`. Fila 🤖: «El comandament per ràdio del braç (les dues micro:bit de la parella)» amb enllaç `../00_General/00_Projecte_T2_Brac.md`.

- [ ] **Step 3: Bloc a SA6**

4 files S; la **S4 és la prova**: `| S4 | **Prova pràctica T2 (individual)** | A l'aula, sessió sencera |`. Fila 🤖: «El braç amb màquina d'estats i emergència (el producte de la SA, es tanca a la S3)» amb enllaç `../00_General/00_Projecte_T2_Brac.md`.

- [ ] **Step 4: Verificar QA i committar**

Run: `py tools/qa.py` → sortida 0.

```bash
git add Classes/SA4/README.md Classes/SA5/README.md Classes/SA6/README.md
git commit -m "feat: bloc que has d'entregar a SA4-SA6"
```

---

### Task 3: Blocs a SA7, SA8 i SA9 (3r trimestre)

**Files:**
- Modify: `Classes/SA7/README.md`, `Classes/SA8/README.md`, `Classes/SA9/README.md`

**Interfaces:**
- Consumes: format canònic de la Task 1.

- [ ] **Step 1: Bloc a SA7**

4 files S (S1-S4 de l'itinerari real; la **sessió 0 de muntatge NO té fila** — ja és el pas 0 de l'itinerari). Fila ⭐ amb `../../Reptes/Reptes_SA7.md`. Fila 🤖: «El rover muntat i funcionant: és la plataforma de tota la SA» amb enllaç `../00_General/00_Projecte_T3_Rover.md`.

- [ ] **Step 2: Bloc a SA8**

3 files S. Fila ⭐ amb `../../Reptes/Reptes_SA8.md`. Fila 🤖: «La telemetria del rover (micro:bit al rover + base amb OLED)» amb enllaç `../00_General/00_Projecte_T3_Rover.md`.

- [ ] **Step 3: Bloc a SA9**

5 files S segons l'itinerari real de SA9; la **S5 és la prova**: `| S5 | **Prova pràctica T3 (individual, per estacions)** | A l'aula, sessió sencera |`. `Reptes/Reptes_SA9.md` NO existeix: la fila ⭐ és el **repte final integrador** amb enllaç al material propi de SA9 (mira el README: hi ha `plantilles/` amb el banc de reptes del projecte — enllaça el que l'itinerari real usi; si no hi ha res clar, enllaça la fitxa d'alumnat de SA9). Fila 🤖: «El rover al repte final i la competició» amb enllaç `../00_General/00_Projecte_T3_Rover.md`.

- [ ] **Step 4: Verificar QA i committar**

Run: `py tools/qa.py` → sortida 0.

```bash
git add Classes/SA7/README.md Classes/SA8/README.md Classes/SA9/README.md
git commit -m "feat: bloc que has d'entregar a SA7-SA9"
```

---

### Task 4: Check `comprova_lliurables()` a `tools/qa.py`

**Files:**
- Modify: `tools/qa.py` (funció nova després de `comprova_python_reptes()`, ~línia 372, i registre a `main()`)

**Interfaces:**
- Consumes: els 9 blocs de les Tasks 1-3 (títol/capçalera/icones EXACTES de Global Constraints); `q.SESSIONS` de `quadern_sessions.py` (mateix import que fa `comprova_quadern()`, línia 161).

- [ ] **Step 1: Escriure la funció**

Afegir després de `comprova_python_reptes()`:

```python
# --- 12 · Bloc «Què has d'entregar» de cada SA -------------------------------
def comprova_lliurables() -> None:
    """El README de cada SA té el bloc «📦 Què has d'entregar» sincronitzat
    amb les sessions reals de quadern_sessions.py (files S-n, fila de prova,
    files ⭐/📓 sempre i 🤖 a SA2-SA9)."""
    sys.path.insert(0, str(ARREL / "web" / "_generador"))
    import quadern_sessions as q

    sessions_sa: dict[str, int] = {}
    prova_sa: dict[str, int] = {}
    for sessions in q.SESSIONS.values():
        for s in sessions:
            sessions_sa[s["sa"]] = sessions_sa.get(s["sa"], 0) + 1
            if s.get("prova"):
                prova_sa[s["sa"]] = s["s"]

    fallats = 0
    for n in range(1, 10):
        sa = f"SA{n}"
        text = (ARREL / "Classes" / sa / "README.md").read_text(encoding="utf-8")
        m = re.search(r"^## 📦 Què has d'entregar\n(.*?)(?=^## |\Z)",
                      text, re.M | re.S)
        if not m:
            errors.append(f"[lliurables] {sa}: falta el bloc «📦 Què has d'entregar» al README")
            fallats += 1
            continue
        bloc = m.group(1)
        files_s = re.findall(r"^\|\s*S(\d+)\s*\|", bloc, re.M)
        if len(files_s) != sessions_sa[sa]:
            errors.append(f"[lliurables] {sa}: {len(files_s)} files de sessió "
                          f"però la SA té {sessions_sa[sa]} sessions")
            fallats += 1
        if sa in prova_sa:
            fila = re.search(rf"^\|\s*S{prova_sa[sa]}\s*\|(.*)$", bloc, re.M)
            if not fila or "Prova pràctica" not in fila.group(1):
                errors.append(f"[lliurables] {sa}: la fila S{prova_sa[sa]} "
                              f"ha de contenir «Prova pràctica»")
                fallats += 1
        for icona, cal in (("⭐", True), ("📓", True), ("🤖", n >= 2)):
            te = bool(re.search(rf"^\|\s*{icona}\s*\|", bloc, re.M))
            if cal and not te:
                errors.append(f"[lliurables] {sa}: falta la fila {icona}")
                fallats += 1
            elif not cal and te:
                errors.append(f"[lliurables] {sa}: la fila {icona} no hi va (SA1 sense robot)")
                fallats += 1
    print(f"12) Lliurables per SA: 9 README, {fallats} incoherències.")
```

A `main()`, afegir `comprova_lliurables()` després de `comprova_enllacos_externs()`.

- [ ] **Step 2: Verificar que el check passa amb els blocs reals**

Run: `py tools/qa.py`
Expected: sortida 0 amb la línia nova `12) Lliurables per SA: 9 README, 0 incoherències.`

- [ ] **Step 3: Verificar que el check FALLA quan es desincronitza (prova negativa, sense committar)**

Elimina temporalment la fila `| ⭐ |` de `Classes/SA5/README.md`, executa `py tools/qa.py` i comprova que surt `[lliurables] SA5: falta la fila ⭐` amb sortida 1. Després **restaura el fitxer** (`git checkout -- Classes/SA5/README.md`) i confirma sortida 0 de nou.

- [ ] **Step 4: Committar**

```bash
git add tools/qa.py
git commit -m "feat: check de QA del bloc que has d'entregar"
```

---

### Task 5: Verificació final (web + revisió visual del contingut)

**Files:**
- Cap fitxer nou (verificació).

**Interfaces:**
- Consumes: tot l'anterior.

- [ ] **Step 1: Regenerar la web i comprovar el bloc**

Run: `py web/_generador/generar.py` i després `py tools/qa.py`
Expected: build neta i QA amb els 12 checks verds.

Comprova que a `web/classes/sa2/index.html` la taula del bloc apareix ABANS de l'itinerari i que els enllaços (`sa2-fitxa-alumnat.html#…`, reptes, tauler, dossier mascota) resolen (el check #1 d'enllaços del QA ja ho valida — només confirma visualment l'ordre de seccions al HTML).

- [ ] **Step 2: Coherència de contingut (lectura creuada)**

Per a cada SA: el nombre de files S i el contingut coincideixen amb l'itinerari del mateix README (mateixes activitats, mateix ordre); les files de prova són SA3-S4, SA6-S4 i SA9-S5 i CAP altra; la fila 🤖 diu el mateix que el bloc «Cap al robot» del `Reptes_SAn.md` corresponent (sense contradiccions de sessió o producte).

- [ ] **Step 3: Res a committar**

`git status` net (la web és gitignored). Si els passos 1-2 han trobat problemes, corregeix el `.md` afectat, repeteix `py tools/qa.py` i committa amb `fix: <què>`.

---

## Self-review del pla (fet)

- **Cobertura de l'spec:** bloc als 9 README (T1-T3), check de QA (T4), verificació final (T5). Fora d'abast respectat (itinerari, generador, CSS intactes). ✔
- **Placeholder scan:** cap; les dades per-SA (sessions, proves, textos 🤖, enllaços de dossier) són al pla; les àncores es copien del README font per instrucció explícita (són contingut existent, no placeholder). ✔
- **Consistència:** títol/capçalera/icones idèntics a Global Constraints, a les Tasks 1-3 i al regex de la Task 4; `comprova_lliurables` amb el mateix patró d'import i d'errors que `comprova_quadern`. ✔
