---
description: Install self-hosted n8n on Kubernetes with the official n8n Helm chart, from a single-pod quick start to queue mode with workers.
layout:
  description:
    visible: false
---

# Install with Helm

The official n8n Helm chart installs self-hosted n8n on Kubernetes, as a single pod or in queue mode with separate workers.

n8n maintains the chart in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) and publishes it at `oci://ghcr.io/n8n-io/n8n-helm-chart/n8n`. You can browse the chart's versions and default values on [Artifact Hub](https://artifacthub.io/packages/helm/n8n-io/n8n). This page covers chart 2.x, the chart line for n8n 3.x. If you run chart 1.x, see [Helm chart 2.0](install-with-helm/helm-chart-20.md) for what changed and how to upgrade.

{% hint style="warning" %}
**This guide uses a release candidate of Helm chart 2.0**

Chart 2.0 isn't final yet, so the commands on this page install the release candidate `2.0.0-rc.2`, which still installs n8n 2.x. Use it to try chart 2.0, not for production.

For production, use chart 1.x until chart 2.0 is final. The [`release/n8n-2.x` branch](https://github.com/n8n-io/n8n-hosting/tree/release/n8n-2.x/charts/n8n) of the chart's repository holds the 1.x chart, and its README explains how to install and configure it. 
{% endhint %}

All commands in this guide use the namespace `n8n` and the release name `n8n`. If you choose other names, replace them in each command.

## Prerequisites for the Helm chart

* A Kubernetes cluster running Kubernetes 1.25 or later, with a default StorageClass.
* `kubectl`, configured for that cluster.
* [Helm](https://helm.sh/docs/intro/install/) 3.12 or later.
* OpenSSL, to generate the encryption key and the task runner token.

<details>

<summary>Create a local cluster with kind</summary>

If you don't have a cluster, [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) runs one in Docker on your computer. It includes a default StorageClass:

```bash
kind create cluster --name n8n
```

kind points `kubectl` at the new cluster. To check that the cluster is ready:

```bash
kubectl get nodes
```

To remove the cluster when you finish, run `kind delete cluster --name n8n`.

</details>

### Create the namespace and the core Secret

The chart reads n8n's encryption key and the task runner token from a Kubernetes Secret that you create. This keeps them out of your values file and the Helm release history. Every installation on this page uses this namespace and Secret, so create them once:

```bash
kubectl create namespace n8n

kubectl create secret generic n8n-core-secrets --namespace n8n \
	--from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
	--from-literal=N8N_RUNNERS_AUTH_TOKEN="$(openssl rand -base64 32)"
```

The Secret holds two keys:

* `N8N_ENCRYPTION_KEY`: the key n8n uses to encrypt stored credentials.
* `N8N_RUNNERS_AUTH_TOKEN`: the token [task runners](../configure-n8n/set-up-task-runners.md) use to connect to n8n. Task runners execute the code from Code nodes in a sidecar container.

## Quick start with a single n8n pod

The quick start runs n8n in standalone mode: one pod, with a SQLite database on a persistent volume. It needs no other services, so it's the fastest way to try n8n on Kubernetes. To run n8n for a team or in production, continue to [Install n8n in queue mode](#install-n8n-in-queue-mode) next.

### Install the chart in standalone mode

Create a values file, then install the chart with it:

```bash
cat > values.yaml <<'EOF'
queueMode:
  enabled: false

database:
  type: sqlite

redis:
  enabled: false

persistence:
  enabled: true

secretRefs:
  existingSecret: n8n-core-secrets
EOF

helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--values values.yaml \
	--version 2.0.0-rc.2
```

`--version` selects the release candidate, because Helm skips release candidates unless you name one. The chart checks your values file against its schema, so the installation stops at a misspelled key, and the error names it.

### Check that n8n is running

Wait for the rollout to finish, then run the chart's connection test:

```bash
kubectl rollout status deployment --namespace n8n \
	--selector app.kubernetes.io/instance=n8n
helm test n8n --namespace n8n
```

To see the pod, run `kubectl get pods --namespace n8n`. Standalone mode runs one `n8n-main` pod with 2 containers. Its `READY` column should show `2/2`.

{% hint style="info" %}
**If the pod doesn't become ready**

Run `kubectl describe pod --namespace n8n` to see the pod's events, which name a missing Secret or key. If the pod starts and then stops, `kubectl logs deployment/n8n-main --namespace n8n` shows why.
{% endhint %}

### Open n8n

The chart creates a `ClusterIP` Service, which is only reachable inside the cluster. Forward a local port to it:

```bash
kubectl port-forward service/n8n-main --namespace n8n 5678:5678
```

Open `http://localhost:5678` and create the owner account. To stop forwarding, press `Ctrl+C`.

## Install n8n in queue mode

Use queue mode for production-scale deployments. In this mode, main pods serve the editor and API, and worker pods take executions from a Redis queue. You can then add workers without touching the editor. Queue mode needs PostgreSQL and Redis. For how it works, see [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

If the quick start release is still running, remove it. The quick start instance keeps its data in SQLite, which doesn't carry over to PostgreSQL, so queue mode starts as a new instance. Helm deletes the release's volume with it. The namespace and the Secret stay, so n8n keeps the same encryption key:

```bash
helm uninstall n8n --namespace n8n
```

### Deploy PostgreSQL and Redis

The chart doesn't install PostgreSQL or Redis. This step deploys a basic example of each into the `n8n` namespace so you can get started.

{% hint style="warning" %}
**Example databases only**

The PostgreSQL and Redis in this step are examples to help you get started. They run as single pods, with no backups, replication, or tuning. For production, run PostgreSQL and Redis in a way that meets your own needs, for example with a managed service from your cloud provider. For supported PostgreSQL versions, see [Choose n8n's database](../configure-n8n/choose-n8ns-database.md).
{% endhint %}

First, create a Secret with a generated database password. PostgreSQL and the chart both read it:

```bash
kubectl create secret generic n8n-db-secret --namespace n8n \
	--from-literal=password="$(openssl rand -hex 24)"
```

Then deploy PostgreSQL, with a database and a user both named `n8n`, and Redis:

```bash
kubectl apply --namespace n8n -f - <<'EOF'
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:18-alpine
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              value: n8n
            - name: POSTGRES_DB
              value: n8n
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: n8n-db-secret
                  key: password
          readinessProbe:
            exec:
              command: ["pg_isready", "-U", "n8n", "-d", "n8n"]
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:8-alpine
          ports:
            - containerPort: 6379
          readinessProbe:
            exec:
              command: ["redis-cli", "ping"]
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  selector:
    app: redis
  ports:
    - port: 6379
EOF
```

Wait until both are ready:

```bash
kubectl rollout status statefulset/postgres --namespace n8n
kubectl rollout status deployment/redis --namespace n8n
```

### Install the chart in queue mode

Create a values file that points n8n at the two Services, then install the chart with it:

```bash
cat > values.yaml <<'EOF'
queueMode:
  enabled: true
  workerReplicaCount: 2

database:
  type: postgresdb
  host: postgres
  database: n8n
  user: n8n
  passwordSecret:
    name: n8n-db-secret
    key: password

redis:
  enabled: true
  host: redis

secretRefs:
  existingSecret: n8n-core-secrets
EOF

helm install n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--values values.yaml \
	--version 2.0.0-rc.2
```

To use your own PostgreSQL and Redis instead of the examples, skip the manifests in [Deploy PostgreSQL and Redis](#deploy-postgresql-and-redis). Create `n8n-db-secret` with your database password, and set `database.host` and `redis.host` to your hosts. n8n creates its tables on startup, but not the database itself, so create an empty database that n8n's user owns first. For passwords, TLS, and other connection settings, see [`values.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/values.yaml) in the chart.

### Check that queue mode is running

Wait for the rollout to finish, then run the chart's connection test:

```bash
kubectl rollout status deployment --namespace n8n \
	--selector app.kubernetes.io/instance=n8n
helm test n8n --namespace n8n
```

To see the pods, run `kubectl get pods --namespace n8n`. Queue mode runs one `n8n-main` pod and two `n8n-worker` pods. Each worker's `READY` column shows `2/2` because a worker pod has two containers: n8n and the task runner sidecar.

To open the editor, forward a port as in the quick start:

```bash
kubectl port-forward service/n8n-main --namespace n8n 5678:5678
```

Then open `http://localhost:5678`.

## Expose n8n with the Gateway API

To reach n8n from outside the cluster, attach it to a Gateway. The chart creates an `HTTPRoute` for n8n, and your cluster provides the Gateway. This section sets up a Gateway with [Envoy Gateway](https://gateway.envoyproxy.io/) and serves n8n over HTTPS on your domain.

Set your domain first. It's the only value you need to change, and the commands that follow read it:

```bash
export N8N_DOMAIN=<your-n8n-domain>
```

### Install a Gateway controller

A Gateway controller implements the Gateway API in your cluster. This step installs Envoy Gateway as an example, along with the Gateway API resource definitions:

```bash
helm install envoy-gateway oci://docker.io/envoyproxy/gateway-helm \
	--namespace envoy-gateway-system \
	--create-namespace \
	--wait
```

{% hint style="info" %}
**Use the Gateway controller you already have**

If your cluster already runs a Gateway API implementation, such as Cilium, Istio, or your cloud provider's, skip this step. In the next step, leave out the `GatewayClass` and set `gatewayClassName` to the class your cluster provides.
{% endhint %}

### Create the Gateway

The Gateway's HTTPS listener reads its certificate from a Secret named `n8n-tls`. To try the setup, create a self-signed certificate:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
	-keyout tls.key -out tls.crt \
	-subj "/CN=$N8N_DOMAIN" \
	-addext "subjectAltName=DNS:$N8N_DOMAIN"

kubectl create secret tls n8n-tls --namespace n8n \
	--cert tls.crt --key tls.key
```

Browsers warn about a self-signed certificate. For production, create `n8n-tls` from a certificate that browsers trust, for example with [cert-manager](https://cert-manager.io/docs/usage/gateway/).

Then create the Gateway:

```bash
kubectl apply -f - <<EOF
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy-gateway
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: n8n
  namespace: n8n
spec:
  gatewayClassName: envoy-gateway
  listeners:
    - name: https
      protocol: HTTPS
      port: 443
      hostname: $N8N_DOMAIN
      tls:
        certificateRefs:
          - name: n8n-tls
EOF
```

### Attach n8n to the Gateway

Add the route to `values.yaml`, then apply the change:

```bash
cat >> values.yaml <<EOF

httpRoute:
  enabled: true
  parentRefs:
    - name: n8n
  hostnames:
    - $N8N_DOMAIN
EOF

helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--values values.yaml \
	--version 2.0.0-rc.2
```

The chart sets n8n's editor and webhook URLs to `https://` and the first hostname, so webhook and OAuth callback URLs use your domain.

Envoy Gateway creates a `LoadBalancer` Service for the Gateway. To find its address, run:

```bash
kubectl get gateway n8n --namespace n8n
```

Point your domain's DNS record at the value in the `ADDRESS` column, then open `https://` and your domain. The column stays empty on clusters without a load balancer, such as a local kind cluster.

If n8n has no route and people reach it at an address other than `localhost`, set `editor.url` to that address, including `http://` or `https://`.

The chart can also serve webhooks on a host of their own, or create an Ingress instead of a route. See [Gateway API](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#gateway-api) and [Ingress and HTTPS](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#ingress-and-https) in the chart's README.

## Add your n8n license key

If you have a license key, store it in a Secret. The first command asks for the key without showing it on screen:

```bash
printf "n8n license key: "; IFS= read -r -s N8N_LICENSE_KEY; echo
kubectl create secret generic n8n-license --namespace n8n \
	--from-literal=license-key="$N8N_LICENSE_KEY"
```

Add this block to `values.yaml`, then run the `helm upgrade` command from [Upgrade the Helm chart](#upgrade-the-helm-chart):

```yaml
license:
  enabled: true
  existingSecret:
    name: n8n-license
    key: license-key
```

n8n activates the key on its next start, and ignores it once the instance has an active license. To activate a license in the UI instead, see [Manage your license](../configure-n8n/manage-your-license.md).

## Scale n8n with the Helm chart

In queue mode, you scale each part of n8n on its own. Change the value in `values.yaml`, then run the `helm upgrade` command from [Upgrade the Helm chart](#upgrade-the-helm-chart):

| Goal | Value to set | Notes |
| --- | --- | --- |
| Run more executions at the same time | `queueMode.workerReplicaCount` | Each worker runs up to 10 executions at the same time by default. |
| Handle production webhooks on separate pods | `webhookProcessor.enabled: true` and `webhookProcessor.replicaCount` | Webhook traffic then doesn't slow down the editor. The chart's `HTTPRoute` sends the production webhook paths to these pods. |
| Run more than one main pod | `multiMain.enabled: true` and `multiMain.replicas` | Needs an Enterprise [license](#add-your-n8n-license-key), and sticky sessions at your Gateway or load balancer. |

For autoscaling with HPA or KEDA, see [Scaling guidance](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#scaling-guidance) in the chart's README.

## Upgrade the Helm chart

This section covers upgrades within chart 2.x. To move from chart 1.x, follow [Helm chart 2.0](install-with-helm/helm-chart-20.md).

Each chart release installs one n8n version by default, so upgrading the chart also updates n8n. The [chart releases](https://github.com/n8n-io/n8n-hosting/releases) list the n8n version each one installs, with any upgrade notes.

Before you upgrade, back up the database, the encryption key, and the persistent volume if you use one. A newer n8n version can change the database, and Helm can't undo that. Then upgrade:

```bash
helm upgrade n8n oci://ghcr.io/n8n-io/n8n-helm-chart/n8n \
	--namespace n8n \
	--values values.yaml \
	--version 2.0.0-rc.2
```

To move to another chart version, change `--version` to a version from the chart releases. To run another n8n version on the same chart, set `image.tag` in `values.yaml`.

Pass your values file with `--values` instead of using `--reuse-values`. `--reuse-values` keeps the defaults of the chart version you installed, and those can conflict with the new version. If you no longer have your values file, `helm get values n8n --namespace n8n --output yaml` prints the values you set.

`helm rollback` restores the previous Kubernetes resources, but not the database or the volume. To go back after a failed upgrade, restore those backups too. See [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Uninstall n8n

Remove the release, then the namespace:

```bash
helm uninstall n8n --namespace n8n
kubectl delete namespace n8n
```

{% hint style="danger" %}
**Deleting the namespace deletes your data**

Deleting the namespace removes everything in it. This includes the encryption key, n8n's volume, and the example PostgreSQL with its data. Back up anything you want to keep first.
{% endhint %}

If you installed Envoy Gateway for this guide, remove it too:

```bash
kubectl delete gatewayclass envoy-gateway
helm uninstall envoy-gateway --namespace envoy-gateway-system
kubectl delete namespace envoy-gateway-system
```

## Next steps

You can customize the n8n Helm chart to fit a broad range of deployment needs.

To help you get started, the chart's repository includes [reference examples](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n/examples): complete values files, each written for a common way to run n8n.
| If you want to | Start from |
| --- | --- |
| Run a single pod with no other services | [`standalone.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/standalone.yaml) |
| Run queue mode with the fewest settings | [`minimal.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/minimal.yaml) |
| Run production with high availability, S3 storage, and autoscaling | [`production-s3.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/production-s3.yaml) or [`multi-main-queue.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/multi-main-queue.yaml) |
| Scale workers with the length of the queue | [`keda-autoscaling.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/keda-autoscaling.yaml) |
| Expose n8n, or give webhooks a host of their own | [`gateway-httproute.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/gateway-httproute.yaml), [`gateway-webhook-host.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/gateway-webhook-host.yaml), or [`https-ingress.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/https-ingress.yaml) |
| Keep main pods and workers on separate node pools | [`node-placement.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/node-placement.yaml) |

The examples' [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/examples/README.md) lists every example, and says which need an Enterprise license.

This page covers the settings most installations start with. The chart's [README](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md) documents the rest, and its [`values.yaml`](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/values.yaml) lists every value. Both links show the chart's development branch. For the version you installed, open its [release tag](https://github.com/n8n-io/n8n-hosting/tags).

* [Verify the chart](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#verify-the-chart): check a chart version's cosign signature before you install it.
* [Environment variables](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#environment-variables): set n8n's [environment variables](../configure-n8n/basic-configuration/use-environment-variables/README.md) for all pods or for one component.
* [Secret management](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#secret-management): use an external secrets operator, or an encryption key file.
* [Binary data](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#binary-data): choose where n8n stores files, including S3.
* [Client IP addresses](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#client-ip-addresses): configure n8n when more than one proxy sits in front of it.
* [Task runners](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#task-runners): size or customize the task runner sidecar.
* [Node placement](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#node-placement) and [Security context](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/README.md#security-context): control where pods run, and as which user, including on OpenShift.

## Related resources

* [Install options](./)
* [Helm chart 2.0](install-with-helm/helm-chart-20.md)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Production requirements](production-requirements.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
* [Set up task runners](../configure-n8n/set-up-task-runners.md)
