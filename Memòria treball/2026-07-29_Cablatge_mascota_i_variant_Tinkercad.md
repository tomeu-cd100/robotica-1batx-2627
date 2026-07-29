# Memòria de treball — 29-07-2026 · Cablatge de la mascota i variant Tinkercad

## Què s'ha fet (4 commits: cce89c7, 0ded3c7, f3926a4, 54e157f)

1. **Solucionari T1, secció de la mascota** (detectat pel docent: no deia on
   es connectava res):
   - Subsecció «Pins i cablatge» amb el bloc `const int PIN_...` del sketch i
     enllaç a l'ancoratge `#cablatge` del dossier.
   - Avís que els blocs de la pàgina són extractes (enganxats solts donen
     `'...' was not declared`): compilar sempre el fitxer complet.
   - Desplegable «El fitxer complet» amb `T1_mascota.ino` sencer, com a les
     pàgines de pràctica.
2. **Dossier de la mascota (vista alumnat)**:
   - Apartat «Cablatge» ampliat: carrils d'alimentació de la breadboard,
     taula (ara «Pin de senyal») i bloc «Com es connecta cada component»
     (mòduls de 3 pins amb avís de serigrafia, NeoPixel, LED RGB i polsador
     enllaçats als esquemes de SA2/SA3, brunzidor, DHT11 mòdul vs 4 potes).
   - Secció nova «Simular la mascota a Tinkercad»: substitucions
     potenciòmetre→micròfon (A0), LDR→TEMT6000 (A1), DHT11 fora; avís
     d'enganxar el programa sencer; avís del defecte dels `enum`.
3. **Variant `T1_mascota_tinkercad.ino`** (`Classes/Solucionari/codi/`):
   Tinkercad NO compila el sketch original per dos defectes seus:
   - El preprocessador insereix els prototips **abans** de les definicions de
     tipus → `void canviaEmocio(Emocio nova)` peta amb «'Emocio' was not
     declared». Solució a la variant: estats amb `const int` i paràmetre `int`.
   - No té la llibreria `DHT` (ni el component DHT11).
   Compilada en local amb `arduino:avr:uno` (20% flash); el CI ja escaneja la
   carpeta i la compila.
4. **QA check #15 «Codi incrustat»** (`tools/qa.py`): cada desplegable
   «Desplega el codi complet (`fitxer`…)» dels `.md` del solucionari ha de
   ser còpia exacta del `.ino` de `Classes/Solucionari/codi/` (error si
   divergeixen). Provat amb mutació: detecta un sol caràcter canviat.

## Cosa a recordar

- El codi de la mascota ara viu a **tres llocs**: `T1_mascota.ino` (font, CI),
  el desplegable del solucionari (vigilat pel QA #15) i la variant Tinkercad
  (NO vigilada pel QA #15 perquè no té desplegable — sincronitzar a mà si es
  toca el sketch).
- El defecte dels `enum` a Tinkercad afectarà també el codi propi de
  l'alumnat: avís publicat al dossier.

## Sessió 2 (vespre): esquelet per a l'alumnat + prova real a Tinkercad

- **Esquelet amb TODOs al dossier** (secció «🧗 Si t'encalles», desplegable):
  estructura completa (pins, `const int`, setup/loop, funcions SA2) amb DHT
  marcat `[DHT]`; la feina avaluada (reaccions 2-3, carícia, personalitat)
  queda com a TODO amb un exemple resolt per funció. Compilat abans de
  publicar. El `<summary>` diu «Desplega l'esquelet» expressament perquè el
  QA #15 no l'intenti sincronitzar amb cap .ino.
- **El docent va muntar la mascota a Tinkercad de debò** (depuració guiada
  per captures). Trampes reals trobades, documentades a la secció nova
  «Trampes de simulació» del dossier:
  A0≠pin 0 (sensors a TX/RX → lectures a l'aire + Monitor Sèrie mort →
  melodia contínua per oscil·lació d'estats), ordre del divisor (pot i LDR
  invertits), valor de resistència per defecte d'1 kΩ (llum max 134 < llindar
  150), polsador en diagonal, PIR amb Signal/Power intercanviats (tooltips,
  no colors) + PIR binari (no mesura distància).
- **«Secret» documentat**: dormida a les fosques, el PIR no la desperta
  (prioritat soroll > foscor > presència amb `return`); el soroll sí.
  Publicat com a nota 🤫 al dossier: decisió pedagògica sobre l'ordre de
  les regles.

## Pendents que continuen oberts

- Els de [[project-pendents-oberts]] (maquinari real al setembre, tall i
  impressió de prova, reclonar altres màquines).
- T2 (braç) i T3 (rover): quan tinguin desplegable de codi complet al seu
  solucionari, el QA #15 els vigilarà automàticament (mateix patró de
  `<summary>`).
