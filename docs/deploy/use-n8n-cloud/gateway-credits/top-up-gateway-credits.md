---
description: >-
  Add credit to your Gateway credits balance manually or with automatic top-ups
  in the n8n Cloud admin dashboard.
layout:
  description:
    visible: false
---

# Top up Gateway credits

When your [Gateway credits](./) balance runs low, top it up from the Cloud admin dashboard. You can add credit manually whenever you need it, or turn on automatic top-ups so n8n refills your balance for you.

Only the instance owner can top up, and topping up requires an active paid subscription. During a free trial, you can't top up: upgrade to a paid plan to keep using Gateway credits after your free credit runs out.

## Top up manually

1. Open the [Cloud admin dashboard](../use-the-admin-dashboard.md) and go to **Manage** > **Gateway credits**.
1. Select **Add funds**.
1. Choose an amount and complete the checkout. n8n charges the payment method on your subscription and emails you an invoice.

Your new balance appears on the page once the payment completes.

## Set up automatic top-ups

Automatic top-ups refill your balance whenever it drops below a threshold you set, so workflows that rely on Gateway credits don't stop when the balance runs out.

1. Open the [Cloud admin dashboard](../use-the-admin-dashboard.md) and go to **Manage** > **Gateway credits**.
1. Turn on automatic top-ups.
1. Set the balance threshold that triggers a top-up, and the balance to refill to.
1. Optionally, set a monthly limit on how much automatic top-ups can add.
1. Save your settings.

{% hint style="info" %}
If your balance is already below the threshold when you save, n8n triggers a one-time top-up straight away to reach your target balance. The page shows the estimated cost before you save.
{% endhint %}

How automatic top-ups behave:

- n8n emails you an invoice each time an automatic top-up adds credit.
- If you set a monthly limit, automatic top-ups pause once they add that amount in the current month, and resume the next month.
- If a payment fails, n8n retries. If the retries also fail, n8n turns automatic top-ups off and emails you, so check your payment method before turning them back on.

## Credit expiry and refunds

- Top-up credits expire 12 months after purchase. n8n uses free credits before top-up credits, and uses the credits that expire soonest first.
- Top-ups are final. n8n doesn't refund unused credits except where required by law. If you think a charge is wrong, [contact n8n support](https://www.n8n.io/contact).
- If you close your n8n account, you forfeit any remaining credits. Canceling your subscription doesn't forfeit credits while your account still exists.

## Related resources

- [Gateway credits](./): how Gateway credits work.
- [Track Gateway credit spend](track-gateway-credit-spend.md): monitor your balance, spend, and top-up history.
- [Service pricing page](https://app.n8n.cloud/service-pricing): current rates for all supported services and models.
