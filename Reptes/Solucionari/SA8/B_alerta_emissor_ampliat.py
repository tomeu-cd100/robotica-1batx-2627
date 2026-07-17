# Solucionari Repte SA8-B · Sistema d'alerta - EMISSOR (AMPLIAT)
# AMPLIACIO 1: diferencia estat normal vs alerta amb icones clares.
# AMPLIACIO 2: diversos NIVELLS d'alerta (avis / greu).
# AMPLIACIO 3: emissor IDENTIFICAT dins d'una xarxa de tres emissors.
#   Tambe envia l'estat normal (OK) periodicament: aixi el receptor pot
#   detectar si aquest emissor CALLA massa estona.
# NOTA: cada equip, un group propi.

from microbit import *
import radio

radio.on()
radio.config(group=10)

# AMPLIACIO 3: identificador d'AQUEST emissor.
# Carrega'l a cada placa canviant ID: "S1", "S2" o "S3" (un per placa).
ID = "S1"

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
        # AMPLIACIO 3: missatge OK periodic ("estic viu"); si el receptor
        # deixa de rebre'l, sabra que aquest emissor ha callat
        radio.send(ID + ":OK:" + str(t))
        display.show(Image.YES)   # AMPLIACIO 1: estat normal
    sleep(1000)
