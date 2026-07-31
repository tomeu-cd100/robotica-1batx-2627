# Pràctica 1 · Telemetria, l'emissor: mesurar aquí, enviar allà

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_telemetria_emissor.py` · **Muntatge:** [connexions i entorn](../SA8_connexions.md)

## 🎯 Per què fem aquesta pràctica

A la SA5 vas fer servir la ràdio de la micro:bit per enviar **missatges** («HOLA», un cor). Aquí la ràdio puja de nivell: envia **dades de sensors**. Mesurar en un lloc i transmetre-ho a un altre té nom — **telemetria** — i és la base de tot l'IoT: l'estació meteorològica del terrat, la polsera esportiva, el rover a Mart… i el **teu rover del trimestre**, que enviarà dades a la base.

La telemetria sempre són **dues meitats**: una placa que **mesura i envia** (aquesta) i una que **rep i registra** (la [receptora](02_telemetria_receptor.py)). Cada meitat té el seu programa; aquí escrivim l'emissor. La decisió important del dia: les dades no s'envien «nues», s'envien **etiquetades** (`"T:23"`), perquè qui les rep sàpiga *què* està rebent.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense carregar-lo**. Què veuràs a la pantalla de l'emissora? Cada quant enviarà? I la pregunta clau: si la receptora té un `group` **diferent**, què li arribarà? Escriu la predicció a l'Activitat 1 de la [fitxa](../SA8_fitxa_alumnat.md) i després comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — Engegar la ràdio i sintonitzar el canal

```python
radio.on()
radio.config(group=10)   # emissor i receptor han de compartir group
```

Les dues línies que preparen la ràdio (les de la targeta de repàs de la SA5): primer **engegar-la** (`radio.on()`, sempre abans de res) i després **triar el canal**. El `group` és com sintonitzar una emissora: emissor i receptor només es «senten» si tenen **exactament el mateix número**. I al revés: si cada equip de l'aula tria un `group` **diferent** (el número de la taula, per exemple), ningú no interfereix ningú.

### Bloc 2 — Mesurar: els sensors de la placa

```python
    t = temperature()                 # graus C aprox.
    llum = display.read_light_level()  # 0..255
```

Dues magnituds amb sensors **integrats** a la micro:bit: la temperatura (aproximada, del xip) i la llum (la mateixa pantalla de LED fa de sensor, 0–255). Fixa't que cada mesura es guarda en una **variable**: la necessitem al pas següent per empaquetar-la.

### Bloc 3 — Enviar la dada etiquetada

```python
    # Enviem dues magnituds etiquetades, separades per ;
    radio.send("T:" + str(t) + ";L:" + str(llum))
```

La línia clau de la pràctica, amb dues idees dins:

- `radio.send()` només accepta **text**. El número `23` s'ha de convertir amb `str(t)` abans de concatenar-lo; si envies el número directament, error.
- **L'etiqueta**: en lloc d'enviar `"23"` pelat, enviem `"T:23;L:120"` — cada valor amb la seva etiqueta (`T:` temperatura, `L:` llum) i separats per `;`. Sense etiquetes, la receptora rebria `"23120"`… i no sabria on acaba una dada i on comença l'altra. **Etiquetar les dades** és el que fa possible separar-les després amb `split()`.

### Bloc 4 — Indicador i ritme

```python
    display.show(Image.ARROW_N)        # indicador d'enviament
    sleep(2000)                        # cada 2 segons
```

La fletxa és un **indicador visual**: et diu que l'emissora és viva i enviant (molt útil per saber quina meitat falla quan res no arriba). El `sleep(2000)` fixa el **ritme**: una mesura cada 2 segons. Vols més resolució al gràfic de després? Abaixa'l. Vols estalviar bateria? Apuja'l.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La receptora no rep mai res | `group` **diferent** a cada placa: el mateix número a `radio.config(group=...)` de totes dues. |
| Error en executar `radio.send(...)` | Envies un **número**: converteix-lo a text amb `str(...)`. O falta `radio.on()` abans. |
| Les dades arriben barrejades o inservibles | Enviades **sense etiqueta**: posa `"T:"`, `"L:"`… i un separador (`;`). |
| Tots els equips reben dades de tothom | Tota l'aula amb el mateix `group`: cada equip el seu número. |

## 🧗 Si t'encalles: l'esquelet de l'emissor

Si no et surt ni la primera dada, no et quedis en blanc: parteix d'aquest esquelet. El patró difícil ja està muntat (la ràdio engegada, el `group` configurat i el bucle); tu només omples els `# TODO:` — mesurar el sensor i enviar la dada etiquetada. Tal qual ja s'executa (la fletxa apareix cada 2 segons), però no envia res útil fins que omplis els TODO.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```python
# SA8 - emissor de telemetria (esquelet per comencar)
#
# El patro dificil ja esta muntat: la radio engegada, el group configurat
# i el bucle while True:. Tu nomes has d'OMPLIR els # TODO: mesurar el
# sensor i enviar la dada ETIQUETADA (per exemple "T:23") per radio.
#
# Recorda: la placa RECEPTORA ha de tenir EXACTAMENT el mateix group.

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
```

</details>

## 🔗 On ho aplicaràs

- **Ara mateix:** aquesta és la meitat que **parla**; sense l'altra no veus res. Carrega la [receptora](02_telemetria_receptor.py) a la segona placa (mateix `group`!) i tanca el circuit.
- **Repte de la S1:** tria les **teves** magnituds i el teu ritme; i si vas fort, que la receptora doni una **alerta per llindar**.
- **Després del primer intent:** compara el teu raonament amb l'[exemple resolt](../SA8_exemple_resolt.md) (el sensor de moviment sense fils), el **bessó comentat** d'aquesta parella de pràctiques — mateix esquema emissor/receptor, una altra magnitud.
- **Cap al rover:** la micro:bit del **rover del trimestre** és exactament aquest programa amb altres sensors — mesura a bord i envia a la base.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA8](../../../Reptes/Reptes_SA8.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).
