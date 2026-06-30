# 09b · Guia de compra i pressupost del maquinari

Llista de compra orientativa per **engegar la matèria des de zero**, derivada de l'inventari de `09_Materials_recursos_per_unitat.md`. Pensada per a un grup de **~30 alumnes treballant en 15 parelles**.

> ⚠️ **Els preus són orientatius (mercat 2026, IVA inclòs) i varien molt** segons proveïdor, marca i si la placa és **oficial** o **compatible (clon)**. Demana sempre pressupost a diversos proveïdors educatius. Tot el curs es pot fer **sense maquinari** amb simuladors (Tinkercad/Wokwi) si el pressupost és nul.

> 📦 **Ja tens material?** Aquesta guia és per **comprar des de zero**. La **dotació real del centre** (3 kits/alumne + micro:bit + Imagina 3dBot) està inventariada a **`09c_Inventari_kits_disponibles.md`**; segons aquell inventari, **l'única compra pendent és el pont H L298N (SA4)**.

---

## 1. Estratègia de compra (llegeix-ho abans)

- **Compatibles vs oficials:** per a una optativa, les plaques **compatibles** (UNO clon amb xip CH340) abarateixen molt el cost; necessiten el **driver CH340** (vegeu `GUIA_INICI_DOCENT.md`). Les **oficials** són més robustes i no necessiten driver: val la pena tenir-ne **1–2 de reserva** oficials.
- **Kits "tot en un" vs solt:** un **kit d'iniciació Arduino** (placa + protoboard + cables + LED + resistències + sensors bàsics) sol sortir més a compte que comprar-ho tot solt i ja ve organitzat per parella.
- **Compra per parella + material comú:** 15 estacions de treball + una caixa de material comú (resistències, cables) que es reposa.
- **micro:bit:** millor un **set d'aula** (la ràdio necessita 2 plaques per parella com a mínim per a SA5/SA8).
- **Robòtica mòbil:** la **Imagina 3dBot** és l'element més car; es pot comprar en **menor quantitat i compartir** (treball en equip a SA7/SA9).

---

## 2. Kit per parella (×15)

| Component | Quant./parella | Cost orientatiu/u | SA |
|---|---|---|---|
| Placa Arduino UNO (compatible, CH340) | 1 | 7–10 € | SA2–SA4, SA6 |
| Cable USB **de dades** (segons placa) | 1 | 2–4 € | totes Arduino |
| Protoboard (breadboard) | 1 | 2–4 € | SA2–SA6 |
| Joc de cables dupont (M-M, M-F) | 1 joc | 2–3 € | totes |
| LED (vermell, groc, verd) + 1 RGB | ~6 | 0,10–0,30 €/u | SA2 |
| Resistències 220 Ω i 10 kΩ | ~10 | cèntims | SA2–SA3 |
| Polsadors | 2 | 0,10 € | SA3 |
| Potenciòmetre | 1 | 0,50 € | SA3 |
| LDR + NTC | 1+1 | 0,30 € | SA3, SA6 |
| Brunzidor piezo | 1 | 0,50 € | SA2–SA3 |
| Sensor d'ultrasons HC-SR04 | 1 | 1,5–3 € | SA3–SA4 |
| Servo SG90 | 1 | 2–4 € | SA4 |
| Motor DC + **driver pont H L298N** | 1+1 | 3–6 € | SA4 |
| Mòdul relé | 1 | 1–2 € | SA2 |
| Portapiles 4×AA + piles (alim. externa) | 1 | 2–3 € | SA4 |

> **Estimació per parella:** **~30–50 €** (compatible) → **×15 parelles ≈ 450–750 €**. Un bon **kit d'iniciació** que ja inclogui la majoria d'aquests components sol estar a **25–45 €/kit**.

---

## 3. micro:bit (SA5 i SA8)

| Component | Quant. | Cost orientatiu/u |
|---|---|---|
| Placa **micro:bit V2** | 15–30 (mínim 2/parella per a la ràdio) | 18–25 € |
| Cable USB de dades | 1 per placa | 2–4 € |
| Micro:shield (perifèrics, **opcional**) | segons necessitat | 5–10 € |

> **Estimació:** 30 micro:bit ≈ **540–750 €**. Si el pressupost és just, comprar-ne **menys i treballar en grups més grans** a SA5/SA8, o usar el **simulador** (python.microbit.org) per a part de l'alumnat.

---

## 4. Robòtica mòbil (SA7 i SA9)

| Component | Quant. | Cost orientatiu/u |
|---|---|---|
| Placa/robot **Imagina 3dBot** (xassís + motors) | 6–8 (compartit en equips) | 60–120 € |
| Material per a la **pista** (cinta aïllant negra, cartró, obstacles) | — | 10–20 € total |

> **Estimació:** 8 robots ≈ **480–960 €**. És la inversió més gran; **compartir en equips** de 3–4 és la pràctica recomanada (i pedagògicament coherent amb el treball cooperatiu de SA7/SA9).

---

## 5. Opcional i material d'aula

| Component | Quant. | Cost orientatiu | Ús |
|---|---|---|---|
| **ESP32** (demo WiFi/IoT) | 1–2 | 5–10 €/u | SA8 (demostració) |
| **Multímetre** (per al docent) | 1–2 | 10–20 €/u | diagnòstic d'avaries |
| **Caixes d'emmagatzematge** etiquetades | 15 + reserva | 2–5 €/u | logística (1 per parella) |
| **Kit de reserva** complet | 1 | (= 1 kit parella) | avaries |
| Consumibles de reposició (cables, LED, resistències) | — | 20–40 €/any | manteniment |

---

## 6. Resum de pressupost orientatiu

| Bloc | Estimació (compatible) |
|---|---|
| 15 kits Arduino per parella | 450–750 € |
| 30 micro:bit + cables | 540–750 € |
| 8 robots Imagina 3dBot + pista | 490–980 € |
| Opcional i material d'aula | 100–200 € |
| **TOTAL orientatiu (curs complet)** | **≈ 1.600–2.700 €** |

> **Versió mínima** (un sol trimestre Arduino + simuladors per a la resta): **~500–800 €**. La resta de SA es cobreix amb **Tinkercad/Wokwi** i el simulador de micro:bit fins que hi hagi pressupost.

---

## 7. On comprar (orientatiu, sense afiliació)

- **Oficial Arduino i material educatiu:** [arduino.cc/education](https://www.arduino.cc/education) i distribuïdors educatius.
- **micro:bit:** [microbit.org/buy](https://microbit.org/buy) i distribuïdors (Farnell, RS…).
- **Imagina 3dBot:** Innova Didactic (distribuïdor educatiu).
- **Components solts i kits:** botigues d'electrònica educativa (BricoGeek, Electan, AliExpress per a compatibles, RS/Farnell per a centres amb facturació).

> Per a centres públics, consulta el **procediment de compra/licitació** del teu centre i demana **factura amb dades del centre**. Algunes editorials i distribuïdors ofereixen **packs d'aula** amb descompte per volum.

---

*Guia orientativa sota llicència CC BY-SA 4.0. Preus a revisar abans de cada compra. Complementa `09_Materials_recursos_per_unitat.md`.*
