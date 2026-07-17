# Solucionari Repte SA8-C · Control per gestos amb ML EDUCATIU (AMPLIAT)
# AMPLIACIO 1: tres gestos (tres classes), cadascun amb la seva icona.
# AMPLIACIO 2: la prediccio s'envia per radio (comandament gestual).
# AMPLIACIO 3: model ENTRENAT amb dades propies -> classificador de
#   CENTROIDES (nearest centroid). AIXO es aprendre dels exemples: els
#   parametres del model (els centroides) NO estan escrits al codi,
#   SURTEN de les mostres que reculls. Amb altres dades, altre model.
#
# Fites del repte:
#   1. Dataset PROPI: minim 20 mostres per classe (el comptador ho vigila).
#      Anota al quadern les condicions de recollida (qui, com, on).
#   2. Prova amb mostres NOVES: un cop entrenat, fes gestos que el model
#      no ha vist en entrenar i comprova si els encerta.
#   3. Prova de BIAIX: que una ALTRA persona (o altres condicions: ma
#      esquerra, dret/assegut...) faci els gestos en mode classificacio,
#      i analitza al quadern per que falla o aguanta.
#
# Us:
#   - Boto B: canvia la classe activa (0, 1, 2).
#   - Boto A: captura UNA mostra (1 segon fent el gest) de la classe activa.
#   - A+B alhora (amb 20+ mostres per classe): entrena i passa a classificar.
# Exemple de gestos: 0 = quiet pla, 1 = sacseig, 2 = inclinat de costat.
# NOTA memoria: guardem SUMES acumulades per classe, NO totes les mostres
# (el micro:bit te poca RAM i amb les sumes n'hi ha prou per fer mitjanes).
# NOTA: cada equip, un group propi.

from microbit import *
import math
import radio

radio.on()
radio.config(group=10)

N_CLASSES = 3
MOSTRES_MIN = 20                # fita 1: minim de mostres per classe
N_FEAT = 4                      # trets: mitjana |x|, |y|, |z| i moviment
ICONES = [Image.SQUARE, Image.HEART, Image.DIAMOND]

# Sumes acumulades de cada classe (aixo es tot el "dataset" que cal guardar)
sumes = [[0.0] * N_FEAT for _ in range(N_CLASSES)]
comptes = [0] * N_CLASSES
centroides = None               # parametres del model: s'APRENEN en entrenar


def captura_mostra():
    # Resumeix 1 segon de gest en un vector de N_FEAT trets:
    # mitjanes de |x|, |y|, |z| (posicio/inclinacio) i "moviment"
    # (com canvia la magnitud entre lectures: distingeix sacsejar de quiet)
    n = 25
    sx = 0.0
    sy = 0.0
    sz = 0.0
    mov = 0.0
    mag_ant = None
    for _ in range(n):
        x = accelerometer.get_x()
        y = accelerometer.get_y()
        z = accelerometer.get_z()
        sx += abs(x)
        sy += abs(y)
        sz += abs(z)
        mag = math.sqrt(x * x + y * y + z * z)
        if mag_ant is not None:
            mov += abs(mag - mag_ant)
        mag_ant = mag
        sleep(40)
    return [sx / n, sy / n, sz / n, mov / (n - 1)]


def entrena():
    # ENTRENAMENT: el centroide de cada classe = MITJANA de les seves
    # mostres. Aquests numeros son els parametres APRESOS de les dades.
    global centroides
    centroides = []
    for c in range(N_CLASSES):
        centroides.append([s / comptes[c] for s in sumes[c]])
    print("Model entrenat. Centroides (parametres apresos de les dades):")
    for c in range(N_CLASSES):
        print("classe", c, centroides[c])


def dist(a, b):
    # Distancia euclidiana entre dos vectors de trets
    s = 0.0
    for i in range(N_FEAT):
        s += (a[i] - b[i]) ** 2
    return math.sqrt(s)


def classifica(mostra):
    # CLASSIFICACIO: la classe del centroide MES PROPER a la mostra
    millor = 0
    millor_d = dist(mostra, centroides[0])
    for c in range(1, N_CLASSES):
        d = dist(mostra, centroides[c])
        if d < millor_d:
            millor_d = d
            millor = c
    return millor


classe_activa = 0
display.show(str(classe_activa))

while True:
    if centroides is None:
        # ---- MODE RECOLLIDA (fita 1: dataset propi i etiquetat) ----
        if button_a.is_pressed() and button_b.is_pressed():
            sleep(300)
            button_a.was_pressed()   # buida les pulsacions pendents
            button_b.was_pressed()
            if min(comptes) >= MOSTRES_MIN:
                entrena()
                display.show(Image.YES)
                sleep(500)
            else:
                display.show(Image.NO)   # encara falten mostres
                sleep(500)
                display.show(str(classe_activa))
        elif button_b.was_pressed():
            classe_activa = (classe_activa + 1) % N_CLASSES
            display.show(str(classe_activa))
        elif button_a.was_pressed():
            display.show(ICONES[classe_activa])   # fes el gest ARA (1 segon)
            mostra = captura_mostra()
            for i in range(N_FEAT):
                sumes[classe_activa][i] += mostra[i]
            comptes[classe_activa] += 1
            # comptador al display i registre al serie (fins a 20 per classe)
            print("classe", classe_activa, "mostra num", comptes[classe_activa],
                  mostra)
            display.scroll(str(comptes[classe_activa]), delay=60)
            display.show(str(classe_activa))
    else:
        # ---- MODE CLASSIFICACIO (fites 2 i 3: mostres noves i biaix) ----
        mostra = captura_mostra()
        c = classifica(mostra)
        print("prediccio:", c, mostra)
        display.show(ICONES[c])
        # AMPLIACIO 2: envia l'ordre a l'altre dispositiu
        radio.send(str(c))
    sleep(50)
