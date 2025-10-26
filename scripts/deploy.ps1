param(
  [string]$StackName = "cloud-resume-backend",
  [string]$Region = "eu-central-1",
  [string]$AllowedOrigin = "*",
  [string]$TableName = "VisitorsTable",
  [string]$ItemId = "resume"
)

Write-Host "Building SAM application..." -ForegroundColor Cyan
sam build --use-container:$false --template-file "infra/template.yaml" || exit $LASTEXITCODE

Write-Host "Deploying SAM stack '$StackName' to $Region..." -ForegroundColor Cyan
sam deploy `
  --stack-name $StackName `
  --region $Region `
  --capabilities CAPABILITY_IAM `
  --resolve-s3 `
  --no-confirm-changeset `
  --parameter-overrides "AllowedOrigin=$AllowedOrigin" "TableName=$TableName" "ItemId=$ItemId" || exit $LASTEXITCODE

Write-Host "Done. Use 'aws cloudformation describe-stacks' to get ApiUrl output." -ForegroundColor Green

