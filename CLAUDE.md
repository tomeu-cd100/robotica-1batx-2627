# CLAUDE.md — Curs Robòtica 1r Batxillerat

Material docent en **català** (Robòtica 1r Batx, LOMLOE). Markdown font única;
`web/_generador/generar.py` construeix la web (doble vista alumnat/docent) i
`generar_pdf.py` els PDFs (Chrome/Edge headless). GitHub Pages publica a cada push a `main`.

## Regles

- **Tot en català** als documents. **EXCEPCIÓ: els comentaris del codi d'alumnat
  (`.ino`, `.py`) van en català SENSE accents** (evita problemes de codificació als editors
  dels alumnes).
- **`web/` (excepte `_generador/`) és artefacte generat**: no s'edita a mà.
- **Abans de committar**: `tools/qa.py` ha de passar (enllaços, cobertura de SA, quadre
  d'hores de `08_Sequenciacio_temporal_anual.md`, sintaxi dels `.py` d'alumnat). El CI també
  compila tots els `.ino` de SA1–SA7 amb `arduino:avr:uno`.
- **Contracte de cobertura per SA**: definit a `tools/qa.py:comprova_cobertura_sa()` —
  README, guia_docent, fitxa_alumnat, fitxa_ampliada, checklists docent/alumnat, i per
  SA1–SA8 esquemes de connexions + `Reptes/Reptes_SAn.md` + solucionari.
- **Cada SA té el seu document 1:1 a `Programació didàctica/`** — mantén-los sincronitzats.
- **`Material Classroom/`**: scripts Node data-driven (definicions a `sa_definicions.js`).
  `credentials.json` i `token.json` són secrets OAuth: no els moguis ni els mostris; no
  n'afegeixis de nous al control de versions.

## Convencions

- Nomenclatura estricta: `SA{n}_{tipus}.md` (sufixos `_guia_docent`, `_fitxa_alumnat`,
  `_fitxa_ampliada`, `_checklist_*`, `_esquemes_connexions` determinen la vista
  alumnat/docent de la web); transversals `00_Nom.md`; plantilles `*_PLANTILLA.md`.
- Sense frontmatter YAML: metadades al nom de fitxer + primer `# H1` + línia
  `**Durada:** … · **Maquinari:** …`.
- Directives del generador en comentaris HTML: `<!-- web:only-github -->…<!-- /web:only-github -->`.
- Material transversal a `Classes/00_General/` amb capçalera `> **Per a qui és?**`.
- Commits en català, tipus Conventional Commits.
