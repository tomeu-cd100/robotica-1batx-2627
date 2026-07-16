# 2026-07-17 · Anàlisi de disseny instruccional (LXD) del curs

Anàlisi feta amb barret de **dissenyador instruccional / especialista en experiència
d'aprenentatge**: necessitats de l'alumnat, teories pedagògiques aplicades i pendents,
i una transformació concreta de contingut teòric en experiència.

## 1 · Anàlisi de necessitats de l'alumnat

**Perfil:** 1r de Batxillerat (16-17 anys), matèria optativa de 2 h/setmana. Cal
esperar-hi tres subgrups amb necessitats diferents:

| Subgrup | Necessitat dominant | Risc si no s'atén |
|---|---|---|
| **Vocacional** (tria tecnològic, possible TR/competició) | Repte real, autonomia, sostre alt | Avorriment, «ja ho sé fer» |
| **Explorador** (curiositat, sense base de programació) | Bastida ferma, èxits primerencs | Frustració a SA2-SA3 (primer codi propi) |
| **Passatger** (hi és per descartar o per horari) | Rellevància personal, implicació activa | Deixar fer a la parella (efecte passatger) |

**Punts de dolor detectats** (de la crítica del 16-07 i del disseny actual):
1. **Càrrega cognitiva concentrada** a les sessions de tancament (mini-check + concepte
   nou + producte + defensa): colls d'ampolla a SA3 S3 i SA6 S3 — parcialment mitigat
   avui amb les notes de marge.
2. **Retenció**: illa de Python (SA5) sense represa fins la prova — mitigat avui amb la
   targeta de repàs exprés. El mateix patró (contingut vist un cop i avaluat setmanes
   després) pot repetir-se amb la ràdio (SA5→SA8).
3. **Motivació del vocacional**: l'itinerari d'ampliació era prim — mitigat avui amb
   les fites dels reptes ⭐⭐⭐ (encara sense solucionari).
4. **El contingut més teòric del curs** (IoT: arquitectura, riscos, RGPD — SA8 S2;
   sessió de disseny en paper) és el més exposat a la passivitat.

## 2 · Teories pedagògiques: què ja hi ha i què falta

**Ja incorporades (i ben triades):**
- **Construccionisme (Papert):** tot saber acaba en artefacte físic que es defensa.
- **ZPD i bastida amb retirada (Vygotsky/Bruner):** PRIMM amb pla explícit de retirada
  de bastida, targetes de rescat, esquelets `// TODO`.
- **Avaluació formativa (Wiliam/Black):** mini-checks, dianes, exit tickets, semàfors,
  rúbriques compartides abans de començar.
- **Pràctica de recuperació i espaiat (Roediger/Karpicke):** graella d'activació amb
  repàs espaiat a cada sessió; des d'avui, també la represa de Python pre-T2.
- **Aprenentatge experiencial (Kolb):** cicle provar→millorar amb diari de bord
  (experiència → reflexió → conceptualització → experimentació).
