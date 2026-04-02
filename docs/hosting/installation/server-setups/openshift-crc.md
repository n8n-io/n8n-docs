---
contentType: tutorial
---

# Hosting n8n on OpenShift Local (CRC)

This guide walks you through deploying n8n on OpenShift Local (CRC), Red Hat's tool for running a local OpenShift cluster. It mirrors AWS/EKS deployment, but runs entirely on your local machine. It's designed for testing n8n in an OpenShift environment locally, without cloud costs.

You will need a machine with significant resources available, given how many resources OpenShift itself consumes.

## OpenShift concepts vs standard Kubernetes

OpenShift is built on Kubernetes but uses different terminology and has stricter security defaults. If you are familiar with standard Kubernetes, or with a guide that targets a managed Kubernetes service such as EKS, the table below maps the equivalent concepts so you know what to expect.

| Standard Kubernetes / EKS | OpenShift Local (CRC) |
| --- | --- |
| `kubectl` | `oc` (OpenShift CLI; also understands `kubectl` commands) |
| Namespace | Project (same concept, different command) |
| Ingress / LoadBalancer | Route (built into OpenShift, no controller needed) |
| EBS StorageClass (gp3) | CRC built-in storage provisioner (no setup needed) |
| RDS PostgreSQL | In-cluster PostgreSQL via Helm (Bitnami) |
| ElastiCache Redis | In-cluster Redis via Helm (Bitnami) |
| AWS S3 | MinIO in-cluster (S3-compatible) |
| Pod Identity / IRSA | Access keys via Kubernetes Secret |
| AWS Load Balancer Controller | Not needed (Routes are built-in) |
| OIDC / IAM | Not needed |
| ~$135–400/month | Free (runs on your machine) |

## Prerequisites

Before starting, confirm your machine has:

- **CPU**: 4 or more physical cores (not just threads) with virtualization support
- **RAM**: 32+ GB free minimum (CRC reserves 9 GB for its VM)
- **Disk**: 100 GB free
- **OS**: Ubuntu (22.04 LTS or newer)

## Prepare Ubuntu

### Open a terminal

Press `Ctrl+Alt+T` or search for **Terminal** in the Applications menu.

Every command in this guide is typed into the terminal and run by pressing **Enter**.

### Update your system

Start with a system update to avoid dependency issues:

```shell
sudo apt update && sudo apt upgrade -y
```

/// note | sudo
`sudo` means “run as administrator”. You will be prompted for your password. Characters you type won't appear on screen, this is normal.
///

### Check CPU virtualization support

CRC runs a virtual machine. Your CPU must support hardware virtualization:

```shell
egrep -c '(vmx|svm)' /proc/cpuinfo
```

- **Output `0`**: Virtualization is disabled. Enter your BIOS/UEFI settings and enable VT-x (Intel) or AMD-V (AMD), then reboot and try again.
- **Output `1` or higher**: You are good to continue.

### Install KVM and libvirt

KVM is Linux’s built-in hypervisor. CRC uses it to run the OpenShift cluster VM:

```shell
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```

Install `virtiofsd`, which CRC requires to share the filesystem with the cluster VM:

```shell
sudo apt install -y virtiofsd
```

Start the libvirt service and configure it to start automatically on boot:

```shell
sudo systemctl start libvirtd
sudo systemctl enable libvirtd
```

Verify it's running:

```shell
sudo systemctl status libvirtd
```

Look for `Active: active (running)` in green. Press `q` to exit.

### Add user to required groups

This allows you to use KVM and libvirt without typing `sudo` for every command:

```shell
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```

/// note | Warning
**You must log out and log back in (or reboot) for this to take effect.** If you skip this step, CRC will fail with a “permission denied” error.
///

Reboot now:

```shell
sudo reboot
```

After logging back in, open a terminal and verify group membership:

```shell
groups
```

You should see `libvirt` and `kvm` listed.

### Install NetworkManager

