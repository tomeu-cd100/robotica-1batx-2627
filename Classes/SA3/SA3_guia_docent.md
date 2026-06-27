# SA3 · Guia docent — Entrades i sensors: el robot percep

**Durada:** 8 h (4 sessions) · **Maquinari:** Arduino UNO + Keyestudio (polsador, potenciòmetre, LDR, NTC, ultrasons HC-SR04) · **Llenguatge:** C/C++
**Referència:** `Programació didàctica/12_SA3_Entrades_sensors.md` · **Esquemes:** `SA3_esquemes_connexions.md`

## Objectius de la SA
1. Llegir entrades digitals (`digitalRead`) i analògiques (`analogRead`) i interpretar-ne els valors.
2. Aplicar **funcions** definides per l'usuari per modularitzar.
3. Usar el **monitor/traçador sèrie** per depurar i visualitzar dades.
4. Connectar percepció (sensor) amb acció (actuador).

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- Polsador, potenciòmetre, LDR + resistència 10 kΩ, NTC + 10 kΩ, sensor d'ultrasons HC-SR04, LED, brunzidor piezo.

## Codi de suport (carpeta `codi/`)
| Fitxer | Contingut |
|---|---|
| `01_polsador_debounce.ino` | Entrada digital amb *pull-up* i antirebot; comptador. |
| `02_potenciometre_ldr.ino` | Entrades analògiques; `map()`; llum automàtic. |
| `03_ultrasons_funcio.ino` | Funció `mesuraDistancia()`; Serial Plotter. |
| `04_alarma_aparcament.ino` | Producte: sensor→actuador segons distància. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou.
- **Pont (d'on venim / on anem):** ve de la **SA2** (sortides/actuadors) → portem a la **SA4** (moviment). Aquí el sistema aprèn a **percebre** (sensors); a la SA4 la percepció **mourà** servos i motors.

---

## SESSIÓ 1 (2 h) — Entrades digitals i monitor sèrie
- **Activació (10'):** *"Com sap la placa que has premut un botó?"*
- **Modelatge (25'):** `01_polsador_debounce.ino`. `INPUT_PULLUP` (per què evita el cable extra), `digitalRead`, **antirebot** (*debounce*) i **Serial Monitor**.
- **Pràctica guiada (35'):** munten el polsador al pin 2; obren el monitor sèrie i compten premudes.
- **Repte (40'):** el polsador encén/apaga un LED a cada premuda (mode *toggle*); **+ repte:** comptar fins a 5 i reiniciar.
- **Tancament (10'):** quadern.

**Punt clau:** amb `INPUT_PULLUP` el pin llegeix **HIGH en repòs** i **LOW en prémer** (lògica invertida). El *debounce* evita lectures múltiples per un sol clic.

---

## SESSIÓ 2 (2 h) — Entrades analògiques
- **Activació (10'):** *"Quants valors pot tenir una entrada analògica?"* → 0-1023.
- **Modelatge (25'):** `02_potenciometre_ldr.ino`. `analogRead` (conversió A/D 10 bits), **`map()`** per reescalar, divisor de tensió per a la LDR.
- **Pràctica guiada (35'):** llegeixen potenciòmetre (A0) i LDR (A1) al monitor; regulen la intensitat d'un LED amb el potenciòmetre (PWM).
- **Repte (40'):** **llum automàtic** (LDR → LED s'encén si fa fosc) amb llindar; **+ repte:** llindar ajustable amb el potenciòmetre.
- **Tancament (10'):** quadern (taula de lectures).

**Punt clau:** `analogRead` retorna 0-1023; `analogWrite` necessita 0-255 → cal **`map()`**. El divisor de tensió converteix la resistència variable (LDR/NTC) en tensió mesurable.

---

## SESSIÓ 3 (2 h) — Sensor de distància i funcions
- **Activació (10'):** *"Com mesura distàncies un cotxe en aparcar?"* → ultrasons.
- **Modelatge (30'):** `03_ultrasons_funcio.ino`. Principi de l'eco (`pulseIn`), càlcul de distància, i sobretot **escriure una funció** `mesuraDistancia()` que retorna un valor.
- **Pràctica guiada (30'):** munten l'HC-SR04; visualitzen la distància amb **Serial Plotter**.
- **Repte (40'):** funció que retorna la distància mitjana de 3 mesures (filtre); **+ repte:** detectar si un objecte s'acosta o s'allunya.
- **Tancament (10'):** quadern (codi de la funció).

**Punt clau:** una **funció** encapsula una tasca i en retorna un resultat → codi més net i reutilitzable. `pulseIn` mesura el temps de l'eco; distància (cm) = temps · 0,034 / 2.

---

## SESSIÓ 4 (2 h) — Producte: alarma/aparcament
- **Activació (10'):** presentació del repte.
- **Pràctica (70'):** `04_alarma_aparcament.ino`. Integren ultrasons + LED/piezo amb **avís proporcional a la distància** (com més a prop, més ràpid el so). Cada parella personalitza llindars.
- **Documentació + defensa (30'):** esquema, codi comentat, mini-defensa.
- **Tancament (10'):** autoavaluació.

**Producte:** sistema sensor→actuador (alarma de proximitat o llum automàtic) amb codi modular (funcions).
**Avaluació:** rúbriques **R1** (codi) i **R2** (circuit). Repte individual: escriure una funció de lectura.

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (alarma/llum automàtic) | Percepció → acció amb codi modular | CA2.1, CA2.2 | R1, R2 |
| Repte de codi (funció de lectura) | Funcions, `digitalRead`/`analogRead`, `map()` | CA1.1 | R1 |
| Quadern tècnic | Taula de lectures, codi de la funció, errors | CA1.1, CA2.2 | R1 |
| Observació + depuració sèrie | Ús del monitor/traçador, divisor de tensió | CA2.2 | R2 |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA2.2 = mesurar/interpretar senyals. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix R1 i R2 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El polsador "salta" sol | Sense *debounce* o sense *pull-up* | Usar `INPUT_PULLUP` i antirebot. |
| Lectura analògica sempre 0 o 1023 | Divisor mal connectat | Revisar la resistència de 10 kΩ i el punt mig al pin analògic. |
| Distància sempre 0 o molt gran | TRIG/ECHO intercanviats | Verificar TRIG (sortida) i ECHO (entrada). |
| El LED no regula amb el potenciòmetre | Pin de sortida sense PWM | LED en pin `~` i usar `map()` a 0-255. |
