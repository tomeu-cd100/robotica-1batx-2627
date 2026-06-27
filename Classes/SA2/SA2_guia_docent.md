# SA2 · Guia docent — Sortides digitals i PWM: dona vida als actuadors

**Durada:** 7-8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + kit Keyestudio/BQ · **Llenguatge:** C/C++
**Referència:** `Programació didàctica/11_SA2_Sortides_digitals_PWM.md` · **Esquemes:** `SA2_esquemes_connexions.md`

## Objectius de la SA
1. Escriure programes amb variables, constants i estructures de control (`for`, `if`).
2. Controlar sortides digitals i regular intensitat/to amb **PWM** (`analogWrite`).
3. Muntar circuits de sortida segurs (resistència limitadora, polaritat).
4. Documentar codi i esquema al quadern tècnic.

## Material per parella
- Arduino UNO + USB, protoboard, cables dupont.
- LED (vermell, groc, verd), 1 LED RGB (càtode comú), resistències 220 Ω, brunzidor piezo, mòdul relé.

## Codi de suport (carpeta `codi/`)
| Fitxer | Contingut |
|---|---|
| `01_led_basic.ino` | Encendre/apagar un LED al pin 8. |
| `02_semafor.ino` | Semàfor de 3 LED amb temporització. |
| `03_fade_pwm.ino` | Efecte *fade* amb PWM. |
| `04_rgb.ino` | Barreja de colors amb LED RGB. |
| `05_panell_senyalitzacio.ino` | Producte integrador (RGB + piezo + relé). |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** de la SA n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. Predir abans de provar consolida la comprensió.
- **Pont (d'on venim / on anem):** ve de la **SA1** (parpelleig d'un LED) → portem a la **SA3** (entrades i sensors). Aquí el sistema **actua** (sortides); a la SA3 aprendrà a **percebre** (entrades).

---

## SESSIÓ 1 (2 h) — Variables i la primera sortida
- **Activació (10'):** repàs de `Blink`. Pregunta: *"I si vull canviar el pin sense buscar-lo per tot el codi?"* → **constants**.
- **Modelatge (20'):** `01_led_basic.ino`. Concepte de **constant** (`const int`) i **variable**. Esquema bàsic LED + 220 Ω.
- **Pràctica guiada (40'):** munten el LED al pin 8 i el fan parpellejar; canvien temps amb una variable.
- **Repte (40'):** parpelleig amb temps definits per variables; **+ repte:** patró Morse d'una lletra.
- **Tancament (10'):** esquema i codi al quadern.

**Punt clau:** sempre **resistència limitadora** (220 Ω) en sèrie amb el LED; pota llarga = ànode (+).

---

## SESSIÓ 2 (2 h) — Estructures de control: el semàfor
- **Activació (10'):** com es repeteix una seqüència? → bucles.
- **Modelatge (25'):** `02_semafor.ino`. `for`, `if`, ordre de les fases. Introducció a `millis()` vs `delay()` (concepte, sense aprofundir).
- **Pràctica guiada (35'):** munten 3 LED (pins 8-9-10) i programen el cicle.
- **Repte (40'):** afegir **fase nocturna** (groc intermitent) activable; **+ repte:** semàfor de vianants amb segon grup de LED.
- **Tancament (10'):** quadern.

**Punt clau:** `delay()` bloqueja el programa; per a sistemes que han de fer diverses coses alhora s'usa `millis()` (es treballarà més endavant).

---

## SESSIÓ 3 (2 h) — PWM: intensitat i color
- **Activació (10'):** *"Com es regula la intensitat d'un LED si només hi ha HIGH/LOW?"* → **PWM**.
- **Modelatge (25'):** `03_fade_pwm.ino` (`analogWrite` 0-255) i funció `map()`. Després `04_rgb.ino` (barreja RGB).
- **Pràctica guiada (35'):** efecte *fade* al pin 9; després colors amb el LED RGB (pins 9-10-11).
- **Repte (40'):** crear 5 colors propis i una transició suau entre dos colors; **+ repte:** arc de Sant Martí cíclic.
- **Tancament (10'):** quadern (taula de colors RGB provats).

**Punt clau:** PWM només als pins amb `~` (3, 5, 6, 9, 10, 11). Valors 0-255.

---

## SESSIÓ 4 (2 h) — Producte: panell de senyalització
- **Activació (10'):** presentació del repte integrador.
- **Pràctica (70'):** `05_panell_senyalitzacio.ino` com a base. Integren **LED RGB (estat) + piezo (avís) + relé (càrrega)**. Cada parella personalitza estats i seqüència.
- **Documentació + defensa (30'):** completen esquema i codi comentat; mini-defensa (1') del seu panell.
- **Tancament (10'):** autoavaluació amb rúbriques.

**Producte:** dispositiu de senyalització programable (semàfor amb fase nocturna o panell d'estat RGB + so + càrrega).
**Avaluació:** rúbriques **R1** (codi) i **R2** (circuit).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (panell/semàfor) | Sortides digitals + PWM en un sistema integrat | CA2.1, CA2.2 | R1, R2 |
| Repte curt de codi | Variables, `for`/`if`, `analogWrite`, `map()` | CA1.1 | R1 |
| Quadern tècnic | Esquema, codi comentat, errors i millores | CA1.1, CA2.2 | R1 |
| Observació de muntatge | Resistència limitadora, polaritat, seguretat | CA2.1 | R2 |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA2.2 = mesurar/interpretar senyals. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix R1 i R2 amb l'alumnat **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| LED sempre encès o apagat | Pin equivocat o sense `pinMode OUTPUT` | Revisar número de pin i `setup()`. |
| `analogWrite` no regula | Pin sense PWM | Usar pin amb `~` (3,5,6,9,10,11). |
| RGB mostra colors estranys | Càtode/ànode comú confós | Verificar tipus de LED i pin comú a GND (càtode comú). |
| El relé no commuta | Alimentació insuficient | Alimentar el mòdul correctament; revisar pin de senyal. |
