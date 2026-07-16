"""Tests del nucli arriscat de generar.py: rewrite_links, classify_public,
is_activitat.

Executa'ls des de web/_generador/:  py -m pytest tests/ -q

generar.py s'importa com a mòdul (té guard __main__): en importar només
executa build_date() (git al repo) i defineix constants — cap escriptura.
Els tests de rewrite_links fan servir fitxers REALS del repo com a
fixtures (Classes/SA1/...) per no haver de simular l'arbre de fonts.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import generar  # noqa: E402
from generar import (  # noqa: E402
    BLOB_BASE, ROOT, classify_public, is_activitat, rewrite_links,
)

# Fixtures reals del repo (el contracte de cobertura de tools/qa.py
# garanteix que existeixen per a cada SA).
SA1_DIR = ROOT / "Classes" / "SA1"
FITXA = SA1_DIR / "SA1_fitxa_alumnat.md"
GUIA = SA1_DIR / "SA1_guia_docent.md"

# Sortides simulades (com les construeix scan_sources)
OUT_FITXA = "classes/sa1/sa1-fitxa-alumnat.html"
OUT_GUIA = "classes/sa1/sa1-guia-docent.html"


def _rewrite(body: str, md_map: dict | None = None) -> str:
    """Crida rewrite_links com ho fa el generador per a la fitxa de SA1."""
    if md_map is None:
        md_map = {str(GUIA.resolve()): OUT_GUIA,
                  str(FITXA.resolve()): OUT_FITXA}
    return rewrite_links(body, FITXA, OUT_FITXA,
                         md_map=md_map, code_map={}, sim_map={},
                         copied_imgs={})


# --- rewrite_links: enllaços interns .md --------------------------------------
def test_md_existent_es_reescriu_a_html():
    assert FITXA.is_file() and GUIA.is_file(), "fixtures reals del repo"
    out = _rewrite('<p><a href="SA1_guia_docent.md">guia</a></p>')
    # mateixa carpeta de sortida -> URL relativa curta
    assert 'href="sa1-guia-docent.html"' in out
    assert "SA1_guia_docent.md" not in out


def test_md_existent_conserva_fragment():
    out = _rewrite('<a href="SA1_guia_docent.md#sessions">sessions</a>')
    assert 'href="sa1-guia-docent.html#sessions"' in out


def test_md_existent_pero_no_publicat_va_a_github():
    # .md real del repo que NO és al md_map -> enllaç blob de GitHub
    out = _rewrite('<a href="SA1_guia_docent.md">guia</a>', md_map={})
    assert f'href="{BLOB_BASE}Classes/SA1/SA1_guia_docent.md"' in out
    # i en ser un http, s'obre en pestanya nova
    assert 'target="_blank"' in out


# --- rewrite_links: URLs externes --------------------------------------------
def test_url_externa_intacta_amb_target_blank():
    out = _rewrite('<a href="https://wokwi.com/projects/1234">Wokwi</a>')
    assert 'href="https://wokwi.com/projects/1234" target="_blank" rel="noopener"' in out


def test_url_externa_pdf_no_es_reescriu():
    url = "https://exemple.cat/decret_171_2022.pdf"
    out = _rewrite(f'<a href="{url}">decret</a>')
    assert f'href="{url}" target="_blank" rel="noopener"' in out


def test_mailto_i_data_intactes():
    body = ('<a href="mailto:tomeu@conselldecent.com">escriu-me</a>'
            '<img src="data:image/png;base64,AAAA">')
    out = _rewrite(body)
    assert 'href="mailto:tomeu@conselldecent.com"' in out
    assert 'target="_blank"' not in out  # mailto no obre pestanya nova
    assert 'src="data:image/png;base64,AAAA"' in out


# --- rewrite_links: fallback per a destins inexistents ------------------------
def test_fitxer_inexistent_es_deixa_tal_qual():
    body = ('<a href="no_existeix_xyz.md">trencat</a>'
            '<img src="img/no_existeix_xyz.png">')
    out = _rewrite(body)
    assert 'href="no_existeix_xyz.md"' in out
    assert 'src="img/no_existeix_xyz.png"' in out


def test_ancora_local_intacta():
    out = _rewrite('<a href="#material">material</a>')
    assert 'href="#material"' in out


# --- rewrite_links: mai dins de <pre>/<code> (integració amb apply_outside_code)
def test_no_toca_res_dins_de_pre_ni_code():
    body = ('<p><a href="SA1_guia_docent.md">fora</a></p>'
            '<pre><code>&lt;a href="SA1_guia_docent.md"&gt;literal&lt;/a&gt;\n'
            'src="foto.png"</code></pre>'
            '<p>inline <code>href="SA1_guia_docent.md"</code></p>')
    out = _rewrite(body)
    # el de fora es reescriu...
    assert 'href="sa1-guia-docent.html"' in out
    # ...però els literals dins de pre/code queden intactes
    assert out.count('href="SA1_guia_docent.md"') == 2
    assert 'src="foto.png"' in out


# --- classify_public -----------------------------------------------------------
def test_seccio_docent_sempre_docent():
    assert classify_public("programacio", Path("Programació didàctica/04_Metodologia.md")) == "docent"


def test_general_alumnat_nomes_la_llista():
    base = Path("Classes/00_General")
    assert classify_public("classes", base / "00_Repas_expres_MicroPython.md") == "alumnat"
    assert classify_public("classes", base / "00_Glossari_tecnic.md") == "alumnat"
    # qualsevol altre transversal és del docent (p. ex. el mode supervivència)
    assert classify_public("classes", base / "00_Mode_supervivencia.md") == "docent"
    assert classify_public("classes", base / "00_Banc_activacio_repas.md") == "docent"


def test_pistes_de_nom_docent():
    base = Path("Classes/SA3")
    assert classify_public("classes", base / "SA3_guia_docent.md") == "docent"
    assert classify_public("classes", base / "SA3_checklist_docent.md") == "docent"


def test_fitxa_alumnat_i_solucionari():
    assert classify_public("classes", Path("Classes/SA3/SA3_fitxa_alumnat.md")) == "alumnat"
    # els esquemes NO són a DOCENT_NAME_HINTS: es publiquen a l'alumnat
    assert classify_public("classes", Path("Classes/SA3/SA3_esquemes_connexions.md")) == "alumnat"
    # qualsevol carpeta Solucionari -> docent, encara que el nom sembli d'alumnat
    assert classify_public("reptes", Path("Reptes/Solucionari/Solucions_SA3.md")) == "docent"


# --- is_activitat ---------------------------------------------------------------
def test_is_activitat_positius():
    assert is_activitat(Path("Classes/SA1/SA1_fitxa_alumnat.md"))
    assert is_activitat(Path("Classes/SA3/SA3_fitxa_ampliada.md"))
    assert is_activitat(Path("Reptes/Reptes_SA4.md"))
    assert is_activitat(Path("Avaluació/Prova_practica_T1.md"))
    assert is_activitat(Path("Classes/00_General/00_Quadern_tecnic.md"))
    assert is_activitat(Path("Classes/SA9/plantilles/dossier.md"))


def test_is_activitat_negatius():
    assert not is_activitat(Path("Classes/SA1/SA1_guia_docent.md"))
    assert not is_activitat(Path("Classes/SA1/README.md"))
    assert not is_activitat(Path("Classes/SA1/SA1_esquemes_connexions.md"))
    assert not is_activitat(Path("Classes/SA9/plantilles/notes.txt"))
    # el solucionari dels reptes no és cap activitat d'alumnat
    assert not is_activitat(Path("Reptes/Solucionari/Solucions_SA4.md"))
