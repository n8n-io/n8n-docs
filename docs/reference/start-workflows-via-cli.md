# CLI commands for n8n

[[toc]]

## Start a workflow

Workflows can not only be started by triggers, webhooks, or manually via the Editor. It is also possible to start them directly via the CLI.

Execute a saved workflow by its ID:

```bash
n8n execute --id <ID>
```

Execute a workflow from a workflow file:
```bash
n8n execute --file <WORKFLOW_FILE>
```

## Change the active status of a workflow

You can change the active status of a workflow via the CLI.

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

You can export your workflows and credentials from n8n via the CLI.

There are a couple of flags available for this.

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --all | Export all workflows/credentials. |
| --backup | Sets --all --pretty --separate for simple backups. Only --output has to be set additionally. |
| --id | The ID of the workflow to export. |
| --output | Output file name or directory if using separate files. |
| --pretty | Format the output in an easier to read fashion. |
| --separate | Exports one file per workflow (useful for versioning). Must inform a directory via --output. |

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
n8n export:workflow --all --output=backups/latest/
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
n8n export:credentials --all --output=backups/latest/
```

Export all the credentials to a specific directory using the `--backup` flag (details above):

```bash
n8n export:credentials --backup --output=backups/latest/
```

## Import workflows and credentials

You can import your workflows and credentials from n8n via the CLI.

There are a couple of flags available for this.

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --input | Input file name or directory if --separate is used. |
| --separate | Imports *.json files from directory provided by --input. |

### Workflows

Import workflows from a specific file:

```bash
n8n import:workflow --input=file.json
```
Import all the workflow files (*.json) from the specified directory:

```bash
n8n import:workflow --separate --input=backups/latest/
```

### Credentials

Import credentials from a specific file:

```bash
n8n import:credentials --input=file.json
```

Import all the credentials files (*.json) from the specified directory:

```bash
n8n import:credentials --separate --input=backups/latest/
```
