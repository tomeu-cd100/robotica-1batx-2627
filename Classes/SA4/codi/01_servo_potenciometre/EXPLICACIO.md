# Pràctica 1 · Servo amb potenciòmetre: posició amb una llibreria

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_servo_potenciometre.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (servo=9, potenciòmetre=A0)

## 🎯 Per què fem aquesta pràctica

Fins ara les teves sortides eren LEDs: encendre, apagar, graduar. Avui el sistema **es mou**. I la primera distinció del dia és la important: un **servo** no és un motor que gira i gira — és un motor que va a la **posició** que li demanes (un angle de 0 a 180°) i s'hi queda. Per això serveix per a braços robòtics, barreres o timons: llocs on importa *on* és, no *com de ràpid* gira.

També estrenes una eina nova: una **llibreria** (`Servo.h`). Controlar un servo "a pèl" voldria dir generar polsos elèctrics amb una precisió de microsegons; la llibreria ho fa per tu i et deixa una ordre llegible: `write(angle)`. Aprofitar codi ja escrit i provat és com treballen els programadors de veritat.

I el tercer ingredient és el circuit sencer llegit com una **cadena entrada → càlcul → sortida**: el potenciòmetre (entrada, com a la SA3) dona un número, `map()` el converteix, i el servo (sortida) es mou. Aquesta cadena és l'esquema de tot el que faràs d'ara endavant.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: què farà el servo quan **giris el potenciòmetre a poc a poc**? I si el deixes quiet a mig recorregut? On apuntarà el servo amb el potenciòmetre al mínim (0) i al màxim (1023)? Apunta la predicció a l'Activitat 1 de la [fitxa](../../SA4_fitxa_alumnat.md) i comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — La llibreria i l'objecte servo

```cpp
#include <Servo.h>

Servo servo;
const int POT = A0;
```

`#include <Servo.h>` diu al compilador: *afegeix al meu programa tot el codi de la llibreria Servo*. A partir d'aquí pots crear un objecte `Servo` (aquí li hem dit `servo`, però podria dir-se `barrera` o `brac`): és la "maneta" amb què donaràs ordres al servo físic.

### Bloc 2 — Dir-li on és connectat

```cpp
void setup() {
  servo.attach(9);     // el servo esta connectat al pin 9
}
```

`attach(9)` lliga l'objecte amb el pin físic. Fixa-t'hi: per al servo **no cal `pinMode()`** — la llibreria se n'encarrega. Si t'oblides de l'`attach()`, el programa compila perfectament… i el servo no es mou mai. És l'oblidat clàssic del dia.

### Bloc 3 — La cadena entrada → càlcul → sortida

```cpp
void loop() {
  int valor = analogRead(POT);          // 0..1023
  int angle = map(valor, 0, 1023, 0, 180);  // 0..180 graus
  servo.write(angle);
  delay(15);           // petita pausa perque el servo arribi
}
```

Tres línies, tres feines:

- `analogRead(POT)` llegeix el potenciòmetre: un número de **0 a 1023** (el conversor analògic de la SA3).
- `map(valor, 0, 1023, 0, 180)` **reescala**: el rang del potenciòmetre no coincideix amb el rang del servo, i `map()` fa la regla de tres per tu.
- `servo.write(angle)` demana la **posició**: 0° un extrem, 90° el centre, 180° l'altre extrem. Si demanes més de 180, el servo satura a 180 i prou.

El `delay(15)` final dona temps al servo a moure's cap a la posició demanada abans de rebre la següent ordre. El servo no és instantani: és mecànica, no electrònica.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El servo vibra o no arriba a l'angle | Alimentació insuficient: si mous més d'un servo (o el servo fa força), alimentació **externa** de 5 V amb **massa comuna**. |
| El servo no es mou gens | Falta `servo.attach(9)` al `setup()`, o el cable de senyal (taronja/groc) no és al pin 9. |
| El servo salta a llocs "aleatoris" | El cursor del potenciòmetre (pota central) no és a A0, o un extrem del potenciòmetre està desconnectat. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el repte de la S1 és l'"escombrada" automàtica (vaivé 0↔180) — mateix servo, però l'angle el genera un `for`, no el potenciòmetre.
- **A la S4:** la [barrera automàtica](../04_barrera_automatica/04_barrera_automatica.ino) és un servo que va d'un angle tancat a un d'obert.
- **Al robot del trimestre:** el control de servos amb potenciòmetre són les **articulacions del braç** ([dossier](../../../00_General/00_Projecte_T2_Brac.md)). Guarda el codi.
