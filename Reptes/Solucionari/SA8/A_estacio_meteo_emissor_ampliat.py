# Solucionari Repte SA8-A · Estacio meteo - EMISSOR (AMPLIAT)
# AMPLIACIO 1: envia diverses magnituds etiquetades (temperatura i llum).
# AMPLIACIO 3: el micro:bit no te WiFi -> la solucio completa es un sketch
#   d'ESP32: vegeu A_estacio_meteo_esp32/A_estacio_meteo_esp32.ino (webhook
#   cap a un full de calcul). Aqui ho deixem per radio.
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
