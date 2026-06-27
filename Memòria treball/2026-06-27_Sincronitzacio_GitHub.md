# Memòria de treball — Sincronització amb GitHub
### Data: 27 de juny de 2026

Registre de l'avenç: **publicació de tot el material a GitHub** com a repositori versionat.

---

## Què s'ha fet

1. **Repositori Git local** inicialitzat a la carpeta del projecte (branca `main`).
2. **`.gitignore`** creat per excloure la configuració local de Claude Code (`.claude/`) i fitxers temporals del sistema/Office.
3. **Commit inicial** amb tot el material (101 fitxers): Normativa, Recursos, Programació didàctica, Classes (SA1-SA9 + codi + Solucionari), Avaluació i Memòria de treball.
4. **GitHub CLI (`gh`)** instal·lat amb winget (v2.95.0) i autenticat (flux de dispositiu OAuth).
5. **Repositori remot creat i push fet.**

---

## Dades del repositori

| Camp | Valor |
|---|---|
| URL | https://github.com/tomeu-cd100/robotica-1batx-2627 |
| Compte | `tomeu-cd100` |
| Visibilitat | **Públic** |
| Branca per defecte | `main` |

---

## Decisions
- **Visibilitat pública** (decisió de l'usuari): qualsevol pot veure i descarregar el material docent.
- **`.claude/` exclòs** del control de versions (configuració local, no contingut del curs).
- Autoria dels commits configurada localment amb `tomeu@conselldecent.com`.

## Notes
- La carpeta de memòria de Claude viu **fora** del projecte → no s'inclou al repositori.
- Per pujar canvis futurs: `git add -A && git commit -m "..." && git push`.

## Possibles passos següents (opcionals)
1. Afegir un **README.md** a l'arrel que presenti l'assignatura i la guia de navegació de carpetes.
2. Afegir una **llicència** (p. ex. Creative Commons BY-SA) si es vol deixar clar l'ús del material obert.
