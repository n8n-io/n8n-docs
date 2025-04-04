---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: "Credentials"
description: n8n credentials explanation.
contentType: overview
---

An n8n credential is a secure way to store authentication details needed to connect to external services. Instead of entering authentication details directly inside the workflow, users create and manage credentials separately, attaching them to the relevant nodes as needed. This improves security, reusability, and maintainability, as the created credentials can be used across multiple workflows.

## Types of Credential

The specifics of each credential depend on the service being authenticated to. Some common types are:

- Basic Authentication: Uses a username and password to authenticate requests.
- API Key: Used when a service requires an API key for access.
- OAuth: Common for services like Google, Slack, and GitHub, where users authenticate via OAuth and n8n stores the access token.
- Header Auth: For some APIs and webhooks, authentication uses similar tokens but formatted into request headers.

Credentials are managed in the n8n credential manager, where they can be added, edited, or deleted without modifying workflows. This approach improves security by keeping sensitive data encrypted and separate from workflow logic, making automation more scalable and secure.

For more on how to use and manage credentials in n8n, see the [Using n8n documentation](/credentials/index.md).
