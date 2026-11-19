---
description: Upgrade an existing n8n Helm chart 1.x release to chart 2.0, which moves n8n from 2.x to 3.0.
layout:
  description:
    visible: false
---

# Upgrade the Helm chart from 1.x to 2.0

To upgrade an n8n release from Helm chart 1.x to 2.0, prepare n8n for 3.0, migrate your values file with the chart's script, then upgrade the release.

Chart 2.0 renames and removes values keys, changes several defaults, and moves n8n from 2.x to 3.0. n8n 3.0 changes the database on its first start, so the only way back is a database backup. For a new installation, and for upgrades within chart 2.x, see [Install with Helm](../install-with-helm.md).

The commands on this page assume a release named `n8n`. Replace `<your-namespace>` with the namespace of the release. If your release has another name, replace `n8n` in the commands with it. The chart names its resources after the release, so for a release named `prod`, the main Deployment is `prod-n8n-main`.

## Prepare your release for n8n 3.0

1. Update n8n to the latest 2.x version, and fix the issues in the migration report. As an instance owner or admin, open it in n8n at **Settings > Migration Report**, and fix the issues marked **Upgrade blocked** and **Executions will fail** first. Newer 2.x versions check more of the changes in n8n 3.0, so update before you read the report. For details, see [n8n 3.0 migration tool](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-migration-tool) and [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes).
2. Find your current values file, `values.yaml` on this page. If you no longer have it, export the values you set to a new file:

    ```bash
    helm get values n8n --namespace <your-namespace> -o yaml > values.yaml
    ```

    Check whether it sets `image.tag`, `image.digest`, or the same keys under `taskRunners.image`. These pin the n8n version, so the upgrade would keep n8n 2.x. Remove them, or set them to the n8n 3.x version you want.

3. Plan a maintenance window, and back up the database, the encryption key, and the persistent volume if you use one. During the upgrade, old and new pods can run side by side, and n8n can be unavailable for a short time. If you roll back later, you restore this backup, and you lose the changes made since. For SQLite, stop n8n or snapshot the volume first, because a copy taken while n8n writes to the file can be incomplete. See [Back up and restore](../../keep-n8n-running/backup-and-restore.md).

## Migrate the values file to Helm chart 2.0

The chart includes a script that migrates a chart 1.x values file. It renames or removes the values keys that chart 2.0 retired, turns the `extraEnv` lists into `env` maps, and removes environment variables that n8n 3.0 no longer reads. Use the script from the chart version you upgrade to, because it matches that version's values. The script needs [`yq`](https://github.com/mikefarah/yq) version 4.

Download the chart, and run the script on your values file. Replace `<chart-version>` with the version, for example `2.0.0`:

```bash
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version "<chart-version>" --untar
bash n8n/scripts/migrate-values.sh values.yaml > values-2.0.yaml
```

The script writes the new values to `values-2.0.yaml`, and prints a report of what it changed and what you need to check. Review both. The script has these limits:

* It reads one plain YAML file. If you layer several values files, merge them into one first, because a setting in one file can change how the script migrates another.
* It can't see inside Secrets or ConfigMaps, including the ones you load with `envFrom`. Change their contents yourself.
* If you set `executions.concurrency.productionLimit: 0`, the script turns it into `N8N_CONCURRENCY_PRODUCTION_LIMIT: 0` and removes `queueMode.workerConcurrency`. Chart 1.x ignored a limit of `0`, so remove the variable, and put your `workerConcurrency` back.

For every changed key, see the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

## Add the task runner token

Chart 2.0 runs task runners by default, and the runner sidecar needs a token to connect to n8n. Pods that run the sidecar don't start without it. In queue mode, these are the workers. Skip this section if you set `taskRunners.enabled: false`, or if `taskRunners.authToken.existingSecret` already names a Secret with the token.

If the chart creates the core Secret for you, set `secretRefs.env.N8N_RUNNERS_AUTH_TOKEN` in `values-2.0.yaml`. The render fails until you do.

If you use your own core Secret through `secretRefs.existingSecret`, the render can't see inside it, so check it yourself. Replace `<your-core-secret>` with the name of the Secret. The output lists the keys without their values:

```bash
kubectl describe secret <your-core-secret> --namespace <your-namespace>
```

If `N8N_RUNNERS_AUTH_TOKEN` is missing, add it:

```bash
kubectl patch secret <your-core-secret> --namespace <your-namespace> --type merge --patch-file /dev/stdin <<EOF
{"stringData":{"N8N_RUNNERS_AUTH_TOKEN":"$(openssl rand -base64 32)"}}
EOF
```

If a tool such as an external secrets operator manages the Secret, add the key there instead, or the tool removes it again. Don't reuse the Secret ending in `-task-runners` that chart 1.x created, because Helm deletes it during the upgrade.

## Check settings Helm can't verify

The render fails on retired keys, but some changes pass it and still change how n8n behaves. Check the rows that apply to your release:

