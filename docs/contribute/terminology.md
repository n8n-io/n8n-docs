---
description: The official n8n terms to use in documentation, with the non-official terms to avoid.
layout:
  description:
    visible: false
---

# Terminology and naming

This page is a companion to the [style guide](style-guide-for-n8n-docs.md): the style guide covers writing style, formatting, and structure, and this page is the source of truth for product terminology.

n8n Docs aims to use the same term for the same concept on every page, and to prefer the official product term over a plausible synonym. Consistent terminology helps our readers, and  directly improves how AI tools (search, the docs assistant, and coding agents) find and use the docs.

## Casing

* **In prose, use sentence case:** "Add a trigger node", "create a sub-workflow".
* **For a literal UI label or node name, use bold with the product's exact casing:** "Select **Add trigger**", "the **HTTP Request** node". Match what the interface shows.
* **Write the product name as `n8n`,** always lowercase, even at the start of a sentence.

## Core concepts

| Do use | Don't use |
| --- | --- |
| workflow | flow, automation (as a noun for the whole thing), scenario, pipeline, zap |
| node | step, block, action, module |
| execution (one run of a workflow) | run (as a noun), job, invocation |

## Workflow lifecycle

| Do use | Don't use |
| --- | --- |
| publish, unpublish a workflow; published workflow | activate, deactivate, enable, disable, turn on, go live, deploy |
| run, execute a workflow (verb) | kick off, fire |
| pin data; pinned data | mock data, freeze data, lock data, sample data |

## Nodes

| Do use | Don't use |
| --- | --- |
| app node | integration node, service node |
| core node | system node |
| cluster node; root node; sub-node | parent node, child node, super node |
| community node (installable, community-published) | custom node, third-party node, plugin, add-on |
| Execute Sub-workflow Trigger node; Execute Sub-workflow node | Execute Workflow Trigger node, Execute Workflow node (deprecated names) |
| AI Agent node | Agent node (bare) |

## Credentials and connections

| Do use | Don't use |
| --- | --- |
| credential (stores authentication details for a service) | connection (as a synonym for a credential) |
| connection (a link between two nodes on the canvas) | wire, link |

n8n's own interface sometimes labels a credential's authentication link as a "connection" (for example, a private credential's sharing message). In docs, keep the two separate: a **credential** authenticates with a service; a **connection** joins nodes on the canvas.

## Canvas and editor

Two casing rules for editor UI-chrome terms: **bold** a term only when it's the direct target of a select/click/open instruction, not when it's just naming a location. **Capitalize** only the head word of a defined element's name (for example "Workflow menu", never "Workflow Menu") — generic area terms stay lowercase everywhere, bold or not.

| Do use | Don't use |
| --- | --- |
| canvas | editor board, diagram, workspace, graph |
| sticky note | comment, annotation, label, memo |
| sub-workflow | subworkflow, sub workflow, subflow, child workflow, nested workflow |
| left menu (app-wide left nav: Overview, Projects, Favorites, Settings, etc.) | sidebar, left sidebar, navigation menu, main menu |
| canvas header (top bar of the canvas: project/workflow name, Workflow menu, editor/executions/evaluations toggle, Publish) | top navigation bar, top menu |
| Workflow menu (horizontal ⋯ icon) | three dots icon, the three dots, Options (reserved for the vertical icon) |
| Options menu (vertical ⋮ icon; a per-row/per-item menu, not a canvas element) | three-dot menu (ambiguous orientation), three dots menu |
| Nodes panel (opens from the canvas's **+** button) | Node Panel (capitalized singular), add node menu, "What happens next?" panel |
| Node details view; NDV after first use (opens by double-clicking a node) | node editor view, NDV (without defining it first) |
| input panel; output panel (the NDV's side panes) | Input panel/Output panel (capitalized), INPUT/OUTPUT pane |
| Logs panel (bottom of canvas — confirm against the live product whether it's ever opened by name before treating it as a defined element) | bottom panel (already used for the source control diff view), bottom menu, canvas footer |

The Workflow menu icon is `three-dots-horizontal.png`; the Options menu icon is `three-dot-options-menu.png`. Don't swap them or reuse one to illustrate the other. See the [style guide](style-guide-for-n8n-docs.md#images) for how to format an inline icon.

## AI and agents

| Do use | Don't use |
| --- | --- |
| sub-agent | subagent, child agent |

n8n has several distinct AI-powered features for building workflows. Each is a specific n8n product name, not a generic description, so don't use them interchangeably:

| Do use | Don't use |
| --- | --- |
| AI Assistant (chat-based agent: creates, edits, tests, and publishes workflows and agents) | assistant, the AI, chatbot |
| AI Workflow Builder (generates and refines a single workflow from a prompt) | workflow builder, builder |
| Ask n8n AI (legacy help assistant, no longer actively developed — point readers to AI Assistant) | AI assistant (as a synonym for this), help assistant |

## Feature maturity

| Do use | Don't use |
| --- | --- |
| Preview (a feature's maturity label, capitalized) | beta, alpha, early access |

## Platform and deployment

| Do use | Don't use |
| --- | --- |
| self-hosted | self hosted, on-premise, on-premises, on-prem |
| n8n Cloud (never bare "Cloud" — it's ambiguous) | Cloud, hosted version, SaaS, the cloud, managed n8n |
| instance (a running n8n system) | server, box, deployment (as a noun for the running system) |
| Enterprise (plan) | enterprise edition, premium, paid tier |

"Deployment" isn't banned outright: it's correct for the act of deploying ("deployment methods", "the deployment finishes") and for a Kubernetes `Deployment` resource. Only replace it with "instance" when it's used as a noun for the running n8n system itself.

### Plans and tiers

Use these exact, capitalized plan names, low to high. Don't invent alternate names for them (for example, "professional plan" or "team tier"):

* **n8n Cloud:** Starter, Pro, Enterprise
* **Self-hosted:** Community, Registered Community, Business, Enterprise

To refer to every tier at once, write "All plans" or "All editions" rather than listing them.

## Source control and environments

**Source control** is n8n's own feature name for its Git-based workflow syncing; **version control** is the general term for what Git itself provides. Use "source control" to name the n8n feature, and reserve "version control" for describing Git as a concept (for example, "Git, a version control system"). Don't use them interchangeably as two names for the same n8n feature.

The in-app setting for this feature is labeled **Settings > Environments**. When referencing the UI path, say so explicitly (for example, "go to **Settings > Environments**") rather than inventing a separate "Environments settings" feature — it's the same source control feature, not a different one.

## Features

| Do use | Don't use |
| --- | --- |
| project | workspace, team space |
| folder | directory (in the app), group |
| environment variable | env (as a noun), config var |
| data table | database table, datatable, the table feature |

## Product and brand names

| Do use | Don't use |
| --- | --- |
| n8n (lowercase, always) | N8n, N8N, n8N |
| GitHub, npm, JavaScript, OAuth2 | Github, NPM, Javascript, oAuth |
