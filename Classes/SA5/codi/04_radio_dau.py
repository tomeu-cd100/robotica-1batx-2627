# SA5 - 04_radio_dau.py
# Dau digital + comunicacio per radio entre dues micro:bit.
# Sacseja la placa per llançar el dau; el resultat s'envia a l'altra placa.
# IMPORTANT: les dues plaques han de tenir el MATEIX group.

from microbit import *
import random
import radio

radio.on()
radio.config(group=10)   # mateix numero a les dues plaques

while True:
    # Llançar el dau en sacsejar
    if accelerometer.was_gesture("shake"):
        n = random.randint(1, 6)
        display.show(str(n))
        radio.send(str(n))      # envia el resultat a l'altra placa

    # Rebre el resultat de l'altra placa
    missatge = radio.receive()
    if missatge is not None:
        display.scroll("R" + missatge)   # R = rebut

    sleep(50)
