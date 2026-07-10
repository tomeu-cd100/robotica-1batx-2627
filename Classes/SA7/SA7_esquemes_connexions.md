# SA7 · Esquemes i connexions

> La **Imagina 3dBot** ja porta integrats els motors i (segons model) sensors. El punt crític és **saber a quins pins estan connectats** per posar-los al codi.

## Pas 1 · Identificar els pins (segons el manual de la placa)
Consulta la documentació de la teva Imagina 3dBot i anota:

| Element | Pin (a omplir) |
|---|---|
| Motor esquerre — direcció | ____ |
| Motor esquerre — velocitat (PWM) | ____ |
| Motor dret — direcció | ____ |
| Motor dret — velocitat (PWM) | ____ |
| Sensor línia esquerre | ____ |
| Sensor línia dret | ____ |
| Ultrasons TRIG / ECHO | ____ / ____ |

> Aquests valors es posen al bloc `// === PINS (AJUSTAR) ===` de cada `.ino`.

## Cinemàtica diferencial (concepte)

![Cinemàtica diferencial: si les dues rodes van igual el robot va recte; si l'esquerra va més ràpida gira a la dreta; si la dreta va més ràpida gira a l'esquerra; amb sentits oposats gira sobre si mateix](img/sa7-cinematica-diferencial.svg)

## Sensors de línia (IR)
Es col·loquen **sota** el robot, mirant el terra. Detecten línia negra (poc reflex) vs fons blanc (molt reflex). Cal **calibrar** el llindar i l'alçada respecte al terra.

![Seguidor de línia: els sensors infrarojos sota el robot miren el terra; el fons blanc reflecteix molt (clar) i la línia negra poc (fosc), i comparant els dos sensors el robot corregeix la direcció](img/sa7-seguidor-linia.svg)

## Ultrasons (frontal)
Muntat al davant per mesurar la distància a obstacles (mateix principi que SA3/SA4: TRIG=sortida, ECHO=entrada).

## Pista de proves (a preparar per al docent)
- **Seguidor de línia:** cinta aïllant negra sobre superfície clara, amb corbes suaus.
- **Evita-obstacles:** recinte amb caixes/obstacles.
- Marcar **línia de sortida/arribada** per mesurar temps de volta.
