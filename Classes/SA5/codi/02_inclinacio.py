# SA5 - 02_inclinacio.py
# L'accelerometre com a GEST del comandament del brac.
# Inclina la placa: la pantalla mostra la fletxa de cap on es mouria el brac.
# Sacseja-la: mostra una G (el gest de "gravar un punt" de la SA6).
# Obre el grafic (Show data / Plotter) per veure x i y en directe.
# Quan: S2 - modelatge

from microbit import *

LLINDAR = 300    # inclinacio minima perque compti (sota d'aixo: placa plana)

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    print((x, y))              # una tupla: el Plotter en dibuixa dues linies

    if accelerometer.was_gesture("shake"):
        display.show("G")
        sleep(300)
    elif x > LLINDAR:
        display.show(Image.ARROW_E)    # dreta: la base giraria
    elif x < -LLINDAR:
        display.show(Image.ARROW_W)    # esquerra
    elif y < -LLINDAR:
        display.show(Image.ARROW_N)    # endavant: el servo dret
    elif y > LLINDAR:
        display.show(Image.ARROW_S)    # enrere
    else:
        display.show(Image.DIAMOND_SMALL)   # plana: quiet

    sleep(100)
