# SA8 - 03_ia_gestos.py
# Introduccio a la IA: classificador de gestos amb l'acceleròmetre (basat en REGLES).
# Llegeix x, y, z i decideix en quina posicio esta la placa.
# Es una "IA" senzilla feta a ma; el ML real APREN les regles a partir d'exemples
# (es pot explorar amb l'extensio "Code & AI" de MakeCode).

from microbit import *

def classifica(x, y, z):
    # Valors en mil-li-g (aprox.): la gravetat son ~1000 a l'eix vertical.
    if accelerometer.was_gesture("shake"):
        return "SACSEIG"
    if z < -700:
        return "PLA (cara amunt)"
    if z > 700:
        return "CAP PER AVALL"
    if y > 600:
        return "INCLINAT ENDAVANT"
    if y < -600:
        return "INCLINAT ENRERE"
    if x > 600:
        return "INCLINAT DRETA"
    if x < -600:
        return "INCLINAT ESQUERRA"
    return "DRET"

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    z = accelerometer.get_z()

    gest = classifica(x, y, z)
    print(gest, x, y, z)      # mostra dades + classe (per ajustar llindars)

    # Feedback visual segons la classe
    if gest == "SACSEIG":
        display.show(Image.SQUARE)
    elif "PLA" in gest:
        display.show(Image.YES)
    elif "AVALL" in gest:
        display.show(Image.NO)
    else:
        display.show(Image.ARROW_N)
    sleep(200)
