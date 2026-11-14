"""Tests de l'atles del T2 (generador/atles_t2.py): el plànol del braç amb
globus numerats, la llista de peces i la pregunta guia de cada pràctica.

Executa'ls des de web/_generador/:  py -m pytest tests/ -q
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from generador import atles_t2  # noqa: E402
from generador.atles_t2 import CAPITOLS, pregunta, mapa_html, llista_peces_html  # noqa: E402

ROOT = Path(__file__).resolve().parents[3]


def test_onze_capitols_numerats_en_ordre():
    assert [c["n"] for c in CAPITOLS] == list(range(1, 12))
    assert {c["sa"] for c in CAPITOLS} == {4, 5, 6}


def test_cada_capitol_te_font_i_pregunta():
    for c in CAPITOLS:
        src = ROOT / c["src"]
        assert src.exists(), c["src"]
        q = pregunta(src.read_text(encoding="utf-8"))
        assert q and q.endswith("?"), f"{c['src']}: falta la línia ❓ amb la pregunta"


def test_pregunta_llegeix_la_linia_de_la_capcalera():
    md = '<div class="cap-practica" markdown="1">\n\n❓ **La pregunta:** Com gira un motor?\n\n</div>'
    assert pregunta(md) == "Com gira un motor?"
    assert pregunta("# Sense pregunta") is None


def test_enllacos_relatius_des_d_una_practica():
    h = mapa_html("classes/sa4/codi/01-servo-potenciometre.html")
    assert 'href="../../sa5/codi/02-inclinacio.html"' in h
    assert 'href="01-servo-potenciometre.html"' in h


def test_ets_aqui_nomes_al_capitol_actiu():
    h = mapa_html("classes/sa6/codi/02-pinca-histeresi.html", actiu=10)
    assert h.count("ets-aqui") == 1
    assert 'data-n="10"' in h


def test_ressalta_la_sa():
    h = mapa_html("classes/sa5/index.html", sa=5)
    assert h.count('class="globus sa-actual"') == 4


def test_llista_de_peces_agrupada_per_sa():
    preguntes = {c["n"]: f"Pregunta {c['n']}?" for c in CAPITOLS}
    h = llista_peces_html("classes/projecte-t2/index.html", preguntes)
    assert h.count('class="peca"') == 11
    for sa in (4, 5, 6):
        assert f"SA{sa}" in h
    assert "Pregunta 7?" in h
    assert 'href="../sa6/codi/03-maquina-estats.html"' in h


def test_capitol_per_pagina():
    assert atles_t2.capitol_de("classes/sa5/codi/04-brac-ordres.html")["n"] == 7
    assert atles_t2.capitol_de("classes/sa4/index.html") is None
