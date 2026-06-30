# Reptes SA5 · micro:bit i MicroPython

**Tria UN dels tres reptes.** Tots es programen en **MicroPython** per a **micro:bit**, fent servir les entrades i sensors **integrats** i la pantalla de LEDs. Mateix requisit mínim, ampliacions graduades. Editor: python.microbit.org (té simulador) o Thonny.

> **Continguts SA5:** MicroPython (indentació, `while True`), `display`, botons, acceleròmetre, sensor de llum, ràdio. · **Codi base:** `Classes/SA5/codi/` (`.py`).

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia. *(2n trimestre — el repte C de ràdio pot esdevenir el **comandament del braç robòtic** de SA4. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 🏃 Repte A · Comptapassos personal

**Context.** Una polsera d'activitat que **compta passos** detectant el moviment, com un podòmetre.

> *Client: marca d'esport i salut · Lliurable: comptapassos vestible · Món real: wearables i monitoratge d'activitat física.*

**Què treballa.** Acceleròmetre, variables, condicionals, `display`.

**Requisit mínim.**
- Detectar **sacsejades/passos** amb l'acceleròmetre i **comptar-los**, mostrant el total a la pantalla (en prémer un botó).
- Codi comentat amb indentació correcta.

**Ampliacions graduades.**
1. *(bàsica)* Reinicia el comptador amb el **botó B**.
2. *(notable)* Fixa un **objectiu** (p. ex. 20 passos) i mostra una **icona** en assolir-lo.
3. *(⭐⭐⭐)* Mostra una **barra de progrés** amb els LEDs cap a l'objectiu.

---

## 🌃 Repte B · Llum de nit intel·ligent

**Context.** Una llum que **s'encén quan fa fosc** fent servir el sensor de llum del propi micro:bit.

> *Client: empresa de domòtica · Lliurable: llum de nit autònoma · Món real: il·luminació adaptativa de la llar.*

**Què treballa.** `display.read_light_level()`, llindar amb `if`, sortida a la pantalla.

**Requisit mínim.**
- Llegir el **nivell de llum** i **encendre la pantalla** (imatge) quan baixa d'un llindar; apagar-la quan hi ha llum.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Mostra el **nivell de llum** numèric en prémer un botó (per calibrar).
2. *(notable)* Afegeix **histèresi** (dos llindars) per evitar parpelleigs.
3. *(⭐⭐⭐)* Ajusta la **brillantor** de la imatge segons la foscor.

---

## 🎲 Repte C · Joc o missatges per ràdio

**Context.** Un **dau electrònic**, un **pedra-paper-tisora**, o **enviar missatges** entre dos micro:bits per ràdio.

> *Client: empresa de joguines / equip de robòtica · Lliurable: joc o comandament sense fil · Món real: comunicació sense fil i comandaments remots.* (La ràdio és la **base** d'un possible comandament del braç de SA4 — **via avançada i opcional**, requereix pont micro:bit↔Arduino; vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)

**Què treballa.** `random`, esdeveniments (sacsejada/botó), `display`, i/o comunicació `radio`.

**Requisit mínim.**
- *Opció joc:* en **sacsejar** o prémer, mostra un **resultat aleatori** (dau 1–6 o gest).
- *Opció ràdio:* en prémer un botó, **envia** un missatge/icona que un altre micro:bit **rep i mostra**.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix una **animació** abans de mostrar el resultat.
2. *(notable)* *(joc)* porta el **recompte** de tirades; *(ràdio)* respon amb un **ACK** (confirmació).
3. *(⭐⭐⭐)* Combina-ho: un **joc multijugador per ràdio** entre dos micro:bits.

---

## Material necessari (segons repte)
- micro:bit (+ piles) · per al repte C (ràdio): **dos** micro:bits · ordinador amb python.microbit.org o **Thonny** · *(no cal cablejar: tot és integrat)*.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quina entrada integrada faig servir (moviment / llum / botó) i què mostro?
2. **Dissenyar (Predir):** escriu l'estructura `while True:` i el que anirà sagnat dins.
3. **Prototipar:** parteix de `Classes/SA5/codi/` (`02_passes.py`, `03_nightlight.py`, `04_radio_dau.py`).
4. **Provar:** usa el **simulador** abans de carregar al dispositiu.
5. **Millorar:** afegeix histèresi, icones, recompte o ràdio.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Indentació correcta, lògica, llegibilitat en Python. |
| **R3** (projecte) | Integració sensor + pantalla (+ ràdio) funcional. |
| **R4** (documentació) | Quadern tècnic: diferències Arduino↔MicroPython. |

## Producte / entrega
- Codi `.py` comentat + entrada al quadern tècnic (què canvia respecte d'Arduino).

---

## Orientació docent
- **Errors freqüents:** `IndentationError` (sagnat); oblidar `from microbit import *`; al repte de ràdio, grups diferents entre emissors; confondre `is_pressed()` amb `was_pressed()`.
- **Diferenciació:** el mínim usa una entrada integrada; les ampliacions porten a histèresi, `random`, recompte i ràdio.
- **Gestió d'aula:** el **simulador** permet treballar sense maquinari; per al repte C cal aparellar grups de 2 micro:bits. Recomanar repassar `Classes/SA0/SA0_guia_programacio.md` (Part B i taula comparativa).
- **Vincle avaluació:** R1 (codi Python) + R3 + R4; punt fort per consolidar el **transfer** de conceptes entre llenguatges.
