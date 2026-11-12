---
description: >-
  Set up n8n-airgap-monitoring to collect daily usage reports from self-hosted
  n8n instances in an air-gapped network, then download the report and share it
  with n8n.
layout:
  description:
    visible: false
---

# Report usage from air-gapped instances

To report usage from n8n instances that can't reach the internet, you run the n8n-airgap-monitoring service inside your network, point every n8n instance at it, and download a usage report to share with n8n.

{% hint style="info" %}
**Feature availability**

Air-gapped usage reporting is available on:

- **Self-hosted:** Enterprise

It isn't available on n8n Cloud.

Air-gapped usage reporting is available from n8n 2.40.6.

Air-gapped licenses cost more than standard licenses.
{% endhint %}

This page gives an overview and the n8n configuration. The [n8n-airgap-monitoring user guide](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md) on GitHub covers deploying the service, the report format, troubleshooting, and the full reference.

## Check whether you need an air-gapped license

Most self-hosted n8n instances don't need to be air-gapped. With a standard license key, a self-hosted instance only contacts the n8n license server to activate and renew its license. On renewal, it sends:

| Field | Description |
| --- | --- |
| `consumerId` | Part of the license that n8n issued. |
| `renewalToken` | The renewal secret that n8n issued inside the license. |
| `tenantId` | The license tenant number, `1` by default. |
| `deviceFingerprint` | The instance ID: a SHA-256 hash derived from the instance's encryption key, or an ID you set. The hash is one-way and contains no hardware or user data. |
| `productIdentifier` | The n8n version, for example `n8n-2.46.0`. |
| Usage counts | Numbers only: `activeWorkflows`, `totalWorkflows`, `enabledUsers`, `totalUsers`, `totalCredentials`, `productionExecutions`, `productionRootExecutions`, `manualExecutions`, `activeWorkflowTriggers`, and `evaluations`. |

The license server receives no workflows, execution data, credentials, or personal data.

If your instances can't send this data, or can't reach the internet at all, you need an air-gapped license, and the rest of this page applies. Otherwise, a standard license key is simpler to run. See [Manage your license](manage-your-license.md).

## How air-gapped usage reporting works

Air-gapped usage reporting has three parts:

- **The n8n-airgap-monitoring service.** A small service that you host in your own network. It runs as one container with one volume and stores the reports it receives.
- **The `instance-reporting` module.** An opt-in module in n8n. Once you enable it, an n8n instance sends one usage report a day to the monitoring service.
- **The usage report.** A JSON file you download from the monitoring service and share with n8n. It lists every reporting instance and its daily execution counts.

No data leaves your network unless you send the report to n8n yourself. The report contains execution counts, instance IDs, n8n versions, and the labels you choose. It doesn't contain workflows, execution data, or credentials.

## Before you begin

You need:

- n8n instances on n8n 2.40.6 or above, with an Enterprise license certificate set in `N8N_LICENSE_CERT`.
- The `insights` module enabled on every instance. It's enabled by default.
- A place to run one container with a persistent volume, such as Docker or Kubernetes.
- A private network path from every n8n instance to the monitoring service.

## Set up air-gapped usage reporting

1. **Deploy the monitoring service.** Run the `ghcr.io/n8n-io/n8n-airgap-monitoring` image with a read token you generate and a persistent volume. Follow [Self-host n8n-airgap-monitoring](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md#1-self-host-n8n-airgap-monitoring) in the user guide, or use the [Helm chart](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/charts/airgap-monitoring/README.md) on Kubernetes.
1. **Enable reporting on every n8n instance.** Set the environment variables in [Enable reporting on every n8n instance](#enable-reporting-on-every-n8n-instance).
1. **Download the usage report and share it with n8n.** Download the report from the monitoring service with your read token, and send the file to n8n. See [Download usage reports](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md#3-download-usage-reports-from-n8n-airgap-monitoring) in the user guide.

## Keep the monitoring service off the public internet

{% hint style="danger" %}
Only your own n8n instances must be able to reach the monitoring service's write endpoint. Never expose it to the public internet.
{% endhint %}

The monitoring service accepts reports from any licensed n8n instance, so it can't tell your instances apart from anyone else's. Restrict access at the network level, for example with a private network or firewall rules. If you can't, [authenticate instances with a write token](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md#alternative-authenticate-instances-with-a-write-token) instead. See [Network exposure](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md#network-exposure) in the user guide for the options.

## Enable reporting on every n8n instance

{% hint style="warning" %}
Enable reporting on every n8n instance you run. An instance without these settings doesn't report, and n8n can't see its usage.
{% endhint %}

On each n8n instance, set these environment variables and restart the instance:

```bash
N8N_ENABLED_MODULES=instance-reporting
N8N_INSTANCE_REPORTING_BASE_URL=https://<monitoring-service-host>
N8N_INSTANCE_REPORTING_LABEL=<optional-label>
```

- `N8N_INSTANCE_REPORTING_BASE_URL` is the origin of the monitoring service only, without a path.
- `N8N_INSTANCE_REPORTING_LABEL` is an optional name that helps you tell instances apart in the report.
- If `N8N_ENABLED_MODULES` already lists other modules, add `instance-reporting` to the comma-separated list rather than replacing it.
- In [queue mode](scaling/enable-queue-mode.md) with multiple main instances, set the variables on every main instance.

Each instance then reports once a day. To check that every instance is reporting, see [Monitoring the health of n8n-airgap-monitoring](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md#monitoring-the-health-of-n8n-airgap-monitoring) in the user guide.

## Related resources

* [Configure n8n](./)
* [Manage your license](manage-your-license.md)
* [n8n-airgap-monitoring user guide](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md)
* [n8n-airgap-monitoring Helm chart](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/charts/airgap-monitoring/README.md)
* [n8n-airgap-monitoring on GitHub](https://github.com/n8n-io/n8n-airgap-monitoring)
