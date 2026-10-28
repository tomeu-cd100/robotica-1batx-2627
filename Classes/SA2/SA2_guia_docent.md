# SA2 · Guia docent — Sortides digitals i PWM (*Pulse Width Modulation*): dona vida als actuadors

**Durada:** 6 h (3 sessions; la Prova SA1 es fa abans, a la [sessió de marge](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md#sessio-de-marge-prova-sa1-i-posada-al-dia)) · **Maquinari:** Arduino UNO + kit Keyestudio/BQ · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/11_SA2_Sortides_digitals_PWM.md`](../../Programació%20didàctica/11_SA2_Sortides_digitals_PWM.md) · **Esquemes:** [`SA2_esquemes_connexions.md`](SA2_esquemes_connexions.md)

## ⚡ Xuleta de sessió (si només llegeixes una cosa, que sigui això)

> L'alumnat segueix l'**itinerari pas a pas de la [portada de la SA2](README.md)** (una sessió plegable per dia). Tu fas una **explicació curta al principi** i després **circules** per les taules. La resta de la guia és el detall per si el necessites.

| | 🗣️ Explica (només això, ~10') | 👀 Mentre treballen, vigila | ✅ Abans que marxin, comprova |
|---|---|---|---|
| **S1** · Semàfor | **D'on surt el 220 Ω** (llei d'Ohm a la pissarra, 5'). Després, llegeix el `loop()` del semàfor en veu alta com una **recepta**: encén, espera, apaga. `delay()` **atura tot**. Al final, el mateix amb `switch`: «on hi posaríeu una 4a fase?» | Un sol LED sense resistència per a tots tres · `case` sense `break` · qui no fa passar el seu circuit pel **Racó de mesura** | Semàfor funcionant · durades i mesures apuntades. La fase nocturna és repte, no mínim |
| **S2** · PWM i RGB | `digitalWrite` = 0 o 1; `analogWrite` = **0 a 255**. Pregunta: «què fa el 128?» **Només pins `~`** (3, 5, 6, 9, 10, 11). | LED en un pin sense `~` · el mòdul RGB amb el − fora de GND | *Fade* funcionant · 3 colors RGB apuntats |
| **S3** · Panell | Gairebé res: **mini-check** (10') i recorda **mínim = 2 estats amb color + so**. Fes-los omplir la taula d'estats **abans** de tocar codi. | Qui programa sense haver dissenyat els estats · relé mal alimentat | Panell amb ≥2 estats · checklist fet · **defensa d'1'** (R1 + R2) · formulari **enviat** |

> 📝 **La Prova SA1 ja no és aquí:** es fa a la [sessió de marge](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md#sessio-de-marge-prova-sa1-i-posada-al-dia) entre la SA1 i la SA2. L'antiga S1 (`Blink` amb constants i variables) repetia la SA1 i s'ha tret: el sketch `01_led_basic` queda com a bastida «comença per un sol LED» per a qui s'encalla amb el semàfor.

> 🎯 **Prioritat si vas just de temps:** primer que **tothom tingui el mínim funcionant**; els passos «Si acabes abans» i els ⭐ són per a qui va avançat. Els **katas** d'aquesta SA estan arxivats (18-10-2026, [`docs/arxiu/SA2_katas/`](../../docs/arxiu/SA2_katas/README.md)): no s'hi arribava.

---

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), treball individual amb ajuda entre iguals i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Escriure programes amb variables, constants i estructures de control (`for`, `if`).
2. Controlar sortides digitals i regular intensitat/to amb **PWM** (`analogWrite`).
3. Muntar circuits de sortida segurs (resistència limitadora, polaritat).
4. Documentar codi i esquema al quadern tècnic.

## Material per alumne/a
- Arduino UNO + USB, protoboard, cables dupont.
- LED (vermell, groc, verd), 1 LED RGB (càtode comú), resistències 220 Ω, brunzidor piezo, mòdul relé.

## Codi de suport (carpeta `codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_led_basic.ino` | **Bastida** (no és sessió pròpia): un sol LED al pin 8, per a qui s'encalla amb el semàfor. |
| `02_semafor.ino` | Semàfor de 3 LED amb temporització. |
| `02b_semafor_switch.ino` | El mateix semàfor amb `switch` sobre una variable de fase (llavor de la SA6). |
| `03_fade_pwm.ino` | Efecte *fade* amb PWM. |
| `04_rgb.ino` | Barreja de colors amb LED RGB. |
| `05_panell_senyalitzacio.ino` | Producte integrador (RGB + piezo + relé). |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** de la SA n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. Predir abans de provar consolida la comprensió. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA1** (parpelleig d'un LED) → portem a la **SA3** (entrades i sensors). Aquí el sistema **actua** (sortides); a la SA3 aprendrà a **percebre** (entrades).
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*

---

## SESSIÓ 1 (2 h) — Estructures de control: el semàfor
- **Activació (10'):** com es repeteix una seqüència? → bucles. 🔭 **Referent (1'):** **Limor Fried** («Ladyada»), Adafruit i el maquinari lliure ([guió](../00_General/00_Referents_tecnologia.md)).
- **D'on surt el 220 Ω (5'):** càlcul de la llei d'Ohm a la pissarra (vegeu el requadre de sota). Pota llarga = ànode (+).
- **Modelatge (25'):** `02_semafor.ino`. `if`, constants de temps i ordre de les fases (el `for` encara no: arriba a la S2 amb el *fade*). Variant amb **`switch` sobre una variable `fase`** (0-vermell, 1-verd, 2-groc): mateixa seqüència, codi més llegible — és la llavor de les **màquines d'estats** de la SA6. Introducció a `millis()` vs `delay()` (concepte, sense aprofundir).
- **Pràctica guiada (35'):** munten 3 LED (pins 8-9-10), cadascun amb la seva resistència, i programen el cicle. Mentrestant, **Racó de mesura** rotatiu (vegeu sota).
- **Repte (25'):** afegir **fase nocturna** (groc intermitent) activable; **+ repte:** semàfor de vianants amb segon grup de LED.
- **Tancament (5'):** quadern.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (semàfor de vianants)**. Qui s'encalla amb 3 LED, que comenci per **un sol LED** amb la bastida [`01_led_basic`](codi/01_led_basic/EXPLICACIO.md) (és el `Blink` de la SA1 al pin 8) i després en munti tres.

**Punt clau:** sempre **resistència limitadora** (220 Ω) en sèrie amb **cada** LED. `delay()` bloqueja el programa; per a sistemes que han de fer diverses coses alhora s'usa `millis()`. **Itinerari del concepte:** aquí es presenta; a la **SA3-S1** apareix per primer cop dins l'antirebot del polsador (l'explicació de la pràctica el desenvolupa: cronòmetre que es consulta, resta `millis() - marca`, `unsigned long`) — **no el donis per sabut aquell dia**; a la **SA4** es practica (mini-pràctica `05_dos_servos_millis`); a la **SA6** s'usa de debò (màquina d'estats no bloquejant).

> ⚡ **D'on surt el 220 Ω? (llei d'Ohm aplicada, ~5' abans del Modelatge):** no donis el valor per rebut — calcula'l a la pissarra amb l'alumnat: el LED cau ~2 V i vol ~20 mA, així que R = (5 − 2) V / 0,02 A = **150 Ω** → agafem el **valor comercial superior (220 Ω)** per marge de seguretat. És l'única aparició explícita de la **llei d'Ohm** al curs (connexió amb Física): el Racó de mesura de sota tanca el cercle, perquè les tensions mesurades (~2 V + ~3 V) són exactament les del càlcul.

> 🔌 **Racó de mesura (dins la pràctica guiada, ~5' per alumne/a):** munta un punt amb **multímetre** i fes-hi passar l'alumnat rotativament amb el seu semàfor encès: mesurar la **tensió entre les potes d'un LED** (~2 V) i **a la seva resistència** (~3 V), i comprovar que sumen ~5 V. És la primera vegada que *veuen* la llei de la malla en un circuit seu (connexió amb Física) i l'única evidència de **mesura física real** de la CA2.2/R2 fins ara. Amb 2-3 multímetres n'hi ha prou (el taller de tecnologia acostuma a tenir-ne); si no n'hi ha cap, fes-ho com a demo projectada amb el teu. Si no hi cap tothom, acaba'l a l'inici de la S2.
>
> **Pla B sense multímetres (evidència CA2.2 igualment):** cada alumne/a replica el seu circuit a **Tinkercad**, hi connecta el **multímetre simulat** i fa les dues mesures (LED i resistència) amb **captura de pantalla al quadern** + comprovació que sumen 5 V. Completa-ho amb una mesura «per programari» calibrada: llegir el mateix divisor de tensió amb `analogRead` i convertir el valor ADC a volts (`v = lectura * 5.0 / 1023`), comparant-lo amb el valor simulat. La R2 accepta aquestes dues evidències com a «mesura i interpretació de magnituds» quan no hi ha instrument físic; deixa-ho anotat al quadern («mesura simulada per manca d'instrument»).

---

## SESSIÓ 2 (2 h) — PWM: intensitat i color
- **Activació (10'):** *"Com es regula la intensitat d'un LED si només hi ha HIGH/LOW?"* → **PWM**.
- **Modelatge (25'):** `03_fade_pwm.ino` (`analogWrite` 0-255) i funció `map()`. Després `04_rgb.ino` (barreja RGB).
- **Pràctica guiada (35'):** efecte *fade* al pin 9; després colors amb el LED RGB (pins 9-10-11).
- **Repte (40'):** crear 5 colors propis i una transició suau entre dos colors; **+ repte:** arc de Sant Martí cíclic.
- **Tancament (10'):** quadern (taula de colors RGB provats).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (arc de Sant Martí cíclic)**.

**Punt clau:** PWM només als pins amb `~` (3, 5, 6, 9, 10, 11). Valors 0-255.

---

## SESSIÓ 3 (2 h) — Producte: panell de senyalització
- **Mini-check individual (10', substitueix l'activació):** escriu de memòria un Blink complet al pin 8 (detecta l'*efecte passatger*) — [`00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md). Aprofita el canvi de full per presentar en 1' el repte integrador.
- **Pràctica (70'):** `05_panell_senyalitzacio.ino` com a base. Integren **LED RGB (estat) + piezo (avís) + relé (càrrega)**. Cada alumne/a personalitza estats i seqüència.
- **Documentació + defensa (30'):** completen esquema i codi comentat; **mini-defensa individual d'1'** (amb 5 alumnes, ~5-7' en total, i queda temps per a la revisió creuada de codi) del seu panell amb la **mini-rúbrica de defensa oral R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)) — és la **primera** defensa del curs: comparteix els 3 indicadors abans (claredat · decisió justificada · respondre preguntes) i exigeix sobretot el primer.
- **Tancament (10'):** autoavaluació amb rúbriques.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la personalització extra d'estats i seqüència (dins la Pràctica; limita el panell a 2-3 estats)**.

**Producte:** dispositiu de senyalització programable (semàfor amb fase nocturna o panell d'estat RGB + so + càrrega).
**Avaluació:** rúbriques **R1** (codi) i **R2** (circuit).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (panell/semàfor) | Sortides digitals + PWM en un sistema integrat | CA2.1, CA2.2 | R1, R2 |
| Repte curt de codi | Variables, `for`/`if`, `analogWrite`, `map()` | CA1.1 | R1 |
| Quadern tècnic | Esquema, codi comentat, errors i millores | CA1.1, CA2.2 | **R4** |
| Observació de muntatge | Resistència limitadora, polaritat, seguretat | CA2.1 | R2 |
| Ajuda entre iguals i **revisió creuada** de codi | Cooperació sense producte compartit: línia d'ajuda del quadern + una millora concreta i un dubte al company | CA5.3 | **R5** |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA2.2 = mesurar/interpretar senyals. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1 i R2 amb l'alumnat **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| LED sempre encès o apagat | Pin equivocat o sense `pinMode OUTPUT` | Revisar número de pin i `setup()`. |
| `analogWrite` no regula | Pin sense PWM | Usar pin amb `~` (3,5,6,9,10,11). |
| RGB mostra colors estranys | Càtode/ànode comú confós | Verificar tipus de LED i pin comú a GND (càtode comú). |
| El relé no commuta | Alimentació insuficient | Alimentar el mòdul correctament; revisar pin de senyal. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

- **S1 · `02_semafor` (`if`/`switch`, seqüència):** recorda en 1' el que ja saben de la SA1 (`const int`, `pinMode`, `digitalWrite`, `delay`) i que ara hi ha **tres** constants de pin. Recorre el `loop()` en veu alta com una **recepta seqüencial**. Demana **predir l'ordre** d'encesa abans d'executar. Verbalitza: *`delay()` bloqueja — mentre espera, no passa res més*. En mostrar la variant amb `switch`, pregunta: *"quantes fases té el semàfor? i si n'hi afegim una quarta (nocturna), on aniria?"* *Error a anticipar:* esperar que els LED canviïn alhora; oblidar el `break` de cada `case`. **Analogia del `switch`** (la de la pràctica 2b): la parada del mercat amb números de torn — `fase` és la pantalla, cada `case` una finestreta, `fase = …;` canvia la pantalla i `break` és «te'n vas». ⚠️ **No demanis «esborra un `break` i mira què passa»:** en aquest semàfor el *fall-through* dona la mateixa seqüència i no es veu res. L'experiment visible és canviar `fase = 1;` per `fase = 2;` al `case 0` (se salta el verd); el `break` oblidat es nota quan hi ha el `case 3` nocturn.
- **S2 · `03_fade_pwm` / `04_rgb` (PWM, `map()`):** contrasta `digitalWrite` (0/1) amb `analogWrite` (**0–255**). Demana predir què fa el valor **128**. Mantra: *PWM només als pins `~`*. *Error a anticipar:* barrejar el rang 0–1023 (lectura) amb 0–255 (PWM).
- **S3 · `05_panell` (integració):** no facis codi nou; mostra'l com a **integració** i pregunta com combinarien estat (RGB) + avís (piezo) + càrrega (relé).

> 🤖 **Fil conductor de robots:** si el curs segueix el fil conductor
> ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md)),
> aquesta S3 és la **sessió de fabricació de la mascota**: el repte de la S2 fa
> de producte (palanca oficial del pla de contingència). Cada alumne/a porta
> l'esborrany de la cara fet (de casa o del tancament de la S2); a la S3
> s'ajusta, el docent el valida i es talla per rotacions
> ([dossier](../00_General/00_Projecte_T1_Mascota.md)). El mini-check de la S3
> es manté a l'inici de la sessió.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Començar amb **1 LED** abans del semàfor de 3 (pràctica [`01_led_basic`](codi/01_led_basic/EXPLICACIO.md)); l'**esquelet amb `// TODO`** de la secció «Si t'encalles» de la [pàgina de la pràctica del semàfor](codi/02_semafor/EXPLICACIO.md); ajuda puntual d'un company que ja ho tingui resolt. |
| **+ Ampliació** (qui va sobrat) | Fase nocturna, semàfor de vianants, arc de Sant Martí RGB; reptes ⭐ de [`Reptes/Reptes_SA2.md`](../../Reptes/Reptes_SA2.md). |
| **Representació múltiple** | Esquema de connexions, **simulació Wokwi** (semàfor), codi comentat. |
| **Implicació** | Cada alumne/a tria estats i colors del seu panell i quin repte amplia. |

> ♿ **Accessibilitat (daltonisme):** el semàfor i el LED RGB es basen en el **color**. Afegeix una **pista no cromàtica**: posició fixa dels LED (a dalt/al mig/a baix), una etiqueta, o un **patró de parpelleig** diferent per estat. Així el sistema és llegible també per a l'alumnat amb daltonisme.

## Treball individual i cooperació entre iguals

El treball és **individual** ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)): cada alumne/a munta el seu circuit, escriu el seu codi i defensa el seu panell. La cooperació s'evidencia (CA5.3 → **R5**) en:

- la **revisió creuada de codi** abans de tancar el panell: cadascú llegeix el codi d'un company i li retorna **una millora concreta i un dubte**;
- la **línia d'ajuda del quadern** («qui m'ha ajudat / a qui he ajudat i com»);
- la **depuració a dues veus** i les posades en comú.

> 👥 **Aparellament puntual** (material que falla, una absència): separa només **qui escriu** i **qui verifica**, i intercanvia'ls a mitja sessió; cadascú documenta el seu quadern.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **patrons i algorisme** (la seqüència de fases) i **abstracció** (encapsular fases en funcions).
- **Depuració:** rutina **DEPURA** (a la fitxa) + taula d'errors freqüents de més amunt.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) sobre 3 criteris clau.
- **Revisió creuada de codi** "2 estrelles i un desig": cadascú llegeix el panell d'un company i li retorna una millora concreta i un dubte.
- **Exit ticket** de tancament; recull-lo per ajustar la sessió següent.
- **Mini-check individual** (10', **inici de la S3, substitueix l'activació**, no qualifica): escriure de memòria un Blink complet al pin 8. Detecta qui encara no programa sol (*efecte passatger*). Enunciat, semàfor de correcció i accions: [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Context real i ODS

- **Context:** senyalització urbana i industrial; eficiència lumínica.
- **ODS 11** (ciutats sostenibles) i **ODS 7** (energia neta: LED vs bombeta).
