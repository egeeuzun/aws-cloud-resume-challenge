#!/usr/bin/env bash
# cv.pdf repoda tutulmuyor; guncellemek icin bu betikle S3'e yukle.
set -euo pipefail

BUCKET="${BUCKET:-ege2-cloud-resume-challenge}"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-E2UHC7UO9TESXY}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CV="$ROOT/site/assets/cv.pdf"

echo "Uploading '$CV' to s3://$BUCKET/site/assets/cv.pdf ..."
aws s3 cp "$CV" "s3://$BUCKET/site/assets/cv.pdf" --content-type "application/pdf"

echo "Invalidating /assets/cv.pdf on CloudFront $DISTRIBUTION_ID ..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/assets/cv.pdf" \
  --query "Invalidation.Id" --output text
echo "Done."
