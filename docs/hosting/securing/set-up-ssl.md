---
title: Set up SSL
description: "Set up SSL for your self-hosted n8n instance."
contentType: howto
---

# Set up SSL

There are two methods to support TLS/SSL in n8n.

## Use a reverse proxy (recommended)

Use a reverse proxy like [Traefik](https://doc.traefik.io/traefik/) or a Network Load Balancer (NLB) in front of the n8n instance. This should also take care of certificate renewals.

Refer to [Security | Data encryption](https://n8n.io/legal/#security) for more information.

## Pass certificates into n8n directly

You can also choose to pass certificates into n8n directly. To do so, set the `N8N_SSL_CERT` and `N8N_SSL_KEY` environment variables to point to your generated certificate and key file.

You'll need to make sure the certificate stays renewed and up to date.

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these variables and [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.
