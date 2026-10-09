---
description: >-
  Monitor your Assistant credit balance, spend, top users, and top-up history
  in the n8n Cloud admin dashboard and the n8n Assistant panel.
layout:
  description:
    visible: false
---

# Track Assistant credit spend

The **Assistant credits** tab in the Cloud admin dashboard shows your [Assistant credit](README.md) balance, spend over time, top users, and top-up history. To open it, go to the [Cloud admin dashboard](../use-the-admin-dashboard.md) and select the **Assistant credits** tab.

You can also check your balance in the editor, from the n8n Assistant panel.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Balance

The balance card shows how many credits you have available, split into two parts:

- **Included**: how many of this month's included credits remain, and the date they reset.
- **Extra credits**: how many purchased extra credits remain. Extra credits carry over from month to month until they expire.

During a free trial, the card shows how much of your trial allowance remains.

A status label shows which credits n8n Assistant is using right now:

- **Within included**: n8n Assistant is using your included credits.
- **Using extra credits**: your included credits have run out, and n8n Assistant is using extra credits.
- **Paused — no extra credits**: you've used up both, and n8n Assistant stays paused until you top up or your included credits reset.

If you're the instance owner on a paid plan, you can top up from here. Refer to [Top up Assistant credits](top-up-assistant-credits.md) for details.

## Spend

The spend chart shows how many credits your instance used over the last 24 hours, 7 days, or 30 days. It splits usage into included credits and extra credits, so you can see how often you go past your monthly allowance.

If you use extra credits every month, compare the cost of topping up with the allowance on a higher plan. Refer to [n8n plans and pricing](https://n8n.io/pricing/).

## Top users

Everyone on your instance shares one Assistant credit balance. The top users card shows which users use the most credits, as a percentage of total usage, and groups everyone else under **Other users**.

## Top-up history

The top-up history lists the extra credits added to your balance, from both manual top-ups and auto top-ups. Each entry shows the amount, the date, and when those credits expire.

## Check your balance in the editor

In the editor, open the credits menu in the n8n Assistant panel to see:

- How many credits your instance has left. This number includes both included and extra credits.
- How many credits the current conversation has used so far.

When your balance drops to 10% or less, a banner above the chat input warns you that you're running low. You can dismiss the banner. It appears again the next time your balance crosses the threshold.

When your balance runs out, n8n Assistant shows **You've run out of AI credits**, and you can't send new messages. Refer to [When your Assistant credits run out](README.md#when-your-assistant-credits-run-out) for how to get more.

## Related resources

- [Assistant credits](README.md)
- [Top up Assistant credits](top-up-assistant-credits.md)
- [Track Gateway credit spend](../gateway-credits/track-gateway-credit-spend.md)
