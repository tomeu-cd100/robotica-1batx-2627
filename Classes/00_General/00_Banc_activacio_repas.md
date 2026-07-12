# 00 · Banc d'activació amb repàs espaiat (graelles de recuperació)

> **Per a qui és?** Per al **docent**. Una **graella de 3 preguntes** per a cada sessió del curs, per fer a la fase d'**Activació** (els primers 5' dels 10' previstos a `Programació didàctica/04_Metodologia.md` §4.2). **No qualifica mai.**

## Per què (en 5 línies)

Amb 2 h setmanals, el que es va aprendre a l'octubre arriba esborrat al febrer si no es **recupera activament**. Dues de les intervencions amb més evidència en aprenentatge són l'**efecte test** (recordar consolida més que rellegir) i l'**espaiat** (recordar-ho *temps després* consolida més que just després). Aquesta graella les combina: cada sessió comença recuperant **una mica d'ahir, una mica de fa setmanes i una mica de fa mesos**.

## Com s'usa (rutina de 5 minuts)

1. **Projecta les 3 preguntes** de la sessió (bloc citat de sota; les respostes són a la línia en cursiva següent — no la projectis).
2. **Tothom escriu** la resposta (quadern tècnic o mini-pissarra), **individualment i sense mirar apunts**. Que respongui tothom és el que fa treballar la memòria: evita el "mans alçades" on responen sempre els mateixos.
3. **Correcció oral ràpida** (1-2'): demana respostes a l'atzar, confirma la bona i digues per què.
4. **No es recull ni qualifica.** Si una pregunta falla massivament, és un **senyal de diagnòstic**: anota-la i reprèn el concepte (o deriva a la secció de `SA0/` corresponent).

**Codi de les 3 preguntes:**

| # | D'on ve | Interval |
|---|---|---|
| **P①** | De la **sessió anterior** | ~1 setmana |
| **P②** | D'una **SA anterior** | ~3-6 setmanes |
| **P③** | De **fons d'armari** (trimestre anterior o SA0/SA1) | ~2-6 mesos |

> Les primeres sessions del curs encara no tenen "fons d'armari": SA1 té graelles de 2 preguntes i al 1r trimestre la P③ tira de SA0/SA1. La **SA1-S1** no té graella (no hi ha res a recuperar): s'hi fa la prova diagnòstica.
>
> **Pots substituir qualsevol pregunta** per una d'equivalent (o per un error real que hagi sortit a la classe anterior — encara millor). El que no és negociable és la mecànica: **recordar sense apunts, tothom, cada sessió**.

---

## SA1 · Introducció (graelles reduïdes)

### SA1 · Sessió 2 — abans d'«Arquitectura i seguretat»
> **P①** Dibuixa les 3 caixes del model d'un sistema automàtic i posa-hi els noms. On aniria el sensor de nivell d'aigua d'una rentadora?
> **P②** Digues un "robot invisible" de casa teva i identifica'n **una entrada** i **una sortida**.

*Respostes: ① ENTRADA (sensor) → PROCÉS (cervell) → SORTIDA (actuador); el sensor de nivell és una **entrada**. ② p. ex. termòstat: entrada = temperatura; sortida = caldera.*

### SA1 · Sessió 3 — abans d'«El primer programa»
> **P①** Als pins de l'Arduino: què vol dir el símbol `~`? I què són A0–A5?
> **P②** Una magnitud **digital** pot tenir quants valors? I una d'**analògica**? Posa un exemple de cadascuna.

*Respostes: ① `~` = pins amb PWM; A0–A5 = entrades analògiques. ② digital: 2 estats (0/5 V, p. ex. polsador); analògica: valors continus (p. ex. temperatura, llum).*

---

## SA2 · Sortides digitals i PWM

### SA2 · Sessió 1 — abans de «Variables i la primera sortida»
> **P①** `setup()` i `loop()`: quantes vegades s'executa cadascuna?
> **P②** `delay(500)`: quant temps és, i en quines unitats treballa `delay()`?
> **P③** Abans de tocar cap cable del circuit, quina norma de seguretat s'aplica sempre?

*Respostes: ① `setup()` un sol cop en engegar; `loop()` es repeteix per sempre. ② mig segon; mil·lisegons. ③ muntar/modificar amb la placa **desconnectada** (i mai curtcircuitar 5 V–GND).*

### SA2 · Sessió 2 — abans d'«Estructures de control: el semàfor»
> **P①** Per què és millor `const int LED = 9;` que escriure `9` pertot arreu del codi?
> **P②** Un LED té polaritat? Com el connectes perquè no es cremi?
> **P③** Del model entrada–procés–sortida: el LED del semàfor, què és? I la lògica que decideix quan canvia de fase?

*Respostes: ① si canvies de pin només toques una línia; el codi es llegeix millor (nom amb significat). ② sí: pota llarga (+) cap a la sortida, i sempre amb resistència (220 Ω). ③ el LED és **sortida** (actuador); la lògica és el **procés**.*

### SA2 · Sessió 3 — abans de «PWM: intensitat i color»
> **P①** Escriu la seqüència de fases d'un semàfor (colors i què fa el codi entre fase i fase).
> **P②** Prediu: si a `blink.ino` canvio `delay(1000)` per `delay(100)`, què veuré?
> **P③** Quins pins de la placa admeten PWM i com els reconeixes?

*Respostes: ① verd → groc → vermell, amb `digitalWrite` + `delay` entre fases. ② parpelleig 10 cops més ràpid (gairebé imperceptible). ③ els marcats amb `~` (3, 5, 6, 9, 10, 11).*

### SA2 · Sessió 4 — abans del «Producte: panell de senyalització»
> **P①** `analogWrite(9, 128)`: què fa exactament? Quin rang de valors accepta?
> **P②** Diferència entre `digitalWrite(9, HIGH)` i `analogWrite(9, 255)`.
> **P③** Un company diu: "el meu LED no s'encén i el codi compila". Digues **dues** causes probables de maquinari.

*Respostes: ① treu PWM al pin 9 a mitja intensitat; 0–255. ② efecte semblant al màxim, però `analogWrite` permet graduar (PWM) i `digitalWrite` només tot/res. ③ polaritat invertida; falta resistència/mal contacte a la protoboard (també: pin equivocat).*

---

## SA3 · Entrades i sensors

### SA3 · Sessió 1 — abans d'«Entrades digitals i monitor sèrie»
> **P①** Per fer un LED que "respira" (puja i baixa d'intensitat), quina funció fas servir i en quin tipus de pin?
> **P②** El LED RGB: com fas el color groc? (pensa en els 3 canals)
> **P③** `setup()` i `loop()`: què hi va a cadascuna? Posa un exemple de línia típica de cada bloc.

*Respostes: ① `analogWrite` en un pin `~`. ② vermell + verd al màxim, blau a 0. ③ a `setup()` la configuració (`pinMode`, `Serial.begin`); a `loop()` l'acció repetida (`digitalWrite`, lectures…).*

### SA3 · Sessió 2 — abans d'«Entrades analògiques»
> **P①** Amb `INPUT_PULLUP`, què llegeix el pin en repòs i què llegeix en prémer el polsador?
> **P②** Per què cal l'antirebot (*debounce*)? Què passaria sense?
> **P③** Quin rang de valors retorna `analogRead(A0)`? I quin accepta `analogWrite`?

*Respostes: ① repòs = HIGH; premut = LOW. ② el contacte mecànic "rebota" i genera múltiples lectures en una sola premuda (un toggle canviaria diverses vegades). ③ 0–1023 (ADC 10 bits); 0–255 (PWM 8 bits). **Són rangs diferents!***

### SA3 · Sessió 3 — abans de «Sensor de distància i funcions»
> **P①** Quina funció converteix una lectura 0–1023 en un valor 0–255? Escriu la crida sencera.
> **P②** El "llum automàtic": el LED s'encén quan la lectura de la LDR és *més gran* o *més petita* que el llindar? Per què?
> **P③** Per a què serveix el Monitor sèrie? Quines dues línies de codi necessites per usar-lo?

*Respostes: ① `map(x, 0, 1023, 0, 255)`. ② més petita (menys llum = lectura més baixa, amb el divisor del material del curs); l'important és que ho justifiquin mirant valors reals. ③ veure què llegeix la placa per depurar/calibrar; `Serial.begin(9600)` i `Serial.println(x)`.*

### SA3 · Sessió 4 — dia de la **prova T1** *(graella opcional: només com a escalfament de 3' abans de repartir la prova; el producte es va tancar a la S3)*
> **P①** Completa: distància (cm) = temps · ______ / 2. Per què es divideix entre 2?
> **P②** Què vol dir que una funció **retorna** un valor? Què retorna `mesuraDistancia()`?
> **P③** (fons d'armari, SA1) El sistema alarma d'aparcament sencer: identifica'n entrada, procés i sortida.

*Respostes: ① 0,034 (velocitat del so en cm/µs); el so fa anada **i** tornada. ② que en cridar-la obtens un resultat per usar (`float d = mesuraDistancia();`); retorna la distància en cm. ③ entrada = HC-SR04; procés = comparar amb llindars; sortida = LED + piezo.*

---

## SA4 · Moviment: servos, motors i ponts H

### SA4 · Sessió 1 — abans d'«El servomotor»
> **P①** Per què el codi de l'alarma quedava millor amb una funció `mesuraDistancia()` que amb tot el codi dins `loop()`?
> **P②** (SA2) `analogWrite(pin, 64)` vs `analogWrite(pin, 192)`: què canvia al LED?
> **P③** (SA1) Norma de seguretat: què **no** s'ha de connectar mai directament entre si a la placa?

*Respostes: ① encapsula els detalls, es reutilitza i el `loop()` es llegeix com una història (abstracció). ② la intensitat: 64 fluix, 192 fort (PWM). ③ 5 V amb GND (curtcircuit).*

### SA4 · Sessió 2 — abans de «Motor DC i pont H»
> **P①** Quines dues línies necessites per començar a fer servir un servo? Quin rang de moviment té?
> **P②** (SA3) Un polsador amb `INPUT_PULLUP`: quan val LOW?
> **P③** (SA2) Prediu: `for (int i = 0; i <= 180; i++) { servo.write(i); delay(15); }` — què fa el servo?

*Respostes: ① `#include <Servo.h>` i `servo.attach(pin)`; 0–180°. ② quan està premut. ③ escombrada suau de 0° a 180° (un pas cada 15 ms).*

### SA4 · Sessió 3 — abans de «Del sensor al moviment»
> **P①** Per què un motor DC **no** es pot alimentar des del pin de 5 V de la placa? Què fem servir en comptes d'això?
> **P②** Què aconsegueix el pont H que no aconsegueix un transistor sol?
> **P③** (SA3) Vols que el motor giri més ràpid com més fosc sigui. Quines dues funcions de lectura/conversió encadenaràs?

*Respostes: ① consumeix més corrent del que la placa pot donar (risc de reinici/dany); alimentació externa amb **massa comuna**. ② invertir el sentit de gir (inverteix la polaritat). ③ `analogRead` (0–1023) + `map` cap a 0–255 per a `analogWrite`.*

### SA4 · Sessió 4 — abans del «Producte: barrera automàtica»
> **P①** Al codi del sensor de velocitat/moviment: per què filtrem o posem llindar a les lectures abans d'actuar?
> **P②** (SA2) El semàfor feia les fases amb `delay()`. Quin problema tindria si a més hagués de llegir un polsador contínuament?
> **P③** (SA1) `setup()` s'executa cada vegada que el `loop()` es repeteix: cert o fals? Justifica.

*Respostes: ① les lectures reals tenen soroll; sense llindar/filtre el sistema actua per error. ② `delay()` **bloqueja**: mentre espera no llegeix res (motivació de `millis()`, que es veu avui amb `05_dos_leds_millis`). ③ fals: només un cop en engegar/reiniciar.*

---

## SA5 · micro:bit i MicroPython

### SA5 · Sessió 1 — abans de «Primers passos amb MicroPython»
> **P①** `millis()` vs `delay()`: quina de les dues deixa el programa "lliure" per fer altres coses mentre espera, i per què?
> **P②** (SA3) Rang d'`analogRead` i rang d'`analogWrite` a Arduino (els dos números).
> **P③** (SA1) En C/C++, com sap el compilador on comença i acaba un bloc (un `if`, una funció)?

*Respostes: ① `millis()`: no atura el programa, compares temps transcorregut; `delay()` bloqueja. ② 0–1023 i 0–255. ③ per les claus `{ }` — avui veurem que Python ho fa amb la **indentació**.*

### SA5 · Sessió 2 — abans de «Sensors integrats»
> **P①** En Python, què passa si una línia dins del `while True:` no està ben indentada? Com es diu l'error?
> **P②** Escriu l'equivalent Python del `loop()` d'Arduino.
> **P③** (SA4) Quin rang d'angles accepta un servo i amb quina crida el mous en Arduino?

*Respostes: ① no forma part del bloc o peta: `IndentationError` (la indentació és sintaxi). ② `while True:` amb el cos indentat. ③ 0–180°, `servo.write(angle)`.*

### SA5 · Sessió 3 — abans de «Ràdio i comparació de paradigmes»
> **P①** El comptapassos comptava de més. Quin era el problema i com es va arreglar? (pista: també passava amb els polsadors d'Arduino)
> **P②** (SA3) Com es diu aquesta mateixa tècnica quan la vam fer amb un polsador a Arduino?
> **P③** (SA2) Digues **dues** diferències de sintaxi entre C++ i Python que ja hagis trobat.

*Respostes: ① una sacsejada dispara moltes deteccions seguides; s'afegeix una pausa/llindar després de detectar. ② antirebot (*debounce*). ③ p. ex.: `;` i `{}` a C++ vs res i indentació a Python; `void setup()` vs `def`/cos directe; tipus explícits (`int`) vs sense declarar.*

---

## SA6 · Sistemes de control

### SA6 · Sessió 1 — abans de «Què és un sistema de control?»
> **P①** Perquè dues micro:bit es comuniquin per ràdio, quina condició de configuració han de complir?
> **P②** (SA5) Una diferència entre C++ i Python que posaries a la taula comparativa (i per què importa).
> **P③** (SA3) El termòstat de casa: entrada, procés i sortida. Què el fa diferent d'un llum amb temporitzador?

*Respostes: ① mateix `group` (i `radio.on()`). ② resposta oberta (indentació vs claus, tipat…). ③ entrada = sensor de temperatura; procés = comparar amb consigna; sortida = caldera. El termòstat **mesura el resultat** de la seva acció (pista del llaç tancat d'avui); el temporitzador no.*

### SA6 · Sessió 2 — abans de «Control tot/res i histèresi»
> **P①** Llaç obert vs llaç tancat: la diferència en una frase, i un exemple de cadascun.
> **P②** (SA4) Per què `delay()` és mala idea en un sistema de control que ha de vigilar un sensor contínuament?
> **P③** (SA3) Amb el LM35/TMP36 llegint per A0: com veuries en directe si la lectura és estable o sorollosa?

*Respostes: ① obert: actua sense mesurar el resultat (torradora); tancat: el sensor realimenta la decisió (termòstat). ② mentre el programa dorm, no mira el sensor (per això `millis()`). ③ Monitor sèrie / Serial Plotter.*

### SA6 · Sessió 3 — abans de «Màquines d'estats»
> **P①** El termòstat d'ahir tenia **dos** llindars en lloc d'un. Com es diu això i quin problema evita?
> **P②** (SA4) `millis()`: explica amb les teves paraules com fas una espera sense aturar el programa.
> **P③** (SA2) El semàfor de la SA2, quants "estats" tenia? Què feia passar d'un a l'altre?

*Respostes: ① histèresi; evita que l'actuador commuti sense parar quan la lectura balla al voltant de la consigna. ② guardes `millis()` en una variable i compares si ha passat prou temps (`if (millis() - inici >= interval)`). ③ 3 (verd/groc/vermell); el pas del temps — avui ho formalitzem com a **màquina d'estats**.*

### SA6 · Sessió 4 — dia de la **prova T2** *(graella opcional: només com a escalfament de 3' abans de repartir la prova; el producte es va tancar a la S3 i el proporcional és +ampliació)*
> **P①** Una màquina d'estats té dues coses: **estats** i **transicions**. Al semàfor adaptatiu, digues 2 estats i 1 transició.
> **P②** (SA5) Prediu aquest MicroPython: `if temperature() > 25:` seguit de `display.show(Image.NO)` indentat — què fa i cada quan?
> **P③** (SA3) El divisor de tensió LDR + 10 kΩ: per què no podem connectar la LDR sola directament a A0?

*Respostes: ① p. ex. estats VERD/VERMELL (o ESPERA/PAS); transició = temps esgotat o polsador de vianant. ② mostra la creu quan passa de 25 °C, a cada volta del `while True`. ③ l'ADC mesura **tensió**, no resistència: cal el divisor perquè el canvi de resistència es converteixi en canvi de tensió.*

---

## SA7 · Robòtica mòbil

### SA7 · Sessió 1 — abans de «Moviment i cinemàtica diferencial»
> **P①** Control proporcional: com es calcula la correcció? Què passa si l'error és zero?
> **P②** (SA6) Histèresi en una frase i un exemple fora del termòstat.
> **P③** (SA4) Per moure un motor DC en els dos sentits necessites un component clau i una norma d'alimentació: quins?

*Respostes: ① correcció proporcional a l'error (sortida = Kp·error); si l'error és 0, no corregeix. ② dos llindars per no commutar contínuament (p. ex. llums automàtics que no parpellegin al capvespre). ③ pont H; alimentació externa amb massa comuna.*

### SA7 · Sessió 2 — abans de «Trajectòries programades»
> **P①** Amb rodes independents: què fan les dues rodes perquè el robot giri sobre si mateix? I per fer una corba suau?
> **P②** (SA6) El robot que va recte i gira és llaç obert o tancat? I el que segueix una línia?
> **P③** (SA2) Els motors van amb `analogWrite(pin, VEL)`. Què representa VEL i entre quins valors es mou?

*Respostes: ① gir sobre si mateix: rodes en sentits oposats; corba: mateixa direcció a velocitats diferents. ② recte+gir per temps = obert (no mesura); seguidor de línia = tancat (el sensor realimenta). ③ la velocitat via PWM, 0–255.*

### SA7 · Sessió 3 — abans d'«Evitar obstacles»
> **P①** El gir de 90° es fa "per temps calibrat". Què vol dir i per què el valor no és el mateix a tots els robots?
> **P②** (SA3) La funció `dist()` del robot torna 400 quan `pulseIn` retorna 0. Per què aquest tractament?
> **P③** (SA1) El robot evita-obstacles complet: entrada, procés, sortida.

*Respostes: ① es prova quant temps triga a girar 90° amb una velocitat fixa i es guarda (T_GIR_90); depèn de bateria, fregament, motors. ② `pulseIn` amb timeout retorna 0 quan no hi ha eco: s'interpreta com a "molt lluny", no com a "distància 0" (cas límit!). ③ ultrasons → decidir (llindar) → motors.*

### SA7 · Sessió 4 — abans de «Seguidor de línia + repte de pista»
> **P①** Comportament reactiu: descriu el cicle que el robot repeteix sense parar.
> **P②** (SA5) Vols aturar el robot des d'una micro:bit a distància. Quin mecanisme usaries i quines dues crides recordes?
> **P③** (SA6) El seguidor de línia farà "zig-zag". Quin concepte de la SA6 suavitzaria el moviment?

*Respostes: ① llegir sensor → decidir → actuar → tornar a llegir (a cada volta del `loop`). ② ràdio: `radio.send("STOP")` / `radio.receive()` (mateix `group`). ③ el control proporcional (correcció segons la desviació, no tot/res).*

---

## SA8 · IoT i IA

### SA8 · Sessió 1 — abans de «Telemetria: el robot que informa»
> **P①** Els sensors IR del seguidor de línia: què detecten exactament, i el comportament era regles fetes a mà o aprenentatge?
> **P②** (SA6) Llaç tancat en una frase (avui l'aplicarem a sistemes que informen a distància).
> **P③** (SA5) Dues micro:bit no es comuniquen. Digues les 2 comprovacions de ràdio abans de tocar res més.

*Respostes: ① el contrast clar/fosc (reflexió IR); regles fetes a mà (`if`s escrits per nosaltres). ② el sensor mesura el resultat i realimenta la decisió. ③ `radio.on()` cridat? mateix `group` a totes dues?*

### SA8 · Sessió 2 — abans d'«IoT: arquitectura, aplicacions i riscos»
> **P①** Què és la telemetria? Quines dues plaques/rols hi havia a la pràctica d'ahir?
> **P②** (SA3) Les dades que transmet la telemetria surten d'un `analogRead` o similar. Per què cal calibrar el sensor abans de refiar-te'n?
> **P③** (SA1) Un sistema IoT (p. ex. estació meteorològica connectada): entrada, procés, sortida… i què hi afegeix el "IoT"?

*Respostes: ① mesurar a distància i transmetre les dades; emissor (mesura i envia) i receptor (rep i mostra). ② la lectura crua no té unitats/pot tenir offset i soroll: cal contrastar-la amb valors coneguts. ③ E-P-S com sempre + **connexió a la xarxa** (les dades viatgen i s'agreguen).*

### SA8 · Sessió 3 — abans d'«Introducció a la IA: de les regles a l'aprenentatge»
> **P①** Digues un risc de privadesa d'un sistema IoT que vam comentar, i una mesura per mitigar-lo.
> **P②** (SA7/SA3) El nostre seguidor de línia i l'alarma d'aparcament decidien amb `if llindar`. Qui havia "escrit" aquestes regles?
> **P③** (SA1, fons d'armari) Al model entrada–procés–sortida, la IA de què substitueix o millora exactament: l'entrada, el procés o la sortida?

*Respostes: ① p. ex. dades de presència/hàbits identificables → minimitzar dades, anonimitzar, demanar consentiment, xifrar. ② nosaltres, a mà — avui veurem models que **dedueixen les regles a partir d'exemples** (ML). ③ el **procés**: la decisió; els sensors i actuadors continuen sent els mateixos.*

---

## SA9 · Projecte final (recuperació integradora)

> A la SA9 la graella serveix per **posar sobre la taula el que el projecte necessitarà aquell dia**. Adapta les preguntes als reptes triats pels equips.

### SA9 · Sessió 1 — Idear
> **P①** (SA8) Regles vs aprenentatge automàtic: quan té sentit cadascun? El vostre repte en necessita algun?
> **P②** (SA1) Les 5 fases del mètode de projecte, en ordre. En quina sou avui i què s'hi produeix?
> **P③** (tot el curs) De tot el que saps fer (E/S, PWM, sensors, servos/motors, micro:bit, control, ràdio), digues les **3 peces** que probablement usarà el teu repte.

*Respostes: ① regles si el problema és senzill i conegut; ML si les regles serien massa complexes (gest, imatge). ② analitzar → dissenyar → prototipar → provar → millorar; avui: analitzar/dissenyar (requisits, esbós, planificació). ③ oberta: serveix per activar l'inventari mental abans de planificar.*

### SA9 · Sessió 2 — Prototipar
> **P①** Què és un prototip mínim viable? Què en queda fora, de moment?
> **P②** (SA4/SA6) Si el vostre sistema ha de fer dues coses "alhora", quina tècnica evita que una bloquegi l'altra?
> **P③** (SA1) Per què muntem amb la placa desconnectada, i què comprovem abans de donar corrent?

*Respostes: ① la versió més petita que demostra la funció principal; les millores i extres, per a les iteracions. ② `millis()` (temporització no bloquejant). ③ evitar curtcircuits; polaritats, 5V/GND ben posats, cap fil solt.*

### SA9 · Sessió 3 — Provar
> **P①** La rutina DEPURA, lletra a lletra. Quina és la més important quan "no funciona i no sé per què"?
> **P②** (SA3) Quina eina et diu què està llegint **de debò** la placa (no què creus tu que llegeix)?
> **P③** (curs) Per què es prova **per parts** (cada mòdul per separat) abans del sistema sencer?

*Respostes: ① Descriu · Examina · Prova una hipòtesi cada cop · Ubica · Repara · Apunta; una sola hipòtesi cada cop (P). ② el Monitor sèrie / Serial Plotter. ③ si proves tot alhora i falla, no saps quina part és; per parts, aïlles la fallada.*

### SA9 · Sessió 4 — Millorar i documentar
> **P①** De la rúbrica R1: què diferencia un codi AS d'un codi AE? (pensa en funcions i casos límit)
> **P②** (SA7) Recordes un cas límit que vam tractar al codi del robot? Al vostre projecte, quin cas límit heu de gestionar?
> **P③** (SA1) El quadern tècnic ha de contenir un error i com s'ha resolt. Per què això **puja** nota en lloc de baixar-la?

*Respostes: ① AE: modular (funcions), gestiona casos límit, es pot explicar la causa dels errors. ② `pulseIn` retorna 0 sense eco → es tracta com a "molt lluny"; el seu: obert. ③ perquè la depuració documentada és contingut i evidència d'aprenentatge (cultura d'error, R1/R4).*

### SA9 · Sessió 5 — Comunicar
> **P①** L'esquema de la defensa: problema → solució → decisió tècnica → demostració. Quina part sol faltar quan una defensa fluixeja?
> **P②** (SA1, fons d'armari) Descriu el vostre projecte amb el model entrada–procés–sortida en 3 frases: és el nucli de la defensa.
> **P③** (curs) Si el projecte falla EN DIRECTE durant la demo, què dieu i què feu? (pista: DEPURA davant del públic)

*Respostes: ① la **decisió tècnica justificada** (per què així i no d'una altra manera). ② oberta — assaig directe de la defensa. ③ descriure què esperàvem i què passa, formular una hipòtesi i, si no surt, explicar com es depuraria: demostra més competència que una demo perfecta.*

---

> **Manteniment:** si canvies l'ordre de les SA o el contingut d'una sessió, revisa les P① de la sessió següent i les P② que hi apuntin. Les preguntes fallades massivament són candidates a reaparèixer (espaiat extra) a la graella de 2-3 sessions més tard.
