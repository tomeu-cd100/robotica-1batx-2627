# SA6 · Sistemes de control: llaç obert/tancat i màquines d'estats

| | |
|---|---|
| **Trimestre** | 2n |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Arduino UNO + sensors/actuadors (NTC, LDR, motor/LED, ultrasons) |
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
> *"Per què un termòstat no encén i apaga sense parar? Com es manté estable una magnitud?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Concepte de control. Llaç obert (temporitzat) vs tancat (amb sensor). Diagrama de blocs. |
| **2** | **Termòstat** tot/res amb NTC + actuador (LED/ventilador) i histèresi. |
| **3** | **Màquina d'estats**: implementació amb `switch`/enum (p. ex. seqüència d'un rentat o d'un semàfor adaptatiu). |
| **4** | Introducció a la **regulació proporcional** (control de llum o velocitat segons error). Documentació i comparació de respostes. |

## Producte
Sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb diagrama de blocs i anàlisi de la resposta.

## Avaluació
- Instruments: producte + quadern (diagrama + anàlisi) + repte (dissenyar una màquina d'estats).
- Rúbriques: **R1**, **R3** (control), **R4** (documentació).

## Atenció a la diversitat
- **Bastida:** plantilla de màquina d'estats; codi base del llaç tancat.
- **+ Ampliació:** control proporcional amb ajust de constant; comparar tot/res vs proporcional amb dades del Serial Plotter.

## Recursos
INTEF "Programamos con Arduino"; Isaac Computer Science; Wokwi.
