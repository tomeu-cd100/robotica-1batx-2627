# SA5 · micro:bit i MicroPython: un altre paradigma

| | |
|---|---|
| **Trimestre** | 2n |
| **Durada** | 6 h (3 sessions + 4a opcional d'ampliació) |
| **Maquinari** | 2 micro:bit + el braç MeArm amb el seu Arduino (pont per cable P1 → D0) |
| **Llenguatge** | MicroPython (amb MakeCode com a pont) |

## Vincle competencial
- **Competències específiques:** CE-R1 (principal); CE-R3 (secundària).
- **Criteris d'avaluació:** CA1.2, CA3.1.
- **Competències clau:** STEM, CD, CPSAA.

## Sabers (Bloc D)
Sintaxi de Python (indentació, variables, llistes, funcions); E/S de micro:bit (matriu LED, botons, acceleròmetre); comunicació sèrie per un pin (`uart`); **comunicació per ràdio** i **protocols** de missatges; comparació C/C++ ↔ Python.

## Objectius d'aprenentatge
1. Escriure programes en **MicroPython** amb la sintaxi correcta (indentació!).
2. Usar els sensors integrats de la micro:bit (acceleròmetre) com a interfície de control.
3. Implementar **comunicació per ràdio** entre dues plaques i un **protocol d'ordres** compartit amb l'Arduino del braç.
4. **Comparar** la mateixa solució en C/C++ (Arduino) i Python (micro:bit).

## Repte/pregunta inicial
> *"Com movem el braç sense tocar-lo? La mateixa idea, dos llenguatges: què canvia entre programar en C++ i en Python?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Editor Python micro:bit. Matriu LED, botons, llistes: el **selector d'articulació** del comandament del braç. Indentació i variables. |
| **2** | Acceleròmetre amb llindars: **la inclinació com a gest**. Taller: l'Arduino del braç obeeix **ordres de text** (`04_brac_ordres`, provat pel Monitor sèrie) i es connecta el cable del pont. Al tancament, **anotar valors reals de l'acceleròmetre** per postura (llavor del classificador de gestos de la SA8). |
| **3** | **Ràdio**: el **comandament** envia ordres, una segona micro:bit les rep i, al taller, fa de **pont** (P1 → D0) cap a l'Arduino: el braç es mou sense fils. Deures: targeta de **repàs exprés de C++** (la SA6 torna a C++ després de 3 setmanes de Python). |
| **4 (opcional, fora del còmput)** | **Taula comparativa C++ ↔ Python** del protocol d'ordres (comandament en Python, receptor en C++). Reflexió sobre paradigmes. *Si no es fa la sessió, la comparativa es completa dins el tancament de la S3 (15').* |

> 🤖 **Fil conductor de robots (des del 28-10-2026):** totes les pràctiques
> de la SA són peces del **comandament sense fils del braç MeArm** (el name
> badge, el comptapassos, el llum de nit i el dau s'han retirat). Torns de
> taller de 20' a les sessions 2 i 3: el braç obeeix ordres del Monitor sèrie
> i, després, del comandament a través del pont
> ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md)). El braç no es
> re-cableja: continua amb l'Arduino.

## Producte
El **comandament per ràdio del braç** (comandament + pont, el braç obeint-lo) + taula comparativa C++/Python al quadern.

## Avaluació
- Instruments: producte + quadern (inclou comparativa) + repte de codi Python.
- Rúbriques: **R1**, **R4** (comparativa/documentació).

## Atenció a la diversitat
- **Bastida:** **MakeCode** (blocs) com a pont abans del codi Python; simulador integrat; receptor de prova abans del pont.
- **+ Ampliació:** selector per ràdio, comandament proporcional amb calibratge, comandament complet amb gravació (reptes del braç).

## Recursos
micro:bit First lessons with Python; Python Editor; MakeCode; INTEF Aula en Abierto micro:bit; Open Roberta.
