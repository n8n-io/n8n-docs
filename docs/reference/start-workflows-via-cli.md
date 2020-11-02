# Use n8n via CLI

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

You can also change the active status of a workflow via the CLI.

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
