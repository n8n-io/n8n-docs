---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Zammad credentials
description: Documentation for Zammad credentials. Use these credentials to authenticate Zammad in n8n, a workflow automation platform.
contentType: integration
---

# Zammad credentials

You can use these credentials to authenticate the following nodes:

- [Zammad](/integrations/builtin/app-nodes/n8n-nodes-base.zammad/)

## Prerequisites

- Create a hosted [Zammad](https://zammad.com/){:target=_blank .external-link} account or set up your own Zammad instance.
- For token authentication, enable **API Token Access** in **Settings > System > API**. Refer to [Setting up a Zammad](https://admin-docs.zammad.org/en/latest/system/integrations/zabbix.html?#setting-up-a-zammad){:target=_blank .external-link} for more information.

## Supported authentication methods

- Basic auth
- Token auth: Zammad recommends using this authentication method.

## Related resources

Refer to [Zammad's API Authentication documentation](https://docs.zammad.org/en/latest/api/intro.html?#authentication){:target=_blank .external-link} for more information about authenticating with the service.

## Using basic auth

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Email** address: Enter the email address you use to log in to Zammad.
- A **Password**: Enter your Zammad password.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

## Using token auth

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Access Token**: Once **API Token Access** is enabled for the Zammad instance, any user with the `user_preferences.access_token` permission can generate an **Access Token** by going to your **avatar > Profile > Token Access** and **Create** a new token.
    - The access token permissions depend on what actions you'd like to complete with this credential. For all functionality within the [Zammad](/integrations/builtin/app-nodes/n8n-nodes-base.zammad/) node, select:
        - `admin.group`
        - `admin.organization`
        - `admin.user`
        - `ticket.agent`
        - `ticket.customer`
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

