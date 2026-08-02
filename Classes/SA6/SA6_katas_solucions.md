# SA6 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA6](SA6_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *variació*: la solució usa **els valors del kata** (expressament diferents dels del sketch) — en comentar, insisteix que compta l'estructura, no els números.

## Solució · `01_llac_obert_vs_tancat`

```cpp
void loop() {
  int lectura = analogRead(SENSOR);
  Serial.println(lectura);
  if (lectura > CONSIGNA) {      // kata: CONSIGNA = 450
    digitalWrite(SORTIDA, HIGH);
  } else {
    digitalWrite(SORTIDA, LOW);
  }
  delay(120);                    // pausa del kata
}
```

**En comentar (els tres punts del kata):** ① la comparació del sketch és `>` estricta; amb `>=` el comportament només canvia en el valor exacte de la consigna — el que importa és adonar-se que cal triar-ne una; ② un únic `if`/`else` garanteix que la sortida sempre queda definida — amb dos `if` independents («un que encén, un que apaga») hi ha voltes en què no es toca res; ③ el `delay()` és **una** línia final, fora de la decisió: duplicat dins de cada branca funciona, però és senyal que la decisió i el ritme s'han barrejat.

## Solució · `02_termostat_histeresi`

```cpp
void loop() {
  int t = analogRead(SENSOR);

  if (!actiu && t > LLINDAR_ALT) {         // kata: 650
    actiu = true;               // estava aturat i fa "calor": engega
  } else if (actiu && t < LLINDAR_BAIX) {  // kata: 550
    actiu = false;              // estava en marxa i s'ha "refredat": atura
  }

  digitalWrite(SORTIDA, actiu ? HIGH : LOW);

  Serial.print(t);
  Serial.print("  actiu=");
  Serial.println(actiu);
  delay(130);                   // pausa del kata
}
```

**En comentar:** ① `if`/`else if` fa la decisió **excloent**: en una mateixa volta o s'engega, o s'atura, o res — dos `if` independents podrien disparar-se tots dos amb llindars mal posats; ② cada condició uneix els dos requisits amb `&&` (estat + lectura): imbricar `if` dins d'`if` fa el mateix però amaga la simetria engega/atura; ③ el ternari `actiu ? HIGH : LOW` tradueix el `bool` en una línia — un `if`/`else` explícit és igual de correcte, només més llarg.

## Solució · `04_control_proporcional`

```cpp
void loop() {
  int t = analogRead(SENSOR);
  int error = t - CONSIGNA;          // kata: CONSIGNA = 450

  int sortida = (int)(Kp * error);   // kata: Kp = 0.6 (float * int -> cast)
  sortida = constrain(sortida, 0, 255);  // rang PWM: aquest si que es fix

  analogWrite(SORTIDA, sortida);
  delay(70);                         // pausa del kata
}
```

**En comentar:** ① el `(int)` s'aplica al **resultat** de `Kp * error` (el producte es fa en `float` i després es converteix): posar el cast sobre `Kp` o sobre `error` abans de multiplicar mata els decimals massa d'hora; ② el `constrain()` actua sobre la variable un cop calculada — dins de l'`analogWrite` directament també val, però la variable limitada es pot imprimir i depurar; ③ els límits són `(0, 255)` en aquest ordre (mínim, màxim): invertits, `constrain` retorna coses estranyes sense avisar. *(El sketch de la pràctica, a més, treu consigna/lectura/sortida pel Serial Plotter: no formava part del kata.)*

## Solució · `03_maquina_estats`

```cpp
void loop() {
  switch (estat) {

    case ESPERA:
      digitalWrite(LED_VERMELL, HIGH);
      digitalWrite(LED_VERD, LOW);
      analogWrite(SORTIDA, 0);
      if (polsat()) { canviaEstat(FASE1); delay(200); }  // antirebots del kata
      break;

    case FASE1:
      digitalWrite(LED_VERMELL, LOW);
      digitalWrite(LED_VERD, HIGH);
      analogWrite(SORTIDA, 120);
      if (millis() - tEstat > 2000) canviaEstat(FASE2);  // kata: 2000 ms
      break;
  }
}
```

**En comentar:** ① cada `case` acaba amb `break` — sense el primer `break`, en prémer es passaria per `ESPERA` **i** `FASE1` a la mateixa volta; ② el `delay(200)` d'antirebots va dins del mateix `if` que crida `canviaEstat(FASE1)`: només frena en el moment de la transició, no a cada volta; ③ la condició de temps és `millis() - tEstat > 2000`, en aquest ordre — a l'inrevés, amb variables `unsigned`, el resultat és un número gegant i la transició es dispara sempre. Remarca el contrast dels dos `case`: transició per **esdeveniment** (polsador) contra transició per **temps** (rellotge).
