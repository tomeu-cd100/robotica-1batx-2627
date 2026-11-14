# SA8 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA8](SA8_katas.md), per tenir-la al davant durant la comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: en aquesta SA el kata es fa *abans* del modelatge, així que la solució també et serveix de guió del modelatge que tanca després.

## Solució · `01_telemetria_emissor`

```python
while True:
    t = temperature()                  # graus C aprox.
    llum = display.read_light_level()  # 0..255

    # Dues magnituds etiquetades, separades per ; en UN sol enviament
    radio.send("T:" + str(t) + ";L:" + str(llum))

    display.show(Image.ARROW_N)        # indicador d'enviament
    sleep(2000)                        # ritme: una mesura cada 2 s
```

**En comentar (els tres punts del kata):** ① cada valor passa per `str(...)` abans de concatenar-se: sumar text i número a Python és `TypeError`, i la ràdio només envia text; ② les etiquetes `"T:"` i `"L:"` van literals dins de la mateixa cadena — construir-les en una variable a part també val, però la línia única fa visible el **format del protocol**, que el receptor haurà de desfer exactament igual; ③ el `sleep(2000)` és l'última instrucció, després de la fletxa: el ritme tanca la volta, no la interromp a mitges.

## Solució · `02_telemetria_receptor`

```python
missatge = radio.receive()
if missatge is not None:
    print(missatge)
    try:
        # Desfer el protocol de l'emissora: "T:23;L:120"
        parts = missatge.split(";")
        t = int(parts[0].split(":")[1])
        if t > LLINDAR_TEMP:
            display.show(Image.NO)     # massa calor
        else:
            display.show(Image.YES)
    except:
        display.show(Image.CONFUSED)   # esquelet donat
sleep(50)
```

**En comentar:** ① primer `split(";")` (separa les magnituds) i després `split(":")` sobre `parts[0]` (separa etiqueta i valor): és el desmuntatge **en ordre invers** de com l'emissora va muntar la cadena; ② l'`int(...)` desfà l'`str()` de l'emissora — comparar el text `"23"` amb el número 28 no fa el que sembla; ③ la decisió `NO`/`YES` queda **dins** del `try`: si el missatge ve mal format, el `split` o l'`int` peten abans i l'`except` mostra `CONFUSED` — treure la decisió fora trenca aquesta xarxa de seguretat.

## Solució · `03_ia_gestos`

```python
def classifica(x, y, z):
    if accelerometer.was_gesture("shake"):
        return "SACSEIG"
    if z < -700:
        return "PLA (cara amunt)"
    if z > 700:
        return "CAP PER AVALL"
    if y > 600:
        return "INCLINAT ENDAVANT"
    return "DRET"     # cas per defecte: cap regla no s'ha disparat
```

**En comentar:** ① el `shake` és un `if` amb `return` immediat: guanya la primera regla que es dispara, i per això l'**ordre** de les regles és una decisió de disseny (el sacseig ha d'anar primer, perquè durant un sacseig `x`, `y`, `z` prenen valors qualssevol); ② cada regla és un `if` independent — no cal `elif` perquè el `return` ja talla la funció: són dues maneres equivalents d'escriure el mateix, i val la pena dir-ho explícitament; ③ el `"DRET"` final és un `return` solt, sense condició: el cas per defecte que garanteix que la funció **sempre** retorna alguna classe. *(El sketch complet afegeix 3 regles més — `y < -600`, `x > 600`, `x < -600` — just abans del `return` final, amb el mateix patró.)*

## Solució · `04_esp32_telemetria`

```cpp
void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, CLAU);
  Serial.print("Connectant al WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnectat! IP: " + WiFi.localIP().toString());
}
```

**En comentar:** ① la condició és `!= WL_CONNECTED`: «mentre encara NO hi som, espera» — amb `==` el bucle no s'executaria mai i el programa continuaria sense connexió; ② dins del bucle, primer el `delay(500)` i després el punt (o a l'inrevés: l'ordre exacte no canvia el comportament, però el `delay` primer evita un punt «gratuït» al primer instant); ③ el `"\n"` inicial del missatge final separa la línia de punts del missatge de connexió — detall petit, però és la diferència entre un serial llegible i una sopa de caràcters.
