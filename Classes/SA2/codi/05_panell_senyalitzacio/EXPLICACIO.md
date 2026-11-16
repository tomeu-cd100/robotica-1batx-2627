# Pràctica 5 · Producte: el panell de senyalització

<div class="cap-practica" markdown="1">


❓ **La pregunta:** Com explica una màquina el seu estat amb llum i so?

🎯 **Avui aconseguiràs:** un **panell d'avisos** amb els teus estats (color + so) i defensar-lo en 1 minut. És el producte de la SA2.

⏱️ Tota la sessió

📦 Mòdul RGB, brunzidor (piezo) i cables

</div>

Un panell com el de les màquines de veritat. Aquest és l'exemple d'una caldera:

| Estat | Exemple: una caldera | El panell fa… |
|---|---|---|
| ✅ Tot correcte | Va bé. | Llum verda. |
| ⚠️ Avís | S'està escalfant massa. | Llum groga + un bip curt. |
| 🚨 Alarma | S'ha passat de temperatura. | Llum vermella + un bip llarg i més agut. |

El codi ja funciona. **La teva feina és fer-lo teu:** decidir els teus estats, colors i sons. Això és el que s'avalua (R1 codi + R2 circuit).

## 🚀 Pas a pas

### Pas 1 · Mini-check en paper

El docent et dona un full: escriu **de memòria** un programa que faci parpellejar un LED. Tens 10 minuts i **no compta per a nota**.

✅ **Comprova:** has entregat el full al docent.

### Pas 2 · Dissenya abans de programar

Decideix com serà cada estat: quin color i quin so (agut o greu, curt o llarg, o cap).

✍️ **Apunta-ho:** estat «Tot correcte»: color RGB / so (piezo).

✍️ **Apunta-ho:** estat «Avís»: color RGB / so (piezo).

✍️ **Apunta-ho:** estat «Alarma»: color RGB / so (piezo).

### Pas 3 · Munta el circuit

| Component | Connexió |
|---|---|
| Mòdul RGB | R → 9 · G → 10 · B → 11 · − → GND (com a la Pràctica 4) |
| Brunzidor (piezo) | + → pin 6 · − → GND |

![Connexions del panell: pins 9, 10 i 11 a R, G i B del mòdul RGB; pin 6 a la pota + del brunzidor; les potes − a GND](../../img/sa2-panell-connexions.svg)

> ⚠️ El brunzidor va **directe al pin 6**. És un brunzidor *passiu*: només sona amb el senyal que fa `tone()` pel pin (s'encén i s'apaga mil vegades per segon). Si li arriben 5 V fixos, no fa cap so.

✅ **Comprova:** el brunzidor té la pota + al pin 6 i la − a GND, i el mòdul RGB té els cables als pins 9, 10 i 11.

### Pas 4 · Carrega el codi

Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

✅ **Comprova:** fa els tres estats, 2 segons cadascun, sense parar: verd en silenci, groc amb un bip curt i vermell amb un bip llarg i agut.

### Pas 5 · Fes-lo teu

Canvia els colors i els sons de cada estat perquè siguin els del teu disseny del pas 2. A «🧠 Vols saber per què funciona?», tros 3, tens què has de tocar.

- **Mínim:** 2 estats que es distingeixin bé (amb color **i** so).
- **Complet:** 3 estats, cadascun en la seva funció, que es reconeguin pel color i pel so.

✅ **Comprova:** el panell fa els estats que vas dissenyar.

### Pas 6 · Prepara la defensa d'1 minut

Pensa què diràs: què fa el teu panell i una millora que li faries.

✅ **Comprova:** ho saps explicar en 1 minut sense llegir.

### Pas 7 · Un error, apuntat

✍️ **Apunta-ho:** un error que has trobat i com l'has resolt.

### Pas 8 · Respon i envia

