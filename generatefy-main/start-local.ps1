param(
  [int]$Port = 3001
)

Set-Location -LiteralPath $PSScriptRoot
$env:PORT = [string]$Port
$env:NODE_ENV = "production"
$env:WHATSAPP_EXECUTABLE_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$chromeExe = $env:WHATSAPP_EXECUTABLE_PATH
$chromeProfile = Join-Path $env:TEMP "generatefy-whatsapp-chrome"
$debugVersionUrl = "http://127.0.0.1:9222/json/version"
$debugWsUrl = $null

if (-not (Test-Path -LiteralPath $chromeProfile)) {
  New-Item -ItemType Directory -Path $chromeProfile -Force | Out-Null
}

$debuggerReady = $false
try {
  $response = Invoke-WebRequest -Uri $debugVersionUrl -UseBasicParsing -TimeoutSec 2
  $payload = $response.Content | ConvertFrom-Json
  $debugWsUrl = $payload.webSocketDebuggerUrl
  $debuggerReady = -not [string]::IsNullOrWhiteSpace($debugWsUrl)
} catch {
  $debuggerReady = $false
}

if (-not $debuggerReady -and (Test-Path -LiteralPath $chromeExe)) {
  Start-Process -FilePath $chromeExe -ArgumentList @(
    "--remote-debugging-port=9222",
    "--user-data-dir=$chromeProfile",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank"
  ) -WindowStyle Hidden

  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Milliseconds 500
    try {
      $response = Invoke-WebRequest -Uri $debugVersionUrl -UseBasicParsing -TimeoutSec 2
      $payload = $response.Content | ConvertFrom-Json
      $debugWsUrl = $payload.webSocketDebuggerUrl
      $debuggerReady = -not [string]::IsNullOrWhiteSpace($debugWsUrl)
      break
    } catch {
      $debuggerReady = $false
    }
  }
}

if ($debuggerReady -and -not [string]::IsNullOrWhiteSpace($debugWsUrl)) {
  $env:WHATSAPP_REMOTE_DEBUG_URL = $debugWsUrl
} else {
  Remove-Item Env:WHATSAPP_REMOTE_DEBUG_URL -ErrorAction SilentlyContinue
}

if (
  -not (Test-Path -LiteralPath (Join-Path $PSScriptRoot "dist\index.html")) -or
  -not (Test-Path -LiteralPath (Join-Path $PSScriptRoot ".server-dist\server.js"))
) {
  & "C:\Program Files\nodejs\npm.cmd" run build
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
}

& "C:\Program Files\nodejs\npm.cmd" start
