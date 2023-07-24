---
title: External secrets
description: Use an external secrets vault with n8n.
contentType: howto
---

# External secrets

!!! info "Feature availability"
	* External secrets are available on Enterprise Self-hosted and Cloud plans.
	* n8n supports Infisical and HashiCorp Vault.

You can use an external secrets vault to manage credentials for n8n.

## Connect n8n to your secrets vault

1. In n8n, go to **Settings** > **External Secrets**.
2. Select your vault provider.
3. Enter the credentials for your provider:
	* Infisical: provide a **Service Token**. Refer to Infisical's [Service token](https://infisical.com/docs/documentation/platform/token){:target=_blank .external-link} documentation for information on getting your token. If you self-host Infisical, enter the **Site URL**.
	* HashiCorp Vault: provide the **Base URL** for your vault instance, and select your **Authentication Method**. Enter your authentication details. If you're using a token, refer to HashiCorp's [Token management](https://developer.hashicorp.com/vault/tutorials/tokens/token-management){:target=_blank .external-link} documentation for information on getting your token.


## Use secrets in n8n credentials
