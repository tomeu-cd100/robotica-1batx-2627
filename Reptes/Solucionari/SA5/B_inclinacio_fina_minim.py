# Solucionari Repte SA5-B · Comandament fi (MINIM)
# Inclinacio esquerra/dreta -> B-/B+, endavant/enrere -> D-/D+, amb una
# zona morta: amb la placa gairebe plana no s'envia res.

from microbit import *
import radio

GRUP = 10
ZONA_MORTA = 250

radio.on()
radio.config(group=GRUP)

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    if x > ZONA_MORTA:
        radio.send("B+")
    elif x < -ZONA_MORTA:
        radio.send("B-")
    if y < -ZONA_MORTA:
        radio.send("D-")
    elif y > ZONA_MORTA:
        radio.send("D+")
    sleep(150)
