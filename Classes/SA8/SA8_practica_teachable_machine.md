# SA8 · Pràctica d'IA — Entrenar un classificador amb Teachable Machine

> **Què és això?** Una activitat per passar de la **IA per regles** (`03_ia_gestos.py`) a l'**aprenentatge automàtic (ML) real**: en lloc d'escriure les regles, **donem exemples** i deixem que el model **les aprengui sol**. Es fa **al navegador, sense cap maquinari extra**. Integrable com a **ampliació de la SA8 · Sessió 3** (~45–60') o com a **opció de repte a la SA9**.
>
> **Eina:** Google **Teachable Machine** → `teachablemachine.withgoogle.com` (gratuïta, sense instal·lar res). **Connexió:** `00_IA_a_la_materia.md` (marc) · `SA8_guia_docent.md` (ètica de dades).

---

## Per al professorat

### Objectiu
Que l'alumnat **visqui el cicle de ML** —*recollir dades → entrenar → provar → millorar*— i en **descobreixi els límits** (biaix, sobreajust, dades dolentes), connectant-ho amb la idea que ja coneix de la SA8: *bones dades = bones decisions*.

### Requisits i Pla B
- **Ideal:** 1 ordinador/tauleta amb **càmera o micròfon** i **navegador** per parella + internet.
- **Pla B (sense dispositius per a tothom):** **demostració projectada** del docent amb participació de la classe (els alumnes aporten els exemples davant la càmera). El debat i la fitxa es fan igual.
- **Pla B (sense internet):** ajornar a l'aula d'informàtica o a casa; mentrestant, fer el **debat d'ètica i biaix** (§ "Reflexió") amb el classificador per regles `03_ia_gestos.py`.
- **Privadesa (important):** **no desar ni publicar** cap model amb cares d'alumnes; treballar amb **objectes/gestos/sons**, no amb persones identificables, tret de consentiment explícit. Vegeu l'ètica de dades de la guia docent.

### Tres modes (tria un, el de "Imatge" és el més visual)
| Mode | Exemple ràpid d'aula |
|---|---|
| **Imatge** (càmera) | Classificar 3 objectes (bolígraf / goma / mòbil) o gestos de la mà (puny / palmell / "OK"). |
| **So** (micròfon) | Distingir paraules curtes (*"sí" / "no" / silenci*) o sons (cop / xiulet). |
| **Postura** | Classificar postures del cos (dret / assegut / braços amunt). |

### Connexió amb el currículum
- **CA5.1** — tecnologies emergents (IA) aplicades a un sistema.
- **CA5.3 / ètica** — biaix, dades, privadesa (reflexió escrita, R4).
- **Rúbriques:** R3 (el classificador funciona i s'itera), R4 (documentació i reflexió).

### Temporització orientativa (~50')
1. Modelatge/demo del cicle (10') · 2. Recollir dades i entrenar (15') · 3. Provar i **trencar-lo a propòsit** (10') · 4. Millorar (5') · 5. Reflexió biaix/ètica (10').

---

## Per a l'alumnat — Full de treball

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

Avui **no programaràs les regles**: ensenyaràs una IA **amb exemples** i descobriràs per què a vegades **s'equivoca**.

### Pas 1 · Tria i planifica (PREDIU)
1. Mode triat (imatge / so / postura): __________________
2. Les meves **classes** (mínim 2 + un "fons/res"):
   - Classe A: __________  Classe B: __________  Classe C (opcional): __________
3. **PREDIU:** quants exemples creus que necessitaràs de cada classe perquè encerti? ________

### Pas 2 · Recull dades i entrena
1. Obre `teachablemachine.withgoogle.com` → *Get Started* → tria el mode.
2. Per a **cada classe**, recull **com a mínim 20–30 exemples** (varia angle, distància, llum, veu…).
3. Prem **Train Model** (entrenar). Espera que acabi. *(No tanquis la pestanya.)*

### Pas 3 · Prova (i intenta enganyar-lo)
1. Mostra exemples **nous** (no els d'entrenar). Encerta? Anota'n el % de confiança.

| Prova | Classe real | Què diu la IA | % confiança |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

2. **Trenca'l a propòsit:** canvia la llum, el fons, parla més fluix, posa't lluny… Quan **falla**? ______________________

### Pas 4 · Millora (itera)
1. Afegeix **més exemples variats** a la classe que fallava i **torna a entrenar**.
2. Ha millorat? Què has après sobre **quines dades** calen? ______________________

### Pas 5 · Reflexió (biaix i ètica) — això compta (R4)
1. **Biaix:** si l'has entrenat només amb les **teves** condicions (la teva cara/veu/llum), amb qui o quan **fallaria**? ______________________________________________
2. **Dades:** per què *"bones dades = bones decisions"*? Posa un exemple del teu model. ______________________
3. **Regles vs aprenentatge:** quina diferència has notat respecte al classificador per **regles** (`03_ia_gestos.py`)? Quan val més la pena cadascun? ______________________
4. **Privadesa/consentiment:** si el teu model classifiqués **persones**, què hauries de demanar abans? ______________________
5. **Ús d'assistents d'IA** (si n'has fet servir cap durant la pràctica): què li has demanat i què has entès tu? *(Vegeu `00_IA_a_la_materia.md` §5.)* ______________________

### Repte ⭐ (ampliació)
- **Exporta el model** (Export Model → TensorFlow.js) i mira el codi/enllaç que genera: una IA entrenada **es pot integrar** en una app o un robot. Com el faries servir al teu projecte de **SA9**?
- Compara **2 classes molt semblants** (p. ex. dos gestos quasi iguals): com afecta a la confiança? Què diu això dels **límits** de la IA?

---

## Autoavaluació (NA/AS/AN/AE)
| Criteri | Nivell |
|---|---|
| He entrenat un classificador que funciona raonablement (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |
| He identificat **quan i per què falla** (biaix/dades) (R3, R4) | ☐ NA ☐ AS ☐ AN ☐ AE |
| La reflexió sobre dades i ètica és argumentada (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |
