# Solucionari Repte SA8-A · Estacio meteo - EMISSOR (AMPLIAT)
# AMPLIACIO 1: envia diverses magnituds etiquetades (temperatura i llum).
# AMPLIACIO 3: alternativa avancada -> portar la telemetria a un ESP32 amb WiFi
#   (vegeu Classes/SA8/codi/04_esp32_telemetria.ino). Aqui ho deixem per radio.
# NOTA: cada equip, un group propi (evita interferencies).

from microbit import *
import radio

radio.on()
radio.config(group=10)

while True:
    t = temperature()
    llum = display.read_light_level()
    # AMPLIACIO 1: dues magnituds etiquetades, separades per ;
    radio.send("T:" + str(t) + ";L:" + str(llum))
    display.show(Image.ARROW_N)
    sleep(2000)
