"""Tests de marca_passos(): les pràctiques en format «passos autònoms».

Cada `### Pas N · …` sota «Pas a pas» es converteix en una targeta
(<section class="pas">) i els paràgrafs que comencen per ✅/✍️/📤 reben
una classe perquè el CSS els destaqui. Vegeu
docs/superpowers/specs/2026-11-03-passos-autonoms-design.md.

Executa'ls des de web/_generador/:  py -m pytest tests/ -q
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from generar import marca_passos  # noqa: E402


def test_embolcalla_cada_pas():
    body = ('<h3 id="pas-1">Pas 1 · Munta</h3><p>a</p>'
            '<h3 id="pas-2">Pas 2 · Carrega</h3><p>b</p>'
            '<h2 id="x">X</h2><p>c</p>')
    out = marca_passos(body)
    assert out.count('<section class="pas">') == 2
    assert out.count("</section>") == 2
    # el h2 següent queda fora de qualsevol targeta
    assert out.index("</section><h2") > 0
    assert out.rstrip().endswith("<p>c</p>")


def test_codi_complet_dins_del_pas():
    body = ('<h3 id="pas-2-carrega">Pas 2 · Carrega</h3>'
            '<p>Prem Copia.</p>\n<!-- codi-complet -->\n'
            '<h3 id="pas-3">Pas 3 · Canvia</h3><p>x</p>')
    out = marca_passos(body)
    primera = out.split("</section>")[0]
    assert "<!-- codi-complet -->" in primera


def test_classes_comprova_apunta_envia():
    body = ('<h3 id="pas-1">Pas 1 · Munta</h3>'
            '<p>✅ Comprova: respira.</p>'
            '<p>✍️ Apunta-ho: què canvia?</p>'
            '<p>📤 <a href="https://classroom.google.com/x">Formulari</a></p>')
    out = marca_passos(body)
    assert '<p class="comprova">✅' in out
    assert '<p class="apunta">✍️' in out
    assert '<p class="envia">📤' in out


def test_sense_passos_no_canvia():
    body = '<h2 id="pas-a-pas">Pas a pas</h2><ol><li>Munta</li></ol><h3 id="tros-1">Tros 1</h3>'
    assert marca_passos(body) == body


def test_pagina_antiga_amb_kata_no_rep_classes():
    # Les pràctiques de SA4-SA8 (format antic) tenen «> ✍️ **Kata primer!**»:
    # no és cap pregunta de formulari i no ha de canviar d'aspecte.
    body = '<blockquote>\n<p>✍️ <strong>Kata primer!</strong> escriu-ho</p>\n</blockquote>'
    assert marca_passos(body) == body


def test_ultim_pas_es_tanca_abans_dels_plegats():
    # Els «Tros» (h3) viuen dins del <details> de teoria: la targeta de
    # l'últim pas s'ha de tancar abans del primer <details>, no a mig plegat.
    body = ('<h3 id="pas-7-respon-i-envia">Pas 7 · Respon i envia</h3><p>📤 x</p>'
            '<p>⭐ repte</p>'
            '<details><summary>🧗 Si t\'encalles</summary><p>a</p></details>'
            '<details><summary>🧠</summary><h3 id="tros-1">Tros 1</h3><p>b</p></details>')
    out = marca_passos(body)
    seccio = out[out.index('<section class="pas">'):out.index("</section>")]
    assert "<details" not in seccio
    assert "⭐ repte" in seccio
