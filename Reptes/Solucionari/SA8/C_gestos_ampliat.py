# Solucionari Repte SA8-C · Control per gestos (AMPLIAT)
# AMPLIACIO 1: afegeix un tercer gest amb la seva accio.
# AMPLIACIO 2: usa els gestos per controlar un altre dispositiu per radio (comandament gestual).
# AMPLIACIO 3 (nota): per a un model de ML "de veritat" que APREN de dades, es pot
#   explorar l'extensio "Code & AI" de MakeCode i entrenar amb exemples propis.
#   Aqui mantenim el classificador per REGLES (transparent i explicable).
# NOTA: cada equip, un group propi.

from microbit import *
import radio

radio.on()
radio.config(group=10)

def classifica():
    # Classificador per regles amb tres gestos
    if accelerometer.was_gesture("shake"):
        return "A"     # gest 1
    if accelerometer.was_gesture("face up"):
        return "B"     # gest 2
    if accelerometer.was_gesture("face down"):
        return "C"     # AMPLIACIO 1: gest 3
    return None

while True:
    gest = classifica()
    if gest is not None:
        # AMPLIACIO 2: envia l'ordre a l'altre dispositiu
        radio.send(gest)
        if gest == "A":
            display.show(Image.SQUARE)
        elif gest == "B":
            display.show(Image.YES)
        elif gest == "C":
            display.show(Image.NO)
    sleep(100)
