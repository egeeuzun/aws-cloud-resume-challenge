param(
  [Parameter(Mandatory=$true)][string]$BucketName
)

$Root = Resolve-Path "$PSScriptRoot/.."
$SitePath = Join-Path $Root "site"
Write-Host "Syncing '$SitePath' to s3://$BucketName ..." -ForegroundColor Cyan
aws s3 sync $SitePath "s3://$BucketName" --delete --cache-control "max-age=300" --acl public-read
Write-Host "Done." -ForegroundColor Green

