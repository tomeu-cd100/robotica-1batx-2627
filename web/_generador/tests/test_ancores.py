"""Tests de saneja_ancores(): degradar els enllaços a àncores que la pàgina
generada no té.

Cas real que motiva la funció: la font enllaça una activitat de la fitxa
d'alumnat, però l'activitat viu dins d'un bloc `web:only-github` que el
generador elimina. A GitHub l'àncora és bona; al web l'id no hi és.

Executa'ls des de web/_generador/:  py -m pytest tests/ -q
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from generar import saneja_ancores  # noqa: E402


def _web(tmp_path: Path, fitxers: dict[str, str]) -> Path:
    for rel, text in fitxers.items():
        dest = tmp_path / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8")
    return tmp_path


def test_degrada_ancora_inexistent(tmp_path):
    web = _web(tmp_path, {
        "sa1/index.html": '<a href="fitxa.html#activitat-1">Activitat 1</a>',
        "sa1/fitxa.html": '<h2 id="objectius">Objectius</h2>',
    })
    assert saneja_ancores(web) == (0, 1)
    assert 'href="fitxa.html"' in (web / "sa1" / "index.html").read_text(encoding="utf-8")


def test_conserva_ancora_existent(tmp_path):
    web = _web(tmp_path, {
        "sa1/index.html": '<a href="fitxa.html#objectius">Objectius</a>',
        "sa1/fitxa.html": '<h2 id="objectius">Objectius</h2>',
    })
    assert saneja_ancores(web) == (0, 0)
    assert 'href="fitxa.html#objectius"' in (web / "sa1" / "index.html").read_text(encoding="utf-8")


def test_travessa_carpetes(tmp_path):
    """L'enllaç relatiu amb ../ s'ha de resoldre contra la pàgina destí real."""
    web = _web(tmp_path, {
        "sa1/index.html": '<a href="../sa2/fitxa.html#mort">x</a>'
                          '<a href="../sa2/fitxa.html#viu">y</a>',
        "sa2/fitxa.html": '<h2 id="viu">Viu</h2>',
    })
    assert saneja_ancores(web) == (0, 1)
    text = (web / "sa1" / "index.html").read_text(encoding="utf-8")
    assert 'href="../sa2/fitxa.html"' in text
    assert 'href="../sa2/fitxa.html#viu"' in text


def test_no_toca_enllacos_externs_ni_ancores_locals(tmp_path):
    """http(s) i «#nomes-ancora» queden intactes (el patró exigeix .html)."""
    web = _web(tmp_path, {
        "sa1/index.html": '<a href="https://exemple.org/a.html#seccio">e</a>'
                          '<a href="#dalt">dalt</a>',
    })
    assert saneja_ancores(web) == (0, 0)
    text = (web / "sa1" / "index.html").read_text(encoding="utf-8")
    assert 'https://exemple.org/a.html#seccio' in text
    assert 'href="#dalt"' in text


def test_repara_ancora_amb_accents(tmp_path):
    """La font escriu l'àncora a l'estil GitHub (amb accents); el web
    slugifica sense. L'enllaç es repara, no es degrada."""
    web = _web(tmp_path, {
        "sa7/guia.html": '<a href="../t3/rover.html#sessió-0-de-muntatge-2-h">s0</a>',
        "t3/rover.html": '<h2 id="sessio-0-de-muntatge-2-h">Sessió 0</h2>',
    })
    assert saneja_ancores(web) == (1, 0)
    text = (web / "sa7" / "guia.html").read_text(encoding="utf-8")
    assert 'href="../t3/rover.html#sessio-0-de-muntatge-2-h"' in text


def test_desti_desconegut_es_respecta(tmp_path):
    """Si el destí no és cap pàgina generada, no s'hi toca (pot ser extern)."""
    web = _web(tmp_path, {
        "sa1/index.html": '<a href="inexistent.html#frag">x</a>',
    })
    assert saneja_ancores(web) == (0, 0)
    assert 'href="inexistent.html#frag"' in (web / "sa1" / "index.html").read_text(encoding="utf-8")
