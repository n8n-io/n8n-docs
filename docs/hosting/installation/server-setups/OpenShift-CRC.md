This guide mirrors the AWS/EKS deployment but runs entirely on your local machine using OpenShift Local (CRC). It is designed for testing against a an OpenShift environment without cloud costs. 

You will need a machine with signifiant resources to provision to run this given how many resources OpenShift itself consumes.

---

## How This Differs from the AWS/EKS 

| AWS / EKS | OpenShift Local (CRC) |
| --- | --- |
| `kubectl` | `oc` (OpenShift CLI also understands `kubectl` commands) |
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

---

## System Requirements

Before starting, confirm your machine has:

- **CPU**: 4 or more physical cores (not just threads) with virtualization support
- **RAM**: 32+ GB free minimum (CRC reserves 9 GB for its VM)
- **Disk**: 100 GB free
- **OS**: Ubuntu (22.04 LTS or newer)

---

## Phase 1: Prepare Ubuntu

### Step 1: Open a Terminal

Press `Ctrl+Alt+T` or search for **Terminal** in the Applications menu.

Every command in this guide is typed into the terminal and run by pressing **Enter**.

---

### Step 2: Update Your System

Always start with a system update to avoid dependency issues:

```bash
sudo apt update && sudo apt upgrade -y
```

> `sudo` means “run as administrator”. You will be prompted for your password. Characters you type will not appear on screen - this is normal.
> 

---

### Step 3: Check CPU Virtualization Support

CRC runs a virtual machine. Your CPU must support hardware virtualization:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

- **Output `0`**: Virtualization is disabled. Enter your BIOS/UEFI settings and enable VT-x (Intel) or AMD-V (AMD), then reboot and try again.
- **Output `1` or higher**: You are good to continue.

---

### Step 4: Install KVM and libvirt

KVM is Linux’s built-in hypervisor. CRC uses it to run the OpenShift cluster VM:

```bash
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```

Install `virtiofsd`, which CRC requires to share the filesystem with the cluster VM:

```bash
sudo apt install -y virtiofsd
```

Start the libvirt service and configure it to start automatically on boot:

```bash
sudo systemctl start libvirtd
sudo systemctl enable libvirtd
```

Verify it is running:

```bash
sudo systemctl status libvirtd
```

Look for `Active: active (running)` in green. Press `q` to exit.

---

### Step 5: Add Your User to the Required Groups

This allows you to use KVM and libvirt without typing `sudo` for every command:

```bash
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```

> **You must log out and log back in (or reboot) for this to take effect.** If you skip this step, CRC will fail with a “permission denied” error.
> 

Reboot now:

```bash
sudo reboot
```

After logging back in, open a terminal and verify group membership:

```bash
groups
```

You should see `libvirt` and `kvm` listed.

---

### Step 6: Install NetworkManager

CRC requires NetworkManager to manage DNS entries for the cluster’s internal domains (`*.apps-crc.testing`, `api.crc.testing`):

```bash
sudo apt install -y network-manager
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager
```

Verify it is connected:

```bash
nmcli general status
```

The `STATE` column should show `connected`.

---

## Phase 2: Install Tools

### Step 7: Get a Red Hat Account and Pull Secret

CRC requires a free Red Hat account to pull container images.

1. Go to **console.redhat.com** → create a free account if you do not have one
2. Go to **console.redhat.com/openshift/create/local**
3. Click **Download OpenShift Local** → select **Linux** → download the `.tar.xz` file (saved to `~/Downloads`)
4. On the same page, click **Copy pull secret** → paste it into a text file and save it (you will need it in Step 11)

---

### Step 8: Install CRC

Open a terminal in your Downloads folder:

```bash
cd ~/Downloads
```

Extract the archive. 

```bash
tar xf crc-linux-amd64.tar.xz
```

Move the `crc` binary to a system-wide location so it is available in any terminal:

```bash
sudo mv crc-*-linux-amd64/crc /usr/local/bin/
```

Verify the installation:

```bash
crc version
```

You should see a version number printed.

---

### Step 9: Install Helm

Helm installs n8n and supporting services into the cluster:

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify:

```bash
helm version
```

---

### Step 10: Set Environment Variables

