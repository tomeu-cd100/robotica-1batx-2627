# Pràctica 3 · Màquina d'estats: enum, switch i millis()

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_maquina_estats.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (polsador a 2, LEDs a 7/8, sortida a 9~)

> ✍️ **Kata primer!** No llegeixis encara el codi: el docent projecta el kata d'aquesta pràctica i tens **10 minuts** per escriure el teu bloc (apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Mira una **rentadora**: remull → rentat → esbandida → centrifugat. En cada moment està en **una situació concreta**, fa una cosa concreta, i **canvia** de situació quan passa alguna cosa (s'acaba el temps, s'omple el tambor). Això és una **màquina d'estats**: la manera estàndard d'organitzar qualsevol comportament que "recorda en quin punt està" — d'un semàfor a un ascensor, d'un caixer automàtic al braç robòtic del trimestre.

De fet, tu ja en vas plantar la llavor a la SA2: el [semàfor amb `switch`](../../../SA2/codi/02b_semafor_switch/EXPLICACIO.md) tenia una variable `fase` i un `case` per fase. Avui la llavor germina amb tres millores: els estats tenen **nom** (`enum`) en lloc de números, les transicions poden ser per **temps o per esdeveniment** (polsador), i — la més important — el programa **no es bloqueja mai**: en lloc de `delay()`, cronometra amb `millis()` i així **continua llegint el polsador mentre espera**. El semàfor de la SA2 quedava sord durant cada `delay`; aquest sistema, no.

## 🔮 Abans d'executar: prediu

Mirant el codi (a baix, plegat): quins **estats** hi ha i en quin **ordre** es recorren? Què cal fer perquè arrenqui? Quant dura cada fase? I la difícil: si mentre `FASE1` treballa premeu el polsador, **passa res**? Apunta-ho a l'Activitat 3 de la [fitxa](../../SA6_fitxa_alumnat.md) i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Estats amb nom: `enum`

```cpp
enum Estat { ESPERA, FASE1, FASE2, FET };
Estat estat = ESPERA;
```

Un `enum` crea un **tipus nou** que només pot valer un d'aquests quatre noms. Compara-ho amb el `int fase = 0; // 0=vermell...` de la SA2: allà el significat vivia en un comentari; aquí `estat = FASE2` **es llegeix sol**, i el compilador t'avisa si escrius un estat que no existeix. La variable `estat` és única: el sistema és **sempre en un estat i només un**.

### Bloc 2 — Totes les transicions passen per una porta

```cpp
unsigned long tEstat = 0;   // marca de temps d'entrada a l'estat

void canviaEstat(Estat nou) {
  estat = nou;
  tEstat = millis();
}
```

Cada canvi d'estat ha de fer **dues** coses: canviar `estat` i apuntar **quan** hi hem entrat (`tEstat`), perquè les transicions per temps puguin comptar. Posar-ho en una funció (`canviaEstat`) garanteix que mai no te'n deixaràs la meitat — cada oblit seria una màquina "penjada".

### Bloc 3 — Un `switch`, un `case` per estat

```cpp
switch (estat) {

  case ESPERA:
    digitalWrite(LED_VERMELL, HIGH);
    digitalWrite(LED_VERD, LOW);
    analogWrite(SORTIDA, 0);
    if (polsat()) { canviaEstat(FASE1); delay(250); }  // arrenca en premer
    break;
  ...
}
```

Cada `case` respon **dues preguntes**: *què fa* el sistema en aquest estat (les sortides) i *quan i cap a on en surt* (la transició). Aquí la transició és per **esdeveniment**: el polsador. El `delay(250)` petit és un antirebots casolà perquè una sola premuda no compti dues vegades. Fixa't que el `switch` és la **transcripció literal** del diagrama d'estats que has dibuixat: cada casella un `case`, cada fletxa un `canviaEstat()`.

### Bloc 4 — Transició per temps SENSE `delay()`

```cpp
case FASE1:
  digitalWrite(LED_VERMELL, LOW);
  digitalWrite(LED_VERD, HIGH);
  analogWrite(SORTIDA, 120);
  if (millis() - tEstat > 3000) canviaEstat(FASE2);  // 3 s
  break;
```

