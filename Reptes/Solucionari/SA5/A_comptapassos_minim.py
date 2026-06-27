# Solucionari Repte SA5-A · Comptapassos personal (REQUISIT MINIM)
# Detecta passes/sacsejades amb l'acceleròmetre i les compta.
# En prémer el boto A, mostra el total a la pantalla.

from microbit import *

passes = 0
LLINDAR = 1500   # forca (mil-li-g) per damunt de la qual comptem un pas

while True:
    forca = accelerometer.get_strength()
    if forca > LLINDAR:
        passes = passes + 1
        sleep(300)            # antirebot: evita comptar el mateix pas dos cops

    if button_a.is_pressed():
        display.scroll(str(passes))   # mostra el total

    sleep(20)