```bash
export NAMESPACE=n8n-$(date +%Y%m%d)
echo "Namespace:$NAMESPACE"
```

> **Important:** These variables only last for the current terminal session. Re-run this line whenever you open a new terminal before continuing.
> 

---

## Phase 3: Start OpenShift Local

### Step 11: Run CRC Setup

This only needs to be run once. It configures KVM networking, checks system requirements, and downloads the CRC bundle (~2.5 GB):

```bash
crc setup
```

This takes several minutes. If it reports any missing packages, install them with `sudo apt install -y <package-name>` and re-run.

---

### Step 12: Configure CRC Memory and Start the Cluster

CRC defaults to 9 GB of RAM for its VM. n8n and its supporting services need more headroom. Set the memory to 14 GB before starting:

```bash
crc config set memory 14336
```

> This only needs to be run once. The setting persists across `crc stop` / `crc start` cycles.
> 

**Recommended:** Save your pull secret to a file first so you don’t have to paste it every time:

```bash
# Open the file, paste your pull secret (from Step 7), then Ctrl+O to save, Ctrl+X to exit
nano ~/pull-secret.txt

# Restrict permissions so only you can read it
chmod 600 ~/pull-secret.txt
```

Then start CRC using the file:

```bash
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

**Save the `kubeadmin` password now.** You will need it in the next step.

> To retrieve it later if you lose it: `crc console --credentials`
> 

---

### Step 13: Verify DNS Resolution

On Ubuntu, CRC configures the system resolver automatically via NetworkManager and systemd-resolved. No manual `/etc/hosts` entries are needed.

Verify the API is reachable:

```bash
sudo ss -tlnp | grep 6443
```

You should see a process bound to `127.0.0.1:6443`. If nothing appears, re-run `crc start`. If DNS does not resolve `*.apps-crc.testing`, see the troubleshooting section.

---

### Step 14: Configure Your Shell

CRC bundles the `oc` CLI inside the VM. This command makes it available in your terminal:

```bash
eval $(crc oc-env)
```

To make this permanent so you do not have to run it every time you open a terminal:

```bash
echo 'eval $(crc oc-env)' >> ~/.bashrc
source ~/.bashrc
```

Verify `oc` works:

```bash
oc version
```

---

### Step 14: Log In to the Cluster

```bash
oc login -u kubeadmin -p <your-kubeadmin-password> https://api.crc.testing:6443
```

Replace `<your-kubeadmin-password>` with the password printed in Step 12.

Verify you are logged in:

```bash
oc whoami
```

Should print `kubeadmin`.

---

---

## Part A: Getting Started - Standalone

Standalone mode runs n8n as a single pod with SQLite. No external database or Redis required. Ideal for exploring n8n and testing workflows locally.

---

### Step A1: Create the Project

In OpenShift, a **project** is the same as a Kubernetes namespace  it is an isolated space for your resources:

```bash
oc new-project $NAMESPACE
```

---

### Step A2: Grant the Required Security Permission

OpenShift enforces strict security policies called **Security Context Constraints (SCCs)**. By default, pods cannot run with a specific user ID. The n8n chart runs as user ID `1000`, so you must explicitly allow this.

Use the full explicit form the shorthand `-z` flag can silently fail in some OpenShift versions:

```bash
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n
```

Verify the binding was created:

```bash
oc get rolebindings -n $NAMESPACE
```

You should see a binding referencing `system:openshift:scc:anyuid`.

---

### Step A3: Create the Required Secret

```bash
oc create secret generic n8n-secrets \
  --namespace $NAMESPACE \
  --from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  --from-literal=N8N_HOST="localhost" \
  --from-literal=N8N_PORT="5678" \
  --from-literal=N8N_PROTOCOL="http"
```

**Back up the encryption key immediately:**

```bash
oc get secret n8n-secrets -n $NAMESPACE \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 --decode
```

Copy that output and store it somewhere safe. Losing it means all stored credentials in your workflows become permanently unreadable.

---

### Step A4: Create Your Values File

Create a file called `n8n-standalone-values.yaml`. You can use `nano` (a simple text editor):

```bash
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
  # No storageClassName needed CRC provides a default storage provisioner.

secretRefs:
  existingSecret: "n8n-secrets"

