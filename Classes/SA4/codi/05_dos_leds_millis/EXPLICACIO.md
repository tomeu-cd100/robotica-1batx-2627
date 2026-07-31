# Pràctica 5 · Dues coses alhora: millis() en lloc de delay()

**Quan es fa:** Sessió 3 (repte +, prepara la SA6) · **Fitxer:** `05_dos_leds_millis.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (muntatge lliure: dos LED amb resistència de 220 Ω als pins 7 i 8)

## 🎯 Per què fem aquesta pràctica

Recorda el peatge que vas pagar al semàfor de la SA2: *`delay()` bloqueja*. Mentre l'Arduino espera, no pot fer **res** més. Allà només era un avís; avui el problema es fa real amb el repte més petit que el demostra: **dos LEDs parpellejant a ritmes diferents** (un cada 250 ms, l'altre cada 1000 ms). Prova de fer-ho amb `delay()` i veuràs que no hi ha manera: qualsevol espera d'un LED congela l'altre.

La solució és canviar de mentalitat: en lloc de **parar el programa** fins que toqui actuar, el programa **no es para mai** i a cada volta es pregunta *"ja toca?"*. L'eina és `millis()`: un cronòmetre que compta els mil·lisegons des que la placa s'ha engegat, sense aturar res.

Aquesta pràctica és curta de línies però és **la** pràctica conceptual de la SA: el patró que hi aprens és exactament el que la **màquina d'estats de la SA6** dona per sabut, i el que necessita la barrera de la S4 per no quedar-se cega (versió completa). Val cada minut.

## 🔮 Abans d'executar: prediu

Sense carregar-lo: quantes vegades canviarà el LED A mentre el LED B en fa un de sol? Coincidiran mai els dos canvis en el mateix instant — cada quant? I la clau: **en quina línia s'espera, el programa?** (Busca-la. Spoiler: no hi és.)

## 🧠 El codi, per blocs

### Bloc 1 — El cronòmetre que no atura res

```cpp
void loop() {
  unsigned long ara = millis();   // "cronometre" intern, no atura res
```

Un cuiner amb dues paelles al foc no es queda plantat davant d'una fins que estigui llesta: va fent, i de tant en tant **mira el rellotge de la paret**. Mirar el rellotge no atura la cuina. `millis()` és aquest rellotge: retorna quants **mil·lisegons** fa que la placa està engegada, i cridar-lo no espera res — és mirar l'hora, no posar una alarma i adormir-s'hi. El tipus `unsigned long` és nou: un enter **gran i sense signe**, necessari perquè aquest comptador creix i creix (un `int` normal es desbordaria en mig minut).

### Bloc 2 — La memòria: quan vaig actuar per última vegada?

```cpp
unsigned long tA = 0;   // ultim canvi del LED A
unsigned long tB = 0;   // ultim canvi del LED B
bool encesA = false;
bool encesB = false;
```

Si a casa teniu una planta, potser també teniu el paperet de la nevera: *«regada dilluns»*. Sense el paperet no hi ha manera de saber si ja toca tornar-la a regar — la memòria no és opcional. Aquí igual: per saber si "ja toca", cada LED necessita recordar **quan va canviar per última vegada** (`tA`, `tB` — el seu paperet) i **en quin estat està** (`encesA`, `encesB`). Fixa't que són variables **globals** (fora del `loop()`): han de sobreviure d'una volta a la següent, com el paperet queda a la nevera entre reg i reg. Aquesta idea — l'estat del sistema guardat en variables — és el germen de la màquina d'estats de la SA6.

### Bloc 3 — El patró: «ja toca? doncs actua i apunta-t'ho»

```cpp
  // LED A: ha passat el seu periode?
  if (ara - tA >= PERIODE_A) {
    tA = ara;
    encesA = !encesA;             // inverteix l'estat
    digitalWrite(LED_A, encesA);
  }
```

Torna al cuiner: passa per davant de cada olla, mira el rellotge i es pregunta *«a tu, ja et toca?»*. Si toca, remena **i apunta l'hora**; si no, passa de llarg i continua la ronda. Aquest `if` de quatre línies és tota la ronda. Llegeix-lo a poc a poc:

- `ara - tA` — quant fa de l'últim canvi? Si és més que el període (250 ms), **toca actuar**.
- `tA = ara;` — **apunta't que acabes d'actuar** (l'hora al paperet). És la línia que tothom oblida: sense ella, la condició seria certa a cada volta i el LED parpellejaria a velocitat de `loop()` (milers de cops per segon: el veuries mig encès, fix).
- `encesA = !encesA;` — l'operador `!` inverteix el booleà: de `true` a `false` i viceversa. Encès ↔ apagat en una línia, sense `if` extra.

I si **encara no toca**? No passa res: l'`if` es salta i el `loop()` continua. No s'espera — es torna a preguntar d'aquí a un instant.

### Bloc 4 — Per què poden anar a ritmes diferents

```cpp
  // LED B: ha passat el SEU periode (diferent)?
  if (ara - tB >= PERIODE_B) {
    tB = ara;
    encesB = !encesB;
    digitalWrite(LED_B, encesB);
  }

  // El loop no s'atura mai: per aixo els dos LEDs poden anar a ritmes diferents.
}
```

El LED B té el **mateix patró** amb les **seves** variables (`tB`, `encesB`, `PERIODE_B`). Com que cap dels dos `if` no atura res, el `loop()` gira milers de vegades per segon i cada LED actua exactament quan li toca, independent de l'altre. Vols un tercer LED? Un brunzidor cada 5 segons? Copia el patró amb variables noves. Amb `delay()` això era impossible; amb `millis()` és una fotocòpia.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Un LED es veu mig encès, fix | Falta el `tA = ara;` dins de l'`if`: la condició es compleix a cada volta i el LED canvia milers de cops per segon. |
| Els dos LEDs van al mateix ritme | Has comparat els dos `if` amb el **mateix** període o la **mateixa** variable de temps (`tA` als dos). |
| Funciona una estona i s'embolica | Les variables de temps són `int` en lloc d'`unsigned long`: es desborden al cap de ~32 segons. |
| Torna a anar a batzegades | Has tornat a posar un `delay()` dins del `loop()`: un sol `delay()` congela **tots** els patrons alhora. |

## 🔗 On ho aplicaràs

- **Ara mateix (versió completa de la S4):** la barrera que vigila el sensor **mentre** compta el temps obert — el cas «vehicle aturat sota la barrera» de la [fitxa](../../SA4_fitxa_alumnat.md) — és exactament aquest patró.
- **SA6:** la **màquina d'estats** del sistema de control dona aquest patró per sabut: allà `millis()` ja no serà el tema, serà l'eina.
- **SA7:** un rover llegeix sensors, controla dos motors i parpelleja indicadors **alhora** — sense `millis()`, no hi ha robot.
