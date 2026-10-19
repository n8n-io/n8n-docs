---
description: Check the database, operating system, runtime, storage, and software requirements for a production n8n deployment, and complete the pre-deployment checklist.
layout:
  description:
    visible: false
---

# Production requirements

Before you run a production n8n deployment that you manage yourself, confirm that your database, operating system, runtime, storage, and deployment tooling meet n8n's requirements.

{% hint style="info" %}
**Just getting started?** You don't need this page. [One-line setup](one-line-setup.md) only needs Docker and handles the database and storage for you. [Install using Docker Compose](install-using-docker-compose.md) starts with the built-in SQLite database, with PostgreSQL as an optional step. Use this page when you move to production, run your own PostgreSQL, use queue mode, or deploy to Kubernetes or bare metal.
{% endhint %}

## Database

This section applies when you run n8n in production. [One-line setup](one-line-setup.md) and the [Docker Compose](install-using-docker-compose.md) guide start with n8n's built-in SQLite database, which suits testing and small setups.

n8n needs a database to store workflows, credentials, and execution history.

- **PostgreSQL:** use PostgreSQL for production. n8n supports only actively maintained PostgreSQL versions. Refer to [Supported PostgreSQL versions](../configure-n8n/choose-n8ns-database.md#supported-postgresql-versions) for the current list.
- **SQLite:** n8n doesn't support SQLite in queue mode, and doesn't recommend it for multi-user production use.
- **Database user privileges:** the n8n database user needs `CREATE`, `SELECT`, `INSERT`, `UPDATE`, and `DELETE` privileges on the n8n schema.

Refer to [Choose n8n's database](../configure-n8n/choose-n8ns-database.md) for the environment variables that configure PostgreSQL.

## Operating system and runtime

- **Operating system:** n8n recommends a 64-bit Linux host. n8n supports macOS for development only.
- **Node.js:** you only need Node.js for [npm installations](install-with-npm.md). Docker and Kubernetes installations include the correct version. Refer to [Install with npm](install-with-npm.md) for the supported Node.js versions.

## Storage

[One-line setup](one-line-setup.md) and the [Docker Compose](install-using-docker-compose.md) guide store n8n's data in a Docker volume, so you don't need to set up storage for them. This section applies to production deployments and to deployments that [enable queue mode](../configure-n8n/scaling/enable-queue-mode.md), where you manage storage yourself.

For those deployments, plan for the following:

- **n8n data directory:** a persistent volume for the n8n data directory, which holds the encryption key, logs, and local binary data.
- **PostgreSQL data:** a persistent volume for PostgreSQL data.
- **Binary data in queue mode:** n8n doesn't support filesystem binary data storage in queue mode. Use database storage, or use S3-compatible object storage (such as AWS S3 or Cloudflare R2) if your license includes [external storage](../configure-n8n/scaling/use-external-storage.md). Refer to [Handle binary data](../configure-n8n/scaling/handle-binary-data.md) for details.

## Redis

This section applies only if you [enable queue mode](../configure-n8n/scaling/enable-queue-mode.md).

In queue mode, Redis holds the queue of pending executions between the main n8n instance and its workers. Redis doesn't store persistent data, so you don't need to back it up. Provision a Redis instance that the main instance and every worker can reach. Refer to [Start Redis](../configure-n8n/scaling/enable-queue-mode.md#start-redis) for the connection settings.

## Network

This section applies to production deployments that you expose to users or to external services.

### Ports

| Port | Component | Purpose |
| --- | --- | --- |
| 5678 | n8n | HTTP API, editor UI, and webhooks. This is the default value of `N8N_PORT`. |
| 5432 | PostgreSQL | Database connections. This is the PostgreSQL default. |
| 6379 | Redis | Queue communication in queue mode. This is the Redis default. |

### Firewall rules

At a minimum, configure your firewall so that:

- The main n8n instance and workers can reach PostgreSQL and, in queue mode, Redis.
- Your load balancer or reverse proxy can reach the main n8n instance on port 5678.
- n8n has outbound internet access to reach the external services your workflows use. The exception is an air-gapped environment that uses only custom nodes.
- Your load balancer or reverse proxy is reachable from the internet on port 443, or the port you expose, if you use webhooks.

Don't expose the n8n process directly to the internet. Put a reverse proxy or load balancer in front of it.

### DNS

Create a DNS record that points a hostname, such as `n8n.example.com`, at your load balancer or reverse proxy. You use this hostname in the `N8N_HOST`, `N8N_EDITOR_BASE_URL`, and `N8N_WEBHOOK_URL` environment variables. Refer to [Configure webhook URLs with reverse proxy](../configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md) for how n8n builds webhook URLs behind a proxy.

### TLS

Provision a TLS certificate for your hostname. n8n recommends terminating TLS at a reverse proxy or load balancer, which can also renew certificates for you. On Kubernetes, cert-manager can issue and renew certificates. Refer to [Set up SSL](../configure-n8n/security/set-up-ssl.md) for both options.

## Software dependencies

Choose the subsection that matches how you deploy n8n.

### Docker

- A supported version of [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/).
- The Docker Compose v2 plugin, for Compose-based setups. n8n doesn't support the older standalone `docker-compose` binary.

Refer to [Install with Docker](install-with-docker.md) and [Install using Docker Compose](install-using-docker-compose.md).

### Kubernetes

- A Kubernetes version that the [official n8n Helm chart](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n) supports. The chart declares its supported range in `Chart.yaml`.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/) configured with access to your cluster.
- [Helm](https://helm.sh/docs/intro/install/), for Helm-based deployments.
- A supported Ingress controller, such as NGINX Ingress or the AWS Load Balancer Controller.

### Bare metal

- A supported Node.js version. Refer to [Install with npm](install-with-npm.md).
- npm, which comes with Node.js.
- A process manager, such as PM2 or `systemd`.
- A reverse proxy, such as NGINX or Caddy, for SSL termination.

## Pre-deployment checklist

Use this checklist for production deployments. Skip items that don't apply to your setup, such as Redis and S3 if you don't use queue mode.

- [ ] License key obtained and ready to activate, if you use Business or Enterprise features. Refer to [Manage your license](../configure-n8n/manage-your-license.md).
- [ ] PostgreSQL provisioned and accessible, on a supported version. Refer to [Database](#database).
- [ ] Redis provisioned and accessible (queue mode only). Refer to [Redis](#redis).
- [ ] S3 bucket created (queue mode with external storage only). Refer to [Storage](#storage).
- [ ] DNS record pointing to your load balancer. Refer to [DNS](#dns).
- [ ] TLS certificate provisioned, or cert-manager configured. Refer to [TLS](#tls).
- [ ] Firewall rules configured. Refer to [Firewall rules](#firewall-rules).
- [ ] Persistent volumes available. Refer to [Storage](#storage).
- [ ] Encryption key generated and stored securely. Run `openssl rand -hex 32` to generate one. Refer to [Set a custom encryption key](../configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key.md).
- [ ] Backup strategy decided. Refer to [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
