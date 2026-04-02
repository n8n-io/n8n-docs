---
title: TOTP
description: Documentation for the TOTP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
---

# TOTP

The TOTP node provides a way to generate a TOTP (time-based one-time password).

/// note | Credentials
Refer to [TOTP credentials](/integrations/builtin/credentials/totp.md) for guidance on setting up authentication. 
///

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

Configure this node with these parameters.

### Credential to connect with

Select or create a [TOTP credential](/integrations/builtin/credentials/totp.md) for the node to use.

### Operation

**Generate Secret** is the only operation currently supported.

## Node options

Use these **Options** to further configure the node.

### Algorithm

Select the HMAC hashing algorithm to use. Default is SHA1.

### Digits

Enter the number of digits in the generated code. Default is `6`.

### Period

Enter how many seconds the TOTP is valid for. Default is `30`.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'totp') ]]
