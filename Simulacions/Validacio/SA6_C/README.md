# Validació SA6-C · Regulador proporcional (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA6/C_proporcional/ampliat/ampliat.ino`
(HC-SR04 TRIG=12 / ECHO=11, potenciòmetre de Kp → A0, polsador de mode pin 2,
pont H ENA=5 / IN1=7 / IN2=8; consigna 25 cm, Serial «P|ONOFF distància velocitat»).

## Substitució del motor (documentada)

El **motor DC amb pont H no és simulable** amb wokwi-cli: al diagrama, el pin **ENA=5 (PWM)**
alimenta un **LED** (`led1`) que fa de substitut visual del motor. El firmware és
**exactament el del solucionari, sense tocar**: els pins de direcció IN1=7 i IN2=8 queden
sense component però es comproven directament amb `expect-pin` (l'estat del pin del
microcontrolador no depèn de tenir-hi res connectat). El diagrama didàctic de partida era
`Simulacions/Wokwi/Reptes/SA6_C_proporcional_minim/` (només versió mínima, amb LDR);
aquest diagrama d'ampliat s'ha fet de nou amb l'HC-SR04 que demana el ⭐⭐⭐.

L'HC-SR04 de Wokwi exposa el control d'escenari `distance` (cm): `set-control` mou
l'«obstacle» i el `pulseIn()` del codi llegeix la distància corresponent.

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Distància llegida estable (mitjana de 3-5 lectures) i Serial Plotter | `escenari_1.yaml` (parcial) | `wait-serial: 'P '` confirma que distància i velocitat surten pel Serial (format apte per al Plotter). L'estabilitat de la **mitjana de 3** no és distingible per escenari amb un sensor simulat sense soroll (vegeu límits); el pipeline de lectura sí que es valida: la sortida canvia coherentment quan `distance` passa de 200→5→100 cm. |
| 2. `Kp * (distancia - consigna)` amb `constrain(0,255)` i direcció correcta | `escenari_1.yaml` | Lluny (200 cm, Kp≈2): v≈350 → **satura a 255** → pin 5 HIGH continu (constrain per dalt). Més a prop que la consigna (5 cm): error negatiu → **clampat a 0** → pin 5 LOW (constrain per baix i direcció de la correcció correcta). Direcció del pont H fixa i correcta: IN1=1, IN2=0 a cada mostra. |
| 3. Comportament suau prop de la consigna + valors de Kp al quadern | — (parcial via ampliació 1) | **La documentació al quadern no és validable.** L'efecte de Kp sí: amb Kp=0 la sortida és 0 malgrat 75 cm d'error (pin 5 LOW). L'oscil·lació amb Kp gran és un fenomen dinàmic del sistema físic real (la distància simulada no reacciona al motor): no es pot reproduir per escenari. |

### Ampliació 2 (també coberta)

El polsador (`btn1`) alterna proporcional ↔ tot-o-res: `wait-serial: 'ONOFF '` confirma el
canvi; en tot-o-res la velocitat és **0 exacta** a prop (pin 5 LOW) i **200 exacta** lluny
(`wait-serial: ' 200'` al final de la línia; la distància impresa ~100 no conté « 200»).

## Límits (només validables a mà)

- **PWM intermedi:** amb velocitat 200 el pin 5 és PWM al 78% (ni HIGH ni LOW estables):
  no s'hi pot fer `expect-pin`; per això aquest cas es valida pel valor exacte al Serial.
  Els `expect-pin` del pin 5 només es fan als extrems saturats (0 i 255), que Arduino
  converteix en nivells continus.
- **Mitjana de 3 lectures (fita 1):** el sensor simulat no té soroll, o sigui que la mitjana
  i una lectura única donen el mateix; que la mitjana existeix es comprova llegint el codi
  (`distanciaMitjana()`), i el filtratge real només es veu amb el sensor físic.
- **Valors numèrics de distància al Serial:** el càlcul `t*0.034/2` pot diferir ~1% de la
  velocitat del so del simulador; per això cap `wait-serial` no depèn del valor exacte de
  la distància impresa.
- **Llaç tancat real (oscil·lació amb Kp gran, fita 3):** en simulació la distància és un
  control extern, no reacciona al motor: no hi ha dinàmica de planta per observar oscil·lacions.
