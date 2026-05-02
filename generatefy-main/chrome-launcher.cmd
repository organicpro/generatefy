@echo off
setlocal

set "CHROME_BIN=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "CHROME_PROFILE=%~dp0data\ryzesend\chrome-profile"

if not exist "%CHROME_PROFILE%" mkdir "%CHROME_PROFILE%"

"%CHROME_BIN%" --user-data-dir="%CHROME_PROFILE%" --no-first-run --no-default-browser-check %*
