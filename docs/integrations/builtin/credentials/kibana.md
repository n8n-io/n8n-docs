---
title: Kibana credentials
description: Documentation for the Kibana credentials. Use these credentials to authenticate Kibana in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Kibana credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

- Create an [Elasticsearch](https://www.elastic.co/) account.
- If you're creating a new account to test with, load some sample data into Kibana. Refer to the [Kibana quick start](https://www.elastic.co/guide/en/kibana/current/get-started.html) for more information.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Kibana's API documentation](https://www.elastic.co/guide/en/kibana/current/api.html) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/kibana/) on n8n's website.

## Using basic auth

To configure this credential, you'll need:

- The **URL** you use to access Kibana, for example `http://localhost:5601`
- A **Username**: Use the same username that you use to log in to Elastic.
- A **Password**: Use the same password that you use to log in to Elastic.