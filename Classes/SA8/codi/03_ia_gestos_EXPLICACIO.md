# Pràctica 3 · IA de gestos: classificar amb regles fetes a mà

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_ia_gestos.py` · **Muntatge:** [connexions i entorn](../SA8_connexions.md) (només sensors integrats)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../SA8_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

Com pot un sistema «reconèixer» un gest? Aquesta pràctica és el segon graó d'una **escala de tres** que ja has començat a pujar sense saber-ho:

1. **Un llindar** — ja ho saps fer: l'alarma de la SA3, el termòstat de la SA6. *«Si x > 300, alerta»*: un valor, dues classes.
2. **Regles combinades** — el d'avui: **tres valors** (els eixos x, y, z de l'acceleròmetre) i **diverses regles** que, juntes, decideixen entre **vuit gestos**. Les regles encara les escrivim **a mà**.
3. **Aprenentatge automàtic (ML)** — el que ve tot seguit amb Teachable Machine: quan les classes són massa complexes per escriure'n regles (una cara, un so), les regles **s'aprenen dels exemples**.

Fixa-t'hi: **classificar** — decidir una categoria a partir de valors — és el que fa tota IA. La diferència entre el graó 2 i el 3 no és *què* fa el sistema, sinó *d'on surten les regles*: d'una persona o de les dades.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: amb la placa **plana sobre la taula** (pantalla amunt), quant valdran x, y i z aproximadament? *(Pista: la gravetat sempre hi és, i val ~1000 mil·li-g.)* Quin gest dirà el programa? I si la inclines cap a la dreta? Apunta-ho a l'Activitat 3 de la [fitxa](../SA8_fitxa_alumnat.md) i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Les dades d'entrada: tres eixos

```python
while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    z = accelerometer.get_z()
```

L'acceleròmetre (el mateix de la SA5) dona tres números en **mil·li-g**: cap a on estira la gravetat en cada eix. Placa plana: la gravetat cau tota a l'eix z (z ≈ −1000, x i y ≈ 0). Placa inclinada: la gravetat es reparteix entre eixos. **Aquests tres números són tota la informació** que té el classificador — la seva «visió» del món.

### Bloc 2 — El classificador: una funció que decideix

```python
def classifica(x, y, z):
    # Valors en mil-li-g (aprox.): la gravetat son ~1000 a l'eix vertical.
    if accelerometer.was_gesture("shake"):
        return "SACSEIG"
    if z < -700:
        return "PLA (cara amunt)"
    if z > 700:
        return "CAP PER AVALL"
    if y > 600:
        return "INCLINAT ENDAVANT"
```

El cor de la pràctica: una funció que rep els tres valors i **retorna una classe** (un text amb el nom del gest). Dues coses per mirar-hi de prop:

- **Cada `if` és una regla escrita a mà** per una persona que ha decidit el llindar (per què −700 i no −500?). Això és una IA **basada en regles**: transparent (pots llegir per què ha decidit el que ha decidit), però limitada al que el programador ha previst.
- **L'ordre importa**: el primer `return` que es dispara guanya, i la resta ja no es miren. El `shake` va primer (si no, un sacseig es confondria amb inclinacions rapidíssimes), i l'última línia (`return "DRET"`) és el **cas per defecte**: si cap regla no salta, alguna classe s'ha de dir.

### Bloc 3 — Mesurar per ajustar (mai «a ull»)

```python
    gest = classifica(x, y, z)
    print(gest, x, y, z)      # mostra dades + classe (per ajustar llindars)
```

La línia més important per a la pràctica guiada: pel port sèrie surt **la classe decidida i els tres valors reals** que l'han provocada. Obre el monitor, mou la placa i mira els números: és **així** com s'ajusten els llindars — mesurant valors reals (els que vas anotar al quadern a la SA5 ja et donen pistes), no posant números «a ull». *Garbage in, garbage out*: també val per a les regles.

### Bloc 4 — Reaccionar a la classe

```python
    if gest == "SACSEIG":
        display.show(Image.SQUARE)
    elif "PLA" in gest:
        display.show(Image.YES)
    elif "AVALL" in gest:
        display.show(Image.NO)
    else:
        display.show(Image.ARROW_N)
    sleep(200)
```

Un cop tens la classe, el sistema hi **reacciona** (aquí, una icona; al teu producte podria ser una alerta, un so, un missatge de ràdio…). Fixa't en el truc de l'`in`: `"PLA" in gest` és cert per a `"PLA (cara amunt)"` sense haver d'escriure el text sencer. El `sleep(200)` dona 5 classificacions per segon: prou ràpid per semblar instantani, prou lent per poder llegir el sèrie.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Sempre diu la mateixa classe | Llindars mal ajustats: mira els valors reals pel sèrie **abans** de tocar els números. |
| El `SACSEIG` no surt mai (o surt de seguida després) | El sacseig s'ha de detectar al moment (`was_gesture` mira si **acaba** de passar); sacseja fort i observa el sèrie. |
| Confon dues classes veïnes (p. ex. DRET i INCLINAT) | Els llindars es toquen: separa'ls (marges morts) o replanteja la regla. |
| Al simulador no surt cap gest | Al simulador de python.microbit.org has de moure la placa amb els controls d'acceleròmetre/gestos. |

## 🔗 On ho aplicaràs

- **Ara mateix (pràctica guiada):** ajusta els llindars amb valors mesurats i, si vas fort, afegeix una **classe nova** de gest (ampliació).
- **Tot seguit (el graó 3):** la [pràctica de Teachable Machine](../SA8_practica_teachable_machine.md) — mateixa idea de classificar, però les regles **s'aprenen d'exemples** que reculls tu. Compara-ho: què passa quan els exemples són esbiaixats?
- **Producte de la SA:** si tries el **classificador** com a producte, aquest programa n'és el punt de partida (amb la reflexió ètica sobre les dades que fa servir).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA8](../../../Reptes/Reptes_SA8.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../00_General/00_Tauler_reptes.md).
