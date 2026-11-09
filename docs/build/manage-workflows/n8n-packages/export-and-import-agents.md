---
description: >-
  Export agents into a .n8np package and import them into another n8n instance,
  with their skills, custom tools, schedules, and channel settings.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Export and import agents

{% hint style="info" %}
**Feature availability**

Exporting agents in n8n packages is available from n8n 2.44.0, and importing them from n8n 3.0.1. Skills travel as their own files in the package from n8n 3.1.0.
{% endhint %}

{% hint style="info" %}
**Preview status**

n8n packages and [agents](../../build-and-manage-agents/README.md) are in Preview. Agent export and import may change in future releases.
{% endhint %}

An [n8n package](README.md) can carry agents alongside workflows, so you can move an agent with its skills, custom tools, and schedules from one instance to another. Agents use the same export and import commands as workflows. This page covers what's different for agents. Everything else, such as how credentials, variables, and data tables resolve, works as described in [Import a package](import-a-package.md) and [How import works](how-import-works.md).

## What travels with an agent

| Travels | Doesn't travel |
|---------|----------------|
| The agent's definition: model, instructions, tools, sub-agents, memory, and other settings | Channel connections |
| Custom tools, with their code and schema | Sessions and chat history |
| Schedules: name, task, cron expression, and time zone | Knowledge base files |
| Skills, at their latest saved version | Skill version pins |
| Channel settings, such as approval rules | Publish history |
| Whether the agent is available through MCP | |
| Which version was published on the source | |

**Skills travel as their own files.** n8n writes each skill once, even when several exported agents use it, and the skill keeps its scope: a project skill or an instance skill. Skills have no published versions, so a package always carries a skill's latest saved version.

