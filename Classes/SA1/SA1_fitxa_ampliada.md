# SA1 · Fitxa ampliada (aprofundiment) — Què és un robot?

> 📄 **Versió ampliada**: conté totes les activitats, rutines (coavaluació, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA1_fitxa_alumnat.md](SA1_fitxa_alumnat.md)**.

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> En aquesta unitat descobriràs què és un robot i un sistema embegut, coneixeràs la placa Arduino i faràs el teu primer programa.

---

## Activitat 1 · Entrada – Procés – Sortida

Analitza aquests tres sistemes i completa la taula. Pensa: què *percep* (entrada), què *decideix* (procés) i què *fa* (sortida).

| Sistema | Entrada (sensors) | Procés (decisió) | Sortida (actuadors) |
|---|---|---|---|
| Rentadora | | | |
| Dron | | | |
| Semàfor | | | |

**+ Repte:** afegeix un quart sistema del teu entorn: ______________________

---

## Activitat 2 · La placa Arduino UNO

Etiqueta aquestes parts a l'**esquema mut** que et donarà el professorat (`SA1_esquemes_connexions.md`, apartat 1.2):
- [ ] Microcontrolador  - [ ] Pins digitals  - [ ] Pins analògics (A0-A5)
- [ ] Pins d'alimentació (5V, GND)  - [ ] Connector USB  - [ ] Pins PWM (~)

**Pregunta:** Quina diferència hi ha entre un senyal **digital** i un d'**analògic**? Posa'n un exemple de cada.

___________________________________________________________________

> **Pista:** *digital* = només dos estats (0 o 5 V, com un interruptor); *analògic* = molts valors entre 0 i 5 V (com un comandament de volum).

---

## Activitat 3 · Normes de seguretat

Llegeix les normes (`SA1_normes_seguretat.md`) i **signa** el full. Escriu aquí les 2 normes que et semblen més importants:

1. ___________________________________________________________________
2. ___________________________________________________________________

---

## Activitat 4 · El teu primer programa (`Blink`)

**0. PREDIU (abans d'executar res).** Mira el codi de `blink.ino` projectat i, **sense pujar-lo encara**, escriu què creus que farà el LED:

___________________________________________________________________

> Després l'executarem i comprovaràs si ho havies encertat. Predir abans de provar és el que fa un bon equip d'enginyeria!

1. **Investiga.** Obre `blink.ino` i identifica les parts:
   - Què hi ha dins de `setup()`? _______________________________________
   - Què hi ha dins de `loop()`? ________________________________________
   - Què fa `delay(1000)`? ______________________________________________

2. **Modifica** el temps perquè el LED parpellegi més ràpid. Quin valor has posat? ______

3. **Repte (`blink_repte.ino`):** fes que el LED faci 3 parpellejos ràpids i una pausa llarga, i es repeteixi. Enganxa aquí el teu codi o descriu com ho has fet:

```cpp

```

> **+ Ampliació (opcional):** obre `blink_millis.ino` (parpelleja **sense** `delay()`, amb `millis()`) o `sos_morse.ino` (envia SOS en Morse amb **funcions**). Quin avantatge té parpellejar sense `delay()`? ________________________________________

---

## Producte de la SA · Fitxa-pòster

Tria un **robot real** i analitza'l amb la plantilla `SA1_poster_robot_plantilla.md` (entrada-procés-sortida + dilema ètic). S'avalua amb la rúbrica **R4**.

---

## Treball en equip · rols de la parella

Repartiu-vos els rols i **roteu-los** a cada sessió (marqueu qui fa què):

| Rol | Sessió 1 | Sessió 2 | Sessió 3 |
|---|---|---|---|
| Coordinador/a (temps, enunciat, que tothom participi) | | | |
| Programador/a (codi / teclat) | | | |
| Enginyer/a de maquinari (placa, connexions, seguretat) | | | |
| Provador/a–Documentador/a (prova + quadern) | | | |

---

## Si t'encalles

1. **Pista 1:** torna a llegir l'enunciat i digues en veu alta què ha de fer el sistema (entrada → procés → sortida).
2. **Pista 2:** compara el teu codi i el circuit amb l'esquema; revisa pin a pin.
3. **Pista 3:** aplica la **rutina DEPURA** i, si cal, demana ajuda **explicant què ja has provat**.

> **Rutina DEPURA** (quan no funciona): **D**escriu (què esperaves vs què passa) · **E**xamina (LED, missatge d'error, Monitor Sèrie) · **P**rova una hipòtesi cada cop (canvia una sola cosa) · **U**bica el problema (aïlla'l) · **R**epara i torna a provar · **A**punta-ho al quadern.

## Vols més?

- **Reptes ⭐:** tria'n un a `Reptes/Reptes_SA1.md` i amplia el teu producte.
- **Simulació interactiva (Wokwi):** prova-ho sense maquinari (vegeu `Simulacions/Wokwi/`).

---

## Pensament computacional d'aquesta SA

Avui has practicat la **DESCOMPOSICIÓ**: partir un sistema complex en parts senzilles (entrada → procés → sortida). On l'has fet servir? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA = no assolit · AS = suficient · AN = notable · AE = excel·lent):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Identifico entrada-procés-sortida d'un sistema | ☐ | ☐ | ☐ | ☐ |
| Reconec les parts de la placa i distingeixo digital/analògic | ☐ | ☐ | ☐ | ☐ |
| Llegeixo i modifico el codi `Blink` | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu el pòster amb una altra parella i anoteu:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

La robòtica és a tot arreu: electrodomèstics, transport, indústria. **ODS 9** (indústria i innovació) i **ODS 12** (consum responsable). Escriu un **benefici** i un **risc** d'automatitzar una tasca quotidiana: ______________________

---

## Quadern tècnic (entrada de la SA1)

> El quadern tècnic és el teu **diari de bord** de tot el curs. Segueix el **mètode de projecte**: *analitzar → dissenyar → prototipar → provar → millorar.*

- **Què he après:** ___________________________________________________
- **El repte i com l'he resolt** (què havia de fer, què vaig predir, com ho vaig solucionar i què vaig millorar): ___________________________________________________
- **Quin error he tingut i com l'he resolt:** ___________________________
- **Reflexió ètica** (automatització i ODS): un avantatge i un risc de l'automatització:
  - Avantatge: ______________________________________________________
  - Risc: ___________________________________________________________
