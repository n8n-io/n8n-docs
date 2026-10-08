---
description: Bring your own VPC, database, cache, or cluster, split ingress, or use a custom n8n image with the terraform-aws-n8n module.
layout:
  description:
    visible: false
---

# Customize the AWS infrastructure

The [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module can provision every layer of the deployment, or point at infrastructure you already run. This page covers the main customization points: pointing the module at existing infrastructure, splitting ingress traffic, and using a custom n8n image.

## Customer-managed infrastructure

Every layer the module can provision can instead point at infrastructure you already run. Each layer follows the same pattern: a `create_<x>` boolean (default `true`) that stops the module provisioning that layer, plus one or more reference inputs required only when it's `false`.

| Layer | Toggle | Reference inputs |
|---|---|---|
| RDS PostgreSQL | `create_database` | `db_host`, `db_password` (or `db_password_secret_ref`) |
| EKS cluster and node group | `create_eks` | `existing_eks_cluster_name`, `existing_eks_cluster_prerequisites_confirmed` |
| ElastiCache Redis | `create_elasticache` | `redis_host`, `redis_port`, `redis_auth_token` (or `redis_auth_token_secret_ref`), `redis_transit_encryption_enabled` |
| S3 bucket | `create_s3_bucket` | `existing_s3_bucket_name` |
| RDS KMS key | `create_db_kms_key` | `db_kms_key_arn` |
| S3 KMS key | `create_s3_kms_key` | `s3_kms_key_arn` |
| Cluster controllers (load balancer controller, Cluster Autoscaler, metrics-server, KEDA) | `install_lbc` / `install_cluster_autoscaler` / `install_metrics_server` / `install_keda` | none; assumes equivalents already run on the existing cluster |

For example, to point the module at a Redis instance you already manage:

```hcl
module "n8n" {
  # ...
  create_elasticache = false
  redis_host         = aws_elasticache_replication_group.shared.primary_endpoint_address
  redis_port         = 6379
  redis_auth_token   = var.shared_redis_auth_token
}
```

{% hint style="warning" %}
**Keep the toggle and its reference inputs in sync**

Setting a reference input such as `redis_host` without also setting its `create_<x>` boolean to `false` doesn't fail: the module still provisions its own managed resource and points n8n at that instead, while the infrastructure you supplied sits unused. Always set both together.
{% endhint %}

If you're pointing two n8n deployments at the same Redis host, set a unique `redis_key_prefix` for each. Without it, both deployments share the same queue and leader-election channels, and activating a workflow on one instance can produce `webhook not registered` errors on the other.

Runnable reference configurations for each customer-managed layer are available in the module's [examples](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples) folder (`customer-managed-redis`, `customer-managed-s3`, `customer-managed-cluster`, and `customer-managed-everything`).

{% hint style="info" %}
**VPC creation is always out of scope**

The module always requires a pre-existing VPC (`vpc_id`, `private_subnets`, `public_subnets`). It never creates one.
{% endhint %}

## Customer-managed ingress

By default, the module creates a single internet-facing Application Load Balancer that routes `/webhook` to the webhook processors and `/` to the main pods. Set `create_ingress = false` to manage your own ingress instead, for example to split public webhook traffic from an internal-only editor and API.

Route traffic to the Services the module exposes as outputs:

| Output | Serves |
|---|---|
| `n8n_service_name` | Editor UI, REST API |
| `n8n_webhook_service_name` | Webhooks, forms, waiting resumptions, MCP |
| `n8n_webhook_path_prefixes` | The path prefixes that must reach the webhook processors |
| `n8n_service_port` | Both (`5678`) |

Route every prefix in `n8n_webhook_path_prefixes` to the webhook processors, not just `/webhook`: the module disables production webhook handling on the main pods, so `/webhook-waiting` (wait-node resumption), `/form` and `/form-waiting` (Form Trigger nodes), and `/mcp` (MCP server triggers) all return 404 if they reach the main pods instead. Declare these prefixes before any catch-all `/` rule.

A caller-managed ingress also needs to:

- **Enable session stickiness** to `n8n_service_name`, so each browser stays on one main pod. Without it, editor requests and WebSocket connections from one browser spread across main pods and the editor loses its connection.
- **Set `n8n_proxy_hops`** to the number of proxies between the client and n8n that add an `X-Forwarded-For` header. The module sets this to `1` by default, which is correct if the module or your own load balancer is the only proxy. Add one for each additional HTTP proxy in the path, such as CloudFront.

A complete, runnable example of a split ingress, including the certificate and both DNS records, is in [`examples/split-ingress`](https://github.com/n8n-io/terraform-aws-n8n/tree/main/examples/split-ingress).

## Custom n8n images

Set `n8n_image_repository` to point the Helm release at an image you build instead of the default n8n image. Common reasons include an internal base image or community nodes baked into the image:

```hcl
module "n8n" {
  # ...other inputs...

  n8n_image_repository = "123456789012.dkr.ecr.eu-west-1.amazonaws.com/n8n"
  n8n_image_tag        = "2.27.4-mypackages"

  # Pin to the n8n version the custom image is built from.
  n8n_task_runner_image_tag = "2.27.4"

  # Not needed when packages are already in the image.
  n8n_reinstall_missing_packages = false
}
```

{% hint style="warning" %}
**Community packages installed through the UI don't load from a custom image**

n8n only loads community nodes from a directory set by `N8N_CUSTOM_EXTENSIONS`, not from a plain `npm install` into the image's `node_modules`. Set `n8n_custom_extensions_path` to the directory your image populates with the packages, and install the packages there in your Dockerfile. Nodes loaded this way are also renamed to a `CUSTOM.*` type, so existing workflows built on a UI-installed copy of the same package won't resolve without updating their node types.
{% endhint %}

If rebuilding an image for every package change isn't practical, `n8n_extra_volumes` and `n8n_extra_volume_mounts` mount the same directory from a ConfigMap, Secret, or persistent volume claim instead of baking it into the image.

## Pod DNS at scale

`n8n_dns_config` sets the DNS options on the n8n pods. At a large pod count, Kubernetes' default DNS search-path behavior (`ndots:5`) sends every in-cluster or AWS-service hostname lookup, such as to S3 or ElastiCache, through up to four unnecessary search-domain queries before trying the name as written. Set `n8n_dns_config` to `ndots:1` if your deployment addresses every dependency by fully qualified domain name, which it does by default in this module:

```hcl
n8n_dns_config = {
  options = [{ name = "ndots", value = "1" }]
}
```

This reduces DNS query volume substantially at scale and removes failed requests caused by CoreDNS saturation, without making individual requests faster.

## Related resources

* [Deploy to AWS with Terraform](./)
* [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md)
* [Configure Enterprise features on AWS](use-enterprise-features-on-aws.md)
* [Maintain and tear down the AWS deployment](maintain-and-tear-down.md)
