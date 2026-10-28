# Codi de referencia del Projecte T2 - Brac robotic MeArm (NOMES DOCENT)
# COMANDAMENT: la 2a micro:bit, la que es te a la ma. No mou cap servo:
# envia ordres de text per radio.
#   Inclina esquerra/dreta   -> "B+" / "B-"  base
#   Inclina davant/enrere    -> "D+" / "D-"  servo dret
#   Mantens el boto A        -> "E+"         servo esquerre
#   Mantens el boto B        -> "E-"         servo esquerre
#   A i B alhora             -> "P"          obre/tanca la pinca
#   Sacseja                  -> "G"          grava el punt actual (replay, SA6)
# Pla per defecte: les ordres les rep la micro:bit PONT, que les passa a
# l'Arduino (T2_brac_microbit_pont.py + T2_brac_estats.ino). Els botons A i B
# del PONT (no d'aquesta) canvien d'estat: A repos/manual, B reprodueix.
# Versio micro:bit del MeArm (contingencia): les rep
# T2_mearm_microbit_receptor.py, que ignora la "G".

from microbit import *
import radio

GRUP = 10        # CANVIA'L pel teu numero de llista (les 2 plaques igual)
LLINDAR = 300    # inclinacio minima perque compti (evita moure's sol)

radio.on()
radio.config(group=GRUP)

pinca_enviada = False   # per enviar "P" una sola vegada per cada A+B

while True:
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

    # Es llegeixen els dos botons UNA vegada, a variables
    boto_a = button_a.is_pressed()
    boto_b = button_b.is_pressed()

    if boto_a and boto_b:
        # Si mantens A+B la pinca no ha d'obrir-se i tancar-se sense parar:
        # nomes s'envia la primera volta
        if not pinca_enviada:
            radio.send("P")
            pinca_enviada = True
        display.show(Image.TARGET)
    elif accelerometer.was_gesture("shake"):
        pinca_enviada = False
        # Nomes s'envia l'ordre: qui confirma que el punt s'ha gravat de debo
        # es el BRAC (Monitor serie). Aqui, una fletxa d'"enviat".
        radio.send("G")
        display.show(Image.ARROW_E)
        sleep(300)
    else:
        pinca_enviada = False
        if boto_a:
            radio.send("E+")
            display.show(Image.ARROW_N)
        elif boto_b:
            radio.send("E-")
            display.show(Image.ARROW_S)
        else:
            display.show(Image.DIAMOND_SMALL)

    sleep(100)   # ~10 ordres/s: suficient per a un control suau
