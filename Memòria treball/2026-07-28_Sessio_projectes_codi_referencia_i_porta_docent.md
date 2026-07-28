# Sessió del 28-07-2026 · Projectes trimestrals, codi de referència i porta docent

Resum del que s'ha fet avui i, sobretot, **què queda pendent per continuar demà**.

## Fet avui (tot committat i publicat, CI en verd)

1. **Captura Tinkercad de la pràctica 4 de SA3** (alarma d'aparcament) amb el seu
   enllaç al `SA3_esquemes_connexions.md`. Amb això **SA3 queda completa**: les 4
   pràctiques tenen captura + *sharecode*. (`42edc7d`)

2. **Seccions «Projecte trimestral» al web** — l'alumnat no trobava que després de
   la SA3 tocava construir la mascota. Ara l'itinerari és:
   `SA1→SA2→SA3→🐣 Projecte T1 →SA4→SA5→SA6→🦾 Projecte T2 →🚙 Projecte T3 →SA7→SA8→SA9`.
   El rover va **abans de SA7** perquè es munta a la sessió 0 del 3r trimestre.
   Cada secció té portada índex nova (`Classes/00_General/00_Projecte_Tn_portada.md`)
   + el dossier existent; targetes al hub i a la portada, stepper de 13 passos,
   paginador amb ponts i redireccions de les URL antigues (Classroom no es trenca).
   Spec i pla: `2026-07-28_Spec_seccions_projecte_trimestral_web.md` i
   `2026-07-28_Pla_seccions_projecte_trimestral_web.md`.

3. **Codi de referència complet dels tres robots** (només vista docent), a
   `Classes/Solucionari/codi/`: `T1_mascota.ino`, `T2_brac.ino` + 2 `.py` micro:bit
   (comandament i receptor per ràdio), `T3_rover.ino` + `.py` de telemetria.
   Explicats per blocs a cada `Solucionari_Tn_*.md`, enllaçats 🔑 des dels dossiers
   i les portades. El CI ja els compila. Spec i pla:
   `2026-07-28_Spec_codi_referencia_robots.md` i `2026-07-28_Pla_codi_referencia_robots.md`.

4. **Auditoria i reforç de la porta de la vista docent**. Les 93 pàgines docent ja
   duien porta, però hi havia tres esquerdes, ara tapades: els **PDF de les proves
   pràctiques** es baixaven per URL directa (ja no se'n genera cap de material
   docent), Google podia **indexar** les pàgines (ara `noindex, nofollow`) i
   `cerca-index.js` contenia el **text sencer de 85 pàgines docent** (ara només
   títol i URL). Ho vigila `web/_generador/tests/test_porta_docent.py`.

## Pendent per demà (per ordre de recomanació)

1. **Captures Tinkercad de SA4** — és el següent pas natural: SA1-SA3 estan fetes i
   de **SA4 a SA9 no n'hi ha cap**. Flux ja rodat: obres el circuit a Tinkercad, en
   fas captura (queda a `Pictures/Screenshots`), em passes l'enllaç amb *sharecode* i
   es copia a `Classes/SAn/img/sa{n}-tinkercad-<practica>.png` + imatge amb alt text
   descriptiu i línia «▶ Obre la simulació a Tinkercad» a `SAn_esquemes_connexions.md`.
2. **Replicar el pilot visual de SA1** (imatges SVG/foto + navegació) a la resta de SA.
3. **Wokwi**: estendre simulacions i enllaços on encara falten.
4. **P4 tècnic** (sense pressa): modularitzar `generar.py` en discovery/render/
   orquestració; ja hi ha paquet `generador/`, tests i QA a CI.

### Decisions que has deixat obertes

- **Separar el material docent en un repositori privat**: ho vam descartar avui de
  moment. Fer privat el repositori actual NO serveix (a GitHub Pages el web publicat
  continua sent públic i es trencarien 261 enllaços a github.com de pàgines
  d'alumnat). Si algun dia vols separació real, cal repositori a part.
- **PDF de les proves pràctiques**: ara s'imprimeixen des del navegador. Si el vols
  recuperar en PDF, cal un mecanisme que no els publiqui al web.

### Al setembre (presència física al centre)

- Validar amb **maquinari real** el solucionari (validat només en simulació) i **el
  codi de referència dels tres robots escrit avui**, que encara no s'ha provat en placa.
- Tall làser i impressió 3D de prova dels tres robots.
- **Reclonar** el repositori a les altres màquines (l'històric es va purgar; `pull` no basta).

### Durant el curs

- Publicar els qüestionaris de repàs del Classroom (en esborrany) en tancar cada SA.
  Prerequisit: esborrar `token.json` i reautoritzar OAuth amb els scopes reduïts.
