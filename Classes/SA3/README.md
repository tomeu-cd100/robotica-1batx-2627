# SA3 · Entrades i sensors: el robot percep

Tercera situació d'aprenentatge (**8 h · 4 sessions**, 1r trimestre). Fins ara el teu Arduino només **feia** coses (encendre llums, fer sons). Ara aprendrà a **notar** què passa al seu voltant: si prems un botó, quanta llum hi ha, si hi ha soroll… I al final, cuidaràs el teu **tamagotchi**: una mascota virtual que nota tot això. Programació oficial: [`Programació didàctica/12_SA3_Entrades_sensors.md`](../../Programació%20didàctica/12_SA3_Entrades_sensors.md).

En acabar aquesta SA podràs: 1) llegir polsadors (amb antirebot) i sensors analògics (de 0 a 1023) i decidir amb llindars; 2) calibrar i depurar amb el Monitor sèrie i el multímetre; 3) escriure funcions pròpies que retornen un valor.

> 💻 **Com carregar el codi d'una pràctica:** dins de la pràctica, al pas «Carrega el codi», prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi havia) i prem **→ Puja**.
>
> 🖥️ **El Monitor sèrie** és la finestra on l'Arduino t'escriu el que llegeix. A l'Arduino IDE: **Eines → Monitor sèrie**, i a baix a la dreta tria **9600**.

## 🧭 La teva ruta

Fes les pràctiques **en ordre i al teu ritme**. Cada pràctica acaba enviant el seu formulari de Classroom. Les 🚩 et diuen on hauries de ser al final de cada sessió.

- ① [Pràctica 1 · El polsador](codi/01_polsador_debounce/EXPLICACIO.md) — l'Arduino nota quan prems un botó i t'ho escriu al Monitor sèrie.

🚩 **Final de la Sessió 1:** hauries d'haver enviat el formulari de la ①.

- ② [Pràctica 2 · Potenciòmetre i sensor de llum](codi/02_potenciometre_ldr/EXPLICACIO.md) — sensors amb molts valors, el **Racó de mesura** i un llum automàtic.

🚩 **Final de la Sessió 2:** hauries d'haver enviat el formulari de la ②. Per a la sessió següent, pensa un **nom** i un **caràcter** per al teu tamagotchi.

