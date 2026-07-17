# Reclona el repo del curs en una maquina amb un clon VELL (historial reescrit
# el 17-07-2026: NO es pot fer pull). Executa'l a la maquina vella amb:
#
#   powershell -ExecutionPolicy Bypass -File .\reclonar_altra_maquina.ps1
#
# O directament des de GitHub (una sola linia, PowerShell):
#   iwr -useb https://raw.githubusercontent.com/tomeu-cd100/robotica-1batx-2627/main/tools/reclonar_altra_maquina.ps1 | iex
#
# Que fa: (1) comprova que el clon vell no tingui feina sense pujar (s'atura si
# en troba), (2) el reanomena a "...VELL - esborrar", (3) clona de nou,
# (4) npm install a Material Classroom, (5) recorda els secrets a copiar a ma.

$ErrorActionPreference = "Stop"
$REPO_URL = "https://github.com/tomeu-cd100/robotica-1batx-2627.git"
$NOM = "Curs 2627 1 Batx Robotica"
$BASE = Join-Path $env:USERPROFILE "Documents"
$VELL = Join-Path $BASE $NOM
$APARTAT = Join-Path $BASE "$NOM VELL - esborrar"

Write-Host "`n=== Reclonatge del curs (historial reescrit: pull prohibit) ===`n"

# 1 - Feina local no pujada al clon vell?
if (Test-Path (Join-Path $VELL ".git")) {
    Push-Location $VELL
    $canvis = git status --porcelain
    Pop-Location
    if ($canvis) {
        Write-Host "ATURAT: el clon vell te canvis locals no committats:" -ForegroundColor Red
        $canvis | ForEach-Object { Write-Host "   $_" }
        Write-Host "`nCopia'ls a part a MA (no facis pull/push) i torna a executar l'script."
        exit 1
    }
    Write-Host "1) Clon vell net (cap canvi local)." -ForegroundColor Green

    # 2 - Aparta el clon vell
    if (Test-Path $APARTAT) {
        Write-Host "ATURAT: ja existeix '$APARTAT'. Esborra'l o reanomena'l primer." -ForegroundColor Red
        exit 1
    }
    Rename-Item $VELL $APARTAT
    Write-Host "2) Clon vell apartat a: $APARTAT" -ForegroundColor Green
} elseif (Test-Path $VELL) {
    Write-Host "ATURAT: '$VELL' existeix pero no es un repo git. Revisa-ho a ma." -ForegroundColor Red
    exit 1
} else {
    Write-Host "1-2) No hi ha clon vell: clonatge net." -ForegroundColor Green
}

# 3 - Clona de nou
git clone $REPO_URL $VELL
if ($LASTEXITCODE -ne 0) {
    Write-Host "El clone ha fallat. La xarxa del centre a vegades bloqueja GitHub: prova una altra xarxa o el mobil en hotspot." -ForegroundColor Red
    if (Test-Path $APARTAT) { Rename-Item $APARTAT $VELL }  # restaura el vell
    exit 1
}
Write-Host "3) Clonat." -ForegroundColor Green

# 4 - Dependencies de Material Classroom (si hi ha node)
$mc = Join-Path $VELL "Material Classroom"
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Push-Location $mc
    npm install --no-audit --no-fund
    Pop-Location
    Write-Host "4) npm install fet a Material Classroom." -ForegroundColor Green
} else {
    Write-Host "4) npm no trobat: fes 'npm install' a Material Classroom quan calgui." -ForegroundColor Yellow
}

# 5 - Verificacio i recordatoris
Push-Location $VELL
$cap = git log --oneline -1
Pop-Location
Write-Host "`n5) HEAD del clon nou: $cap"
Write-Host @"

RECORDA (git no ho porta):
  - Copia 'Material Classroom\credentials.json' i 'token.json' des de la
    carpeta apartada (o de l'altra maquina). El token vell d'aquesta maquina
    pot NO valdre (scopes canviats el 17-07): si falla, el primer script
    demanara autoritzacio al navegador.
  - 'Recursos\_tercers_nomes_local\' (STEAM Cards) nomes si les vols aqui.
  - Quan tot funcioni: esborra '$APARTAT'.
"@
Write-Host "Fet." -ForegroundColor Green
