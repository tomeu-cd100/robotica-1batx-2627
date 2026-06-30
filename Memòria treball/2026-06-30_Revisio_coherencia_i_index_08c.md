# 2026-06-30 · Sincronització i revisió de coherència (índex 08c)

## Context
Sincronització amb GitHub després de treballar des d'un altre ordinador (entren els commits `dc45bab` reptes "producte de la vida real" i `ebc1daa` rúbriques vs competències + pont micro:bit-Arduino) i, tot seguit, **revisió de coherència de tot el material**.

## Verificacions fetes (coherent ✅)
- **Hores per SA** coincideixen a les 3 capes (README/Índex/`08_Seqüenciació`, documents `10–18_SAx`, guies docents de `Classes/`): 6·8·8·8·7·8·8·6·10 = **69 h + ~1 h marge = 70 h**.
- **SA0** declarada com a material transversal que no consumeix sessions (no trenca el còmput).
- **Rúbriques R1–R5 ↔ competències CE-R1–CE-R5**: la taula aclaridora nova de `07` concorda amb els encapçalaments reals de `07` i amb les fites de `02`.
- **Reptes**: les 8 SA tenen el marc "Client/Lliurable/Món real" de forma uniforme (24 ocurrències).
- **Wokwi**: l'afirmació de `Reptes/README` (SA1–SA4 i SA6; excepcions SA4_B i SA6_C ampliat) coincideix carpeta a carpeta amb `Simulacions/Wokwi/Reptes/`.

## Incoherències detectades i corregides
1. **`08c_Projectes_vida_real.md` orfe a la seva carpeta**: el citaven els 8 reptes i `Reptes/README`, però no apareixia ni a `00_Index_general.md` ni al `README.md` de Programació didàctica → **afegit a tots dos**.
2. **`09b_Guia_compra_pressupost.md`** tampoc no era al `README.md` de la carpeta (sí a l'índex general) → **afegit** (mateix tipus d'omissió, preexistent).
3. **`08c` redactat com a proposta pendent** ("Decisions pendents abans d'implementar", "pilot SA4") quan el reframing **ja està desplegat a totes les SA1–SA8** → reescrites l'entradilla i les dues seccions finals (estat "aplicat"; només resten obertes les decisions de material del braç i el criteri opcional de rúbrica).

## Pendent (menor, no aplicat)
- Numeració `08c` sense `08a/08b` (cosmètic; renombrar a `08b` trencaria 9+ referències creuades — descartat tret que es demani).

## Fitxers tocats
- `Programació didàctica/00_Index_general.md`
- `Programació didàctica/README.md`
- `Programació didàctica/08c_Projectes_vida_real.md`
