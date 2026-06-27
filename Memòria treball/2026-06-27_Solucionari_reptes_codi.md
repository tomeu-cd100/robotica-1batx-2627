# Memòria de treball — 2026-06-27 · Solucionari de codi dels reptes

## Objectiu
1. Generar el **codi de solució de referència** dels 24 reptes nous de `Reptes/`.
2. **Estendre** el solucionari existent (`Classes/Solucionari/`) als reptes "+ampliació" que no en tenien.

## Decisions de disseny (aprovades pel docent)
- **Format:** sketches **carregables** (`.ino` en carpeta pròpia / `.py` directes).
- **Abast per repte:** **mínim + ampliacions** (2 sketches: `minim` i `ampliat`, amb les ampliacions marcades `// AMPLIACIO 1/2/3`).
- **Ubicació reptes nous:** `Reptes/Solucionari/`.
- **Ampliacions alternatives/incompatibles:** integrades amb comentaris o blocs descomentables.

## 1. Solucionari dels reptes nous (`Reptes/Solucionari/`)
- **README.md** amb avís de verificació (codi no provat al maquinari) i estructura.
- **52 sketches** en total:
  - SA1–SA4, SA6, SA7: Arduino `.ino` (2 per repte, en carpeta pròpia).
  - SA5: micro:bit `.py` (`A/B/C` × `minim/ampliat`).
  - SA8: micro:bit `.py` (reptes A i B amb **emissor + receptor**, `minim/ampliat`; repte C `minim/ampliat`).
- Pins coherents amb `Classes/SAx/codi/`. Ultrasons amb *timeout* + filtre sense-eco (coherent amb la correcció de la revisió). Avisos de seguretat (motors) i de `group` de ràdio propi per equip.

## 2. Extensió del solucionari existent (`Classes/Solucionari/`)
Afegits els reptes "+ampliació" de les fitxes d'alumnat que no tenien codi:
- **T2:** SA4 *dos servos coordinats* · SA5 *animació pròpia* · SA5 *xarxa de 3+ plaques* · SA6 *Kp massa gran* (explicació + demostració).
- **T3:** SA7 *gir proporcional a la proximitat* · SA7 *tornar al punt de sortida* · SA8 *alerta per llindar*.
- (T1 ja es va completar a la revisió anterior amb el Morse reubicat a SA1.)

## Avís important
Les solucions s'han escrit amb cura però **no s'han provat al maquinari real**. Cal verificar-les a **Tinkercad/Wokwi** o a la placa abans d'usar-les; a **SA7** cal **ajustar els pins** de la 3dBot.

## Pendents
- Verificació al simulador/maquinari (recomanable per blocs).
- Sincronitzar amb GitHub quan es validi.
