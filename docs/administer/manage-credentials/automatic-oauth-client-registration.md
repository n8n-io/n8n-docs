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

With automatic OAuth client registration, some OAuth2 credentials connect without an OAuth app of your own. You don't enter a client ID or client secret.

{% hint style="info" %}
**Feature availability**

Automatic OAuth client registration with Client ID Metadata Documents, and the **Automatic (recommended)** option for app credentials, are available from n8n 2.49.0.

Client ID Metadata Documents are available on:

- **n8n Cloud:** not available yet. Cloud instances use Dynamic Client Registration.
- **Self-hosted:** all plans. An instance owner must turn them on.
{% endhint %}

## Credentials that support automatic registration

| Credential | Setting | Default |
| :--------- | :------ | :------ |
| [MCP credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/mcp), used by the **MCP Client** node and the **MCP Client Tool** node | The **Register Client Automatically** toggle | On |
| MCP registry servers that use MCP OAuth2 | None. n8n always registers the client. Some registry servers have their own credential instead, so check the server's page. | On |
| App credentials that n8n has tested with automatic registration. Each app's credential page says if it supports it. | The **Automatic (recommended)** option, next to **Custom OAuth2** | **Automatic (recommended)** for new credentials. Existing credentials stay on **Custom OAuth2**. |

The generic OAuth2 API credential doesn't support automatic registration. Enter the client ID and client secret of your own OAuth app.

If your instance has a managed OAuth app for a service, n8n uses it and hides the **Automatic (recommended)** option.

## How n8n registers the client: CIMD and DCR

When you connect a credential with automatic registration, n8n reads the OAuth2 server's metadata and picks one of two methods.

With a Client ID Metadata Document (CIMD), n8n's client ID is the URL of a JSON document. The OAuth2 server downloads that document to learn the client's name and redirect URL. n8n sends no registration request and gets no client secret. The [MCP authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) recommends CIMD.

With Dynamic Client Registration (DCR, [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591)), n8n sends a registration request to the OAuth2 server. The server returns a client ID, and sometimes a client secret. Each credential registers its own client.

n8n uses CIMD when all of these are true:

- CIMD is on for the instance. Refer to [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance).
- The document URL is an HTTPS URL with a path.
- The OAuth2 server supports CIMD, PKCE with the `S256` method, and public clients.
- The credential doesn't use [JWE token decryption](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/decrypt-oauth-20-tokens-with-jwe).

Otherwise n8n uses DCR, and shows an error if the server doesn't support DCR either. A server that supports only CIMD works only when CIMD is on.

Both methods need a server that supports PKCE with `S256`.

## Turn on CIMD on a self-hosted instance

CIMD is off by default. The OAuth2 server has to download the metadata document from your instance, and n8n can't tell in advance whether the server can reach it.

Turn on CIMD only if your instance has a public HTTPS URL and OAuth2 servers can download `https://<your-n8n-domain>/rest/oauth2-credential/client-metadata.json` without logging in.

