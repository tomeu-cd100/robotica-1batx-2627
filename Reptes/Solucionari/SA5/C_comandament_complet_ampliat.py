# Solucionari Repte SA5-C · Comandament complet amb gravacio (AMPLIAT)
# AMPLIACIO 1: compta els punts gravats (G) i els mostra; maxim 30, com el brac.
# AMPLIACIO 2: el PONT amb botons d'estat: A envia "A" i B envia "R"
#              (prepara la maquina d'estats de la SA6). Vegeu la funcio pont().
# AMPLIACIO 3: MODE LENT amb el logo tactil (micro:bit V2): ordres cada
#              300 ms en lloc de 100 ms, per a moviments fins.
# Aquest fitxer conte els dos programes: flasheja'l al comandament amb
# ES_PONT = False i al pont amb ES_PONT = True.

from microbit import *
import radio

ES_PONT = False
GRUP = 10
LLINDAR = 300
MAX_PUNTS = 30

radio.on()
radio.config(group=GRUP)


def pont():
    # AMPLIACIO 2: passa les ordres a l'Arduino i hi afegeix els botons d'estat
    uart.init(baudrate=9600, tx=pin1, rx=pin2)
    display.show(Image.ARROW_W)
    while True:
        ordre = radio.receive()
        if ordre:
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


def comandament():
    punts = 0
    lent = False
    pinca_enviada = False
    while True:
        if pin_logo.is_touched():                # AMPLIACIO 3
            lent = not lent
            display.show("L" if lent else "R")
            sleep(500)

        x = accelerometer.get_x()
        y = accelerometer.get_y()
        if x > LLINDAR:
            radio.send("B+")
        elif x < -LLINDAR:
            radio.send("B-")
        if y > LLINDAR:
            radio.send("D+")
        elif y < -LLINDAR:
            radio.send("D-")

        a = button_a.is_pressed()
        b = button_b.is_pressed()
        if a and b:
            if not pinca_enviada:
                radio.send("P")
                pinca_enviada = True
        else:
            pinca_enviada = False
            if accelerometer.was_gesture("shake"):
                if punts < MAX_PUNTS:            # AMPLIACIO 1
                    radio.send("G")
                    punts = punts + 1
                    display.scroll(str(punts))
                else:
                    display.show(Image.CONFUSED)
                    sleep(300)
            elif a:
                radio.send("E+")
            elif b:
                radio.send("E-")
        display.show(Image.DIAMOND_SMALL)
        sleep(300 if lent else 100)


if ES_PONT:
    pont()
else:
    comandament()
