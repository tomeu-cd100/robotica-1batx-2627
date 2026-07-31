# Blink: el primer programa

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `blink.ino` · **Circuit:** [esquema de connexions](../../SA1_esquemes_connexions.md) (LED intern del pin 13: no cal cablejar res)

## 🎯 Per què fem aquesta pràctica

És el teu **primer programa** de tot el curs, i és el «Hola, món» de l'Arduino: fer parpellejar un LED. Sembla poca cosa, però conté l'**esquelet de tots els programes que escriuràs**: una part que es prepara un sol cop (`setup()`) i una part que es repeteix per sempre (`loop()`).

A més, el treballem amb el mètode **PRIMM**: primer **prediràs** què fa el codi sense executar-lo, i només després el carregaràs. Predir abans de provar és el pas que més t'ajuda a entendre de debò — és el «dissenyar» del mètode de projecte.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense carregar-lo**. Què farà el LED? Cada quant canviarà? I si canvies el `1000` per `100`, què passarà? Escriu la predicció a l'Activitat 4 de la [fitxa](../../SA1_fitxa_alumnat.md) i després comprova-la. Et pot ajudar el [diagrama de flux](../../SA1_diagrama_flux.md).

## 🧠 El codi, per blocs

### Bloc 1 — Donar nom al pin

```cpp
const int LED = 13;   // Numero de pin on hi ha el LED (constant: no canvia)
```

En lloc d'escriure `13` per tot arreu, li donem un **nom**: `LED`. El `const` vol dir que és una **constant**: aquest valor no canviarà mentre el programa funciona. El pin 13 és especial: la placa hi té un **LED intern** (marcat amb una **L**), així que pots provar-ho tot sense cablejar res.

### Bloc 2 — `setup()`: un sol cop

```cpp
void setup() {
  // setup() s'executa UNA sola vegada en encendre o reiniciar la placa.
  pinMode(LED, OUTPUT);   // Configurem el pin com a SORTIDA
}
```

`setup()` s'executa **una única vegada**, just en engegar o reiniciar la placa. Aquí hi va la configuració: `pinMode(LED, OUTPUT)` diu a la placa que el pin 13 serà una **sortida** (hi enviarem corrent per encendre el LED). Compte amb l'error més típic del dia: pensar que `setup()` es repeteix. **No**: el que es repeteix és el `loop()`.

### Bloc 3 — `loop()`: per sempre

```cpp
void loop() {
  // loop() es repeteix indefinidament, una vegada i una altra.
  digitalWrite(LED, HIGH);  // Encen el LED (5 V)
  delay(1000);              // Espera 1000 ms = 1 segon
  digitalWrite(LED, LOW);   // Apaga el LED (0 V)
  delay(1000);              // Espera 1 segon
}
```

`loop()` es repeteix **indefinidament**: encén, espera, apaga, espera… i torna a començar. Tres ordres noves:

- `digitalWrite(LED, HIGH)` posa el pin a **5 V** (LED encès); `digitalWrite(LED, LOW)` el posa a **0 V** (apagat). Només dos estats possibles: això és un senyal **digital**, com vas veure a l'Activitat 2.
- `delay(1000)` atura el programa **1000 mil·lisegons = 1 segon**. El `delay` sempre compta en **mil·lisegons**: si hi poses `100`, l'espera és una dècima de segon.

Fixa't que **canviant només els dos números del `delay` canvies tot el comportament**: temps curts = parpelleig nerviós; un temps curt i un de llarg = un «batec» de cor (com el de l'[exemple resolt](../../SA1_exemple_resolt.md)).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| «Port not found» en pujar | Placa o port no seleccionats: **Eines → Placa: Arduino UNO** i el **Port** correcte. |
| El LED sembla sempre encès | `delay` massa petit: l'ull no veu parpellejos per sota d'uns 50 ms. Augmenta el valor. |
| Un LED **extern** no s'encén mai | Polaritat invertida (pota llarga = ànode, cap al pin) o falta la resistència de 220 Ω. Amb el LED intern això no pot passar. |
| «Esperava que el `setup()` tornés a sortir» | No és un error del codi: `setup()` corre **un sol cop**; el que es repeteix és el `loop()`. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el repte de l'Activitat 4 (3 parpellejos ràpids + pausa llarga). Intenta'l pel teu compte; la solució comentada és a la [pàgina del repte](../blink_repte/EXPLICACIO.md).
- **Després del teu primer intent:** l'[exemple resolt del batec](../../SA1_exemple_resolt.md) és el **bessó** d'aquesta pràctica — la mateixa idea amb un ritme i un context diferents, raonada pas a pas amb el diari de bord inclòs. Serveix per veure *com es pensa*, no per copiar-lo.
- **Si vas sobrat:** les ampliacions [`blink_millis`](../blink_millis/EXPLICACIO.md) (parpelleig sense `delay()`) i [`sos_morse`](../sos_morse/EXPLICACIO.md) (les teves primeres funcions).
- **Tot el curs:** l'estructura `setup()` + `loop()` és la de **tots** els programes d'Arduino que faràs; a la SA2 hi afegiràs més sortides (semàfor, PWM, RGB).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA1](../../../../Reptes/Reptes_SA1.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
