# Pràctica 2 · Entrades analògiques: potenciòmetre i LDR

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_potenciometre_ldr.ino` · **Circuit:** [esquema de connexions](../../SA3_esquemes_connexions.md) (potenciòmetre=A0, LDR=A1, LED=9~)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA3_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Un polsador només sap dir **dues coses**: premut o no premut. Però el món real té matisos: quanta llum hi ha, com de girat està un botó de volum. Per això existeixen les **entrades analògiques**: `analogRead` converteix una tensió en un nombre de **0 a 1023** (conversió A/D de 10 bits).

Aquí llegiràs dos sensors alhora — un **potenciòmetre** (que dona la tensió directament pel cursor) i una **LDR** (que necessita un **divisor de tensió** amb una resistència de 10 kΩ per convertir la seva resistència variable en tensió) — i toparàs amb el problema d'escales del curs: `analogRead` dona 0–1023, però `analogWrite` (PWM) vol 0–255. El pont entre els dos mons és **`map()`**.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: **quan tapis la LDR amb la mà, la seva lectura (0–1023) pujarà o baixarà?** I quan la destapis de nou? Apunta-ho i comprova-ho amb el Monitor obert.

## 🧠 El codi, per blocs

### Bloc 1 — Pins analògics i el llindar

```cpp
const int POT = A0;
const int LDR = A1;
const int LED = 9;        // pin PWM

int llindar = 400;        // per sota d'aquest valor de LDR, considerem "fosc"
```

Els pins `A0`–`A5` són les entrades analògiques de l'UNO. El LED va al pin 9 perquè és **PWM** (`~`): en regularem la intensitat. I fixa't en `llindar`: un valor **entremig** de l'escala 0–1023 que separa "fosc" de "clar". No és un número màgic: el **calibraràs** mirant el Monitor sèrie al teu muntatge.

### Bloc 2 — Llegir 0–1023

```cpp
  int valorPot = analogRead(POT);   // 0..1023
  int valorLdr = analogRead(LDR);   // 0..1023
```

`analogRead` no necessita `pinMode`: les entrades analògiques ja ho són per defecte. Cada lectura és un nombre entre 0 (0 V) i 1023 (5 V). Per a la LDR, el que llegeixes és la tensió del **punt mig del divisor**: amb més llum, la LDR té menys resistència i la lectura canvia — al muntatge d'aquesta SA, **menys llum → valor més petit**.

### Bloc 3 — Reescalar amb map() i escriure amb PWM

```cpp
  // Opcio A: regular intensitat amb el potenciometre
  int brillantor = map(valorPot, 0, 1023, 0, 255);
  analogWrite(LED, brillantor);
```

`map(valor, 0, 1023, 0, 255)` tradueix proporcionalment de l'escala d'entrada (0–1023) a la de sortida (0–255). Sense aquesta línia, escriure `analogWrite(LED, valorPot)` amb un `valorPot` de 800 no faria el que esperes: `analogWrite` només entén 0–255. Resultat: gires el potenciòmetre i el LED puja i baixa d'intensitat en directe.

### Bloc 4 — El Monitor sèrie com a eina de calibratge

```cpp
  // Mostra les lectures al monitor serie (Eines > Serial Monitor)
  Serial.print("POT: ");  Serial.print(valorPot);
  Serial.print("  LDR: "); Serial.println(valorLdr);
```

Aquestes línies no són decoració: són el teu **instrument de mesura**. Per triar bé el llindar de la LDR necessites saber quin valor dona amb llum (p. ex. ~650) i tapada (p. ex. ~180) — i posar el llindar **entremig**. Al racó de mesura ho contrastaràs amb el multímetre: `lectura/1023 · 5 V ≈ tensió real` al punt mig del divisor.

### Bloc 5 — El repte, ja plantejat: el llum automàtic

Al final del sketch hi ha, **en un comentari**, el cor del repte de la sessió: substituir el contingut del `loop()` per una **decisió per llindar**:

```cpp
  int valorLdr = analogRead(LDR);
  if (valorLdr < llindar) {
    analogWrite(LED, 255);   // fa fosc -> llum encesa
  } else {
    analogWrite(LED, 0);     // hi ha llum -> apagada
  }
