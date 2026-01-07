---
title: External secrets
description: Use an external secrets vault with n8n.
contentType: howto
---

# External secrets

/// info | Feature availability
* External secrets are available on Enterprise Self-hosted and Enterprise Cloud plans.
* n8n supports AWS Secrets Manager, Azure Key Vault, GCP Secrets Manager, Infisical and HashiCorp Vault. 
* n8n doesn't support [HashiCorp Vault Secrets](https://developer.hashicorp.com/hcp/docs/vault-secrets).
///

/// warning | Infisical deprecation
Infisical is deprecated and is no longer recommended. Use an alternative external secrets provider.
///

You can use an external secrets store to manage [credentials](/glossary.md#credential-n8n) for n8n.

n8n stores all credentials encrypted in its database, and restricts access to them by default. With the external secrets feature, you can store sensitive credential information in an external vault, and have n8n load it in when required. This provides an extra layer of security and allows you to manage credentials used across multiple [n8n environments](/source-control-environments/index.md) in one central place.

## Connect n8n to your secrets store

/// note | Secret names
Your secret names can't contain spaces, hyphens, or other special characters. n8n supports secret names containing alphanumeric characters (`a-z`, `A-Z`, and `0-9`), and underscores. n8n currently only supports plaintext values for secrets, not JSON objects or key-value pairs.
///

1. In n8n, go to **Settings** > **External Secrets**.
1. Select **Set Up** for your store provider.
1. Enter the credentials for your provider:
	* Azure Key Vault: Provide your **vault name**, **tenant ID**, **client ID**, and **client secret**. Refer to the Azure documentation to [register a Microsoft Entra ID app and create a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal). n8n supports only single-line values for secrets.
	* AWS Secrets Manager: provide your **access key ID**, **secret access key**, and **region**. The IAM user must have the `secretsmanager:ListSecrets`, `secretsmanager:BatchGetSecretValue`, and `secretsmanager:GetSecretValue` permissions.

		To give n8n access to all secrets in your AWS Secrets Manager, you can attach the following policy to the IAM user:
		```json
		{
			"Version": "2012-10-17",
			"Statement": [
				{
					"Sid": "AccessAllSecrets",
					"Effect": "Allow",
					"Action": [
						"secretsmanager:ListSecrets",
						"secretsmanager:BatchGetSecretValue",
 						"secretsmanager:GetResourcePolicy",
						"secretsmanager:GetSecretValue",
						"secretsmanager:DescribeSecret",
						"secretsmanager:ListSecretVersionIds",
					],
					"Resource": "*"
				}
			]
		}
		```

		You can also be more restrictive and give n8n access to select specific AWS Secret Manager secrets. You still need to allow the `secretsmanager:ListSecrets` and `secretsmanager:BatchGetSecretValue` permissions to access all resources. These permissions allow n8n to retrieve ARN-scoped secrets, but don't provide access to the secret values.

		Next, you need set the scope for the `secretsmanager:GetSecretValue` permission to the specific Amazon Resource Names (ARNs) for the secrets you wish to share with n8n. Ensure you use the correct region and account ID in each resource ARNs. You can find the ARN details in the AWS dashboard for your secrets.
		
		For example, the following IAM policy only allows access to secrets with a name starting with `n8n` in your specified AWS account and region:

		```json
		{
			"Version": "2012-10-17",
			"Statement": [
				{
					"Sid": "ListingSecrets",
					"Effect": "Allow",
					"Action": [
						"secretsmanager:ListSecrets",
						"secretsmanager:BatchGetSecretValue"
					],
					"Resource": "*"
				},
				{
					"Sid": "RetrievingSecrets",
					"Effect": "Allow",
					"Action": [
						"secretsmanager:GetSecretValue",
						"secretsmanager:DescribeSecret"
					],
					"Resource": [
						"arn:aws:secretsmanager:us-west-2:123456789000:secret:n8n*"
					]
				}
			]
		}
		```

		For more IAM permission policy examples, consult the [AWS documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_iam-policies.html#auth-and-access_examples_batch).

	* HashiCorp Vault: provide the **Vault URL** for your vault instance, and select your **Authentication Method**.  Enter your authentication details. Optionally provide a namespace.
		- Refer to the HashiCorp documentation for your authentication method:
				[Token auth method](https://developer.hashicorp.com/vault/docs/auth/token)  
				[AppRole auth method](https://developer.hashicorp.com/vault/docs/auth/approle)  
				[Userpass auth method](https://developer.hashicorp.com/vault/docs/auth/userpass)  
		- If you use vault namespaces, you can enter the namespace n8n should connect to. Refer to [Vault Enterprise namespaces](https://developer.hashicorp.com/vault/docs/enterprise/namespaces) for more information on HashiCorp Vault namespaces.

	* Infisical: provide a **Service Token**. Refer to Infisical's [Service token](https://infisical.com/docs/documentation/platform/token) documentation for information on getting your token. If you self-host Infisical, enter the **Site URL**.

	    /// note | Infisical environment
		Make sure you select the correct Infisical environment when creating your token. n8n will load secrets from this environment, and won't have access to secrets in other Infisical environments. n8n only support service tokens that have access to a single environment.
		///

	    /// note | Infisical folders
	 	n8n doesn't support [Infisical folders](https://infisical.com/docs/documentation/platform/folder).
		///

	* Google Cloud Platform: provide a **Service Account Key** (JSON) for a service account that has at least these roles: `Secret Manager Secret Accessor` and `Secret Manager Secret Viewer`. Refer to Google's [service account documentation](https://cloud.google.com/iam/docs/service-account-overview) for more information.

1. **Save** your configuration.
1. Enable the provider using the **Disabled / Enabled** toggle.


## Use secrets in n8n credentials

To use a secret from your store in an n8n credential:

1. Create a new credential, or open an existing one.
1. On the field where you want to use a secret:
	1. Hover over the field.
	1. Select **Expression**.
1. In the field where you want to use a secret, enter an [expression](/glossary.md#expression-n8n) referencing the secret name:
	```js
	{{ $secrets.<vault-name>.<secret-name> }}
	```
	`<vault-name>` is either `vault` (for HashiCorp) or `infisical` or `awsSecretsManager`. Replace `<secret-name>` with the name as it appears in your vault.

## Using external secrets with n8n environments

n8n's [Source control and environments](/source-control-environments/index.md) feature allows you to create different n8n environments, backed by Git. The feature doesn't support using different credentials in different instances. You can use an external secrets vault to provide different credentials for different environments by connecting each n8n instance to a different vault or project environment.

For example, you have two n8n instances, one for development and one for production. You use Infisical for your vault. In Infisical, create a project with two environments, development and production. Generate a token for each Infisical environment. Use the token for the development environment to connect your development n8n instance, and the token for your production environment to connect your production n8n instance.

## Using external secrets in projects

To use external secrets in an [RBAC project](/user-management/rbac/index.md), you must have an [instance owner or instance admin](/user-management/account-types.md) as a member of the project.

## Troubleshooting

### Infisical version changes

Infisical version upgrades can introduce problems connecting to n8n. If your Infisical connection stops working, check if there was a recent version change. If so, report the issue to help@n8n.io.

### Only set external secrets on credentials owned by an instance owner or admin

Due to the permissions that instance owners and admins have, it's possible for owners and admins to update credentials owned by another user with a secrets expression. This will appear to work in preview for an instance owner or admin, but the secret won't resolve when the workflow runs in production. 

Only use external secrets for credentials that are owned by an instance admin or owner. This ensures they resolve correctly in production.
