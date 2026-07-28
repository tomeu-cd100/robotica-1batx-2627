# Codi de referencia del Projecte T3 - Rover autonom (NOMES DOCENT)
# Telemetria (SA8): la micro:bit del pis superior del rover emet l'estat
# per radio, seguint el mateix patro que 01_telemetria_emissor.py de SA8.
# NOTA IMPORTANT: el receptor 02_telemetria_receptor.py de SA8 mostra el
# missatge complet per pantalla i serie, pero la seva alerta de llindar
# (LLINDAR_TEMP=28 comparant T:valor) NO aplica a aquest format X/Y/XOCS.
# Si es vol que el receptor detecti xocs, modificar-lo per llegir XOCS
# (en lloc de T) i comparar amb un llindar adequat.
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
