# 2026-07-11 · Rúbriques R1-R5 com a Google Sheets (carpeta del curs)

Generades les **5 rúbriques** de la matèria (`Programació didàctica/07_Rubriques.md`) com a **Google Sheets natius**, un fitxer per rúbrica, a la carpeta de Drive del curs (`1vUzzhLBIArNcRaWdz-nMMtn1R-2l4rMn`).

| Fitxer | Enllaç |
|---|---|
| Rúbrica R1 · Programació (codi) | https://docs.google.com/spreadsheets/d/1oRlW7WRHfSnMK8rO2CJdMtGlO2JY1fiqSODRJEnzkNM/edit |
| Rúbrica R2 · Circuit i electrònica | https://docs.google.com/spreadsheets/d/1sdJ_raZ0g-G0OiV-FxzNftZYW8KGVxr0RiImnMvrX9g/edit |
| Rúbrica R3 · Projecte i robot | https://docs.google.com/spreadsheets/d/1Bly2_8s7hmwVEcgg_ysN2tJADv8ejVStuPsJbxFXhr8/edit |
| Rúbrica R4 · Documentació tècnica i comunicació | https://docs.google.com/spreadsheets/d/1PO0v5oGcDMgoK7wmX8JhD1mKlYdRCvgDtsuMR4ZyJ-M/edit |
| Rúbrica R5 · Actitud, cooperació i autoregulació | https://docs.google.com/spreadsheets/d/1wAtRg7bHwMMcXoerVmColTRjBNV7eHD4JKdjdt5z7qo/edit |

Cada full: fila títol + fila de bandes + capçalera (Criteri · Insuficient 0-4 · Suficient/Bé 5-6 · Notable 7-8 · Excel·lent 9-10) + 4 criteris.

## Recerca: importació de rúbriques a Classroom

- **«Importar des de Sheets»** només accepta rúbriques **creades i exportades dins de Classroom** (carpeta «Rubric Exports»), amb **files 1-2 ocultes** de metadades; Google avisa de no editar-les. Un full fet a mà **no entra** per aquesta via.
- Tota la funció de rúbriques (crear/importar/exportar) va **amb llicència** Education **Plus** / **Teaching & Learning** (mateix bloqueig que l'API: `@UserIneligibleToModifyRubrics`).
- Via realista d'«importar des d'un fitxer»: **Gemini a Classroom** converteix **Excel/PDF/Doc/Sheets** en rúbrica (també subjecte a activació/llicència). Aquests Sheets són bona **entrada** per a aquesta conversió i **material de consulta**.

## Eina (`Material Classroom/`, local, fora del repo)

- `crear_rubriques_sheets.js` — crea els 5 Sheets. **Truc:** puja un **CSV** amb Drive API i `mimeType` destí `application/vnd.google-apps.spreadsheet` → Drive el converteix a full natiu **sense** el scope `spreadsheets` (n'hi ha prou amb `drive.file`). Idempotent via `resultats_rubriques.json`.

## Pendent / opcional

- Adjuntar a cada tasca avaluable de T1 el Sheet de la rúbrica que li toca (ara enllacen el doc genèric 07_Rubriques).
- Si s'activa la llicència: crear rúbrica nativa a la UI i exportar-la (llavors sí es pot reimportar).
