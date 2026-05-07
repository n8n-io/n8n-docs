---
description: Commands available in the Server CLI, the built-in n8n command-line interface.
contentType: reference
---

# Server CLI commands

The **Server CLI** is a built-in command-line interface that runs on the same machine as your n8n installation. It provides direct database access for administrative tasks and can execute most commands even when n8n isn't running.

/// info | n8n CLI
Looking to interact with n8n programmatically from a remote machine or integrate with AI agents? Check out the [n8n CLI](/api/n8n-cli/index.md).
///

## When to use Server CLI vs n8n CLI

| Feature | Server CLI | n8n CLI |
|---------|-----------|---------|
| **Where it runs** | Same machine as n8n | Any machine with network access |
| **Authentication** | Direct database access | API key |
| **Requires running n8n** | No (most commands) | Yes |
| **Best for** | Instance operators, backups, migrations | Programmers, AI agents, remote management |
| **Security model** | Bypasses access controls | Respects user permissions and API key scope |
| **Use case examples** | Backup/restore, license management, emergency password resets | Workflow automation, credentials management through code |

## Running CLI commands

You can use CLI commands with self-hosted n8n. Depending on how you choose to install n8n, there are differences in how to run the commands:

* npm: the `n8n` command is directly available. The documentation uses this in the examples below.
* Docker: the `n8n` command is available within your Docker container:

    ```sh
    docker exec -u node -it <n8n-container-name> <n8n-cli-command>
    ```

## Start a workflow

You can start workflows directly using the CLI.

Execute a saved workflow by its ID:

```bash
n8n execute --id <ID>
```

## Publish or unpublish a workflow

You can publish or unpublish a workflow using the CLI. In n8n 2.0, the [previous active/inactive toggle](/2-0-breaking-changes.md) was replaced by a publish/unpublish model. Use `publish:workflow` and `unpublish:workflow` to change a workflow's published state from the CLI.

/// note | Restart required
These commands operate on your n8n database. If you execute them while n8n is running, the changes don't take effect until you restart n8n.
///

### Publish a workflow

Use `publish:workflow` to publish a workflow by its ID. You can optionally publish a specific historical version by passing its `versionId`.

Command flags:

| Flag | Description |
|------|-------------|
| --help | Help prompt. |
| --id | The ID of the workflow to publish. Required. |
| --versionId | Optional version ID to publish. If omitted, the current draft is published. |

/// note | No `--all` flag
Unlike the deprecated `update:workflow` command, `publish:workflow` doesn't support `--all`. This is intentional: it prevents accidental bulk publishing of workflows in production environments. Publish workflows individually by ID.
///

Publish the current draft of a workflow by ID:

```bash
n8n publish:workflow --id=<ID>
```

Publish a specific historical version of a workflow:

```bash
n8n publish:workflow --id=<ID> --versionId=<VERSION_ID>
```

### Unpublish a workflow

Use `unpublish:workflow` to unpublish a workflow by its ID, or all workflows at once.

Command flags:

| Flag | Description |
|------|-------------|
| --help | Help prompt. |
| --id | The ID of the workflow to unpublish. Can't be used with `--all`. |
| --all | Unpublish all workflows. Can't be used with `--id`. |

Unpublish a workflow by its ID:

```bash
n8n unpublish:workflow --id=<ID>
```

Unpublish all workflows:

```bash
n8n unpublish:workflow --all
```

### update:workflow (deprecated)

