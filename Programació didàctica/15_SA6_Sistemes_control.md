# SA6 · Sistemes de control: llaç obert/tancat i màquines d'estats

| | |
|---|---|
| **Trimestre** | 2n |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Braç MeArm amb Arduino UNO + sensor de col·lisió (final de carrera), ultrasons, polsadors i el pont micro:bit |
| **Llenguatge** | C/C++ (transferible a Python) |

## Vincle competencial
- **Competències específiques:** CE-R3 (principal); CE-R1 (secundària).
- **Criteris d'avaluació:** CA3.1, CA1.1.
- **Competències clau:** STEM, CD.

## Sabers (Bloc E)
Sistema de control; **llaç obert vs llaç tancat**; realimentació, consigna i error; **màquines d'estats finits**; regulació tot/res i proporcional (introducció); diagrames de blocs.

## Objectius d'aprenentatge
1. Distingir i implementar **control en llaç obert i en llaç tancat**.
2. Dissenyar una **màquina d'estats** per a un comportament seqüencial.
3. Implementar una regulació **tot/res** i una **proporcional** bàsica.
4. Representar el sistema amb un **diagrama de blocs**.

## Repte/pregunta inicial
> *"Com sap un braç robòtic on és, com agafa una peça sense fer clic-clic i què fa si xoca?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | «C++ flash» de reentrada (5': traducció Python→C++ amb la targeta de repàs exprés). Concepte de control. Llaç obert (la base enviada a un angle) vs tancat (**homing** amb el final de carrera). Diagrama de blocs del braç. Taller: sensor de col·lisió. |
| **2** | **Pinça automàtica** tot/res amb l'ultrasons i histèresi (dos llindars + estat). Taller: angles límit i cablatge endreçat. |
| **3** | **Màquina d'estats del braç**: `switch`/enum amb repòs, manual, replay i emergència (prioritat de la seguretat, `millis()`); producte amb el comandament per ràdio. **Tancament del producte** (documentació + defensa 2-3'). |
| **4** | **Prova pràctica T2** (individual, sessió sencera — vegeu `Avaluació/Prova_practica_T2.md`). La **regulació proporcional** és **+ampliació** (material i repte ⭐ per a qui va sobrat; no és nucli). |

> 🤖 **Fil conductor de robots (des del 28-10-2026):** tots els sistemes de
> control de la SA són **del braç MeArm** (el termòstat i el semàfor s'han
> retirat). Torns de taller de 20': S1 sensor de col·lisió; S2 angles límit i
> cablatge endreçat. A la S3, la màquina d'estats del braç (`enum` + `switch`,
> en el mateix C++ de la sessió) és el producte
> ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md)).

## Producte
El **braç MeArm amb màquina d'estats** (repòs, manual, replay, emergència) i comandament per ràdio, amb diagrama d'estats, diagrama de blocs i anàlisi de la resposta. **Es tanca a la S3**; la S4 és la prova T2 individual (pinça amb histèresi + comandament micro:bit).

## Avaluació
- Instruments: producte (S3) + quadern (diagrama + anàlisi) + **prova pràctica T2** (S4, individual).
- Rúbriques: **R1**, **R3** (control), **R4** (documentació).

## Atenció a la diversitat
- **Bastida:** esquelet de la màquina d'estats del braç; codi base del homing.
- **+ Ampliació:** moviment proporcional de les articulacions amb ajust de constant; comparar el salt amb el moviment proporcional al Serial Plotter.

## Recursos
INTEF "Programamos con Arduino"; Isaac Computer Science; Wokwi.
