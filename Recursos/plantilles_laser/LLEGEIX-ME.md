# Plantilles de tall làser dels robots

Aquestes plantilles defineixen les peces de DM de 3 mm dels tres robots del
curs (mascota, braç i rover), pensades per tallar-se amb la talladora làser
xTool Creative Space. Segueixen el conveni de capes per color: el **negre**
marca les línies de **tall** i el **vermell** marca les zones de **gravat**
(personalització i etiquetes de muntatge). Totes les mides estan en
mil·límetres reals i el `viewBox` de cada SVG és a escala 1:1, de manera que
es poden importar directament sense reescalar.

## Fitxers

| Fitxer | Robot | Mida del tauler |
| --- | --- | --- |
| `mascota.svg` | Mascota | 465 × 215 mm |
| `brac.svg` | Braç | 285 × 150 mm |
| `xassis_rover_ARomero.svg` | **Rover (xassís oficial)** | 132 × 138 mm |
| `rover.svg` | Rover (alternativa de 2 pisos, no provada) | 330 × 125 mm |

> 🏅 **Crèdit del xassís del rover:** disseny d'**Antonio Romero** (2026), del
> material «Vehicle amb micro:bit (II)», derivat del Taller 8 del programa
> «Connectem amb les plaques» (XTEC). Llicència d'aquest fitxer:
> **CC BY-NC-SA 4.0** (diferent de la resta del curs, que és CC BY-SA 4.0).
> És l'únic xassís amb **geometria provada en un tall real**; els encaixos i
> les línies de tall NO es toquen. L'electrònica del curs (UNO + L298N +
> portapiles) s'hi fixa amb brides o velcro; les posicions definitives es
> validen amb el xassís tallat a la mà.

## Com regenerar-les

`mascota.svg`, `brac.svg` i `rover.svg` **no s'editen a mà**: es generen a
partir de l'script `tools/genera_plantilles_laser.py`:

```
py tools/genera_plantilles_laser.py
```

Si cal canviar una mida, un forat o una etiqueta, modifica l'script i torna'l
a executar; això sobreescriu aquests tres fitxers. El
`xassis_rover_ARomero.svg` és un disseny extern (vegeu el crèdit) i queda
**fora del generador**: no es regenera ni es modifica.

## Com importar-les a xTool Creative Space

1. Importa cada SVG directament (`Fitxer → Importa`).
2. Assigna la potència i la velocitat de tall a les línies **negres** i la
   configuració de gravat (potència baixa, més passades) a les línies
   **vermelles**, segons el gruix real del DM disponible (referència: 3 mm).
3. Comprova sempre a la previsualització que cap peça surt del tauler de
   treball abans de llançar el tall.

## Personalització

Cada equip **només ha de personalitzar les zones vermelles**: la cara de la
mascota (al frontal) i el nom de l'equip (al pis superior del rover). La
resta de línies (tall i forats de muntatge) no s'han de tocar perquè les
peces continuïn encaixant amb els escaires i suports impresos en 3D.
