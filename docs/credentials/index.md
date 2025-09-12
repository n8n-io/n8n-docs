---
description: Authenticating with the services you're connecting to.
contentType: overview
---

# Credentials

An n8n [credential](/glossary.md#credential-n8n) is a secure way to store authentication details needed to connect to external services. Instead of entering authentication details directly inside the workflow, users create and manage credentials separately, attaching them to the relevant nodes as needed. This improves security, reusability, and maintainability, as the created credentials can be used across multiple workflows.

Access the credentials UI by opening the left menu and selecting **Credentials**. n8n lists credentials you created on the **My credentials** tab. The **All credentials** tab shows all credentials you can use, included credentials shared with you by other users.

## Types of credentials

The specifics of each credential depend on the service being authenticated to. Some common types are:

- Basic Authentication: Uses a username and password to authenticate requests.
- API Key: Used when a service requires an API key for access.
- OAuth: Common for services like Google, Slack, and GitHub, where users authenticate via OAuth and n8n stores the access token.
- Header Auth: For some APIs and webhooks, authentication uses similar tokens but formatted into request headers.

## More information

* [Create and edit credentials](/credentials/add-edit-credentials.md).
* Learn about [credential sharing](/credentials/credential-sharing.md).
* Find information on setting up credentials for your services in the [credentials library](/integrations/builtin/credentials/overview.md).


