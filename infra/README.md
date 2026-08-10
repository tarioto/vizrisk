# Infrastructure (OpenTofu)

Infrastructure-as-code for `vizrisk.timarioto.com`: the existing `vizrisk` S3
bucket served through a new CloudFront distribution (Origin Access Control) with
a DNS-validated, auto-renewing ACM certificate and Route53 records.

DNS records live in the shared **`timarioto.com`** hosted zone (referenced
read-only via a data source) — the same zone the main site uses. The old orphan
`vizrisk.timarioto.com` sub-zone was never delegated and is removed as part of
this migration.

## Resources

| File            | Resources |
| --------------- | --------- |
| `s3.tf`         | Access posture for the **existing** `vizrisk` bucket: public-access block, ownership controls, CloudFront-only policy (bucket + content reused, not recreated) |
| `cloudfront.tf` | Origin Access Control + CloudFront distribution |
| `acm.tf`        | ACM cert (us-east-1) + Route53 DNS validation (auto-renews) |
| `dns.tf`        | Route53 A/AAAA alias records in the parent zone |
| `variables.tf`  | `aws_region`, `domain_name`, `parent_zone_name`, `origin_bucket` |
| `outputs.tf`    | Bucket name, distribution ID, CloudFront domain, cert ARN |

State is local (`terraform.tfstate`, git-ignored).

## Apply

Requires AWS credentials with S3 (on the `vizrisk` bucket), CloudFront, ACM, and
Route53 permissions.

```bash
cd infra
tofu init      # first time only
tofu plan
tofu apply     # ~5-10 min (ACM validation + CloudFront deploy)
```

`apply` creates the new distribution + cert and points `vizrisk.timarioto.com`
at it. The site is currently offline, so there is nothing to cut over from.

## After apply

Update the repo's GitHub Actions secret so CI invalidates the new distribution:

```bash
tofu output   # note cloudfront_distribution_id
gh secret set AWS_CLOUDFRONT_DISTRIBUTION_ID --repo tarioto/vizrisk --body "<id>"
# AWS_S3_BUCKET stays "vizrisk" (bucket reused)
```

## Decommission the OLD distribution + orphan zone

Not in OpenTofu state — remove manually once the new site is verified:

```bash
# 1. Disable + delete the old distribution EC58B8WB0GZK1
# 2. Delete the orphan hosted zone (vizrisk.timarioto.com, Z013008525UBV6YWVBFST)
# 3. Once no distribution references it, delete the old expired wildcard cert
#    b1f8b4b8-... in us-east-1 (shared with the old timarioto.com stack)
```
