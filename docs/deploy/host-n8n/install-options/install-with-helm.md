---
description: Install self-hosted n8n on Kubernetes with the official n8n Helm chart, in queue mode or standalone mode.
layout:
  description:
    visible: false
---

# Install with Helm

The official n8n Helm chart installs self-hosted n8n on Kubernetes in queue mode or standalone mode.

n8n maintains the chart in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) and publishes it to the OCI registry at `oci://ghcr.io/n8n-io/n8n-helm-chart/n8n`. This page covers a basic installation. For every configurable value, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and the `values.yaml` of the chart version you install, for example [`values.yaml` in chart 1.14.0](https://github.com/n8n-io/n8n-hosting/blob/v1.14.0/charts/n8n/values.yaml).

## Prerequisites for the Helm chart

* A Kubernetes cluster running Kubernetes 1.25 or later, and `kubectl` configured for it.
* [Helm](https://helm.sh/docs/intro/install/) 3.12 or later.
* OpenSSL, to generate the encryption key.
* For queue mode, a PostgreSQL database and a Redis instance that you provide. The chart doesn't install them. See [Choose n8n's database](../configure-n8n/choose-n8ns-database.md) for supported PostgreSQL versions.
* For standalone mode, a StorageClass that can provision the PersistentVolumeClaim for the SQLite database.

Run every command on this page against the same cluster and namespace. The chart reads the Secrets you create from the namespace you install it into.

## Choose a deployment mode for the Helm chart

The chart supports two modes:

| Mode | What runs | What you provide | Use for |
| --- | --- | --- | --- |
| Queue mode (default) | Main, worker, and optional webhook processor pods | PostgreSQL and Redis | Production |
| Standalone mode | One pod with SQLite on a PersistentVolumeClaim | Storage for the claim | Development, testing, and small-scale use |

In queue mode, the main pods serve the editor and API, and workers run executions from the Redis queue. For how queue mode works, see [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

## Chart versions and n8n versions

The chart has its own version number, separate from the n8n version. Each chart release installs one n8n version by default, set as the chart's `appVersion`. The chart [changelog](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/CHANGELOG.md) lists which n8n version each chart release carries.

Pin the chart version with `--version` every time you install or upgrade, so you know which n8n version you get. To run a different n8n version than the chart's default, set `image.tag` in your values file.

## Create the Kubernetes Secrets for n8n

The chart reads n8n's core settings and passwords from Kubernetes Secrets that you create before you install.

Create the core Secret. It holds the encryption key that n8n uses for credentials, and the host, port, and protocol of your instance. Replace `<your-n8n-domain>` with the domain you use to reach n8n:

```bash
kubectl create secret generic n8n-core-secrets \
	--from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
	--from-literal=N8N_HOST="<your-n8n-domain>" \
	--from-literal=N8N_PORT="5678" \
	--from-literal=N8N_PROTOCOL="https"
```

{% hint style="warning" %}
**Back up the encryption key**

n8n encrypts stored credentials with `N8N_ENCRYPTION_KEY`. Without the same key, n8n can't decrypt credentials after a reinstall or restore. Keep a copy outside the cluster. For more information, see [Back up and restore](../keep-n8n-running/backup-and-restore.md).
{% endhint %}

In queue mode, also create a Secret for the PostgreSQL password. Reading the password into a variable keeps special characters intact:

```bash
read -s -p "PostgreSQL password: " DB_PASSWORD
kubectl create secret generic n8n-db-secret \
	--from-literal=password="$DB_PASSWORD"
```

If you don't set `secretRefs.existingSecret`, the chart creates its own Secret from the `secretRefs.env` values instead. The installation fails if `N8N_ENCRYPTION_KEY` still has the placeholder value from `values.yaml`. For production, keep secrets out of values files, for example with an external secrets operator.

## Create a values file for the Helm chart

Save one of the following configurations as `values.yaml`, then adjust the host names, database name, user, and ports to match your setup.

### Values for queue mode

This configuration runs n8n in queue mode with your own PostgreSQL and Redis:

```yaml
queueMode:
  enabled: true
  workerReplicaCount: 2
  workerConcurrency: 10

database:
  type: postgresdb
  useExternal: true
  host: <your-postgres-host>
  port: 5432
  database: n8n
  user: n8n
  passwordSecret:
    name: n8n-db-secret
    key: password

redis:
  enabled: true
  useExternal: true
  host: <your-redis-host>
  port: 6379

secretRefs:
  existingSecret: n8n-core-secrets
```

If Redis needs a password, store it in a Secret and reference it with `redis.passwordSecret.name` and `redis.passwordSecret.key`. For managed Redis services that require TLS, set `redis.tls: true`.

### Values for standalone mode

This configuration runs a single n8n pod with SQLite on a 5 GiB PersistentVolumeClaim:

```yaml
queueMode:
  enabled: false

database:
  type: sqlite
  useExternal: false

redis:
  enabled: false

persistence:
  enabled: true
  size: 5Gi

secretRefs:
  existingSecret: n8n-core-secrets
```

### Add an Ingress to the values file

Both configurations create only a `ClusterIP` Service. To reach the editor and API from outside the cluster, add an Ingress to `values.yaml` before you install. This example assumes the community ingress-nginx controller and an existing TLS Secret for your domain:

```yaml
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: <your-n8n-domain>
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: <your-tls-secret>
      hosts:
        - <your-n8n-domain>
```

The Ingress doesn't create DNS records or certificates. Point your domain at the Ingress controller, and create the TLS Secret yourself or with a certificate manager.

If you run webhook processors, the chart can create a second Ingress for production webhook paths, such as `/webhook/` and `/form/`. Set `ingress.webhookProcessor.enabled: true`, and set its own `className`, `tls`, and `annotations`: it doesn't copy them from the main Ingress. Test paths such as `/webhook-test/` stay on the main Ingress.

Behind an Ingress, n8n needs to know how many proxies forward each request. Set `N8N_PROXY_HOPS` through `config.extraEnv` to match your setup. See [Configure webhook URLs with a reverse proxy](../configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md). For a complete HTTPS example, see [`https-ingress.yaml` in chart 1.14.0](https://github.com/n8n-io/n8n-hosting/blob/v1.14.0/charts/n8n/examples/https-ingress.yaml).

## Install the Helm chart

Install the chart with your values file. Replace `<chart-version>` with the chart version you want, for example `1.14.0`:

```bash
helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--version "<chart-version>" \
	-f values.yaml
```

Check that the pods start:

```bash
kubectl get pods
```

To change the configuration later, edit `values.yaml` and run `helm upgrade` with the same chart version, as described in [Upgrade the Helm chart](#upgrade-the-helm-chart).

## Scale n8n with the Helm chart

In queue mode, you can scale each role on its own:

| Goal | What to configure |
| --- | --- |
| Run more executions at the same time | `queueMode.workerReplicaCount` and `queueMode.workerConcurrency` |
| Handle production webhooks on separate pods | `webhookProcessor.enabled: true`, `webhookProcessor.replicaCount`, and the webhook processor Ingress |
| Run more than one main pod (self-hosted Enterprise) | `multiMain.enabled: true`, at least two `multiMain.replicas`, `license.enabled: true` with `license.existingSecret.name` and `license.existingSecret.key`, and sticky sessions at the load balancer |

For task runners, scaling with the built-in HPA or KEDA, and node placement, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and the [examples in chart 1.14.0](https://github.com/n8n-io/n8n-hosting/tree/v1.14.0/charts/n8n/examples).

## Upgrade the Helm chart

Before you upgrade, take a full backup and check the chart [changelog](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/CHANGELOG.md) for breaking changes. Then upgrade to a pinned chart version:

```bash
helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--version "<new-chart-version>" \
	-f values.yaml
```

A Helm rollback reapplies the previous release's Kubernetes manifests. It doesn't reverse database changes that the newer n8n version made. To recover the database, restore your backup. See [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
