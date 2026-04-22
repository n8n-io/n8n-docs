---
title: External secrets
description: Use an external secrets vault with n8n.
contentType: howto
---

# External secrets

/// info | Feature availability
* External secrets are available on Enterprise Self-hosted and Enterprise Cloud plans.
* n8n supports the following secret providers: 1Password (via [Connect Server](https://developer.1password.com/docs/connect/get-started/)), AWS Secrets Manager, Azure Key Vault, GCP Secrets Manager, and HashiCorp Vault.
* From n8n version 2.10.0 you can connect multiple vaults per secret provider. Older versions only support one vault per provider.
* From version `2.13.0`, if enabled, project editors can use external secrets within their projects, and project admins can also manage project vaults.
* n8n doesn't support [HashiCorp Vault Secrets](https://developer.hashicorp.com/hcp/docs/vault-secrets).
///

/// warning | Infisical deprecation
Infisical is deprecated. From version 2.10.0, you can't connect new Infisical vaults. Existing ones remain for now.
///

You can use an external secrets store to manage [credentials](/glossary.md#credential-n8n) for n8n.

n8n stores all credentials encrypted in its database, and restricts access to them by default. With the external secrets feature, you can store sensitive credential information in an external vault, and have n8n load it in when required. This provides an extra layer of security and allows you to manage credentials used across multiple [n8n environments](/source-control-environments/index.md) in one central place.

## Global vaults

By default, a secrets vault is **global**: users across the instance can use credentials that reference secrets from that vault.

In personal projects, only instance owners and admins can use secrets from global vaults in credentials.

## Project vaults

Instance admins can share a vault with a specific [project](/user-management/rbac/projects.md). Once you assign a vault to a project, only that project’s credentials can reference its secrets. You can choose to tie a vault to a single project or keep it global.

To change the vault scope:

1. In n8n, go to **Settings** > **External Secrets**.
1. Find the vault you want to configure and select **Edit**.
1. Under **Share**, choose one of the following:
    - **Global**: Share this vault across your entire n8n instance. This allows credentials across the instance to reference these secrets.
    - **Project**: Restrict this vault to a specific project. Choosing a project limits secret access to only that project's credentials.
1. **Save** your configuration.

## Connect n8n to your secrets store

/// note | Secret values
n8n only supports plaintext values for secrets, not JSON objects.
///

1. In n8n, go to **Settings** > **External Secrets**.
1. Click **Add secrets vault**.
1. Enter a unique name for your vault. This will be the first segment when referencing this vault in a `{{ $secrets.<vault-name>... }}` expression in a credential.
1. Select one of the supported secret providers.
1. Enter the credentials for your provider. Refer to the provider-specific sections below for details.
1. **Save** your configuration.

As long as this store is connected, you can reference its secrets in credentials.

### 1Password

/// note | 1Password Connect Server required
n8n integrates with [1Password Connect Server](https://developer.1password.com/docs/connect/get-started/), a self-hosted API for machine access to 1Password. This isn't the same as a personal or team 1Password account. You must deploy and run a Connect Server to use this provider.
///

Provide your **Connect Server URL** and **Access Token**. The Connect Server URL is the address where your server is accessible (for example, `http://localhost:8080`). The Access Token is the token you created for the Connect Server integration.

n8n reads all vaults and items accessible to the token. Each 1Password item becomes a secret, with the item's fields accessible as properties. Use `{{ $secrets.<vault-name>.<item-title>.<field-label> }}` to access a specific field value.

### AWS Secrets Manager

Provide your **access key ID**, **secret access key**, and **region**. The IAM user must have the `secretsmanager:ListSecrets`, `secretsmanager:BatchGetSecretValue`, and `secretsmanager:GetSecretValue` permissions.

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
				"secretsmanager:ListSecretVersionIds"
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

### Azure Key Vault

Provide your **vault name**, **tenant ID**, **client ID**, and **client secret**. Refer to the Azure documentation to [register a Microsoft Entra ID app and create a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal). n8n supports only single-line values for secrets.

### GCP Secrets Manager

Provide a **Service Account Key** (JSON) for a service account that has at least these roles: `Secret Manager Secret Accessor` and `Secret Manager Secret Viewer`. Refer to Google's [service account documentation](https://cloud.google.com/iam/docs/service-account-overview) for more information.

### HashiCorp Vault

Provide the **Vault URL** for your vault instance, and select your **Authentication Method**. Enter your authentication details. Optionally provide a namespace.

- Refer to the HashiCorp documentation for your authentication method:
	- [Token auth method](https://developer.hashicorp.com/vault/docs/auth/token)
	- [AppRole auth method](https://developer.hashicorp.com/vault/docs/auth/approle)
	- [Userpass auth method](https://developer.hashicorp.com/vault/docs/auth/userpass)
- If you use vault namespaces, you can enter the namespace n8n should connect to. Refer to [Vault Enterprise namespaces](https://developer.hashicorp.com/vault/docs/enterprise/namespaces) for more information on HashiCorp Vault namespaces.

#### Manual KV mount configuration

By default, n8n autodiscovers KV secret engines by reading `sys/mounts`. If your Vault token doesn't have access to `sys/mounts`, you can manually specify the KV engine mount path and version instead:

- **KV Mount Path**: The mount path of your KV secret engine (for example, `secret/`). When set, n8n skips `sys/mounts` autodiscovery and uses this path directly. Leave blank to use autodiscovery.
- **KV Version**: The KV engine version (`v1` or `v2`). Defaults to `v2`. Only applies when you specify a **KV Mount Path**.

Your Vault token still needs read and list access to the KV path itself. The following example shows a minimal Vault policy for a KV v2 mount at `secret/`:

```hcl
# Read and list secrets at the "secret/" KV v2 mount
path "secret/data/*" {
  capabilities = ["read"]
}
path "secret/metadata/*" {
  capabilities = ["read", "list"]
}
```

For KV v1, you only need a single policy path:

```hcl
# Read and list secrets at the "kv/" KV v1 mount
path "kv/*" {
  capabilities = ["read", "list"]
}
```

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
	`<vault-name>` is the one you entered when you added the store. Replace `<secret-name>` with the name as it appears in your vault.

## Using external secrets with n8n environments

n8n's [Source control and environments](/source-control-environments/index.md) feature allows you to create different n8n environments, backed by Git. The feature doesn't support using different credentials in different instances. You can use an external secrets vault to provide different credentials for different environments by connecting each n8n instance to a different vault or project environment.

For example, you have two n8n instances, one for development and one for production. In your secrets provider, create a project with two environments, development and production. Generate a token for each environment of your secrets provider. Use the token for the development environment to connect your development n8n instance, and the token for your production environment to connect your production n8n instance.

## Using external secrets in projects

You can share a vault with a project so that only that project's credentials can reference its secrets. Refer to [Project vaults](#project-vaults) for setup steps. Project-scoped vaults are available from version `2.11.0`.

### Access for project roles

/// note | Version `2.13.0` and later
Before version `2.13.0`, using external secrets in an [RBAC project](/user-management/rbac/index.md) required an [instance owner or instance admin](/user-management/account-types.md) as a member of the project.
///

From version `2.13.0`, instance owners and admins can grant [project editors](/user-management/rbac/role-types.md#project-editor) and [project admins](/user-management/rbac/role-types.md#project-admin) access to external secrets.

To enable this:

1. Go to **Settings** > **External Secrets**.
1. Turn on **Enable external secrets for project roles**.

When enabled, **Project Editors** can:

-   View available external secret vaults shared with the project (in **Project** > **Settings**).
-   Use secrets from the project's vaults in credentials.

**Project Admins** get the same access, plus they can:

-   Create new vaults for the project (in **Project** > **Settings**).
-   Update and delete vaults assigned to the project.

/// note | Global vault access
Global vaults created in **Settings** > **External Secrets** are visible in **Project** > **Settings** but are read-only for project roles. Only instance admins can modify or delete global vaults.
///

### Custom roles

For more fine-grained access control, instance owners and admins can create a [custom project role](/user-management/rbac/custom-roles.md). Go to **Settings** > **Project roles** > **Create role**. In the list of permissions, configure:

- **Secrets vaults**: Controls vault management (create, view, edit, delete, and sync vaults).
- **Secrets**: Controls whether the role can use secrets in credential expressions.

Both permissions are independent. For example, a role may need only the **Secrets** permission to use secrets in credentials without managing vaults. Refer to [Secret vault scopes](/user-management/rbac/custom-roles.md#secret-vault-scopes) for the full list of available scopes.

## Troubleshooting

### Secrets don't resolve in production

/// note | Version `2.13.0` and later
From version `2.13.0`, project editors and admins with [secrets access enabled](#access-for-project-roles) can use external secrets in their own credentials. The restriction below applies only to older versions or when the opt-in toggle is off.
///

In versions before `2.13.0` (or when **Enable external secrets for project roles** is off), only instance owners and admins can resolve secrets at runtime. If an owner or admin updates another user's credential with a secrets expression, it may appear to work in preview but fail in production.

In this case, only use external secrets in credentials owned by an instance owner or admin.
