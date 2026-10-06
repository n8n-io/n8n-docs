---
description: Best practices for updating your self-hosted n8n
title: Update self-hosted n8n
contentType: explanation
tags:
  - update npm
  - update docker
hide:
  - tags
nodeTitle: Update n8n
originalFilePath: hosting/installation/updating.md
originalUrl: 'https://docs.n8n.io/hosting/installation/updating'
url: 'https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/update-n8n'
layout:
  description:
    visible: false
---

# Update self-hosted n8n <a href="#update-self-hosted-n8n" id="update-self-hosted-n8n"></a>

Keep your n8n version up to date to get the latest features and fixes.

Some tips when updating:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/1Q2X3RjU5o2jnRfcKzuN/" %}

For instructions on how to update, refer to the documentation for your installation method:

* [Installed with npm](../install-options/install-with-npm.md#updating)
* [Installed with Docker or Docker Compose](../install-options/install-with-docker.md#updating)

## Update an instance in queue mode

In [queue mode](../configure-n8n/scaling/enable-queue-mode.md), main processes, workers, and optional webhook processors share one database. Update them as one coordinated change, and plan how you'd roll back before you start.

### Before you update an instance in queue mode

* Take a [full backup](backup-and-restore.md), including the database and the encryption key. If n8n can't revert a migration that the update applies, you need this backup to return to the previous version.
* Read the [release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/release-notes) for every version after your current one, up to and including the target version.
* If you deploy with the [n8n Helm chart](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n), check whether the target n8n version needs a newer chart version. The chart has its own version number, separate from the n8n version it deploys.

### Run the same n8n version on every process

Run the same n8n version on all main processes, workers, and any webhook processors. Pin a specific image tag, for example `n8nio/n8n:<n8n-version>`, and use it for every process instead of `latest`.

If you run [task runners in external mode](../configure-n8n/set-up-task-runners.md#setting-up-external-mode), the `n8nio/runners` image version must match the `n8nio/n8n` image version. Update both together.

### How n8n runs database migrations during an update

Each main, worker, or webhook process checks for and runs pending database migrations when it starts.

On PostgreSQL, migration locking is available from n8n 2.33.0. One process takes an advisory lock and runs all pending migrations in a single transaction. Other processes wait for the lock, then find no pending migrations.

The lock only serializes migrations at startup. It doesn't guarantee that processes on different n8n versions work together, or that you can update without downtime.

### Roll back an update in queue mode

Changing the image tag or Helm release back to the older version doesn't reverse database migrations. To roll back:

1. Stop every n8n process: main processes, workers, any webhook processors, and external task runners.
2. Return the database to its state before the update, in one of two ways:
	* Revert the migrations the update applied. Run `n8n db:revert` with the newer n8n version and your existing database configuration, for example as a one-off container from the newer image. Keep the other processes stopped. Each run reverts the most recent migration only. The `migrations` table in your database lists the migrations n8n has run. If you set `DB_TABLE_PREFIX`, the table name starts with that prefix. Repeat the command once for each migration the update applied, and stop when the newest migration in the table is one from before the update. If you can't tell which migrations the update applied, or n8n can't revert one of them, restore the backup instead.
	* Restore the database from the backup you took before updating. See [Restore the full instance](backup-and-restore.md#restore-the-full-instance).
3. After the database is back in its state before the update, start every process with the older n8n version. If you run external task runners, return them to the matching older `n8nio/runners` version too.

## Related resources

* [Keep n8n running](./)
* [Set up logging](set-up-logging.md)
* [Monitor n8n](monitor-n8n.md)
* [Visualize metrics with Grafana](visualize-metrics-with-grafana.md)
* [Back up and restore](backup-and-restore.md)
* [Trace executions with OpenTelemetry](trace-executions-with-opentelemetry.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