- ③ [Pràctica 3 · La pantalla OLED](codi/03_pantalla_oled/EXPLICACIO.md) — text, una barra i una cara que canvia amb la llum. Comença la Sessió 3 amb el **mini-check** en paper (10', no compta per a nota).
- ④ [Pràctica 4 · El teu tamagotchi](codi/05_mascota/EXPLICACIO.md) — el producte: necessitats que baixen, botons per cuidar-lo i sensors que l'afecten; i el **full resum** per a la prova.

🚩 **Final de la Sessió 3:** formularis de la ③ i de la ④ enviats, **Entrega final** feta i el full resum guardat.

## 🏁 Entrega final

**Quan hagis acabat la ④:**

1. 🎤 **Defensa d'1 minut** davant del docent: presenta el teu tamagotchi: què fa cada botó i com l'afecten els sensors (es corregeix amb la [rúbrica del robot](../00_General/00_Projecte_T1_Mascota.md)).
2. 📤 Respon i envia l'[Entrega final de la SA3](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDAxOTcyNzcy/details): autoavaluació i checklist final.

> ✅ **Versió nucli** (per aprovar n'hi ha prou amb): un tamagotchi amb **2 necessitats** (gana i felicitat), **2 botons** i **1 sensor**, que es posa trist quan no el cuides.

## 📝 Sessió 4 · Prova pràctica T1

**Prova individual** de tota la sessió: muntaràs i programaràs tu sol un circuit amb un sensor i un llum. Pots consultar el **full resum en paper** que vas omplir a la Pràctica 4 (pas «Omple el full resum») i els **esquemes de connexions**.

Per preparar-la: repassa les pràctiques ①, ② i ③ i fes el [qüestionari de conceptes](SA3_questionari_conceptes.md).

## 📦 Què has d'entregar

| Quan | Què | On |
|---|---|---|
| S1 | Formulari de la Pràctica 1 | Una tasca de Classroom per pràctica (enllaç a l'últim pas de cada pràctica) |
| S2 | Formulari de la Pràctica 2 | La tasca de Classroom de la pràctica |
| S3 | Formularis de les Pràctiques 3 i 4 + **el tamagotchi** i defensa d'1' + **Entrega final** | A l'aula i a Classroom. Es corregeix amb la [rúbrica del robot](../00_General/00_Projecte_T1_Mascota.md) |
| S4 | **Prova pràctica T1** (individual), amb el teu full resum | A l'aula, tota la sessió |
| ⭐ | Un repte (opcional) | El docent el valida al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 🤖 | El **tamagotchi**: és el producte d'aquesta SA i el robot del trimestre | [Dossier del tamagotchi](../00_General/00_Projecte_T1_Mascota.md) |

> 📓 El **quadern tècnic** (25 %) són les preguntes de reflexió de cada formulari de pràctica: no cal cap full a part.

## 📚 Per repassar a casa

- [Reptes de la SA3](../../Reptes/Reptes_SA3.md) ⭐ — tria el teu context.
- [Exemple resolt](SA3_exemple_resolt.md) · [Dibuix del programa del llum automàtic](SA3_diagrama_flux.md) · [Qüestionari de conceptes](SA3_questionari_conceptes.md)
- [Fitxa base](SA3_fitxa_alumnat.md) — què aprendràs, com s'avalua i què fer si alguna cosa no funciona.
- [Fitxa ampliada](SA3_fitxa_ampliada.md) — més activitats.
- [Esquemes de connexions](SA3_esquemes_connexions.md) — tots els circuits de la SA en un sol lloc.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA3_guia_docent.md`](SA3_guia_docent.md) | Guia del professorat: xuleta de sessió (a dalt), 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA3_fitxa_alumnat.md`](SA3_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): objectius, avaluació i DEPURA (les preguntes són als formularis de pràctica). |
| [`SA3_fitxa_ampliada.md`](SA3_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (ajuda entre iguals, revisió creuada, exit ticket, ODS, PC) i ampliacions. |
| [`SA3_checklist_docent.md`](SA3_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA3_checklist_alumnat.md`](SA3_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA3_esquemes_connexions.md`](SA3_esquemes_connexions.md) | Esquemes i connexions (polsador, divisor de tensió, pantalla OLED, tamagotchi). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

> 🗄️ Els **katas** d'aquesta SA estan arxivats (18-10-2026) a [`docs/arxiu/SA3_katas/`](../../docs/arxiu/SA3_katas/README.md).

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_polsador_debounce.ino` | Entrada digital amb `INPUT_PULLUP` i antirebot; comptador per sèrie. |
| `02_potenciometre_ldr.ino` | Entrades analògiques (`analogRead`), `map()` i llum automàtic. |
| `03_pantalla_oled.ino` | Pantalla OLED amb U8g2 (mode pàgina): text, barra i cara segons la llum. |
| `05_mascota.ino` | **Producte:** l'esquelet del tamagotchi (Pràctica 4), amb els `// TODO` dels botons, els sensors i els estats. |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és a l'`EXPLICACIO.md` de la carpeta del sketch.

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** **el tamagotchi** del trimestre: necessitats (gana, son, felicitat) que baixen amb el temps i amb els sensors, 3 botons per cuidar-lo i estats contenta, trista i malalta (mai no es mor), dins de la carcassa en forma d'ou fabricada a la SA2. **Es tanca a la S3.**
- **Prova T1:** la S4 sencera, individual (`Avaluació/Prova_practica_T1.md`).
- **Criteris:** CA1.1, CA2.1, CA2.2 · **Rúbriques:** la del robot (dossier del tamagotchi) per al producte; R1, R2 i R4 per a la prova.

## Continuïtat

Ve de la **SA2** (sortides i actuadors) i porta a la **SA4** (moviment): un cop el sistema **percep** (sensors), farem que la percepció **mogui** servos i motors.
