# Pràctica 3 · El fade: graduar la intensitat amb PWM

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_fade_pwm.ino` · **Circuit:** [esquema de connexions](../../SA2_esquemes_connexions.md) (LED al pin 9, que és PWM) · **Suport:** [diagrama de flux](../../SA2_diagrama_flux.md)

## 🎯 Per què fem aquesta pràctica

Fins ara els teus pins només sabien fer dues coses: `HIGH` (5 V) o `LOW` (0 V). Encès o apagat. La pregunta d'avui: *com es regula la intensitat d'un LED si només hi ha HIGH i LOW?*

La resposta és un truc elegant: **PWM** (*Pulse Width Modulation*). El pin s'encén i s'apaga **milers de vegades per segon**, i el que regules és **quanta estona de cada cicle passa encès**. L'ull no veu el parpelleig: veu una mitjana. 25 % del temps encès → LED fluix; 90 % → gairebé a tope. Amb això, un pin digital fa una feina «analògica»: intensitats, colors (Pràctica 4), velocitats de motor (SA4).

## 🔮 Abans d'executar: prediu

`analogWrite(LED, 255)` és el màxim i `analogWrite(LED, 0)` apagat. **Què farà `analogWrite(LED, 128)`?** I el sketch sencer, què creus que farà veure al LED?

## 🧠 El codi, per blocs

### Bloc 1 — Un pin especial

```cpp
const int LED = 9;   // ha de ser un pin PWM (~)
```

El PWM **no funciona a tots els pins**: a l'Arduino UNO, només als marcats amb `~` (3, 5, 6, 9, 10 i 11). És el mantra de la sessió: *PWM només als pins `~`*. Si connectes el LED al pin 8 i crides `analogWrite`, no obtindràs graduació.

### Bloc 2 — Pujar la intensitat: `for` + `analogWrite`

```cpp
for (int valor = 0; valor <= 255; valor++) {
  analogWrite(LED, valor);
  delay(8);
}
```

- `analogWrite(LED, valor)` fixa la intensitat: **0** (apagat) a **255** (màxim). Compte amb els rangs: 0–255 és el d'**escriptura** PWM; el 0–1023 que veuràs a la SA3 és el de **lectura** analògica. Barrejar-los és l'error clàssic.
- El `for` fa el recompte: `valor` comença a 0, puja d'1 en 1, i a cada pas el LED brilla una mica més.
- El `delay(8)` dona el ritme: 256 passos × 8 ms ≈ 2 segons de pujada. Sense ell, la pujada seria instantània i no veuries l'efecte.

### Bloc 3 — Baixar: el mateix `for`, invertit

```cpp
for (int valor = 255; valor >= 0; valor--) {
  analogWrite(LED, valor);
  delay(8);
}
```

Mateixa estructura amb els tres elements girats: comença a 255, condició `>= 0`, i `valor--` per baixar. Pujada + baixada dins de `loop()` = la «respiració» infinita.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El LED va a tope o apagat, sense gradació | El pin no és PWM (no té `~`): mou-lo al 9 o similar. |
| «No fa res» | Valors fora de rang o barreja 0–1023 / 0–255. |
| La respiració va massa ràpida/lenta | Juga amb el `delay(8)` — és el paràmetre de ritme. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el [LED RGB](../04_rgb/04_rgb.ino) són **tres** PWM alhora — un per color.
- **Repte S3:** transició suau entre dos colors = dos *fades* coordinats. La funció `map()` (converteix un rang en un altre) t'hi pot ajudar.
- **Exemple resolt:** el [llum de posició amb respiració](../../SA2_exemple_resolt.md) és el **bessó** d'aquesta pràctica — el mateix patró amb un muntatge i un context expressament diferents, comentat pas a pas amb tot el raonament. Mira'l després del teu primer intent.
