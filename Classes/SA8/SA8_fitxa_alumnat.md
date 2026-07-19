# SA8 · Fitxa base — IoT i IA · *connecta el sistema i decideix amb dades*

<!-- web:only-github -->

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Connectaràs dispositius (telemetria/IoT) i faràs que el sistema "reconegui" patrons (IA). Pensa també en l'**ètica de les dades**.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Enviar i rebre **dades a distància** (telemetria per ràdio).
2. Explicar què és l'**IoT** i valorar-ne els **riscos de privacitat** (dades personals, consentiment).
3. Distingir **regles fetes a mà** i **aprenentatge automàtic**, entrenar un classificador i detectar-ne el **biaix**.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Sistema connectat o classificador** (producte) | **R1** i **R3** | Projectes (45 %) |
| **Reflexió ètica** (privacitat, biaix, consentiment) | **R4** | Projectes (45 %) |
| **Quadern tècnic** (dades enviades, informe d'auditoria IoT, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** telemetria d'**una** magnitud etiquetada que es rep i es mostra + reflexió ètica amb un risc i una mesura. **Versió completa:** dues magnituds o alerta per llindar (o classificador entrenat i provat), amb el biaix analitzat.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA8 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3MTIxMDY0/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Telemetria (S1)
> 📡 La ràdio et sona llunyana (SA5)? Repassa-la en 10' amb la targeta **[Repàs exprés de la ràdio](../00_General/00_Repas_expres_Radio.md)** abans de començar.

0. **PREDIU:** amb [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) i [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py), què mostrarà la receptora? ______________________
1. Carrega'ls en dues plaques (mateix `group`) i comprova.
2. Quines magnituds envies? __________ Cada quant? __________
3. **Repte:** envia dues magnituds etiquetades (`T:..`, `L:..`).

> 💡 Si t'encalles amb l'emissora, parteix de l'esquelet `04_telemetria_emissor_BASTIDA.py`: la ràdio i el `group` ja estan configurats; tu omples la mesura i l'enviament etiquetat.

### 2 · Auditoria d'un producte IoT (S2)
Amb la teva parella, feu d'**auditors de privacitat** d'un producte real: trieu una targeta de **[SA8_auditoria_iot.md](SA8_auditoria_iot.md)** i ompliu l'**informe d'auditoria** (mínim ètic obligatori):

| Secció de l'informe | La vostra auditoria |
|---|---|
| Producte auditat | |
| Diagrama **dispositiu → xarxa → núvol → app** (dibuixa'l al quadern) | ☐ fet |
| **3 dades personals** que recull | |
| **Risc tècnic** (on del diagrama es pot interceptar) | |
| **Risc de privacitat** (qui sap què no hauria de saber) | |
| Recomanació al **fabricant** + al **comprador** | |

Després, **peritatge creuat**: presenteu-lo en 90 segons a una altra parella (que farà d'advocada del fabricant) i gireu els papers.

### 3 · Introducció a la IA (S3)
1. Carrega [`03_ia_gestos.py`](codi/03_ia_gestos.py). Quins gestos classifica? __________
2. Diferència entre **regles fetes a mà** i **aprenentatge automàtic**: ____

![Dues maneres de classificar un gest: amb regles, una persona escriu les condicions (if/else); amb aprenentatge automàtic, es donen molts exemples etiquetats i un model n'aprèn els patrons](img/sa8-ia-regles-aprenentatge.svg)

3. **De regles a ML real:** fes [`SA8_practica_teachable_machine.md`](SA8_practica_teachable_machine.md) (entrena amb exemples). Classes i exemples per classe: __________
4. **Biaix:** amb qui podria fallar el teu classificador i per què? ____

> ✏️ **Un repte a full en blanc:** l'emissor **o** el receptor de telemetria del teu producte, escrit des de l'editor buit (pseudocodi propi + xuleta de `radio`). L'altra meitat pot partir del codi donat.

**Producte:** sistema connectat o classificador + reflexió ètica. S'avalua amb **R1**, **R3** i **R4**.

<!-- /web:only-github -->

## Producte · Sistema connectat o classificador
Tria: un **sistema connectat** (telemetria per ràdio) o un **classificador** (Teachable Machine), amb la **reflexió ètica** corresponent. S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (dades al sèrie: arriben? ben etiquetades?) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova el mateix `group` de ràdio a les dues plaques. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Envio i registro dades entre dispositius (telemetria) | ☐ | ☐ | ☐ | ☐ |
| Explico l'arquitectura IoT i els seus riscos | ☐ | ☐ | ☐ | ☐ |
| Distingeixo regles fetes a mà i aprenentatge automàtic | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Què és la telemetria?** ___________________________________________
- **Per què les "bones dades" són clau per a la IA?** _________________
- **Un error i com l'he resolt:** _____________________________________

### Ús d'assistents d'IA (honestedat) — només si n'has fet servir
> *La IA t'ha d'ajudar a APRENDRE. Declarar-ho no baixa nota; amagar-ho o no saber-ho explicar, sí. Abans de preguntar, aplica DEPURA.* (Vegeu `../00_IA_a_la_materia.md` §5.)
- **Eina i per a què:** _______________________________________________
- **Què he canviat / entès jo** (sé explicar cada línia?): ______________

<!-- /web:only-github -->

> 💻 **Sense placa?** micro:bit a [python.microbit.org](https://python.microbit.org); telemetria ESP32 a `Simulacions/Wokwi/SA8_telemetria_esp32/`.
> 📌 **Vols més?** +Reptes (estació meteo, alerta), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA8_fitxa_ampliada.md](SA8_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** la telemetria que has programat avui és la del teu **rover**: una micro:bit al rover envia dades per ràdio a la base amb pantalla OLED. Guarda el codi: es registra al **[dossier del rover](../00_General/00_Projecte_T3_Rover.md)**.
