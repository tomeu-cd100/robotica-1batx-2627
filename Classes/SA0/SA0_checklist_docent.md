# SA0 · Checklist docent — Vocabulari i bases de programació

**Material transversal de suport (NO consumeix sessions ni qualifica)** · Arduino C/C++ + MicroPython · Base prèvia a SA1–SA9

> La SA0 és una **bastida de consulta**, no una unitat amb calendari. Aquest checklist és de *desplegament i seguiment*, no de sessions. Vegeu [`SA0_guia_docent.md`](SA0_guia_docent.md).

## 🧰 1. Preparar i repartir (inici de curs)
- [ ] Repartir/enllaçar el [`SA0_vocabulari_essencial.md`](SA0_vocabulari_essencial.md) (glossari per SA, projectable i imprimible com a "diccionari de butxaca")
- [ ] Repartir/enllaçar la [`SA0_guia_programacio.md`](SA0_guia_programacio.md) (Arduino + MicroPython + comparativa)
- [ ] Proposar la [`SA0_fitxa_alumnat.md`](SA0_fitxa_alumnat.md) com a **autodiagnòstic voluntari** la 1a setmana (15–20' dins la SA1) — es respon a la **tasca de Classroom** del tema SA0 (Google Form, sense nota, act. 2-3 autocorrectives)
- [ ] Tenir a mà el **solucionari de la fitxa** (dins [`SA0_guia_docent.md`](SA0_guia_docent.md))
- [ ] Presentar la **rutina DEPURA** (s'usarà a totes les SA)

## 🔁 2. Integrar-la durant el curs (3 escenaris)
- [ ] **Inici de curs:** material de referència + autodiagnòstic informal abans de la SA1
- [ ] **Bastida puntual (diversitat):** derivar a seccions concretes qui necessiti reforç (p. ex. "repassa A6. `if/else`" abans de la SA3)
- [ ] **Pont a MicroPython:** abans de la **SA5**, fer llegir la Part B + taula comparativa (Part C) per amortir el canvi de llenguatge
- [ ] **Referenciar-la explícitament** cada cop que un terme o concepte reaparegui en una SA

## ⚠️ 3. Precisions tècniques a no descuidar
- [ ] `analogRead` → 0–1023 (10 bits) vs `analogWrite`/PWM → 0–255 (8 bits): l'error conceptual més comú
- [ ] PWM ≠ senyal analògic real (commutació ràpida); no afirmar "el pin treu 2,5 V"
- [ ] `delay()` bloqueja; `millis()` només com a ampliació
- [ ] `INPUT_PULLUP` es comentarà al *debounce* de la SA3 (aquí simplificat a `INPUT`)
- [ ] MicroPython ≠ Python complet (editors: python.microbit.org, Thonny)

## 🪜 4. Atenció a la diversitat
- [ ] **Bastida:** derivar a seccions concretes; "diccionari de butxaca" imprès
- [ ] **+ Ampliació:** `millis()` (A5), funcions amb paràmetres (A8), traduir més exemples Arduino↔MicroPython (Part C)
- [ ] **Diversitat lectora/lingüística:** glossari amb analogies del dia a dia
- [ ] **Sense maquinari:** tot es prova a Tinkercad/Wokwi i a python.microbit.org

> La SA0 **no qualifica**: la seva funció és anivellar i donar autonomia de consulta.
