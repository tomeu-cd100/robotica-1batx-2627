# SA0 · Guia de la via Chromebook (Arduino Web Editor)

> **Per a què serveix.** Al centre treballem amb **plataforma mixta**: pots programar
> l'Arduino amb l'**Arduino IDE d'escriptori** (vegeu `SA0_guia_programacio.md`, part A0)
> **o** amb el **web editor** des d'un **Chromebook**. Aquesta guia cobreix la via
> Chromebook. Els conceptes de programació són **idèntics** en tots dos entorns; només
> canvia l'eina des d'on escrius i carregues.

---

## 1. Què és l'Arduino Web Editor

És l'**IDE d'Arduino que funciona dins el navegador** (`create.arduino.cc/editor`).
No cal instal·lar el programa: escrius, verifiques i carregues el codi des del web,
i els *sketches* es desen al teu compte al núvol (**Arduino Cloud**).

| | Arduino IDE (escriptori) | Web Editor (Chromebook) |
|---|---|---|
| On s'executa | Programa instal·lat al PC | Dins el navegador (Chrome) |
| Sketches | Fitxers locals a l'ordinador | Al núvol (compte Arduino) |
| Connexió a la placa | Directa (driver del sistema) | A través d'un **connector/agent** o l'**app** |
| Requereix compte | No | **Sí** (compte Arduino) |

---

## 2. Posada en marxa (una sola vegada)

1. **Crea o entra amb un compte Arduino** a `arduino.cc` (login).
   > ⚠️ Segueix les indicacions del centre sobre **quin compte** feu servir (educatiu o
   > personal). No comparteixis contrasenyes.
2. **Instal·la el component per connectar la placa** al Chromebook:
   - **App «Arduino» per a Chromebooks** (des de Google Play, si el Chromebook ho permet), **o**
   - el **connector/plugin** que indiqui l'Arduino Web Editor la primera vegada que
     connectis una placa (segueix l'assistent que apareix a pantalla).
3. **Connecta l'Arduino UNO** amb el cable **USB**. Accepta els permisos que demani el
   navegador o l'app per accedir al port USB.

> 💡 Si el centre gestiona els Chromebooks, pot ser que l'extensió/app ja estigui
> instal·lada per l'administrador. En aquest cas només cal iniciar sessió i connectar la placa.

---

## 3. Flux de treball (cada sessió)

És el **mateix** que a l'IDE, amb els mateixos botons:

1. **Obre** el web editor i tria o crea un *sketch*.
2. **Selecciona la placa i el port:** al desplegable de dalt, tria **Arduino UNO** i el
   **port** on està connectada.
3. **Escrius** el codi (`setup()` / `loop()`, igual que sempre).
4. **Verifica** (✔): comprova que no hi hagi errors (compila).
5. **Carrega** (→): envia el programa a la placa per l'USB.
6. La placa **executa** el programa (queda gravat encara que la desconnectis).

> 📌 Els botons **Verifica (✔)** i **Carrega (→)** fan exactament el mateix que a l'IDE
> d'escriptori descrit a `SA0_guia_programacio.md` (A0).

---

## 4. Alternativa sense placa: simuladors

Si no tens la placa o vols provar abans de muntar, pots fer servir els **simuladors**
del navegador (funcionen igual de bé al Chromebook):

- **Tinkercad Circuits** (`tinkercad.com`) — munta el circuit i programa'l en blocs o en text.
- **Wokwi** (`wokwi.com`) — simulació d'Arduino/ESP32 i micro:bit, ideal per compartir
  projectes amb un enllaç. (Vegeu la carpeta `Simulacions/Wokwi/`.)

---

## 5. Problemes freqüents (Chromebook)

| Símptoma | Causa probable | Solució |
|---|---|---|
| No apareix el **port** de la placa | Connector/app no instal·lat o sense permisos | Reinstal·la el connector; accepta els permisos USB |
| "Board not found" en carregar | Placa o port mal seleccionats | Tria **Arduino UNO** i el port correcte al desplegable |
| No entra al web editor | Sessió del compte Arduino caducada | Torna a iniciar sessió a `arduino.cc` |
| El cable connecta però no carrega | Cable **només d'alimentació** (sense dades) | Fes servir un cable USB **de dades** |
| El LED no s'encén | Polaritat, sense resistència, pin equivocat | Revisa muntatge i el número de pin del codi |

---

## 6. Quan faig servir cada via?

- **Chromebook + Web Editor:** aules amb Chromebooks; treball al núvol; compartir fàcil.
- **PC + Arduino IDE:** aules amb ordinadors; treball offline; llibreries locals.

> **Recorda:** triïs la via que triïs, **el codi és el mateix**. Aprens a programar, no
> a fer servir una eina concreta. → Els conceptes, a `SA0_guia_programacio.md`.

---

*Guia de la via Chromebook (plataforma mixta). Complementa `SA0_guia_programacio.md`
(flux amb Arduino IDE d'escriptori). Llicència CC BY-SA 4.0.*
