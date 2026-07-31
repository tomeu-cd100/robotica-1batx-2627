# SOS en Morse: les primeres funcions

**Quan es fa:** Sessió 3 (ampliació, per a qui va sobrat) · **Fitxer:** `sos_morse.ino` · **Circuit:** [esquema de connexions](../../SA1_esquemes_connexions.md) (el mateix del [Blink](../blink/EXPLICACIO.md))

## 🎯 Per què fem aquesta pràctica

Vols fer un SOS en Morse (**· · · — — — · · ·**): tres parpellejos curts, tres de llargs, tres de curts. Si ho escrius tot amb `digitalWrite` i `delay`, et surten més de trenta línies gairebé idèntiques — i quan vulguis canviar el ritme, les hauràs de tocar totes.

La solució és l'eina nova d'aquesta ampliació: **definir funcions pròpies**. Fins ara has *usat* funcions que Arduino et dona fetes (`pinMode`, `digitalWrite`, `delay`); ara n'*escriuràs* de teves (`punt()` i `ratlla()`). Ensenyar paraules noves al llenguatge: això és programar de veritat, i és el que farà llegible tot el codi que escriguis d'ara endavant.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix, plegat) **sense carregar-lo**. Sabries dir quantes vegades s'encén el LED en un missatge sencer? Amb `UNITAT = 200`, quant dura una ratlla encesa? I si canvies `UNITAT` a `400`, què li passa a **tot** el missatge?

## 🧠 El codi, per blocs

### Bloc 1 — Una sola constant governa tot el ritme

```cpp
const int LED = 13;
const int UNITAT = 200;   // durada base en ms (un "punt"). Pujar-la alenteix tot.
```

En Morse tot es mesura en **unitats**: un punt dura 1 unitat, una ratlla 3, la pausa entre lletres 2… Per això al codi només hi ha **un** número de temps, `UNITAT`, i tots els altres es calculen multiplicant (`UNITAT * 3`, `UNITAT * 7`). Canvies un valor i tot el missatge s'accelera o s'alenteix **mantenint les proporcions**.

### Bloc 2 — Definir una funció pròpia

```cpp
// Un punt: encesa curta (1 unitat) + pausa entre senyals (1 unitat)
void punt() {
  digitalWrite(LED, HIGH);
  delay(UNITAT);
  digitalWrite(LED, LOW);
  delay(UNITAT);
}
```

Això és una **definició de funció**: agafem quatre línies que sempre van juntes i els posem un **nom**. Anatomia:

- `void` — aquesta funció **no retorna cap valor**: només *fa* coses (més endavant en veuràs que calculen i retornen resultats).
- `punt` — el nom que triem nosaltres. Descriptiu: llegint-lo ja saps què fa.
- `()` — els parèntesis buits diuen que no necessita cap dada per treballar.
- `{ ... }` — el **cos**: les ordres que s'executaran cada cop que algú la **cridi** escrivint `punt();`.

Molt important: definir-la **no l'executa**. És com apuntar una recepta al receptari: no cuina res fins que algú la demana. Per això va **fora** del `setup()` i del `loop()`.

### Bloc 3 — La segona funció: mateixa idea, altres temps

```cpp
// Una ratlla: encesa llarga (3 unitats) + pausa entre senyals (1 unitat)
void ratlla() {
  digitalWrite(LED, HIGH);
  delay(UNITAT * 3);
  digitalWrite(LED, LOW);
  delay(UNITAT);
}
```

Idèntica estructura, però l'encesa dura `UNITAT * 3`: la ratlla del Morse. Fixa't que dins del `delay()` hi pot anar una **operació** (`UNITAT * 3`): l'Arduino la calcula abans d'esperar.

### Bloc 4 — Un `loop()` que es llegeix com el missatge

```cpp
void loop() {
  // S = tres punts
  punt(); punt(); punt();
  delay(UNITAT * 2);   // separacio entre lletres

  // O = tres ratlles
  ratlla(); ratlla(); ratlla();
  delay(UNITAT * 2);

  // S = tres punts
  punt(); punt(); punt();

  delay(UNITAT * 7);   // pausa llarga abans de repetir el missatge
}
```

Aquí és on es cobra el premi: el `loop()` **es llegeix com el missatge mateix** — tres punts, tres ratlles, tres punts. Cada `punt();` és una **crida**: el programa salta al cos de la funció, l'executa i torna. Compara-ho mentalment amb la versió sense funcions (trenta línies de `digitalWrite`/`delay`): mateix comportament, llegibilitat incomparable. Aquest criteri —codi que s'entén llegint-lo— és exactament el que valora la rúbrica R1 tot el curs.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Error `'punt' was not declared in this scope` | Nom mal escrit a la crida (majúscules compten: `Punt()` ≠ `punt()`) o has definit la funció **dins** del `loop()` — ha d'anar fora. |
| Error `expected ';'` en una línia de crida | T'has deixat el `;` després de `punt()` o `ratlla()`. |
| El SOS no es distingeix | `UNITAT` massa petita (tot es veu igual de ràpid): puja-la a 200–300 ms. |
| Les lletres «s'enganxen» | Falten els `delay(UNITAT * 2)` de separació entre la S, la O i la S. |

## 🔗 On ho aplicaràs

- **SA4:** el robot mòbil tindrà funcions com `endavant()`, `enrere()` i `gira()` — mateix patró exacte: donar nom a un bloc d'ordres i cridar-lo.
- **Tot el curs:** qualsevol codi una mica llarg es parteix en funcions; és la manera estàndard de mantenir-lo llegible (rúbrica R1).
- **Germà d'ampliació:** [`blink_millis`](../blink_millis/EXPLICACIO.md) — l'altra eina avançada d'avui: parpellejar sense aturar mai la placa.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA1](../../../../Reptes/Reptes_SA1.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
