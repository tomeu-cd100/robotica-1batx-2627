# SA1 · Fitxa base — Què és un robot?

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Descobriràs què és un robot i un sistema embegut, coneixeràs la placa Arduino i faràs el teu primer programa.

---

## El que has de fer

### 1 · Entrada – Procés – Sortida
Completa: què *percep* (entrada), què *decideix* (procés) i què *fa* (sortida).

| Sistema | Entrada (sensors) | Procés (decisió) | Sortida (actuadors) |
|---|---|---|---|
| Rentadora | | | |
| Dron | | | |
| Semàfor | | | |

### 2 · La placa Arduino UNO
Etiqueta a l'**esquema mut** ([`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md), 1.2): microcontrolador · pins digitals · pins analògics (A0–A5) · alimentació (5V, GND) · USB · PWM (~).

**Digital vs analògic:** quina diferència hi ha? Posa'n un exemple de cada. ______________________
> *Digital* = dos estats (0 o 5 V, com un interruptor); *analògic* = molts valors entre 0 i 5 V (com el volum).

### 3 · Normes de seguretat
Llegeix [`SA1_normes_seguretat.md`](SA1_normes_seguretat.md) i **signa** el full. Les 2 normes que et semblen més importants:
1. ___________________________________   2. ___________________________________

### 4 · El teu primer programa (`Blink`) — PRIMM
0. **PREDIU** (sense pujar-lo encara): què creus que farà el LED? ______________________
1. **Investiga** `blink.ino`: què hi ha a `setup()`? ______ a `loop()`? ______ què fa `delay(1000)`? ______
2. **Modifica** el temps perquè parpellegi més ràpid. Valor: ______
3. **Repte** (`blink_repte.ino`): fes 3 parpellejos ràpids i una pausa llarga, i que es repeteixi.

## Producte · Fitxa-pòster
Tria un **robot real** i analitza'l amb [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) (entrada-procés-sortida + dilema ètic). S'avalua amb la rúbrica **R4**.

## Si t'encalles (DEPURA)
> **D**escriu (què esperaves vs què passa) · **E**xamina (LED, error, Monitor Sèrie) · **P**rova una hipòtesi cada cop · **U**bica el problema · **R**epara i torna a provar · **A**punta-ho al quadern. Si demanes ajuda, explica **què ja has provat**.

## M'autoavaluo (NA = no assolit · AS = suficient · AN = notable · AE = excel·lent)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Identifico entrada-procés-sortida d'un sistema | ☐ | ☐ | ☐ | ☐ |
| Reconec les parts de la placa i distingeixo digital/analògic | ☐ | ☐ | ☐ | ☐ |
| Llegeixo i modifico el codi `Blink` | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Què he après:** ___________________________________________________
- **El repte i com l'he resolt** (què havia de fer, què vaig predir, com): ___________________________________________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** Ampliacions (`blink_millis`, `sos_morse`), reptes ⭐, rols de la parella, coavaluació, exit ticket, pensament computacional i ODS → **[SA1_fitxa_ampliada.md](SA1_fitxa_ampliada.md)**
