---
title: HTTP Request credentials
description: Documentation for HTTP Request credentials. Use these credentials to authenticate HTTP Request in n8n, a workflow automation platform.
contentType: integration
---

# HTTP Request credentials

You can use these credentials to authenticate the following nodes:

- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)

## Prerequisites

You must use the authentication method required by the app or service you want to query.

## Supported authentication methods

- Predefined credential type
- Generic credential type

/// note | Predefined credential types
n8n recommends using predefined credential types whenever there's a credential type available for the service you want to connect to. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

You can use [Predefined credential types](/integrations/custom-operations/#predefined-credential-types) to perform custom operations with some APIs where n8n has a node for the platform. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to [Custom operations](/integrations/custom-operations/) for more information.
///

## Using predefined credential type

--8<-- "_snippets/integrations/predefined-credential-type-how-to.md"

Refer to [Custom API operations](/integrations/custom-operations/) for more information.

## Using generic credential type

The following generic authentication methods are available:

* Basic auth
* Custom auth
* Digest auth
* Header auth
* OAuth1
* OAuth2
* Query auth

Refer to [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication){:target=_blank .external-link} for more information.

### Using basic auth

Use this generic authentication if the app or service you want to use supports basic authentication.

To configure this credential, you'll need:

- A **Username** you use to access the app or service your HTTP Request is targeting
- The **Password** that goes with that username

### Using digest auth

Use this generic authentication if the app or service you want to use supports digest authentication.

To configure this credential, you'll need:

- A **Username** you use to access the app or service your HTTP Request is targeting
- The **Password** that goes with that username

### Using header auth

Use this generic authentication if the app or service you want to use supports header authentication.

To configure this credential, you'll need:

- The header **Name** you need to pass to the app or service your HTTP request is targeting
- The **Value** for the header 

Read more about [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#authentication){:target=_blank .external-link}.

### Using OAuth1

Use this generic authentication if the app or service you want to use supports OAuth1 authentication.

To configure this credential, you'll need:

- An **Authorization URL**: Also known as the Resource Owner Authorization URI. This URL typically ends in `/oauth1/authorize`. The temporary credentials are sent here to prompt a user to complete authorization.
- An **Access Token URL**: This is the URI used for the initial request for temporary credentials. This URL typically ends in `/oauth1/request` or `/oauth1/token`.
- A **Consumer Key**: Also known as the client key, similar to a username. This specifies the `oauth_consumer_key` to use for the call.
- A **Consumer Secret**: Also known as the client secret, similar to a password.
- A **Request Token URL**: This is the URI used to switch from temporary credentials to long-lived credentials after authorization. This URL typically ends in `/oauth1/access`.
- Select the **Signature Method** the auth handshake uses. This specifies the `oauth_signature_method` to use for the call. Options include:
	- **HMAC-SHA1**
	- **HMAC-SHA256**
	- **HMAC-SHA512**

Typically, you'll need to configure an app, service, or integration to generate most of these OAuth1 fields. Use the **OAuth Redirect URL** in n8n as the redirect URL or redirect URI for such a service.

Read more about [OAuth1](https://oauth.net/1/){:target=_blank .external-link} and the [OAuth1 authorization flow](https://oauth1.wp-api.org/docs/basics/Auth-Flow.html){:target=_blank .external-link}.

### Using OAuth2

Use this generic authentication if the app or service you want to use supports OAuth2 authentication.

Requirements to configure this credential depend on the **Grant Type** selected. Refer to [OAuth Grant Types](https://oauth.net/2/grant-types/) for more information on each grant type:

#### Authorization Code grant type

Authorization Code grant type is used to exchange an authorization code for an access token. After the user returns to the client via the redirect URL, the application will get the authorization code from the URL and use it to request an access token. Refer to [Authorization Code Request](https://www.oauth.com/oauth2-servers/access-tokens/authorization-code-request/){:target=_blank .external-link} for more information.

To configure this credential, you'll need:

- Select **Authorization Code** as the **Grant Type**
- An **Authorization URL**
- An **Access Token URL**
- A **Client ID**: The ID or username to log in with.
- A **Client Secret**: The secret or password used to log in with.
- _Optional:_ Enter one or more **Scope**s for the credential. If unspecified, the credential will request all scopes available to the client.
- _Optional:_ Some services require additional query parameters. If your service does, add them as **Auth URI Query Parameters**.
- Select the **Authentication** type. Options include:
	- **Header**: Will send the credentials as a basic auth header
	- **Body**: Will send credentials in the body of the request
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

Read more about [OAuth2](https://oauth.net/2/){:target=_blank .external-link}.

#### Client Credentials grant type

The Client Credentials grant type is used when applications request an access token to access their own resources, not on behalf of a user. Refer to [Client Credentials](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/){:target=_blank .external-link} for more information.

To configure this credential, you'll need:

- Select **Client Credentials** as the **Grant Type**.
- An **Access Token URL**: The URL to hit to initiate the OAuth2 flow. Typically this URL ends in `/token`.
- A **Client ID**: The ID or username to use to log in to the client.
- A **Client Secret**: The secret or password used to log in to the client.
- _Optional:_ Enter one or more **Scope**s for the credential. Most services don't support scopes for Client Credentials grant types; only enter scopes here if yours does.
- Select the **Authentication** type. Options include:
	- **Header**: Will send the credentials as a basic auth header
	- **Body**: Will send credentials in the body of the request
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

Read more about [OAuth2](https://oauth.net/2/){:target=_blank .external-link}.

#### PKCE grant type

Proof Key for Code Exchange (PKCE) grant type is an extension to the Authorization Code flow to prevent CSRF and authorization code injection attacks.

To configure this credential, you'll need:

- Select **PKCE** as the **Grant Type**
- An **Authorization URL**
- An **Access Token URL**
- A **Client ID**: The ID or username to log in with.
- A **Client Secret**: The secret or password used to log in with.
- _Optional:_ Enter one or more **Scope**s for the credential. If unspecified, the credential will request all scopes available to the client.
- _Optional:_ Some services require additional query parameters. If your service does, add them as **Auth URI Query Parameters**.
- Select the **Authentication** type. Options include:
	- **Header**: Will send the credentials as a basic auth header
	- **Body**: Will send credentials in the body of the request
- _Optional:_ Choose whether to **Ignore SSL Issues**. If turned on, n8n will connect even if SSL validation fails.

Read more about [OAuth2](https://oauth.net/2/){:target=_blank .external-link}.

### Using query auth

Use this generic authentication if the app or service you want to use supports passing authentication as a single key/value query parameter. (For multiple query parameters, use [Custom Auth](#using-custom-auth).)

To configure this credential, you'll need:

- A query parameter key or **Name**
- A query parameter **Value**

### Using custom auth

Use this generic authentication if the app or service you want to use supports passing authentication as multiple key/value query parameters or you need more flexibility than the other generic auth options.

The **Custom Auth** credential expects JSON data to define your credential. You can use `headers`, `qs`, `body` or a mix. See the examples below to get started.

#### Sending two headers
```
{
	"headers": {
		"X-AUTH-USERNAME": "username",
		"X-AUTH-PASSWORD": "password"
	}
}
```

#### Body
```
{
	 "body" : {
		"user": "username",
		"pass": "password"
	}
}
```

#### Query string
```
{
	"qs": { 
		"appid": "123456",
		"apikey": "my-api-key"
	}
}
```

#### Sending header and query string
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

## Provide an SSL certificate

You can send an SSL certificate with your HTTP request. Create the SSL certificate as an additional credential for use by the node:

1. In the HTTP Request node **Settings**, turn on **SSL Certificates**.
2. On the **Parameters** tab, add an existing SSL Certificate credential to **Credential for SSL Certificates** or create a new one.

To configure your SSL Certificates credential, you'll need:

- The Certificate Authority **CA** bundle
- The **Certificate** (CRT): May also appear as a Public Key, depending on who your issuing CA was and how the cert was formatted
- The **Private Key** (KEY)
- _Optional:_ If the **Private Key** is encrypted, enter a **Passphrase** for the private key.

If your SSL certificate is in a single file (such as a `.pfx` file), you'll need to open the file to copy details from it to paste into the appropriate fields:

- Enter the Public Key/CRT as the **Certificate**
- Enter the **Private Key**/KEY in that field