# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase micro:bit (SA5-SA6): RECEPTOR (la micro:bit del brac, al Micro:shield).
# Rep ordres per radio i mou els 3 servos (P0 base, P1 colze, P2 pinca).
# Sensor de col.lisio a P8: aturada d'emergencia com a la fase Arduino.
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la placa.

from microbit import *
import radio

GRUP = 10       # el MATEIX numero que el comandament
PAS = 3         # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (anoteu els reals del vostre brac)
BASE_MIN, BASE_MAX = 10, 170
COLZE_MIN, COLZE_MAX = 20, 160
PINCA_TANCADA, PINCA_OBERTA = 40, 120

def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)

def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))

radio.on()
radio.config(group=GRUP)

base = 90
colze = 90
pinca = PINCA_TANCADA
mou(pin0, base)
mou(pin1, colze)
mou(pin2, pinca)

emergencia = False

while True:
    # Sensor de col.lisio (KS0021): 0 = xoc -> emergencia
    if pin8.read_digital() == 0:
        emergencia = True
        display.show(Image.NO)
    elif emergencia:
        # Rearmament: alliberat i prem el boto A de la placa del brac
        if button_a.was_pressed():
            emergencia = False
            display.show(Image.YES)

    ordre = radio.receive()
    if ordre is not None and not emergencia:
        if ordre == "B+":
            base = min(base + PAS, BASE_MAX)
            mou(pin0, base)
        elif ordre == "B-":
            base = max(base - PAS, BASE_MIN)
            mou(pin0, base)
        elif ordre == "C+":
            colze = min(colze + PAS, COLZE_MAX)
            mou(pin1, colze)
        elif ordre == "C-":
            colze = max(colze - PAS, COLZE_MIN)
            mou(pin1, colze)
        elif ordre == "P":
            pinca = PINCA_OBERTA if pinca == PINCA_TANCADA else PINCA_TANCADA
            mou(pin2, pinca)
        display.show(Image.DIAMOND_SMALL)
    sleep(20)
