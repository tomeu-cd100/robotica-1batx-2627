# Solucionari Repte SA8-B · Sistema d'alerta - RECEPTOR (REQUISIT MINIM)
# Rep l'alerta i la mostra (icona + so).

from microbit import *
import radio
import music

radio.on()
radio.config(group=10)

while True:
    missatge = radio.receive()
    if missatge == "ALERTA":
        display.show(Image.SKULL)
        music.play(music.BA_DING)
    sleep(50)
