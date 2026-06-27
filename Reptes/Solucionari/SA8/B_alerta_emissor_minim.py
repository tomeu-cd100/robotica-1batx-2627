# Solucionari Repte SA8-B · Sistema d'alerta - EMISSOR (REQUISIT MINIM)
# Quan se supera un llindar (temperatura), envia una alerta per radio.
# NOTA: cada equip, un group propi.

from microbit import *
import radio

radio.on()
radio.config(group=10)

LLINDAR = 28   # graus C

while True:
    t = temperature()
    if t > LLINDAR:
        radio.send("ALERTA")
        display.show(Image.NO)
    else:
        display.show(Image.YES)
    sleep(1000)
