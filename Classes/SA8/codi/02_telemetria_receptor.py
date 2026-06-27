# SA8 - 02_telemetria_receptor.py
# micro:bit RECEPTOR: rep les dades per radio, les mostra i les imprimeix
# pel port serie (print) per poder-les registrar/graficar a l'ordinador.

from microbit import *
import radio

radio.on()
radio.config(group=10)

LLINDAR_TEMP = 28   # alerta si la temperatura supera aquest valor

while True:
    missatge = radio.receive()
    if missatge is not None:
        print(missatge)               # apareix al REPL / monitor serie

        # Separa "T:23;L:120" en parts
        try:
            parts = missatge.split(";")
            t = int(parts[0].split(":")[1])
            # Alerta visual per llindar
            if t > LLINDAR_TEMP:
                display.show(Image.NO)   # massa calor
            else:
                display.show(Image.YES)
        except:
            display.show(Image.CONFUSED)  # missatge inesperat
    sleep(50)
