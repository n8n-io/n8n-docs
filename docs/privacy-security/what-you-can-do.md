---
title: What you can do
description: What you can do to improve privacy and data security when using n8n.
contentType: howto
---
<!-- vale off -->
# What you can do

It's also your responsibility as a customer to ensure you are securing your code and data. This document lists some steps you can take.

## All users

* Report security issues and [terms of service](https://n8n.io/legal/#terms) violations to security@n8n.io.
* If more than one person uses your n8n instance, set up [User management](/user-management/index.md) and follow the [Best practices](/user-management/best-practices.md).
* Use OAuth to connect integrations whenever possible.

## Self-hosted users

If you self-host n8n, there are additional steps you can take:

* Set up a reverse proxy to handle TLS, ensuring data is encrypted in transit.
* Ensure data is encrypted at rest by using encrypted partitions, or encryption at the hardware level, and ensuring n8n and its database is written to that location.
* Run a [Security audit](/hosting/securing/security-audit.md).
* Be aware of the [Risks](/integrations/community-nodes/risks.md) when installing community nodes, or choose to disable them.
* Make sure users can't import external modules in the Code node. Refer to [Environment variables | Nodes](/hosting/configuration/environment-variables/nodes.md) for more information.
* Choose to exclude certain nodes. For example, you can disable nodes like Execute Command or SSH. Refer to [Environment variables | Nodes](/hosting/configuration/environment-variables/nodes.md) for more information.
* For maximum privacy, you can [Isolate n8n](/hosting/configuration/configuration-examples/isolation.md).

### GDPR for self-hosted users

--8<-- "_snippets/privacy-security/gdpr-self-hosted.md"

<!-- vale on -->
