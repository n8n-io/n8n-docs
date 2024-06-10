---
title: Stripe credentials
description: Documentation for Stripe credentials. Use these credentials to authenticate Stripe in n8n, a workflow automation platform.
contentType: integration
---

# Stripe credentials

You can use these credentials to authenticate the following nodes:

- [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger/)
- [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe/)

## Prerequisites

Create a [Stripe](https://stripe.com/){:target=_blank .external-link} account.

You must have either an admin or developer account.

## Supported authentication methods

- API key

## Related resources

Refer to [Stripe's API documentation](https://docs.stripe.com/api){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An API **Secret Key**: Choose whether to generate an API key in live mode or test mode. Refer to [Test mode and live mode](#test-mode-and-live-mode) for more information about the two modes.
    - For live mode: Go to your [Stripe dashboard](https://dashboard.stripe.com/apikeys){:target=_blank .external-link} to generate a Secret Key. 
    - For test mode: Go to your [Stripe test mode dashboard](https://dashboard.stripe.com/test/apikeys){:target=_blank .external-link} to generate a Secret Key.
    - Be sure you create a **Secret Key** and not a **Publishable Key**.

Refer to [Create a secret API key](https://docs.stripe.com/keys#create-api-secret-key){:target=_blank .external-link} for more detailed instructions.

## Test mode and live mode

All Stripe API requests happen within either [test mode](https://docs.stripe.com/test-mode) or live mode. Each mode has its own API key. 

Use test mode to access test data and live mode to access actual account data. Objects in one mode aren’t accessible to the other.

Refer to [API keys](https://docs.stripe.com/keys){:target=_blank .external-link} for more information about what's available in each mode and guidance on when to use which format.

/// note | n8n credentials for both modes
If you want to work with both live mode and test mode keys, store each mode's key in a separate n8n credential.
///


