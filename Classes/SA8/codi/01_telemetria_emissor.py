# SA8 - 01_telemetria_emissor.py
# micro:bit EMISSOR: mesura temperatura i llum i les envia per radio.
# La placa receptora ha de tenir el MATEIX group.

from microbit import *
import radio

radio.on()
radio.config(group=10)   # emissor i receptor han de compartir group
# NOTA: si hi ha mes d'un equip a l'aula, cada equip ha de triar un group
# DIFERENT (p. ex. el numero de la taula) per evitar interferencies de radio.

while True:
    t = temperature()                 # graus C aprox.
    llum = display.read_light_level()  # 0..255

    # Enviem dues magnituds etiquetades, separades per ;
    radio.send("T:" + str(t) + ";L:" + str(llum))

    display.show(Image.ARROW_N)        # indicador d'enviament
    sleep(2000)                        # cada 2 segons
