# Pràctica 2 · Histèresi: la pinça automàtica

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_pinca_histeresi.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (servo pinça=11 amb piles; ultrasons TRIG=7, ECHO=8)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA6_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Recordes el **«ball»** del braç a la SA4, quan l'objecte era just a la
distància del llindar? Una mesura deia «a prop», la següent «lluny», i el braç
anava i venia. Amb una pinça és pitjor: **clic-clic-clic**, l'objecte cau i
el servo pateix.

La solució es diu **histèresi**: en lloc d'**un** llindar, en fas servir
**dos**. La pinça es tanca quan l'objecte és a menys de 6 cm, però només es
torna a obrir quan s'allunya més de 10 cm. Entre 6 i 10 cm, la pinça **fa el
que ja feia**. És el que fan tots els termòstats (si no, la calefacció
s'encendria i s'apagaria cada segon) i és el que avui fa la pinça del teu braç.

La clau és que ara el sistema té **memòria**: per decidir, no n'hi ha prou de
mirar la distància; cal recordar si la pinça és oberta o tancada.

## 🔮 Abans d'executar: prediu

Acostes la mà a poc a poc des de 20 cm fins a 3 cm, i després l'allunyes fins
a 20 cm. A quina distància es tanca la pinça? A quina s'obre? Són la mateixa?
I si deixes la mà quieta a 8 cm? Apunta-ho a l'Activitat 2 de la
[fitxa](../../SA6_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Dos llindars i una memòria

```cpp
const int TANCA_CM = 6;      // llindar BAIX: mes a prop, es tanca
const int OBRE_CM = 10;      // llindar ALT: mes lluny, s'obre

bool pincaTancada = false;   // l'ESTAT: la memoria del sistema
```

Pensa en una porta automàtica de supermercat: s'obre quan t'acostes a 1 m,
però no es tanca fins que ets a 2 m. Si fos el mateix número, la porta faria
de ventall cada vegada que algú s'aturés just a la frontera. La diferència
entre els dos llindars (4 cm) és la **finestra d'histèresi**.

### Bloc 2 — Decidir amb la memòria

```cpp
  if (!pincaTancada && d < TANCA_CM) {
    pincaTancada = true;
    pinca.write(PINCA_TANCADA);
  } else if (pincaTancada && d > OBRE_CM) {
    pincaTancada = false;
    pinca.write(PINCA_OBERTA);
  }
  // Entre TANCA_CM i OBRE_CM: no es toca res (la histeresi)
```

Llegeix les condicions en veu alta: *«si és oberta i l'objecte s'acosta
prou, tanca-la»*; *«si és tancada i l'objecte s'allunya prou, obre-la»*. Cada
condició mira **la distància i l'estat**. I el millor de tot és el que **no**
hi és: no hi ha cap `else` final. Si no es compleix cap condició, no es fa res.

### Bloc 3 — Veure-ho al Serial Plotter

```cpp
  Serial.print(d);
  Serial.print(" ");
  Serial.print(TANCA_CM);
  Serial.print(" ");
  Serial.print(OBRE_CM);
  Serial.print(" ");
  Serial.println(pincaTancada ? 15 : 0);
```

Quatre línies al gràfic: la distància, els dos llindars (dues rectes
horitzontals) i l'estat de la pinça (0 o 15). Mou la mà i mira: la pinça
canvia a **llindars diferents** segons si t'acostes o t'allunyes. El
`? 15 : 0` és una manera curta d'escriure *«si és tancada, 15; si no, 0»*.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La pinça fa clic-clic igualment | Els dos llindars són massa a prop (o iguals): eixampla la finestra. |
| La pinça no s'obre mai | Les condicions estan intercanviades (`d < OBRE_CM` per obrir). |
| La pinça es tanca sola sense res a davant | L'ultrasons veu la taula o la mateixa pinça: canvia'n l'angle o puja'l. |
| El gràfic és pla a 400 | Sense eco: TRIG/ECHO intercanviats o sense 5V. |

## 🔗 On ho aplicaràs

- **Al taller d'avui:** troba i anota els **angles límit** definitius de cada servo i deixa el cablatge endreçat: la S3 ja és de producte.
- **Prova T2:** el nucli de la prova és **aquesta pinça amb histèresi**.
- **Repte A de la SA6:** la pinça automàtica amb LED d'estat i finestra ajustable.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
