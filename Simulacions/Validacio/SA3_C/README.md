# Validació SA3-C · Instrument/comptador interactiu (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA3/C_instrument/ampliat/ampliat.ino`
(potenciòmetre → A0, LED PWM al pin 9, polsador al pin 2 amb `INPUT_PULLUP` + debounce de 40 ms;
Serial només escriu quan hi ha premuda: «Premudes: N  Brillantor: B»).

**Truc de determinisme:** el nucli AVR d'Arduino fa `analogWrite(pin, 255)` = HIGH continu i
`analogWrite(pin, 0)` = LOW continu (sense PWM). Portant el potenciòmetre als extrems
(`position` 1 i 0) el pin 9 queda a nivell fix i `expect-pin` és 100% determinista.

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Cada entrada funciona per separat al mateix circuit (pot → PWM, polsador → recompte amb debounce) | `escenari_1.yaml` | `expect-pin` pin 9 = 1 amb el pot al màxim (i = 0 al mínim); `wait-serial: 'Premudes: 1'` a la primera premuda. |
| 2. Les dues conviuen al mateix `loop()` sense bloquejar-se | `escenari_1.yaml` | Es canvia el pot **entre** les dues premudes i el comptador segueix («Premudes: 2»): cap `delay()` llarg no fa perdre la segona premuda. |
| 3. La combinació té sentit d'instrument + demostració d'ús davant d'algú | `escenari_1.yaml` (parcial) | La simulació només valida la mecànica (pot regula, polsador dispara i el Serial mostra el recompte i la brillantor junts). La **demostració d'ús** és presencial, no validable per escenari. |

## Límits (només validables a mà)

- **Fita 3 (sentit d'instrument):** que la combinació «tingui sentit» (mode, nota afinada,
  demostració davant d'algú) és un criteri humà; l'escenari només confirma que les dues
  entrades interactuen com cal.
- **Valor exacte de la brillantor al Serial:** no s'espera el text «Brillantor: 255» perquè
  depèn que l'ADC doni exactament 1023 amb el cursor al màxim; si un dia l'ADC simulat dona
  1022, el `map()` treu 254 i un `wait-serial` exacte fallaria. Es valida per `expect-pin`
  als extrems, que és robust.
- **Debounce:** l'escenari prem i deixa anar amb marges de 200 ms (>40 ms), o sigui que
  valida que el comptador no es perd premudes netes; el **rebot real** (transicions brutes
  de pocs ms) no es pot injectar amb `set-control`.
