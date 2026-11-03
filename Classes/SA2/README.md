# SA2 · Sortides digitals i PWM (*Pulse Width Modulation*): dona vida als actuadors

Segona situació d'aprenentatge (**6 h · 3 sessions**, 1r trimestre). Passem d'encendre un LED (SA1) a **controlar diverses sortides i regular-ne la intensitat amb PWM**: semàfor, llum que «respira», LED RGB i, al final, un panell de senyalització amb so. Programació oficial: [`Programació didàctica/11_SA2_Sortides_digitals_PWM.md`](../../Programació%20didàctica/11_SA2_Sortides_digitals_PWM.md).

> 📝 **Abans de començar la SA2** hi ha una **sessió de marge**: la primera hora és l'**examen de la SA1** (en paper, sense apunts: entra l'entrada-procés-sortida, la placa, la seguretat i el `Blink`; per repassar-ho, fes el [qüestionari de conceptes de la SA1](../SA1/SA1_questionari_conceptes.md)). La resta de l'estona és per acabar el que tinguis pendent de la SA1.

En acabar aquesta SA podràs: 1) fer programes amb variables, `if`, `switch` i `for` que controlin llums i so; 2) graduar la intensitat i el color amb PWM (`analogWrite`, de 0 a 255, pins `~`); 3) muntar circuits correctes (resistència, polaritat) i mesurar-hi tensions amb el multímetre.

> 💻 **Com carregar el codi d'una pràctica:** dins de la pràctica, al pas «Carrega el codi», prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi havia) i prem **→ Puja**.

## 🧭 La teva ruta

Fes les pràctiques **en ordre i al teu ritme**. Cada pràctica acaba enviant el seu formulari de Classroom. Les 🚩 et diuen on hauries de ser al final de cada sessió.

- ① [Pràctica 2 · El semàfor](codi/02_semafor/EXPLICACIO.md) — munta 3 LED (vermell al 8, groc al 9, verd al 10) i fes el **Racó de mesura** quan el docent et cridi.
- ② [Pràctica 2b · El semàfor amb `switch`](codi/02b_semafor_switch/EXPLICACIO.md) — el mateix semàfor, en «caselles». ⭐ Repte: la fase nocturna.

    No et surten els 3 LED? Comença per **un de sol** amb la [Pràctica 1](codi/01_led_basic/EXPLICACIO.md).

🚩 **Final de la Sessió 1:** a l'inici de la Sessió 2, **envia** el formulari [SA2 · Sessió 1 — El semàfor](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) tal com el tinguis.

- ③ [Pràctica 3 · La llum que respira](codi/03_fade_pwm/EXPLICACIO.md) — un LED que s'encén i s'apaga a poc a poc (PWM).
- ④ [Pràctica 4 · Colors RGB](codi/04_rgb/EXPLICACIO.md) — un sol llum de qualsevol color i la teva primera funció.

🚩 **Final de la Sessió 2:** hauries d'haver enviat els formularis de la ③ i de la ④.

- ⑤ [Pràctica 5 · Panell de senyalització](codi/05_panell_senyalitzacio/EXPLICACIO.md) — el producte: els teus estats amb color, so i relé.

🚩 **Final de la Sessió 3:** formulari de la ⑤ enviat i **Entrega final** feta.

## 🏁 Entrega final

**Quan hagis acabat la ⑤:**

1. 🎤 **Defensa d'1 minut** davant del docent: què fa el teu panell i una millora possible (R1 codi + R2 circuit).
2. 📤 Respon i envia l'[Entrega final de la SA2](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3Mzc4MDYxMjY4/details): autoavaluació i checklist final.

> ✅ **Versió nucli** (per aprovar n'hi ha prou amb): un panell amb **2 estats** que es distingeixin bé amb color **i** so.

## 📦 Què has d'entregar

| Quan | Què | On |
|---|---|---|
| S1 | Formulari **SA2 · Sessió 1 — El semàfor** (s'envia a l'inici de la S2) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) |
| S2 | Formularis de les Pràctiques 3 i 4 | Una tasca de Classroom per pràctica (enllaç a l'últim pas de cada pràctica) |
| S3 | Formulari de la Pràctica 5 + **panell** i defensa d'1' + **Entrega final** | A l'aula i a Classroom. S'avalua amb **R1** (codi) i **R2** (circuit) |
| ⭐ | Un repte (opcional) | El docent el valida al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 🤖 | Els colors, llums i sons que programis: són les «expressions» de la teva **mascota** | Guarda el codi: el reaprofitaràs al [robot del trimestre](../00_General/00_Projecte_T1_Mascota.md) |

> 📓 El **quadern tècnic** (25 %) són les preguntes de reflexió de cada formulari de pràctica: no cal cap full a part.

## 📚 Per repassar a casa

- [Reptes de la SA2](../../Reptes/Reptes_SA2.md) ⭐ — tria el teu context.
- [Exemple resolt](SA2_exemple_resolt.md) · [Dibuix del programa de la llum que respira](SA2_diagrama_flux.md) · [Qüestionari de conceptes](SA2_questionari_conceptes.md)
- [Fitxa base](SA2_fitxa_alumnat.md) — objectius, com s'avalua i la rutina DEPURA quan alguna cosa no funciona.
- [Fitxa ampliada](SA2_fitxa_ampliada.md) — aprofundiment.
- [Esquemes de connexions](SA2_esquemes_connexions.md) — tots els circuits de la SA en un sol lloc.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA2_guia_docent.md`](SA2_guia_docent.md) | Guia del professorat: xuleta de sessió (a dalt), 3 sessions, mapa d'avaluació i errors freqüents. |
| [`SA2_fitxa_alumnat.md`](SA2_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): objectius, avaluació i DEPURA (les preguntes són als formularis de pràctica). |
| [`SA2_fitxa_ampliada.md`](SA2_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (ajuda entre iguals, revisió creuada, exit ticket, ODS, PC) i ampliacions. |
| [`SA2_checklist_docent.md`](SA2_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA2_checklist_alumnat.md`](SA2_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA2_esquemes_connexions.md`](SA2_esquemes_connexions.md) | Esquemes i connexions de tots els circuits (LED, semàfor, fade, RGB, panell). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

> 🗄️ Els **katas** d'aquesta SA estan arxivats (18-10-2026) a [`docs/arxiu/SA2_katas/`](../../docs/arxiu/SA2_katas/README.md): l'alumnat no hi arribava i es van treure de l'itinerari per simplificar-lo.

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_led_basic.ino` | **Bastida** (no és sessió pròpia): un sol LED al pin 8, per a qui s'encalla amb el semàfor. |
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
