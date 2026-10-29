---
title: What you can do
description: What you can do to improve privacy and data security when using n8n.
contentType: howto
nodeTitle: What you can do
originalFilePath: privacy-security/what-you-can-do.md
originalUrl: 'https://docs.n8n.io/privacy-security/what-you-can-do'
url: 'https://docs.n8n.io/privacy-and-security/what-you-can-do'
layout:
  description:
    visible: false
---

# What you can do <a href="#what-you-can-do" id="what-you-can-do"></a>

It's also your responsibility as a customer to ensure you are securing your code and data. This document lists some steps you can take.

## All users <a href="#all-users" id="all-users"></a>

* Report security issues and [terms of service](https://n8n.io/legal/#terms) violations to security@n8n.io.
* If more than one person uses your n8n instance, set up [User management](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access) and follow the [Best practices](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/follow-best-practices).
* Use OAuth to connect integrations whenever possible.

## Self-hosted users <a href="#self-hosted-users" id="self-hosted-users"></a>

If you self-host n8n, there are additional steps you can take:

* Set up a reverse proxy to handle TLS, ensuring data is encrypted in transit.
* Ensure data is encrypted at rest by using encrypted partitions, or encryption at the hardware level, and ensuring n8n and its database is written to that location.
* Run a [Security audit](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/run-security-audits).
* Be aware of the [Risks](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/risks) when installing community nodes, or choose to disable them.
* Make sure users can't import external modules in the Code node. Refer to [Environment variables | Nodes](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/nodes) for more information.
* Choose to exclude certain nodes. For example, you can disable nodes like Execute Command or SSH. Refer to [Environment variables | Nodes](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/nodes) for more information.
* For maximum privacy, you can [Isolate n8n](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/isolate-n8n).

### GDPR for self-hosted users <a href="#gdpr-for-self-hosted-users" id="gdpr-for-self-hosted-users"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iLayKGKnzGLWFd5VGZVk/" %}


