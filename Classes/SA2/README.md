# SA2 · Sortides digitals i PWM (*Pulse Width Modulation*): dona vida als actuadors

Segona situació d'aprenentatge (**8 h · 4 sessions**, 1r trimestre). Passem d'encendre un LED (SA1) a **controlar diverses sortides i regular-ne la intensitat amb PWM**: semàfor, llum que «respira», LED RGB i, al final, un panell de senyalització amb so. Programació oficial: [`Programació didàctica/11_SA2_Sortides_digitals_PWM.md`](../../Programació%20didàctica/11_SA2_Sortides_digitals_PWM.md).

> 🧭 **Com treballes a la SA2 (3 regles):**
>
> 1. Obre **només la sessió d'avui** (aquí sota) i fes els passos **en ordre**. No cal mirar res més.
> 2. Cada pas té **un sol enllaç**: obre'l, fes el que diu i torna aquí.
> 3. Les respostes van a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details)** (una sola tasca per a tota la SA). Si un pas diu ✍️, toca escriure-hi.

## Itinerari per sessions

<details markdown="1" class="sessio">
<summary><strong>Sessió 1</strong> · Prova SA1 + el primer LED amb variables</summary>

1. 📝 **Prova SA1** (50', en paper). Quan l'entreguis, el docent et dona el kit.
2. 🔌 **Munta** un LED al pin 8 amb una resistència de 220 Ω → [esquemes, apartat 1](SA2_esquemes_connexions.md). Pota llarga del LED = +.
3. 🔮 Obre la **[Pràctica 1](codi/01_led_basic/EXPLICACIO.md)**. Llegeix el codi i ✍️ **prediu** què farà el LED (Classroom, Activitat 1).
4. ▶️ **Carrega** el codi a la placa. Ha passat el que havies predit?
5. 🔧 **Canvia** el valor de la variable `temps` i torna a carregar. ✍️ Apunta el valor provat.
6. 📓 **Quadern:** dibuixa l'esquema i apunta un error que hagis tingut.

**Si acabes abans:** ✍️ el codi Morse d'una lletra (Activitat 1, repte).

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 2</strong> · El semàfor</summary>

1. 🔌 **Munta** 3 LED: vermell al pin 8, groc al 9 i verd al 10, **cadascun amb la seva resistència** → [esquemes, apartat 2](SA2_esquemes_connexions.md).
2. 🔮 Obre la **[Pràctica 2](codi/02_semafor/EXPLICACIO.md)**: prediu l'ordre de les llums, carrega el codi i ✍️ apunta la durada de cada fase (Activitat 2).
3. 🔁 Obre la **[Pràctica 2b](codi/02b_semafor_switch/EXPLICACIO.md)**: el mateix semàfor amb `switch`. Esborra un `break`, prova-ho i ✍️ explica què passa.
4. ⭐ **Repte:** afegeix una **fase nocturna** (groc intermitent) com a fase nova del `switch`. ✍️ Enganxa el codi.
5. 📓 **Quadern:** l'esquema dels 3 LED i un error resolt.

**T'has encallat al pas 2?** A la Pràctica 2 hi ha la secció **🧗 Si t'encalles**, amb un esquelet a mig fer.

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 3</strong> · PWM: la llum que respira i els colors</summary>

1. 🔌 **Munta** un LED al **pin 9** (té el símbol `~`: és un pin PWM) → [esquemes, apartat 3](SA2_esquemes_connexions.md).
2. 🔮 Obre la **[Pràctica 3](codi/03_fade_pwm/EXPLICACIO.md)**: carrega el *fade* i ✍️ apunta el rang d'`analogWrite` (de ___ a ___).
3. 🔌 **Canvia el muntatge** pel LED RGB (pins 9, 10 i 11; pota llarga a GND) → [esquemes, apartat 4](SA2_esquemes_connexions.md).
4. 🎨 Obre la **[Pràctica 4](codi/04_rgb/EXPLICACIO.md)**: crea 3 colors teus i ✍️ apunta'n els valors (R, G, B).
5. 📓 **Quadern:** la taula de colors que has provat.

**Si acabes abans:** ⭐ una transició suau entre dos colors (Activitat 3, repte).

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 4</strong> · El producte: panell de senyalització</summary>

1. 🧠 **Mini-check** (10', en paper, **no compta per a nota**): escriu de memòria un Blink.
2. ✍️ **Dissenya abans de programar:** omple la taula dels estats (color · so · relé) de l'Activitat 4.
3. 🔌 **Munta** el RGB + el brunzidor (piezo) + el relé → [esquemes, apartat 5](SA2_esquemes_connexions.md).
4. 💻 Parteix de la **[Pràctica 5](codi/05_panell_senyalitzacio/EXPLICACIO.md)** i adapta-la als teus estats. **Mínim:** 2 estats ben diferents (color + so). **Complet:** 3 estats + relé.
5. ✅ Repassa **[el meu checklist](SA2_checklist_alumnat.md)** i entrega a Classroom.
6. 🎤 **Defensa d'1 minut:** què fa el teu panell i una millora possible.

</details>

### Si vols més (opcional)

- [Reptes de la SA2](../../Reptes/Reptes_SA2.md) ⭐ — tria el teu context.
- [Exemple resolt](SA2_exemple_resolt.md) · [Diagrama de flux del *fade*](SA2_diagrama_flux.md) · [Qüestionari de conceptes](SA2_questionari_conceptes.md) — per repassar a casa.
- [Fitxa base](SA2_fitxa_alumnat.md) — objectius, com s'avalua i la rutina DEPURA quan alguna cosa no funciona.
- [Fitxa ampliada](SA2_fitxa_ampliada.md) — aprofundiment.

## 📦 Què has d'entregar

| Quan | Què | On |
|---|---|---|
| S1 | Respostes ✍️ de la Sessió 1 (Activitat 1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) (una sola tasca per a tota la SA) |
| S2 | Respostes ✍️ de la Sessió 2 (Activitat 2) | Mateixa tasca de Classroom |
| S3 | Respostes ✍️ de la Sessió 3 (Activitat 3) | Mateixa tasca de Classroom |
| S4 | **Panell de senyalització** + defensa d'1' (Activitat 4) | A l'aula i a la mateixa tasca. S'avalua amb **R1** (codi) i **R2** (circuit) |
| 📓 | El full del **quadern tècnic** de cada sessió | En paper, en acabar la sessió |
| ⭐ | Un repte (opcional) | El docent el valida al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 🤖 | Els colors, llums i sons que programis: són les «expressions» de la teva **mascota** | Guarda el codi: el reaprofitaràs al [robot del trimestre](../00_General/00_Projecte_T1_Mascota.md) |

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA2_guia_docent.md`](SA2_guia_docent.md) | Guia del professorat: xuleta de sessió (a dalt), 4 sessions, mapa d'avaluació i errors freqüents. |
| [`SA2_fitxa_alumnat.md`](SA2_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA2_fitxa_ampliada.md`](SA2_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (ajuda entre iguals, revisió creuada, exit ticket, ODS, PC) i ampliacions. |
| [`SA2_checklist_docent.md`](SA2_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA2_checklist_alumnat.md`](SA2_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA2_esquemes_connexions.md`](SA2_esquemes_connexions.md) | Esquemes i connexions de tots els circuits (LED, semàfor, fade, RGB, panell). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

> 🗄️ Els **katas** d'aquesta SA estan arxivats (18-10-2026) a [`docs/arxiu/SA2_katas/`](../../docs/arxiu/SA2_katas/README.md): l'alumnat no hi arribava i es van treure de l'itinerari per simplificar-lo.

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_led_basic.ino` | Sortida digital amb constants i variables. |
| `02_semafor.ino` | Estructures de control (`for`, `if`) i temporització (amb esquelet «Si t'encalles» a la seva pàgina). |
| `02b_semafor_switch.ino` | El mateix semàfor amb `switch` sobre una variable de fase (llavor de la SA6). |
| `03_fade_pwm.ino` | PWM amb `analogWrite` i funció `map()`. |
| `04_rgb.ino` | Barreja de colors amb LED RGB. |
| `05_panell_senyalitzacio.ino` | Producte: RGB (estat) + piezo (avís) + relé (càrrega). |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és a l'`EXPLICACIO.md` de la carpeta del sketch.

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** dispositiu de senyalització programable (semàfor amb fase nocturna o panell d'estat RGB + so + càrrega).
- **Criteris:** CA1.1, CA2.1, CA2.2 · **Rúbriques:** **R1** (codi) i **R2** (circuit).

## Continuïtat

Ve de la **SA1** (parpelleig d'un LED) i porta a la **SA3** (entrades i sensors): després de fer que el sistema **actuï**, farem que **percebi** l'entorn.
