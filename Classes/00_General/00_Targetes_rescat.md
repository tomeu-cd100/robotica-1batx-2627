# 🃏 Targetes de rescat — pistes escalonades per desencallar-te

> **Per a l'alumnat.** Quan estàs encallat i DEPURA no t'ha tret del pou, aquí tens una pista. Però una pista **del nivell més baix possible**: la gràcia és que el problema el resolguis tu.

## Com s'usen (regles del joc)

1. **Abans de cap targeta:** 2 minuts de **DEPURA** de debò (descriu què esperaves i què passa, examina el Monitor sèrie…). Moltes vegades ja no et caldrà la targeta.
2. Busca la targeta del teu problema i llegeix **només la pista 🟢** (conceptual: una pregunta que et reorienta). Torna a provar.
3. Segueixes encallat? Puja a la **🟡** (el pas concret). I només en últim recurs, la **🔴** (fragment de codi amb un forat per completar).
4. **Apunta al quadern** quina targeta i quin nivell has usat (p. ex. «T4.1 🟡»). **No penalitza** — al contrari: documentar com t'has desencallat puntua a R4. El que sí que penalitza és copiar la solució del costat sense entendre-la.
5. **Regla d'or:** la pista et torna a posar en marxa; **no et fa la feina**.

> **Per al docent:** imprimeix i retalla les targetes (racó de material), o projecta'n una quan mitja classe s'encalla al mateix lloc. El nivell més alt que ha necessitat cada alumne/a es pot anotar a la graella de grup ([`Avaluació/Full_seguiment_grup.md`](../../Avaluació/Full_seguiment_grup.md)): és un senyal formatiu, no una nota. Les targetes estan alineades amb les taules «Errors freqüents» de cada guia docent.

---

## SA1 · Primer programa

**T1.1 · «El LED no s'encén»**

- 🟢 Un LED només deixa passar el corrent **en un sentit**. Com saps quina pota és quina?
- 🟡 Pota llarga (+) cap al pin de sortida; pota curta cap a GND, passant per la **resistència de 220 Ω**.
- 🔴 Ordre de la sèrie: `pin 13 → resistència → pota llarga · pota curta → GND`. Si encara res, prova el mateix LED directament entre 5V i GND (amb la resistència!) per descartar que estigui fos.

**T1.2 · «No puc pujar el programa (port/placa)»**

