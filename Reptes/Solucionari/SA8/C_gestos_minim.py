# Solucionari Repte SA8-C · Control per gestos (REQUISIT MINIM)
# Reconeix almenys DOS gestos i hi associa una accio (mostrar una icona).
# Es una "IA" basada en regles (classificador senzill fet a ma).

from microbit import *

while True:
    if accelerometer.was_gesture("shake"):
        display.show(Image.SQUARE)        # gest 1: sacseig
    elif accelerometer.was_gesture("face up"):
        display.show(Image.YES)           # gest 2: pla cara amunt
    sleep(100)
