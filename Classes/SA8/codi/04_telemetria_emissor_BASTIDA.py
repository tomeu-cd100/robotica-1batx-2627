# SA8 - 04_telemetria_emissor_BASTIDA.py  (BASTIDA / esquelet per a l'alumnat)
#
# El patro dificil ja esta muntat: la radio engegada, el group configurat
# i el bucle while True:. Tu nomes has d'OMPLIR els # TODO: mesurar el
# sensor i enviar la dada ETIQUETADA (per exemple "T:23") per radio.
#
# Recorda: la placa RECEPTORA ha de tenir EXACTAMENT el mateix group.
# Quan: S1 - bastida de la telemetria

from microbit import *
import radio

GROUP = 10        # emissor i receptor: MATEIX numero (canvia'l pel de la teva taula)
PERIODE = 2000    # ms entre enviaments (com mes petit el numero, mes sovint envia)

radio.on()                    # SEMPRE primer: engega la radio
radio.config(group=GROUP)     # tria el "canal" comu amb la receptora

while True:
    # TODO 1: mesura el sensor i guarda el valor en una variable.
    #         Ex.: t = temperature()          -> graus C aprox.
    #         Ex.: llum = display.read_light_level()   -> 0..255
    valor = 0     # <-- substitueix aquest 0 per la teva mesura real

    # TODO 2: envia la dada ETIQUETADA per radio (una etiqueta + el valor com a TEXT).
    #         Ex.: radio.send("T:" + str(valor))
    #         Pista: radio.send() nomes accepta TEXT -> converteix el numero amb str(...)
    #         Pista: l'etiqueta ("T:", "L:", ...) permet a la receptora saber QUE rep.
    pass          # <-- esborra aquest pass quan hi posis el teu radio.send(...)

    display.show(Image.ARROW_N)   # indicador visual d'enviament (ja fet, no cal tocar-ho)
    sleep(PERIODE)                # espera abans del proxim enviament (ja fet)
