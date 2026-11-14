"""L'atles d'un trimestre: el robot del trimestre com a mapa.

Inspirat en l'estructura de «La Revolució Industrial» de Felip Sarroca (un
dibuix com a índex, una pregunta per capítol), en versió plànol tècnic: cada
pràctica és una peça del plànol, marcada amb un globus numerat i una línia de
referència, com als dibuixos de conjunt. Les targetes són la llista de peces.

Cada trimestre en té una instància amb les seves dades (atles_t2.py, atles_t3.py).
La pregunta guia de cada pràctica viu al seu markdown, a la capçalera:
    ❓ **La pregunta:** Com sap un motor on s'ha d'aturar?
"""
from __future__ import annotations

import html
import re
from dataclasses import dataclass, field

from .utils import rel_url

_PREGUNTA_RE = re.compile(r"^❓\s*\*\*La pregunta:\*\*\s*(.+?)\s*$", re.M)

# Pàgines de teoria de cada SA, en ordre de lectura (sufix del fitxer → etiqueta)
TEORIA = [("fitxa-alumnat", "Fitxa base"), ("esquemes-connexions", "Esquemes i connexions"),
          ("-connexions", "Connexions i entorn"), ("exemple-resolt", "Exemple resolt"),
          ("diagrama-flux", "Diagrama de flux"), ("questionari-conceptes", "Qüestionari de conceptes"),
          ("fitxa-ampliada", "Fitxa ampliada"), ("recursos-video-ia", "Recursos de vídeo")]
DOCENT = [("guia-docent", "Guia docent"), ("checklist-docent", "Checklist docent"),
          ("questionari-conceptes-solucions", "Solucions del qüestionari")]
TRAÇ = 'stroke="#e8f1ff" stroke-width="2.4" fill="none" stroke-linejoin="round"'


def pregunta(md_text: str) -> str | None:
    """La pregunta guia d'una pràctica (línia ❓ de la capçalera), o None."""
    m = _PREGUNTA_RE.search(md_text)
    return m.group(1) if m else None


def _li(out_rel: str, desti: str, etiqueta: str, *, docent: bool = False) -> str:
    actiu = desti.split("#")[0] == out_rel and "#" not in desti
    cls = ' class="nomes-docent"' if docent else ""
    aria = ' aria-current="page"' if actiu else ""
    return f'<li{cls}><a href="{rel_url(out_rel, desti)}"{aria}>{html.escape(etiqueta)}</a></li>'


def _bloc(titol: str, items: list[str], *, docent: bool = False) -> str:
    if not items:
        return ""
    cls = "atles-bloc nomes-docent" if docent else "atles-bloc"
    return (f'<details class="{cls}"><summary>{titol}</summary>'
            f'<ul>{"".join(items)}</ul></details>')


