# SA0 · Vocabulari essencial de la robòtica

> **Per a què serveix aquest document?** És el teu **diccionari de butxaca** de tot el curs. Aquí hi trobaràs, ordenats **SA per SA**, els termes que faràs servir a cada unitat. Quan a una classe surti una paraula que no recordes, busca-la aquí. No cal estudiar-lo de memòria: és per **consultar**.

**Com llegir cada entrada:** **Terme** → definició curta → *analogia o exemple del dia a dia* → on apareix.

---

## Bloc 0 · Paraules que sentiràs des del primer dia

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Hardware (maquinari)** | Tot allò físic que pots tocar: la placa, els cables, els sensors. | El cos. |
| **Software (programari)** | Les instruccions (el programa) que diuen al maquinari què ha de fer. | El pensament que mou el cos. |
| **Microcontrolador** | Petit "cervell" dins la placa que executa el programa. | El xip que pensa. |
| **Placa (board)** | El circuit on hi ha el microcontrolador i els pins. Ex.: Arduino UNO, micro:bit. | La taula de treball del cervell. |
| **Pin** | Cada connexió de la placa per on entra o surt un senyal. | Els dits de la placa. |
| **Codi / programa / *sketch*** | El conjunt d'instruccions que escrius. A Arduino el programa es diu *sketch*. | La recepta de cuina. |
| **Bug** | Un error al programa. **Depurar** (*debug*) = trobar-lo i arreglar-lo. | Una errada a la recepta que fa cremar el plat. |

---

## SA1 · Introducció a la robòtica i sistemes embeguts

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Robot** | Màquina que **percep** l'entorn, **decideix** i **actua** sobre ell de manera automàtica. | Un Roomba que veu obstacles i els esquiva. |
| **Sistema embegut** | Ordinador petit i especialitzat amagat dins d'un aparell. | El "cervell" d'una rentadora o d'un microones. |
| **Entrada → Procés → Sortida (E-P-S)** | El model bàsic: l'entrada **percep**, el procés **decideix**, la sortida **actua**. | Sentir fred (entrada) → decidir abrigar-se (procés) → posar-se el jersei (sortida). |
| **Senyal digital** | Només dos estats: **0 o 1** (apagat/encès, LOW/HIGH, 0 V o 5 V). | Un interruptor de la llum. |
| **Senyal analògic** | Molts valors continus entre un mínim i un màxim. | El comandament del volum o un termòmetre. |
| **Arduino IDE** | El programa de l'ordinador on escrius el codi i el carregues a la placa. | El processador de textos del programador. |
| **Tinkercad / Wokwi** | Simuladors: munten i proven circuits **virtualment** abans del muntatge real. | Un videojoc per assajar sense trencar res. |

---

