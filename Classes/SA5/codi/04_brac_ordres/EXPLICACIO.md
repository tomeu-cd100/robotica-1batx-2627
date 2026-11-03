# Pràctica 3 · El braç obeeix ordres de text (Arduino)

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** que l'Arduino del teu MeArm **obeeixi ordres escrites** (`B+`, `B-`, `P`…). És la meitat del comandament: a la Pràctica 4, aquestes ordres arribaran per ràdio.

⏱️ El torn de taller de la Sessió 2 (~20')

📦 El MeArm amb el seu Arduino, el portapiles i el cable USB

</div>

## 🚀 Pas a pas

### Pas 1 · Kata primer

✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA5_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

✅ **Comprova:** has escrit el teu bloc **abans** de mirar el codi d'aquesta pràctica.

### Pas 2 · Endevina abans de provar

Desplega el codi complet del pas 4 i mira com llegeix les ordres.

✍️ **Apunta-ho:** PREDIU: si escrius `B+` deu vegades, quants graus es mou la base? I amb `b+` (minúscula)? I amb `X`?

### Pas 3 · Prepara el braç

El braç es connecta com a la SA4 ([mapa de pins del dossier](../../../00_General/00_Projecte_T2_Brac.md#cablatge)): els quatre servos amb el portapiles i la massa comuna.

✅ **Comprova:** el **D0** és lliure. Hi anirà el cable del pont a la Pràctica 4, i ha d'estar desconnectat mentre puges programes.

### Pas 4 · Carrega el codi

Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

### Pas 5 · Dona-li ordres

Obre el **Monitor sèrie** (9600, amb «Salt de línia» a baix a la dreta) i escriu ordres: `B+`, `B-`, `P`…

✅ **Comprova:** cada ordre mou l'articulació que toca, i les ordres que no existeixen no fan res.

✍️ **Apunta-ho:** què fa el braç amb l'ordre `B+`? I amb `P`?

✍️ **Apunta-ho:** què és el protocol d'ordres del braç i per què cal que sigui el mateix a les dues bandes (la micro:bit que envia i l'Arduino que obeeix)?

### Pas 6 · Respon i envia

📤 [Obre la tasca «SA5 · Pràctica 3» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDI2NTU5MDQ4/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara. A la sessió següent: **[Pràctica 4 · Ràdio: el comandament del braç](../03_radio_comandament_EXPLICACIO.md)**.

⭐ **Si acabes abans:** afegeix una ordre nova al protocol (per exemple, una posició de repòs) i prova-la des del Monitor sèrie. Més reptes a **[Reptes de la SA5](../../../../Reptes/Reptes_SA5.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Símptoma | Causa probable |
|---|---|
| Escrius `B+` i no passa res | El Monitor sèrie no és a **9600** o no està en mode «Nova línia». |
| Error en pujar el programa | El cable del pont és connectat al **D0**: desconnecta'l per pujar. |
| El braç es mou però molt poc | `PAS` massa petit, o estàs a tocar del límit (`min`/`max` ja no el deixen passar). |
| Amb el pont, el braç no obeeix | Falta el **GND comú** entre micro:bit i Arduino. |

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Per què fem aquesta pràctica

> ⚠️ **Quatre servos a les piles, MAI a l'USB ni al pin 5V de l'UNO.** El −
> de les piles va també al GND de l'Arduino (GND comú), com a la SA4.

En aquesta SA programes en Python, però el braç continua tenint l'**Arduino**
com a cervell. Perquè el comandament per ràdio el pugui moure, l'Arduino ha
d'aprendre a **obeir ordres de text**: `B+` gira la base 3° cap a un costat,
`P` obre o tanca la pinça… És la meitat C++ del comandament.

La gràcia és que pots provar-ho **sense cap micro:bit**: obres el Monitor
sèrie, escrius `B+` i prems Enter, i la base es mou. Si el braç obeeix el
teclat, obeirà el comandament. Així, quan alguna cosa falli a la S3, sabràs
de quina banda és el problema.

### Bloc 1 — El mateix braç de la SA4

```cpp
const int PAS = 3;           // graus per ordre rebuda

const int BASE_MIN = 0,      BASE_MAX = 180;
// ... esquerre, dret ...
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

int aBase = 90, aEsquerre = 90, aDret = 90, aPinca = PINCA_TANCADA;
```

Els pins i els **angles límit** són els del producte de la SA4: copia-hi els
teus. La diferència és que ara l'angle no surt d'un potenciòmetre: el braç
**recorda** on és cada servo (`aBase`, `aDret`…) i cada ordre el mou un `PAS`.

### Bloc 2 — Llegir una ordre sencera

```cpp
  if (Serial.available() > 0) {
    String ordre = Serial.readStringUntil('\n');
    ordre.trim();            // treu espais i el '\r' del final
```

`Serial.available()` diu si han arribat lletres. `readStringUntil('\n')`
llegeix **fins al salt de línia**: una ordre sencera, com `B+`. Per això el
pont envia cada ordre amb un `"\n"` al final, i per això el Monitor sèrie ha
d'estar en mode **«Nova línia»**. `trim()` neteja el `'\r'` que alguns
programes hi afegeixen: sense ell, `"B+\r"` no seria igual a `"B+"`.

El `Serial.setTimeout(50)` del `setup()` és una xarxa de seguretat: si arriba
mitja ordre, no s'espera més de 50 ms.

### Bloc 3 — Una ordre, una acció

```cpp
    if (ordre == "B+") {
      aBase = min(aBase + PAS, BASE_MAX);
    } else if (ordre == "B-") {
      aBase = max(aBase - PAS, BASE_MIN);
    }
    // ... D+ D- E+ E- ...
    } else if (ordre == "P") {
      if (aPinca == PINCA_TANCADA) {
        aPinca = PINCA_OBERTA;
      } else {
        aPinca = PINCA_TANCADA;
      }
    }
    escriu();
```

`min()` i `max()` són el **rang segur**: `min(aBase + PAS, BASE_MAX)` vol dir
*«suma-hi 3, però mai més que el màxim»*. Per molt que el comandament insisteixi,
el servo no forçarà el topall. La `P` és un **commutador**: si és tancada,
l'obre, i al revés. Una ordre desconeguda (`X`, `b+`) no entra a cap branca:
el braç l'ignora, i això també és una decisió de disseny.

### On ho aplicaràs

- **A la S3:** el [comandament per ràdio](../03_radio_comandament_EXPLICACIO.md) i el pont li enviaran aquestes mateixes ordres.
- **A la SA6:** la [màquina d'estats del braç](../../../SA6/codi/03_maquina_estats/EXPLICACIO.md) llegeix les ordres igual, però **sense bloquejar** ni un instant (per poder vigilar el sensor de col·lisió).

</details>
