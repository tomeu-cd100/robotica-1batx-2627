# 08 · Seqüenciació temporal anual

**Base de càlcul:** 2 h/setmana · ≈ 35 setmanes lectives · ≈ **70 h**.
Distribució en **3 trimestres** i **9 situacions d'aprenentatge (SA)**.

## Visió general

| Trim. | Setmanes aprox. | SA | Títol | Hores |
|---|---|---|---|---|
| **1r** | s1-s12 | SA1 | Què és un robot? Sistemes embeguts i mètode de projecte | 6 |
| | | SA2 * | Sortides digitals i PWM: dona vida als actuadors | 8 |
| | | SA3 | Entrades i sensors: el robot percep | 8 |
| **2n** | s13-s24 | SA4 * | Moviment: servos, motors i ponts H | 8 |
| | | SA5 | micro:bit i MicroPython: un altre paradigma | 7 |
| | | SA6 * | Sistemes de control: llaç obert/tancat i màquines d'estats | 8 |
| **3r** | s25-s35 | SA7 | Robòtica mòbil: cinemàtica i trajectòries | 8 |
| | | SA8 | IoT i IA: el robot connectat i intel·ligent | 6 |
| | | SA9 | Repte final integrador (opció competició) | 10 |
| | | | **Subtotal SA** | **69 h** |
| | | | **Marge (diagnòstic, avaluació, imprevistos)** | **~1 h** |
| | | | **Total** | **70 h** |

> **\*** SA amb **4a sessió d'ampliacions opcionals**: les **8 h (4 sessions)** són el còmput de referència. Si el calendari real ho exigeix, la 4a sessió es pot escurçar perquè conté ampliacions opcionals (les guies docents en detallen les 4 sessions). Aquesta n'és la **flexibilitat de ritme**, juntament amb la integració de les proves (vegeu més avall).

## Marge i integració de l'avaluació

Per garantir la **viabilitat real** del curs (2 h/setmana ≈ 70 h), s'apliquen dos criteris:

1. **Flexibilitat de ritme (marge ~1 h):** les SA marcades amb **\*** (SA2, SA4, SA6) compten **8 h (4 sessions)**, però la 4a sessió conté activitats d'**ampliació opcionals** que es poden escurçar segons el calendari real. Així s'allibera marge per al **diagnòstic inicial** (SA1), festius i imprevistos sense alterar el còmput de referència.
2. **Proves pràctiques integrades (sense hores extra):** les **proves pràctiques trimestrals** (`Avaluació/Prova_practica_T1/T2/T3`) **no afegeixen sessions**: s'incorporen com a **repte avaluable** dins l'última sessió de la SA de tancament de cada trimestre:
   - **T1** → dins la SA3 (sessió 4, producte/repte).
   - **T2** → dins la SA6 (sessió 4, repte de control).
   - **T3** → dins la SA9 (demostració + defensa, ja prevista).

> Vegeu la ponderació a `06_Avaluacio_criteris_qualificacio.md` (dimensió "Proves pràctiques", 20 %). Aquesta integració manté el pes avaluatiu sense comprometre les hores lectives.

## Fil conductor i progressió

```
Trimestre 1 — FONAMENTS
  SA1 ─ Context, mètode, entorns, seguretat, diagnòstic inicial
  SA2 ─ Programació C/C++ + sortides (LED, PWM, so, relé)
  SA3 ─ Programació C/C++ + entrades (polsadors, sensors analògics)
        ▼ (l'alumnat ja controla E/S amb Arduino)
Trimestre 2 — CONTROL I SENSORS
  SA4 ─ Actuadors de moviment (servos, motors DC, pont H)
  SA5 ─ micro:bit + MicroPython (nou paradigma, ràdio, sensors)
  SA6 ─ Sistemes de control (llaç obert/tancat, màquines d'estats)
        ▼ (l'alumnat controla moviment i realimentació)
Trimestre 3 — ROBÒTICA I INTEGRACIÓ
  SA7 ─ Robòtica mòbil (Imagina 3dBot): seguir línia / evitar obstacles
  SA8 ─ IoT/IA: telemetria, dades, introducció a la IA
  SA9 ─ Repte final: projecte autònom + documentació + defensa
```

## Criteris de seqüenciació

1. **Maquinari concret → abstracció:** del component (SA2) al sistema autònom (SA9).
2. **Un llenguatge consolidat abans del segon:** C/C++ (SA2-SA4) abans de Python (SA5), i transferència posterior.
3. **Cada SA reutilitza i amplia l'anterior** (avaluació contínua i espiral).
4. **El projecte final (SA9) integra** electrònica + programació + control + robòtica + documentació.

## Connexions interdisciplinàries

- **Matemàtiques I:** funcions, proporcionalitat (mapatge de senyals), geometria (trajectòries), lògica.
- **Física:** electricitat, mecànica del moviment, sensors.
- **Tecnologia i Enginyeria I:** comparteix sabers; possibilitat de coordinació de projectes.
- **Treball de Recerca:** la SA9 pot llavorar un futur TR.

## Flexibilitat

- Si la matèria acaba sent de **3 h/setmana**, cada SA incorpora les activitats *"+ ampliació"*.
- Si es prioritza **Python-primer**, s'intercanvien SA5↔SA2/SA3 (cal adaptar el maquinari de les primeres setmanes a micro:bit).
