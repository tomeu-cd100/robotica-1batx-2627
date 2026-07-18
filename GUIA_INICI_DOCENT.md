# Guia d'inici per al docent — comença des del primer dia

> Per a un professor/a que **agafa aquest material per primera vegada**. Cobreix el que la programació didàctica i les guies de SA **no** expliquen: com **engegar l'entorn**, quin **nivell mínim** necessites i què fer **quan alguna cosa falla a l'aula**.
>
> El "com fer cada classe" minut a minut ja és a `Classes/SAx/SAx_guia_docent.md`. Aquesta guia és el pas **abans** d'obrir aquelles.

---

## 0 · Mapa ràpid: on és cada cosa

> 🌐 **Tot aquest material també és un web navegable:** <https://tomeu-cd100.github.io/robotica-1batx-2627/>. Té **dues vistes**: per defecte s'obre la **vista Alumnat** (sense material docent); activa la **vista Docent** amb el botó de dalt a la dreta (es recorda). És la manera més còmoda de consultar-ho a classe i el que enllaçaràs al Classroom.

| Necessites… | Vés a… |
|---|---|
| **És el teu primer any? Què és nucli i què pot esperar** | `Classes/00_General/00_Mode_supervivencia.md` (les 3 rutines no negociables + ordre d'adopció de la resta) |
| **Els tres robots del curs** (fil conductor: què es construeix cada trimestre, quan es fabrica, què cal comprar) | `Classes/00_General/00_Fil_conductor_robots.md` (+ dossiers `00_Projecte_T1_Mascota.md`, `00_Projecte_T2_Brac.md`, `00_Projecte_T3_Rover.md`) |
| Visió de conjunt i decisions del curs | `Programació didàctica/00_Index_general.md` |
| Com donar **una sessió concreta** | `Classes/SAx/SAx_guia_docent.md` (fases, temps, errors freqüents) |
| Recordatori d'una cara per SA (docent i alumnat) | `Classes/SAx/SAx_checklist_docent.md` · `SAx_checklist_alumnat.md` |
| El que reparteixes a l'alumnat | `Classes/SAx/SAx_fitxa_alumnat.md` |
| El **quadern tècnic** de l'alumnat (guia + **PDF imprimible per trimestre**) | `Classes/00_General/00_Quadern_tecnic.md` (PDFs a `Classes/00_General/pdf/`; tasca de Classroom a punt: `00_Quadern_tecnic_tasca_classroom.md`) |
| El **codi** carregable | `Classes/SAx/codi/` |
| Connexions del circuit | `Classes/SAx/SAx_esquemes_connexions.md` |
| Provar **sense maquinari** | `Simulacions/Wokwi/` (enllaços públics) |
| Reptes per triar | `Reptes/` (+ `Reptes/Solucionari/`) |
| Avaluar | `Avaluació/` (proves per trimestre) + `Programació didàctica/07_Rubriques.md` |
| Vocabulari i bases de programació | `Classes/SA0/` |
| Disseny d'objectes (producte) | `Classes/00_General/00_Banc_objectes_disseny.md`, `00_Plantilla_disseny_objecte.md`, `00_Mapa_SA_objectes.md`, `00_Galeria_exemples_objectes.md` |
| Rutines d'aula (projectar) | `Classes/00_General/00_Poster_aula_metode_DEPURA_rols.md` |

---

## 1 · Abans de la primera classe — engegada tècnica

### 1.1. Tria la teva via de programació (i prova-la!)

> ⚠️ **L'aula real treballa amb Chromebooks.** L'alumnat programarà l'Arduino amb el **Web Editor** (`create.arduino.cc/editor`) des del Chromebook — **no** amb l'IDE d'escriptori. Prepara **primer** la via A (la de l'alumnat) i després la B (la teva màquina i el pla B).

