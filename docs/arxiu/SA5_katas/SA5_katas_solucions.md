# SA5 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA5](SA5_katas.md), per tenir-la al davant durant els 2' de comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: durant els 10' l'alumnat treballa sol, i primer compara amb el sketch de la pràctica. En aquesta SA el kata és una *variació*: la solució usa **els valors del kata** (expressament diferents dels del sketch) — en comentar, insisteix que compta l'estructura, no els números.

## Solució · `01_selector_articulacio`

```python
triada = 0

while True:
    if button_b.was_pressed():
        triada = triada + 1
        if triada >= len(ARTICULACIONS):
            triada = 0
    elif button_a.was_pressed():
        triada = triada - 1
        if triada < 0:
            triada = len(ARTICULACIONS) - 1
    display.show(ARTICULACIONS[triada])   # kata: comenca per "P"
    sleep(100)
```

**En comentar (els tres punts del kata):** ① `was_pressed()` compta premudes; `is_pressed()` diu si està premut **ara** i salta lletres mentre mantens el dit; ② `len()` fa el codi independent de la mida de la llista; ③ el `display.show()` va fora dels `if`: s'ha de veure la tria encara que no premis res. Amb l'ordre del kata, en engegar surt una **P**: la llista mana, no el codi.

## Solució · `02_inclinacio`

```python
while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    print((x, y))
    if x > LLINDAR:                 # kata: 400
        display.show(Image.ARROW_E)
    elif x < -LLINDAR:
        display.show(Image.ARROW_W)
    else:
        display.show(Image.DIAMOND_SMALL)
    sleep(100)
```

**En comentar:** ① l'esquerra és **negativa**: `x < LLINDAR` seria cert gairebé sempre; ② les lectures, dins del bucle: si no, el programa veu sempre la primera inclinació; ③ `print((x, y))` envia una tupla i el gràfic en fa dues línies; `print(x, y)` escriu text i no es dibuixa igual. Bona pregunta final: *per què no posem el llindar a 0?*

## Solució · `04_brac_ordres`

```cpp
void loop() {
  if (Serial.available() > 0) {
    String ordre = Serial.readStringUntil('\n');
    ordre.trim();
    if (ordre == "B+") {
      aBase = min(aBase + PAS, BASE_MAX);    // kata: PAS = 5
    } else if (ordre == "B-") {
      aBase = max(aBase - PAS, BASE_MIN);
    } else if (ordre == "P") {
      if (aPinca == PINCA_TANCADA) {
        aPinca = PINCA_OBERTA;
      } else {
        aPinca = PINCA_TANCADA;
      }
    }
    escriu();
  }
}
```

**En comentar:** ① sense `trim()`, el Monitor sèrie en mode «Nova línia i retorn» envia `"B+\r"` i cap comparació és certa; ② `min()` posa un **sostre** (per pujar) i `max()` un **terra** (per baixar); ③ l'`escriu()` dins de l'`if` mou els servos només quan arriba una ordre. Fes notar que `readStringUntil()` **espera** (fins al timeout): a la SA6, la màquina d'estats llegirà les ordres sense esperar mai.

## Solució · `03_radio_comandament`

```python
radio.on()
radio.config(group=GRUP)      # kata: 7

while True:
    x = accelerometer.get_x()
    ordre = ""
    if x > LLINDAR:           # kata: 350
        ordre = "B+"
    elif x < -LLINDAR:
        ordre = "B-"
    if ordre != "":
        radio.send(ordre)
        display.show(ordre[0])
    else:
        display.show(Image.DIAMOND_SMALL)
    sleep(150)
```

**En comentar:** ① la ràdio s'encén **un cop**, fora del bucle; ② `ordre = ""` a cada volta és el que fa que, amb la placa plana, no s'enviï res; ③ la ràdio envia **text**: el protocol del braç és de paraules curtes, i el pont les passa tal qual a l'Arduino. Pregunta per tancar: *què passaria si el pont i el comandament tinguessin grups diferents?*
