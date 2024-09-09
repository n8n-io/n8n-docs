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
- A **WooCommerce URL**

To generate an API key and set up your credential:

1. Go to **WooCommerce > Settings > Advanced > Rest API > Add key**.
2. Select **Read/Write** from the **Permissions** dropdown.
3. Copy the generated **Consumer Key** and **Consumer Secret** and enter them into your n8n credentials.
4. Enter your WordPress site URL as the **WooCommerce URL**.
5. By default, n8n passes your credential details in the Authorization header. If you need to pass them as query string parameters instead, turn on **Include Credentials in Query**.

Refer to [Generate Keys](https://developer.woocommerce.com/docs/getting-started-with-the-woocommerce-rest-api/#3-generate-keys){:target=_blank .external-link} for more information.

## Resolve "Consumer key is missing" error

When you try to connect your credentials, you may receive an error like this: `Consumer key is missing`.

This occurs when the server can't parse the Authorization header details when authenticating over SSL.

To resolve it, turn on the **Include Credentials in Query** toggle to pass the consumer key/secret as query string parameters instead and retry the credential.
