---
description: >-
  Buy extra Assistant credits manually or with auto top-up in the n8n Cloud
  admin dashboard, so you can keep using n8n Assistant after your monthly
  allowance runs out.
layout:
  description:
    visible: false
---

# Top up Assistant credits

Your n8n Cloud plan includes a monthly allowance of [Assistant credits](README.md) that resets on the first day of every month. If you use up your included credits before the reset, top up with extra credits so you can keep using n8n Assistant. n8n Assistant only draws from extra credits after your included credits run out, and uses them at the same rate.

You can buy extra credits manually whenever you need them, or turn on auto top-up so n8n buys them for you.

Only the instance owner can top up, and topping up requires an active paid subscription. Free trials include a one-time allowance of Assistant credits, but not top-ups: if you use up your trial credits, upgrade to a paid plan to get more.

{% hint style="warning" %}
**Assistant credits only pay for n8n Assistant**

Extra Assistant credits only pay for your conversations with n8n Assistant. They don't pay for AI model calls that your workflows or agents make when they run. For those, [top up Gateway credits](../gateway-credits/top-up-gateway-credits.md) instead, or use your own provider credentials. Top-ups are final, so check which balance you're topping up before you pay.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Top up manually

1. Open the [Cloud admin dashboard](../use-the-admin-dashboard.md) and select the **Assistant credits** tab.
1. Select **Top up**.
1. Choose a credit package.
1. Read the credit terms and select the checkbox to accept them.
1. Select **Continue to checkout** and complete the payment. Taxes may apply depending on your billing country.

Your new extra credits appear on the page once the payment completes. They expire 12 months after purchase.

## Set up auto top-up

Auto top-up buys extra credits whenever your extra credit balance drops below a threshold you set. Use it if you rely on n8n Assistant every day and don't want it to pause when your included credits run out. Auto top-up always charges the payment method saved on your subscription.

1. Open the [Cloud admin dashboard](../use-the-admin-dashboard.md) and select the **Assistant credits** tab.
1. In the **Auto top-up extra credits** card, turn on auto top-up.
1. Set **When extra credits drop to** (the extra credit balance that triggers a top-up) and **Top up extra credits to** (the extra credit balance to refill to). The dashboard shows the minimum values you can set.
1. Optionally, set a **Monthly auto top-up limit** to cap how much auto top-up can charge per month. The limit is on by default.
1. Select **Save changes**, then confirm.

{% hint style="info" %}
Auto top-up only looks at your extra credits. Your included credits don't count toward the threshold, so auto top-up keeps a reserve of extra credits ready for when your included credits run out.
{% endhint %}

How auto top-up behaves:

- If you set a monthly limit, auto top-up pauses once it has charged that amount in the current calendar month (UTC), and resumes the next month.
- Auto top-up settings for Assistant credits are separate from auto top-up for [Gateway credits](../gateway-credits/top-up-gateway-credits.md). Turning one on doesn't turn on the other.

## Refunds

Top-ups are final. n8n doesn't refund unused credits except where required by law. If you think a charge is wrong, [contact n8n support](https://www.n8n.io/contact). For expiry and forfeiture rules, refer to [Credit expiry and forfeiture](README.md#credit-expiry-and-forfeiture).

## Related resources

- [Assistant credits](README.md)
- [Track Assistant credit spend](track-assistant-credit-spend.md)
- [Top up Gateway credits](../gateway-credits/top-up-gateway-credits.md)
