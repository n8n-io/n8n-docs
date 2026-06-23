---
title: TOTP
description: >-
  Documentation for the TOTP node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
nodeTitle: TOTP
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.totp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.totp'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.totp'
layout:
  description:
    visible: false
---

# TOTP <a href="#totp" id="totp"></a>

The TOTP node provides a way to generate a TOTP (time-based one-time password).

{% hint style="info" %}
**Credentials**

Refer to [TOTP credentials](../credentials/totp.md) for guidance on setting up authentication.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

Configure this node with these parameters.

### Credential to connect with <a href="#credential-to-connect-with" id="credential-to-connect-with"></a>

Select or create a [TOTP credential](../credentials/totp.md) for the node to use.

### Operation <a href="#operation" id="operation"></a>

**Generate Secret** is the only operation currently supported.

## Node options <a href="#node-options" id="node-options"></a>

Use these **Options** to further configure the node.

### Algorithm <a href="#algorithm" id="algorithm"></a>

Select the HMAC hashing algorithm to use. Default is SHA1.

### Digits <a href="#digits" id="digits"></a>

Enter the number of digits in the generated code. Default is `6`.

### Period <a href="#period" id="period"></a>

Enter how many seconds the TOTP is valid for. Default is `30`.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse TOTP integration templates](https://n8n.io/integrations/totp) or [search all templates](https://n8n.io/workflows/)
