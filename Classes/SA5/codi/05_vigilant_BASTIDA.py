# SA5 - 05_vigilant_BASTIDA.py  (BASTIDA / esquelet per a l'alumnat)
#
# El patro dificil ja esta muntat: from microbit import *, la constant amb
# nom (LLINDAR) i el bucle principal while True: amb la seva indentacio.
# Tu nomes has d'OMPLIR els # TODO: la LECTURA del sensor integrat i la
# RESPOSTA a la matriu de LED (mateix patro que 02_passes.py i 03_nightlight.py).
#
# Idea: un "vigilant" que llegeix UN sensor integrat i, si passa el LLINDAR,
# avisa a la matriu; si no, ensenya un estat de repos.
# Quan: S2 - bastida (patro sensor + llindar)

from microbit import *

# Constant amb nom: ajusta la sensibilitat en UN sol lloc (com LLINDAR a 02_passes.py).
LLINDAR = 50   # TODO: tria el numero segons el sensor que facis servir

while True:
    # TODO: llegeix el sensor integrat i guarda'l en la variable "valor".
    #       Tria'n NOMES UN i esborra els altres:
    #         display.read_light_level()  ->  llum de la matriu (0..255)
    #         temperature()               ->  graus Celsius (enter)
    #         accelerometer.get_x()       ->  inclinacio en un eix
    valor = 0   # TODO: substitueix el 0 per la lectura del sensor triat

    if valor > LLINDAR:
        # TODO: RESPOSTA quan es passa el llindar
        #       (p. ex. display.show(Image.YES) o display.scroll("!"))
        pass
    else:
        # TODO: estat de REPOS quan NO es passa el llindar
        #       (p. ex. display.clear() o display.show(Image.HEART))
        pass

    sleep(100)   # ritme del bucle (no bloqueja: es repeteix cada volta)
