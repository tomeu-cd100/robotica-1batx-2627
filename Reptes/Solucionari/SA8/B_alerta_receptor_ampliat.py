# Solucionari Repte SA8-B · Sistema d'alerta - RECEPTOR (AMPLIAT)
# AMPLIACIO 1: icones segons el nivell.
# AMPLIACIO 2: separa id i valor del missatge i els mostra PER SEPARAT
#   al serie; envia confirmacio (ACK) a l'emissor.
# AMPLIACIO 3: xarxa de TRES emissors (S1, S2, S3) sense barrejar dades:
#   una COLUMNA per emissor al serie (format CSV) i deteccio d'emissors
#   MUTS: si un calla mes de TIMEOUT_MS, es marca al serie i al display.
# Format del missatge: "S1:GREU:31" (id : nivell : valor)
# NOTA: cada equip, un group propi.

from microbit import *
import radio
import music

radio.on()
radio.config(group=10)

EMISSORS = ["S1", "S2", "S3"]   # AMPLIACIO 3: emissors coneguts de la xarxa
TIMEOUT_MS = 10000              # emissor mut si calla mes de 10 s (envien cada 1 s)

ultim_valor = {}   # ultim valor rebut de cada emissor
ultim_temps = {}   # running_time() de l'ultim missatge de cada emissor
mut = {}           # ja esta marcat com a mut?
for e in EMISSORS:
    ultim_valor[e] = "-"
    ultim_temps[e] = -1        # -1 = encara no ha enviat mai
    mut[e] = False

# AMPLIACIO 3: capcalera CSV, una columna per emissor (res no es barreja)
print("t_ms,S1,S2,S3")

while True:
    missatge = radio.receive()
    if missatge is not None:
        try:
            id_emissor, nivell, valor = missatge.split(":")
            # AMPLIACIO 2: id i valor separats, cadascun al seu camp
            print("id=" + id_emissor + "  nivell=" + nivell + "  valor=" + valor)
            if id_emissor in ultim_valor:
                ultim_valor[id_emissor] = valor
                ultim_temps[id_emissor] = running_time()
                mut[id_emissor] = False   # torna a parlar: ja no es mut
            # AMPLIACIO 3: fila CSV amb cada emissor a la SEVA columna
            print(str(running_time()) + "," + ultim_valor["S1"] + ","
                  + ultim_valor["S2"] + "," + ultim_valor["S3"])
            # AMPLIACIO 1: icona segons el nivell
            if nivell == "GREU":
                display.show(Image.SKULL)
                music.play(music.BA_DING)
            elif nivell == "AVIS":
                display.show(Image.NO)
            else:
                display.show(Image.YES)   # OK periodic dels emissors
            # AMPLIACIO 2: confirma la recepcio (ACK)
            radio.send("ACK:" + id_emissor)
        except:
            display.show(Image.CONFUSED)

    # AMPLIACIO 3: detecta emissors que CALLEN massa estona
    for e in EMISSORS:
        if ultim_temps[e] >= 0 and not mut[e]:
            if running_time() - ultim_temps[e] > TIMEOUT_MS:
                mut[e] = True   # marca'l (nomes avisa un cop fins que torni)
                print("MUT: " + e + " fa mes de " + str(TIMEOUT_MS)
                      + " ms que no envia")
                display.scroll(e + "?")
    sleep(50)
