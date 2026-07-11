# 2026-07-11 · Fulls imprimibles en PDF (normes + checklists d'alumnat)

Fulls per **omplir/recollir en paper** convertits a PDF net i versionats al repo, amb enllaç a cada pàgina.

## Abast (decisió del docent)

- **SA1 · Normes de seguretat** (full de compromís amb **signatura**).
- **10 checklists d'alumnat** (SA0-SA9): autoavaluació amb graella **semàfor** per pintar.
- Ubicació: **`Classes/SAn/pdf/<nom>.pdf`** (al costat del seu material).
- No s'hi inclouen les fitxes (ja són a Classroom) ni altres documents.

## Eina nova: `web/_generador/generar_fulls_imprimibles.py`

- Convertidor Markdown→HTML d'impressió **a mida** (subconjunt: títol, línia d'identitat, `- [ ]`, taules, blockquotes, èmfasi, codi, enllaços). Genera:
  - **Camps per omplir** amb línies CSS reals (nom, parella/equip, data, signatura) — no els `____` col·lapsats de les taules Markdown.
  - **Caselles** de verificació reals (☐) a partir de `- [ ]`.
  - **Graella semàfor** amb capçalera 🔴🟡🟢 i cel·les buides amb alçada per pintar.
- Imprimeix amb **Chrome/Edge headless** (`--print-to-pdf`, `@page A4`), sense dependències de Python.
- El full de **normes** es maqueta amb una plantilla dedicada (llista numerada 1-12 + bloc de signatura amb línies amples).
- Reexecutable: `py web/_generador/generar_fulls_imprimibles.py` (regenera els 11 PDF).

## Enllaços a les pàgines

- A cada checklist i al full de normes s'ha afegit una línia visible:
  `> 📄 **[Versió PDF per imprimir…](pdf/<nom>.pdf)**`.
- El generador del web **reescriu** automàticament els enllaços a `.pdf` cap a la URL de GitHub (blob), com fa amb la resta de documents → l'enllaç funciona **a GitHub i al web**.
- El convertidor **salta** qualsevol blockquote que enllaci un `.pdf` (un full imprimible no s'enllaça a si mateix), així el PDF regenerat no conté l'avís.

## Notes tècniques

- Consola de Windows en cp1252: cal `sys.stdout.reconfigure(encoding="utf-8")` per imprimir ✓/emojis al log.
- Chrome amb `Start-Process -Wait` (o `subprocess.run`) per esperar l'escriptura del PDF; el `file://` ha de ser una URI Windows correcta (`Path.as_uri()`), no `/c/...`.

## Pendent / possible ampliació

- Si es volen també els fulls de **producte** (SA1 pòster-robot, plantilla disseny d'objecte): afegir-los a `TARGETS`.
- Les fitxes base segueixen a Classroom (Google Form); no es fan en PDF imprimible.
