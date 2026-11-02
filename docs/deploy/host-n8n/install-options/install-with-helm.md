---
description: Install self-hosted n8n on Kubernetes with the official n8n Helm chart, in queue mode or standalone mode.
layout:
  description:
    visible: false
---

# Install with Helm

The official n8n Helm chart installs self-hosted n8n on Kubernetes in queue mode or standalone mode.

n8n maintains the chart in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) and publishes it to the OCI registry at `oci://ghcr.io/n8n-io/n8n-helm-chart/n8n`. This page covers a basic installation with chart 2.x, which installs n8n 3.x. For every configurable value, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [`values.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/values.yaml).

## Prerequisites for the Helm chart

* A Kubernetes cluster running Kubernetes 1.25 or later, and `kubectl` configured for it.
* [Helm](https://helm.sh/docs/intro/install/) 3.12 or later.
* OpenSSL, to generate the encryption key and the task runner token.
* For queue mode, a PostgreSQL database and a Redis instance that you provide. The chart doesn't install them. See [Choose n8n's database](../configure-n8n/choose-n8ns-database.md) for supported PostgreSQL versions.
* For standalone mode with SQLite, a StorageClass that can provision the PersistentVolumeClaim for the database.
* To reach n8n from outside the cluster, an Ingress controller, or a Gateway API implementation with a Gateway.

Run every command on this page against the same cluster and namespace. The chart reads the Secrets you create from the namespace you install it into.

## Choose a deployment mode for the Helm chart

The chart supports two modes:

| Mode | What runs | What you provide | Use for |
| --- | --- | --- | --- |
| Queue mode (default) | Main, worker, and optional webhook processor pods | PostgreSQL and Redis | Production |
| Standalone mode | One pod, with SQLite on a PersistentVolumeClaim or with PostgreSQL | Storage for the claim, or PostgreSQL | Development, testing, and small-scale use |

In queue mode, the main pods serve the editor and API, and workers run executions from the Redis queue. For how queue mode works, see [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

Both modes run [task runners](../configure-n8n/set-up-task-runners.md) by default. Task runners execute the JavaScript and Python code from Code nodes in a sidecar container, separate from the n8n process. In queue mode, each worker pod gets a sidecar. In standalone mode, the main pod gets it. Each sidecar requests 100m CPU and 128 MiB of memory, so plan node capacity for it. You can turn task runners off with `taskRunners.enabled: false`, but n8n deprecates running code inside the n8n process from n8n 3.0.

## Chart versions and n8n versions

The chart has its own version number, separate from the n8n version. Each chart major version follows one n8n major version:

| Chart version | n8n version | Source branch |
| --- | --- | --- |
| 2.x | 3.x | `main` |
| 1.x | 2.x | `release/n8n-2.x` |

n8n releases a new chart version every week, on the day after n8n releases a new version. Each chart release moves to the latest stable n8n version within its n8n major version, and installs that version by default, set as the chart's `appVersion`. The [chart releases](https://github.com/n8n-io/n8n-hosting/releases) list which n8n version each release carries.

Pin the chart version with `--version` every time you install or upgrade, so you know which n8n version you get. To run a different n8n version than the chart's default, set `image.tag` in your values file. The chart is only tested against its own `appVersion`.

n8n signs each chart release with cosign. To check a chart version before you install it, follow [Verify the chart](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#verify-the-chart) in the chart's README.

## Create the Kubernetes Secrets for n8n

The chart reads n8n's encryption key, the task runner token, and passwords from Kubernetes Secrets that you create before you install.

The core Secret holds two keys:

* `N8N_ENCRYPTION_KEY`: the key n8n uses to encrypt stored credentials.
* `N8N_RUNNERS_AUTH_TOKEN`: the token task runners use to authenticate with n8n. The chart requires it while task runners are on, which is the default.

The chart reads these keys by name and ignores any other keys in the Secret. It doesn't read n8n's host, port, or protocol from the Secret. It sets the port from `service.port`, and builds n8n's public URLs from your Ingress or route, as described in [Set n8n's public URLs with the Helm chart](#set-n8ns-public-urls-with-the-helm-chart).

First, generate the encryption key and store a copy outside the cluster, for example in your password manager or secrets store. The second command prints the key so you can copy it. The key then stays in your terminal output, so clear the terminal after you copy it, and don't run this command in a shared or recorded session:

```bash
N8N_ENCRYPTION_KEY="$(openssl rand -base64 32)"
echo "$N8N_ENCRYPTION_KEY"
```

{% hint style="warning" %}
**Back up the encryption key**

n8n encrypts stored credentials with `N8N_ENCRYPTION_KEY`. Without the same key, n8n can't decrypt credentials after a reinstall, a restore, or the loss of the cluster. For more information, see [Back up and restore](../keep-n8n-running/backup-and-restore.md).
{% endhint %}

Then create the core Secret. The command generates the task runner token inline. You don't need a copy of the token: to change it later, update the Secret and restart the n8n Deployments with `kubectl rollout restart`.

```bash
kubectl create secret generic n8n-core-secrets \
	--from-literal=N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
	--from-literal=N8N_RUNNERS_AUTH_TOKEN="$(openssl rand -base64 32)"
```

In queue mode, also create a Secret for the PostgreSQL password. Reading the password into a variable keeps special characters intact:

```bash
read -r -s -p "PostgreSQL password: " DB_PASSWORD
kubectl create secret generic n8n-db-secret \
	--from-literal=password="$DB_PASSWORD"
```

If you don't set `secretRefs.existingSecret`, the chart creates its own Secret from `secretRefs.env.N8N_ENCRYPTION_KEY` and `secretRefs.env.N8N_RUNNERS_AUTH_TOKEN` instead. The installation fails if the encryption key still has the placeholder value from `values.yaml`, or if the token is empty. For production, keep secrets out of values files, for example with an external secrets operator.

## Create a values file for the Helm chart

Save one of the following configurations as `values.yaml`, then adjust the host names, database name, user, and ports to match your setup.

The chart checks your values file against its schema. A key the chart doesn't know, for example a misspelled key, fails the installation, and the error names the key and where it sits.

### Values for queue mode

This configuration runs n8n in queue mode with your own PostgreSQL and Redis:

```yaml
queueMode:
  enabled: true
  workerReplicaCount: 2

database:
  type: postgresdb
  host: <your-postgres-host>
  port: 5432
  database: n8n
  user: n8n
  passwordSecret:
    name: n8n-db-secret
    key: password

redis:
  enabled: true
  host: <your-redis-host>
  port: 6379

secretRefs:
  existingSecret: n8n-core-secrets
```

Each worker runs up to 10 executions at the same time, which is n8n's default. To change this, set `queueMode.workerConcurrency`.

If Redis needs a password, store it in a Secret and reference it with `redis.passwordSecret.name` and `redis.passwordSecret.key`. For managed Redis services that require TLS, set `redis.tls: true`.

If PostgreSQL requires TLS, set `database.ssl.enabled: true`. If the server's certificate authority isn't publicly trusted, store its certificate in a Secret and reference it with `database.ssl.existingSecret.name` and `database.ssl.existingSecret.caKey`.

### Values for standalone mode

This configuration runs a single n8n pod with SQLite on a 5 GiB PersistentVolumeClaim:

```yaml
queueMode:
  enabled: false

database:
  type: sqlite

redis:
  enabled: false

persistence:
  enabled: true
  size: 5Gi

secretRefs:
  existingSecret: n8n-core-secrets
```

Standalone mode can also use PostgreSQL: set `database.type: postgresdb` and the connection settings from the queue mode example.

With a `ReadWriteOnce` volume, which is the default, the chart replaces the main pod with the `Recreate` strategy. The old pod stops before the new one starts, so each upgrade has a short outage.

### Set environment variables in the values file

To configure n8n with [environment variables](../configure-n8n/basic-configuration/use-environment-variables/README.md), set them in the `env` maps of your values file. Each map applies to one set of containers:

| Map | Applies to |
| --- | --- |
| `env.shared` | Main, worker, and webhook processor pods |
| `env.main`, `env.worker`, `env.webhookProcessor` | That component only, over `env.shared` |
| `env.taskRunner` | The task runner sidecar only. `env.shared` doesn't reach it. |

A value can be a string, number, or boolean, or a reference to a Secret or ConfigMap, written as you would under `valueFrom`:

```yaml
env:
  shared:
    N8N_LOG_LEVEL: info
    N8N_SMTP_PASS:
      secretKeyRef:
        name: smtp
        key: password
  worker:
    N8N_LOG_LEVEL: debug
```

The chart stores literal values in ConfigMaps, so anyone who can read ConfigMaps in the namespace can read them. Use a `secretKeyRef` for passwords and tokens. Kubernetes doesn't expand `$(VAR)` references in literal values, so write each value in full.

The chart sets some variables itself from other values, for example `DB_POSTGRESDB_HOST` from `database.host`. If you set one of these in an `env` map, the installation fails, and the error names the value to set instead. To replace a variable the chart sets, use `chartEnvOverrides` with the same component keys. To load whole ConfigMaps or Secrets, list them under `envFrom`. For details, see [Environment variables](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#environment-variables) in the chart's README.

## Expose n8n with the Helm chart

Both configurations create only a `ClusterIP` Service. To reach the editor and API from outside the cluster, add an Ingress or a Gateway API route to `values.yaml` before you install.

### Add an Ingress to the values file

This example assumes an Ingress controller with the IngressClass `nginx`, and an existing TLS Secret for your domain:

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

The Ingress doesn't create DNS records or certificates. Point your domain at the Ingress controller, and create the TLS Secret yourself or with a certificate manager. For cert-manager, add its issuer annotation under `ingress.annotations`. For a complete HTTPS example, see [`https-ingress.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/https-ingress.yaml).

