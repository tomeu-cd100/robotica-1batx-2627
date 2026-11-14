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


PAGINES = [
    ("classes/sa4/index.html", "SA4 · Moviment", "alumnat"),
    ("classes/sa4/sa4-fitxa-alumnat.html", "SA4 · Fitxa base", "alumnat"),
    ("classes/sa4/sa4-esquemes-connexions.html", "SA4 · Esquemes", "alumnat"),
    ("classes/sa4/sa4-checklist-alumnat.html", "SA4 · El meu checklist", "alumnat"),
    ("classes/sa4/sa4-guia-docent.html", "SA4 · Guia docent", "docent"),
    ("classes/sa4/codi/01-servo-potenciometre.html", "Pràctica 1 · Servo: amb llibreria", "alumnat"),
    ("classes/projecte-t2/index.html", "Projecte T2", "alumnat"),
]


def test_panell_d_una_pagina_de_teoria():
    h = atles_t2.panell_html("classes/sa4/sa4-fitxa-alumnat.html", PAGINES)
    assert 'aria-current="page"' in h and "Fitxa base" in h
    assert "🧭 Ruta" in h and "📚 Teoria" in h and "🏁 Lliurament" in h
    assert 'href="index.html#entrega-final"' in h
    assert 'class="nomes-docent"' in h and "Guia docent" in h
    assert 'class="globus sa-actual"' in h and "ets-aqui" not in h
    assert "data-practica" not in h


def test_panell_d_una_practica_te_ets_aqui_i_pregunta():
    h = atles_t2.panell_html("classes/sa4/codi/01-servo-potenciometre.html", PAGINES,
                             preguntes={1: "Com sap un motor on s'ha d'aturar?"})
    assert "data-practica" in h and h.count("ets-aqui") == 1
    assert "Com sap un motor on s&#x27;ha d&#x27;aturar?" in h


def test_panell_del_projecte_sense_sa():
    h = atles_t2.panell_html("classes/projecte-t2/index.html", PAGINES)
    assert "🦾 El braç" in h and "sa-actual" not in h


def test_sa_de():
    assert atles_t2.sa_de("classes/sa5/sa5-fitxa-alumnat.html") == 5
    assert atles_t2.sa_de("reptes/reptes-sa6.html") == 6
    assert atles_t2.sa_de("classes/projecte-t2/index.html") is None


def test_capitol_per_pagina():
    assert atles_t2.capitol_de("classes/sa5/codi/04-brac-ordres.html")["n"] == 7
    assert atles_t2.capitol_de("classes/sa4/index.html") is None
