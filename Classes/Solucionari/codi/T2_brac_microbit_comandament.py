# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase micro:bit (SA5): COMANDAMENT (2a micro:bit, la que es te a la ma).
# Inclina per moure base i colze; boto A+B alhora obre/tanca la pinca.
# Protocol de radio (texts): "B+" "B-" (base), "C+" "C-" (colze), "P" (pinca).

from microbit import *
import radio

GRUP = 10   # CANVIA'L pel numero de la vostra parella (les 2 plaques igual)

radio.on()
radio.config(group=GRUP)

while True:
    x = accelerometer.get_x()   # inclinacio esquerra/dreta -> base
    y = accelerometer.get_y()   # inclinacio davant/enrere -> colze

    if x > 300:
        radio.send("B+")
    elif x < -300:
        radio.send("B-")

    if y > 300:
        radio.send("C+")
    elif y < -300:
        radio.send("C-")

    if button_a.was_pressed() and button_b.was_pressed():
        radio.send("P")          # obre/tanca la pinca (commutador)
        display.show(Image.TARGET)
    else:
        display.show(Image.ARROW_N)

    sleep(100)   # ~10 ordres/s: suficient per a un control suau
