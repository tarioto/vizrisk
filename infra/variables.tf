variable "aws_region" {
  description = "Region for regional resources. The vizrisk bucket is in us-east-1."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain this site is served on."
  type        = string
  default     = "vizrisk.timarioto.com"
}

variable "parent_zone_name" {
  description = "Existing Route53 hosted zone that holds the domain's records."
  type        = string
  default     = "timarioto.com"
}

variable "origin_bucket" {
  description = "Existing S3 bucket holding the built site (reused as the CloudFront origin)."
  type        = string
  default     = "vizrisk"
}
