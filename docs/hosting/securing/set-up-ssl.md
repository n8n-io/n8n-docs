---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: "Set up SSL for your self-hosted n8n instance."
contentType: howto
---

# Set up SSL

<!-- TODO: Not sure if these are actually appropriate steps, have someone review. Should this branch wait for Jon's CA/Self-signed cert branch https://github.com/n8n-io/n8n-docs/pull/2213 and link to that, too? -->

To enable the `https:` protocol in your instance, provide an SSL key and certificate.

## Add the SSL key

To set the SSL key, add the key as a string to the `N8N_SSL_KEY` environment variable.

## Add the SSL certificate

To set the SSL certificate, add the certificate as a string to the `N8N_SSL_CERT` environment variable.

## Related resources

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment/) for more information on these environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods/) for more information on setting environment variables.
