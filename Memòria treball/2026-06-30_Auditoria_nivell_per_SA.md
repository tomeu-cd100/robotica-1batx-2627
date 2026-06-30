# 2026-06-30 · Auditoria de nivell per SA (1r Batxillerat)

## Objectiu
Comprovar si el nivell del material és adequat per a 1r de batxillerat. Dimensions prioritzades pel docent: **sostre vs. currículum oficial**, **prerequisits (el "terra")** i **demanda cognitiva**. (Hores: secundari; el curs té marge — 70 h.)

## Referència oficial (sostre)
- **CE5 de Tecnologia i Enginyeria I** (Decret 171/2022) i bloc de sabers **Automatització** (1r curs): programació textual a partir d'exemples, **sistemes de control senzills**, **IA aplicada al control**, **IoT/telemetria/big data**, **trajectòries de robots**, **algorismes senzills**.
- ⚠️ El **llaç obert/tancat i la seva estabilitat** són explícitament **de 2n curs** (Normativa §4.2). Electrònica digital combinacional/seqüencial també és de 2n.
- Per tant **el sostre oficial de 1r ja és alt**: IoT, IA, telemetria i trajectòries hi són de ple. La clau no és *si* es toquen, sinó *a quina profunditat*.

## Veredicte global
**El nivell està calibrat al sostre del rang oficial de 1r, però s'hi manté.** Tres mecanismes ho fan viable:
1. **Terra ben posat:** la **SA0** ensenya a programar des de zero (variables, `if/else`, bucles, funcions, depuració, mètode PRIMM). El curs **no assumeix programació prèvia**.
2. **Profunditat capada:** els temes "universitaris" es donen com a **introducció** i es difereixen els avançats (p. ex. **PID i estabilitat → cursos superiors**; ML real **sense codi** amb Teachable Machine).
3. **Bastida i diferenciació:** a cada SA hi ha DUA (bastida per a qui s'encalla) i **"+ ampliació"** per a qui va sobrat; 70 h de marge.

> **Causa principal de la sensació de "massa alt": el vocabulari, no el contingut.** Títols i sabers sonen d'universitat (cinemàtica diferencial, màquines d'estats, control proporcional, telemetria, IA) mentre el **tractament real és introductori i graduat**. El sostre *lèxic* va per davant del sostre *conceptual*.

## Taula per SA
Llegenda — Sostre: ✅ dins / ⚠️ al límit / 🔴 per sobre · Terra: ✅ cobert / ⚠️ salt · Demanda: ✅ graduada / ⚠️ pic localitzat

| SA | Tema | Sostre | Terra | Demanda | Nota |
|---|---|:--:|:--:|:--:|---|
| SA0 | Programar des de zero | ✅ | ✅ | ✅ | Fonament que fa viable la resta. |
| SA1 | Robot, mètode, seguretat, `Blink` | ✅ | ✅ | ✅ | Inclou **prova diagnòstica** (eina de comprovació empírica). |
| SA2 | Sortides digitals, PWM, C/C++ | ✅ | ✅ | ✅ | Primera càrrega real de programació; gradual. |
| SA3 | Entrades, sensors, funcions, sèrie | ✅ | ✅ | ⚠️ | Funcions + analògic junts; estàndard. Acull prova T1. |
| SA4 | Servos, motors, pont H, llibreries | ✅ | ✅ | ✅ | Pont H i alimentació externa: concepte nou però conceptual. |
| SA5 | micro:bit + MicroPython | ✅ | ✅ | ⚠️ | Canvi de llenguatge; mitigat com "mateixos conceptes, altra sintaxi". |
| **SA6** | **Control: llaç, histèresi, màq. estats, P** | **⚠️** | **⚠️** | **🔴** | **Punt calent del curs** (vegeu sota). |
| SA7 | Robòtica mòbil, trajectòries | ✅ | ✅ | ⚠️ | "Cinemàtica" tractada de manera conceptual; demanda = calibratge/iteració. |
| SA8 | IoT i IA | ✅ | ✅ | ✅ | Introductori real (telemetria per ràdio; ML sense codi). Fort eix ètic. |
| SA9 | Projecte final | ✅ | ✅ | ⚠️ | Autònom per disseny, però **banc de reptes per nivells** ho diferencia. |

## El punt calent: SA6
- **Sostre:** toca contingut de 2n (llaç tancat, estabilitat), però **ben gestionat**: es queda en "introducció" i ajorna el **PID**.
- **Terra:** demana C/C++ sòlid (`enum`/`switch`) i **temporització no bloquejant (`millis()`)** que **no s'havia practicat abans** — la pròpia guia ho detecta i proposa una mini-pràctica/bastida.
- **Demanda:** màquina d'estats + no-bloqueig + concepte de control proporcional en 8 h és el **salt més pronunciat** del curs.
- **Mitigació recomanada:** (a) inserir una mini-pràctica de `millis()` a SA2 o SA4 perquè arribi practicat; (b) donar l'esquelet de la màquina d'estats fet; (c) deixar el control proporcional **com a ampliació**, no com a nucli exigible.

## Com comprovar-ho empíricament (el que de debò ho diu)
1. **Passa la prova diagnòstica** (`Classes/SA1/SA1_prova_diagnostica.md`): mesura el "terra" real del grup (no qualifica).
2. **Pilota SA0 + SA1 + la sessió 3 de SA6** amb un grup petit o uns quants alumnes representatius: SA0/SA1 validen el terra; SA6-S3 valida el sostre.
3. **Mira els "errors freqüents"** de cada guia com a predicció: si apareixen massa aviat, el ritme va just.
4. **Revisa les fitxes base** (no les ampliades): el nivell *exigible a tothom* és el de la **fitxa base**; l'ampliada és sostre opcional.

## Conclusió per al docent
- El material **no està globalment per sobre** del nivell de 1r; està **al sostre del rang, dins de la llei**, amb terra propi i diferenciació.
- Si vols **abaixar la sensació de nivell** sense perdre currículum: (1) reforça el rètol "fitxa base = mínim de tothom / ampliada = opcional"; (2) aplica les 3 mitigacions de SA6; (3) considera suavitzar el **vocabulari dels títols** de cara a l'alumnat (p. ex. "com gira un robot" en lloc de "cinemàtica diferencial").

## Mitigacions de SA6 aplicades (30-06-2026)
- **(a) `millis()` arriba practicat:** nou sketch `Classes/SA4/codi/05_dos_leds_millis/` (dos LED a ritmes diferents sense `delay()`) + pont des de SA4 i referència des de SA6.
- **(b) Esquelet de màquina d'estats:** nou `Classes/SA6/codi/03_maquina_estats_BASTIDA/` amb el patró `enum`/`switch` + `millis()` muntat i `// TODO` per omplir; referenciat a guia i fitxa.
- **(c) Control proporcional com a +ampliació:** marcat a la fitxa base (secció 4 opcional) i a la guia S4; ja era coherent amb la prova T2 (nucli = histèresi).

## Pendents
- Comprovació empírica a l'aula (és del docent).
- Vocabulari dels títols de cara a l'alumnat: pendent d'acordar abast abans de tocar 9 SA.
