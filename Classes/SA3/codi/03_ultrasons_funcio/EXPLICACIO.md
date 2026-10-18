# Pràctica 3 · Ultrasons: la primera funció que retorna un valor

**Quan es fa:** Sessió 3 (primera part, ~25') · **Fitxer:** `03_ultrasons_funcio.ino` · **Circuit:** [esquema de connexions, apartat 3](../../SA3_esquemes_connexions.md) (TRIG al 12, ECHO a l'11)

## 🎯 Què faràs

Mesuraràs **a quina distància** tens la mà, sense tocar-la, i ho veuràs en una **gràfica** a l'ordinador. I aprendràs una cosa nova: una **funció que et torna un número**.

## 🚀 Pas a pas

1. **Munta el sensor:**

   | Pota del sensor | Pin de l'Arduino |
   |---|---|
   | VCC | 5 V |
   | TRIG | 12 |
   | ECHO | 11 |
   | GND | GND |

2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Obre el Serial Plotter:** a l'Arduino IDE, **Eines → Serial Plotter**, i tria **9600**. (Si tens el Monitor sèrie obert, tanca'l primer: no poden estar oberts tots dos.)
4. **Mou la mà** a poc a poc cap al sensor i després allunya-la. La línia de la gràfica puja i baixa: és la distància en centímetres.
5. **Respon a Classroom** les dues preguntes de l'ultrasons: la fórmula de la distància (tros 3) i què **et torna** la funció `mesuraDistancia()` (tros 2).
6. **Quan acabis, desmunta el sensor:** la mascota necessita el pin 11.

## 🧠 Com funciona, a trossos

### Tros 1 — El sensor és un ratpenat

**Com a la vida real:** els ratpenats fan un crit tan agut que nosaltres no el sentim. El so xoca contra les coses i torna: és l'**eco**. Com més triga a tornar, més lluny és la cosa.

El sensor fa el mateix amb els seus dos «ulls»: un **crida** (TRIG) i l'altre **escolta l'eco** (ECHO).

```cpp
const int TRIG = 12;
const int ECHO = 11;
```

| Pin | Què fa | Per això al `setup()`… |
|---|---|---|
| TRIG (12) | L'Arduino li diu «crida!» | és una **sortida** (`OUTPUT`) |
| ECHO (11) | El sensor avisa «he sentit l'eco» | és una **entrada** (`INPUT`) |

### Tros 2 — Una funció que **et torna** un número

**Com a la vida real:** preguntes a algú «a quina distància és la paret?» i et **respon** amb un número. No t'explica com ho ha mesurat: només et dona la resposta.

```cpp
// Funcio propia: mesura i RETORNA la distancia en cm
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
```

- A la SA2 vas fer la funció `color()`, que **feia** una feina. `mesuraDistancia()` fa una feina i, a més, **et torna el resultat**.
- La paraula `float` del davant vol dir: *aquesta funció et tornarà un número amb decimals* (els centímetres).
- Les línies de dins fan **cridar** el sensor: encenen el TRIG durant 10 **micro**segons (milionèsimes de segon, molt menys que un mil·lisegon). Per això fa servir `delayMicroseconds` en lloc de `delay`.

### Tros 3 — Escoltar l'eco i calcular la distància

```cpp
  long temps = pulseIn(ECHO, HIGH, 30000);  // temps de l'eco en us (timeout 30 ms)
  if (temps == 0) return 400;               // sense eco: objecte fora de rang (molt lluny)
  float dist = temps * 0.034 / 2.0;   // cm (velocitat del so ~0.034 cm/us)
  return dist;
}
```

| Línia | Què fa |
|---|---|
| `pulseIn(ECHO, HIGH, 30000)` | Cronometra quant triga a tornar l'eco. Si en 30 mil·lisegons no torna res, s'atura i dona **0**. |
| `if (temps == 0) return 400;` | **El parany:** si no ha tornat cap eco, és que no hi ha res a prop. Diem «molt lluny» (400 cm) i no «0 cm», que voldria dir «enganxat». |
| `temps * 0.034 / 2.0` | Calcula la distància. El so recorre 0,034 cm cada microsegon, i **dividim per 2** perquè el so fa **anada i tornada**. |
| `return dist;` | **Et torna** la distància. Aquí és on la funció «et respon». |

Per tant: **distància (cm) = temps × 0,034 ÷ 2**.

### Tros 4 — La mitjana de 3 mesures (per a qui vulgui més)

```cpp
// REPTE resolt: mitjana de 3 mesures (filtre simple)
float distanciaMitjana() {
  float suma = 0;
  for (int i = 0; i < 3; i++) {
    suma += mesuraDistancia();
    delay(20);
  }
  return suma / 3.0;
}
```

De vegades el sensor s'equivoca una mica i la línia «balla». Aquesta funció mesura **3 vegades** i et torna la **mitjana**, com quan fas la mitjana de tres notes. Fixa't que **fa servir l'altra funció**: no cal tornar a escriure com es crida el sensor.

### Tros 5 — El `loop()`: curt i clar

```cpp
void loop() {
  float d = distanciaMitjana();
  Serial.println(d);     // una sola dada per linia: ideal per al Serial Plotter
  delay(100);
}
```

Com que tota la feina és a les funcions, el `loop()` només té tres línies: *mesura, escriu el número, espera una mica*. El Serial Plotter dibuixa aquests números com una gràfica.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| Sempre surt 0 o un número sense sentit | TRIG i ECHO canviats de lloc, o el sensor sense 5 V o GND. | Mira la taula del pas 1. |
| De cop salta a 400 | No ha tornat cap eco: no hi ha res a prop, o la cosa és tova (roba) i no fa eco. | Normal. Posa la mà plana davant del sensor. |
| La gràfica no surt | El Monitor sèrie està obert, o la velocitat no és 9600. | Tanca el Monitor i tria 9600 al Plotter. |

## 🔗 On ho aplicaràs

- **Ara mateix:** la teva **mascota**. Desmunta el sensor i passa al pas 5 de la sessió.
- **Si acabes abans:** l'[alarma d'aparcament](../04_alarma_aparcament/EXPLICACIO.md) fa servir aquesta mateixa funció per fer «bip-bip» com un cotxe.
- **Prova T1:** escriure i fer servir una funció que torna un número és una de les coses que s'hi avaluen.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
