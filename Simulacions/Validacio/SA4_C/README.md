# Validació SA4-C · Braç/dispensador amb servo (ampliat)

Harness amb **wokwi-cli** del solucionari `Reptes/Solucionari/SA4/C_brac_dispensador/ampliat/ampliat.ino` (pins: servo base=9, servo pinça=10, potenciòmetre=A0, polsador=2 amb `INPUT_PULLUP`). Binari compilat a `../build/SA4_C/`. El diagrama parteix del de `Simulacions/Wokwi/Reptes/SA4_C_brac_ampliat/` amb els ids normalitzats (`servo1`=base, `servo2`=pinça, `pot1`, `btn1`).

## Límit fonamental d'aquest repte

Aquest firmware **només té sortides de servo**: polsos PWM de 50 Hz (amplada 0,5–2,4 ms) als pins 9 i 10. Amb els passos d'escenari de wokwi-cli:

- **l'angle d'un servo no es pot assertar** (no hi ha cap pas que llegeixi l'amplada de pols ni l'estat de la peça `wokwi-servo`);
- un `expect-pin` instantani sobre un pin de servo és una loteria de fase (~5–12 % de probabilitat de mostrejar el pols en HIGH) — seria un test intermitent, i per tant no se'n posa cap;
- el firmware **no escriu res per Serial** (verificat al codi i a l'ELF), així que tampoc no hi ha `wait-serial` possible.

Conseqüència: `escenari_1.yaml` és una **prova de fum** determinista — arrencada, mode repòs amb potenciòmetre, una premuda curta que dispara els 3 cicles «agafa i deixa» (3 × 2,2 s = 6,6 s de `loop()` bloquejat) i retorn al mode repòs — amb una asserció de sanitat al pin 13 (mai usat pel firmware, ha de restar a 0).

Execució manual (des d'aquesta carpeta):

```
wokwi-cli --scenario escenari_1.yaml --timeout 12000 .
```

## Cobertura de les fites del repte (⭐⭐⭐)

| Fita | Estat | Com validar-la |
|---|---|---|
| 1. Cada servo funciona per separat amb els límits anotats | **No coberta** | És una fita de procés d'aula (sketch de prova + quadern), aliena a aquest firmware. |
| 2. Funcions pròpies `mou_base`/`mou_pinca` amb pauses; la pinça no es mou mentre la base gira | **No coberta per escenari** | Revisió de codi (les pauses `delay(500)`/`delay(400)` dins de cada funció ho garanteixen per construcció) + inspecció visual a Wokwi web: obriu el projecte, premeu el polsador i comproveu que els dos servos no es mouen mai alhora. |
| 3. Cicle «agafa i deixa» repetit 3 cops sense recol·locar res | **Parcial (fum + visual)** | L'escenari confirma que una única premuda deixa el programa ocupat el temps exacte de 3 cicles (6,6 s) i que després torna al mode repòs; el recompte visual dels 3 cicles es fa a Wokwi web. |
| *(notable prèvia)* Una sola dosi per premuda (debounce) | **No assertable** | Sense cap sortida digital observable, no es pot distingir 1 dosi de 2 per escenari. Visual a Wokwi web. |

## Guió de validació visual (Wokwi web, 2 minuts)

1. Obriu el projecte (aquest `diagram.json` + el codi del solucionari) a wokwi.com.
2. Gireu `pot1`: la base (servo1) ha de seguir el potenciòmetre (ampliació 1).
3. Premeu `btn1` un cop: exactament **3** cicles pinça-obre → base 120° → pinça 80° → base 0° → pinça 10°, mai els dos servos alhora (fites 2 i 3).
4. En acabar, la base torna a obeir el potenciòmetre; una premuda mantinguda no encadena més dosis (debounce per flanc).
