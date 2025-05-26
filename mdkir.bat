@echo off

echo Creating GameVault 2.0 directory structure...

REM Create main source directories
mkdir src\app\api 2>nul
mkdir src\app\dashboard 2>nul  
mkdir src\app\games 2>nul
mkdir src\app\stats 2>nul
mkdir src\app\auth 2>nul
mkdir src\components 2>nul
mkdir src\lib 2>nul
mkdir src\types 2>nul

REM Create other project directories
mkdir prisma 2>nul
mkdir public 2>nul

REM Create subdirectories for components
mkdir src\components\ui 2>nul
mkdir src\components\forms 2>nul
mkdir src\components\charts 2>nul

REM Create subdirectories for lib
mkdir src\lib\database 2>nul
mkdir src\lib\utils 2>nul
mkdir src\lib\auth 2>nul

REM Create subdirectories for public assets
mkdir public\images 2>nul
mkdir public\icons 2>nul

echo Directory structure created successfully!
echo.
echo Created directories:
echo - src/app/api
echo - src/app/dashboard  
echo - src/app/games
echo - src/app/stats
echo - src/app/auth
echo - src/components
echo - src/lib
echo - src/types
echo - prisma
echo - public
echo.
echo Subdirectories also created for better organization.
echo.
pause