# Solucionari Repte SA5-A · Selector per radio (AMPLIAT)
# AMPLIACIO 1: la pantalla mostra la lletra triada i una fletxa quan envia.
# AMPLIACIO 2: A+B alhora BLOQUEJA/desbloqueja el comandament (no envia res).
# AMPLIACIO 3: en canviar d'articulacio, envia un "saludet" (+ i -) perque
#              es vegi al brac quina articulacio s'ha triat.

from microbit import *
import radio

GRUP = 10
LLINDAR = 300
ARTICULACIONS = ["B", "E", "D", "P"]
triada = 0
bloquejat = False

radio.on()
radio.config(group=GRUP)


def saluda(lletra):
    # AMPLIACIO 3: una petita anada i tornada de l'articulacio triada
    if lletra != "P":
        for i in range(3):
            radio.send(lletra + "+")
            sleep(100)
        for i in range(3):
            radio.send(lletra + "-")
            sleep(100)


while True:
    a = button_a.is_pressed()
    b = button_b.is_pressed()
    if a and b:                                  # AMPLIACIO 2
        bloquejat = not bloquejat
        display.show(Image.NO if bloquejat else Image.YES)
        sleep(800)
        button_a.was_pressed()                   # descarta les premudes
        button_b.was_pressed()
        continue

    canvi = False
    if button_a.was_pressed():
        triada = (triada - 1) % len(ARTICULACIONS)
        canvi = True
    elif button_b.was_pressed():
        triada = (triada + 1) % len(ARTICULACIONS)
        canvi = True
    lletra = ARTICULACIONS[triada]

    if bloquejat:
        display.show(Image.NO)
        sleep(150)
        continue

    if canvi:
        saluda(lletra)

    y = accelerometer.get_y()
    if lletra == "P" and (y > LLINDAR or y < -LLINDAR):
        radio.send("P")
        display.show("P")
        sleep(500)
    elif lletra != "P" and y > LLINDAR:
        radio.send(lletra + "+")                # y > 0 -> "+" (com el comandament)
        display.show(Image.ARROW_S)              # AMPLIACIO 1
    elif lletra != "P" and y < -LLINDAR:
        radio.send(lletra + "-")
        display.show(Image.ARROW_N)
    else:
        display.show(lletra)
    sleep(150)
