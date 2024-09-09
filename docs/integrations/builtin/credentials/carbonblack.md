---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Carbon Black credentials
description: Documentation for the Carbon Black credentials. Use these credentials to authenticate Carbon Black in n8n, a workflow automation platform.
---

# Carbon Black credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

- Create a [Carbon Black subscription](https://www.vmware.com/products/carbon-black-cloud.html){:target=_blank .external-link}.
- Create a [Carbon Black developer account](https://developer.carbonblack.com/){:target=_blank .external-link}.

## Authentication methods

- API key

## Related resources

Refer to [Carbon Black's documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/cb-defense/latest/rest-api/){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/carbon-black/){:target=_blank .external-link} on n8n's website.

## Using API key

To configure this credential, you'll need:

- A **URL**: This URL is determined by the environment/product URL you use. You can find it by looking at the web address of your Carbon Black Cloud console. Refer to [Carbon Black's URL Parts documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/authentication#the-url-parts){:target=_blank .external-link} for more information.
- An **Access Token**: Refer to the [Carbon Black Create an API key documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/authentication#carbon-black-cloud-manages-identities-and-roles){:target=_blank .external-link} to create an API key. Add the **API Secret Key** as the **Access Token** in n8n.
