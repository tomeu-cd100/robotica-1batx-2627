# Pràctica 1 · LED bàsic: constants i variables

**Quan es fa:** no és una sessió pròpia. És l'**ajuda** de la Sessió 1 per a qui s'encalla amb el semàfor: primer un sol LED, i després en muntes tres. · **Fitxer:** `01_led_basic.ino` · **Circuit:** [esquema de connexions, apartat 1](../../SA2_esquemes_connexions.md)

## 🎯 Què faràs

Un sol LED que s'encén i s'apaga, com el `Blink` de la SA1, però amb un **LED de veritat** a la protoboard (pin 8) en lloc del de la placa. Quan funcioni, ja tindràs el primer dels tres llums del semàfor.

## 🚀 Pas a pas

1. **Munta el circuit:** pin 8 → resistència de 220 Ω → pota **llarga** del LED. La pota **curta** del LED → GND.
2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Comprova** que el LED parpelleja (mig segon encès, mig segon apagat).
4. **Canvia la velocitat:** posa `int temps = 100;` i torna'l a pujar. Després prova `2000`.
5. **Ja funciona?** Afegeix el LED groc al pin 9 i el verd al 10, cadascun amb la seva resistència, i passa a la [pràctica del semàfor](../02_semafor/EXPLICACIO.md).

## 🧠 Com funciona, a trossos

### Tros 1 — Posar nom als números

**Com a la vida real:** al mòbil no recordes els números de telèfon, recordes **noms** («Mama»). Si un dia canvia el número, el canvies a l'agenda i ja està.

```cpp
const int LED = 8;     // pin del LED (constant)
int temps = 500;       // temps en ms (variable: la pots canviar)
```

- `const int LED = 8;` → a partir d'ara, `LED` vol dir «el pin 8». Si demà mous el LED al pin 7, només canvies aquesta línia. `const` vol dir que **no canviarà** mentre el programa funciona.
- `int temps = 500;` → una **variable**: una capsa amb un número que tu pots canviar (els mil·lisegons que dura cada encesa i cada apagada). 500 ms = mig segon.

### Tros 2 — `setup()`: preparar el pin

**Com a la vida real:** abans de jugar, dius quin paper fa cadascú.

```cpp
void setup() {
  pinMode(LED, OUTPUT);
}
```

`setup()` s'executa **un sol cop**, quan l'Arduino s'engega. `pinMode(LED, OUTPUT)` diu que el pin 8 és una **sortida**: l'Arduino hi enviarà corrent. Si t'oblides d'aquesta línia, el LED no s'encendrà (o farà una llum molt fluixa).

### Tros 3 — `loop()`: encén, espera, apaga, espera

**Com a la vida real:** un intermitent de cotxe. Encès, apagat, encès, apagat… fins que l'atures.

```cpp
void loop() {
  digitalWrite(LED, HIGH);
  delay(temps);
  digitalWrite(LED, LOW);
  delay(temps);
}
```

| Línia | Què fa |
|---|---|
| `digitalWrite(LED, HIGH);` | Encén el LED (li envia 5 V). |
| `delay(temps);` | Espera `temps` mil·lisegons. |
| `digitalWrite(LED, LOW);` | Apaga el LED (0 V). |
| `delay(temps);` | Torna a esperar. |

`loop()` es repeteix **per sempre**: quan arriba al final, torna a començar per dalt.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| El LED no s'encén mai | LED al revés o sense resistència. | Pota llarga cap al pin 8, curta cap a GND. |
| El LED no fa res, però el codi s'ha pujat bé | El cable va a un altre pin. | Ha de ser al pin 8 (o canvia `const int LED`). |
| Fa una llum molt fluixa | Falta `pinMode(LED, OUTPUT)`. | Comprova el `setup()`. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el [semàfor](../02_semafor/EXPLICACIO.md) és aquest mateix programa amb **tres** LED.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
