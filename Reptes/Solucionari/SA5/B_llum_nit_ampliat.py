# Solucionari Repte SA5-B · Llum de nit intel-ligent (AMPLIAT)
# AMPLIACIO 1: mostra el nivell de llum numeric en premer un boto (per calibrar).
# AMPLIACIO 2: histeresi (dos llindars) per evitar parpellejos.
# AMPLIACIO 3: ajusta la brillantor de la imatge segons la foscor.

from microbit import *

LLINDAR_FOSC = 40   # per sota: encen
LLINDAR_CLAR = 80   # per sobre: apaga
ences = False

while True:
    llum = display.read_light_level()

    # AMPLIACIO 1: calibratge -> mostra el valor amb el boto A
    if button_a.is_pressed():
        display.scroll(str(llum))

    # AMPLIACIO 2: decisio amb histeresi
    if not ences and llum < LLINDAR_FOSC:
        ences = True
    elif ences and llum > LLINDAR_CLAR:
        ences = False

    if ences:
        # AMPLIACIO 3: com mes fosc, mes brillant tota la pantalla (1..9)
        brillantor = 9 - (llum * 9) // LLINDAR_FOSC
        if brillantor < 1:
            brillantor = 1
        fila = str(brillantor) * 5
        display.show(Image(fila + ":" + fila + ":" + fila + ":" + fila + ":" + fila))
    else:
        display.clear()
    sleep(150)