- 🟢 L'IDE sap **amb quina placa i per quina porta** ha de parlar? On es tria, això?
- 🟡 *Eines → Placa:* «Arduino UNO» i *Eines → Port:* el port que **desapareix** quan desendolles l'USB.
- 🔴 Seqüència infal·lible: desendolla l'USB → mira la llista de ports → endolla → el port **nou** que apareix és el teu. Si no n'apareix cap, canvia de cable USB (n'hi ha que només carreguen).

---

## SA2 · Sortides digitals i PWM

**T2.1 · «El LED no obeeix el programa»**

- 🟢 Un pin de sortida s'ha de **declarar**. On es fa? I el número que has escrit, coincideix amb el forat on és el cable **de debò**?
- 🟡 Comprova que `const int LED = ...` diu el mateix pin on tens el cable, i que a `setup()` hi ha el `pinMode` corresponent.
- 🔴 `const int LED = __;` (el teu pin) i a dins de `setup()`: `pinMode(LED, OUTPUT);`

**T2.2 · «`analogWrite` no gradua res»**

- 🟢 Tots els pins saben fer PWM? Com es reconeixen a la placa els que sí?
- 🟡 Només els pins amb `~` (3, 5, 6, 9, 10, 11). Mou el cable a un d'aquests i canvia el número al codi.
- 🔴 `analogWrite(LED, valor); // LED ∈ {3,5,6,9,10,11} · valor de 0 a 255`

**T2.3 · «El LED RGB fa colors estranys»**

- 🟢 Hi ha **dos tipus** de LED RGB. Quina és la pota comuna del teu, i on ha d'anar connectada?
- 🟡 **Càtode comú:** pota llarga a GND, s'encén amb valors alts. **Ànode comú:** pota llarga a 5V i tot al revés (255 = apagat).
- 🔴 Prova de diagnòstic: demana vermell pur `(255, 0, 0)`. Si surt **cian**, és ànode comú: escriu cada canal com `255 - valor`.

---

## SA3 · Entrades i sensors

**T3.1 · «El polsador salta sol / fa coses rares»**

- 🟢 Quan **no** el prems, què llegeix el pin si no hi ha res que el «fixi» a un valor conegut?
- 🟡 Usa `INPUT_PULLUP`: en repòs llegeix **HIGH** i premut llegeix **LOW** (lògica invertida). El teu `if` ho té en compte?
- 🔴 `pinMode(BOTO, INPUT_PULLUP);` … `if (digitalRead(BOTO) == LOW) { /* premut! */ }` — i un petit `delay(50)` després de detectar, per l'antirebot.

**T3.2 · «La lectura analògica és sempre 0 o 1023»**

- 🟢 El pin analògic mesura un **punt entremig** entre 5V i GND. El teu circuit en té cap, de punt entremig?
- 🟡 Revisa el **divisor de tensió**: LDR i resistència de 10 kΩ **en sèrie** entre 5V i GND, i el pin analògic connectat **al punt d'unió** de totes dues.
- 🔴 En una línia: `5V → LDR → [aquí el pin A1] → 10 kΩ → GND`. Mesura la tensió del punt mig amb el multímetre: hauria de canviar en tapar la LDR.

**T3.3 · «L'ultrasons diu 0 cm o valors absurds»**

- 🟢 «0 cm» pot voler dir *molt a prop*… o que **no ha tornat cap eco**. Com ho distingiries?
- 🟡 Comprova que TRIG i ECHO no estan intercanviats; i dona un **temps màxim** a `pulseIn` perquè no retorni 0 quan l'objecte és fora de rang.
- 🔴 `long t = pulseIn(ECHO, HIGH, 30000); if (t == 0) return 400; // sense eco = molt lluny, no "a tocar"`

---

## SA4 · Servos i motors

**T4.1 · «El servo tremola o no arriba a l'angle»**

- 🟢 D'on treu el servo **la força** (el corrent)? És el mateix cable que li porta el senyal?
- 🟡 Alimenta el servo amb **font externa de 5 V** i uneix el GND de la font amb el GND de l'Arduino (**massa comuna**).
- 🔴 Tres cables: taronja/groc → pin 9 · vermell → 5V **de la font externa** · marró/negre → GND de la font **i** GND de l'Arduino (units).

**T4.2 · «El motor no gira / l'Arduino es reinicia»**

- 🟢 Un motor demana **molt més corrent** que un LED. Pot sortir tot això del 5V de la placa?
- 🟡 El motor s'alimenta de la font/piles a través del driver, **mai** del 5V de l'Arduino; `ENA` ha d'estar en HIGH o amb PWM; i massa comuna.
- 🔴 Checklist en ordre: ① `ENA` activat? ② `IN1 ≠ IN2`? ③ GND Arduino–L298N–piles **units**? ④ font de les piles connectada al born d'alimentació del L298N?

**T4.3 · «Gira sempre en el mateix sentit»**

- 🟢 Què determina el **sentit**: la velocitat (`ENA`) o la combinació `IN1`/`IN2`?
- 🟡 Un sentit és `IN1=HIGH, IN2=LOW`; l'altre, exactament al revés. Els tens **tots dos** escrits al codi?
- 🔴 `void enrere(int v) { digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH); analogWrite(ENA, v); }` — i la funció `endavant` amb els dos primers intercanviats.

---

## SA5 · micro:bit i MicroPython

**T5.1 · «`IndentationError`»**

- 🟢 En Python els blocs no van entre claus `{ }`. Què els delimita, doncs?
- 🟡 Tot el que és «dins» del `while True:` o d'un `if` va exactament **4 espais** més endins, sense barrejar tabuladors i espais. Repassa la línia que diu l'error.
- 🔴 Esquelet:
  ```python
  while True:
      if button_a.was_pressed():
          display.show(Image.HAPPY)
  ```

**T5.2 · «No reacciona als botons»**

- 🟢 El teu programa llegeix el botó **una vegada** o **contínuament**? On és, la lectura?
- 🟡 La lectura ha de ser **dins** del `while True:`. Si és abans del bucle, només s'executa un cop, a l'arrencada.
- 🔴 Mou el `if button_a.was_pressed():` (i el seu bloc) a dins del `while True:`, ben indentat.

**T5.3 · «La ràdio no rep res»**

- 🟢 Les dues plaques parlen pel **mateix canal**? Com es fixa, el canal?
- 🟡 El **mateix** `radio.config(group=N)` i `radio.on()` a totes dues, abans de res. Prova primer el cas mínim: enviar `"hola"` cada segon.
- 🔴 Emissor: `radio.on()` + `radio.send("hola")` dins del bucle amb `sleep(1000)`. Receptor: `m = radio.receive()` i `if m: display.scroll(m)`.

---

## SA6 · Sistemes de control

**T6.1 · «Fa clic-clic sense parar (oscil·la)»**

- 🟢 Amb **un sol** llindar, què passa quan la mesura balla just al voltant del llindar?
- 🟡 Posa **dos llindars separats** (histèresi): encén per sota del baix, apaga per sobre de l'alt; **entre els dos, no toquis res**.
- 🔴 `if (T < LLINDAR_ON) { encen(); } else if (T > LLINDAR_OFF) { apaga(); } // entremig: es manté l'estat`

**T6.2 · «La màquina d'estats es queda penjada»**

- 🟢 De l'estat on s'ha quedat, quina condició l'hauria de fer **sortir**? Es pot arribar a complir mai?
- 🟡 Al teu **diagrama d'estats**, cada estat necessita almenys una fletxa de sortida amb una condició observable. Compara el diagrama amb el `case` corresponent: falta la transició o no es compleix mai.
- 🔴 Afegeix `Serial.println(estat);` al començament del `loop()` i mira el Monitor sèrie: veuràs exactament a quin estat es queda i podràs mirar només aquell `case`. (Si el patró se't fa bola: esquelet `03_maquina_estats_BASTIDA`.)

**T6.3 · «La lectura de temperatura balla»**

- 🟢 El sensor «menteix» o «tremola»? Què esperaries veure al Serial Plotter en cada cas?
- 🟡 Si tremola (soroll), fes la **mitjana** de diverses lectures i treballa amb la mitjana.
- 🔴 `float suma = 0; for (int i = 0; i < 10; i++) { suma += analogRead(A0); delay(5); } float mitjana = suma / 10;`

---

## SA7 · Robòtica mòbil

**T7.1 · «El robot no va recte»**

- 🟢 Dos motors «iguals» ho són mai, de debò? Què faries per compensar-ho?
- 🟡 Redueix una mica la velocitat del motor que tira més fort, prova, i repeteix fins que vagi recte. Apunta el valor: és el **calibratge** del teu robot.
- 🔴 `motors(vel - AJUST, vel); // comença amb AJUST = 10 i puja o baixa fins que vagi recte`

**T7.2 · «El gir de 90° no és mai igual»**

- 🟢 Un gir controlat **per temps**, de què depèn a més del temps?
- 🟡 Bateria i superfície el canvien: calibra el temps **a la pista real** i apunta-lo al quadern; recalibra si canvies de lloc o la bateria baixa.
- 🔴 Procediment: fes **4 girs seguits** — el robot hauria de quedar mirant on mirava al principi. Ajusta el temps ±10 ms i repeteix fins que quadri.

**T7.3 · «No detecta la línia»**

- 🟢 Què llegeix el sensor **sobre** la línia i **fora**? Ho has mirat amb números, o t'ho imagines?
- 🟡 Imprimeix les lectures al Monitor sèrie, apunta el valor «línia» i el valor «fons», i posa el llindar **al mig**.
- 🔴 `int llindar = (valor_linia + valor_fons) / 2;` — i comprova també l'**alçada** del sensor (1-2 cm del terra).

---

## SA8 · IoT i IA

**T8.1 · «El receptor no rep res»**

- 🟢 Com saps que l'emissor **envia** de debò? Quina evidència en tens?
- 🟡 Fes que l'emissor mostri un punt a la matriu cada cop que envia (confirmació visual) i comprova el mateix `group` a totes dues plaques (targeta T5.3).
- 🔴 A l'emissor, just després de `radio.send(...)`: `display.show(".")` i `sleep(100)` i `display.clear()`.

**T8.2 · «Les dades arriben barrejades»**

- 🟢 Si reps `23` i després `45`, com sap el receptor què és temperatura i què és llum?
- 🟡 **Etiqueta-les a l'origen**: envia `"T:23"` i `"L:45"`, i al receptor separa-les pel `:`.
- 🔴 `nom, valor = missatge.split(":")` i després `if nom == "T": ...`

**T8.3 · «El classificador falla sempre»**

- 🟢 Els llindars (o els exemples d'entrenament) que li has donat, s'assemblen al que li estàs demanant **ara**?
- 🟡 Mesura els **valors reals** de cada gest (imprimeix-los) abans de fixar llindars. A Teachable Machine: més exemples i **més variats** per classe.
- 🔴 Procediment: taula de 5 lectures per gest al quadern → tria cada llindar **al mig** entre els valors d'un gest i de l'altre. Si dos gestos se solapen, tria un altre gest, no un altre llindar.

---

## SA9 · Projecte final

**T9.1 · «No funciona res quan ho ajuntem tot»**

- 🟢 Cada part **per separat**, funciona? Com ho saps del cert?
- 🟡 Aïlla: comenta tot el codi menys **un mòdul**, prova'l, i ves afegint la resta d'un en un. El culpable és l'últim que has afegit (o la seva interacció).
- 🔴 Ordre de proves: ① sensors sols (imprimir valors) → ② actuadors sols (moviments fixos) → ③ lògica amb valors **simulats** (sense maquinari) → ④ tot junt.

**T9.2 · «No arribarem a la demo»**

- 🟢 Quina és la **versió nucli** del vostre sistema — la mínima que compleix els requisits que vau escriure al §1?
- 🟡 Retalleu **ara**: demo de la versió nucli que funciona + explicar a la defensa què faltava i com ho vau decidir (això és gestió de projecte, i puntua). Un sistema petit que funciona val més que un de gran que no.
- 🔴 Al taulell àgil: moveu tot el no essencial a una columna «Millores futures» i copieu-la al dossier tècnic. La decisió documentada és una evidència de CA5.1.

---

*Alineades amb les taules «Errors freqüents» de cada guia docent i amb la rutina DEPURA. Llicència CC BY-SA 4.0.*
