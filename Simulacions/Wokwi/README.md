# Simulacions Wokwi

Circuits de les pràctiques en format **Wokwi** (text reproduïble). Cada pràctica té una carpeta amb:
- **`diagram.json`** — el circuit (components + connexions) com a text.
- **`sketch.ino`** (o `.py`) — el codi.

> ✅ **Validat el 2026-06-27** amb `SA2_semafor`: el `diagram.json` renderitza el circuit i la simulació funciona (vegeu la captura del LED verd encès).

## Com carregar i capturar a wokwi.com

1. Obre **https://wokwi.com/projects/new/arduino-uno** (o `.../esp32` per a l'ESP32 d'IoT).
2. A la pestanya **`sketch.ino`**: enganxa el codi.
3. A la pestanya **`diagram.json`**: enganxa el contingut del fitxer.
4. Prem **▶ (play)** per simular i fes la **captura** per als apunts.

> **Per què Wokwi i no Tinkercad:** a Wokwi el circuit és **text** (generable, versionable, revisable), no un canvas de gestos fràgil. Executa **C/C++ (Arduino, ESP32)** i **MicroPython** (només a Raspberry Pi Pico i ESP32). **No** simula el BBC micro:bit amb MicroPython (vegeu la nota de cobertura més avall). Vegeu l'estudi a `Memòria treball/2026-06-27_Estudi_Tinkercad...`.

## Format del `diagram.json` (referència ràpida)

```
parts:        llista de components { type, id, top, left, attrs }
              p. ex. wokwi-arduino-uno, wokwi-led, wokwi-resistor
connections:  llista de cables [ "origen:pin", "desti:pin", "color", [] ]
              p. ex. ["uno:8","rR:1","green",[]]  ["led:C","uno:GND.1","black",[]]
```
Pins habituals: LED `A` (ànode) / `C` (càtode) · resistència `1` / `2` · Arduino `uno:8`, `uno:GND.1/2/3`, `uno:5V`, `uno:A0`.

## Contingut actual
| Pràctica | Projecte (text) | Simulació interactiva (Wokwi públic) |
|---|---|---|
| `SA1_blink` | ✅ `diagram.json` + `sketch.ino` | <https://wokwi.com/projects/468012800918599681> |
| `SA2_semafor` | ✅ `diagram.json` + `sketch.ino` | <https://wokwi.com/projects/468009961823220737> |
| `SA3_alarma_aparcament` | ✅ `diagram.json` + `sketch.ino` | *(pendent de publicar)* |
| `SA4_servo_potenciometre` | ✅ `diagram.json` + `sketch.ino` | *(pendent de publicar)* |
| `SA6_termostat_histeresi` | ✅ `diagram.json` + `sketch.ino` | *(pendent de publicar)* |
| `SA8_telemetria_esp32` | ✅ `diagram.json` + `sketch.ino` | *(pendent de publicar)* |

*(Per publicar: obrir el projecte a wokwi.com, enganxar `sketch.ino` i `diagram.json`, simular i desar com a públic. Després substituir "pendent de publicar" per l'enllaç.)*

## Cobertura per SA (què és simulable a Wokwi)
| SA | Plataforma de la pràctica | Wokwi |
|---|---|---|
| SA1 LED / Blink | Arduino UNO | ✅ |
| SA2 Sortides / semàfor | Arduino UNO | ✅ |
| SA3 Sensors (HC-SR04) | Arduino UNO | ✅ |
| SA4 Servos | Arduino UNO | ✅ (servo); motor/pont H L298N limitat |
| SA5 micro:bit | micro:bit + MicroPython | ❌ **no simulable** |
| SA6 Control | Arduino UNO | ✅ |
| SA7 Robòtica mòbil | Imagina 3dBot (propietària) | ❌ no simulable |
| SA8 IoT / IA | ESP32 (IoT) **i** micro:bit (IA gestos) | ✅ part ESP32; ❌ part micro:bit |

> ⚠️ **Limitació de Wokwi descoberta (2026-06-28): no simula el BBC micro:bit amb MicroPython.** Les úniques plaques que executen MicroPython a Wokwi són Raspberry Pi Pico i ESP32. Per tant, les pràctiques de **SA5** i la **part de gestos de SA8** (micro:bit) **no es poden portar a Wokwi**; es queden amb els diagrames i el codi a `Classes/`. Per a SA8 sí que es porta la pràctica **IoT amb ESP32** (`04_esp32_telemetria`), adaptada a la xarxa simulada `Wokwi-GUEST`.

## Estat de l'escalat
- **Fet (text):** SA1, SA2, SA3, SA4, SA6, SA8 (ESP32). → 6 projectes generats al repo.
- **Pendent:** publicar a Wokwi com a públics els 4 nous (SA3, SA4, SA6, SA8) i enganxar els enllaços aquí i als `SAx_esquemes_connexions.md`.
- **No aplicable:** SA5 i SA7 (no simulables a Wokwi).
