# 2026-07-11 · Format exacte d'importació de rúbriques a Classroom (deduït)

A partir d'una rúbrica **creada a la UI de Classroom i exportada a Sheets** (que funciona), s'ha deduït el format que fa servir Classroom per importar rúbriques des d'un full. Això permet generar les rúbriques automàticament.

## Estructura del full (una tab, columnes A-E)

```
Fila 1: Et recomanem que no editis les rúbriques en format de full de càlcul   (col A; rètol)
Fila 2: v1.0-s                                                                  (col A; marca de format PUNTUAT)
── per cada criteri, bloc de 5 files ──
  <Títol del criteri>            (col A)
  (buida)                        (descripció del criteri; pot ser buida)
  | 1.0 | 2.0 | 3.0 | 4.0        (punts per nivell, cols B-E)
  | Insuficient (0-4) | Suficient-Bé (5–6) | Notable (7–8) | Excel·lent (9–10)   (títols de nivell)
  | <desc N1> | <desc N2> | <desc N3> | <desc N4>                                 (descripcions de nivell)
```

Detalls que importen:
- **Puntuada 1-4** per nivell (no 0-10); la banda 0-4/5-6/7-8/9-10 va **dins el títol** del nivell. Total rúbrica = nº criteris × 4.
- Títols de nivell EXACTES: guió llarg `–` a «(5–6)», «(7–8)», «(9–10)»; «Suficient-Bé» (guió, no barra); «Excel·lent» amb punt volat.
- La fila `v1.0-s` i l'alineació dels blocs de 5 files són crítiques. **Editar el full exportat trenca la reimportació** (es desalineen els blocs) → per això cal generar-lo de zero, no editar-lo.
- La UI de Classroom **sí** permet crear/importar rúbriques (el docent ho ha fet); només l'**API** està bloquejada per llicència (`@UserIneligibleToModifyRubrics`).

## Eina (`Material Classroom/`, local)

- `crear_rubriques_importables.js` — genera un Sheet per rúbrica en aquest format (CSV → Sheet natiu via Drive, scope `drive.file`). Ús: `node crear_rubriques_importables.js [r1..r5|tot]` (per defecte R2-R5). Resultats a `resultats_rubriques_importables.json`.
- Fitxers generats (carpeta de Drive del curs), títol «Rúbrica R# · … (importable a Classroom)»:
  - R2 `1JXBF3MmyrDn9YuTR0TBH1U1sDsI20WbneI6lhUh0QjQ`
  - R3 `1u6-4K5QP0gXSimjnR07DqGqX5yDBDV1rtIuJPulSCKY`
  - R4 `1Ec4KpJ83-DM5Oe-Vhjt5vrPfOtEAPpyVmIjE8_y4BA4`
  - R5 `1viuoz4Y_W8tPeV2oi-5EPBJg2jx8RGcx6uz2HV9uczY`

## Pendent (test decisiu)

- Confirmar que Classroom **importa un full no exportat per ell mateix** (mateixa estructura). Si NO: pla B = copiar la R1 que funciona (procedència Classroom) i sobreescriure només les cel·les de dades amb Sheets API (cal scope `spreadsheets`, reconsentiment).
- Nota: hi ha també els 5 Sheets «de consulta» (graella llegible) creats abans (`crear_rubriques_sheets.js`); serveixen com a material, no per importar.