service:
  type: ClusterIP
  port: 5678

# OpenShift: securityContext must be enabled so the pod runs as UID 1000 (node user)
# with fsGroup 1000 (so the PVC is writable). The anyuid SCC granted in Step A2
# allows this. The seccompProfile line is removed from the chart template in Step A5
# because OpenShift 4.14+ rejects it even with anyuid.
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

---

### Step A5: Deploy n8n

The n8n Helm chart hardcodes `seccompProfile: RuntimeDefault` in the pod spec. OpenShift 4.14+ converts this to a deprecated alpha annotation that is rejected at admission even when `anyuid` SCC is granted. The fix is to pull the chart locally, remove those two lines, and install from the patched copy.

**Pull and patch the chart:**

```bash
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml

# Confirm the lines are gone (should return no output)
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml
```

**Install from the patched chart:**

```bash
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-standalone-values.yaml \
  --wait \
  --timeout 10m
```

---

### Step A6: Access n8n via Port Forward

OpenShift Routes require a hostname, which adds complexity for standalone local access. Port-forward is simpler:

```bash
oc port-forward service/n8n-main --namespace $NAMESPACE 5678:5678
```

Leave this running, then open your browser to:

```
http://localhost:5678
```

n8n will prompt you to create an owner account.

> Press `Ctrl+C` to stop the tunnel. Re-run the `port-forward` command to access n8n again later.
> 

---

### Step A7: Verify Everything Is Running

```bash
oc get pods -n $NAMESPACE
```

Expected:

```
NAME                       READY   STATUS    RESTARTS   AGE
n8n-main-7d9f8b-xxxx       1/1     Running   0          3m
```

**Standalone deployment complete.**

---

---

## Part B: Multi-Instance Queue Mode

Multi-instance queue mode runs multiple n8n pods with a shared database, message queue, and object storage. It requires an **n8n Enterprise license**.

Instead of AWS managed services, this guide uses in-cluster equivalents that mirror what you would find in an on-premises or customer OpenShift environment:

| AWS Service | Local Equivalent |
| --- | --- |
| RDS PostgreSQL | PostgreSQL (Bitnami Helm chart) |
| ElastiCache Redis | Redis (Bitnami Helm chart) |
| S3 | MinIO (S3-compatible, Bitnami Helm chart) |

---

### Phase B1: Install In-Cluster Services

### Step B1: Create the Project and Add Bitnami Helm Repo

```bash
oc new-project $NAMESPACE
```

Add the Bitnami chart repository (only needed once):

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

---

### Step B2: Install PostgreSQL

> Replace `YourStrongPassword123` with a suitable complex password
> 

```bash
helm install postgresql bitnami/postgresql \
  --namespace $NAMESPACE \
  --set auth.username=n8n \
  --set auth.password='YourStrongPassword123' \
  --set auth.database=n8n_enterprise \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

> The `global.compatibility.openshift.adaptSecurityContext=auto` flag tells Bitnami to let OpenShift assign the correct user ID automatically (avoids SCC errors).
> 

Save the endpoint  as it is fixed for in-cluster services:

```
postgresql.YOUR_NAMESPACE.svc.cluster.local
```

Replace `YOUR_NAMESPACE` with your actual `$NAMESPACE` value (e.g. `n8n-20260306`).

---

### Step B3: Install Redis

```bash
helm install redis bitnami/redis \
  --namespace $NAMESPACE \
  --set auth.enabled=false \
  --set architecture=standalone \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

Redis endpoint: `redis-master.$NAMESPACE.svc.cluster.local`

---

### Step B4: Install MinIO (S3-Compatible Storage)

> Replace `MinioStringPassword123` with a suitable complex password
> 

```bash
helm install minio bitnami/minio \
  --namespace $NAMESPACE \
  --set auth.rootUser=minioadmin \
  --set auth.rootPassword='MinioStrongPassword123' \
  --set global.compatibility.openshift.adaptSecurityContext=auto \
  --wait
```

MinIO endpoint: `http://minio:9000` (within the same namespace, just the service name works)

---

### Step B5: Create the n8n Storage Bucket in MinIO

MinIO needs a bucket created before n8n can use it. Use the MinIO web console:

