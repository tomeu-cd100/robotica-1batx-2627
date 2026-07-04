# Millores d'accessibilitat WCAG 2.1 AA al web

**Data:** 4 de juliol de 2026
**Origen:** auditoria externa d'usabilitat i accessibilitat (4 propostes), verificada tècnicament abans d'aplicar-la.

## Què s'ha aplicat

### 1. Contrast en mode fosc (WCAG 1.4.3) — `estil.css`
- **Problema confirmat:** els accents de secció es reutilitzaven en mode fosc sense variant clara. Pitjors casos mesurats: Programació `#4f46e5` → **2.99:1** i Normativa `#475569` → **2.48:1** sobre `--bg #0b1120` (llindar AA: 4.5:1).
- **Solució:** variants de la sèrie 400 per a cada secció (`html[data-tema="fosc"] [data-section=…]`). Totes les ràtios noves: **6.31–12.49:1** (verificades amb script de càlcul WCAG).
- **Correcció sobre la proposta original:** amb accents clars, el text blanc de `.btn-primari`, `.skip` i `.sa-fil-pill.actiu` hauria quedat a **1.67:1** (blanc sobre ambre). Afegida regla de text fosc `#0b1120` en mode fosc per a aquests elements (6.31:1 o més).
- **Extensió pròpia (mateix defecte, no detectat per l'auditoria):** colors de trimestre `--tri` també aclarits en fosc (T1 `#2563eb` era 3.64:1 → `#60a5fa` 7.41:1; T2 i T3 anàlegs).

### 2. Focus visible (WCAG 2.4.7) i moviment reduït (WCAG 2.3.3) — `estil.css`
- Anell `:focus-visible` universal (2px, `outline-offset: 3px`). **Descartat** el `border-radius: 4px` de la proposta: hauria deformat elements arrodonits (botons de 999px) en rebre focus.
- `#cerca:focus-visible` amb anell explícit (el `#cerca:focus { outline:none }` existent té més especificitat i hauria tapat la regla universal).
- Bloc `prefers-reduced-motion: reduce` amb `transition-duration: .01ms` (en lloc de `none`, perquè `transitionend` es continuï disparant).
- Input de cerca a **16px en ≤860px** per evitar el zoom automàtic de Safari iOS. (Matís sobre l'auditoria: el `.9rem` s'aplicava a totes les mides, no només sota 480px.)

### 3. Taules amb scroll horitzontal propi — `generar.py` + `estil.css`
- **Descartada** la proposta original (`display: block` + `white-space: nowrap` a `<table>`): destrueix la semàntica de taula per als lectors de pantalla i fa il·legibles les rúbriques.
- **Solució:** el generador embolcalla cada `<table>` amb `<div class="taula-scroll">` (funció `wrap_tables()`); CSS `overflow-x: auto` al wrapper i `overflow: visible` en impressió.
- Verificat: 55 taules embolcallades només a `programacio/` (6 a la pàgina de rúbriques); a 320px la pàgina no desborda.

### 4. Anunci `aria-live` en copiar codi — `lloc.js` + `estil.css`
- Regió `#a11y-avis` (`aria-live="polite"`, classe `.vo` visualment oculta amb patró clip) creada **en carregar la pàgina** (no sota demanda: els lectors només anuncien regions preexistents al DOM). Buidat + retard de 30ms perquè còpies successives es reanunciïn.

## Verificació
- Script de contrast WCAG (relative luminance) sobre tota la paleta nova: totes AA.
- Verificació al navegador (servidor local): `--accent` fosc correcte per secció, botó primari amb text fosc, anell de focus actiu, 6 taules embolcallades a rúbriques, regió aria-live present.
- Web regenerat: 126 pàgines de document + 17 de codi + 33 de simulació.
- **PDFs no regenerats**: el CSS d'impressió amaga la interfície i el wrapper de taula no canvia res visualment en paper; els 39 PDF existents continuen sent vàlids.

## Pendent (fricció d'usabilitat detectada per l'auditoria, sense proposta de codi)
- Botó «Torna a dalt» en documents llargs (mòbil).
- «Plega-ho tot / Desplega-ho tot» al menú lateral de les SA en mòbil.
