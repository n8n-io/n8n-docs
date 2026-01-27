---
title: Crypto credentials
description: Documentation for the Crypto credentials. Use these credentials to authenticate Crypto in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Crypto credentials

You can use these credentials to authenticate the following nodes:

- [Crypto](/integrations/builtin/core-nodes/n8n-nodes-base.crypto.md)

## Supported authentication methods

- Secret and private key

## Related resources

Refer to the [Crypto node documentation](/integrations/builtin/core-nodes/n8n-nodes-base.crypto.md) for more information about the node.

## Using secret and private key

To configure this credential, you'll need:

- An **Hmac Secret**: Enter the secret key used for HMAC operations. This is required when using the **Hmac** action.
- A **Sign Private Key**: Enter the private key used for signing operations. This is required when using the **Sign** action. Enter the key in PEM format:
    ```
    -----BEGIN RSA PRIVATE KEY-----
    KEY DATA GOES HERE
    -----END RSA PRIVATE KEY-----
    ```

You only need to fill in the credential field(s) for the action(s) you plan to use:
- For **Hmac** action: Fill in the **Hmac Secret**
- For **Sign** action: Fill in the **Sign Private Key**
