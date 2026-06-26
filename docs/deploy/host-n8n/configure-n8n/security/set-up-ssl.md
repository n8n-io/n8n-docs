---
title: Set up SSL
description: Set up SSL for your self-hosted n8n instance.
contentType: howto
nodeTitle: Set up SSL
originalFilePath: hosting/securing/set-up-ssl.md
originalUrl: 'https://docs.n8n.io/hosting/securing/set-up-ssl'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/set-up-ssl'
layout:
  description:
    visible: false
---

# Set up SSL <a href="#set-up-ssl" id="set-up-ssl"></a>

There are two methods to support TLS/SSL in n8n.

## Use a reverse proxy (recommended) <a href="#use-a-reverse-proxy-recommended" id="use-a-reverse-proxy-recommended"></a>

Use a reverse proxy like [Traefik](https://doc.traefik.io/traefik/) or a Network Load Balancer (NLB) in front of the n8n instance. This should also take care of certificate renewals.

Refer to [Security | Data encryption](https://n8n.io/legal/#security) for more information.

## Pass certificates into n8n directly <a href="#pass-certificates-into-n8n-directly" id="pass-certificates-into-n8n-directly"></a>

You can also choose to pass certificates into n8n directly. To do so, set the `N8N_SSL_CERT` and `N8N_SSL_KEY` environment variables to point to your generated certificate and key file.

You'll need to make sure the certificate stays renewed and up to date.

Refer to [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md) for more information on these variables and [Configuration](../basic-configuration.md) for more information on setting environment variables.
