# SA0 · Guia docent — Vocabulari essencial i bases de programació

**Naturalesa:** material **transversal de suport**, no una SA amb sessions pròpies. **Públic:** referència per al docent.
**Llenguatges:** Arduino C/C++ i MicroPython (micro:bit). **Vincle:** base prèvia a `Programació didàctica/10_SA1...` i transversal a SA1–SA9.

## Què és la SA0 i per què

La SA0 reuneix en un sol lloc el **vocabulari** i els **conceptes de programació** que les SA1–SA9 donen per coneguts. Evita repetir definicions a cada unitat i ofereix a l'alumnat un únic punt de consulta. No consumeix sessions del calendari (la matèria té 2 h setmanals): s'usa com a **material de referència** i **bastida** segons necessitat.

## Documents de la carpeta

| Document | Públic | Quan/Com usar-lo |
|---|---|---|
| `SA0_vocabulari_essencial.md` | Alumnat | Consulta contínua. Glossari **per SA**. Projectable; també imprimible com a "diccionari de butxaca". |
| `SA0_guia_programacio.md` | Alumnat | Lectura/consulta. Conceptes Arduino (A) + MicroPython (B) + comparativa (C). Referència en resoldre reptes. |
| `SA0_fitxa_alumnat.md` | Alumnat | Autoaprenentatge (no qualifica). Diagnòstic informal abans de SA1; deures de repàs per a qui ho necessiti. |
| `SA0_guia_docent.md` | Docent | Aquest document: integració, mapa i solucionari. |

## Com integrar-la (3 escenaris)

1. **Inici de curs (recomanat):** repartir el vocabulari i la guia com a material de referència; proposar la fitxa com a **autodiagnòstic** voluntari la primera setmana. No ocupa sessió sencera; 15–20 min de presentació dins la SA1.
2. **Bastida puntual (atenció a la diversitat):** derivar a seccions concretes l'alumnat que necessiti reforç (p. ex., "repassa A6. `if/else`" abans de la SA3).
3. **Pont a MicroPython:** abans de la SA5, fer llegir la Part B i la taula comparativa (Part C) per amortir el canvi de llenguatge.

## Mapa vocabulari ↔ SA ↔ programació didàctica

| SA | Termes nucli | Concepte de programació associat | Doc. prog. didàctica |
|---|---|---|---|
| SA1 | robot, sistema embegut, E-P-S, digital/analògic | esquelet `setup()`/`loop()`, `digitalWrite`, `delay` | `10_SA1...` |
| SA2 | sortida digital, PWM, LED, resistència, RGB | `analogWrite` (0–255), pins `~` | `11_SA2...` |
| SA3 | sensor, actuador, debounce, LDR, ultrasons | `analogRead` (0–1023), `if/else`, funcions | `12_SA3...` |
| SA4 | servo, motor DC, pont H, llibreria | `#include`, llibreria `Servo.h` | `13_SA4...` |
| SA5 | micro:bit, MicroPython, indentació, ràdio | sintaxi Python, `while True`, `radio` | `14_SA5...` |
| SA6 | llaç obert/tancat, histèresi, màquina d'estats, P | condicionals encadenats, estats, variables d'estat | `15_SA6...` |
| SA7 | robot mòbil, trajectòria, seguidor de línia, IR | funcions de moviment, lectura de sensors IR | `16_SA7...` |
| SA8 | IoT, telemetria, IA, ESP32 | `radio`/sèrie, estructures de dades | `17_SA8...` |
| SA9 | projecte, àgil, prototip, iteració, dossier | integració de tot l'anterior | `18_SA9...` |

## Precisions tècniques (per evitar imprecisions a l'aula)

- **`analogRead` retorna 0–1023** (ADC de 10 bits); **`analogWrite`/PWM accepta 0–255** (8 bits). Confondre els dos rangs és l'error conceptual més comú.
- **PWM no és senyal analògic real:** és commutació ràpida (cicle de treball). Per a l'alumnat n'hi ha prou amb l'analogia, però convé no afirmar que "el pin treu 2,5 V".
- **`delay()` bloqueja**; introduir `millis()` només com a ampliació (ja present a SA1 `blink_millis.ino`).
- **`INPUT_PULLUP`:** a SA3 (polsadors) sovint cal la resistència de *pull-up* interna; aquí s'ha simplificat a `INPUT` per no avançar matèria. Comentar-ho en arribar al *debounce*.
- **MicroPython ≠ Python complet:** algunes funcions de Python estàndard no hi són. Editors: python.microbit.org (en línia) i Thonny (escriptori).
- **Codi als `.md` vs sketches reals:** aquí només hi ha **fragments il·lustratius**; els sketches complets i carregables viuen a `Classes/SAx/codi/`.

## Solucionari de la fitxa (`SA0_fitxa_alumnat.md`)

**Act. 1 (orientatiu):**
| Sistema | Entrada | Procés | Sortida |
|---|---|---|---|
| Llum del passadís | sensor de presència/llum | decideix si hi ha algú i si és fosc | bombeta/LED |
| Termòstat | sensor de temperatura + consigna | compara amb la consigna | caldera/relé |
| Porta automàtica | sensor de moviment | detecta aproximació | motor de la porta |

**Act. 2:** interruptor = **D** · volum = **A** · timbre = **D** · termòmetre = **A** · LDR = **A**.

**Act. 3:** 1→sensor (mesura) · 2→actuador (acció física) · 3→microcontrolador (cervell) · 4→sketch (programa) · 5→bug (error). Ordre de les definicions: actuador(2), microcontrolador(3), sensor(1), bug(5), sketch(4).

**Act. 4:** Predicció esperada: el LED del pin 13 parpelleja encès 1 s / apagat 1 s, indefinidament. `setup()` configura el pin 13 com a sortida; s'executa **una sola vegada**. Amb `delay(100)` parpellejaria molt més ràpid (5 cops/s).

**Act. 5:** falta el **punt i coma** després de `pinMode(13, OUTPUT)`. Correcte: `pinMode(13, OUTPUT);`.

**Act. 6:**
```python
from microbit import *

while True:
    display.show("A")
    sleep(500)
```

## Atenció a la diversitat

| Necessitat | Mesura amb la SA0 |
|---|---|
| **Bastida** | Derivar a seccions concretes del vocabulari/guia; "diccionari de butxaca" imprès a mà. |
| **+ Ampliació** | Proposar `millis()` (A5), funcions amb paràmetres (A8) i traduir més exemples Arduino↔MicroPython (Part C). |
| **Diversitat lectora/lingüística** | Glossari amb analogies del dia a dia; taules curtes en lloc de text dens. |
| **Sense maquinari** | Tots els exemples es proven a Tinkercad/Wokwi; micro:bit té simulador a python.microbit.org. |

> La SA0 **no qualifica**. La seva funció és anivellar i donar autonomia de consulta. Referencia-la explícitament cada cop que un terme o concepte reaparegui a una SA.
