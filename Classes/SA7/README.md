# SA7 · Robòtica mòbil: cinemàtica i trajectòries

Setena situació d'aprenentatge (**8 h · 4 sessions**, 3r trimestre). El robot **es mou sol**: control diferencial de motors, **trajectòries** programades (quadrat, recorregut) i **comportaments autònoms** (evita-obstacles amb ultrasons, seguidor de línia amb IR), amb proves i **iteració**. Maquinari: placa Imagina 3dBot (Arduino) + sensors. Programació oficial: `Programació didàctica/16_SA7_Robotica_mobil.md`.

> ⚙️ **Important:** la 3dBot és Arduino-compatible, però **els pins dels motors depenen del model**. Cada `.ino` té un bloc `// === PINS (AJUSTAR) ===`: cal posar-hi els pins reals abans de pujar. La lògica no s'ha de tocar.

## Contingut

| Fitxer | Descripció |
|---|---|
| `SA7_guia_docent.md` | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| `SA7_fitxa_alumnat.md` | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| `SA7_fitxa_ampliada.md` | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| `SA7_esquemes_connexions.md` | Esquemes i connexions (motors, sensors de línia/distància). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_moviment_basic.ino` | Funcions de moviment i cinemàtica diferencial. |
| `02_trajectoria_quadrat.ino` | Trajectòria programada i calibratge del gir de 90°. |
| `03_evita_obstacles.ino` | Comportament reactiu (llaç tancat) amb ultrasons. |
| `04_seguidor_linia.ino` | Seguidor de línia amb sensors IR. |

## Producte i avaluació

- **Producte:** robot mòbil que completa un repte autònom (seguir línia o evitar obstacles) amb codi modular i **registre d'iteracions**.
- **Criteris:** CA4.1, CA3.1, CA1.1 · **Rúbriques:** **R1** (codi), **R3** (robot/control), **R4** (documentació).

## Continuïtat

Ve de la **SA6** (control: llaç tancat i màquines d'estats) i porta a la **SA8** (IoT i IA). Aquí el control es posa **en moviment**; després el robot es **connectarà** i prendrà **decisions intel·ligents**.
