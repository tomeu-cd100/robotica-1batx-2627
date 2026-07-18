# Repàs exprés de C++ (en tornar de MicroPython, abans de la SA6)

> **Per a qui és?** Per a tot l'alumnat, entre la **SA5 i la SA6**. Portes 3 setmanes escrivint Python (micro:bit) i la SA6 torna a **C++ (Arduino)**: els primers errors de la tornada són sempre els mateixos (oblidar `;`, oblidar claus, oblidar tipus). Aquesta targeta et refresca en 10 minuts la sintaxi que la SA6 dona per sabuda. Repassa-la a casa després de la S3 de la SA5 i tingues-la al costat la primera sessió de la SA6.

**Durada:** 10-15' de repàs autònom · **Maquinari:** cap (o [Wokwi](https://wokwi.com) per provar sense placa)

> 📄 **[Versió PDF per imprimir i repartir](pdf/00_Repas_expres_Cpp.pdf)** (les solucions de l'autotest hi surten obertes)

## 1 · El canvi de xip: de Python a C++

| Què | MicroPython (micro:bit, SA5) | C++ (Arduino, SA6) |
|---|---|---|
| Inici del programa | tot seguit, bucle `while True:` | `void setup()` (un cop) + `void loop()` (per sempre) |
| Blocs de codi | **indentació** i `:` | claus `{ }` (la indentació hi ajuda, però no és sintaxi) |
| Final d'instrucció | res | **`;` obligatori** |
| Variables | `t = 25` (sense tipus) | `int t = 25;` (**amb tipus**) |
| Esperar | `sleep(1000)` | `delay(1000)` |
| Condició | `if t > 28:` | `if (t > 28) { ... }` (**parèntesis i claus**) |

> ⚠️ L'error núm. 1 en tornar a C++: **oblidar el `;`** (l'error de compilació sovint assenyala la línia *següent*!). El núm. 2: escriure `if t > 28:` a l'estil Python — a C++ calen **parèntesis** a la condició i **claus** al bloc.

## 2 · Els 5 patrons que la SA6 dona per sabuts

```cpp
// 1. Esquelet: setup() un cop, loop() per sempre
void setup() {
  pinMode(8, OUTPUT);
  Serial.begin(9600);
}

// 2. Llegir un sensor analogic (0-1023) i escriure pel port serie
int lectura = analogRead(A0);
Serial.println(lectura);        // per veure-ho al Monitor/Plotter

// 3. Llindar + accio (el nightlight de SA3... i el termostat de SA6!)
if (lectura > 600) {
  digitalWrite(8, HIGH);
} else {
  digitalWrite(8, LOW);
}

// 4. switch sobre una variable d'estat (el semafor de SA2, versio 02b)
switch (fase) {
  case 0:
    // ... fes el que toca en aquest estat
    fase = 1;
    break;                      // sense break, cau al case seguent!
  case 1:
    fase = 0;
    break;
}

// 5. Espera SENSE aturar el programa (millis(), practicat a SA4)
if (millis() - inici >= 1000) {
  inici = millis();
  // ... ha passat 1 segon: fes l'accio
}
```

## 3 · Autotest (2') — sense mirar amunt

1. Tradueix aquest Python a C++: `if t > 28:` seguit (indentat) de la línia que encén el pin 8.
2. A un `switch`, què passa si oblides el `break` d'un `case`?
3. Per què en un sistema de control fem servir `millis()` en lloc de `delay()`?

<details markdown="1"><summary>Solucions</summary>

1.
```cpp
if (t > 28) {
  digitalWrite(8, HIGH);
}
```
2. L'execució **cau al `case` següent** i s'executen dos estats seguits (error típic de la màquina d'estats).
3. `delay()` **atura tot el programa**: mentre dorm, no llegeix cap sensor. `millis()` deixa el `loop()` girant, i el sistema pot vigilar el sensor contínuament (imprescindible per al termòstat i la màquina d'estats de la SA6).

</details>

## On practicar

- **Codi de SA2/SA3:** [`../SA2/codi/`](../SA2/codi/) (el `02b_semafor_switch.ino` és el patró 4) i [`../SA3/codi/`](../SA3/codi/) (el patró 2-3).
- **Simulador sense maquinari:** [Wokwi](https://wokwi.com) — Arduino UNO virtual, hi pots fer tot l'autotest.
- **Comparativa completa C++↔Python:** [`../SA0/SA0_guia_programacio.md`](../SA0/SA0_guia_programacio.md) (Part C) i la teva **taula comparativa** del quadern (SA5).
- **La targeta bessona** (per al viatge invers, abans de la prova T2): [`00_Repas_expres_MicroPython.md`](00_Repas_expres_MicroPython.md).
