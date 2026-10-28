# Solucionari Repte SA5-C · Comandament complet amb gravacio (MINIM)
# Les 4 articulacions: inclinacio -> B+/B-/D+/D-, mantenir A/B -> E+/E-,
# A+B -> P (un cop per premuda), sacsejar -> G (grava un punt, SA6).
# Es el comandament de referencia del brac (T2_brac_microbit_comandament.py).

from microbit import *
import radio

GRUP = 10
LLINDAR = 300

radio.on()
radio.config(group=GRUP)

pinca_enviada = False

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    if x > LLINDAR:
        radio.send("B+")
    elif x < -LLINDAR:
        radio.send("B-")
    if y > LLINDAR:
        radio.send("D+")
    elif y < -LLINDAR:
        radio.send("D-")

    a = button_a.is_pressed()
    b = button_b.is_pressed()
    if a and b:
        if not pinca_enviada:
            radio.send("P")
            pinca_enviada = True
    else:
        pinca_enviada = False
        if accelerometer.was_gesture("shake"):
            radio.send("G")
            display.show("G")
            sleep(300)
        elif a:
            radio.send("E+")
        elif b:
            radio.send("E-")
    display.show(Image.DIAMOND_SMALL)
    sleep(100)
