# SA6 · Fitxa base — Sistemes de control · *que el sistema es reguli sol*

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs que el sistema **es reguli sol**. Nucli: llaç obert/tancat, histèresi i màquines d'estats. El control proporcional és **+ampliació** (opcional).

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Distingir **llaç obert** i **llaç tancat** i explicar el meu sistema amb un **diagrama de blocs**.
2. Fer un **termòstat amb histèresi** (dos llindars, sense "clic-clic").
3. Construir una **màquina d'estats** que no es bloqueja (`millis()`).
4. *(+Ampliació opcional)* Provar el **control proporcional**.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Sistema de control documentat** (producte) + defensa de 2-3' | **R1**, **R3** i **R4** | Projectes (45 %) |
| **Prova T2** (individual, dins la S4; el nucli és la histèresi) | **R1, R3, R4** | Proves (20 %) |
| **Quadern tècnic** (diagrama d'estats, diagrama de blocs, errors) | **R4** | Quadern i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (m'avisa abans de la prova) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** termòstat amb **histèresi** que funciona, documentat amb el diagrama de blocs. **Versió completa:** hi afegeix la màquina d'estats no bloquejant (`millis()`) amb llindars justificats — i, si vols, el control P comparat.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

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

> ✏️ **Dissenya abans de codificar:** aquí el pseudocodi és el **diagrama d'estats** que has dibuixat (activitat 3.2): cada estat i cada fletxa han d'existir abans que el `switch`. No escriguis cap `case` que no sigui al dibuix.

**Producte:** un sistema de control documentat. S'avalua amb **R1**, **R3** i **R4**.
**Defensa (2-3', nivell T2):** problema → solució → **una decisió tècnica justificada** (per què aquests llindars? per què aquests estats?) + 2 preguntes. Ja no n'hi ha prou amb el minut de T1: vegeu l'escala a [`../00_General/00_Guia_defensa_oral.md`](../00_General/00_Guia_defensa_oral.md).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (**Serial Plotter**: la sortida segueix la consigna o oscil·la?) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Distingeixo llaç obert i llaç tancat | ☐ | ☐ | ☐ | ☐ |
| Implemento histèresi i una màquina d'estats | ☐ | ☐ | ☐ | ☐ |
| Explico el diagrama de blocs del meu control | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Què és la realimentació en un sistema de control?** _________________
- **Per què serveix la histèresi?** ___________________________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** +Reptes (semàfor adaptatiu, Kp massa gran), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA6_fitxa_ampliada.md](SA6_fitxa_ampliada.md)**
