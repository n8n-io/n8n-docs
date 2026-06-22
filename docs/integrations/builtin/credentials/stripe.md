---
title: Stripe credentials
description: Documentation for Stripe credentials. Use these credentials to authenticate Stripe in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Stripe credentials

You can use these credentials to authenticate the following nodes:

- [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger.md)
- [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe.md)

## Supported authentication methods

- Secret key

n8n strongly recommends also setting a **Signature Secret** (sometimes called an endpoint secret), a unique key for each webhook endpoint. This allows the [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger.md) node to verify that incoming requests genuinely come from Stripe. For setup steps, refer to [Verify incoming requests](#verify-incoming-requests).

## Related resources

To configure this credential, you'll need a Stripe admin or developer account. Refer to [Stripe's API documentation](https://docs.stripe.com/api) for more information about the service.

Before you generate an API key, decide whether to generate it in live mode or test mode. Refer to [Test mode and live mode](#test-mode-and-live-mode) for more information about the two modes.

### Live mode Secret key

To generate a Secret key in live mode:

1. Open the [Stripe developer dashboard](https://dashboard.stripe.com/developers) and select [**API Keys**](https://dashboard.stripe.com/apikeys).
2. In the **Standard Keys** section, select **Create secret key**.
3. Enter a **Key name**, like `n8n integration`.
4. Select **Create**. The new API key displays.
4. Copy the key and enter it in your n8n credential as the **Secret Key**.

Refer to Stripe's [Create a secret API key](https://docs.stripe.com/keys#create-api-secret-key) for more information.

### Test mode Secret key

To use a Secret key in test mode, you must copy the existing one:

1. Go to your [Stripe test mode developer dashboard](https://dashboard.stripe.com/test/developers) and select [**API Keys**](https://dashboard.stripe.com/test/apikeys).
2. In the **Standard Keys** section, select **Reveal test key** for the **Secret key**.
3. Copy the key and enter it in your n8n credential as the **Secret Key**.

Refer to Stripe's [Create a secret API key](https://docs.stripe.com/keys#create-api-secret-key) for more information.

## Verify incoming requests

From n8n version 2.25.7 and 2.26.2, the [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger.md) node can verify that incoming webhook requests genuinely come from Stripe. n8n strongly recommends setting a **Signature Secret** so others can't send forged events to your workflow, even if they know your webhook URL.

n8n creates and manages the Stripe webhook endpoint for you when you activate a workflow, so you set the **Signature Secret** after the endpoint exists:

1. Build your workflow with the **Stripe Trigger** node and activate it. n8n creates a webhook endpoint in your Stripe account.
2. In the Stripe Dashboard, go to **Workbench** > **Webhooks**. In older dashboards, go to **Developers** > **Webhooks**.
3. Select the endpoint n8n created. You can identify it by the description `Created by n8n for workflow ID: <workflow-id>` and by the webhook URL, which matches your n8n production webhook URL.
4. Under **Signing secret**, select **Click to reveal** and copy the value. It starts with `whsec_`.
5. In n8n, open your Stripe credential, paste the value into the **Signature Secret** field, and save.

Stripe generates a unique signing secret for each endpoint, and a separate one for test mode and live mode. Copy the secret from the endpoint that matches the credential you're using. Refer to Stripe's [Webhooks documentation](https://docs.stripe.com/webhooks) for more information.

## Test mode and live mode

All Stripe API requests happen within either [test mode](https://docs.stripe.com/test-mode) or live mode. Each mode has its own API key. 

Use test mode to access simulated test data and live mode to access actual account data. Objects in one mode aren’t accessible to the other.

Refer to [API keys | Test mode versus live mode](https://docs.stripe.com/keys#test-live-modes) for more information about what's available in each mode and guidance on when to use each.

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
