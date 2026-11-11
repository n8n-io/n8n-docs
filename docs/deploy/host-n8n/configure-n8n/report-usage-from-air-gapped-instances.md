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

The `instance-reporting` module is available from n8n 2.39.6. Authentication with the license certificate is available from n8n 2.42.0, and in the patch releases n8n 2.40.6 and n8n 2.41.2.
{% endhint %}

The source code, the release notes, and the full technical reference live in the [n8n-airgap-monitoring repository](https://github.com/n8n-io/n8n-airgap-monitoring) on GitHub.

## How air-gapped usage reporting works

Air-gapped usage reporting has three parts:

- **The n8n-airgap-monitoring service.** A small service that you host in your own network. It runs as one container with one volume and stores every report it receives in a SQLite database.
- **The `instance-reporting` module.** An opt-in module in n8n. Once you enable it, an n8n instance sends one usage report a day to the monitoring service.
- **The usage report.** A JSON file you download from the monitoring service and share with n8n. It lists every reporting instance and the execution counts it reported for each day.

No data leaves your network unless you send the report to n8n yourself. The report contains execution counts, instance IDs, n8n versions, and the labels you choose. It doesn't contain workflows, execution data, or credentials.

Each instance proves it's licensed by sending its n8n license certificate with every report. The license certificate is the value of `N8N_LICENSE_CERT`, which an air-gapped Enterprise instance already has. See [Manage your license](manage-your-license.md) for how to set it. This means you don't need to create or distribute a secret for each instance.

## Before you begin

You need:

- n8n instances with an Enterprise license certificate set in `N8N_LICENSE_CERT`. To authenticate with the license certificate, instances need n8n 2.42.0, or the patch releases n8n 2.40.6 or n8n 2.41.2.
- The `insights` module enabled on every instance. It's enabled by default. The daily execution count comes from its data.
- A place to run one container with a persistent volume on SSD-backed storage, such as Docker or Kubernetes.
- A private network path from every n8n instance to the monitoring service, and from wherever you download the report.
- The image `ghcr.io/n8n-io/n8n-airgap-monitoring:<version>` mirrored into a registry your network can reach. Pin an exact version. Find the latest version on the [releases page](https://github.com/n8n-io/n8n-airgap-monitoring/releases).

## Deploy the monitoring service

The monitoring service needs a read token, a persistent volume, and a private network path.

The read token is a secret you generate. Anyone who holds it can download the usage report. Generate a long random value, for example:

```bash
openssl rand -hex 32
```

### Run the monitoring service with Docker

Run the image with the read token set and a volume mounted at `/data`:

```bash
docker run -d \
	--name n8n-airgap-monitoring \
	-p 3000:3000 \
	-e N8N_MONITORING_READ_TOKEN=<your-read-token> \
	-v n8n-airgap-monitoring-data:/data \
	<your-registry>/n8n-airgap-monitoring:<version>
```

The service listens on port 3000. It refuses to start without `N8N_MONITORING_READ_TOKEN`.

The volume holds the SQLite database, which is the only copy of your usage history. Include it in your backups.

Run a single replica. SQLite supports only one writer, and a single replica handles thousands of reporting instances.

If traffic to the service leaves a trusted network, terminate TLS in front of it. Each report carries the instance's license certificate, and each download carries the read token. Make sure no proxy in front of the service logs request bodies.

### Deploy the monitoring service on Kubernetes with Helm

n8n provides a reference Helm chart with production defaults: one pod, one persistent volume, a private `ClusterIP` service, and no Ingress. The defaults suit a fleet of up to 10,000 instances.

Follow the [Helm chart guide](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/charts/airgap-monitoring/README.md) for installation, sizing, storage classes by cloud provider, and Ingress settings.

### Keep the monitoring service off the public internet

{% hint style="danger" %}
Only your own n8n instances must be able to reach the write endpoint, `POST /api/v1/instance-reports`. Never expose it to the public internet.
{% endhint %}

The write endpoint accepts any valid n8n license certificate, and every n8n customer holds one. The service can't tell your instances apart from anyone else's. If the service is reachable from the internet, anyone with an n8n license can write reports into your database and pollute the report you share with n8n.

Enforce the restriction at the network level, for example with a private network, firewall rules, an internal load balancer, or a Kubernetes NetworkPolicy.

The read endpoint, `GET /api/v1/report`, needs the read token. Both endpoints share one host and port, though, so opening the service to download the report from outside also opens the write endpoint. Either download the report from inside the network, or configure your proxy or firewall to allow only `GET /api/v1/report` from outside.

If you can't guarantee the network restriction, [use a write token](#use-a-write-token-instead-of-the-license-certificate) instead of the license certificate.

The service exposes an unauthenticated health check at `GET /healthz`, which returns `{"status":"ok"}` while the service runs. Point your uptime monitoring at it.

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

- `N8N_INSTANCE_REPORTING_BASE_URL` is the origin of the monitoring service only, without a path. n8n adds the endpoint path itself.
- If `N8N_ENABLED_MODULES` already lists other modules, add `instance-reporting` to the comma-separated list rather than replacing it.
- Don't add `insights` to `N8N_DISABLED_MODULES`. If you do, n8n refuses to start with the `instance-reporting` module enabled.
- In [queue mode](scaling/enable-queue-mode.md) with multiple main instances, set the variables on every main instance. Workers don't send reports.

n8n reads the license certificate from `N8N_LICENSE_CERT` and sends it with each report. You don't need to set anything else. If the instance has no license certificate and no write token, n8n logs a warning at startup and sends no reports.

### Choose an instance label

The label is an optional name that appears in the report to help you tell instances apart, for example `prod-eu`. It's cosmetic. The instance ID stays the identity, so changing a label never splits or merges an instance's history.

The monitoring service stores labels in a URL-safe form: lowercase letters, digits, and hyphens, up to 200 characters. It never rejects a report because of the label. For example, `Acme Prod / EU` becomes `acme-prod-eu`.

### What to expect after you enable reporting

- **Report time.** On first start with the module enabled, each instance picks a random time of day, never before 03:00 UTC, and reports at that time every day. This spreads a fleet's reports across the day.
- **First report.** The first report includes a daily execution count for every past day that the `insights` module holds data for, up to 89 days.
- **Missed days.** If an instance is down or can't reach the monitoring service, it retries up to three times, at least five minutes apart. The next successful report includes every day that wasn't delivered, up to 89 days back, so outages shorter than that don't lose data.
- **Billable executions.** From n8n 2.40.0, instances report billable executions. Earlier versions only record total executions, so they report that number instead.

## Download and share the usage report

Download the report with the read token as a bearer token:

```bash
curl -sS \
	-H "Authorization: Bearer <your-read-token>" \
	-o usage-report.json \
	"https://<monitoring-service-host>/api/v1/report"
```

The report has one entry per instance. Each entry shows when the instance first and last reported, and every value it reported for each metric:

```json
{
	"data": {
		"generatedAt": "2026-11-03T14:30:00.000Z",
		"airgapMonitoringVersion": "0.2.5",
		"instances": [
			{
				"instanceId": "450b5c8502c2a390dba93257bde5fe7eb39397d43d8b307e8626f9d84b19e4d2",
				"label": "prod-eu",
				"n8nVersion": "2.42.0",
				"firstSeen": "2026-10-01T03:42:00.000Z",
				"lastReportAt": "2026-11-03T03:42:00.000Z",
				"dataPoints": {
					"billableExecutions": [
						{ "kind": "daily", "date": "2026-11-02", "value": 15234, "batchId": "vVTe725nPq3nAIhD", "receivedAt": "2026-11-03T03:42:00.000Z" },
						{ "kind": "cumulative", "value": 1203987, "batchId": "vVTe725nPq3nAIhD", "receivedAt": "2026-11-03T03:42:00.000Z" }
					]
				}
			}
		]
	}
}
```

A `daily` value covers one UTC calendar day, given in `date`. A `cumulative` value is the instance's running total at the time it reported.

Share the downloaded file with n8n.

### Filter the usage report

Without filters, the report contains the complete history. Add query parameters to narrow it:

| Parameter | Format | Effect |
| --- | --- | --- |
| `instanceId` | Comma-separated instance IDs, up to 100 | Only include these instances. |
| `start` | `YYYY-MM-DD` | Only include days from this date, inclusive. |
| `end` | `YYYY-MM-DD` | Only include days up to this date, inclusive. |

For example, to download October 2026 only:

```bash
curl -sS \
	-H "Authorization: Bearer <your-read-token>" \
	-o usage-report-2026-10.json \
	"https://<monitoring-service-host>/api/v1/report?start=2026-10-01&end=2026-10-31"
```

Daily values match on `date`. Cumulative values match on the UTC day of `receivedAt`. A filtered report lists the filters it applied in a `filters` field.

## Use a write token instead of the license certificate

Use a write token only if you can't restrict the write endpoint to your own instances at the network level. With a write token, instances send a secret you generate instead of their license certificate, and the service rejects license certificates.

1. Generate a write token that's different from the read token.
1. Set `N8N_MONITORING_WRITE_TOKEN` to the write token on the monitoring service, and restart it.
1. Set `N8N_INSTANCE_REPORTING_AUTH_TOKEN` to the same value on every n8n instance, and restart them.

The service then needs no network restriction beyond TLS. When you rotate the write token, update every instance as well. Instances with an old token get `401` responses and retry later. Their next delivered report includes the days they missed.

Both the monitoring service and n8n read tokens at startup, so restart them after any change.

## Check that reporting works

**Is the service up?** Poll `GET /healthz` from your uptime monitoring.

**Is every instance reporting?** Download the report and check `lastReportAt` for each instance. An instance whose `lastReportAt` is older than about 48 hours isn't reporting. Check that instance's n8n logs for errors from the `instance-reporting` module. An instance missing from the report entirely has never reached the service. Check its `N8N_INSTANCE_REPORTING_BASE_URL` and your network rules.

**Did a report fail?** If you use [log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems), each n8n instance emits `n8n.instanceReporting.success` when a report arrives and `n8n.instanceReporting.failed` when a delivery attempt fails.

**Are only your instances reporting?** An `instanceId` in the report that you can't match to one of your instances means the service is reachable from outside your network. Close the path, see [Keep the monitoring service off the public internet](#keep-the-monitoring-service-off-the-public-internet), and tell n8n so it can exclude the foreign data.

**Is the service rejecting reports?** The monitoring service logs every request with its status code:

| Status | Meaning | What to do |
| --- | --- | --- |
| `201` | Report stored. | Nothing. |
| `401` | Missing or invalid credential. The service log gives a reason code: `PARSE_FAILED`, `INVALID_ISSUER`, `DECRYPTION_FAILED`, or `SIGNATURE_INVALID` for a certificate, `BAD_TOKEN` for a write token. | Check that `N8N_LICENSE_CERT` on the instance holds a certificate issued by n8n. With a write token, check that `N8N_INSTANCE_REPORTING_AUTH_TOKEN` matches `N8N_MONITORING_WRITE_TOKEN`. |
| `400` | Malformed report. The message names the field. | Report it to n8n. A supported n8n version doesn't send malformed reports. |
| `409` | The same report arrived twice. The service stores nothing new. | Check for a cloned instance database or a replayed request. |
| `413` | The request body is over 256 KiB. | If the service log doesn't show the request, a proxy rejected it. Set the proxy's body size limit to at least 256 KiB. |

## Back up and upgrade the monitoring service

- **Storage.** Usage grows by about 1.5 GiB a year for 10,000 instances. A standard free-space alert on the volume is enough.
- **Backups.** The service writes each report to disk before it confirms it, so a snapshot of the volume is always a consistent backup.
- **Upgrades.** Take a snapshot of the volume before every upgrade. Database migrations only run forward, so you can't roll back an upgrade without restoring the snapshot.

## Environment variables

### Monitoring service environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `N8N_MONITORING_READ_TOKEN` | Yes | None | Bearer token for downloading the report. The service refuses to start without it. |
| `N8N_DB_PATH` | No | `/data/database.sqlite` in the image | Location of the SQLite file. Must be on persistent storage. |
| `N8N_MONITORING_WRITE_TOKEN` | No | None | Only for the [write token option](#use-a-write-token-instead-of-the-license-certificate). When set, instances must send it as a bearer token, and the service rejects license certificates. |

### n8n instance environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `N8N_ENABLED_MODULES` | Yes | None | Must include `instance-reporting`. |
| `N8N_INSTANCE_REPORTING_BASE_URL` | Yes | Empty | Origin of the monitoring service, without a path. |
| `N8N_LICENSE_CERT` | Yes, unless you use a write token | Empty | The instance's n8n license certificate, sent with each report as the credential. |
| `N8N_INSTANCE_REPORTING_LABEL` | No | Empty | Name shown for this instance in the report. |
| `N8N_INSTANCE_REPORTING_AUTH_TOKEN` | No | Empty | Only for the [write token option](#use-a-write-token-instead-of-the-license-certificate). Sent as a bearer token instead of the license certificate. |

## Related resources

* [Configure n8n](./)
* [Manage your license](manage-your-license.md)
* [Environment variables](basic-configuration/use-environment-variables/README.md)
* [Insights environment variables](basic-configuration/use-environment-variables/insights.md)
* [n8n-airgap-monitoring on GitHub](https://github.com/n8n-io/n8n-airgap-monitoring)
* [n8n-airgap-monitoring user guide](https://github.com/n8n-io/n8n-airgap-monitoring/blob/main/docs/USER_GUIDE.md)
