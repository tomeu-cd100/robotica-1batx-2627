# 🐣 Projecte T1 · La mascota reactiva

> **Per a qui és?** Per a cada parella durant el 1r trimestre. És el dossier del
> primer robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes de SA2
> i SA3 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 1r trimestre (SA2-SA3) · **Maquinari:** UNO + breadboard, NeoPixel, LED RGB, brunzidor, PIR, micròfon, TEMT6000, polsador, DHT11, caixa DM 3 mm

## El robot

La mascota és una capsa de fusta DM amb cara: dos **ulls** fets amb NeoPixel i
difusor imprès en 3D, una **reixeta** que amaga el micròfon i el sensor de
llum, i un **PIR** que mira cap enfora per detectar qui s'hi acosta. Per fora
sembla un joguet; per dins és el mateix Arduino UNO i breadboard que ja es fa
servir a classe, muntats dins d'una caixa que li dona forma i personalitat.

```
        ______________________
       /   ⊙ orella    orella ⊙  \
      /                            \
     |   ●        ▢▢▢        ●     |   ← ● ulls (NeoPixel + difusor)
     |            reixeta          |   ← ▢▢▢ reixeta (micròfon + TEMT6000)
     |          [ PIR ]            |   ← PIR de moviment (frontal, cap enfora)
      \___________________________/
              |  polsador  |            ← polsador al llom (carícia)
              |____________|
```

Què fa: **expressa emocions** amb llum i so —els ulls canvien de color i el
brunzidor fa melodies d'estat— (treballat a **SA2**) i **reacciona a
l'entorn** amb com a mínim **3 comportaments sensor→resposta** —algú
s'hi acosta, li fan una carícia, es fa fosc, hi ha soroll o canvia la
temperatura— (treballat a **SA3**). El producte final és seva: cada parella
li tria un nom i un caràcter, i la mascota reacciona **de manera coherent**
amb aquest caràcter.

## Llista de peces

