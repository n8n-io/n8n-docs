---
description: Check the database, operating system, runtime, storage, and software requirements for self-hosting n8n, and complete the pre-deployment checklist.
layout:
  description:
    visible: false
---

# Prerequisites

Before you install self-hosted n8n, confirm that your database, operating system, runtime, storage, and deployment tooling meet n8n's requirements.

This page covers the requirements shared by all [install options](./). Each install guide lists any extra steps for its method.

## Database

n8n needs a database to store workflows, credentials, and execution history.

- **PostgreSQL:** use PostgreSQL for production. n8n supports only actively maintained PostgreSQL versions. Refer to [Supported PostgreSQL versions](../configure-n8n/choose-n8ns-database.md#supported-postgresql-versions) for the current list.
- **SQLite:** n8n doesn't support SQLite in queue mode, and doesn't recommend it for multi-user production use.
- **Database user privileges:** the n8n database user needs `CREATE`, `SELECT`, `INSERT`, `UPDATE`, and `DELETE` privileges on the n8n schema.

Refer to [Choose n8n's database](../configure-n8n/choose-n8ns-database.md) for the environment variables that configure PostgreSQL.

## Operating system and runtime

- **Operating system:** n8n recommends a 64-bit Linux host. n8n supports macOS for development only.
- **Node.js:** you only need Node.js for [npm installations](install-with-npm.md). Docker and Kubernetes installations include the correct version. Refer to [Install with npm](install-with-npm.md) for the supported Node.js versions.

## Storage

- **n8n data directory:** a persistent volume for the n8n data directory, which holds the encryption key, logs, and local binary data.
- **PostgreSQL data:** a persistent volume for PostgreSQL data.
- **Binary data in queue mode:** n8n doesn't support filesystem binary data storage in queue mode. Use database storage, or use S3-compatible object storage (such as AWS S3 or Cloudflare R2) if your license includes [external storage](../configure-n8n/scaling/use-external-storage.md). Refer to [Handle binary data](../configure-n8n/scaling/handle-binary-data.md) for details.

## Software dependencies

The software you need depends on how you deploy n8n.

### Docker

- Docker Engine 24 or later, or Docker Desktop 4 or later.
- Docker Compose v2 or later, for Compose-based setups.

Refer to [Install with Docker](install-with-docker.md) and [Install using Docker Compose](install-using-docker-compose.md).

### Kubernetes

- Kubernetes 1.27 or later.
- `kubectl` configured with access to your cluster.
- Helm 3.12 or later, for Helm-based deployments.
- The [official n8n Helm chart](https://github.com/n8n-io/n8n-hosting/tree/main/charts/n8n).
- A supported Ingress controller, such as NGINX Ingress or the AWS Load Balancer Controller.

### Bare metal

- A supported Node.js version. Refer to [Install with npm](install-with-npm.md).
- npm, which comes with Node.js.
- A process manager, such as PM2 or `systemd`.
- A reverse proxy, such as NGINX or Caddy, for SSL termination.

## Pre-deployment checklist

Before you deploy, check that you've completed each item that applies to your setup:

- [ ] Enterprise license key obtained. Refer to [Manage your license](../configure-n8n/manage-your-license.md).
- [ ] PostgreSQL provisioned and accessible, on a supported version.
- [ ] Redis provisioned and accessible (queue mode only).
- [ ] S3 bucket created (queue mode with external storage only).
- [ ] DNS record pointing to your load balancer.
- [ ] TLS certificate provisioned, or cert-manager configured.
- [ ] Firewall rules configured.
- [ ] Persistent volumes available.
- [ ] Encryption key generated and stored securely. Run `openssl rand -hex 32` to generate one. Refer to [Set a custom encryption key](../configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key.md).
- [ ] Backup strategy decided. Refer to [Back up and restore](../keep-n8n-running/backup-and-restore.md).

## Related resources

* [Install options](./)
* [One-line setup](one-line-setup.md)
* [Install using Docker Compose](install-using-docker-compose.md)
* [Install with npm](install-with-npm.md)
* [Install with Docker](install-with-docker.md)
* [Use a cloud provider](use-a-cloud-provider/README.md)
