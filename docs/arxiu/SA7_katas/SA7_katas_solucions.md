# SA7 · Solucions dels katas (docent)

> **Per a qui és?** Només per al **docent**: la solució escrita de cada [kata de la SA7](SA7_katas.md), per tenir-la al davant durant la comparació i anar-la comentant en veu alta. **No es projecta abans d'escriure**: en aquesta SA el kata es fa *abans* del modelatge, així que la solució també et serveix de guió del modelatge que tanca després.

## Solució · `01_moviment_basic`

```cpp
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }   // mateix sentit
void enrere()        { motors(LOW,  VEL, LOW,  VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW,  VEL); }   // esq endavant, dret enrere
void gira_esquerra() { motors(LOW,  VEL, HIGH, VEL); }
void atura()         { motors(HIGH, 0, HIGH, 0); }       // velocitats a 0
```

**En comentar (els tres punts del kata):** ① `atura()` pot cridar `motors()` amb velocitats 0 (com aquí) o fer els `analogWrite` directes als pins de velocitat (com fa el sketch): totes dues aturen — la primera reutilitza, la segona no depèn de cap valor de direcció; ② els girs usen la mateixa `VEL`: reduir-la per girar és una millora legítima, però no la demanava l'enunciat; ③ a `gira_dreta()` la roda **esquerra** va `HIGH` (endavant) i la **dreta** `LOW` (enrere): l'esquerra empeny i el robot cau cap a la dreta — el dubte esquerra/dreta és el moment d'or per fer-ho gestualment a l'aula.

## Solució · `02_trajectoria_quadrat`

```cpp
void setup() {
  // ... pinMode ja donats ...
  delay(1000);   // temps per deixar el robot a terra

  for (int costat = 0; costat < 4; costat++) {
    endavant();    delay(T_RECTE);
    atura();       delay(300);
    gira_dreta();  delay(T_GIR_90);
    atura();       delay(300);
  }
  atura();
}

void loop() {
  // Buit: el recorregut es fa una sola vegada al setup().
}
```

**En comentar:** ① el patró va dins d'un `for` de 4 voltes — escrit quatre cops seguits funciona, però qualsevol canvi s'ha de fer quatre vegades (i un pentàgon en demanaria cinc); ② el codi viu a `setup()`: a `loop()` el robot faria quadrats sense parar — és LA pregunta del kata, i la resposta descobreix per a què serveix de debò `setup()`; ③ els `atura(); delay(300);` entre moviments deixen que el robot s'aturi del tot abans de girar: sense pausa, la inèrcia arrodoneix les cantonades i el «quadrat» surt patata.

## Solució · `03_evita_obstacles`

```cpp
void loop() {
  float d = distancia();      // una sola mesura per volta

  if (d < DIST_MIN) {
    // Obstacle a prop: maniobra d'evasio
    atura();        delay(150);
    enrere();       delay(400);
    atura();        delay(150);
    gira_dreta();   delay(450);
    atura();        delay(150);
  } else {
    endavant();
  }
  delay(30);
}
```

**En comentar:** ① la distància es llegeix **una** vegada per volta i es guarda: cridar `distancia()` dins de cada condició faria mesures diferents dins del mateix cicle; ② hi ha un `atura(); delay(150);` abans, entre i després dels dos moviments d'evasió — invertir el sentit d'un motor en marxa el castiga mecànicament; ③ la branca «via lliure» només crida `endavant()`: el `delay(30)` final, comú a totes dues branques, ja marca el ritme del cicle percepció → decisió → acció.

## Solució · `04_seguidor_linia`

```cpp
void loop() {
  bool liniaEsq  = (digitalRead(S_ESQ) == LOW);    // LOW = veu la linia
  bool liniaDret = (digitalRead(S_DRET) == LOW);

  if (liniaEsq && liniaDret) {
    endavant();                 // tots dos sobre la linia: recte
  } else if (liniaEsq && !liniaDret) {
    corregeix_esq();            // s'escapa per la dreta: torna a l'esquerra
  } else if (!liniaEsq && liniaDret) {
    corregeix_dreta();
  } else {
    endavant();                 // cap sensor: continua (o busca la linia)
  }
  delay(10);
}
```

**En comentar:** ① les dues lectures es guarden en `bool` amb nom **abans** de decidir: les condicions es llegeixen com frases (`liniaEsq && !liniaDret`) i cada sensor es llegeix un sol cop; ② els quatre casos van encadenats amb un únic `if`/`else if`/`else`: exactament una resposta per volta — quatre `if` independents podrien manar dos moviments al mateix cicle; ③ les variables es declaren **dins** del `loop()`: es recalculen a cada volta, que és el que volem — com a globals només guardarien el passat.
