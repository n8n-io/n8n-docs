---
title: External secrets
description: Use an external secrets vault with n8n.
contentType: howto
---

# External secrets

/// info | Feature availability
* External secrets are available on Enterprise Self-hosted and Enterprise Cloud plans.
* n8n supports Infisical and HashiCorp Vault. 
* n8n doesn't support [HashiCorp Vault Secrets](https://developer.hashicorp.com/hcp/docs/vault-secrets){:target=_blank .external-link}.
///

You can use an external secrets store to manage credentials for n8n.

n8n stores all credentials encrypted in its database, and restricts access to them by default. With the external secrets feature, you can store sensitive credential information in an external vault, and have n8n load it in when required. This provides an extra layer of security and allows you to manage credentials used across multiple [n8n environments](/source-control-environments/) in one central place.

## Connect n8n to your secrets store

/// note | Secret names
Your secret names can't contain spaces, hyphens, or other special characters. n8n supports secret names containing alphanumeric characters (a-z, A-Z, and 0-9), and underscores.
///
1. In n8n, go to **Settings** > **External Secrets**.
1. Select **Set Up** for your store provider.
1. Enter the credentials for your provider:
	* HashiCorp Vault: provide the **Vault URL** for your vault instance, and select your **Authentication Method**.  Enter your authentication details. Optionally provide a namespace.
		- Refer to the HashiCorp documentation for your authentication method:
				[Token auth method](https://developer.hashicorp.com/vault/docs/auth/token){:target=_blank .external-link}  
				[AppRole auth method](https://developer.hashicorp.com/vault/docs/auth/approle){:target=_blank .external-link}  
				[Userpass auth method](https://developer.hashicorp.com/vault/docs/auth/userpass){:target=_blank .external-link}  
		- If you use vault namespaces, you can enter the namespace n8n should connect to. Refer to [Vault Enterprise namespaces](https://developer.hashicorp.com/vault/docs/enterprise/namespaces){:target=_blank .external-link} for more information on HashiCorp Vault namespaces.

	* Infisical: provide a **Service Token**. Refer to Infisical's [Service token](https://infisical.com/docs/documentation/platform/token){:target=_blank .external-link} documentation for information on getting your token. If you self-host Infisical, enter the **Site URL**.

	    /// note | Infisical environment
		Make sure you select the correct Infisical environment when creating your token. n8n will load secrets from this environment, and won't have access to secrets in other Infisical environments. n8n only support service tokens that have access to a single environment.
		///

	    /// note | Infisical folders
	 	n8n doesn't support [Infisical folders](https://infisical.com/docs/documentation/platform/folder){:target=_blank .external-link}.
		///
		
1. **Save** your configuration.
1. Enable the provider using the **Disabled / Enabled** toggle.


## Use secrets in n8n credentials

To use a secret from your store in an n8n credential:

1. Create a new credential, or open an existing one.
1. On the field where you want to use a secret:
	1. Hover over the field.
	1. Select **Expression**.
1. In the field where you want to use a secret, enter an expression referencing the secret name:
	```js
	{{ $secrets.<vault-name>.<secret-name> }}
	```
	`<vault-name>` is either `vault` (for HashiCorp) or `infisical`. Replace `<secret-name>` with the name as it appears in your vault.

## Use external secrets with n8n environments

n8n's [Source control and environments](/source-control-environments/) feature allows you to create different n8n environments, backed by Git. The feature doesn't support using different credentials in different instances. You can use an external secrets vault to provide different credentials for different environments by connecting each n8n instance to a different vault or project environment.

For example, you have two n8n instances, one for development and one for production. You use Infisical for your vault. In Infisical, create a project with two environments, development and production. Generate a token for each Infisical environment. Use the token for the development environment to connect your development n8n instance, and the token for your production environment to connect your production n8n instance.

## Troubleshooting

### Infisical version changes

Infisical version upgrades can introduce problems connecting to n8n. If your Infisical connection stops working, check if there was a recent version change. If so, report the issue to help@n8n.io.
