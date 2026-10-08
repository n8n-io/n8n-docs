---
description: Deploy a production-grade, highly available n8n instance on AWS using the official Terraform module.
layout:
  description:
    visible: false
---

# Deploy to AWS with Terraform

[terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) is a Terraform module that deploys a production-grade, multi-main n8n instance to AWS. It provisions an Amazon EKS cluster running n8n's Helm chart, with managed PostgreSQL (RDS), Redis (ElastiCache), and S3 for shared file storage.

This differs from the manual [Kubernetes setup](../deploy-to-aws.md) n8n documents elsewhere: that guide walks you through hand-written manifests for a single n8n instance. This module automates a highly available, auto-scaling deployment, and it's maintained independently by the n8n Solutions team.

{% hint style="warning" %}
**Pre-release module**

`terraform-aws-n8n` is in pre-release. Expect breaking changes before the module reaches its first stable (1.0) release.
{% endhint %}

{% hint style="info" %}
**Feature availability**

The default multi-main topology this module deploys is available on:

- **Self-hosted:** Enterprise

Setting `n8n_main_hpa_min_replicas = 1` runs a single main pod instead, which only requires a Business plan license. In that mode, the main pod's autoscaling maximum is forced to one, upgrades use a `Recreate` strategy, and you should expect editor, REST API, and scheduled-trigger downtime during upgrades and maintenance.
{% endhint %}

## Architecture

Users and inbound webhooks reach an Application Load Balancer that fronts the EKS cluster. Inside the cluster, the n8n Helm chart runs three separate deployments:

- **Main pods:** handle leader election, the editor UI, and the REST API.
- **Webhook processor pods:** handle inbound triggers.
- **Worker pods:** run workflow executions, and scale on Redis queue depth using [KEDA](https://keda.sh/).

State lives in managed services outside the cluster: RDS PostgreSQL for workflow data, ElastiCache Redis for leader election and the worker queue, and S3 for binary data. AWS Certificate Manager (ACM) issues the TLS certificate for the load balancer.

AWS grants pods permissions (for the Load Balancer Controller, Cluster Autoscaler, EBS CSI driver, and n8n's own S3 access) through EKS Pod Identity.

## Prerequisites

- An **n8n license key**: an Enterprise license for the default multi-main topology, or a Business license if you set `n8n_main_hpa_min_replicas = 1`.
- A **pre-existing VPC** with public and private subnets tagged for EKS and ALB use. The module doesn't create a VPC. See [Customize the AWS infrastructure](customize-the-infrastructure.md).
- **Terraform CLI 1.11 or later**, with the `aws`, `kubernetes`, and `helm` providers configured.
- A DNS option: either a Route 53 hosted zone (`route53_zone_id`), which lets the module issue the ACM certificate and manage the DNS record itself, or a pre-validated certificate from another provider (`certificate_arn`).

## Usage

```hcl
module "n8n" {
  source  = "n8n-io/n8n/aws"
  version = "~> 0.5.0"

  aws_region      = "us-east-1"
  cluster_name    = "n8n-cluster"
  n8n_domain      = "n8n.example.com"
  n8n_license_key = var.n8n_license_key

  # Bring your own VPC.
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
  vpc_cidr_block  = module.vpc.vpc_cidr_block

  # EKS node group autoscaling bounds. You pay for node_min nodes at all times.
  node_min = 3
  node_max = 6

  # Set exactly one of these for DNS and TLS.
  route53_zone_id = "Z0123456789ABCDEFGHIJ"
  # certificate_arn = aws_acm_certificate_validation.n8n.certificate_arn
}
```

Pass sensitive values such as `n8n_license_key` as Terraform variables from a secrets manager, never hardcoded in a `.tfvars` file you commit to version control.

## Choose a starting size

The module ships three sizing examples. Use one as your starting point, then tune node type, count, and database size from there.

| | [small](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/small) (default) | [medium](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/medium) | [large](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/large) |
|---|---|---|---|
| Target scale | Dev or small team | ~5-15M executions/day | ~50-60M+ executions/day |
| Node type | t3.xlarge | m6i.2xlarge | m7i.4xlarge |
| Nodes (min/max) | 3/6 | 5/15 | 10/50 |
| Database | RDS db.t3.small | RDS db.m6g.2xlarge | Aurora PostgreSQL I/O-Optimized |
| Redis | cache.t3.medium | cache.r6g.large | cache.r6g.large |
| Estimated cost/month (on-demand) | ~$440 | ~$2,000 | ~$21,000+ |

Two topology variants are also available as examples: [split-ingress](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/split-ingress) (see [Customize the AWS infrastructure](customize-the-infrastructure.md#customer-managed-ingress)) and [worker-pools](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/worker-pools), an alpha n8n feature that runs separate labelled worker pools.

## Support

This module is open source, maintained by the n8n Solutions team independently of n8n's Enterprise support offering. Report bugs or request features on [GitHub issues](https://github.com/n8n-io/terraform-aws-n8n/issues); the maintainers triage on a best-effort basis, with no SLA. For general n8n questions unrelated to the module, use the [n8n community forum](https://community.n8n.io/).

## In this section

- [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md): configure multi-main, worker autoscaling, and Redis high availability.
- [Configure Enterprise features on AWS](use-enterprise-features-on-aws.md): wire up S3 execution data, Prometheus metrics, OpenTelemetry tracing, log streaming, and external secrets.
- [Customize the AWS infrastructure](customize-the-infrastructure.md): bring your own VPC, database, cache, or cluster, split ingress, or use a custom n8n image.
- [Maintain and tear down the AWS deployment](maintain-and-tear-down.md): manage encryption keys, verify database TLS, and configure deletion protection.

## Related resources

* [Use a cloud provider](../)
* [Deploy to AWS](../deploy-to-aws.md)
* [DigitalOcean](../deploy-to-digital-ocean.md)
* [Heroku](../deploy-to-heroku.md)
* [Hetzner Cloud](../deploy-to-hetzner.md)
* [Azure](../deploy-to-azure.md)
* [Google Cloud Run](../deploy-to-google-cloud-run.md)
* [Google Kubernetes Engine](../deploy-to-google-kubernetes.md)
* [OpenShift Local (CRC)](../deploy-to-openshift-local-crc.md)
* [Use Docker Compose](../use-docker-compose.md)
* [Enable queue mode](../../../configure-n8n/scaling/enable-queue-mode.md)
