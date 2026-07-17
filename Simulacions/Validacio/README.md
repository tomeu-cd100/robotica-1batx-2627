# Validació per simulació dels reptes ⭐⭐⭐

Harness de **validació automàtica** de les solucions ampliades (`Reptes/Solucionari/`)
contra les **fites** de cada repte ⭐⭐⭐ (`Reptes/Reptes_SAn.md`), executant el
**firmware AVR real** (el mateix `.hex` que aniria a la placa) amb
[wokwi-cli](https://github.com/wokwi/wokwi-cli).

> **Per a qui és?** Docent (o qui mantingui el solucionari). No és material d'aula:
> és la xarxa de seguretat que garanteix que el codi del solucionari fa el que les
> fites demanen abans de provar-lo al maquinari real.

## Com s'executa

```bash
# 1. Token (un sol cop): https://wokwi.com/dashboard/ci
setx WOKWI_CLI_TOKEN "el-teu-token"

# 2. Tot el joc de proves (o un repte concret)
py Simulacions/Validacio/executar_validacio.py
py Simulacions/Validacio/executar_validacio.py SA6_A
py Simulacions/Validacio/executar_validacio.py --compila   # recompila abans
```

Resultats: `resultats.md` (taula), `resultats.json` (detall) i `logs/` (monitor
sèrie de cada execució). Binaris a `build/` (regenerables amb `--compila`;
requereix `arduino-cli` amb el nucli `arduino:avr` i la llibreria `Servo`).

## Estructura

Cada carpeta `SAn_X/` és un projecte Wokwi:

| Fitxer | Què és |
|---|---|
| `diagram.json` | Circuit coherent amb els pins del codi del solucionari |
| `wokwi.toml` | Apunta al binari compilat (`ampliat.ino.hex`/`.elf`) |
| `escenari_N.yaml` | Passos de validació derivats de les fites |
| `execucions.json` | Quines execucions llançar (escenari + variant de diagrama + timeout) |
| `README.md` | Quines fites cobreix cada escenari i quines només es validen a mà |

## Convencions dels escenaris

- **`wait-serial`** quan el sketch imprimeix (validació robusta); **`delay` +
  `expect-pin`** quan no (el timing del simulador és determinista: es mostreja
  al mig de finestres llargues, mai a la vora d'un canvi).
- La clau de `expect-pin` és **`value:`** (no `expected:` — la versió actual del
  CLI ignora silenciosament la clau equivocada i compara amb `undefined`).
- **`wait-serial` només casa amb sortida POSTERIOR a l'inici del pas**: si
  l'esdeveniment que dispara la impressió és un `set-control`, poseu l'espera
  immediatament després, sense `delay` entremig (o la línia s'imprimirà dins el
  delay i l'espera no casarà mai).
- El mòdul `wokwi-photoresistor-sensor` té l'AO **invertida** (més lux → lectura
  més baixa) i un rang estret (~39–250): per exercitar llindars alts, variant de
  diagrama amb potenciòmetre a l'entrada analògica (vegeu SA3_A).
- Controls d'escenari disponibles: potenciòmetre `position` (0.0–1.0), polsador
  `pressed` (1/0), fotoresistència `lux`. **L'HC-SR04 no en té**: es fan
  variants de diagrama (`diagram_10cm.json`…) amb l'atribut `distance`, una
  execució per distància.
- PWM intermedi no és assertable per pin (oscil·la a ~490 Hz): només els extrems
  `analogWrite(0)`/`(255)` són nivells continus; la resta es valida per sèrie.

## Límits coneguts

- Fites «de paper» (diagrames d'estats, taules, quadern) i d'estructura de codi:
  només validables a mà (vegeu el README de cada repte).
- SA4-C (braç): els servos no s'observen per pin — només prova de fum; validació
  visual a Wokwi web (guió al seu README).
- SA5/SA8 (micro:bit): fora del wokwi-cli. SA8-C es valida amb
  `SA8_C_desktop/valida_sa8c.py` (executa el solucionari intacte amb un mòdul
  `microbit` simulat i guiat: recollida 20×3, entrenament i prediccions).
  SA5-A/B/C i SA8-B es validen al simulador de python.microbit.org (llum,
  acceleròmetre, botons i **injecció de missatges de ràdio** amb el camp
  «Radio message» — els receptors són provables sense segona placa); validació
  visual, no automatitzada (17-07: tot correcte).
- SA7 (3dBot propietari): no simulable — maquinari real.
- Ràdio física, WiFi real (Google Form, 302) i sensors físics: maquinari real.
