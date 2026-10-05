---
description: Configure execution data in S3, Prometheus metrics, OpenTelemetry tracing, log streaming, and external secrets in the terraform-aws-n8n module.
layout:
  description:
    visible: false
---

# Configure Enterprise features on AWS

The [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module provides Terraform inputs that wire up several of n8n's Enterprise features for the AWS deployment. This page covers each feature's module-specific setup. For what each feature does and how to use it, see the linked n8n feature pages.

## Execution data in S3

{% hint style="info" %}
**Feature availability**

Storing execution data in S3 requires n8n 2.27.0 or later, and an Enterprise license with the `feat:executionDataS3` entitlement.
{% endhint %}

The module always stores n8n's binary data in S3. From n8n 2.27.0, you can offload execution data to the same bucket instead of PostgreSQL, which relieves database write pressure at scale:

```hcl
module "n8n" {
  # ...other inputs...

  n8n_execution_data_storage_mode = "s3" # default: "database"
  n8n_image_tag                   = "2.27.4"
}
```

Only new executions move to S3: there's no backfill, and switching the mode back doesn't affect data already written under either mode. See [Use external storage](../../../configure-n8n/scaling/use-external-storage.md) for how n8n uses external storage.

{% hint style="warning" %}
**S3 execution data has no automatic backup**

Unlike PostgreSQL, the module doesn't version or back up the S3 bucket. If execution history matters to you, add S3 versioning or a replication rule to the bucket (the `s3_bucket_name` output) yourself.
{% endhint %}

If you add an S3 lifecycle rule to expire old objects, set the expiration well beyond your execution data retention (`n8n_pruning_max_age`, 14 days by default). Binary data and execution data objects share the same key prefix, so a lifecycle rule can't target one without risking the other; set the expiration long enough that n8n has already pruned the execution before the rule reaches it.

## Prometheus metrics

Set `n8n_metrics_enabled = true` to expose n8n's built-in Prometheus endpoint at `/metrics` on port `5678`, the same port the chart already uses for the UI and API. See [Enable Prometheus metrics](../../../configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md) for what n8n exposes. The module doesn't configure scraping: add scrape annotations to the `n8n-main` Service, or create a `ServiceMonitor` if you run the Prometheus Operator.

n8n's own `/metrics` endpoint doesn't report a usable Bull queue depth in a multi-main topology. Set `redis_exporter_enabled = true` to deploy a [redis_exporter](https://github.com/oliver006/redis_exporter) alongside the release, which exposes queue depth as `redis_key_size{key="<prefix>:jobs:wait"}` and `redis_key_size{key="<prefix>:jobs:active"}` on port `9121`. This is the same queue depth KEDA scales workers on.

## OpenTelemetry tracing

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing in n8n may change and isn't recommended for production use.
{% endhint %}

Set `n8n_otel_enabled = true` to turn on n8n's workflow and node tracing on every n8n container. Point `n8n_otel_exporter_otlp_endpoint` at your OpenTelemetry collector's base URL (n8n appends `/v1/traces` itself):

```hcl
module "n8n" {
  # ...other inputs...

  n8n_otel_enabled                = true
  n8n_otel_exporter_otlp_endpoint = "http://otel-collector.observability.svc.cluster.local:4318"
}
```

The module doesn't deploy a collector. Deploy one separately, for example with the upstream `open-telemetry/opentelemetry-collector` Helm chart. See [Trace executions with OpenTelemetry](../../../keep-n8n-running/trace-executions-with-opentelemetry.md) for the available tuning variables and what n8n traces.

## Log streaming

{% hint style="info" %}
**Feature availability**

Log streaming requires n8n 2.19.0 or later, and an Enterprise license.
{% endhint %}

Set `n8n_log_streaming_managed_by_env = true` to configure [log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems) destinations from Terraform instead of the UI:

```hcl
module "n8n" {
  # ...other inputs...

  n8n_log_streaming_managed_by_env = true
  n8n_log_streaming_destinations = [
    {
      type             = "webhook"
      label            = "Audit events"
      enabled          = true
      subscribedEvents = ["n8n.audit", "n8n.workflow"]
      url              = "https://hooks.example.com/n8n"
      method           = "POST"
    },
  ]
}
```

n8n reapplies these destinations on every startup, and the Log Streaming settings in the UI become read-only. Setting `n8n_log_streaming_managed_by_env` back to `false` keeps the last applied destinations but restores UI access.

## External secrets

n8n's [External Secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores) feature resolves workflow credential values from an external vault at runtime. It requires an Enterprise license with the `feat:externalSecrets` entitlement, and is on by default (`n8n_external_secrets_enabled = true`); set it to `false` to disable it even on a license that includes it.

Connecting a vault provider is a manual step in the n8n UI (**Settings** > **External Secrets**) in every case. Terraform can't create that connection. What the module can do is grant the n8n pod's Pod Identity role read access to specific AWS Secrets Manager secrets, so you can choose automatic credential detection in the UI instead of pasting static IAM user keys:

```hcl
module "n8n" {
  # ...other inputs...

  n8n_external_secrets_aws_enabled      = true
  n8n_external_secrets_aws_secret_names = ["prod/n8n/stripe", "prod/n8n/hubspot"]
}
```

`n8n_external_secrets_aws_secret_names` is required and doesn't accept a wildcard: list every secret name explicitly, since n8n's AWS Secrets Manager integration otherwise has no other way to restrict which secrets it can read.

## Credential overwrites

[Credential overwrites](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/credential-overwrites) let you preconfigure shared credential fields and hide them from users. Supply the JSON payload through a Kubernetes Secret you manage yourself, and reference it with `n8n_credentials_overwrite_secret_ref`:

```hcl
module "n8n" {
  # ...other inputs...

  n8n_credentials_overwrite_secret_ref = {
    name = kubernetes_secret_v1.credentials_overwrite.metadata[0].name
  }
}
```

n8n reads this file once, at startup. After rotating the Secret's contents, restart the main, worker, and webhook processor deployments to pick up the change.

## Related resources

* [Deploy to AWS with Terraform](./)
* [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md)
* [Customize the AWS infrastructure](customize-the-infrastructure.md)
* [Maintain and tear down the AWS deployment](maintain-and-tear-down.md)
* [Use external storage](../../../configure-n8n/scaling/use-external-storage.md)
