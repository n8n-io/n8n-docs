---
title: WordPress credentials
description: Documentation for WordPress credentials. Use these credentials to authenticate WordPress in n8n, a workflow automation platform.
contentType: integration
---

# WordPress credentials

You can use these credentials to authenticate the following nodes:

- [WordPress](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/)

## Prerequisites

- Create a [WordPress](https://wordpress.com/){:target=_blank .external-link} account or deploy WordPress on a server.
- [Enable two-factor authentication](https://wordpress.com/support/security/two-step-authentication/){:target=_blank .external-link} for your WordPress user account. (Required to create an app password.)

## Supported authentication methods

- Basic auth

## Related resources

Refer to [WordPress's API documentation](https://developer.wordpress.com/docs/api/){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- A **Username**: Enter your WordPress username.
- A **Password**: Do not enter your WordPress password. Instead, go to your **Profile > Security > Application Passwords** and add a new application password for n8n. Copy that password and enter it in your n8n credential. Refer to [Add a New Application Password](https://wordpress.com/support/security/two-step-authentication/application-specific-passwords/#add-a-new-application-password){:target=_blank .external-link} for more information.
- Your **WordPress URL**: Enter your WordPress site's URL.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.
