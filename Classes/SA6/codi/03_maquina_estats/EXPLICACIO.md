# Pràctica 3 · La màquina d'estats del braç: enum, switch i millis()

**Quan es fa:** Sessió 3 (modelatge i base del producte) · **Fitxer:** `03_maquina_estats.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (els 4 servos i els 4 potenciòmetres de la SA4; col·lisió=D2; polsadors A=D3 i B=D4)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA6_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

El teu braç ja sap fer moltes coses: moure's amb potenciòmetres, gravar
punts, reproduir-los, aturar-se si xoca. El problema és posar-les **juntes**
sense que es trepitgin. Què ha de fer si xoca enmig d'un replay? I si algú
toca un potenciòmetre mentre reprodueix? Amb `if` escampats, el programa es
torna un embolic.

La solució és pensar el braç com un aparell amb **modes**, igual que una
rentadora (rentar, esbandir, centrifugar): en cada moment és en **un sol
estat**, cada estat sap què ha de fer i quan s'ha de passar a un altre.
Això és una **màquina d'estats**. Els quatre del teu braç:

| Estat | Què fa | En surt quan… |
|---|---|---|
| **REPÒS** | Quiet. | A → MANUAL · B → REPLAY (si hi ha punts) |
| **MANUAL** | Els potenciòmetres el mouen; B grava el punt. | A → REPÒS |
| **REPLAY** | Reprodueix els punts gravats, un cada 700 ms. | En acabar o amb A → REPÒS |
| **EMERGÈNCIA** | No mou res. | Sensor alliberat **i** A → REPÒS |

## 🔮 Abans d'executar: prediu

Engegues, prems A, mous el braç i prems B tres vegades en tres posicions.
Prems A i després B. Què fa el braç? I si mentre reprodueix toques el sensor
de col·lisió amb el dit? I si després deixes anar el sensor però **no** prems
A? Dibuixa el **diagrama d'estats** (cercles i fletxes) a l'Activitat 3 de la
[fitxa](../../SA6_fitxa_alumnat.md) abans de provar-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Estats amb nom: `enum`

```cpp
enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA };
Estat estat = REPOS;
```

Un `enum` és una llista de noms per a uns pocs valors possibles. Podries fer
servir números (0 = repòs, 1 = manual…), però d'aquí a una setmana no
recordaries què era el 2. Amb noms, el codi s'explica sol, i el compilador et
renya si escrius un estat que no existeix.

### Bloc 2 — Una sola porta per canviar d'estat

```cpp
void canviaEstat(Estat nou) {
  estat = nou;
  switch (nou) {
    case REPOS:      Serial.println("Estat: REPOS");      break;
    // ...
  }
}
```

Tots els canvis d'estat passen per aquesta funció. Si un dia vols encendre un
LED per estat, ho canvies **aquí** i ja funciona a tot arreu. I el Monitor
sèrie sempre diu la veritat sobre l'estat del braç.

### Bloc 3 — Les entrades, una vegada per volta

```cpp
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);
  bool a = premut(BOTO_A, anteriorA);
  bool b = premut(BOTO_B, anteriorB);
```

Es llegeix tot **a dalt de tot** i es guarda en variables. `premut()` torna
cert només **en el moment** de prémer (el flanc), com el `was_pressed()` de la
micro:bit: així una premuda és una sola acció. El `&` de `anteriorA` és el de
la SA4: la funció ha de poder actualitzar l'original.

### Bloc 4 — L'emergència, abans de tot

```cpp
  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);
  }
```

Aquesta línia va **abans** del `switch`, no dins de cap estat. Així, estigui
on estigui el braç (repòs, manual o a mig replay), un xoc el porta a
emergència a l'instant. És una **prioritat**: la seguretat mana per damunt de
qualsevol altra cosa.

### Bloc 5 — Un `switch`, un `case` per estat

```cpp
  switch (estat) {
    case MANUAL:
      segueixPots();
      if (a) {
        canviaEstat(REPOS);
      } else if (b) {
        gravaPunt();
      }
      break;
    // ...
  }
```

Cada `case` és un estat: **què fa** (`segueixPots()`) i **quan en surt**
(`if (a)`). El `break` és imprescindible: sense ell, el programa continuaria
executant el `case` següent.

### Bloc 6 — El replay sense `delay()`

```cpp
    case REPLAY:
      if (a) {
        canviaEstat(REPOS);
      } else if (millis() - tPunt >= PAUSA_PUNT) {
        tPunt = millis();
        if (puntReplay < numPunts) {
          escriu(seqBase[puntReplay], seqEsq[puntReplay],
                 seqDret[puntReplay], seqPinca[puntReplay]);
          puntReplay++;
        } else {
          canviaEstat(REPOS);
        }
      }
      break;
