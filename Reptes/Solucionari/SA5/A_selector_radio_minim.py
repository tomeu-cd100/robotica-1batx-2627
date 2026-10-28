# Solucionari Repte SA5-A · Selector per radio (MINIM)
# A/B trien l'articulacio (B, E, D, P). Inclinar enrere/endavant envia
# "<lletra>+" o "<lletra>-"; amb la P, qualsevol inclinacio envia "P".

from microbit import *
import radio

GRUP = 10
LLINDAR = 300
ARTICULACIONS = ["B", "E", "D", "P"]
triada = 0

radio.on()
radio.config(group=GRUP)

while True:
    if button_a.was_pressed():
        triada = (triada - 1) % len(ARTICULACIONS)
    elif button_b.was_pressed():
        triada = (triada + 1) % len(ARTICULACIONS)
    lletra = ARTICULACIONS[triada]

    y = accelerometer.get_y()
    if lletra == "P":
        if y > LLINDAR or y < -LLINDAR:
            radio.send("P")
            sleep(500)          # una sola P per inclinacio
    elif y > LLINDAR:
        radio.send(lletra + "+")    # mateix conveni que el comandament
    elif y < -LLINDAR:
        radio.send(lletra + "-")

    display.show(lletra)
    sleep(150)
