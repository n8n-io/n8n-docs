---
description: A step-by-step walkthrough that deploys a working n8n instance on Google Cloud Platform with the terraform-google-n8n module, from an empty folder to a running editor.
layout:
  description:
    visible: false
---

# Deploy to Google Cloud with Terraform

Deploy a production-grade, highly available n8n instance on Google Cloud using the official Terraform module.

[terraform-google-n8n](https://github.com/n8n-io/terraform-google-n8n) is a Terraform module that deploys a production-grade n8n instance to Google Cloud. It provisions a regional GKE cluster running n8n's main, webhook, and worker pods, with managed PostgreSQL (Cloud SQL), Redis (Memorystore), and Cloud Storage for binary data. A load balancer, a Google-managed certificate, and Cloud DNS handle ingress, TLS, and name resolution.

This module automates a deployment with separate main, webhook, and worker pods, each with its own autoscaling bounds, and it's maintained by the n8n Solutions team.

{% hint style="warning" %}
**Pre-release module**

Version 0.1.0 of the Google module is marked pre-release and isn't scale-validated (no load test has been run). Expect breaking changes between releases, and pin the module version as shown in this guide.
{% endhint %}

{% hint style="warning" %}
**New deployments only**

Version 0.1.0 supports net-new deployments only. It can't import the state of an existing n8n installation. You can deploy onto a GKE cluster you already have (set `create_gke = false` and `existing_gke_cluster_name`), but the module can't adopt a running n8n deployment.
{% endhint %}

{% hint style="info" %}
**Feature availability**

The default multi-main topology this module deploys is available on:

* **Self-hosted:** Enterprise

Setting `n8n_main_hpa_min_replicas = 1` runs a single main pod instead, which only requires a Business plan license. This selects single-main queue mode, which doesn't need the multiple-main entitlement.
{% endhint %}

## Architecture

The module deploys n8n as three separate sets of pods on a regional GKE cluster:

* **Main pods:** handle the editor UI and the REST API.
* **Webhook pods:** handle inbound triggers.
* **Worker pods:** run workflow executions.

The module scales the number of pods in each set between the minimum and maximum for your chosen size (see [Choose a starting size](#choose-a-starting-size)). A regional cluster spans roughly three zones, so node counts are the per-zone range multiplied by three.

State lives in managed services outside the cluster: Cloud SQL for PostgreSQL for workflow data, Memorystore for Redis for queue mode, and a Cloud Storage bucket for binary data. n8n accesses the bucket with an HMAC key. A load balancer fronts the cluster for inbound traffic, with a Google-managed certificate and a DNS record in your Cloud DNS zone.

The module creates the VPC, GKE cluster, Cloud SQL instance, Memorystore instance, Cloud Storage bucket, load balancer, certificate, and DNS record.

## Prerequisites

* An **n8n license key**: an Enterprise license for the default multi-main topology, or a Business license if you set `n8n_main_hpa_min_replicas = 1`.
* **Terraform CLI 1.9 or later**. See [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/install-cli).
* **Google Cloud CLI (`gcloud`)**. See [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install). You also need `kubectl` and the `gke-gcloud-auth-plugin`, once, to read the n8n encryption key after you deploy.
* **A Google Cloud project with billing enabled**, and an identity with permission to create GKE, Cloud SQL, Memorystore, Cloud Storage, Cloud DNS, load balancer, service networking, and IAM resources in it. Owner on the project covers this.
* **Required APIs enabled** on the project:

  ```bash
  gcloud services enable \
    container.googleapis.com sqladmin.googleapis.com redis.googleapis.com \
    servicenetworking.googleapis.com compute.googleapis.com iam.googleapis.com \
    dns.googleapis.com certificatemanager.googleapis.com \
    --project=YOUR_PROJECT_ID
  ```

* **Application Default Credentials**: run `gcloud auth application-default login`, or point `GOOGLE_APPLICATION_CREDENTIALS` at a key file.
* **The `iam.disableServiceAccountKeyCreation` org policy turned off** for the project. n8n's binary-data storage on Cloud Storage needs an HMAC key, and this policy blocks creating one. Ask an organization or folder admin to disable it for the project. This is the most common reason a first apply fails. See [Set your values](#3-set-your-values) for an alternative.
* **An existing Cloud DNS public managed zone** for your domain, with the domain already delegated to it. You need the zone's resource name (for example `example-com`), not its DNS name.

{% hint style="info" %}
**Run the preflight check**

The module ships a read-only preflight script that checks your APIs, IAM permissions, and the org policy before you apply: `scripts/preflight.sh YOUR_PROJECT_ID` in [terraform-google-n8n](https://github.com/n8n-io/terraform-google-n8n/tree/0.1.0). It needs `gcloud`, `curl`, and `python3`. Run it once before your first apply.
{% endhint %}

## Usage

This guide deploys the `small` tier. Instead of cloning a repository, it references the published [n8n-io/n8n/google](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0) module from the Terraform Registry, pinned to v0.1.0. `terraform init` downloads the module for you.

You create a single `main.tf`, set your project, domain, and license key, and run `terraform init`, `terraform plan`, and `terraform apply`.

## Step 1: Create a project folder

```bash
mkdir n8n-gcp
cd n8n-gcp
```

## Step 2: Create `main.tf`

Create one file, `main.tf`. It references the registry's [small example](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/small) as a module, pinned to v0.1.0. The example bundles the provider setup, and the module creates the VPC, GKE cluster, Cloud SQL, Memorystore, Cloud Storage bucket, load balancer, Google-managed certificate, and DNS record, so this is all the Terraform you write.

```hcl
variable "n8n_license_key" {
  type      = string
  sensitive = true
}

# Teardown switches. They default to protected; see "Clean up" below.
variable "gke_deletion_protection" {
  type    = bool
  default = true
}

variable "postgres_deletion_protection" {
  type    = bool
  default = true
}

variable "gcs_force_destroy" {
  type    = bool
  default = false
}

module "n8n" {
  source  = "n8n-io/n8n/google//examples/small"
  version = "0.1.0"

  project_id          = "my-gcp-project"
  n8n_fqdn            = "n8n.example.com"
  cloud_dns_zone_name = "example-com" # the managed zone's resource name
  n8n_license_key     = var.n8n_license_key

  gke_deletion_protection      = var.gke_deletion_protection
  postgres_deletion_protection = var.postgres_deletion_protection
  gcs_force_destroy            = var.gcs_force_destroy

  # gcp_region           = "us-east4" # optional, defaults to us-east4
  # gcs_location         = "US"       # optional, keep near gcp_region (US, EU, ...)
  # friendly_name_prefix = "dev"      # optional, prefixes every resource name
}

output "n8n_url" {
  value = module.n8n.n8n_url
}

output "static_ip" {
  value = module.n8n.static_ip
}

output "kubectl_config_command" {
  value = module.n8n.kubectl_config_command
}
```

To deploy a larger tier, change the module subpath to `examples/medium` or `examples/large`. They take the same inputs. See [Choose a starting size](#choose-a-starting-size).

## Step 3: Set your values

In `main.tf`, replace `project_id`, `n8n_fqdn`, and `cloud_dns_zone_name` with your own. `n8n_fqdn` must sit inside the DNS zone.

Then provide your license key as an environment variable, so it stays out of the file:

```bash
export TF_VAR_n8n_license_key="<your-enterprise-license-key>"
```

{% hint style="info" %}
**Business license**

Add `n8n_main_hpa_min_replicas = 1` to the module block. This selects single-main queue mode, which doesn't need the multiple-main entitlement.
{% endhint %}

{% hint style="warning" %}
**If you can't turn off the service account key org policy**

If you can't have the `iam.disableServiceAccountKeyCreation` policy turned off out of band, and your credentials hold `roles/orgpolicy.policyAdmin` (an org or folder level role), you can add `manage_sa_key_org_policy = true` to the module block. The module then overrides the policy for the project. This overrides a security guardrail, so only do it with your security team's agreement. Locked-down organizations can bring their own HMAC key. See the module README.
{% endhint %}

## Step 4: Initialize Terraform

```bash
terraform init
```

This downloads the n8n module (v0.1.0) and the `google`, `google-beta`, `kubernetes`, `helm`, `kubectl`, `tls`, `random`, and `time` providers.

### 5. Plan and apply

Preview what Terraform will create:

```bash
terraform plan
```

Review the plan, then apply it:

```bash
terraform apply
```

Type `yes` when prompted, or add `-auto-approve` to skip the confirmation. The GKE cluster and Cloud SQL instance take the longest to create. Allow a further 5 to 10 minutes after the apply for the load balancer and the Google-managed certificate. `ERR_CONNECTION_CLOSED` or a certificate error right after the apply is normal.

When the certificate is active, open your domain. n8n shows the setup screen. Enter your email, first and last name, and a password to create the owner account. Complete or skip the questionnaire to reach your workspace.

To check on the certificate while you wait, configure kubectl and look at the pods and certificate:

```bash
$(terraform output -raw kubectl_config_command)
kubectl -n n8n get pods
kubectl -n n8n get managedcertificate
```

## Step 6: Save your encryption key

The `small` example doesn't expose the encryption key as a Terraform output, so read it from the cluster:

```bash
kubectl -n n8n get secret n8n-enterprise-secrets \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 -d
```

{% hint style="danger" %}
**Save your encryption key now**

Store the value in a password manager. If you lose it, every stored credential becomes unreadable.
{% endhint %}

## Choose a starting size

The module ships three sizing examples. Use one as your starting point, then tune node type, pod counts, and database size from there. Sizing isn't scale-validated on GKE, so tune it against a load test. If you're unsure, start with `small`.

|                                  | [small](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/small) (default) | [medium](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/medium) | [large](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/large) |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Node type                        | e2-standard-4 (4 vCPU, 16 GB)                         | e2-standard-8 (8 vCPU, 32 GB)                                | e2-standard-16 (16 vCPU, 64 GB)                              |
| Nodes per zone (min/max)         | 1/4                                                   | 2/5                                                          | 3/10                                                         |
| Total nodes (regional, ~3 zones) | 3 to 12                                               | 6 to 15                                                      | 9 to 30                                                      |
| Database                         | Cloud SQL db-g1-small (shared core), regional HA      | Cloud SQL db-custom-4-15360 (4 vCPU, 15 GB), regional HA     | Cloud SQL db-custom-8-30720 (8 vCPU, 30 GB), regional HA     |
| Database storage                 | 50 GB                                                 | 100 GB                                                       | 250 GB                                                       |
| Redis                            | Memorystore Basic, 1 GB                               | Memorystore Standard HA, 4 GB                                | Memorystore Standard HA, 8 GB                                |
| Main pods (min)                  | 2                                                     | 2                                                            | 3                                                            |
| Webhook pods (min/max)           | 2/50                                                  | 3/40                                                         | 5/80                                                         |
| Worker pods (min/max)            | 1/10                                                  | 2/30                                                         | 3/80                                                         |
| Worker concurrency               | 10                                                    | 15                                                           | 20                                                           |
| Execution concurrency limit      | 100                                                   | 200                                                          | 400                                                          |

Cost depends on region and usage. Check the [Google Cloud pricing calculator](https://cloud.google.com/products/calculator) for your region before you apply.

## Protect your state file

Terraform writes a `terraform.tfstate` file in your folder. It records your infrastructure and stores secrets in plain text, including the n8n encryption key, the database password, the Cloud Storage HMAC credentials, and your license key. Marking outputs `sensitive` only hides them from the terminal, not from the file.

Follow two rules:

* Never commit `terraform.tfstate` to version control.
* For anything beyond a quick trial, store state remotely with a Cloud Storage bucket (the `gcs` backend, which supports state locking) or with [HCP Terraform](https://developer.hashicorp.com/terraform/cloud-docs). Remote state encrypts your secrets, backs them up, and gives your team one shared source of truth.

## Clean up

The example protects the GKE cluster, the Cloud SQL instance, and the storage bucket by default, so a plain `terraform destroy` fails. Terraform reads the protection flag from the live resource, so turn the protection off with an apply first, then destroy:

```bash
terraform apply -auto-approve \
  -var gke_deletion_protection=false \
  -var postgres_deletion_protection=false \
  -var gcs_force_destroy=true

terraform destroy -auto-approve \
  -var gke_deletion_protection=false \
  -var postgres_deletion_protection=false \
  -var gcs_force_destroy=true
```

Most destroys finish in 10 to 20 minutes. This example doesn't manage your Cloud DNS zone, so the zone stays, but the A record the module created is removed.

If the destroy stalls, see the module's [destroy and cleanup guide](https://github.com/n8n-io/terraform-google-n8n/blob/0.1.0/docs/destroy-cleanup.md). By default, the Private Service Access connection is dropped from state rather than deleted, and a leftover VPC peering can occasionally block the network delete.

The example keeps these protections on by default because they favor safety over easy teardown. Before you promote the setup to production, also review `postgres_backup_retained_backups` and `postgres_transaction_log_retention_days`. See the [`examples/small`](https://github.com/n8n-io/terraform-google-n8n/tree/0.1.0/examples/small) README for the full list.

## Frequently asked questions

### Can I migrate an existing n8n deployment to the module?

Not yet. Version 0.1.0 supports net-new deployments, including onto a GKE cluster you already have (`create_gke = false` with `existing_gke_cluster_name`). It can't import an existing n8n deployment's state. The module is the best fit right now if you're still evaluating n8n or haven't deployed yet. See the [roadmap](https://github.com/n8n-io/terraform-google-n8n/blob/main/ROADMAP.md) on GitHub.

### I'm on AWS or Azure. Can I use this?

Yes. Sibling modules exist for [AWS](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-aws-with-terraform.md) (EKS, [`n8n-io/n8n/aws`](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0)) and [Azure](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-azure-with-terraform.md) (AKS, [`n8n-io/n8n/azurerm`](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0)). Generic on-premises Kubernetes and OpenShift aren't covered yet.

### What if my DNS isn't in Cloud DNS?

The `small` example manages the DNS record in Cloud DNS. For Cloudflare or GoDaddy DNS, the module has [`examples/cloudflare`](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/cloudflare) (Let's Encrypt certificates) and [`examples/godaddy`](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0/examples/godaddy). They need an extra ACME email input, and the steps on this page don't cover them.

### Which size should I pick?

Choose from `small`, `medium`, or `large`. They aren't scale-validated, so treat them as starting points. If you're unsure, start with `small`, and see [Choose a starting size](#choose-a-starting-size). Moving up a tier on a live deployment needs planning, so test the change before you apply it to production.

### What about backup and disaster recovery?

Cloud SQL backups and point-in-time recovery run with Cloud SQL's own defaults. The module exposes `postgres_backup_retained_backups` and `postgres_transaction_log_retention_days` to raise them. A full backup and disaster recovery runbook isn't available yet.

### Does the module support all n8n environment variables and configuration options?

No. Version 0.1.0 intentionally exposes a curated set of variables to keep the module simple and opinionated. If you need a specific configuration that isn't supported, open a [GitHub issue](https://github.com/n8n-io/terraform-google-n8n/issues).

## Support

This module is open source and maintained by the n8n Solutions team. Report bugs or request features on [GitHub issues](https://github.com/n8n-io/terraform-google-n8n/issues). For general n8n questions unrelated to the module, use the [n8n community forum](https://community.n8n.io/).

## Related resources

* [Use a cloud provider](/deploy/host-n8n/install-options/use-a-cloud-provider.md)
* [Google Kubernetes Engine](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-google-kubernetes.md)
* [Google Cloud Run](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-google-cloud-run.md)
* [Deploy to AWS with Terraform](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-aws-with-terraform.md)
* [Deploy to Azure with Terraform](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-azure-with-terraform.md)
* [Enable queue mode](/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)