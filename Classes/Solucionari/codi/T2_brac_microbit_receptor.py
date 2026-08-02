# Codi de referencia del Projecte T2 - Brac robotic (NOMES DOCENT)
# Fase micro:bit (SA5-SA6): RECEPTOR (la micro:bit del brac, al Micro:shield).
# Rep ordres per radio i mou els 3 servos (P0 base, P1 colze, P2 pinca).
# Sensor de col.lisio a P8: aturada d'emergencia com a la fase Arduino.
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la placa.
#
# MAQUINA D'ESTATS (l'aportacio de la SA6 al brac), 4 estats:
#   REPOS      - quiet, esperant; el boto A del brac passa a MANUAL
#   MANUAL     - obeeix les ordres de radio del comandament
#   REPLAY     - reprodueix sol la seguencia gravada
#   EMERGENCIA - el sensor de col.lisio ha detectat un xoc: no mou res
# Es el mateix patro d'enum + switch de 03_maquina_estats.ino de la SA6,
# escrit amb les eines que tenim a MicroPython: constants de text per als
# estats i una cadena if/elif que fa de switch. Vegeu la taula de traduccio
# al dossier del brac.

from microbit import *
import radio

GRUP = 10       # el MATEIX numero que el comandament
PAS = 3         # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (anoteu els reals del vostre brac)
BASE_MIN, BASE_MAX = 10, 170
COLZE_MIN, COLZE_MAX = 20, 160
PINCA_TANCADA, PINCA_OBERTA = 40, 120

# Els quatre estats. A C++ serien un enum; aqui, text (facil de mostrar).
REPOS = "REPOS"
MANUAL = "MANUAL"
REPLAY = "REPLAY"
EMERGENCIA = "EMERGENCIA"

MAX_PASSOS = 30      # quants punts es poden gravar
PAUSA_REPLAY = 400   # ms entre punts en reproduir


def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)


def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))


def aplica():
    # Envia als 3 servos la posicio actual del brac
    mou(pin0, base)
    mou(pin1, colze)
    mou(pin2, pinca)


def canvia_estat(nou):
    # Un sol lloc per canviar d'estat: aixi el feedback visual mai no menteix
    global estat
    estat = nou
    if nou == REPOS:
        display.show(Image.ASLEEP)
    elif nou == MANUAL:
        display.show(Image.DIAMOND_SMALL)
    elif nou == REPLAY:
        display.show(Image.ARROW_E)
    else:
        display.show(Image.NO)


radio.on()
radio.config(group=GRUP)

base = 90
colze = 90
pinca = PINCA_TANCADA
aplica()

seguencia = []       # punts gravats: (base, colze, pinca)
estat = REPOS
canvia_estat(REPOS)

while True:
    # --- Transicio prioritaria: el xoc mana per damunt de tot ---
    if pin8.read_digital() == 0 and estat != EMERGENCIA:
        canvia_estat(EMERGENCIA)

    ordre = radio.receive()

    # --- Un bloc per estat (el "switch" de la SA6) ---
    if estat == EMERGENCIA:
        # Nomes se'n surt rearmant a ma: alliberat el sensor i boto A
        if pin8.read_digital() == 1 and button_a.was_pressed():
            canvia_estat(REPOS)

    elif estat == REPOS:
        # Quiet. El boto A desperta el brac; el B reprodueix el que hi ha gravat
        if button_a.was_pressed():
            canvia_estat(MANUAL)
        elif button_b.was_pressed() and len(seguencia) > 0:
            canvia_estat(REPLAY)

    elif estat == MANUAL:
        # Els botons es miren a part de les ordres: si estiguessin a la
        # mateixa cadena elif, una ordre de radio els taparia.
        if button_a.was_pressed():
            canvia_estat(REPOS)
        elif button_b.was_pressed() and len(seguencia) > 0:
            canvia_estat(REPLAY)
        elif ordre == "B+":
            base = min(base + PAS, BASE_MAX)
            aplica()
        elif ordre == "B-":
            base = max(base - PAS, BASE_MIN)
            aplica()
        elif ordre == "C+":
            colze = min(colze + PAS, COLZE_MAX)
            aplica()
        elif ordre == "C-":
            colze = max(colze - PAS, COLZE_MIN)
            aplica()
        elif ordre == "P":
            pinca = PINCA_OBERTA if pinca == PINCA_TANCADA else PINCA_TANCADA
            aplica()
        elif ordre == "G" and len(seguencia) < MAX_PASSOS:
            # Grava el punt actual (el "registre" de la fase Arduino)
            seguencia.append((base, colze, pinca))
            display.show(str(len(seguencia) % 10))
            sleep(300)
            display.show(Image.DIAMOND_SMALL)

    elif estat == REPLAY:
        # Reprodueix la seguencia gravada, vigilant el xoc a cada punt
        for punt in seguencia:
            if pin8.read_digital() == 0:
                canvia_estat(EMERGENCIA)
                break
            base, colze, pinca = punt
            aplica()
            sleep(PAUSA_REPLAY)
        if estat == REPLAY:      # ha acabat sense incidents
            canvia_estat(REPOS)

    sleep(20)
