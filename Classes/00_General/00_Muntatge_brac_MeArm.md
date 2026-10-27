# 🔧 Muntatge del braç MeArm V1.1

> **Per a qui és?** Per al docent que munta el **prototip** del braç MeArm
> (en prova des del 24-10-2026) i, si s'adopta, per a cada alumne/a durant
> els torns de taller del 2n trimestre. Segueix els **18 passos de la guia
> oficial** en el mateix ordre, de manera que es pot tenir aquesta pàgina i
> les fotos originals obertes alhora.

**Durada:** unes 2 h (estimació oficial; cronometra el prototip) · **Maquinari:** peces de `brac_MeArm_v1.1.svg` en DM 3 mm, 4 micro servos de 9 g (servo Starter + KS0194), cargols M3, Arduino UNO, alimentació externa per als servos

## Abans de començar

**Fotos oficials.** La guia original és sobretot fotogràfica i les fotos no
es poden copiar aquí (llicència no comercial). Descarrega-la i tingues-la al
costat: [MeArmV1.1.pdf](https://github.com/phenoptix/MeArm/blob/master/hardware/Robot%20Chassis/v1/MeArmV1.1.pdf)
(repositori de phenoptix). A cada pas d'aquesta pàgina hi ha la
**pàgina del PDF** on en surten les fotos.

**Peces.** Cada peça té un **número gravat** (en vermell a la plantilla).
Alguns números es repeteixen perquè hi ha peces bessones (per exemple, dues
`5`, tres `17` o tres `20`). Abans de començar:

- Treu totes les peces del tauler i comprova que cap no s'ha quedat enganxada
  per un tall incomplet.
- Prova d'encaixar **una pestanya en una ranura** qualsevol. Les ranures fan
  **3,0 mm justos**:
  - si el DM entra a pressió forta, **no el forcis**: llima la ranura (o
    torna a tallar amb el DM més prim);
  - si queda fluix, el braç tremolarà però funcionarà; anota-ho.

**Material i eines.**

| Element | Notes |
|---|---|
| 4 micro servos de 9 g | El kit en té 3 per alumne/a: per al prototip cal un quart servo. Guarda les **banyes** (*servo horns*) i els cargolets que porten. |
| Cargols M3 de cap Allen | Mides que cita la guia: **8, 10, 12 i 20 mm**. Les quantitats exactes, a la [taula del prototip](#registre-del-prototip). |
| 4 femelles M3 | Per als cargols de 20 mm de la base. |
| Clau Allen M3 i tornavís petit d'estrella | El tornavís és per als cargolets de les banyes. |
| Alicates de tall | Per escurçar les banyes si sobresurten de la palanca. |

> 💡 **Com funcionen les unions.** A la plantilla hi ha dos tipus de forat
> rodó: d'uns **2,6 mm** i d'uns **3,0 mm**. El cargol M3 passa lliure pel de
> 3,0 mm i **fa la seva pròpia rosca** al de 2,6 mm (és *autoroscant*). Per
> això les articulacions giren al voltant del cargol: la peça del forat gran
> balla i la del forat petit queda collada.

> ⚠️ **DM no és metacrilat.** El DM aguanta molt menys la rosca que el
> metacrilat de l'original. Colla cada cargol **fins que ofereixi
> resistència i prou**. Si un forat es passa de rosca, posa-hi un cargol que
> travessi les dues peces amb una femella al darrere.

## Pas 0 · Centra els servos abans de muntar res

La guia oficial insisteix que els servos s'han de preparar **abans** de
muntar: si una banya queda mal orientada, cal desmuntar mig braç. Amb
l'Arduino del curs, carrega aquest programa, connecta els servos un per un
i deixa'ls tots a **90°** (el centre del recorregut):

```cpp
// Centra els 4 servos a 90 graus abans de muntar les banyes
#include <Servo.h>

Servo base, esquerre, dret, pinca;

void setup() {
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  base.write(90);
  esquerre.write(90);
  dret.write(90);
  pinca.write(90);
}

void loop() {
}
```

> ⚠️ **Alimentació:** amb un sol servo connectat n'hi ha prou amb l'USB.
> Per moure'n **més d'un alhora**, alimenta'ls amb piles i uneix el GND de
> les piles amb el GND de l'Arduino, com al [dossier del braç](00_Projecte_T2_Brac.md#cablatge).

Enganxa una **etiqueta** a cada servo (base, esquerre, dret, pinça) i no els
moguis amb la mà a partir d'ara.

## Muntatge pas a pas

### Bloc A · Preparació (passos 1-3)

1. **Tall** (PDF p. 3). Ja fet. La guia original diu que el disseny tolera
   imprecisions de tall i de material.
2. **Servos** (PDF p. 3-4). Fet al pas 0: la guia original fa servir la seva
   placa *Brains*; nosaltres, l'Arduino UNO.
3. **Banyes a les palanques** (PDF p. 5-6). Cargola cada banya a la seva
   peça amb els **cargolets punxeguts** que venen amb el servo. Segons les
   fotos, porten banya:
   - la **placa central** amb el forat gran al mig (`14`): banya en creu o
     doble, per al servo de la base;
   - la **palanca llarga** amb ranures (`13`);
   - una **palanca curta** amb forat gran;
   - l'**engranatge** amb la pestanya (`30`), que obre i tanca la pinça.

   Si la banya sobresurt de la peça, escurça-la amb les alicates. Guarda en
   una bossa els **cargols petits del centre de la banya**: es fan servir als
   passos 9-11 i 18.

### Bloc B · Base i laterals (passos 4-6)

4. **Base** (PDF p. 7-9).
   1. Posa el **collaret** al servo de la base i cargola'l a la **base
      petita** (la peça en forma de rombe, `2`) amb **2 cargols de 8 mm**.
   2. Passa **4 cargols de 20 mm** per la **base gran** (`1`, la del logotip)
      i enrosca'n les femelles fins a mitja llargada.
   3. Enrosca els 4 cargols a la base petita fins que gairebé arribin a
      la cara de dalt.
   4. Ara colla les femelles contra la base gran.
5. **Lateral esquerre** (PDF p. 10). Passa el servo pel seu collaret i
   cargola el conjunt a la placa lateral amb **2 cargols de 8 mm**.
6. **Lateral dret** (PDF p. 11-12). Igual que l'esquerre. Comprova-ho
   posant els dos laterals de cara: els cossos dels servos han de quedar
   **a les cares exteriors**, mirant enfora.

### Bloc C · Pinça (passos 7-8)

7. **Pinça, primera part** (PDF p. 13). Passa el servo de la pinça pel
   collaret, posa-hi les peces laterals (**l'orientació importa**: compara
   amb la foto) i cargola-hi la base de la pinça amb **4 cargols de 8 mm**.
8. **Pinça, segona part** (PDF p. 14). Munta els **dits** i els
   **engranatges** amb **un cargol de 8 mm, un de 10 mm i un de 12 mm**,
   seguint les fotos. Els dits han de girar sense fregar.

### Bloc D · Calibratge (passos 9-11)

Aquí es posen les banyes del bloc A als servos. El servo és a 90° des del
pas 0; ara es tracta d'encaixar la banya en la posició bona.

9. **Pinça** (PDF p. 15-16). Encaixa l'engranatge amb banya (`30`) a l'eix
   del servo **sense collar-lo**. Amb un programa d'escombrat (per exemple
   el de la SA4), comprova que la pinça **es tanca del tot** a un extrem i
   s'obre a l'altre. Si no, treu la banya, gira-la **una dent** i torna-ho a
   provar. Quan vagi bé, colla el cargol petit del centre.
10. **Esquerre** (PDF p. 17). Igual, amb la seva palanca. Comprova que la
    palanca **no passa mai per on anirà la base**.
11. **Dret** (PDF p. 18). Igual que l'esquerre.

> 📝 **Anota els angles límit** de cada servo (on la peça toca o està a punt
> de tocar). Al codi del braç no s'han de superar mai: un servo que força el
> topall s'escalfa i es crema.

### Bloc E · Estructura central (passos 12-18)

> ⚠️ **La regla d'or d'aquest bloc:** les articulacions han de quedar
> **fluixes, com les d'una titella**. Si una unió frega, el servo ha de fer
> força contra la mateixa estructura i el braç tremola o s'encalla. Després
> de cada unió, mou-la amb el dit: ha de caure pel seu propi pes.

12. **La peça del mig** (PDF p. 18). Munta les barres del mig. Han de
    moure's **en línia recta** i sense fregar.
13. **Lateral esquerre a la base** (PDF p. 19-20). **Pas difícil.** S'hi
    ajunten el lateral esquerre, la peça del mig, el **travesser davanter**
    i la **placa central**.
14. **Palanques de l'esquerre** (PDF p. 21-23). Afegeix el **travesser del
    darrere** i les palanques del costat esquerre. Fluix!
15. **Lateral dret i travesser central** (PDF p. 24-25). **El pas més
    difícil de tot el muntatge.** Calen **dues persones**: una aguanta
    l'estructura alineada i l'altra hi passa els cargols. Encara que costi,
    després d'aquest pas tot és fàcil.
16. **Palanques de la dreta** (PDF p. 26-28). Fàcil. Atenció a
    l'**orientació de la peça en forma de Y**: compara-la amb la foto abans
    de cargolar.
17. **La pinça al braç** (PDF p. 29). **Tres cargols.**
18. **Tot a la base** (PDF p. 30-31). **Un cargol** uneix el braç a la
    banya de la base: és el cargol petit de la bossa. Comprova que la base
    gira **90° a cada banda** des del centre. Si no, treu el cargol, gira la
    banya una dent i torna-hi.

## Cablatge provisional (4 servos)

Proposta per al prototip. Respecta els pins del [dossier del braç](00_Projecte_T2_Brac.md#cablatge)
i afegeix-hi el servo nou a **D6** (també és PWM):

| Servo | Pin | Notes |
|---|---|---|
| Base | D9 | Igual que al dossier. |
| Esquerre | D6 | Servo nou del MeArm. |
| Dret | D10 | Ocupa el lloc del colze. |
| Pinça | D11 | Igual que al dossier. |

> ⚠️ **Mai alimentar 4 servos des de l'USB** ni des del pin 5V del UNO.
> Fes servir les piles, amb el GND comú.

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| Les pestanyes no entren a les ranures | El DM fa més de 3,0 mm | Llima la ranura; no la forcis, el DM s'esberla. |
| El braç tremola o s'encalla a mig moviment | Alguna articulació massa collada | Afluixa mitja volta els cargols dels pivots (bloc E). |
| Un cargol gira en buit | Rosca del DM passada | Cargol que travessi les dues peces + femella. |
| Un servo brunz i s'escalfa quiet | Força contra un topall | Revisa els angles límit (bloc D) i limita'ls al codi. |
| La pinça no tanca del tot | Banya desplaçada una dent | Repeteix el pas 9. |
| La base no arriba a 90° a una banda | Banya de la base mal centrada | Repeteix el pas 18. |

## Registre del prototip

Omple aquesta taula en muntar el prototip: decideix si el MeArm s'adopta i
dona les quantitats reals per al pressupost de cargols.

| Dada | Valor |
|---|---|
| Gruix real del DM (mm) | |
| Ajust de les ranures (just / fluix / no entra) | |
| Temps total de muntatge | |
| Cargols M3 × 8 mm | |
| Cargols M3 × 10 mm | |
| Cargols M3 × 12 mm | |
| Cargols M3 × 20 mm (+ femelles) | 4 |
| Altres cargols | |
| Passos on calen dues persones | 15 |
| Angles límit (base / esquerre / dret / pinça) | |
| Incidències | |

<!-- web:only-github -->
Plantilla de tall: [`../../Recursos/plantilles_laser/brac_MeArm_v1.1.svg`](../../Recursos/plantilles_laser/brac_MeArm_v1.1.svg) ·
notes de tall a [`LLEGEIX-ME.md`](../../Recursos/plantilles_laser/LLEGEIX-ME.md).
<!-- /web:only-github -->

## Crèdits

**MeArm V1.1**, disseny de **Ben Gray** (phenoptix), maquinari amb llicència
**CC BY-SA 3.0** ([github.com/phenoptix/MeArm](https://github.com/phenoptix/MeArm)).
Aquesta guia és una redacció pròpia en català que segueix l'ordre dels
passos de la guia oficial i l'adapta al DM, als servos i a l'Arduino del
curs. Les fotos originals no s'hi inclouen.
