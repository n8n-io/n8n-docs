---
title: TOTP
description: Documentation for the TOTP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# TOTP

The TOTP node provides a way to generate a TOTP (time-based one-time password).

/// note | Credentials
Refer to [TOTP credentials](/integrations/builtin/credentials/totp/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [TOTP integrations](https://n8n.io/integrations/totp/){:target="_blank" .external-link} list.
///
## Operations

Generate Secret

## Options

Select **Add Option** to view and add node options.

You can choose:

* **Algorithm**: the HMAC hashing algorithm. Default is SHA1.
* **Digits**: number of digits in the generated code. Default is 6.
* **Period**: how many seconds the TOTP is valid for. Default is 30 seconds.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/totp/){:target=_blank .external-link} on n8n's website.
