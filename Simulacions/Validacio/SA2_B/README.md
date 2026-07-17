# Validació SA2-B · Llum d'ambient regulable (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA2/B_llum_ambient/ampliat/ampliat.ino`
(LED RGB càtode comú R=9, G=10, B=11; `velocitat` = 8 ms/pas → 5 trams de 2048 ms,
cicle complet 10240 ms).

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Funció `color(r, g, b)` provada amb colors fixos | — | **Només a mà** (el sketch no atura mai en colors fixos; revisió de codi) |
| 2. Transició suau entre dos colors (un canal puja, l'altre baixa) | `escenari_1.yaml` (parcial) | Als dos primers trams (vermell↔blau) el canal verd es manté a 0; la *suavitat* no és observable amb `expect-pin` |
| 3. Cicle complet de la roda que torna al color inicial i es repeteix sense tall | `escenari_1.yaml` (parcial) | Es verifica el canal apagat de cadascun dels 5 trams i que el patró es repeteix al 2n cicle amb la mateixa temporització |

## Límits (només validables a mà)

- **PWM intermedi no és comprovable**: `expect-pin` llegeix l'estat instantani del pin, i amb
  `analogWrite` entre 1 i 254 el pin oscil·la a ~490 Hz. Només són deterministes
  `analogWrite(0)` (LOW constant) i `analogWrite(255)` (HIGH constant); els extrems 255 només
  duren una finestra de 8 ms, massa curta per mostrejar-la amb fiabilitat. Per això l'escenari
  només comprova el canal **apagat** de cada tram.
- La **suavitat visual** (sense salts ni talls bruscos, fites 2 i 3) i la prova de la funció
  `color()` amb colors fixos (fita 1) s'han de validar a ull al simulador o revisant el codi.
