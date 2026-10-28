# Pràctica 4 · Producte: el braç amb quatre potenciòmetres

**Quan es fa:** Sessió 4 (producte) · **Fitxer:** `04_brac_potenciometres.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (servos 9/6/10/11 amb piles i GND comú; potenciòmetres A0-A3)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA4_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què fem aquesta pràctica

El MeArm ja és muntat. Avui li dones el primer control complet: **quatre
potenciòmetres, quatre articulacions**, com el comandament de sobretaula
d'una grua. És la pràctica de la S1 multiplicada per quatre, però amb tres
idees noves que separen un braç que funciona d'un braç que es crema:

1. **Rang segur:** cada servo té els seus **angles límit** (els has anotat
   al taller). Si li demanes més, la peça toca el topall i el servo s'escalfa
   fent força. Per això `map()` ja no va a 0-180, sinó al rang de cada servo.
2. **Zona morta:** el potenciòmetre té soroll. Si el servo obeeix cada canvi
   d'1°, el braç tremola. Només el movem quan el canvi és prou gran.
3. **Funcions amb paràmetres:** quatre servos amb el mateix codi copiat quatre
   vegades és la recepta per equivocar-se. Una funció fa la feina i la
   crides quatre cops.

## 🔮 Abans d'executar: prediu

On anirà el servo de la pinça si gires el seu potenciòmetre **al mínim**? I
**al màxim**? (Pista: mira les constants `PINCA_MIN` i `PINCA_MAX`.) Què
creus que passaria amb `ZONA_MORTA = 0`? Apunta-ho a l'Activitat 4 de la
[fitxa](../../SA4_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Pins i rangs segurs

```cpp
const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_ESQUERRE = 6;   // servo nou del MeArm
const int PIN_SERVO_DRET = 10;      // ocupa el lloc del colze del brac de 3 servos
const int PIN_SERVO_PINCA = 11;

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;   // tancada .. oberta
```

El cotxe d'autoescola té un segon pedal de fre al costat del professor: per
molt que l'alumne s'equivoqui, hi ha un límit que no es pot passar. Aquestes
constants són aquell fre. **Canvia-les pels angles que has anotat** al bloc D
del muntatge: els valors d'aquí són d'exemple i el teu braç és únic.

### Bloc 2 — Dues funcions per a quatre servos

```cpp
int llegeixAngle(int pinPot, int minim, int maxim) {
  return map(analogRead(pinPot), 0, 1023, minim, maxim);
}

void mouSiCal(Servo &servo, int &actual, int nou) {
  if (abs(nou - actual) > ZONA_MORTA) {
    actual = nou;
    servo.write(actual);
  }
}
```

`llegeixAngle()` és la cadena de la S1 (llegir → traduir) empaquetada: li dius
quin potenciòmetre i quin rang, i et torna l'angle.

`mouSiCal()` porta un detall nou: el `&`. Normalment, quan passes una variable
a una funció, la funció en rep una **fotocòpia**: si la canvia, l'original no
se n'assabenta. Amb `&` li passes **l'original**. Aquí cal, perquè la funció
ha de poder actualitzar l'angle guardat (`actual = nou`) i el servo de veritat.
I l'`abs(nou - actual) > ZONA_MORTA` és la zona morta: si el canvi és de 1 o
2 graus, és soroll i no fem res.

### Bloc 3 — Arrencar sense saltar

```cpp
  angleBase = llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX);
  // ... igual per als altres tres ...
  base.write(angleBase);
  // ...
  base.attach(PIN_SERVO_BASE);
```

Si fas `attach()` primer, el servo s'engega a 90° i, una mil·lèsima després,
salta on diu el potenciòmetre: un cop sec que pot fer caure el que aguanta la
pinça. Fent el `write()` **abans** de l'`attach()`, el servo s'engega
directament a la posició bona.

### Bloc 4 — El `loop()` i l'informe

```cpp
void loop() {
  mouSiCal(base, angleBase, llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX));
  // ... esquerre, dret i pinca ...

  if (millis() - tDarrerInforme > 500) {
    tDarrerInforme = millis();
    Serial.print("base=");
    // ...
  }
  delay(20);
}
```

Quatre línies, quatre articulacions: el `loop()` es llegeix sol. I l'informe
al **Monitor sèrie** fa servir `millis()` en lloc de `delay(500)`: si
s'esperés mig segon, el braç també reaccionaria cada mig segon. És el mateix
truc de la [bastida de la S3](../05_dos_servos_millis/EXPLICACIO.md).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Un servo brunz i s'escalfa quiet | Força contra el topall: el teu `_MIN` o `_MAX` és massa ample. Torna a mesurar. |
| El braç tremola encara que no toquis res | Servos a l'USB (han d'anar a les piles amb GND comú) o `ZONA_MORTA` massa petita. |
| Un potenciòmetre mou el servo que no toca | Cursor connectat a l'entrada analògica equivocada. Comprova A0-A3 amb el Monitor sèrie. |
| El servo va al revés del potenciòmetre | Normal: depèn de com és muntat. Intercanvia `_MIN` i `_MAX` en el `llegeixAngle()` d'aquell servo. |

## 🔗 On ho aplicaràs

- **Reptes de la SA4:** el [repte B](../../../../Reptes/Reptes_SA4.md) converteix aquest braç en un dispensador automàtic, i el C li dona memòria (gravar i reproduir).
- **A la SA5:** els potenciòmetres es queden, però hi arriba un **comandament per ràdio** que fa la mateixa feina sense fils.
- **A la SA6:** la màquina d'estats del braç fa servir aquest control com a mode **manual**.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA4](../../../../Reptes/Reptes_SA4.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
