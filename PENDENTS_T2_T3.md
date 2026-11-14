# Pendents del T2 (braç MeArm) i del T3 (rover)

Estat a 14-11-2026. Llista de feina per continuar des de qualsevol ordinador
(`git pull` i obrir aquest fitxer). Ordenat per quan toca. **Tot el que queda és
feina del docent**: Claude ja ha fet la part automatitzable.

## Ja fet (no cal tornar-hi)

- **SA4-SA9 en format de passos autònoms:** cada pràctica és una pàgina de passos
  amb pregunta guia (❓), un formulari de Classroom (33 punts) i una tasca **Foto**
  (sense nota). Cada SA té una **Entrega final** (sense nota). La SA9 té una
  pràctica per fase del projecte (Idear, Prototipar, Provar, Comunicar).
- **Classroom:** 30 tasques de formulari (pràctiques + Entregues finals de SA4-SA9)
  i 24 tasques Foto, **totes en esborrany (DRAFT)** i dins el tema de cada SA.
  Les pàgines de pràctica ja hi enllacen.
- **Web del T2 i el T3 en format «atles»:** panell de plànol a l'esquerra (el braç
  al T2, el rover al T3) amb «Ets aquí» i l'índex de la SA; a les pràctiques, el
  plànol mostra l'esquema o el codi del pas que es llegeix.
- **Katas arxivats** (SA2-SA8) a `docs/arxiu/SAn_katas/`, com a material d'ampliació
  per a alumnat avançat.
- Revisió final del T2 i del T3 feta (14-11-2026). Els sketches de la SA7, adaptats
  al rover seguint els passos, compilen per a UNO.
- 12 projectes Wokwi dels reptes del braç publicats (`Simulacions/Wokwi/Reptes/README.md`).

## 1. Quan arribi cada SA (Classroom, a mà)

1. **Publicar** les tasques del tema de la SA: les pràctiques, les **Foto** i
   l'**Entrega final**. Es poden programar per sessió.
2. En publicar-les, **posar-los la categoria de nota a mà**: **T2** a SA4-SA6 i
   **T3** a SA7-SA9. Classroom ignora la categoria mentre són DRAFT.
3. Comprovar els punts després d'editar qualsevol tasca: formularis de pràctica a
   **33**, Foto i Entrega final **sense nota**. L'editor de Classroom pot arrossegar
   els punts de la darrera tasca editada.
4. **Tasques velles:** les «Fitxa base» de SA4-SA9 (un sol formulari per SA) ja no
   es fan servir. Esborrar-les quan es vulgui.
5. **Qüestionaris de conceptes** (SA4-SA6, i els del T3 si es fan servir): el Form
   està adjuntat com a **enllaç** i surt com «Google Forms: Sign-in», de manera que
   Classroom **no** en pot importar les notes. Per a cada tasca: editar → treure
   l'adjunt «Google Forms: Sign-in» → *Afegeix* → *Google Drive* → cercar el Form pel
   títol → *Desa*. L'API no ho permet (provat el 30-10-2026). Formularis del T2:
   - SA4: https://docs.google.com/forms/d/14s0ef-qqsXAQkhYp1Lbd54w5kDyBxQeWMVt-SzKKNic/edit
   - SA5: https://docs.google.com/forms/d/1yzca9PwJeEtMu9Wq9CqYzbN7n63mJ_HLdbclJk2SLgE/edit
   - SA6: https://docs.google.com/forms/d/1L88Nh-SFG0f2Eq6dso6gWA9RkOWS2ylzZiEB6bAuL54/edit
6. Un cop publicats els qüestionaris, demanar a Claude: «posa els enllaços de les
   tasques als qüestionaris» (ara `SAn_questionari_conceptes.md` enllaça a la
   pàgina del curs).

## 2. A l'aula

- **Chromebooks:** comprovar que, a les pràctiques del T2 i el T3, el plànol amb
  l'esquema o el codi surt a l'esquerra. Només apareix amb la finestra a **1100 px**
  o més (pantalla completa i sense zoom). Si no hi arriba, demanar a Claude que
  baixi el límit (`assets/css/atles.css` i `assets/js/atles.js`).
- **Sessió 0 del T3 (muntatge del rover):** provar amb el rover real el **sentit de
  gir** de cada motor (si un va al revés, intercanviar-ne els cables al L298N) i
  anotar els valors «línia» i «fons» dels seguidors per fixar `LLINDAR_LINIA`.

## 3. Maquinari real (taller)

- **MeArm:** muntar un prototip i verificar els rangs segurs dels servos
  (base 0-180, esquerre/dret 40-150, pinça 60-120); ajustar les constants si cal.
- **Pont micro:bit → Arduino (D0):** comprovar que l'UNO llegeix bé els 3,3 V de la
  micro:bit i que el xip USB (16U2, a 5 V) no interfereix quan l'USB està connectat.
- **Signe de la inclinació:** inclinar la micro:bit enrere ha de donar `D+`.
- **Sensor de col·lisió KS0021 com a final de carrera** de la base (D2, LOW = toca).

## 4. Compres

- Material del braç per a tots els equips (MeArm, 2 MG90S + servo base + KS0194 pinça,
  portapiles 4×AA, sensors). Revisar llista i pressupost al dossier del projecte T2.
- Material del rover: llista de peces al dossier del projecte T3.

## Idees (opcional)

- **Plànol del T1** amb el tamagotchi, perquè tot el curs tingui el format «atles»:
  caldria un `web/_generador/generador/atles_t1.py` amb el dibuix i els capítols.

## Annex: configurar el Classroom en un altre ordinador

Els secrets **no** són al repositori (i no s'hi han de pujar mai).

1. `cd "Material Classroom"` i `npm install googleapis @google-cloud/local-auth`
   (cal un `package.json` local amb `{"type":"module"}`).
2. Google Cloud Console (compte del centre) → *APIs i serveis* → *Credencials* →
   *ID de client d'OAuth* (aplicació d'escriptori) → descarregar el JSON com a
   `Material Classroom/credentials.json`. Les APIs Classroom, Forms i Drive han d'estar activades.
3. Executar `node crear_mearm_classroom.js` (mode consulta): obre el navegador, entrar amb
   el compte del centre i acceptar; es crea `token.json`. Si la primera vegada surt
   «Login Required», tornar-lo a executar.
4. Els resultats de les tasques creades (URL de cada formulari i de cada tasca Foto)
   són a `resultats_forms_practiques.json` i `resultats_tasques_foto.json`. No són al
   repositori: si cal refer-los en un altre ordinador, els scripts `crear_forms_practiques.mjs`
   i `crear_tasques_foto.mjs` són idempotents (no dupliquen tasques).
