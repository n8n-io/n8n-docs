---
description: See what's new in n8n Helm chart 2.0, and upgrade a chart 1.x release to it, which moves n8n from 2.x to 3.0.
layout:
  description:
    visible: false
---

# Helm chart 2.0

Helm chart 2.0 is the version of the official n8n Helm chart that installs n8n 3.0. This page lists what's new, and shows how to upgrade a chart 1.x release.

Chart 2.x installs n8n 3.x, and chart 1.x stays on n8n 2.x. For a new installation, see [Install with Helm](../install-with-helm.md).

{% hint style="warning" %}
**Helm chart 2.0 is a release candidate**

Chart 2.0 isn't final yet, so the commands on this page use the release candidate `2.0.0-rc.2`, which still installs n8n 2.x. Use it to rehearse the upgrade on a test release, and wait for the final 2.0.0 before you upgrade production.

Chart 1.x stays supported. The [`release/n8n-2.x` branch](https://github.com/n8n-io/n8n-hosting/tree/release/n8n-2.x/charts/n8n) of the chart's repository holds the 1.x chart and its README.
{% endhint %}

For every change in chart 2.0, see these files in the chart's repository:

* [Changelog](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/CHANGELOG.md): every change in each chart release, including the breaking changes.
* [Upgrade guide](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md): each changed values key with its replacement, and the changes by topic.
* [Chart releases](https://github.com/n8n-io/n8n-hosting/releases): the n8n version each chart release installs.

## What's new in Helm chart 2.0

Chart 2.0 brings n8n 3.0 to Kubernetes, and makes n8n safer to run and simpler to configure.

The main changes are:

* **n8n 3.0:** the chart installs n8n 3.0 by default. See [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes) for what changes in n8n itself.
* **Task runners on by default:** worker pods, or the main pod in standalone mode, run a task runner sidecar that executes Code node code away from the n8n process. The sidecar needs a token in your core Secret.
* **Environment variables as maps:** the `env.shared`, `env.main`, `env.worker`, `env.webhookProcessor`, and `env.taskRunner` maps replace the `extraEnv` lists. Maps merge across values files, so an overlay file only sets the variables it changes.
* **Strict values checks:** the chart rejects values keys it doesn't know, so a misspelled key stops the installation instead of passing unnoticed. Keys that chart 2.0 retired fail with an error that names the replacement.
* **Gateway API and a separate webhook host:** the chart can attach n8n to a Gateway with an `HTTPRoute`, and can serve webhooks on a host of their own. It sets n8n's public URLs and proxy settings from the hosts it routes.
* **Binary data in S3:** with `s3.enabled: true`, n8n stores binary data in the bucket instead of on each pod's disk.
* **Tighter pod defaults:** n8n's pods no longer get a Kubernetes API token, a Role, or service link variables unless you turn them on.
* **A values migration script:** `scripts/migrate-values.sh` in the chart converts a chart 1.x values file to chart 2.0, and reports what it changed.

## Upgrade from Helm chart 1.x to 2.0

To upgrade a release from chart 1.x to 2.0, prepare n8n for 3.0, migrate your values file with the chart's script, then upgrade the release. The sections that follow are the steps, in order.

{% hint style="warning" %}
**The upgrade to n8n 3.0 is one way**

n8n 3.0 changes the database on its first start, and n8n 2.x can't run on the changed database. The only way back is to restore a database backup from before the upgrade.
{% endhint %}

The commands on this page assume a release named `n8n` in the namespace `n8n`, a core Secret named `n8n-core-secrets`, and a values file named `values.yaml`. If yours have other names, replace them in each command. The chart names its resources after the release, so for a release named `prod`, the main Deployment is `prod-n8n-main`.

## Prepare your release for n8n 3.0

1. Update n8n to the latest 2.x version, and fix the issues in the migration report. As an instance owner or admin, open it in n8n at **Settings > Migration Report**. Fix the issues marked **Upgrade blocked** and **Executions will fail** first. Newer 2.x versions check more of the changes in n8n 3.0, so update before you read the report. For details, see [n8n 3.0 migration tool](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-migration-tool).
2. Find your current values file. If you no longer have it, export the values you set:

    ```bash
    helm get values n8n --namespace n8n --output yaml > values.yaml
    ```

    Check whether the file sets `image.tag`, `image.digest`, or the same keys under `taskRunners.image`. These pin the n8n version, so the upgrade would keep n8n 2.x. Remove them, or set them to the n8n 3.x version you want.

3. Plan a maintenance window, and back up the database, the encryption key, and the persistent volume if you use one. During the upgrade, n8n can be unavailable for a short time. For SQLite, stop n8n or snapshot the volume first, because a copy taken while n8n writes to the file can be incomplete. See [Back up and restore](../../keep-n8n-running/backup-and-restore.md).

## Migrate the values file to Helm chart 2.0

The chart includes a script that migrates a chart 1.x values file. It renames or removes the values keys that chart 2.0 retired, turns the `extraEnv` lists into `env` maps, and removes environment variables that n8n 3.0 no longer reads. The script needs [`yq`](https://github.com/mikefarah/yq) version 4.

Download the chart, and run the script on your values file:

```bash
helm pull oci://ghcr.io/n8n-io/n8n-helm-chart/n8n --version 2.0.0-rc.2 --untar
bash n8n/scripts/migrate-values.sh values.yaml > values-2.0.yaml
```

The script writes the new values to `values-2.0.yaml`, and prints a report like this one:

```
Changed:
  - Moved config.extraEnv to env.shared: N8N_RUNNERS_ENABLED, N8N_METRICS.
  - Removed env.shared.N8N_RUNNERS_ENABLED. n8n 3.0 no longer reads it.
  - Moved executions.concurrency.productionLimit to env.worker.N8N_CONCURRENCY_PRODUCTION_LIMIT.
  - Removed database.useExternal. database.type chooses the database. Your connection settings stay as they are.
Check:
  - Task runners are on by default in 2.0 and need a token. Add N8N_RUNNERS_AUTH_TOKEN to the Secret n8n-core-secrets.
Review the output before you upgrade. Then render it with helm template.
```

Review the new file, and work through each line under `Check`. The script has these limits:

* It reads one plain YAML file. If you layer several values files, merge them into one first. It doesn't read `.gotmpl` template files, or values that Argo CD or another tool generates from templates.
* It can't see inside Secrets or ConfigMaps, including the ones you load with `envFrom`. Change their contents yourself.
* If you set `executions.concurrency.productionLimit: 0`, the script turns it into `N8N_CONCURRENCY_PRODUCTION_LIMIT: 0` and removes `queueMode.workerConcurrency`. Chart 1.x ignored a limit of `0`, so remove the variable, and put your `workerConcurrency` back.

Then render the chart with the new values file. The render reports every retired key that's left, with its replacement. Change `values-2.0.yaml` until the render passes:

```bash
helm template n8n ./n8n --namespace n8n --values values-2.0.yaml > /dev/null
```

## Add the task runner token for Helm chart 2.0

Chart 2.0 runs task runners by default, and the runner sidecar needs a token to connect to n8n. Pods that run the sidecar don't start without it. Skip this section if you set `taskRunners.enabled: false`, or if `taskRunners.authToken.existingSecret` already names a Secret with the token.

If you use your own core Secret through `secretRefs.existingSecret`, the render can't see inside it, so check it yourself. The output lists the keys without their values:

```bash
kubectl describe secret n8n-core-secrets --namespace n8n
```

If `N8N_RUNNERS_AUTH_TOKEN` is missing, add it:

```bash
kubectl patch secret n8n-core-secrets --namespace n8n --type merge --patch-file /dev/stdin <<EOF
{"stringData":{"N8N_RUNNERS_AUTH_TOKEN":"$(openssl rand -base64 32)"}}
EOF
```

If a tool such as an external secrets operator manages the Secret, add the key there instead, or the tool removes it again. Don't reuse the Secret ending in `-task-runners` that chart 1.x created, because Helm deletes it during the upgrade.

If the chart creates the core Secret for you, set `secretRefs.env.N8N_RUNNERS_AUTH_TOKEN` in `values-2.0.yaml` instead. The render fails until you do.

## Check the changes Helm can't catch

The render fails on retired keys, but some changes pass it and still change how n8n behaves. 

A full table of changes that may apply to you are available in the [Which sections apply to you](https://github.com/n8n-io/n8n-hosting/blob/main/charts/n8n/UPGRADING.md#which-sections-apply-to-you) section of the chart's upgrade guide.

The changes that will affect most users are:

| If you use | Check |
| --- | --- |
| A core Secret with `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` | n8n no longer reads these keys. Without an Ingress or route, set `editor.url`, or n8n shows webhook and OAuth URLs on `localhost`. Keep the keys until you no longer need to roll back, because chart 1.x pods can't start without them. |
| `extraEnv` values with `$(VAR)` references | The values now reach n8n through ConfigMaps, where Kubernetes doesn't expand references. Write each value in full. |
| ConfigMaps or Secrets loaded with `envFrom` | Their keys now override the values in the chart's ConfigMaps. In chart 1.x, the chart's values won. Check that they hold only the keys you mean to set. |
| `s3.enabled: true` | n8n now stores binary data in the bucket instead of on each pod's disk. This needs a Business or Enterprise license, so the chart also requires `license.enabled: true`. |
| Webhook processors and an Ingress | The chart now creates a second Ingress for webhook paths. Controllers that create a load balancer for each Ingress, such as the AWS Load Balancer Controller, create a second one. To share one, set the same group annotation in `ingress.annotations` and `ingress.webhook.annotations`. |
| An Ingress or `HTTPRoute` | n8n now sees client IP addresses instead of the proxy's. Check the IP allowlists on Webhook nodes. |
| `podSecurityContext.<role>` blocks | They now merge over `podSecurityContext.shared` instead of replacing it. To remove a default, such as a fixed user ID on OpenShift, set it to `null`. |
| `networkPolicy.enabled: true` | Without `networkPolicy.egress` rules, the policy now allows all outgoing traffic. Rules you set now take effect and replace the chart's rules. |
| Containers you add with `extraContainers` | n8n's pods no longer get a Kubernetes API token, a Role, or service link variables. If a container needs them, set `serviceAccount.automountServiceAccountToken`, `rbac.create`, or `enableServiceLinks` to `true`. |
| Code nodes that run longer than a minute | n8n 3.0 stops JavaScript tasks after 60 seconds instead of 300. To keep 300, set `N8N_RUNNERS_TASK_TIMEOUT: 300` in both `env.shared` and `env.taskRunner`, because n8n and the runner each apply it. |
| `persistence.enabled: true` | The main pod now stops before its replacement starts, so each upgrade has a short outage. If you installed with Helm 4, the first upgrade can fail with `spec.strategy.rollingUpdate: Forbidden`. Run that upgrade once with `--server-side=false`. |


## Upgrade the release to Helm chart 2.0

Upgrade the release with the chart you downloaded and your new values file:

```bash
helm upgrade n8n ./n8n --namespace n8n --values values-2.0.yaml
```

Pass the values file with `--values` instead of using `--reuse-values`. `--reuse-values` keeps the chart 1.x defaults, and chart 2.0 rejects some of them.

## Check the upgrade to Helm chart 2.0

1. Wait until every n8n Deployment finishes its rollout, then run the chart's test:

    ```bash
    kubectl rollout status deployment --namespace n8n \
    	--selector app.kubernetes.io/instance=n8n
    helm test n8n --namespace n8n
    ```

2. Open a Webhook node, and check that its URL uses your public address, not `localhost`.
3. Run a workflow with a Code node. This checks the task runner and its token.

If the main pod doesn't become ready and its logs mention both `binaryData` and `storage`, n8n found two storage directories. On its first start, n8n 3.0 renames `/home/node/.n8n/binaryData` to `/home/node/.n8n/storage`, and it doesn't start if both exist. This is uncommon with the chart, because the chart mounts the whole `/home/node/.n8n` directory. The migration report flags this as **Both storage directories exist**, and explains how to fix it.

## Roll back to Helm chart 1.x

`helm rollback` restores the chart 1.x resources and n8n 2.x, but not the database. n8n 2.x can't run on a database that n8n 3.0 changed, so restore your backup before n8n starts again.

If you removed `N8N_HOST`, `N8N_PORT`, and `N8N_PROTOCOL` from your core Secret, add them back first. Chart 1.x pods can't start without them.

1. If you use KEDA, pause each ScaledObject, and hold its pods at zero. Otherwise KEDA starts the workers and webhook processors again while you restore the backup. List the ScaledObjects, then run the second command for each one, replacing `<scaledobject-name>`:

    ```bash
    kubectl get scaledobject --namespace n8n
    kubectl annotate scaledobject <scaledobject-name> --namespace n8n \
    	autoscaling.keda.sh/paused=true autoscaling.keda.sh/paused-replicas=0
    ```

2. Stop n8n by scaling every n8n Deployment to zero, and check that no n8n pods run before you continue:

    ```bash
    kubectl scale deployment --namespace n8n \
    	--selector app.kubernetes.io/instance=n8n --replicas=0
    kubectl get pods --namespace n8n --selector app.kubernetes.io/instance=n8n
    ```

3. Restore the database and volume backups you took before the upgrade.
4. Find the last revision of the release that used chart 1.x, and roll back to it. The `CHART` column shows the chart version. Replace `<revision>` with the revision number:

    ```bash
    helm history n8n --namespace n8n
    helm rollback n8n <revision> --namespace n8n
    ```

5. If you paused KEDA in step 1, remove the annotations from each ScaledObject, because the rollback keeps annotations you added by hand. Then check that every n8n Deployment runs again:

    ```bash
    kubectl annotate scaledobject <scaledobject-name> --namespace n8n \
    	autoscaling.keda.sh/paused- autoscaling.keda.sh/paused-replicas-
    kubectl get deployments --namespace n8n --selector app.kubernetes.io/instance=n8n
    ```

    The rollback starts the Deployments that have a fixed replica count, and KEDA starts the ones it manages once you remove the annotations. A Deployment that a `HorizontalPodAutoscaler` manages stays at zero, because an autoscaler doesn't scale up from zero. Scale each one back to the minimum replica count in your chart 1.x values file. For example, for workers with a minimum of two:

    ```bash
    kubectl scale deployment n8n-worker --namespace n8n --replicas=2
    ```

## Related resources

* [Install with Helm](../install-with-helm.md)
* [Update self-hosted n8n](../../keep-n8n-running/update-n8n.md)
* [Back up and restore](../../keep-n8n-running/backup-and-restore.md)
* [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes)
