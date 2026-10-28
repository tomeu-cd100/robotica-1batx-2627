# SA5 - 01_selector_articulacio.py
# Pantalla i botons de la micro:bit: el SELECTOR del comandament del brac.
# Boto A: articulacio anterior. Boto B: articulacio seguent.
# La pantalla mostra la lletra de l'articulacio triada:
#   B = base, E = esquerre, D = dret, P = pinca
# Quan: S1 - modelatge

from microbit import *

ARTICULACIONS = ["B", "E", "D", "P"]
triada = 0          # posicio dins de la llista (0 = la base)

display.scroll("BRAC")

while True:
    if button_a.was_pressed():
        triada = triada - 1
        if triada < 0:
            triada = len(ARTICULACIONS) - 1   # de la base salta a la pinca
    elif button_b.was_pressed():
        triada = triada + 1
        if triada >= len(ARTICULACIONS):
            triada = 0                        # de la pinca torna a la base

    display.show(ARTICULACIONS[triada])
    sleep(100)
