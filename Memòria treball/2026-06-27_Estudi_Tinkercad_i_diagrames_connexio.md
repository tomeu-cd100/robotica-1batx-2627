# Memòria de treball — 2026-06-27 · Estudi de Tinkercad i diagrames de connexió

## Objectiu
Estudiar la viabilitat de connectar-se a Tinkercad, muntar les pràctiques i fer captures per als apunts; i, si no és viable per a totes, proposar i executar una alternativa.

## Estudi de viabilitat de Tinkercad (prova real)
- **Login:** ✅ ja identificat com a *Tomeu Riera* (cap obstacle).
- **Editor:** canvas **drag-and-drop**; components al panell dret, cablejat **pin a pin** al llenç, codi a "Code" (mode **Text** accepta enganxar `.ino`), "Start Simulation".
- **Prova de concepte `Blink`** (LED intern, sense cablejat): ✅ muntat i simulat amb èxit; captura obtinguda.
- **Conclusió:** muntar **totes** les pràctiques a Tinkercad **no és viable** de forma fiable:
  - Les de **cablejat** (la majoria) exigeixen connectar pins per coordenades al canvas → lent i molt fràgil (un cable mal posat invalida la captura).
  - Les de **micro:bit** (SA5, SA8) no executen MicroPython a Tinkercad (usa MakeCode/blocs).
- *(Queda un circuit de prova buit "Swanky Migelo-Stantia" al compte de Tinkercad; es pot esborrar manualment.)*

## Proposta alternativa (3 capes)
1. **Capa 1 — diagrames de connexió als `.md`** (infal·lible, versionable). ← **executada**
2. **Capa 2 — Wokwi** (circuit com a `diagram.json` de text, reproduïble, cobreix micro:bit). ← pendent
3. **Capa 3 — Tinkercad** només per a un grapat (LED intern). ← opcional

## Capa 1 executada — estil "flux estandarditzat"
Estil triat pel docent (ASCII, amb llegenda unificada):
```
Pin  8 --[ 220R ]--|>|--+   LED
GND --------------------+
```
Aplicat a les SA amb cablejat de circuit:
- **SA1**: llegenda + diagrama del `Blink` unificats (anatomia de la placa intacta).
- **SA2, SA3, SA4, SA6**: esquemes reescrits amb llegenda + diagrames de flux consistents.
- **SA5, SA7, SA8**: es mantenen (micro:bit integrat / robot amb pins a identificar / telemetria: no tenen cablejat clàssic).

## Pendents
- Decidir si s'executa la **Capa 2 (Wokwi)** per tenir simulació + captures reproduïbles.
- Sincronitzar amb GitHub.
