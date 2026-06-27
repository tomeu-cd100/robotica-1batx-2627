# Solucionari Repte SA8-A · Estacio meteo - RECEPTOR (REQUISIT MINIM)
# Rep el valor per radio i el mostra (i l'imprimeix pel port serie).

from microbit import *
import radio

radio.on()
radio.config(group=10)

while True:
    missatge = radio.receive()
    if missatge is not None:
        print(missatge)           # apareix al REPL/monitor serie
        display.scroll(missatge)  # mostra el valor rebut
    sleep(50)