```

És el patró de la bastida [`05_dos_servos_millis`](../../../SA4/codi/05_dos_servos_millis/EXPLICACIO.md)
de la SA4. Si el replay fes `delay(700)` entre punts, durant aquells 700 ms el
braç seria **sord i cec**: no veuria el xoc ni el botó A. Amb `millis()`, el
`loop()` dona voltes sense parar i, a cada volta, l'emergència es torna a
comprovar.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Un `case` fa també la feina del següent | Falta el `break`. |
| Una premuda fa dues coses (entra a MANUAL i grava) | Has llegit el botó amb `digitalRead()` directe en lloc de `premut()`. |
| L'emergència no salta durant el replay | Hi ha un `delay()` llarg dins del replay, o la comprovació és dins d'un `case` i no abans del `switch`. |
| En sortir d'emergència el braç torna a xocar de seguida | El rearmament no exigeix el sensor alliberat (`!xoc`). |
| El braç entra sol en emergència al límit de la base i no en surt | `BASE_MIN` deixa arribar la base al final de carrera: posa'l uns graus per sobre de l'angle del homing (S1). |

## 🧗 Si t'encalles: l'esquelet

Si el patró se't fa bola, no comencis de zero: parteix d'aquest esquelet. L'estructura difícil ja està muntada (`enum`, `switch`, `canviaEstat()`, les entrades i la prioritat de l'emergència); tu només omples els `// TODO:` de cada estat — què fa i quan en surt. Compila tal qual. Vols la **recepta del patró** (les 3 regles) abans de començar? → [fitxa ampliada, «La recepta»](../../SA6_fitxa_ampliada.md).

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA6 - maquina d'estats del brac, bastida (esquelet per comencar)

  El patro dificil ja esta muntat: enum d'estats, switch, canviaEstat(),
  lectura de les entrades i la PRIORITAT de l'emergencia.
  Tu nomes has d'OMPLIR els // TODO: que fa cada estat i quan canvia.
  Per simplificar, aquest esquelet nomes mou la BASE (potenciometre A0).

  Circuit: servo base=9 (piles + GND comu); col.lisio D2 (LOW = xoc);
           polsador A D3, polsador B D4.
*/

#include <Servo.h>

const int PIN_COLLISIO = 2;
const int BOTO_A = 3;
const int BOTO_B = 4;

Servo base;

enum Estat { REPOS, MANUAL, EMERGENCIA };
Estat estat = REPOS;

int anteriorA = HIGH, anteriorB = HIGH;

bool premut(int pin, int &anterior) {
  int ara = digitalRead(pin);
  bool flanc = (ara == LOW && anterior == HIGH);
  anterior = ara;
  return flanc;
}

void canviaEstat(Estat nou) {
  estat = nou;
  Serial.print("Estat: ");
  Serial.println(nou);       // 0 = REPOS, 1 = MANUAL, 2 = EMERGENCIA
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  pinMode(BOTO_A, INPUT_PULLUP);
  pinMode(BOTO_B, INPUT_PULLUP);
  base.attach(9);
  base.write(90);
}

void loop() {
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);
  bool a = premut(BOTO_A, anteriorA);
  bool b = premut(BOTO_B, anteriorB);

  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);   // la seguretat mana per damunt de tot
  }

  switch (estat) {
    case REPOS:
      // TODO: quan s'ha de passar a MANUAL? (pista: el polsador A)
      break;

    case MANUAL:
      // TODO: que fa el brac en manual? (pista: map() del potenciometre A0)
      // TODO: quan torna a REPOS?
      break;

    case EMERGENCIA:
      // TODO: no es mou res. Quan se'n surt? (dues condicions alhora!)
      break;
  }
  delay(20);
}
```

</details>

## 🔗 On ho aplicaràs

- **Producte de la SA6:** la màquina d'estats del braç amb el **comandament per ràdio**: les ordres `A`, `R` i `G` arriben pel pont en lloc dels polsadors ([dossier](../../../00_General/00_Projecte_T2_Brac.md#la-màquina-destats-del-braç)).
- **La llavor de la SA2:** compara aquest sketch amb el [semàfor amb `switch`](../../../SA2/codi/02b_semafor_switch/EXPLICACIO.md) — és la mateixa estructura, amb noms, esdeveniments i `millis()`.
- **SA7:** els comportaments autònoms del rover (buscar, esquivar, seguir línia) es programen com a estats.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
