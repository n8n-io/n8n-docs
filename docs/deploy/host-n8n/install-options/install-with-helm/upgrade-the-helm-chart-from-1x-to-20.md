---
description: Upgrade an existing n8n Helm chart 1.x release to chart 2.0, which moves n8n from 2.x to 3.0.
layout:
  description:
    visible: false
---

# Upgrade the Helm chart from 1.x to 2.0

To upgrade an n8n release from Helm chart 1.x to 2.0, update your values file until it renders against chart 2.0, then run `helm upgrade`.

Chart 2.0 changes values keys and defaults, and moves n8n from 2.x to 3.0. Before you upgrade, read the [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes) and the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

This page covers moving an existing chart 1.x release to chart 2.0. For a new installation, and for upgrades within chart 2.x, see [Install with Helm](../install-with-helm.md).

The commands on this page use the release name `n8n`, as in `helm install n8n`. If your release has another name, the Deployments, PersistentVolumeClaim, and label values change to match. Replace `<your-namespace>` with the namespace of your n8n release.

## Upgrade steps for Helm chart 2.0

To upgrade from chart 1.x to 2.0:

1. Take a full backup of the database, the encryption key, and the persistent volume if you use one.
2. Render your values file against chart 2.0, as shown in [Install the Helm chart](../install-with-helm.md#install-the-helm-chart). The render fails on every values key that 2.0 retired and names its replacement. Change your values file until the render passes.
3. If you use `secretRefs.existingSecret` and task runners, add `N8N_RUNNERS_AUTH_TOKEN` to that Secret, unless you already set `taskRunners.authToken.existingSecret`. The chart can't see inside the Secret, so the render passes without the token, but the pods don't start. Don't point `taskRunners.authToken.existingSecret` at the Secret that chart 1.x generated, ending in `-task-runners`. Helm removes it during the upgrade.
4. Read [Chart 2.0 changes the render doesn't catch](#chart-20-changes-the-render-doesnt-catch), and adjust your setup.
5. Run `helm upgrade` with your values file, as shown in [Upgrade the Helm chart](../install-with-helm.md#upgrade-the-helm-chart).

To add the task runner token to an existing core Secret, replace `<your-core-secret>` with the name you set in `secretRefs.existingSecret`:

```bash
kubectl patch secret <your-core-secret> --namespace <your-namespace> --type merge --patch-file /dev/stdin <<EOF
{"stringData":{"N8N_RUNNERS_AUTH_TOKEN":"$(openssl rand -base64 32)"}}
EOF
```

## Values that change in Helm chart 2.0

When you render chart 2.0 with a chart 1.x values file, the render fails on each retired key. The most common changes are:

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
| `queueMode.workerConcurrency` together with a positive `executions.concurrency.productionLimit` | Remove one. With both set, n8n already ran workers at `productionLimit`, so to keep your current concurrency, remove `workerConcurrency`. |

## Chart 2.0 changes the render doesn't catch

Some chart 2.0 changes don't fail the render. Check each one before you upgrade from chart 1.x:

* **Public URLs:** a core Secret that still holds `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` still works, but n8n no longer receives them. If n8n built its URLs from them, set `editor.url`. Otherwise n8n shows webhook and OAuth callback URLs on `localhost`.
* **Keys for rollback:** keep `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` in your core Secret until you no longer need to roll back to chart 1.x. Chart 1.x main and webhook processor pods can't start without them, including old pods that restart while the upgrade is in progress. A Helm rollback doesn't restore a Secret that you manage yourself.
* **Mixed versions during the upgrade:** during rolling updates, old and new pods run side by side until the rollout finishes. An old pod that restarts in this window can fail to start, because chart 2.0 removes ConfigMap keys and a Secret it reads. Upgrade in a low-traffic window, and avoid node drains until every n8n Deployment finishes its rollout. Helm can report `deployed` before the rollout finishes. Check each Deployment, for example `kubectl rollout status deployment/n8n-main` and `kubectl rollout status deployment/n8n-worker`.
* **`$(VAR)` references:** literal values from `env` maps reach the pods through ConfigMaps, where Kubernetes doesn't expand `$(VAR)` references. A value such as `$(HTTP_PROXY)` that worked in an `extraEnv` list now arrives as that literal text.
* **Task runners:** each worker pod, or the main pod in standalone mode, gains a task runner sidecar. To keep running code inside the n8n process, set `taskRunners.enabled: false`.
* **Storage directory:** on first start, n8n 3.0 renames `/home/node/.n8n/binaryData` to `/home/node/.n8n/storage`. See [Move binary data to the storage directory](#move-binary-data-to-the-storage-directory).
* **Restarts:** every pod restarts once during the upgrade. With persistence on a `ReadWriteOnce` volume, the main pod uses the `Recreate` strategy, so the upgrade has a short outage.
* **Helm 4:** if you installed the 1.x release with Helm 4, the first upgrade can fail with `spec.strategy.rollingUpdate: Forbidden`. Run that upgrade once with `--server-side=false`.
* **Environment variable precedence:** ConfigMaps and Secrets you load with `envFrom` now override the values in the chart's ConfigMaps. In 1.x, the chart's variables won. Variables the chart reads from a Secret, such as the encryption key, still win. Check that they hold only the keys you mean to set.
* **Security contexts:** a `podSecurityContext.<role>` block now merges over `podSecurityContext.shared` instead of replacing it. To remove a default field, such as a pinned user ID on OpenShift, set it to `null`.
* **Network policy:** with `networkPolicy.enabled: true` and no `networkPolicy.egress` rules, the policy now allows all egress. Rules you set in `networkPolicy.ingress` or `networkPolicy.egress` now take effect and replace the chart's rules.
* **Kubernetes access:** by default, the chart no longer creates a Role or mounts a service account token in n8n's pods, because n8n doesn't call the Kubernetes API. If a container you add needs the API, set `serviceAccount.automountServiceAccountToken: true` to mount the token. If it also needs to read ConfigMaps and Secrets, set `rbac.create: true` to grant that access.

For the full list, including S3 binary data, security contexts, and webhook URLs, see the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

## Move binary data to the storage directory

On first start, n8n 3.0 renames `/home/node/.n8n/binaryData` to `/home/node/.n8n/storage`. n8n 3.0 also removes `N8N_MIGRATE_FS_STORAGE_PATH`. With `persistence.enabled: true`, the chart mounts the whole `/home/node/.n8n` directory, so the rename needs no change to your values.

If you mount a volume directly at `/home/node/.n8n/binaryData`, for example with `extraVolumes` and `extraVolumeMounts`, mount it at `/home/node/.n8n/storage` instead. To keep the old path, set `N8N_STORAGE_PATH` to it in `env.shared`.

If both `binaryData` and `storage` exist, n8n doesn't start. To move the data on the chart's PersistentVolumeClaim:

1. Stop the main Deployment, so the volume is free:

    ```bash
    kubectl scale deployment/n8n-main --replicas=0 --namespace <your-namespace>
    ```

2. Save this Pod manifest as `n8n-storage-fix.yaml`. It mounts the claim with the same user and group as n8n:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: n8n-storage-fix
    spec:
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        runAsNonRoot: true
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: shell
          image: busybox:1.36
          command: ["sleep", "3600"]
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - name: data
              mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: n8n
    ```

3. Start the Pod, move the contents of `binaryData` into `storage`, and remove `binaryData`:

    ```bash
    kubectl apply -f n8n-storage-fix.yaml --namespace <your-namespace>
    kubectl wait pod/n8n-storage-fix --for=condition=Ready --namespace <your-namespace>
    kubectl exec n8n-storage-fix --namespace <your-namespace> -- \
    	sh -c 'cp -a /data/binaryData/. /data/storage/ && rm -rf /data/binaryData'
    ```

4. Delete the Pod, and start the main Deployment again:

    ```bash
    kubectl delete pod/n8n-storage-fix --namespace <your-namespace>
    kubectl scale deployment/n8n-main --replicas=1 --namespace <your-namespace>
    ```

## Roll back from Helm chart 2.0 to 1.x

A Helm rollback doesn't reverse the database migrations that n8n 3.0 ran. To roll back to chart 1.x after n8n 3.0 has started:

1. If you removed `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` from your core Secret, add them back. Chart 1.x main and webhook processor pods can't start without them.
2. Stop n8n by scaling every n8n Deployment to zero:

    ```bash
    kubectl scale deployment --selector app.kubernetes.io/instance=n8n --replicas=0 --namespace <your-namespace>
    ```

    If KEDA or a HorizontalPodAutoscaler scales your Deployments, it can start pods again. Check with `kubectl get pods --namespace <your-namespace>` that no n8n pods run before you continue.

3. Restore the database and persistent volume backups you took before the upgrade.
4. Find the last chart 1.x revision of the release in the `CHART` column:

    ```bash
    helm history n8n --namespace <your-namespace>
    ```

5. Roll back to that revision. This restores the chart 1.x manifests and the n8n 2.x version they install:

    ```bash
    helm rollback n8n <revision> --namespace <your-namespace>
    ```

6. Check that every n8n Deployment runs again with `kubectl get deployments --namespace <your-namespace>`. Scale any Deployment that stays at zero replicas with `kubectl scale`.

## Related resources

* [Install with Helm](../install-with-helm.md)
* [Update self-hosted n8n](../../keep-n8n-running/update-n8n.md)
* [Back up and restore](../../keep-n8n-running/backup-and-restore.md)
* [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes)
