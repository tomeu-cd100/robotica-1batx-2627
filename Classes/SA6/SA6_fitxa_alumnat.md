# SA6 · Fitxa base — Sistemes de control

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs que el sistema **es reguli sol**. Nucli: llaç obert/tancat, histèresi i màquines d'estats. El control proporcional és **+ampliació** (opcional).

---

## El que has de fer

### 1 · Llaç obert vs llaç tancat (S1)
0. **PREDIU:** mirant `01_llac_obert_vs_tancat.ino`, quin mode corregirà sol les pertorbacions? ______________________
1. Carrega, prova els dos modes i comprova. Completa el diagrama de blocs:
```
[ Consigna ] → ( error ) → [ CONTROLADOR ] → [ ACTUADOR ] → [ PROCÉS ] → sortida
                  ↑________________ [ SENSOR ] ___________________|
```
2. Diferència principal entre llaç obert i tancat: ______________________

### 2 · Termòstat amb histèresi (S2)
1. Carrega `02_termostat_histeresi.ino`. Llindars: encén a ____ · apaga a ____
2. Què passaria **sense** histèresi (un sol llindar)? ______________________

### 3 · Màquina d'estats (S3)
1. Carrega `03_maquina_estats.ino`. Estats: ______________________
2. Dibuixa el **diagrama d'estats** (estats i transicions).
3. **Repte:** afegeix un estat nou o una transició condicional.

> 💡 Si t'encalles muntant el patró, parteix de l'esquelet `03_maquina_estats_BASTIDA` (el patró `enum`/`switch` + `millis()` ja hi és; tu omples els `// TODO`). El `millis()` no bloquejant ja el vas practicar a la SA4 (`05_dos_leds_millis`).

### 4 · Control proporcional (S4) · **+Ampliació (opcional)**
> Aquesta part és **per a qui vagi sobrat**: el nucli de la SA són la histèresi i la màquina d'estats.
1. Carrega `04_control_proporcional.ino`. Què és l'**error**? ______________________
2. Com afecta `Kp` a la resposta? ______________________
3. **Repte:** compara tot/res vs proporcional al Serial Plotter. Quin és més estable? ____

**Producte:** un sistema de control documentat. S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (**Serial Plotter**: la sortida segueix la consigna o oscil·la?) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Distingeixo llaç obert i llaç tancat | ☐ | ☐ | ☐ | ☐ |
| Implemento histèresi i una màquina d'estats | ☐ | ☐ | ☐ | ☐ |
| Explico el diagrama de blocs del meu control | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Què és la realimentació en un sistema de control?** _________________
- **Per què serveix la histèresi?** ___________________________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** +Reptes (semàfor adaptatiu, Kp massa gran), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA6_fitxa_ampliada.md](SA6_fitxa_ampliada.md)**
