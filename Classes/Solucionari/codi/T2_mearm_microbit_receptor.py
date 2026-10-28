# Codi de referencia del brac MeArm V1.1 (EN PROVA) - VERSIO MICRO:BIT
# RECEPTOR: la micro:bit del brac, endollada al Micro:shield. Rep les ordres
# del COMANDAMENT (T2_mearm_microbit_comandament.py) i mou els 4 servos:
#   P0 base · P1 dret · P2 pinca · P8 esquerre (el servo nou del MeArm)
# ATENCIO: cal una micro:bit V2. La V1 no pot generar senyal de servo a 4
# pins alhora (en te prou per a 3).
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la
# placa ni l'USB.
# En arrencar posa els 4 servos a 90 graus: serveix de "pas 0" de la guia.

from microbit import *
import radio

GRUP = 10   # el MATEIX numero que el comandament
PAS = 3     # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (els que heu anotat al bloc D)
BASE_MIN, BASE_MAX = 0, 180
ESQUERRE_MIN, ESQUERRE_MAX = 40, 150
DRET_MIN, DRET_MAX = 40, 150
PINCA_TANCADA, PINCA_OBERTA = 60, 120


def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)


def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))


def limita(valor, minim, maxim):
    # Mai fora del rang segur: un servo que forca el topall es crema
    return max(minim, min(valor, maxim))


radio.on()
radio.config(group=GRUP)

base = 90
esquerre = 90
dret = 90
pinca = 90
mou(pin0, base)
mou(pin8, esquerre)
mou(pin1, dret)
mou(pin2, pinca)
display.show(Image.YES)

while True:
    ordre = radio.receive()

    if ordre == "B+":
        base = limita(base + PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "B-":
        base = limita(base - PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "D+":
        dret = limita(dret + PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "D-":
        dret = limita(dret - PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "E+":
        esquerre = limita(esquerre + PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "E-":
        esquerre = limita(esquerre - PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "P":
        # Commutador: si esta oberta, la tanca; si no, l'obre
        if pinca == PINCA_OBERTA:
            pinca = PINCA_TANCADA
        else:
            pinca = PINCA_OBERTA
        mou(pin2, pinca)

    sleep(10)
