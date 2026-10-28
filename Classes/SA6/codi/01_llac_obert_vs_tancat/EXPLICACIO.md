# Pràctica 1 · Llaç obert vs llaç tancat: el homing del braç

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_llac_obert_vs_tancat.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (servo base=9 amb piles; sensor de col·lisió=D2; polsador A=D3)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA6_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Quan un braç industrial s'engega, la primera cosa que fa és buscar el seu
**zero**: gira cada articulació a poc a poc fins que toca un petit interruptor
(un **final de carrera**), i a partir d'aquí sap exactament on és. Es diu
**homing**. Per què no s'hi envia directament i prou? Perquè un servo pot
lliscar, una banya pot haver saltat una dent… i el programa no ho sabria.

Aquesta és la diferència entre els dos grans tipus de control:

- **Llaç obert:** envies l'ordre i **confies**. Ràpid i senzill, però cec.
- **Llaç tancat:** un sensor **comprova** el resultat i el programa actua segons
  el que realment ha passat. És la **realimentació**.

Avui ho veus amb el mateix braç i el mateix servo, canviant només de mode. El
final de carrera és el **sensor de col·lisió** que acabes de muntar a la base.

## 🔮 Abans d'executar: prediu

En mode obert, la base anirà a 20°. Toca el final de carrera? I si el sensor
fos a 15°? I si l'has muntat a 30°? En mode tancat, què passarà en cada cas?
Apunta-ho a l'Activitat 1 de la [fitxa](../../SA6_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — On creiem que és vs on és

```cpp
const int ANGLE_INICI = 90;
const int ANGLE_OBJECTIU = 20;         // on CREIEM que hi ha el final de carrera
const unsigned long PAS_HOMING = 30;   // ms per grau: a poc a poc
```

`ANGLE_OBJECTIU` és una **suposició**: el número que algú va apuntar. El llaç
obert hi confia cegament. El llaç tancat no el necessita: el troba.

### Bloc 2 — Llaç obert: una ordre i prou

```cpp
  if (!modeTancat) {
    base.write(ANGLE_OBJECTIU);
    Serial.println("... Toca el final de carrera? No ho se.");
    delay(2000);
    base.write(ANGLE_INICI);
    acabat = true;
  }
```

Com tirar a cistella amb els ulls tancats: llances i no saps si has encertat.
No hi ha cap `digitalRead()`: el programa **no pregunta res al món**. Passats
2 s, la base torna a l'inici: si el sensor era abans de l'objectiu, el servo hi
estaria empenyent i s'escalfaria. És una protecció que hi posem nosaltres,
perquè el llaç obert, sol, no se n'adonaria mai.

### Bloc 3 — Llaç tancat: el sensor diu prou

```cpp
    if (digitalRead(PIN_COLLISIO) == LOW) {
      Serial.print("Final de carrera a ");
      Serial.print(angle);
      acabat = true;
    } else if (angle <= 0) {
      Serial.println("No he trobat el final de carrera!");
      acabat = true;
    } else {
      angle = angle - 1;
      base.write(angle);
      delay(PAS_HOMING);
    }
```

Com baixar una escala a les fosques tocant amb el peu: un graó cada vegada,
i t'atures quan **notes** el terra. Cada volta: si el sensor toca, ja hi som
(i l'angle d'aquell moment és el zero real); si no, un grau més. La branca
`angle <= 0` és una **guarda**: si el sensor s'ha desconnectat, el braç no
s'ha de quedar empenyent per sempre.

### Bloc 4 — El diagrama de blocs

```
 consigna ──▶ [controlador] ──▶ [servo] ──▶ base
                   ▲                          │
                   └──── [final de carrera] ◀─┘   (realimentació)
```

En llaç obert, la fletxa de baix **no existeix**. Dibuixa el diagrama del teu
braç al quadern: és l'Activitat 1 de la fitxa.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| En mode tancat diu «final de carrera a 90 graus» de seguida | El sensor llegeix `LOW` sense tocar: falta `INPUT_PULLUP` o el cable és a un altre pin. |
| La base arriba a 0° i el sensor no toca | El sensor és massa lluny de la palanca de la base: acosta'l. |
| El servo brunz contra el sensor | El sensor és **darrere** d'un topall mecànic: el braç no hi pot arribar. Mou-lo. |
| El polsador canvia de mode dues vegades | Rebot: el `while` que espera que el deixis anar és imprescindible. |

## 🔗 On ho aplicaràs

- **Al taller d'avui:** el sensor de col·lisió es queda muntat. Serà també l'**emergència** de la màquina d'estats de la S3.
- **A la S2:** la [pinça automàtica](../02_pinca_histeresi/EXPLICACIO.md) és un altre llaç tancat (l'ultrasons tanca el llaç).
- **Repte B de la SA6:** fer el homing en engegar i després una seqüència que s'atura si xoca.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
