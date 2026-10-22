---
description: A step-by-step walkthrough that deploys a working n8n instance on AWS with the terraform-aws-n8n module, from an empty folder to a running editor.
layout:
  description:
    visible: false
---

# Deploy your first n8n instance on AWS

This walkthrough takes you from an empty folder to a running n8n instance on AWS in six steps, using the [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module's `small` example. You write one file, `main.tf`, then run `terraform init`, `terraform plan`, and `terraform apply`.

You don't clone a repository. The example lives in the Terraform Registry as [`n8n-io/n8n/aws`](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0), and `terraform init` downloads it for you. The example bundles the VPC and the provider setup, so the configuration on this page is all the Terraform you write.

Expect about 30 minutes from `terraform apply` to a reachable editor.

{% hint style="info" %}
**Feature availability**

The default multi-main topology this module deploys is available on:

- **Self-hosted:** Enterprise

A Business license also works if you set `n8n_main_hpa_min_replicas = 1` to run a single main pod. See [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md) for what that mode changes.
{% endhint %}

## Prerequisites

Before you start, make sure you have:

- [Terraform CLI 1.11 or later](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) installed.
- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured with credentials that can create EKS, RDS, ElastiCache, IAM, VPC, KMS, S3, ACM, and Route 53 resources.
- A domain whose parent zone is hosted in AWS Route 53. You need the hosted zone ID. For example, to run n8n at `n8n.example.com`, you need the hosted zone for `example.com`.
- An n8n Enterprise license key, or a Business license key if you set `n8n_main_hpa_min_replicas = 1`.

## Step 1: Create a project folder

Terraform works from the folder you run it in, so start with an empty one:

```bash
mkdir n8n-aws
cd n8n-aws
```

## Step 2: Choose a deployment size

The terraform-aws-n8n module ships three sizing examples. This walkthrough deploys `small`, which suits a development or small-team instance:

| | small (default) | medium | large |
|---|---|---|---|
| Target scale | Development or small team | ~5–15M executions/day | ~50–60M+ executions/day |
| Node type | t3.xlarge | m6i.2xlarge | m7i.4xlarge |
| Estimated cost/month (on-demand) | ~$440 | ~$2,000 | ~$21,000+ |

For the full comparison, including pod counts, database sizing, and reserved-instance pricing, see the sizing table on [Deploy to AWS with Terraform](./). If you're unsure, start with `small`: moving from `small` to `medium` is straightforward, while moving to `large` involves infrastructure changes.

To deploy a larger tier instead, point the module `source` in your `main.tf` at that example's subpath. [`examples/medium`](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0/examples/medium) takes the same inputs as `small`, and [`examples/large`](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0/examples/large) adds `certificate_arn` and `aurora_instance_class`.

## Step 3: Create main.tf

Create one file, `main.tf`, in your project folder. It references the registry's [small example](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0/examples/small) as a module, pinned to 0.5.0:

{% code title="main.tf" %}
```hcl
variable "n8n_license_key" {
  type      = string
  sensitive = true
}

module "n8n" {
  source  = "n8n-io/n8n/aws//examples/small"
  version = "0.5.0"

  n8n_domain      = "n8n.example.com"
  route53_zone_id = "<hosted-zone-id>"
  n8n_license_key = var.n8n_license_key

  # Applied to every resource, for cost tracking and ownership.
  tags = {
    Environment = "development"
    Owner       = "platform-team"
  }

  # aws_region   = "eu-west-1"   # optional, defaults to us-east-1
  # cluster_name = "n8n-cluster" # optional, 14 characters or fewer
}

output "n8n_url" {
  description = "The URL to open once the load balancer finishes provisioning."
  value       = module.n8n.n8n_url
}

output "n8n_encryption_key" {
  description = "Back this up in a password manager. n8n emits it once."
  value       = module.n8n.n8n_encryption_key
  sensitive   = true
}
```
{% endcode %}

`cluster_name` must be 14 characters or fewer. The module derives an ElastiCache cluster ID of `<cluster-name>-redis`, and AWS caps those at 20 characters.

## Step 4: Set your values

In `main.tf`, replace:

- `n8n_domain` with the domain you want to run n8n on.
- `route53_zone_id` with the hosted zone ID for that domain's parent zone.
- `tags` with whatever your organization uses for cost tracking and ownership.

Then provide your license key as an environment variable, so it stays out of the file:

```bash
export TF_VAR_n8n_license_key="<your-license-key>"
```

## Step 5: Initialize Terraform

```bash
terraform init
```

This downloads the n8n module, the VPC module, and the `aws`, `kubernetes`, and `helm` providers.

## Step 6: Plan and apply

Preview what Terraform creates:

```bash
terraform plan
```

Review the plan, then apply it:

```bash
terraform apply
```

Type `yes` when prompted, or add `-auto-approve` to skip the confirmation. Provisioning takes about 20 to 25 minutes, and the load balancer needs about five more minutes after that to become reachable.

When it finishes, open the URL from the `n8n_url` output:

```bash
terraform output -raw n8n_url
```

n8n shows the setup screen. Enter your email, first and last name, and a password to create the owner account. Complete or skip the questionnaire to reach your workspace.

{% hint style="danger" %}
**Save your encryption key now**

n8n generates the encryption key once. Without it, every stored credential becomes unreadable, and no one can recover it for you. Run `terraform output -raw n8n_encryption_key` and store the value in a password manager before you go any further.
{% endhint %}

## Protect your Terraform state file

Terraform writes a `terraform.tfstate` file in your project folder. It records your infrastructure, and it stores secrets in plain text: the n8n encryption key, the database password, and your license key. Marking an output `sensitive` only hides it from the terminal, not from the state file.

Follow two rules:

- Never commit `terraform.tfstate` to version control.
- For anything beyond a quick trial, store state remotely, either in an S3 bucket with state locking or in [HCP Terraform](https://developer.hashicorp.com/terraform/cloud-docs). Remote state encrypts your secrets, backs them up, and gives your team one shared source of truth.

## Clean up

To tear down everything this example created:

```bash
terraform destroy
```

Type `yes` when prompted, or add `-auto-approve`.

The `small` example ships teardown-friendly defaults so that `terraform destroy` runs cleanly: the RDS instance skips its final snapshot, and the S3 bucket force-destroys. Review these before you promote the setup to production. See [Maintain and tear down the AWS deployment](maintain-and-tear-down.md) for the production values, and note that the module schedules its KMS keys for deletion seven days after a destroy, which blocks recovery from any retained snapshot.

## Related resources

Your instance is running the module's defaults. From here:

- [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md): tune multi-main, worker autoscaling, and Redis high availability.
- [Configure Enterprise features on AWS](use-enterprise-features-on-aws.md): wire up S3 execution data, Prometheus metrics, OpenTelemetry tracing, log streaming, and external secrets.
- [Customize the AWS infrastructure](customize-the-infrastructure.md): point the module at a VPC, database, cache, or cluster you already run, split ingress, or use a custom n8n image.
