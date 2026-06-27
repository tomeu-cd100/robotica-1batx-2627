# SA8 · Connexions i entorn

## Telemetria amb micro:bit (recomanat)
- **2 micro:bit**: una fa d'**emissor** (mesura i envia) i l'altra de **receptor** (rep i registra).
- Totes dues amb el **mateix `group`** (`radio.config(group=...)`).
- El receptor es deixa connectat per **USB** a l'ordinador per registrar dades pel **port sèrie** (es poden copiar a un full de càlcul i fer-ne un gràfic).

```
[ micro:bit EMISSOR ]  --(radio)-->  [ micro:bit RECEPTOR ]  --(USB)-->  PC (registre)
   mesura T / llum                       mostra i imprimeix
```

## Sensors usats (integrats)
| Magnitud | Instrucció |
|---|---|
| Temperatura | `temperature()` |
| Llum | `display.read_light_level()` |
| Moviment/gest | `accelerometer.get_x/y/z()`, `get_strength()` |

## Opció ESP32 (WiFi/MQTT) — avançada/opcional
- Programació en **C++ (Arduino IDE)** amb el paquet de plaques ESP32.
- Cal **SSID i contrasenya** d'una xarxa **2,4 GHz** i, per a MQTT, un *broker* (p. ex. de proves públic).
- Vegeu `codi/04_esp32_telemetria.ino` (esquelet comentat).

```
[ ESP32 ] --WiFi--> [ broker MQTT / panell ] --> visualitzacio
```

## Recursos
- micro:bit **Code & AI**: https://microbit.org/code-ai/
- MakeCode (extensió ML): https://makecode.microbit.org/
- Wokwi (simular ESP32/IoT): https://wokwi.com/
