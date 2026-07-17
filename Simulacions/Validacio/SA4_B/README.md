# Validació SA4-B · Ventilador/vehicle amb motor DC (ampliat)

Harness de validació amb **wokwi-cli** del solucionari `Reptes/Solucionari/SA4/B_ventilador/ampliat/ampliat.ino` (pins: ENA=5 PWM, IN1=7, IN2=8, potenciòmetre=A0, polsador=2 amb `INPUT_PULLUP`). Binari compilat a `../build/SA4_B/`.

## Substitució de maquinari (documentada)

El **motor DC i el pont H (L298N) no existeixen** com a peces estàndard de Wokwi. Al `diagram.json`:

- el **motor** se substitueix per un **LED (`led1`, blau) al mateix pin PWM ENA (5)**: la brillantor equival a la velocitat;
- s'afegeixen dos LEDs de sentit: `led2` (verd) a **IN1 (7)** i `led3` (vermell) a **IN2 (8)** — a la simulació fan visible endavant/enrere i permeten l'assert dels pins del pont H.

Elèctricament el firmware és idèntic: escriu als mateixos pins que amb el pont H real.

## Truc de determinisme

El potenciòmetre arrenca amb `"attrs": {"value": "1023"}` (rang 0–1023, per defecte Wokwi el posa a 0). Així el **primer** `analogRead` ja llegeix l'objectiu 255 i tota la cronologia del cicle (rampa 1,53 s + manté 1,5 s + rampa 1,53 s = **4,56 s/cicle**) és determinista des de t=0 — imprescindible perquè el firmware no escriu res per Serial i no s'hi pot sincronitzar amb `wait-serial`.

Altres dos fets que fan fiables els asserts sobre ENA (pin PWM): al core d'Arduino, `analogWrite(pin, 255)` és un HIGH constant i `analogWrite(pin, 0)` un LOW constant — s'asserta el pin 5 **només** en aquests dos estats extrems, mai a mig PWM.

Execució manual (des d'aquesta carpeta):

```
wokwi-cli --scenario escenari_1.yaml --timeout 10000 .
```

## Cobertura de les fites del repte (⭐⭐⭐)

| Fita | Estat | Com |
|---|---|---|
| 1. `accelera()` fa rampa de 0 a l'objectiu sense salts | **Parcial (indirecta)** | Escenari 1: la fase manté (pin 5 HIGH constant) només comença ~1,53 s després d'arrencar — exactament els 51 passos × 30 ms de la rampa. La *suavitat* (absència de salts de PWM intermedis) no es pot assertar amb `expect-pin` instantani sobre un senyal PWM; cal inspecció amb el *logic analyzer* de Wokwi web o revisió del codi. |
| 2. Tres fases com a funcions amb paràmetres, sense duplicar | **No validable per escenari** | És una propietat del codi font, no del comportament observable. Revisió de codi (les tres fases comparteixen `rampa()`). |
| 3. Seqüència encadenada amb transicions suaus i `loop()` curt | **Coberta (comportament)** | Escenari 1: cicle complet accelera→manté→frena amb els temps previstos i aturada real a 0 (pin 5 LOW estable) quan l'objectiu és 0. La llegibilitat del `loop()` és revisió de codi. |
| *(notable prèvia)* Canvi de sentit amb el pont H | **Coberta** | Escenari 2: polsador mantingut sobre exactament una frontera de cicle → IN1/IN2 s'intercanvien un sol cop i el sentit invers es manté al cicle següent. |
| *(bàsica prèvia)* Velocitat des del potenciòmetre | **Coberta** | Escenari 1: objectiu 255 amb pot a 1023, i motor aturat quan el pot passa a 0. |

## Límits coneguts

- El firmware **no té Serial** (verificat a codi i ELF): tota la sincronització és per cronometratge determinista, possible gràcies al valor inicial del potenciòmetre fixat al diagrama.
- La **forma de la rampa** de PWM (fita 1) i l'estructura del codi (fita 2) no són observables amb els passos d'escenari de wokwi-cli.
- El polsador s'ha de mantenir premut **a cavall d'una única frontera de cicle** (el codi només el llegeix entre cicles): l'escenari 2 el prem de t=2,0 s a t=6,0 s, que cobreix només la frontera de t=4,56 s. Si es toquessin els temps de l'escenari, cal recalcular-ho.