Keep CIMD off if n8n runs on your computer, on an intranet, or behind a proxy that requires a login, such as an SSO proxy. n8n then uses DCR. To use CIMD anyway, host the document somewhere else. Refer to [Use your own client metadata document](#use-your-own-client-metadata-document).

To turn on CIMD:

1. Set `N8N_EDITOR_BASE_URL` to your instance's public HTTPS URL. n8n builds the document URL and the OAuth callback URL from it. If you don't set it, n8n uses the webhook URL.
2. Set `N8N_OAUTH_CIMD_ENABLED` to `true`. Refer to [Credentials environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials).
3. Restart n8n.
4. Check that the document loads from outside your network:

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

While CIMD is off, the document URL returns `404`.

If the document URL isn't an HTTPS URL with a path, n8n uses DCR and logs this warning: `Client ID metadata document URL is not an HTTPS URL with a path, using DCR instead`.

## Use your own client metadata document

You can host the client metadata document on another HTTPS server. This helps when OAuth2 servers can't reach your instance but your users' browsers can: the server only downloads the document, and the OAuth callback goes through the user's browser.

1. Host a JSON document over HTTPS, with no login. Start from the document in [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance) and change two things:
	- Set `client_id` to the document's own URL.
	- Make sure `redirect_uris` contains your instance's OAuth callback URL: `https://<your-n8n-domain>/rest/oauth2-credential/callback`.
2. Set `N8N_OAUTH_CLIENT_METADATA_URL` to the document URL.
3. Set `N8N_OAUTH_CIMD_ENABLED` to `true`.
4. Restart n8n.

If your instance's OAuth callback URL changes, update `redirect_uris`. If the document URL changes, keep the old URL working until all credentials have reconnected.

## Existing credentials and automatic registration

n8n registers the client when you select **Connect my account**, so credentials you connected before turning on CIMD keep their DCR client ID. When you reconnect one, n8n switches to CIMD only if all the conditions in [How n8n registers the client: CIMD and DCR](#how-n8n-registers-the-client-cimd-and-dcr) are true. After the switch, the client ID is the document URL and n8n deletes the stored client secret.

Token refreshes use the stored client ID and don't register a new client.

## Troubleshoot automatic registration

### An error shows on the OAuth2 server's page

When CIMD fails, the OAuth2 server shows the error on its own page, not in n8n. For example: `This authorization request is invalid.` Usually the server can't download the metadata document.

To fix it, do one of the following:

- Check that the document loads from outside your network. Refer to [Turn on CIMD on a self-hosted instance](#turn-on-cimd-on-a-self-hosted-instance).
- Set `N8N_OAUTH_CIMD_ENABLED` to `false`, restart n8n, and reconnect the credential. n8n then uses DCR.
- Use your own OAuth app. In an MCP credential, turn off **Register Client Automatically**. In other credentials, select **Custom OAuth2**. Then enter a client ID and client secret.

### The OAuth2 server doesn't support automatic client registration

n8n shows this error when the server supports neither CIMD nor DCR, or supports only CIMD while CIMD is off:

```
The OAuth2 server does not support automatic client registration. Enter the client ID of your own OAuth app instead.
```

If the server supports CIMD, turn CIMD on. If not, use your own OAuth app.

### The OAuth2 server doesn't support PKCE

```
The OAuth2 server does not support PKCE with the S256 method, which automatic client registration requires
```

Automatic registration needs PKCE, so use your own OAuth app.

### n8n can't read the OAuth2 server's metadata

```
Failed to discover OAuth2 authorization server metadata. Tried: <urls>. Last error: <error>
```

n8n didn't get valid metadata from the server. One cause is an `issuer` in the metadata that doesn't match the server URL. For an MCP credential, check the MCP server URL first. If it's correct, contact the server's provider or use your own OAuth app.

### The OAuth2 server returned an error

If the OAuth2 server sends back an error instead of an authorization code, the n8n window shows `The OAuth2 server returned an error.` When n8n can confirm which server sent the error, the window also shows the server's error code and description, for example `access_denied` after you deny access on the consent page. When n8n can't confirm it, the details stay hidden.

### The authorization response came from an unexpected server

```
The authorization response came from an unexpected OAuth2 server.
```

The response came from a different server than the one n8n sent you to, so n8n stops the connection. Reconnect the credential. If the error comes back, contact the server's provider.

### Redirect URI errors

An error about an invalid or mismatched redirect URI means the OAuth2 server rejects n8n's OAuth callback URL. With DCR, check that the server accepts the **OAuth Redirect URL** shown in the credential, character for character. With your own client metadata document, check that `redirect_uris` contains that URL.

## Related resources

* [Manage credentials](./)
* [Share credentials securely](share-credentials-securely.md)
* [Use personal credentials in projects](use-personal-credentials-in-projects.md)
* [End-user credentials](end-user-credentials.md)
* [Credential overwrites](credential-overwrites.md)
* [Use external secret stores](use-external-secret-stores.md)
* [MCP credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/mcp)
* [Credentials environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials)
