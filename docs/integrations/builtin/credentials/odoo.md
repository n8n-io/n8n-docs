---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Odoo credentials
description: Documentation for Odoo credentials. Use these credentials to authenticate Odoo in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Odoo credentials

You can use these credentials to authenticate the following nodes:

- [Odoo](/integrations/builtin/app-nodes/n8n-nodes-base.odoo/)

## Prerequisites

Create an [Odoo](https://www.odoo.com/){:target=_blank .external-link} account, instance, and database.

Refer to the Odoo [Getting Started tutorial](https://www.odoo.com/slides/getting-started-15){:target=_blank .external-link} if you're new to Odoo.

/// note | Required plan type
Access to Odoo's external API is only available on **Custom** Odoo pricing plans. Refer to [Odoo Pricing Plans](https://www.odoo.com/pricing-plan){:target=_blank .external-link} for more information.
///

## Supported authentication methods

- API key or password

Odoo supports both formats, but some Odoo modules require an API key.

## Related resources

Refer to [Odoo's External API documentation](https://www.odoo.com/documentation/17.0/developer/reference/external_api.html){:target=_blank .external-link} for more information about the service.

## Using API key or password

To configure this credential, you'll need:

- Your **Site URL**: The domain of your Odoo instance.
- A **Username**: Your username as displayed on the user's **Change password** screen in Odoo.
- A **Password or API key**: You can use your user password or an API key. Odoo supports both formats, but some Odoo modules require an API key. To generate an API key, go to **Your Profile > Preferences > Account Security > Developer API Keys**. Refer to [Odoo API Keys](https://www.odoo.com/documentation/15.0/developer/reference/external_api.html?#api-keys){:target=_blank .external-link} for more information.
- A **Database name**: The name of the Odoo instance.

