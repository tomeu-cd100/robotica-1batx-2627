# Solucionari Repte SA8-A · Estacio meteo - EMISSOR (REQUISIT MINIM)
# Llegeix un sensor (temperatura) i l'envia per radio.
# NOTA: emissor i receptor han de compartir group. Si hi ha mes d'un equip a
# l'aula, cada equip ha de triar un group DIFERENT per evitar interferencies.

from microbit import *
import radio

radio.on()
radio.config(group=10)

while True:
    t = temperature()        # graus C aprox.
    radio.send(str(t))       # envia el valor
    display.show(Image.ARROW_N)
    sleep(2000)
