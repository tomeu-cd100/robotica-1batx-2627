# SA5 - 03_nightlight.py
# Llum automatic: la micro:bit s'encen quan fa fosc.
# Usa el sensor de llum de la propia matriu LED: display.read_light_level() (0..255).

from microbit import *

LLINDAR = 50   # per sota d'aquest nivell, considerem "fosc"

while True:
    llum = display.read_light_level()
    if llum < LLINDAR:
        display.show(Image.SQUARE)   # "encen" (fa fosc)
    else:
        display.clear()              # apagat (hi ha llum)
    sleep(100)
