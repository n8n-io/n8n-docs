---
description: Use node type policies to control which nodes users can add, publish, and run in an instance or a project.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Control node availability with node type policies

Node type policies are rules that decide which nodes users can use, for the whole instance or for one project.

{% hint style="info" %}
**Preview status**

Node type policies are in Preview and may change in future releases. Avoid relying on them in production.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Node type policies are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

Node type policies are available from n8n 2.42.0.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

An instance owner or admin sets an instance policy. A project admin can then restrict their project further. You manage policies with the [n8n public API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference).

## How node type policies work

A policy has a list of rules and a default action.

Each rule has:

- `id`: a name for the rule, unique in the policy. n8n reports this ID when the rule blocks a node.
- `action`: `allow`, `deny`, or `delegate`.
- `selector`: the nodes the rule matches.

A selector matches nodes in one of two ways:

| Selector | Matches | Example |
|----------|---------|---------|
| `{ "kind": "name", "value": "<node-type>" }` | One node type, by its exact name. | `n8n-nodes-base.executeCommand` |
| `{ "kind": "package", "value": "<package-name>" }` | Every node in a package. | `n8n-nodes-base`, `@n8n/n8n-nodes-langchain` |

n8n checks the rules in order and uses the first rule that matches. If no rule matches, n8n uses the policy's `defaultAction`.

To find a node's type name, select the node on the canvas and copy it. Paste it into a text editor and read the `type` field.

A `name` rule also matches the tool versions of that node. For example, a rule on `n8n-nodes-base.gmail` also blocks the **Gmail Tool** that AI agents use.

### How instance and project policies combine

n8n evaluates the instance policy first, then the project policy:

| Instance verdict | Result |
|------------------|--------|
| `deny` | The node is blocked. A project can't allow it again. |
| `allow` | The project policy decides. A project can only restrict further. |
| `delegate` | The node is blocked unless the project has an explicit `allow` rule for it. The project's `defaultAction` doesn't count. |

Use `delegate` for nodes you want blocked by default but that a project admin can turn on for their project. Only the instance policy accepts `delegate`.

Without any policy, every node is available.

Use a policy to block nodes per project and keep them installed. Use [`NODES_EXCLUDE`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/block-specific-nodes) to remove nodes from the whole instance.

## Set a policy with the API

### Authentication and permissions

