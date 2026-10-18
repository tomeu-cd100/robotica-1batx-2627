# 2026-10-18 · SA3 simplificada: el mateix sistema que la SA2

## Per què

El docent va demanar d'aplicar a la SA3 el sistema de la SA2 (vegeu `2026-10-18_SA2_simplificada_pas_a_pas.md`): itinerari pas a pas, pràctiques amb el codi al lloc i llenguatge per a 12 anys.

## Decisions del docent

- **Producte de la S3 = la mascota** (≥3 reaccions + fitxa de personalitat). Fins ara la fitxa demanava alhora l'alarma d'aparcament i la mascota.
- **Ultrasons: es mantenen a la S3, abans de la mascota** (versió curta, ~25'). L'alarma d'aparcament (pràctica 4) passa a «si acabes abans».

## Què s'ha fet

- **Katas de la SA3 arxivats** a `docs/arxiu/SA3_katas/` (`KATAS_ARXIVATS = {2, 3}`); fora el ganxo de les 4 pràctiques; transversals: katas = SA4-SA8.
- **Portada**: 4 regles (+ què és el Monitor sèrie) i 4 sessions plegables. S2 acaba amb deures: nom i caràcter de la mascota. S3: mini-check → ultrasons → **desmuntar l'ultrasons** (el pin 11 és el blau del RGB de la mascota) → fitxa de la mascota → muntatge → esquelet del dossier (soroll fet; foscor i PIR) → defensa → Envia. S4: prova T1.
- **Pràctiques 1-4** en format pas a pas amb `<!-- codi-complet -->` i analogies (llum que s'apaga en prémer = pull-up, pilota que bota = antirebot, marca d'alçada de les atraccions = llindar, nota sobre 20 → sobre 10 = `map()`, ratpenat = ultrasons, preguntar i que et responguin = funció que retorna). Repte de la S1 guiat (comptar fins a 5) amb experiment de l'antirebot a 0.
- **Esquemes**: llenguatge senzill + apartat 5 nou, «La mascota», amb la taula de pins del dossier.
- **Fitxa base i ampliada, checklist, diagrama, exemple resolt, reptes, qüestionari (només intro i paraules)**: llenguatge senzill; producte = mascota.
- **Guia docent**: xuleta de sessió; S1 sense kata (112'); S3 reestructurada (10+25+55+10 = 100'); avís de llibreries NeoPixel/DHT. **Checklist docent** i **programació 12** sincronitzats. Títol nou de la S3: «Ultrasons + PRODUCTE: la mascota» (quadern, calendari, banc d'activació). PDFs del quadern T1-T3 i checklist SA3 regenerats.
- **`sa_definicions.js` (SA3)**: 3 activitats; l'Activitat 3 inclou ultrasons + nom/caràcter + 3 reaccions (la 3a opcional); reptes opcionals.
- `NOMES_CONSULTA`: diagrama, exemple resolt i qüestionari de la SA3 fora del camí.

## Pendent

- ⚠️ **Formulari de Classroom de la SA3**: la definició és nova; cal crear-lo o actualitzar-lo a Classroom (a la definició consta `state: 'DRAFT'`).
- ⚠️ La mascota a la S3 de la SA3 depèn que les caixes es tallin a la S3 de la SA2 (decisió encara oberta) i que les llibreries NeoPixel i DHT estiguin instal·lades.
