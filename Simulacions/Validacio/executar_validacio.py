#!/usr/bin/env python3
"""Executa la validació per simulació (wokwi-cli) dels reptes ⭐⭐⭐.

Per cada carpeta SA*_*/ d'aquest directori:
  1. copia els binaris compilats de build/<carpeta>/ (ampliat.ino.hex + .elf),
  2. llegeix execucions.json i llança wokwi-cli per cada escenari,
  3. desa el registre sèrie a logs/ i escriu resultats.md + resultats.json.

Requisits: WOKWI_CLI_TOKEN al entorn (https://wokwi.com/dashboard/ci),
wokwi-cli i arduino-cli al PATH (o a ~/.local/bin).

Ús:
  py Simulacions/Validacio/executar_validacio.py            # tot
  py Simulacions/Validacio/executar_validacio.py SA6_A      # només un repte
  py Simulacions/Validacio/executar_validacio.py --compila  # recompila abans
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# Consoles Windows sovint van amb cp1252: força UTF-8 per als símbols
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ARREL = Path(__file__).resolve().parent
REPO = ARREL.parent.parent
BUILD = ARREL / "build"
LOGS = ARREL / "logs"

# Correspondència carpeta de validació → sketch del solucionari
SKETCHS = {
    "SA1_A": "Reptes/Solucionari/SA1/A_far_costaner/ampliat",
    "SA1_B": "Reptes/Solucionari/SA1/B_llum_bici/ampliat",
    "SA1_C": "Reptes/Solucionari/SA1/C_morse/ampliat",
    "SA2_A": "Reptes/Solucionari/SA2/A_semafor/ampliat",
    "SA2_B": "Reptes/Solucionari/SA2/B_llum_ambient/ampliat",
    "SA2_C": "Reptes/Solucionari/SA2/C_indicador_nivell/ampliat",
    "SA3_A": "Reptes/Solucionari/SA3/A_llum_nocturna/ampliat",
    "SA3_B": "Reptes/Solucionari/SA3/B_sensor_aparcament/ampliat",
    "SA3_C": "Reptes/Solucionari/SA3/C_instrument/ampliat",
    "SA4_A": "Reptes/Solucionari/SA4/A_barrera/ampliat",
    "SA4_B": "Reptes/Solucionari/SA4/B_ventilador/ampliat",
    "SA4_C": "Reptes/Solucionari/SA4/C_brac_dispensador/ampliat",
    "SA6_A": "Reptes/Solucionari/SA6/A_termostat/ampliat",
    "SA6_B": "Reptes/Solucionari/SA6/B_semafor_adaptatiu/ampliat",
    "SA6_C": "Reptes/Solucionari/SA6/C_proporcional/ampliat",
    "SA8_A": "Reptes/Solucionari/SA8/A_estacio_meteo_esp32",
    "SA8_A_wokwi": "Simulacions/Validacio/SA8_A_wokwi/src",
}

# Reptes que no són Arduino UNO: fqbn específic
FQBN = {
    "SA8_A": "esp32:esp32:esp32",
    "SA8_A_wokwi": "esp32:esp32:esp32",
}
FQBN_PER_DEFECTE = "arduino:avr:uno"


def troba_binari(nom: str) -> str:
    cami = shutil.which(nom)
    if cami:
        return cami
    local = Path.home() / ".local" / "bin" / f"{nom}.exe"
    if local.exists():
        return str(local)
    sys.exit(f"ERROR: no trobo {nom} (ni al PATH ni a ~/.local/bin).")


def compila(nom: str) -> None:
    arduino = troba_binari("arduino-cli")
    origen = REPO / SKETCHS[nom]
    desti = BUILD / nom
    print(f"  compilant {nom}…")
    subprocess.run(
        [arduino, "compile", "--fqbn", FQBN.get(nom, FQBN_PER_DEFECTE),
         "--output-dir", str(desti), str(origen)],
        check=True, capture_output=True,
    )


def executa_repte(nom: str, wokwi: str) -> list[dict]:
    carpeta = ARREL / nom
    dades = json.loads((carpeta / "execucions.json").read_text(encoding="utf-8"))
    # Accepta tant una llista plana com un objecte amb la clau "execucions"
    execucions = dades if isinstance(dades, list) else dades["execucions"]
    # Copia els binaris al costat del wokwi.toml (camins relatius simples)
    for binari in (BUILD / nom).iterdir():
        if binari.suffix in (".hex", ".elf", ".bin"):
            shutil.copy2(binari, carpeta / binari.name)

    resultats = []
    for i, exe in enumerate(execucions, 1):
        escenari = exe["escenari"]
        diagrama = exe.get("diagrama", "diagram.json")
        timeout = exe.get("timeout_ms", 60000)
        log = LOGS / f"{nom}_{i}_{Path(escenari).stem}.log"
        ordre = [
            wokwi, str(carpeta),
            "--scenario", str(carpeta / escenari),
            "--diagram-file", str(carpeta / diagrama),
            "--timeout", str(timeout),
            "--serial-log-file", str(log),
            "--quiet",
        ]
        proc = subprocess.run(ordre, capture_output=True, text=True)
        # La xarxa del centre a vegades talla el WebSocket (code 1006): reintenta
        if proc.returncode not in (0, 42) and "API Error" in (proc.stdout + proc.stderr):
            print(f"  ↻ {nom} · {escenari}: tall de connexió, reintento…")
            proc = subprocess.run(ordre, capture_output=True, text=True)
        estat = "PASSA" if proc.returncode == 0 else (
            "TIMEOUT" if proc.returncode == 42 else "FALLA")
        resultats.append({
            "repte": nom, "escenari": escenari, "diagrama": diagrama,
            "descripcio": exe.get("descripcio", ""), "estat": estat,
            "codi_sortida": proc.returncode, "log": log.name,
            "sortida": (proc.stdout + proc.stderr)[-2000:],
        })
        simbol = {"PASSA": "✅", "TIMEOUT": "⏱️", "FALLA": "❌"}[estat]
        print(f"  {simbol} {nom} · {escenari} → {estat}")
    return resultats


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    recompila = "--compila" in sys.argv

    if not os.environ.get("WOKWI_CLI_TOKEN"):
        sys.exit("ERROR: falta WOKWI_CLI_TOKEN. Obtén-lo a "
                 "https://wokwi.com/dashboard/ci i exporta'l abans d'executar.")

    wokwi = troba_binari("wokwi-cli")
    LOGS.mkdir(exist_ok=True)

    noms = args if args else sorted(
        d.name for d in ARREL.iterdir()
        if d.is_dir() and d.name in SKETCHS and (d / "execucions.json").exists())
    if not noms:
        sys.exit("Cap carpeta de validació amb execucions.json trobada.")

    tots = []
    for nom in noms:
        if recompila:
            compila(nom)
        print(f"— {nom} —")
        tots.extend(executa_repte(nom, wokwi))

    # Execució parcial: fusiona amb els resultats anteriors dels altres reptes
    fitxer_resultats = ARREL / "resultats.json"
    if args and fitxer_resultats.exists():
        previs = json.loads(fitxer_resultats.read_text(encoding="utf-8"))
        tots = [r for r in previs if r["repte"] not in noms] + tots
        tots.sort(key=lambda r: (r["repte"], r["escenari"]))
    fitxer_resultats.write_text(
        json.dumps(tots, ensure_ascii=False, indent=2), encoding="utf-8")

    linies = [
        "# Resultats de la validació per simulació (wokwi-cli)",
        "",
        f"Data: {datetime.now():%Y-%m-%d %H:%M} · "
        f"{sum(r['estat'] == 'PASSA' for r in tots)}/{len(tots)} execucions passen",
        "",
        "| Repte | Escenari | Estat | Què valida |",
        "|---|---|---|---|",
    ]
    for r in tots:
        linies.append(f"| {r['repte']} | {r['escenari']} | {r['estat']} "
                      f"| {r['descripcio']} |")
    (ARREL / "resultats.md").write_text("\n".join(linies) + "\n", encoding="utf-8")

    fallades = [r for r in tots if r["estat"] != "PASSA"]
    print(f"\nTotal: {len(tots) - len(fallades)}/{len(tots)} passen. "
          f"Detall a resultats.md i logs/.")
    sys.exit(1 if fallades else 0)


if __name__ == "__main__":
    main()
