# 2026-07-31 · Rampa analogia→codi a totes les pràctiques de SA4

## Què s'ha fet

S'ha estès el patró **«analogia quotidiana primer, codi després»** (nascut el 30-07 a la
Pràctica 3 de SA4) a les quatre pràctiques restants de la SA. Cap contingut tècnic perdut:
només canvia la rampa d'entrada de cada bloc de codi.

| Pràctica | Bloc | Analogia afegida |
|---|---|---|
| 1 · Servo + potenciòmetre | Llibreria/objecte | Comandament de TV (botons fets per altres) |
| 1 | `attach()` | Aparellar el comandament amb l'aparell |
| 1 | Cadena entrada→càlcul→sortida | La dutxa (maneta → mesclador → aigua) |
| 1 | `delay(15)` | Porta de garatge (ordre instantània, moviment no) |
| 2 · Motor + pont H | Tres fils de control | Cotxe: palanca de canvi (sentit) + accelerador (velocitat) |
| 2 | Funció amb paràmetre | «Fes-me un cafè amb dos sucres»; recepta apuntada ≠ cuinar |
| 2 | `enrere()` | Palanca a la R |
| 4 · Barrera | Constants de disseny | Dials del termòstat (no obrir la caldera) |
| 4 | Estat inicial conegut | Microones després d'apagada: 0:00 |
| 4 | `&&` | Porter de concert: entrada **i** DNI |
| 4 | `delay` cec | Comptar a fet i amagar amb els ulls tapats |
| 5 · `millis()` | Cronòmetre no bloquejant | Cuiner amb dues paelles que mira el rellotge |
| 5 | Variables globals de temps | Paperet de la nevera: «planta regada dilluns» |
| 5 | Patró «ja toca?» | La ronda del cuiner: remena i apunta l'hora |

Coherència entre pràctiques: el cuiner de la P5 reapareix dins de la mateixa pàgina
(blocs 1 i 3), i el porter/fet-i-amagar de la P4 enllacen amb la ceguesa del `delay()`
que la P5 resol.

## Verificació

- `tools/qa.py`: ✅ net (15 comprovacions; els 4 avisos PII són els preexistents de
  memòria de treball i tests).
- Web regenerada amb `py -3.11 web/_generador/generar.py` (204 doc + 35 pràctica).

## Pendent

- Mateixa passada a les pràctiques de la resta de SA (SA1–SA3, SA5–SA9), si el docent
  la demana després de valorar el resultat a SA4.