| If you use | Check |
| --- | --- |
| A core Secret with `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` | n8n no longer reads these keys. Without an Ingress or route, set `editor.url`, or n8n shows webhook and OAuth URLs on `localhost`. Keep the keys until you no longer need to roll back, because chart 1.x pods can't start without them. |
| `extraEnv` values with `$(VAR)` references | The values now reach n8n through ConfigMaps, where Kubernetes doesn't expand references. Write each value in full. |
| ConfigMaps or Secrets loaded with `envFrom` | Their keys now override the values in the chart's ConfigMaps. In 1.x, the chart's values won. Values the chart reads from Secrets, such as the database password, still win. Check that they hold only the keys you mean to set. |
| `s3.enabled: true` | n8n now stores binary data in the bucket instead of on each pod's disk. |
| Webhook processors and an Ingress | The chart now creates a second Ingress for webhook paths. Controllers that create a load balancer for each Ingress, such as the AWS Load Balancer Controller, create a second one. To share one, set the same group annotation in `ingress.annotations` and `ingress.webhook.annotations`. |
| An Ingress or `HTTPRoute` | n8n now sees client IP addresses instead of the proxy's. Check the IP allowlists on Webhook nodes. |
| `podSecurityContext.<role>` blocks | They now merge over `podSecurityContext.shared` instead of replacing it. To remove a default, such as a fixed user ID on OpenShift, set it to `null`. |
| `networkPolicy.enabled: true` | Without `networkPolicy.egress` rules, the policy now allows all outgoing traffic. Rules you set now take effect and replace the chart's rules. |
| Containers you add with `extraContainers` | n8n's pods no longer get a Kubernetes API token, a Role, or service link variables. If a container needs them, set `serviceAccount.automountServiceAccountToken`, `rbac.create`, or `enableServiceLinks` to `true`. |
| Your own `n8n-task-runners.json` | n8n 3.0 needs `--no-experimental-webstorage` in the JavaScript runner's arguments. Add it if it's missing. |
| Code nodes that run longer than a minute | n8n 3.0 stops JavaScript tasks after 60 seconds instead of 300. To keep 300, set `N8N_RUNNERS_TASK_TIMEOUT: 300` in both `env.shared` and `env.taskRunner`, because n8n and the runner each apply it. |
| `persistence.enabled: true`, installed with Helm 4 | The first upgrade can fail with `spec.strategy.rollingUpdate: Forbidden`. Run that upgrade once with `--server-side=false`. |

For the full list, see the chart's [upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md).

## Upgrade the release to Helm chart 2.0

Render the chart you downloaded with your new values file. The render reports every retired key with its replacement. Change `values-2.0.yaml` until the render passes:

```bash
helm template n8n ./n8n --namespace <your-namespace> -f values-2.0.yaml > /dev/null
```

Then upgrade the release with the same chart and values file:

```bash
helm upgrade n8n ./n8n --namespace <your-namespace> -f values-2.0.yaml
```

Pass the values file with `-f` instead of using `--reuse-values`. `--reuse-values` keeps the chart 1.x defaults, and chart 2.0 rejects some of them.

## Check the upgrade to Helm chart 2.0

