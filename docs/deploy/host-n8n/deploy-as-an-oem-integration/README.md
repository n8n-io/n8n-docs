---
title: OEM deployment
description: >-
  Overview of OEM deployment - surfacing n8n's interface inside your own
  product's UI under an OEM agreement.
contentType: overview
nodeTitle: Deploy as an OEM integration
originalFilePath: hosting/oem-deployment/index.md
originalUrl: 'https://docs.n8n.io/hosting/oem-deployment'
url: 'https://docs.n8n.io/deploy/host-n8n/deploy-as-an-oem-integration'
layout:
  description:
    visible: false
---

# OEM deployment <a href="#oem-deployment" id="oem-deployment"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6kdIvlPPl0XWVn5z8UJh/" %}

n8n's OEM deployment option lets you embed and surface n8n's interface inside your own product's UI. This allows your users to build workflows, configure connections, and run workflow automation without leaving your product. n8n branding is required as part of an OEM integration.

This is distinct from [using n8n as a backend](../README.md), where workflows execute behind the scenes and end users never see n8n. In that model, your product calls n8n using a webhook or the [API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api) to trigger workflows, and n8n behaves like any other self-hosted service in your infrastructure - your users never see any n8n UI. This is available on all paid plans under the standard license, with no separate agreement needed. OEM deployment is only necessary when you want your users to interact with the n8n editor directly.

## What's covered <a href="#whats-covered" id="whats-covered"></a>

- [Prerequisites](prerequisites.md): Guidance on CPU, memory, and database requirements for planning your deployment.
- [Managing workflows](manage-workflows.md): Patterns for managing workflows across multiple users or organizations within an embedded deployment.
- [Token exchange](set-up-token-exchange.md): Authenticate users from your own identity provider through iframe SSO and call n8n APIs on their behalf.
- [Workflow templates](../configure-n8n/basic-configuration/configuration-examples/configure-a-custom-workflow-templates-library.md): Configure a custom workflow template library for your users.
- [Credential overwrites](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/credential-overwrites): Set OAuth credentials globally so your users can authenticate without seeing or entering client secrets.


## Support <a href="#support" id="support"></a>

Contact [n8n support](mailto:support@n8n.io) using the email provided when you signed your OEM agreement. The [community forum](https://community.n8n.io/) is also available for general questions.
