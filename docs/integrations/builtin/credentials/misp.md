---
title: MISP credentials
description: Documentation for MISP credentials. Use these credentials to authenticate MISP in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# MISP credentials

You can use these credentials to authenticate the following nodes:

- [MISP](/integrations/builtin/app-nodes/n8n-nodes-base.misp.md)

## Prerequisites

Install and run a [MISP](https://misp.github.io/MISP/) instance.

## Supported authentication methods

- API key

## Related resources

Refer to [MISP's Automation API documentation](https://www.circl.lu/doc/misp/automation) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: In MISP, these are called Automation keys. Get an automation key from **Event Actions > Automation**. Refer to [MISP's automation keys documentation](https://www.circl.lu/doc/misp/automation/#automation-key) for instructions on generating more keys.
- A **Base URL**: Your MISP URL.
- Select whether to **Allow Unauthorized Certificates**: If turned on, the credential will connect even if SSL certificate validation fails.

