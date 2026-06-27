# 03 · Sabers i continguts

Els sabers s'organitzen en **sis blocs**, coherents amb el bloc *Automatització* i *Sistemes elèctrics i electrònics* de Tecnologia i Enginyeria I, i amb els sabers de programació textual del currículum.

## Bloc A · Fonaments de sistemes embeguts i metodologia
- Concepte de robot i de sistema embegut. Història i tipologies de robots.
- Arquitectura d'un microcontrolador: CPU, memòria, pins d'E/S, alimentació.
- Senyal analògic vs digital. Nivells lògics. Conceptes de tensió, corrent i resistència aplicats.
- Metodologia de projecte tecnològic: design thinking, prototipatge, iteració.
- Seguretat elèctrica i normes de treball al taller/laboratori.
- Entorns de treball: Arduino IDE, editor Python de micro:bit, simuladors (Tinkercad, Wokwi).

## Bloc B · Programació estructurada en C/C++ (Arduino)
- Estructura d'un sketch: `setup()` i `loop()`.
- Tipus de dades, variables i constants. Operadors.
- Estructures de control: condicionals (`if/else`, `switch`), bucles (`for`, `while`).
- Funcions: definició, paràmetres, valors de retorn. Modularitat.
- Vectors (arrays). Introducció a estructures i enumeracions.
- Comunicació sèrie i depuració (Serial Monitor / Plotter).
- Ús de llibreries.

## Bloc C · Electrònica: sensors i actuadors
- Sortides digitals i **PWM**: LED, intensitat, to (piezo), relés.
- Entrades digitals: polsadors, *pull-up/pull-down*, antirebot (*debounce*).
- Entrades analògiques: potenciòmetres, LDR, NTC, sensors de la gamma Keyestudio.
- Actuadors de moviment: **servomotor**, **motor DC**, driver/pont H.
- Mesura amb multímetre i interpretació de senyals.
- Protoboard, esquemes i simbologia normalitzada.

## Bloc D · Programació en MicroPython (micro:bit)
- Sintaxi de Python: indentació, variables, tipus, funcions.
- E/S de la micro:bit: matriu LED, botons, sensors integrats (acceleròmetre, brúixola, temperatura, llum).
- Pins i perifèrics externs amb Micro:shield.
- Comunicació per **ràdio** entre plaques.
- Comparació de paradigmes C/C++ ↔ Python (tipat, sintaxi, casos d'ús).

## Bloc E · Sistemes de control i automatització
- Concepte de sistema de control. **Llaç obert vs llaç tancat**.
- Sensors com a realimentació. Senyal de consigna i error.
- **Màquines d'estats finits** aplicades al control.
- Regulació bàsica (tot/res i proporcional). Introducció a l'estabilitat.
- Modelització de processos senzills i diagrames de blocs.

## Bloc F · Robòtica, tecnologies emergents i projecte
- Robòtica mòbil: xassís, rodes, **cinemàtica diferencial**.
- Algorismes de comportament: seguidor de línia, evita-obstacles, navegació.
- Modelització i programació de **trajectòries**.
- **IoT i telemetria**: enviament i monitoratge de dades; introducció a MQTT/WiFi (ESP32 opcional) o ràdio micro:bit.
- **Introducció a la IA** aplicada al control (classificació senzilla, reconeixement de patrons amb dades de sensors).
- Gestió de projecte, documentació tècnica i comunicació. Ètica i sostenibilitat (ODS).

---

## Distribució dels sabers per situació d'aprenentatge

| Bloc de sabers | SA principals |
|---|---|
| A · Fonaments i metodologia | SA1 (i transversal) |
| B · C/C++ Arduino | SA2, SA3, SA4 |
| C · Sensors i actuadors | SA2, SA3, SA4 |
| D · MicroPython micro:bit | SA5 |
| E · Control i automatització | SA6 (i SA4, SA7) |
| F · Robòtica, IoT/IA i projecte | SA7, SA8, SA9 |

> Els sabers es treballen **integrats en projectes** (no com a temari aïllat), tal com demana l'enfocament competencial del Decret 171/2022.
