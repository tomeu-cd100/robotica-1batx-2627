# SA5 - 03_radio_comandament.py
# El COMANDAMENT del brac: segons la inclinacio, envia ordres de text per
# radio. Una altra micro:bit les rep (receptor o PONT cap a l'Arduino).
#   inclina dreta/esquerra -> "B+" / "B-" (base)
#   inclina enrere/endavant -> "D+" / "D-" (servo dret)
#   A i B alhora           -> "P"         (obre/tanca la pinca)
# IMPORTANT: les dues plaques han de tenir el MATEIX grup de radio.
# Quan: S3 - modelatge

from microbit import *
import radio

GRUP = 10        # CANVIA'L pel teu numero de llista (les 2 plaques igual)
LLINDAR = 300

radio.on()
radio.config(group=GRUP)

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()

    ordre = ""
    if button_a.is_pressed() and button_b.is_pressed():
        ordre = "P"
    elif x > LLINDAR:
        ordre = "B+"
    elif x < -LLINDAR:
        ordre = "B-"
    elif y < -LLINDAR:
        ordre = "D-"
    elif y > LLINDAR:
        ordre = "D+"

    if ordre != "":
        radio.send(ordre)
        display.show(ordre[0])     # la primera lletra: B, D o P
    else:
        display.show(Image.DIAMOND_SMALL)

    if ordre == "P":
        sleep(500)    # una sola "P" per premuda: si no, la pinca tremolaria
    sleep(150)        # ~6 ordres per segon
