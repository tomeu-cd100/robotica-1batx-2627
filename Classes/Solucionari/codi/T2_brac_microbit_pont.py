# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase SA5-SA6: PONT (la micro:bit que viu al costat del brac).
# No mou cap servo: rep les ordres del comandament per radio i les passa a
# l'Arduino del brac per un cable (serie). Els seus botons son els botons
# d'estat del brac: A envia "A" (repos/manual i rearmament), B envia "R"
# (reprodueix la seguencia gravada).
# Cablatge: P1 -> D0 (RX) de l'UNO, i GND comu. Res mes.
# ATENCIO: el cable va NOMES de la micro:bit cap a l'UNO (mai al reves:
# els 5 V de l'UNO cremarien la micro:bit).
# ATENCIO: despres d'uart.init() la micro:bit ja no parla per l'USB (no
# veureu prints). Per tornar-la a programar, n'hi ha prou de flashejar.

from microbit import *
import radio

GRUP = 10   # el MATEIX numero que el comandament (el teu numero de llista)

radio.on()
radio.config(group=GRUP)
uart.init(baudrate=9600, tx=pin1, rx=pin2)

display.show(Image.ARROW_W)   # fletxa cap al brac: "estic passant ordres"

while True:
    ordre = radio.receive()
    if ordre:
        # Cada ordre acaba en salt de linia: l'Arduino sap on acaba
        uart.write(ordre + "\n")

    if button_a.was_pressed():
        uart.write("A\n")
        display.show("A")
        sleep(200)
        display.show(Image.ARROW_W)
    elif button_b.was_pressed():
        uart.write("R\n")
        display.show("R")
        sleep(200)
        display.show(Image.ARROW_W)

    sleep(10)
