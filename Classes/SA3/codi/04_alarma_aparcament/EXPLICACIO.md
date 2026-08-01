# Pràctica 4 · Producte: alarma d'aparcament

**Quan es fa:** Sessió 3 (producte) · **Fitxer:** `04_alarma_aparcament.ino` · **Circuit:** [esquema de connexions](../../SA3_esquemes_connexions.md) (TRIG=12, ECHO=11, LED=8, piezo=6)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA3_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Aquest és el sketch de **referència del producte** de la SA: el cotxe que aparca i fa *bip… bip… biiip* quan s'acosta a la paret. Hi conflueix tot el que has treballat: la funció `mesuraDistancia()` de la pràctica 3, la decisió per llindar de la pràctica 2, i les sortides (LED i piezo) de la SA2. Percepció → decisió → acció: el teu primer sistema complet.

Compte: és una **referència, no la solució a copiar**. El teu producte ha de tenir els **teus llindars calibrats** i el **teu estil d'avís** (per trams o proporcional) — i abans d'obrir l'editor, el **pseudocodi** al quadern (3–5 línies): *"REPETEIX: llegeix distància; SI < 10 → …"*.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: què faran el LED i el piezo amb la mà a 50 cm? I a 20 cm? I a 5 cm? En la zona intermèdia, el ritme dels bips serà **fix o canviarà** amb la distància? Apunta les tres prediccions i comprova-les.

## 🧠 El codi, per blocs

### Bloc 1 — Els llindars: les fronteres dels trams

```cpp
// Llindars de distancia (cm) - personalitzables
const int LLUNY = 30;
const int PROP  = 10;
```

Dos llindars parteixen la distància en **tres trams**: tranquil (més de 30 cm), alerta (entre 10 i 30) i perill (menys de 10). Són el primer que la teva parella ha de **personalitzar**: quins valors tenen sentit per al vostre context? Com que són constants amb nom, canviar-los és tocar dues línies.

### Bloc 2 — La funció de la pràctica 3, reutilitzada

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

És la mateixa funció de la [pràctica 3](../03_ultrasons_funcio/EXPLICACIO.md) — aquest és el premi d'encapsular: la portes d'un sketch a l'altre sense tocar-la. I fixa't que la línia del `temps == 0` aquí és **vital**: sense ella, quan no hi hagués cap objecte l'alarma llegiria "0 cm = enganxat!" i sonaria sola. El 0 es tradueix a 400 cm ("molt lluny") i el sistema calla.

### Bloc 3 — Decidir per trams: if / else if / else

```cpp
  float d = mesuraDistancia();
  Serial.println(d);

  if (d > LLUNY) {
    // Lluny: tot tranquil
    digitalWrite(LED, LOW);
    noTone(PIEZO);
  } else if (d > PROP) {
```

L'escala de decisions es llegeix de dalt a baix i **només entra en una branca**: si `d` és més gran que `LLUNY`, tranquil·litat (LED apagat i `noTone` per callar el piezo); si no, però encara és més gran que `PROP`, zona intermèdia; i si cap de les dues, l'`else` final: perill. Aquest `if / else if / else` és la versió de tres trams de l'`if/else` de dos que vas fer amb la LDR.

### Bloc 4 — La zona intermèdia: l'avís proporcional

```cpp
    // Zona intermedia: bips espaiats (interval proporcional a la distancia)
    int interval = map((int)d, PROP, LLUNY, 100, 600);  // mes a prop -> mes rapid
    tone(PIEZO, 1500, 60);
    digitalWrite(LED, HIGH);
    delay(interval);
    digitalWrite(LED, LOW);
    delay(interval);
```

El toc de qualitat: en lloc d'un bip fix, el **ritme depèn de la distància**. `map()` reapareix amb un paper nou: tradueix la distància (de 10 a 30 cm) a un interval de pausa (de 100 a 600 ms) — com més a prop, més curta la pausa i més ràpid el *bip-bip*. `tone(PIEZO, 1500, 60)` toca un bip de 1500 Hz que s'atura sol al cap de 60 ms.

### Bloc 5 — El tram de perill

```cpp
  } else {
    // Molt a prop: avis continu
    digitalWrite(LED, HIGH);
    tone(PIEZO, 2500);   // so continu
  }
```

A menys de 10 cm, sense mitges tintes: LED fix i `tone` **sense durada** — un xiulet continu i més agut (2500 Hz) que no pararà fins que algú cridi `noTone(PIEZO)`. On es crida? Al tram "lluny" del Bloc 3: quan el cotxe recula, el sistema torna a la calma.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| L'alarma es dispara sola sense cap objecte | Al teu codi hi falta el tractament del `pulseIn` = 0: sense eco, 0 es llegeix com "molt a prop". Posa el *timeout* i **tracta el 0 com a molt lluny** (retorna 400). |
| El piezo no calla mai | Has engegat un `tone()` continu i cap branca no fa `noTone()`. Cada tram ha de deixar el piezo com toca. |
| Els bips no canvien de ritme | Límits del `map()` invertits o llindars mal ordenats (`PROP` ha de ser més petit que `LLUNY`). Mira `Serial.println(d)` per veure en quin tram ets. |
| Tot va "a batzegades" a la zona intermèdia | Normal: els `delay(interval)` bloquegen la mesura entre bips. Si et molesta de debò, el remei (`millis()`) arriba a la SA4/SA6. |

## 🔗 On ho aplicaràs

- **Avui (S3):** el **producte** de la SA — personalitza llindars i avís, omple la taula de trams de la [fitxa](../../SA3_fitxa_alumnat.md) i prepara la **defensa d'1'**: com funciona i una aplicació real. S'avalua amb R1 (codi) i R2 (circuit).
- **La mascota del trimestre:** la lògica de trams d'aquesta alarma és la mateixa que fa servir el sensor de la teva mascota per triar reaccions.
- **Prova T1 (S4):** la "llum de seguretat intel·ligent" de la prova és aquest mateix patró *sensor → decisió per llindar → actuador*, en solitari.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
