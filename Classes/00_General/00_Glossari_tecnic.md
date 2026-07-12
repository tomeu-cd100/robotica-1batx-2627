# 📖 Glossari tècnic català ↔ anglès

> **Per a l'alumnat.** La documentació real de la professió — *datasheets*, fòrums, la referència d'Arduino i de MicroPython — és **en anglès**. Aquest glossari és el pont: el terme en català (com en diem a classe), el terme en anglès (com el trobaràs quan busquis) i què vol dir en una línia.
>
> **Hàbit del quadern:** a cada SA, apunta-hi **3 termes nous** amb les teves paraules, amb l'anglès inclòs. A final de curs tindràs el teu diccionari d'enginyer/a.
>
> 🔀 **No trobes el terme aquí?** Busca'l al **[vocabulari essencial de la SA0](../SA0/SA0_vocabulari_essencial.md)**: és l'altre diccionari del curs, organitzat **SA per SA** i amb **analogies del dia a dia**. Aquest glossari serveix per a l'**anglès tècnic**; aquell, per entendre el concepte la primera vegada.

## ⚡ Electrònica

| Català | Anglès | Què és | On surt |
|---|---|---|---|
| placa de prototipatge | *breadboard* | Placa de forats per muntar circuits sense soldar | SA1+ |
| resistència | *resistor* | Component que limita el pas de corrent (Ω) | SA2 |
| polaritat | *polarity* | Sentit correcte de connexió (+/−) d'un component | SA2 |
| càtode / ànode | *cathode / anode* | Pota − / pota + d'un LED o díode | SA2 |
| massa (GND) | *ground* | Punt de referència de 0 V del circuit | SA1+ |
| massa comuna | *common ground* | Unir els GND de totes les fonts perquè «parlin» amb la mateixa referència | SA4 |
| tensió | *voltage* | «Pressió» elèctrica entre dos punts (V) | SA2 |
| corrent | *current* | Flux de càrrega que travessa el circuit (A) | SA2 |
| curtcircuit | *short circuit* | Camí directe entre + i − sense càrrega: perill | SA1 |
| divisor de tensió | *voltage divider* | Dues resistències en sèrie per obtenir una tensió intermèdia | SA3 |
| resistència de pull-up | *pull-up resistor* | Manté un pin a HIGH quan no hi ha res connectat (l'Arduino en porta d'internes: `INPUT_PULLUP`) | SA3 |
| full de característiques | *datasheet* | Document oficial d'un component: límits, pins, corbes | SA2+ |
| pont H | *H-bridge* | Circuit que permet invertir el sentit d'un motor | SA4 |
| relé | *relay* | Interruptor comandat elèctricament per a càrregues grans | SA2 |
| brunzidor | *buzzer* | Actuador que fa so | SA2 |
| font d'alimentació | *power supply* | D'on surt l'energia del circuit (USB, piles, font externa) | SA4 |

## 💻 Programació

| Català | Anglès | Què és | On surt |
|---|---|---|---|
| variable / constant | *variable / constant* | Nom que guarda un valor que canvia / que no canvia mai | SA2 |
| funció | *function* | Bloc de codi amb nom que fa una feina concreta | SA3 |
| retornar | *return* | El valor que una funció «lliura» a qui la crida | SA3 |
| bucle | *loop* | Repetició d'un bloc de codi (`for`, `while`) | SA2 |
| condicional | *conditional / if statement* | Decidir entre camins segons una condició | SA2 |
| llibreria | *library* | Codi ja escrit que importes per no reinventar la roda (`Servo.h`) | SA4 |
| compilar | *compile* | Traduir el teu codi al llenguatge del microcontrolador | SA1 |
| carregar / pujar | *upload / flash* | Enviar el programa compilat a la placa | SA1 |
| depurar | *debug* | Trobar i arreglar errors de manera sistemàtica (DEPURA!) | SA1+ |
| error de sintaxi | *syntax error* | El codi no compleix les regles del llenguatge: no compila | SA2 |
| indentació | *indentation* | Espais a l'inici de línia; en Python delimiten els blocs | SA5 |
| pseudocodi | *pseudocode* | El programa escrit en paraules teves, abans del codi | SA3+ |
| diagrama de flux | *flowchart* | El programa dibuixat amb caixes i fletxes | SA3+ |
| antirebot | *debounce* | Filtrar les lectures múltiples d'una sola premuda de botó | SA3 |
| microprogramari | *firmware* | El programa que viu dins d'un dispositiu | SA5 |

