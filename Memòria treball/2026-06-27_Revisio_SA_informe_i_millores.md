# Memòria de treball — 2026-06-27 · Revisió de les SA: informe i millores

## Objectiu
Revisar **totes** les SA (SA1–SA9), tant la **programació didàctica** (`10–18`) com el **material d'aula** (`Classes/SAx`), amb quatre focus: **rigor tècnic**, **avaluació/traçabilitat**, **diversitat/viabilitat** i **coherència/progressió**. Lliurable: informe + aplicació de les millores clau.

## Abast revisat
- Programació didàctica: `06`, `07`, `08`, `10`–`18`.
- Material d'aula: guies docents (mostra SA1/SA3/SA7/SA9), **els 32 fitxers de codi** (`.ino`/`.py`), esquemes de connexions (SA3) i solucionari T1.

## Valoració global
Material de **nivell alt i molt cohesionat**. Punts forts destacats:
- Traçabilitat sòlida **CA → rúbrica → producte** (mapa d'avaluació a cada guia docent).
- Fil conductor **mètode de projecte** + **PRIMM** present a totes les SA.
- Secció **"Pont (d'on venim / on anem)"** → progressió excel·lent.
- **Atenció a la diversitat** sistemàtica (bastida + ampliació).
- Codi net, modular i ben comentat.

## Troballes (prioritzades)

| # | Focus | Gravetat | Troballa | Estat |
|---|---|---|---|---|
| 1 | Rigor tècnic | Alta | **HC-SR04 sense eco:** `pulseIn` retorna `0` (objecte fora de rang) i `0` cm es llegeix com "molt a prop" → falsa alarma a `SA3/04`; a més, `pulseIn` sense *timeout* a `SA3/03` i `SA4/03` (bloqueig ~1 s). Incoherent amb `SA4/04` i `SA7/03`, que ho fan bé. | **CORREGIT** |
| 2 | Avaluació/traçabilitat | Mitjana | **Solucionari T1:** "Morse (SOS)" classificat sota **SA2** quan és contingut de **SA1** (`sos_morse.ino`). | **CORREGIT** (reubicat a SA1) |
| 6 | Rigor (menor) | Baixa | `SA3/02`: comentari "descomenta per veure-les" amb el `Serial.print` ja actiu. | **CORREGIT** |
| 3 | Viabilitat | Mitjana-alta | **Calendari molt ajustat:** 69 h SA + 1 h marge = 70 h = tot el curs. Sense temps per a les **proves pràctiques trimestrals** (`Avaluació/Prova_practica_T1/T2/T3`), festius ni imprevistos. | **CORREGIT** (marge + integració de proves) |
| 4 | Coherència | Mitjana | **SA0 i Reptes (nous) no referenciats** a guies/fitxes existents. Material "desconnectat". | **Es deixa com està** (decisió del docent: material independent) |
| 5 | Rigor (menor) | Baixa | `SA5/04` i `SA8/01-02` usen **`group=10` idèntic** → interferència de ràdio si dos equips treballen alhora. | **CORREGIT** (nota recordatori al codi) |

## Millores aplicades (baix risc, objectives)
1. **`pulseIn` amb *timeout* 30 ms + filtre `== 0 → 400`** a:
   - `Classes/SA3/codi/03_ultrasons_funcio/03_ultrasons_funcio.ino`
   - `Classes/SA3/codi/04_alarma_aparcament/04_alarma_aparcament.ino`
   - `Classes/SA4/codi/03_sensor_velocitat/03_sensor_velocitat.ino`
2. **Nota a "errors freqüents"** de `Classes/SA3/SA3_guia_docent.md` sobre el cas `pulseIn == 0`.
3. **Comentari corregit** a `Classes/SA3/codi/02_potenciometre_ldr/...`.
4. **Morse reubicat** de SA2 a SA1 a `Classes/Solucionari/Solucionari_T1_SA1-SA3.md`.

## Millores de criteri (decidides pel docent i aplicades)
- **Viabilitat temporal (#3):** s'apliquen **les dues** mesures → (1) **marge real**: SA2/SA4/SA6 passen a còmput base **7 h** (4a sessió amb ampliacions opcionals), alliberant ~4 h de marge; (2) **proves integrades**: T1→SA3, T2→SA6, T3→SA9, sense hores extra. Actualitzat `08` i les capçaleres de durada de les guies SA2/SA4/SA6.
- **Integració SA0/Reptes (#4):** **es deixa com està**; Reptes i SA0 queden com a material independent de consulta.
- **Ràdio `group` (#5):** afegida **nota recordatori** al codi de `SA5/04`, `SA8/01` i `SA8/02` (cada equip, un `group` propi).

## Fitxers modificats en aquesta revisió
- Codi: `SA3/02`, `SA3/03`, `SA3/04`, `SA4/03`, `SA5/04`, `SA8/01`, `SA8/02`.
- Guies docents: `SA3` (errors freqüents), `SA2`/`SA4`/`SA6` (capçalera de durada).
- Solucionari: `Solucionari_T1_SA1-SA3.md` (Morse reubicat a SA1).
- Programació didàctica: `08_Sequenciacio_temporal_anual.md` (marge + integració de proves).

## Pendents
- Sincronitzar amb GitHub quan es validi.
