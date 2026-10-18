# Pràctica 2b · El mateix semàfor amb switch (llavor de la SA6)

**Quan es fa:** Sessió 1 (després del semàfor) · **Fitxer:** `02b_semafor_switch.ino` · **Circuit:** el mateix de la [Pràctica 2](../02_semafor/EXPLICACIO.md) (vermell=8, groc=9, verd=10): no cal tocar cap cable.

## 🎯 Què faràs

El **mateix semàfor** que acabes de fer, però escrit d'una altra manera. Fa exactament el mateix (vermell → verd → groc), però el codi està organitzat en **caselles**: una casella per a cada color. Així és molt més fàcil afegir-hi un color o un mode nou, que és el que faràs al repte.

## 🚀 Pas a pas

1. **No toquis el circuit:** és el mateix de la Pràctica 2.
2. **Llegeix el codi** de sota i busca-hi els tres trossos que comencen per `case`. Endevina: quin és el del vermell, quin el del verd i quin el del groc?
3. **Carrega'l:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**. Ha de fer el mateix que el semàfor d'abans.

<!-- codi-complet -->

4. **Fes un experiment:** al `case 0` (el del vermell), canvia `fase = 1;` per `fase = 2;` i torna a pujar-lo. Què li passa al semàfor? Apunta-ho al **quadern** i explica per què (la resposta és al tros 3 de sota). Després, torna-ho a deixar com estava.
5. **⭐ Repte:** afegeix una **fase nocturna** (el groc fa pampallugues). Tens les instruccions al final de la pàgina, a l'apartat «⭐ El repte, pas a pas».

## 🧠 Com funciona, a trossos

Les constants i el `setup()` són **iguals** que a la Pràctica 2. El que canvia és el `loop()`. Per entendre'l, pensa en una situació que coneixes.

> 🎫 **La parada del mercat amb números de torn.** Al taulell hi ha una pantalla que diu el número que toca. La persona que despatxa mira la pantalla, atén el número que hi surt, **canvia la pantalla al número següent** i espera que torni a començar. El programa fa exactament això, cada volta del `loop()`.

### Tros 1 — `fase`: la pantalla que diu què toca

```cpp
int fase = 0;   // 0=vermell, 1=verd, 2=groc
```

`fase` és una **variable**: una capsa amb un número a dins que pot anar canviant. És la pantalla dels torns. El comentari explica què vol dir cada número:

| Si `fase` val… | …toca el color |
|---|---|
| `0` | 🔴 vermell |
| `1` | 🟢 verd |
| `2` | 🟡 groc |

Comença valent `0`: el semàfor arrenca pel vermell.

### Tros 2 — `switch` i `case`: atendre el número que toca

```cpp
switch (fase) {
  case 0:
    // el que s'ha de fer si fase val 0
    break;
  case 1:
    // el que s'ha de fer si fase val 1
    break;
  case 2:
    // el que s'ha de fer si fase val 2
    break;
}
```

- `switch (fase)` vol dir: **«mira quin número hi ha a `fase`»**.
- Cada `case` és **una finestreta**: `case 0:` és la del número 0, `case 1:` la del número 1… El programa va **directament** a la finestreta del número que toca i se salta les altres.
- `break;` vol dir **«ja està, surt»**. Marca on s'acaba cada finestreta.

### Tros 3 — Dins de cada `case`: fer la feina i canviar el número

```cpp
  case 0:  // fase vermell
    digitalWrite(VERMELL, HIGH);
    delay(T_VERMELL);
    digitalWrite(VERMELL, LOW);
    fase = 1;
    break;
```

Llegit en veu alta: *«Si toca el 0: encén el vermell, espera 4 segons, apaga'l, **posa la pantalla a 1** i surt.»*

- Les tres primeres línies ja les coneixes: encén, espera, apaga.
- `fase = 1;` és la línia nova i important: **canvia el número de la pantalla**. A la volta següent del `loop()`, el `switch` veurà un 1 i anirà a la finestreta del verd.
- El verd acaba amb `fase = 2;` (toca el groc) i el groc amb `fase = 0;` (torna a començar pel vermell). Així es forma el cicle: **0 → 1 → 2 → 0 → 1 → 2…**

**Per això l'experiment del pas 4 fa que el semàfor se salti el verd:** si el vermell acaba amb `fase = 2;`, la pantalla passa directament al groc, i el `case 1` ja no s'executa mai.

### Tros 4 — Per què cal el `break`?

**Com a la vida real:** quan la persona del taulell t'ha atès, te'n vas. Si no te'n anessis, et quedaries també a la finestreta del costat i t'atendrien dues vegades.

Sense `break`, el programa **no surt** en acabar el `case`: continua llegint cap avall i fa també el `case` de sota. Per això **cada `case` ha d'acabar amb `break;`**.

> 🕵️ **Ull, que és traïdor:** en aquest semàfor, si esborres un `break` és possible que **no vegis cap diferència**. Els colors ja van en ordre 0 → 1 → 2, i fer el següent «de cop» dona la mateixa seqüència. Per això és un error perillós: el programa sembla que funciona, però no fa el que tu creus. Quan hi afegeixis el mode nit, un `break` oblidat sí que el notaràs. Regla d'or: **cada `case` acaba amb `break;`**.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| Se salta un color | Un `case` canvia `fase` a un número que no és el següent. | Revisa els `fase = …;`: han de fer 0 → 1 → 2 → 0. |
| Es queda clavat en un color | Aquell `case` no canvia `fase`, o la torna a posar al mateix número. | Cada `case` ha de tenir el seu `fase = …;`. |
| L'IDE marca un error en vermell a prop d'un `case` | Falten els dos punts (`case 0:`) o el `;` del final d'una línia. | Mira la línia que marca l'IDE i la de just abans. |
| Dues fases seguides «de cop» | Falta un `break;`. | Afegeix `break;` al final de cada `case`. |

## ⭐ El repte, pas a pas: la fase nocturna

L'objectiu és una finestreta nova, la **número 3**, on el groc fa pampallugues sense parar.

1. Copia el `case 2` sencer (des de `case 2:` fins al seu `break;`) i enganxa'l a sota, **abans** de la clau `}` que tanca el `switch`.
2. Canvia el número: `case 3:`.
3. A dins, fes que el groc **s'encengui mig segon i s'apagui mig segon** (`delay(500)` dues vegades).
4. Fes que la fase nocturna **es repeteixi sempre**: al final, abans del `break;`, posa `fase = 3;`.
5. Per provar-ho, canvia la primera línia `int fase = 0;` per `int fase = 3;` i puja'l. El semàfor ha d'arrencar directament en mode nit.
6. Explica a Classroom com ho has fet (pregunta de la fase nocturna) i torna a posar `int fase = 0;` per recuperar el semàfor normal.

## 🔗 On ho aplicaràs

- **Sessió 3:** el [panell de senyalització](../05_panell_senyalitzacio/EXPLICACIO.md) també té estats (tot correcte, avís, alarma).
- **SA6:** faràs servir aquesta mateixa idea (una pantalla que diu què toca) en màquines més grans, com un termòstat. La diferència és que el número de la pantalla el canviarà un sensor, no el rellotge.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