CRC requires NetworkManager to manage DNS entries for the cluster’s internal domains (`*.apps-crc.testing`, `api.crc.testing`):

```shell
sudo apt install -y network-manager
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager
```

Verify it's connected:

```shell
nmcli general status
```

The `STATE` column should show `connected`.

## Install tools

### Get a Red Hat account and pull secret

CRC requires a free Red Hat account to pull container images.

1. [Create a free Red Hat account](https://console.redhat.com/), if you don't already have one.
2. In [console.redhat.com/openshift/create/local](https://console.redhat.com/openshift/create/local), click **Download OpenShift Local**.
3. Select **Linux**, and download the `.tar.xz` file to `~/Downloads`.
4. On the same page of the Red Hat console, click **Copy pull secret**. Paste it into a text file and save it for later.

### Install CRC

Open a terminal in your Downloads folder.

```shell
cd ~/Downloads
```

Extract the archive.

```shell
tar xf crc-linux-amd64.tar.xz
```

Move the `crc` binary to a system-wide location, so it's available in any terminal:

```shell
sudo mv crc-*-linux-amd64/crc /usr/local/bin/
```

Verify the installation:

```shell
crc version
```

A version number should print to the terminal.

### Install Helm

Helm installs n8n and supporting services into the cluster:

```shell
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify:

```shell
helm version
```

### Set environment variables

```shell
export NAMESPACE=n8n-$(date +%Y%m%d)
echo "Namespace:$NAMESPACE"
```

/// note | Variable persistence
These variables only last for the current terminal session. Re-run this line whenever you open a new terminal before continuing.
///

## Start OpenShift Local

### Run CRC setup

You only need to run this once. It configures KVM networking, checks system requirements, and downloads the CRC bundle (~2.5 GB):

```shell
crc setup
```

This takes several minutes. If it reports any missing packages, install them with `sudo apt install -y <package-name>` and re-run.

### Configure CRC memory and start the cluster

CRC defaults to 9 GB of RAM for its VM. n8n and its supporting services need more headroom. Set the memory to 14 GB before starting:

```shell
crc config set memory 14336
```

You only need to run this once. The setting persists across `crc stop` / `crc start` cycles.

**Recommended:** Save your pull secret to a file first so you don’t have to paste it every time:

```shell
# Open the file, paste your pull secret (from earlier), then Ctrl+O to save, Ctrl+X to exit
nano ~/pull-secret.txt

# Restrict permissions so only you can read it
chmod 600 ~/pull-secret.txt
```

Start CRC using the file:

```shell
crc start --pull-secret-file ~/pull-secret.txt
```

Alternatively, run `crc start` without the flag and paste the secret when prompted.

**This takes 10–15 minutes.** When complete you will see something like:

```
Started the OpenShift cluster.

The server is accessible via web console at:
  https://console-openshift-console.apps-crc.testing

Log in as administrator:
  Username: kubeadmin
  Password: <generated-password>

Log in as user:
  Username: developer
  Password: developer
```

**Save the `kubeadmin` password now.** You will need it in the next step. You can retrieve it later using `crc console --credentials`.

### Verify DNS resolution

On Ubuntu, CRC configures the system resolver automatically with NetworkManager and systemd-resolved. No manual `/etc/hosts` entries are needed.

Verify the API is reachable:

```shell
sudo ss -tlnp | grep 6443
```

You should see a process bound to `127.0.0.1:6443`. If nothing appears, re-run `crc start`. If DNS doesn't resolve `*.apps-crc.testing`, see the troubleshooting section.

### Configure your shell

CRC bundles the `oc` CLI inside the VM. This command makes it available in your terminal:

```shell
eval $(crc oc-env)
```

To make this permanent so you don't have to run it every time you open a terminal:

```shell
echo 'eval $(crc oc-env)' >> ~/.bashrc
source ~/.bashrc
```

Verify `oc` works:

```shell
oc version
```

### Log in to the cluster

```shell
oc login -u kubeadmin -p <your-kubeadmin-password> https://api.crc.testing:6443
```

Replace `<your-kubeadmin-password>` with the password printed when you [configured CRC memory and started the cluster](#configure-crc-memory-and-start-the-cluster).

Verify you are logged in:

```shell
oc whoami
```

`kubeadmin` should print to the screen.

## Standalone deployment

Standalone mode runs n8n as a single pod with SQLite. No external database or Redis is required. This is ideal for exploring n8n and testing workflows locally.

### Create the project

In OpenShift, a **project** is the same as a Kubernetes namespace: an isolated space for your resources:

```shell
oc new-project $NAMESPACE
```

### Grant the required security permission

OpenShift enforces strict security policies called **Security Context Constraints (SCCs)**. By default, pods can't run with a specific user ID. The n8n chart runs as user ID `1000`, so you must explicitly allow this.

Use the full explicit form. The shorthand `-z` flag can silently fail in some OpenShift versions:

```shell
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n
```

Verify the binding was created:

```shell
oc get rolebindings -n $NAMESPACE
```

You should see a binding referencing `system:openshift:scc:anyuid`.

### Create the required secret

```shell
oc create secret generic n8n-secrets \
  --namespace $NAMESPACE \
  --from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  --from-literal=N8N_HOST="localhost" \
  --from-literal=N8N_PORT="5678" \
  --from-literal=N8N_PROTOCOL="http"
```

**Back up the encryption key immediately:**

```shell
oc get secret n8n-secrets -n $NAMESPACE \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 --decode
```

Copy that output and store it somewhere safe. Losing it means all stored credentials in your workflows become permanently unreadable.

### Create your values file

Create a file called `n8n-standalone-values.yaml`. You can use `nano` (a simple text editor):

```shell
nano n8n-standalone-values.yaml
```

Paste the following, then press `Ctrl+O` to save and `Ctrl+X` to exit:

```yaml
# n8n-standalone-values.yaml
# Single pod, SQLite database, no external dependencies.

queueMode:
  enabled: false

database:
  type: sqlite
  useExternal: false

redis:
  enabled: false

# PVC stores the SQLite database file.
persistence:
  enabled: true
  size: 5Gi
  # No storageClassName needed — CRC provides a default storage provisioner.

secretRefs:
  existingSecret: "n8n-secrets"

service:
  type: ClusterIP
  port: 5678

# OpenShift: securityContext must be enabled so the pod runs as UID 1000 (node user)
# with fsGroup 1000 (so the PVC is writable). The anyuid SCC granted above
# allows this. The seccompProfile line is removed from the chart template in
# "Deploy n8n" because OpenShift 4.14+ rejects it even with anyuid.
securityContext:
  enabled: true

resources:
  main:
    requests:
      cpu: 100m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 1Gi

config:
  timezone: UTC
```

### Deploy n8n

The n8n Helm chart hard codes `seccompProfile: RuntimeDefault` in the pod spec. OpenShift 4.14+ converts this to a deprecated alpha annotation that's rejected at admission, even when `anyuid` SCC is granted. The fix is to pull the chart locally, remove those two lines, and install from the patched copy.

**Pull and patch the chart:**

```shell
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml

# Confirm the lines are gone (should return no output)
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml
```

**Install from the patched chart:**

```shell
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-standalone-values.yaml \
  --wait \
  --timeout 10m
```

### Access n8n using port forward

OpenShift Routes require a hostname, which adds complexity for standalone local access. Port-forward is simpler:

```shell
oc port-forward service/n8n-main --namespace $NAMESPACE 5678:5678
```

Leave this running, then open your browser to:

```
http://localhost:5678
```

n8n will prompt you to create an owner account.

/// note | Stop tunnel
Press `Ctrl+C` to stop the tunnel. Re-run the `port-forward` command to access n8n again later.
///

### Check deployment status

```shell
oc get pods -n $NAMESPACE
```

Expected:

```
NAME                       READY   STATUS    RESTARTS   AGE
n8n-main-7d9f8b-xxxx       1/1     Running   0          3m
```

**Standalone deployment complete.**

## Multi-instance queue mode

Multi-instance queue mode runs multiple n8n pods with a shared database, message queue, and object storage. It requires an [n8n Enterprise license](https://n8n.io/pricing/).

Instead of AWS managed services, this guide uses in-cluster equivalents that mirror what you would find in an on-premises or customer OpenShift environment:

| AWS Service | Local Equivalent |
| --- | --- |
| RDS PostgreSQL | PostgreSQL (Bitnami Helm chart) |
| ElastiCache Redis | Redis (Bitnami Helm chart) |
| S3 | MinIO (S3-compatible, Bitnami Helm chart) |

### Install in-cluster services

#### Create the Project and add Bitnami Helm repo

```shell
oc new-project $NAMESPACE
```

Add the Bitnami chart repository (only needed once):

```shell
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

#### Install PostgreSQL

In the command below, replace `YourStrongPassword123` with a suitable complex password.

```shell
helm install postgresql bitnami/postgresql \
  --namespace $NAMESPACE \
  --set auth.username=n8n \
  --set auth.password='YourStrongPassword123' \
  --set auth.database=n8n_enterprise \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

/// note | Flag
The `global.compatibility.openshift.adaptSecurityContext=auto` flag tells Bitnami to let OpenShift assign the correct user ID automatically (avoids SCC errors).
///

Save the endpoint, as it's fixed for in-cluster services:

```
postgresql.YOUR_NAMESPACE.svc.cluster.local
```

Replace `YOUR_NAMESPACE` with your actual `$NAMESPACE` value (e.g. `n8n-20260306`).

#### Install Redis

```shell
helm install redis bitnami/redis \
  --namespace $NAMESPACE \
  --set auth.enabled=false \
  --set architecture=standalone \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

Redis endpoint: `redis-master.$NAMESPACE.svc.cluster.local`

#### Install MinIO (S3-compatible storage)

In the command below, replace `MinioStrongPassword123` with a suitable complex password.

```shell
helm install minio bitnami/minio \
  --namespace $NAMESPACE \
  --set auth.rootUser=minioadmin \
  --set auth.rootPassword='MinioStrongPassword123' \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

MinIO endpoint: `http://minio:9000` (within the same namespace, just the service name works)

#### Create the n8n storage bucket in MinIO

MinIO needs a bucket created before n8n can use it. Use the MinIO web console:

**Open the MinIO console:**

```shell
oc port-forward svc/minio 9001:9001 -n $NAMESPACE
```

Leave this running, then open your browser to `http://localhost:9001`.

Log in with:
- **Username:** `minioadmin`
- **Password:** `MinioStrongPassword123`

In the console:
1. Click **Buckets** in the left sidebar → **Create Bucket**
2. **Bucket Name:** `n8n-data`
3. Click **Create Bucket**

Go back to the terminal and press `Ctrl+C` to stop the port-forward.

### Deploy n8n

#### Grant SCC for n8n

```shell
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n-enterprise
```

Verify that `oc get rolebindings -n $NAMESPACE` shows a binding for `system:openshift:scc:anyuid`.

#### Create required secrets

```shell
# Core n8n secrets
oc create secret generic n8n-enterprise-secrets \
  --namespace $NAMESPACE \
  --from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  --from-literal=N8N_HOST="localhost" \
  --from-literal=N8N_PORT="5678" \
  --from-literal=N8N_PROTOCOL="http"
```

**Back up the encryption key immediately:**

```shell
oc get secret n8n-enterprise-secrets -n $NAMESPACE \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 --decode
```

Store that value somewhere safe.

In the commands below, replace `YourStrongPassword123` and `MinioStrongPassword123` with the passwords from the earlier steps.

```shell
# Database password (must match what you set when installing PostgreSQL)
oc create secret generic n8n-enterprise-db-secret \
  --namespace $NAMESPACE \
  --from-literal=password='YourStrongPassword123'

# MinIO credentials
oc create secret generic n8n-minio-secret \
  --namespace $NAMESPACE \
  --from-literal=root-password='MinioStrongPassword123'
```

#### Create values file

Create `n8n-multimain-ocp-values.yaml`. Replace the **3 placeholder values** marked `# <-- REPLACE`:

```shell
nano n8n-multimain-ocp-values.yaml
```

```yaml
# n8n-multimain-ocp-values.yaml
# Multi-instance queue mode for OpenShift Local (CRC).
# Uses in-cluster PostgreSQL, Redis, and MinIO instead of AWS services.
# Requires Enterprise license.

# --- Enterprise license ---
license:
  enabled: true
  activationKey: "your-enterprise-license-key-here"  # <-- REPLACE

# --- Multi-main: 2 replicas (reduced for local resources) ---
multiMain:
  enabled: true
  replicas: 2

# --- Queue mode: 2 worker pods ---
queueMode:
  enabled: true
  workerReplicaCount: 2
  workerConcurrency: 5

# --- Webhook processors ---
webhookProcessor:
  enabled: true
  replicaCount: 1
  disableProductionWebhooksOnMainProcess: true

# --- PostgreSQL (in-cluster) ---
database:
  type: postgresdb
  useExternal: true
  host: "postgresql.YOUR_NAMESPACE.svc.cluster.local"   # <-- REPLACE YOUR_NAMESPACE
  port: 5432
  database: n8n_enterprise
  schema: "public"
  user: n8n
  passwordSecret:
    name: "n8n-enterprise-db-secret"
    key: "password"

# --- Redis (in-cluster, no TLS) ---
redis:
  enabled: true
  useExternal: true
  host: "redis-master.YOUR_NAMESPACE.svc.cluster.local"  # <-- REPLACE YOUR_NAMESPACE
  port: 6379
  tls: false

# --- MinIO (S3-compatible, in-cluster) ---
s3:
  enabled: true
  bucket:
    name: "n8n-data"
    region: "us-east-1"
  host: "http://minio:9000"
  auth:
    autoDetect: false
    accessKeyId: "minioadmin"
    secretAccessKeySecret:
      name: "n8n-minio-secret"
      key: "root-password"
  storage:
    mode: "s3"
    availableModes: "filesystem,s3"
  forcePathStyle: true

# --- Service account ---
serviceAccount:
  create: true
  name: n8n
```

Save and exit nano (`Ctrl+O`, `Ctrl+X`).

**Before deploying**, replace the two `YOUR_NAMESPACE` placeholders with your actual namespace value:

```shell
# Check your namespace value
echo $NAMESPACE

# Replace in the file (this edits it automatically)
sed -i "s/YOUR_NAMESPACE/$NAMESPACE/g" n8n-multimain-ocp-values.yaml
```

Verify the replacements:

```shell
grep "svc.cluster.local" n8n-multimain-ocp-values.yaml
```

Both lines should show your actual namespace name, not `YOUR_NAMESPACE`.

#### Deploy n8n

If you didn't patch the chart previously, pull and patch it now:

```shell
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml  # should return nothing
```

Install from the patched chart:

```shell
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-multimain-ocp-values.yaml \
  --wait \
  --timeout 15m
```

#### Create a route for external access

In OpenShift, a **Route** exposes a service to the outside world. It's the equivalent of a Kubernetes Ingress or LoadBalancer, and requires no extra controller:

```shell
oc expose svc/n8n-main -n $NAMESPACE
```

Get the URL:

```shell
export ROUTE=$(oc get route n8n-main -n $NAMESPACE -o jsonpath='{.spec.host}')
echo "n8n URL: http://$ROUTE"
```

The URL will look like: `http://n8n-main-n8n-20260306.apps-crc.testing`

#### Update the host secret

n8n needs to know its public URL. Update the secret with the Route hostname, then restart the pods:

```shell
ENCRYPTION_KEY=$(oc get secret n8n-enterprise-secrets -n $NAMESPACE \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 --decode)

oc create secret generic n8n-enterprise-secrets \
  --namespace $NAMESPACE \
  --from-literal=N8N_ENCRYPTION_KEY="$ENCRYPTION_KEY" \
  --from-literal=N8N_HOST="$ROUTE" \
  --from-literal=N8N_PORT="5678" \
  --from-literal=N8N_PROTOCOL="http" \
  --dry-run=client -o yaml | oc apply -f -

oc rollout restart deployment -n $NAMESPACE
```

Wait for the rollout to complete:

```shell
oc rollout status deployment/n8n-main -n $NAMESPACE
```

#### Verify all pods are running

```shell
oc get pods -n $NAMESPACE
```

Expected (all `Running`):

```
NAME                                    READY   STATUS    RESTARTS   AGE
n8n-main-xxxx-aaaa                      1/1     Running   0          5m
n8n-main-xxxx-bbbb                      1/1     Running   0          5m
n8n-worker-xxxx-aaaa                    1/1     Running   0          5m
n8n-worker-xxxx-bbbb                    1/1     Running   0          5m
n8n-webhook-processor-xxxx-aaaa         1/1     Running   0          5m
postgresql-0                            1/1     Running   0          15m
redis-master-0                          1/1     Running   0          15m
minio-xxxx-xxxx                         1/1     Running   0          15m
```

Open your browser to the URL printed above.

**Multi-instance deployment complete.**


## Updating n8n

To change configuration or upgrade the chart version, pull and re-patch the new chart version, then upgrade:

```shell
# Remove the old local chart copy
rm -rf ~/n8n/

# Pull and patch the new version
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version <new-version> --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml

# Standalone
helm upgrade n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-standalone-values.yaml

# Multi-instance
helm upgrade n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-multimain-ocp-values.yaml
```

## Stopping and resuming CRC

CRC doesn't need to be deleted between sessions. You can stop and restart it:

```shell
# Stop the cluster (saves state)
crc stop

# Start it again later
crc start
```

After restarting, re-run:

```shell
eval $(crc oc-env)
export NAMESPACE=n8n-YYYYMMDD   # use your original date
oc login -u kubeadmin -p <password> https://api.crc.testing:6443
```

## Troubleshooting

### `crc setup` fails with “libvirt not found”

```shell
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients
sudo systemctl start libvirtd
```

Then re-run `crc setup`.


### `crc start` fails with “insufficient memory”

CRC requires at least 9 GB of free RAM. Close other applications and try again. If you [followed instructions for configuring CRC memory](#configure-crc-memory-and-start-the-cluster), CRC is configured to use 14 GB.


### n8n pod stuck in `Pending` or never created SCC error

Check events for the error:

```shell
oc get events -n $NAMESPACE --sort-by='.lastTimestamp' | tail -20
```

If you see `unable to validate against any security context constraint` or `seccomp may not be set`, the chart’s hard coded `seccompProfile: RuntimeDefault` is being rejected. OpenShift 4.14+ converts this to a deprecated alpha annotation that admission rejects even when `anyuid` SCC is granted.

**1. Grant anyuid using the explicit form** (the `-z` shorthand can silently fail):

```shell
# For standalone
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n

# For multi-instance
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n-enterprise
```

Verify: run `oc get rolebindings -n $NAMESPACE`. You should see a binding for `system:openshift:scc:anyuid`.

**2. Pull the chart locally and remove the `seccompProfile` lines:**

```shell
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml

# Confirm they're gone (should return no output)
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml
```

**3. Uninstall and reinstall from the patched chart:**

```shell
helm uninstall n8n -n $NAMESPACE
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-standalone-values.yaml \
  --wait \
  --timeout 10m
```

### Route URL returns “Application not available”

The pods may still be starting. Check:

```shell
oc get pods -n $NAMESPACE
oc rollout status deployment/n8n-main -n $NAMESPACE
```

Also confirm the Route exists:

```shell
oc get route -n $NAMESPACE
```

### n8n pod stuck in `Pending` with `Insufficient memory`

The CRC node doesn’t have enough free memory to schedule the pod.

**Fix:** Increase CRC’s VM memory and restart:

```shell
crc stop
crc config set memory 14336
crc start
```

After CRC restarts, the pod should schedule automatically. If the pod is still pending after a few minutes, delete it to force a reschedule:

```shell
oc delete pod -n $NAMESPACE -l app.kubernetes.io/component=main
```

If your machine can’t spare 14 GB, you can also lower the pod’s memory request in `n8n-standalone-values.yaml`:

```yaml
resources:
  main:
    requests:
      memory: 256Mi
```

Then upgrade: `helm upgrade n8n ~/n8n/ -n $NAMESPACE -f n8n-standalone-values.yaml`


### DNS not resolving `.apps-crc.testing` or `api.crc.testing`

On Ubuntu, CRC configures DNS automatically. If it fails, restart NetworkManager:

```shell
sudo systemctl restart NetworkManager
```

If still broken, add entries manually (CRC routes traffic through `127.0.0.1`):

```shell
sudo tee -a /etc/hosts <<EOF
127.0.0.1 api.crc.testing
127.0.0.1 console-openshift-console.apps-crc.testing
127.0.0.1 oauth-openshift.apps-crc.testing
127.0.0.1 default-route-openshift-image-registry.apps-crc.testing
EOF
```

/// note | Subdomains
When you expose Routes in the multi-instance section, new `*.apps-crc.testing` subdomains are created. Add them to `/etc/hosts` pointing to `127.0.0.1` if your browser can’t reach them.
///


### n8n pod crashes with `EACCES: permission denied` writing to `/home/node/.n8n/`

This means the pod is running as a random OpenShift-assigned UID instead of UID 1000 (the `node` user the n8n image expects). It happens when `securityContext.enabled: false` is set in values without `runAsUser: 1000` and `fsGroup: 1000`, OpenShift assigns a random UID that can’t write to the PVC.

**Fix:** Ensure `securityContext.enabled: true` is set in your values file, and that the chart has been patched to remove `seccompProfile` (see the SCC error section above). Both are required together.


### View pod logs

```shell
# Main process
oc logs -n $NAMESPACE -l app.kubernetes.io/component=main --tail=50

# Workers
oc logs -n $NAMESPACE -l app.kubernetes.io/component=worker --tail=50

# Webhook processors
oc logs -n $NAMESPACE -l app.kubernetes.io/component=webhook-processor --tail=50
```

### All events in the namespace

```shell
oc get events -n $NAMESPACE --sort-by='.lastTimestamp'
```

## Quick Reference

### Re-export variables after reopening terminal

```shell
eval $(crc oc-env)
export NAMESPACE=n8n-YYYYMMDD   # use the date from your original deployment
oc login -u kubeadmin -p <password> https://api.crc.testing:6443
```

### Check cluster status

```shell
crc status
```

### Open the OpenShift web console

```shell
crc console
```

Log in with `kubeadmin` / your password to see a graphical view of everything running.

### Things to save

| Item | Why it matters |
| --- | --- |
| `kubeadmin` password | Log in to the cluster |
| n8n encryption key | Lose this = all stored credentials unreadable |
| `n8n-standalone-values.yaml` | Required for `helm upgrade` |
| `n8n-multimain-ocp-values.yaml` | Required for `helm upgrade` |
| MinIO root password | Access the MinIO console |
| PostgreSQL password | Database access |

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
