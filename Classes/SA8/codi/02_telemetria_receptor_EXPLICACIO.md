# Pràctica 2 · Telemetria, el receptor: rebre, interpretar i registrar

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `02_telemetria_receptor.py` · **Muntatge:** [connexions i entorn](../SA8_connexions.md)

## 🎯 Per què fem aquesta pràctica

L'[emissora](01_telemetria_emissor.py) llança dades a l'aire cada 2 segons; sense ningú que les escolti, es perden. Aquesta és l'altra meitat de la telemetria: la placa que **rep, interpreta i registra**. I és la meitat que converteix la gràcia en **utilitat**, perquè hi passen dues coses noves:

- El missatge rebut és **text** (`"T:23;L:120"`): cal **desmuntar-lo** — separar etiquetes i valors, i tornar a convertir el text en números. És el mateix protocol que va decidir l'emissora, llegit del revés.
- Les dades es **registren pel port sèrie** cap a l'ordinador: d'aquí en trauràs la taula i el **gràfic** per al quadern. Sense registre no hi ha dades; sense dades, no hi ha res a analitzar (ni IA possible, com veuràs a la S3).

Aquesta placa queda connectada per **USB** a l'ordinador: fa de pont entre la ràdio i el full de càlcul.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: què mostrarà la pantalla si arriba `"T:31;L:80"`? I si arriba `"hola"`? I què veuràs al monitor sèrie? Apunta la predicció a l'Activitat 1 de la [fitxa](../SA8_fitxa_alumnat.md) i comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — La mateixa sintonia (i un llindar)

```python
radio.on()
radio.config(group=10)   # emissor i receptor han de compartir group

LLINDAR_TEMP = 28   # alerta si la temperatura supera aquest valor
```

Les mateixes dues línies de ràdio que a l'emissora, amb el **mateix `group`** — si no coincideixen, aquí no arribarà mai res. La constant `LLINDAR_TEMP` prepara la part de **decisió**: rebre dades està bé, però un sistema útil hi **reacciona**.

### Bloc 2 — Rebre sense aturar-se

```python
while True:
    missatge = radio.receive()
    if missatge is not None:
```

`radio.receive()` **no espera**: mira la bústia i torna de seguida — el missatge si n'hi ha un, o `None` si no ha arribat res. Per això cal l'`if missatge is not None:`: la majoria de voltes del bucle no hi ha res de nou, i el programa simplement continua. Compara-ho amb el `delay()` que bloquejava l'Arduino: aquí el bucle sempre està despert.

### Bloc 3 — Registrar pel port sèrie

```python
        print(missatge)               # apareix al REPL / monitor serie
```

Una sola línia, però és **el registre**: cada `print()` viatja per l'USB i apareix al monitor sèrie de l'editor. D'allà pots copiar totes les lectures a un full de càlcul i fer-ne el **gràfic** del quadern. També és la teva eina de **depuració** número u: si al sèrie no hi surt res, el problema és de ràdio (group? emissora engegada?); si hi surt però mal format, el problema és del protocol.

### Bloc 4 — Interpretar l'etiqueta i decidir

```python
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
```

El desmuntatge del protocol, pas a pas: `split(";")` parteix el missatge en trossos (`["T:23", "L:120"]`); `split(":")` separa l'etiqueta del valor; i `int(...)` torna a convertir el text `"23"` en el número `23` (el viatge invers de l'`str()` de l'emissora). Amb el número ja es pot **decidir**: la regla del llindar mostra `NO` si fa massa calor i `YES` si tot va bé.

I el `try/except`? És l'assegurança: si un dia arriba un missatge estrany (mal etiquetat, d'un altre equip, tallat), el `int()` o l'índex petarien — amb el `try`, en lloc de morir, el programa mostra `CONFUSED` i **continua escoltant**. La telemetria real ha de sobreviure a dades dolentes.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Pantalla en blanc, no arriba mai res | `group` diferent del de l'emissora, o l'emissora no està engegada (li parpelleja la fletxa?). |
| Sempre surt la cara `CONFUSED` | El missatge no té el format esperat: l'emissora envia sense etiqueta o amb un altre separador. |
| Al monitor sèrie no hi veig res | Monitor no obert o placa equivocada: obre el REPL/monitor de la placa **receptora** (la de l'USB). |
| Sempre `YES` (o sempre `NO`) | Llindar mal triat: mira els valors reals que arriben pel sèrie i ajusta `LLINDAR_TEMP`. |

## 🔗 On ho aplicaràs

- **Ara mateix:** amb l'[emissora](01_telemetria_emissor.py) a l'altra placa, tanca la parella i **registra una estona de dades** per a la mostra del quadern.
- **Repte de la S1:** l'alerta per llindar ja la tens muntada — fes-la teva (una altra magnitud, un altre avís) o gestiona també la segona dada (`L:`).
- **Repte «a full en blanc»:** una de les dues meitats de la telemetria l'escriuràs des de l'editor buit; entendre aquest desmuntatge del protocol és tenir-ne mig camí fet.
- **Cap al rover:** la **base** del rover del trimestre és aquest programa amb pantalla OLED: rep la telemetria del rover i la mostra.
