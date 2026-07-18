# Robots a les fitxes i checklists d'alumnat — Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que el material de treball de l'alumne (fitxa base i checklist) anomeni el robot del trimestre: requadre «🤖 Cap al robot» a les 8 fitxes d'alumnat (SA2-SA9) + ítem a les 8 checklists d'alumnat (SA2-SA9), amb els PDF imprimibles de les checklists regenerats.

**Architecture:** Capa additiva idèntica a la dels reptes: un blockquote al final de cada fitxa i una casella a la llista «Què he de fer» de cada checklist, amb el text de contribució al robot ja fixat als README/dossiers. Els `Classes/SAn/pdf/SAn_checklist_alumnat.pdf` estan versionats i el check #8 del QA vigila la sincronia font↔PDF: cal regenerar-los amb `generar_fulls_imprimibles.py`.

**Tech Stack:** Markdown en català; `py web/_generador/generar_fulls_imprimibles.py` (Chrome/Edge headless) per als PDF; `tools/qa.py` com a verificador.

**Decisió aprovada pel docent:** opció 3 del diagnòstic del 18-07-2026 (fitxes + checklists), conversa registrada; sense spec formal — aquest pla és el contracte.

## Global Constraints

- Tot en català, llenguatge d'alumne. SA1 NO es toca (el fil conductor comença a SA2).
- **Textos de contribució per SA (coherents amb els blocs «Cap al robot» dels reptes i les files 🤖 dels README — no inventar-ne de nous):**
  - SA2 → expressions de la mascota (colors, animacions, sons) · dossier `00_Projecte_T1_Mascota.md`
  - SA3 → reaccions dels sensors; el producte és la mascota amb ≥3 reaccions · `00_Projecte_T1_Mascota.md`
  - SA4 → articulacions del braç (servos + potenciòmetres) · `00_Projecte_T2_Brac.md`
  - SA5 → comandament per ràdio del braç (les dues micro:bit) · `00_Projecte_T2_Brac.md`
  - SA6 → modes i màquina d'estats del braç; el producte es tanca a la S3 · `00_Projecte_T2_Brac.md`
  - SA7 → tot el codi de la fitxa corre al TEU rover (muntat a la sessió 0) · `00_Projecte_T3_Rover.md`
  - SA8 → telemetria del rover (micro:bit + base OLED) · `00_Projecte_T3_Rover.md`
  - SA9 → el projecte final i la competició es corren amb el rover · `00_Projecte_T3_Rover.md`
