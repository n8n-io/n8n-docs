---
description: >-
  How n8n checks a package before writing it, the order it writes things in, and
  how it resolves credentials, variables, data tables, tags, folders, and projects.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# How import works

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. Import behavior may change in future releases.
{% endhint %}

This page covers what n8n does with an [n8n package](README.md) once you've called [import](import-a-package.md): how it decides whether the import can go ahead, and how it resolves each kind of entity.

## Check everything, then write

An import runs in two phases. First n8n plans it: it reads the package, works out what it would do with every entity, and collects any reason the import can't go ahead. Then it checks the collected reasons, along with license, permission, and quota requirements. Only if nothing is blocking does it start writing.

**You get every problem at once.** A refused import returns all the reasons together in an `issues` array, rather than stopping at the first one. So you can fix a pipeline in one pass instead of rerunning the import for each new error.

**A refused import writes nothing.** If the import is blocked, no workflow, folder, credential, data table, variable, or tag is created or changed.

{% hint style="warning" %}
There's no rollback. n8n has no database transaction around an import, so its promise that a refused import writes nothing covers the problems it can predict, not every possible failure. If something unexpected goes wrong while an import is being written, such as a dropped database connection, whatever was already written stays on the instance, and there's no cleanup afterward. Checking first makes this rare, not impossible.
{% endhint %}

Import never deletes a workflow, folder, project, data table, or tag.

## Write order

Within a project, n8n writes in a fixed order:

```
tags → folders → credentials → data tables → workflows → variables → publish
```

Tags go first because attaching them is part of writing a workflow. Variables go last because overwriting one is the only step that changes pre-existing data, and nothing before it reads a variable: `$vars` resolves by name at runtime, not at import.

Publishing is a separate pass at the end, after every project in the package has been written. It has to be, because you can't publish a workflow until everything it calls exists.

Workflow content is written in the order the manifest lists it. The publish pass is what's ordered by the sub-workflow graph, leaves first, because publishing a workflow whose sub-workflow isn't published yet would fail. Workflows in a dependency cycle are published last.

For a project package, n8n plans every project, checks the whole package, creates the project shells, then writes each project's contents in turn, then publishes everything once.

## Rewriting references

An imported workflow's references have to point at entities on the target instance, not the source. n8n builds a map of source ID to target ID as it goes, and rewrites four things through it:

* Credential IDs on nodes.
* Sub-workflow IDs on **Execute Workflow**, **Call n8n Workflow Tool**, and **Workflow Retriever** nodes, but only when the node selects its workflow from a list rather than by expression.
* The error workflow in workflow settings.
* The caller allowlist in workflow settings, element by element. IDs it can't map are left as they are.

Two things aren't rewritten. A reference set by an expression is left untouched, because n8n can't know what it evaluates to. And the cached display name shown on a sub-workflow node isn't updated, so a remapped sub-workflow can show a stale name in the editor until you reopen the node.

## Credentials

No credential data travels in a package, so every credential reference has to be resolved against the target instance. n8n resolves each one in this order:

