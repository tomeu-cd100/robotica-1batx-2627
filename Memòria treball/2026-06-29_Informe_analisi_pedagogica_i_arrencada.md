# Informe d'anàlisi pedagògica i guia d'arrencada docent

**Data:** 2026-06-29 · **Matèria:** Robòtica · 1r de Batxillerat (curs 2026-2027)
**Abast:** anàlisi del material del repositori + recomanacions de millora + guia per a un docent que comença sense base + pla d'edicions proposat.

> Document de doble ús: (1) **diagnòstic de qualitat** del material per a qui el vol polir, i (2) **manual d'arrencada** per a un docent que agafa la matèria sense saber-ne. Complementa —no duplica— `GUIA_INICI_DOCENT.md` i la `Programació didàctica/`.

---

## 1. Resum executiu

El material és de **qualitat alta i poc habitual** en una optativa de batxillerat: completa el cicle sencer (normativa → programació didàctica → material d'aula → codi → simulació → avaluació) amb una **coherència interna notable** i traçabilitat explícita entre instruments, criteris d'avaluació i rúbriques. Ja ha rebut una ronda de millores pedagògiques aplicada a totes les SA (DUA, avaluació formativa, pensament computacional + rutina DEPURA, rols cooperatius i ODS), de manera que **la base didàctica està resolta**.

**Punts forts (4):**
1. Mètode de projecte com a fil conductor + **PRIMM** per llegir codi + **quadern tècnic** com a eix d'avaluació contínua.
2. **Traçabilitat** instrument → criteri (CA) → rúbrica (R) a cada SA i a cada prova.
3. **Seqüenciació realista** (70 h amb marge de ~4 h) i avaluació pràctica **integrada sense hores extra**.
4. **Pla B i FAQ tècnic** + multinivell (mínim/ampliat) + simuladors + solucionari: el curs és viable encara que falli el maquinari.

**Buits prioritaris (4):**
1. **Representació visual dels circuits**: els esquemes són ASCII/taules, cosa que xoca amb el propi principi DUA de representació múltiple.
2. **Accessibilitat per a daltònics**: molta dependència del color (semàfors, RGB, LEDs verd/vermell) sense pista alternativa.
3. **Eines de gestió per al docent**: falta una plantilla de qualificació per competències i una guia de compra/pressupost del maquinari.
4. **Coeducació i ètica de dades/IA concretes**: principis presents però poc materialitzats dins les SA.

Valoració global: **material publicable i directament usable**; les millores són d'acabat i d'equitat, no estructurals.

---

## 2. Fortaleses (què NO s'ha de tocar)

| Fortalesa | Per què és valuosa |
|---|---|
| **Completesa end-to-end** | Des del Decret 171/2022 fins al `.ino` carregable i la simulació Wokwi. El docent no ha de fabricar material intermedi. |
| **Coherència i traçabilitat** | Cada SA té un "mapa d'avaluació" que lliga producte → CA → rúbrica → si qualifica. Facilita justificar notes davant famílies/inspecció. |
| **Mètode de projecte + PRIMM + quadern tècnic** | Tres bastides metodològiques que es repeteixen tot el curs; l'alumnat interioritza una forma de treballar, no activitats soltes. |
| **Seqüenciació realista** | 66 h de SA + 4 h de marge, amb les proves pràctiques **dins** de la darrera sessió de cada trimestre (no afegeixen hores). Molt poc habitual i molt encertat. |
| **Multinivell + simuladors + solucionari** | Cada repte té versió **mínim/ampliat**, Wokwi per treballar sense maquinari i solucionari docent. Cobreix diversitat i pla B alhora. |
| **Pla B i FAQ tècnic** (`GUIA_INICI_DOCENT.md` §3) | Taula símptoma → causa → acció: el que més tranquil·litza un docent novell. |
| **Codi net i defensiu** | `const` per a pins, comentaris **sense accents** (evita problemes de codificació a l'IDE), tractament de casos límit (p. ex. lectura 0 de l'HC-SR04 com a "molt lluny"). |
| **Cultura d'error** | La depuració és contingut (rutina DEPURA), no fracàs. Clau en una matèria on tot falla la primera vegada. |

---

## 3. Anàlisi de millores pedagògiques

Cada punt segueix l'esquema **problema → recomanació → impacte**. Tots són buits *genuïns*: s'han contrastat amb la memòria 2026-06-28 (millores ja aplicades) per no duplicar.

### 3.1. Representació visual dels circuits *(prioritat alta)*
- **Problema:** els `SAx_esquemes_connexions.md` són **taules + art ASCII** (p. ex. `Pin 9~ --[ 220R ]--|>|-- GND`). La programació didàctica proclama el principi DUA de "múltiples formes de representació" i "doble via" (`05_Atencio_a_la_diversitat.md`), però l'única via visual real depèn d'obrir Wokwi (cal internet + projector). Per a alumnat amb dificultats d'abstracció espacial, l'ASCII no substitueix un esquema de muntatge.
- **Recomanació:** afegir una **imatge real del circuit** per SA (export Fritzing estil *breadboard*, o captura neta del muntatge Wokwi) imprimible i projectable sense connexió; com a mínim per a SA1–SA4 (les més bàsiques i on hi ha més alumnat perdut).
- **Impacte:** tanca la incoherència amb el propi DUA; redueix errors de muntatge (la causa nº1 de "no funciona").

### 3.2. Accessibilitat per a daltònics *(prioritat alta, cost baix)*
- **Problema:** activitats molt cromàtiques (semàfor vermell/groc/verd, LED RGB, indicadors LED verd/vermell a les proves). ~1 de cada 12 nois té algun tipus de daltonisme. Un indicador "verd = repòs / vermell = actiu" pot ser indistingible.
- **Recomanació:** afegir **pista no cromàtica redundant** sempre que el color codifiqui informació: posició fixa, etiqueta, nombre de parpellejos o patró. Nota transversal a `05_Atencio_a_la_diversitat.md` i ajust a les fitxes/proves amb indicadors LED.
- **Impacte:** equitat real amb cost mínim; bona pràctica d'enginyeria (no confiar només en el color) que a més és contingut.

### 3.3. Eines de gestió per al docent *(prioritat alta)*
- **Problema:** `06_Avaluacio` recomana ponderar **per competències** dins de cada dimensió, però **no hi ha cap plantilla** que ho operacionalitzi. Igualment, `09_Materials_recursos_per_unitat.md` té l'inventari però **sense costos ni enllaços de compra**: un centre que parteix de zero no sap què pressupostar.
- **Recomanació:** (a) `Avaluació/Full_qualificacio_competencies.md` (o full de càlcul) que creui CA1.1–CA5.3 amb R1–R5 i les dimensions de ponderació (45/25/20/10); (b) `Programació didàctica/09b_Guia_compra_pressupost.md` amb llista, quantitats per a 15 parelles, cost orientatiu i enllaços.
- **Impacte:** estalvia hores al docent i fa la matèria **adoptable** per un centre nou.

### 3.4. Coeducació concreta *(prioritat mitjana)*
- **Problema:** `04_Metodologia.md` §4.6 declara "referents femenins en enginyeria", però **no apareixen embeguts** a les SA (no hi ha cap referent nominal a les guies docents).
- **Recomanació:** caixa "**Referent**" per trimestre a les guies docents de SA1, SA4 i SA7 (p. ex. enginyeres de control, robòtica mòbil, IA), amb 2–3 línies i una pregunta de connexió amb la SA.
- **Impacte:** converteix un principi en pràctica observable; reforça la perspectiva de gènere que la matèria diu tenir.

### 3.5. Ètica de dades i IA a la SA8 *(prioritat mitjana)*
- **Problema:** SA8 (IoT/IA) connecta amb ODS però tracta poc la **privadesa/RGPD** i el **biaix** dels sistemes que recullen dades i "classifiquen" (gestos, telemetria). En el context 2026 és un buit de ciutadania digital.
- **Recomanació:** ampliar `Classes/SA8/SA8_guia_docent.md` i la fitxa amb un mini-debat: qui és propietari de les dades del sensor, què passa si el model s'entrena amb dades esbiaixades, consentiment.
- **Impacte:** dona profunditat a la CA5.3 (impacte ètic/social) i actualitza el contingut a l'estat de l'art.

### 3.6. Avaluació de la *comparació* C++ ↔ MicroPython *(prioritat baixa, matís)*
- **Problema:** la CA1.2 demana "escriure MicroPython **i comparar-lo** amb la solució equivalent en C/C++". La prova T2 ja avalua Python (Part B), però **la comparació explícita** entre paradigmes no s'arriba a demanar enlloc com a evidència.
- **Recomanació:** afegir a la fitxa de SA5 (o a T2) un ítem breu de comparació (p. ex. "el mateix comportament en C++ i en MicroPython: 3 diferències de sintaxi/estructura").
- **Impacte:** tanca l'única CA amb cobertura summativa parcial.

### 3.7. Cobertura desigual de Wokwi *(documentar, no necessàriament ampliar)*
- **Problema:** el pla B descansa molt en Wokwi, però **SA5 (micro:bit) i SA7 (3dBot) no són simulables** i alguns reptes no tenen projecte Wokwi (p. ex. SA4_B ventilador, SA6_C proporcional ampliat). Un docent que confiï cegament en "tot és a Wokwi" es trobarà buits.
- **Recomanació:** a `Simulacions/Wokwi/README.md`, una taula explícita de **cobertura** (què hi ha / què no / quina alternativa per al que falta: simulador de micro:bit, vídeo, demo projectada).
- **Impacte:** evita sorpreses a mig curs; fa el pla B fiable de debò.

### 3.8. Densitat de les fitxes d'alumnat *(prioritat baixa)*
- **Problema:** les fitxes són molt riques però **molt denses en taules** (la de SA1 té diana, coavaluació, exit ticket, PC, ODS, quadern…). Per a alumnat amb dificultats lectores o TDAH pot ser aclaparador en una sola sessió.
- **Recomanació:** marcar visualment **què és per fer a classe** vs. **què és de tancament/casa**, o oferir una versió "essencial" d'una pàgina per a qui ho necessiti.
- **Impacte:** redueix càrrega cognitiva sense perdre el contingut ric.

---

## 4. Guia d'arrencada per a un docent que no en sap res

> La `GUIA_INICI_DOCENT.md` ja cobreix instal·lació, comptes, checklist i FAQ. Aquí s'hi **afegeix** el que un docent novell encara necessita: quant trigarà a estar a punt, què retallar si va just, i com sobreviure a l'aula amb maquinari.

### 4.1. Quant temps necessites realment per estar a punt
| Bloc | Temps realista | Resultat |
|---|---|---|
| Instal·lar entorn + carregar Blink (IDE, driver CH340) | 1 h | Saps que el teu PC i una placa funcionen. |
| Fer **tu** SA1–SA3 (LED, semàfor, sensor, ultrasons) | 4–6 h | Domines E/S digital/analògica i PWM: la base del 60 % del curs. |
| Provar micro:bit (un programa + ràdio) | 1–2 h | Cobreixes el segon paradigma (SA5/SA8). |
| Llegir guia docent + fitxa de la SA de la setmana | 30–45 min/SA | Pots donar la sessió amb seguretat. |

**Regla d'or:** has d'anar **una SA per davant** de l'alumnat havent-la fet tu primer. No cal dominar tot el curs el setembre.

### 4.2. Nivell mínim conceptual (el que has de poder explicar amb les teves paraules)
- **Arduino/C++:** `setup()`/`loop()`, `pinMode`, `digitalWrite`/`digitalRead`, `analogRead` (0–1023), `analogWrite`/PWM (0–255), `if`/`for`, variables i funcions.
- **Electrònica:** LED amb resistència i polaritat, divisor de tensió (LDR/NTC), massa comuna, **no alimentar motors des del 5V de la placa**.
- **MicroPython:** indentació, `while True`, sensors integrats, `radio`.
- **Robòtica mòbil:** cinemàtica diferencial (girar = rodes a velocitats diferents).

Si en domines 4 de 5, ja pots començar: la resta s'aprèn **amb** l'alumnat (l'error és contingut).

### 4.3. Guió de les 3 primeres sessions (què projectes i què passa)
1. **Sessió 1 — "Què és un robot?":** pregunta d'activació ("quins robots tens a casa sense saber-ho?") → model **entrada-procés-sortida** → anàlisi de 3 sistemes en parella → **prova diagnòstica** (no qualifica; serveix per fer parelles heterogènies) → presentar el **mètode de projecte** (pòster). Obre el **quadern tècnic**.
2. **Sessió 2 — placa i seguretat:** anatomia de la UNO sobre esquema mut, **digital vs analògic**, normes de seguretat (es **signen**), tour d'Arduino IDE i Tinkercad.
3. **Sessió 3 — primer programa (PRIMM):** **Prediu** el `Blink` sense executar → **Executa** → **Investiga** línia a línia → **Modifica** temps → **Crea** el repte. Mini-debat ètic + tria del robot del pòster.

> Comparteix les rúbriques **R4 i R5 ABANS** de començar el producte. És avaluació formativa, no sorpresa.

### 4.4. Full "xuleta" d'Arduino (tingues-lo a mà)
```
pinMode(pin, OUTPUT/INPUT/INPUT_PULLUP);
digitalWrite(pin, HIGH/LOW);     // sortida 0/5V
int v = digitalRead(pin);        // entrada 0/1
int a = analogRead(A0);          // 0..1023  (entrada analògica)
analogWrite(pin~, 0..255);       // PWM nomes en pins amb ~ (3,5,6,9,10,11)
delay(ms);                       // pausa bloquejant
map(x, 0,1023, 0,255);           // reescalar rangs
Serial.begin(9600); Serial.println(x);  // depurar pel Monitor Serie
```

### 4.5. "Curs mínim viable" (si vas endarrerit)
La trampa de les 70 h és real (festius, vagues, sortides). Ordre de retallada **sense trencar la progressió**:
1. **No retallis mai SA1–SA3** (fonaments d'E/S) ni SA9 (síntesi).
2. Escurça primer les **4es sessions d'ampliació** de SA2, SA4, SA6 (ja són opcionals per disseny).
3. Si cal més, **SA8 (IoT/IA)** és la més comprimible (de 6 h a 4 h) i la més autònoma.
4. Mantén **una prova pràctica per trimestre** (ja van integrades, no costen hores).

### 4.6. Sobreviure a l'aula amb maquinari
- **Parelles heterogènies** (segons diagnòstica) amb **rols rotatius**: tothom programa, munta i documenta.
- **Caixa per grup etiquetada** amb checklist de contingut + **un kit de reserva** per a avaries.
- **Cable USB de DADES** (no de només càrrega) i prou preses de corrent.
- Quan una part de la classe s'encalla: **atura i fes una mini-demo projectada** del pas conflictiu.
- Davant qualsevol "no funciona": aplica i fes aplicar la **rutina DEPURA** (Descriu, Examina, Prova una hipòtesi, Ubica, Repara, Apunta).

---

## 5. Coses clau a tenir en compte (checklist accionable)

- [ ] **Drivers CH340** instal·lats si les plaques són clòniques (sense això, no apareix el port).
- [ ] **Rúbriques compartides** amb l'alumnat a l'inici de cada SA (transparència = exigència normativa).
- [ ] **Prova diagnòstica** de SA1 feta i usada per formar parelles (no per qualificar).
- [ ] **Quadern tècnic obert el dia 1** i mantingut cada sessió: és el 25 % de la nota i l'eix de l'avaluació contínua.
- [ ] **Marge temporal** vigilat: si al desembre no has acabat SA3, replanteja amb el "curs mínim viable".
- [ ] **Seguretat elèctrica**: muntar amb la placa desconnectada, no curtcircuitar 5V–GND, motors amb alimentació externa i **massa comuna**.
- [ ] **Dependència d'internet/Wokwi**: tingues un pla B local (vídeo o demo) per a SA5 i SA7, que no es simulen.
- [ ] **Cultura d'error explícita**: celebra la depuració; un error documentat al quadern val nota (R5).
- [ ] **Coavaluació i exit tickets** recollits per ajustar la sessió següent.
- [ ] **Coordinació** amb Tecnologia i Enginyeria I, Matemàtiques i Física (sabers compartits; la SA9 pot llavorar un TR).

---

## 6. Pla d'edicions proposat

Materialització de l'apartat 3. **No s'ha editat res encara**; aquesta és la proposta d'execució.

| Prioritat | Millora | Fitxers a crear/editar |
|---|---|---|
| **Alta** | Imatges reals de circuit | `Classes/SAx/img/` + enllaç dins cada `SAx_esquemes_connexions.md` (mínim SA1–SA4); o `Classes/00_Guia_imatges_circuits.md` |
| **Alta** | Pistes no cromàtiques (daltònics) | Nota transversal a `Programació didàctica/05_Atencio_a_la_diversitat.md` + ajust a fitxes/proves amb LEDs de color |
| **Alta** | Plantilla de qualificació per competències | Nou `Avaluació/Full_qualificacio_competencies.md` (CA1.1–CA5.3 × R1–R5 × ponderació 45/25/20/10) |
| **Mitjana** | Guia de compra/pressupost | Nou `Programació didàctica/09b_Guia_compra_pressupost.md` (derivat de `09_Materials_recursos_per_unitat.md`) |
| **Mitjana** | Referents femenins | Caixa "Referent" a `Classes/SA1`, `SA4`, `SA7` (guies docents) |
| **Mitjana** | Ètica de dades/IA | Ampliar `Classes/SA8/SA8_guia_docent.md` i fitxa (RGPD, biaix, consentiment) |
| **Mitjana** | Cobertura Wokwi explícita | Taula de cobertura/pla B a `Simulacions/Wokwi/README.md` |
| **Baixa** | Comparació C++↔MicroPython | Ítem a la fitxa de SA5 o a `Avaluació/Prova_practica_T2.md` |
| **Baixa** | Fitxes alleugerides | Marcar "a classe / a casa" o versió essencial d'1 pàgina a les fitxes denses |

---

## 7. Conclusió

El material **no necessita reformes estructurals**: la didàctica, la seqüenciació i l'avaluació són sòlides i ja iterades. Les millores recomanades són d'**equitat** (daltònics, densitat, representació visual), d'**adoptabilitat** (plantilla de notes, pressupost) i d'**actualització** (ètica de dades/IA, referents). Per a un docent que comença sense base, el camí és: fer tu mateix SA1–SA3, anar una SA per davant, compartir rúbriques abans, obrir el quadern el dia 1 i tractar l'error com a contingut. Amb això, el curs és perfectament assumible amb la guia que ja existeix.

---

*Material i informe sota llicència CC BY-SA 4.0.*
