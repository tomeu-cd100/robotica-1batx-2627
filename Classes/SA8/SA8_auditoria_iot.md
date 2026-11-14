# Pràctica 3 · Auditoria d'un producte IoT real

<div class="cap-practica" markdown="1">

❓ **La pregunta:** Què sap de tu un aparell connectat?

🎯 **Avui aconseguiràs:** fer d'**auditor/a de privacitat** d'un producte que existeix de debò: dibuixar per on viatgen les seves dades, trobar-ne els riscos i defensar el teu informe davant d'un company.

⏱️ 60' de la Sessió 2 (40' d'auditoria + 20' de peritatge)

📦 Paper i bolígraf (avui no programes: audites)

</div>

## 🚀 Pas a pas

### Pas 1 · Tria el teu producte

Tria una targeta de producte, **diferent de la del teu veí**. Cada targeta és un producte que existeix al mercat, amb les especificacions simplificades.

✍️ **Apunta-ho:** el producte que audites i per a què serveix (1 línia).

<details markdown="1">
<summary>📇 Les 8 targetes de producte</summary>

> Especificacions **simplificades però realistes**. Si el teu producte «amaga» informació (què fa exactament amb les dades), tracta-ho com ho faria un auditor: **suposa el pitjor cas raonable** i anota-ho com a risc.

#### 🏃 Targeta 1 · Polsera esportiva amb GPS

| | |
|---|---|
| **Sensors** | Ritme cardíac, acceleròmetre (passes, son), GPS. |
| **Connexió** | Bluetooth amb el mòbil; el mòbil puja les dades al núvol del fabricant. |
| **On són les dades** | Servidors del fabricant (fora de la UE); l'app en mostra gràfics. |
| **Lletra petita** | Les «estadístiques anònimes» es comparteixen amb empreses sòcies. Les rutes d'entrenament es poden fer públiques al perfil. |

#### 📷 Targeta 2 · Càmera de vigilància domèstica WiFi

| | |
|---|---|
| **Sensors** | Càmera (vídeo nocturn inclòs), micròfon, detector de moviment. |
| **Connexió** | WiFi de casa; vídeo en directe i clips al núvol (quota de pagament). |
| **On són les dades** | Núvol del fabricant; accessible des de l'app de qualsevol lloc. |
| **Lletra petita** | La contrasenya per defecte és la mateixa a totes les càmeres del model. El micròfon capta converses de tota l'habitació. |

#### 🗣️ Targeta 3 · Altaveu amb assistent de veu

| | |
|---|---|
| **Sensors** | Micròfons sempre actius esperant la paraula d'activació. |
| **Connexió** | WiFi; la veu s'envia al núvol per interpretar-la. |
| **On són les dades** | Historial de veu al compte de l'usuari; revisors humans en poden escoltar mostres «per millorar el servei». |
| **Lletra petita** | S'activa per error amb paraules semblants i grava sense que ningú ho demani. Sap quan hi ha algú a casa i què pregunta. |

#### 🚪 Targeta 4 · Timbre intel·ligent amb càmera

| | |
|---|---|
| **Sensors** | Càmera cap al carrer, micròfon, detector de presència. |
| **Connexió** | WiFi; notificació i vídeo al mòbil de l'amo. |
| **On són les dades** | Núvol del fabricant; clips guardats 30 dies. |
| **Lletra petita** | Grava **tothom** que passa per la vorera, no només qui truca. En alguns països el fabricant ha cedit vídeos a la policia sense ordre judicial. |

#### ⚖️ Targeta 5 · Bàscula connectada

| | |
|---|---|
| **Sensors** | Pes, percentatge de greix i aigua corporal; reconeix fins a 8 usuaris pel pes. |
| **Connexió** | WiFi directa al núvol (funciona sense mòbil a prop). |
| **On són les dades** | Historial de salut de cada membre de la família al núvol; gràfics de tendència a l'app. |
| **Lletra petita** | Les dades corporals són **dades de salut** (categoria especialment protegida pel RGPD). Qualsevol membre de la família amb l'app veu les dades de tots. |

#### 🐕 Targeta 6 · Collar localitzador de mascota