Aquí hi ha el patró que vas practicar a la SA4 (`05_dos_leds_millis`): en lloc d'un `delay(3000)` que deixaria el programa **sord** tres segons, cada volta de `loop()` es pregunta *"quant fa que soc en aquest estat?"* (`millis() - tEstat`) i, si ja passa de 3000 ms, salta. Entre pregunta i pregunta, el `loop()` gira lliure — i podria llegir sensors, polsadors, el que calgui. **Per això les màquines d'estats de debò no porten `delay` llargs.**

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La màquina es queda "penjada" en un estat | Aquell `case` no té transició, o la seva condició no es pot complir mai (targeta de rescat T6.2: `Serial.println(estat);`). |
| No arrenca en prémer | Polsador mal cablejat: amb `INPUT_PULLUP`, va del pin 2 a **GND** i premut = `LOW`. |
| Salta dos estats amb una sola premuda | Falta l'antirebots (`delay(250)` després de la transició) o el mantens premut. |
| Dos estats es comporten "barrejats" | Falta un `break` al final d'un `case` (el *fall-through* que vas veure a la SA2). |

## 🧗 Si t'encalles: l'esquelet

Si el patró se't fa bola, no comencis de zero: parteix d'aquest esquelet. L'estructura difícil ja està muntada (`enum`, `switch`, `canviaEstat()` i el cronòmetre `tempsEnEstat()` amb `millis()`); tu només omples els `// TODO:` de cada estat — què fa i quan en surt. Compila tal qual; no fa res visible fins que omplis els estats. Vols la **recepta del patró** (les 3 regles) abans de començar? → [fitxa ampliada, «La recepta»](../../SA6_fitxa_ampliada.md).

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA6 - maquina d'estats bastida (esquelet per comencar)

  El patro dificil ja esta muntat: enum d'estats, switch, i temporitzacio
  NO bloquejant amb millis() (com a 05_dos_leds_millis.ino de la SA4).
  Tu nomes has d'OMPLIR els // TODO: que fa cada estat i quan canvia.

  Munta: polsador al pin 2 (INPUT_PULLUP), LEDs als pins 7 i 8, sortida al 9.
*/

const int POLSADOR = 2;
const int LED_VERD = 7;
const int LED_VERMELL = 8;
const int SORTIDA = 9;

// Pots afegir o treure estats segons el teu proces.
enum Estat { ESPERA, FASE1, FASE2, FET };
Estat estat = ESPERA;

unsigned long tEstat = 0;   // moment d'entrada a l'estat actual

void canviaEstat(Estat nou) {
  estat = nou;
  tEstat = millis();        // reinicia el "cronometre" de l'estat
}

bool polsat() {
  return digitalRead(POLSADOR) == LOW;
}

// Quants ms portem dins de l'estat actual (patro no bloquejant).
unsigned long tempsEnEstat() {
  return millis() - tEstat;
}

void setup() {
  pinMode(POLSADOR, INPUT_PULLUP);
  pinMode(LED_VERD, OUTPUT);
  pinMode(LED_VERMELL, OUTPUT);
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  switch (estat) {

    case ESPERA:
      // TODO: que ha de fer el sistema mentre espera? (LEDs, sortida)
      // TODO: quan ha de passar a FASE1? (p. ex. if (polsat()) canviaEstat(FASE1);)
      break;

    case FASE1:
      // TODO: comportament de FASE1
      // TODO: transicio per TEMPS -> if (tempsEnEstat() > 3000) canviaEstat(FASE2);
      break;

    case FASE2:
      // TODO: comportament de FASE2 i transicio cap a FET
      break;

    case FET:
      // TODO: indica que ha acabat; torna a ESPERA si es torna a polsar
      break;
  }
}
```

</details>

## 🔗 On ho aplicaràs

- **Repte de la S3:** afegir un estat nou o una transició condicional; **+ repte:** semàfor adaptatiu amb polsador de vianant.
- **La llavor de la SA2:** compara aquest sketch amb el [semàfor amb `switch`](../../../SA2/codi/02b_semafor_switch/EXPLICACIO.md) que vas fer llavors — és la mateixa estructura, amb noms, esdeveniments i `millis()`.
- **Producte del trimestre:** el control complet del **braç** (repòs/manual/replay/emergència) és exactament aquest patró — i l'[exemple resolt del dipòsit](../../SA6_exemple_resolt.md) et mostra com combinar-lo amb la histèresi.
- **SA7:** els comportaments autònoms del robot (buscar, esquivar, seguir línia) es programen com a estats.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
