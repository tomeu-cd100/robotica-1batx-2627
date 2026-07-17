#!/usr/bin/env python3
"""Validació d'escriptori del solucionari SA8-C (ML per centroides, micro:bit).

Executa `Reptes/Solucionari/SA8/C_gestos_ampliat.py` SENSE MODIFICAR-LO, amb
mòduls `microbit` i `radio` simulats i guiats per un guió:

  1. Fase de recollida (fita 1): 20 mostres per classe amb tres perfils
     d'acceleròmetre ben diferents (0=quiet pla, 1=sacseig, 2=inclinat).
  2. A+B: entrena (centroides = mitjanes; els paràmetres SURTEN de les dades).
  3. Fase de classificació (fita 2): 6 mostres NOVES (2 per classe, amb soroll
     diferent del d'entrenament) i s'asserta que la predicció i el
     `radio.send()` encerten la classe.
  4. Prova de biaix suau (fita 3): mostres d'una «altra persona» (mateixos
     gestos, amplituds un 30% més grans): s'informa de l'encert obtingut.

Sortida: PASSA/FALLA per cada comprovació i resum final. Codi de sortida 0/1.
"""

import random
import sys
import types
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ARREL = Path(__file__).resolve().parent
SOLUCIONARI = ARREL.parent.parent.parent / "Reptes" / "Solucionari" / "SA8" / "C_gestos_ampliat.py"

random.seed(2627)

# ---------------------------------------------------------------- perfils

def perfil(classe, ampli=1.0):
    """Retorna una funció que genera lectures (x, y, z) del gest `classe`."""
    def lectura(pas):
        if classe == 0:      # quiet pla: gravetat a z, soroll petit
            return (random.gauss(0, 30) * ampli,
                    random.gauss(0, 30) * ampli,
                    -1024 + random.gauss(0, 30))
        if classe == 1:      # sacseig: oscil·lació gran a x i y
            s = 1 if pas % 2 == 0 else -1
            return (s * (1300 + random.gauss(0, 150)) * ampli,
                    -s * (900 + random.gauss(0, 150)) * ampli,
                    -400 + random.gauss(0, 200))
        # classe 2: inclinat de costat: gravetat repartida x/z, estàtic
        return (900 * ampli + random.gauss(0, 40),
                random.gauss(0, 40),
                -500 + random.gauss(0, 40))
    return lectura


# ---------------------------------------------------------------- controlador

class Controlador:
    """Guió de la sessió: alimenta botons i acceleròmetre, recull resultats."""

    def __init__(self):
        self.fase = "recollida"          # recollida -> entrenar -> classificar
        self.classe = 0                  # classe que s'està gravant
        self.mostres_fetes = 0
        self.pas_accel = 0
        self.lectura = perfil(0)
        self.pendent_a = False
        self.pendent_b = False
        self.guio_classificacio = []     # [(classe_esperada, funcio_lectura)]
        self.prediccions = []            # (esperada, radio_enviat)
        self.errors = []
        self.fets = []

        # fita 2: mostres noves (soroll nou) · fita 3: «altra persona» (x1.3)
        for c in (0, 1, 2, 1, 2, 0):
            self.guio_classificacio.append((c, perfil(c)))
        for c in (0, 1, 2):
            self.guio_classificacio.append((c, perfil(c, ampli=1.3)))

    # --- el que consulten els stubs ---

    def vol_a_i_b(self):
        # A+B només quan totes les classes tenen 20 mostres
        return self.fase == "entrenar"

    def vol_b(self):
        if self.fase == "recollida" and self.mostres_fetes == 0 and self.classe_pendent():
            self.classe += 1
            return True
        return False

    def classe_pendent(self):
        return False   # el canvi de classe es gestiona en acabar cada bloc

    def vol_a(self):
        if self.fase == "recollida":
            return True
        return False

    def nova_lectura(self):
        self.pas_accel += 1
        return self.lectura(self.pas_accel)

    def mostra_capturada(self, classe_activa, n):
        # Cridat (via print del solucionari) després de cada captura
        self.mostres_fetes = n
        if n >= 20:
            if classe_activa < 2:
                # passa a la classe següent: el guió premerà B
                self.fase = "canvi_classe"
                self.seguent = classe_activa + 1
            else:
                self.fase = "entrenar"

    def preparat_per_classificar(self):
        if not self.guio_classificacio:
            raise SystemExit(0)
        esperada, funcio = self.guio_classificacio.pop(0)
        self.esperada_actual = esperada
        self.lectura = funcio
        return True


CTRL = Controlador()

# ---------------------------------------------------------------- stubs

class _Imatge:
    def __init__(self, nom):
        self.nom = nom

    def __repr__(self):
        return f"Image({self.nom})"


class _ImageFabrica:
    SQUARE = _Imatge("SQUARE")
    HEART = _Imatge("HEART")
    DIAMOND = _Imatge("DIAMOND")
    YES = _Imatge("YES")
    NO = _Imatge("NO")
    HAPPY = _Imatge("HAPPY")

    def __call__(self, cadena):
        return _Imatge(cadena)


