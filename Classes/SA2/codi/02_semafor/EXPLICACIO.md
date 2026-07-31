# Pràctica 2 · El semàfor: seqüències amb if i delay

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_semafor.ino` · **Circuit:** [esquema de connexions](../../SA2_esquemes_connexions.md) (vermell=8, groc=9, verd=10)

## 🎯 Per què fem aquesta pràctica

Un LED sol ja el domines. Un semàfor són **tres sortides que s'han de coordinar en una seqüència**: vermell → verd → groc, cadascun amb la seva durada. És el primer programa del curs que es llegeix com una **recepta**: pas 1, pas 2, pas 3, i torna a començar. Gairebé tots els sistemes que veuràs (i el producte de la S4) són variacions d'aquesta idea: *una seqüència d'estats que es repeteix*.

També hi apareix una cosa nova: el programa té **dos comportaments** (cicle normal i mode nocturn) i una variable que tria quin toca. Decidir amb un `if` és l'altre múscul d'aquesta sessió.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: **en quin ordre** s'encendran els LED? S'encendran mai **dos alhora**? Quant durarà cada color? Apunta-ho i comprova-ho després.

## 🧠 El codi, per blocs

### Bloc 1 — Constants: pins i temps

```cpp
const int VERMELL = 8;
const int GROC    = 9;
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms
const int T_VERD    = 4000;
const int T_GROC    = 1500;
```

La lliçó de la Pràctica 1 aplicada en gran: **cap número solt dins del `loop()`**. Vols un groc més llarg? Canvies `T_GROC` i ja està. Els noms en majúscules són una convenció per dir "això és una constant".

### Bloc 2 — Una variable que tria el comportament

```cpp
bool nocturn = false;   // posa true per al mode nocturn (groc intermitent)
```

Un `bool` només pot valer `true` o `false`: és un interruptor dins del codi. Aquí està "cablejat" a mà (el canvies tu i tornes a carregar); a la SA3 aprendràs a canviar-lo **des d'un sensor**, i el semàfor es farà nocturn tot sol quan es faci fosc.

### Bloc 3 — Decidir: `if` / `else`

```cpp
void loop() {
  if (nocturn) {
    // Mode nocturn: nomes groc intermitent
    digitalWrite(GROC, HIGH);
    delay(500);
    digitalWrite(GROC, LOW);
    delay(500);
  } else {
    // Cicle normal del semafor
    ...
  }
}
```

Cada volta de `loop()`, el programa mira `nocturn` i executa **només una** de les dues branques. Fixa-t'hi: el mode nocturn no és un segon programa, és una **branca** del mateix.

### Bloc 4 — La seqüència: encendre, esperar, apagar

```cpp
digitalWrite(VERMELL, HIGH);
delay(T_VERMELL);
digitalWrite(VERMELL, LOW);

digitalWrite(VERD, HIGH);
delay(T_VERD);
digitalWrite(VERD, LOW);
```

Llegeix-ho en veu alta com una recepta: *encén el vermell, espera 4 segons, apaga'l; encén el verd…* El patró de cada fase és sempre el mateix trio encén–espera–apaga.

**El peatge:** `delay()` **bloqueja** el programa. Mentre espera aquells 4 segons, l'Arduino no pot fer **res** més — ni llegir un botó, ni fer parpellejar un altre LED. Per a un semàfor sol ja va bé; per a sistemes que fan diverses coses alhora caldrà `millis()` (es presenta avui de passada, es practica a la SA4 i s'usa de debò a la SA6).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| "Els LED no canvien alhora!" | No és un error: la seqüència és **seqüencial** per disseny — cada fase acaba abans que comenci la següent. |
| Un LED no s'encén mai | Pin equivocat a les constants, polaritat o resistència d'aquell LED. |
| El semàfor va "a batzegades" estranyes | Has barrejat les durades: comprova quin `T_...` va amb quin `delay()`. |

## 🧗 Si t'encalles: l'esquelet del semàfor

Si no et surt ni el primer cicle, no et quedis en blanc: parteix d'aquest esquelet. Els pins i el `setup()` ja estan fets; tu només omples els `// TODO:` de cada fase (i, si arribes al final, un groc que «respira» amb PWM — tast de la S3). Compila tal qual; no fa res visible fins que omplis les fases.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA2 - semafor bastida (esquelet per comencar)
  L'estructura dificil ja esta muntada: constants de pins i setup().
  Tu nomes has d'OMPLIR els // TODO: de dins del loop().

  Recorda:
   - digitalWrite(pin, HIGH/LOW) encen o apaga del tot (sortida digital).
   - analogWrite(pin, 0..255) gradua la INTENSITAT, pero nomes en pins ~ (PWM).
   - delay(ms) fa una pausa en mil.lisegons.

  Munta: LED vermell al pin 8, groc al pin 9 (~PWM), verd al pin 10,
  cada un amb la seva resistencia de 220 ohm cap a GND.
*/

const int VERMELL = 8;
const int GROC    = 9;   // ha de ser un pin PWM (~) per fer el fade del final
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms que dura el vermell
const int T_VERD    = 4000;  // ms que dura el verd
const int T_GROC    = 1500;  // ms que dura el groc

const int PAS_FADE  = 5;     // com mes gran, mes rapid el fade del groc
const int ESPERA    = 12;    // ms entre passos del fade

void setup() {
  // Les tres sortides ja estan configurades. No cal tocar res aqui.
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  // FASE 1: VERMELL
  // TODO: encen el LED vermell (digitalWrite ... HIGH)
  // TODO: espera T_VERMELL mil.lisegons (delay)
  // TODO: apaga el LED vermell (digitalWrite ... LOW)

  // FASE 2: VERD
  // TODO: encen el verd, espera T_VERD i apaga'l (com la fase 1)

  // FASE 3: GROC
  // TODO: encen el groc, espera T_GROC i apaga'l

  // FASE EXTRA (PWM, opcional): el groc "respira" abans de tornar a comencar.
  for (int valor = 0; valor <= 255; valor += PAS_FADE) {
    // TODO: aplica la intensitat 'valor' al groc amb analogWrite(...)
    delay(ESPERA);
  }
  // TODO: fes un altre for que BAIXI la intensitat de 255 a 0
  //       (canvia el <= per >= i el += per -=)
}
```

</details>

## 🔗 On ho aplicaràs

- **Repte de la S2:** activar la **fase nocturna** (ja tens la variable `nocturn` preparada) i, si vas fort, un semàfor de vianants.
- **Tot seguit:** la [variant amb `switch`](../02b_semafor_switch/02b_semafor_switch.ino) — el mateix semàfor, escrit d'una manera que escala millor.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