### Use the Gateway API instead of an Ingress

If your cluster runs a Gateway API implementation, such as Envoy Gateway, Istio, or Cilium, the chart can attach n8n to an existing Gateway with an `HTTPRoute`:

```yaml
httpRoute:
  enabled: true
  parentRefs:
    - name: <your-gateway>
      namespace: <your-gateway-namespace>
  hostnames:
    - <your-n8n-domain>
```

The chart never creates the Gateway, and you configure TLS on the Gateway's listener. Install the Gateway API custom resource definitions before you install the chart. Use the route or the Ingress, not both: the installation fails if you enable both. For complete examples, see [Gateway API](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#gateway-api) in the chart's README.

### Set n8n's public URLs with the Helm chart

n8n has two public URLs: the editor URL, for the UI and OAuth callbacks, and the webhook URL, for webhooks, forms, and MCP. The chart sets both to `https://` and the first Ingress host or `HTTPRoute` hostname.

The `https://` default assumes TLS ends at the Ingress or Gateway, or in front of it. If you serve n8n over plain HTTP, don't use an Ingress or route, or reach n8n at another host, set the editor URL yourself:

```yaml
editor:
  url: http://<your-n8n-domain>
```

Webhooks follow the editor URL unless you set `webhook.url`. To receive webhooks on a separate host, for example to keep the editor internal and take webhooks on a public host, see [A separate host for webhooks](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#a-separate-host-for-webhooks) in the chart's README.

### Preserve client IP addresses with the Helm chart

When you enable an Ingress or an `HTTPRoute`, the chart sets `N8N_PROXY_HOPS` to `1` on main and webhook processor pods. n8n then reads each client's IP address from the `X-Forwarded-For` header that the Ingress controller or Gateway adds, instead of using the proxy's address. IP allowlists on Webhook nodes and the addresses n8n logs depend on this. For background, see [Configure webhook URLs with a reverse proxy](../configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md).

If another proxy that adds its own hop sits in front of the Ingress controller or Gateway, such as a CDN or a cloud load balancer, raise the count with `chartEnvOverrides`. Setting `N8N_PROXY_HOPS` in `env.shared`, `env.main`, or `env.webhookProcessor` fails the installation. Without an Ingress or route, the chart doesn't set `N8N_PROXY_HOPS`, so set it in `env.shared` if a proxy of your own sits in front of n8n.

```yaml
chartEnvOverrides:
  shared:
    N8N_PROXY_HOPS: 2
```

{% hint style="warning" %}
**Restrict who can reach the n8n pods**

Any caller that reaches the n8n pods directly can set its own `X-Forwarded-For` header. If you rely on client IP addresses, allow only the Ingress controller or Gateway, and the release's own pods, to reach n8n. `networkPolicy.enabled: true` alone doesn't do this. For an example, see [Client IP addresses](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#client-ip-addresses) in the chart's README.
{% endhint %}

### Route webhooks to webhook processors with the Helm chart

If you run webhook processors, the chart creates a second Ingress on the same hosts. It routes the production webhook paths `/webhook/`, `/webhook-waiting/`, `/form/`, `/form-waiting/`, and `/mcp/` to the webhook processor pods. Test paths such as `/webhook-test/` stay on main. An `HTTPRoute` splits the same paths, without a second resource.

The second Ingress uses `ingress.className` unless you set `ingress.webhook.className`. It doesn't copy annotations or TLS settings from the main Ingress, so set them under `ingress.webhook`:

```yaml
webhookProcessor:
  enabled: true
  replicaCount: 2

ingress:
  webhook:
    tls:
      - secretName: <your-tls-secret>
        hosts:
          - <your-n8n-domain>
```

Some controllers, such as the AWS Load Balancer Controller, create a load balancer for each Ingress. To share one, set the same group annotation, for example `alb.ingress.kubernetes.io/group.name`, in both `ingress.annotations` and `ingress.webhook.annotations`.

## Install the Helm chart

To check your values file before you install, render the chart locally. Replace `<chart-version>` with the chart version you want, for example `2.0.0`. The render reports every problem with your values at once:

```bash
helm template n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--version "<chart-version>" \
	-f values.yaml > /dev/null
```

Then install the chart with your values file:

```bash
helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--version "<chart-version>" \
	-f values.yaml
```

Check that the pods start:

```bash
kubectl get pods
```

In queue mode, each worker pod runs two containers: n8n and the task runner sidecar.

To change the configuration later, edit `values.yaml` and run `helm upgrade` with the same chart version, as described in [Upgrade the Helm chart](#upgrade-the-helm-chart).

## Scale n8n with the Helm chart

In queue mode, you can scale each role on its own:

| Goal | What to configure |
| --- | --- |
| Run more executions at the same time | `queueMode.workerReplicaCount`, and either `queueMode.workerConcurrency` or `executions.concurrency.productionLimit`, not both |
| Handle production webhooks on separate pods | `webhookProcessor.enabled: true` and `webhookProcessor.replicaCount`. See [Route webhooks to webhook processors with the Helm chart](#route-webhooks-to-webhook-processors-with-the-helm-chart). |
| Run more than one main pod (self-hosted Enterprise) | `multiMain.enabled: true`, at least two `multiMain.replicas`, `license.enabled: true` with `license.existingSecret.name` and `license.existingSecret.key`, and sticky sessions at the load balancer. With an NGINX Ingress controller, set `ingress.sticky.enabled: true`. |

The chart refuses to run more than one main pod without multi-main mode, because each main pod would run every schedule and trigger on its own.

If you scale workers with KEDA on the Redis queue length, KEDA only sees jobs that wait in Redis. With a high worker concurrency, workers take jobs off the queue at once, so a backlog can build up inside the workers where KEDA can't see it. Prefer adding workers over raising concurrency.

For task runner settings, scaling with the built-in HPA or KEDA, and node placement, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [examples](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n/examples).

## Upgrade the Helm chart

Before you upgrade, take a full backup and check the [chart releases](https://github.com/n8n-io/n8n-hosting/releases) for upgrade notes. Then upgrade to a pinned chart version:

```bash
helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--version "<new-chart-version>" \
	-f values.yaml
```

Pass your values file with `-f` instead of `--reuse-values`. `--reuse-values` keeps the defaults of the chart version you installed, which can conflict with the new version. If you no longer have your values file, `helm get values n8n -o yaml` prints the values you set.

A Helm rollback reapplies the previous release's Kubernetes manifests. It doesn't reverse database changes that the newer n8n version made. To recover the database, restore your backup. See [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Upgrade from Helm chart 1.x to 2.0

Chart 2.0 changes values keys and defaults, and moves n8n from 2.x to 3.0. Before you upgrade, read the [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes) and the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

To upgrade:

1. Take a full backup of the database, the encryption key, and the persistent volume if you use one.
2. Render your values file against chart 2.0, as shown in [Install the Helm chart](#install-the-helm-chart). The render fails on every values key that 2.0 retired and names its replacement. Change your values file until the render passes.
3. If you use `secretRefs.existingSecret` and task runners, add `N8N_RUNNERS_AUTH_TOKEN` to that Secret, unless you already set `taskRunners.authToken.existingSecret`. The chart can't see inside the Secret, so the render passes without the token, but the pods don't start. Don't point `taskRunners.authToken.existingSecret` at the Secret that chart 1.x generated, ending in `-task-runners`. Helm removes it during the upgrade.
4. Read the changes in the following list that the render doesn't catch, and adjust your setup.
5. Run `helm upgrade` with your values file, as shown in [Upgrade the Helm chart](#upgrade-the-helm-chart).

To add the task runner token to an existing core Secret:

```bash
kubectl patch secret n8n-core-secrets --type merge --patch-file /dev/stdin <<EOF
{"stringData":{"N8N_RUNNERS_AUTH_TOKEN":"$(openssl rand -base64 32)"}}
EOF
```

The most common values changes are:

| Chart 1.x | Chart 2.0 |
| --- | --- |
| `database.useExternal`, `redis.useExternal` | Remove them. `database.type` alone chooses the database. |
| `N8N_HOST`, `N8N_PORT`, or `N8N_PROTOCOL` in `secretRefs.env` | Remove them. Set `editor.url` if you don't use an Ingress or route. |
| `config.extraEnv` and the other `extraEnv` lists | The `env` maps, for example `env.shared` |
| `config.extraEnvFrom` | `envFrom.shared` |
| `ingress.webhookProcessor` | `ingress.webhook`, without `enabled` |
| `securityContext.fsGroup`, `runAsUser`, and `runAsGroup` | The same fields under `podSecurityContext.shared` |
| `securityContext.enabled` | Remove it. Replace `enabled: false` with `podSecurityContext.shared: null`. |
| `N8N_PROXY_HOPS` in `env.shared`, `env.main`, or `env.webhookProcessor`, with an Ingress or route | Remove it, or move it to `chartEnvOverrides` under the same component |
| `queueMode.workerConcurrency` together with `executions.concurrency.productionLimit` | Remove one. n8n already ran workers at `productionLimit`, so to keep your current concurrency, remove `workerConcurrency`. |

Changes the render doesn't catch:

* **Public URLs:** a core Secret that still holds `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` still works, but n8n no longer receives them. If n8n built its URLs from them, set `editor.url`. Otherwise n8n shows webhook and OAuth callback URLs on `localhost`.
* **Keys for rollback:** keep `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` in your core Secret until you no longer need to roll back to chart 1.x. Chart 1.x pods can't start without them, including old pods that restart while the upgrade is in progress.
* **Mixed versions during the upgrade:** old and new pods run side by side until the rollout finishes. An old pod that restarts in this window can fail to start, because chart 2.0 removes resources it reads. Upgrade in a low-traffic window, and avoid node drains until the release reports `deployed`.
* **`$(VAR)` references:** literal values from `env` maps reach the pods through ConfigMaps, where Kubernetes doesn't expand `$(VAR)` references. A value such as `$(HTTP_PROXY)` that worked in an `extraEnv` list now arrives as that literal text.
* **Task runners:** each worker pod, or the main pod in standalone mode, gains a task runner sidecar. To keep running code inside the n8n process, set `taskRunners.enabled: false`.
* **Storage directory:** on first start, n8n 3.0 renames `/home/node/.n8n/binaryData` to `/home/node/.n8n/storage`. If both directories exist, n8n doesn't start. Move the contents of `binaryData` into `storage`, remove `binaryData`, and start n8n again.
* **Restarts:** every pod restarts once during the upgrade. With persistence on a `ReadWriteOnce` volume, the main pod uses the `Recreate` strategy, so the upgrade has a short outage.
* **Helm 4:** if you installed the 1.x release with Helm 4, the first upgrade can fail with `spec.strategy.rollingUpdate: Forbidden`. Run that upgrade once with `--server-side=false`.
* **Environment variable precedence:** ConfigMaps and Secrets you load with `envFrom` now override the variables the chart sets. In 1.x, the chart's variables won. Check that they hold only the keys you mean to set.
* **Security contexts:** a `podSecurityContext.<role>` block now merges over `podSecurityContext.shared` instead of replacing it. To remove a default field, such as a pinned user ID on OpenShift, set it to `null`.
* **Network policy:** with `networkPolicy.enabled: true` and no `networkPolicy.egress` rules, the policy now allows all egress. Rules you set in `networkPolicy.ingress` or `networkPolicy.egress` now take effect and replace the chart's rules.
* **Kubernetes access:** by default, the chart no longer creates a Role or mounts a service account token in n8n's pods, because n8n doesn't call the Kubernetes API. If a container you add needs the API, set `rbac.create: true` or `serviceAccount.automountServiceAccountToken: true`.

To roll back to chart 1.x, also roll n8n back from 3.0 to 2.x. A Helm rollback doesn't reverse the database migrations that n8n 3.0 ran, so restore the database backup you took before the upgrade.

For the full list, including S3 binary data, security contexts, and webhook URLs, see the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
* [Set up task runners](../configure-n8n/set-up-task-runners.md)
