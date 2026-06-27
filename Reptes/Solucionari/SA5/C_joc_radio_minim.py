# Solucionari Repte SA5-C · Joc o missatges per radio (REQUISIT MINIM)
# Opcio joc: en sacsejar, mostra un resultat aleatori (dau 1..6).
# (L'opcio radio entre dues plaques esta a la versio ampliada.)

from microbit import *
import random

while True:
    if accelerometer.was_gesture("shake"):
        n = random.randint(1, 6)
        display.show(str(n))
    sleep(50)