📤 [Obre la tasca «SA2 · Pràctica 5» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3Mzc4MDYxMjU5/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i, després, fes l'**[🏁 Entrega final de la SA2](../../README.md#entrega-final)**: la defensa i l'autoavaluació.

⭐ **Si acabes abans:** afegeix un quart estat (per exemple `estatManteniment()`, en blau). Més reptes a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| El brunzidor no sona | Està al revés, en un altre pin o connectat a 5 V en lloc del pin 6. | + al pin 6, − a GND. |
| Un color amb blau surt estrany després del primer bip | `tone()` i el pin 11 (el blau) fan servir el mateix rellotge intern de l'Arduino. | Per al blau, fes servir només 0 o 255. |
| Colors estranys | Cables del RGB canviats de lloc. | Mira la Pràctica 4. |
| L'IDE marca un error en vermell després de canviar-lo | Falta un `;` o un parèntesi. | Mira la línia que marca l'IDE i la de just abans. |

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

Aquí no hi ha res nou de programació: hi ha **tot el que ja saps, junt**. El més important és com s'organitza.

### Tros 1 — Els components, amb nom

```cpp
const int R = 9, G = 10, B = 11;   // LED RGB
const int PIEZO = 6;               // brunzidor
```

Dos components, cadascun amb el seu nom. La novetat de maquinari és el **brunzidor (piezo)**: fa so. **Com a la vida real**, és com la pell d'un tambor: l'Arduino l'estira i l'amolla moltes vegades per segon, i com més vegades per segon, més agut sona. Més endavant tens la instrucció per fer-lo sonar.

### Tros 2 — `color()`: la mateixa de la Pràctica 4

```cpp
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}
```

És **exactament la mateixa** funció de la [Pràctica 4](../04_rgb/EXPLICACIO.md). Una funció ben feta es reaprofita tal com està.

### Tros 3 — Una funció per a cada estat (aquí és on personalitzes)

**Com a la vida real:** els botons d'una rentadora («cotó», «delicat», «ràpid»). Cada botó té un nom i, a dins, tot el que s'ha de fer en aquell programa. Tu només prems «delicat».

```cpp
void estatAvis() {
  color(255, 180, 0);        // groc
  tone(PIEZO, 1000, 150);    // bip curt (1 kHz, 150 ms)
}
```

Cada estat és una **funció amb nom** (`estatCorrecte()`, `estatAvis()`, `estatAlarma()`) i, a dins, hi ha **tot** el que aquell estat vol dir. Per canviar l'avís, només has de tocar aquesta funció.

| Línia | Què fa | Què pots canviar |
|---|---|---|
| `color(255, 180, 0);` | Posa el llum groc. | Els tres números: el color. |
| `tone(PIEZO, 1000, 150);` | Fa un bip de 1000 Hz durant 150 ms. | 1000 → més agut o més greu (prova 500 o 2000). 150 → més curt o més llarg. |
| `noTone(PIEZO);` | Fa callar el brunzidor (és a `estatCorrecte`). | — |

### Tros 4 — El `loop()`: passar pels estats

```cpp
void loop() {
  // Demostracio ciclica dels tres estats (en el projecte real,
  // l'estat es decidira a partir de sensors - vegeu SA3).
  estatCorrecte();  delay(2000);
  estatAvis();      delay(2000);
  estatAlarma();    delay(2000);
}
```

Com que cada estat té la seva funció, el `loop()` es llegeix com una frase: *tot correcte, espera 2 segons; avís, espera 2 segons; alarma, espera 2 segons*, i torna a començar. Ara és una **demostració**; a la SA3, qui decidirà l'estat serà un **sensor** (per exemple, un de temperatura).

**Vols un quart estat?** Escriu una funció nova (per exemple `estatManteniment()`, en blau) copiant-ne una altra, i afegeix-la al `loop()` amb el seu `delay`.

### On ho aplicaràs

- **Avui mateix:** la **defensa d'1 minut** i l'**Entrega final** de la SA2.
- **SA3:** el panell aprendrà a **percebre**: l'estat el decidirà un sensor, no el `delay`.
- **El tamagotchi del trimestre:** els estats amb color i so són els mateixos que tindrà el teu tamagotchi.

</details>
