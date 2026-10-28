# Pràctica 4 · Control proporcional: el braç que frena sol (ampliació)

**Quan es fa:** Sessió 3 (ampliació, per a qui va sobrat) · **Fitxer:** `04_control_proporcional.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (servo base=9 amb piles; potenciòmetre de la base=A0)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA6_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

Quan gires de cop el potenciòmetre de la base, el servo **salta**: va a tota
velocitat i frena en sec. Si la pinça porta alguna cosa, surt volant. Els
braços de debò no es mouen així: arrenquen ràpid quan són lluny de la
destinació i **frenen a poc a poc** quan s'hi acosten.

La idea és el **control proporcional**: a cada volta, el braç s'acosta a la
consigna un **tros proporcional a l'error** (el que li falta). Si li falten
100°, fa un pas gran; si li falten 2°, un pas petit. El resultat és un
moviment suau, sense que el programa sàpiga res de «frenar».

## 🔮 Abans d'executar: prediu

Amb `K = 0.1`, si la base és a 90° i la consigna salta a 180°, quants graus es
mourà a la primera volta? I a la segona? Arribarà mai **exactament** a 180°?

## 🧠 El codi, per blocs

### Bloc 1 — La consigna i l'error

```cpp
  int consigna = map(analogRead(A0), 0, 1023, 0, 180);   // on volem anar
  float error = consigna - angle;                          // quant falta
```

La **consigna** és on vols anar (el potenciòmetre). L'**angle** és on és el
braç ara. L'**error** és la diferència: positiu si ha de pujar, negatiu si ha
de baixar, zero si ja hi és. Són les tres paraules del diagrama de blocs de la
S1.

### Bloc 2 — Un tros proporcional

```cpp
  angle = angle + K * error;          // un tros proporcional a l'error
  base.write((int)(angle + 0.5));     // arrodonit al grau mes proper
```

Imagina que camines cap a una porta i a cada pas recorres **una desena part**
del que et falta: els primers passos són llargs i els últims, petitíssims. Això
fa `K = 0.1`. Amb `K = 1` recorres tot el que falta d'una vegada: és el salt de
sempre. Amb `K = 0.02`, el braç es mou com en càmera lenta. `angle` és `float`
(amb decimals) perquè els passos petits no es perdin en arrodonir.

### Bloc 3 — Veure-ho al Serial Plotter

```cpp
  Serial.print(consigna);
  Serial.print(" ");
  Serial.println(angle);
```

Dues línies: la consigna (esglaons quan gires el potenciòmetre) i l'angle (una
corba que s'hi acosta suaument). La forma de la corba és la firma del control
proporcional: ràpida al principi, lenta al final.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El braç salta igual que abans | `K` val 1 o més. |
| El braç no es mou gens | `angle` és `int` i els passos petits s'arrodoneixen a 0: ha de ser `float`. |
| El braç es queda a 1-2° de la consigna | Normal amb control P pur: el pas es fa tan petit que l'arrodoniment el menja. És l'«error estacionari». |

## 🔗 On ho aplicaràs

- **Repte C de la SA6:** el moviment proporcional a les **quatre** articulacions alhora.
- **Prova T2 (excel·lent):** l'apropament proporcional de la pinça.
- **SA7:** al rover, corregir la direcció **segons quant** s'ha desviat (i no a cops) és la mateixa idea aplicada a les rodes.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
