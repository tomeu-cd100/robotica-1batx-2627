# SA4 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA4](SA4_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *variació*: la solució usa **els valors del kata** (expressament diferents dels del sketch) — en comentar, insisteix que compta l'estructura, no els números.

## Solució · `01_servo_potenciometre`

```cpp
void loop() {
  int valor = analogRead(POT);              // 0..1023
  int angle = map(valor, 0, 1023, 0, 180);  // 0..180 graus
  servo.write(angle);
  delay(20);   // valor del kata (el sketch fa 15 ms: igual de bo)
}
```

**En comentar (els tres punts del kata):** ① `servo.attach(9)` **no** es repeteix al `loop()`: ja és fet a `setup()`, i repetir-lo cada volta és l'error clàssic; ② l'ordre de `map()` és (valor, mín entrada, màx entrada, mín sortida, màx sortida); ③ la pausa és una única línia al final, després de `servo.write()` — el valor exacte (20 vs. 15 ms) no compta, és la variació expressa.

## Solució · `02_motor_pont_h`

```cpp
// Pins del kata: ENA=6 (PWM), IN1=9, IN2=10 (el sketch usa 5/7/8)
void endavant(int velocitat) {   // velocitat 0..255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, velocitat);
}

void enrere(int velocitat) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, velocitat);
}

void atura() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}
```

**En comentar:** ① a `enrere()` s'intercanvien `IN1`/`IN2` respecte d'`endavant()` — si es repeteix el mateix patró, el motor gira sempre igual; ② `atura()` posa els dos `IN` a `LOW` **i** talla el PWM: amb només `analogWrite(ENA, 0)` també s'atura, però deixar la direcció definida és més net i evita sorpreses en reprendre; ③ `analogWrite(ENA, velocitat)` sempre és (pin, valor) — invertit, compila i no funciona.

## Solució · `03_ultrasons_brac`

```cpp
void loop() {
  float d = mesuraDistancia();   // UNA mesura per volta
  Serial.println(d);

  if (d < DIST_OBJECTE) {        // valor del kata: 12 cm
    base.write(BASE_ESTACIO);    // 30 graus al kata
    pinca.write(PINCA_OBERTA);
  } else {
    base.write(BASE_REPOS);
    pinca.write(PINCA_TANCADA);
  }

  delay(100);
}
```

**En comentar (els tres punts del kata):** ① una sola crida a `mesuraDistancia()` guardada a `d`: cada crida és una mesura nova (i tarda), i dues mesures seguides poden no coincidir; ② cada branca deixa el braç en un estat **complet** (base i pinça): si una branca s'oblida la pinça, queda en l'última posició; ③ el `Serial.println(d)` abans de decidir permet veure també els valors que **no** disparen res. Aprofita per mirar què passa amb l'objecte just al llindar: és la llavor de la histèresi de la SA6.

## Solució · `05_dos_servos_millis`

```cpp
void loop() {
  unsigned long ara = millis();

  if (ara - tBase >= PERIODE_BASE) {      // 30 ms al kata
    tBase = ara;
    angleBase = angleBase + pas;
    if (angleBase >= BASE_MAX || angleBase <= BASE_MIN) {
      pas = -pas;
    }
    base.write(angleBase);
  }

  if (ara - tPinca >= PERIODE_PINCA) {    // 700 ms al kata
    tPinca = ara;
    pincaOberta = !pincaOberta;
    if (pincaOberta) {
      pinca.write(PINCA_OBERTA);
    } else {
      pinca.write(PINCA_TANCADA);
    }
  }
}
```

**En comentar:** ① sense `tX = ara` la condició és certa sempre i l'articulació es mou a cada volta (milers de vegades per segon); ② dos `if` independents: cada articulació té el seu rellotge i el seu ritme; ③ el `||` fa que el canvi de sentit passi als **dos** extrems. Pregunta per tancar: *on s'espera aquest programa?* Enlloc: per això podrà vigilar un sensor alhora (la màquina d'estats de la SA6).

## Solució · `04_brac_potenciometres`

```cpp
int llegeixAngle(int pinPot, int minim, int maxim) {
  return map(analogRead(pinPot), 0, 1023, minim, maxim);
}

void mouSiCal(Servo &servo, int &actual, int nou) {
  if (abs(nou - actual) > ZONA_MORTA) {   // 3 al kata
    actual = nou;
    servo.write(actual);
  }
}

// Al loop(), la linia de la pinca:
mouSiCal(pinca, anglePinca, llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX));
```

**En comentar:** ① el `map()` va al rang segur de **cada** servo (per això són paràmetres): a 0-180 el servo forçaria el topall; ② `abs()` fa que la zona morta funcioni en els dos sentits del potenciòmetre; ③ el `&` és la diferència entre l'original i la fotocòpia: sense ell, `actual` no s'actualitza mai fora de la funció, la condició és sempre certa i la zona morta no fa res (el braç tremola igual).
