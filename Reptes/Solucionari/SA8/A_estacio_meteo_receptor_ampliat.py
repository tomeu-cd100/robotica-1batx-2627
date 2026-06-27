# Solucionari Repte SA8-A · Estacio meteo - RECEPTOR (AMPLIAT)
# AMPLIACIO 2: registra i calcula maxim, minim i mitjana de la temperatura.
# Separa el missatge "T:23;L:120" en parts i en treu la temperatura.

from microbit import *
import radio

radio.on()
radio.config(group=10)

n = 0
suma = 0
maxim = -999
minim = 999

while True:
    missatge = radio.receive()
    if missatge is not None:
        print(missatge)
        try:
            parts = missatge.split(";")
            t = int(parts[0].split(":")[1])   # agafa el valor despres de "T:"

            # AMPLIACIO 2: estadistiques
            n = n + 1
            suma = suma + t
            if t > maxim:
                maxim = t
            if t < minim:
                minim = t
            mitjana = suma // n
            print("max=", maxim, "min=", minim, "mitjana=", mitjana)
            display.scroll(str(t))
        except:
            display.show(Image.CONFUSED)
    sleep(50)
