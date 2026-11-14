---
description: A step-by-step walkthrough that deploys a working n8n instance on Azure with the terraform-azurerm-n8n module, from an empty folder to a running editor.
layout:
  description:
    visible: false
---

# Deploy to Azure with Terraform

Deploy a production-grade, highly available n8n instance on Azure using the official Terraform module.

[terraform-azurerm-n8n](https://github.com/n8n-io/terraform-azurerm-n8n) is a Terraform module that deploys a production-grade n8n instance to Azure. It provisions AKS clusters running n8n's main, webhook, and worker pods, with managed PostgreSQL (PostgreSQL Flexible Server), Redis (Azure Managed Redis), and Azure Blob Storage for binary data. Application Gateway, Key Vault, and Azure DNS handle ingress, certificates, and name resolution.

This module automates a deployment with separate main, webhook, and worker pods, each with its own autoscaling bounds, and it's maintained by the n8n Solutions team.

{% hint style="warning" %}
**New deployments only**

Version 0.1.0 of the module supports net-new deployments only. It can't import the state of an existing n8n installation. You can deploy onto an AKS cluster you already have (set `create_aks = false` and `existing_aks_cluster_name`), but the module can't adopt a running n8n deployment.
{% endhint %}

{% hint style="info" %}
**Feature availability**

The default multi-main topology this module deploys is available on:

* **Self-hosted:** Enterprise

Setting `n8n_main_hpa_min_replicas = 1` runs a single main pod instead, which only requires a Business plan license. This selects single-main queue mode, which doesn't need the multiple-main entitlement.
{% endhint %}

## Architecture

The module deploys n8n as three separate sets of pods on AKS:

* **Main pods:** Handle the editor UI and the REST API.
* **Webhook pods:** Handle inbound triggers.
* **Worker pods:** Run workflow executions.

The AKS cluster has two node pools. The module scales the number of pods in each set between the minimum and maximum for your chosen size (see [Choose a starting size](#choose-a-starting-size)).

State lives in managed services outside the cluster: PostgreSQL Flexible Server for workflow data, Azure Managed Redis for queue mode, and private Azure Blob Storage for binary data. An Application Gateway (WAF_v2) fronts the cluster for inbound traffic, Key Vault holds the TLS certificate, and an Azure DNS zone hosts your domain.

The module creates managed identities with role assignments so that pods can reach Azure resources.

## Prerequisites

* An **n8n license key**: An Enterprise license for the default multi-main topology, or a Business license if you set `n8n_main_hpa_min_replicas = 1`.
* **Terraform CLI 1.9 or later**. See [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/install-cli).
* **Azure CLI 2.50 or later**, signed in with `az login` and targeting the subscription you want to deploy into. See [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
* **Permissions in that subscription** to create AKS, PostgreSQL Flexible Server, Azure Managed Redis, Application Gateway, Key Vault, Storage, Azure DNS, and virtual network resources, **and to create role assignments**. The example grants itself Storage Blob Data Contributor and Key Vault Administrator, and the module creates managed identities with role assignments. Owner, or Contributor plus User Access Administrator, on the subscription covers this.
* **Enough vCPU quota** in your chosen region for the AKS node pools at their maximum size (for `small`: 2 pools × up to 6 nodes × `Standard_D2s_v5`), and Azure Managed Redis capacity in that region.
* **A domain you can delegate.** You create an Azure DNS zone, then add its name servers as NS records at your registrar or parent DNS zone.
* Optional: **kubectl 1.30 or later**, to check the cluster afterwards.

## Usage

This guide deploys the `small` tier. Instead of cloning a repository, it references the published [n8n-io/n8n/azurerm](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0) module from the Terraform Registry, pinned to v0.1.0. `terraform init` downloads the module for you.

You create a single `main.tf`; set your domain and license key; run `terraform init`, `terraform plan`, and `terraform apply`; and then delegate the DNS zone.

## Step 1: Create a project folder

Terraform works from the folder you run it in, so start with an empty one:

```bash
mkdir n8n-azure
cd n8n-azure
```

## Step 2: Create `main.tf`

Create one file, `main.tf`. It references the registry's [small example](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0/examples/small) as a module, pinned to v0.1.0. The example bundles the resource groups, virtual network and subnets, DNS zone, Key Vault certificate, and provider setup, so this is all the Terraform you write.

```hcl
variable "n8n_license_key" {
  type      = string
  sensitive = true
}

module "n8n" {
  source  = "n8n-io/n8n/azurerm//examples/small"
  version = "0.1.0"

  # The example creates this Azure DNS zone. n8n_domain must be the zone
  # name itself or a subdomain of it.
  public_dns_zone_name = "n8n.example.com"
  n8n_domain           = "n8n.example.com"
  n8n_license_key      = var.n8n_license_key

  # Applied to every resource, for cost tracking and ownership.
  common_tags = {
    Environment = "development"
    Owner       = "platform-team"
  }

  # location             = "swedencentral" # optional, defaults to eastus
  # friendly_name_prefix = "n8nsmall"      # optional, 2-12 lowercase letters or digits
}

output "n8n_url" {
  value = module.n8n.n8n_url
}

output "public_dns_zone_name_servers" {
  description = "Add these as NS records at your registrar or parent zone."
  value       = module.n8n.public_dns_zone_name_servers
}

output "n8n_encryption_key" {
  description = "Back this up in a password manager. n8n emits it once."
  value       = module.n8n.n8n_encryption_key
  sensitive   = true
}
```

To deploy a larger tier, change the module subpath to `examples/medium` or `examples/large`. They take the same inputs. See [Choose a starting size](#choose-a-starting-size).

## Step 3: Set your values

In `main.tf`, replace `public_dns_zone_name` and `n8n_domain` with the domain you control. Set `common_tags` to whatever your organization uses for cost tracking and ownership.

Then point Terraform at your subscription and provide your license key as environment variables, so neither is stored in the file:

```bash
export ARM_SUBSCRIPTION_ID="$(az account show --query id -o tsv)"
export TF_VAR_n8n_license_key="<your-enterprise-license-key>"
```

{% hint style="info" %}
**Pick your region before the first apply**

Azure Managed Redis capacity, AKS zone support, and vCPU quota vary by region and subscription. A shortfall typically fails 10 to 20 minutes into an apply. The module repository ships a preflight script (`tests/scripts/preflight-region-check.sh` in [terraform-azurerm-n8n](https://github.com/n8n-io/terraform-azurerm-n8n/tree/0.1.0)) that checks all of this from your own `terraform plan`. To change region, uncomment `location` in `main.tf`.
{% endhint %}

{% hint style="info" %}
**Business license**

Add `n8n_main_hpa_min_replicas = 1` to the module block. This selects single-main queue mode, which doesn't need the multiple-main entitlement.
{% endhint %}

{% hint style="info" %}
**Binary data entitlement**

By default, the module stores binary data in private Azure Blob Storage, which needs the separate `feat:binaryDataAz` entitlement on your license. The `small` example doesn't expose a switch for this. If your license lacks the entitlement, call the root module directly and set `n8n_binary_data_storage_mode = "database"`.
{% endhint %}

## Step 4: Initialize Terraform

```bash
terraform init
```

This step downloads the n8n module (v0.1.0) and the `azurerm`, `kubernetes`, `helm`, `kubectl`, `random`, and `time` providers.

## Step 5: Plan and apply

Preview what Terraform will create:

```bash
terraform plan
```

Review the plan, then apply it. Run this in a session that won't time out, because an interrupted apply can leave Azure resources behind:

```bash
terraform apply
```

Provisioning takes roughly 15 to 25 minutes. Type `yes` when prompted, or add `-auto-approve` to skip the confirmation. Allow 5 to 10 minutes after the apply for the Application Gateway backend to report healthy.

## Step 6: Delegate the DNS zone

Print the zone's name servers:

```bash
terraform output -json public_dns_zone_name_servers
```

Add them as NS records for your domain at your registrar, or in the parent DNS zone. Propagation can take 5 to 60 minutes. Check it with:

```bash
dig +short n8n.example.com
```

When it returns the Application Gateway's public IP, open your domain. n8n shows the setup screen. Enter your email, first and last name, and a password to create the owner account. Complete or skip the questionnaire to reach your workspace.

{% hint style="warning" %}
**Self-signed certificate**

The example issues a self-signed certificate, so your browser shows a certificate warning and webhook callers that verify TLS reject it. That's fine for evaluation. Before real traffic, replace it with a publicly trusted certificate. Use the module's [`tls-letsencrypt`](https://github.com/n8n-io/terraform-azurerm-n8n/tree/0.1.0/modules/tls-letsencrypt) submodule, or import your own certificate into Key Vault.
{% endhint %}

{% hint style="danger" %}
**Save your encryption key now**

Run `terraform output -raw n8n_encryption_key` and store the value in a password manager. n8n emits it once. If you lose it, every stored credential becomes unreadable.
{% endhint %}

## Choose a starting size

The module ships three sizing examples. Use one as your starting point, then tune node size, pod counts, and database size from there. These are reference configurations, not throughput or cost guarantees. If you're unsure, start with `small`.

|                            | [small](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0/examples/small) (default) | [medium](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0/examples/medium) | [large](https://registry.terraform.io/modules/n8n-io/n8n/azurerm/0.1.0/examples/large) |
| -------------------------- | ------------------------------------ | ------------------------------- | ---------------------------------------------- |
| Target scale               | Evaluation and low traffic           | Sustained production traffic    | High-volume, connection-heavy production       |
| AKS VM size                | Standard_D2s_v5 (2 vCPU, 8 GB)       | Standard_D8s_v5 (8 vCPU, 32 GB) | Standard_D16s_v5 (16 vCPU, 64 GB)              |
| Nodes per pool (min/max)   | 2/6                                  | 3/10                            | 5/20                                           |
| Main pods (min/max)        | 2/6                                  | 3/16                            | 6/60                                           |
| Webhook pods (min/max)     | 2/8                                  | 4/24                            | 20/80                                          |
| Worker pods (min/max)      | 1/10                                 | 4/30                            | 20/160                                         |
| Worker concurrency         | 10                                   | 20                              | 40                                             |
| PostgreSQL Flexible Server | GP_Standard_D2s_v3, 32 GB            | GP_Standard_D4s_v3, 128 GB      | GP_Standard_D8s_v3, 512 GB, zone redundant     |
| Redis                      | Azure Managed Redis Balanced_B0      | Balanced_B5                     | MemoryOptimized_M20, HA                        |
| Blob storage               | LRS                                  | ZRS                             | ZRS                                            |
| Database pooler            | None                                 | None                            | PgBouncer, 2 replicas                          |
| Ingress                    | Application Gateway WAF_v2, 2 fixed instances | WAF_v2, autoscale 2–10 | WAF_v2, autoscale 2–30                         |

AKS has two node pools, so "nodes per pool" applies to each pool. The main cost drivers are AKS nodes, Application Gateway WAF_v2, PostgreSQL, and Azure Managed Redis. Check current Azure pricing for your region before you apply.

Benchmark representative workflows before moving to production. Workflow shape, payload size, and Code nodes can change demand by orders of magnitude. All three examples issue a self-signed TLS certificate (see [Delegate the DNS zone](#6-delegate-the-dns-zone)).

## Protect your state file

Terraform writes a `terraform.tfstate` file in your folder. It records your infrastructure and stores secrets in plain text, including the n8n encryption key, the PostgreSQL admin password, and your license key. Marking outputs `sensitive` only hides them from the terminal, not from the file.

Follow two rules:

* Never commit `terraform.tfstate` to version control.
* For anything beyond a quick trial, store state remotely with an Azure Storage account (the `azurerm` backend, which supports state locking) or with [HCP Terraform](https://developer.hashicorp.com/terraform/cloud-docs). Remote state encrypts your secrets, backs them up, and gives your team one shared source of truth.

## Clean up

To tear down everything this example created, run:

```bash
terraform destroy
```

Type `yes` when prompted, or add `-auto-approve`. A clean destroy takes about 15 to 25 minutes. Don't blindly retry a stalled destroy: the Application Gateway and AKS ingress controller can leave resources half-removed. See the module's [destroy and cleanup guide](https://github.com/n8n-io/terraform-azurerm-n8n/blob/0.1.0/docs/destroy-cleanup.md) for the recovery steps.

`terraform destroy` doesn't remove the NS records you added at your registrar. Delete them afterwards, otherwise the delegation keeps pointing at name servers that no longer host your zone.

The example ships teardown-friendly defaults: no resource locks, a Key Vault without purge protection, and PostgreSQL without a deletion lock. Review these before you promote the setup to production. See the [`examples/small`](https://github.com/n8n-io/terraform-azurerm-n8n/tree/0.1.0/examples/small) README and the [deletion safety guide](https://github.com/n8n-io/terraform-azurerm-n8n/blob/0.1.0/docs/deletion-safety.md) for what you can protect.

## Frequently asked questions

### Can I migrate an existing n8n deployment to the module?

Not yet. Version 0.1.0 supports net-new deployments, including onto an AKS cluster you already have (`create_aks = false` with `existing_aks_cluster_name`). It can't import an existing n8n deployment's state. The module is the best fit right now if you're still evaluating n8n or haven't deployed yet. Follow progress and roadmap discussion on [GitHub](https://github.com/n8n-io/terraform-azurerm-n8n).

### I'm on AWS or Google Cloud. Can I use this Terraform-based approach?

Yes. Sibling modules exist for [AWS](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-aws-with-terraform.md) (EKS, [`n8n-io/n8n/aws`](https://registry.terraform.io/modules/n8n-io/n8n/aws/0.5.0)) and Google Cloud (GKE, [`n8n-io/n8n/google`](https://registry.terraform.io/modules/n8n-io/n8n/google/0.1.0)). Generic on-premises Kubernetes and OpenShift aren't covered yet.

### Which size should I pick?

Choose from `small`, `medium`, or `large`. If you're unsure, start with `small`, and see [Choose a starting size](#choose-a-starting-size). Moving up a tier on a live deployment needs planning, so test the change before you apply it to production.

### What about backup and disaster recovery?

The module sets PostgreSQL Flexible Server backup retention (`pg_backup_retention_days`, 7 to 35 days, default 7) and can enable Blob soft delete (`blob_delete_retention_days`, off by default). A full backup and disaster recovery runbook isn't available yet.

### Does the module support all n8n environment variables and configuration options?

No. Version 0.1.0 intentionally exposes a curated set of variables to keep the module simple and opinionated. If you need a specific configuration that isn't supported, open a [GitHub issue](https://github.com/n8n-io/terraform-azurerm-n8n/issues).

## Support

This module is open source and maintained by the n8n Solutions team. Report bugs or request features on [GitHub issues](https://github.com/n8n-io/terraform-azurerm-n8n/issues). For general n8n questions unrelated to the module, use the [n8n community forum](https://community.n8n.io/).

## Related resources

* [Use a cloud provider](/deploy/host-n8n/install-options/use-a-cloud-provider.md)
* [Deploy to Azure](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-azure.md)
* [Deploy to AWS with Terraform](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-aws-with-terraform.md)
* [Google Kubernetes Engine](/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-google-kubernetes.md)
* [Enable queue mode](/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)