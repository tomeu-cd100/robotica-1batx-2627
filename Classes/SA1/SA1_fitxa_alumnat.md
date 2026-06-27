# SA1 · Fitxa d'alumnat — Què és un robot?

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

## Quadern tècnic (entrada de la SA1)

> El quadern tècnic és el teu **diari de bord** de tot el curs. Segueix el **mètode de projecte**: *analitzar → dissenyar → prototipar → provar → millorar.*

- **Què he après:** ___________________________________________________
- **El repte i com l'he resolt** (què havia de fer, què vaig predir, com ho vaig solucionar i què vaig millorar): ___________________________________________________
- **Quin error he tingut i com l'he resolt:** ___________________________
- **Reflexió ètica** (automatització i ODS): un avantatge i un risc de l'automatització:
  - Avantatge: ______________________________________________________
  - Risc: ___________________________________________________________
