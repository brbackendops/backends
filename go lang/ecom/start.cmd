REM check if no args are provided

if "%1" == "" (
    echo No command specified. Please specify either 'start' or 'dev'.
    exit /b 1
)

REM check the first arg is start
if "%1" == "start" (
    echo running your go application
    go run main.go
    exit /b 0
)

REM check the first arg is dev
if "%1" == "dev" (
    echo running your go application in dev mode
    air
    pause
    exit /b 0
)


echo Invalid Command
exit \b 1
