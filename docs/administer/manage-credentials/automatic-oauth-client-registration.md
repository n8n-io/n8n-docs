---
description: >-
  Connect some OAuth2 credentials without an OAuth app of your own. n8n
  identifies itself to the OAuth2 server with a Client ID Metadata Document
  (CIMD) or Dynamic Client Registration (DCR).
layout:
  description:
    visible: false
---

# Automatic OAuth client registration

Automatic OAuth client registration lets some OAuth2 credentials connect without an OAuth app of your own, so you don't enter a client ID or client secret.

{% hint style="info" %}
**Feature availability**

Automatic OAuth client registration with Client ID Metadata Documents, and the **Automatic (recommended)** option for app credentials, are available from n8n X.Y.Z.

Client ID Metadata Documents are available on:

- **n8n Cloud:** not available yet. Cloud instances use Dynamic Client Registration.
- **Self-hosted:** all plans. An instance owner must turn them on.
{% endhint %}

## Credentials that support automatic registration

| Credential | Setting | Default |
| :--------- | :------ | :------ |
| [MCP credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/mcp), used by the **MCP Client** node and the **MCP Client Tool** node | The **Register Client Automatically** toggle | On |
| MCP servers from the MCP registry | None. n8n always registers the client automatically. | On |
| App credentials that n8n has tested with automatic registration. The credential page of each app says if it supports automatic registration. | The **Automatic (recommended)** option, next to **Custom OAuth2** | **Automatic (recommended)** for new credentials. Existing credentials stay on **Custom OAuth2**. |

The generic OAuth2 API credential doesn't support automatic registration. Enter the client ID and client secret of your own OAuth app.

If your instance has a managed OAuth app for a service, n8n uses the managed app and doesn't show the **Automatic (recommended)** option.

## How n8n registers the client: CIMD and DCR

When you connect a credential with automatic registration, n8n reads the metadata of the OAuth2 server. Then n8n uses one of two methods to identify itself:

