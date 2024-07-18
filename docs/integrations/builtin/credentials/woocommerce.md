---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: WooCommerce credentials
description: Documentation for WooCommerce credentials. Use these credentials to authenticate WooCommerce in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# WooCommerce credentials

You can use these credentials to authenticate the following nodes:

- [WooCommerce](/integrations/builtin/app-nodes/n8n-nodes-base.woocommerce/)
- [WooCommerce Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.woocommercetrigger/)

## Prerequisites

- Install the [WooCommerce](https://woocommerce.com/){:target=_blank .external-link} plugin on your WordPress website.
- In WordPress, go to **Settings > Permalinks** and set your WordPress permalinks to use something other than **Plain**.

## Supported authentication methods

- API key

## Related resources

Refer to [WooCommerce's REST API documentation](https://developer.woocommerce.com/docs/getting-started-with-the-woocommerce-rest-api/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- A **Consumer Key**: Created when you generate an API key.
- A **Consumer Secret**: Created when you generate an API key.
- A **WooCommerce URL**: Enter your WordPress site URL.
- **Include Credentials in Query**: If turned on, n8n includes your credentials as query string parameters instead of in the Authorization header.
    - Some servers may not parse the Authorization header and will display a "Consumer key is missing" error when authenticating over SSL. If you run into this error, turn this setting on to provide the consumer key/secret as query string parameters instead.

To generate an API key:

1. Go to **WooCommerce > Settings > Advanced > Rest API > Add key**.
2. Select **Read/Write** from the **Permissions** dropdown.
3. Copy the generated **Consumer Key** and **Consumer Secret** and enter them into your n8n credentials.

Refer to [Generate Keys](https://developer.woocommerce.com/docs/getting-started-with-the-woocommerce-rest-api/#3-generate-keys){:target=_blank .external-link} for more information.

