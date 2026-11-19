---
description: Install self-hosted n8n on Kubernetes with the official n8n Helm chart, in queue mode or standalone mode.
layout:
  description:
    visible: false
---

# Install with Helm

The official n8n Helm chart installs self-hosted n8n on Kubernetes in queue mode or standalone mode.

n8n maintains the chart in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) and publishes it to the OCI registry at `oci://ghcr.io/n8n-io/n8n-helm-chart/n8n`. This page covers a basic installation with chart 2.x, which installs n8n 3.x. For every configurable value, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [`values.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/values.yaml). These links show the latest chart. To see the values of the version you install, open its [release tag](https://github.com/n8n-io/n8n-hosting/tags), for example `v2.0.0`.

## Prerequisites for the Helm chart

* A Kubernetes cluster running Kubernetes 1.25 or later, and `kubectl` configured for it.
* [Helm](https://helm.sh/docs/intro/install/) 3.12 or later.
* OpenSSL, to generate the encryption key and the task runner token.
* For queue mode, a PostgreSQL server and a Redis instance that you provide. The chart doesn't install them, and n8n doesn't create its PostgreSQL database, as described in [Create the PostgreSQL database for n8n](#create-the-postgresql-database-for-n8n). For supported PostgreSQL versions, see [Choose n8n's database](../configure-n8n/choose-n8ns-database.md).
* For standalone mode with SQLite, a StorageClass that can provision the PersistentVolumeClaim for the database.
* To reach n8n from outside the cluster, an Ingress controller, or a Gateway API implementation with a Gateway.

## Create a namespace for n8n

n8n recommends installing n8n in a namespace of its own. This keeps n8n's Secrets and ConfigMaps apart from other workloads, so you can limit who can read them. This page uses the namespace `n8n`:

```bash
kubectl create namespace n8n
```

The chart reads the Secrets you create from the namespace you install it into, so run every command on this page against the same namespace. If you choose another name, replace `n8n` in each `--namespace` option.

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

## Create the PostgreSQL database for n8n

n8n creates and updates its tables on startup, but it doesn't create the PostgreSQL database. If the database doesn't exist, n8n fails to start, and logs `database "n8n" does not exist`. Standalone mode with SQLite doesn't need this step.

Before you install, connect to PostgreSQL as an administrator, and create a user and a database for n8n. Replace `<your-password>` with a password of your own:

```sql
CREATE USER n8n WITH PASSWORD '<your-password>';
CREATE DATABASE n8n OWNER n8n;
```

Make the n8n user the owner of the database. From PostgreSQL 15, only the database owner can create tables in the `public` schema by default. The user and database names must match `database.user` and `database.database` in your values file. You store the password in a Secret in the next section.

Managed PostgreSQL services often let you create the database when you create the server, for example with an initial database name. In that case, skip these commands, and use the database name and user you set there.

## Create the Kubernetes Secrets for n8n

The chart reads n8n's encryption key, the task runner token, and passwords from Kubernetes Secrets that you create before you install.

The core Secret holds these keys:

* `N8N_ENCRYPTION_KEY`: the key n8n uses to encrypt stored credentials.
* `N8N_RUNNERS_AUTH_TOKEN`: the token task runners use to authenticate with n8n. The chart requires it while task runners are on, which is the default.
* `N8N_LICENSE_ACTIVATION_KEY`: optional. Your license key, if you have one: the free key for the Registered Community edition, or the key for the Business or Enterprise plan. Leave it out for the Community edition without registration.

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

Then create the core Secret. The command generates the task runner token inline. You don't need a copy of the token: to change it later, update the Secret and restart the n8n Deployments with `kubectl rollout restart deployment --selector app.kubernetes.io/instance=n8n --namespace n8n`.

{% tabs %}
{% tab title="Without a license key" %}
```bash
kubectl create secret generic n8n-core-secrets --namespace n8n \
	--from-literal=N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
	--from-literal=N8N_RUNNERS_AUTH_TOKEN="$(openssl rand -base64 32)"
```
{% endtab %}

{% tab title="With a license key" %}
```bash
printf "n8n license key: "; read -r -s N8N_LICENSE_ACTIVATION_KEY; echo
kubectl create secret generic n8n-core-secrets --namespace n8n \
	--from-literal=N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
	--from-literal=N8N_RUNNERS_AUTH_TOKEN="$(openssl rand -base64 32)" \
	--from-literal=N8N_LICENSE_ACTIVATION_KEY="$N8N_LICENSE_ACTIVATION_KEY"
```

To pass the license key to n8n, also [add the license to the values file](#add-your-license-to-the-values-file).
{% endtab %}
{% endtabs %}

In queue mode, also create a Secret for the PostgreSQL password. Reading the password into a variable keeps special characters intact:

```bash
printf "PostgreSQL password: "; read -r -s DB_PASSWORD; echo
kubectl create secret generic n8n-db-secret --namespace n8n \
	--from-literal=password="$DB_PASSWORD"
```

If Redis requires a password, such as an auth token on a managed Redis service, create a Secret for it too:

```bash
printf "Redis password: "; read -r -s REDIS_PASSWORD; echo
kubectl create secret generic n8n-redis-secret --namespace n8n \
	--from-literal=password="$REDIS_PASSWORD"
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

If Redis requires a password, reference the Secret you created in [Create the Kubernetes Secrets for n8n](#create-the-kubernetes-secrets-for-n8n):

```yaml
redis:
  passwordSecret:
    name: n8n-redis-secret
    key: password
```

If your Redis uses access control lists (ACLs) with a named user, also set `redis.username`. A Redis that requires a password often requires TLS too. See [Connect to PostgreSQL and Redis over TLS](#connect-to-postgresql-and-redis-over-tls).

### Connect to PostgreSQL and Redis over TLS

To connect over TLS, set `database.ssl.enabled: true` for PostgreSQL and `redis.tls: true` for Redis. If a publicly trusted certificate authority (CA) signed the server's certificate, that's all you need.

Managed database services and private networks often use a CA that n8n doesn't trust by default. n8n then fails to start, and logs `self-signed certificate in certificate chain`. To fix this, download your provider's CA certificate in PEM format, save it as `ca.crt`, and store it in a Secret. If your provider offers a bundle of several certificates, save the whole bundle:

```bash
kubectl create secret generic n8n-ca --namespace n8n --from-file=ca.crt=ca.crt
```

For PostgreSQL, the chart reads the CA from the Secret:

```yaml
database:
  ssl:
    enabled: true
    existingSecret:
      name: n8n-ca
      caKey: ca.crt
```

For Redis, n8n has no CA setting of its own. Mount the Secret as a file, and point Node.js at it with `NODE_EXTRA_CA_CERTS`. n8n then trusts the CA for all its outgoing TLS connections:

```yaml
redis:
  tls: true

extraVolumes:
  - name: n8n-ca
    secret:
      secretName: n8n-ca

extraVolumeMounts:
  - name: n8n-ca
    mountPath: /etc/n8n/ca
    readOnly: true

env:
  shared:
    NODE_EXTRA_CA_CERTS: /etc/n8n/ca/ca.crt
```

If PostgreSQL and Redis use different certificate authorities, put each certificate in the Secret under its own key. Set `caKey` to the PostgreSQL key, and point `NODE_EXTRA_CA_CERTS` at the file for the Redis key, for example `/etc/n8n/ca/redis-ca.crt`.

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

### Add your license to the values file

If you added a license key to the core Secret, add this block to `values.yaml`. It tells the chart to read the license key from the core Secret. For the Community edition without registration, leave it out.

```yaml
license:
  enabled: true
  existingSecret:
    name: n8n-core-secrets
    key: N8N_LICENSE_ACTIVATION_KEY
```

n8n activates the license key on first start. Once the instance has an activated license, the key has no effect. To register the Community edition or activate a license in the UI after you install instead, or to use a license certificate, see [Manage your license](../configure-n8n/manage-your-license.md).

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

The chart stores literal values in ConfigMaps, so anyone who can read ConfigMaps in the namespace can read them. Use a `secretKeyRef` for passwords and tokens. Kubernetes doesn't expand `$(VAR)` references in values loaded from these ConfigMaps, so write each value in full.

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

The chart never creates the Gateway, and you configure TLS on the Gateway's listener. If the Gateway runs in another namespace, set the listener's `allowedRoutes` to accept routes from the `n8n` namespace. By default, a listener only accepts routes from its own namespace. Install the Gateway API custom resource definitions before you install the chart. Use the route or the Ingress, not both: the installation fails if you enable both. For complete examples, see [Gateway API](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#gateway-api) in the chart's README.

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

If another proxy that adds its own hop sits in front of the Ingress controller or Gateway, such as a CDN or a cloud load balancer, raise the count with `chartEnvOverrides`. With an Ingress or route, setting `N8N_PROXY_HOPS` in `env.shared`, `env.main`, or `env.webhookProcessor` fails the installation. Without an Ingress or route, the chart doesn't set `N8N_PROXY_HOPS`, so set it in `env.shared` if a proxy of your own sits in front of n8n.

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
	--namespace n8n \
	--version "<chart-version>" \
	-f values.yaml > /dev/null
```

Then install the chart with your values file:

```bash
helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--version "<chart-version>" \
	-f values.yaml
```

Check that the pods start:

```bash
kubectl get pods --namespace n8n
```

In queue mode with task runners on, which is the default, each worker pod runs two containers: n8n and the task runner sidecar. With `taskRunners.enabled: false`, each worker pod runs only the n8n container.

To change the configuration later, edit `values.yaml` and run `helm upgrade` with the same chart version, as described in [Upgrade the Helm chart](#upgrade-the-helm-chart).

## Scale n8n with the Helm chart

In queue mode, you can scale each role on its own:

| Goal | What to configure |
| --- | --- |
| Run more executions at the same time | `queueMode.workerReplicaCount`, and either `queueMode.workerConcurrency` or a positive `N8N_CONCURRENCY_PRODUCTION_LIMIT` in `env.worker`, not both |
| Handle production webhooks on separate pods | `webhookProcessor.enabled: true` and `webhookProcessor.replicaCount`. See [Route webhooks to webhook processors with the Helm chart](#route-webhooks-to-webhook-processors-with-the-helm-chart). |
| Run more than one main pod (self-hosted Enterprise) | `multiMain.enabled: true`, at least two `multiMain.replicas`, your license as described in [Add your license to the values file](#add-your-license-to-the-values-file), and sticky sessions at the load balancer. With an Ingress, set your Ingress controller's session affinity annotations in `ingress.annotations`. For ingress-nginx, see [`https-ingress.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/https-ingress.yaml). |

The chart refuses to run more than one main pod without multi-main mode, because each main pod would run every schedule and trigger on its own.

If you scale workers with KEDA on the Redis queue length, KEDA only sees jobs that wait in Redis. With a high worker concurrency, workers take jobs off the queue at once, so a backlog can build up inside the workers where KEDA can't see it. With this kind of scaling, keep worker concurrency moderate and let KEDA add workers.

For task runner settings, scaling with the built-in HPA or KEDA, and node placement, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [examples](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n/examples).

## Upgrade the Helm chart

Before you upgrade, take a full backup and check the [chart releases](https://github.com/n8n-io/n8n-hosting/releases) for upgrade notes. Then upgrade to a pinned chart version:

```bash
helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--version "<new-chart-version>" \
	-f values.yaml
```

Pass your values file with `-f` instead of `--reuse-values`. `--reuse-values` keeps the defaults of the chart version you installed, which can conflict with the new version. If you no longer have your values file, `helm get values n8n --namespace n8n -o yaml` prints the values you set.

A Helm rollback reapplies the previous release's Kubernetes manifests. It doesn't reverse database changes that the newer n8n version made. To recover the database, restore your backup. See [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Upgrade from Helm chart 1.x to 2.0

Chart 2.0 changes values keys and defaults, and moves n8n from 2.x to 3.0. A chart 1.x values file that sets keys chart 2.0 retired fails to render until you update it. Before you upgrade an existing chart 1.x release, follow [Upgrade the Helm chart from 1.x to 2.0](install-with-helm/upgrade-the-helm-chart-from-1x-to-20.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
* [Set up task runners](../configure-n8n/set-up-task-runners.md)
