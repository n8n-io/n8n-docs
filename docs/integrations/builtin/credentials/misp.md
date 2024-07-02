---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MISP credentials
description: Documentation for MISP credentials. Use these credentials to authenticate MISP in n8n, a workflow automation platform.
contentType: integration
---

# MISP credentials

You can use these credentials to authenticate the following nodes:

- [MISP](/integrations/builtin/app-nodes/n8n-nodes-base.misp/)

## Prerequisites

Install and run a [MISP](https://misp.github.io/MISP/){:target=_blank .external-link} instance.

## Supported authentication methods

- API key

## Related resources

Refer to [MISP's Automation API documentation](https://www.circl.lu/doc/misp/automation){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: In MISP, these are called Automation keys. Get an automation key from **Event Actions > Automation**. Refer to [MISP's automation keys documentation](https://www.circl.lu/doc/misp/automation/#automation-key){:target=_blank .external-link} for instructions on generating more keys.
- A **Base URL**: Your MISP URL.
- Select whether to **Allow Unauthorized Certificates**: If turned on, the credential will connect even if SSL certificate validation fails.

