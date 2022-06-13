# CLI commands for n8n

n8n includes a CLI (command line interface), allowing you to perform many common actions using the CLI rather than the n8n editor. These include starting workflows, and exporting and importing workflows and credentials.

## Running CLI commands

You can use CLI commands with self-hosted n8n. Depending on how you choose to install n8n, there are differences in how to run the commands:

* npm: the `n8n` command is directly available. The documentation uses this in the examples below.
* Desktop app: in the examples below, replace `n8n` with the absolute path to the `n8n.cmd` file (Windows) or the n8n Desktop executable (Mac). The exact path depends on where you install your Node.js modules. For example, to export all workflow data, the command looks similar to this:
    ```sh
    # Windows
    "C:\Users\<username>\AppData\Local\Programs\n8n\resources\app\node_modules\n8n\bin\n8n.cmd" export:workflow --all
    # Mac
    /Users/<username>/Desktop/n8n.app/Contents/Resources/app/node_modules/n8n/bin/n8n export:workflow --all
    ```
* Docker: the `n8n` command is available within your Docker container. For example:
    ```sh
    docker exec -it <n8n-container-name> n8n export:workflow --all
    ```

## Start a workflow

You can start workflows directly using the CLI.

Execute a saved workflow by its ID:

```bash
n8n execute --id <ID>
```

Execute a workflow from a workflow file:
```bash
n8n execute --file <WORKFLOW_FILE>
```

## Change the active status of a workflow

You can change the active status of a workflow using the CLI.

!!! danger "Commands behavior"
    The commands displayed below only affect your n8n database, so if you execute them
	while n8n is running the changes won't make effect immediately. You must
	restart your n8n instance for changes to take effect.

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
| --separate | Exports one file per workflow (useful for versioning). Must inform a directory via --output. |
| --decrypted | Exports the credentials in a decrypted (plain text) format. |

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

Export all the credentials in a decrypted (plain text) format. You can use this to migrate from one installation to another that has a different secret key (in the config file).

**Note:** All sensitive information is visible in the files.

```bash
n8n export:credentials --all --decrypted --output=backups/decrypted.json
```


## Import workflows and credentials

You can import your workflows and credentials from n8n via the CLI.

!!! warning "Update the IDs"
    When exporting workflows and credentials, n8n also exports their IDs. If you have workflows and credentials with the same IDs in your existing database, they will be overwritten. To avoid this, delete or change the IDs before importing.


Available flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --input | Input file name or directory if you use --separate. |
| --separate | Imports *.json files from directory provided by --input. |

!!! warning "Migrating to different database systems"
    n8n limits workflow and credential names to 128 characters, but SQLite doesn't enforce size limits correctly.

    This might result in errors like `Data too long for column name` during the import process.

    In this case, you can edit the names from the n8n interface and export again or edit the JSON file directly before importing.



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
