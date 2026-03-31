---
description: n8n-cli is a lightweight client for interacting with n8n programmatically through the Public API.
contentType: guide
status: beta
---

# Getting started with n8n-cli

**n8n-cli** is a lightweight command-line client that communicates with a running n8n instance through the [n8n API](/api/index.md). It can run from any machine with network access and authenticates using an API key.

/// info | n8n-cli is in beta
Use it only for experimenting, local development, and personal projects and not for production workflows.
///

Use the API CLI to:

- List and inspect workflows  
- Create a workflow from JSON 
- Check recent executions  
- Create a credential  
- Manage projects

All operations respect the permissions of the user and the scope of the API key.

## n8n-cli versus server CLI

If you need to manage your n8n instance (backups, license management, emergency resets), see the [Server CLI](/hosting/cli-commands.md), a built-in tool that runs on the same machine as n8n.

| Aspect | n8n-cli | Server CLI |
|--------|---------|-----------|
| **Runs from** | Any machine with network access | Same machine as n8n |
| **Authentication** | API key | Direct database access |
| **Requires n8n running** | Yes | No (not required for most operations) |
| **Best for** | Developers, integrations, AI agents | Instance operators, backups, emergencies |
| **Permissions** | Respects user roles and API key scopes | Bypasses access control |

## Install n8n-cli

```bash
npm install -g n8n-cli
```

## Connect to your instance

```bash
n8n-cli config set-url https://your-instance.n8n.cloud
n8n-cli config set-api-key YOUR_API_KEY
```

Get your API key from **n8n > Settings > n8n API** 

Or skip the config file and use environment variables:

```bash
export N8N_URL=https://your-instance.n8n.cloud
export N8N_API_KEY=your_api_key
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

## n8n-cli flags

| Flag | Purpose |
| --- | --- |
| `--json` | Output as JSON |
| `--jq '.[].name'` | Filter JSON output |
| `--debug` | Print raw HTTP calls |
| `--quiet` | Suppress all output |