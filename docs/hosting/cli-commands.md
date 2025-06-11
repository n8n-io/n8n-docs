---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: CLI commands available in n8n.
contentType: reference
---

# CLI commands for n8n

n8n includes a CLI (command line interface), allowing you to perform actions using the CLI rather than the n8n editor. These include starting workflows, and exporting and importing workflows and credentials.

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

## Change the active status of a workflow

You can change the active status of a workflow using the CLI.

/// note | Restart required
These commands operate on your n8n database. If you execute them while n8n is running, the changes don't take effect until you restart n8n.
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

## Export workflows and credentials

You can export your workflows and credentials from n8n using the CLI.

Command flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --all | Exports all workflows/credentials. |
| --backup | Sets --all --pretty --separate for backups. You can optionally set --output. |
| --id | The ID of the workflow to export. |
| --output | Outputs file name or directory if using separate files. |
| --pretty | Formats the output in an easier to read fashion. |
| --separate | Exports one file per workflow (useful for versioning). Must set a directory using --output. |
| --decrypted | Exports the credentials in a plain text format. |

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

/// note | Migrating to SQLite
n8n limits workflow and credential names to 128 characters, but SQLite doesn't enforce size limits.

This might result in errors like **Data too long for column name** during the import process.

In this case, you can edit the names from the n8n interface and export again, or edit the JSON file directly before importing.
///

### Workflows

Import workflows from a specific file:

```bash
n8n import:workflow --input=file.json
```

Import all the workflow files as JSON from the specified directory:

```bash
n8n import:workflow --separate --input=backups/latest/
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
