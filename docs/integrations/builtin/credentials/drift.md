---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Drift credentials
description: Documentation for Drift credentials. Use these credentials to authenticate Drift in n8n, a workflow automation platform.
contentType: integration
---

# Drift credentials

You can use these credentials to authenticate the following nodes:

- [Drift](/integrations/builtin/app-nodes/n8n-nodes-base.drift/)

## Prerequisites

- Create a [Drift](https://www.drift.com/){:target=_blank .external-link} account.
- [Create a Drift app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-){:target=_blank .external-link}.

## Supported authentication methods

- API personal access token
- OAuth2

## Related resources

Refer to [Drift's API documentation](https://devdocs.drift.com/docs/using-drift-apis){:target=_blank .external-link} for more information about the service.

## Using API personal access token

To configure this credential, you'll need:

- A **Personal Access Token**: To get a token, [create a Drift app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-){:target=_blank .external-link}. [Install the app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-){:target=_blank .external-link} to generate an OAuth Access token. Add this to the n8n credential as your **Personal Access Token**.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Drift Authentication and Scopes documentation](https://devdocs.drift.com/docs/authentication-and-scopes){:target=_blank .external-link} to set up OAuth for your app.
