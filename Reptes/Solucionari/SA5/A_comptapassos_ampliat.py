# Solucionari Repte SA5-A · Comptapassos personal (AMPLIAT)
# AMPLIACIO 1: reinicia el comptador amb el boto B.
# AMPLIACIO 2: objectiu de passes; mostra una icona en assolir-lo.
# AMPLIACIO 3: barra de progres per columnes (0-5) cap a l'objectiu,
#              redibuixada NOMES quan canvia (sense parpelleig).

from microbit import *

passes = 0
LLINDAR = 1500
OBJECTIU = 20
ultima_barra = -1   # AMPLIACIO 3: ultimes columnes pintades (-1 = cap, forca redibuix)

def columnes_progres(actual, total):
    # AMPLIACIO 3 (fita 2): converteix passes -> columnes enceses (0..5).
    # Cada columna sencera representa 1/5 de l'objectiu.
    # Prova-la amb valors fixos abans de connectar-la al comptador:
    #   columnes_progres(0, 20) = 0 ; (10, 20) = 2 ; (20, 20) = 5
    return min(5, (actual * 5) // total)

def dibuixa_barra(cols):
    # Encen les primeres 'cols' columnes senceres de la pantalla
    fila = ""
    for col in range(5):
        fila += "9" if col < cols else "0"
    display.show(Image(":".join([fila] * 5)))

while True:
    forca = accelerometer.get_strength()
    if forca > LLINDAR:
        passes = passes + 1
        sleep(300)

    # Fita 1: mostra el total com a NOMBRE amb el boto A
    if button_a.was_pressed():
        display.scroll(str(passes))
        ultima_barra = -1   # despres del scroll cal repintar la barra

    # AMPLIACIO 1: reset amb boto B
    if button_b.was_pressed():
        passes = 0
        display.scroll("0")
        ultima_barra = -1

    if passes >= OBJECTIU:
        # AMPLIACIO 2: objectiu assolit -> icona (nomes es pinta un cop)
        if ultima_barra != 6:
            display.show(Image.HAPPY)
            ultima_barra = 6   # valor especial: icona ja pintada
    else:
        # AMPLIACIO 3 (fita 3): nomes redibuixa quan canvia el valor
        cols = columnes_progres(passes, OBJECTIU)
        if cols != ultima_barra:
            dibuixa_barra(cols)
            ultima_barra = cols

    sleep(20)
