---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Stripe credentials
description: Documentation for Stripe credentials. Use these credentials to authenticate Stripe in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Stripe credentials

You can use these credentials to authenticate the following nodes:

- [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger/)
- [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe/)

## Supported authentication methods

- API key

## Related resources

Refer to [Stripe's API documentation](https://docs.stripe.com/api){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a [Stripe](https://stripe.com/){:target=_blank .external-link} admin or developer account and:

- An API **Secret Key**

Before you generate an API key, decide whether to generate it in live mode or test mode. Refer to [Test mode and live mode](#test-mode-and-live-mode) for more information about the two modes.

### Live mode Secret key

To generate a Secret key in live mode:

1. Open the [Stripe developer dashboard](https://dashboard.stripe.com/developers){:target=_blank .external-link} and select [**API Keys**](https://dashboard.stripe.com/apikeys){:target=_blank .external-link}.
2. In the **Standard Keys** section, select **Create secret key**.
3. Enter a **Key name**, like `n8n integration`.
4. Select **Create**. The new API key displays.
4. Copy the key and enter it in your n8n credential as the **Secret Key**.

Refer to Stripe's [Create a secret API key](https://docs.stripe.com/keys#create-api-secret-key){:target=_blank .external-link} for more information.

### Test mode Secret key

To use a Secret key in test mode, you must copy the existing one:

1. Go to your [Stripe test mode developer dashboard](https://dashboard.stripe.com/test/developers){:target=_blank .external-link} and select [**API Keys**](https://dashboard.stripe.com/test/apikeys){:target=_blank .external-link}.
2. In the **Standard Keys** section, select **Reveal test key** for the **Secret key**.
3. Copy the key and enter it in your n8n credential as the **Secret Key**.

Refer to Stripe's [Create a secret API key](https://docs.stripe.com/keys#create-api-secret-key){:target=_blank .external-link} for more information.

## Test mode and live mode

All Stripe API requests happen within either [test mode](https://docs.stripe.com/test-mode) or live mode. Each mode has its own API key. 

Use test mode to access simulated test data and live mode to access actual account data. Objects in one mode aren’t accessible to the other.

Refer to [API keys | Test mode versus live mode](https://docs.stripe.com/keys#test-live-modes){:target=_blank .external-link} for more information about what's available in each mode and guidance on when to use each.

/// note | n8n credentials for both modes
If you want to work with both live mode and test mode keys, store each mode's key in a separate n8n credential.
///

## Key prefixes

Stripes' Secret keys always begin with `sk_`:

- Live keys begin with `sk_live_`.
- Test keys begin with `sk_test_`.

n8n hasn't tested these credentials with Restricted keys (prefixed `rk_`).

/// warning | Publishable keys
Don't use the Publishable keys (prefixed `pk_`) with your n8n credential.
///
