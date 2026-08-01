# SA3 · Fitxa base — Entrades i sensors · *fes que el sistema percebi el món*

<!-- web:only-github -->

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Ara el sistema **percep** l'entorn. Treballaràs entrades digitals i analògiques, el monitor sèrie i les funcions.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Llegir **polsadors** (amb antirebot) i **sensors analògics** (0–1023) i decidir amb llindars.
2. **Calibrar i depurar** amb el Monitor sèrie i el multímetre.
3. Escriure **funcions pròpies** que retornen un valor.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Alarma / sensor d'aparcament** (producte, **S3**) + defensa d'1' | **R1** i **R2** | Projectes (45 %) |
| **Prova T1** (individual, **la S4 sencera**) | **R1, R2, R4** | Proves (20 %) |
| **Quadern tècnic** (pseudocodi, calibratges, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (m'avisa abans de la prova) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** avís de **2 nivells** segons la distància (LED + so) que funciona de manera fiable. **Versió completa:** els 3 trams calibrats, tractament del «0 = sense eco» i codi amb funcions pròpies.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

> ✍️ **Rutina de la SA:** cada sessió amb pràctica comença amb un **kata de 10 minuts**: escriure de zero (individual, amb apunts) el bloc central del programa del dia, ABANS d'obrir el codi donat. Si ningú no el projecta, reclameu-lo! El dia del mini-check, el mini-check fa de kata.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA3 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE4MDEwMzM3/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Polsador i monitor sèrie (S1)
0. **PREDIU:** mirant `01_polsador_debounce.ino`, què mostrarà el monitor quan premis? ______________________
1. Munta el polsador al pin 2 (`INPUT_PULLUP`). Carrega, obre el **Monitor sèrie** i comprova.
2. En repòs el pin llegeix ______ i en prémer ______ (HIGH/LOW).
3. Per què cal l'**antirebot** (*debounce*)? ______________________
4. **Repte:** mode *toggle* (cada premuda encén/apaga un LED).

### 2 · Entrades analògiques (S2)
1. Llegeix el potenciòmetre (A0) i la LDR (A1). Rang de valors: ____ a ____
2. Quina funció converteix 0-1023 → 0-255? `__________`
3. **Racó de mesura (multímetre):** tensió al punt mig del divisor = ______ V · lectura del programa = ______ → lectura/1023 · 5 V = ______ V. Coincideixen? ____
4. **Llum automàtic:** el LED s'encén quan la lectura de la LDR és ____ que ______.

> 💡 Si t'encalles amb el llindar, parteix de l'**esquelet** de la secció «Si t'encalles» de la [pàgina de la pràctica d'entrades analògiques](codi/02_potenciometre_ldr/EXPLICACIO.md): la lectura i el Monitor sèrie ja hi són; tu omples la comparació amb el llindar i què fa cada cas.

### 3 · Ultrasons, funcions i PRODUCTE: alarma / aparcament (S3)
1. Munta l'HC-SR04 (TRIG=12, ECHO=11). Carrega `03_ultrasons_funcio.ino`, obre el **Serial Plotter**.
2. distància (cm) = temps · ______ / 2.
3. Què **retorna** la funció `mesuraDistancia()`? ______________________
4. *(+ Ampliació)* funció que retorna la **mitjana de 3 mesures** (per què millora?).

> ✏️ **Nou hàbit — dissenya abans de codificar:** escriu al quadern el **pseudocodi** del teu sistema (3–5 línies, paraules teves: *"REPETEIX: llegeix distància; SI < 10 → …"*) o un diagrama de flux, i ensenya'l **abans** d'obrir l'editor. A partir d'ara ho faràs a cada repte.

Ara el **producte** (es tanca avui — la S4 és la prova T1): dissenya un avís que depèn de la distància:

| Distància | LED | So (piezo) |
|---|---|---|
| > 30 cm (lluny) | | |
| 10–30 cm | | |
| < 10 cm (molt a prop) | | |

**Defensa (1', a peu de taula durant la S3):** explica el teu sistema i una aplicació real. S'avalua amb **R1** i **R2**.

### 4 · Prova pràctica T1 (S4, individual)
La sessió 4 **sencera** és la **prova T1**: individual, amb el teu kit, i pots consultar **el teu quadern i els esquemes**. Nucli ben fet = 5-6; ampliacions = 7-10. Per això el quadern al dia és el teu millor material permès.

<!-- /web:only-github -->

## Producte · Alarma / sensor d'aparcament
Es **tanca a la S3** (la S4 és la prova T1): un avís de **LED + so** que canvia segons la **distància** mesurada. **Defensa d'1'** a peu de taula. S'avalua amb **R1** i **R2**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (**Monitor sèrie!**) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Revisa l'alimentació del sensor (VCC/GND). Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Distingeixo i llegeixo entrades digitals i analògiques | ☐ | ☐ | ☐ | ☐ |
| Faig servir el Monitor sèrie per calibrar | ☐ | ☐ | ☐ | ☐ |
| Escric i faig servir funcions pròpies | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Diferència entre entrada digital i analògica:** ______________________
- **Per a què serveix una funció?** ___________________________________
- **Un error i com l'he resolt:** _____________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** +[Reptes ⭐](../../Reptes/Reptes_SA3.md) (llindar ajustable, instrument), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA3_fitxa_ampliada.md](SA3_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** avui tanques la teva **mascota**: el muntatge amb **com a mínim 3 reaccions sensor→comportament** és el producte d'aquesta SA (la lògica de trams del teu sensor d'aparcament és la que fa servir el PIR de la mascota). Presenta'l amb el circuit i el codi de les activitats anteriors al **[dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md)**.
