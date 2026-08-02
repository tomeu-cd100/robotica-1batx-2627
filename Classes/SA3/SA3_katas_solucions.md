# SA3 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA3](SA3_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *rèplica*: la solució coincideix amb el bloc corresponent del sketch.

## Solució · `01_polsador_debounce`

```cpp
void loop() {
  int estat = digitalRead(POLSADOR);

  // Canvi valid: ha canviat i ha passat el temps d'antirebot
  if (estat != estatAnterior && (millis() - ultimCanvi) > ANTIREBOT) {
    ultimCanvi = millis();
    if (estat == LOW) {            // s'acaba de premer (INPUT_PULLUP)
      comptador++;
      Serial.print("Premudes: ");
      Serial.println(comptador);
      digitalWrite(LED, !digitalRead(LED));  // toggle
    }
    estatAnterior = estat;
  }
}
```

**En comentar (els tres punts del kata):** ① `estatAnterior = estat` s'actualitza sempre que el canvi és **vàlid** (també en deixar anar) — si només s'actualitzés en prémer, la deixada anar es detectaria com a canvi etern; ② el toggle es pot fer amb `!digitalRead(LED)` (llegir l'estat del pin) o amb una variable pròpia: totes dues valen, el sketch fa la primera; ③ `ultimCanvi = millis()` va dins del filtre d'antirebot (tot canvi vàlid reinicia el cronòmetre), no dins de l'`if` de la premuda.

## Solució · `02_potenciometre_ldr`

```cpp
void loop() {
  int valorPot = analogRead(POT);   // 0..1023
  int valorLdr = analogRead(LDR);   // 0..1023

  int brillantor = map(valorPot, 0, 1023, 0, 255);
  analogWrite(LED, brillantor);

  Serial.print("POT: ");  Serial.print(valorPot);
  Serial.print("  LDR: "); Serial.println(valorLdr);

  delay(100);
}
```

**En comentar:** ① la primera lectura s'imprimeix amb `print()` (sense salt) i només l'última amb `println()`: així les dues surten a la mateixa línia; ② l'ordre de `map()` és (valor, mín entrada, màx entrada, mín sortida, màx sortida) — invertir els dos últims dona un LED que s'apaga en apujar el potenciòmetre; ③ `brillantor` és `int`, el tipus que `analogWrite` espera.

## Solució · `03_ultrasons_funcio`

```cpp
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long temps = pulseIn(ECHO, HIGH, 30000);  // us (timeout 30 ms)
  if (temps == 0) return 400;               // sense eco: fora de rang
  float dist = temps * 0.034 / 2.0;   // cm (anada i tornada: dividim per 2)
  return dist;
}
```

**En comentar:** ① els 2 µs a LOW abans del pols garanteixen un flanc net (no és opcional al sensor real); ② el `return 400` és una instrucció independent que talla la funció abans de calcular `dist` — no cal cap `else`, i és el patró «guarda» que reapareixerà tot el curs; ③ la divisió per 2 va sobre el producte `temps * 0.034` (el temps mesura anada **i** tornada); fer `temps * 0.034 / 2.0` o `(temps * 0.034) / 2.0` és el mateix, però dividir només el `0.034` escrit en un altre ordre no.

## Solució · `04_alarma_aparcament`

```cpp
void loop() {
  float d = mesuraDistancia();

  if (d > LLUNY) {
    // Lluny: tot apagat i en silenci
    digitalWrite(LED, LOW);
    noTone(PIEZO);
  } else if (d > PROP) {
    // Zona intermedia: bips al ritme de l'interval donat
    int interval = map((int)d, PROP, LLUNY, 100, 600);  // linia donada
    tone(PIEZO, 1500, 60);
    digitalWrite(LED, HIGH);
    delay(interval);
    digitalWrite(LED, LOW);
    delay(interval);
  } else {
    // Molt a prop: avis continu
    digitalWrite(LED, HIGH);
    tone(PIEZO, 2500);
  }

  delay(20);
}
```

**En comentar:** ① el tram «lluny» crida `noTone(PIEZO)` explícitament — el `tone(PIEZO, 2500)` sense durada del tram «a prop» no s'atura mai sol; ② la variable `interval` (línia donada) apareix als **dos** `delay()` del tram intermedi: així LED i bip van al mateix ritme; ③ el `delay(20)` final és fora de les branques i s'executa a totes les voltes — dona un ritme mínim al bucle sense tocar la lògica.
