---
# https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Keboola credentials
description: Documentation for Keboola credentials. Use these credentials to authenticate Keboola in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: low
---

# Keboola credentials

Use these credentials to authenticate the following nodes:

- [Keboola](/integrations/builtin/app-nodes/n8n-nodes-base.keboola.md)

## Supported authentication methods

- **API Token**: Use with the [Keboola](/integrations/builtin/app-nodes/n8n-nodes-base.keboola.md) node.

## Related resources

Refer to the [Keboola Storage API documentation](https://keboola.docs.apiary.io/){:target=_blank .external-link} for a full reference of supported endpoints and capabilities.

## Using an API Token

To set up this credential, you'll need a [Keboola Connection](https://www.keboola.com/){:target=_blank .external-link} account and a valid API token.

> 💡 **Tip**: You can start for free by creating a trial project at [https://connection.us-east4.gcp.keboola.com/wizard](https://connection.us-east4.gcp.keboola.com/wizard){:target=_blank .external-link}. This creates your project on the US East (GCP) stack.

### Generate an API token

1. Log into your Keboola Connection project (e.g. [https://connection.keboola.com](https://connection.keboola.com)).
2. In the top right, open the **User menu** and select **API Tokens**.
3. Click **+ Add token**.
4. Provide a **description** (e.g., `n8n integration`).
5. Select the appropriate **permissions** for reading and writing to buckets or tables.
6. Create the token and copy it — you’ll use this in n8n.

### Set up the credential in n8n

When configuring a new **Keboola API Token** credential in n8n:

- Paste your **API Token** into the `API Token` field.
- Select the appropriate **Stack Region** from the dropdown:
	- `US (Default)`
	- `EU Central (AWS)`
	- `EU North (Azure)`
	- `US East (GCP)`

Be sure to choose the region that matches your Keboola project.

Once saved, this credential will be available to use in the Keboola node across your workflows.
