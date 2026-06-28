# Simulacions Wokwi — Reptes

Projectes Wokwi (text reproduïble) del **solucionari dels reptes** (`Reptes/Solucionari/`).
Cada carpeta té `diagram.json` (circuit) + `sketch.ino` (codi, còpia fidel del solucionari)
i, si cal, `libraries.txt`. Patró de nom: `SA<n>_<lletra>_<nom>_<versió>`.

> Es generen les versions **mínim** i **ampliat** de cada repte simulable a Wokwi.

## Cobertura
| SA | Repte | mínim | ampliat | Notes |
|---|---|---|---|---|
| SA1 | A far costaner | ✅ | ✅ | LED intern (pin 13); ampliat afegeix 2n far al pin 12 |
| SA1 | B llum bici | ✅ | ✅ | LED intern (pin 13) |
| SA1 | C morse | ✅ | ✅ | LED intern (pin 13) |
| SA2 | A semàfor | ✅ | ✅ | 3 LED / 5 LED (cotxes + vianants) |
| SA2 | B llum ambient | ✅ | ✅ | LED PWM / LED RGB |
| SA2 | C indicador nivell | ✅ | ✅ | 4 LED / 4 LED + RGB |
| SA3 | A llum nocturna | ✅ | ✅ | LDR (mòdul) + LED |
| SA3 | B sensor aparcament | ✅ | ✅ | HC-SR04 + LED (+ brunzidor a l'ampliat) |
| SA3 | C instrument | ✅ | ✅ | potenciòmetre + LED (+ polsador a l'ampliat) |
| SA4 | A barrera | ✅ | ✅ | servo + polsador / + HC-SR04 + 2 LED |
| SA4 | B ventilador | ❌ | ❌ | **motor DC + pont H: no és component estàndard de Wokwi** |
| SA4 | C braç dispensador | ✅ | ✅ | 1 servo / 2 servos + potenciòmetre |
| SA6 | A termòstat | ✅ | ✅ | pot (temperatura) + LED (+ 2n pot + polsador) |
| SA6 | B semàfor adaptatiu | ✅ | ✅ | 3 LED / 6 LED + 2 polsadors |
| SA6 | C proporcional | ✅ | ❌ | mínim: LDR + LED. **Ampliat usa motor → exclòs** |
| SA5, SA8 | (micro:bit) | ❌ | ❌ | Wokwi no executa MicroPython al micro:bit |
| SA7 | (robot 3dBot) | ❌ | ❌ | placa propietària, no simulable |

**Total: 27 projectes** (mínim + ampliat dels reptes simulables).

## Enllaços interactius (Wokwi públic)
*(s'ompliran a mesura que es publiquin)*

| Projecte | Enllaç |
|---|---|
| SA1_A_far_minim | *(pendent)* |
| SA1_A_far_ampliat | *(pendent)* |
| SA1_B_llum_minim | *(pendent)* |
| SA1_B_llum_ampliat | *(pendent)* |
| SA1_C_morse_minim | *(pendent)* |
| SA1_C_morse_ampliat | *(pendent)* |
| SA2_A_semafor_minim | *(pendent)* |
| SA2_A_semafor_ampliat | *(pendent)* |
| SA2_B_ambient_minim | *(pendent)* |
| SA2_B_ambient_ampliat | *(pendent)* |
| SA2_C_nivell_minim | *(pendent)* |
| SA2_C_nivell_ampliat | *(pendent)* |
| SA3_A_nocturna_minim | *(pendent)* |
| SA3_A_nocturna_ampliat | *(pendent)* |
| SA3_B_aparcament_minim | *(pendent)* |
| SA3_B_aparcament_ampliat | *(pendent)* |
| SA3_C_instrument_minim | *(pendent)* |
| SA3_C_instrument_ampliat | *(pendent)* |
| SA4_A_barrera_minim | *(pendent)* |
| SA4_A_barrera_ampliat | *(pendent)* |
| SA4_C_brac_minim | *(pendent)* |
| SA4_C_brac_ampliat | *(pendent)* |
| SA6_A_termostat_minim | *(pendent)* |
| SA6_A_termostat_ampliat | *(pendent)* |
| SA6_B_semafor_minim | *(pendent)* |
| SA6_B_semafor_ampliat | *(pendent)* |
| SA6_C_proporcional_minim | *(pendent)* |

## Com publicar
1. Obre `https://wokwi.com/projects/new/arduino-uno`.
2. Enganxa `sketch.ino` i `diagram.json` (pestanya corresponent).
3. Si demana llibreries (SA4: Servo), prem *Install library*.
4. Simula (▶), desa com a **públic** i copia la URL.
