---
title: MCP credentials
description: Documentation for MCP credentials. Use these credentials to authenticate MCP servers in n8n, a workflow automation platform.
layout:
  description:
    visible: false
contentType: [integration, reference]
---

# MCP credentials

You can use these credentials to authenticate the following nodes:

* [MCP Client](../core-nodes/n8n-nodes-langchain.mcpClient.md)
* [MCP Client Tool](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md)

## Prerequisites

You need an MCP server that supports OAuth2 authentication.

## Supported authentication methods

* OAuth2

## Using OAuth2

This credential extends n8n's generic [OAuth2 API credential](./httprequest.md#using-oauth2), with two additional fields for MCP's authorization flow:

* **Register Client Automatically**: Turned on by default. n8n identifies itself to the MCP server, so you don't create an app or enter a Client ID and Client Secret. It uses a Client ID Metadata Document (CIMD) when both the server and your instance support it, and Dynamic Client Registration (DCR, [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591)) otherwise. [Automatic OAuth client registration](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/automatic-oauth-client-registration) explains how n8n picks the method and how to turn on CIMD on a self-hosted instance.

    Turn this off if your MCP server supports neither CIMD nor DCR, or if you already have a Client ID and Client Secret from the server's own developer settings. In that case, fill in the standard OAuth2 fields (**Authorization URL**, **Access Token URL**, **Client ID**, **Client Secret**) as you would for any generic OAuth2 credential.
* **Resource URL**: Optional. The exact protected resource URL required by the MCP server. Leave this empty to let n8n discover it automatically from the server.

{% hint style="info" %}
**Having trouble with automatic registration?**

If you see errors related to a mismatched or invalid redirect URI during the OAuth2 flow, double-check that your MCP server's Dynamic Client Registration endpoint is configured to accept n8n's OAuth Redirect URL exactly as shown in the credential.

If the MCP server shows an error on its own page after you turn on CIMD, the server probably can't download n8n's client metadata document. For this and other errors, refer to [Troubleshoot automatic registration](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/automatic-oauth-client-registration#troubleshoot-automatic-registration).
{% endhint %}
