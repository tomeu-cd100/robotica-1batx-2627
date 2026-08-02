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

## Solució · `03_sensor_velocitat`

```cpp
void loop() {
  float d = mesuraDistancia();
  Serial.println(d);

  if (d < SEGURETAT) {
    atura();                 // massa a prop: frena
  } else {
    // Reescala la distancia (15..50 cm) a velocitat (100..255) - valors del kata
    int vel = map((int)d, SEGURETAT, 50, 100, 255);
    vel = constrain(vel, 100, 255);
    endavant(vel);
  }
  delay(50);
}
```

**En comentar:** ① la conversió `(int)d` cal perquè `map()` treballa amb enters — passar-hi el `float` directament compila però trunca on no toca; ② el `constrain()` va **després** del `map()`: `map()` extrapola fora del rang (a 80 cm donaria una «velocitat» > 255), no limita; ③ el `Serial.println(d)` va abans de la decisió: així es veu la distància també quan el robot frena, que és justament quan cal depurar.

## Solució · `05_dos_leds_millis`

```cpp
void loop() {
  unsigned long ara = millis();   // una sola lectura per volta

  // LED A: ha passat el seu periode? (kata: 200 ms)
  if (ara - tA >= PERIODE_A) {
    tA = ara;
    encesA = !encesA;
    digitalWrite(LED_A, encesA);
  }

  // LED B: el seu periode propi (kata: 800 ms)
  if (ara - tB >= PERIODE_B) {
    tB = ara;
    encesB = !encesB;
    digitalWrite(LED_B, encesB);
  }
}
```

**En comentar:** ① dins de cada `if`, tant és si `tA = ara` va abans o després d'invertir `encesA` — el que no pot passar és oblidar-lo (el LED quedaria canviant a cada volta); ② són **dos `if` independents**, un per LED: aquesta independència és el que permet els dos ritmes alhora; ③ `digitalWrite(LED_A, encesA)` accepta el `bool` directament (`true`=HIGH): no cal cap `if` extra.

## Solució · `04_barrera_automatica`

```cpp
void loop() {
  float d = mesuraDistancia();

  if (d > 0 && d < DIST_DETECCIO) {
    // Vehicle detectat: sequencia completa
    digitalWrite(LED, HIGH);
    barrera.write(ANGLE_OBERT);
    delay(TEMPS_OBERT);          // kata: 4000 ms
    barrera.write(ANGLE_TANCAT);
    digitalWrite(LED, LOW);
  }
  delay(80);   // pausa del kata, a cada volta
}
```

**En comentar:** ① la guarda `d > 0 && d < DIST_DETECCIO` exigeix proximitat **i** descarta lectures impossibles — recorda que `mesuraDistancia()` ja retorna 400 sense eco (la funció de la P3, portada sencera), de manera que el `d > 0` és cinturó a sobre dels tirants; ② el LED s'apaga **després** de tancar la barrera: el llum indica «barrera activa», no «vehicle detectat»; ③ el `delay(80)` final és **fora** de l'`if`: marca el ritme de mostreig a totes les voltes, hi hagi vehicle o no.
