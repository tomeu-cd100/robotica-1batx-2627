# Pràctica 3 · El fade: graduar la intensitat amb PWM

**Quan es fa:** Sessió 2 · **Fitxer:** `03_fade_pwm.ino` · **Circuit:** [esquema de connexions, apartat 3](../../SA2_esquemes_connexions.md) (un LED al pin 9) · **Suport:** [diagrama de flux](../../SA2_diagrama_flux.md)

## 🎯 Què faràs

Un LED que **respira**: s'encén a poc a poc fins a brillar del tot i després s'apaga a poc a poc, sense parar. Fins ara un LED només podia estar encès o apagat; avui aprendràs a dir-li **quant** ha de brillar.

## 🚀 Pas a pas

1. **Munta el circuit:** un LED al **pin 9** amb la seva resistència de 220 Ω (pota llarga cap al pin, curta cap a GND). El pin 9 té el símbol **`~`** al costat del número: això vol dir que pot fer PWM.
2. **Carrega el codi:** prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

3. **Mira el LED:** s'encén i s'apaga a poc a poc? Escriu a Classroom entre quins valors va `analogWrite` (de ___ a ___). La resposta és al tros 2.
4. **Canvia el ritme:** a les dues línies `delay(8);` posa `delay(2);` i torna'l a pujar. Després prova `delay(20);`. Què canvia?
5. **Prova un pin sense `~`:** mou el cable del LED al pin 8 i canvia `const int LED = 9;` per `8`. Què passa? Després torna-ho al 9.

## 🧠 Com funciona, a trossos

### Tros 1 — El truc del PWM: encendre i apagar molt de pressa

**Com a la vida real:** imagina que encens i apagues la llum de l'habitació **molt, molt de pressa**, centenars de vegades per segon. No veuries el parpelleig: veuries una llum **fluixa**. Si la deixes encesa més estona que apagada, la veus més forta; si la deixes més estona apagada, més fluixa.

Això és el **PWM**. L'Arduino no pot donar «mig corrent», però sí que pot encendre i apagar el pin unes 490 vegades per segon i decidir **quina part del temps** està encès. Només ho saben fer els pins marcats amb **`~`**: el 3, 5, 6, 9, 10 i 11.

```cpp
const int LED = 9;   // ha de ser un pin PWM (~)
```

### Tros 2 — `analogWrite`: dir quant ha de brillar

**Com a la vida real:** el regulador de la llum del menjador, la rodeta que la fa més forta o més fluixa.

```cpp
analogWrite(LED, valor);
```

`analogWrite` és com `digitalWrite`, però en lloc de dir només «encès» o «apagat», li dones un número **de 0 a 255**:

| Valor | El LED… |
|---|---|
| `0` | apagat |
| `64` | fluix |
| `128` | a mitges |
| `255` | al màxim |

### Tros 3 — El `for`: pujar esglaó a esglaó

**Com a la vida real:** pujar una escala. Comences al primer esglaó, puges d'un en un i pares quan arribes a dalt. A cada esglaó fas el mateix: un pas i una petita pausa.

```cpp
for (int valor = 0; valor <= 255; valor++) {
  analogWrite(LED, valor);
  delay(8);
}
```

El `for` és una **repetició amb comptador**. La primera línia té tres parts, separades per `;`:

| Part | Què vol dir |
|---|---|
| `int valor = 0` | Comença amb el comptador `valor` a 0 (el primer esglaó). |
| `valor <= 255` | Continua mentre `valor` sigui 255 o menys (encara no ets a dalt). |
| `valor++` | Després de cada volta, suma 1 a `valor` (puja un esglaó). |

El que hi ha entre `{ }` es fa a **cada esglaó**: posa la brillantor al valor actual i espera 8 mil·lisegons. Són 256 esglaons × 8 ms ≈ **2 segons** de pujada. Per això, al pas 4, un `delay` més gran fa la respiració més lenta.

### Tros 4 — Baixar: la mateixa escala, al revés

```cpp
for (int valor = 255; valor >= 0; valor--) {
  analogWrite(LED, valor);
  delay(8);
}
```

És el mateix, però girat: comença a dalt (255), continua mentre sigui 0 o més, i a cada volta **resta** 1 (`valor--`). Com que tot és dins del `loop()`, després de baixar torna a pujar: el LED respira per sempre.

## ⚠️ Errors que veuràs segur

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| El LED només fa encès/apagat, sense gradació | El pin no té `~` (no és PWM). | Torna'l al pin 9. |
| No fa res | Valors fora de 0–255, o el LED al revés. | Comprova els números i la pota llarga. |
| Respira massa de pressa o massa a poc a poc | És el `delay`. | Puja'l (més lent) o baixa'l (més ràpid). |

## 🔗 On ho aplicaràs

- **Ara mateix:** el [LED RGB](../04_rgb/EXPLICACIO.md) són **tres** LED regulats així, un per a cada color.
- **Repte de la sessió:** una transició suau entre dos colors són dos *fades* que passen alhora.
- **Exemple resolt:** el [llum de posició que respira](../../SA2_exemple_resolt.md) és el mateix patró amb un altre muntatge, comentat pas a pas. Mira'l **després** del teu primer intent.
- **SA4:** amb el PWM regularàs la **velocitat d'un motor**.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
