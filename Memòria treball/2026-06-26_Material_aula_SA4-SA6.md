# Memòria de treball — Material d'aula SA4-SA6
### Data: 26 de juny de 2026

Registre de l'avenç: creació del **material d'aula del trimestre 2** (SA4, SA5 i SA6) a la carpeta `Classes/`.

---

## Què s'ha fet

S'ha completat el material d'aula de les tres situacions d'aprenentatge del **trimestre 2** (control i sensors).

### Estructura creada
```
Classes/
├── SA4/  (Moviment: servos, motors i ponts H)
│   ├── SA4_guia_docent.md
│   ├── SA4_fitxa_alumnat.md
│   ├── SA4_esquemes_connexions.md
│   └── codi/ (01_servo_potenciometre, 02_motor_pont_h, 03_sensor_velocitat, 04_barrera_automatica) .ino
├── SA5/  (micro:bit i MicroPython)
│   ├── SA5_guia_docent.md
│   ├── SA5_fitxa_alumnat.md
│   ├── SA5_connexions.md
│   └── codi/ (01_name_badge, 02_passes, 03_nightlight, 04_radio_dau) .py
└── SA6/  (Sistemes de control)
    ├── SA6_guia_docent.md
    ├── SA6_fitxa_alumnat.md
    ├── SA6_esquemes_connexions.md
    └── codi/ (01_llac_obert_vs_tancat, 02_termostat_histeresi, 03_maquina_estats, 04_control_proporcional) .ino
```

### Continguts destacats
- **SA4:** servo amb potenciòmetre, motor DC amb pont H (L298N), sensor que regula velocitat i producte "barrera automàtica". Èmfasi en **massa comuna** i alimentació externa.
- **SA5:** canvi de llenguatge a **MicroPython** (fitxers `.py`): badge, comptapassos (acceleròmetre), nightlight (sensor de llum) i dau per **ràdio** entre dues plaques. Inclou **taula comparativa C++ ↔ Python**.
- **SA6:** llaç obert vs tancat, termòstat amb **histèresi**, **màquina d'estats** (`enum`/`switch` amb `millis()`) i **control proporcional** (base del PID). Diagrames de blocs i d'estats a les fitxes.

### Decisions tècniques
- Codi de SA5 en `.py` (MicroPython); SA4 i SA6 en `.ino` (C/C++).
- Comentaris sense accents per evitar problemes de codificació.
- Assignació de pins coherent entre sketches i esquemes; ús de `constrain`/`map` i `millis()` per a bones pràctiques.

---

## Estat del projecte

| Carpeta | Estat |
|---|---|
| `Normativa/` · `Recursos/` · `Programació didàctica/` | ✅ |
| `Classes/` | 🟡 **SA1-SA6 fets** (trimestres 1 i 2) |
| `Memòria treball/` | ✅ |

## Pendent / passos següents
1. Material d'aula de **SA7-SA9** (robòtica mòbil amb Imagina 3dBot, IoT/IA, projecte final) — trimestre 3.
2. (Opcional) Versions **DOCX/PDF** del material.
3. Validar amb el centre la decisió pedagògica i les hores (2/3 h).
