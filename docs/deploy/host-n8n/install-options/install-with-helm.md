---
description: Install self-hosted n8n on Kubernetes with the official n8n Helm chart, in queue mode or standalone mode.
layout:
  description:
    visible: false
---

# Install with Helm

The official n8n Helm chart installs self-hosted n8n on Kubernetes in queue mode or standalone mode.

n8n maintains the chart in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) and publishes it at `oci://ghcr.io/n8n-io/n8n-helm-chart/n8n`. This page covers chart 2.x, which installs n8n 3.x. If you run a release of chart 1.x, follow [Upgrade the Helm chart from 1.x to 2.0](install-with-helm/upgrade-the-helm-chart-from-1x-to-20.md) instead.

This page shows the settings most installations need. For every value, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [`values.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/values.yaml). These links show the chart's development branch. For the version you install, open its [release tag](https://github.com/n8n-io/n8n-hosting/tags), for example `v2.0.0`.

## Prerequisites for the Helm chart

* A Kubernetes cluster running Kubernetes 1.25 or later, and `kubectl` configured for it.
* [Helm](https://helm.sh/docs/intro/install/) 3.12 or later.
* OpenSSL, to generate the encryption key and the task runner token.
* For queue mode, a PostgreSQL server and a Redis instance. The chart doesn't install either. For supported PostgreSQL versions, see [Choose n8n's database](../configure-n8n/choose-n8ns-database.md).
* For standalone mode with SQLite, a default StorageClass, so Kubernetes can create the volume for the database.
* To reach n8n from outside the cluster, an Ingress controller, or a Gateway API implementation with a Gateway.

## Choose a deployment mode for the Helm chart

The chart runs n8n in one of two modes:

| Mode | What runs | What you provide | Choose it when |
| --- | --- | --- | --- |
| Queue mode (default) | Main, worker, and optional webhook processor pods | PostgreSQL and Redis | You run n8n in production, or need to scale executions across several pods |
| Standalone mode | One n8n pod | Storage for SQLite, or PostgreSQL | One pod is enough, for example for development and testing |

In queue mode, the main pods serve the editor and API, and workers take executions from a Redis queue. Workers run in their own pods, so you can add workers without touching the editor. For details, see [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

Both modes run [task runners](../configure-n8n/set-up-task-runners.md) in a sidecar container. Task runners execute the JavaScript and Python code from Code nodes. The sidecar keeps that code away from the n8n process, its credentials, and its encryption key. In queue mode, each worker pod gets the sidecar. In standalone mode, the main pod gets it. Each sidecar requests 100m CPU and 128 MiB of memory, so plan node capacity for it.

## Choose a chart version

The chart has its own version number. Chart 2.x installs n8n 3.x, and chart 1.x installs n8n 2.x. Each chart release installs one n8n version by default, its `appVersion`, which the [chart releases](https://github.com/n8n-io/n8n-hosting/releases) list.

Pin the chart version with `--version` every time you install or upgrade. Without a pin, Helm installs the latest chart, which can move you to a newer n8n version than you planned. To run another n8n version, set `image.tag` in your values file.

n8n signs chart releases with cosign. To confirm that n8n built a chart version and that nobody changed it since, follow [Verify the chart](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#verify-the-chart) before you install.

## Create a namespace for n8n

Install n8n in a namespace of its own. The chart stores n8n's settings in ConfigMaps and reads its passwords from Secrets, so a separate namespace lets you limit who can read them. This page uses the namespace `n8n`:

```bash
kubectl create namespace n8n
```

Run every command on this page against this namespace, because the chart reads Secrets from the namespace you install it into. If you choose another name, replace `n8n` in each `--namespace` option.

## Create the PostgreSQL database for n8n

Skip this section if you use standalone mode with SQLite.

n8n creates and updates its tables on startup, but it doesn't create the database. If the database is missing, n8n fails to start, and logs `database "n8n" does not exist`.

Connect to PostgreSQL as an administrator, and create a user and a database for n8n. Replace `<your-password>` with a password of your own:

```sql
CREATE USER n8n WITH PASSWORD '<your-password>';
CREATE DATABASE n8n OWNER n8n;
```

The n8n user needs to create and change tables. Make it the owner of the database, because from PostgreSQL 15, new databases no longer let every user create tables in the `public` schema. The user and database names must match `database.user` and `database.database` in your values file.

Managed PostgreSQL services often create a database when you create the server, for example from an initial database name. You can use that database instead. Make sure n8n's user owns it.

## Create the Kubernetes Secrets for n8n

The chart reads n8n's encryption key and passwords from Kubernetes Secrets that you create before you install. This keeps them out of your values file and the Helm release history.

The core Secret, named `n8n-core-secrets` in this guide, holds these keys:

* `N8N_ENCRYPTION_KEY`: the key n8n uses to encrypt stored credentials.
* `N8N_RUNNERS_AUTH_TOKEN`: the token task runners use to connect to n8n. You don't need to keep a copy.
* `N8N_LICENSE_ACTIVATION_KEY`: optional. Your license key, if you have one: the free key for the Registered Community edition, or the key for a Business or Enterprise plan.

First, generate the encryption key and store a copy outside the cluster, for example in your password manager. The second command prints the key so you can copy it. The key then stays in your terminal output, so clear the terminal after you copy it, and don't run this command in a shared or recorded session:

```bash
N8N_ENCRYPTION_KEY="$(openssl rand -base64 32)"
echo "$N8N_ENCRYPTION_KEY"
```

{% hint style="warning" %}
**Back up the encryption key**

n8n encrypts stored credentials with `N8N_ENCRYPTION_KEY`. Without the same key, n8n can't decrypt them after a reinstall, a restore, or the loss of the cluster. For more information, see [Back up and restore](../keep-n8n-running/backup-and-restore.md).
{% endhint %}

Then create the core Secret. The commands that ask for a password or key read it without showing it on screen:

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
printf "n8n license key: "; IFS= read -r -s N8N_LICENSE_ACTIVATION_KEY; echo
kubectl create secret generic n8n-core-secrets --namespace n8n \
	--from-literal=N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
	--from-literal=N8N_RUNNERS_AUTH_TOKEN="$(openssl rand -base64 32)" \
	--from-literal=N8N_LICENSE_ACTIVATION_KEY="$N8N_LICENSE_ACTIVATION_KEY"
```

Also [add your license to the values file](#add-your-license-to-the-values-file).
{% endtab %}
{% endtabs %}

If n8n uses PostgreSQL, create a Secret for the database password:

```bash
printf "PostgreSQL password: "; IFS= read -r -s DB_PASSWORD; echo
kubectl create secret generic n8n-db-secret --namespace n8n \
	--from-literal=password="$DB_PASSWORD"
```

If Redis requires a password, such as an auth token on a managed Redis service, create a Secret for it too:

```bash
printf "Redis password: "; IFS= read -r -s REDIS_PASSWORD; echo
kubectl create secret generic n8n-redis-secret --namespace n8n \
	--from-literal=password="$REDIS_PASSWORD"
```

## Create a values file for the Helm chart

Save the configuration for your mode as `values.yaml`, and replace the placeholders. The sections after it add optional settings. Merge each one into the matching block of your file, for example add `passwordSecret` under your existing `redis` block. A second `redis` block would replace the first.

The chart checks your values file against its schema, so the installation stops at a misspelled key, and the error names it.

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

If Redis requires a password, reference its Secret:

```yaml
redis:
  passwordSecret:
    name: n8n-redis-secret
    key: password
```

If your Redis uses access control lists with a named user, also set `redis.username`.

### Values for standalone mode

This configuration runs one n8n pod with SQLite on a 5 GiB volume:

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

To use PostgreSQL instead, set `database.type: postgresdb` and the connection settings from the queue mode example. Keep `persistence.enabled: true`, because n8n also keeps files such as binary data on the volume.

Only one node at a time can mount a volume with the default access mode, `ReadWriteOnce`. To keep a new pod from waiting for a volume the old pod still holds, the chart stops the old pod before it starts the new one. This gives each upgrade a short outage.

### Add your license to the values file

If the core Secret holds a license key, add this block. It tells the chart where to find the key:

```yaml
license:
  enabled: true
  existingSecret:
    name: n8n-core-secrets
    key: N8N_LICENSE_ACTIVATION_KEY
```

n8n activates the key on its first start, and ignores it once the instance has an active license. To activate a license in the UI instead, or to use a license certificate, see [Manage your license](../configure-n8n/manage-your-license.md).

### Connect to PostgreSQL and Redis over TLS

To use TLS, set `database.ssl.enabled: true` for PostgreSQL and `redis.tls: true` for Redis. n8n then checks the server's certificate, so it only connects to the real server. If a publicly trusted certificate authority (CA) signed that certificate, you're done.

Managed database services and private networks often use their own CA. n8n doesn't trust it by default, so it fails to start, and logs an error such as `self-signed certificate in certificate chain`. To fix this, download your provider's CA certificate in PEM format, save it as `ca.crt`, and store it in a Secret. If your provider offers a bundle of several certificates, save the whole bundle:

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

For Redis, n8n has no CA setting. Mount the Secret as a file instead, and point Node.js at it with `NODE_EXTRA_CA_CERTS`, which adds the CA to the certificates n8n trusts:

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

If PostgreSQL and Redis use different certificate authorities, store each certificate under its own key in the Secret. Set `caKey` to the PostgreSQL key, and point `NODE_EXTRA_CA_CERTS` at the file of the Redis key, for example `/etc/n8n/ca/redis-ca.crt`.

### Set environment variables in the values file

To configure n8n with [environment variables](../configure-n8n/basic-configuration/use-environment-variables/README.md), set them in the `env` maps. `env.shared` applies to main, worker, and webhook processor pods. `env.main`, `env.worker`, and `env.webhookProcessor` apply to one component, and `env.taskRunner` applies to the task runner sidecar only.

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

The chart stores plain values in ConfigMaps, which anyone who can read ConfigMaps in the namespace can see. Reference passwords and tokens from a Secret with `secretKeyRef` instead, as `N8N_SMTP_PASS` does above. Kubernetes doesn't expand `$(VAR)` references in these values, so write each value in full.

The chart sets some variables itself, for example `DB_POSTGRESDB_HOST` from `database.host`. If you also set one in an `env` map, the installation fails, and the error names the value to set instead. For details, see [Environment variables](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#environment-variables) in the chart's README.

## Reach n8n

The chart creates a `ClusterIP` Service, which is only reachable inside the cluster. To open the editor from your computer without more setup, forward a local port to it after you install:

```bash
kubectl port-forward service/n8n-main --namespace n8n 5678:5678
```

Then open `http://localhost:5678`. For access from outside the cluster, add an Ingress or a Gateway API route to `values.yaml` before you install.

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

The Ingress doesn't create DNS records or certificates. Point your domain at the Ingress controller, and create the TLS Secret yourself or with a certificate manager such as cert-manager. For a complete example, see [`https-ingress.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/https-ingress.yaml).

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

The chart doesn't create the Gateway, and you configure TLS on the Gateway's listener. A listener only accepts routes from its own namespace by default. If the Gateway runs in another namespace, set the listener's `allowedRoutes` to accept routes from the `n8n` namespace. Use the route or an Ingress, not both. For more examples, see [Gateway API](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#gateway-api) in the chart's README.

### Set n8n's public URLs

n8n uses two public URLs: the editor URL for the UI and OAuth callbacks, and the webhook URL for webhooks, forms, and MCP. By default, the chart sets both to `https://` and the first Ingress host or `HTTPRoute` hostname.

If people reach n8n at another address, for example over plain HTTP or through a proxy the chart doesn't create, set the editor URL to that address. Otherwise n8n shows webhook and OAuth callback URLs that don't work:

```yaml
editor:
  url: https://<your-n8n-domain>
```

Webhooks use the editor URL unless you set `webhook.url`. To receive webhooks on a host of their own, see [A separate host for webhooks](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#a-separate-host-for-webhooks) in the chart's README.

### Preserve client IP addresses

With an Ingress or an `HTTPRoute`, the chart sets `N8N_PROXY_HOPS` to `1`. n8n then reads each client's IP address from the `X-Forwarded-For` header that the proxy adds, instead of logging the proxy's address. IP allowlists on Webhook nodes depend on this. For background, see [Configure webhook URLs with a reverse proxy](../configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md).

Set the count to the number of trusted proxies that forward requests to n8n. If another proxy sits in front of the Ingress controller or Gateway, for example a CDN, raise it with `chartEnvOverrides`, because the chart owns this variable:

```yaml
chartEnvOverrides:
  shared:
    N8N_PROXY_HOPS: 2
```

Without an Ingress or route, the chart doesn't set `N8N_PROXY_HOPS`. If your own proxy forwards requests to n8n, set it in `env.shared`.

{% hint style="warning" %}
**Restrict who can reach the n8n pods**

Any caller that reaches the n8n pods directly can send its own `X-Forwarded-For` header and pretend to have another IP address. If you rely on client IP addresses, allow only your proxy and the release's own pods to reach n8n. For an example, see [Client IP addresses](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#client-ip-addresses) in the chart's README.
{% endhint %}

## Install the Helm chart

First, render the chart locally. This checks your values file before anything changes in the cluster, and reports the problems with your values. Replace `<chart-version>` with the chart version you want, for example `2.0.0`:

```bash
helm template n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--version "<chart-version>" \
	-f values.yaml > /dev/null
```

The render can't check your Secrets or reach your database, so the next steps confirm those. Install the chart with the same version:

```bash
helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--version "<chart-version>" \
	-f values.yaml
```

Wait until every n8n Deployment is ready:

```bash
kubectl rollout status deployment --selector app.kubernetes.io/instance=n8n --namespace n8n
```

Then open the editor at your domain, or through the port forward from [Reach n8n](#reach-n8n). If a pod doesn't become ready, check it with `kubectl describe pod <pod-name> --namespace n8n`. Its events name a missing Secret or key. If the pod starts but stops again, `kubectl logs <pod-name> --namespace n8n` shows why, for example a missing database or an untrusted certificate.

## Scale n8n with the Helm chart

In queue mode, you can scale each part of n8n on its own:

| Goal | What to configure | Why |
| --- | --- | --- |
| Run more executions at the same time | `queueMode.workerReplicaCount` | Each worker runs up to 10 executions at the same time by default. To change that, set `queueMode.workerConcurrency`. |
| Handle production webhooks on separate pods | `webhookProcessor.enabled: true` and `webhookProcessor.replicaCount` | Webhook traffic then doesn't slow down the editor. |
| Run more than one main pod (Enterprise) | `multiMain.enabled: true`, at least two `multiMain.replicas`, and your [license](#add-your-license-to-the-values-file) | The editor stays available while one main pod restarts. |

With webhook processors and an Ingress, the chart creates a second Ingress for the production webhook paths, such as `/webhook/` and `/form/`. It doesn't copy annotations or TLS settings from the main Ingress, so set them under `ingress.webhook`.

With more than one main pod, also turn on sticky sessions at your Ingress controller or load balancer, so each browser stays on one main pod. For ingress-nginx, see the annotations in [`https-ingress.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/https-ingress.yaml).

For autoscaling with HPA or KEDA, node placement, and task runner settings, see the chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) and [examples](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n/examples).

## Upgrade the Helm chart

This section covers upgrades within chart 2.x. To move from chart 1.x, follow [Upgrade the Helm chart from 1.x to 2.0](install-with-helm/upgrade-the-helm-chart-from-1x-to-20.md).

Before you upgrade, back up the database, because a newer n8n version can change it, and Helm can't undo that. Check the [chart releases](https://github.com/n8n-io/n8n-hosting/releases) for upgrade notes. Then upgrade to a pinned chart version:

```bash
helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--version "<new-chart-version>" \
	-f values.yaml
```

Pass your values file with `-f` instead of using `--reuse-values`. `--reuse-values` keeps the defaults of the chart version you installed, and those can conflict with the new version. If you no longer have your values file, `helm get values n8n --namespace n8n -o yaml` prints the values you set.

`helm rollback` restores the previous Kubernetes resources, but not the database. To go back after a failed upgrade, restore your database backup too. See [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
* [Set up task runners](../configure-n8n/set-up-task-runners.md)