```

És el patró *llegir → comparar → actuar* (mira'l dibuixat al [diagrama de flux](../../SA3_diagrama_flux.md)): la base del producte de la S3 i, de fet, la llavor d'un classificador (SA8). Després del teu primer intent, compara'l amb l'[exemple resolt](../../SA3_exemple_resolt.md): és el **bessó comentat** d'aquest llum automàtic, amb tot el raonament pas a pas.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La LDR marca **sempre 0 o sempre 1023** i no canvia en tapar-la | El divisor de tensió no està fet: la LDR i la resistència de 10 kΩ han d'anar **en sèrie** entre 5 V i GND, amb el **punt mig** a A1. |
| El llum automàtic no s'encén mai (o sempre) | Llindar fora d'escala: compares amb 255 pensant en el PWM, però `analogRead` va de **0 a 1023**. Calibra'l amb el Monitor. |
| El LED no regula, només encès/apagat | El LED no és en un pin PWM (`~`), o escrius el valor 0–1023 directament sense `map()`. |
| El Monitor mostra símbols estranys | *Baud* del Monitor diferent del `Serial.begin(9600)`. |

## 🧗 Si t'encalles: l'esquelet

Si el llum automàtic no et surt, no et quedis en blanc: parteix d'aquest esquelet. La lectura, la funció i el Monitor sèrie ja hi són; tu només omples els `// TODO:` de la comparació amb el llindar i què fa cada cas. Compila tal qual; el LED no farà res fins que completis l'`if`.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA3 - sensor amb llindar (esquelet per comencar)

  El patro ja esta muntat: setup() amb Serial.begin per calibrar, la funcio de
  lectura del sensor donada, i un loop() que llegeix i mostra el valor al Monitor.
  Tu nomes has d'OMPLIR els // TODO: la comparacio amb el llindar i que fa cada cas.

  Metode SA3: llegir analogic (0..1023) -> comparar amb un llindar -> decidir.
  Munta: sensor analogic (LDR/pot en divisor) -> A1 ; LED -> [220 ohm] -> pin 9 (~) -> GND.
*/

const int SENSOR = A1;      // entrada analogica (punt mig del divisor)
const int LED = 9;          // sortida (pin ~ per si despres vols graduar-lo)
const int LLINDAR = 400;    // ajusta'l mirant el Monitor serie al teu muntatge
                            // (analogRead va de 0 a 1023, NO de 0 a 255)

// Funcio propia DONADA: llegeix i RETORNA el valor del sensor (0..1023).
int llegeixSensor() {
  return analogRead(SENSOR);
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);       // obre Eines > Serial Monitor per calibrar el llindar
}

void loop() {
  int valor = llegeixSensor();   // 0 = minim ... 1023 = maxim

  // Mostra la lectura per poder triar be el llindar (eina de calibratge)
  Serial.print("Sensor: ");
  Serial.println(valor);

  // Decisio per llindar: completa la comparacio i l'accio de cada cas.
  if (/* TODO: compara "valor" amb LLINDAR, p. ex. valor < LLINDAR */ false) {
    // TODO: que fa el sistema quan es supera el llindar? (p. ex. digitalWrite(LED, HIGH);)
  } else {
    // TODO: que fa en cas contrari? (p. ex. digitalWrite(LED, LOW);)
  }

  delay(100);
}
```

</details>

## 🔗 On ho aplicaràs

- **Repte de la S2:** el **llum automàtic** amb la LDR; **+ repte:** llindar ajustable amb el potenciòmetre (dues lectures analògiques treballant juntes).
- **Després del teu intent:** l'[exemple resolt de la llum de nit](../../SA3_exemple_resolt.md) és el **bessó** d'aquesta pràctica — el mateix mètode, raonat pas a pas.
- **Producte de la S3:** l'[alarma d'aparcament](../04_alarma_aparcament/EXPLICACIO.md) fa exactament el mateix patró *llegir → comparar → actuar*, però amb distància en lloc de llum.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
