---
title: Qualys credentials
description: Documentation for the Qualys credentials. Use these credentials to authenticate Qualys in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Qualys credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

Create a [Qualys](https://www.qualys.com/) user account with any user role except Contact.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Qualys's documentation](https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/api_doc/index.htm) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/qualys/) on n8n's website.

## Using basic auth

To configure this credential, you'll need:

- A **Username**
- A **Password**
- A **Requested With** string: Enter a user description, like a user agent, or keep the default `n8n application`. This sets the required `X-Requested-With` header.