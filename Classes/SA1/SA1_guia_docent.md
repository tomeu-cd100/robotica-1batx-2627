# SA1 · Guia docent — Què és un robot? Sistemes embeguts i mètode de projecte

**Durada:** 6 h (3 sessions de 2 h) · **Maquinari:** Arduino UNO (demostració) + Tinkercad · **Llenguatge:** lectura de C/C++
**Referència:** `Programació didàctica/10_SA1_Introduccio_robotica.md`

## Objectius de la SA
1. Definir robot i sistema embegut; identificar entrada-procés-sortida.
2. Reconèixer l'arquitectura d'Arduino i la diferència analògic/digital.
3. Aplicar normes de seguretat i conèixer l'entorn (IDE + simulador).
4. Llegir i modificar el primer programa (`Blink`).

## Materials per a la sessió
- 1 Arduino UNO + cable USB (per a demostració i, si n'hi ha, per parelles).
- Ordinadors amb **Arduino IDE** instal·lat i accés a **Tinkercad** (tinkercad.com).
- Projector. Full de normes de seguretat per signar.
- Quadern tècnic (digital o paper) per a cada alumne/a.

---

## SESSIÓ 1 (2 h) — Què és un robot?

| Fase | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| Activació | 15' | Llança la pregunta: *"Quins robots tens a casa sense saber-ho?"* | Pluja d'idees; llista a la pissarra. |
| Explicació | 25' | Presenta el model **entrada → procés → sortida** i el concepte de sistema embegut. | Prenen notes; classifiquen exemples. |
| Pràctica | 40' | Reparteix l'**anàlisi de 3 sistemes** (rentadora, dron, semàfor). | En parelles, omplen la taula E-P-S de la fitxa (Activitat 1). |
| Diagnòstic | 30' | Passa la **prova diagnòstica** (no qualifica). | Responen individualment. |
| Tancament | 10' | Recull conclusions; obre el quadern tècnic. | Primera entrada al quadern. |

**Punts clau:** tot sistema automàtic té sensors (entrada), un "cervell" (procés) i actuadors (sortida). El robot és un sistema embegut amb capacitat d'actuar sobre l'entorn.

**Prova diagnòstica (orientativa):** Has programat abans? (Scratch/blocs/text). Saps què és una variable? Un bucle? Has fet servir Arduino/micro:bit? → serveix per formar **parelles heterogènies**.

---

## SESSIÓ 2 (2 h) — Arquitectura i seguretat

| Fase | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| Activació | 10' | Mostra una placa Arduino UNO real. | Identifiquen parts visibles. |
| Explicació | 30' | Arquitectura: microcontrolador, pins digitals/analògics, alimentació, USB. **Analògic vs digital**. | Etiqueten un esquema mut de la placa (Activitat 2). |
| Seguretat | 20' | Presenta i comenta les **normes de seguretat**. | Llegeixen i **signen** el full. |
| Pràctica | 50' | Tour guiat de l'**Arduino IDE** i de **Tinkercad** (crear compte de classe, primer circuit virtual). | Creen el seu primer circuit a Tinkercad (LED + placa). |
| Tancament | 10' | Resol dubtes de l'entorn. | Entrada al quadern: captura del circuit. |

**Punts clau:**
- **Digital** = dos estats (0/5 V, LOW/HIGH). **Analògic** = valors continus (0–5 V → 0–1023).
- Pins `~` = PWM. Pins `A0-A5` = entrades analògiques.
- **Seguretat:** treballar amb la placa desconnectada en muntar; no curtcircuitar 5 V–GND; respectar polaritats.

---

## SESSIÓ 3 (2 h) — El primer programa

| Fase | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| Activació | 10' | *"Com li diem a la placa què ha de fer?"* | Hipòtesis. |
| Modelatge | 25' | Lectura guiada de `blink.ino`: `setup()`, `loop()`, `pinMode`, `digitalWrite`, `delay`. | Segueixen el codi comentat. |
| Pràctica guiada | 35' | Carrega `Blink` (real o Tinkercad); fa modificar el temps. | Modifiquen `delay` i observen. |
| Repte | 30' | Proposa el **repte de parpelleig variable** (`blink_repte.ino`). | Resolen; comparen solucions. |
| Debat + tancament | 20' | Mini-debat **ètica de l'automatització** (ODS). | Reflexió escrita al quadern. |

**Errors freqüents i solució:**
| Error | Causa | Solució |
|---|---|---|
| El LED no s'encén | Polaritat/posició invertida o sense resistència | Revisar pota llarga (+) a la sortida; resistència 220 Ω. |
| "Port not found" en pujar | Placa no seleccionada | Eines → Placa: Arduino UNO; Port correcte. |
| Parpelleig massa ràpid/imperceptible | `delay` molt petit | Augmentar el valor (ms). |

**Producte de la SA:** fitxa-pòster d'anàlisi d'un robot real + primeres entrades del quadern tècnic.
**Avaluació:** rúbriques **R4** (documentació) i **R5** (actitud). La prova diagnòstica **no** qualifica.
