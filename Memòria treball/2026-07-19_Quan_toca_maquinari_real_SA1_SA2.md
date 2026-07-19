# 2026-07-19 · Barrido «quan toca» + primer maquinari real (SA1 i SA2)

**Sessió de 21 commits.** Dos fils: la campanya transversal perquè cada material digui
**quan s'usa**, i les primeres evidències de **maquinari real** del curs (Blink i semàfor).

## 1. Maquinari real i simulador (SA1 i SA2)

- **SA1 · Blink**: captura de Tinkercad + fotografia del muntatge real (LED extern al
  **pin 8**, documentat com a *variant* — el pin 13 segueix sent el canònic) + enllaç
  públic amb *sharecode*. Nova secció §2.3 als esquemes. La mateixa captura es reutilitza
  a l'exercici 1 de SA2 (mateix circuit, mateix pin).
- **SA2 · Semàfor**: seqüència completa als esquemes — esquema elèctric → **diagrama nou
  de protoboard** (`sa2-semafor-protoboard.svg`, estil del curs, verificat amb render
  headless) → captura del simulador → fotografia real (fase vermella encesa) → enllaç
  Tinkercad amb *sharecode*.
- Lliçó Tinkercad: l'URL d'edició demana login; **només l'enllaç amb `sharecode` és
  públic** (comprovat amb fetch anònim les dues vegades).

## 2. Barrido «quan toca» (tot el curs)

Cada material del camí de l'alumnat porta ara un bloc inicial que diu **quan s'usa**:

| Material | Què s'hi ha afegit |
|---|---|
| Fitxes base (SA0–SA9) | «No cal que la responguis d'entrada» + enunciats dins la tasca Classroom; secció **Producte** visible a la web (era dins `web:only-github`) |
| Fitxes ampliades | «Quan toca obrir-la?» + mapa 🗺️ per apartats |
| Diagrames de flux | Activitat i sessió del programa dibuixat + enllaç des de l'itinerari |
| Exemples resolts | «Quan toca mirar-lo?» (després del primer intent) + mapa de lectura per apartats |
| Qüestionaris de conceptes | Consolidació en tancar la SA + repàs pre-prova (T1/T2/T3) |
| Checklists alumnat | Durant tota la SA + repàs sencer abans d'entregar |
| Checklists docent | Flux d'ús (§1 en preparar, §2–§4 a taula) — ja duien el moment per secció |
| Guies docents | Bloc 🧭 «Com s'usa aquesta guia» (abans / per sessió / transversal / en avaluar) |
| Reptes (SA1–SA8) | Ampliació ⭐ amb el nucli al dia; SA5 també producte; SA9 banc = tria a S1 |
| Solucionari de reptes | Quan s'usa (validar ⭐, no es passa a l'alumnat) + avís actualitzat (validat en simulació) |
| Esquemes de connexions | Correspondència secció → activitat/sessió; **fix**: la ràdio de SA5 és l'Act. 3, no la 4 |
| Normes seguretat / prova diagnòstica | S2 (Act. 3, compromís per tot el curs) / S1 («respon-la sense por») |
| Transversal `00_General` | 12 documents que no deien «quan» (els altres 15 ja ho deien) |

## 3. Altres

- **Títol SA2**: ara desplega PWM (*Pulse Width Modulation*) — sincronitzat als 5 llocs.
- **Bastides integrades**: els 7 esquelets `*_BASTIDA` orfes (SA1–SA5, SA7, SA8) ara tenen
  la línia «si t'encalles, parteix de l'esquelet…» a la seva fitxa, com SA6. Tot el codi
  de cada SA queda referenciat per la seva SA.
- **Incidències d'entorn**: el launcher `py` ara resol a Python 3.13 sense paquets — usar
  `py -3.11` (o instal·lar requirements a 3.13). Un script va committar 9 fitxers amb
  CRLF (contingut intacte, diff inflat): per editar `.md`, eina Edit, no reescriptura.

## Pendent

- Captura de Tinkercad amb l'**error d'explosió** (SA2, 19:49) sense publicar: decidir si
  s'aprofita com a material de «què passa si t'equivoques» o es descarta.
- Continua pendent tot el bloc de **maquinari real de setembre** (SA7, ràdio, WiFi) i la
  resta de pendents oberts.
