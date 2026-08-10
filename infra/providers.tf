provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "vizrisk.timarioto.com"
      ManagedBy = "OpenTofu"
    }
  }
}

# CloudFront requires its ACM certificate to live in us-east-1. The vizrisk
# bucket already lives in us-east-1 too, but the alias keeps the ACM cert
# explicit and consistent with the timarioto.com config.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "vizrisk.timarioto.com"
      ManagedBy = "OpenTofu"
    }
  }
}
