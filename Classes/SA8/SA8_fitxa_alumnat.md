# SA8 · Fitxa base — IoT i IA

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

> Connectaràs dispositius (telemetria/IoT) i faràs que el sistema "reconegui" patrons (IA). Pensa també en l'**ètica de les dades**.

---

## El que has de fer

### 1 · Telemetria (S1)
0. **PREDIU:** amb [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) i [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py), què mostrarà la receptora? ______________________
1. Carrega'ls en dues plaques (mateix `group`) i comprova.
2. Quines magnituds envies? __________ Cada quant? __________
3. **Repte:** envia dues magnituds etiquetades (`T:..`, `L:..`).

### 2 · Disseny IoT (S2)
Dissenya un sistema IoT del teu entorn (mínim ètic obligatori):

| Element | La teva proposta |
|---|---|
| Què mesura | |
| Com transmet les dades | |
| **Recull alguna dada personal?** | |
| **Consentiment:** qui l'autoritza? | |
| Un risc de privacitat + una mesura per reduir-lo | |

### 3 · Introducció a la IA (S3)
1. Carrega [`03_ia_gestos.py`](codi/03_ia_gestos.py). Quins gestos classifica? __________
2. Diferència entre **regles fetes a mà** i **aprenentatge automàtic**: ____
3. **De regles a ML real:** fes [`SA8_practica_teachable_machine.md`](SA8_practica_teachable_machine.md) (entrena amb exemples). Classes i exemples per classe: __________
4. **Biaix:** amb qui podria fallar el teu classificador i per què? ____

**Producte:** sistema connectat o classificador + reflexió ètica. S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (dades al sèrie: arriben? ben etiquetades?) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova el mateix `group` de ràdio a les dues plaques.

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Envio i registro dades entre dispositius (telemetria) | ☐ | ☐ | ☐ | ☐ |
| Explico l'arquitectura IoT i els seus riscos | ☐ | ☐ | ☐ | ☐ |
| Distingeixo regles fetes a mà i aprenentatge automàtic | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Què és la telemetria?** ___________________________________________
- **Per què les "bones dades" són clau per a la IA?** _________________
- **Un error i com l'he resolt:** _____________________________________

### Ús d'assistents d'IA (honestedat) — només si n'has fet servir
> *La IA t'ha d'ajudar a APRENDRE. Declarar-ho no baixa nota; amagar-ho o no saber-ho explicar, sí. Abans de preguntar, aplica DEPURA.* (Vegeu `../00_IA_a_la_materia.md` §5.)
- **Eina i per a què:** _______________________________________________
- **Què he canviat / entès jo** (sé explicar cada línia?): ______________

> 💻 **Sense placa?** micro:bit a [python.microbit.org](https://python.microbit.org); telemetria ESP32 a `Simulacions/Wokwi/SA8_telemetria_esp32/`.
> 📌 **Vols més?** +Reptes (estació meteo, alerta), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA8_fitxa_ampliada.md](SA8_fitxa_ampliada.md)**
