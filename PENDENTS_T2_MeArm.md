# Pendents del T2 (braç MeArm)

Estat a 30-10-2026. Llista de feina per continuar des de qualsevol ordinador
(`git pull` i obrir aquest fitxer). Ordenat per prioritat. **Tot el que queda
(seccions 1-5) és feina del docent**: Claude ja ha fet la part automatitzable.

## Ja fet (no cal tornar-hi)

- Tema **MeArm** al Classroom amb 9 elements en **esborrany**: dossier, guia de muntatge,
  fitxes base SA4/SA5/SA6 (/10), qüestionaris de conceptes SA4/SA5/SA6 (/10) i
  **Producte T2 · El braç robòtic MeArm 🦾** (/33). Totes les tasques a la categoria **T2**.
- Rúbrica del Producte T2 importada a la tasca (4 criteris · 16 punts).
- Descripció del Producte T2 sense l'enllaç de la rúbrica (tret per l'API el 30-10-2026).
- Verificat per l'API (30-10-2026): les 7 tasques són a la categoria **T2**; fitxes i
  qüestionaris a /10 i Producte a /33. Cal tornar-ho a mirar només si s'edita a mà.
- 12 projectes Wokwi dels reptes del braç publicats, amb `libraries.txt` (Servo):
  tots compilen i s'executen. Enllaços a `Simulacions/Wokwi/Reptes/README.md`.

## 1. Abans de publicar res al Classroom (docent, a mà)

1. **Producte T2: punts de la tasca (33) vs rúbrica (16).** Decidir: o es deixa la tasca a
   /33 i es posa la nota a mà, o es canvia la tasca a /16 perquè la rúbrica la calculi sola.
2. **Qüestionaris i fitxes: el Form està adjuntat com a enllaç, no com a formulari.**
   Surt com «Google Forms: Sign-in» i Classroom **no** en pot importar les notes.
   Per a cada una de les 6 tasques (fitxes base i qüestionaris SA4-SA6):
   editar → treure l'adjunt «Google Forms: Sign-in» (X) → *Afegeix* → *Google Drive* →
   cercar el Form pel títol de la tasca (és a la carpeta del curs) → *Desa l'esborrany*.
   L'API de Classroom no permet fer-ho per script. Formularis dels qüestionaris (per editar-los):
   - SA4: https://docs.google.com/forms/d/14s0ef-qqsXAQkhYp1Lbd54w5kDyBxQeWMVt-SzKKNic/edit
   - SA5: https://docs.google.com/forms/d/1yzca9PwJeEtMu9Wq9CqYzbN7n63mJ_HLdbclJk2SLgE/edit
   - SA6: https://docs.google.com/forms/d/1L88Nh-SFG0f2Eq6dso6gWA9RkOWS2ylzZiEB6bAuL54/edit
   A les fitxes base, treure **només** l'adjunt «Google Forms: Sign-in»: l'altre enllaç
   (la fitxa de la web) s'hi ha de quedar.
3. Després d'editar, **comprovar els punts** (fitxes i qüestionaris han de ser /10):
   l'editor del Classroom pot arrossegar els punts de la darrera tasca editada.

## 2. Publicar (docent, quan toqui cada SA)

- Publicar o programar cada tasca des del Classroom (*Treball de classe* → tema MeArm).
- Després, **posar els enllaços reals de les tasques als qüestionaris**: ara
  `Classes/SA4|SA5|SA6/SAn_questionari_conceptes.md` (i `_solucions.md`) enllacen a
  la pàgina del curs. Demanar-ho a Claude: «posa els enllaços de les tasques MeArm als
  qüestionaris» (necessita el Classroom configurat en aquell ordinador, vegeu l'annex).

## 3. Wokwi (opcional)

- Provar a mà la interacció d'algun projecte: girar potenciòmetres, prémer polsadors,
  canviar la distància de l'ultrasons (clic sobre el sensor). Compilació i arrencada ja
  verificades.
- A `SA6_B_homing_*` el sensor de col·lisió és un polsador vermell: cal prémer-lo durant
  el *homing* o el programa diu «No he trobat el final de carrera».

## 4. Maquinari real (taller)

- Muntar un **prototip del MeArm** i verificar els rangs segurs dels servos
  (base 0-180, esquerre/dret 40-150, pinça 60-120) i ajustar les constants si cal.
- **Pont micro:bit → Arduino (D0):** comprovar que el UNO llegeix bé els 3,3 V de la
  micro:bit i que el xip USB (16U2, a 5 V) no interfereix quan l'USB està connectat.
- **Signe de la inclinació:** inclinar la micro:bit enrere ha de donar `D+`.
- **Sensor de col·lisió KS0021 com a final de carrera** de la base (D2, LOW = toca).

## 5. Compres

- Material del braç per a tots els equips (MeArm, 2 MG90S + servo base + KS0194 pinça,
  portapiles 4×AA, sensors). Revisar llista i pressupost al dossier del projecte T2.

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
