# 🩺 Diagnòstic exprés de maquinari — 4 passos abans de cridar el docent

> **Per a qui és?** Per a l'alumnat, des de la SA1 (i sobretot a partir de la SA4, quan entren motors i alimentació externa). Quan el circuit «no fa res» o «fa coses estranyes», ja has passat la rutina **DEPURA** i les **[targetes de rescat](00_Targetes_rescat.md)**, i comences a sospitar del **maquinari**: aquests 4 passos amb el multímetre troben (o descarten) les avaries més habituals del taller en 5 minuts. Si després els has de cridar, portaràs **evidències**, no un «no funciona».

**Durada:** 5' · **Maquinari:** multímetre del taller + el teu circuit

## ⚠️ Abans de començar: 2 regles de seguretat

1. **Continuïtat i resistència es mesuren SEMPRE sense alimentació**: desendolla l'USB **i** les piles/font externa abans dels passos 1, 2 i 4.
2. Si alguna cosa **fa olor de cremat** o un component **crema** en tocar-lo: **talla l'alimentació primer**, diagnostica després.

## 🌳 On començo? (tria pel símptoma)

| Símptoma | Comença pel |
|---|---|
| «No fa res de res» | **PAS 1**, i segueix l'ordre |
| L'Arduino no s'encén (LED «ON» apagat) | **PAS 2** |
| Es reinicia sol / falla quan el motor arrenca | **PAS 4** (i després el 3) |
| Un component és molt calent o fa olor | **PAS 3**, ja! |
| El sensor llegeix valors absurds o que ballen | **PAS 4**, i després l'1 |

Si cap símptoma no encaixa, fes els 4 passos **en ordre**: estan pensats perquè cada un descarti una família d'avaries abans de passar al següent.

---

## PAS 1 · Continuïtat — el corrent pot passar per on TOCA? 🔌 *(sense alimentació)*

Multímetre en mode **continuïtat** (icona de so ·))) o de díode).

1. **Comprova el multímetre**: ajunta les dues puntes → ha de xiular. Si no, revisa la rodeta i les puntes.
2. **Cada cable dubtós**: una punta a cada extrem → **xiula = bo**; **silenci = cable trencat**. És l'avaria número 1 del taller: els cables Dupont es trenquen **per dins**, sense cap senyal visible.
3. **A la protoboard**: comprova que dos punts que *creus* connectats **realment** ho estan. Recorda: les regletes centrals connecten per **files de 5 forats** (no tota la fila llarga), i els rails laterals d'algunes protoboards estan **partits al mig**.

**➜ Silenci en algun punt?** Canvia el cable (no el «reparis») i torna a provar el circuit. **Tot xiula?** Vés al PAS 2.

## PAS 2 · Curtcircuits — el corrent passa per on NO toca? ⚡ *(sense alimentació)*

1. Puntes entre **5V i GND** del teu circuit: un xiulet **continu que no para** = **CURTCIRCUIT**. No l'alimentis!
2. Busca els sospitosos: pota de component **doblegada** que toca la del costat, dos cables al mateix forat o fila, **LED sense resistència**, cable amb l'ànima pelada tocant un altre.
3. **Truc per localitzar-lo**: retira els mòduls i cables **d'un en un**, repetint la mesura; quan el xiulet desaparegui, l'últim que has tret era el curt (o hi estava connectat).

> ℹ️ Un **bip curt** que s'apaga de seguida quan hi ha condensadors **no és un curt** (s'estan carregant): el curt és el xiulet que **no para mai**.

**➜ Curt trobat?** Arregla'l i **repeteix la mesura** abans de tornar a alimentar. **Sense curt?** Vés al PAS 3.

## PAS 3 · Temperatura — hi ha res que cremi? 🌡️ *(amb alimentació, 30 segons)*

1. Alimenta el circuit i espera **30 segons**.
2. **Toc ràpid amb el dors del dit** (retira'l de seguida): xip gran de l'Arduino, **regulador de tensió** (el component petit al costat del connector d'alimentació), driver **L298N**, servos.
3. **Tebi = normal.** Que **no hi pots mantenir el dit = mal senyal**: talla l'alimentació.
4. Sospitosos habituals de l'escalfor: component muntat **al revés** (un LED ho aguanta; un circuit integrat o un condensador electrolític, **no**), **12 V** on tocaven 5 V, servo **forçat** contra un límit mecànic.

**➜ Alguna cosa crema?** Talla l'alimentació, revisa polaritat i tensions… i **avisa el docent** (aquí sí, de seguida). **Tot tebi?** Vés al PAS 4.

## PAS 4 · Masses — tots els GND estan units? 🌍 *(sense alimentació per mesurar)*

L'avaria **invisible** clàssica: cada font d'alimentació del muntatge ha de **compartir massa** amb l'Arduino.

1. Mode continuïtat, sense alimentar: **GND de l'Arduino ↔ GND de la protoboard ↔ GND de la font/piles ↔ GND del driver** — tot ha de xiular entre si.
2. Símptomes típics de massa penjada: servo que **tremola**, lectures analògiques que **ballen**, mòdul que «funciona a estones», motor que només gira a vegades, Arduino que es **reinicia** quan el motor arrenca.
3. Recorda el patró de la SA4: el motor s'alimenta de la **font externa**, el senyal ve de l'Arduino, i les **dues masses van unides**.

---

## 🗣️ I si després dels 4 passos encara no va?

Ara sí: crida el docent — **amb la feina feta**. Digues-li-ho així:

> «He comprovat la continuïtat (pas 1 ✓), no hi ha curt entre 5V i GND (pas 2 ✓), res no s'escalfa (pas 3 ✓) i les masses estan unides (pas 4 ✓). El símptoma exacte és ______.»

Amb aquesta frase, el problema queda reduït a **codi** o a **component espatllat**: la meitat del diagnòstic ja està fet. I és **evidència per al quadern tècnic** (R4) 📓:

| Pas | Què he mesurat | Resultat |
|---|---|---|
| 1 · Continuïtat | | |
| 2 · Curts | | |
| 3 · Temperatura | | |
| 4 · Masses | | |

---

*Complementa les [targetes de rescat](00_Targetes_rescat.md) (encallades de codi i muntatge, SA per SA) i la rutina **DEPURA**. Llicència CC BY-SA 4.0.*
