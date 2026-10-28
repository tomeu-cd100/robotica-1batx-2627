# Solucionari Repte SA5-B · Comandament fi (AMPLIAT)
# AMPLIACIO 1: velocitat PROPORCIONAL: com mes inclines, mes ordres per segon.
# AMPLIACIO 2: CALIBRATGE en engegar: la postura de repos de la ma es el zero.
# AMPLIACIO 3: la pantalla mostra la intensitat (una barra d'1 a 5 LED).

from microbit import *
import radio

GRUP = 10
ZONA_MORTA = 250
MAXIM = 1000          # inclinacio a partir de la qual ja es va a tope

radio.on()
radio.config(group=GRUP)

# AMPLIACIO 2: 20 mesures en repos i en fem la mitjana
display.scroll("CAL")
sx = 0
sy = 0
for i in range(20):
    sx = sx + accelerometer.get_x()
    sy = sy + accelerometer.get_y()
    sleep(20)
zero_x = sx // 20
zero_y = sy // 20
display.show(Image.YES)
sleep(500)


def barra(n):
    # AMPLIACIO 3: n LED encesos a la fila del mig (1-5)
    display.clear()
    for col in range(n):
        display.set_pixel(col, 2, 9)


while True:
    x = accelerometer.get_x() - zero_x
    y = accelerometer.get_y() - zero_y
    gran = max(abs(x), abs(y))

    if gran <= ZONA_MORTA:
        display.show(Image.DIAMOND_SMALL)
        sleep(100)
        continue

    if abs(x) >= abs(y):
        ordre = "B+" if x > 0 else "B-"
    else:
        ordre = "D-" if y < 0 else "D+"
    radio.send(ordre)

    # AMPLIACIO 1: pausa de 400 ms (poca inclinacio) a 80 ms (molta)
    g = min(gran, MAXIM)
    pausa = 400 - (g - ZONA_MORTA) * 320 // (MAXIM - ZONA_MORTA)
    barra(1 + (g - ZONA_MORTA) * 4 // (MAXIM - ZONA_MORTA))
    sleep(pausa)
