# 2026-06-29 · Revisió de coherència de tot el material

**Encàrrec:** revisió de coherència transversal de tot el material (índexs vs material real, xifres repetides entre documents).

## Mètode

Contrast creuat dels documents índex/README de cada carpeta (README arrel, `GUIA_INICI_DOCENT`, `Programació didàctica/00` i `/08`, `Classes/README` i `00_*`, `Reptes/README`, `Simulacions/Wokwi/*/README`, `Avaluació/README`) amb el material real i les xifres declarades a múltiples llocs (hores per SA, total del curs, naturalesa de la matèria, recompte de recursos, cobertura Wokwi).

## Incoherències trobades i resolució

1. **Hores de SA2/SA4/SA6 i total del curs.** `08_Sequenciacio` deia 7 h base (subtotal 66 + 4 marge), mentre `00_Index_general`, les fitxes `11/13/15` i les guies docents deien 8 h (o "7-8 h"). → **Decisió: 8 h fix.** Editat:
   - `08_Sequenciacio_temporal_anual.md`: SA2/SA4/SA6 a 8 h; subtotal **69 h**, marge **~1 h**, total 70 h; reescrites la nota `*` i la secció de marge (flexibilitat de ritme, no diferència d'hores).
   - `Classes/SA2,SA4,SA6/SAx_guia_docent.md`: "7-8 h" → "8 h (4 sessions; la 4a amb ampliacions opcionals)".

2. **"Matèria trimestral" vs "anual".** `Classes/00_IA_a_la_materia.md` (§1) deia "matèria trimestral/optativa (~70 h)", contradient tota la resta (anual ≈70 h) i internament contradictori. → Editat a "**optativa anual** (~70 h)". *(El matís normatiu —l'optativa oficial "Robòtica" és trimestral— ja queda explicat a `Normativa/`; la decisió del curs és oferir-la anual.)*

3. **Estructura incompleta al README arrel.** La taula "Estructura del repositori" no incloïa `Reptes/` ni `Simulacions/`. → Afegides les dues files.

4. **Col·lisió terminològica "solucionari dels reptes".** `Classes/Solucionari/` (ampliacions «+ repte» de les pràctiques, per trimestre) es deia igual que `Reptes/Solucionari/` (reptes triables A/B/C). → Aclarit al README arrel i a `Classes/README.md` (dues mencions), distingint-los explícitament.

## Coherències verificades (correcte, sense canvis)

- **Recursos:** "54 recursos" coincideix a README arrel, `Recursos/README` i `00_LLEGEIX-ME`. *(No s'ha obert el `.xlsx` per comptar files reals.)*
- **Reptes ↔ Solucionari ↔ Wokwi:** 8 SA amb reptes A/B/C; **27 projectes Wokwi** quadren amb la cobertura declarada (SA1-SA4 excepte SA4_B, SA6 excepte C-ampliat); SA5/SA7/part micro:bit de SA8 exclosos amb pla B coherent.
- **Integració de proves:** T1→SA3, T2→SA6, T3→SA9 coherent entre `08`, `Avaluació/README` i les guies docent de SA3 i SA6.
- **Títols, llenguatges i maquinari** de les 9 SA: idèntics arreu. **SA0** transversal sense hores: coherent.

5. **Generalització de la cobertura Wokwi.** `Reptes/README` deia "SA1–SA4 i SA6 tenen Wokwi" sense excepcions; dins del rang, SA4_B (ventilador) i SA6_C-ampliat (proporcional) no en tenen (motor DC + pont H). → Afegida la matisació al `Reptes/README`.

## Fitxers modificats

`Programació didàctica/08_Sequenciacio_temporal_anual.md` · `Classes/SA2/SA2_guia_docent.md` · `Classes/SA4/SA4_guia_docent.md` · `Classes/SA6/SA6_guia_docent.md` · `Classes/00_IA_a_la_materia.md` · `README.md` · `Classes/README.md` · `Reptes/README.md`
