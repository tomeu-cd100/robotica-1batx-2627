# Validació SA6-B · Semàfor adaptatiu (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA6/B_semafor_adaptatiu/ampliat/ampliat.ino`
(S1: verd 10 / groc 9 / vermell 8; S2: verd A1 / groc A2 / vermell A3 com a sortides digitals;
polsador de vianants pin 2, polsador de mode nocturn pin 3, tots dos amb INPUT_PULLUP).

**Aquest sketch no té `Serial.begin()`**: no s'hi pot fer servir `wait-serial`. Tota la
validació és per **temps determinista** (`delay` fins al mig de cada finestra de fase,
amb ≥500 ms de marge respecte de cada transició) + `expect-pin`. Durades del codi:
T_VERD=4000, T_GROC=1500, T_VERMELL=4000; verd escurçat a 1000 ms si hi ha petició de vianants;
parpelleig nocturn = `(millis()/500) % 2` (finestres absolutes de 500 ms).

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Taula d'estats de l'encreuament en paper | — | **No validable per simulació** (lliurament en paper). Els escenaris recorren totes les fases de la taula del solucionari, o sigui que la taula de referència és coherent amb el codi. |
| 2. Un sol `enum` per a l'encreuament sencer + transicions amb `millis()` | `escenari_1.yaml` (indirecta) | És una fita **estructural** del codi (es valida llegint-lo). Indirectament: les finestres temporals exactes (4000/1500/4000 ms, i el 2n cicle idèntic a t=10700) només quadren si les transicions van amb `millis()` sense `delay()` bloquejant; i S2 sempre coherent amb S1 a cada mostra implica una sola màquina. |
| 3. Cicle estable amb fases de groc i **mai** els dos verds alhora | `escenari_1.yaml` | A **cada** mostra es comproven pin 10 (verd S1) i pin A1 (verd S2): mai tots dos a 1 (quan A1=1, 10=0 i viceversa). El groc hi és tant al cicle normal (t=4700) com quan els vianants escurcen el verd (t=11400). El «mira-ho 2 minuts» es redueix a 2 cicles + represa (vegeu límits). |

### Ampliacions 1 i 2 (també cobertes)

- **Vianants (escenari_1):** prémer `btn1` durant el verd l'escurça (groc a t=11400 en lloc
  de t≈15500), passa pel vermell (vianants passen) i la petició s'esborra en acabar
  (el verd següent torna a ser normal a t=16700).
- **Nocturn (escenari_2):** `btn2` entra al parpelleig groc ON-OFF-ON (mostres a t=1750/2250/2750,
  al mig de cada mitja finestra de 500 ms) amb **els dos** grocs sincronitzats i verds/vermells
  apagats; `btn1` en surt cap al verd normal.

## Límits (només validables a mà)

- **Fites 1 i 2 (paper i estructura del codi):** no validables per escenari; revisió manual.
- **«Mirar 2 minuts seguits» (fita 3):** l'escenari en cobreix ~17 s (2 cicles + petició +
  represa). Com que el codi és determinista i periòdic, si dos cicles quadren, els següents
  també; l'observació llarga queda per a la simulació interactiva.
- **`expect-pin` sobre pins analògics com a digitals:** les comprovacions de S2 fan servir
  `pin: A1/A2/A3` (el nom del pin al part `wokwi-arduino-uno`, igual que a `diagram.json`).
  Si alguna versió de wokwi-cli no resolgués els noms `Ax` a `expect-pin`, elimineu aquestes
  línies: les fases de S1 (pins 8/9/10) continuen validant el cicle, però la
  complementarietat de S2 quedaria sense comprovar.
- **Marges temporals:** cada mostra és ≥250 ms lluny de qualsevol transició (nocturn) i
  ≥500 ms a la resta; l'arrencada del firmware (<100 ms) no els compromet.
