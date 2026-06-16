---
title: JWE token decryption for OAuth 2.0 credentials
description: Enable JWE-encrypted OAuth 2.0 tokens on your n8n instance so your identity provider can encrypt access and ID tokens that only your instance can decrypt.
contentType: howto
---

# JWE token decryption for OAuth 2.0 credentials

/// info | Feature availability
* Available from n8n v2.21.0.
* Available on any n8n instance with the `N8N_ENV_FEAT_OAUTH2_JWE` environment variable set to `true`. Self-hosted instances can set it directly. On Cloud, contact n8n support to request it.
* Requires an identity provider (IdP) that can encrypt tokens as JWE.
///

/// warning | Preview feature
JWE token decryption is in preview and gated by an environment flag. Field names, the environment variable, the JWKS endpoint path, and the supported algorithms can change before the feature reaches general availability. Pin your n8n version and retest your OAuth 2.0 credentials after each upgrade.
///

JWE token decryption lets your identity provider return OAuth 2.0 access and ID tokens encrypted as [JWE](https://datatracker.ietf.org/doc/html/rfc7516){:target="_blank" .external-link}. Your n8n instance decrypts the tokens on the OAuth callback using a private key that never leaves the instance. This protects token contents from anything that sits between your IdP and n8n, including reverse proxies, browsers, and logs.

## How JWE token decryption works

When you enable the feature, n8n:

1. Generates an RSA key pair on startup and stores the private key, encrypted with your instance encryption key, in the database.
2. Publishes the matching public key at an instance-wide JWKS endpoint, so your IdP can fetch it.
3. Decrypts incoming JWE tokens on the OAuth callback using the private key that matches the `kid` in the JWE header.

The IdP encrypts each token with the public key it fetched from your JWKS endpoint. Only your instance can decrypt the result.

## Before you begin

You need:

* `N8N_ENV_FEAT_OAUTH2_JWE=true` on your n8n instance. Self-hosted instances can enable this directly. On Cloud, contact n8n support to request it.
* All n8n instances, main and workers, sharing the same `N8N_ENCRYPTION_KEY` value. n8n uses this instance key to encrypt the JWE private key at rest.
* An IdP that supports JWE-encrypted tokens with the `RSA-OAEP-256` key encryption algorithm.

## Enable JWE token decryption

1. Set the following environment variable on **all** n8n instances, both main and workers:

    ```sh
    N8N_ENV_FEAT_OAUTH2_JWE=true
    ```

2. Restart all instances. On startup, n8n generates the RSA key pair and publishes the public key at the JWKS endpoint.
3. To confirm the feature is active, request the JWKS endpoint and check that it returns one key with `"alg": "RSA-OAEP-256"`:

    ```sh
    curl https://<your-n8n-host>/rest/.well-known/jwks.json
    ```

## Configure your identity provider

In the OAuth 2.0 client or application configuration on your IdP:

1. Enable encrypted tokens for the client that n8n connects to.
2. Set the client's JWKS URI to your instance's JWKS endpoint. n8n displays this URL on the credential, so you can copy it directly from there once you create the credential (see the next section).
3. Choose `RSA-OAEP-256` as the key encryption algorithm (`alg`). Pair it with any content encryption algorithm (`enc`) your IdP supports, for example `A128CBC-HS256` or `A256GCM`.

??? note "Example: Okta"
    1. In the Okta admin console, open the OAuth 2.0 application that n8n uses, or create a new web application.
    2. Under the application's OpenID Connect settings, enable token encryption.
    3. Set the **Key management algorithm** to `RSA-OAEP-256` and choose a content encryption algorithm (for example `A256GCM`).
    4. Set the **JWKS URI** to the value n8n shows in the credential's **JWKS URI** field.

## Configure the credential in n8n

1. Create or edit an [OAuth 2.0 API credential](/integrations/builtin/credentials/httprequest.md#using-oauth2).
2. Toggle **Encrypted Tokens (JWE)** on.
3. Copy the value from the **JWKS URI** field and paste it into the JWKS URI setting on your IdP, if you haven't done so already.
4. Save the credential and connect. n8n decrypts the token returned by your IdP and stores the decrypted form for use in workflows.

The response from your IdP must contain at least one JWE-encrypted token (access token, ID token, or both). If the response is fully plaintext, n8n rejects it with the error `Expected at least one JWE-encrypted token but received only plaintext`.

## JWKS endpoint reference

n8n exposes the instance's public encryption keys at:

```
<instance-base-url>/<rest-endpoint>/.well-known/jwks.json
```

| Property | Value |
| :------- | :---- |
| Default path | `/rest/.well-known/jwks.json` |
| Authentication | None (publicly accessible, by design) |
| Rate limit | `N8N_OAUTH_JWE_JWKS_PER_MINUTE` requests per IP per minute (default `60`) |
| Cache headers | `Cache-Control: public, max-age=3600, must-revalidate` |
| Response format | [JWK Set](https://datatracker.ietf.org/doc/html/rfc7517#section-5){:target="_blank" .external-link} (RFC 7517 §5) |

If you customized `N8N_ENDPOINT_REST`, substitute your value for `rest` in the path.

## Supported algorithms

n8n supports `RSA-OAEP-256` for key encryption. Configure your IdP to use this `alg` value when encrypting tokens. n8n doesn't restrict content encryption algorithms (`enc`); use any value your IdP supports.

The JWKS schema reserves elliptic-curve algorithms (`ECDH-ES` and variants), but n8n doesn't yet generate EC keys.

## Troubleshooting

* **The Encrypted Tokens (JWE) toggle doesn't appear on the credential.** Confirm that you've set `N8N_ENV_FEAT_OAUTH2_JWE=true` on every n8n instance and that you've restarted all instances.
* **Error `Expected at least one JWE-encrypted token but received only plaintext`.** The IdP returned a plaintext token. Confirm that you've enabled token encryption for the client in the IdP and that the IdP fetched a key from your JWKS endpoint.
* **The IdP can't fetch the JWKS URI.** Check that the JWKS endpoint is reachable from your IdP. Reverse proxies and authentication middleware sometimes block `/rest/.well-known/jwks.json`. The endpoint must be publicly reachable without authentication.
* **The IdP fetches the JWKS too often and gets rate-limited.** Increase `N8N_OAUTH_JWE_JWKS_PER_MINUTE` on your n8n instances, or configure your IdP to cache the JWKS response for the full `max-age` window.

## Related resources

* [HTTP Request credentials: Using OAuth2](/integrations/builtin/credentials/httprequest.md#using-oauth2): set up the generic OAuth 2.0 credential.
* [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md): reference for `N8N_ENV_FEAT_OAUTH2_JWE` and `N8N_OAUTH_JWE_JWKS_PER_MINUTE`.
* [Encryption key rotation](/hosting/securing/encryption-key-rotation.md): rotate the data encryption key that protects the JWE private key at rest.
* [JSON Web Encryption (RFC 7516)](https://datatracker.ietf.org/doc/html/rfc7516){:target="_blank" .external-link}: the JWE specification.
