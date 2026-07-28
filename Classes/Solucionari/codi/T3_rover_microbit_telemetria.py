# Codi de referencia del Projecte T3 - Rover autonom (NOMES DOCENT)
# Telemetria (SA8): la micro:bit del pis superior del rover emet l'estat
# per radio, seguint el mateix patro que 01_telemetria_emissor.py de SA8.
# El receptor es el mateix 02_telemetria_receptor.py de SA8 (a l'ordinador
# del docent o en una segona placa).
# Nota: la pantalla OLED KS0271 del kit queda com a ampliacio pendent de
# validar amb el maquinari real (setembre); mentrestant, display 5x5 + serie.

from microbit import *
import radio

GRUP = 10   # CANVIA'L pel numero de la vostra parella

radio.on()
radio.config(group=GRUP)

comptador_xocs = 0

while True:
    # La micro:bit va muntada al rover: l'accelerometre detecta sotracs
    # (xoc o frenada brusca) i el moviment general.
    if accelerometer.was_gesture("shake"):
        comptador_xocs += 1
        display.show(Image.SURPRISED)
    else:
        display.show(Image.HAPPY)

    x = accelerometer.get_x()
    y = accelerometer.get_y()

    # Mateix format de missatge que SA8: "CLAU:valor;CLAU:valor"
    missatge = "X:" + str(x) + ";Y:" + str(y) + ";XOCS:" + str(comptador_xocs)
    radio.send(missatge)
    print(missatge)   # tambe pel port serie, per registrar-ho a l'ordinador

    sleep(500)   # 2 enviaments per segon: suficient per a telemetria
