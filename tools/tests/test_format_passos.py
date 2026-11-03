"""Tests del check de format «passos autònoms» de tools/qa.py.

Executa'ls des de l'arrel:  py -m pytest tools/tests -q
"""
import sys
from pathlib import Path

ARREL = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ARREL / "tools"))

from qa import errors_format_practica, errors_format_portada  # noqa: E402

BONA = """# Pràctica 9 · Exemple

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** que passi alguna cosa.

⏱️ 20 min

📦 1 LED

</div>

## 🚀 Pas a pas

### Pas 1 · Munta

Fes-ho.

✅ **Comprova:** s'encén.

### Pas 2 · Canvia

✍️ **Apunta-ho:** què canvia?

### Pas 3 · Respon i envia

📤 [Formulari de la Pràctica 9](https://classroom.google.com/c/AAA/a/BBB/details)

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

Teoria.

</details>
"""


def test_practica_bona_sense_errors():
    assert errors_format_practica(BONA) == []


def test_plantilla_amb_enllac_es_valida():
    text = (ARREL / "docs" / "plantilles" / "PRACTICA_PLANTILLA.md").read_text(encoding="utf-8")
    text = text.replace("ENLLAC_CLASSROOM", "https://classroom.google.com/c/AAA/a/BBB/details")
    assert errors_format_practica(text) == []


def test_falta_capcalera():
    text = BONA.replace('class="cap-practica"', 'class="altra"')
    assert any("capçalera" in e for e in errors_format_practica(text))


def test_falta_linia_de_capcalera():
    text = BONA.replace("⏱️ 20 min", "20 min")
    assert any("⏱️" in e for e in errors_format_practica(text))


def test_menys_de_dos_passos():
    text = BONA.replace("### Pas 1 · Munta", "Munta").replace("### Pas 2 · Canvia", "Canvia")
    assert any("passos" in e for e in errors_format_practica(text))


def test_ultim_pas_no_es_respon_i_envia():
    text = BONA.replace("Pas 3 · Respon i envia", "Pas 3 · Acaba")
    assert any("Respon i envia" in e for e in errors_format_practica(text))


def test_ultim_pas_sense_enllac_classroom():
    text = BONA.replace("https://classroom.google.com/c/AAA/a/BBB/details", "https://exemple.cat")
    assert any("Classroom" in e for e in errors_format_practica(text))


def test_teoria_com_a_h2():
    text = BONA + "\n## 🧠 Com funciona\n\nText.\n"
    assert any("🧠" in e for e in errors_format_practica(text))


def test_sense_apunta():
    text = BONA.replace("✍️ **Apunta-ho:** què canvia?", "Res.")
    assert any("✍️" in e for e in errors_format_practica(text))


PORTADA_BONA = """# SA9

① [Pràctica 1](a.md)

🚩 Final de la Sessió 1: hauries d'haver enviat el formulari de la ①.

## 🏁 Entrega final

Quan hagis acabat la ①.
"""


def test_portada_bona():
    assert errors_format_portada(PORTADA_BONA) == []


def test_plantilla_portada_es_valida():
    text = (ARREL / "docs" / "plantilles" / "PORTADA_SA_PLANTILLA.md").read_text(encoding="utf-8")
    assert errors_format_portada(text) == []


def test_portada_sense_entrega_final():
    assert any("Entrega final" in e
               for e in errors_format_portada(PORTADA_BONA.replace("🏁 Entrega final", "Final")))


def test_portada_sense_fites():
    assert any("🚩" in e for e in errors_format_portada(PORTADA_BONA.replace("🚩", "")))


def test_portada_amb_no_premis_envia():
    text = PORTADA_BONA + "\n4. **No premis «Envia» fins a la Sessió 3.**\n"
    assert any("Envia" in e for e in errors_format_portada(text))
