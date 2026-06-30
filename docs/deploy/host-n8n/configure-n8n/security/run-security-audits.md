---
title: Security audit
description: Run a security audit on your n8n instance.
contentType: howto
nodeTitle: Run security audits
originalFilePath: hosting/securing/security-audit.md
originalUrl: 'https://docs.n8n.io/hosting/securing/security-audit'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/run-security-audits'
layout:
  description:
    visible: false
---

# Security audit <a href="#security-audit" id="security-audit"></a>

You can run a security audit on your n8n instance, to detect common security issues.

## Run an audit <a href="#run-an-audit" id="run-an-audit"></a>

You can run an audit using the CLI, the public API, or the n8n node.


### CLI <a href="#cli" id="cli"></a>

Run `n8n audit`.

### API <a href="#api" id="api"></a>

Make a `POST` call to the `/audit` endpoint. You must authenticate as the instance owner.

### n8n node <a href="#n8n-node" id="n8n-node"></a>

Add the [n8n node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8n) to your workflow. Select **Resource** > **Audit** and **Operation** > **Generate**.

## Report contents <a href="#report-contents" id="report-contents"></a>

The audit generates five risk reports:

### Credentials <a href="#credentials" id="credentials"></a>

This report shows:

* Credentials not used in a workflow.
* Credentials not used in an active workflow.
* Credentials not use in a recently active workflow.

### Database <a href="#database" id="database"></a>

This report shows:

* Expressions used in **Execute Query** fields in SQL nodes.
* Expressions used in **Query Parameters** fields in SQL nodes.
* Unused **Query Parameters** fields in SQL nodes.

### File system <a href="#file-system" id="file-system"></a>

This report lists nodes that interact with the file system.

### Nodes <a href="#nodes" id="nodes"></a>

This report shows:

* Official risky nodes. These are n8n built in nodes. You can use them to fetch and run any code on the host system, which exposes the instance to exploits. You can view the list in [n8n code | Audit constants](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/security-audit/constants.ts#L51), under `OFFICIAL_RISKY_NODE_TYPES`.
* Community nodes.
* Custom nodes.

### Instance <a href="#instance" id="instance"></a>

This report shows:

* Unprotected webhooks in the instance.
* Missing security settings
* If your instance is outdated.
