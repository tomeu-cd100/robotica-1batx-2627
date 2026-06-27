# Memòria de treball — Material d'aula SA1-SA3
### Data: 26 de juny de 2026

Registre de l'avenç: creació del **material d'aula** de les tres primeres situacions d'aprenentatge, a la nova carpeta `Classes/`.

---

## Què s'ha fet

S'ha creat la carpeta **`Classes/`** amb el material llest per impartir de **SA1, SA2 i SA3** (trimestre 1, fonaments amb Arduino C/C++).

### Estructura creada
```
Classes/
├── 00_LLEGEIX-ME_Classes.md
├── SA1/  (Introducció a la robòtica)
│   ├── SA1_guia_docent.md
│   ├── SA1_fitxa_alumnat.md
│   └── codi/ (blink.ino, blink_repte.ino)
├── SA2/  (Sortides digitals i PWM)
│   ├── SA2_guia_docent.md
│   ├── SA2_fitxa_alumnat.md
│   ├── SA2_esquemes_connexions.md
│   └── codi/ (01_led_basic, 02_semafor, 03_fade_pwm, 04_rgb, 05_panell_senyalitzacio)
└── SA3/  (Entrades i sensors)
    ├── SA3_guia_docent.md
    ├── SA3_fitxa_alumnat.md
    ├── SA3_esquemes_connexions.md
    └── codi/ (01_polsador_debounce, 02_potenciometre_ldr, 03_ultrasons_funcio, 04_alarma_aparcament)
```

### Contingut de cada SA
- **Guia docent:** objectius, materials, seqüència **sessió a sessió** (fases, temps, activitats), punts clau i taula d'**errors freqüents amb solució**.
- **Fitxa d'alumnat:** activitats guiades, reptes i d'ampliació, taules de registre i **quadern tècnic**.
- **Esquemes de connexió:** taules pin-a-pin + diagrames ASCII (reproduïbles a Tinkercad/Wokwi). *(SA2 i SA3.)*
- **Codi `.ino`:** 11 sketches comentats en català, oberts directament a l'Arduino IDE.

### Decisions tècniques
- Comentaris dels `.ino` **sense accents** per evitar problemes de codificació en IDE/plaques.
- Assignació de pins coherent entre sketches i esquemes.
- Inclou solucions de reptes i variants d'ampliació (atenció a la diversitat).

---

## Estat del projecte

| Carpeta | Estat |
|---|---|
| `Normativa/` | ✅ |
| `Recursos/` | ✅ |
| `Programació didàctica/` | ✅ (19 documents) |
| `Classes/` | 🟡 En curs — SA1-SA3 fets |
| `Memòria treball/` | ✅ (registre cronològic) |

## Pendent / passos següents
1. Material d'aula de **SA4-SA6** (motors/servos, micro:bit/Python, sistemes de control).
2. Material d'aula de **SA7-SA9** (robòtica mòbil, IoT/IA, projecte final).
3. (Opcional) Versions **DOCX/PDF** del material per imprimir/compartir.
4. Validar amb el centre la decisió pedagògica i les hores (2/3 h).
