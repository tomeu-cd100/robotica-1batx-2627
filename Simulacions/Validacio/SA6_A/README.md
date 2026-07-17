# Validació SA6-A · Termòstat amb histèresi (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA6/A_termostat/ampliat/ampliat.ino`
(sensor de temperatura simulat → A0, consigna → A1, calefactor pin 9, ventilador pin 10;
màquina d'estats REPOS/CALOR/FRED amb MARGE=40 i Serial cada ~100 ms).

El «sensor de temperatura» és un segon potenciòmetre (`pot_temp`, com al diagrama didàctic
`Simulacions/Wokwi/Reptes/SA6_A_termostat_ampliat/`) perquè l'escenari el pugui moure amb
`set-control: position` (0.0–1.0 → analogRead 0–1023). La consigna és `pot_consigna` (A1),
fixada al mig (0.5 ≈ 511) durant tot l'escenari: llindars 471 (calor) i 551 (fred).

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Diagrama d'estats en paper abans de programar | — | **No validable per simulació**: és un lliurament en paper de l'alumne. L'escenari sí que recorre totes les transicions del diagrama del solucionari (REPOS↔CALOR, REPOS↔FRED), o sigui que el diagrama de referència és coherent amb el codi. |
| 2. El mode calor funciona sol amb la seva histèresi (dos llindars) | `escenari_1.yaml` | S'engega a t<471 (`estat=CALOR`, pin 9 HIGH) i, amb t≈481 (dins la banda morta però sota la consigna), **es manté encès**: un codi sense histèresi passaria a REPOS i l'escenari fallaria per timeout del `wait-serial`. S'atura exactament a la consigna (t≈532 → REPOS). |
| 3. Banda morta fred↔calor: mai tots dos encesos ni oscil·lació | `escenari_1.yaml` | A cada pas per REPOS es comprova pins 9=0 **i** 10=0 (cap actuador dins la banda); després de **cada** transició es comproven **els dos pins** (l'actiu a 1 i l'altre a 0). El mode fred té la histèresi simètrica (t≈532 manté FRED; t≈491 el treu). El cicle FRED→REPOS→CALOR obliga a travessar tota la banda. |

## Límits (només validables a mà)

- **Fita 1 (paper):** el diagrama d'estats dibuixat per l'alumne no es pot validar per simulació.
- **Absència d'oscil·lació contínua:** l'escenari mostreja instants concrets; una oscil·lació
  ràpida *entre* mostres no es veuria. Amb els potenciòmetres estàtics de la simulació el valor
  llegit és constant, o sigui que si l'estat és estable a cada mostra, no oscil·la. Per veure-ho
  amb un senyal que puja i baixa contínuament cal la simulació interactiva.
- Els valors de posició (0.47/0.48/0.52) estan triats amb ≥9 comptes de marge respecte de cada
  llindar per tolerar l'arrodoniment de l'ADC simulat.
