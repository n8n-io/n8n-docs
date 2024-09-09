---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Wise credentials
description: Documentation for Wise credentials. Use these credentials to authenticate Wise in n8n, a workflow automation platform.
contentType: integration
---

# Wise credentials

You can use these credentials to authenticate the following nodes:

- [Wise](/integrations/builtin/app-nodes/n8n-nodes-base.wise/)
- [Wise Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.wisetrigger/)

## Prerequisites

Create a [Wise](https://wise.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API token

## Related resources

Refer to [Wise's API documentation](https://docs.wise.com/api-docs/api-reference){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- An **API Token**: Go to your **user menu > Settings > API tokens** to generate an API token. Enter the generated API key in your n8n credential. Refer to [Getting started with the API](https://wise.com/help/articles/2958107/getting-started-with-the-api){:target=_blank .external-link} for more information.
- Your **Environment**: Select the environment that best matches your Wise account environment.
    - If you're using a Wise test sandbox account, select **Test**.
    - Otherwise, select **Live**.
- **Private Key (Optional)**: For live endpoints requiring Strong Customer Authentication (SCA), generate a public and private key. Enter the private key here. Refer to [Add a private key](#add-a-private-key) for more information.
    - If you're using a **Test** environment, you'll only need to enter a Private Key if you've enabled Strong Customer Authentication on the [public keys management page](https://sandbox.transferwise.tech/public-keys){:target=_blank .external-link}.

## Add a private key

Wise protects some live endpoints and operations with Strong Customer Authentication (SCA). Refer to [Strong Customer Authentication & 2FA](https://docs.wise.com/api-docs/features/strong-customer-authentication-2fa){:target=_blank .external-link} for details.

If you make a request to an endpoint that requires SCA, Wise returns a 403 Forbidden HTTP status code. The error returned will look like this:

> This request requires Strong Customer Authentication (SCA). Please add a key pair to your account and n8n credentials. See https://api-docs.transferwise.com/#strong-customer-authentication-personal-token

To use endpoints requiring SCA, generate an RSA key pair and add the relevant key information to both Wise and n8n:

1. Generate an RSA key pair:

    ```sh
    $ openssl genrsa -out private.pem 2048 
    $ openssl rsa -pubout -in private.pem -out public.pem
    ```

2. Add the content of the public key `public.pem` to your Wise **user menu > Settings > API tokens > Manage public keys**.
3. Add the content of the private key `private.pem` in n8n to the **Private Key (Optional)**.

Refer to [Personal Token SCA](https://docs.wise.com/api-docs/features/strong-customer-authentication-2fa/personal-token-sca){:target=_blank .external-link} for more information.