- **Càrrega cognitiva (Sweller):** exemples resolts (worked examples) de qualitat, codi
  de suport, un concepte nou per sessió… excepte als tancaments (vegeu dolor #1).

**Oportunitats no explotades:**
- **Motivació ARCS (Keller) — el component «Relevance»:** les SA tenen context real,
  però l'alumne no *tria* gairebé mai el context fins a la SA9. Petites eleccions
  abans (quin objecte automatitzo, quina dada mesuro) multipliquen implicació amb cost
  zero de material.
- **Autodeterminació (Deci & Ryan):** autonomia-competència-relació. La competència i
  la relació (parelles, rols) estan servides; l'**autonomia** es concentra al final.
- **Aprenentatge basat en fenòmens / rol:** el contingut teòric (IoT, riscos, biaix
  d'IA) es presta a rol autèntic (auditor, pèrit, consultor) més que a explicació.
- **Feedback en 3 nivells (Hattie):** les rúbriques donen feedback de tasca; falta
  sistematitzar el de *procés* («quina estratègia has fet servir») al diari de bord.

## 3 · Transformació concreta: SA8 S2 «IoT: arquitectura, aplicacions i riscos»

**Per què aquesta:** és la sessió més teòrica del curs (arquitectura
dispositiu-xarxa-núvol-app, MQTT, privacitat, RGPD), en paper, i la crítica ja la va
assenyalar com a infrautilitzada. Contingut declaratiu → candidat ideal.

### Experiència proposada: «Auditoria d'un producte IoT real» (100')

> Rol autèntic + cas real + producte breu. Mateix contingut, zero material nou.

1. **Ganxo (10')** — es projecten 3 productes IoT reals i propers (polsera esportiva,
   càmera de vigilància domèstica, assistent de veu). Pregunta: *«què saben de tu, per
   on viatja, i qui més ho pot veure?»* Vot ràpid amb mà alçada: quin comprarien.
2. **Mini-lliçó (15')** — l'arquitectura dispositiu→xarxa→núvol→app **dibuixada sobre
   un dels 3 productes**, no en abstracte. El vocabulari (MQTT, broker, xifratge) entra
   etiquetant el dibuix.
3. **Auditoria per parelles (40')** — cada parella rep **un** producte (targeta amb
   especificacions reals simplificades) i el rol d'**auditors de privacitat**:
   omplen l'informe d'una pàgina: (a) diagrama de l'arquitectura del seu producte,
   (b) 3 dades personals que recull, (c) 2 riscos concrets (tècnic + de privacitat),
   (d) 1 recomanació al fabricant i 1 al comprador. La fitxa de riscos existent fa de
   font de consulta, no de contingut a llegir.
4. **Peritatge creuat (20')** — cada parella presenta 90 segons el seu informe a una
   altra parella, que fa d'**advocat del fabricant** (ha de rebatre un risc). Rotació
   de rols. Això força l'argumentació amb el vocabulari tècnic (CA4.2, CA5.3).
5. **Tancament (10')** — exit ticket: *«quina dada teva viatja ara mateix per una
   arquitectura com aquesta, i on es podria interceptar?»* + entrada de quadern.
6. **Pont a la S3 (IA):** els mateixos productes reapareixen a la sessió d'IA («i si
   el producte a més *decideix*?») — continuïtat narrativa entre sessions.

**Per què funciona:** rol autèntic (ARCS-Relevance + autodeterminació), el contingut
teòric es fa servir *per fer una feina*, l'estructura d'informe és una bastida
d'escriptura (no fulla en blanc), el peritatge creuat és avaluació entre iguals amb
propòsit, i tot cau dins dels ~100' efectius. **Evidència avaluable:** l'informe
d'auditoria → CA4.2/CA5.3 (mateixos criteris que la fitxa actual).

**Cost d'implementació:** 1 document nou (`SA8_targetes_auditoria.md` amb 6-8
productes) + retocar la taula de la S2 a la guia. ~2 h de feina docent.

## 4 · Recomanacions transversals (per ordre de valor/cost)

1. **Replicar el patró «targeta de represa»** (fet avui amb Python) a la ràdio
   micro:bit abans de SA8 S1: 10' de repàs espaiat evita rearrencar de zero.
2. **Micro-eleccions d'alumne a cada SA** (quin objecte, quina dada, quin so): llista
   de 3 opcions per repte on sigui gratuït — puja «Relevance» sense tocar estructura.
3. **Feedback de procés al diari de bord:** afegir una pregunta fixa («quina estratègia
   he fet servir quan m'he encallat?») — connecta amb DEPURA i fa metacognició.
4. **Transformar SA8 S2 en l'auditoria** del punt 3 (el millor quocient valor/cost del
   curs per a contingut teòric).
5. **Gamificar la progressió dels reptes** ⭐/⭐⭐/⭐⭐⭐ amb un tauler visible d'aula
   (constel·lació de reptes superats per equip, no per persona): pressió social
   positiva sense rànquing individual.
