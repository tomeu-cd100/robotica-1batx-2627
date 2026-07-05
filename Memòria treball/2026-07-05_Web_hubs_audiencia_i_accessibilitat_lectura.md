# Menú per audiència, hubs Docent/Alumnat i ajustos de lectura

**Data:** 5 de juliol de 2026
**Origen:** revisió del web «Aula Maker 1r ESO» (https://tomeu-cd100.github.io/maker-1ESO-2627/) per traslladar-ne el patró de navegació a Robòtica 1r Batx. Disseny brainstormat i validat abans d'implementar.

## Context

El web Maker organitza la navegació superior **per audiència** (Inici · Les 9 SA · Docent · Alumnat · Famílies) amb pàgines d'aterratge (hubs) per a cada rol, i inclou una barra d'ajustos de lectura (mida de text, tipografia, veu). El web de Robòtica tenia un menú **per seccions** (8 entrades) i tota l'orientació concentrada en targetes de la portada.

## Decisions preses amb l'usuari

- **Adoptar** hubs Docent i Alumnat + barra d'accessibilitat.
- **Descartar** la pàgina de Famílies: a Batxillerat té menys pes que a 1r d'ESO.
- **Descartar** la lectura en veu alta (🔊): el punt feble de les veus TTS en català; s'evita per no oferir una funció desigual entre dispositius.
- Menú **reestructurat estil Maker** (no additiu): curt i per audiència. Cap URL de secció no canvia; s'hi arriba pels hubs, la portada i el cercador.

## Què s'ha implementat (tot a `web/_generador/generar.py` + assets)

### 1. Menú superior per audiència — `generar.py`
- Nova constant `TOPNAV_ITEMS`: `Inici · Les 9 SA (→classes) · Docent · Alumnat · Recursos`.
- `topnav_html()` reescrit per llegir-la; `data-sec` només per a les entrades que són seccions reals (perquè el cercador i l'estat actiu funcionin).
- Claus noves `docent`/`alumnat` (`HUB_KEYS`): no són seccions amb carpeta, són pàgines d'arrel com `guia-inici.html`.
- `sidebar_html()` retorna buit també per als hubs (no tenen sidebar de secció).

### 2. Hub Docent (`docent.html`) — `render_hub_docent()`
Orientació **per flux de treball real**, no per llista de seccions:
1. *Començo de nou* — guia d'inici → metodologia → seqüenciació.
2. *Setmana a setmana* — SA que toca → material transversal → simulacions.
3. *Avaluar* — rúbriques → proves per trimestre → full de qualificació.
4. *Referència completa* — targetes de totes les seccions.

### 3. Hub Alumnat (`alumnat.html`) — `render_hub_alumnat()`
To directe en segona persona: *Com s'avalua (sense sorpreses)* · *M'he encallat* (targetes de rescat + glossari) · *Practicar a casa* (simulacions + reptes) · graella de les 9 SA.

Els hubs són **portes d'entrada, no contingut**: tot el que enllacen ja existeix i ja s'indexa. URL resoltes dinàmicament amb el nou helper `hub_urls()`; graella de SA i targetes de secció extretes a `sa_grid_html()` i `sec_cards_html()` (abans duplicades dins de `render_home`).

### 4. Portada — `render_home()`
- CTA del hero: «Espai docent» i «🎓 Espai alumnat» (abans «Programació» i «Com s'avalua»).
- Targeta de ruta «Soc alumne/a» amb enllaç «Entra al teu espai →» al hub.
- Refactor: `render_home` ara reutilitza els helpers compartits.

### 5. Barra d'ajustos de lectura — `generar.py` + `estil.css` + `lloc.js`
- **A− / A+**: 5 graons (90–130 %), apliquen `data-mida` a l'arrel; el text base passa a `rem` (`--fs-base: 1.0625rem`) perquè cos i títols escalin junts.
- **Aa** (`font-toggle`): tipografia de lectura fàcil (`--ff-llegible`: Verdana/Trebuchet, interlletratge i interlineat més generosos), útil per a dislèxia. Pila de sistema, sense fonts externes. `aria-pressed` sincronitzat.
- Persistència a `localStorage` (`mida`, `font`) i bloc anti-parpelleig al `<head>` (mateix patró que el tema fosc), també al visor.
- Canvis anunciats per la regió `aria-live` existent (`anuncia()`).
- Responsiu: barra compactada en ≤560px; `font-toggle` amagat en ≤430px per prioritzar mida de text i tema.
- Accents propis per als hubs: Docent indi (com Programació), Alumnat cian (com Classes), amb variants clares AA en fosc.

## Verificació
- `node --check lloc.js`: OK. Balanç de claus `estil.css`: OK.
- Web regenerat sense errors: **126** pàgines de document + 17 de codi + 33 de simulació; **179** entrades a l'índex de cerca (hubs inclosos).
- Comprovat a l'HTML generat: menú nou amb estat actiu correcte a portada, hubs i pàgines niades; enllaços relatius als hubs correctes en profunditat 2 (`../../docent.html`); breadcrumb «Inici / Docent»; barra d'accessibilitat present a totes les pàgines (inclòs el visor).
- **Verificació visual al navegador no feta**: l'extensió de Chrome no estava connectada en aquesta sessió. Queda pendent una ullada a la interacció real dels botons A−/A+/Aa i a la maquetació dels hubs.
- **PDFs no regenerats**: el canvi és de navegació i UI, no de contingut d'activitats; els 39 PDF existents continuen sent vàlids.

## Pendent
- Ullada visual al navegador (botons d'accessibilitat + hubs en clar/fosc i mòbil).
- Valorar si es reincorpora la lectura en veu alta amb un avís clar quan no hi hagi veu en català.
