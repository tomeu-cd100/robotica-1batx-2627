# Validació SA2-A · Semàfor d'un encreuament (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA2/A_semafor/ampliat/ampliat.ino`
(pins cotxes 8/9/10, vianants 11/12; cicle 4000 + 1500 + 4000 = 9500 ms).

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Cada fase deixa els 3 LED de cotxes a l'estat correcte i el semàfor funciona igual | `escenari_1.yaml` | `expect-pin` al mig de cada fase (t = 2000, 4750, 7500 ms): estat complet dels 5 pins, inclosa la coordinació amb els vianants |
| 2. El `loop()` només crida funcions en ordre i res no es desquadra | `escenari_2.yaml` (parcial) | Es comprova que el 2n cicle (a partir de t = 9500 ms) repeteix les fases amb les mateixes durades |
| 3. Canviar la durada d'una fase = tocar un sol número | — | **Només validable a mà** (revisió de codi: cal editar `tVerd`/`tGroc`/`tVermell` i recompilar) |

## Límits (només validables a mà)

- Les fites 2 i 3 són d'**estructura de codi** (funcions per fase, cap `digitalWrite` solt al
  `loop()`, temps en una sola variable): la simulació només en valida l'efecte observable.
  Cal revisar el `.ino` per confirmar-ho.
- No hi ha sortida sèrie: la validació és per temporització determinista (mostreig al mig de
  finestres de 1500–4000 ms, marge sobrat per l'arrencada de ~100 ms).
