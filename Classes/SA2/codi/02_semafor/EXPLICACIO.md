# Pràctica 2 · El semàfor: seqüències amb if i delay

**Quan es fa:** Sessió 1 · **Fitxer:** `02_semafor.ino` · **Circuit:** [esquema de connexions, apartat 2](../../SA2_esquemes_connexions.md) (vermell=8, groc=9, verd=10)

## 🎯 Què faràs

Un semàfor de veritat amb 3 LED: **vermell → verd → groc**, i torna a començar. És el primer programa del curs que fa **diverses coses en un ordre concret**, com una recepta. I té un **mode nit**: només el groc fent pampallugues.

## 🚀 Pas a pas

1. **Munta el circuit:** 3 LED, cadascun amb **la seva** resistència de 220 Ω. La pota llarga de cada LED va cap al pin; la curta, cap a GND.

   | LED | Pin de l'Arduino |
   |---|---|
   | 🔴 Vermell | 8 |
   | 🟡 Groc | 9 |
   | 🟢 Verd | 10 |

2. **Llegeix el codi** que tens just a sota (no cal entendre-ho tot encara) i **prediu**: en quin ordre s'encendran les llums, i quant temps estarà encès cada color?
3. **Carrega'l:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

4. **Comprova la predicció.** Apunta a Classroom quants segons dura cada color.
5. **Fes-hi un canvi petit:** posa `T_GROC = 3000` i torna a pujar-lo. Què ha canviat?
6. **Activa el mode nit:** canvia `bool nocturn = false;` per `true` i puja'l. Què fa ara el semàfor?

Si no saps per què passa alguna cosa, llegeix l'apartat de sota: hi tens el codi explicat a trossos, en el mateix ordre que el fitxer.

## 🧠 Com funciona, a trossos

### Tros 1 — Les constants: posar nom a les coses

**Com a la vida real:** en una recepta no diu «agafa el pot de la tercera prestatgeria», diu «agafa la **sal**». Posar nom a les coses fa que la recepta s'entengui i que, si canvies la sal de lloc, només ho hagis de dir una vegada.

```cpp
const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms
const int T_VERD    = 4000;
const int T_GROC    = 1500;
```

- Les tres primeres línies diuen **a quin pin està cada LED**.
- Les tres últimes diuen **quant dura cada color**, en mil·lisegons: 4000 ms = 4 segons, 1500 ms = 1,5 segons.
- `const` vol dir que el valor **no canvia** mentre el programa funciona. Les majúscules són un costum per reconèixer les constants d'un cop d'ull.

Per això el pas 5 només et demanava canviar **una** línia: tot el programa fa servir `T_GROC`, no el número.

### Tros 2 — L'interruptor del mode nit

**Com a la vida real:** un interruptor de la llum. Només té dues posicions: encès o apagat.

```cpp
bool nocturn = false;   // posa true per al mode nocturn (groc intermitent)
```

Un `bool` és una variable que només pot valer `true` (cert) o `false` (fals). Aquí decideix si el semàfor funciona en **mode normal** (`false`) o en **mode nit** (`true`). De moment el canvies tu a mà; a la SA3 el canviarà un **sensor de llum**, tot sol, quan es faci fosc.

### Tros 3 — El `setup()`: preparar les sortides

**Com a la vida real:** abans de cuinar, treus els estris que faràs servir.

```cpp
void setup() {
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}
```

`setup()` s'executa **un sol cop**, quan l'Arduino s'engega. Aquí diu que els tres pins són **sortides** (`OUTPUT`): l'Arduino hi enviarà corrent per encendre els LED. És el mateix que feies amb un LED a la SA1, però tres vegades.

### Tros 4 — El `loop()`: mode nit o mode normal?

**Com a la vida real:** el semàfor de veritat, a la nit, deixa de canviar de color i només fa pampallugues en groc. Cada vegada que comença una volta, «mira el rellotge» i decideix què toca.

```cpp
void loop() {
  if (nocturn) {
    // Mode nocturn: nomes groc intermitent
    digitalWrite(GROC, HIGH);
    delay(500);
    digitalWrite(GROC, LOW);
    delay(500);
  } else {
    // Cicle normal del semafor (el tros 5)
  }
}
```

- `loop()` es repeteix **per sempre**, una volta darrere l'altra.
- `if (nocturn)` pregunta: *l'interruptor del mode nit està encès?*
  - **Sí** → fa la part de dalt: encén el groc mig segon, l'apaga mig segon. Pampallugues.
  - **No** (`else`) → fa la part de baix: el cicle normal del semàfor.
