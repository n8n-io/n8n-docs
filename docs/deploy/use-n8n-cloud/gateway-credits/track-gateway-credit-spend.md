---
description: >-
  Monitor your Gateway credits balance, spend by model or workflow, and top-up
  history in the n8n Cloud admin dashboard.
layout:
  description:
    visible: false
---

# Track Gateway credit spend

The **Gateway credits** tab in the Cloud admin dashboard shows your balance, your spend over time, and your top-up history. To open it, go to the [Cloud admin dashboard](../use-the-admin-dashboard.md) and select the **Gateway credits** tab.

You can also see your current balance in the editor, next to the Gateway credits option on supported nodes.

## Balance

The balance card shows your remaining credit, including how much of your free sign-up credit is left. If you're on a paid plan, you can top up from here. Refer to [Top up Gateway credits](top-up-gateway-credits.md) for details.

## Spend

The spend chart shows how your credit usage breaks down over time. You can:

- Change the time range to see recent or longer-term usage.
- Group spend by model or service, to see which providers cost the most.
- Group spend by workflow, to see which of your workflows consume the most credit.

Grouping by workflow helps you find a workflow that's spending more than you expect, for example one that calls a model on a frequent schedule.

## Top-up history

The top-up history lists every credit added to your balance: your free sign-up credit, manual top-ups, and auto top-ups. Each entry shows the amount, the date, and when those credits expire. Refunded top-ups stay in the list, marked as refunded.

If your balance dipped below zero because n8n let in-flight requests finish, the overspent amount is deducted from your next top-up and shown here. Refer to [Overspend](top-up-gateway-credits.md#overspend) for details.

## Notifications

n8n emails the instance owner about balance changes:

- When your balance runs low, so you can top up before workflows stop.
- When your balance is empty.
- When an auto top-up adds credit, fails to charge your payment method, or pauses because it reached your monthly limit.

## When your balance runs out

When your balance reaches zero, nodes using Gateway credits fail until you add credit. Executions that don't use Gateway credits keep running as normal.

- On a paid plan, [top up your balance](top-up-gateway-credits.md) or set up auto top-up to avoid interruptions.
- On a free trial, top-ups aren't available: upgrade to a paid plan to add more credit.
- On any plan, you can switch the affected nodes to your own credentials. Refer to [Use Gateway credits](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/use-gateway-credits) for how to switch.

## Related resources

- [Gateway credits](README.md): how Gateway credits work.
- [Top up Gateway credits](top-up-gateway-credits.md): add credit manually or automatically.
- [Service pricing page](https://app.n8n.cloud/service-pricing): current rates for all supported services and models.
