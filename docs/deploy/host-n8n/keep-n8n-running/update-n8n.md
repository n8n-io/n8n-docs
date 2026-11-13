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
* [Installed with Helm](../install-options/install-with-helm.md#upgrade-the-helm-chart)

## Update an instance in queue mode

In [queue mode](../configure-n8n/scaling/enable-queue-mode.md), main processes, workers, and optional webhook processors share one database. Update them as one coordinated change, and plan how you'd roll back before you start.

### Before you update an instance in queue mode

* Take a [full backup](backup-and-restore.md), including the database and the encryption key. If n8n can't revert a migration that the update applies, you need this backup to return to the previous version.
* Note the newest migration in the `migrations` table of your database, so you know where to stop if you roll back. For example, with no table prefix, run `SELECT name FROM migrations ORDER BY id DESC LIMIT 1;`. If n8n uses a table prefix (`DB_TABLE_PREFIX`), replace `migrations` with the prefixed table name. If n8n uses a custom schema (`DB_POSTGRESDB_SCHEMA`), add the schema name, for example `<schema-name>.migrations`. Either setting can also come from its `_FILE` variable, such as `DB_POSTGRESDB_SCHEMA_FILE`.
* Read the [release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/release-notes) for every version after your current one, up to and including the target version.
* If you deploy with the [n8n Helm chart](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n), check whether the target n8n version needs a newer chart version. The chart has its own version number, separate from the n8n version it deploys.

### Run the same n8n version on every process

Run the same n8n version on all main processes, workers, and any webhook processors. Pin a specific image tag, for example `n8nio/n8n:<n8n-version>`, and use it for every process instead of `latest`.

If you run [task runners in external mode](../configure-n8n/set-up-task-runners.md#setting-up-external-mode), the `n8nio/runners` image version must match the `n8nio/n8n` image version. Update both together.

If you plan to turn on webhook response offloading as part of the update, upgrade every main process and webhook processor first. Then set `N8N_WEBHOOK_RESPONSE_RELAY_OFFLOAD_ENABLED` on your workers. Refer to [Turn on offloading during an upgrade](../configure-n8n/scaling/enable-queue-mode.md#turn-on-offloading-during-an-upgrade) for details.

### How n8n runs database migrations during an update

Each main, worker, or webhook process checks for and runs pending database migrations when it starts.

On PostgreSQL, migration locking is available from n8n 2.33.0. One process takes an advisory lock and runs all pending migrations in a single transaction. Other processes wait for the lock, then find no pending migrations.

The lock only serializes migrations at startup. It doesn't guarantee that processes on different n8n versions work together, or that you can update without downtime.

### Roll back an update in queue mode

Changing the image tag or Helm release back to the older version doesn't reverse database migrations. To roll back:

1. Stop every n8n process: main processes, workers, any webhook processors, and external task runners.
2. Return the database to its state before the update, in one of two ways:
	* **Revert the migrations the update applied.** You need the newest migration you noted before updating. If you didn't note it, restore the backup instead.
		1. Check the `migrations` table in your database. It lists the migrations n8n has run. If n8n uses a table prefix, the table name starts with that prefix. If n8n uses a custom schema, the table is in that schema. If the newest migration is the one you noted before updating, stop reverting and go to the next rollback step.
		2. Keep every other n8n process stopped. Run `n8n db:revert` with the newer n8n version and your existing database configuration, for example as a one-off container from the newer image. Each run reverts only the most recent migration.
		3. Check the output of the command:
			* If the output starts with `Cancelled command`, or says n8n couldn't find the migration's code, n8n didn't revert the migration. `n8n db:revert` exits with status 0 in these cases, so you can't rely on the exit status.
			* If the output shows `Error reverting last migration`, the command failed and exits with a non-zero status. Fix the error before you repeat the step.
			* Otherwise, n8n reverted one migration.
		4. Repeat from step 1.

		If n8n can't revert one of the migrations, restore the backup instead. Reverting a migration changes the database structure back, but it doesn't always bring back data the migration removed.
	* **Restore the database from the backup** you took before updating. This discards any changes made after the backup. Keep every n8n process stopped while you restore, and don't start n8n at the end of the restore steps. Refer to [Restore the full instance](backup-and-restore.md#restore-the-full-instance).
3. After the database is back in its state before the update, start every process with the older n8n version. If you run external task runners, return them to the matching older `n8nio/runners` version too.

## Related resources

* [Keep n8n running](./)
* [Set up logging](set-up-logging.md)
* [Monitor n8n](monitor-n8n.md)
* [Visualize metrics with Grafana](visualize-metrics-with-grafana.md)
* [Back up and restore](backup-and-restore.md)
* [Trace executions with OpenTelemetry](trace-executions-with-opentelemetry.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
