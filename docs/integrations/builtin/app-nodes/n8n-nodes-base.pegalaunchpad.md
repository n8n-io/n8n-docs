---
title: Launchpad by Pegasystems node documentation
description: Learn how to use the Launchpad by Pegasystems node in n8n. Follow technical documentation to integrate Launchpad by Pegasystems node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Launchpad by Pegasystems node

Use the Launchpad by Pegasystems node to automate work in Launchpad and integrate Launchpad by Pegasystems with other applications. n8n has built-in support for a wide range of Launchpad features, including managing cases, assignments, attachments, pulses, and users through the DX API v2.

On this page, you'll find a list of operations the Launchpad by Pegasystems node supports and links to more resources.

/// note | Credentials
Refer to [Launchpad by Pegasystems credentials](/integrations/builtin/credentials/launchpad.md) for guidance on setting up authentication.
///

## Operations

* Agent
    * Get the final response from an agent conversation
    * Initiate a new conversation with an AI agent
    * Send a message to an existing agent conversation
* Assignment
    * Get an assignment
    * Perform an action on an assignment
* Attachment
    * Delete an attachment from a case
    * Get an attachment from a case
    * Upload an attachment to a case
* Case
    * Create a case
    * Get a case
* Pulse
    * Add a pulse message to a case
    * Get pulse messages for a case
    * Reply to a pulse message on a case
* User
    * Mark a user as active
    * Mark a user as inactive

## Node parameters

### Base URL

The base URL of your Launchpad instance (without a trailing slash). For example: `https://your-launchpad-domain.com`.

### Resource

Select the resource you want to work with:

- **Agent**: Interact with Pega AI agents — start conversations, send messages, and retrieve final responses.
- **Assignment**: View and perform actions on work assignments.
- **Attachment**: Manage file attachments on cases.
- **Case**: Create and retrieve cases.
- **Pulse**: Post and view collaboration messages on cases.
- **User**: Manage user availability status.

## Working with AI agents

The Agent resource allows you to interact with Pega AI agents through a conversational workflow. A typical flow involves three steps:

1. **Initiate Conversation**: Start a new conversation with an AI agent by providing the agent name and a context ID. The context ID is an encoded identifier that ties the conversation to a specific case or context in your Pega application.

2. **Send Message**: Send a message (prompt) to the agent within the active conversation. You need the Agent ID and Conversation ID returned from the initiation step.

3. **Get Final Response**: Retrieve the agent's final response for a conversation. This uses a data view (`GetAgentFinalResponse`) and requires only the Conversation ID.

### Agent parameters

| Parameter | Operation | Description |
|-----------|-----------|-------------|
| **Agent Name** | Initiate Conversation | The fully qualified name of the AI agent (e.g., `TestApp__SummaryAgent`) |
| **Context ID** | Initiate Conversation | The encoded context ID for the conversation |
| **Execute Starter Question** | Initiate Conversation | *(Optional)* Whether to execute the starter question when initiating |
| **Agent ID** | Send Message | The ID (fully qualified name) of the AI agent |
| **Conversation ID** | Send Message, Get Final Response | The ID of the conversation |
| **Request** | Send Message | The message text to send to the agent |

### Example: Complete agent conversation flow

1. Use **Initiate Conversation** with your agent name and context ID
2. From the response, extract the `ConversationID` and `AgentID`
3. Use **Send Message** with the agent ID, conversation ID, and your prompt
4. Use **Get Final Response** with the conversation ID to retrieve the agent's answer

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'pega-launchpad') ]]

## Related resources

Refer to [Pegasystems' Launchpad documentation](https://docs.pega.com/bundle/launchpad/page/platform/launchpad/introducing-launchpad.html) for more information about the service.

Refer to [Pegasystems' DX API documentation](https://docs.pega.com/bundle/launchpad/page/platform/launchpad/dx-api-endpoints.html) for detailed API reference.

## Working with the If-Match header

Some operations (Perform Action on Assignment, Mark User as Active, Mark User as Inactive) require an `If-Match` header value. This is the ETag of the resource, which you receive in the response when you get the resource.

The Pega DX API returns ETags in the standard weak ETag format: `W/"<value>"` (for example, `W/"3"`). The node passes this value directly to the `If-Match` header.

To chain operations, use an expression like `{{ $json.responseHeaders.etag }}` to pass the ETag from a GET response into the If-Match field of a subsequent update operation.

## Common issues

Here are some common errors and issues with the Launchpad by Pegasystems node and steps to resolve or troubleshoot them.

### Authentication errors

Make sure you've correctly configured the OAuth2 Client Credentials in the [Launchpad by Pegasystems credentials](/integrations/builtin/credentials/launchpad.md). Verify that:

- The **Access Token URL** points to your Launchpad instance's OAuth2 token endpoint.
- The **Client ID** and **Client Secret** are correct.
- Your OAuth2 client has the necessary permissions to access the DX API.

### If-Match header errors

If you receive a `412 Precondition Failed` error when performing actions on assignments or updating user status, the ETag value you're using may be outdated. Get the resource again to obtain the latest ETag value before retrying the operation.

### Base URL issues

Ensure the Base URL doesn't include a trailing slash or API path. It should be just the domain, for example: `https://your-launchpad-domain.com`, not `https://your-launchpad-domain.com/` or `https://your-launchpad-domain.com/dx/api/`.