1. An explicit [binding](import-a-package.md#bindings), if you gave one for that credential.
2. Otherwise, the `--credential-matching-mode` rules.
3. Otherwise, `--credential-missing-mode` decides whether to create an empty placeholder or refuse the import.

Whichever route it takes, n8n checks the type. A credential of the wrong type refuses the import, and tells you both the type the node needs and the type the credential actually is. That applies to explicit bindings too.

### Which credentials are candidates

n8n only considers credentials you can read and that the target project can use, plus global credentials. A credential you can't read is never a candidate in any mode, including `id-only`. That's usually the explanation when a credential with a matching ID doesn't get matched.

### How a match is chosen

`id-only` either finds the ID or it doesn't. `name-and-type` and `type-only` can turn up several candidates, so n8n picks in strict tiers:

1. Credentials owned by the target project.
2. Credentials shared into it.
3. Global credentials.

The tiers are strict, not a scoring system. If anything is owned by the target project, n8n never looks at shared or global credentials at all. Within the winning tier, the most recently updated credential wins, and if two were updated at the same moment, the lowest ID wins.

Shared credentials are eligible. Skipping them would break the ordinary promotion case, and the importing user needs read access to a credential either way.

### Placeholder credentials

Under the default `--credential-missing-mode=create-stub`, a reference n8n can't resolve becomes an empty credential in the target project, named after the credential in the package. The workflow imports, and n8n reports the credential under `credentials.stubbed` and returns the new binding so you can reuse it next time.

A workflow using a placeholder credential is never published, whatever the publishing policy says. Fill in the credential, then publish the workflow.

Some credential problems refuse the import even under `create-stub`, because a placeholder wouldn't help: a credential type the instance doesn't have installed, a binding pointing at a credential of the wrong type, and a binding for a credential the package doesn't declare.

## Variables

Variables are matched by name, never by ID, because `$vars.<name>` resolves by name at runtime. n8n looks in the target project first, then global scope, exactly as a running workflow would. There's no portable ID to carry, so the package's requirement records only the name.

On export, if a name exists both in the project and globally, the project's value wins. An export is refused when one name would resolve to two different variables in the same package.

On import, a variable that doesn't resolve is handled by `--variable-missing-mode`, and one that does resolve is handled by `--variable-conflict-policy`. Neither policy touches a resolved variable when there's nothing to change, meaning the package carries no value for it or the value already matches.

Writing a variable needs a license that supports variables. Creating one also needs the create scope and room in the instance's variable limit. Overwriting one needs the update scope but consumes no headroom, because that variable already counts against the limit. The limit counts every variable on the instance, global and project-scoped together, and n8n refuses an import whose new variables would exceed it before writing anything.

An import that neither creates nor overwrites a variable needs none of this. Under the default `--variable-conflict-policy=keep-existing`, that's every import whose variable names all resolve.

Under `--variable-conflict-policy=overwrite`, a package whose projects hold different values for one variable they all resolve to is refused. One variable can't carry two values, so n8n won't let the last write win silently.

## Data tables

Only the schema travels. Rows never move in either direction, so a table the import creates starts empty.

Tables are matched by ID within the target project, never by name. A created table keeps the source ID.

Every column in the package must exist on a matched target table with the same name and type. A missing column or a type mismatch refuses the import under both schema policies. `keep-existing` tolerates extra columns the target has of its own, and `fail` refuses those too. Column order isn't compared, and column names are compared case-sensitively.

Import never changes a data table that already exists. No column is added, removed, renamed, or retyped, and the table isn't renamed. Creating an absent table is the only write. So package columns are never added to a matched table, which is why a missing column has to refuse rather than resolve.

Creating a table also fails if its ID already exists anywhere on the instance, including in another project, or if its name is already taken in the target project.

## Tags

Tags are global in n8n, and their names are unique across the instance. n8n matches them by source ID and never by name, because a rename can only be told apart from a delete-and-recreate by tracking a stable ID. A created tag takes over the source ID.

There are two kinds of conflict:

* **Rename drift**: the ID matches a tag on the target, but the names differ, so someone renamed it on one instance.
* **Name collision**: the ID isn't on the target, but another tag already holds the name. This is the common case on an established instance, where tags were created independently and have unrelated IDs.

`--tag-conflict-policy=rename` handles both: it renames a drifted tag to the package's name, and resolves a name collision by moving the existing tag onto the package's ID, keeping its name and everything already tagged with it. The one case it still refuses is a drifted tag whose new name is already held by a third tag.

When n8n updates a workflow, the package's tag list replaces the target workflow's tags with exactly that list, and that includes an empty list. A workflow with no tag list at all leaves the target's tags alone. Because dropped tags are filtered out before the write, updating a tagged workflow whose package tags were all dropped clears its tags. Export with `--include-tags=false` if you want to leave the target's tags untouched.

Import never deletes a tag. If tags are switched off on the target instance, all tag handling is skipped silently and never fails the import.

## Folders and projects

`--folder-conflict-policy=merge` reuses the folder matched by ID and merges the package's contents into it. The existing folder keeps its own name, so merging doesn't rename anything. Note that the response reports the package's folder name for a merged folder, not the name the folder has on the target.

Two folder conflicts refuse the import whatever the policy, because both would mean moving a folder rather than merging into it: a folder ID that exists in a different project, and an existing folder sitting under a different parent than the import would place it.

For project packages, n8n creates the project shells first, then runs the same machinery once per project. If a package project's ID matches a personal project on the target, the import is refused with a `403`: that's never something a conflict policy can merge.

## Node types

n8n works out which node types a package needs from the workflows themselves, and never trusts the `requirements.nodeTypes` list in the manifest. The manifest can make an import faster, never wrong.

Under the default `--missing-node-type-mode=fail`, a package using a node type or node version the instance doesn't have refuses the import before anything is written, listing every missing type with the workflows that use it. Under `import-anyway`, those workflows import but aren't published.

## Publishing outcomes

Every workflow in the response carries a `publishing.state`:

| State | Meaning |
|-------|---------|
| `published` | The workflow is live |
| `unpublished` | The workflow isn't live, as the policy intended |
| `unchanged` | Publishing wasn't attempted, or was skipped. An existing live version keeps running |
| `blocked` | n8n refused to publish it. `blockedReason` says why |
| `failed` | Publishing was attempted and failed. `error` says why |

`blockedReason` is either `stub-credential` or `missing-node-type`. A workflow blocked for both reports `missing-node-type`, because that one means it physically can't run.

`blocked` means nothing is live. If the workflow already had a published version and the new one can't be published, you get `unchanged` with a `skippedPublishReason` instead, and the older version keeps serving traffic. So "never published" refers to the version you just imported, not to the workflow.

A publishing failure never fails the import. The workflow is imported, and the response tells you it isn't live.

### Webhook path conflicts

Two workflows can't register the same webhook path with the same HTTP method. If a package would publish two workflows that both want the same path, the first publishes and the second reports `failed` with the message `There is a conflict with one of the webhooks.` The import itself still succeeds. The same happens when the path is already held by a workflow published on the instance.

n8n only compares paths it can read literally: the node has to be enabled, and its path a plain value rather than an expression, with no path parameter in it. Paths built from expressions, paths with parameters, and webhooks that n8n prefixes per workflow can't collide this way. The same path under different HTTP methods is fine.

## Why an import is refused

There are 12 reasons an import can be blocked. Each appears in the `issues` array with a `type`, and some carry a `kind` narrowing it further:

| Type | Kinds | What it means |
|------|-------|---------------|
| `workflow-conflict` | | The workflow exists on the target and `--workflow-conflict-policy` is `fail` |
| `workflow-id-conflict` | | Under `--workflow-id-policy=source`, that workflow ID is already used somewhere on the instance, including in another project and including archived workflows |
| `workflow-folder-conflict` | | The existing workflow lives in a different folder than the import would put it in. This refuses the import even under `--workflow-conflict-policy=skip` |
| `project-conflict` | `fail-policy` | The project exists and `--project-conflict-policy` is `fail` |
| `folder-conflict` | `parent-mismatch`, `id-in-other-project`, `fail-policy` | The first two refuse whatever the policy |
| `credential-unresolved` | `not_found`, `unknown_type`, `source_not_found`, `type_mismatch` | Only `not_found` can be resolved by a placeholder credential |
| `data-table-unresolved` | `missing`, `id-conflict`, `name-conflict`, `schema-incompatible`, `module-disabled`, `permission-denied` | |
| `tag-unresolved` | `rename-drift`, `name-collision`, `invalid-name`, `invalid-id`, `permission-denied` | |
| `variable-unresolved` | | A referenced variable doesn't resolve and `--variable-missing-mode` is `must-preexist` |
| `variable-conflict` | | A resolved variable's value differs and `--variable-conflict-policy` is `fail` |
| `variable-limit-exceeded` | | The new variables would exceed the instance's variable limit |
| `missing-node-type` | | A workflow uses a node type or version the instance doesn't have, under `--missing-node-type-mode=fail` |

The HTTP status depends on the kind of problem. The response is a `409` if any issue is conflict-shaped: a workflow, project, folder, or variable conflict, a data table ID or name conflict, or tag rename drift or name collision. Everything else is a `422`. A mixed set containing one conflict returns `409` for the whole response.

Some failures are reported on their own rather than batched with the rest, because they stop n8n before it can plan: a missing license feature, a missing API key scope, and a malformed package.

Missing permission to create a tag or a data table isn't a `403`. It comes back as a `permission-denied` blocking issue naming the scope it needed.

## Read next

* [Import a package](import-a-package.md) for the options this page refers to.
* [Limits and permissions](limits-and-permissions.md) for the license features, scopes, and quotas an import checks.
* [Package format](package-format.md) for what's in the files n8n is reading.