## 🎛️ Senyals i control

| Català | Anglès | Què és | On surt |
|---|---|---|---|
| senyal digital | *digital signal* | Dos estats: HIGH/LOW (0 o 5 V) | SA1 |
| senyal analògic | *analog signal* | Molts valors possibles dins d'un rang (0–1023 en llegir) | SA3 |
| PWM | *pulse-width modulation* | «Simular» valors intermedis encenent i apagant molt de pressa | SA2 |
| cicle de treball | *duty cycle* | % del temps que el PWM està encès (0–255 a `analogWrite`) | SA2 |
| llindar | *threshold* | Valor frontera a partir del qual es pren una decisió | SA3 |
| calibratge | *calibration* | Mesurar valors reals per ajustar llindars i paràmetres | SA3, SA7 |
| consigna | *setpoint* | El valor que el sistema de control vol assolir | SA6 |
| realimentació | *feedback* | El sensor informa el controlador del resultat de les seves accions | SA6 |
| llaç obert / tancat | *open / closed loop* | Control sense sensor / amb sensor que corregeix | SA6 |
| histèresi | *hysteresis* | Dos llindars separats per evitar el clic-clic constant | SA6 |
| màquina d'estats | *state machine* | Sistema organitzat en estats i transicions | SA6 |
| soroll | *noise* | Variacions aleatòries que embruten una mesura | SA6 |

## 🤖 Robòtica i moviment

| Català | Anglès | Què és | On surt |
|---|---|---|---|
| sensor / actuador | *sensor / actuator* | El que percep / el que actua sobre el món | SA1 |
| servomotor | *servo* | Motor que controla la **posició** (0–180°) | SA4 |
| motor de corrent continu | *DC motor* | Motor de gir continu; velocitat amb PWM | SA4 |
| sensor d'ultrasons | *ultrasonic sensor* | Mesura distància pel temps de l'eco (HC-SR04) | SA3 |
| cinemàtica diferencial | *differential drive* | Girar variant la velocitat de cada roda (sense volant) | SA7 |
| seguidor de línia | *line follower* | Robot que segueix una línia amb sensors IR | SA7 |
| autònom | *autonomous* | Que decideix sol, sense comandament humà | SA7 |

## 📡 Comunicacions i dades

| Català | Anglès | Què és | On surt |
|---|---|---|---|
| port sèrie | *serial port* | Canal de text entre la placa i l'ordinador (`Serial.println`) | SA3 |
| telemetria | *telemetry* | Enviar mesures a distància per llegir-les des d'un altre lloc | SA8 |
| internet de les coses | *Internet of Things (IoT)* | Objectes quotidians connectats que envien i reben dades | SA8 |
| núvol | *cloud* | Servidors remots on es guarden i processen les dades | SA8 |
| aprenentatge automàtic | *machine learning (ML)* | El sistema aprèn patrons a partir d'exemples, no de regles escrites | SA8 |
| entrenar / etiqueta | *train / label* | Donar exemples al model / el nom de la classe de cada exemple | SA8 |
| classificador | *classifier* | Model que assigna una categoria a cada entrada | SA8 |
| biaix | *bias* | Error sistemàtic (sovint heretat de dades poc variades) | SA8 |
| dades personals | *personal data* | Informació que identifica algú: exigeix consentiment | SA8 |

---

*Consell de cerca: si busques un error o un component, **busca'l en anglès** («servo jitter», «HC-SR04 timeout»): trobaràs 100 vegades més respostes. Llicència CC BY-SA 4.0.*