**Credentials work as they do for workflows.** A credential an agent's model, memory, or tools use travels as a reference, and the import resolves it on the target. A channel's credential travels as a reference too, but the import never uses it. See [Channels](#channels).

For where these files sit in the archive, see [Agents and skills](package-format.md#agents-and-skills) in the package format.

**Only agents that belong to a project can be exported.**

## Export agents

Name agents with `--agent-id`, or `agentIds` in the API. Repeat the flag to export several:

```bash
# Two agents
n8n-cli package export --agent-id=agSup01 --agent-id=agTri02 --output=support.n8np

# An agent and the workflow it uses as a tool
n8n-cli package export --agent-id=agSup01 --workflow-id=wf7Kq2 --output=support.n8np
```

```bash
curl -X POST 'https://n8n.example.com/api/v1/n8n-packages/export' \
	-H "X-N8N-API-KEY: <your-api-key>" \
	-H 'Content-Type: application/json' \
	-d '{"agentIds": ["<agent-id>"]}' \
	-o support.n8np
```

Agent, workflow, and folder IDs can be combined in one export. Project IDs can't be combined with any of them. A project export includes every agent in the project, so you don't name its agents separately.

n8n caps agent IDs at 300 per export, the same as the other ID groups.

By default, n8n exports each agent's current draft.

If agents aren't available on the source instance, naming an agent ID fails the export. A project export leaves the project's agents out without a warning.

The `X-N8n-Export-Counts` response header carries an `agents` key, which counts every agent in the archive, including sub-agents n8n added as dependencies.

### Agent dependencies

An agent depends on its sub-agents and on the workflows it uses as tools. `--dependency-policy` decides what n8n does when one of them isn't in the set of IDs you named, the same way it does for [workflow dependencies](export-a-package.md#workflow-dependencies):

| Value | What it does with a missing sub-agent or workflow tool |
|-------|--------------------------------------------------------|
| `fail` (default) | Abort the export and list what's missing |
| `include-in-package` | Add it to the package, and follow its own dependencies too |
| `reference-only` | Leave it out, and record it in `requirements.agents` or `requirements.workflows` as something the target instance must already have |

A sub-agent counts as a dependency even when it's turned off in the agent's settings.

Under `include-in-package`, a sub-agent you can't access fails the whole export.

### Permissions for export

Exporting agents by ID needs the `agent:export` API key scope. A project export needs only `project:export`, including for the agents in it.

On top of the API key, your role in each project has to allow exporting its agents. If it doesn't, the export fails, including a project export that would pick up those agents. You also need read access to every skill the exported agents use.

## Import agents

Use the same command and endpoint as for any package. There's no agent-specific option:

```bash
n8n-cli package import --file=support.n8np --project-id=<target-project-id>
```

Turn on agents in **Settings > Agents** on the target instance. Otherwise, n8n refuses the import.

Agents land in the target project, or, in a project package, in their own project. Agents don't sit in folders, so `--folder-id` applies only to the package's workflows and folders.

`package import-selection` doesn't support agents. A package containing agents has to go through `package import`.

### Matching and IDs

n8n matches a package agent to an existing agent with the same ID in the target project. An agent the import creates keeps its package ID.

The shared policies apply to agents the same way they apply to workflows:

| Flag | What it does for an agent |
|------|---------------------------|
| `--conflict-policy` | `new-version` updates the existing agent with the package's definition, `fail` refuses the import, and `skip` leaves the agent alone. Without a match, every policy creates the agent |
| `--id-policy` | `source` is the only value. A new agent keeps its package ID |
| `--publishing-policy` | Whether imported agents end up published. See [Publishing](#publishing) |
| `--missing-node-type-mode` | Applies to the agent's node tools. See [Missing node types](#missing-node-types) |

Two ID conflicts refuse the import under every policy: an agent ID that already belongs to an agent in another project or at instance level, and a schedule ID that belongs to another agent.

### Skills

n8n plans the skills of each imported agent together with that agent, and writes them before the agents. It doesn't change the skills of skipped agents.

n8n matches a skill by its ID. A project skill lands in the target project, and an instance skill lands at instance level. `--conflict-policy` applies to skills too:

| Value | What it does with a matched skill whose content differs |
|-------|---------------------------------------------------------|
| `new-version` | Saves the package's content as a new version of the skill |
| `skip` | Keeps the existing skill |
| `fail` | Refuses the import |

A matched skill with the same content stays unchanged, and n8n creates a skill that doesn't exist yet.

{% hint style="warning" %}
A new version of a project or instance skill applies to every agent that uses the skill, including agents that aren't in the package.
{% endhint %}

These skill problems refuse the import under every policy:

* The skill ID already belongs to another project, or the package and the target disagree on whether it's a project or an instance skill.
* The import would create or rename a skill to a name its scope already uses.
* Two skills in the package share a name in the same scope.

n8n reports every skill problem as an `agent-invalid` issue on the agent that uses the skill, with the path `skills.<skill-id>`.

### Channels

The import keeps the package's channel settings, but never connects a channel with a credential from the package. A channel's external app, such as a Slack app, sends events to one agent on one instance, so you connect each channel on the target yourself. The import never creates a credential, or a placeholder credential, that only a channel uses.

Each agent in the response lists its channels, each with one of two statuses:

| Status | What happened |
|--------|---------------|
| `reused` | The target agent already had a connected channel of this type. The import keeps that connection and applies the package's settings |
| `setup-required` | The import saved the channel's settings without a connection. Open `setupUrl` to connect it. `reason` is `new-channel` or `destination-draft` |

For created and updated agents, the import removes channels on the target agent that the package doesn't contain. Skipped agents keep their channels.

### Publishing

The [publishing policy](import-a-package.md#publishing) decides whether imported agents end up published, using the version that was published on the source. n8n publishes agents after workflows, so a workflow an agent uses as a tool exists first.

Three things stop an imported agent from being published, whatever the policy says:

* A placeholder credential: `stub-credential`.
* A node type the instance doesn't have: `missing-node-type`.
* A channel that needs setup: `channel-setup-required`.

As for workflows, an agent with no active version reports `blocked` with a `blockedReason`. If an earlier published version stays active, the agent reports `unchanged` with a `skippedPublishReason`, and that version keeps running. A publishing failure never fails the import: the agent's definition stays imported. See [Publishing outcomes](how-import-works.md#publishing-outcomes).

### Missing node types

n8n checks the node types and versions an agent's node tools use. Under the default `--missing-node-type-mode=fail`, a missing node type refuses the import and lists the agents that use it. Under `import-anyway`, n8n imports the agent but doesn't publish it.

## Permissions for import

An import with agents needs these API key scopes on top of the ones in [Limits and permissions](limits-and-permissions.md#api-key-scopes):

| Scope | Needed when |
|-------|-------------|
| `agent:import` and `agent:read` | The package contains agents |
| `agent:create` | The import creates an agent |
| `agent:update` | The import updates an agent |
| `agent:publish` | The import publishes an agent |
| `agent:unpublish` | The import unpublishes an agent |
| `skill:create` | The import creates a project or instance skill |
| `skill:update` | The import saves a new version of a project or instance skill |
| `credential:create` | The import creates a placeholder credential for a package that contains agents, including under the default `--credential-missing-mode=create-stub` |

`workflow:import` is only needed when the package also contains workflows. Skipped agents need no create, update, or publish scope.

n8n checks the scopes against what the import plans to do, before it writes anything. Your role in the target project has to allow the same actions. Missing permission to create or change a skill returns a `403`.

## The import response

An import response carries three agent keys:

```json
{
	"agents": [
		{ "sourceAgentId": "agSup01", "localId": "agSup01", "name": "Support triage",
			"projectId": "prProd4", "activeVersionId": null,
			"status": "created", "publishing": { "state": "unchanged" },
			"channels": [
				{ "type": "slack", "status": "setup-required", "reason": "new-channel",
					"setupUrl": "https://n8n.example.com/projects/prProd4/agents/agSup01" }
			] }
	],
	"counts": { "agents": { "created": 1, "updated": 0, "skipped": 0 } },
	"bindings": {
		"agents": { "agSup01": "agSup01" }
	}
}
```

| Key | What it holds |
|-----|---------------|
| `agents` | One row per agent, with its `status` of `created`, `updated`, or `skipped`, its `publishing` outcome, and its `channels`. Skipped agents list no channels |
| `counts.agents` | The number of agents `created`, `updated`, and `skipped` |
| `bindings.agents` | Source ID to target ID for every agent in the package. It's informational: an import doesn't accept agent bindings |

The rest of the response is the same as for workflows. See [The import response](import-a-package.md#the-import-response).

## Why an agent import is refused

These issue types are specific to agents. Each appears in the `issues` array with the agent's `sourceAgentId`:

| Type | Status | What it means |
|------|--------|---------------|
| `agent-conflict` | `409` | `kind` is `existing` for a match under `--conflict-policy=fail`, `id` for an agent ID that belongs elsewhere, or `task-id` for a schedule ID that belongs to another agent |
| `agent-invalid` | `422` | The agent's definition doesn't validate, or one of its skills has a problem. `path` points at the field, for example `config` or `skills.<skill-id>` |
| `agent-dependency-unresolved` | `422` | A sub-agent, workflow tool, or credential the agent uses can't be resolved on the target. `reason` is `missing`, `inaccessible`, `ambiguous`, or `unsupported` |
| `agent-policy-violation` | `422` | A policy on the target instance doesn't allow saving the agent. `violations` lists the rules it breaks |

A sub-agent or a workflow tool has to resolve inside the target project. A workflow the agent's node tools call as a sub-workflow can be any workflow you can read.

As for other issues, the whole response is a `409` when any issue is a conflict, so a skill problem returns a `409` when it comes with an `agent-conflict`. For the issue types that agents share with workflows, such as `missing-node-type` and `credential-unresolved`, see [Why an import is refused](how-import-works.md#why-an-import-is-refused).

## Events

Agent IDs appear on the [export](export-a-package.md#events) and [import](import-a-package.md#events) events:

* The export success event carries `agentIds`: every agent in the package, including added dependencies. The export failure event carries the agent IDs you requested.
* The import success event carries `agentIds`: the target IDs of the agents the import created or updated. Skipped agents are left out.

## Read next

* [Build and manage agents](../../build-and-manage-agents/README.md) to connect channels and publish agents after an import.
* [Import a package](import-a-package.md) for the options that apply to every package.
* [Limits and permissions](limits-and-permissions.md) for the full scope matrix.

## Related resources

* [n8n packages](./)
* [Package format](package-format.md)
* [Export a package](export-a-package.md)
* [Import a package](import-a-package.md)
* [How import works](how-import-works.md)
* [Limits and permissions](limits-and-permissions.md)