1. Wait until every n8n Deployment finishes its rollout, then run the chart's test. If main doesn't become ready and its logs mention both `binaryData` and `storage`, follow [Fix the storage directory after the upgrade](#fix-the-storage-directory-after-the-upgrade) first. The test calls the main Service, and an old main pod can answer it before the rollout ends:

    ```bash
    kubectl rollout status deployment --selector app.kubernetes.io/instance=n8n --namespace <your-namespace>
    helm test n8n --namespace <your-namespace>
    ```

2. Open a Webhook node, and check that its URL uses your public address, not `localhost`.
3. Run a workflow with a Code node. This checks the task runner and its token.

## Fix the storage directory after the upgrade

On its first start, n8n 3.0 renames the directory `/home/node/.n8n/binaryData` to `/home/node/.n8n/storage`. With `persistence.enabled: true`, the chart mounts the whole `/home/node/.n8n` directory, so this needs no change. If you mount a volume directly at `binaryData`, mount it at `/home/node/.n8n/storage` instead, or set `N8N_STORAGE_PATH` in `env.shared` to keep the old path.

If both directories exist on the first start, n8n can't tell which one holds your data, and doesn't start. To merge them on the chart's volume, make sure you have a backup of the volume, then:

1. Stop the main Deployment, and wait until Kubernetes deletes its pod, so the volume is free:

    ```bash
    kubectl scale deployment/n8n-main --replicas=0 --namespace <your-namespace>
    kubectl wait pod --for=delete --timeout=120s --namespace <your-namespace> \
    	--selector app.kubernetes.io/instance=n8n,app.kubernetes.io/component=main
    ```

2. Find the name of the volume claim. The chart names its claim like its other resources, for example `n8n` or `prod-n8n`. With `persistence.existingClaim`, it's the claim you set there:

    ```bash
    kubectl get pvc --namespace <your-namespace>
    ```

3. Save this Pod manifest as `n8n-storage-fix.yaml`, and replace `<your-pvc-name>` with the claim name. The Pod needs the same user and group as n8n, so it can change n8n's files. The manifest uses the chart's default, 1000. If you changed the user or group in `podSecurityContext`, use your values. On OpenShift, where the platform assigns them, remove both lines:

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
            claimName: <your-pvc-name>
    ```

4. Start the Pod. Copy the files from `binaryData` into `storage` without overwriting any file there, then compare the two directories. You can ignore `File exists` messages:

    ```bash
    kubectl apply -f n8n-storage-fix.yaml --namespace <your-namespace>
    kubectl wait pod/n8n-storage-fix --for=condition=Ready --namespace <your-namespace>
    kubectl exec n8n-storage-fix --namespace <your-namespace> -- sh -c \
    	'cd /data/binaryData && tar cf - . | (cd /data/storage && tar xkf -); diff -r /data/binaryData /data/storage > /tmp/d; rc=$?; grep -v "^Only in /data/storage" /tmp/d > /tmp/c; if [ "$rc" -gt 1 ]; then echo "Comparison failed."; elif [ -s /tmp/c ]; then cat /tmp/c; else echo "No differences"; fi'
    ```

    If the output ends with `No differences`, `storage` holds every file from `binaryData`. If it lists files, they exist in both directories with different contents. For each one, copy the version you want to keep into `storage`, then run the command again until it prints `No differences`. If it prints `Comparison failed`, fix the error it shows first, for example a file the Pod's user can't read.

5. Remove `binaryData`, delete the Pod, and start the main Deployment again. The first command compares the directories again, and only removes `binaryData` if the comparison succeeds and finds no differences. Use your previous number of main replicas, which is `1` unless you run several main pods:

    ```bash
    kubectl exec n8n-storage-fix --namespace <your-namespace> -- sh -c \
    	'diff -r /data/binaryData /data/storage > /tmp/d; rc=$?; grep -v "^Only in /data/storage" /tmp/d > /tmp/c; if [ "$rc" -gt 1 ]; then echo "Comparison failed. binaryData not removed."; elif [ -s /tmp/c ]; then echo "Differences remain. binaryData not removed."; else rm -rf /data/binaryData && echo "binaryData removed."; fi'
    kubectl delete pod/n8n-storage-fix --namespace <your-namespace>
    kubectl scale deployment/n8n-main --replicas=1 --namespace <your-namespace>
    ```

## Roll back to Helm chart 1.x

`helm rollback` restores the chart 1.x resources and n8n 2.x, but not the database. n8n 2.x can't run on a database that n8n 3.0 changed, so you restore your backup before n8n starts again:

1. If you removed `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` from your core Secret, add them back. Chart 1.x pods can't start without them.
2. If you use KEDA, pause it, and hold the workers and webhook processors at zero. Otherwise KEDA starts them again while you restore the backup. List the ScaledObjects, and pause each one that the `PAUSED` column doesn't show as paused yet, replacing `<scaledobject-name>`. Leave the ones that are already paused unchanged, so you keep their settings:

    ```bash
    kubectl get scaledobject --namespace <your-namespace>
    kubectl annotate scaledobject <scaledobject-name> --namespace <your-namespace> \
    	autoscaling.keda.sh/paused=true autoscaling.keda.sh/paused-replicas=0
    ```

3. Stop n8n by scaling every n8n Deployment to zero. A HorizontalPodAutoscaler doesn't start pods again for a Deployment you scale to zero. Check that no n8n pods run before you continue:

    ```bash
    kubectl scale deployment --selector app.kubernetes.io/instance=n8n --replicas=0 --namespace <your-namespace>
    kubectl get pods --selector app.kubernetes.io/instance=n8n --namespace <your-namespace>
    ```

4. Restore the database and volume backups you took before the upgrade.
5. Find the last revision of the release that used chart 1.x. The `CHART` column shows the chart version:

    ```bash
    helm history n8n --namespace <your-namespace>
    ```

6. Roll back to that revision:

    ```bash
    helm rollback n8n <revision> --namespace <your-namespace>
    ```

7. If you paused KEDA in step 2, resume it. The rollback keeps annotations you added by hand, so remove them from each ScaledObject you paused:

    ```bash
    kubectl annotate scaledobject <scaledobject-name> --namespace <your-namespace> \
    	autoscaling.keda.sh/paused- autoscaling.keda.sh/paused-replicas-
    ```

8. Check that every n8n Deployment runs again:

    ```bash
    kubectl get deployments --selector app.kubernetes.io/instance=n8n --namespace <your-namespace>
    ```

    Scale any Deployment that stays at zero, and that wasn't at zero before the upgrade, back to the count in your chart 1.x values file: `replicaCount` or `multiMain.replicas` for main, `queueMode.workerReplicaCount` for workers, and `webhookProcessor.replicaCount` for webhook processors. Replace `<deployment-name>` and `<replica-count>`:

    ```bash
    kubectl scale deployment/<deployment-name> --replicas=<replica-count> --namespace <your-namespace>
    ```

## Related resources

* [Install with Helm](../install-with-helm.md)
* [Update self-hosted n8n](../../keep-n8n-running/update-n8n.md)
* [Back up and restore](../../keep-n8n-running/backup-and-restore.md)
* [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes)
