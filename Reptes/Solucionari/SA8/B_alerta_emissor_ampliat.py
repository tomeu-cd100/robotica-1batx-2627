# Solucionari Repte SA8-B · Sistema d'alerta - EMISSOR (AMPLIAT)
# AMPLIACIO 1: diferencia estat normal vs alerta amb icones clares.
# AMPLIACIO 2: diversos NIVELLS d'alerta (avis / greu).
# AMPLIACIO 3: emissor IDENTIFICAT (per a una xarxa de diversos emissors).
# NOTA: cada equip, un group propi.

from microbit import *
import radio

radio.on()
radio.config(group=10)

ID = "S1"          # AMPLIACIO 3: identificador d'aquest emissor
AVIS = 26          # AMPLIACIO 2: nivells
GREU = 30

while True:
    t = temperature()
    if t > GREU:
        radio.send(ID + ":GREU:" + str(t))
        display.show(Image.SKULL)
    elif t > AVIS:
        radio.send(ID + ":AVIS:" + str(t))
        display.show(Image.NO)
    else:
        display.show(Image.YES)   # AMPLIACIO 1: estat normal
    sleep(1000)
