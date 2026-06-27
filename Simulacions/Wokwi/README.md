# Simulacions Wokwi

Circuits de les pràctiques en format **Wokwi** (text reproduïble). Cada pràctica té una carpeta amb:
- **`diagram.json`** — el circuit (components + connexions) com a text.
- **`sketch.ino`** (o `.py`) — el codi.

> ✅ **Validat el 2026-06-27** amb `SA2_semafor`: el `diagram.json` renderitza el circuit i la simulació funciona (vegeu la captura del LED verd encès).

## Com carregar i capturar a wokwi.com

1. Obre **https://wokwi.com/projects/new/arduino-uno** (o `.../micropython-pi-pico` per a micro:bit).
2. A la pestanya **`sketch.ino`**: enganxa el codi.
3. A la pestanya **`diagram.json`**: enganxa el contingut del fitxer.
4. Prem **▶ (play)** per simular i fes la **captura** per als apunts.

> **Per què Wokwi i no Tinkercad:** a Wokwi el circuit és **text** (generable, versionable, revisable), no un canvas de gestos fràgil; i **sí executa MicroPython** (micro:bit). Vegeu l'estudi a `Memòria treball/2026-06-27_Estudi_Tinkercad...`.

## Format del `diagram.json` (referència ràpida)

```
parts:        llista de components { type, id, top, left, attrs }
              p. ex. wokwi-arduino-uno, wokwi-led, wokwi-resistor
connections:  llista de cables [ "origen:pin", "desti:pin", "color", [] ]
              p. ex. ["uno:8","rR:1","green",[]]  ["led:C","uno:GND.1","black",[]]
```
Pins habituals: LED `A` (ànode) / `C` (càtode) · resistència `1` / `2` · Arduino `uno:8`, `uno:GND.1/2/3`, `uno:5V`, `uno:A0`.

## Contingut actual
| Pràctica | Estat |
|---|---|
| `SA2_semafor` | ✅ Validat (diagram.json + sketch.ino) |

*(Per ampliar a la resta de pràctiques, generar una carpeta per pràctica seguint el mateix patró.)*
