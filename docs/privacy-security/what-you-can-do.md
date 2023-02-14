---
title: What you can do
description: What you can do to improve privacy and data security when using n8n.
---

# What you can do

It's also your responsibility as a customer to ensure you are securing your code and data. This document lists some steps you can take.

## All users

* Report security issues and [terms of service](https://n8n.io/legal/){:target=_blank .external-link} violations to security@n8n.io.
* If more than one person uses your n8n instance, set up [User management](/user-management/) and follow the [Best practices](/user-management/best-practices/).
* Use OAuth to connect integrations whenever possible.

## Self-hosted users

If you self-host n8n, there are additional steps you can take:

* Set up a reverse proxy
* Run a [Security audit](/hosting/security-audit/).
* Be aware of the [Risks](/integrations/community-nodes/risks/) when installing community nodes, or choose to disable them.
* Make sure users can't import external modules in the Code node. Refer to [Environment variables | Nodes](https://docs.n8n.io/hosting/environment-variables/environment-variables/#nodes) for more information.
* For maximum privacy, you can [Isolate n8n](/hosting/environment-variables/configuration-examples/isolation/).

### GDPR for self-hosted users

If you self-host n8n, you are responsible for deleting user data. If you need to delete data on behalf of one of your users, you can delete the respective execution. n8n recommends configuring n8n to prune execution data automatically after few days to avoid effortful GDPR request handling as much as possible. Configure this using the `EXECUTIONS_DATA_MAX_AGE` environment variable. Refer to [Environment variables](/hosting/environment-variables/environment-variables/) for more information.

