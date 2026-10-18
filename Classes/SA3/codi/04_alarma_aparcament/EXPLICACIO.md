# Pràctica 4 · Alarma d'aparcament (per a qui acabi abans)

**Quan es fa:** Sessió 3, **només si has acabat la mascota**. No és el producte de la SA (el producte és la mascota). · **Fitxer:** `04_alarma_aparcament.ino` · **Circuit:** [esquema de connexions, apartat 4](../../SA3_esquemes_connexions.md) (TRIG al 12, ECHO a l'11, LED al 8, brunzidor al 6)

## 🎯 Què faràs

El **sensor d'aparcament** d'un cotxe: quan t'acostes a la paret fa *bip… bip… bip-bip-bip* i, quan ja quasi la toques, un xiulet continu. Ajunta tot el que has fet: l'ultrasons de la Pràctica 3, la decisió per llindar de la Pràctica 2 i el LED i el brunzidor de la SA2.

## 🚀 Pas a pas

1. **Munta el circuit:**

   | Pin de l'Arduino | Va a… |
   |---|---|
   | 12 i 11 | TRIG i ECHO de l'ultrasons (com a la Pràctica 3) |
   | 8 | LED → resistència de 220 Ω → GND |
   | 6 | brunzidor (+); la seva pota − va a GND |

2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Prova-ho:** acosta la mà a poc a poc al sensor. Lluny no passa res; a prop, bips cada cop més ràpids; molt a prop, xiulet continu.
4. **Fes-la teva:** canvia els números de `LLUNY` i `PROP` (per exemple 50 i 20) i torna-la a pujar. Ara avisa abans?

## 🧠 Com funciona, a trossos

### Tros 1 — Les dues ratlles de distància

**Com a la vida real:** un semàfor de distàncies. Verd = lluny, groc = compte, vermell = perill.

```cpp
// Llindars de distancia (cm) - personalitzables
const int LLUNY = 30;
const int PROP  = 10;
```

Amb dues ratlles, la distància queda partida en **tres zones**:

| Zona | Distància | Què fa l'alarma |
|---|---|---|
| Tranquil | més de 30 cm | res |
| Compte | entre 10 i 30 cm | bips, cada cop més ràpids |
| Perill | menys de 10 cm | xiulet continu |

### Tros 2 — La funció de la Pràctica 3

```cpp
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);  // timeout 30 ms
  if (temps == 0) return 400;               // sense eco: fora de rang (evita falsa alarma)
  return temps * 0.034 / 2.0;
}
```

És **la mateixa** funció de la [Pràctica 3](../03_ultrasons_funcio/EXPLICACIO.md), copiada tal qual. Aquest és l'avantatge de les funcions: les pots portar d'un programa a l'altre. La línia del `temps == 0` és molt important: sense ella, quan no hi ha res davant l'alarma es pensaria que tens la paret enganxada i sonaria sola.

### Tros 3 — Triar la zona: `if`, `else if`, `else`

```cpp
  float d = mesuraDistancia();
  Serial.println(d);

  if (d > LLUNY) {
    // Lluny: tot tranquil
    digitalWrite(LED, LOW);
    noTone(PIEZO);
  } else if (d > PROP) {
```

Llegit en veu alta: *«**Si** és més lluny de 30, tot tranquil (LED apagat i brunzidor callat). **Si no, però** encara és més lluny de 10, zona de compte. **I si no**, perill.»* El programa només entra en **una** de les tres zones.

`noTone(PIEZO)` fa **callar** el brunzidor. Cal posar-ho a la zona tranquil·la perquè, si veníem de la zona de perill, el xiulet continuaria sonant.

### Tros 4 — Bips més ràpids com més a prop

```cpp
    // Zona intermedia: bips espaiats (interval proporcional a la distancia)
    int interval = map((int)d, PROP, LLUNY, 100, 600);  // mes a prop -> mes rapid
    tone(PIEZO, 1500, 60);
    digitalWrite(LED, HIGH);
    delay(interval);
    digitalWrite(LED, LOW);
    delay(interval);
```

- `map()` és el **traductor** de la Pràctica 2: converteix la distància (de 10 a 30 cm) en una pausa (de 100 a 600 ms). Com més a prop, **més curta** la pausa i més ràpids els bips.
- `tone(PIEZO, 1500, 60)` fa un **bip** de 1500 Hz que dura 60 mil·lisegons.

### Tros 5 — Perill: xiulet continu

```cpp
  } else {
    // Molt a prop: avis continu
    digitalWrite(LED, HIGH);
    tone(PIEZO, 2500);   // so continu
  }
```

A menys de 10 cm, LED encès i xiulet **sense parar** (un `tone` sense durada). Només callarà quan tornis a la zona tranquil·la i s'executi el `noTone`.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| L'alarma sona sola sense res davant | Falta la línia del `temps == 0`. | Torna a posar `if (temps == 0) return 400;`. |
| El brunzidor no calla mai | Falta el `noTone(PIEZO)` a la zona tranquil·la. | Mira el tros 3. |
| Els bips no canvien de velocitat | `PROP` ha de ser **més petit** que `LLUNY`. | Revisa els dos números. |
| A la zona de compte la mesura va a batzegades | Els `delay` de la pausa aturen el programa mentre esperen. | És normal. A la SA4 i la SA6 aprendràs a fer-ho sense aturar res. |

## 🔗 On ho aplicaràs

- **La mascota:** la idea de **zones** (lluny, compte, perill) és la mateixa que fa servir la mascota per triar com reacciona.
- **Prova T1:** la prova també és «llegir un sensor → decidir → encendre un llum o fer un so».

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
