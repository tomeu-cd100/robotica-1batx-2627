# Solucionari Repte SA5-A · Comptapassos personal (AMPLIAT)
# AMPLIACIO 1: reinicia el comptador amb el boto B.
# AMPLIACIO 2: objectiu de passes; mostra una icona en assolir-lo.
# AMPLIACIO 3: barra de progres amb els LEDs cap a l'objectiu.

from microbit import *

passes = 0
LLINDAR = 1500
OBJECTIU = 20

def mostra_progres(actual, total):
    # AMPLIACIO 3: dibuixa una barra (0..total -> 0..25 LEDs encesos)
    encesos = min(25, (actual * 25) // total)
    img = ""
    for fila in range(5):
        for col in range(5):
            n = fila * 5 + col
            img += "9" if n < encesos else "0"
        if fila < 4:
            img += ":"
    display.show(Image(img))

while True:
    forca = accelerometer.get_strength()
    if forca > LLINDAR:
        passes = passes + 1
        sleep(300)

    # AMPLIACIO 1: reset amb boto B
    if button_b.is_pressed():
        passes = 0
        display.scroll("0")

    # AMPLIACIO 2: objectiu assolit
    if passes >= OBJECTIU:
        display.show(Image.HAPPY)
    else:
        # AMPLIACIO 3: barra de progres mentre no s'assoleix
        mostra_progres(passes, OBJECTIU)

    sleep(20)
