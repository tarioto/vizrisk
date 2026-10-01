# Public certificate for both hostnames, in us-east-1 for CloudFront.
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = [var.cloudflare_domain_name]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# DNS validation records, each in the zone that owns its hostname. Because
# OpenTofu manages these, the cert auto-renews from here on.
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    } if dvo.domain_name == var.domain_name
  }

  zone_id         = data.aws_route53_zone.parent.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

# Cloudflare stores names without the trailing dot ACM returns, so trim it to
# avoid a perpetual diff.
resource "cloudflare_dns_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = trimsuffix(dvo.resource_record_name, ".")
      record = trimsuffix(dvo.resource_record_value, ".")
      type   = dvo.resource_record_type
    } if dvo.domain_name == var.cloudflare_domain_name
  }

  zone_id = data.cloudflare_zone.alias.zone_id
  name    = each.value.name
  type    = each.value.type
  content = each.value.record
  ttl     = 60
  proxied = false
}

resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site.arn
  validation_record_fqdns = concat(
    [for r in aws_route53_record.cert_validation : r.fqdn],
    [for r in cloudflare_dns_record.cert_validation : r.name],
  )
}
