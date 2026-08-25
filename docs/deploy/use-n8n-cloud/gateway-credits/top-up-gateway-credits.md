---
description: >-
  Add credit to your Gateway credits balance manually or with automatic top-ups
  in the n8n Cloud admin dashboard.
layout:
  description:
    visible: false
---

# Top up Gateway credits

When your [Gateway credits](README.md) balance runs low, top it up from the Cloud admin dashboard. You can add credit manually whenever you need it, or turn on automatic top-ups so n8n refills your balance for you.

Only the instance owner can top up, and topping up requires an active paid subscription. Free trials include Gateway credits, but not top-ups: if you use up your free credit during a trial, upgrade to a paid plan to add more.

## Top up manually

1. Open the [Cloud admin dashboard](../use-the-admin-dashboard.md) and go to **Manage** > **Gateway credits**.
1. Select **Add funds**.
1. Choose an amount and complete the checkout. You can pay with the payment method saved on your subscription or with a different one. n8n emails you an invoice.

Your new balance appears on the page once the payment completes.

## Set up automatic top-ups

Automatic top-ups refill your balance whenever it drops below a threshold you set, keeping it above zero so workflows that rely on Gateway credits keep running. Unlike manual top-ups, automatic top-ups always charge the payment method saved on your subscription.

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
- If a payment fails, n8n retries. If the retries also fail, n8n turns automatic top-ups off and emails you. Because automatic top-ups always charge the payment method saved on your subscription, fix that payment method before turning them back on.

## Refunds

Top-ups are final. n8n doesn't refund unused credits except where required by law. If you think a charge is wrong, [contact n8n support](https://www.n8n.io/contact). For expiry and forfeiture rules, refer to [Credit expiry and forfeiture](README.md#credit-expiry-and-forfeiture).

## Related resources

- [Gateway credits](README.md): how Gateway credits work.
- [Track Gateway credit spend](track-gateway-credit-spend.md): monitor your balance, spend, and top-up history.
- [Service pricing page](https://app.n8n.cloud/service-pricing): current rates for all supported services and models.