**Open the MinIO console:**

```bash
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

---

### Phase B2: Deploy n8n

### Step B6: Grant SCC for n8n

```bash
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n-enterprise
```

Verify: `oc get rolebindings -n $NAMESPACE` should show a binding for `system:openshift:scc:anyuid`.

---

### Step B7: Create Required Secrets

```bash
# Core n8n secrets
oc create secret generic n8n-enterprise-secrets \
  --namespace $NAMESPACE \
  --from-literal=N8N_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  --from-literal=N8N_HOST="localhost" \
  --from-literal=N8N_PORT="5678" \
  --from-literal=N8N_PROTOCOL="http"
```

**Back up the encryption key immediately:**

```bash
oc get secret n8n-enterprise-secrets -n $NAMESPACE \
  -o jsonpath='{.data.N8N_ENCRYPTION_KEY}' | base64 --decode
```

Store that value somewhere safe.

> Replace `YourStrongPassword123` & `MinioStrongPassword123` with the passwords from the earlier steps
> 

```bash
# Database password (must match what you set in Step B2)
oc create secret generic n8n-enterprise-db-secret \
  --namespace $NAMESPACE \
  --from-literal=password='YourStrongPassword123'

# MinIO credentials
oc create secret generic n8n-minio-secret \
  --namespace $NAMESPACE \
  --from-literal=root-password='MinioStrongPassword123'
```

---

### Step B8: Create Your Values File

Create `n8n-multimain-ocp-values.yaml`. Replace the **3 placeholder values** marked `# <-- REPLACE`:

```bash
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

```bash
# Check your namespace value
echo $NAMESPACE

# Replace in the file (this edits it automatically)
sed -i "s/YOUR_NAMESPACE/$NAMESPACE/g" n8n-multimain-ocp-values.yaml
```

Verify the replacements:

```bash
grep "svc.cluster.local" n8n-multimain-ocp-values.yaml
```

Both lines should show your actual namespace name, not `YOUR_NAMESPACE`.

---

### Step B9: Deploy n8n

If you have not already patched the chart in Part A, pull and patch it now:

```bash
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml  # should return nothing
```

Install from the patched chart:

```bash
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-multimain-ocp-values.yaml \
  --wait \
  --timeout 15m
```

---

### Step B10: Create a Route for External Access

In OpenShift, a **Route** exposes a service to the outside world. It is the equivalent of a Kubernetes Ingress or LoadBalancer and  requires no extra controller:

```bash
oc expose svc/n8n-main -n $NAMESPACE
```

Get the URL:

```bash
export ROUTE=$(oc get route n8n-main -n $NAMESPACE -o jsonpath='{.spec.host}')
echo "n8n URL: http://$ROUTE"
```

The URL will look like: `http://n8n-main-n8n-20260306.apps-crc.testing`

---

### Step B11: Update the Host Secret

n8n needs to know its public URL. Update the secret with the Route hostname, then restart the pods:

```bash
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

```bash
oc rollout status deployment/n8n-main -n $NAMESPACE
```

---

### Step B12: Verify All Pods Are Running

```bash
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

Open your browser to the URL printed in Step B10.

**Multi-instance deployment complete.**

---

## Updating n8n

To change configuration or upgrade the chart version, pull and re-patch the new chart version, then upgrade:

```bash
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

---

## Stopping and Resuming CRC

CRC does not need to be deleted between sessions. You can stop and restart it:

```bash
# Stop the cluster (saves state)
crc stop

# Start it again later
crc start
```

After restarting, re-run:

```bash
eval $(crc oc-env)
export NAMESPACE=n8n-YYYYMMDD   # use your original date
oc login -u kubeadmin -p <password> https://api.crc.testing:6443
```

---

## Troubleshooting

### `crc setup` fails with “libvirt not found”

```bash
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients
sudo systemctl start libvirtd
```

Then re-run `crc setup`.

---

### `crc start` fails with “insufficient memory”

CRC requires at least 9 GB of free RAM. Close other applications and try again. If you followed Step 12, CRC is configured to use 14 GB.

---

### n8n pod stuck in `Pending` or never created SCC error

Check events for the error:

```bash
oc get events -n $NAMESPACE --sort-by='.lastTimestamp' | tail -20
```

If you see `unable to validate against any security context constraint` or `seccomp may not be set`, the chart’s hardcoded `seccompProfile: RuntimeDefault` is being rejected. OpenShift 4.14+ converts this to a deprecated alpha annotation that admission rejects even when `anyuid` SCC is granted.

**1. Grant anyuid using the explicit form** (the `-z` shorthand can silently fail):

```bash
# For standalone
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n

