# Solucionari Repte SA5-B · Llum de nit intel-ligent (REQUISIT MINIM)
# Llegeix el nivell de llum del micro:bit i encen la pantalla quan fa fosc.

from microbit import *

LLINDAR = 50   # per sota d'aquest nivell (0..255), considerem "fosc"

while True:
    llum = display.read_light_level()   # 0..255
    # IMPORTANT: read_light_level fa servir la matriu de LEDs; per llegir cal
    # apagar-la un instant. Aqui ho fem mostrant la imatge despres de llegir.
    if llum < LLINDAR:
        display.show(Image.SQUARE)      # fa fosc -> llum encesa
    else:
        display.clear()                 # hi ha llum -> apagada
    sleep(200)
