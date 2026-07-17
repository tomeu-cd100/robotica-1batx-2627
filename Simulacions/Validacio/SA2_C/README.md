# Validació SA2-C · Indicador de nivell (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA2/C_indicador_nivell/ampliat/ampliat.ino`
(barra pins 4/5/6/7, LED RGB càtode comú R=9, G=10, B=11; VU-mètre 300 ms/pas amb sortida
pel Monitor Sèrie a 9600 bauds).

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. RGB verd fix amb nivell baix i vermell fix amb nivell alt | `escenari_1.yaml` | Als extrems `analogWrite` val 0 o 255 (LOW/HIGH constants): `expect-pin` sobre R/G/B després de sincronitzar amb la línia sèrie de nivell 0 i de nivell 4 |
| 2. `map()` dóna valors coherents pel Monitor Sèrie (0–255, un puja quan l'altre baixa) | `escenari_2.yaml` | `wait-serial` amb els 5 valors exactes (0/63/127/191/255 i els complementaris 255/192/128/64/0) en pujada i en baixada |
| 3. Color gradual i sempre coherent amb el nombre de LEDs encesos | `escenari_1.yaml` + `escenari_2.yaml` (parcial) | Barra tota apagada a nivell 0 i tota encesa a nivell 4 (escenari 1); exactament 2 LEDs encesos a nivell 2 (escenari 2) |

Nota: la fita 1 parla de casos extrems «forçats al codi»; aquí es validen quan el VU-mètre
passa de manera natural per nivell 0 i nivell 4, que és equivalent per al codi del solucionari.

## Límits (només validables a mà)

- La **gradualitat del color** del RGB als nivells intermedis (fita 3) no és comprovable amb
  `expect-pin`: amb `analogWrite` entre 1 i 254 el pin fa PWM (~490 Hz) i l'estat instantani
  no és determinista. La coherència numèrica sí que queda validada pels valors sèrie del
  `map()` (escenari 2); el gradient visual es comprova a ull al simulador.
- Els valors sèrie esperats usen la **divisió entera** de `map()` (p. ex. nivell 1 →
  verd=192, no 191): si es canvia el nombre de LEDs `N` o el rang, cal recalcular-los.
