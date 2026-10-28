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

pinca_enviada = False   # per enviar "P" una sola vegada per cada A+B

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()

    ordre = ""
    if button_a.is_pressed() and button_b.is_pressed():
        if not pinca_enviada:      # mantenint A+B, la P nomes surt un cop
            ordre = "P"
        pinca_enviada = True
    else:
        pinca_enviada = False
        if x > LLINDAR:
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

    sleep(150)        # ~6 ordres per segon
