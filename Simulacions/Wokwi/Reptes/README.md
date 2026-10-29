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
| SA4, SA6 | A/B/C del braç MeArm | ✅ | ✅ | 4 servos + potenciòmetres / polsadors / HC-SR04 / LED (el sensor de col·lisió es simula amb un polsador). Projectes locals creats el 29-10-2026; **pendents de publicar** a Wokwi |
| SA5, SA8 | (micro:bit) | ❌ | ❌ | Wokwi no executa MicroPython al micro:bit |
| SA7 | (robot 3dBot) | ❌ | ❌ | placa propietària, no simulable |

**Total: 30 projectes** (12 del braç pendents de publicar) (mínim + ampliat dels reptes simulables).

## Enllaços interactius (Wokwi públic)
> Tots 27 simulats i desats com a públics el 2026-06-28.

| Projecte | Enllaç |
|---|---|
| SA1_A_far_minim | <https://wokwi.com/projects/468091585479800833> |
| SA1_A_far_ampliat | <https://wokwi.com/projects/468091919929463809> |
| SA1_B_llum_minim | <https://wokwi.com/projects/468091669683614721> |
| SA1_B_llum_ampliat | <https://wokwi.com/projects/468091733644667905> |
| SA1_C_morse_minim | <https://wokwi.com/projects/468091789071354881> |
| SA1_C_morse_ampliat | <https://wokwi.com/projects/468091843657078785> |
| SA2_A_semafor_minim | <https://wokwi.com/projects/468092029251908609> |
| SA2_A_semafor_ampliat | <https://wokwi.com/projects/468092101123410945> |
| SA2_B_ambient_minim | <https://wokwi.com/projects/468092162483986433> |
| SA2_B_ambient_ampliat | <https://wokwi.com/projects/468092248193553409> |
| SA2_C_nivell_minim | <https://wokwi.com/projects/468092318032915457> |
| SA2_C_nivell_ampliat | <https://wokwi.com/projects/468092391546487809> |
| SA3_A_nocturna_minim | <https://wokwi.com/projects/468092512398022657> |
| SA3_A_nocturna_ampliat | <https://wokwi.com/projects/468092581729875969> |
| SA3_B_aparcament_minim | <https://wokwi.com/projects/468092650802729985> |
| SA3_B_aparcament_ampliat | <https://wokwi.com/projects/468092730863606785> |
| SA3_C_instrument_minim | <https://wokwi.com/projects/468092793918686209> |
| SA3_C_instrument_ampliat | <https://wokwi.com/projects/468092893797661697> |

## Com publicar
1. Obre `https://wokwi.com/projects/new/arduino-uno`.
2. Enganxa `sketch.ino` i `diagram.json` (pestanya corresponent).
3. Si demana llibreries (SA4: Servo), prem *Install library*.
4. Simula (▶), desa com a **públic** i copia la URL.
