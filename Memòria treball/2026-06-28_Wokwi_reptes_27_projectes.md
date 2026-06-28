# Memòria de treball — 2026-06-28 · Wokwi per als reptes (27 projectes)

## Objectiu
Aplicar el mateix tractament Wokwi que a les pràctiques de `Classes/` al **solucionari
dels reptes** (`Reptes/Solucionari/`): generar el text i publicar enllaços interactius.

## Abast (decisió del docent)
- **Tots els reptes simulables**, en versió **mínim i ampliat**.
- Exclosos (no simulables a Wokwi): **SA5** i **SA8** (micro:bit/MicroPython), **SA7** (3dBot
  propietari), **SA4-B ventilador** i **SA6-C ampliat** (motor DC + pont H L298N, que a Wokwi
  només existeix com a *custom chip* de tercers, no estàndard).

## Resultat: 27 projectes generats i publicats
A `Simulacions/Wokwi/Reptes/`, una carpeta per projecte (`diagram.json` + `sketch.ino`
còpia fidel del solucionari; `libraries.txt` als de SA4):

| SA | Projectes | Components |
|---|---|---|
| SA1 | far, llum bici, morse (×2) = 6 | LED intern (pin 13); ampliat far afegeix LED extern pin 12 |
| SA2 | semàfor, llum ambient, indicador nivell (×2) = 6 | LED, LED RGB, barra de LED |
| SA3 | llum nocturna, sensor aparcament, instrument (×2) = 6 | LDR, HC-SR04 + buzzer, potenciòmetre + polsador |
| SA4 | barrera, braç (×2) = 4 | servo(s) + HC-SR04/potenciòmetre/polsador (llibreria Servo) |
| SA6 | termòstat, semàfor adaptatiu (×2) + proporcional mínim = 5 | potenciòmetre, 6 LED + 2 polsadors, LDR |

Tots **simulats i desats com a públics**; els enllaços són a
`Simulacions/Wokwi/Reptes/README.md`.

## Mètode (eficient, ~3-5 passos/projecte)
1. `navigate` a `wokwi.com/projects/new/arduino-uno`.
2. JS: injecta `sketch.ino` (`monaco ... vfs:sketch.ino`.setValue) i obre la pestanya
   diagram amb un clic DOM (element fulla amb textContent `diagram.json`).
3. JS: injecta `vfs:diagram.json` i clica el botó SAVE de la barra (per DOM).
4. JS: posa el nom al modal amb el **setter natiu** (triant l'input per geometria) i clica
   el SAVE del modal.
5. JS: llegeix `location.href` → l'enllaç públic.
- **Servo (SA4):** abans de desar, simular (▶) provoca el botó *Install "Servo" library*,
  que crea el `libraries.txt`; després desar.
- **LED intern (SA1):** el diagram per defecte (només l'Arduino) ja serveix; només cal el sketch.

## Components Wokwi nous validats (captura)
- `wokwi-rgb-led` (pins R/G/B/COM, `common: cathode`).
- `wokwi-photoresistor-sensor` (pins VCC/GND/AO/DO; s'usa AO→A0).
- `wokwi-pushbutton` (pins 1.l/2.l; un costat al pin, l'altre a GND amb INPUT_PULLUP).

## Sincronització
Text dels 27 + README en un commit; enllaços publicats en **tandes per SA** (un commit per
SA) per no perdre progrés. Tot a `origin/main`.
