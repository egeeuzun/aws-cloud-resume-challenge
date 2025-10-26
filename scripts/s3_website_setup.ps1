param(
  [Parameter(Mandatory=$true)][string]$BucketName,
  [string]$Region = "eu-central-1"
)

Write-Host "Creating S3 bucket $BucketName in $Region (if not exists)..." -ForegroundColor Cyan
aws s3api create-bucket --bucket $BucketName --region $Region --create-bucket-configuration LocationConstraint=$Region 2>$null

Write-Host "Disabling block public access..." -ForegroundColor Cyan
aws s3api put-public-access-block --bucket $BucketName --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

Write-Host "Applying public read bucket policy..." -ForegroundColor Cyan
$policy = @{
  Version = "2012-10-17"
  Statement = @(@{
      Sid = "PublicReadGetObject"
      Effect = "Allow"
      Principal = "*"
      Action = "s3:GetObject"
      Resource = "arn:aws:s3:::$BucketName/*"
  })
} | ConvertTo-Json -Compress
aws s3api put-bucket-policy --bucket $BucketName --policy $policy

Write-Host "Enabling static website hosting..." -ForegroundColor Cyan
aws s3 website s3://$BucketName --index-document index.html --error-document index.html

Write-Host "S3 website endpoint:" -NoNewline; Write-Host " http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Green