| | |
|---|---|
| **Sensors** | GPS, acceleròmetre (activitat de l'animal). |
| **Connexió** | Xarxa mòbil (SIM integrada) directa al núvol. |
| **On són les dades** | Posició en temps real i historial de rutes a l'app. |
| **Lletra petita** | El gos surt a passejar sempre amb la mateixa persona: el collar **també traça la rutina de l'amo** (a quina hora surt, per on, quan no és a casa). |

#### 🌡️ Targeta 7 · Termòstat intel·ligent

| | |
|---|---|
| **Sensors** | Temperatura, humitat, presència (sap si hi ha algú a l'habitació). |
| **Connexió** | WiFi; control des de l'app i integració amb l'assistent de veu. |
| **On són les dades** | Núvol del fabricant: horaris de presència i hàbits d'ús, per «aprendre la teva rutina». |
| **Lletra petita** | El seu registre diu **exactament quan la casa és buida**, cada dia. El fabricant pot compartir «patrons d'ús agregats» amb l'elèctrica. |

#### 🧸 Targeta 8 · Joguina connectada que conversa

| | |
|---|---|
| **Sensors** | Micròfon i altaveu; «respon» les preguntes de l'infant. |
| **Connexió** | Bluetooth amb el mòbil dels pares; la veu va al núvol per generar la resposta. |
| **On són les dades** | Gravacions de veu d'infants als servidors del fabricant. |
| **Lletra petita** | Els menors tenen **protecció reforçada** al RGPD i no poden consentir per si sols. En un cas real, un fabricant va patir una filtració amb milions de converses de nens. |

</details>

### Pas 2 · Dibuixa el diagrama

Al full del quadern, dibuixa **dispositiu → xarxa → núvol → app** per al teu producte: quins sensors té, per on transmet (BLE, WiFi, ràdio), on es guarden les dades i qui les veu. Etiqueta cada fletxa amb el protocol.

✅ **Comprova:** el teu diagrama té les quatre caixes i cada fletxa té el seu protocol.

✍️ **Apunta-ho:** tres dades personals que recull el producte (que identifiquen o descriuen una persona).

### Pas 3 · Troba els riscos

Busca **dos riscos concrets**. Res de genèric: «et poden hackejar» no val; «el vídeo viatja sense xifrar del timbre al router i un veí amb la clau WiFi el pot veure» sí. Si la targeta amaga informació, suposa el pitjor cas raonable.

✍️ **Apunta-ho:** un risc **tècnic**: què pot fallar o ser interceptat, i **on** del diagrama.

✍️ **Apunta-ho:** un risc de **privacitat**: què pot saber algú que no hauria de saber-ho.

### Pas 4 · Fes les recomanacions

✍️ **Apunta-ho:** una recomanació al **fabricant** (què hauria de canviar del disseny) i una al **comprador** (què hauria de configurar o saber abans d'usar-lo).

### Pas 5 · Peritatge creuat

Presenta el teu informe en **90 segons** a un company o companya, que fa d'**advocat/ada del fabricant** i ha de rebatre un dels teus riscos. Tu el defenses amb el diagrama a la mà. Després gireu els papers.

> 🗣️ **Frases per a l'advocat del fabricant:** *«Aquest risc és teòric perquè…»* · *«Les dades es xifren quan…»* · *«L'usuari ho ha acceptat en instal·lar l'app perquè…»*

✅ **Comprova:** has defensat el teu informe i has fet d'advocat del producte d'un altre.

✍️ **Apunta-ho:** després de l'auditoria, què faràs diferent amb els aparells connectats de casa teva?

### Pas 6 · Respon i envia

📤 [Obre la tasca «SA8 · Pràctica 3» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU3Njc5OTgz/details)

📷 [Penja la foto de la teva pràctica a la tasca «Foto · SA8 · Pràctica 3»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU4OTI4ODU4/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i **guarda l'informe**: a la S3 et preguntaràs què passa quan el teu producte, a més de recollir dades, **decideix** amb elles. A la sessió següent: **[Pràctica 4 · IA de gestos](codi/03_ia_gestos_EXPLICACIO.md)**.

⭐ **Si acabes abans:** mira com és de debò el tram «dispositiu → xarxa» amb l'**[ESP32 per WiFi](codi/04_esp32_telemetria/EXPLICACIO.md)** (ampliació ⭐⭐⭐). Més reptes a **[Reptes de la SA8](../../Reptes/Reptes_SA8.md)**.

<details markdown="1">
<summary>🧠 Vols saber per què s'avalua així?</summary>

> 🪜 **Versió nucli:** diagrama + 2 dades + 1 risc + 1 recomanació ja és un informe defensable. **Versió completa:** tot el quadre, amb el risc tècnic ubicat al diagrama.

| Evidència | Criteri | Rúbrica |
|---|---|---|
| **Informe d'auditoria** (les 5 seccions) | CA4.2 (arquitectura IoT) i CA5.3 (impacte ètic/social) | **R4** |
| **Peritatge creuat** (argumentar i rebatre amb vocabulari tècnic) | CA5.2, CA5.3 | R4 (comunicació) i **R5** (cooperació) |

</details>
