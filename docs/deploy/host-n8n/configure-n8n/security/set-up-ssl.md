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

### Example NGINX configuration

The following NGINX configuration terminates TLS 1.2 and 1.3, redirects HTTP to HTTPS, sets the HTTP Strict Transport Security (HSTS) header, and passes WebSocket and forwarded-request headers to n8n. Replace `n8n.example.com` and the certificate paths with your own values.

```nginx
# Redirect all HTTP traffic to HTTPS
server {
	listen 80;
	server_name n8n.example.com;
	return 301 https://n8n.example.com$request_uri;
}

server {
	listen 443 ssl;
	server_name n8n.example.com;

	ssl_certificate /etc/letsencrypt/live/n8n.example.com/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/n8n.example.com/privkey.pem;
	ssl_protocols TLSv1.2 TLSv1.3;

	# Tell browsers to use HTTPS only. n8n sets this header itself only when n8n terminates TLS.
	add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

	location / {
		proxy_pass http://localhost:5678;
		proxy_http_version 1.1;

		# Needed for the editor's WebSocket connection
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";

		# Pass on information about the original request
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Don't add a `Content-Security-Policy` header at the proxy. A proxy-level policy applies to every route, so it can break features such as the hosted Chat Trigger, binary data previews, and form pages. To set a Content Security Policy, use the `N8N_CONTENT_SECURITY_POLICY` environment variable instead. Refer to [Security environment variables](../basic-configuration/use-environment-variables/security.md).

### Update n8n's URL settings

With a single reverse proxy in front of n8n, set `N8N_WEBHOOK_URL` to your public HTTPS URL, for example `https://n8n.example.com/`, and set `N8N_PROXY_HOPS=1`. If you don't update the webhook URL, n8n keeps showing and registering `http` webhook URLs, and existing webhooks registered with external services stop working. Refer to [Configure n8n webhooks with reverse proxy](../basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md) for details.

### Renew certificates automatically

An expired certificate stops browsers and webhook callers from connecting, and the failure can go unnoticed until a user reports it. Automate renewal with a tool such as Certbot, or [cert-manager](https://cert-manager.io/docs/) on Kubernetes, and monitor certificate expiry.

## Pass certificates into n8n directly <a href="#pass-certificates-into-n8n-directly" id="pass-certificates-into-n8n-directly"></a>

You can also choose to pass certificates into n8n directly. To do so, set the `N8N_SSL_CERT` and `N8N_SSL_KEY` environment variables to point to your generated certificate and key file.

You'll need to make sure the certificate stays renewed and up to date.

Refer to [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md) for more information on these variables and [Configuration](../basic-configuration.md) for more information on setting environment variables.

## Related resources

* [Security](../security.md)
