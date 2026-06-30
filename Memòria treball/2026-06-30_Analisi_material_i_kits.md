# 2026-06-30 · Anàlisi del material disponible i inventari de kits

## Context
El docent ha afegit a `Recursos/` tres fotografies dels kits reals de què disposarà (`arduino-starter-kit-espanol.jpg`, `sensors_bàsics.jpg`, `sensors_avançats.jpg`). Encàrrec: analitzar-les i comparar amb les SA per validar si hi ha prou material. Hi ha tants kits com alumnes (quantitat no és problema).

## Dotació confirmada (per alumne, llevat indicació)
- **3 kits combinats per alumne:** Kit 1 Arduino Starter oficial (UNO + breadboard + passius + LCD + servo + motor DC + buzzer), Kit 2 Keyestudio bàsics (motoreductors, rodes, 2 micro servos, TEMT6000, LM35, PIR, OLED, crash, NeoPixel WS2812B, humitat terra, HC-SR04, seguidor línia), Kit 3 Keyestudio avançats (relé, IR emissor/receptor/comandament, buzzer, LED RGB + LEDs, sensor so, polsador, MPU6050, DHT11, BMP280, CCS811 CO₂, bomba d'aigua).
- **micro:bit + Micro:shield:** 1 per alumne → SA5 i SA8.
- **Imagina 3dBot:** sí → SA7.
- **Alimentació/cables al centre:** piles AA + carregador, piles 9V, cables micro-USB.

## Resultat de la comparació SA ↔ material
- **SA1, SA2, SA3, SA6, SA8, SA9:** cobertes amb folgança (SA3 fins i tot sobredimensionada en sensors).
- **SA5 (micro:bit) i SA7 (Imagina 3dBot):** cobertes (maquinari confirmat).
- **SA4:** servos i motors sí, però **falta el pont H L298N** (el motor DC del kit oficial només gira en 1 sentit amb transistor). És l'**única compra pendent**.

## Decisió de compra
- **L298N** (o L293D/motor shield) per a SA4: primer **revisar al departament**; si no n'hi ha, **comprar** (~2–3 €/u, ~1 per parella + reserva). No bloquejant (no s'usa fins a SA4).
- ESP32/WiFi per a SA8: **no cal** (la ràdio del micro:bit cobreix el "robot connectat").

## Acció feta
- Nou document **`Programació didàctica/09c_Inventari_kits_disponibles.md`**: deixa constància del contingut de cada kit i on s'utilitza (matriu SA → material) + única compra pendent (L298N).
- Enllaçat a `00_Index_general.md`, al `README.md` de Programació didàctica i a `09b_Guia_compra_pressupost.md` (nota que apunta a 09c).

## Conclusió
El conjunt **kits + micro:bit + Imagina 3dBot** està **ben dimensionat** per a les 9 SA. Cap canvi a SA4/SA7 (la programació ja deia L298N i Imagina 3dBot, coincideix amb la realitat).