/// warning | Deprecated in n8n 2.0
The `update:workflow` command is deprecated and will be removed. Use [`publish:workflow`](#publish-a-workflow) and [`unpublish:workflow`](#unpublish-a-workflow) instead. See the [n8n v2.0 breaking changes](/2-0-breaking-changes.md) for details.
///

Set the active status of a workflow by its ID to false:

```bash
n8n update:workflow --id=<ID> --active=false
```

Set the active status of a workflow by its ID to true:

```bash
n8n update:workflow --id=<ID> --active=true
```

Set the active status to false for all the workflows:

```bash
n8n update:workflow --all --active=false
```

Set the active status to true for all the workflows:

```bash
n8n update:workflow --all --active=true
```

## Export entities

You can export your database entities from n8n using the CLI. This tooling allows you to export all entity types from one database type, such as SQLite, and import them into another database type, such as Postgres.

Command flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --outputDir | Output directory path |
| --includeExecutionHistoryDataTables | Include execution history data tables, these are excluded by default as they can be very large  |

```bash
n8n export:entities --outputDir=./outputs --includeExecutionHistoryDataTables=true
```

## Export workflows and credentials

You can export your workflows and credentials from n8n using the CLI.

Command flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --all | Exports all workflows/credentials. |
| --backup | Sets --all --pretty --separate for backups. You can optionally set --output. |
| --id | The ID of the workflow to export. |
| --output, -o | Outputs file name or directory if using separate files. |
| --pretty | Formats the output in an easier to read fashion. |
| --separate | Exports one file per workflow (useful for versioning). Must set a directory using --output. |
| --decrypted | Exports the credentials in a plain text format. (Credentials only.) |
| --version | The version ID of a specific historical version to export. (Workflows only, can't be used with `--all` or `--published`.) |
| --published | Exports the published/active version of the workflow instead of the current draft. When combined with `--all`, unpublished workflows are skipped. (Workflows only, can't be used with `--version`.) |

### Workflows

Export all your workflows to the standard output (terminal):

```bash
n8n export:workflow --all
```

Export a workflow by its ID and specify the output file name:

```bash
n8n export:workflow --id=<ID> --output=file.json
```

Export all workflows to a specific directory in a single file:

```bash
n8n export:workflow --all --output=backups/latest/file.json
```

Export all the workflows to a specific directory using the `--backup` flag (details above):

```bash
n8n export:workflow --backup --output=backups/latest/
```
#### Export a specific workflow version

You can export a specific historical version of a workflow by passing its `versionId` with `--version`:

```bash
n8n export:workflow --id=<ID> --version=<VERSION_ID> --output=workflow-v1.json
```

#### Export the published version of a workflow

Use `--published` to export the currently published/active version of a workflow rather than the current draft:

```bash
n8n export:workflow --id=<ID> --published --output=published.json
```

You can combine `--published` with `--all` to export every workflow's published version. Workflows that don't have a published version are skipped:

```bash
n8n export:workflow --all --published --output=workflows.json
```

/// note | Version metadata
When exporting a workflow, n8n includes a `versionMetadata` property containing the workflow's historical name and description for that version. The import command preserves this data in the workflow history table on import. The current workflow's name and description aren't overridden.
///

### Credentials

Export all your credentials to the standard output (terminal):

```bash
n8n export:credentials --all
```

Export credentials by their ID and specify the output file name:

```bash
n8n export:credentials --id=<ID> --output=file.json
```

Export all credentials to a specific directory in a single file:

```bash
n8n export:credentials --all --output=backups/latest/file.json
```

Export all the credentials to a specific directory using the `--backup` flag (details above):

```bash
n8n export:credentials --backup --output=backups/latest/
```

Export all the credentials in plain text format. You can use this to migrate from one installation to another that has a different secret key in the configuration file.

/// warning | Sensitive information
All sensitive information is visible in the files.
///

```bash
n8n export:credentials --all --decrypted --output=backups/decrypted.json
```

## Import entities

You can import entities from a previous `export:entities` command using this command, it allows importing of entities into a database type that differs from the exported database type. Current supported database types include: SQLite, Postgres.

The database is expected to be empty prior to import, this can be forced with the `--truncateTables` parameter.

Command flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --inputDir | Input directory that holds output files for import |
| --truncateTables | Truncate tables before import  |

```bash
n8n import:entities --inputDir ./outputs --truncateTables true
```

## Import workflows and credentials

You can import your workflows and credentials from n8n using the CLI.

/// warning | Update the IDs
When exporting workflows and credentials, n8n also exports their IDs. If you have workflows and credentials with the same IDs in your existing database, they will be overwritten. To avoid this, delete or change the IDs before importing.
///

Available flags:

| Flag | Description |
|------|-------------|
| --help | Help prompt. |
| --input | Input file name or directory if you use --separate. |
| --projectId | Import the workflow or credential to the specified project. Can't be used with `--userId`. |
| --separate | Imports `*.json` files from directory provided by --input. |
| --userId | Import the workflow or credential to the specified user. Can't be used with `--projectId`. |
| --skipMigrationChecks | Skip migration validation checks. |
| --activeState | Controls the active state of imported workflows. Accepts `false` (default, deactivates all imported workflows) or `fromJson` (uses the `active` field from each workflow's JSON; multi-main mode only). |

/// note | Migrating to SQLite
n8n limits workflow and credential names to 128 characters, but SQLite doesn't enforce size limits.

This might result in errors like **Data too long for column name** during the import process.

In this case, you can edit the names from the n8n interface and export again, or edit the JSON file directly before importing.
///

### Workflows

/// warning | Known issue: cron triggers keep running after import
The behaviour of importing a previously active workflow differs depending on the mode you are running. This is a known bug.

On multi-main and queue-mode instances the previously active workflow's cron triggers are deactivated on import. 

On non multi-main instances the previously active workflows cron triggers will remain running until you restart the n8n instance. 
///

Import workflows from a specific file:

```bash
n8n import:workflow --input=file.json
```

Import all the workflow files as JSON from the specified directory:

```bash
n8n import:workflow --separate --input=backups/latest/
```

/// note | Version metadata on import
If the imported file includes a `versionMetadata` property (added by exports that target a specific version or the published version), n8n preserves that historical name and description in the workflow history table. The current workflow entity's name and description are kept as-is.
///

By default, `import:workflow` deactivates every imported workflow. To preserve the `active` field from each JSON file instead, pass `--activeState=fromJson` (only supported in multi-main & queue mode):

```bash
n8n import:workflow --separate --input=backups/latest/ --activeState=fromJson
```

### Credentials

Import credentials from a specific file:

```bash
n8n import:credentials --input=file.json
```

Import all the credentials files as JSON from the specified directory:

```bash
n8n import:credentials --separate --input=backups/latest/
```

## License

### Clear

Clear your existing license from n8n's database and reset n8n to default features:

```sh
n8n license:clear
```

If your license includes [floating entitlements](/glossary.md#entitlement-n8n), running this command will also attempt to release them back to the pool, making them available for other instances.

### Info

Display information about the existing license:

```sh
n8n license:info
```

## User management

You can reset user management using the n8n CLI. This returns user management to its pre-setup state. It removes all user accounts.

Use this if you forget your password, and don't have SMTP set up to do password resets by email.

```sh
n8n user-management:reset
```

### Disable MFA for a user

If a user loses their recovery codes you can disable MFA for a user with this command. The user will then be able to log back in to set up MFA again.

```sh
n8n mfa:disable --email=johndoe@example.com
```

### Disable LDAP

You can reset the LDAP settings using the command below.

```sh
n8n ldap:reset
```

## Uninstall community nodes and credentials

You can manage [community nodes](/integrations/community-nodes/installation/index.md) using the n8n CLI. For now, you can only uninstall community nodes and credentials, which is useful if a community node causes instability.

Command flags:

 | Flag         | Description                                                                                                                      |
 |--------------|----------------------------------------------------------------------------------------------------------------------------------|
 | --help       | Show CLI help.                                                                                                                   |
 | --credential | The credential type. Get this value by visiting the node's `<NODE>.credential.ts` file and getting the value of `name`.            |
 | --package    | Package name of the community node.                                                                                              |
 | --uninstall  | Uninstalls the node.                                                                                                             |
 | --userId     | The ID of the user who owns the credential. On self-hosted, query the database. On cloud, query the API with your API key. |

### Nodes

Uninstall a community node by package name:

```sh
n8n community-node --uninstall --package <COMMUNITY_NODE_NAME>
```

For example, to uninstall the [Evolution API community node](https://www.npmjs.com/package/n8n-nodes-evolution-api), type:

```sh
n8n community-node --uninstall --package n8n-nodes-evolution-api
```

### Credentials

Uninstall a community node credential:

```sh
n8n community-node --uninstall --credential <CREDENTIAL_TYPE> --userId <ID>
```

For example, to uninstall the [Evolution API community node credential](https://www.npmjs.com/package/n8n-nodes-evolution-api), visit the [repository](https://github.com/oriondesign2015/n8n-nodes-evolution-api) and navigate to the [`credentials.ts` file](https://github.com/oriondesign2015/n8n-nodes-evolution-api/blob/main/credentials/EvolutionApi.credentials.ts) to find the `name`:

```sh
n8n community-node --uninstall --credential evolutionApi --userId 1234
```

## Security audit

You can run a [security audit](/hosting/securing/security-audit.md) on your n8n instance, to detect common security issues.

```sh
n8n audit
```