@dataclass
class Atles:
    tri: int                         # trimestre (2, 3)
    sas: tuple[int, ...]             # SA del trimestre
    capitols: list[dict]             # n, sa, ses, nom, curt, src, out, b=(x,y), t=(x,y)
    nom_sa: dict[int, str]           # nom curt de cada SA (llista de peces)
    dibuix: str                      # SVG del robot i el seu entorn (viewBox 960×400)
    titol_planol: str                # títol dins del plànol
    robot: str                       # «El braç robòtic MeArm», «El rover autònom»
    pestanya: str                    # pestanya del projecte: «El braç», «El rover»
    projecte: str                    # portada del projecte (out_rel)
    projecte_docs: list[tuple[str, str]] = field(default_factory=list)   # (out_rel, etiqueta)
    projecte_emoji: str = "🤖"
    teoria_extra: list[tuple[str, str]] = field(default_factory=list)    # (sufix, etiqueta)

    # --- dades ---------------------------------------------------------------
    def capitol_de(self, out_rel: str) -> dict | None:
        """El capítol que correspon a una pàgina generada, si n'és un."""
        return next((c for c in self.capitols if c["out"] == out_rel), None)

    def sa_de(self, out_rel: str) -> int | None:
        """La SA del trimestre d'una pàgina, o None (projecte o fora de SA)."""
        digits = "".join(str(n) for n in self.sas)
        m = re.search(rf"(?:^|/)(?:classes/)?sa([{digits}])(?:/|\b)", out_rel) \
            or re.search(rf"sa-?([{digits}])\b", out_rel)
        return int(m.group(1)) if m else None

    # --- el plànol -----------------------------------------------------------
    def _globus(self, c: dict, href: str, classe: str, actiu: bool) -> str:
        bx, by = c["b"]
        tx, ty = c["t"]
        nom = html.escape(c["nom"])
        aqui = ""
        if actiu:
            aqui = (f'<g class="ets-aqui"><circle cx="{bx}" cy="{by}" r="24" fill="none" '
                    f'stroke="#ffd166" stroke-width="2" stroke-dasharray="4 4"/>'
                    f'<text x="{bx}" y="{by - 32}" text-anchor="middle" fill="#ffd166" '
                    f'font-size="12" font-weight="700">ETS AQUÍ</text></g>')
        return (f'<a href="{href}" class="{classe}" data-n="{c["n"]}" '
                f'aria-label="{c["n"]}. {nom} (SA{c["sa"]} · {c["ses"]})">'
                f'<title>{c["n"]}. {nom} · SA{c["sa"]} {c["ses"]}</title>'
                f'<line x1="{bx}" y1="{by}" x2="{tx}" y2="{ty}" class="referencia"/>'
                f'<circle cx="{tx}" cy="{ty}" r="3" class="punta"/>'
                f'<circle cx="{bx}" cy="{by}" r="15" class="bombolla"/>'
                f'<text x="{bx}" y="{by + 5}" text-anchor="middle" class="num">{c["n"]}</text>'
                f'<text x="{bx + 20}" y="{by + 4}" class="curt">{html.escape(c["curt"])}</text>'
                f'{aqui}</a>')

    def mapa_html(self, out_rel: str, *, actiu: int | None = None, sa: int | None = None) -> str:
        """El plànol amb un globus per pràctica, enllaçat des d'`out_rel`.

        `actiu` marca «Ets aquí» en un capítol; `sa` ressalta els globus d'una SA
        i esmorteeix la resta."""
        globus = []
        for c in self.capitols:
            if sa is None:
                classe = "globus"
            else:
                classe = "globus sa-actual" if c["sa"] == sa else "globus altra-sa"
            globus.append(self._globus(c, rel_url(out_rel, c["out"]), classe, c["n"] == actiu))
        peu = "Cada globus és una pràctica. Toca'l per anar-hi."
        if sa:
            peu = f"Ressaltades, les pràctiques de la SA{sa}. Toca un globus per anar-hi."
        return (f'<figure class="planol"><svg viewBox="0 0 960 400" role="img" '
                f'aria-label="Plànol: {html.escape(self.robot)}. Cada globus numerat és una pràctica del trimestre" '
                f'font-family="JetBrains Mono, Cascadia Code, Consolas, monospace" font-size="13">'
                f'<text x="16" y="30" fill="#e8f1ff" font-size="16" font-weight="700">{self.titol_planol}</text>'
                f'{self.dibuix}{"".join(globus)}</svg>'
                f'<figcaption>{html.escape(peu)}</figcaption></figure>')

    def llista_peces_html(self, out_rel: str, preguntes: dict[int, str | None]) -> str:
        """Les targetes de capítol, agrupades per SA (la llista de peces del plànol)."""
        blocs = []
        for sa in self.sas:
            peces = []
            for c in (c for c in self.capitols if c["sa"] == sa):
                q = preguntes.get(c["n"]) or ""
                peces.append(
                    f'<a class="peca" href="{rel_url(out_rel, c["out"])}">'
                    f'<span class="peca-cap"><span class="peca-n">{c["n"]}</span>'
                    f'<span class="peca-ses">SA{sa} · {c["ses"]}</span></span>'
                    f'<b>{html.escape(c["nom"])}</b>'
                    f'<span class="peca-q">{html.escape(q)}</span></a>')
            blocs.append(f'<div class="llista-sa"><h3>SA{sa} · {self.nom_sa[sa]}</h3>'
                         f'<div class="peces">{"".join(peces)}</div></div>')
        return (f'<nav class="llista-peces" aria-label="Llista de peces: les pràctiques del trimestre">'
                f'{"".join(blocs)}</nav>')

    # --- el panell: la navegació de totes les pàgines del trimestre ----------
    def panell_html(self, out_rel: str, pagines: list[tuple[str, str, str]], *, toc: str = "",
                    titol_sa: dict[int, str] | None = None,
                    preguntes: dict[int, str | None] | None = None) -> str:
        """El panell de l'esquerra: el plànol amb la SA ressaltada («Ets aquí» a
        les pràctiques) i l'índex de la SA (ruta, teoria, lliurament, docent i
        «En aquesta pàgina»). `pagines`: (out_rel, títol, públic) del web."""
        titol_sa = titol_sa or {}
        preguntes = preguntes or {}
        cap = self.capitol_de(out_rel)
        sa = cap["sa"] if cap else self.sa_de(out_rel)
        noms = {o: (t, pub) for o, t, pub in pagines}
        practiques = {c["out"] for c in self.capitols}

        pestanyes = []
        for n in self.sas:
            aria = ' aria-current="true"' if sa == n else ""
            pestanyes.append(f'<a href="{rel_url(out_rel, f"classes/sa{n}/index.html")}"{aria}>SA{n}</a>')
        aria = ' aria-current="true"' if sa is None else ""
        pestanyes.append(f'<a href="{rel_url(out_rel, self.projecte)}"{aria}>{html.escape(self.pestanya)}</a>')

        if sa:
            base = f"classes/sa{sa}"
            ruta = [_li(out_rel, f"{base}/index.html", "Presentació i ruta")]
            ruta += [_li(out_rel, c["out"], f'{c["n"]} · {c["nom"]}') for c in self.capitols if c["sa"] == sa]
            teoria = []
            for suf, etiq in TEORIA + self.teoria_extra:
                o = next((o for o in noms if o.startswith(base + "/") and o.endswith(f"{suf}.html")
                          and noms[o][1] == "alumnat" and o not in practiques), None)
                if o:
                    teoria.append(_li(out_rel, o, etiq))
            if f"{base}/codi.html" in noms:
                teoria.append(_li(out_rel, f"{base}/codi.html", "Tot el codi"))
            lliura = [_li(out_rel, f"{base}/index.html#entrega-final", "🏁 Entrega final"),
                      _li(out_rel, f"{base}/index.html#que-has-dentregar", "Què has d'entregar")]
            chk = f"{base}/sa{sa}-checklist-alumnat.html"
            if chk in noms:
                lliura.append(_li(out_rel, chk, "El meu checklist"))
            doc = []
            for suf, etiq in DOCENT:
                o = next((o for o in noms if o.startswith(base + "/") and o.endswith(f"{suf}.html")), None)
                if o:
                    doc.append(_li(out_rel, o, etiq, docent=True))
            blocs = [_bloc("🧭 Ruta", ruta), _bloc("📚 Teoria", teoria),
                     _bloc("🏁 Lliurament", lliura), _bloc("👩‍🏫 Docent", doc, docent=True)]
        else:
            items = [_li(out_rel, self.projecte, "Presentació i llista de peces")]
            items += [_li(out_rel, o, etiq) for o, etiq in self.projecte_docs if o in noms]
            blocs = [_bloc(f"{self.projecte_emoji} {self.pestanya}", items)]
        if toc:
            toc_net = re.sub(r'</?nav[^>]*>|<p class="toc-titol">.*?</p>', "", toc)
            blocs.append(f'<details class="atles-bloc atles-toc"><summary>📄 En aquesta pàgina</summary>{toc_net}</details>')

        tri_nom = {1: "1r", 2: "2n", 3: "3r"}[self.tri] + " trimestre"
        if cap:
            cap_pas = f'Pràctica {cap["n"]} · SA{cap["sa"]} {cap["ses"]}'
            cap_q = preguntes.get(cap["n"]) or cap["nom"]
        elif sa:
            cap_pas, cap_q = f"SA{sa} · {tri_nom}", titol_sa.get(sa, f"SA{sa}")
        else:
            cap_pas, cap_q = tri_nom, self.robot
        titol_pag = noms.get(out_rel, ("", ""))[0]
        return (f'<aside class="escenari" aria-label="Plànol del trimestre i índex de la SA"'
                f'{" data-practica" if cap else ""}>'
                f'<div class="esc-cap"><span class="esc-pas">{html.escape(cap_pas)}</span>'
                f'<span class="esc-q">{html.escape(cap_q)}</span></div>'
                f'<div class="esc-vista">{self.mapa_html(out_rel, actiu=cap["n"] if cap else None, sa=sa)}</div>'
                f'<nav class="atles-index" aria-label="Índex de la SA">'
                f'<div class="atles-pestanyes">{"".join(pestanyes)}</div>{"".join(b for b in blocs if b)}</nav>'
                f'<div class="caixeti"><span>Plànol</span><span class="esc-tit">{html.escape(titol_pag.split(":")[0])}</span>'
                f'<span>Full</span><span class="esc-full">{"SA" + str(sa) if sa else "T" + str(self.tri)}</span></div>'
                f'</aside>')
