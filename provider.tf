variable "access_key" {
    default = ""
}

variable "secret_key" {
    default = ""
}

provider "aws" {
  access_key  = "${var.access_key}"
  secret_key  = "${var.secret_key}"
  region      = "${var.region}"
  max_retries = 7
}

variable "region" {
  description = "AWS Region."
  default     = "us-east-1"
}
