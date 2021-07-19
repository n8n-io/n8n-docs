---
permalink: /credentials/clerk
description: Learn to configure credentials for the Clerk node in n8n
---

# Clerk

You can use these credentials to authenticate the following nodes with Clerk.

- [Clerk Trigger](../../nodes-library/trigger-nodes/ClerkTrigger/README.md)

## Prerequisites

Create a [Clerk](https://clerk.dev) account and follow the webhooks [integration steps](https://docs.clerk.dev/backend/webhooks).

## Using Webhook Secret

1. Open your Clerk dashboard.
2. Click on "Integrations"
3. Find "Svix" and enable it.
4. Click on "Manage webhooks".
5. Click on "+ Add Endpoint" to add a new webhook URL.
6. Use a placeholder URL until your n8n app is ready to accept webhook calls and enable the events you want this webhook to be trigered on.
7. Click on the newly created webhook.
8. Inside you will find the "Signing Secret"
9. Done, copy it and you are ready to go.

![Getting Clerk Webhook Secret credentials](./getting-webhook-secret.gif)
