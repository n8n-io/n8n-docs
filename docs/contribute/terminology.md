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

## Credentials and connections

| Do use | Don't use |
| --- | --- |
| credential (stores authentication details for a service) | connection (as a synonym for a credential) |
| connection (a link between two nodes on the canvas) | wire, link |

n8n's own interface sometimes labels a credential's authentication link as a "connection" (for example, a private credential's sharing message). In docs, keep the two separate: a **credential** authenticates with a service; a **connection** joins nodes on the canvas.

## Canvas and editor

| Do use | Don't use |
| --- | --- |
| canvas | editor board, diagram, workspace, graph |
| sticky note | comment, annotation, label, memo |
| sub-workflow | subworkflow, sub workflow, subflow, child workflow, nested workflow |

## AI and agents

| Do use | Don't use |
| --- | --- |
| sub-agent | subagent, child agent |

## Platform and deployment

| Do use | Don't use |
| --- | --- |
| self-hosted | self hosted, on-premise, on-premises, on-prem |
| n8n Cloud; Cloud | hosted version, SaaS, the cloud, managed n8n |
| instance | server, deployment, box |
| Enterprise (plan) | enterprise edition, premium, paid tier |

## Source control and environments

**Source control** is n8n's own feature name for its Git-based workflow syncing; **version control** is the general term for what Git itself provides. Use "source control" to name the n8n feature, and reserve "version control" for describing Git as a concept (for example, "Git, a version control system"). Don't use them interchangeably as two names for the same n8n feature.

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
