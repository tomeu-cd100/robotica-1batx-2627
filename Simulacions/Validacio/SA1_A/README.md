# Validació SA1-A · Far costaner (ampliat ⭐⭐⭐)

Valida el solucionari `Reptes/Solucionari/SA1/A_far_costaner/ampliat/ampliat.ino`
(far principal al pin 13, far secundari al pin 12). El sketch no fa servir el
monitor sèrie: els escenaris mostregen l'estat dels pins amb `expect-pin` al mig
de cada finestra d'encès/apagat (marge ≥ 100 ms).

## Cobertura de les fites

| Fita | Com es valida |
|---|---|
| 1. El far secundari parpelleja sol amb ritme propi | `escenari_1.yaml`: pin 12 alterna HIGH/LOW cada 250 ms (mostres a t=400/650/900 ms). Es valida dins el sketch final, no en un «sketch de prova a part» — aquell pas intermedi és de procés i només es pot comprovar a mà. |
| 2. Els dos LEDs conviuen sense aturar-se l'un a l'altre | `escenari_1.yaml`: mentre el principal fa la llum llarga de 2 s, el secundari commuta diverses vegades; després es comprova la pausa i el primer flaix curt del principal. |
| 3. Patrons estables durant 1 minut (sense desfasament) | `escenari_2.yaml`: es comprova la fase **absoluta** dels dos pins a t≈30 s i t≈60 s (cicle 14 del principal, commutació 239-240 del secundari). Qualsevol desfasament acumulat faria fallar l'`expect-pin`. |

## Només validable a mà

- Fita 1 en la seva forma literal (el «sketch de prova a part» previ): és un pas
  de procés de l'alumne, no del codi final.
- Que el codi usi `millis()` i no `delay()` per al secundari: l'escenari només
  n'observa l'efecte (simultaneïtat); la revisió del codi és manual.