- Cada volta només s'executa **una** de les dues parts, mai totes dues.

### Tros 5 — El cicle normal: encén, espera, apaga

**Com a la vida real:** una recepta llegida en veu alta. *Encén el vermell, espera 4 segons, apaga'l. Encén el verd, espera 4 segons, apaga'l. Encén el groc…*

```cpp
    digitalWrite(VERMELL, HIGH);
    delay(T_VERMELL);
    digitalWrite(VERMELL, LOW);

    digitalWrite(VERD, HIGH);
    delay(T_VERD);
    digitalWrite(VERD, LOW);

    digitalWrite(GROC, HIGH);
    delay(T_GROC);
    digitalWrite(GROC, LOW);
```

Cada color són **tres línies que es repeteixen sempre igual**:

| Línia | Què fa |
|---|---|
| `digitalWrite(VERMELL, HIGH);` | Encén el LED vermell (li envia 5 V). |
| `delay(T_VERMELL);` | Espera 4 segons **sense fer res més**. |
| `digitalWrite(VERMELL, LOW);` | Apaga el LED vermell (0 V). |

Quan acaba el groc, el `loop()` torna a començar pel vermell. Per això el semàfor no s'atura mai.

> ⏳ **Ull amb `delay()`:** mentre espera, l'Arduino està com quan fas «fet i amagar» amb els ulls tapats: compta i **no veu res més**. No podria llegir un botó ni fer parpellejar un altre LED. Per a un semàfor ja va bé; més endavant (SA4 i SA6) aprendràs a esperar **sense** tapar-te els ulls, amb `millis()`.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| «Els LED no s'encenen alhora!» | No és un error: van **un darrere l'altre** a propòsit. | Res: és un semàfor. |
| Un LED no s'encén mai | Pin equivocat, LED al revés o sense resistència. | Comprova la taula de pins del pas 1 i que la pota llarga vagi al pin. |
| Un color dura massa o massa poc | Has canviat la constant que no tocava. | Mira el tros 1: cada `T_...` és d'un color. |
| No passa res de res | El codi no s'ha pujat bé. | Mira que a l'Arduino IDE surti «Pujada completada». |

## 🧗 Si t'encalles: l'esquelet del semàfor

Si no et surt ni el primer cicle, prova primer amb **un sol LED** a la [Pràctica 1](../01_led_basic/EXPLICACIO.md). Si el LED sol ja et funciona, parteix d'aquest esquelet: els pins i el `setup()` ja estan fets, i tu només omples els `// TODO:` de **les tres fases**. Es pot pujar tal com està, però no farà res fins que omplis les fases.

<details markdown="1">
<summary>Desplega l'esquelet (copia'l a un programa nou)</summary>

```cpp
/*
  SA2 - semafor bastida (esquelet per comencar)
  L'estructura dificil ja esta muntada: constants de pins i setup().
  Tu nomes has d'OMPLIR els // TODO: de dins del loop().

  Recorda:
   - digitalWrite(pin, HIGH) encen el LED i digitalWrite(pin, LOW) l'apaga.
   - delay(ms) fa una pausa en mil.lisegons (1000 ms = 1 segon).

  Munta: LED vermell al pin 8, groc al pin 9, verd al pin 10,
  cada un amb la seva resistencia de 220 ohm cap a GND.
*/

const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms que dura el vermell
const int T_VERD    = 4000;  // ms que dura el verd
const int T_GROC    = 1500;  // ms que dura el groc

void setup() {
  // Les tres sortides ja estan configurades. No cal tocar res aqui.
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  // FASE 1: VERMELL
  // TODO: encen el LED vermell (digitalWrite ... HIGH)
  // TODO: espera T_VERMELL mil.lisegons (delay)
  // TODO: apaga el LED vermell (digitalWrite ... LOW)

  // FASE 2: VERD
  // TODO: encen el verd, espera T_VERD i apaga'l (com la fase 1)

  // FASE 3: GROC
  // TODO: encen el groc, espera T_GROC i apaga'l
}
```

</details>

## 🔗 On ho aplicaràs

- **Tot seguit:** la [variant amb `switch`](../02b_semafor_switch/EXPLICACIO.md), el mateix semàfor escrit d'una manera que permet afegir fases fàcilment. El repte de la fase nocturna es fa allà.
- **Sessió 3:** el [panell de senyalització](../05_panell_senyalitzacio/EXPLICACIO.md) també és una seqüència d'estats, com aquest semàfor.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
