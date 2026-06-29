# Robòtica · 1r de Batxillerat (curs 2026-2027)

Material docent complet per a la matèria optativa **Robòtica** de 1r de Batxillerat (modalitats científica i tecnològica), en el marc de la **LOMLOE** a **Catalunya** (Decret 171/2022).

> **2 hores setmanals · curs anual (≈70 h) · nivell alt · en català**
> Programació real amb **Arduino (C/C++)** i **micro:bit (MicroPython)**, electrònica, sistemes de control i robòtica mòbil.

---

## 🎯 Plantejament

La matèria s'organitza en **9 situacions d'aprenentatge (SA1-SA9)** distribuïdes en tres trimestres, amb un enfocament competencial i pràctic. Es vincula a **Tecnologia i Enginyeria I** (competència específica de control i robòtica + bloc d'automatització) i culmina amb un **projecte final** d'integració.

| Trimestre | SA | Eix |
|---|---|---|
| **1r** | SA1-SA3 | Introducció, sortides digitals/PWM, entrades i sensors (Arduino) |
| **2n** | SA4-SA6 | Moviment (servos/motors), micro:bit/MicroPython, sistemes de control |
| **3r** | SA7-SA9 | Robòtica mòbil, IoT/IA, projecte final |

---

## 🗂️ Estructura del repositori

| Carpeta | Contingut |
|---|---|
| **`Normativa/`** | Síntesi del marc legal LOMLOE + PDFs oficials (RD 243/2022, Decret 171/2022, DOIGC…). |
| **`Recursos/`** | Full de càlcul amb 54 recursos de professorat en obert (títol, explicació, enllaç, paraules clau). |
| **`Programació didàctica/`** | Programació completa en documents separats: objectius, sabers, metodologia, atenció a la diversitat, avaluació, rúbriques, seqüenciació anual i les 9 SA. |
| **`Classes/`** | Material d'aula per SA (guia docent, fitxa d'alumnat, esquemes de connexions i **codi** `.ino`/`.py`), amb `Solucionari/` de les ampliacions («+ repte») de les pràctiques. |
| **`Reptes/`** | Tres reptes triables (contextos diferents, mateixos continguts) per a cada SA1-SA8, amb el seu `Solucionari/` (versions mínim i ampliat). |
| **`Simulacions/`** | Circuits i codi en format **Wokwi** (text reproduïble) de les pràctiques i dels reptes, amb enllaços públics interactius. |
| **`Avaluació/`** | 3 proves pràctiques (una per trimestre), amb enunciat per nivells, graella de correcció i solució orientativa. |
| **`Memòria treball/`** | Registre datat de l'evolució del projecte. |

---

## 🧰 Maquinari de referència

Pensat per a kits **Arduino** (UNO i compatibles), **micro:bit** (amb micro:shield), placa **Imagina 3dBot** (robòtica mòbil) i components d'electrònica bàsica (LED, LDR, NTC, servos, pont H L298N, ultrasons HC-SR04…). Es pot treballar sense maquinari amb els simuladors **Tinkercad Circuits** i **Wokwi**.

> ℹ️ El codi inclou comentaris en català **sense accents** de manera intencionada, per evitar problemes de codificació a l'IDE d'Arduino i a les plaques.

---

## 🚀 Com usar aquest material

> 🟢 **És el teu primer cop amb aquest material?** Comença per **[`GUIA_INICI_DOCENT.md`](GUIA_INICI_DOCENT.md)**: engegada de l'entorn pas a pas, nivell mínim del docent + autoformació exprés i pla B per a incidències a l'aula.

1. Llegeix la **`GUIA_INICI_DOCENT.md`** i fes la checklist de la primera setmana (instal·lació, comptes, kits).
2. Mira la visió de conjunt a `Programació didàctica/00_Index_general.md`.
3. Per a cada sessió, obre la SA corresponent dins `Classes/` (guia docent + fitxa d'alumnat + codi).
4. Avalua amb les proves de `Avaluació/` i les rúbriques de `Programació didàctica/07_Rubriques.md`.

---

## 📄 Llicència

Aquest material es publica sota llicència **[Creative Commons Reconeixement-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.ca)**.

Ets lliure de **compartir** i **adaptar** el material per a qualsevol finalitat, fins i tot comercial, sempre que en facis **reconeixement** de l'autoria i distribueixis les obres derivades amb la **mateixa llicència**. Vegeu el fitxer [`LICENSE`](LICENSE).