# For multi-instance
oc adm policy add-scc-to-user anyuid \
  system:serviceaccount:$NAMESPACE:n8n-enterprise
```

Verify: `oc get rolebindings -n $NAMESPACE` you should see a binding for `system:openshift:scc:anyuid`.

**2. Pull the chart locally and remove the `seccompProfile` lines:**

```bash
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 1.0.3 --untar
sed -i '/seccompProfile:/d; /type: RuntimeDefault/d' ~/n8n/templates/deployment-main.yaml

# Confirm they're gone (should return no output)
grep -n "seccomp\|RuntimeDefault" ~/n8n/templates/deployment-main.yaml
```

**3. Uninstall and reinstall from the patched chart:**

```bash
helm uninstall n8n -n $NAMESPACE
helm install n8n ~/n8n/ \
  --namespace $NAMESPACE \
  --values n8n-standalone-values.yaml \
  --wait \
  --timeout 10m
```

---

### Route URL returns “Application not available”

The pods may still be starting. Check:

```bash
oc get pods -n $NAMESPACE
oc rollout status deployment/n8n-main -n $NAMESPACE
```

Also confirm the Route exists:

```bash
oc get route -n $NAMESPACE
```

---

### n8n pod stuck in `Pending` with `Insufficient memory`

The CRC node doesn’t have enough free memory to schedule the pod.

**Fix:** Increase CRC’s VM memory and restart:

```bash
crc stop
crc config set memory 14336
crc start
```

After CRC restarts, the pod should schedule automatically. If the pod is still pending after a few minutes, delete it to force a reschedule:

```bash
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

---

### DNS not resolving `.apps-crc.testing` or `api.crc.testing`

On Ubuntu, CRC configures DNS automatically. If it fails, restart NetworkManager:

```bash
sudo systemctl restart NetworkManager
```

If still broken, add entries manually (CRC routes traffic through `127.0.0.1`):

```bash
sudo tee -a /etc/hosts <<EOF
127.0.0.1 api.crc.testing
127.0.0.1 console-openshift-console.apps-crc.testing
127.0.0.1 oauth-openshift.apps-crc.testing
127.0.0.1 default-route-openshift-image-registry.apps-crc.testing
EOF
```

> When you expose Routes in Part B, new `*.apps-crc.testing` subdomains are created. Add them to `/etc/hosts` pointing to `127.0.0.1` if your browser can’t reach them.
> 

---

### n8n pod crashes with `EACCES: permission denied` writing to `/home/node/.n8n/`

This means the pod is running as a random OpenShift-assigned UID instead of UID 1000 (the `node` user the n8n image expects). It happens when `securityContext.enabled: false` is set in values without `runAsUser: 1000` and `fsGroup: 1000`, OpenShift assigns a random UID that can’t write to the PVC.

**Fix:** Ensure `securityContext.enabled: true` is set in your values file, and that the chart has been patched to remove `seccompProfile` (see the SCC error section above). Both are required together.

---

### View pod logs

```bash
# Main process
oc logs -n $NAMESPACE -l app.kubernetes.io/component=main --tail=50

# Workers
oc logs -n $NAMESPACE -l app.kubernetes.io/component=worker --tail=50

# Webhook processors
oc logs -n $NAMESPACE -l app.kubernetes.io/component=webhook-processor --tail=50
```

---

### All events in the namespace

```bash
oc get events -n $NAMESPACE --sort-by='.lastTimestamp'
```

---

## Quick Reference

### Re-export variables after reopening terminal

```bash
eval $(crc oc-env)
export NAMESPACE=n8n-YYYYMMDD   # use the date from your original deployment
oc login -u kubeadmin -p <password> https://api.crc.testing:6443
```

### Check cluster status

```bash
crc status
```

### Open the OpenShift web console

```bash
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