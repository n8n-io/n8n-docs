---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Splunk credentials
description: Documentation for Splunk credentials. Use these credentials to authenticate Splunk in n8n, a workflow automation platform.
contentType: integration
---

# Splunk credentials

You can use these credentials to authenticate the following nodes:

- [Splunk](/integrations/builtin/app-nodes/n8n-nodes-base.splunk/)

## Prerequisites

- [Download and install](https://www.splunk.com/en_us/download/splunk-enterprise.html){:target=_blank .external-link} Splunk Enterprise.
- [Enable token authentication](https://docs.splunk.com/Documentation/Splunk/9.2.1/Security/EnableTokenAuth){:target=_blank .external-link} in **Settings > Tokens**.

/// note | Free trial Splunk Cloud Platform accounts can't access the REST API
Free trial Splunk Cloud Platform accounts don't have access to the REST API. Ensure you have the necessary permissions. Refer to [Access requirements and limitations for the Splunk Cloud Platform REST API](https://docs.splunk.com/Documentation/SplunkCloud/8.2.2203/RESTTUT/RESTandCloud){:target=_blank .external-link} for more details.
///

## Supported authentication methods

- API auth token

## Related resources

Refer to [Splunk's Enterprise API documentation](https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTprolog){:target=_blank .external-link} for more information about the service.

## Using API auth token

To configure this credential, you'll need:

- An **Auth Token**: Once you've enabled token authentication, create an auth token in **Settings > Tokens**. Refer to [Creating authentication tokens](https://docs.splunk.com/Documentation/Splunk/9.2.1/Security/CreateAuthTokens){:target=_blank .external-link} for more information.
- A **Base URL**: For your Splunk instance. This should include the protocol, domain, and port, for example: `https://localhost:8089`.
- **Allow Self-Signed Certificates**: If turned on, n8n will connect even if SSL validation fails.

## Required capabilities

Your Splunk platform account and role must have certain capabilities to create authentication tokens:

- `edit_tokens_own`: Required if you want to create tokens for yourself.
- `edit_tokens_all`: Required if you want to create tokens for any user on the instance.

Refer to [Define roles on the Splunk platform with capabilities](https://docs.splunk.com/Documentation/Splunk/9.2.1/Security/Rolesandcapabilities){:target=_blank .external-link} for more information.
