---
permalink: /credentials/wooCommerce
description: Learn to configure credentials for the WooCommerce node in n8n
---

# WooCommerce

You can use these credentials to authenticate the following nodes with WooCommerce.
- [WooCommerce](../../nodes-library/nodes/WooCommerce/README.md)
- [WooCommerce Trigger](../../nodes-library/trigger-nodes/WooCommerceTrigger/README.md)

## Prerequisites

Install the [WooCommerce](https://woocommerce.com/) plugin on your WordPress website.

## Using Access Token

1. Access your WordPress dashboard.
2. Select 'Settings' from the ***WooCommerce*** dropdown list.
3. Click on the ***Advanced*** tab.
4. Click on ***REST API***.
5. Click on the ***Create an API Key*** button.
6. Enter the necessary details.
7. Select 'Read/Write' from the ***Permissions*** dropdown list.
8. Click on the ***Generate API Key*** button.
9. Use your WooCommerce website URL, Consumer key & Consumer secret with your WooCommerce node credentials in n8n.

![Getting WooCommerce credentials](./using-access-token.gif)
