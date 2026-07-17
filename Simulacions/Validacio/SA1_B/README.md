# Validació SA1-B · Llum de bicicleta (ampliat ⭐⭐⭐)

Valida el solucionari `Reptes/Solucionari/SA1/B_llum_bici/ampliat/ampliat.ino`
(LED al pin 13). Sense sortida sèrie: mostreig de pin amb `expect-pin` al mig de
les finestres (marge ≥ 100 ms).

## Cobertura de les fites

Les tres fites del ⭐⭐⭐ són **d'estructura de codi** (encapsular en funcions,
paràmetres sense duplicació, `loop()` de 3-4 línies). Un escenari de simulació
només pot validar-ne l'**efecte observable**: que els modes funcionen igual que
abans d'encapsular-los i s'executen en l'ordre correcte.

| Fita | Com es valida |
|---|---|
| 1. El mode funciona dins una funció «exactament igual que abans» | `escenari_1.yaml`: el mode ràpid manté el ritme 200/200 ms (mostres a t=150/350/550 ms). |
| 2. Modes com a funcions amb paràmetres, sense duplicació | Només l'efecte: el mode lent 700/700 ms i la pausa d'emergència de 600 ms apareixen on toca. La no-duplicació del codi és revisió manual. |
| 3. `loop()` reduït a 3-4 línies que criden els modes en ordre | Només l'efecte: la seqüència ràpid → lent → emergència → ràpid es compleix cicle rere cicle (es comprova el reinici a t≈7,3 s). La llegibilitat del `loop()` és revisió manual. |

## Només validable a mà

- L'organització del codi (funcions, paràmetres, absència de duplicació,
  `loop()` curt): cal obrir el sketch i mirar-lo.
- Els 3 flaixos ràpids de 80 ms del mode emergència: les finestres són massa
  curtes per mostrejar-les amb el marge de seguretat de 100 ms; l'escenari
  valida la pausa llarga (600 ms) i la durada total del cicle, que ja
  delimiten el tram d'emergència.
