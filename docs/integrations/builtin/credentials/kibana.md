---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Kibana credentials
description: Documentation for the Kibana credentials. Use these credentials to authenticate Kibana in n8n, a workflow automation platform.
---

# Kibana credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

- Create an [Elasticsearch](https://www.elastic.co/){:target=_blank .external-link} account.
- If you're creating a new account to test with, load some sample data into Kibana. Refer to the [Kibana quick start](https://www.elastic.co/guide/en/kibana/current/get-started.html){:target=_blank .external-link} for more information.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Kibana's API documentation](https://www.elastic.co/guide/en/kibana/current/api.html){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/kibana/){:target=_blank .external-link} on n8n's website.

## Using basic auth

To configure this credential, you'll need:

- The **URL** you use to access Kibana, for example `http://localhost:5601`
- A **Username**: Use the same username that you use to log in to Elastic.
- A **Password**: Use the same password that you use to log in to Elastic.