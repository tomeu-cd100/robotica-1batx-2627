# SA5 - 01_name_badge.py
# Matriu LED, botons i imatges amb micro:bit (MicroPython).
# Boto A: mostra el nom. Boto B: cara contenta. En repos: cor.

from microbit import *

while True:
    if button_a.is_pressed():
        display.scroll("Hola!")        # canvia-ho pel teu nom
    elif button_b.is_pressed():
        display.show(Image.HAPPY)
    else:
        display.show(Image.HEART)
    sleep(100)
