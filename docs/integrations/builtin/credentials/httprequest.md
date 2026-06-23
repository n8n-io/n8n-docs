---
title: HTTP Request credentials
description: >-
  Documentation for HTTP Request credentials. Use these credentials to
  authenticate HTTP Request in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: HTTP Request credentials
originalFilePath: integrations/builtin/credentials/httprequest.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/httprequest'
url: 'https://docs.n8n.io/integrations/builtin/credentials/httprequest'
layout:
  description:
    visible: false
---

# HTTP Request credentials <a href="#http-request-credentials" id="http-request-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [HTTP Request](../core-nodes/n8n-nodes-base.httprequest/README.md)
- [HTTP Request Tool (legacy)](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

You must use the authentication method required by the app or service you want to query.

If you need to secure the authentication with an SSL certificate, refer to [Provide an SSL certificate](#provide-an-ssl-certificate) for the information you'll need.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Predefined credential type
- Basic auth (generic credential type)
- Custom auth (generic credential type)
- Digest auth (generic credential type)
- Header auth (generic credential type)
- Bearer auth (generic credential type)
- OAuth1 (generic credential type)
- OAuth2 (generic credential type)
- Query auth (generic credential type)

Refer to [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) for more information relating to generic credential types.

{% hint style="info" %}
**Predefined credential types**

n8n recommends using predefined credential types whenever there's a credential type available for the service you want to connect to. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

You can use [Predefined credential types](../custom-api-actions-for-existing-nodes.md#predefined-credential-types) to perform custom operations with some APIs where n8n has a node for the platform. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to [Custom operations](../custom-api-actions-for-existing-nodes.md) for more information.
{% endhint %}

## Using predefined credential type <a href="#using-predefined-credential-type" id="using-predefined-credential-type"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/vYmlHw5tI5uYtGcuiyAS/" %}

Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) for more information.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/19GkzHr83lKOpnZRz4y7/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/BxedHO5dArAU0O97lyPs/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2s1bqrmqDMhCa3wUQV2Q/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/226sV64ebFwpQD8t81Gy/" %}

## Using OAuth1 <a href="#using-oauth1" id="using-oauth1"></a>

Use this generic authentication if your app or service supports OAuth1 authentication.

To configure this credential, enter:

- An **Authorization URL**: Also known as the Resource Owner Authorization URI. This URL typically ends in `/oauth1/authorize`. The temporary credentials are sent here to prompt a user to complete authorization.
- An **Access Token URL**: This is the URI used for the initial request for temporary credentials. This URL typically ends in `/oauth1/request` or `/oauth1/token`.
- A **Consumer Key**: Also known as the client key, like a username. This specifies the `oauth_consumer_key` to use for the call.
- A **Consumer Secret**: Also known as the client secret, like a password.
- A **Request Token URL**: This is the URI used to switch from temporary credentials to long-lived credentials after authorization. This URL typically ends in `/oauth1/access`.
- Select the **Signature Method** the auth handshake uses. This specifies the `oauth_signature_method` to use for the call. Options include:
	- **HMAC-SHA1**
	- **HMAC-SHA256**
	- **HMAC-SHA512**

For most OAuth1 integrations, you'll need to configure an app, service, or integration to generate the values for most of these fields. Use the **OAuth Redirect URL** in n8n as the redirect URL or redirect URI for such a service.

Read more about [OAuth1](https://oauth.net/1/) and the [OAuth1 authorization flow](https://oauth1.wp-api.org/docs/basics/Auth-Flow.html).

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

Use this generic authentication if your app or service supports OAuth2 authentication.

Requirements to configure this credential depend on the **Grant Type** selected. Refer to [OAuth Grant Types](https://oauth.net/2/grant-types/) for more information on each grant type.

For most OAuth2 integrations, you'll need to configure an app, service, or integration. Use the **OAuth Redirect URL** in n8n as the redirect URL or redirect URI for such a service.

Read more about [OAuth2](https://oauth.net/2/).

### Authorization Code grant type <a href="#authorization-code-grant-type" id="authorization-code-grant-type"></a>

Use Authorization Code grant type to exchange an authorization code for an access token. The auth flow uses the redirect URL to return the user to the client. Then the application gets the authorization code from the URL and uses it to request an access token. Refer to [Authorization Code Request](https://www.oauth.com/oauth2-servers/access-tokens/authorization-code-request/) for more information.

To configure this credential, select **Authorization Code** as the **Grant Type**.

Then enter:

- An **Authorization URL**
- An **Access Token URL**
- A **Client ID**: The ID or username to log in with.
- A **Client Secret**: The secret or password used to log in with.
- _Optional:_ Enter one or more **Scope**s for the credential. If unspecified, the credential will request all scopes available to the client.
- _Optional:_ Some services require more query parameters. If your service does, add them as **Auth URI Query Parameters**.
- An **Authentication** type: Select the option that best suits your use case. Options include:
	- **Header**: Send the credentials as a basic auth header.
	- **Body**: Send the credentials in the body of the request.
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

### Client Credentials grant type <a href="#client-credentials-grant-type" id="client-credentials-grant-type"></a>

Use the Client Credentials grant type when applications request an access token to access their own resources, not on behalf of a user. Refer to [Client Credentials](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/) for more information.

To configure this credential, select **Client Credentials** as the **Grant Type**.

Then enter:

- An **Access Token URL**: The URL to hit to begin the OAuth2 flow. Typically this URL ends in `/token`.
- A **Client ID**: The ID or username to use to log in to the client.
- A **Client Secret**: The secret or password used to log in to the client.
- _Optional:_ Enter one or more **Scope**s for the credential. Most services don't support scopes for Client Credentials grant types; only enter scopes here if yours does.
- An **Authentication** type: Select the option that best suits your use case. Options include:
	- **Header**: Send the credentials as a basic auth header.
	- **Body**: Send the credentials in the body of the request.
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

### PKCE grant type <a href="#pkce-grant-type" id="pkce-grant-type"></a>

Proof Key for Code Exchange (PKCE) grant type is an extension to the Authorization Code flow to prevent CSRF and authorization code injection attacks.

To configure this credential, select **PKCE** as the **Grant Type**.

Then enter:

- An **Authorization URL**
- An **Access Token URL**
- A **Client ID**: The ID or username to log in with.
- A **Client Secret**: The secret or password used to log in with.
- _Optional:_ Enter one or more **Scope**s for the credential. If unspecified, the credential will request all scopes available to the client.
- _Optional:_ Some services require more query parameters. If your service does, add them as **Auth URI Query Parameters**.
- An **Authentication** type: Select the option that best suits your use case. Options include:
	- **Header**: Send the credentials as a basic auth header.
	- **Body**: Send the credentials in the body of the request.
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

## Using query auth <a href="#using-query-auth" id="using-query-auth"></a>

Use this generic authentication if your app or service supports passing authentication as a single key/value query parameter. (For multiple query parameters, use [Custom Auth](#using-custom-auth).)

To configure this credential, enter:

- A query parameter key or **Name**
- A query parameter **Value**

## Using custom auth <a href="#using-custom-auth" id="using-custom-auth"></a>

Use this generic authentication if your app or service supports passing authentication as multiple key/value query parameters or you need more flexibility than the other generic auth options.

The **Custom Auth** credential expects JSON data to define your credential. You can use `headers`, `qs`, `body` or a mix. Review the examples below to get started.

### Sending two headers <a href="#sending-two-headers" id="sending-two-headers"></a>
```
{
	"headers": {
		"X-AUTH-USERNAME": "username",
		"X-AUTH-PASSWORD": "password"
	}
}
```

### Body <a href="#body" id="body"></a>
```
{
	 "body" : {
		"user": "username",
		"pass": "password"
	}
}
```

### Query string <a href="#query-string" id="query-string"></a>
```
{
	"qs": { 
		"appid": "123456",
		"apikey": "my-api-key"
	}
}
```

### Sending header and query string <a href="#sending-header-and-query-string" id="sending-header-and-query-string"></a>
```
{
	"headers": {
		"api-version": "202404"
	},
	"qs": {
		"apikey": "my-api-key"
	}
}
```

## Provide an SSL certificate <a href="#provide-an-ssl-certificate" id="provide-an-ssl-certificate"></a>

You can send an SSL certificate with your HTTP request. Create the SSL certificate as a separate credential for use by the node:

1. In the HTTP Request node **Settings**, turn on **SSL Certificates**.
2. On the **Parameters** tab, add an existing SSL Certificate credential to **Credential for SSL Certificates** or create a new one.

To configure your SSL Certificates credential, you'll need to add:

- The Certificate Authority **CA** bundle
- The **Certificate** (CRT): May also appear as a Public Key, depending on who your issuing CA was and how they format the cert
- The **Private Key** (KEY)
- _Optional:_ If the **Private Key** is encrypted, enter a **Passphrase** for the private key.

If your SSL certificate is in a single file (such as a `.pfx` file), you'll need to open the file to copy details from it to paste into the appropriate fields:

- Enter the Public Key/CRT as the **Certificate**
- Enter the **Private Key**/KEY in that field
