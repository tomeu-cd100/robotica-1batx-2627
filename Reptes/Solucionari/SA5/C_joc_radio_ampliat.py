# Solucionari Repte SA5-C · Joc per radio (AMPLIAT)
# AMPLIACIO 1: animacio abans de mostrar el resultat.
# AMPLIACIO 2: porta el recompte de tirades.
# AMPLIACIO 3: joc multijugador per radio (dau compartit entre dues plaques).
# IMPORTANT: les dues plaques han de tenir el MATEIX group.
# NOTA: si hi ha mes d'un equip a l'aula, cada equip ha de triar un group DIFERENT.

from microbit import *
import random
import radio

radio.on()
radio.config(group=10)

tirades = 0   # AMPLIACIO 2

def anima():
    # AMPLIACIO 1: petita animacio de "remenar" el dau
    for _ in range(6):
        display.show(str(random.randint(1, 6)))
        sleep(80)

while True:
    if accelerometer.was_gesture("shake"):
        anima()
        n = random.randint(1, 6)
        display.show(str(n))
        tirades = tirades + 1
        radio.send(str(n))            # AMPLIACIO 3: comparteix el resultat

    # AMPLIACIO 3: rep el dau de l'altra placa
    missatge = radio.receive()
    if missatge is not None:
        display.scroll("R" + missatge)

    # AMPLIACIO 2: mostra el recompte amb el boto A
    if button_a.is_pressed():
        display.scroll("T" + str(tirades))

    sleep(50)
