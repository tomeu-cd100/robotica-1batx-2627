# SA5 - 02_passes.py
# Comptapassos amb l'acceleròmetre de la micro:bit.
# En repos la "força" val ~1024 (mil-li-g). Un pas/sacseig la fa pujar.

from microbit import *

passes = 0
LLINDAR = 1500   # ajusta'l segons la sensibilitat que vulguis

while True:
    forca = accelerometer.get_strength()
    if forca > LLINDAR:
        passes = passes + 1
        display.show(str(passes % 10))   # mostra l'ultima xifra
        sleep(300)                       # antirebot: evita comptar de mes
    # Reinici amb el boto B
    if button_b.is_pressed():
        passes = 0
        display.scroll("0")
    sleep(20)
