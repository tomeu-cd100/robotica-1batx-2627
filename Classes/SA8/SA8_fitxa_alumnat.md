# SA8 · Fitxa d'alumnat — IoT i IA

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

> Connectaràs dispositius (telemetria/IoT) i faràs que el sistema "reconegui" patrons (IA). Pensa també en l'**ètica de les dades**.

---

## Activitat 1 · Telemetria (S1)
0. **PREDIU** (abans d'executar): mirant `01_telemetria_emissor.py` i `02_telemetria_receptor.py`, què creus que mostrarà la placa receptora? ____________________
1. Carrega `01_telemetria_emissor.py` i `02_telemetria_receptor.py` en dues plaques (mateix `group`) i **comprova** la predicció.
2. Quines magnituds envies? __________________ Cada quant? __________
3. Registra 5 lectures rebudes:

| # | Valor |
|---|---|
| 1 | |
| 2 | |
| 3 | |
| 4 | |
| 5 | |

4. **Repte:** envia dues magnituds etiquetades (`T:..`, `L:..`). **+ Repte:** alerta per llindar.

## Activitat 2 · Disseny IoT (S2)
Dissenya un sistema IoT del teu entorn (hort, aula, casa...):

| Element | La teva proposta |
|---|---|
| Què mesura | |
| Com transmet les dades | |
| Qui les fa servir | |
| Un risc de privacitat/seguretat | |
| Una mesura per reduir-lo | |

## Activitat 3 · Introducció a la IA (S3)
1. Carrega `03_ia_gestos.py`. Quins gestos classifica? ____________________
2. Quina diferència hi ha entre **regles fetes a mà** i **aprenentatge automàtic**? ____________
3. **Repte:** afegeix una classe nova de gest. Quina? __________
4. **Reflexió ètica:** un benefici i un risc de la IA:
   - Benefici: ______________________________________________________
   - Risc: __________________________________________________________

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El sistema connectat / classificador funciona (R1, R3) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El disseny IoT considera riscos i privacitat (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |
| La reflexió ètica és argumentada (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treball en equip · rols

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 |
|---|---|---|---|
| Coordinador/a (temps, enunciat) | | | |
| Programador/a (codi) | | | |
| Enginyer/a de maquinari (prepara les plaques, ràdio/sensors) | | | |
| Provador/a–Documentador/a (registra dades + quadern) | | | |

---

## Si t'encalles

1. **Pista 1:** comprova que les dues plaques comparteixen el mateix `group` de ràdio.
2. **Pista 2:** mira les dades al port sèrie: arriben? estan ben etiquetades (`T:..`)?
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina (dades al sèrie) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** `Reptes/Reptes_SA8.md` (estació meteo, alerta, gestos).
- **Simuladors:** micro:bit a **python.microbit.org**; telemetria ESP32 a `Simulacions/Wokwi/SA8_telemetria_esp32/`.

---

## Pensament computacional d'aquesta SA

Treballes amb **DADES** (recollir, etiquetar, transmetre) i amb **CLASSIFICACIÓ** (la IA per regles decideix una categoria a partir de valors). Quines dades necessita el teu classificador per encertar? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Envio i registro dades entre dispositius (telemetria) | ☐ | ☐ | ☐ | ☐ |
| Explico l'arquitectura IoT i els seus riscos | ☐ | ☐ | ☐ | ☐ |
| Distingeixo regles fetes a mà i aprenentatge automàtic | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu el sistema IoT/IA amb un altre equip:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

L'IoT i la IA fan ciutats i entorns "intel·ligents", però plantegen reptes de dades. **ODS 11** (ciutats intel·ligents i sostenibles) i **ODS 13** (acció climàtica: telemetria ambiental). A més de l'ètica de dades que ja has reflexionat, com ajudaria el teu sistema el medi ambient? ______________________

---

## Quadern tècnic (SA8)
- **Què és la telemetria?** ____________________________________________
- **Per què les "bones dades" són clau per a la IA?** ___________________
- **Error trobat i solució:** ___________________________________________
