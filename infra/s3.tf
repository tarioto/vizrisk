# Reuse the existing bucket (and its content). We only manage its access
# posture here: lock it down and grant read to the new CloudFront distribution
# via Origin Access Control. The bucket itself is NOT recreated.
data "aws_s3_bucket" "site" {
  bucket = var.origin_bucket
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = data.aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = data.aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

data "aws_iam_policy_document" "site" {
  statement {
    sid       = "AllowCloudFrontServicePrincipalReadOnly"
    actions   = ["s3:GetObject"]
    resources = ["${data.aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = data.aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site.json
}
