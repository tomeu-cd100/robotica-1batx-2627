# Validació SA3-A · Llum automàtica nocturna (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA3/A_llum_nocturna/ampliat/ampliat.ino`
(LDR en divisor → A0, LED al pin 9 amb PWM; histèresi 350/450, Serial cada ~100 ms).

⚠️ **Troballa empírica (17-07)**: el mòdul `wokwi-photoresistor-sensor` té la sortida AO
**invertida** respecte al divisor LDR→5V/10k→GND del repte: més lux → lectura més **baixa**
(lux per defecte → `llum=250`; lux=10000 → `llum=39`), i el rang observat mai no arriba als
llindars 350/450 del codi. El codi és correcte per al circuit real; el mòdul simulat és un
altre circuit. Per això la validació es reparteix en dos escenaris:

| Execució | Diagrama | Què valida |
|---|---|---|
| `escenari_1.yaml` | `diagram.json` (mòdul LDR) | Fita 1: la lectura crua surt contínua pel Monitor Sèrie; el `map()` invers és correcte en dos punts (250→73, 39→227), sempre dins 0–255. |
| `escenari_2.yaml` | `diagram_pot.json` (pot a A0, mateix firmware) | Fites 2 i 3 amb el rang 0–1023 complet: amb «llum plena» (~511>450) `brillantor=0` (clamp de `constrain`) i pin 9 apagat del tot; a les «fosques» (0) `brillantor=255` i pin encès continu; en tornar la llum s'apaga. |

## Límits (només validables a mà o al maquinari)

- **Fita 1 completa** («apuntar al quadern el rang real de l'aula»): cosa de l'alumne amb la
  LDR física.
- **Transició contínua (fita 3):** l'escenari en mostra dos punts intermedis (73 i 227); la
  suavitat visual es comprova movent `lux` a la simulació interactiva.
- La **histèresi** (ampliació 2, no ⭐⭐⭐) no té efecte observable al LED en aquest codi:
  dins la banda 350–450 la brillantor calculada ja és 0 (`map` negatiu clampat) tant si
  `ences` és cert com si no. És coherent amb la fita («cap parpelleig al capvespre»), però
  només s'observa com a estat intern.
- **Polaritat del mòdul Wokwi**: si es replica aquest muntatge amb el mòdul real de 4 potes
  (AO/DO), cal comprovar la polaritat de l'AO — pot ser la contrària a la LDR nua del repte.