## SA2 · Sortides digitals i PWM

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Sortida digital** | Un pin que la placa posa a **encès (HIGH)** o **apagat (LOW)**. | Encendre/apagar un llum. |
| **LED** | Díode que emet llum; té polaritat (pota llarga = +). | Una bombeta petita amb sentit. |
| **Resistència** | Component que **limita el corrent** per no cremar el LED. Es mesura en ohms (Ω). | L'aixeta que regula quanta aigua passa. |
| **PWM** (*Pulsewidth modulation*) | Truc per simular valors intermedis encenent i apagant molt ràpid. Pins marcats amb **`~`**. Valors **0–255**. | Pedalejar a intervals per anar "a mitja velocitat". |
| **`analogWrite()`** | Instrucció que aplica PWM a un pin (ex.: brillantor d'un LED). | El regulador d'intensitat (*dimmer*). |
| **RGB** | LED de tres colors (vermell, verd, blau) que barrejats fan qualsevol color. | La paleta del pintor. |

---

## SA3 · Entrades i sensors

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Sensor** | Component que **mesura** una magnitud de l'entorn i la converteix en senyal. | Els sentits del robot. |
| **Actuador** | Component que **fa una acció** física (motor, LED, brunzidor). | Els músculs del robot. |
| **Polsador (botó)** | Entrada digital: premut = HIGH/LOW. | El timbre de casa. |
| **Rebot (*debounce*)** | Petits "salts" elèctrics en prémer un botó; cal **filtrar-los** per no comptar premudes de més. | Una porta que rebota abans de tancar-se del tot. |
| **Potenciòmetre** | Resistència variable: gira i canvia el valor analògic. | El comandament del volum. |
| **LDR** | Sensor de **llum** (la seva resistència canvia amb la lluminositat). | L'ull que detecta si és de dia o de nit. |
| **Sensor d'ultrasons** | Mesura **distàncies** enviant un so i cronometrant l'eco. | El "sonar" dels ratpenats. |
| **`analogRead()`** | Llegeix un pin analògic; retorna un valor **0–1023**. | Mirar quant marca el termòmetre. |

---

## SA4 · Moviment: servos, motors i ponts H

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Servomotor (servo)** | Motor que es mou a un **angle concret** (0°–180°). | El colze que es posa just on vols. |
| **Motor de corrent continu (DC)** | Motor que **gira** contínuament; controles velocitat i sentit. | La roda d'un cotxe teledirigit. |
| **Pont H** | Circuit que permet **invertir el sentit de gir** d'un motor (endavant/enrere). | La marxa enrere del cotxe. |
| **Alimentació externa** | Font d'energia a part de l'USB perquè els motors tenen prou força. | Endollar l'electrodomèstic en lloc d'anar a piles. |
| **Llibreria (`#include`)** | Codi ja fet que altres han escrit i tu reutilitzes (ex.: `Servo.h`). | Comprar la massa de pizza feta en lloc d'amassar-la. |

---

## SA5 · micro:bit i MicroPython

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **micro:bit** | Placa educativa amb LEDs, botons i sensors **integrats** (no cal cablejar). | Una navalla suïssa de la robòtica. |
| **MicroPython** | Versió reduïda del llenguatge **Python** per a microcontroladors. | El "Python de butxaca". |
| **Indentació** | En Python, els **espais a l'esquerra** marquen quines línies van juntes (substitueixen les claus `{}`). | Els marges d'un esquema amb sagnats. |
| **`display`** | La matriu de 5×5 LEDs del micro:bit per mostrar imatges i text. | Una pantalleta de píxels. |
| **Acceleròmetre** | Sensor que detecta **moviment i inclinació**. | L'orella interna que et diu si vas de cap per avall. |
| **Ràdio** | Comunicació sense fils entre micro:bits. | Walkie-talkies entre plaques. |

---

## SA6 · Sistemes de control

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Llaç obert** | El sistema actua **sense comprovar** el resultat. | Un ventilador a velocitat fixa: no sap quina temperatura fa. |
| **Llaç tancat (realimentació)** | El sistema **mesura el resultat** i s'ajusta. | L'aire condicionat que mira el termòmetre i s'autoregula. |
| **Consigna (*setpoint*)** | El valor objectiu que volem assolir. | Els 21 °C que poses al termòstat. |
| **Histèresi** | Marge entre encendre i apagar per evitar oscil·lacions contínues. | La nevera: arrenca a 6 °C i no para fins a 4 °C. |
| **Màquina d'estats** | Sistema que té diferents **estats** i passa d'un a l'altre segons condicions. | Un semàfor: verd → groc → vermell. |
| **Control proporcional** | La correcció és **proporcional** a com de lluny estàs de la consigna. | Trepitjar més fort el fre com més de pressa vas. |

---

## SA7 · Robòtica mòbil

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Robot mòbil** | Robot que **es desplaça** per l'entorn. | Un cotxe autònom. |
| **Trajectòria** | El recorregut que segueix el robot. | El traçat d'un circuit. |
| **Evitar obstacles** | Comportament: detectar amb sensors i canviar de rumb. | Esquivar la gent pel passadís. |
| **Seguidor de línia** | Robot que segueix una línia pintada amb sensors infrarojos. | Caminar seguint la ratlla del terra. |
| **Sensor infraroig (IR)** | Detecta el contrast clar/fosc del terra. | L'ull que distingeix la línia negra del blanc. |

---

## SA8 · IoT i Intel·ligència Artificial

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **IoT (Internet de les coses)** | Objectes connectats que envien i reben dades per la xarxa. | Una bàscula que envia el pes al mòbil. |
| **Telemetria** | Enviar **mesures a distància** des d'un sensor. | L'estació meteorològica que reporta dades al núvol. |
| **Emissor / Receptor** | Qui **envia** dades i qui les **rep**. | Qui parla i qui escolta per walkie-talkie. |
| **Intel·ligència Artificial (IA)** | Sistemes que **aprenen** de dades per fer prediccions o classificacions. | Reconèixer un gest o una cara. |
| **ESP32** | Microcontrolador amb **WiFi/Bluetooth** integrat (opcional/avançat). | Un Arduino amb connexió a internet. |

---

## SA9 · Projecte final integrador

| Terme | Què vol dir | Analogia / exemple |
|---|---|---|
| **Projecte** | Repte obert que integra tot l'après: del problema al prototip. | Construir alguna cosa de cap a peus. |
| **Metodologia àgil** | Treballar per **passos curts** (sprints), provant i millorant sovint. | Cuinar tastant i corregint a cada pas. |
| **Prototip** | Primera versió que funciona, encara que sigui imperfecta. | L'esborrany d'una redacció. |
| **Iteració** | Repetir el cicle millorant cada vegada. | Tornar a tirar el tret després d'apuntar millor. |
| **Dossier tècnic** | Document que recull el procés, decisions i resultats. | El diari de bord del viatge. |

---

## El mètode de projecte (el fil de tot el curs)

A **totes** les SA treballem amb el mateix cicle d'enginyeria. Tingue'l sempre present:

| Fase | Pregunta clau |
|---|---|
| **1. Analitzar** | Quin problema tinc? Què necessito? |
| **2. Dissenyar** | Com el penso resoldre **abans** de fer-ho? |
| **3. Prototipar** | Construeixo una primera versió. |
| **4. Provar** | Funciona? On falla? |
| **5. Millorar** | Com ho faig millor? |

> Aquest és també l'esquema del teu **quadern tècnic**. → Per aprendre a programar la placa, ves a **`SA0_guia_programacio.md`**.
