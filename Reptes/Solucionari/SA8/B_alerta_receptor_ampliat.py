# Solucionari Repte SA8-B · Sistema d'alerta - RECEPTOR (AMPLIAT)
# AMPLIACIO 1: icones segons el nivell.
# AMPLIACIO 2: confirmacio (ACK) cap a l'emissor.
# AMPLIACIO 3: xarxa -> identifica quin emissor ha enviat l'alerta.
# Format del missatge: "S1:GREU:31"
# NOTA: cada equip, un group propi.

from microbit import *
import radio
import music

radio.on()
radio.config(group=10)

while True:
    missatge = radio.receive()
    if missatge is not None:
        print(missatge)
        try:
            id_emissor, nivell, valor = missatge.split(":")
            # AMPLIACIO 3: mostra qui avisa
            display.scroll(id_emissor)
            # AMPLIACIO 1: icona segons nivell
            if nivell == "GREU":
                display.show(Image.SKULL)
                music.play(music.BA_DING)
            elif nivell == "AVIS":
                display.show(Image.NO)
            # AMPLIACIO 2: confirma la recepcio
            radio.send("ACK:" + id_emissor)
        except:
            display.show(Image.CONFUSED)
    sleep(50)
