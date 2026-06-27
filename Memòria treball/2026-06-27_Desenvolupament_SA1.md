# Memòria de treball — Desenvolupament a fons de la SA1
### Data: 27 de juny de 2026

Registre de l'avenç: **revisió integral i ampliació de la SA1** (*Què és un robot? Sistemes embeguts i mètode de projecte*). Partíem de la SA menys desenvolupada (guia + fitxa + 2 sketches) i s'ha equiparat i superat la resta.

---

## Què s'ha fet

### 1. Documents nous de suport (carpeta `Classes/SA1/`)
1. **`SA1_esquemes_connexions.md`** — anatomia de la placa UNO en doble versió (etiquetada + muda per a l'Activitat 2) i circuit del `Blink` (LED intern i extern amb 220 Ω). Era l'única SA sense document de connexions.
2. **`SA1_prova_diagnostica.md`** — prova de coneixements previs (no qualifica): versió imprimible amb clau de correcció + versió Google Forms autocorregible.
3. **`SA1_normes_seguretat.md`** — full de 12 normes de seguretat amb compromís per signar.
4. **`SA1_poster_robot_plantilla.md`** — plantilla del producte de la SA (anàlisi E-P-S d'un robot real + dilema ètic/ODS) amb bastida i autoavaluació R4.
5. **`README.md`** — índex de la carpeta, coherent amb la resta del projecte.

### 2. Codi nou (`Classes/SA1/codi/`)
6. **`blink_millis/blink_millis.ino`** — parpelleig no bloquejant amb `millis()` (ampliació).
7. **`sos_morse/sos_morse.ino`** — SOS en Morse amb funcions pròpies (ampliació).
8. Capçaleres de `blink.ino` i `blink_repte.ino` polides (referència a connexions i ampliacions).

### 3. Enriquiment dels materials existents
9. **`SA1_guia_docent.md`** — taula de documents, solucions de l'Activitat 1, vincles als nous docs, atenció a la diversitat.
10. **`SA1_fitxa_alumnat.md`** — pistes (bastida), vincles, bloc d'ampliació i secció del producte-pòster.

### 4. Segona iteració de millora (revisió crítica)
11. **Mètode de projecte** (buit detectat respecte del títol i la **CA5.1**): nou objectiu 5 + secció "fil conductor del curs" (anàlisi → disseny → prototip → prova → millora), present a Sessió 1 i aplicat a Sessió 3.
12. **PRIMM** a la lectura de codi: Sessió 3 reestructurada en Predir → Executar → Investigar → Modificar → Crear; pas "0. PREDIU" a la fitxa.
13. **Mapa d'avaluació**: taula de traçabilitat instrument → criteri (CA5.1/CA5.3) → rúbrica (R4/R5).
14. **Quadern tècnic**: mini-guia de la 1a entrada alineada amb el mètode de projecte.
15. **Pont cap a la SA2**: tancament que connecta amb les sortides digitals/PWM.

---

## Decisions (acordades amb l'usuari)
- **Abast:** revisió integral (completar suport + enriquir guia i fitxa).
- **Prova diagnòstica:** imprimible **+** versió Google Forms.
- **Codi:** afegir sketches d'ampliació (`blink_millis`, `sos_morse`).
- **Visuals:** Markdown + ASCII + enllaços a imatges reals (Tinkercad/Arduino) que l'usuari hi posarà.
- **Millores de 2a iteració:** aplicades totes (A+B+C+D+E).

## Estat
- Tots els canvis fets a `Classes/SA1/`. Coherent amb les convencions del projecte (rúbriques, vincle competencial CE-R5/CE-R1, ODS, Tinkercad/Wokwi).

## Possibles passos següents (opcionals)
1. Crear un **pòster A3 del mètode de projecte** per penjar a l'aula (artefacte físic reutilitzable a totes les SA).
2. Aplicar el mateix patró PRIMM i mapa d'avaluació a les altres SA per homogeneïtzar.
3. Afegir imatges reals de la placa al document de connexions.