- Ruta dels enllaços des de `Classes/SAn/`: `../00_General/00_Projecte_T…​.md`.
- El requadre de la fitxa va al FINAL del fitxer i **FORA de qualsevol bloc `<!-- web:only-github -->`** (si l'última línia és dins d'un bloc, posar-lo després del tancament `<!-- /web:only-github -->` o després de l'últim blockquote «Vols més?»).
- `py tools/qa.py` sortida 0 abans de cada commit (atenció al check `8) PDF versionats` i al `12) Lliurables`); branca main; Conventional Commits en català.

---

### Task 1: Requadre «🤖 Cap al robot» a les 8 fitxes d'alumnat

**Files:**
- Modify: `Classes/SA2/SA2_fitxa_alumnat.md` … `Classes/SA9/SA9_fitxa_alumnat.md` (8 fitxers, només append al final)

**Interfaces:**
- Produces: el patró de requadre que la Task 2 referencia.

- [ ] **Step 1: Requadre a SA2 (model)**

Al FINAL de `Classes/SA2/SA2_fitxa_alumnat.md` (després del blockquote «📌 Vols més?», fora de blocs only-github), afegir:

```markdown

> 🤖 **Cap al robot del trimestre:** les expressions que has programat en aquesta fitxa (colors, animacions i sons) són les de la teva **mascota**. Guarda el codi: el reaprofitaràs quan la caixa estigui tallada. Peces, muntatge i cablatge: **[dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md)**.
```

- [ ] **Step 2: Requadres a SA3-SA9**

Mateix format (blockquote de 2-3 línies, negreta al robot i a l'enllaç del dossier), amb el text de contribució de Global Constraints adaptat a cada SA. Abans d'escriure cadascun, mirar el final REAL de la fitxa (alguns acaben dins de `web:only-github` — respectar la restricció de posició). El to: segona persona, com la resta de la fitxa.

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0 (cap check nou afectat; les fitxes no tenen PDF versionat).

```bash
git add Classes/SA2/SA2_fitxa_alumnat.md Classes/SA3/SA3_fitxa_alumnat.md Classes/SA4/SA4_fitxa_alumnat.md Classes/SA5/SA5_fitxa_alumnat.md Classes/SA6/SA6_fitxa_alumnat.md Classes/SA7/SA7_fitxa_alumnat.md Classes/SA8/SA8_fitxa_alumnat.md Classes/SA9/SA9_fitxa_alumnat.md
git commit -m "feat: requadre cap al robot a les fitxes d'alumnat SA2-SA9"
```

---

### Task 2: Ítem 🤖 a les 8 checklists d'alumnat + regeneració dels PDF

**Files:**
- Modify: `Classes/SA2/SA2_checklist_alumnat.md` … `Classes/SA9/SA9_checklist_alumnat.md` (8 fitxers)
- Regenerate: `Classes/SA2/pdf/SA2_checklist_alumnat.pdf` … `Classes/SA9/pdf/SA9_checklist_alumnat.pdf`

**Interfaces:**
- Consumes: textos de contribució de Global Constraints; patró de la Task 1.

- [ ] **Step 1: Ítem a cada checklist**

A la llista de caselles «Què he de fer» (la primera llista `- [ ]` del fitxer), afegir com a ÚLTIM ítem (exemple per a SA2; adaptar text i dossier per SA segons Global Constraints):

```markdown
- [ ] 🤖 Guardar el codi de les expressions per a la **mascota** (el robot del trimestre) → [dossier](../00_General/00_Projecte_T1_Mascota.md)
```

Una sola línia per checklist; no tocar el semàfor ni el bloc DEPURA.

- [ ] **Step 2: Regenerar els PDF imprimibles**

Run: `py web/_generador/generar_fulls_imprimibles.py`
Expected: acaba sense errors i reescriu els PDF de `Classes/SAn/pdf/`.

Després: `git status` — si el script ha reescrit PDF de fitxers NO tocats (SA0, SA1, normes, pòster…), descarta'ls amb `git checkout -- <fitxer>` i queda't només amb els 8 `SAn_checklist_alumnat.pdf` (n=2…9).

- [ ] **Step 3: Verificar QA i committar**

Run: `py tools/qa.py`
Expected: sortida 0, amb `8) PDF versionats: … 0 desfasats de la font`.

```bash
git add Classes/SA*/SA*_checklist_alumnat.md Classes/SA*/pdf/SA*_checklist_alumnat.pdf
git commit -m "feat: item del robot a les checklists d'alumnat i PDF regenerats"
```

---

### Task 3: Verificació final

**Files:** cap (verificació) + `Memòria treball/2026-07-18_Bloc_que_has_dentregar.md` (apunt breu).

- [ ] **Step 1: Web i QA complets**

Run: `py web/_generador/generar.py` i `py tools/qa.py`
Expected: build neta, 12 checks verds. Comprovar que el requadre 🤖 de `web/classes/sa2/sa2-fitxa-alumnat.html` apareix i és visible en vista alumnat (no és dins de cap `nomes-docent` ni s'ha perdut per only-github).

- [ ] **Step 2: Coherència creuada**

Els 8 requadres i els 8 ítems diuen el mateix que la fila 🤖 del README de la seva SA (mateix robot, mateix dossier). Cap contradicció de sessions.

- [ ] **Step 3: Apunt a la memòria de treball i commit**

Afegir al final de `Memòria treball/2026-07-18_Bloc_que_has_dentregar.md` una secció breu `## Addenda (mateix dia): robots a fitxes i checklists` (2-3 línies: què s'ha afegit i per què — el material de treball de l'alumne no anomenava els robots).

```bash
git add "Memòria treball/2026-07-18_Bloc_que_has_dentregar.md"
git commit -m "docs: addenda de la memoria de treball (robots a fitxes i checklists)"
```

---

## Self-review del pla (fet)

- Cobertura de l'opció 3: fitxes (T1), checklists + PDF (T2), verificació (T3). SA1 exclosa per disseny. ✔
- Sense placeholders: textos per SA a Global Constraints; models complets a T1/T2. ✔
- Consistència: rutes `../00_General/…` i noms de dossiers idèntics als usats als README. ✔
