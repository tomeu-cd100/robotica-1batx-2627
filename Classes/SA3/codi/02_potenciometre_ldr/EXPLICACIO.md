# Pràctica 2 · Entrades analògiques: potenciòmetre i LDR

**Quan es fa:** Sessió 2 · **Fitxer:** `02_potenciometre_ldr.ino` · **Circuit:** [esquema de connexions, apartat 2](../../SA3_esquemes_connexions.md) (potenciòmetre a A0, sensor de llum a A1, LED al pin 9)

## 🎯 Què faràs

Un botó només sap dir **dues coses**: premut o no premut. Però hi ha coses que tenen **molts** valors: quanta llum hi ha, quant has girat una rodeta… Avui llegiràs dos sensors així, i al final faràs un **llum automàtic**: un LED que s'encén sol quan es fa fosc.

## 🚀 Pas a pas

1. **Munta el circuit:**

   | Pin de l'Arduino | Va a… |
   |---|---|
   | A0 | la pota **del mig** del potenciòmetre (les altres dues, a 5 V i a GND) |
   | A1 | el punt on s'uneixen el sensor de llum (LDR) i la resistència de 10 kΩ |
   | 9 ~ | LED → resistència de 220 Ω → GND |

   El sensor de llum i la resistència de 10 kΩ van **una darrere l'altra** entre 5 V i GND. Mira el dibuix a l'esquema.
2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Obre el Monitor sèrie** (Eines → Monitor sèrie, 9600). Hi veuràs dos números que canvien tota l'estona: `POT` i `LDR`.
4. **Juga-hi:** gira el potenciòmetre (el número `POT` canvia i el LED fa més o menys llum). Després tapa el sensor amb la mà (el número `LDR` baixa). Escriu a Classroom entre quins números es mouen (de ___ a ___).
5. **Apunta al quadern** el número `LDR` amb llum i tapat. El necessitaràs al pas 6.
6. **El llum automàtic:** a sota de tot del codi hi ha, entre `/*` i `*/`, el codi del llum automàtic. Esborra el que hi ha dins del `loop()`, enganxa-hi aquest codi i canvia el `400` del `llindar` per un número **entre** els dos que has apuntat. Puja'l i tapa el sensor: el LED s'ha d'encendre.

## 🧠 Com funciona, a trossos

### Tros 1 — Els pins analògics i el llindar

```cpp
const int POT = A0;
const int LDR = A1;
const int LED = 9;        // pin PWM

int llindar = 400;        // per sota d'aquest valor de LDR, considerem "fosc"
```

- Els pins que comencen per **A** (A0, A1… A5) són els que poden llegir **molts valors**, no només sí o no.
- El LED va al pin 9, que té `~`: així en podem regular la llum, com a la SA2.
- `llindar` és **la ratlla que separa fosc de clar**. **Com a la vida real:** a les atraccions hi ha una marca que diu «si fas menys d'1,20 m, no hi pots pujar». Aquí: si el número del sensor de llum és més petit que el llindar, és que fa fosc.

### Tros 2 — `analogRead`: llegir un número de 0 a 1023

**Com a la vida real:** un termòmetre no diu només «fred» o «calor»: et dona un número.

```cpp
  int valorPot = analogRead(POT);   // 0..1023
  int valorLdr = analogRead(LDR);   // 0..1023
```

`analogRead` llegeix el pin i et dona un número entre **0** (0 volts) i **1023** (5 volts). En aquest muntatge, **com menys llum, més petit és el número del sensor de llum**.

> 💡 **Per què el sensor de llum necessita la resistència de 10 kΩ?** L'Arduino no pot llegir directament quanta llum hi ha: només sap llegir **volts**. La parella sensor + resistència converteix «més o menys llum» en «més o menys volts» al punt d'unió. Sense la companya, llegiries sempre 0 o 1023.

### Tros 3 — `map()`: el traductor

**Com a la vida real:** passar una nota sobre 20 a una nota sobre 10. Un 20 és un 10, un 10 és un 5… És la mateixa nota, en una altra escala.

```cpp
  // Opcio A: regular intensitat amb el potenciometre
  int brillantor = map(valorPot, 0, 1023, 0, 255);
  analogWrite(LED, brillantor);
```

`analogRead` dona números de **0 a 1023**, però `analogWrite` (el que regula la llum del LED) només entén de **0 a 255**. `map()` fa la traducció:

| `valorPot` (0-1023) | `brillantor` (0-255) |
|---|---|
| 0 | 0 |
| 512 | 127 |
| 1023 | 255 |

Resultat: gires el potenciòmetre i el LED fa més o menys llum.

### Tros 4 — El Monitor sèrie: veure els números

```cpp
  // Mostra les lectures al monitor serie (Eines > Serial Monitor)
  Serial.print("POT: ");  Serial.print(valorPot);
  Serial.print("  LDR: "); Serial.println(valorLdr);
```

Aquestes línies escriuen els dos números al Monitor. Són la teva **eina per triar el llindar**: mires quin número dona el sensor amb llum i tapat, i tries un llindar al mig. Al **Racó de mesura** ho compararàs amb el multímetre: número del Monitor ÷ 1023 × 5 ≈ els volts que mesuris.

### Tros 5 — El llum automàtic: decidir

**Com a la vida real:** el llum del carrer s'encén sol quan es fa fosc.

```cpp
  int valorLdr = analogRead(LDR);
  if (valorLdr < llindar) {
    analogWrite(LED, 255);   // fa fosc -> llum encesa
  } else {
    analogWrite(LED, 0);     // hi ha llum -> apagada
  }
```

Llegit en veu alta: *«Llegeix el sensor de llum. **Si** el número és més petit que el llindar (fa fosc), encén el LED. **Si no**, apaga'l.»*

Aquesta és la idea més important de la SA: **llegir → comparar → actuar**. La faràs servir a la mascota i a la prova. Si et costa, mira-la [dibuixada](../../SA3_diagrama_flux.md) o l'[exemple resolt](../../SA3_exemple_resolt.md).

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| El sensor de llum diu **sempre 0 o sempre 1023** | Falta la resistència de 10 kΩ, o no està ben unida al sensor. | Mira el dibuix de l'esquema, apartat 2. |
| El llum automàtic no s'encén mai (o sempre) | El llindar no està entre els números de llum i de tapat. | Mira el Monitor i tria un número al mig. |
| El LED només s'encén o s'apaga, sense fer més o menys llum | El LED no és en un pin amb `~`. | Posa'l al pin 9. |
| Al Monitor surten símbols estranys | La velocitat no és 9600. | A baix a la dreta del Monitor, tria 9600. |

## 🧗 Si t'encalles: l'esquelet

Si el llum automàtic no et surt, parteix d'aquest esquelet. La lectura i el Monitor sèrie ja hi són; tu només omples els `// TODO:` (la comparació amb el llindar i què fa el LED). Es pot pujar tal com està, però el LED no farà res fins que completis l'`if`.

<details markdown="1">
<summary>Desplega l'esquelet (copia'l a un programa nou)</summary>

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

- **La mascota (Sessió 3):** la reacció «**es fa fosc → la mascota s'adorm**» és exactament aquest llum automàtic.
- **Prova T1 (Sessió 4):** el circuit de la prova també és «llegir un sensor → comparar → encendre un llum».

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
