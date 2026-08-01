# Katas de programació 10' (SA2–SA8) · Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** un kata d'escriptura de codi de 10' per a cada pràctica amb sketch (SA2–SA8), amb fitxer per SA, ganxo a cada EXPLICACIO, vista docent al web i vigilància al QA.

**Architecture:** 7 fitxers nous `Classes/SAn/SAn_katas.md` (un kata per sketch, el docent els projecta); el generador els classifica com a vista docent pel sufix; `tools/qa.py` té un check nou que força la cobertura (fitxer per SA + kata per sketch + ganxo per EXPLICACIO).

**Tech Stack:** Markdown, Python 3.11 (`py -3.11`), generador propi (`web/_generador/generar.py`), QA propi (`tools/qa.py`).

**Spec:** `docs/superpowers/specs/2026-08-01-katas-programacio-design.md`

## Global Constraints

- Tot el material en **català**; codi d'alumnat amb comentaris en català **sense accents**.
- Fitxers `.md` existents: editar amb Edit (mai reescriure sencers) — convenció EOL LF.
- `web/` (tret de `_generador/`) és artefacte generat: no s'edita a mà; es regenera amb `py -3.11 web/_generador/generar.py`.
- Sempre `py -3.11` (el `py` pelat resol a 3.13 sense paquets).
- Commits en català, Conventional Commits.
- Abans del commit final: `py -3.11 tools/qa.py` ha de sortir net.

## Inventari de sketches (31 katas)

| SA | Sketches (id = nom de carpeta, o nom de fitxer solt sense `.py`) |
|---|---|
| SA2 | `01_led_basic` `02_semafor` `02b_semafor_switch` `03_fade_pwm` `04_rgb` `05_panell_senyalitzacio` |
| SA3 | `01_polsador_debounce` `02_potenciometre_ldr` `03_ultrasons_funcio` `04_alarma_aparcament` |
| SA4 | `01_servo_potenciometre` `02_motor_pont_h` `03_sensor_velocitat` `04_barrera_automatica` `05_dos_leds_millis` |
| SA5 | `01_name_badge` `02_passes` `03_nightlight` `04_radio_dau` (fitxers `.py` solts) |
| SA6 | `01_llac_obert_vs_tancat` `02_termostat_histeresi` `03_maquina_estats` `04_control_proporcional` |
| SA7 | `01_moviment_basic` `02_trajectoria_quadrat` `03_evita_obstacles` `04_seguidor_linia` |
| SA8 | `01_telemetria_emissor` `02_telemetria_receptor` `03_ia_gestos` (`.py` solts) + `04_esp32_telemetria` (carpeta) |

SA1 i SA9 queden fora (spec). Les EXPLICACIO són `Classes/SAn/codi/<carpeta>/EXPLICACIO.md` o, per a fitxers solts, `Classes/SAn/codi/<id>_EXPLICACIO.md`.

## Plantilles (contingut canònic — copiar literalment)

**Capçalera de cada `SAn_katas.md`** (substituir `{n}` i el títol de la SA pel de `Classes/SAn/README.md` o la fitxa):

```markdown
# SA{n} · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent**. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA{n}.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.
```

**Un kata** (un bloc per sketch, en l'ordre de la taula d'inventari; l'id del sketch ha d'aparèixer literal al títol — el QA hi fa matching):

```markdown
## Kata · `01_led_basic` (Sessió 1)

**Projecta (enunciat):**
> Escriu de zero un programa complet que faci parpellejar un LED connectat al **pin 8**: mig segon encès, mig segon apagat. Fes servir una **constant** per al pin.

**Practica:** esquelet `setup()`/`loop()` · constants · `digitalWrite` + `delay`.
**Pista (per a qui es bloqueja):** tres línies al `loop()`: encén, espera, apaga… i què falta?
**En comparar amb el sketch, mireu:** ① la constant s'usa a TOTES les línies que toquen el pin? ② `pinMode` és a `setup()`? ③ els temps del sketch coincideixen amb els vostres?
```

