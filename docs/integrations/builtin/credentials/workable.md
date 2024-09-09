---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workable credentials
description: Documentation for Workable credentials. Use these credentials to authenticate Workable in n8n, a workflow automation platform.
contentType: integration
---

# Workable credentials

You can use these credentials to authenticate the following nodes:

- [Workable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.workabletrigger/)

## Prerequisites

Create a [Workable](https://www.workable.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [Workable's API documentation](https://workable.readme.io/reference/generate-an-access-token){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- A **Subdomain**: Your Workable subdomain is the part of your Workable domain between `https://` and `.workable.com`. So if the full domain is `https://n8n.workable.com`, the subdomain is `n8n`. The subdomain is also displayed on your Workable **Company Profile** page.
- An **Access Token**: Go to your **profile >** [**Integrations**](https://workable.com/backend/settings/integrations){:target=_blank .external-link} **> Apps** and select **Generate API token**. Refer to [Generate a new token](https://help.workable.com/hc/en-us/articles/115015785428-Generating-revoking-access-tokens-for-Workable-s-API#Generateanewtoken) for more information.

    <!-- vale off -->
    /// note | Token scopes
    If you're using this credential with the [Workable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.workabletrigger/) node, select the `r_candidates` and `r_jobs` scopes when you generate your token. If you're using this credential in other ways, select scopes that are relevant for your use case.

    Refer to [Supported API scopes](https://help.workable.com/hc/en-us/articles/115015785428-Generating-revoking-access-tokens-for-Workable-s-API#SupportedAPIscopes){:target=_blank .external-link} for more information on scopes.
    ///
    <!-- vale on -->
