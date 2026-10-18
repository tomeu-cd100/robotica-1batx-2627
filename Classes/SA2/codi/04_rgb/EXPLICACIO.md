# Pràctica 4 · LED RGB: barrejar colors (i la primera funció pròpia)

**Quan es fa:** Sessió 2 (després del *fade*) · **Fitxer:** `04_rgb.ino` · **Circuit:** [esquema de connexions, apartat 4](../../SA2_esquemes_connexions.md) (mòdul RGB: R=9, G=10, B=11, − a GND)

## 🎯 Què faràs

Un sol llum que fa **qualsevol color**: vermell, verd, blau, groc, lila… El LED RGB són **tres LED en un** (vermell, verd i blau). Si regules cadascun de 0 a 255, com al *fade*, els barreges i en surten colors nous. I aprendràs a crear **la teva pròpia instrucció**, `color()`.

## 🚀 Pas a pas

1. **Treu el LED del pin 9 i connecta el mòdul RGB** del kit amb 4 cables:

   | Pin del mòdul | Pin de l'Arduino |
   |---|---|
   | R | 9 |
   | G | 10 |
   | B | 11 |
   | − (o GND) | GND |

2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Mira la seqüència de colors:** vermell, verd, blau, groc, lila i apagat. Cada color dura 1 segon.
4. **Crea 3 colors teus:** canvia els números d'algunes línies `color(…)` (per exemple, `color(255, 100, 0)`) i torna'l a pujar. Escriu a Classroom els 3 colors que t'agradin, amb els seus tres números (R, G, B).
5. **⭐ Si acabes abans:** fes una **transició suau** entre dos colors (pista: és un *fade* com el de la Pràctica 3, però amb dos canals alhora).

## 🧠 Com funciona, a trossos

### Tros 1 — Tres pins, un per a cada color

```cpp
const int R = 9;
const int G = 10;
const int B = 11;
```

R (*red*) és el vermell, G (*green*) el verd i B (*blue*) el blau. Els tres han de ser pins amb **`~`**, perquè cada color es regula amb PWM de 0 a 255, com el *fade*.

### Tros 2 — La teva primera funció: `color(r, g, b)`

**Com a la vida real:** a la cafeteria no expliques cada vegada com es fa un cafè. Dius «**un cafè amb 2 sucres**», i el cambrer ja sap què ha de fer. «Cafè» és el nom de la recepta; «2 sucres» és el detall que canvia cada vegada.

```cpp
// Funcio propia per fixar un color (modularitat)
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}
```

Una **funció** és una recepta amb nom que escrius **una vegada** i fas servir **tantes com vulguis**.

| Tros | Què vol dir |
|---|---|
| `void` | La funció fa una feina, però no et retorna cap resultat. |
| `color` | El nom que li has posat (el «cafè»). |
| `(int r, int g, int b)` | Els tres números que li passaràs cada vegada (els «sucres»): quant vermell, quant verd i quant blau. |
| Les tres línies de dins | La feina: posa cada color a la brillantor que li has dit. |

Quan escrius `color(255, 0, 0);`, la funció rep `r = 255`, `g = 0`, `b = 0` i fa els tres `analogWrite`. **Una línia en lloc de tres**, i que diu clarament què fa.

### Tros 3 — La paleta de colors

**Com a la vida real:** barrejar **llum** no és com barrejar pintura. Si encens una llanterna vermella i una de verda apuntant al mateix lloc, no surt marró: surt **groc**. Llum + llum = més llum.

```cpp
color(255, 0, 0);   delay(1000);   // vermell
color(0, 255, 0);   delay(1000);   // verd
color(0, 0, 255);   delay(1000);   // blau
color(255, 255, 0); delay(1000);   // groc (R+G)
color(128, 0, 128); delay(1000);   // lila
color(0, 0, 0);     delay(1000);   // apagat
```

| Color | R | G | B | Per què |
|---|---|---|---|---|
| Vermell | 255 | 0 | 0 | Només el vermell, al màxim. |
| Groc | 255 | 255 | 0 | Vermell + verd al màxim. |
| Lila | 128 | 0 | 128 | Vermell + blau, a mitja potència. |
| Blanc | 255 | 255 | 255 | Els tres al màxim (prova-ho!). |
| Apagat | 0 | 0 | 0 | Cap. |

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| Un color no surt mai | Aquell cable és en un altre pin o fa mal contacte. | Comprova la taula del pas 1. |
| Els colors surten «al revés» (el vermell surt cian…) | El teu LED és d'**ànode comú**: el comú va a 5 V i els números s'inverteixen. | Mira l'esquema, apartat 4, o pregunta al docent. |
| No fa res de res | El − del mòdul no és a GND. | Connecta el − a GND. |

## 🔗 On ho aplicaràs

- **Sessió 3:** el [panell de senyalització](../05_panell_senyalitzacio/EXPLICACIO.md) fa servir aquesta mateixa funció `color()`, sense canviar-hi res.
- **Mascota del trimestre:** aquests colors seran les **expressions** del teu robot.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