Regles per redactar cada kata (l'implementador llegeix **primer** el sketch i la seva EXPLICACIO):

1. L'enunciat demana el **bloc central** del sketch (l'estructura que l'EXPLICACIO destaca com a nucli), no el programa sencer si passa de ~15 línies: llavors es demana només aquest bloc («Tens ja X declarat; escriu el bloc que…»).
2. Especificació **concreta i tancada** (pins, llindars, temps reals del sketch) — mai «fes una cosa semblant».
3. La sessió del títol surt de la línia «**Quan es fa:**» de l'EXPLICACIO.
4. «Practica:» = 1 línia amb les estructures objectiu. «Pista:» = 1 línia. «En comparar:» = exactament 3 punts (①②③) de contrast real amb el sketch.
5. Llenguatge del kata = llenguatge del sketch (C++ Arduino a SA2–SA4/SA6–SA7; MicroPython a SA5/SA8; `04_esp32_telemetria` segons el seu codi real).

**Ganxo a cada EXPLICACIO** (inserir com a línia nova just després de la línia de metadades «**Quan es fa:** …», amb línia en blanc abans i després):

```markdown
> ✍️ **Kata primer!** No llegeixis encara el codi: el docent projecta el kata d'aquesta pràctica i tens **10 minuts** per escriure el teu bloc (apunts permesos). Després torna aquí i **compara**.
```

**Línia a cada guia docent** (dins la secció del guió de modelatge, com a paràgraf nou just després del blockquote introductori «Frases i preguntes clau…» o equivalent):

```markdown
> ✍️ **Katas:** en acabar el modelatge de cada sessió, projecta el kata de la pràctica del dia ([SA{n}_katas.md](SA{n}_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch.
```

---

### Task 1: check de QA `comprova_katas()` (primer, perquè falli)

**Files:**
- Modify: `tools/qa.py` (nova funció després de `comprova_explicacions()` (línia ~474) i registre a `main()` (línia ~619))

**Interfaces:**
- Produces: check que exigeix, per SA2–SA8: (a) `Classes/SAn/SAn_katas.md` existeix; (b) per cada sketch (mateixa lògica de descoberta que `comprova_explicacions()`: fitxer principal de carpeta o `.py` solt, ignorant `__pycache__` i auxiliars), el seu id apareix literal dins `SAn_katas.md`; (c) cada `*EXPLICACIO*.md` de la SA conté el marcador `✍️ **Kata primer!**`.

- [ ] **Step 1: Escriure la funció** — afegir a `tools/qa.py` després de `comprova_explicacions()`:

```python
# --- 17 · Katas: un kata d'escriptura per sketch (SA2-SA8) -------------------
def comprova_katas() -> None:
    """Cada SA amb sketches donats (SA2-SA8) ha de tenir SAn_katas.md amb un
    kata per sketch (matching per id literal), i cada pàgina de pràctica ha
    de dur el ganxo «Kata primer» perquè l'alumnat escrigui abans de llegir.
    Vegeu docs/superpowers/specs/2026-08-01-katas-programacio-design.md."""
    GANXO = "✍️ **Kata primer!**"
    sense_fitxer = 0
    sense_kata = 0
    sense_ganxo = 0
    total = 0
    for n in range(2, 9):
        sa_dir = ARREL / "Classes" / f"SA{n}"
        codi = sa_dir / "codi"
        katas = sa_dir / f"SA{n}_katas.md"
        if not katas.exists():
            errors.append(f"[katas] falta Classes/SA{n}/SA{n}_katas.md")
            sense_fitxer += 1
            text = ""
        else:
            text = katas.read_text(encoding="utf-8")
        for f in sorted(codi.rglob("*")):
            if f.suffix.lower() not in {".ino", ".py"} or "__pycache__" in f.parts:
                continue
            if f.parent == codi:                      # fitxer solt (micro:bit)
                sketch_id = f.stem
            elif f.stem == f.parent.name:             # fitxer principal del sketch
                sketch_id = f.parent.name
            else:
                continue                              # fitxer auxiliar (.h, etc.)
            total += 1
            if text and f"`{sketch_id}`" not in text:
                errors.append(f"[katas] SA{n}_katas.md: falta el kata de "
                              f"`{sketch_id}`")
                sense_kata += 1
        for expl in sorted(codi.rglob("*EXPLICACIO*.md")):
            if GANXO not in expl.read_text(encoding="utf-8"):
                errors.append(f"[katas] {expl.relative_to(ARREL)}: sense el "
                              f"ganxo «Kata primer»")
                sense_ganxo += 1
    print(f"17) Katas: {total} sketches SA2-SA8, {sense_fitxer} SA sense fitxer, "
          f"{sense_kata} sense kata, {sense_ganxo} explicacions sense ganxo.")
```

Nota: si el número de check «17» ja és agafat per un altre print, usar el següent lliure (mirar els prints existents) i mantenir la numeració coherent.

- [ ] **Step 2: Registrar a `main()`** — afegir `comprova_katas()` just després de `comprova_explicacions()`.

- [ ] **Step 3: Executar i verificar que falla com toca**

Run: `py -3.11 tools/qa.py`
Expected: exit 1 amb 7 errors `[katas] falta Classes/SAn/SAn_katas.md` + 31 errors de ganxo (i cap error nou d'altres checks).

- [ ] **Step 4: Commit**

```bash
git add tools/qa.py
git commit -m "feat(qa): check de cobertura dels katas de programació (SA2-SA8)"
```

---

### Task 2: vista docent al generador

**Files:**
- Modify: `web/_generador/generar.py:216` (`DOCENT_NAME_HINTS`)

**Interfaces:**
- Consumes: la funció de classificació de públic (~línia 235) ja mira `DOCENT_NAME_HINTS` per nom de fitxer.
- Produces: qualsevol `SAn_katas.md` surt amb `public == "docent"` (amagat al commutador de vista alumnat).

- [ ] **Step 1: Editar la tupla**

```python
DOCENT_NAME_HINTS = ("_guia_docent", "_checklist_docent", "_solucions", "_katas")
```

- [ ] **Step 2: Verificar la classificació**

Run: `py -3.11 -c "import sys; sys.path.insert(0, 'web/_generador'); import generar, pathlib; print([f for f in dir(generar) if 'public' in f.lower() or 'docent' in f.lower()])"` i, amb el nom real de la funció de classificació (~línia 235), comprovar que retorna `docent` per a `Classes/SA2/SA2_katas.md`.
Expected: `docent`.

- [ ] **Step 3: Commit**

```bash
git add web/_generador/generar.py
git commit -m "feat(web): els fitxers _katas es classifiquen com a vista docent"
```

---

### Tasks 3–9: contingut per SA (una task per SA, mateixa recepta)

Task 3 = SA2 · Task 4 = SA3 · Task 5 = SA4 · Task 6 = SA5 · Task 7 = SA6 · Task 8 = SA7 · Task 9 = SA8.

**Files (per a la SA n de la task):**
- Create: `Classes/SAn/SAn_katas.md`
- Modify: cada `*EXPLICACIO*.md` de `Classes/SAn/codi/` (ganxo) · `Classes/SAn/SAn_guia_docent.md` (línia de katas)

**Interfaces:**
- Consumes: plantilles i regles de la secció «Plantilles» d'aquest pla; check `comprova_katas()` de la Task 1.
- Produces: la SA n passa neta el check 17.

- [ ] **Step 1: Llegir el material** — per cada sketch de la SA (taula d'inventari): llegir el codi complet i la seva EXPLICACIO (per treure bloc central, pins/valors reals i la línia «Quan es fa:»).

- [ ] **Step 2: Crear `SAn_katas.md`** — capçalera canònica + un kata per sketch en l'ordre de l'inventari, seguint la plantilla i les 5 regles. L'id del sketch entre backticks al títol del kata (el QA hi fa matching literal).

- [ ] **Step 3: Ganxo a les EXPLICACIO** — inserir amb Edit el blockquote canònic just després de la línia «**Quan es fa:** …» de cada EXPLICACIO de la SA (línia en blanc abans i després).

- [ ] **Step 4: Línia a la guia docent** — inserir el blockquote canònic de katas a la secció del guió de modelatge de `SAn_guia_docent.md`.

- [ ] **Step 5: Verificar**

Run: `py -3.11 tools/qa.py`
Expected: cap error `[katas]` de la SA n (encara n'hi haurà de les SA pendents); cap error nou d'altres checks (enllaços, mojibake…).

- [ ] **Step 6: Commit**

```bash
git add Classes/SAn/
git commit -m "feat(SAn): katas de programació de 10 minuts per a cada pràctica"
```

---

### Task 10: metodologia, regeneració del web i QA final

**Files:**
- Modify: `Programació didàctica/04_Metodologia.md:20` (fila «Pràctica guiada» de §4.2) i §4.2 bis (~línia 29)
- Regenerate: `web/` (generador) i, si el check de PDFs ho demana, PDFs afectats

**Interfaces:**
- Consumes: tot l'anterior.
- Produces: repo net de QA amb el web regenerat.

- [ ] **Step 1: Fila de §4.2** — substituir la descripció de «Pràctica guiada»:

```markdown
| **Pràctica guiada** | 30-40' | Comença amb el **kata d'escriptura (10')**: individual, amb apunts, s'escriu de zero el bloc central del sketch del dia **abans d'obrir-lo** (enunciats a `Classes/SAn/SAn_katas.md`); després es compara amb el sketch donat i l'alumnat el replica i modifica en parelles. |
```

- [ ] **Step 2: Nota a §4.2 bis** — afegir, després de la taula de trams (rere la línia de SA9, abans del bloc «El pseudocodi…»):

```markdown
> ✍️ **Els katas travessen tots els trams:** des de la SA2, cada sessió de codi comença escrivint de zero el bloc central del sketch (10', individual, amb apunts). És la pràctica d'escriptura contínua que fa possible la retirada de bastida d'aquesta taula sense salts.
```

- [ ] **Step 3: Regenerar el web**

Run: `py -3.11 web/_generador/generar.py`
Expected: acaba sense errors; apareixen pàgines noves de katas (vista docent) a `web/`.

- [ ] **Step 4: QA final complet**

Run: `py -3.11 tools/qa.py`
Expected: `✅ QA net.` (check 17 amb 31 sketches, 0/0/0). Si el check de PDFs es queixa de pàgines canviades, regenerar amb `py -3.11 generar_pdf.py` i repetir.

- [ ] **Step 5: Commit final**

```bash
git add "Programació didàctica/04_Metodologia.md" web/
git commit -m "feat: katas de programació integrats a la metodologia i al web"
```
