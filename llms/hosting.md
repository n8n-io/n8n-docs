

# hosting/architecture/database-structure.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Understand the n8n database structure
contentType: explanation
---

# Database structure

This page describes the purpose of each table in the n8n database.

## Database and query technology

By default, n8n uses SQLite as the database. If you are using another database the structure will be similar, but the data-types may be different depending on the database.

n8n uses [TypeORM](https://github.com/typeorm/typeorm){:target=_blank .external-link} for queries and migrations.

To inspect the n8n database, you can use [DBeaver](https://dbeaver.io){:target=_blank .external-link}, which is an open-source universal database tool.

## Tables

These are the tables n8n creates during setup.
<!-- vale off -->
### auth_identity

Stores details of external authentication providers when using [SAML](/user-management/saml/index.md).

### auth_provider_sync_history

Stores the history of a SAML connection.

### credentials_entity

Stores the [credentials](/glossary.md#credential-n8n) used to authenticate with integrations.

### event_destinations

Contains the destination configurations for [Log streaming](/log-streaming.md).

### execution_data

Contains the workflow at time of running, and the execution data.

### execution_entity

Stores all saved workflow executions. Workflow settings can affect which executions n8n saves.

### execution_metadata

Stores [Custom executions data](/workflows/executions/custom-executions-data.md).

### installed_nodes

Lists the [community nodes](/integrations/community-nodes/installation/index.md) installed in your n8n instance.

### installed_packages

Details of npm community nodes packages installed in your n8n instance. [installed_nodes](#installed_nodes) lists each individual node. `installed_packages` lists npm packages, which may contain more than one node.

### migrations

A log of all database migrations. Read more about [Migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md){:target=_blank .external-link} in TypeORM's documentation.

### project

Lists the [projects](/user-management/rbac/projects.md) in your instance.

### project_relation

Describes the relationship between a user and a [project](/user-management/rbac/projects.md), including the user's [role type](/user-management/rbac/role-types.md).

### role

Not currently used. Foruse in future work on custom roles. 

### settings

Records custom instance settings. These are settings that you can't control using environment variables. They include:

* Whether the instance owner is set up
* Whether the user chose to skip owner and user management setup
* License key

### shared_credentials

Maps credentials to users.

### shared_workflow

Maps workflows to users.

### tag_entity

All workflow tags created in the n8n instance. This table lists the tags. [workflows_tags](#workflows_tags) records which workflows have which tags.

### user

Contains user data.

### variables

Store [variables](/code/variables.md).

### webhook_entity

Records the active webhooks in your n8n instance's workflows. This isn't just webhooks uses in the Webhook node. It includes all active webhooks used by any trigger node.

### workflow_entity

Your n8n instance's saved workflows.

### workflow_history

Store previous versions of workflows.

### workflow_statistics

Counts workflow IDs and their status.

### workflows_tags

Maps tags to workflows. [tag_entity](#tag_entity) contains tag details.

## Entity Relationship Diagram (ERD)

!["n8n ERD"](/_images/hosting/architecture/n8n-database-diagram.png)

<!-- vale on -->


# hosting/architecture/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Understand n8n's architecture
contentType: overview
---

# Architecture

Understanding n8n's underlying architecture is helpful if you need to:

* Embed n8n
* Customize n8n's default databases

This section is a work in progress. If you have questions, please try the [forum](https://community.n8n.io/){:target=_blank .external-link} and let n8n know which architecture documents would be useful for you.


# hosting/cli-commands.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: CLI commands available in n8n.
contentType: reference
---

# CLI commands for n8n

n8n includes a CLI (command line interface), allowing you to perform actions using the CLI rather than the n8n editor. These include starting workflows, and exporting and importing workflows and credentials.

## Running CLI commands

You can use CLI commands with self-hosted n8n. Depending on how you choose to install n8n, there are differences in how to run the commands:

* npm: the `n8n` command is directly available. The documentation uses this in the examples below.
* Docker: the `n8n` command is available within your Docker container:

    ```sh
    docker exec -u node -it <n8n-container-name> <n8n-cli-command>
    ```

## Start a workflow

You can start workflows directly using the CLI.

Execute a saved workflow by its ID:

```bash
n8n execute --id <ID>
```

## Change the active status of a workflow

You can change the active status of a workflow using the CLI.

/// note | Restart required
These commands operate on your n8n database. If you execute them while n8n is running, the changes don't take effect until you restart n8n.
///

Set the active status of a workflow by its ID to false:

```bash
n8n update:workflow --id=<ID> --active=false
```

Set the active status of a workflow by its ID to true:

```bash
n8n update:workflow --id=<ID> --active=true
```

Set the active status to false for all the workflows:

```bash
n8n update:workflow --all --active=false
```

Set the active status to true for all the workflows:

```bash
n8n update:workflow --all --active=true
```

## Export workflows and credentials

You can export your workflows and credentials from n8n using the CLI.

Command flags:

| Flag | Description |
|-------------|-------|
| --help | Help prompt. |
| --all | Exports all workflows/credentials. |
| --backup | Sets --all --pretty --separate for backups. You can optionally set --output. |
| --id | The ID of the workflow to export. |
| --output | Outputs file name or directory if using separate files. |
| --pretty | Formats the output in an easier to read fashion. |
| --separate | Exports one file per workflow (useful for versioning). Must set a directory using --output. |
| --decrypted | Exports the credentials in a plain text format. |

### Workflows

Export all your workflows to the standard output (terminal):

```bash
n8n export:workflow --all
```

Export a workflow by its ID and specify the output file name:

```bash
n8n export:workflow --id=<ID> --output=file.json
```

Export all workflows to a specific directory in a single file:

```bash
n8n export:workflow --all --output=backups/latest/file.json
```

Export all the workflows to a specific directory using the `--backup` flag (details above):

```bash
n8n export:workflow --backup --output=backups/latest/
```

### Credentials

Export all your credentials to the standard output (terminal):

```bash
n8n export:credentials --all
```

Export credentials by their ID and specify the output file name:

```bash
n8n export:credentials --id=<ID> --output=file.json
```

Export all credentials to a specific directory in a single file:

```bash
n8n export:credentials --all --output=backups/latest/file.json
```

Export all the credentials to a specific directory using the `--backup` flag (details above):

```bash
n8n export:credentials --backup --output=backups/latest/
```

Export all the credentials in plain text format. You can use this to migrate from one installation to another that has a different secret key in the configuration file.

/// warning | Sensitive information
All sensitive information is visible in the files.
///

```bash
n8n export:credentials --all --decrypted --output=backups/decrypted.json
```

## Import workflows and credentials

You can import your workflows and credentials from n8n using the CLI.

/// warning | Update the IDs
When exporting workflows and credentials, n8n also exports their IDs. If you have workflows and credentials with the same IDs in your existing database, they will be overwritten. To avoid this, delete or change the IDs before importing.
///

Available flags:

| Flag | Description |
|------|-------------|
| --help | Help prompt. |
| --input | Input file name or directory if you use --separate. |
| --projectId | Import the workflow or credential to the specified project. Can't be used with `--userId`. |
| --separate | Imports `*.json` files from directory provided by --input. |
| --userId | Import the workflow or credential to the specified user. Can't be used with `--projectId`. |

/// note | Migrating to SQLite
n8n limits workflow and credential names to 128 characters, but SQLite doesn't enforce size limits.

This might result in errors like **Data too long for column name** during the import process.

In this case, you can edit the names from the n8n interface and export again, or edit the JSON file directly before importing.
///

### Workflows

Import workflows from a specific file:

```bash
n8n import:workflow --input=file.json
```

Import all the workflow files as JSON from the specified directory:

```bash
n8n import:workflow --separate --input=backups/latest/
```

### Credentials

Import credentials from a specific file:

```bash
n8n import:credentials --input=file.json
```

Import all the credentials files as JSON from the specified directory:

```bash
n8n import:credentials --separate --input=backups/latest/
```

## License

### Clear

Clear your existing license from n8n's database and reset n8n to default features:

```sh
n8n license:clear
```

If your license includes [floating entitlements](/glossary.md#entitlement-n8n), running this command will also attempt to release them back to the pool, making them available for other instances.

### Info

Display information about the existing license:

```sh
n8n license:info
```

## User management

You can reset user management using the n8n CLI. This returns user management to its pre-setup state. It removes all user accounts.

Use this if you forget your password, and don't have SMTP set up to do password resets by email.

```sh
n8n user-management:reset
```

### Disable MFA for a user

If a user loses their recovery codes you can disable MFA for a user with this command. The user will then be able to log back in to set up MFA again.

```sh
n8n mfa:disable --email=johndoe@example.com
```

### Disable LDAP

You can reset the LDAP settings using the command below.

```sh
n8n ldap:reset
```

## Security audit

You can run a [security audit](/hosting/securing/security-audit.md) on your n8n instance, to detect common security issues.

```sh
n8n audit
```


# hosting/community-edition-features.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Community edition features
description: Differences in available features between the Community edition and other paid plans.
contentType: explanation
tags:
  - Community edition
  - Enterprise edition
hide:
  - tags
---

# Community Edition Features

The community edition includes almost the complete feature set of n8n, except for the features listed here.

The community edition doesn't include these features:

- [Custom Variables](/code/variables.md)
- [Environments](/source-control-environments/index.md)
- [External secrets](/external-secrets.md)
- [External storage for binary data](/hosting/scaling/external-storage.md)
- [Log streaming](/log-streaming.md) ([Logging](/hosting/logging-monitoring/logging.md) _is_ included) 
- [Multi-main mode](/hosting/scaling/queue-mode.md#multi-main-setup) ([Queue mode](/hosting/scaling/queue-mode.md) _is_ included)
- [Projects](/user-management/rbac/projects.md)
- SSO ([SAML](/hosting/securing/set-up-sso.md), [LDAP](/user-management/ldap.md))
- Sharing ([workflows](/workflows/sharing.md), [credentials](/credentials/credential-sharing.md)) (Only the instance owner and the user who creates them can access workflows and credentials)
- [Version control using Git](/source-control-environments/index.md)
- [Workflow history](/workflows/history.md) (You can get one day of workflow history with the community edition by [registering](#registered-community-edition))

These features are available on the Enterprise Cloud plan, including the self-hosted Enterprise edition. Some of these features are available on the Starter and Pro Cloud plan. 

See [pricing](https://n8n.io/pricing/){:target=_blank .external-link} for reference.

## Registered Community Edition

You can unlock extra features by registering your n8n community edition. You register with your email and receive a license key.

Registering unlocks these features for the community edition:

* [Folders](/release-notes.md#folders): Organize your workflows into tidy folders
* [Debug in editor](/workflows/executions/debug.md): Copy and [pin](/glossary.md#data-pinning-n8n) execution data when working on a workflow
* One day of [workflow history](/workflows/history.md): 24 hours of workflow history so you can revert back to previous workflow versions
* [Custom execution data](/workflows/executions/custom-executions-data.md): Save, find, and annotate execution metadata

To register a new community edition instance, select the option during your initial account creation.

To register an existing community edition instance:

1. Select the **three dots icon** <span class="inline-image">![three dots icon](/_images/common-icons/three-dots-horizontal.png){.off-glb}</span> in the lower-left corner.
1. Select **Settings** and then **Usage and plan**.
1. Select **Unlock** to enter your email and then select **Send me a free license key**.
1. Check your email for the account you entered.

Once you have a license key, activate it by clicking the button in the license email or by visiting **Options > Settings > Usage and plan** and selecting **Enter activation key**.

Once activated, your license will not expire. We may change the unlocked features in the future. This will not impact previously unlocked features.


# hosting/configuration/configuration-examples/base-url.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure the Base URL for n8n's front end access
description: Configure the Base URL environment variable to define the front end's access path to the back end's REST API for n8n.
contentType: howto
---

# Configure the Base URL for n8n's front end access

/// warning | Requires manual UI build
This use case involves configuring the `VUE_APP_URL_BASE_API` environmental variable which requires a manual build of the `n8n-editor-ui` package. You can't use it with the default n8n Docker image where the default setting for this variable is `/`, meaning that it uses the root-domain.
///

You can configure the Base URL that the front end uses to connect to the back end's REST API. This is relevant when you want to host n8n's front end and back end separately. 

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on this variable.


# hosting/configuration/configuration-examples/custom-certificate-authority.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure n8n to use your own certificate authority
description: Customize the n8n container to work with self signed certificates when connecting to services.
contentType: howto
---

# Configure n8n to use your own certificate authority or self-signed certificate

You can add your own certificate authority (CA) or self-signed certificate to n8n. This means you are able to trust a certain SSL certificate instead of trusting all invalid certificates, which is a potential security risk.

/// note | Available in version 1.42.0
This feature is only available in version 1.42.0+.
///

To use this feature you need to place your certificates in a folder and mount the folder to `/opt/custom-certificates` in the container.

## Docker

The examples below assume you have a folder called `pki` that contains your certificates in either the directory you run the command from or next to your docker compose file.

### Docker CLI
When using the CLI you can use the `-v` flag from the command line:

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v ./pki:/opt/custom-certificates \
 docker.n8n.io/n8nio/n8n
```

### Docker Compose

```yaml
name: n8n
services:
    n8n:
        volumes:
            - ./pki:/opt/custom-certificates
        container_name: n8n
        ports:
            - 5678:5678
        image: docker.n8n.io/n8nio/n8n
```

You should also give the right permissions to the imported certs. You can do this once the container is running (assuming n8n as the container name):

```bash
docker exec --user 0 n8n chown -R 1000:1000 /opt/custom-certificates
```


# hosting/configuration/configuration-examples/custom-nodes-location.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Specify location for your custom nodes
description: Add folders and specify paths for your custom nodes. 
contentType: howto
---

# Specify location for your custom nodes

Every user can add custom nodes that get loaded by n8n on startup. The default
location is in the subfolder `.n8n/custom` of the user who started n8n.

You can define more folders with an environment variable:

```bash
export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/nodes.md) for more information on this variable.


# hosting/configuration/configuration-examples/encryption-key.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set a custom encryption key
description: Set a custom encryption key for n8n to securely encrypt credentials.
contentType: howto
---

# Set a custom encryption key

n8n creates a random encryption key automatically on the first launch and saves
it in the `~/.n8n` folder. n8n uses that key to encrypt the credentials before
they get saved to the database. If the key isn't yet in the settings file,
you can set it using an environment variable, so that n8n 
uses your custom key instead of generating a new one.

In [queue mode](/hosting/scaling/queue-mode.md), you must specify the encryption key environment variable for all workers.

```bash
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on this variable.


# hosting/configuration/configuration-examples/execution-timeout.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure workflow timeout settings
description: Set execution timeouts to determine how long workflows can run.  
contentType: howto
---

# Configure workflow timeout settings

A workflow times out and gets canceled after this time (in seconds). If the workflow runs in the main process, a soft timeout happens (takes effect after the current node finishes). If a workflow runs in its own process, n8n attempts a soft timeout first, then kills the process after waiting for a fifth of the given timeout duration.

`EXECUTIONS_TIMEOUT` default is `-1`. For example, if you want to set the timeout to one hour:

```bash
export EXECUTIONS_TIMEOUT=3600
```

You can also set maximum execution time (in seconds) for each workflow individually. For example, if you want to set maximum execution time to two hours:

```bash
export EXECUTIONS_TIMEOUT_MAX=7200
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/executions.md) for more information on these variables.


# hosting/configuration/configuration-examples/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configuration examples
description: An overview containing different configuration examples.
contentType: overview
---

# Configuration examples

This section contains examples for how to configure n8n to solve particular use cases.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]


# hosting/configuration/configuration-examples/isolation.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Isolate n8n
description: Prevent your n8n instance from connecting with n8n's servers. 
contentType: howto
---

# Isolate n8n

By default, a self-hosted n8n instance sends data to n8n's servers. It notifies users about available updates, workflow templates, and diagnostics. 

To prevent your n8n instance from connecting to n8n's servers, set these environment variables to false: 

```
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
```

Unset n8n's diagnostics configuration:

```
EXTERNAL_FRONTEND_HOOKS_URLS=
N8N_DIAGNOSTICS_CONFIG_FRONTEND=
N8N_DIAGNOSTICS_CONFIG_BACKEND=
```

Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on these variables.


# hosting/configuration/configuration-examples/modules-in-code-node.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Enable modules in Code node
description: Allow the use of both built-in and external modules within the Code node.
contentType: howto
---

# Enable modules in Code node

For security reasons, the Code node restricts importing modules. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

- `NODE_FUNCTION_ALLOW_BUILTIN`: For built-in modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when an environment variable isn't set.

```bash
# Allows usage of all builtin modules
export NODE_FUNCTION_ALLOW_BUILTIN=*

# Allows usage of only crypto
export NODE_FUNCTION_ALLOW_BUILTIN=crypto

# Allows usage of only crypto and fs
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# Allow usage of external npm modules.
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/nodes.md) for more information on these variables.


# hosting/configuration/configuration-examples/prometheus.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Enable Prometheus metrics 
description: Enable Prometheus metrics endpoint.
contentType: howto
---

# Enable Prometheus metrics 

To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client){:target="_blank" .external-link} library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

Refer to the respective [Environment Variables](/hosting/configuration/environment-variables/endpoints.md) (`N8N_METRICS_INCLUDE_*`) for configuring which metrics and labels should get exposed.

Both `main` and `worker` instances are able to expose metrics.

## Queue metrics

To enable queue metrics, set the `N8N_METRICS_INCLUDE_QUEUE_METRICS` env var to `true`. You can adjust the refresh rate with `N8N_METRICS_QUEUE_METRICS_INTERVAL`.

Queue metrics are only available for the `main` instance in single-main mode.

```
# HELP n8n_scaling_mode_queue_jobs_active Current number of jobs being processed across all workers in scaling mode.
# TYPE n8n_scaling_mode_queue_jobs_active gauge
n8n_scaling_mode_queue_jobs_active 0

# HELP n8n_scaling_mode_queue_jobs_completed Total number of jobs completed across all workers in scaling mode since instance start.
# TYPE n8n_scaling_mode_queue_jobs_completed counter
n8n_scaling_mode_queue_jobs_completed 0

# HELP n8n_scaling_mode_queue_jobs_failed Total number of jobs failed across all workers in scaling mode since instance start.
# TYPE n8n_scaling_mode_queue_jobs_failed counter
n8n_scaling_mode_queue_jobs_failed 0

# HELP n8n_scaling_mode_queue_jobs_waiting Current number of enqueued jobs waiting for pickup in scaling mode.
# TYPE n8n_scaling_mode_queue_jobs_waiting gauge
n8n_scaling_mode_queue_jobs_waiting 0
```


# hosting/configuration/configuration-examples/time-zone.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set the self-hosted instance timezone
description: Change the default timezone for your self-hosted n8n instance.
contentType: howto
---

# Set the self-hosted instance timezone

The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/){:target="_blank" .external-link}.

Refer to [Environment variables reference](/hosting/configuration/environment-variables/timezone-localization.md) for more information on this variable.


# hosting/configuration/configuration-examples/user-folder.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Specify user folder path
description: Specify location of the folder that stores user-specific data. 
contentType: howto
---

# Specify user folder path

n8n saves user-specific data like the encryption key, SQLite database file, and
the ID of the tunnel (if used) in the subfolder `.n8n` of the user who started n8n. It's possible to overwrite the user-folder using an environment variable.

```bash
export N8N_USER_FOLDER=/home/jim/n8n
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on this variable.


# hosting/configuration/configuration-examples/webhook-url.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure webhook URLs with reverse proxy
description: Customize n8n webhook URLs for compatibility with reverse proxy setups.
contentType: howto
---

# Configure n8n webhooks with reverse proxy

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443. In that case, it's important to set the webhook URL manually so that n8n can display it in the Editor UI and register the correct webhook URLs with external services.

```bash
export WEBHOOK_URL=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/endpoints.md) for more information on this variable.


# hosting/configuration/configuration-methods.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configuration methods
description: How to set environment variables for n8n.
contentType: howto
---

# Configuration

You can change n8n's settings using environment variables. For a full list of available configurations see [Environment Variables](/hosting/configuration/environment-variables/index.md).

## Set environment variables by command line

### npm

For npm, set your desired environment variables in terminal using the `export` command as shown below:

```bash
export <variable>=<value>
```

### Docker

In Docker you can use the `-e` flag from the command line:

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e N8N_TEMPLATES_ENABLED="false" \
 docker.n8n.io/n8nio/n8n
```

## Set environment variables using a file

You can also configure n8n using a configuration file.

Only define the values that need to be different from the default in your configuration file. You can use multiple files. For example, you can have a file with generic base settings, and files with specific values for different environments.

### npm

Set the path to the JSON configuration file using the environment variable `N8N_CONFIG_FILES`:

```shell
# Bash - Single file
export N8N_CONFIG_FILES=/<path-to-config>/my-config.json
# Bash - Multiple files are comma-separated
export N8N_CONFIG_FILES=/<path-to-config>/my-config.json,/<path-to-config>/production.json

# PowerShell - Single file, persist for current user
# Note that setting scope (Process, User, Machine) has no effect on Unix systems
[Environment]::SetEnvironmentVariable('N8N_CONFIG_FILES', '<path-to-config>\config.json', 'User')
```

Example file:

```json
{
 "executions": {
  "saveDataOnSuccess": "none"
 },
 "generic": {
  "timezone": "Europe/Berlin"
 },
 "nodes": {
  "exclude": "[\"n8n-nodes-base.executeCommand\",\"n8n-nodes-base.writeBinaryFile\"]"
 }
}
```

/// note | Formatting as JSON
You can't always work out the correct JSON from the [Environment variables reference](/hosting/configuration/environment-variables/index.md). For example, to set `N8N_METRICS` to `true`, you need to do:

```json
{
	"endpoints": {
		"metrics": {
			"enable": true
		}
	}
}
```

Refer to the [Schema file in the source code](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/config/schema.ts){:target=_blank .external-link} for full details of the expected settings.
///


### Docker

In Docker, you can set your environment variables in the `n8n: environment:` element of your `docker-compose.yaml` file.

For example:

```yaml
n8n:
    environment:
      - N8N_TEMPLATES_ENABLED=false
```

### Keeping sensitive data in separate files

You can append `_FILE` to individual environment variables to provide their configuration in a separate file, enabling you to avoid passing sensitive details using environment variables. n8n loads the data from the file with the given name, making it possible to load data from [Docker-Secrets](https://docs.docker.com/engine/swarm/secrets/){:target=_blank .external-link} and [Kubernetes-Secrets](https://kubernetes.io/docs/concepts/configuration/secret/){:target=_blank .external-link}. 

Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for details on each variable.

While most environment variables can use the `_FILE` suffix, it's more beneficial for sensitive data such as [credentials](/glossary.md#credential-n8n) and database configuration. Here are some examples: 

```yaml
CREDENTIALS_OVERWRITE_DATA_FILE=/path/to/credentials_data
DB_TYPE_FILE=/path/to/db_type
DB_POSTGRESDB_DATABASE_FILE=/path/to/database_name
DB_POSTGRESDB_HOST_FILE=/path/to/database_host
DB_POSTGRESDB_PORT_FILE=/path/to/database_port
DB_POSTGRESDB_USER_FILE=/path/to/database_user
DB_POSTGRESDB_PASSWORD_FILE=/path/to/database_password
DB_POSTGRESDB_SCHEMA_FILE=/path/to/database_schema
DB_POSTGRESDB_SSL_CA_FILE=/path/to/ssl_ca
DB_POSTGRESDB_SSL_CERT_FILE=/path/to/ssl_cert
DB_POSTGRESDB_SSL_KEY_FILE=/path/to/ssl_key
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED_FILE=/path/to/ssl_reject_unauth
```


# hosting/configuration/environment-variables/binary-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Binary data environment variables
description: Customize binary data storage modes and paths with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Binary data environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

By default, n8n uses memory to store binary data. Enterprise users can choose to use an external service instead. Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data. 


| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_AVAILABLE_BINARY_DATA_MODES` | String | `filesystem` | A comma separated list of available binary data modes. |
| `N8N_BINARY_DATA_STORAGE_PATH` | String | `N8N_USER_FOLDER/binaryData` | The path where n8n stores binary data. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | String | `default` | The default binary data mode. `default` keeps binary data in memory. Set to `filesystem` to use the filesystem, or `s3` to AWS S3. Note that binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. This may change in future. |


# hosting/configuration/environment-variables/credentials.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Credentials environment variables
description: Manage default credentials and override them through environment variables your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Credentials environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Enable credential overwrites using the following environment variables. Refer to [Credential overwrites](/embed/configuration.md#credential-overwrites) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | * | - | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String | - | The API endpoint to fetch credentials. |
| `CREDENTIALS_DEFAULT_NAME` | String | `My credentials` | The default name for credentials. |


# hosting/configuration/environment-variables/database.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Database environment variables
description: Set up and configure databases with environment variables for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Database environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

By default, n8n uses SQLite. n8n also supports PostgreSQL. n8n [removed support for MySQL and MariaDB](/1-0-migration-checklist.md#mysql-and-mariadb) in v1.0.

This page outlines environment variables to configure your chosen database for your self-hosted n8n instance.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_TYPE`<br>/`_FILE` | Enum string:<br> `sqlite`, `postgresdb` | `sqlite` | The database to use. |
| `DB_TABLE_PREFIX` | * | - | Prefix to use for table names. |

## PostgreSQL

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_POSTGRESDB_DATABASE`<br>/`_FILE` | String | `n8n` | The name of the PostgreSQL database. |
| `DB_POSTGRESDB_HOST`<br>/`_FILE` | String | `localhost` | The PostgreSQL host. |
| `DB_POSTGRESDB_PORT`<br>/`_FILE` | Number | `5432` | The PostgreSQL port. |
| `DB_POSTGRESDB_USER`<br>/`_FILE` | String | `postgres` | The PostgreSQL user. |
| `DB_POSTGRESDB_PASSWORD`<br>/`_FILE` | String | - | The PostgreSQL password. |
| `DB_POSTGRESDB_POOL_SIZE`<br>/`_FILE` | Number | `2` | Control how many parallel open Postgres connections n8n should have. Increasing it may help with resource utilization, but too many connections may degrade performance. |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT`<br>/`_FILE` | Number | `20000` | Postgres connection timeout (ms).
| `DB_POSTGRESDB_SCHEMA`<br>/`_FILE` | String | `public` | The PostgreSQL schema. |
| `DB_POSTGRESDB_SSL_ENABLED`<br>/`_FILE` | Boolean | `false` | Whether to enable SSL. Automatically enabled if `DB_POSTGRESDB_SSL_CA`, `DB_POSTGRESDB_SSL_CERT` or `DB_POSTGRESDB_SSL_KEY` is defined. |
| `DB_POSTGRESDB_SSL_CA`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY`<br>/`_FILE` | String | - | The PostgreSQL SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`<br>/`_FILE` | Boolean | `true` | If n8n should reject unauthorized SSL connections (true) or not (false). |

## SQLite

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_SQLITE_POOL_SIZE` | Number | `0` | Controls whether to open the SQLite file in [WAL mode](https://www.sqlite.org/wal.html) or [rollback journal mode](https://www.sqlite.org/lockingv3.html#rollback). Uses rollback journal mode when set to zero. When greater than zero, uses WAL mode with the value determining the number of parallel SQL read connections to configure. WAL mode is much more performant and reliable than the rollback journal mode. |
| `DB_SQLITE_VACUUM_ON_STARTUP` | Boolean | `false` | Runs [VACUUM](https://www.sqlite.org/lang_vacuum.html){:target="_blank" .external-link} operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time. |


# hosting/configuration/environment-variables/deployment.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Deployment environment variables
description: Configure deployment options and application accessibility with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Deployment environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists the deployment configuration options for your self-hosted n8n instance, including setting up access URLs, enabling templates, customizing encryption, and configuring server details. 

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EDITOR_BASE_URL` | String | - | Public URL where users can access the editor. Also used for emails sent from n8n and the redirect URL for SAML based authentication. |
| `N8N_CONFIG_FILES` | String | - | Use to provide the path to any JSON [configuration file](/hosting/configuration/configuration-methods.md). |
| `N8N_DISABLE_UI` | Boolean | `false` | Set to `true` to disable the UI. |
| `N8N_PREVIEW_MODE` | Boolean | `false` | Set to `true` to run in preview mode. |
| `N8N_TEMPLATES_ENABLED` | Boolean | `false` | Enables [workflow templates](/glossary.md#template-n8n) (true) or disable (false). |
| `N8N_TEMPLATES_HOST` | String | `https://api.n8n.io` | Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](/workflows/templates.md) for more information. |
| `N8N_ENCRYPTION_KEY` | String | Random key generated by n8n | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch. |
| `N8N_USER_FOLDER` | String | `user-folder` | Provide the path where n8n will create the `.n8n` folder. This directory stores user-specific data, such as database file and encryption key. |
| `N8N_PATH` | String | `/` | The path n8n deploys to. |
| `N8N_HOST` | String | `localhost` | Host name n8n runs on. |
| `N8N_PORT` | Number | `5678` | The HTTP port n8n runs on. |
| `N8N_LISTEN_ADDRESS` | String | `0.0.0.0` | The IP address n8n should listen on. |
| `N8N_PROTOCOL` | Enum string: `http`, `https` | `http` | The protocol used to reach n8n. |
| `N8N_SSL_KEY` | String | - | The SSL key for HTTPS protocol. |
| `N8N_SSL_CERT` | String | - | The SSL certificate for HTTPS protocol. |
| `N8N_PERSONALIZATION_ENABLED` | Boolean | `true` | Whether to ask users personalisation questions and then customise n8n accordingly. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | Boolean | `true` | When enabled, n8n sends notifications of new versions and security updates. |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | String | `https://api.n8n.io/versions/` | The endpoint to retrieve where version information. |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | String | `https://docs.n8n.io/getting-started/installation/updating.html` | The URL displayed in the New Versions panel for more information. |
| `N8N_DIAGNOSTICS_ENABLED` | Boolean | `true` | Whether to share selected, anonymous [telemetry](/privacy-security/privacy.md) with n8n. Note that if you set this to `false`, you can't enable Ask AI in the Code node. |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND` | String | `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io` | Telemetry configuration for the frontend. |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | String | `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch` | Telemetry configuration for the backend. |
| `N8N_PUSH_BACKEND` | String | `websocket` | Choose whether the n8n backend uses server-sent events (`sse`) or WebSockets (`websocket`) to send changes to the UI. |
| `VUE_APP_URL_BASE_API` | String | `http://localhost:5678/` | Used when building the `n8n-editor-ui` package manually to set how the frontend can reach the backend API. Refer to [Configure the Base URL](/hosting/configuration/configuration-examples/base-url.md). |
| `N8N_HIRING_BANNER_ENABLED` | Boolean | `true` | Whether to show the n8n hiring banner in the console (true) or not (false). |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED` | Boolean | `false` | Whether the Swagger UI (API playground) is disabled (true) or not (false). |
| `N8N_PUBLIC_API_DISABLED` | Boolean | `false` | Whether to disable the public API (true) or not (false). |
| `N8N_PUBLIC_API_ENDPOINT` | String | `api` | Path for the public API endpoints. |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | Number | `30` | How long should the n8n process wait (in seconds) for components to shut down before exiting the process. |
| `N8N_DEV_RELOAD` | Boolean | `false` | When working on the n8n source code, set this to `true` to automatically reload or restart the application when changes occur in the source code files. |
| `N8N_REINSTALL_MISSING_PACKAGES` | Boolean | `false` | If set to `true`, n8n will automatically attempt to reinstall any missing packages. |
| `N8N_TUNNEL_SUBDOMAIN` | String | - | Specifies the subdomain for the n8n tunnel. If not set, n8n generates a random subdomain.|
| `N8N_PROXY_HOPS` | Number | 0 | Number of reverse-proxies n8n is running behind. | 


# hosting/configuration/environment-variables/endpoints.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Endpoints environment variables
description: Customize the application's API and webhook endpoints with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Endpoints environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists environment variables for customizing endpoints in n8n.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_PAYLOAD_SIZE_MAX` | Number | `16` | The maximum payload size in MiB. |
| `N8N_FORMDATA_FILE_SIZE_MAX` | Number | `200` | Max payload size for files in form-data webhook payloads in MiB. |
| `N8N_METRICS` | Boolean | `false` | Whether to enable the `/metrics` endpoint. |
| `N8N_METRICS_PREFIX` | String | `n8n_` | Optional prefix for n8n specific metrics names. |
| `N8N_METRICS_INCLUDE_DEFAULT_METRICS` | Boolean | `true` | Whether to expose default system and node.js metrics. |
| `N8N_METRICS_INCLUDE_CACHE_METRICS` | Boolean | false | Whether to include metrics (true) for cache hits and misses, or not include them (false). |
| `N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS` | Boolean | `false` | Whether to include metrics (true) for events, or not include them (false). |
| `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` | Boolean | `false` | Whether to include a label for the workflow ID on workflow metrics. |
| `N8N_METRICS_INCLUDE_NODE_TYPE_LABEL` | Boolean | `false` | Whether to include a label for the node type on node metrics. |
| `N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL` | Boolean | `false` | Whether to include a label for the credential type on credential metrics. |
| `N8N_METRICS_INCLUDE_API_ENDPOINTS` | Boolean | `false` | Whether to expose metrics for API endpoints. |
| `N8N_METRICS_INCLUDE_API_PATH_LABEL` | Boolean | `false` | Whether to include a label for the path of API invocations. |
| `N8N_METRICS_INCLUDE_API_METHOD_LABEL` | Boolean | `false` | Whether to include a label for the HTTP method (GET, POST, ...) of API invocations. |
| `N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL` | Boolean | `false` | Whether to include a label for the HTTP status code (200, 404, ...) of API invocations. |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | Boolean | `false` | Whether to include metrics for jobs in scaling mode. Not supported in multi-main setup. |
| `N8N_METRICS_QUEUE_METRICS_INTERVAL` | Integer | `20` | How often (in seconds) to update queue metrics. |
| `N8N_ENDPOINT_REST` | String | `rest` | The path used for REST endpoint. |
| `N8N_ENDPOINT_WEBHOOK` | String | `webhook` | The path used for webhook endpoint. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | String | `webhook-test` | The path used for test-webhook endpoint. |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | String | `webhook-waiting` | The path used for waiting-webhook endpoint. |
| `WEBHOOK_URL` | String | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy. See [here](/hosting/configuration/configuration-examples/webhook-url.md) for more details. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Boolean | `false` | Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes. |


# hosting/configuration/environment-variables/executions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Executions environment variables
description: Environment variables to configure settings related to workflow executions. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Executions environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists environment variables to configure workflow execution settings.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `EXECUTIONS_MODE` | Enum string: `regular`, `queue` | `regular` | Whether executions should run directly or using queue.<br><br>Refer to [Queue mode](/hosting/scaling/queue-mode.md) for more details. |
| `EXECUTIONS_TIMEOUT` | Number | `-1` | Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in `EXECUTIONS_TIMEOUT_MAX`. Set `EXECUTIONS_TIMEOUT` to `-1` to disable. |
| `EXECUTIONS_TIMEOUT_MAX` | Number | `3600` | The maximum execution time (in seconds) that users can set for an individual workflow. |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | Enum string: `all`, `none` | `all` | Whether n8n saves execution data on error. |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | Enum string: `all`, `none` | `all` | Whether n8n saves execution data on success. |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | Boolean | `false` | Whether to save progress for each node executed (true) or not (false). |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | Boolean | `true` | Whether to save data of executions when started manually. |
| `EXECUTIONS_DATA_PRUNE` | Boolean | `true` | Whether to delete data of past executions on a rolling basis. |
| `EXECUTIONS_DATA_MAX_AGE` | Number | `336` | The execution age (in hours) before it's deleted. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | Number | `10000` | Maximum number of executions to keep in the database. 0 = no limit |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | Number | `1` | How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow. |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | Number | `15` | How often (minutes) execution data should be hard-deleted. |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | Number | `60` | How often (minutes) execution data should be soft-deleted. |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | Number | `-1` | Max production executions allowed to run concurrently, in both regular and scaling modes. `-1` to disable in regular mode. |


# hosting/configuration/environment-variables/external-data-storage.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: External data storage environment variables
description: Environment variables to configure external data storage for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
  - external storage
  - storage
hide:
  - toc
  - tags
---

# External data storage environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_STORAGE_S3_HOST` | String | - | Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com` |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME` | String | - | Name of the n8n bucket in S3-compatible external storage. |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` | String | - | Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`|
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY` | String | - | Access key in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET` | String | - | Access secret in S3-compatible external storage. |
| `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` | Boolean | - | Use automatic credential detection to authenticate S3 calls for external storage. This will ignore the access key and access secret and use the default [credential provider chain](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain). |


# hosting/configuration/environment-variables/external-hooks.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: External hooks environment variables
description: Environment variables to integrate external hooks into your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# External hooks environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

You can define external hooks that n8n executes whenever a specific operation runs. Refer to [Backend hooks](/embed/configuration.md#backend-hooks) for examples of available hooks and [Hook files](/embed/configuration.md#backend-hook-files) for information on file formatting. 

| Variable | Type  | Description |
| :------- | :---- | :---------- |
| `EXTERNAL_HOOK_FILES` | String | Files containing backend external hooks. Provide multiple files as a colon-separated list ("`:`"). |
| `EXTERNAL_FRONTEND_HOOKS_URLS` | String | URLs to files containing frontend external hooks. Provide multiple URLs as a colon-separated list ("`:`"). |


# hosting/configuration/environment-variables/external-secrets.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: External secrets environment variables
description: Configure the interval for checking updates to external secrets in self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# External secrets environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](/external-secrets.md) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |


# hosting/configuration/environment-variables/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Environment Variables Overview
description: An overview of configuration environment variables for self-hosted n8n. 
contentType: overview
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Environment variables overview

This section lists of environment variables that you can use to change n8n's configuration settings when self-hosting n8n.

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods.md) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. 
///

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]


# hosting/configuration/environment-variables/insights.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Insights environment variables
description: Configure insights metrics collection with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Insights environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Insights gives instance owners and admins visibility into how workflows perform over time. Refer to [Insights](/insights.md) for details.

 | Variable                                                 | Type   | Default | Description                                                                             |
 |:---------------------------------------------------------|:-------|:--------|:----------------------------------------------------------------------------------------|
 | `N8N_DISABLED_MODULES`                                   | String | -       | Set to `insights` to disable the feature and metrics collection for an instance.        |
 | `N8N_INSIGHTS_COMPACTION_BATCH_SIZE`                     | Number | 500     | The number of raw insights data to compact in a single batch.                           |
 | `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180     | The maximum age (in days) of daily insights data to compact.                            |
 | `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90      | The maximum age (in days) of hourly insights data to compact.                           |
 | `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES`               | Number | 60      | Interval (in minutes) at which compaction should run.                                   |
 | `N8N_INSIGHTS_FLUSH_BATCH_SIZE`                          | Number | 1000    | The maximum number of insights data to keep in the buffer before flushing.              |
 | `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS`                    | Number | 30      | The interval (in seconds) at which the insights data should be flushed to the database. |


# hosting/configuration/environment-variables/licenses.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: License environment variables
description: Environment variables to configure license settings in n8n, including options to hide the usage page, manage license activation and auto-renewal settings, and specify the server URL for license retrieval.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# License environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

To enable certain licensed features, you must first activate your license. You can do this either through the UI or by setting environment variables. For more information, see [license key](/license-key.md).

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_HIDE_USAGE_PAGE` | boolean | `false` | Hide the usage and plans page in the app. |
| `N8N_LICENSE_ACTIVATION_KEY` | String | `''` | Activation key to initialize license. Not applicable if the n8n instance was already activated. |
| `N8N_LICENSE_AUTO_RENEW_ENABLED` | Boolean | `true` | Enables (true) or disables (false) autorenewal for licenses. <br>If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable all licensed features. |
| `N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN` | Boolean | `true` | Controls whether the instance releases [floating entitlements](/glossary.md#entitlement-n8n) back to the pool upon shutdown. Set to `true` to allow other instances to reuse the entitlements, or `false` to retain them. <br> For production instances that must always keep their licensed features, set this to `false`. |
| `N8N_LICENSE_SERVER_URL` | String | `http://license.n8n.io/v1` | Server URL to retrieve license. |
| `N8N_LICENSE_TENANT_ID` | Number | `1` | Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n. |
| `https_proxy_license_server` | String | `https://user:pass@proxy:port` | Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase. |


# hosting/configuration/environment-variables/logs.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Logs environment variables
description: Environment variables to configure logging and diagnostic data. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Logs environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists environment variables to set up logging for debugging. Refer to [Logging in n8n](/hosting/logging-monitoring/logging.md) for details. 

## n8n logs

<!-- vale off -->
| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_LOG_LEVEL` | Enum string: `info`, `warn`, `error`, `debug` | `info` | Log output level. Refer to [Log levels](/hosting/logging-monitoring/logging.md#log-levels) for details. |
| `N8N_LOG_OUTPUT` | Enum string: `console`, `file` | `console` | Where to output logs. Provide multiple values as a comma-separated list. |
| `N8N_LOG_FILE_COUNT_MAX` | Number | `100` | Max number of log files to keep. |
| `N8N_LOG_FILE_SIZE_MAX` | Number | `16` | Max size of each log file in MB. |
| `N8N_LOG_FILE_LOCATION` | String | `<n8n-directory-path>/logs/n8n.log` | Log file location. Requires N8N_LOG_OUTPUT set to `file`. |
| `DB_LOGGING_ENABLED` | Boolean | `false` | Whether to enable database-specific logging. |
| `DB_LOGGING_OPTIONS` | Enum string: `query`, `error`, `schema`, `warn`, `info`, `log`  | `error` | Database log output level. To enable all logging, specify `all`. Refer to [TypeORM logging options](https://orkhan.gitbook.io/typeorm/docs/logging#logging-options){:target=_blank .external-link} |
| `DB_LOGGING_MAX_EXECUTION_TIME` | Number | `1000` | Maximum execution time (in milliseconds) before n8n logs a warning. Set to `0` to disable long running query warning. |
| `CODE_ENABLE_STDOUT` | Boolean | `false` | Set to `true` to send Code node logs to process's stdout for debugging, monitoring, or logging purposes. |
| `NO_COLOR` | any | `undefined` | Set to any value to output logs without ANSI colors. For more information, see the [no-color.org website](https://no-color.org/){:target=_blank .external-link}. |
<!-- vale on -->

## Log streaming

Refer to [Log streaming](/log-streaming.md) for more information on this feature.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EVENTBUS_CHECKUNSENTINTERVAL` | Number | `0` | How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to `0` to disable it. |
| `N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS` | Boolean | `false` | Whether all file access happens synchronously within the thread (true) or not (false). |
| `N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT` | Number | `3` | Number of event log files to keep. |
| `N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB` | Number | `10240` | Maximum size (in kilo-bytes) of an event log file before a new one starts. |
| `N8N_EVENTBUS_LOGWRITER_LOGBASENAME` | String | `n8nEventLog` | Basename of the event log file. |


# hosting/configuration/environment-variables/nodes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Nodes environment variables
description: Environment variable to configure nodes management in self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Nodes environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists the environment variables configuration options for managing [nodes](/glossary.md#node-n8n) in n8n, including specifying which nodes to load or exclude, importing built-in or external modules in the Code node, and enabling community nodes.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `NODES_INCLUDE` | Array of strings | - | Specify which nodes to load. |
| `NODES_EXCLUDE` | Array of strings | - | Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: `NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"` |
| `NODE_FUNCTION_ALLOW_BUILTIN` | String | - | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | String | - | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default. |
| `NODES_ERROR_TRIGGER_TYPE` | String | `n8n-nodes-base.errorTrigger` | Specify which node type to use as Error Trigger. |
| `N8N_CUSTOM_EXTENSIONS` | String | - | Specify the path to directories containing your custom nodes. |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | Boolean | `true` | Enables (true) or disables (false) the functionality to install and load community nodes. If set to false, neither verified nor unverified community packages will be available, regardless of their individual settings. |
| `N8N_COMMUNITY_PACKAGES_REGISTRY` | String | `https://registry.npmjs.org` | NPM registry URL to pull community packages from (license required). |
| `N8N_VERIFIED_PACKAGES_ENABLED` | Boolean | `true` | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to show verified community nodes in the nodes panel for installation and use (true) or to hide them (false). |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | Boolean | `true` | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to enable the installation and use of unverified community nodes from an NPM registry (true) or not (false). |
| `N8N_COMMUNITY_PACKAGES_PREVENT_LOADING` | Boolean | `false` | Prevents (true) or allows (false) loading installed community nodes on instance startup. Use this if a faulty node prevents the instance from starting. |


# hosting/configuration/environment-variables/queue-mode.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Queue mode environment variables
description: Environment variables to configure queue mode on your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Queue mode environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

You can run n8n in different modes depending on your needs. Queue mode provides the best scalability. Refer to [Queue mode](/hosting/scaling/queue-mode.md) for more information.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `QUEUE_BULL_PREFIX` | String | - | Prefix to use for all queue keys. |
| `QUEUE_BULL_REDIS_DB` | Number | `0` | The Redis database used. |
| `QUEUE_BULL_REDIS_HOST` | String | `localhost` | The Redis host. |
| `QUEUE_BULL_REDIS_PORT` | Number | `6379` | The Redis port used. |
| `QUEUE_BULL_REDIS_USERNAME` | String | - | The Redis username (needs Redis version 6 or above). Don't define it for Redis < 6 compatibility |
| `QUEUE_BULL_REDIS_PASSWORD` | String | - | The Redis password. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Number | `10000` | The Redis timeout threshold (in ms). |
| `QUEUE_BULL_REDIS_CLUSTER_NODES` | String | - | Expects a comma-separated list of Redis Cluster nodes in the format `host:port`, for the Redis client to initially connect to. If running in queue mode (`EXECUTIONS_MODE = queue`), setting this variable will create a Redis Cluster client instead of a Redis client, and n8n will ignore `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`. |
| `QUEUE_BULL_REDIS_TLS` | Boolean | `false` | Enable TLS on Redis connections. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Boolean | `false` | Enable dual-stack support (IPv4 and IPv6) on Redis connections. |
| `QUEUE_WORKER_TIMEOUT` (**deprecated**) | Number | `30` | **Deprecated** Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead.<br/><br/>How long should n8n wait (seconds) for running executions before exiting worker process on shutdown. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Boolean | `false` | Whether to enable health checks (true) or disable (false). |
| `QUEUE_HEALTH_CHECK_PORT` | Number | - | The port to serve health checks on. |
| `QUEUE_WORKER_LOCK_DURATION` | Number | `30000` | How long (in ms) is the lease period for a worker to work on a message. |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | Number | `15000` | How frequently (in ms) should a worker renew the lease time. |
| `QUEUE_WORKER_STALLED_INTERVAL` | Number | `30000` | How often should a worker check for stalled jobs (use 0 for never). |
| `QUEUE_WORKER_MAX_STALLED_COUNT` | Number | `1` | Maximum amount of times a stalled job will be re-processed. |

## Multi-main setup

Refer to [Configuring multi-main setup](/hosting/scaling/queue-mode.md#configuring-multi-main-setup) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_MULTI_MAIN_SETUP_ENABLED` | Boolean | `false` | Whether to enable multi-main setup for queue mode (license required). |
| `N8N_MULTI_MAIN_SETUP_KEY_TTL` | Number | `10` | Time to live (in seconds) for leader key in multi-main setup. |
| `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL` | Number | `3` | Interval (in seconds) for leader check in multi-main setup. |


# hosting/configuration/environment-variables/security.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Security environment variables
description: Configure authentication and environment variable access in self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Security environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
| `N8N_RESTRICT_FILE_ACCESS_TO` | String |  | Limits access to files in these directories. Provide multiple files as a colon-separated list ("`:`"). |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | Boolean | `true` | Set to `true` to block access to all files in the `.n8n` directory and user defined configuration files. |
| `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number | 90 | Number of days to consider a workflow abandoned if it's not executed. |
| `N8N_SECURE_COOKIE` | Boolean | `true` | Ensures that cookies are only sent over HTTPS, enhancing security.|
| `N8N_SAMESITE_COOKIE` | Enum string: `strict`, `lax`, `none` | `lax` | Controls cross-site cookie behavior ([learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)):<ul><li>`strict`: Sent only for first-party requests.</li><li>`lax` (default): Sent with top-level navigation requests.</li><li>`none`: Sent in all contexts (requires HTTPS).</li></ul> |


# hosting/configuration/environment-variables/source-control.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Source control environment variables
description: Environment variable to set the default SSH key type for source control setup.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Source control environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

n8n uses Git-based source control to support environments. Refer to [Source control and environments](/source-control-environments/setup.md) for more information on how to link a Git repository to an n8n instance and configure your source control.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE` | String | `ed25519` | Set to `rsa` to make RSA the default SSH key type for [Source control setup](/source-control-environments/setup.md). |


# hosting/configuration/environment-variables/task-runners.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Task runner environment variables
description: Environment variables to confgure task runners your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Task runner environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

[Task runners](/hosting/configuration/task-runners.md) execute code defined by the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

## n8n instance environment variables

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_RUNNERS_ENABLED` | Boolean | `false` | Are task runners enabled. |
| `N8N_RUNNERS_MODE` | Enum string: `internal`, `external` | `internal` | How to launch and run the task runner. `internal` means n8n will launch a task runner as child process. `external` means an external orchestrator will launch the task runner. |
| `N8N_RUNNERS_AUTH_TOKEN` | String | Random string | Shared secret used by a task runner to authenticate to n8n. Required when using `external` mode. |
| `N8N_RUNNERS_BROKER_PORT` | Number | `5679` | Port the task broker listens on for task runner connections. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | String | `127.0.0.1` | Address the task broker listens on. |
| `N8N_RUNNERS_MAX_PAYLOAD` | Number | `1 073 741 824` | Maximum payload size in bytes for communication between a task broker and a task runner. |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE` | String |  | The `--max-old-space-size` option to use for a task runner (in MB). By default, Node.js will set this based on available memory. |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Number | `5` | The number of concurrent tasks a task runner can execute at a time. |
| `N8N_RUNNERS_TASK_TIMEOUT` | Number | `60` | How long (in seconds) a task can take to complete before the task aborts and the runner restarts. Must be greater than 0. |
| `N8N_RUNNERS_HEARTBEAT_INTERVAL` | Number | `30` | How often (in seconds) the runner must send a heartbeat to the broker, else the task aborts and the runner restarts. Must be greater than 0. |


## Task runner launcher environment variables

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | Enum string: `debug`, `info`, `warn`, `error` | `info` | Which log messages to show. |
| `N8N_RUNNERS_AUTH_TOKEN` | String | - | Shared secret used to authenticate to n8n. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | Number | `15` | The number of seconds to wait before shutting down an idle runner. |
| `N8N_RUNNERS_TASK_BROKER_URI` | String | `http://127.0.0.1:5679` | The URI of the task broker server (n8n instance). |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Number | `5680` | Port for the launcher's health check server. |
| `N8N_RUNNERS_MAX_PAYLOAD` | Number | `1 073 741 824` | Maximum payload size in bytes for communication between a task broker and a task runner. |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Number | `5` | The number of concurrent tasks a task runner can execute at a time. |
| `NODE_OPTIONS` | String | - | [Options](https://nodejs.org/api/cli.html#node_optionsoptions) for Node.js. |


## Task runner environment variables

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_RUNNERS_GRANT_TOKEN` | String | Random string | Token the runner uses to authenticate with the task broker. This is automatically provided by the launcher. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | Number | `15` | The number of seconds to wait before shutting down an idle runner. |
| `N8N_RUNNERS_TASK_BROKER_URI` | String | `http://127.0.0.1:5679` | The URI of the task broker server (n8n instance). |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Number | `5680` | Port for the launcher's health check server. |
| `N8N_RUNNERS_MAX_PAYLOAD` | Number | `1 073 741 824` | Maximum payload size in bytes for communication between a task broker and a task runner. |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Number | `5` | The number of concurrent tasks a task runner can execute at a time. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | String | - | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | String | - | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default. |
| `N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION` | Boolean | `false` | Whether to allow prototype mutation for external libraries. Set to `true` to allow modules that rely on runtime prototype mutation (for example, [`puppeteer`](https://pptr.dev/)) at the cost of relaxing security. | 
| `GENERIC_TIMEZONE` | * | `America/New_York` | The [same default timezone as configured for the n8n instance](/hosting/configuration/environment-variables/timezone-localization.md). |


# hosting/configuration/environment-variables/timezone-localization.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Timezone and localization environment variables
description: Set the timezone and default language locale for self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Timezone and localization environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `GENERIC_TIMEZONE` | * | `America/New_York` |The n8n instance timezone. Important for schedule nodes (such as Cron). |
| `N8N_DEFAULT_LOCALE` | String | `en` | A locale identifier, compatible with the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language){:target="_blank" .external-link}. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings. |


# hosting/configuration/environment-variables/user-management-smtp-2fa.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: User management SMTP, and two-factor authentication environment variables
description: Environment variables to set up user management and emails.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# User management SMTP, and two-factor authentication environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Refer to [User management](/hosting/configuration/user-management-self-hosted.md) for more information on setting up user management and emails.
<!-- vale off -->
| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EMAIL_MODE` | String | `smtp` | Enable emails. |
| `N8N_SMTP_HOST` | String | - | _your_SMTP_server_name_ |
| `N8N_SMTP_PORT` | Number | - | _your_SMTP_server_port_ |
| `N8N_SMTP_USER` | String | - | _your_SMTP_username_ |
| `N8N_SMTP_PASS` | String | - | _your_SMTP_password_ |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | String | - | If using 2LO with a service account this is your client ID |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | String | - | If using 2LO with a service account this is your private key |
| `N8N_SMTP_SENDER` | String | - | Sender email address. You can optionally include the sender name. Example with name: _N8N `<contact@n8n.com>`_ |
| `N8N_SMTP_SSL` | Boolean | `true` | Whether to use SSL for SMTP (true) or not (false). |
| `N8N_SMTP_STARTTLS` | Boolean | `true` | Whether to use STARTTLS for SMTP (true) or not (false). |
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | String | - | Full path to your HTML email template. This overrides the default template for invite emails. |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | String | - | Full path to your HTML email template. This overrides the default template for password reset emails. |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String | - | Overrides the default HTML template for notifying users that a workflow was shared. Provide the full path to the template. |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String | - | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template.  |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | String | - | Set a specific JWT secret. By default, n8n generates one on start. |
| `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS` | Number | 168 | Set an expiration date for the JWTs in hours. |
| `N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS` | Number | 0 | How many hours before the JWT expires to automatically refresh it. 0 means 25% of `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. -1 means it will never refresh, which forces users to log in again after the period defined in `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. |
| `N8N_MFA_ENABLED` | Boolean | `true` | Whether to enable two-factor authentication (true) or disable (false). n8n ignores this if existing users have 2FA enabled. |
<!-- vale on -->


# hosting/configuration/environment-variables/workflows.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflows environment variables
description: Environment variables to configure workflows in n8n, including default naming, onboarding flow preferences, tag management, and caller policy settings.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Workflows environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_ONBOARDING_FLOW_DISABLED` | Boolean | `false` | Whether to disable onboarding tips when creating a new workflow (true) or not (false). |
| `N8N_WORKFLOW_ACTIVATION_BATCH_SIZE` | Number | `1` | How many workflows to activate simultaneously during startup. 
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | String | `workflowsFromSameOwner` | Which workflows can call a workflow. Options are: `any`, `none`, `workflowsFromAList`, `workflowsFromSameOwner`. This feature requires [Workflow sharing](/workflows/sharing.md). |
| `N8N_WORKFLOW_TAGS_DISABLED` | Boolean | `false` | Whether to disable workflow tags (true) or enable tags (false). |
| `WORKFLOWS_DEFAULT_NAME` | String | `My workflow` | The default name used for new workflows. |


# hosting/configuration/supported-databases-settings.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Supported databases

By default, n8n uses SQLite to save credentials, past executions, and workflows. n8n also supports PostgresDB.

## Shared settings

The following environment variables get used by all databases:

 - `DB_TABLE_PREFIX` (default: -) - Prefix for table names

## PostgresDB

To use PostgresDB as the database, you can provide the following environment variables:

 - `DB_TYPE=postgresdb`
 - `DB_POSTGRESDB_DATABASE` (default: 'n8n')
 - `DB_POSTGRESDB_HOST` (default: 'localhost')
 - `DB_POSTGRESDB_PORT` (default: 5432)
 - `DB_POSTGRESDB_USER` (default: 'postgres')
 - `DB_POSTGRESDB_PASSWORD` (default: empty)
 - `DB_POSTGRESDB_SCHEMA` (default: 'public')
 - `DB_POSTGRESDB_SSL_CA` (default: undefined): Path to the server's CA certificate used to validate the connection (opportunistic encryption isn't supported)
 - `DB_POSTGRESDB_SSL_CERT` (default: undefined): Path to the client's TLS certificate
 - `DB_POSTGRESDB_SSL_KEY` (default: undefined): Path to the client's private key corresponding to the certificate
 - `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` (default: true): If TLS connections that fail validation should be rejected

```bash
export DB_TYPE=postgresdb
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_HOST=postgresdb
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_USER=n8n
export DB_POSTGRESDB_PASSWORD=n8n
export DB_POSTGRESDB_SCHEMA=n8n

# optional:
export DB_POSTGRESDB_SSL_CA=$(pwd)/ca.crt
export DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false

n8n start
```

### Required permissions

n8n needs to create and modify the schemas of the tables it uses.

Recommended permissions:

```sql
CREATE DATABASE n8n-db;
CREATE USER n8n-user WITH PASSWORD 'random-password';
GRANT ALL PRIVILEGES ON DATABASE n8n-db TO n8n-user;
```

### TLS

You can choose between these configurations:

- Not declaring (default): Connect with `SSL=off`
- Declaring only the CA and unauthorized flag: Connect with `SSL=on` and verify the server's signature
- Declaring `_{CERT,KEY}` and the above: Use the certificate and key for client TLS authentication

## SQLite

This is the default database that gets used if nothing is defined.

The database file is located at:
`~/.n8n/database.sqlite`


# hosting/configuration/task-runners.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Task runners
description: How to configure task runners to execute tasks using internal or external runner processes.
contentType: howto
---

# Task runners

Task runners are a generic mechanism to execute tasks in a secure and performant way. They're used to execute user-provided JavaScript code in the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

This document describes how task runners work and how you can configure them.

## How it works

The task runner feature consists of three components: a task runner, a task broker, and a task requester.

![Task runner overview](/_images/hosting/configuration/task-runner-concept.png)

Task runners connect to the task broker using a websocket connection. A task requester submits a task request to the broker where an available task runner can pick it up for execution.

The runner executes the task and submits the results to the task requester. The task broker coordinates communication between the runner and the requester.

The n8n instance (main and worker) acts as the broker. The Code node in this case is the task requester.

## Task runner modes

You can use task runners in two different modes: internal and external.

### Internal mode

In internal mode, the n8n instance launches the task runner as a child process. The n8n process monitors and manages the life cycle of the task runner. The task runner process shares the same `uid` and `gid` as n8n.

### External mode

In external mode, an external orchestrator (for example, Kubernetes) launches the task runner instead of n8n. Typically, this means you would configure the task runner to run as a side-car container next to n8n.

![Task runner deployed as a side-car container](/_images/hosting/configuration/task-runner-external-mode.png)

In this mode, the orchestrator monitors and manages the life cycle of the task runner container. The task runner is fully isolated from the n8n instance.

When using the [Queue mode](/hosting/scaling/queue-mode.md), each n8n container (main and workers) needs to have its own task runner.

## Setting up external mode

Use the following details to configure task runners in external mode

### Configuring n8n instance in external mode

You can configure n8n to use external task runners by setting the following environment variables:

| Environment variables                                  | Description                                                |
|--------------------------------------------------------|------------------------------------------------------------|
| `N8N_RUNNERS_ENABLED=true`                             | Enables task runners.                                      |
| `N8N_RUNNERS_MODE=external`                            | Use task runners in external mode.                         |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | A shared secret task runners use to connect to the broker. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS=0.0.0.0` | By default, the task broker only listens to localhost. When using multiple containers (for example, with Docker Compose), it needs to be able to accept external connections. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).

### Configuring task runners in external mode

The task runner comes bundled within the n8n Docker image. The Docker image also includes the task runner launcher.

The launcher can start the runner on-demand, which means lower memory usage when there's no work needed, but a short delay (few hundred ms) in cold-start. The launcher also monitors the runner and restarts it in case of infinite loops or other issues.

Run a task runner container from the n8n Docker image by setting the following properties:

| Configuration   | Description                                             |
|-----------------|---------------------------------------------------------|
| `command`       | `["/usr/local/bin/task-runner-launcher", "javascript"]` |
| `livenessProbe` | `GET /healthz`, port `5680`                             |

Set the following environment variables for the container, adjusted to fit your needs:

| Environment variables | Description |
| ------ | ----- |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | The shared secret the task runner uses to connect to the broker. |
| `N8N_RUNNERS_MAX_CONCURRENCY=5` | The number of concurrent tasks the runner can execute. |
| `N8N_RUNNERS_TASK_BROKER_URI=localhost:5679` | The address of the task broker server within the n8n instance. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT=15` | Number of seconds of inactivity to wait before shutting down the task runner process. The launcher will automatically start the runner again when there are new tasks to execute. Set to `0` to disable automatic shutdown. |
| `NODE_OPTIONS=--max-old-space-size=<limit>` | The memory limit for the task runner Node.js process. This should be lower than the limit for container so that the runner runs out of memory before the container. That way, the launcher is able to monitor the runner. |
| `GENERIC_TIMEZONE` | The [same default timezone as configured for the n8n instance](/hosting/configuration/environment-variables/timezone-localization.md). |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).


# hosting/configuration/user-management-self-hosted.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Configure self-hosted n8n for user management
contentType: howto
---

# Configure self-hosted n8n for user management

User management in n8n allows you to invite people to work in your n8n instance. 

This document describes how to configure your n8n instance to support user management, and the steps to start inviting users.

Refer to the main [User management](/user-management/index.md) guide for more information about usage, including:

* [Managing users](/user-management/manage-users.md)
* [Account types](/user-management/account-types.md)
* [Best practices](/user-management/best-practices.md)

For LDAP setup information, refer to [LDAP](/user-management/ldap.md).

For SAML setup information, refer to [SAML](/user-management/saml/index.md).

/// note | Basic auth and JWT removed
n8n removed support for basic auth and JWT in version 1.0.
///
## Setup

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
2. Start n8n and follow the setup steps in the app.
3. Invite users.

### Step one: SMTP

n8n recommends setting up an SMTP server, for user invites and password resets. 

/// note | Optional from 0.210.1
From version 0.210.1 onward, this step is optional. You can choose to manually copy and send invite links instead of setting up SMTP. Note that if you skip this step, users can't reset passwords.
///
Get the following information from your SMTP provider:

* Server name
* SMTP username
* SMTP password
* SMTP sender name

To set up SMTP with n8n, configure the SMTP environment variables for your n8n instance. For information on how to set environment variables, refer to [Configuration](/hosting/configuration/configuration-methods.md)
<!-- vale off -->
| Variable | Type | Description | Required? |
| -------- | ---- | ----------- | --------- |
| `N8N_EMAIL_MODE` | string | `smtp` | Required |
| `N8N_SMTP_HOST` | string | _your_SMTP_server_name_ | Required |
| `N8N_SMTP_PORT` | number | _your_SMTP_server_port_ Default is `465`.| Optional |
| `N8N_SMTP_USER` | string | _your_SMTP_username_ | Optional |
| `N8N_SMTP_PASS` | string | _your_SMTP_password_ | Optional |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | string | _your_OAuth_service_client_ | Optional |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | string | _your_OAuth_private_key_ | Optional |
| `N8N_SMTP_SENDER` | string | Sender email address. You can optionally include the sender name. Example with name: _N8N `<contact@n8n.com>`_ | Required |
| `N8N_SMTP_SSL` | boolean | Whether to use SSL for SMTP (true) or not (false). Defaults to `true`. | Optional | 
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | string | Full path to your HTML email template. This overrides the default template for invite emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | string | Full path to your HTML email template. This overrides the default template for password reset emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |

<!-- vale on-->
If your n8n instance is already running, you need to restart it to enable the new SMTP settings.

/// note | More configuration options
There are more configuration options available as environment variables. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for a list. These include options to disable tags, workflow templates, and the personalization survey, if you don't want your users to see them.
///

/// note | New to SMTP?
If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.
///

### Step two: In-app setup

--8<-- "_snippets/user-management/in-app-setup.md"

### Step three: Invite users

--8<-- "_snippets/user-management/invite-users.md"


# hosting/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Hosting Documentation and Guides
description: Access n8n hosting documentation and guides. Find comprehensive resources to help you set up and manage your self-hosted n8n instances.
contentType: overview
hide:
  - toc
---

# Self-hosting n8n

This section provides guidance on setting up n8n for both the Enterprise and Community self-hosted editions. The Community edition is free, the Enterprise edition isn't. 

See [Community edition features](/hosting/community-edition-features.md) for a list of available features. 

<div class="grid-cards-vertical cards" markdown>

- __Installation and server setups__

	Install n8n on any platform using npm or Docker. Or follow our guides to popular hosting platforms.

	[:octicons-arrow-right-24: Docker installation guide](/hosting/installation/docker.md)

- __Configuration__

	Learn how to configure n8n with environment variables.

	[:octicons-arrow-right-24: Environment Variables](/hosting/configuration/environment-variables/index.md)

- __Users and authentication__

	Choose and set up user authentication for your n8n instance.

	[:octicons-arrow-right-24: Authentication](/hosting/configuration/user-management-self-hosted.md)

- __Scaling__

	Manage data, modes, and processes to keep n8n running smoothly at scale.

	[:octicons-arrow-right-24: Scaling](/hosting/scaling/queue-mode.md)

- __Securing n8n__

	Secure your n8n instance by setting up SSL, SSO, or 2FA or blocking or opting out of some data collection or features.

	[:octicons-arrow-right-24: Securing n8n guide](/hosting/securing/overview.md)

- __Starter kits__

	New to n8n or AI? Try our Self-hosted AI Starter Kit. Curated by n8n, it combines the self-hosted n8n platform with compatible AI products and components to get you started building self-hosted AI workflows.

	[:octicons-arrow-right-24: Starter kits](/hosting/starter-kits/ai-starter-kit.md)

</div>

--8<-- "_snippets/self-hosting/warning.md"


# hosting/installation/docker.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Docker Installation

[Docker](https://www.docker.com/){:target=_blank .external-link} offers the following advantages:

* Installs n8n in a clean environment.
* Easier setup for your preferred database.
* Can avoid issues due to different operating systems, as Docker provides a consistent system.
* Can avoid compatibility issues due to differences in operating systems and tools.
* Makes migrating to new hosts or environments more straightforward.

You can also use n8n in Docker with [Docker Compose](/hosting/installation/server-setups/docker-compose.md). You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

--8<-- "_snippets/self-hosting/warning.md"

## Prerequisites

Before proceeding, install [Docker Desktop](https://docs.docker.com/get-docker/){:target=_blank .external-link}.

/// note | Linux Users
Docker Desktop is available for Mac and Windows. Linux users must install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) individually for your distribution.
///

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Starting n8n

From your terminal, run:

```sh
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

This command creates a volume to store persistent data, downloads the required n8n image, and starts your container, exposed on port `5678`. To save your work between container restarts, it also mounts a docker volume, `n8n_data`, to persist your data locally.

Once running, you can access n8n by opening:
[http://localhost:5678](http://localhost:5678)

## Using with PostgreSQL

By default, n8n uses SQLite to save [credentials](/glossary.md#credential-n8n), past executions, and workflows. n8n also supports PostgreSQL, configurable using environment variables as detailed below.

When using PostgreSQL, it's still important to persist the data stored in the `/home/node/.n8n` folder. This includes n8n user data and, even more importantly, the encryption key for credentials. It's also the name of the webhook when using the [n8n tunnel](#n8n-with-tunnel).

If n8n can't find the `/home/node/.n8n` directory on startup, it automatically creates one. In this case, all existing credentials that n8n saved with a different encryption key will no longer work.

/// note | Keep in mind
While persisting the `/home/node/.n8n` directory with PostgreSQL is the recommended best practice, it's not explicitly required. You can provide the encryption key by passing the [`N8N_ENCRYPTION_KEY` environment variable](/hosting/configuration/environment-variables/deployment.md) when starting your Docker container.
///

To use n8n with PostgreSQL, execute the following commands, replacing the placeholders (depicted within angled brackets, for example `<POSTGRES_USER>`) with your actual values:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

You can find a complete `docker-compose` file for PostgreSQL in the [n8n hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/docker-compose/withPostgres).

## Setting timezone

To define the timezone n8n should use, you can set the [`GENERIC_TIMEZONE` environment variable](/hosting/configuration/environment-variables/timezone-localization.md). Schedule-oriented nodes, like the [Schedule Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) use this to determine the correct timezone.

You can set the system timezone, which controls what some scripts and commands like `date` return, using the `TZ` environment variable.

This example sets the same timezone for both variables:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Europe/Berlin" \
 -e TZ="Europe/Berlin" \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

## Updating

To update n8n, in Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

![Docker Desktop](/_images/hosting/installation/docker/docker_desktop.png)

You can also use the command line to pull the latest, or a specific version:

```sh
# Pull latest (stable) version
docker pull docker.n8n.io/n8nio/n8n

# Pull specific version
docker pull docker.n8n.io/n8nio/n8n:1.81.0

# Pull next (unstable) version
docker pull docker.n8n.io/n8nio/n8n:next
```

After pulling the updated image, stop your n8n container and start it again. You can also use the command line. Replace `<container_id>` in the commands below with the container ID you find in the first command:

```sh
# Find your container ID
docker ps -a

# Stop the container with the `<container_id>`
docker stop <container_id>

# Remove the container with the `<container_id>`
docker rm <container_id>

# Start the container
docker run --name=<container_name> [options] -d docker.n8n.io/n8nio/n8n
```

### Updating Docker Compose

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Further reading

You can find more information about Docker setup in the README file for the [Docker image](https://github.com/n8n-io/n8n/tree/master/docker/images/n8n).

--8<-- "_snippets/self-hosting/installation/tunnel.md"

Start n8n with `--tunnel` by running:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n \
 start --tunnel
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/npm.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# npm

npm is a quick way to get started with n8n on your local machine. You must have [Node.js](https://nodejs.org/en/){:target=_blank .external-link} installed. n8n requires Node.js 18 or above.

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Try n8n with npx

You can try n8n without installing it using npx.

From the terminal, run:

```bash
npx n8n
```

This command will download everything that's needed to start n8n. You can then access n8n and start building workflows by opening [http://localhost:5678](http://localhost:5678){:target=_blank .external-link}.

## Install globally with npm

To install n8n globally, use npm:

```bash
npm install n8n -g
```

To install or update to a specific version of n8n use the `@` syntax to specify the version. For example:

```bash
npm install -g n8n@0.126.1
```

To install `next`:

```bash
npm install -g n8n@next
```

After the installation, start n8n by running:

```bash
n8n
# or
n8n start
```


### Next steps

Try out n8n using the [Quickstarts](/try-it-out/index.md).

## Updating

To update your n8n instance to the `latest` version, run:

```bash
npm update -g n8n
```

To install the `next` version:

```bash
npm install -g n8n@next
```

--8<-- "_snippets/self-hosting/installation/tunnel.md"

Start n8n with `--tunnel` by running:

```bash
n8n start --tunnel
```

## Reverting an upgrade

Install the older version that you want to go back to.

If the upgrade involved a database migration:

1. Check the feature documentation and release notes to see if there are any manual changes you need to make.
1. Run `n8n db:revert` on your current version to roll back the database. If you want to revert more than one database migration, you need to repeat this process.

## Windows troubleshooting

If you are experiencing issues running n8n on Windows, make sure your Node.js environment is correctly set up. Follow Microsoft's guide to [Install NodeJS on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows){:target=_blank .external-link}.


# hosting/installation/server-setups/aws.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Amazon Web Services

This hosting guide shows you how to self-host n8n with Amazon Web Services (AWS). It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Hosting options

AWS offers several ways suitable for hosting n8n, including EC2 (virtual machines), and EKS (containers running with Kubernetes).

This guide uses [EKS](https://aws.amazon.com/eks/){:target=_blank .external-link} as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

## Prerequisites

The steps in this guide use a mix of the AWS UI and [the eksctl CLI tool for EKS](https://eksctl.io){:target=_blank .external-link}.

While not mentioned in the documentation for eksctl, you also need to [install the AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){:target=_blank .external-link}, and [configure authentication of the tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html){:target=_blank .external-link}.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a cluster

Use the eksctl tool to create a cluster specifying a name and a region with the following command:

```shell
eksctl create cluster --name n8n --region <your-aws-region>
```

This can take a while to create the cluster.


Once the cluster is created, eksctl automatically sets the kubectl context to the cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/aws){:target=_blank .external-link}. The following steps tell you what each file does, and what settings you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git -b aws
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-kubernetes-hosting
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default AWS storage class, [gp2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/general-purpose.html#EBSVolumeTypes_gp2){:target=_blank .external-link}, is suitable for this purpose. This is defined in the `postgres-claaim0-persistentvolumeclaim.yaml` manifest.

```yaml
…
spec:
  storageClassName: gp2
  accessModes:
    - ReadWriteOnce
…
```

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes helps maintain files uploaded while using n8n and if you want to persist [manual n8n encryption keys](/hosting/configuration/environment-variables/deployment.md) between restarts, which saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Pod resources

[Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/){:target=_blank .external-link} lets you specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

```yaml
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…    
```

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

--8<-- "_snippets/self-hosting/installation/suggested-pod-resources.md"

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## Deployments

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively by default.

## Send to Kubernetes cluster

Send all the manifests to the cluster by running the following command in the `n8n-kubernetes-hosting` directory:

```shell
kubectl apply -f .
```

/// note | Namespace error
You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

```shell
kubectl apply -f namespace.yaml
```
///


## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static address of the instance.

To find the address of the n8n service running on the instance:

1. Open the **Clusters** section of the **Amazon Elastic Kubernetes Service** page in the AWS console.
2. Select the name of the cluster to open its configuration page.
3. Select the **Resources** tab, then **Service and networking** > **Services**.
4. Select the **n8n** service and copy the **Load balancer URLs** value. Use this value suffixed with the n8n service port (5678) for DNS.

/// note | Use HTTP
This guide uses HTTP connections for the services it defines, for example in `n8n-deployment.yaml`. However, if you click the **Load balancer URLs** value, EKS takes you to an "HTTPS" URL which results in an error. To solve this, when you open the n8n subdomain, make sure to use HTTP.
///
## Delete resources

If you need to delete the setup, you can remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/azure.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Azure

This hosting guide shows you how to self-host n8n on Azure. It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Prerequisites

You need [The Azure command line tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli){:target="_blank" .external-link}

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Hosting options

Azure offers several ways suitable for hosting n8n, including Azure Container Instances (optimized for running containers), Linux Virtual Machines, and Azure Kubernetes Service (containers running with Kubernetes).

This guide uses the Azure Kubernetes Service (AKS) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

The steps in this guide use a mix of the Azure UI and command line tool, but you can use either to accomplish most tasks.

## Open the Azure Kubernetes Service

From [the Azure portal](https://portal.azure.com/){:target="_blank" .external-link} select **Kubernetes services**.

## Create a cluster

From the Kubernetes services page, select **Create** > **Create a Kubernetes cluster**.

You can select any of the configuration options that suit your needs, then select **Create** when done.

## Set Kubectl context

The remainder of the steps in this guide require you to set the Azure instance as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and then the **Connect** button. The resulting code snippets shows the steps to paste and run into a terminal to change your local Kubernetes settings to use the new cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/azure){:target=_blank .external-link}. The following steps tell you which file configures what and what you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git -b azure
```

And change directory to the root of the repository you cloned:

```shell
cd azure
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default storage class is suitable for this purpose and is defined in the `postgres-claim0-persistentvolumeclaim.yaml` manifest.

/// note | Specialized storage classes
If you have specialised or higher requirements for storage classes, [read more on the options Azure offers in the documentation](https://learn.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes){:target="_blank" .external-link}.
///
### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with your own values. Postgres will use these details when creating the database..

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes is required for:

* Using nodes that interact with files, such as the binary data node.
* If you want to persist [manual n8n encryption keys](/hosting/configuration/environment-variables/deployment.md) between restarts. This saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Pod resources

[Kubernetes lets you](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/){:target="_blank" .external-link} optionally specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

```yaml
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…    
```

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

--8<-- "_snippets/self-hosting/installation/suggested-pod-resources.md"

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## Deployments

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits with the `resources` object
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

```shell
kubectl apply -f .
```

/// note | Namespace error
You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

```shell
kubectl apply -f namespace.yaml
```
///


## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service from the **Services & ingresses** menu item of the cluster you want to use under the **External IP** column. You need to add the n8n port, "5678" to the URL.

/// note | Static IP addresses with AKS
[Read this tutorial](https://learn.microsoft.com/en-us/azure/aks/static-ip){:target="_blank" .external-link} for more details on how to use a static IP address with AKS.
///
## Delete resources

Remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/digital-ocean.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on DigitalOcean

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses:

* [Caddy](https://caddyserver.com){:target="_blank" .external-link} (a reverse proxy) to allow access to the Droplet from the internet. Caddy will also automatically create and manage SSL / TLS certificates for your n8n instance.
* [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a Droplet

1. [Log in](https://cloud.digitalocean.com/login){:target=_blank .external-link} to DigitalOcean. 
2. Select the project to host the Droplet, or [create a new project](https://docs.digitalocean.com/products/projects/how-to/create/){:target=_blank .external-link}.
3. In your project, select **Droplets** from the **Manage** menu. 
4. [Create a new Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/){:target=_blank .external-link} using the [Docker image](https://marketplace.digitalocean.com/apps/docker){:target="_blank" .external-link} available on the **Marketplace** tab.

/// note | Droplet resources
When creating the Droplet, DigitalOcean asks you to choose a plan. For most usage levels, a basic shared CPU plan is enough.
///
/// note | SSH key or Password
DigitalOcean lets you choose between SSH key and password-based authentication. SSH keys are considered more secure.
///
## Log in to your Droplet and create new user

The rest of this guide requires you to log in to the Droplet using a terminal with SSH. Refer to [How to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/){:target="_blank" .external-link} for more information.

You should create a new user, to avoid working as the root user:

1. Log in as root.
2. Create a new user:
	```shell
	adduser <username>
	```
3. Follow the prompts in the CLI to finish creating the user.
4. Grant the new user administrative privileges:
	```shell
	usermod -aG sudo <username>
	```
	You can now run commands with superuser privileges by using `sudo` before the command.
5. Follow the steps to set up SSH for the new user: [Add Public Key Authentication](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04#step-four-add-public-key-authentication-recommended){:target=_blank .external-link}.
5. Log out of the droplet.
6. Log in using SSH as the new user.

## Clone configuration repository

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-docker-caddy){:target=_blank .external-link} into the home folder of the logged-in user on your Droplet. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-docker-caddy.git
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-docker-caddy
```

## Default folders and files

The host operating system (the DigitalOcean Droplet) copies the two folders you created to Docker containers to make them available to Docker. The two folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `local_files`: A folder for files you upload or add using n8n.

### Create Docker volumes

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/){:target="_blank" .external-link} that Docker reuses between restarts:

```shell
sudo docker volume create caddy_data
```

Create a Docker volume for the n8n data:

```shell
sudo docker volume create n8n_data
```

## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the Droplet. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts){:target="_blank" .external-link}.

## Open ports

n8n runs as a web application, so the Droplet needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the Droplet's firewall by running the following two commands:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

## Configure n8n

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

```shell
nano .env
```

The file contains inline comments to help you know what to change.

Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## The Docker Compose file

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

```shell
nano docker-compose.yml
```

## Configure Caddy

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Edit the `Caddyfile` file in the `caddy_config` folder.

```shell
nano caddy_config/Caddyfile
```

Change the placeholder domain to yours. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

```text
n8n.<domain>.<suffix> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

If you were to use `automate.example.com`, your `Caddyfile` may look something like:

```text
automate.example.com {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

## Start Docker Compose

Start n8n and Caddy with the following command:

```shell
sudo docker compose up -d
```

This may take a few minutes.

## Test your setup

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy

You can stop n8n and Caddy with the following command:

```shell
sudo docker compose stop
```
## Updating

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/docker-compose.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
description: Install and run n8n using Docker Compose
---

# Docker-Compose

If you have already installed Docker and Docker-Compose, then you can start with [step 3](#3-dns-setup).

You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## 1. Install Docker and Docker Compose

How you install Docker and Docker Compose can vary depending on the Linux distribution you use. You can find detailed instructions in both the [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installation documentation. The following example is for Ubuntu:

```bash
# Remove incompatible or out of date Docker implementations if they exist
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Install prereq packages
sudo apt-get update
sudo apt-get install ca-certificates curl
# Download the repo signing key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
# Configure the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update and install Docker and Docker Compose
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify that Docker and Docker Compose are available by typing:

```bash
docker --version
docker compose version
```

## 2. Optional: Non-root user access

You can optionally grant access to run Docker without the `sudo` command.

To grant access to the user that you're currently logged in with (assuming they have `sudo` access), run:

```bash
sudo usermod -aG docker ${USER}
# Register the `docker` group memebership with current session without changing your primary group
exec sg docker newgrp
```

To grant access to a different user, type the following, substituting `<USER_TO_RUN_DOCKER>` with the appropriate username:

```bash
sudo usermod -aG docker <USER_TO_RUN_DOCKER>
```

You will need to run `exec sg docker newgrp` from any of that user's existing sessions for it to access the new group permissions.

You can verify that your current session recognizes the `docker` group by typing:

```bash
groups
```

## 3. DNS setup

To host n8n online or on a network, create a dedicated subdomain pointed at your server.

Add an A record to route the subdomain accordingly:

* **Type**: A
* **Name**: `n8n` (or the desired subdomain)
* **IP address**: (your server's IP address)

## 4. Create an `.env` file

Create a project directory to store your n8n environment configuration and Docker Compose files and navigate inside:

```bash
mkdir n8n-compose
cd n8n-compose
```

Inside the `n8n-compose` directory, create an `.env` file to customize your n8n instance's details. Change it to match your own information:

```bash title=".env file"
# DOMAIN_NAME and SUBDOMAIN together determine where n8n will be reachable from
# The top level domain to serve from
DOMAIN_NAME=example.com

# The subdomain to serve from
SUBDOMAIN=n8n

# The above example serve n8n at: https://n8n.example.com

# Optional timezone to set which gets used by Cron and other scheduling nodes
# New York is the default value if not set
GENERIC_TIMEZONE=Europe/Berlin

# The email address to use for the TLS/SSL certificate creation
SSL_EMAIL=user@example.com
```

## 5. Create local files directory

Inside your project directory, create a directory called `local-files` for sharing files between the n8n instance and the host system (for example, using the [Read/Write Files from Disk node](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md)):

```bash
mkdir local-files
```

The Docker Compose file below can automatically create this directory, but doing it manually ensures that it's created with the right ownership and permissions.

## 6. Create Docker Compose file

Create a `compose.yaml` file. Paste the following in the file:

```yaml title="compose.yaml file"
services:
  traefik:
    image: "traefik"
    restart: always
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "127.0.0.1:5678:5678"
    labels:
      - traefik.enable=true
      - traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.n8n.tls=true
      - traefik.http.routers.n8n.entrypoints=web,websecure
      - traefik.http.routers.n8n.tls.certresolver=mytlschallenge
      - traefik.http.middlewares.n8n.headers.SSLRedirect=true
      - traefik.http.middlewares.n8n.headers.STSSeconds=315360000
      - traefik.http.middlewares.n8n.headers.browserXSSFilter=true
      - traefik.http.middlewares.n8n.headers.contentTypeNosniff=true
      - traefik.http.middlewares.n8n.headers.forceSTSHeader=true
      - traefik.http.middlewares.n8n.headers.SSLHost=${DOMAIN_NAME}
      - traefik.http.middlewares.n8n.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.n8n.headers.STSPreload=true
      - traefik.http.routers.n8n.middlewares=n8n@docker
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./local-files:/files

volumes:
  n8n_data:
  traefik_data:
```

The above Docker Compose file configures two containers: one for n8n, and one to run [traefik](https://github.com/traefik/traefik), an application proxy to manage TLS/SSL certificates and handle routing.

It also creates and mounts two [Docker Volumes](https://docs.docker.com/engine/storage/volumes/) and mounts the `local-files` directory you created earlier:

   | Name            | Type                                                        | Container mount   | Description                                                                                                                         |
   |-----------------|-------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|
   | `n8n_data`      | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/home/node/.n8n` | Where n8n saves its SQLite database file and encryption key.                                                                        |
   | `traefik_data`  | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/letsencrypt`    | Where traefik saves the TLS/SSL certificate data.                                                                                   |
   | `./local-files` | [Bind](https://docs.docker.com/engine/storage/bind-mounts/) | `/files`          | A local directory shared between the n8n instance and host. In n8n, use the `/files` path to read from and write to this directory. |

## 7. Start Docker Compose

You can now start n8n by typing:

```bash
sudo docker compose up -d
```

To stop the container, type:

```bash
sudo docker compose stop
```

## 8. Done

You can now reach n8n using the subdomain + domain combination you defined in your `.env` file configuration. The above example would result in `https://n8n.example.com`.

n8n is only accessible using secure HTTPS, not over plain HTTP.

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/google-cloud.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Google Cloud

This hosting guide shows you how to self-host n8n on Google Cloud (GCP). It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Prerequisites

- The [gcloud command line tool](https://cloud.google.com/sdk/gcloud/){:target="_blank" .external-link}
- The [gke-gcloud-auth-plugin](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke){:target="_blank" .external-link} (install the gcloud CLI first)

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Hosting options

Google Cloud offers several options suitable for hosting n8n, including Cloud Run (optimized for running containers), Compute Engine (VMs), and Kubernetes Engine (containers running with Kubernetes).

This guide uses the Google Kubernetes Engine (GKE) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

Most of the steps in this guide use the Google Cloud UI, but you can also use the [gcloud command line tool](https://cloud.google.com/sdk/gcloud/){:target="_blank" .external-link} instead to undertake all the steps.

## Create project

GCP encourages you to create projects to logically organize resources and configuration. Create a new project for your n8n deployment from your Google Cloud Console: select the project dropdown menu and then the **NEW PROJECT** button. Then select the newly created project. As you follow the other steps in this guide, make sure you have the correct project selected.

## Enable the Kubernetes Engine API

GKE isn't enabled by default. Search for "Kubernetes" in the top search bar and select "Kubernetes Engine" from the results.

Select **ENABLE** to enable the Kubernetes Engine API for this project.

## Create a cluster

From the [GKE service page](https://console.cloud.google.com/kubernetes/list/overview){:target=_blank .external-link}, select **Clusters** > **CREATE**. Make sure you select the "Standard" cluster option, n8n doesn't work with an "Autopilot" cluster. You can leave the cluster configuration on defaults unless there's anything specifically you need to change, such as location.

## Set Kubectl context

The rest of the steps in this guide require you to set the GCP instance as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and selecting **CONNECT**. The displayed code snippet shows a connection string for the gcloud CLI tool. Paste and run the code snippet in the gcloud CLI to change your local Kubernetes settings to use the new gcloud cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/gcp){:target=_blank .external-link} locally. The following steps explain the file configuration and how to add your information.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git -b gcp
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-kubernetes-hosting
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Create a volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. Running Postgres on GCP requires a specific Kubernetes Storage Class. You can read [this guide](https://cloud.google.com/architecture/deploying-highly-available-postgresql-with-gke){:target="_blank" .external-link} for specifics, but the `storage.yaml` manifest creates it for you. You may want to change the regions to create the storage in under the `allowedTopologies` > `matchedLabelExpressions` > `values` key. By default, they're set to `us-central`.

```yaml
…
allowedTopologies:
  - matchLabelExpressions:
      - key: failure-domain.beta.kubernetes.io/zone
        values:
          - us-central1-b
          - us-central1-c
```

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with your own values. Postgres will use these details when creating the database..

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes is required for:

* Using nodes that interact with files, such as the binary data node.
* If you want to persist [manual n8n encryption keys](/hosting/configuration/environment-variables/deployment.md) between restarts. This saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Pod resources

[Kubernetes lets you](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) optionally specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` and `postgres-deployment.yaml` files:

```yaml
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…    
```

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

--8<-- "_snippets/self-hosting/installation/suggested-pod-resources.md"

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## Deployments

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits with the `resources` object
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

```shell
kubectl apply -f .
```

/// note | Namespace error
You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

```shell
kubectl apply -f namespace.yaml
```
///


## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service from the **Services & Ingress** menu item of the cluster you want to use under the **Endpoints** column.

/// note | GKE and IP addresses
[Read this GKE tutorial](https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip#configuring_your_domain_name_records){:target="_blank" .external-link} for more details on how reserved IP addresses work with GKE and Kubernetes resources.
///
## Delete resources

Remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/heroku.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Heroku

This hosting guide shows you how to self-host n8n on Heroku. It uses:


- [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.
- [Heroku's PostgreSQL service](https://devcenter.heroku.com/categories/heroku-postgres){:target="_blank" .external-link} to host n8n's data storage.
- A **Deploy to Heroku** button offering a one click, with minor configuration, deployment.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"


## Use the deployment template to create a Heroku project

The quickest way to get started with deploying n8n to Heroku is using the **Deploy to Heroku** button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/n8n-io/n8n-heroku/tree/main)

This opens the **Create New App** page on Heroku. Set a name for the project, and choose the region to deploy the project to.

### Configure environment variables

Heroku pre-fills the configuration options defined in the `env` section of the `app.json` file, which also sets default values for the environment variables n8n uses.

You can change any of these values to suit your needs. You must change the following values:

- **N8N_ENCRYPTION_KEY**, which n8n uses to [encrypt user account details](/hosting/configuration/environment-variables/deployment.md) before saving to the database.
- **WEBHOOK_URL** should match the application name you create to ensure that webhooks have the correct URL.

### Deploy n8n

Select **Deploy app**.

After Heroku builds and deploys the app it provides links to **Manage App** or **View** the application.

/// note | Heroku and DNS
Refer to the [Heroku documentation](https://devcenter.heroku.com/categories/networking-dns){:target="_blank" .external-link} to find out how to connect your domain to a Heroku application.
///
## Changing the deployment template

You can make changes to the deployment template by forking the [repository](https://github.com/n8n-io/n8n-heroku){:target=_blank .external-link} and deploying from you fork.

### The Dockerfile

By default the Dockerfile pulls the latest n8n image, if you want to use a different or fixed version, then update the image tag on the top line of the `Dockerfile`.

### Heroku and exposing ports

Heroku doesn't allow Docker-based applications to define an exposed port with the `EXPOSE` command. Instead, Heroku provides a `PORT` environment variable that it dynamically populates at application runtime. The `entrypoint.sh` file overrides the default Docker image command to instead set the port variable that Heroku provides. You can then access n8n on port 80 in a web browser.

/// note | Docker limitations with Heroku
[Read this guide](https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands){:target="_blank" .external-link} for more details on the limitations of using Docker with Heroku.
///
### Configuring Heroku

The `heroku.yml` file defines the application you want to create on Heroku. It consists of two sections:

* `setup` > `addons` defines the Heroku addons to use. In this case, the PostgreSQL database addon.
* The `build` section defines how Heroku builds the application. In this case it uses the Docker buildpack to build a `web` service based on the supplied `Dockerfile`.

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/hetzner.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Hetzner cloud

This hosting guide shows you how to self-host n8n on a Hetzner cloud server. It uses:

* [Caddy](https://caddyserver.com){:target="_blank" .external-link} (a reverse proxy) to allow access to the Server from the internet.
* [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a server

1. [Log in](https://console.hetzner.cloud/){:target=_blank .external-link} to the Hetzner Cloud Console.
2. Select the project to host the server, or create a new project by selecting **+ NEW PROJECT**.
3. Select **+ CREATE SERVER** on the project tile you want to add it to.

You can change most of the settings to suit your needs, but as this guide uses Docker to run the application, under the **Image** section, select "Docker CE" from the **APPS** tab.

/// note | Type
When creating the server, Hetzner asks you to choose a plan. For most usage levels, the CPX11 type is enough.
///
/// note | SSH keys
Hetzner lets you choose between SSH and password-based authentication. SSH is more secure. The rest of this guide assumes you are using SSH.
///
## Log in to your server

The rest of this guide requires you to log in to the server using a terminal with SSH. Refer to [Access with SSH/rsync/BorgBackup](https://docs.hetzner.com/robot/storage-box/access/access-ssh-rsync-borg){:target="_blank" .external-link} for more information. You can find the public IP in the listing of the servers in your project.

## Install Docker Compose

The Hetzner Docker app image doesn't have Docker compose installed. Install it with the following commands:

```shell
apt update && apt -y upgrade
apt install docker-compose-plugin
```

## Clone configuration repository

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-docker-caddy){:target=_blank .external-link} into the root user folder of the server. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-docker-caddy.git
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-docker-caddy
```

## Default folders and files

The host operating system (the server) copies the two folders you created to Docker containers to make them available to Docker. The two folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `local_files`: A folder for files you upload or add using n8n.

### Create Docker volume

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/){:target="_blank" .external-link} that Docker reuses between restarts:

```shell
docker volume create caddy_data
```

Create a Docker volume for the n8n data:

```shell
sudo docker volume create n8n_data
```

## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the server. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts){:target="_blank" .external-link}.

## Open ports

n8n runs as a web application, so the server needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the server's firewall by running the following two commands:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

## Configure n8n

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

```shell
nano .env
```

The file contains inline comments to help you know what to change.

Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## The Docker Compose file

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

```shell
nano docker-compose.yml
```

## Configure Caddy

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Edit the `Caddyfile` file in the `caddy_config` folder.

```shell
nano caddy_config/Caddyfile
```

Change the placeholder subdomain to yours. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

```text
n8n.<domain>.<suffix> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

## Start Docker Compose

Start n8n and Caddy with the following command:

```shell
docker compose up -d
```

This may take a few minutes.

## Test your setup

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy

You can stop n8n and Caddy with the following command:

```shell
sudo docker compose stop
```

## Updating

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"


# hosting/installation/server-setups/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Server setups

Self-host with Docker Compose:

* [Digital Ocean](/hosting/installation/server-setups/digital-ocean.md)
* [Heroku](/hosting/installation/server-setups/heroku.md)
* [Hetzner Cloud](/hosting/installation/server-setups/hetzner.md)

Starting points for a Kubernetes setup:

* [AWS](/hosting/installation/server-setups/aws.md)
* [Azure](/hosting/installation/server-setups/azure.md)
* [Google Cloud Platform](/hosting/installation/server-setups/google-cloud.md)

Configuration guides to help you get started on other platforms:

* [Docker Compose](/hosting/installation/server-setups/docker-compose.md)


# hosting/installation/updating.md

---
# https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Best practices for updating your self-hosted n8n
title: Update self-hosted n8n
contentType: explanation
tags:
  - update npm
  - update docker
hide:
  - tags
---

# Update self-hosted n8n

It's important to keep your n8n version up to date. This ensures you get the latest features and fixes.

Some tips when updating:

--8<-- "_snippets/manage-cloud/updating-best-practices.md"

For instructions on how to update, refer to the documentation for your installation method:

* [Installed with npm](/hosting/installation/npm.md)
* [Installed with Docker](/hosting/installation/docker.md)


# hosting/logging-monitoring/logging.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Logging in n8n

Logging is an important feature for debugging. n8n uses the [winston](https://www.npmjs.com/package/winston){:target=_blank .external-link} logging library.

/// note | Log streaming
n8n Self-hosted Enterprise tier includes [Log streaming](/log-streaming.md), in addition to the logging options described in this document.
///
## Setup

To set up logging in n8n, you need to set the following environment variables (you can also set the values in the [configuration file](/hosting/configuration/environment-variables/index.md))

| Setting in the configuration file | Using environment variables | Description |
|-----------------------------------|-----------------------------|-------------|
| n8n.log.level | N8N_LOG_LEVEL | The log output level. The available options are (from lowest to highest level) are error, warn, info, and debug. The default value is `info`. You can learn more about these options [here](#log-levels). |
| n8n.log.output | N8N_LOG_OUTPUT | Where to output logs. The available options are `console` and `file`. Multiple values can be used separated by a comma (`,`). `console` is used by default. |
| n8n.log.file.location | N8N_LOG_FILE_LOCATION | The log file location, used only if log output is set to file. By default, `<n8nFolderPath>/logs/n8n.log` is used. |
| n8n.log.file.maxsize | N8N_LOG_FILE_SIZE_MAX | The maximum size (in MB) for each log file. By default, n8n uses 16 MB. |
| n8n.log.file.maxcount | N8N_LOG_FILE_COUNT_MAX | The maximum number of log files to keep. The default value is 100. This value should be set when using workers. |


```bash
# Set the logging level to 'debug'
export N8N_LOG_LEVEL=debug

# Set log output to both console and a log file
export N8N_LOG_OUTPUT=console,file

# Set a save location for the log file
export N8N_LOG_FILE_LOCATION=/home/jim/n8n/logs/n8n.log

# Set a 50 MB maximum size for each log file
export N8N_LOG_FILE_MAXSIZE=50

# Set 60 as the maximum number of log files to be kept
export N8N_LOG_FILE_MAXCOUNT=60
```

### Log levels

n8n uses standard log levels to report:

- `silent`: outputs nothing at all
- `error`: outputs only errors and nothing else
- `warn`: outputs errors and warning messages
- `info`: contains useful information about progress
- `debug`: the most verbose output. n8n outputs a lot of information to help you debug issues.


## Development

During development, adding log messages is a good practice. It assists in debugging errors. To configure logging for development, follow the guide below.

### Implementation details

n8n uses the `LoggerProxy` class, located in the `workflow` package. Calling the `LoggerProxy.init()` by passing in an instance of `Logger`, initializes the class before the usage.

The initialization process happens only once. The [`start.ts`](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/start.ts) file already does this process for you. If you are creating a new command from scratch, you need to initialize the `LoggerProxy` class.

Once the `Logger` implementation gets created in the `cli` package, it can be obtained by calling the `getInstance` convenience method from the exported module.

Check the [start.ts](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/start.ts) file to learn more about how this process works.

### Adding logs

Once the `LoggerProxy` class gets initialized in the project, you can import it to any other file and add logs.

Convenience methods are provided for all logging levels, so new logs can be added whenever needed using the format `Logger.<logLevel>('<message>', ...meta)`, where `meta` represents any additional properties desired beyond `message`.

In the example above, we use the standard log levels described [above](#log-levels). The `message` argument is a string, and `meta` is a data object.

```js
// You have to import the LoggerProxy. We rename it to Logger to make it easier

import {
	LoggerProxy as Logger
} from 'n8n-workflow';

// Info-level logging of a trigger function, with workflow name and workflow ID as additional metadata properties

Logger.info(`Polling trigger initiated for workflow "${workflow.name}"`, {workflowName: workflow.name, workflowId: workflow.id});
```

When creating new loggers, some useful standards to keep in mind are:

- Craft log messages to be as human-readable as possible. For example, always wrap names in quotes.
- Duplicating information in the log message and metadata, like workflow name in the above example, can be useful as messages are easier to search and metadata enables easier filtering.
- Include multiple IDs (for example, `executionId`, `workflowId`, and `sessionId`) throughout all logs.
- Use node types instead of node names (or both) as this is more consistent, and so easier to search.

## Front-end logs

As of now, front-end logs aren't available. Using `Logger` or `LoggerProxy` would yield errors in the `editor-ui` package. This functionality will get implemented in the future versions.


# hosting/logging-monitoring/monitoring.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Get metrics for a health check
contentType: howto
---

# Monitoring

There are three API endpoints you can call to check the status of your instance: `/healthz`, `healthz/readiness`, and `/metrics`.

<!-- vale off -->
## healthz and healthz/readiness
<!-- vale on -->
The `/healthz` endpoint returns a standard HTTP status code. 200 indicates the instance is reachable. It doesn't indicate DB status. It's available for both self-hosted and Cloud users.

Access the endpoint:

```
<your-instance-url>/healthz
```

The `/healthz/readiness` endpoint is similar to the `/healthz` endpoint, but it returns a HTTP status code of 200 if the DB is connected and migrated and therefore the instance is ready to accept traffic.

Access the endpoint:

```
<your-instance-url>/healthz/readiness
```


## metrics

The `/metrics` endpoint provides more detailed information about the current status of the instance.

Access the endpoint:

```
<your-instance-url>/metrics
```

/// info | Feature availability
The `/metrics` endpoint isn't available on n8n Cloud.
///
<!-- vale off -->
## Enable metrics and healthz for self-hosted n8n
<!-- vale on -->
The `/metrics` and `/healthz` endpoints are disabled by default. To enable them, configure your n8n instance:

```shell
# metrics
N8N_METRICS=true
# healthz
QUEUE_HEALTH_CHECK_ACTIVE=true
```

Refer to [Configuration methods](/hosting/configuration/configuration-methods.md) for more information on how to configure your instance using environment variables.


# hosting/scaling/binary-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Scaling binary data in n8n
description: How to handle large files without degrading n8n's performance.
contentType: howto
---

# Binary data

Binary data is any file-type data, such as image files or documents generated or processed during the execution of a workflow. 

## Enable filesystem mode

When handling binary data, n8n keeps the data in memory by default. This can cause crashes when working with large files. 

To avoid this, change the `N8N_DEFAULT_BINARY_DATA_MODE` [environment variable](/hosting/configuration/environment-variables/binary-data.md) to `filesystem`. This causes n8n to save data to disk, instead of using memory.

If you're using queue mode, keep this to `default`. n8n doesn't support filesystem mode with queue mode.

## Binary data pruning

n8n executes binary data pruning as part of execution data pruning. Refer to [Execution data | Enable data pruning](/hosting/scaling/execution-data.md#enable-data-pruning) for details. 

If you configure multiple binary data modes, binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. Refer to [External storage](/hosting/scaling/external-storage.md#usage) for details. 


# hosting/scaling/concurrency-control.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Self-hosted concurrency control

/// info | Only for self-hosted n8n
This document is for self-hosted concurrency control. Read [Cloud concurrency](/manage-cloud/concurrency.md) to learn how concurrency works with n8n Cloud accounts.
///

In regular mode, n8n doesn't limit how many production executions may run at the same time. This can lead to a scenario where too many concurrent executions thrash the event loop, causing performance degradation and unresponsiveness. 

To prevent this, you can set a concurrency limit for production executions in regular mode. Use this to control how many production executions run concurrently, and queue up any concurrent production executions over the limit. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

Concurrency control is disabled by default. To enable it:

```sh
export N8N_CONCURRENCY_PRODUCTION_LIMIT=20
```

Keep in mind:

- Concurrency control applies only to production executions: those started from a webhook or [trigger](/glossary.md#trigger-node-n8n) node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, error executions, or started from CLI.
- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.
- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.
<!-- vale off -->
- To monitor concurrency control, watch logs for executions being added to the queue and released. In a future version, n8n will show concurrency control in the UI.
<!-- vale on -->

When you enable concurrency control, you can view the number of active executions and the configured limit at the top of a project's or workflow's executions tab.

## Comparison to queue mode

In queue mode, you can control how many jobs a worker may run concurrently using the [`--concurrency` flag](/hosting/scaling/queue-mode.md#configure-worker-concurrency).

Concurrency control in queue mode is a separate mechanism from concurrency control in regular mode, but the environment variable `N8N_CONCURRENCY_PRODUCTION_LIMIT` controls both of them. In queue mode, n8n takes the limit from this variable if set to a value other than `-1`, falling back to the `--concurrency` flag or its default.



# hosting/scaling/execution-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Execution data

Depending on your executions settings and volume, your n8n database can grow in size and run out of storage.

To avoid this, n8n recommends that you don't save unnecessary data, and enable pruning of old executions data.

To do this, configure the corresponding [environment variables](/hosting/configuration/environment-variables/executions.md).

## Reduce saved data

/// note | Configuration at workflow level
You can also configure these settings on an individual workflow basis using the [workflow settings](/workflows/settings.md).
///
You can select which executions data n8n saves. For example, you can save only executions that result in an `Error`.

```sh
# npm
# Save executions ending in errors
export EXECUTIONS_DATA_SAVE_ON_ERROR=all

# Save successful executions
export EXECUTIONS_DATA_SAVE_ON_SUCCESS=all

# Don't save node progress for each execution
export EXECUTIONS_DATA_SAVE_ON_PROGRESS=false

# Don't save manually launched executions
export EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false

```

```sh
# Docker
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_SAVE_ON_ERROR=all \
 -e EXECUTIONS_DATA_SAVE_ON_SUCCESS=none \
 -e EXECUTIONS_DATA_SAVE_ON_PROGRESS=true \
 -e EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false \
 docker.n8n.io/n8nio/n8n
```

```yaml
# Docker Compose
n8n:
    environment:
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
      - EXECUTIONS_DATA_SAVE_ON_PROGRESS=true
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
```

## Enable data pruning

You can enable data pruning to automatically delete finished executions after a given time. If you don't set `EXECUTIONS_DATA_MAX_AGE`, 336 hours (14 days) is the default.

You can choose to prune finished executions data before the time set in `EXECUTIONS_DATA_MAX_AGE`, using `EXECUTIONS_DATA_PRUNE_MAX_COUNT`. This sets a maximum number of executions to store in the database. Once you reach the limit, n8n starts to delete the oldest execution records. This can help with database performance issues, especially if you use SQLite. The database size can still exceed the limit you set: old executions that haven't finished running don't get deleted, even if they would otherwise be subject to deletion.

```sh
# npm
# Activate automatic data pruning
export EXECUTIONS_DATA_PRUNE=true

# Number of hours after execution that n8n deletes data
export EXECUTIONS_DATA_MAX_AGE=168

# Number of executions to store
export EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

```sh
# Docker
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_PRUNE=true \
 -e EXECUTIONS_DATA_MAX_AGE=168 \
 docker.n8n.io/n8nio/n8n
```

```yaml
# Docker Compose
n8n:
    environment:
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
	  	- EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

/// note | SQLite
If you run n8n using the default SQLite database, the disk space of any pruned data isn't automatically freed up but rather reused for future executions data. To free up this space configure the `DB_SQLITE_VACUUM_ON_STARTUP` [environment variable](/hosting/configuration/environment-variables/database.md#sqlite) or manually run the [VACUUM](https://www.sqlite.org/lang_vacuum.html){:target=_blank .external-link} operation.
///

--8<-- "_snippets/self-hosting/scaling/binary-data-pruning.md"


# hosting/scaling/external-storage.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: External storage of binary data for your n8n instance.
contentType: howto
tags:
  - external storage
  - storage
hide:
  - tags
search:
  boost: 1.5
---

# External storage

/// info | Feature availability

* Available on Self-hosted Enterprise plans
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

n8n can store binary data produced by workflow executions externally. This feature is useful to avoid relying on the filesystem for storing large amounts of binary data.

n8n will introduce external storage for other data types in the future.

## Storing n8n's binary data in S3

n8n supports [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html){:target=_blank .external-link} as an external store for binary data produced by workflow executions. You can use other S3-compatible services like Cloudflare R2 and Backblaze B2, but n8n doesn't officially support these.

/// info | Enterprise-tier feature
You will need an [Enterprise license key](/license-key.md) for external storage. If your license key expires and you remain on S3 mode, the instance will be able to read from, but not write to, the S3 bucket.
///

### Setup

Create and configure a bucket following the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html){:target=_blank .external-link}. You can use the following policy, replacing `<bucket-name>` with the name of the bucket you created:

```json
{
 "Version": "2012-10-17",
 "Statement": [
  {
   "Sid": "VisualEditor0",
   "Effect": "Allow",
   "Action": ["s3:*"],
   "Resource": ["arn:aws:s3:::<bucket-name>", "arn:aws:s3:::<bucket-name>/*"]
  }
 ]
}
```

Set a bucket-level lifecycle configuration so that S3 automatically deletes old binary data. n8n delegates pruning of binary data to S3, so setting a lifecycle configuration is required unless you want to preserve binary data indefinitely.

Once you finish creating the bucket, you will have a host, bucket name and region, and an access key ID and secret access key. You need to set them in n8n's environment:

```sh
export N8N_EXTERNAL_STORAGE_S3_HOST=... # example: s3.us-east-1.amazonaws.com
export N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME=...
export N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION=...
export N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY=...
export N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET=...
```

/// note | No region
If your provider doesn't require a region, you can set `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` to `'auto'`.
///
Tell n8n to store binary data in S3:

```sh
export N8N_AVAILABLE_BINARY_DATA_MODES=filesystem,s3
export N8N_DEFAULT_BINARY_DATA_MODE=s3
```


/// note | Auth autodetection
To automatically detect credentials to authenticate your S3 calls, set `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` to `true`. This will use the default [credential provider chain](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain).
///

Restart the server to load the new configuration.

### Usage

After you enable S3, n8n writes and reads any new binary data to and from the S3 bucket. n8n writes binary data to your S3 bucket in this format:

```
workflows/{workflowId}/executions/{executionId}/binary_data/{binaryFileId}
```

n8n continues to read older binary data stored in the filesystem from the filesystem, if `filesystem` remains listed as an option in `N8N_AVAILABLE_BINARY_DATA_MODES`.

If you store binary data in S3 and later switch to filesystem mode, the instance continues to read any data stored in S3, as long as `s3` remains listed in `N8N_AVAILABLE_BINARY_DATA_MODES` and your S3 credentials remain valid.

--8<-- "_snippets/self-hosting/scaling/binary-data-pruning.md"


# hosting/scaling/memory-errors.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Memory-related errors

n8n doesn't restrict the amount of data each node can fetch and process. While this gives you freedom, it can lead to errors when workflow executions require more memory than available. This page explains how to identify and avoid these errors.

/// note | Only for self-hosted n8n
This page describes memory-related errors when [self-hosting n8n](/hosting/index.md). Visit [Cloud data management](/manage-cloud/cloud-data-management.md) to learn about memory limits for [n8n Cloud](/manage-cloud/overview.md).
///

## Identifying out of memory situations

n8n provides error messages that warn you in some out of memory situations. For example, messages such as **Execution stopped at this node (n8n may have run out of memory while executing it)**.

Error messages including **Problem running workflow**, **Connection Lost**, or **503 Service Temporarily Unavailable** suggest that an n8n instance has become unavailable. 

When self-hosting n8n, you may also see error messages such as **Allocation failed - JavaScript heap out of memory** in your server logs. 

On n8n Cloud, or when using n8n's Docker image, n8n restarts automatically when encountering such an issue. However, when running n8n with npm you might need to restart it manually.

## Typical causes

Such problems occur when a workflow execution requires more memory than available to an n8n instance. Factors increasing the memory usage for a workflow execution include:

- Amount of [JSON data](/data/data-structure.md).
- Size of binary data.
- Number of nodes in a workflow.
- Some nodes are memory-heavy: the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node and the older Function node can increase memory consumption significantly.
- Manual or automatic workflow executions: manual executions increase memory consumption as n8n makes a copy of the data for the frontend.
- Additional workflows running at the same time.

## Avoiding out of memory situations

When encountering an out of memory situation, there are two options: either increase the amount of memory available to n8n or reduce the memory consumption.

### Increase available memory

When self-hosting n8n, increasing the amount of memory available to n8n means provisioning your n8n instance with more memory. This may incur additional costs with your hosting provider.

On n8n cloud you need to upgrade to a larger plan.

### Reduce memory consumption

This approach is more complex and means re-building the workflows causing the issue. This section provides some guidelines on how to reduce memory consumption. Not all suggestions are applicable to all workflows.

--8<-- "_snippets/self-hosting/scaling/reduce-memory-consumption.md"

### Increase old memory

This applies to self-hosting n8n. When encountering **JavaScript heap out of memory** errors, it's often useful to allocate additional memory to the old memory section of the V8 JavaScript engine. To do this, set the appropriate [V8 option](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes){:target=_blank .external-link} `--max-old-space-size=SIZE` either through the CLI or through the `NODE_OPTIONS` [environment variable](https://nodejs.org/api/cli.html#node_optionsoptions){:target=_blank .external-link}.


# hosting/scaling/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Scaling n8n

When running n8n at scale, with a large number of users, workflows, or executions, you need to change your n8n configuration to ensure good performance.

n8n can run in different [modes](/hosting/scaling/queue-mode.md) depending on your needs. The `queue` mode provides the best scalability. Refer to [Queue mode](/hosting/scaling/queue-mode.md) for configuration details.

You can configure data saving and pruning to improve database performance. Refer to [Execution data](/hosting/scaling/execution-data.md) for details.


# hosting/scaling/performance-benchmarking.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n performance and resource consumption benchmarking.
contentType: explanation
---

# Performance and benchmarking

n8n can handle up to 220 workflow executions per second on a single instance, with the ability to scale up further by adding more instances.

This document outlines n8n's performance benchmarking. It describes the factors that affect performance, and includes two example benchmarks.

## Performance factors

The performance of n8n depends on factors including: 

* The workflow type
* The resources available to n8n
* How you configure n8n's scaling options


## Run your own benchmarking

To get an accurate estimate for your use case, run n8n's [benchmarking framework](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark){:target=_blank .external-link}. The repository contains more information about the benchmarking.

## Example: Single instance performance

This test measures how response time increases as requests per second increase. It looks at the response time when calling the Webhook Trigger node.

Setup:

- Hardware: ECS c5a.large instance (4GB RAM)
- n8n setup: Single n8n instance (running in main mode, with Postgres database)
- Workflow: Webhook Trigger node, Edit Fields node

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-single-instance-100-250.png)
  <figcaption>This graph shows the percentage of requests to the Webhook Trigger node getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>



## Example: Multi-instance performance

This test measures how response time increases as requests per second increase. It looks at the response time when calling the Webhook Trigger node.

Setup:

- Hardware: seven ECS c5a.4xlarge instances (8GB RAM each)
- n8n setup: two webhook instances, four worker instances, one database instance (MySQL), one main instance running n8n and Redis
- Workflow: Webhook Trigger node, Edit Fields node
- Multi-instance setups use [Queue mode](/hosting/scaling/queue-mode.md)

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-multi-instance-500-2500.png)
  <figcaption>This graph shows the percentage of requests to the Webhook Trigger node getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>



# hosting/scaling/queue-mode.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Queue mode

You can run n8n in different modes depending on your needs. The queue mode provides the best scalability.

/// note | Binary data storage
n8n doesn't support queue mode with binary data storage in filesystem. If your workflows need to persist binary data in queue mode, you can use [S3 external storage](./external-storage.md).
///

## How it works

When running in queue mode, you have multiple n8n instances set up, with one main instance receiving workflow information (such as triggers) and the worker instances performing the executions. 

Each worker is its own Node.js instance, running in `main` mode, but able to handle multiple simultaneous workflow executions due to their high IOPS (input-output operations per second). 

By using worker instances and running in queue mode, you can scale n8n up (by adding workers) and down (by removing workers) as needed to handle the workload.

This is the process flow:

1. The main n8n instance handles timers and webhook calls, generating (but not running) a workflow execution. 
1. It passes the execution ID to a message broker, [Redis](#start-redis), which maintains the queue of pending executions and allows the next available worker to pick them up.
1. A worker in the pool picks up message from Redis.
1. The worker uses the execution ID to get workflow information from the database.
1. After completing the workflow execution, the worker:
	- Writes the results to the database.
	- Posts to Redis, saying that the execution has finished.
1. Redis notifies the main instance.


!["Diagram showing the flow of data between the main n8n instance, Redis, the n8n workers, and the n8n database"](/_images/hosting/scaling/queue-mode-flow.png)

## Configuring workers

Workers are n8n instances that do the actual work. They receive information from the main n8n process about the workflows that have to get executed, execute the workflows, and update the status after each execution is complete.

### Set encryption key

n8n automatically generates an encryption key upon first startup. You can also provide your own custom key using [environment variable](/hosting/configuration/environment-variables/index.md) if desired.

The encryption key of the main n8n instance must be shared with all worker and webhooks processor nodes to ensure these worker nodes are able to access credentials stored in the database.

Set the encryption key for each worker node in a [configuration file](/hosting/configuration/configuration-methods.md) or by setting the corresponding environment variable:

```bash
export N8N_ENCRYPTION_KEY=<main_instance_encryption_key>
```

### Set executions mode

/// note | Database considerations
n8n recommends using Postgres 13+. Running n8n with execution mode set to `queue` with an SQLite database isn't recommended.
///

Set the environment variable `EXECUTIONS_MODE` to `queue` on the main instance and any workers using the following command.

```bash
export EXECUTIONS_MODE=queue
```

Alternatively, you can set `executions.mode` to `queue` in the [configuration file](/hosting/configuration/environment-variables/index.md).

### Start Redis

/// note | Running Redis on a separate machine
You can run Redis on a separate machine, just make sure that it's accessible by the n8n instance.
///

To run Redis in a Docker container, follow the instructions below:

Run the following command to start a Redis instance:

```
docker run --name some-redis -p 6379:6379  -d redis
```

By default, Redis runs on `localhost` on port `6379` with no password. Based on your Redis configuration, set the following configurations for the main n8n process. These will allow n8n to interact with Redis.

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.host:localhost` | `QUEUE_BULL_REDIS_HOST=localhost` | By default, Redis runs on `localhost`. |
| `queue.bull.redis.port:6379` | `QUEUE_BULL_REDIS_PORT=6379` | The default port is `6379`. If Redis is running on a different port, configure the value. |

You can also set the following optional configurations:

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.username:USERNAME` | `QUEUE_BULL_REDIS_USERNAME` | By default, Redis doesn't require a username. If you're using a specific user, configure it variable. |
| `queue.bull.redis.password:PASSWORD` | `QUEUE_BULL_REDIS_PASSWORD` | By default, Redis doesn't require a password. If you're using a password, configure it variable. |
| `queue.bull.redis.db:0` | `QUEUE_BULL_REDIS_DB` | The default value is `0`. If you change this value, update the configuration. |
| `queue.bull.redis.timeoutThreshold:10000ms` | `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Tells n8n how long it should wait if Redis is unavailable before exiting. The default value is `10000` (ms). |
| `queue.bull.gracefulShutdownTimeout:30` | `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | A graceful shutdown timeout for workers to finish executing jobs before terminating the process. The default value is `30` seconds. |


Now you can start your n8n instance and it will connect to your Redis instance.

### Start workers

You will need to start worker processes to allow n8n to execute workflows. If you want to host workers on a separate machine, install n8n on the machine and make sure that it's connected to your Redis instance and the n8n database.

Start worker processes by running the following command from the root directory:

```
./packages/cli/bin/n8n worker
```

If you're using Docker, use the following command:

```
docker run --name n8n-queue -p 5679:5678 docker.n8n.io/n8nio/n8n worker
```

You can set up multiple worker processes. Make sure that all the worker processes have access to Redis and the n8n database.

#### Worker server

Each worker process runs a server that exposes optional endpoints:

- `/healthz`: returns whether the worker is up, if you enable the `QUEUE_HEALTH_CHECK_ACTIVE` environment variable
- `/healthz/readiness`: returns whether worker's DB and Redis connections are ready, if you enable the `QUEUE_HEALTH_CHECK_ACTIVE` environment variable
- [credentials overwrite endpoint](https://docs.n8n.io/embed/configuration/#credential-overwrites)
- [`/metrics`](https://docs.n8n.io/hosting/configuration/configuration-examples/prometheus/)

#### View running workers 

/// info | Feature availability
* Available on Self-hosted Enterprise plans.
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

You can view running workers and their performance metrics in n8n by selecting **Settings** > **Workers**.

## Running n8n with queues

When running n8n with queues, all the production workflow executions get processed by worker processes. This means that even the webhook calls get delegated to the worker processes, which might add some overhead and extra latency.

Redis acts as the message broker, and the database persists data, so access to both is required. Running a distributed system with this setup over SQLite isn't supported.

/// note | Migrate data
If you want to migrate data from one database to another, you can use the Export and Import commands. Refer to the [CLI commands for n8n](/hosting/cli-commands.md#export-workflows-and-credentials) documentation to learn how to use these commands.
///

## Webhook processors

/// note | Keep in mind
Webhook processes rely on Redis and need the `EXECUTIONS_MODE` environment variable set too. Follow the [configure the workers](#configuring-workers) section above to setup webhook processor nodes.
///

Webhook processors are another layer of scaling in n8n. Configuring the webhook processor is optional, and allows you to scale the incoming webhook requests.

This method allows n8n to process a huge number of parallel requests. All you have to do is add more webhook processes and workers accordingly. The webhook process will listen to requests on the same port (default: `5678`). Run these processes in containers or separate machines, and have a load balancing system to route requests accordingly.

n8n doesn't recommend adding the main process to the load balancer pool. If you add the main process to the pool, it will receive requests and possibly a heavy load. This will result in degraded performance for editing, viewing, and interacting with the n8n UI.

You can start the webhook processor by executing the following command from the root directory:

```
./packages/cli/bin/n8n webhook
```

If you're using Docker, use the following command:

```
docker run --name n8n-queue -p 5679:5678 -e "EXECUTIONS_MODE=queue" docker.n8n.io/n8nio/n8n webhook
```

### Configure webhook URL

To configure your webhook URL, execute the following command on the machine running the main n8n instance:

```bash
export WEBHOOK_URL=https://your-webhook-url.com
```

You can also set this value in the configuration file.

### Configure load balancer

When using multiple webhook processes you will need a load balancer to route requests. If you are using the same domain name for your n8n instance and the webhooks, you can set up your load balancer to route requests as follows:

- Redirect any request that matches `/webhook/*` to the webhook servers pool
- All other paths (the n8n internal API, the static files for the editor, etc.) should get routed to the main process

**Note:** The default URL for manual workflow executions is `/webhook-test/*`. Make sure that these URLs route to your main process.

You can change this path in the configuration file `endpoints.webhook` or using the `N8N_ENDPOINT_WEBHOOK` environment variable. If you change these, update your load balancer accordingly.

### Disable webhook processing in the main process (optional)

You have webhook processors to execute the workflows. You can disable the webhook processing in the main process. This will make sure to execute all webhook executions in the webhook processors. In the configuration file set `endpoints.disableProductionWebhooksOnMainProcess` to `true` so that n8n doesn't process webhook requests on the main process.

Alternatively, you can use the following command:

```bash
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
```

When disabling the webhook process in the main process, run the main process and don't add it to the load balancer's webhook pool.

## Configure worker concurrency

You can define the number of jobs a worker can run in parallel by using the `concurrency` flag. It defaults to `10`. To change it:

```bash
n8n worker --concurrency=5
```

## Concurrency and scaling recommendations

n8n recommends setting concurrency to 5 or higher for your worker instances. Setting low concurrency values with a large numbers of workers can exhaust your database's connection pool, leading to processing delays and failures.

## Multi-main setup

/// info | Feature availability
* Available on Self-hosted Enterprise plans.
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

In queue mode you can run more than one `main` process for high availability.

In a single-mode setup, the `main` process does two sets of tasks: 

- **regular tasks**, such as running the API, serving the UI, and listening for webhooks, and 
- **at-most-once tasks**, such as running non-HTTP triggers (timers, pollers, and persistent connections like RabbitMQ and IMAP), and pruning executions and binary data.

In a multi-main setup, there are two kinds of `main` processes:

- **followers**, which run **regular tasks**, and
- the **leader**, which runs **both regular and at-most-once tasks**.

### Leader designation

In a multi-main setup, all main instances handle the leadership process transparently to users. In case the current leader becomes unavailable, for example because it crashed or its event loop became too busy, other followers can take over. If the previous leader becomes responsive again, it becomes a follower.

### Configuring multi-main setup

To deploy n8n in multi-main setup, ensure: 

- All `main` processes are running in queue mode and are connected to Postgres and Redis.
- All `main` and `worker` processes are running the same version of n8n.
- All `main` processes have set the environment variable `N8N_MULTI_MAIN_SETUP_ENABLED` to `true`.
- All `main` processes are running behind a load balancer with session persistence (sticky sessions) enabled.

If needed, you can adjust the leader key options:

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `multiMainSetup.ttl:10` | `N8N_MULTI_MAIN_SETUP_KEY_TTL=10` | Time to live (in seconds) for leader key in multi-main setup. |
| `multiMainSetup.interval:3` | `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL=3` | Interval (in seconds) for leader check in multi-main setup. |




# hosting/securing/blocking-nodes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Block access to nodes
description: "Prevent your n8n users from accessing specific nodes."
contentType: howto
---

# Block access to nodes

For security reasons, you may want to block your users from accessing or working with specific n8n nodes. This is helpful if your users might be untrustworthy.

Use the `NODES_EXCLUDE` environment variable to prevent your users from accessing specific nodes.

## Exclude nodes

Update your `NODES_EXCLUDE` environment variable to include an array of strings containing any nodes you want to block your users from using.

For example, setting the variable this way:

```
NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"
```

Blocks the [Execute Command](/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/index.md) and [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md) nodes.

Your n8n users won't be able to search for or use these nodes.

## Suggested nodes to block

The nodes that can pose security risks vary based on your use case and user profile. Here are some nodes you might want to start with:

* [Execute Command](/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/index.md)
* [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md)

## Related resources

Refer to [Nodes environment variables](/hosting/configuration/environment-variables/nodes.md) for more information on this environment variable.

Refer to [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.


# hosting/securing/disable-public-api.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Disable the public REST API
description: "Disable the n8n public REST API to prevent others from using it."
contentType: howto
---

# Disable the public REST API

The [n8n public REST API](/api/index.md) allows you to programmatically perform many of the same tasks as you can in the n8n GUI.

If you don't plan on using this API, n8n recommends disabling it to improve the security of your n8n installation.

To disable the [public REST API](/api/index.md), set the `N8N_PUBLIC_API_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_DISABLED=true
```

## Disable the API playground

To disable the [API playground](/api/using-api-playground.md), set the `N8N_PUBLIC_API_SWAGGERUI_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_SWAGGERUI_DISABLED=true
```

## Related resources

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.


# hosting/securing/hardening-task-runners.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Hardening task runners
description: "Harden task runners for better isolation for your self-hosted n8n instance."
contentType: howto
---

# Hardening task runners

[Task runners](/hosting/configuration/task-runners.md) are responsible for executing code from the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md). While Code node executions are secure, you can follow these recommendations to further harden your task runners.

## Run task runners as sidecars in external mode

To increase the isolation between the core n8n process and code in the Code node, run task runners in [external mode](/hosting/configuration/task-runners.md#setting-up-external-mode). External task runners launch as separate containers, providing a fully isolated environment to execute the JavaScript defined in the Code node.


# hosting/securing/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Securing n8n
contentType: overview
---

# Securing n8n

Securing your n8n instance can take several forms.

At a high level, you can:

* Conduct a [security audit](/hosting/securing/security-audit.md) to identify security risks.
* [Set up SSL](/hosting/securing/set-up-ssl.md) to enforce secure connections.
* [Set up Single Sign-On](/hosting/securing/set-up-sso.md) for user account management.
* Use [two-factor authentication (2FA)](/user-management/two-factor-auth.md) for your users.

More granularly, consider blocking or opting out of features or data collection you don't want:

* [Disable the public API](/hosting/securing/disable-public-api.md) if you aren't using it.
* [Opt out of data collection](/hosting/securing/telemetry-opt-out.md) of the anonymous data n8n collects automatically.
* [Block certain nodes](/hosting/securing/blocking-nodes.md) from being available to your users.

# hosting/securing/security-audit.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Security audit
description: "Run a security audit on your n8n instance."
contentType: howto
---

# Security audit

You can run a security audit on your n8n instance, to detect common security issues.

## Run an audit

You can run an audit using the CLI, the public API, or the n8n node.


### CLI

Run `n8n audit`.

### API

Make a `POST` call to the `/audit` endpoint. You must authenticate as the instance owner.

### n8n node

Add the [n8n node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) to your workflow. Select **Resource** > **Audit** and **Operation** > **Generate**.

## Report contents

The audit generates five risk reports:

### Credentials

This report shows:

* Credentials not used in a workflow.
* Credentials not used in an active workflow.
* Credentials not use in a recently active workflow.

### Database

This report shows:

* Expressions used in **Execute Query** fields in SQL nodes.
* Expressions used in **Query Parameters** fields in SQL nodes.
* Unused **Query Parameters** fields in SQL nodes.

### File system

This report lists nodes that interact with the file system.

### Nodes

This report shows:

* Official risky nodes. These are n8n built in nodes. You can use them to fetch and run any code on the host system, which exposes the instance to exploits. You can view the list in [n8n code | Audit constants](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/security-audit/constants.ts#L51){:target=_blank .external-link}, under `OFFICIAL_RISKY_NODE_TYPES`.
* Community nodes.
* Custom nodes.

### Instance

This report shows:

* Unprotected webhooks in the instance.
* Missing security settings
* If your instance is outdated.


# hosting/securing/set-up-ssl.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up SSL
description: "Set up SSL for your self-hosted n8n instance."
contentType: howto
---

# Set up SSL

There are two methods to support TLS/SSL in n8n.

## Use a reverse proxy (recommended)

Use a reverse proxy like [Traefik](https://doc.traefik.io/traefik/){:target=_blank .external-link} or a Network Load Balancer (NLB) in front of the n8n instance. This should also take care of certificate renewals.

Refer to [Security | Data encryption](https://n8n.io/legal/#security){:target=_blank .external-link} for more information.

## Pass certificates into n8n directly

You can also choose to pass certificates into n8n directly. To do so, set the `N8N_SSL_CERT` and `N8N_SSL_KEY` environment variables to point to your generated certificate and key file.

You'll need to make sure the certificate stays renewed and up to date.

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these variables and [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.


# hosting/securing/set-up-sso.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up SAML SSO
description: "Set up SAML Single Sign-On for your self-hosted n8n instance."
contentType: howto
---

# Set up SAML Single Sign-On (SSO)

--8<-- "_snippets/user-management/saml-overview.md"


# hosting/securing/telemetry-opt-out.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Opt out of data collection
description: "Opt out of data telemetry collection on your n8n instance."
contentType: howto
---

# Data collection

n8n collects some anonymous data from self-hosted n8n installations. Use the instructions below to opt out of data telemetry collection.

## Collected data

Refer to [Privacy | Data collection in self-hosted n8n](/privacy-security/privacy.md#data-collection-in-self-hosted-n8n) for details on the data n8n collects.

## How collection works

Your n8n instance sends most data to n8n as the events that generate it occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours). These data types mostly fall into n8n telemetry collection.

## Opting out of data collection

n8n enables telemetry collection by default. To disable it, configure the following environment variables.

### Opt out of telemetry events

To opt out of telemetry events, set the `N8N_DIAGNOSTICS_ENABLED` environment variable to false, for example:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

### Opt out of checking for new versions of n8n

To opt out of checking for new versions of n8n, set the `N8N_VERSION_NOTIFICATIONS_ENABLED` environment variable to false, for example:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

## Disable all connection to n8n servers

If you want to fully prevent all communication with n8n's servers, refer to [Isolate n8n](/hosting/configuration/configuration-examples/isolation.md).

## Related resources

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.


# hosting/starter-kits/ai-starter-kit.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Self-hosted AI Starter Kit
description: Use n8n's curated self-hosted AI Starter Kit to get a list of AI elements to quickly start building AI workflows.
contentType: howto
---

# Self-hosted AI Starter Kit

The Self-hosted AI Starter Kit is an open, docker compose template that bootstraps a fully featured Local AI and Low Code development environment.

Curated by [n8n](https://github.com/n8n-io), it combines the self-hosted n8n platform with a list of compatible AI products and components to get you started building self-hosted AI workflows.

## What’s included

✅ [**Self-hosted n8n**](/hosting/index.md): Low-code platform with over 400 integrations and advanced AI components.

✅ [**Ollama**](https://ollama.com/){:target=_blank .external-link}: Cross-platform LLM platform to install and run the latest local LLMs.

✅ [**Qdrant**](https://qdrant.tech/){:target=_blank .external-link}: Open-source, high performance vector store with a comprehensive API.

✅ [**PostgreSQL**](https://www.postgresql.org/){:target=_blank .external-link}: The workhorse of the Data Engineering world, handles large amounts of data safely.

## What you can build

⭐️ [AI Agents](/glossary.md#ai-agent){ data-preview} that can schedule appointments

⭐️ Summaries of company PDFs without leaking data

⭐️ Smarter Slackbots for company communications and IT-ops

⭐️ Private, low-cost analyses of financial documents

## Get the kit

<!-- vale off -->
Head to [the GitHub repository](https://github.com/n8n-io/self-hosted-ai-starter-kit){:target=_blank .external-link} to clone the repo and get started!
<!-- vale on -->

/// note | For testing only
n8n designed this kit to help you get started with self-hosted AI workflows. While it’s not fully optimized for production environments, it combines robust components that work well together for proof-of-concept projects. Customize it to meet your needs. Secure and harden it before using in production.
///
