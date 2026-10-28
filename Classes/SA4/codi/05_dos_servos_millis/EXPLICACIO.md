# Pràctica 5 · Dues articulacions alhora: millis() en lloc de delay()

**Quan es fa:** Sessió 3 (bastida per a qui acaba aviat, prepara la SA6) · **Fitxer:** `05_dos_servos_millis.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (servo base=9, servo pinça=11, amb piles i GND comú)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA4_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

Recorda el peatge del semàfor de la SA2: *`delay()` bloqueja*. Mentre
l'Arduino espera, no pot fer **res** més. Amb el braç, això es nota de seguida:
vols que la **base escombri a poc a poc** mentre la **pinça s'obre i es tanca
cada segon**. Amb `delay()` és impossible: quan la pinça espera el seu segon,
la base es queda congelada.

La solució és canviar de mentalitat: en lloc de **parar el programa** fins que
toqui actuar, el programa **no es para mai** i a cada volta es pregunta *«ja
toca?»*. L'eina és `millis()`, un cronòmetre que compta els mil·lisegons des
que la placa s'ha engegat sense aturar res.

És curta de línies però és **la** pràctica conceptual de la SA: el patró que
hi aprens és el que la **màquina d'estats del braç** (SA6) dona per sabut.

## 🔮 Abans d'executar: prediu

Quant de temps triga la base a anar de 60° a 120°? (Pista: un grau cada 20
ms.) Quantes vegades s'haurà obert i tancat la pinça en aquest temps? I la
clau: **en quina línia s'espera, el programa?** (Busca-la. No hi és.)

## 🧠 El codi, per blocs

### Bloc 1 — El cronòmetre que no atura res

```cpp
void loop() {
  unsigned long ara = millis();   // "cronometre" intern, no atura res
```

Un cuiner amb dues olles al foc no es queda mirant-ne una fins que bull: mira
el rellotge de la cuina, i a cada ullada decideix si toca remenar l'una o
l'altra. `millis()` és el rellotge. Es guarda en un `unsigned long` perquè el
número creix molt (un dia són 86.400.000 ms) i un `int` es desbordaria en 32
segons.

### Bloc 2 — Tasca 1: la base escombra

```cpp
  if (ara - tBase >= PERIODE_BASE) {
    tBase = ara;
    angleBase = angleBase + pas;
    if (angleBase >= BASE_MAX || angleBase <= BASE_MIN) {
      pas = -pas;                 // arriba a un extrem: canvia de sentit
    }
    base.write(angleBase);
  }
```

`ara - tBase` és *quant fa que la base s'ha mogut per última vegada*. Si ja
han passat 20 ms, es mou un grau i s'apunta l'hora (`tBase = ara`). La
variable `pas` val +1 o −1: quan l'angle arriba a un extrem, canvia de signe i
la base fa mitja volta. És l'escombrada del repte de la S1, però sense cap
`delay()`.

### Bloc 3 — Tasca 2: la pinça, al seu ritme

```cpp
  if (ara - tPinca >= PERIODE_PINCA) {
    tPinca = ara;
    pincaOberta = !pincaOberta;
    // ... write(PINCA_OBERTA) o write(PINCA_TANCADA)
  }
```

El mateix patró, amb el seu propi cronòmetre (`tPinca`) i el seu propi
període. `!pincaOberta` capgira el booleà: oberta → tancada → oberta. Cada
tasca té **la seva variable de temps**: per això no es trepitgen.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La pinça no canvia mai | `tPinca = ara` oblidat: la condició és certa sempre i el booleà canvia a cada volta (massa ràpid per veure-ho). |
| La base s'encalla en un extrem | El canvi de sentit es comprova abans de sumar el pas, i l'angle surt del rang. Compara-ho amb el codi. |
| Tot va a batzegades | Hi has deixat un `delay()` en algun lloc. |

## 🧗 Si t'encalles: l'esquelet amb una sola tasca

Comença per **una sola tasca** (la pinça) i, quan funcioni, copia el patró
per a la base. L'esquelet té el `setup()` i les variables fetes; omple els
`// TODO:`.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA4 - millis bastida (una sola tasca)
  La pinca s'obre i es tanca cada segon SENSE delay().
  Patro: "ja ha passat prou temps des de l'ultima vegada?"
  Circuit: servo pinca=11 (piles + GND comu).
*/

#include <Servo.h>

const int PINCA_TANCADA = 60;
const int PINCA_OBERTA = 120;
const unsigned long PERIODE_PINCA = 1000;

Servo pinca;
bool pincaOberta = false;
unsigned long tPinca = 0;    // ultima vegada que ha canviat

void setup() {
  pinca.attach(11);
  pinca.write(PINCA_TANCADA);
}

void loop() {
  unsigned long ara = millis();

  // TODO: si (ara - tPinca) es mes gran o igual que PERIODE_PINCA...
  //   TODO: apunta l'hora: tPinca = ara;
  //   TODO: capgira pincaOberta amb !
  //   TODO: si pincaOberta, write(PINCA_OBERTA); si no, write(PINCA_TANCADA)
}
```

</details>

## 🔗 On ho aplicaràs

- **A la S4:** l'informe del [braç amb potenciòmetres](../04_brac_potenciometres/EXPLICACIO.md) fa servir `millis()` per no frenar el control.
- **A la SA6:** el **replay** de la màquina d'estats del braç reprodueix els punts gravats amb aquest patró, i així pot vigilar el sensor de col·lisió entre punt i punt.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA4](../../../../Reptes/Reptes_SA4.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
