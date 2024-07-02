---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Qualys credentials
description: Documentation for the Qualys credentials. Use these credentials to authenticate Qualys in n8n, a workflow automation platform.
contentType: integration
---

# Qualys credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

Create a [Qualys](https://www.qualys.com/){:target=_blank .external-link} user account with any user role except Contact.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Qualys's documentation](https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/api_doc/index.htm){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/qualys/){:target=_blank .external-link} on n8n's website.

## Using basic auth

To configure this credential, you'll need:

- A **Username**
- A **Password**
- A **Requested With** string: Enter a user description, like a user agent, or keep the default `n8n application`. This sets the required `X-Requested-With` header.