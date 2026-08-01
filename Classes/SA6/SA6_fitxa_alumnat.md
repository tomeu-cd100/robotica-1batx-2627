# SA6 · Fitxa base — Sistemes de control · *que el sistema es reguli sol*

<!-- web:only-github -->

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Faràs que el sistema **es reguli sol**. Nucli: llaç obert/tancat, histèresi i màquines d'estats. El control proporcional és **+ampliació** (opcional).

> 💻 **On programo?** Tornem a l'**Arduino IDE** i al **C++** (el parèntesi Python de la SA5 s'ha acabat): `;`, `{}` i compilar+pujar, com a SA1-SA4. Res de `main.py` ni d'indentació obligatòria — però l'hàbit d'indentar bé, conserva'l.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Distingir **llaç obert** i **llaç tancat** i explicar el meu sistema amb un **diagrama de blocs**.
2. Fer un **termòstat amb histèresi** (dos llindars, sense "clic-clic").
3. Construir una **màquina d'estats** que no es bloqueja (`millis()`).
4. *(+Ampliació opcional)* Provar el **control proporcional**.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Sistema de control documentat** (producte, **S3**) + defensa de 2-3' | **R1**, **R3** i **R4** | Projectes (45 %) |
| **Prova T2** (individual, **la S4 sencera**; el nucli és la histèresi) | **R1, R3, R4** | Proves (20 %) |
| **Quadern tècnic** (diagrama d'estats, diagrama de blocs, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (m'avisa abans de la prova) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** termòstat amb **histèresi** que funciona, documentat amb el diagrama de blocs. **Versió completa:** hi afegeix la màquina d'estats no bloquejant (`millis()`) amb llindars justificats — i, si vols, el control P comparat.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

> ✍️ **Rutina de la SA:** cada sessió amb pràctica comença amb un **kata de 10 minuts**: escriure de zero (individual, amb apunts) el bloc central del programa del dia, ABANS d'obrir el codi donat. Si ningú no el projecta, reclameu-lo! El dia del mini-check, el mini-check fa de kata.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA6 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE2NDU2MzYx/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Llaç obert vs llaç tancat (S1)
0. **PREDIU:** mirant `01_llac_obert_vs_tancat.ino`, quin mode corregirà sol les pertorbacions? ______________________
1. Carrega, prova els dos modes i comprova. Fixa't en el diagrama de blocs del **llaç tancat**:

![Diagrama de blocs del llaç tancat: consigna, comparador amb l'error, controlador, actuador i sistema; el sensor mesura la sortida i la realimenta cap al comparador](img/sa6-llac-tancat.svg)

2. Diferència principal entre llaç obert i tancat: ______________________

### 2 · Termòstat amb histèresi (S2)
1. Carrega `02_termostat_histeresi.ino`. Llindars: encén a ____ · apaga a ____
2. Què passaria **sense** histèresi (un sol llindar)? ______________________

![Gràfica de la histèresi: la sortida de l'actuador segons la temperatura, amb un llindar baix i un d'alt i una zona morta al mig on l'actuador manté l'estat](img/sa6-histeresi.svg)

### 3 · Màquina d'estats (S3)
1. Carrega `03_maquina_estats.ino`. Estats: ______________________
2. Dibuixa el **diagrama d'estats** (estats i transicions).
3. **Repte:** afegeix un estat nou o una transició condicional.

> 💡 Si t'encalles muntant el patró, parteix de l'**esquelet** de la secció «Si t'encalles» de la [pàgina de la pràctica de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md) (el patró `enum`/`switch` + `millis()` ja hi és; tu omples els `// TODO`). El `millis()` no bloquejant ja el vas practicar a la SA4 (`05_dos_leds_millis`). Vols la **recepta del patró** (per què `enum` + `switch` i no una pila d'`if-else`) amb les 3 regles? → [fitxa ampliada, «La recepta»](SA6_fitxa_ampliada.md).

### 4 · Prova pràctica T2 (S4, individual)
La sessió 4 **sencera** és la **prova T2**: individual, dues parts (control amb histèresi + micro:bit), i pots consultar **el teu quadern i els esquemes**. El nucli (histèresi) ben fet = 5-6; ampliacions = 7-10.

> 🐍 **La Part B és en MicroPython i fa setmanes que fas C++!** Abans de la prova, repassa la targeta [`00_Repas_expres_MicroPython.md`](../00_General/00_Repas_expres_MicroPython.md) (10-15': taula C++↔Python, els 5 patrons de la prova i un autotest). Si no superes l'autotest, refés les activitats 1-2 de la [fitxa de la SA5](../SA5/SA5_fitxa_alumnat.md).

### +Ampliació (opcional) · Control proporcional
> **Per a qui vagi sobrat** (dins S2/S3 si acabes aviat, a casa amb Wokwi, o com a ampliació de la prova): el nucli de la SA són la histèresi i la màquina d'estats.
1. Carrega `04_control_proporcional.ino`. Què és l'**error**? ______________________
2. Com afecta `Kp` a la resposta? ______________________
3. **Repte:** compara tot/res vs proporcional al Serial Plotter. Quin és més estable? ____

> ✏️ **Dissenya abans de codificar:** aquí el pseudocodi és el **diagrama d'estats** que has dibuixat (activitat 3.2): cada estat i cada fletxa han d'existir abans que el `switch`. No escriguis cap `case` que no sigui al dibuix.

**Producte:** un sistema de control documentat, **tancat a la S3**. S'avalua amb **R1**, **R3** i **R4**.
**Defensa (2-3', a peu de taula durant la S3, nivell T2):** problema → solució → **una decisió tècnica justificada** (per què aquests llindars? per què aquests estats?) + 2 preguntes. Ja no n'hi ha prou amb el minut de T1: vegeu l'escala a [`../00_General/00_Guia_defensa_oral.md`](../00_General/00_Guia_defensa_oral.md).

<!-- /web:only-github -->

## Producte · Sistema de control documentat
Es **tanca a la S3**: un sistema de control amb **diagrama d'estats** i llindars justificats. **Defensa de 2-3'** (nivell T2): problema → solució → una **decisió tècnica justificada** + 2 preguntes ([guia de la defensa oral](../00_General/00_Guia_defensa_oral.md)). S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (**Serial Plotter**: la sortida segueix la consigna o oscil·la?) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

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

<!-- /web:only-github -->

> 📌 **Vols més?** +[Reptes ⭐](../../Reptes/Reptes_SA6.md) (semàfor adaptatiu, Kp massa gran), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA6_fitxa_ampliada.md](SA6_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** avui tanques el **braç**: la màquina d'estats que has programat és el patró del seu control complet (repòs/manual/replay/**emergència**). És el robot d'aquest trimestre — presenta'l al **[dossier del braç](../00_General/00_Projecte_T2_Brac.md)**.