class _Display:
    def __init__(self):
        self.mostrat = []

    def show(self, x):
        self.mostrat.append(x)

    def scroll(self, text, delay=100):
        self.mostrat.append(("scroll", str(text)))

    def clear(self):
        self.mostrat.append("clear")


class _BotoA:
    def is_pressed(self):
        return CTRL.fase == "entrenar"

    def was_pressed(self):
        if CTRL.fase == "recollida":
            return True
        if CTRL.fase == "entrenar":
            return False   # buidatge de pulsacions pendents dins el bloc A+B
        return False


class _BotoB:
    def is_pressed(self):
        return CTRL.fase == "entrenar"

    def was_pressed(self):
        if CTRL.fase == "canvi_classe":
            CTRL.classe = CTRL.seguent
            CTRL.mostres_fetes = 0
            CTRL.lectura = perfil(CTRL.classe)
            CTRL.fase = "recollida"
            return True
        if CTRL.fase == "entrenar":
            return False
        return False


class _Accelerometre:
    def __init__(self):
        self._ultima = (0, 0, -1024)
        self._quan = -1

    def _refresca(self):
        self._ultima = CTRL.nova_lectura()
        return self._ultima

    def get_x(self):
        return int(self._refresca()[0])

    def get_y(self):
        return int(self._ultima[1])

    def get_z(self):
        return int(self._ultima[2])


class _Radio:
    def __init__(self):
        self.enviats = []

    def on(self):
        pass

    def config(self, **kw):
        self.config_kw = kw

    def send(self, msg):
        self.enviats.append(msg)
        CTRL.prediccions.append((CTRL.esperada_actual, int(msg)))
        if not CTRL.guio_classificacio:
            raise SystemExit(0)


def _sleep(ms):
    pass


def _print(*args, **kw):
    text = " ".join(str(a) for a in args)
    REGISTRE.append(text)
    if text.startswith("classe") and "mostra num" in text:
        parts = text.split()
        CTRL.mostra_capturada(int(parts[1]), int(parts[4]))
    if text.startswith("Model entrenat"):
        CTRL.fase = "classificant"
        CTRL.preparat = True
    if text.startswith("prediccio:"):
        pass


# Abans de cada captura en mode classificació cal carregar el perfil següent.
# El solucionari crida captura_mostra() a l'inici de cada volta: ho enganxem
# al primer get_x de cada captura via el comptador de lectures.
class _AccelClassificacio(_Accelerometre):
    def __init__(self):
        super().__init__()
        self.lectures_fetes = 0

    def get_x(self):
        if CTRL.fase == "classificant" and self.lectures_fetes % 25 == 0:
            CTRL.preparat_per_classificar()
        self.lectures_fetes += 1
        return super().get_x()


REGISTRE = []

microbit_stub = types.ModuleType("microbit")
microbit_stub.display = _Display()
microbit_stub.button_a = _BotoA()
microbit_stub.button_b = _BotoB()
microbit_stub.accelerometer = _AccelClassificacio()
microbit_stub.sleep = _sleep
microbit_stub.Image = _ImageFabrica()

radio_stub = types.ModuleType("radio")
_radio = _Radio()
radio_stub.on = _radio.on
radio_stub.config = _radio.config
radio_stub.send = _radio.send

sys.modules["microbit"] = microbit_stub
sys.modules["radio"] = radio_stub

# ---------------------------------------------------------------- execució

codi = SOLUCIONARI.read_text(encoding="utf-8")
espai = {"__name__": "__main__", "print": _print}
try:
    exec(compile(codi, str(SOLUCIONARI), "exec"), espai)
except SystemExit:
    pass

# ---------------------------------------------------------------- veredicte

sortida = 0

entrenat = any(t.startswith("Model entrenat") for t in REGISTRE)
print(("PASSA" if entrenat else "FALLA") +
      " · fita 1: 20 mostres per classe recollides i model entrenat "
      "(centroides apresos de les dades)")
sortida |= 0 if entrenat else 1

noves = CTRL.prediccions[:6]
encerts_nous = sum(1 for e, p in noves if e == p)
ok_nous = encerts_nous == 6
print(("PASSA" if ok_nous else "FALLA") +
      f" · fita 2: mostres noves encertades {encerts_nous}/6 " +
      str([(e, p) for e, p in noves]))
sortida |= 0 if ok_nous else 1

biaix = CTRL.prediccions[6:9]
encerts_biaix = sum(1 for e, p in biaix if e == p)
print(f"INFO  · fita 3 (biaix, «altra persona» amb amplituds x1.3): "
      f"{encerts_biaix}/3 encerts {biaix} — el resultat s'analitza al quadern, "
      "no és cap assert")

radio_ok = len(_radio.enviats) >= 6 and getattr(_radio, "config_kw", {}).get("group") == 10
print(("PASSA" if radio_ok else "FALLA") +
      f" · ampliació 2: {len(_radio.enviats)} prediccions enviades per ràdio (group=10)")
sortida |= 0 if radio_ok else 1

print(f"\nTotal: {'TOT PASSA' if sortida == 0 else 'HI HA FALLADES'}")
sys.exit(sortida)