**Via A — Chromebook + Arduino Web Editor (la de l'alumnat, ≈ 30 min):**
1. Llegeix la guia pas a pas: [`Classes/SA0/SA0_guia_web_editor_chromebook.md`](Classes/SA0/SA0_guia_web_editor_chromebook.md) (posada en marxa, flux de treball i problemes freqüents).
2. **Prova el flux amb un Chromebook real del centre**: inici de sessió al compte Arduino, app/connector instal·lat (o demana a l'administrador que el desplegui), placa connectada, **Blink** carregat.
3. Verifica que la **xarxa del centre** no bloqueja `create.arduino.cc` ni els permisos USB del navegador. Si res d'això falla el primer dia, el pla B és el simulador (Tinkercad/Wokwi).

**Via B — Arduino IDE d'escriptori (per a la teva màquina i com a pla B, ≈ 30 min):**
1. Descarrega l'**Arduino IDE** de [arduino.cc/en/software](https://www.arduino.cc/en/software) i instal·la'l.
2. **Driver CH340 (important amb plaques clòniques/econòmiques):** molts UNO no oficials porten el xip **CH340**; a Windows sovint cal instal·lar-ne el driver perquè aparegui el port. Cerca "driver CH340" del fabricant del teu kit. (Les plaques oficials no ho necessiten.)
3. Connecta una placa amb un **cable USB de dades** (no de només càrrega) i selecciona **Eines → Placa → Arduino UNO** i **Eines → Port → (el que aparegui)**.
4. **Càrrega de prova:** `Fitxer → Exemples → 01.Basics → Blink` i prem **Puja (→)**. Si el LED "L" parpelleja, l'entorn funciona.

> Els conceptes i el codi són **idèntics** a totes dues vies; només canvia l'eina. La plataforma és **mixta**: web editor a l'aula, IDE on convingui.

### 1.2. Comptes i editors en línia (≈ 20 min)
| Eina | Per a què | Compte? |
|---|---|---|
| **Arduino Web Editor** (create.arduino.cc/editor) | Programar l'Arduino des del **Chromebook** (via A de l'aula) | **Sí** (compte Arduino; segueix el criteri del centre) |
| **Tinkercad Circuits** (tinkercad.com) | Simular Arduino/circuits; **Classes** per a l'alumnat | Sí (docent); l'alumnat pot entrar amb codi de classe sense correu |
| **Wokwi** (wokwi.com) | Simular Arduino/ESP32; tens els projectes del curs ja fets | Recomanat (Google/GitHub) |
| **Editor Python micro:bit** (python.microbit.org) | MicroPython; flasheig per WebUSB | No cal |
| **Thonny** (thonny.org) | MicroPython d'escriptori (alternativa) | No |
| **MakeCode** (makecode.microbit.org) | Blocs → Python (bastida SA5) | No |

> Els circuits del curs ja estan muntats a Wokwi: vegeu `Simulacions/Wokwi/README.md` i `Simulacions/Wokwi/Reptes/README.md`. Pots projectar-los directament.

### 1.3. Prepara el material físic
- Revisa l'inventari de `Programació didàctica/09_Materials_recursos_per_unitat.md`.
- **Etiqueta una caixa per grup** amb un checklist de contingut (LED, resistències, cables, placa, USB…).
- Prepara un **kit de reserva** per a avaries.
- Comprova que tens **prou cables USB de dades** i preses de corrent als llocs de treball.

### 1.4. Checklist de la primera setmana
- [ ] **Via A provada amb un Chromebook real:** compte Arduino, app/connector del Web Editor, **Blink** carregat des del navegador; xarxa del centre verificada.
- [ ] Via B a la teva màquina: Arduino IDE instal·lat i **Blink** carregat en una placa de prova.
- [ ] Driver CH340 instal·lat si cal (el port apareix).
- [ ] Compte de Tinkercad (i classe creada) + accés a Wokwi.
- [ ] Editor Python de micro:bit provat (flasheig d'un `display.scroll("Hola")`).
- [ ] Kits comptats, etiquetats i amb kit de reserva.
- [ ] Llegida la **guia docent de SA1** i preparada la **prova diagnòstica** (`Classes/SA1/SA1_prova_diagnostica.md`).
- [ ] Rúbriques **R4/R5** a punt per compartir amb l'alumnat (es comparteixen *abans* de començar).
- [ ] Projectat el **pòster d'aula** (`Classes/00_General/00_Poster_aula_metode_DEPURA_rols.md`).
- [ ] Repartida/enllaçada la guia **«Com s'avalua la matèria»** (`Classes/00_General/00_Avaluacio_per_alumnat.md`).
- [ ] **Impresos els quaderns tècnics** del trimestre, un per alumne i **a doble cara** (`Classes/00_General/pdf/Quadern_tecnic_T1.pdf`).
- [ ] Creada la **tasca del quadern tècnic** a Classroom (text i rúbrica a punt d'enganxar: `Classes/00_General/00_Quadern_tecnic_tasca_classroom.md`).
- [ ] Enllaçat el **web del material** al Classroom (l'alumnat hi veu la seva vista per defecte).

---

## 2 · Quin nivell necessites tu (i autoformació exprés)

No cal ser enginyer/a, però sí tenir aquesta base. Si algun punt et balla, dedica-hi un parell d'hores **abans** d'arribar-hi a classe.

### 2.1. Nivell mínim del docent ("hauria de poder…")
- **Arduino/C++:** entendre `setup()`/`loop()`, `pinMode`, `digitalWrite`/`digitalRead`, `analogRead` (0–1023) i `analogWrite`/PWM (0–255), `if`/`for`, variables i **funcions**.
- **Electrònica:** muntar un LED amb resistència (polaritat), un divisor de tensió (LDR/NTC), i les regles de seguretat (massa comuna, no alimentar motors des del 5V).
- **MicroPython (micro:bit):** sintaxi bàsica, **indentació**, `while True`, sensors integrats i `radio`.
- **Robòtica mòbil:** idea de **cinemàtica diferencial** (girar = rodes a velocitats diferents).

### 2.2. Ruta exprés d'autoformació (un cap de setmana)
| Pas | Què fer | On |
|---|---|---|
| 1 | Llegeix la guia de programació de base | `Classes/SA0/SA0_guia_programacio.md` |
| 2 | Fes tu mateix/a **Blink** i el semàfor (SA1–SA2) | Placa real o `Simulacions/Wokwi/` |
| 3 | Munta i prova un sensor (LDR i ultrasons, SA3) | `Classes/SA3/codi/` o Wokwi |
| 4 | Prova un programa de micro:bit | python.microbit.org (`Classes/SA5/codi/`) |
| 5 | Repassa criteris i rúbriques | `Programació didàctica/06`, `07` |
| 6 | Amplia amb 1–2 recursos | `Recursos/Recursos_Professorat_Robotica_1Batx.xlsx` |

> Fer **tu** les pràctiques de SA1–SA3 abans de començar és la millor preparació: són la base de tota la resta.

### 2.3. Autodiagnòstic docent (marca el que ja domines)
- [ ] Sé carregar un sketch a l'Arduino i seleccionar placa/port.
- [ ] Sé què fa cada línia del `Blink` i del semàfor.
- [ ] Sé llegir un sensor analògic i usar `map()`.
- [ ] Sé flashejar un programa a la micro:bit.
- [ ] Sé explicar la diferència digital/analògic i PWM.

> Si en marques 4/5, pots començar. La resta s'aprèn fent, **amb** l'alumnat (l'error és contingut, no fracàs).

---

## 3 · Quan alguna cosa falla a l'aula (pla B i FAQ)

### 3.1. Estratègia general de pla B
- **Falten plaques o no funcionen:** treballa amb els **simuladors** (Wokwi/Tinkercad) i en **parelles**; projecta la simulació i fes-la en directe.
- **Una part de la classe s'encalla:** atura i fes una **mini-demo projectada** del pas conflictiu.
- **Ritmes diferents:** qui acaba, passa a les **ampliacions** (reptes ⭐); qui va just, fa el **mínim** amb la bastida (vegeu cada guia docent, secció "Atenció a la diversitat").

### 3.2. FAQ d'incidències tècniques
| Símptoma | Causa probable | Acció ràpida |
|---|---|---|
| No apareix el **port** | Falta driver CH340 / cable de només càrrega | Instal·lar CH340; provar un cable de **dades** i un altre USB |
| "avrdude: ...access denied / port busy" en pujar | Monitor sèrie obert o port equivocat | Tancar el Monitor; revisar Eines → Port/Placa |
| El **LED intern** no parpelleja | Placa/port mal seleccionats | `Exemples → Blink`; revisar Eines → Placa: UNO |
| El **LED extern** no s'encén | Polaritat, sense resistència o sense `pinMode OUTPUT` | Pota llarga (+) cap a la sortida; 220 Ω; revisar `setup()` |
| `analogWrite` no regula | Pin sense PWM | Usar pin amb `~` (3,5,6,9,10,11) |
| La **micro:bit** no apareix com a disc | Cable de només càrrega / firmware | Cable de **dades**; provar WebUSB o arrossegar el `.hex` |
| `IndentationError` (micro:bit) | Indentació incorrecta | 4 espais coherents; no barrejar tabs i espais |
| El **servo** vibra / no arriba | Alimentació insuficient | Alimentació externa de 5 V + **massa comuna** |
| El **motor** no gira | `ENA` sense PWM o massa no comuna | Activar `ENA`; unir GND Arduino–driver–piles |
| La **ràdio** micro:bit no rep | `group` diferent | Mateix `radio.config(group=...)` i `radio.on()` a les dues plaques |

> Cada SA té, a més, la seva pròpia taula d'**errors freqüents** al final de la guia docent.

---

## 4 · La primera sessió (resum ultra-ràpid)
1. Obre `Classes/SA1/SA1_guia_docent.md` (Sessió 1) i `SA1_fitxa_alumnat.md`.
2. Pregunta d'activació: *"Quins robots tens a casa sense saber-ho?"*
3. Presenta **entrada → procés → sortida** i el **mètode de projecte** (projecta el pòster).
4. Passa la **prova diagnòstica** (no qualifica; serveix per fer parelles heterogènies).
5. Comparteix les **rúbriques** i reparteix el **quadern tècnic imprès** del trimestre (guia: `Classes/00_General/00_Quadern_tecnic.md`; tasca de Classroom a punt a `00_Quadern_tecnic_tasca_classroom.md`).

> A partir d'aquí, segueix la guia docent de cada SA: està pensada perquè la puguis seguir sessió a sessió.

---

*Aquesta guia complementa el `README.md` (visió i estructura) i la `Programació didàctica/` (el perquè didàctic). Material sota llicència CC BY-SA 4.0.*
