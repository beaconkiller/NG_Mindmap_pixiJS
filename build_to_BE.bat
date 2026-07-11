set src=%cd%
set be_folder="Exp_Sitemap_Node_BE"
@REM set be_folder="TF_EAppr_BE"

if "%~1"=="" (
    echo Parameter required.
    exit /b 1
)

set branch=%~1

for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set date=%datetime%


@REM ------------------------- GIT PUSH ON ANGULAR FE -------------------------

cd /d "%src%"
git switch %branch% && ^
git add . && ^
git status && ^
git commit -m "DEPLOY SEQUENCE - %date%" && ^
git push origin %branch% && ^

@REM ------------------------- GIT PUSH ON NODE BE -------------------------

ng build && ^
xcopy "%src%\dist\mapping_ng_fe\browser" "%src%\..\%be_folder%\web" /E /I /H /C /Y && ^
cd /d "%src%\..\%be_folder%\" && ^
git switch %branch% && ^
git add . && ^
git status && ^
git commit -m "DEPLOY SEQUENCE - %date%" && ^
git push origin %branch%