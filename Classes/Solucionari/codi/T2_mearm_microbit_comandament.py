# Codi de referencia del brac MeArm V1.1 (EN PROVA) - VERSIO MICRO:BIT
# COMANDAMENT: la micro:bit que es te a la ma. No mou cap servo: envia
# ordres de text per radio al RECEPTOR (T2_mearm_microbit_receptor.py).
#   Inclina esquerra/dreta   -> "B+" / "B-"  base
#   Inclina davant/enrere    -> "D+" / "D-"  servo dret
#   Mantens el boto A        -> "E+"         servo esquerre
#   Mantens el boto B        -> "E-"         servo esquerre
#   A i B alhora             -> "P"          obre/tanca la pinca

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
