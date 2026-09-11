---
description: Back up and restore a self-hosted n8n instance, including what CLI backups contain, what they miss, and how to recover a full instance.
layout:
  description:
    visible: false
---

# Back up and restore

Back up a self-hosted n8n instance so you can recover from data loss, roll back a failed update, or move to a new server. A complete backup includes more than the CLI export commands produce on their own. This page explains what a complete backup contains, what the CLI `--backup` flag exports, and how to restore each kind of backup.

## What a complete backup includes

A complete backup of a self-hosted n8n instance consists of two parts:

* The `.n8n` user folder, `~/.n8n` by default. It contains the `config` file, which stores the encryption key n8n uses to encrypt credentials, and, with the default SQLite database, the database file itself. You can change the folder location with the `N8N_USER_FOLDER` environment variable.
* Your external database, if you use PostgreSQL instead of the default SQLite. Back it up with your database's own tooling. The `.n8n` folder is still part of the backup, because credentials in the database are encrypted with the key it holds.

If you run n8n in Docker, the `.n8n` folder lives in the `n8n_data` volume, mounted at `/home/node/.n8n`. For more information about persistent data in Docker, see [Install with Docker](../install-options/install-with-docker.md).

{% hint style="info" %}
**The encryption key is required to restore credentials**

n8n saves credentials to the database in encrypted form. Without the encryption key from the `config` file, or a custom `N8N_ENCRYPTION_KEY`, a restored database or credential export can't be decrypted. For more information, see [Set a custom encryption key](../configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key.md).
{% endhint %}

n8n recommends taking a full backup before updating. For update procedures, see [Update n8n](update-n8n.md).

## Back up workflows and credentials with the CLI

You can export workflows and credentials to JSON files using the [Server CLI](../configure-n8n/use-the-command-line.md):

```bash
n8n export:workflow --backup --output=backups/workflows/
n8n export:credentials --backup --output=backups/credentials/
```

The `--backup` flag sets `--all --pretty --separate`, so each workflow and credential is written as a separate, readable JSON file.

Use a different output directory for each command. `import:credentials --separate` currently fails when the input directory also contains workflow files. This is a [known issue](https://github.com/n8n-io/n8n/issues/37814).

### What a CLI backup doesn't contain

The `--backup` exports contain workflows and credentials only. They don't include:

* Users and their roles. After importing into a fresh instance, n8n shows the owner setup screen again, and the first person to complete it becomes the owner.
* Execution history and logs.
* Variables.
* Instance settings, including the encryption key.

This means a CLI backup is enough to move workflows between instances, but not enough to recover a full instance on its own. For that, keep a backup of the `.n8n` folder and the external database as described in [What a complete backup includes](#what-a-complete-backup-includes).

## Restore

### Restore workflows and credentials

Import the files from your CLI backup:

```bash
n8n import:workflow --separate --input=backups/workflows/
n8n import:credentials --separate --input=backups/credentials/
```

Exports include the original workflow and credential IDs. If the target instance already has items with the same IDs, they're overwritten. For the full list of flags and caveats, see [Use the command line](../configure-n8n/use-the-command-line.md).

To restore credentials, the importing instance must be able to decrypt them. You have two options:

* Use the same encryption key as the exporting instance. Restore the `config` file to the `.n8n` folder, or set the same `N8N_ENCRYPTION_KEY` environment variable.
* Export with the `--decrypted` flag, which writes credentials in plain text.

{% hint style="warning" %}
**Sensitive information**

A `--decrypted` export contains all credential data in plain text. Store it with the same care as the credentials themselves, and delete it once the restore is complete.
{% endhint %}

### Restore the full instance

To restore a complete instance:

1. Stop n8n.
2. Restore the `.n8n` folder to its original location.
3. Restore your PostgreSQL database from its backup, if you use one.
4. Start n8n.

With the default SQLite database, the `.n8n` folder contains the database, the encryption key, users, executions, and settings, so restoring it recovers the instance. With PostgreSQL, the `.n8n` folder still holds the encryption key, and the database backup holds the rest.

## Related content

* [Use the command line](../configure-n8n/use-the-command-line.md): the full Server CLI reference, including all export and import flags.
* [Set a custom encryption key](../configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key.md): how to provide `N8N_ENCRYPTION_KEY` explicitly.
* [Choose n8n's database](../configure-n8n/choose-n8ns-database.md): SQLite and PostgreSQL configuration.
* [Update n8n](update-n8n.md): update procedures for npm and Docker installations.