- **Client ID Metadata Document (CIMD):** n8n uses the URL of a JSON document as its client ID. The OAuth2 server downloads the document to get the name of the client and its redirect URL. n8n sends no registration request and gets no client secret. The [MCP authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) recommends CIMD.
- **Dynamic Client Registration (DCR):** n8n sends a registration request to the OAuth2 server ([RFC 7591](https://www.rfc-editor.org/rfc/rfc7591)). The server returns a client ID, and sometimes a client secret. Each credential registers its own client.

n8n uses CIMD when all of these conditions are true:

- CIMD is on for the instance. Refer to [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance).
- The URL of the metadata document is an HTTPS URL with a path.
- The OAuth2 server supports CIMD, PKCE with the `S256` method, and public clients.
- The credential doesn't use [JWE token decryption](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/decrypt-oauth-20-tokens-with-jwe).

If one condition is false, n8n uses DCR. If the server doesn't support DCR either, n8n shows an error. For example, an OAuth2 server that supports only CIMD works only when CIMD is on.

For both methods, the OAuth2 server must support PKCE with the `S256` method.

## Turn on CIMD on a self-hosted instance

CIMD is off by default, because the OAuth2 server must download the metadata document from your instance. n8n can't detect if the server can reach your instance.

Turn on CIMD only if all of these conditions are true:

- Your instance has a public HTTPS URL.
- The OAuth2 servers can download `https://<your-n8n-domain>/rest/oauth2-credential/client-metadata.json` without a login.

Keep CIMD off if your instance runs on your computer, on an intranet, or behind a proxy that requires a login, such as an SSO proxy. In these cases, n8n uses DCR. To use CIMD anyway, host the document on a different server. Refer to [Use your own client metadata document](#use-your-own-client-metadata-document).

To turn on CIMD:

1. Set `N8N_EDITOR_BASE_URL` to the public HTTPS URL of your instance. If you don't set it, n8n uses the webhook URL. n8n uses this URL to make the URL of the document and the OAuth callback URL.
2. Set `N8N_OAUTH_CIMD_ENABLED` to `true`. Refer to [Credentials environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials).
3. Restart n8n.
4. Make sure that the document is available from outside your network:

	```shell
	curl https://<your-n8n-domain>/rest/oauth2-credential/client-metadata.json
	```

5. Connect or reconnect your credentials.

The document looks like this:

```json
{
	"client_id": "https://<your-n8n-domain>/rest/oauth2-credential/client-metadata.json",
	"client_name": "n8n",
	"client_uri": "https://n8n.io/",
	"redirect_uris": ["https://<your-n8n-domain>/rest/oauth2-credential/callback"],
	"grant_types": ["authorization_code", "refresh_token"],
	"response_types": ["code"],
	"token_endpoint_auth_method": "none"
}
```

When CIMD is off, the URL of the document returns a `404` error.

If the URL of the document isn't an HTTPS URL with a path, n8n uses DCR and logs this warning: `Client ID metadata document URL is not an HTTPS URL with a path, using DCR instead`.

## Use your own client metadata document

You can host the client metadata document on a different HTTPS server. Do this, for example, if OAuth2 servers can't reach your instance, but your users' browsers can. The OAuth2 server downloads only the document. The OAuth callback goes through the browser of the user.

1. Host a JSON document over HTTPS without a login. Use the document in [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance) as a template, and make these changes:
	- Set `client_id` to the URL of your document. The two values must be the same.
	- Make sure that `redirect_uris` contains the OAuth callback URL of your instance: `https://<your-n8n-domain>/rest/oauth2-credential/callback`.
2. Set `N8N_OAUTH_CLIENT_METADATA_URL` to the URL of your document.
3. Set `N8N_OAUTH_CIMD_ENABLED` to `true`.
4. Restart n8n.

If the OAuth callback URL of your instance changes, update `redirect_uris` in the document. If the URL of the document changes, keep the old URL available until all credentials reconnect.

## Existing credentials and automatic registration

n8n registers the client when you select **Connect my account**. Credentials that you connected before you turned on CIMD keep their DCR client ID. When you reconnect such a credential, n8n uses CIMD if the server supports it. Then the client ID changes to the URL of the metadata document, and n8n deletes the stored client secret.

When n8n refreshes an access token, it uses the stored client ID. A refresh doesn't register a new client.

## Troubleshoot automatic registration

### An error shows on the page of the OAuth2 server

If CIMD fails, the OAuth2 server shows the error on its own page, not in n8n. For example: `This authorization request is invalid.` Usually the server can't download the metadata document.

To fix the problem, do one of these steps:

- Make sure that the document is available from outside your network. Refer to [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance).
- Set `N8N_OAUTH_CIMD_ENABLED` to `false`, restart n8n, and reconnect the credential. n8n then uses DCR.
- Use your own OAuth app. In an MCP credential, turn off **Register Client Automatically**. In other credentials, select **Custom OAuth2**. Then enter a client ID and a client secret.

### The OAuth2 server doesn't support automatic client registration

n8n shows this error when the server supports neither CIMD nor DCR, or supports only CIMD and CIMD is off:

```
The OAuth2 server does not support automatic client registration. Enter the client ID of your own OAuth app instead.
```

If the server supports CIMD, turn on CIMD. Otherwise, use your own OAuth app.

### The OAuth2 server doesn't support PKCE

```
The OAuth2 server does not support PKCE with the S256 method, which automatic client registration requires
```

Automatic registration requires PKCE. Use your own OAuth app.

### n8n can't read the metadata of the OAuth2 server

```
Failed to discover OAuth2 authorization server metadata. Tried: <urls>. Last error: <error>
```

n8n couldn't get valid metadata from the server. For example, the `issuer` in the metadata isn't the same as the URL of the server. If you use an MCP credential, make sure that the URL of the MCP server is correct. If the URL is correct, contact the provider of the server or use your own OAuth app.

### The OAuth2 server returned an error

When the OAuth2 server sends an error instead of an authorization code, the n8n window shows `The OAuth2 server returned an error.` If n8n can confirm the identity of the server, the window also shows the error code and description of the server. For example, you get `access_denied` when you deny access on the consent page. If n8n can't confirm the identity of the server, it doesn't show the details.

### The authorization response came from an unexpected server

```
The authorization response came from an unexpected OAuth2 server.
```

The response came from a different server than the server that n8n sent you to. n8n doesn't complete the connection. Reconnect the credential. If the error continues, contact the provider of the server.

### Redirect URI errors

If you get an error about a redirect URI that isn't valid or doesn't match, the OAuth2 server doesn't accept the OAuth callback URL of n8n. With DCR, make sure that the server accepts the **OAuth Redirect URL** shown in the credential exactly. With your own client metadata document, make sure that `redirect_uris` contains this URL.

## Related resources

* [Manage credentials](./)
* [Share credentials securely](share-credentials-securely.md)
* [Use personal credentials in projects](use-personal-credentials-in-projects.md)
* [End-user credentials](end-user-credentials.md)
* [Credential overwrites](credential-overwrites.md)
* [Use external secret stores](use-external-secret-stores.md)
* [MCP credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/mcp)
* [Credentials environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials)
