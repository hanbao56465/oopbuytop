param(
  [int]$MaxPerCategory = 60,
  [int]$OutfitsLimit = 24
)

$ErrorActionPreference = 'Stop'
$taskApiKey = $env:MAISONLOOKS_API_KEY
if (-not $taskApiKey) { throw 'MAISONLOOKS_API_KEY is required.' }

$taskHeaders = @{ 'X-API-Key' = $taskApiKey; Accept = 'application/json' }
$taskOutDir = Join-Path $PSScriptRoot '..\src\data'
New-Item -ItemType Directory -Force -Path $taskOutDir | Out-Null

function Get-MaisonLooksJson([string]$Path) {
  Invoke-RestMethod -Headers $taskHeaders -Uri "https://api.maisonlooks.com/public/v1$Path"
}

$categories = Get-MaisonLooksJson '/categories'
$products = [System.Collections.Generic.List[object]]::new()
foreach ($category in $categories) {
  $response = Get-MaisonLooksJson "/products?category=$([uri]::EscapeDataString($category.slug))&limit=$MaxPerCategory&offset=0"
  $items = if ($response.data) { $response.data } else { $response }
  foreach ($item in $items) { $products.Add($item) }
}
$outfitResponse = if ($OutfitsLimit -gt 0) { Get-MaisonLooksJson "/outfits?featured=true&limit=$OutfitsLimit" } else { @() }
$outfits = if ($outfitResponse.data) { $outfitResponse.data } else { $outfitResponse }
$meta = @{ fetchedAt = (Get-Date).ToUniversalTime().ToString('o'); categoryCount = $categories.Count; productCount = $products.Count; outfitCount = $outfits.Count; maxPerCategory = $MaxPerCategory }

$categories | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 (Join-Path $taskOutDir 'categories.json')
$products | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 (Join-Path $taskOutDir 'products.json')
$outfits | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 (Join-Path $taskOutDir 'outfits.json')
$meta | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 (Join-Path $taskOutDir '_meta.json')
Write-Host "MaisonLooks snapshot refreshed: $($products.Count) products in $($categories.Count) categories."
