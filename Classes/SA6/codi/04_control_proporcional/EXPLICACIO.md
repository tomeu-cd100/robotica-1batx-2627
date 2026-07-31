# Pràctica 4 · Control proporcional: dosificar segons l'error

**Quan es fa:** Sessions 2-3, repte + (+ampliació, per a qui va sobrat) · **Fitxer:** `04_control_proporcional.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (sensor a A0, sortida a 9~ — cal PWM)

## 🎯 Per què fem aquesta pràctica

El termòstat tot/res de la Pràctica 2 només sap fer dues coses: **tot** o **res**. És com regular la temperatura de la dutxa obrint i tancant l'aixeta **de cop**: funciona, però a batzegades. Tu no ho fas així: si l'aigua és *una mica* freda, obres *una mica* la calenta; si és *molt* freda, l'obres *molt*. Doses l'actuació **segons la mida del problema**.

Això és el **control proporcional**: la sortida és proporcional a l'**error** (la diferència entre el que mesures i el que vols). Error gran → resposta forta; error petit → resposta suau; error zero → res. El resultat és una regulació **més fina i sense batzegades** que el tot/res — i és la porta d'entrada al **PID**, el controlador que governa des de drons fins a plantes industrials (el veuràs a cursos superiors). Aquí en programes la P, amb una sola constant: `Kp`.

> ⚖️ Recorda: aquesta pràctica és **+ampliació** (notable/excel·lent). El nucli de la SA — i de la prova T2 — són la histèresi i la màquina d'estats.

## 🔮 Abans d'executar: prediu

Amb `CONSIGNA = 500` i `Kp = 0.8`: si la lectura és exactament **500**, quina sortida PWM tindrem? I si és **400** (per sota)? I ara la interessant: què creus que passarà si puges `Kp` a 20? Apunta-ho a l'activitat d'ampliació de la [fitxa](../../SA6_fitxa_alumnat.md) i comprova-ho al Serial Plotter.

## 🧠 El codi, per blocs

### Bloc 1 — La consigna i la constant `Kp`

```cpp
const int CONSIGNA = 500;     // valor objectiu (0-1023)
const float Kp = 0.8;         // constant proporcional (ajusta-la!)
```

`Kp` és el **caràcter** del controlador, i és un `float` (pot tenir decimals). Petita → controlador mandrós que reacciona fluix i tarda a arribar; gran → controlador nerviós que reacciona fort… i pot passar-se de frenada i **oscil·lar**. Ajustar `Kp` és l'ofici de l'enginyer/a de control — i el repte d'aquesta pràctica.

### Bloc 2 — L'error: el cor del control

```cpp
int t = analogRead(SENSOR);
int error = t - CONSIGNA;          // si fa mes calor del desitjat, error > 0
```

Una resta i prou, però és **el** concepte de la SA: l'error diu *quant* i *cap a on* ens hem desviat del que volíem. Tot el llaç tancat treballa per fer aquest número **zero**. Fixa't que pot sortir negatiu (lectura per sota de la consigna): vol dir "no cal actuar".

### Bloc 3 — La sortida proporcional (i el seu límit)

```cpp
int sortida = (int)(Kp * error);   // actuacio proporcional a l'error
sortida = constrain(sortida, 0, 255);  // limita a un rang valid de PWM

analogWrite(SORTIDA, sortida);
```

`Kp * error` és tota la fórmula del control P. Però el PWM només admet **0 a 255**, i la multiplicació pot sortir-se'n per dalt (error gran) o per sota (error negatiu): `constrain` la retalla al rang vàlid. Sense aquesta línia, `analogWrite` rebria valors sense sentit. L'`analogWrite` final és el mateix PWM que vas aprendre amb el fade de la SA2 — ara amb el valor calculat pel controlador, no per un `for`.

### Bloc 4 — Tres línies per al Serial Plotter

```cpp
Serial.print(CONSIGNA); Serial.print(" ");
Serial.print(t);        Serial.print(" ");
Serial.println(sortida);
delay(50);
```

Tres valors separats per espais = **tres corbes** al Serial Plotter: la consigna (plana), la lectura i la sortida. És aquí on es *veu* el control: com més s'allunya la lectura de la consigna, més puja la sortida — i com la resposta és suau comparada amb el clic-clic del tot/res.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La sortida oscil·la amunt i avall sense parar | `Kp` massa gran: el controlador es passa de frenada a cada correcció. Baixa-la. |
| La sortida és sempre 0 | La lectura no supera mai la consigna (error negatiu): escalfa el sensor o baixa `CONSIGNA`. |
| La sortida només fa tot o res | El pin de sortida no és PWM: cal un pin amb `~` (aquí el 9). |
| Mai no arriba ben bé a la consigna | Normal en un control només-P: amb error zero la sortida és zero. És el defecte que corregeix la **I** del PID. |

## 🔗 On ho aplicaràs

- **Repte ⭐ SA6_C:** el regulador proporcional de [`Reptes_SA6.md`](../../../../Reptes/Reptes_SA6.md), amb la comparació tot/res vs proporcional al Serial Plotter.
- **Prova T2:** és l'ampliació de nivell **excel·lent** de la Part A (l'enunciat ja la preveu).
- **SA7:** el seguidor de línia suau del robot és un control proporcional: com més desviat de la línia, més gir.
- **Més enllà:** afegint la **I** (memòria de l'error) i la **D** (tendència de l'error) tindries un **PID** — el controlador estàndard de la indústria.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
