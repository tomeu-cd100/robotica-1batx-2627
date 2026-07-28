"""Tests de les seccions de projecte trimestral (PROJECTES)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import generar  # noqa: E402
from generar import (  # noqa: E402
    PROJECTES, PROJECTE_BY_SLUG, PROJECTE_BY_SRC,
    group_label, group_sort_key, group_tri,
)


def test_projectes_definits():
    assert [p["slug"] for p in PROJECTES] == [
        "projecte-t1", "projecte-t2", "projecte-t3"]
    assert PROJECTE_BY_SLUG["projecte-t3"]["after_sa"] == 6
    assert PROJECTE_BY_SRC["00_Projecte_T1_Mascota.md"]["num"] == 1
    assert PROJECTE_BY_SRC["00_Projecte_T1_portada.md"]["num"] == 1


def test_ordre_grups_amb_projectes():
    """SA3 < PT1 < SA4 i SA6 < PT2 < PT3 < SA7 (i transversal sempre primer)."""
    ordre = sorted(["sa4", "projecte-t1", "sa3", "sa7", "projecte-t3",
                    "projecte-t2", "sa6", "00-general"], key=group_sort_key)
    assert ordre == ["00-general", "sa3", "projecte-t1", "sa4", "sa6",
                     "projecte-t2", "projecte-t3", "sa7"]


def test_etiqueta_i_trimestre():
    assert group_label("projecte-t1") == "🐣 Projecte T1 · La mascota reactiva"
    assert group_label("projecte-t2") == "🦾 Projecte T2 · El braç robòtic"
    assert group_label("projecte-t3") == "🚙 Projecte T3 · El rover autònom"
    assert group_tri("projecte-t1") == 1
    assert group_tri("projecte-t3") == 3
