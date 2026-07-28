param(
  [string]$FtpHost = "",
  [string]$FtpUser = "",
  [string]$FtpPass = ""
)

$ErrorActionPreference = "Stop"
$LocalDist  = "e:\Dental\dist"
$RemoteBase = "/public_html"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   SmileCare - Hostinger FTP Deployer" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Get FTP details from: hPanel -> Files -> FTP Accounts" -ForegroundColor Yellow
Write-Host ""

if ($FtpHost -eq "") { $FtpHost = Read-Host "FTP Host (e.g. ftp.silver-pheasant-716671.hostingersite.com)" }
if ($FtpUser -eq "") { $FtpUser = Read-Host "FTP Username" }
if ($FtpPass -eq "") { $FtpPass = Read-Host "FTP Password" }

Write-Host ""
Write-Host "Connecting to $FtpHost ..." -ForegroundColor Green

function MakeDir-Ftp {
  param([string]$path)
  $uri = "ftp://" + $FtpHost + $path
  $req = [System.Net.FtpWebRequest]::Create($uri)
  $req.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)
  $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
  $req.UsePassive = $true
  $req.UseBinary  = $true
  try {
    $res = $req.GetResponse()
    $res.Close()
    Write-Host "  Folder created: $path" -ForegroundColor Cyan
  } catch {
    Write-Host "  Folder exists (ok): $path" -ForegroundColor DarkGray
  }
}

function Upload-Ftp {
  param([string]$localFile, [string]$remotePath)
  $uri = "ftp://" + $FtpHost + $remotePath
  $req = [System.Net.FtpWebRequest]::Create($uri)
  $req.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)
  $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
  $req.UsePassive = $true
  $req.UseBinary  = $true
  $req.KeepAlive  = $false
  try {
    $bytes = [System.IO.File]::ReadAllBytes($localFile)
    $req.ContentLength = $bytes.Length
    $stream = $req.GetRequestStream()
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Close()
    $res = $req.GetResponse()
    $res.Close()
    Write-Host ("  OK  " + $remotePath) -ForegroundColor Green
  } catch {
    Write-Host ("  ERR " + $remotePath + " : " + $_.Exception.Message) -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "[1/3] Creating remote folders..." -ForegroundColor Yellow
MakeDir-Ftp "$RemoteBase"
MakeDir-Ftp "$RemoteBase/assets"

Write-Host ""
Write-Host "[2/3] Uploading files..." -ForegroundColor Yellow

$rootFiles = @("index.html", ".htaccess", "favicon.svg", "icons.svg")
foreach ($f in $rootFiles) {
  $lp = Join-Path $LocalDist $f
  if (Test-Path $lp) {
    Upload-Ftp $lp "$RemoteBase/$f"
  }
}

$assetsPath = Join-Path $LocalDist "assets"
if (Test-Path $assetsPath) {
  foreach ($f in (Get-ChildItem $assetsPath -File)) {
    Upload-Ftp $f.FullName "$RemoteBase/assets/$($f.Name)"
  }
}

Write-Host ""
Write-Host "[3/3] Done!" -ForegroundColor Green
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " Site live at:" -ForegroundColor White
Write-Host " https://silver-pheasant-716671.hostingersite.com" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
