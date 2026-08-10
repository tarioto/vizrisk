# The record lives in the parent timarioto.com zone (the orphan
# vizrisk.timarioto.com sub-zone was never delegated and is being removed).
data "aws_route53_zone" "parent" {
  name         = var.parent_zone_name
  private_zone = false
}

resource "aws_route53_record" "a" {
  zone_id         = data.aws_route53_zone.parent.zone_id
  name            = var.domain_name
  type            = "A"
  allow_overwrite = true

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  zone_id         = data.aws_route53_zone.parent.zone_id
  name            = var.domain_name
  type            = "AAAA"
  allow_overwrite = true

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
