# SA8 · Auditoria d'un producte IoT real (S2)

**Durada:** 60' dins la S2 (40' auditoria + 20' peritatge) · **Maquinari:** cap — paper i bolígraf

> Avui no programes: **audites**. Les empreses contracten **auditors de privacitat** perquè revisin els seus productes connectats abans (o després…) que surtin al mercat. La teva parella és avui una d'aquestes auditores: rebreu **un producte IoT real** i n'haureu de destapar què sap de l'usuari, per on viatgen les dades i què pot sortir malament.

## Com funciona

1. **Trieu (o rebeu) una targeta de producte** d'aquesta pàgina. Cada targeta és un producte que existeix de debò al mercat, amb les especificacions simplificades.
2. **Ompliu l'informe d'auditoria** (a sota, 1 pàgina — també és l'activitat 2 de la fitxa). Teniu 40 minuts. La secció **«Ètica de dades i IA»** que ha explicat el docent i la [fitxa base](SA8_fitxa_alumnat.md) són el vostre material de consulta.
3. **Peritatge creuat (20'):** presenteu l'informe en **90 segons** a una altra parella. Ells fan d'**advocats del fabricant**: han de rebatre **un** dels vostres riscos («això ja ho resolem amb…»). Vosaltres defenseu l'informe amb arguments tècnics. Després **es giren els papers**.

> 🗣️ **Frases d'inici per a l'advocat del fabricant:** *«Aquest risc és teòric perquè…»* · *«Les dades es xifren quan…»* · *«L'usuari ho ha acceptat en instal·lar l'app perquè…»* — i els auditors responen amb el **diagrama** a la mà.

## L'informe d'auditoria (1 pàgina)

| Secció | Què hi has de posar |
|---|---|
| **1 · Producte auditat** | Nom de la targeta i per a què serveix (1 línia). |
| **2 · Diagrama de l'arquitectura** | Dibuixa **dispositiu → xarxa → núvol → app** per al TEU producte: quins sensors té, per on transmet (BLE/WiFi/ràdio), on es guarden les dades, qui les veu. Etiqueta les fletxes amb el protocol. |
| **3 · Tres dades personals** | Tres dades **que identifiquen o descriuen una persona** que el producte recull (directament o que es poden deduir). |
| **4 · Dos riscos concrets** | Un de **tècnic** (què pot fallar o ser interceptat, i **on** del diagrama) i un de **privacitat** (què pot saber algú que no hauria de saber-ho). Res de genèric: «et poden hackejar» no val; «el vídeo viatja sense xifrar del timbre al router i un veí amb la clau WiFi el pot veure» sí. |
| **5 · Dues recomanacions** | Una al **fabricant** (què hauria de canviar del disseny) i una al **comprador** (què hauria de configurar o saber abans d'usar-lo). |

> 🪜 **Versió nucli:** diagrama + 2 dades + 1 risc + 1 recomanació ja és un informe defensable. **Versió completa:** tot el quadre, amb el risc tècnic ubicat al diagrama.

---

## Targetes de producte

> Especificacions **simplificades però realistes**. Si el teu producte «amaga» informació (què fa exactament amb les dades), tracta-ho com ho faria un auditor: **suposa el pitjor cas raonable** i anota-ho com a risc.

### 🏃 Targeta 1 · Polsera esportiva amb GPS

| | |
|---|---|
| **Sensors** | Ritme cardíac, acceleròmetre (passes, son), GPS. |
| **Connexió** | Bluetooth amb el mòbil; el mòbil puja les dades al núvol del fabricant. |
| **On són les dades** | Servidors del fabricant (fora de la UE); l'app en mostra gràfics. |
| **Lletra petita** | Les «estadístiques anònimes» es comparteixen amb empreses sòcies. Les rutes d'entrenament es poden fer públiques al perfil. |

### 📷 Targeta 2 · Càmera de vigilància domèstica WiFi

| | |
|---|---|
| **Sensors** | Càmera (vídeo nocturn inclòs), micròfon, detector de moviment. |
| **Connexió** | WiFi de casa; vídeo en directe i clips al núvol (quota de pagament). |
| **On són les dades** | Núvol del fabricant; accessible des de l'app de qualsevol lloc. |
| **Lletra petita** | La contrasenya per defecte és la mateixa a totes les càmeres del model. El micròfon capta converses de tota l'habitació. |

### 🗣️ Targeta 3 · Altaveu amb assistent de veu

| | |
|---|---|
| **Sensors** | Micròfons sempre actius esperant la paraula d'activació. |
| **Connexió** | WiFi; la veu s'envia al núvol per interpretar-la. |
| **On són les dades** | Historial de veu al compte de l'usuari; revisors humans en poden escoltar mostres «per millorar el servei». |
| **Lletra petita** | S'activa per error amb paraules semblants i grava sense que ningú ho demani. Sap quan hi ha algú a casa i què pregunta. |

### 🚪 Targeta 4 · Timbre intel·ligent amb càmera

| | |
|---|---|
| **Sensors** | Càmera cap al carrer, micròfon, detector de presència. |
| **Connexió** | WiFi; notificació i vídeo al mòbil de l'amo. |
| **On són les dades** | Núvol del fabricant; clips guardats 30 dies. |
| **Lletra petita** | Grava **tothom** que passa per la vorera, no només qui truca. En alguns països el fabricant ha cedit vídeos a la policia sense ordre judicial. |

### ⚖️ Targeta 5 · Bàscula connectada

| | |
|---|---|
| **Sensors** | Pes, percentatge de greix i aigua corporal; reconeix fins a 8 usuaris pel pes. |
| **Connexió** | WiFi directa al núvol (funciona sense mòbil a prop). |
| **On són les dades** | Historial de salut de cada membre de la família al núvol; gràfics de tendència a l'app. |
| **Lletra petita** | Les dades corporals són **dades de salut** (categoria especialment protegida pel RGPD). Qualsevol membre de la família amb l'app veu les dades de tots. |

### 🐕 Targeta 6 · Collar localitzador de mascota

| | |
|---|---|
| **Sensors** | GPS, acceleròmetre (activitat de l'animal). |
| **Connexió** | Xarxa mòbil (SIM integrada) directa al núvol. |
| **On són les dades** | Posició en temps real i historial de rutes a l'app. |
| **Lletra petita** | El gos surt a passejar sempre amb la mateixa persona: el collar **també traça la rutina de l'amo** (a quina hora surt, per on, quan no és a casa). |

### 🌡️ Targeta 7 · Termòstat intel·ligent

| | |
|---|---|
| **Sensors** | Temperatura, humitat, presència (sap si hi ha algú a l'habitació). |
| **Connexió** | WiFi; control des de l'app i integració amb l'assistent de veu. |
| **On són les dades** | Núvol del fabricant: horaris de presència i hàbits d'ús, per «aprendre la teva rutina». |
| **Lletra petita** | El seu registre diu **exactament quan la casa és buida**, cada dia. El fabricant pot compartir «patrons d'ús agregats» amb l'elèctrica. |

### 🧸 Targeta 8 · Joguina connectada que conversa

| | |
|---|---|
| **Sensors** | Micròfon i altaveu; «respon» les preguntes de l'infant. |
| **Connexió** | Bluetooth amb el mòbil dels pares; la veu va al núvol per generar la resposta. |
| **On són les dades** | Gravacions de veu d'infants als servidors del fabricant. |
| **Lletra petita** | Els menors tenen **protecció reforçada** al RGPD i no poden consentir per si sols. En un cas real, un fabricant va patir una filtració amb milions de converses de nens. |

---

## Com s'avalua

| Evidència | Criteri | Rúbrica |
|---|---|---|
| **Informe d'auditoria** (les 5 seccions) | CA4.2 (arquitectura IoT) i CA5.3 (impacte ètic/social) | **R4** |
| **Peritatge creuat** (argumentar i rebatre amb vocabulari tècnic) | CA5.3 | R4 (coavaluació) |

> ♻️ **Aquest producte torna a sortir:** a la **S3 (IA)** ens preguntarem què passa quan el teu producte, a més de recollir dades, **decideix** amb elles. Guarda l'informe.