Send an API key in the `X-N8N-API-KEY` header. The key needs the `nodeTypePolicy:manage` scope. Refer to [Create an API key](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/authentication#create-an-api-key).

| Endpoint | Who can call it |
|----------|-----------------|
| `GET` and `PUT /api/v1/node-type-policies/instance` | Instance owners and admins |
| `GET` and `PUT /api/v1/node-type-policies/projects/<project-id>` | Instance owners and admins, and admins of that project |

To find a project ID, open the project in n8n. The ID is the part of the URL after `/projects/`.

### Read, change, then write the policy

Every policy has a `version`. A `PUT` must send the version you last read. This stops two admins from overwriting each other's changes.

To change a policy:

1. Read the current policy with `GET`.
2. Change the `rules` or the `defaultAction`.
3. Send the whole policy back with `PUT`, with the same `version`.

A `GET` returns the policy in this shape:

```json
{
	"scopeId": "<scope-id>",
	"defaultAction": "allow",
	"rules": [
		{
			"id": "block-execute-command",
			"action": "deny",
			"selector": { "kind": "name", "value": "n8n-nodes-base.executeCommand" }
		}
	],
	"version": 3
}
```

A policy that was never set returns `version: 0`, so the first `PUT` sends `0`. If someone changed the policy after you read it, n8n returns `409 Conflict`. Read the policy again and retry.

A `PUT` also returns `409 Conflict` if the scope has more than one attached policy, or if its policy is shared with another scope. In that case, update the shared policy or the scope's attachments instead. Refer to [Share one policy across scopes](#share-one-policy-across-scopes).

A `PUT` replaces every rule in the policy. To add one rule, send the existing rules plus the new one.

### Example: block nodes for the whole instance

This instance policy blocks the **Execute Command** node and lets project admins turn on the **SSH** node for their own project:

```bash
curl --request PUT \
	--url '<YOUR-INSTANCE-URL>/api/v1/node-type-policies/instance' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--header 'Content-Type: application/json' \
	--data '{
		"version": 0,
		"defaultAction": "allow",
		"rules": [
			{
				"id": "block-execute-command",
				"action": "deny",
				"selector": { "kind": "name", "value": "n8n-nodes-base.executeCommand" }
			},
			{
				"id": "ssh-on-request",
				"action": "delegate",
				"selector": { "kind": "name", "value": "n8n-nodes-base.ssh" }
			}
		]
	}'
```

The response returns the saved policy with its new `version`. It can also include `warnings`, which list rules that an earlier rule already covers. n8n never reaches those rules. The change takes effect within about one second.

### Example: turn on a delegated node in one project

The instance policy above delegates the **SSH** node. This project policy turns it on for one project:

```bash
curl --request PUT \
	--url '<YOUR-INSTANCE-URL>/api/v1/node-type-policies/projects/<PROJECT-ID>' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--header 'Content-Type: application/json' \
	--data '{
		"version": 0,
		"defaultAction": "allow",
		"rules": [
			{
				"id": "allow-ssh",
				"action": "allow",
				"selector": { "kind": "name", "value": "n8n-nodes-base.ssh" }
			}
		]
	}'
```

The `allow` rule is necessary. The project's `defaultAction: allow` doesn't turn on a delegated node.

### Share one policy across scopes

The `/node-type-policies/policies` and `/node-type-policies/scopes/<scope-id>/attachments` endpoints let instance admins reuse one set of rules in more than one project. Most setups don't need them. Refer to the [Endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference) for details.

## What users see in the editor

When a node is blocked in a project, users in that project see:

- **Nodes panel:** blocked nodes don't appear when browsing. They still appear in search, at the end of the list, with a lock. Users can't add them.
- **Canvas:** a blocked node already in a workflow shows a restricted label. Users can't copy it.
- **Node details:** the parameters are read-only. Users can contact an instance admin or replace the node.
- **Publish and run:** n8n refuses the action and shows a message that lists each blocked node, with a link to find it in the workflow. n8n refuses a save in the same way if the save adds a blocked node.

## What users see in agents

- **Tool picker:** blocked nodes appear at the end of the list with a lock. Users can't add them. Chat Hub tools work the same way.
- **Chat:** n8n refuses a call to a blocked tool and marks the step as restricted. The agent tells the user what it couldn't do.
- **Save and publish:** n8n refuses to save an agent that adds a blocked tool, and refuses to publish an agent that uses one.
- **AI builders:** the agent builder and n8n Assistant can suggest a blocked node. n8n then refuses the save.

## Workflows that already use a blocked node

A new policy doesn't change existing workflows, but it limits what users can do with them:

| Action | Result |
|--------|--------|
| Open and edit | Allowed. |
| Save | Allowed, as long as the save doesn't add a new blocked node type. |
| Publish | Refused. |
| Run, including from a trigger or as a sub-workflow | Refused. n8n records the run as a failed execution. |
| Move to another project | Checked against the target project's policy. |

Published workflows stay published, but their executions fail until you allow the node or remove it from the workflow.

A disabled node still counts. Users can't add a blocked node as disabled and turn it on later.

## Limitations

- **No settings page yet:** you manage policies only through the public API. A settings page is planned.
- **No wildcards:** a `name` rule matches one exact node type. To match many nodes, use a `package` rule.
- **`package` rules need an installed package:** n8n rejects a `package` rule for a package that isn't installed. A `name` rule doesn't have this limit, so you can block a community node before anyone installs it.
- **No nodes are exempt:** a policy with `defaultAction: deny` also blocks nodes like **Manual Trigger** and **Sticky Note**. Add `allow` rules for every node your users need.
- **Not a data boundary:** blocking a node doesn't block the service behind it. Users can still reach the same API with the **HTTP Request** or **Code** node. To stop n8n from loading a node at all, use [`NODES_EXCLUDE`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/block-specific-nodes).
- **Source control pulls:** n8n skips a pulled workflow that uses a blocked node and reports it in the pull result. The workflow in Git and in n8n stay different until you allow the node or remove it.
- **Sub-workflows inside node parameters:** n8n doesn't check nodes in a sub-workflow that's defined inside another node's parameters.

## Related resources

* [Manage users and access](./)
* [Set up for Cloud](set-up-for-cloud.md)
* [Add and remove users](add-and-remove-users.md)
* [Understand instance roles](understand-instance-roles.md)
* [Set permissions and roles (RBAC)](set-permissions-and-roles-rbac/README.md)
* [Verify user identity](verify-user-identity/README.md)
* [Follow best practices](follow-best-practices.md)
* [Organize work in projects](set-permissions-and-roles-rbac/organize-work-in-projects.md)
* [Block specific nodes](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/block-specific-nodes)
* [Endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference)
