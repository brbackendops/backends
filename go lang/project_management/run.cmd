@echo off

REM chech if no args are provided
if "%1"=="" (
    echo No Command specified. Please specify either 'start' or 'dev'.
    exit /b 1
)

REM check the first arg is start
if "%1"=="start" (
    echo running your go application
    go run main.go
    exit /b 0
)

REM check the first arg is dev
if "%1"=="dev" (
    echo running your go application in dev mode
    go run github.com/cosmtrek/air
    exit /b 0
)


echo Invalid Command
exit \b 1