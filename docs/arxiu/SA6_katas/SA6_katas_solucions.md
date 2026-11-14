# SA6 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA6](SA6_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *variació*: la solució usa **els valors del kata** (expressament diferents dels del sketch) — en comentar, insisteix que compta l'estructura, no els números.

## Solució · `01_llac_obert_vs_tancat`

```cpp
  if (!acabat) {
    if (digitalRead(PIN_COLLISIO) == LOW) {
      Serial.print("Final de carrera a ");
      Serial.println(angle);
      acabat = true;
    } else if (angle <= 0) {
      Serial.println("No he trobat el final de carrera!");
      acabat = true;
    } else {
      angle = angle - 1;
      base.write(angle);
      delay(PAS_HOMING);      // kata: 40 ms
    }
  }
```

**En comentar (els tres punts del kata):** ① primer es pregunta i després es mou: si mou i després pregunta, fa un pas de més contra el sensor; ② la guarda de l'angle 0 és la diferència entre un robot segur i un que es crema si un cable se solta; ③ amb `INPUT_PULLUP`, el sensor **tocat** llegeix `LOW`. Pregunta per tancar: *on és la realimentació?* (el `digitalRead` dins del bucle).

## Solució · `02_pinca_histeresi`

```cpp
void loop() {
  float d = mesuraDistancia();
  if (!pincaTancada && d < TANCA_CM) {        // kata: 5 cm
    pincaTancada = true;
    pinca.write(PINCA_TANCADA);
  } else if (pincaTancada && d > OBRE_CM) {   // kata: 12 cm
    pincaTancada = false;
    pinca.write(PINCA_OBERTA);
  }
  delay(60);
}
```

**En comentar:** ① sense l'estat a la condició, la pinça es tornaria a escriure tancada a cada volta i, sobretot, la decisió d'obrir dependria només d'un número: tornaria el clic-clic; ② `else if` fa les dues decisions excloents a cada volta; ③ l'absència d'`else` final **és** la histèresi. Amb els valors del kata (5 i 12 cm), la finestra és més ampla: pregunta què es guanya i què es perd.

## Solució · `04_control_proporcional`

```cpp
void loop() {
  int consigna = map(analogRead(A0), 0, 1023, 0, 180);
  float error = consigna - angle;
  angle = angle + K * error;              // kata: K = 0.05
  base.write((int)(angle + 0.5));
  Serial.print(consigna);
  Serial.print(" ");
  Serial.println(angle);
  delay(20);
}
```

**En comentar:** ① amb `int angle`, quan l'error és petit, `K * error` val menys d'1 i es perd: el braç s'atura abans d'arribar; ② l'ordre de l'error decideix el sentit; ③ arrodonir (`+ 0.5`) en lloc de truncar evita que el braç quedi sempre un grau per sota. Al Serial Plotter, compara `K = 0.05` amb el `0.1` del sketch: la corba és el doble de lenta.

## Solució · `03_maquina_estats`

```cpp
  if (xoc && estat != EMERGENCIA) {
    canviaEstat(EMERGENCIA);              // la seguretat mana
  }

  switch (estat) {
    case REPOS:
      if (a) canviaEstat(MANUAL);
      break;

    case MANUAL:
      segueixPots();
      if (a) canviaEstat(REPOS);
      break;

    case EMERGENCIA:
      if (!xoc && a) canviaEstat(REPOS);  // dues condicions alhora
      break;
  }
```

**En comentar:** l'emergència **fora** del `switch` actua estigui on estigui el braç; cada `case` diu què fa i quan en surt; sense `break`, REPOS cauria dins de MANUAL. El rearmament demana **dues** condicions: una emergència que es rearma sola (només amb `!xoc`) no és una emergència.
