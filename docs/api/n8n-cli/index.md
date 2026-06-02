---
description: n8n CLI is a lightweight client for interacting with n8n programmatically through the Public API.
contentType: guide
status: beta
---

# Getting started with n8n CLI

**n8n CLI** is a lightweight command-line client that communicates with a running n8n instance through the [n8n API](/api/index.md). It can run from any machine with network access and authenticates using an API key.

/// info | n8n CLI is in beta
Use it only for experimenting, local development, and personal projects and not for production workflows.
///

Use the API CLI to:

- List and inspect workflows  
- Create a workflow from JSON 
- Check recent executions  
- Create a credential  
- Manage projects

All operations respect the permissions of the user and the scope of the API key.

## n8n CLI versus server CLI

If you need to manage your n8n instance (backups, license management, emergency resets), see the [Server CLI](/hosting/cli-commands.md), a built-in tool that runs on the same machine as n8n.

| Aspect | n8n CLI | Server CLI |
|--------|---------|-----------|
| **Runs from** | Any machine with network access | Same machine as n8n |
| **Authentication** | API key | Direct database access |
| **Requires n8n running** | Yes | No (not required for most operations) |
| **Best for** | Developers, integrations, AI agents | Instance operators, backups, emergencies |
| **Permissions** | Respects user roles and API key scopes | Bypasses access control |

## Install n8n-cli

```bash
# Use directly with npx (zero install)
npx @n8n/cli workflow list

# Or install globally
npm install -g @n8n/cli
```

## Connect to your instance

```bash
n8n-cli config set-url https://your-instance.n8n.cloud
n8n-cli config set-api-key YOUR_API_KEY
n8n-cli config show
```

* The configuration is saved to `~/.n8n-cli/config.json` with restricted file permissions (`0600`).
* Get your API key from **n8n > Settings > n8n API** 

Alternatively, skip the configuration file and use environment variables:

```bash
export N8N_URL=https://your-instance.n8n.cloud
export N8N_API_KEY=your_api_key
```

## Inline flags

``` bash
n8n-cli --url=https://my-n8n.app.n8n.cloud --api-key=n8n_api_xxxxx workflow list
```

### Resolution order

1. Command-line flags (`--url`, `--api-key`)
2. Environment variables (`N8N_URL`, `N8N_API_KEY`)
3. Config file (`~/.n8n-cli/config.json`)

## Commands

Every command supports `--help` for detailed usage.

| Topic	| Commands |
|---|---|
| `workflow` | `list`, `get`, `create`, `update`, `delete`, `activate`, `deactivate`, `tags`, `transfer` |
| `execution` | `list`, `get`, `retry`, `stop`, `delete` |
| `credential` | `list`, `get`, `schema`, `create`, `delete`, `transfer` |
| `project` | `list`, `get`, `create`, `update`, `delete`, `members`, `add-member`, `remove-member` |
| `tag` | `list`, `create`, `update`, `delete` |
| `variable` | `list`, `create`, `update`, `delete` |
| `data-table` | `list`, `get`, `create`, `delete`, `rows`, `add-rows`, `update-rows`, `upsert-rows`, `delete-rows` |
| `user` | `list`, `get` |
| `config` | `set-url`, `set-api-key`, `show` |
| `source-control` | `pull` |
| `skill` | `install` |
| `audit` | (top-level) |
| `login` / `logout` | (top-level) |


## Output formats
All commands support three output formats via `--format`:

| Format | Flag | Use when |
|---|---|---|
| Table | -`-format=table` (default) | You want human-readable terminal output |
| JSON | `--format=json` | Piping to jq, programmatic use |
| ID-only | `--format=id-only` | Piping to xargs, scripting |

### Examples
* Human-readable table

   ``` bash
   n8n-cli workflow list
   ```

* JSON for scripts

   ``` bash
   n8n-cli workflow list --format=json | jq '.[] | select(.active) | .id'
   ```

* Pipe IDs into another command

   ``` bash
   n8n-cli workflow list --format=id-only | xargs -I{} n8n-cli workflow deactivate {}
   ```

## Use as skill with Claude Code

Install the skill so Claude always knows how to use n8n-cli:

```bash
n8n-cli skill install --global
```

Then in Claude Code, type `/n8n-cli` to load it. Claude can now create, update, and manage workflows on your behalf without requiring an MCP.

## Examples

### List and inspect workflows

```bash
n8n-cli workflow list
n8n-cli workflow get <id>
```
    
### Create a workflow from JSON
    
```bash
cat workflow.json | n8n-cli workflow create --stdin
```
    
### Check recent executions

```bash
n8n-cli execution list --status=error --limit=10
```
    
### Create a credential
    
```bash
n8n-cli credential schema gmailOAuth2  # see required fields first
n8n-cli credential create --type=gmailOAuth2 --name='My Gmail' --file=cred.json
```
    
### Manage projects
    
```bash
n8n-cli project create --name="My Project"
n8n-cli workflow transfer <id> --project=<projectId>
```
