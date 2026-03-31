---
title: Credential overwrites
description: Set credential data globally on a self-hosted n8n instance so users can authenticate without seeing or entering client secrets.
contentType: howto
---

# Credential overwrites

Credential overwrites let you set credential data globally. This data isn't visible to users, but n8n uses it automatically in the background - for example, to enable OAuth login via a "Connect" button without exposing client secrets.

In the Editor UI, n8n hides all overwritten fields by default, so users can authenticate via OAuth using the "Connect" button on the credential.

For the environment variables used to configure credential overwrites, refer to [Credentials environment variables](/hosting/configuration/environment-variables/credentials.md).

## Using environment variables

Set `CREDENTIALS_OVERWRITE_DATA` to `{ CREDENTIAL_NAME: { PARAMETER: VALUE }}`.

/// warning
This approach isn't recommended. Environment variables aren't protected in n8n, so the data can leak to users.
///

## Using the REST API

The recommended approach is to load the data via a custom REST endpoint.

1. Set `CREDENTIALS_OVERWRITE_ENDPOINT` to the path where the endpoint should be available:

    ```sh
    export CREDENTIALS_OVERWRITE_ENDPOINT=send-credentials
    ```

    Optionally, set `CREDENTIALS_OVERWRITE_ENDPOINT_AUTH_TOKEN` to require a bearer token for accessing the endpoint.

    /// note
    Without an auth token, the endpoint can only be called once for security reasons.
    ///

2. Prepare a JSON file with the credentials to overwrite. For example, `oauth-credentials.json` for Asana and GitHub:

    ```json
    {
        "asanaOAuth2Api": {
            "clientId": "<id>",
            "clientSecret": "<secret>"
        },
        "githubOAuth2Api": {
            "clientId": "<id>",
            "clientSecret": "<secret>"
        }
    }
    ```

3. Send the file to your n8n instance:

    ```sh
    curl -H "Content-Type: application/json" --data @oauth-credentials.json http://localhost:5678/send-credentials
    ```

    If `CREDENTIALS_OVERWRITE_ENDPOINT_AUTH_TOKEN` is set to `secure-token`:

    ```sh
    curl -H "Content-Type: application/json" -H "Authorization: Bearer secure-token" --data @oauth-credentials.json http://localhost:5678/send-credentials
    ```

/// note
Credentials can extend other credentials. For example, `googleSheetsOAuth2Api` extends `googleOAuth2Api`. You can set parameters on the parent (`googleOAuth2Api`) and all child credentials will use them.
///

## Persistence

To store credential overwrites in the database and propagate them to all workers in multi-instance or queue mode, enable:

```sh
export CREDENTIALS_OVERWRITE_PERSISTENCE=true
```

When enabled, n8n stores the encrypted overwrites in the `settings` table and broadcasts a `reload-overwrite-credentials` event so workers reload the latest values. When disabled, overwrites remain in memory on the process that loaded them and n8n doesn't propagate them to workers or preserve them across restarts.
