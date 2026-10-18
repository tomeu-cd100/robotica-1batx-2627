# SA3 · Fitxa base — Entrades i sensors · *fes que el sistema percebi el món*

<!-- web:only-github -->

**Nom:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Ara el teu Arduino aprèn a **notar** què passa: un botó, la llum, la distància. I al final, la teva **mascota** reaccionarà a tot això.

## 🎯 Què aprendràs i com s'avalua

**En acabar aquesta SA sabré:**
1. Llegir un **botó** i **sensors** (llum, distància…) i fer que el programa **decideixi** segons el que llegeix.
2. Fer servir el **Monitor sèrie** i el **multímetre** per veure què passa i per triar bé els números.
3. Escriure una **funció** que fa una feina i **em torna** un resultat.

| Què entrego | Com es corregeix | Quant compta |
|---|---|---|
| **La mascota** amb 3 reaccions + la seva fitxa (Sessió 3) + explicar-la en 1 minut | [Rúbrica del robot](../00_General/00_Projecte_T1_Mascota.md) | Projectes (45 %) |
| **Prova T1** (individual, **tota la Sessió 4**) | **R1, R2, R4** | Proves (20 %) |
| **Quadern tècnic** (dibuixos, números dels sensors, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check (inici de la Sessió 3) | — | **No compta per a nota**: t'avisa de com vas abans de la prova |

> 🪜 **Per aprovar n'hi ha prou amb:** una mascota amb **2 reaccions** que funcionin bé. **Per treure més nota:** 3 reaccions o més, que encaixin amb el caràcter de la mascota i estiguin ben ajustades.

> Com es posa la nota (de 0 a 10) i totes les rúbriques: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## On responc · Google Classroom

Les preguntes d'aquesta fitxa es responen a la **tasca de Google Classroom** (val **10 punts**). **No cal fer-ho tot de cop:** la portada de la SA et diu, sessió a sessió, què has de respondre cada dia.

> 👉 **[Obre la tasca: SA3 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE4MDEwMzM3/details)**

Si la tasca encara no et surt a Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens què aprendràs (a dalt) i què fer si alguna cosa no funciona (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · El polsador i el Monitor sèrie (Sessió 1)
0. **Endevina:** mirant `01_polsador_debounce.ino`, què sortirà al Monitor sèrie quan premis el botó? ______________________
1. Munta el polsador al pin 2. Carrega el codi, obre el **Monitor sèrie** i comprova-ho.
2. Quan **no** prems, el pin llegeix ______. Quan **sí** prems, llegeix ______ (HIGH o LOW).
3. Per què cal l'**antirebot**? ______________________
4. **Repte:** fes que el comptador arribi a 5 i torni a 0.

### 2 · El potenciòmetre i el sensor de llum (Sessió 2)
1. Llegeix el potenciòmetre (A0) i el sensor de llum (A1). Els números van de ____ a ____.
2. Quina instrucció passa de 0-1023 a 0-255? `__________`
3. **Racó de mesura (multímetre):** al punt d'unió del sensor de llum hi ha ______ V · el Monitor diu ______ → ______ ÷ 1023 × 5 = ______ V. Coincideixen? ____
4. **Llum automàtic:** el LED s'encén quan el número del sensor de llum és ____ que ______.

> 💡 No et surt el llum automàtic? Fes servir l'**esquelet** de l'apartat «Si t'encalles» de la [pràctica del sensor de llum](codi/02_potenciometre_ldr/EXPLICACIO.md): la lectura ja hi és; tu només hi poses la comparació i què fa el LED.

### 3 · L'ultrasons i la teva mascota (Sessió 3)
1. Munta l'ultrasons (TRIG al 12, ECHO a l'11). Carrega `03_ultrasons_funcio.ino` i obre el **Serial Plotter**.
2. distància (cm) = temps × ______ ÷ 2.
3. Què **et torna** la funció `mesuraDistancia()`? ______________________

**La teva mascota.** Abans de programar, omple la seva fitxa:

- **Nom:** ______________________ · **Caràcter:** ______________________

| Reacció | Quin sensor? | Què fa la mascota? | Per què encaixa amb el seu caràcter? |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

**Explica-la en 1 minut** (a la taula, mentre treballes): presenta la mascota i què fa cada reacció.

### 4 · Prova pràctica T1 (Sessió 4, individual)
**Tota la Sessió 4** és la prova T1: individual, amb el teu kit. **Pots consultar el teu quadern i els esquemes.** Si fas el mínim ben fet, tens un 5-6; si fas les ampliacions, fins a 10. Per això tenir el quadern al dia et serveix tant.

<!-- /web:only-github -->

## El producte · La mascota
Es **tanca a la Sessió 3** (la Sessió 4 és la prova T1): la mascota amb **3 reaccions** (algú s'acosta, es fa fosc, hi ha soroll…) que encaixen amb el seu caràcter, i la seva fitxa. L'expliques en **1 minut** a peu de taula. Es corregeix amb la [rúbrica del robot](../00_General/00_Projecte_T1_Mascota.md).

## Si alguna cosa no funciona (DEPURA)
> **D**igues què esperaves i què passa · **E**xamina (**mira el Monitor sèrie!**) · **P**rova **un sol canvi** cada vegada · **U**bica on és el problema · **R**epara-ho · **A**punta-ho al quadern. Mira primer que el sensor tingui els cables de **5 V i GND** ben posats. Encara no ho trobes? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## Com ho he fet? (la nota és de 0 a 10)
| Sé fer… | Encara no | Bé | Molt bé | Excel·lent |
|---|---|---|---|---|
| Llegir un botó i un sensor (digital i analògic) | ☐ | ☐ | ☐ | ☐ |
| Fer servir el Monitor sèrie per triar bé els números | ☐ | ☐ | ☐ | ☐ |
| Escriure i fer servir funcions meves | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho al teu **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (compta el 25 %).
- **Diferència entre una entrada digital (el botó) i una analògica (el sensor de llum):** ______________________
- **Per a què serveix una funció?** ___________________________________
- **Un error que he tingut i com l'he arreglat:** _____________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** [Reptes ⭐](../../Reptes/Reptes_SA3.md) (llindar ajustable, instrument) i més activitats a la **[fitxa ampliada](SA3_fitxa_ampliada.md)**.

> 🤖 **El robot del trimestre:** la mascota és el producte d'aquesta SA. Muntatge, cables i l'esquelet del programa: **[dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md)**.
