---
description: Check the database, operating system, runtime, storage, and software requirements for a production n8n deployment, and complete the pre-deployment checklist.
layout:
  description:
    visible: false
---

# Production requirements

Before you run a production n8n deployment that you manage yourself, confirm that your database, operating system, runtime, storage, and deployment tooling meet n8n's requirements.

{% hint style="info" %}
**Looking for a quickstart?** You don't need this page. [One-line setup](one-line-setup.md) only needs Docker and handles the database and storage for you. [Install using Docker Compose](install-using-docker-compose.md) starts with the built-in SQLite database, with PostgreSQL as an optional step. Use this page when you move to production, run your own PostgreSQL, use queue mode, or deploy to Kubernetes or bare metal.
{% endhint %}

## Database

This section applies when you run n8n in production. [One-line setup](one-line-setup.md) and the [Docker Compose](install-using-docker-compose.md) guide start with n8n's built-in SQLite database, which suits testing and small setups.

n8n needs a database to store workflows, credentials, and execution history.

- **PostgreSQL:** n8n recommends PostgreSQL for production, on a [supported PostgreSQL version](../configure-n8n/choose-n8ns-database.md#supported-postgresql-versions).
- **SQLite:** n8n doesn't support SQLite in queue mode, and doesn't recommend it for multi-user production use.
- **Database user permissions:** the n8n database user must be able to connect to the database, use and create objects in the configured schema, and alter or drop n8n's tables during migrations. The simplest setup is to let the n8n user own the tables it creates. Refer to [Required permissions](../configure-n8n/choose-n8ns-database.md#required-permissions) for an example.

Refer to [Choose n8n's database](../configure-n8n/choose-n8ns-database.md) for the environment variables that configure PostgreSQL.

## Operating system and runtime

- **Operating system:** n8n recommends a 64-bit Linux host for production.
- **Node.js:** in n8n 2.x, you only need Node.js for [npm installations](install-with-npm.md). Docker and Kubernetes installations include the correct version. Refer to [Install with npm](install-with-npm.md) for the supported Node.js versions. From n8n 3.0, n8n no longer supports npm installations, so you need a Docker-based deployment. Refer to [v3.0 breaking changes](../../../changelog/v30-breaking-changes.md#docker-based-deployment-required-for-self-hosted-n8n).

## Storage

[One-line setup](one-line-setup.md) and the [Docker Compose](install-using-docker-compose.md) guide store n8n's data in a Docker volume, so you don't need to set up storage for them. If you adapt either setup, keep a volume for n8n's data. This section applies to production deployments and to deployments that [enable queue mode](../configure-n8n/scaling/enable-queue-mode.md), where you manage storage yourself.

For those deployments, plan for the following:

- **n8n data directory:** a persistent volume for the n8n data directory, which holds the encryption key and file logs, when enabled. It also holds local binary data in [filesystem mode](../configure-n8n/scaling/handle-binary-data.md#enable-filesystem-mode), the default in regular mode from n8n 2.0.
- **PostgreSQL data:** if you run PostgreSQL yourself, a persistent volume for PostgreSQL data.
- **Binary data in queue mode:** n8n stores binary data in the database by default unless you configure another storage mode. If your license includes the relevant [external storage](../configure-n8n/scaling/use-external-storage.md) option, you can use AWS S3 or Azure Blob Storage. If you use filesystem storage, all main instances, workers, and webhook processors that handle binary data must access the same shared volume at the same configured path. Database mode increases the size of your PostgreSQL database. If your license includes external storage, prefer it for queue mode. Refer to [Handle binary data](../configure-n8n/scaling/handle-binary-data.md) for details.

## Redis

This section applies only if you [enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

In queue mode, Redis holds the queue state for pending executions between the main n8n instance and its workers. PostgreSQL holds your workflows and execution data. If Redis loses queued jobs, n8n doesn't rebuild them from PostgreSQL. It marks the affected executions as crashed instead. Configure Redis persistence and availability to match how much lost work you can tolerate. Provision a Redis instance that the main instance and every worker can reach. Refer to [Start Redis](../configure-n8n/scaling/enable-queue-mode.md#start-redis) for the connection settings.

## Network

This section applies to production deployments that you expose to users or to external services.

### Ports

| Port | Component | Purpose |
| --- | --- | --- |
| 5678 | n8n | HTTP API, editor UI, and webhooks. This is the default value of `N8N_PORT`. |
| 5432 | PostgreSQL | Database connections. This is the PostgreSQL default. |
| 6379 | Redis | Queue communication in queue mode. This is the Redis default. Use the port and TLS settings of your Redis service, since managed services often use a different port for TLS. |
| 5679 | n8n task broker | Connections from external task runners. This is the default value of `N8N_RUNNERS_BROKER_PORT`. Keep this traffic private between n8n and the runners. |

### Firewall rules

At a minimum, configure your firewall so that:

- The main n8n instance and workers can reach PostgreSQL and, in queue mode, Redis.
- Your load balancer or reverse proxy can reach the main n8n instance on port 5678.
- n8n has outbound internet access to reach the external services your workflows use. This doesn't apply if you run n8n in an air-gapped environment where workflows only call internal services.
- Users can reach the editor UI through your load balancer or reverse proxy, from their networks.
- Services that call your webhooks can reach the webhook URLs, on the internet if those callers are external.
- If you run more than one main instance, your load balancer uses sticky sessions. Refer to [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md#multi-main-setup).

Don't expose the n8n process directly to the internet. Put a reverse proxy or load balancer in front of it.

### DNS

Create a DNS record that points a hostname, such as `n8n.example.com`, at your load balancer or reverse proxy. You use this hostname in the `N8N_HOST`, `N8N_EDITOR_BASE_URL`, and `N8N_WEBHOOK_URL` environment variables. `N8N_HOST` takes the hostname (`n8n.example.com`). `N8N_EDITOR_BASE_URL` and `N8N_WEBHOOK_URL` take full URLs (`https://n8n.example.com/`). `N8N_WEBHOOK_URL` is available from n8n 2.30.0; on earlier versions, use `WEBHOOK_URL`.

Behind a reverse proxy, also set `N8N_PROXY_HOPS`, which controls whether n8n trusts forwarded headers for the client IP and protocol. Refer to [Configure webhook URLs with reverse proxy](../configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md) for how n8n builds webhook URLs behind a proxy and how to set `N8N_PROXY_HOPS`.

### TLS

Provision a TLS certificate for your hostname. n8n recommends terminating TLS at a reverse proxy or load balancer, which can also renew certificates if you configure it to. Refer to [Set up SSL](../configure-n8n/security/set-up-ssl.md) for how to set up SSL for n8n. On Kubernetes, [cert-manager](https://cert-manager.io/docs/) can issue and renew certificates.

## Software dependencies

Choose the subsection that matches how you deploy n8n.

### Docker

- A supported version of [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/).
- The Docker Compose v2 plugin, for the Compose-based setups.

Refer to [Install using Docker Compose](install-using-docker-compose.md) for installation steps.

### Kubernetes

- A Kubernetes version that the [official n8n Helm chart](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) supports. The chart declares its supported range in `Chart.yaml`.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/) configured with access to your cluster.
- [Helm](https://helm.sh/docs/intro/install/), for Helm-based deployments.
- A supported Ingress controller, such as the AWS Load Balancer Controller.

### Bare metal

{% hint style="info" %}
**Feature availability**

Bare metal installations with npm are available in n8n 2.x. From n8n 3.0, n8n no longer supports npm installations, so you need a Docker-based deployment. Refer to [v3.0 breaking changes](../../../changelog/v30-breaking-changes.md#docker-based-deployment-required-for-self-hosted-n8n).
{% endhint %}

- A supported Node.js version. Refer to [Install with npm](install-with-npm.md).
- npm, which comes with Node.js.
- A process manager, such as PM2 or `systemd`.
- A reverse proxy, such as NGINX or Caddy, for SSL termination.

## Pre-deployment checklist

Use this checklist for production deployments. Skip items that don't apply to your setup, such as Redis if you don't use queue mode, or external storage if you don't use it.

- [ ] [License key](../configure-n8n/manage-your-license.md) obtained and ready to activate, if you use Business or Enterprise features.
- [ ] [PostgreSQL](#database) provisioned and accessible, on a supported version.
- [ ] [Redis](#redis) provisioned and accessible (queue mode only).
- [ ] [External storage](#storage) bucket or container created, if you use external storage.
- [ ] [DNS record](#dns) pointing to your load balancer.
- [ ] [TLS certificate](#tls) provisioned, or cert-manager configured.
- [ ] [Firewall rules](#firewall-rules) configured.
- [ ] [Persistent volumes](#storage) available.
- [ ] [Encryption key](../configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key.md) generated, stored securely, and set to the same value on every n8n instance. Run `openssl rand -hex 32` to generate one.
- [ ] [Backup strategy](../keep-n8n-running/backup-and-restore.md) decided.

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
* [Choose n8n's database](../configure-n8n/choose-n8ns-database.md)
* [Enable queue mode](../configure-n8n/scaling/enable-queue-mode.md)