| Peça | Origen | Quantitat |
|---|---|---|
| Plaques de DM 3 mm (caixa) | Plantilla `mascota.svg`, tall làser | 6 |
| Escaires d'angle | `escaire_caixa.scad`, impressió 3D | 8 |
| Difusors d'ull | `difusor_ull.scad`, impressió 3D | 2 |
| Arduino UNO + breadboard | Kit 1 | 1 |
| Tira NeoPixel WS2812B (ulls) | Kit 2 | 1 |
| LED RGB KS0312 (indicador d'humor) | Kit 3 | 1 |
| Brunzidor | Kit 1/3 | 1 |
| Sensor PIR KS0052 | Kit 2 | 1 |
| Micròfon KS0035 | Kit 3 | 1 |
| Sensor de llum TEMT6000 KS0098 | Kit 2 | 1 |
| Polsador | Kit 1 | 1 |
| Sensor de temperatura i humitat DHT11 | Kit 3 | 1 |
| Cargols M3 x16 | Material del centre | ~16 |

<!-- web:only-github -->
Plantilla de tall làser: [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg).
Peces impreses en 3D: [`../../Recursos/peces_3d/escaire_caixa.scad`](../../Recursos/peces_3d/escaire_caixa.scad),
[`../../Recursos/peces_3d/difusor_ull.scad`](../../Recursos/peces_3d/difusor_ull.scad).
<!-- /web:only-github -->

## Fabricació i personalització

La plantilla `mascota.svg` és **fixa** (línies negres de tall i forats de
muntatge): cap equip la toca. El que cada parella personalitza és **NOMÉS la
zona vermella** de gravat —la cara (forma dels ulls, celles, boca) i les
orelles— sobre una **còpia pròpia** del fitxer.

Flux de personalització:
1. Cada parella fa una **còpia** del fitxer `mascota.svg` amb el nom del seu
   equip.
2. Edita **només les línies vermelles** amb xTool Creative Space o Inkscape
   (la zona negra de tall no es toca).
3. El docent **valida** el disseny (que no se surti del tauler ni trenqui
   cap forat de muntatge).
4. El fitxer validat entra a la **cua de tall** de la sessió de fabricació
   (S4 de SA2).

<!-- web:only-github -->
Plantilla per personalitzar: [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg) ·
guia completa: [`../../Recursos/plantilles_laser/LLEGEIX-ME.md`](../../Recursos/plantilles_laser/LLEGEIX-ME.md).
<!-- /web:only-github -->

## Muntatge

1. Munta la **base** i els **quatre laterals** de la caixa amb els 8
   escaires impresos (2 per cantonada), sense encolar encara.
2. Fixa la **breadboard amb l'Arduino UNO** a la base, deixant els ports USB
   i d'alimentació accessibles per una obertura lateral.
3. Encaixa els **difusors d'ull** al frontal i passa-hi els cables de la
   tira NeoPixel per darrere.
4. Munta el **PIR** mirant cap enfora pel forat frontal i el **polsador**
   al llom (accessible des de fora).
5. Encaixa el **micròfon** i el **TEMT6000** darrere la reixeta central.
6. Cablatge complet segons la taula de baix; comprova totes les connexions
   **abans** de tancar la caixa.
7. Tanca la **tapa superior** amb els últims dos escaires, deixant-la
   desmuntable (sense encolar) per si cal repassar el cablatge.
8. Prova d'encesa: comprova que els ulls s'encenen amb el color correcte
   abans de donar la mascota per acabada.

> ⚠️ **Polaritat:** la tira NeoPixel té un sentit de senyal (DIN → DOUT):
> si es connecta al revés, els LED no s'encenen. El PIR també té un
> connector orientat (VCC/OUT/GND): revisa la serigrafia del mòdul abans de
> cablejar-lo, no per posició del cable.

## Cablatge

| Component | Pin | Notes |
|---|---|---|
| NeoPixel (ulls), DIN | D6 | Alimentació **5V/GND** a part (no del pin 5V del UNO si la tira supera ~8-10 LED; consum ~60 mA/LED a blanc ple). |
| LED RGB (indicador d'humor) | D9 / D10 / D11 | Pins PWM (`~`), un per canal (R/G/B). |
| Brunzidor | D8 | Sortida digital o PWM per a to. |
| Sensor PIR | D2 | Digital; necessita 30-60 s d'estabilització en engegar. |
| Polsador | D3 | Digital, amb *pull-up* (intern o resistència externa) i *debounce* per programari. |
| DHT11 (temperatura/humitat) | D4 | Bus digital 1-Wire; requereix la llibreria `DHT`. |
| Micròfon | A0 | Entrada analògica; llindar de so a calibrar. |
| TEMT6000 (llum) | A1 | Entrada analògica; llindar de foscor a calibrar. |

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA2 | S1-S4 (S4 = fabricació) | Expressions de la mascota: colors i animacions dels ulls (NeoPixel), indicador d'humor (LED RGB) i melodies d'estat (brunzidor). | `Reptes_SA2.md` |
| SA3 | S1-S4 | Cada sensor de la caixa (PIR, polsador, TEMT6000, micròfon, DHT11) es programa amb la seva pròpia reacció sensor→comportament. | `Reptes_SA3.md` |

**Producte final (SA3-S3):** la mascota muntada amb **≥3 reaccions
sensor→comportament** coherents entre si, més la seva **fitxa de
personalitat** (nom, caràcter, com reacciona i per què reacciona així). La
S4 de SA3 és la prova pràctica **T1**, amb la mascota ja tancada.

## Rúbrica del robot (producte SA3)

| Criteri | Expert | Avançat | Aprenent | Novell |
|---|---|---|---|---|
| **R1 · Fabricació i muntatge** | Caixa ferma, cablejat endreçat i etiquetat, res solt ni curtcircuitat. | Caixa ferma i cablejat endreçat, sense etiquetar. | Caixa funcional però amb algun cable fluix o desordenat. | Caixa inestable o cablejat insegur. |
| **R2 · Funcionament** | Totes les sortides i sensors funcionen a la primera i de manera fiable. | Totes les sortides i sensors funcionen, amb algun ajust. | La majoria de sortides i sensors funcionen. | Sortides o sensors clau no funcionen. |
| **R3 · Comportaments** | ≥3 reaccions sensor→resposta, totes coherents amb la personalitat i ben calibrades. | ≥3 reaccions sensor→resposta, coherents amb la personalitat. | 2 reaccions sensor→resposta, o coherència parcial. | Menys de 2 reaccions, o sense relació amb cap personalitat. |
| **R4 · Fitxa de personalitat i demostració** | Fitxa completa i defensa oral que explica i justifica cada reacció. | Fitxa completa i defensa oral clara. | Fitxa bàsica o defensa amb ajuda. | Sense fitxa o sense poder explicar el funcionament. |

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| El NeoPixel no s'encén | El DIN està al revés, o falta un GND comú entre la tira i l'Arduino. | Comprova el sentit DIN→DOUT de la serigrafia i uneix tots els GND. |
| El PIR dispara sempre (fals positiu) | Encara en el temps d'estabilització (30-60 s) o sensibilitat massa alta. | Espera l'estabilització i ajusta els potenciòmetres de sensibilitat/temps del mòdul. |
| El micròfon no detecta res | Llindar analògic mal calibrat per al soroll de l'aula. | Llegeix valors reals al Monitor Sèrie i recalibra el llindar. |
| El DHT11 llegeix `NaN` | Pin equivocat o llibreria `DHT` no instal·lada/mal configurada. | Comprova el pin (D4) i que el tipus de sensor a la llibreria sigui `DHT11`. |
| La caixa no tanca bé | Escaires mal orientats o forats de muntatge desalineats. | Torna a muntar els escaires seguint l'ordre del pas de muntatge; no forcis les peces. |
