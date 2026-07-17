# Validació SA1-C · Missatge en Morse (ampliat ⭐⭐⭐)

Valida el solucionari `Reptes/Solucionari/SA1/C_morse/ampliat/ampliat.ino`
(LED al pin 13; inicials «TC»: T = − , C = −·−·). Sense sortida sèrie: mostreig
de pin amb `expect-pin` al mig de les finestres (marge ≥ 100 ms).

## Cobertura de les fites

| Fita | Com es valida |
|---|---|
| 1. Seqüències i les quatre durades escrites en paper, derivades del punt | **Només a mà**: és un lliurable en paper del quadern de l'alumne. Indirectament, l'escenari confirma que les durades del codi respecten les proporcions 1/3/3/7. |
| 2. La primera inicial correcta, amb pausa d'1 unitat entre símbols i de 3 en acabar la lletra | `escenari_1.yaml`: la T és una ratlla llarga (HIGH a t=150 i t=600 ms) seguida d'una finestra LOW de 3 unitats (mostra a t=1125 ms). La pausa d'1 unitat entre símbols es comprova dins la C (punt HIGH a t=2650, LOW 250 ms després). |
| 3. Les dues inicials en bucle amb pausa de 7 unitats entre repeticions | `escenari_1.yaml`: la C completa (−·−· amb ratlles llargues i punts curts), la finestra LOW de 7 unitats (mostra a t=5250 ms) i el reinici del cicle (T de nou a t=6375 ms). |

## Només validable a mà

- Fita 1: el full en paper amb les seqüències i durades.
- El final de la fita 3, «un company amb la taula Morse davant les desxifra
  sense veure el teu codi»: és una prova humana de llegibilitat del senyal,
  fora de l'abast del simulador.
- Si l'alumne tria unes inicials diferents de «TC», l'escenari només val per al
  solucionari: caldrà adaptar la línia de temps al seu missatge.
