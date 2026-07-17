# Solucionari Repte SA5-C · Joc per radio (AMPLIAT)
# AMPLIACIO 1: animacio abans de mostrar el resultat.
# AMPLIACIO 2: porta el recompte de tirades.
# AMPLIACIO 3: joc multijugador per radio amb torns, marcador i timeout:
#   dau mes alt guanya la ronda; el primer a 3 punts guanya la partida.
# PROTOCOL (fita 2, escriu-lo tambe en paper):
#   - cada placa, en sacsejar-la, envia la seva tirada com a text "1".."6"
#   - qui tira espera la tirada del rival (max 5 s); si no arriba -> timeout
#   - es comparen els daus, s'actualitza el marcador i es mostra
# IMPORTANT: les dues plaques han de tenir el MATEIX group.
# NOTA: si hi ha mes d'un equip a l'aula, cada equip ha de triar un group DIFERENT.

from microbit import *
import random
import radio

radio.on()
radio.config(group=10)

PUNTS_VICTORIA = 3   # AMPLIACIO 3: primer a 3 punts guanya
TIMEOUT_MS = 5000    # AMPLIACIO 3 (fita 3): temps maxim d'espera del rival

tirades = 0          # AMPLIACIO 2
punts_meu = 0        # AMPLIACIO 3: marcador propi
punts_rival = 0      # AMPLIACIO 3: marcador del rival
dau_rival = 0        # tirada del rival pendent de comparar (0 = cap)

def anima():
    # AMPLIACIO 1: petita animacio de "remenar" el dau
    for _ in range(6):
        display.show(str(random.randint(1, 6)))
        sleep(80)

def es_dau(m):
    # el protocol nomes fa servir missatges "1".."6"
    return m is not None and len(m) == 1 and "1" <= m <= "6"

def espera_dau_rival():
    # AMPLIACIO 3 (fita 3): espera la tirada del rival amb TIMEOUT
    # (si l'altra placa no respon, retorna 0 en lloc de quedar penjat)
    inici = running_time()
    while running_time() - inici < TIMEOUT_MS:
        m = radio.receive()
        if es_dau(m):
            return int(m)
        sleep(20)
    return 0

def resol_ronda(meu, rival):
    # AMPLIACIO 3: compara els daus i actualitza el marcador
    global punts_meu, punts_rival
    if meu > rival:
        punts_meu = punts_meu + 1
        display.show(Image.HAPPY)
    elif rival > meu:
        punts_rival = punts_rival + 1
        display.show(Image.SAD)
    else:
        display.show(Image.CONFUSED)   # empat: cap punt
    sleep(800)
    display.scroll(str(punts_meu) + "-" + str(punts_rival))
    # partida completa: primer a PUNTS_VICTORIA i es reinicia el marcador
    if punts_meu >= PUNTS_VICTORIA or punts_rival >= PUNTS_VICTORIA:
        if punts_meu > punts_rival:
            display.scroll("GUANYES")
        else:
            display.scroll("PERDS")
        punts_meu = 0
        punts_rival = 0

while True:
    if accelerometer.was_gesture("shake"):
        anima()
        meu = random.randint(1, 6)
        display.show(str(meu))
        tirades = tirades + 1
        radio.send(str(meu))          # AMPLIACIO 3: envia la meva tirada
        sleep(300)
        if dau_rival == 0:
            # el rival encara no havia tirat: l'esperem (amb timeout)
            dau_rival = espera_dau_rival()
        if dau_rival == 0:
            # fita 3: timeout -> ho diem i recuperem el torn
            display.scroll("SENSE RIVAL")
        else:
            resol_ronda(meu, dau_rival)
            dau_rival = 0

    # AMPLIACIO 3: si el rival tira primer, guardem la seva tirada
    missatge = radio.receive()
    if es_dau(missatge):
        dau_rival = int(missatge)
        display.scroll("R" + missatge)

    # AMPLIACIO 2: mostra el recompte de tirades amb el boto A
    if button_a.was_pressed():
        display.scroll("T" + str(tirades))

    # marcador de la partida amb el boto B
    if button_b.was_pressed():
        display.scroll(str(punts_meu) + "-" + str(punts_rival))

    sleep(50)
