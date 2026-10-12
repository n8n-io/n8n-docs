---
description: >-
  Understand Assistant credits: the monthly allowance included in your n8n Cloud
  plan, extra credits, and how n8n bills your n8n Assistant usage.
layout:
  description:
    visible: false
---

# Assistant credits

Assistant credits pay for your usage of [n8n Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/n8n-assistant). Your n8n Cloud plan includes a monthly allowance of Assistant credits that resets on the first day of every month, so you can use n8n Assistant without buying anything. If you use up your allowance before it resets, you can buy extra credits to keep going until the next reset.

Assistant credits only pay for n8n Assistant. They don't pay for AI model calls that your workflows or agents make when they run, such as the model behind an AI Agent node. Those calls use [Gateway credits](../gateway-credits/README.md) or your own provider credentials.

## In this section

* [Top up Assistant credits](top-up-assistant-credits.md): buy extra credits manually or automatically.
* [Track Assistant credit spend](track-assistant-credit-spend.md): monitor your balance, spend, and top-up history.

{% hint style="info" %}
**Feature availability**

Assistant credits are available on:

- **n8n Cloud:** Starter, Pro

They aren't available on n8n Cloud Enterprise or self-hosted n8n. Free trials include a one-time allowance of Assistant credits.
{% endhint %}

## How Assistant credits work

n8n Assistant uses credits based on the tokens that the underlying AI model processes for each message. Longer conversations, larger workflows, and debugging sessions use more credits than short, focused requests. A message you stop partway through, or one that ends in an error, still uses credits for the work n8n Assistant did before it stopped.

Your Assistant credit balance has two parts:

- **Included credits**: the monthly allowance that comes with your plan. It resets on the first day of every month.
- **Extra credits**: credits you buy on top of your allowance. They carry over from month to month.

n8n Assistant always uses your included credits first. When they run out, it draws from your extra credits at the same rate, so n8n Assistant works the same way whichever credits it's using. If you haven't bought any extra credits, n8n Assistant pauses until your included credits reset.

This is the main difference from [Gateway credits](../gateway-credits/README.md), which are a single prepaid balance: with Gateway credits, you only have what you've bought. With Assistant credits, your plan tops you up every month, and extra credits are optional.

Running a workflow doesn't use Assistant credits, even if n8n Assistant built it. Only your conversations with n8n Assistant do.

## Included monthly allowance

The size of your monthly allowance depends on your plan. For the current allowance on each plan, refer to [n8n plans and pricing](https://n8n.io/pricing/).

How the allowance works:

- Included credits reset on the first day of every calendar month, at midnight UTC. The reset doesn't follow your billing date.
- Unused included credits don't roll over. Each reset replaces any credits left over with a fresh allowance.
- If you start a paid plan partway through a month, you get the full monthly allowance for that month, not a reduced one.
- If you upgrade, your included credits for the current month change to the new plan's full allowance straight away.
- If you downgrade, you keep the higher allowance until the next reset. The lower allowance applies from then on.
- If you cancel your subscription, your included credits stop when the cancellation takes effect.

### Assistant credits during a free trial

Free trials include a one-time allowance of Assistant credits instead of a monthly one. The trial allowance doesn't reset. Topping up isn't available during a free trial, so if you use up your trial credits, upgrade to a paid plan to keep using n8n Assistant. Refer to [Try free then choose a plan](../start-your-free-trial.md) for details.

## Extra credits

Extra credits let you keep using n8n Assistant after you've used up your included credits for the month. They're optional: if you never buy any, n8n Assistant pauses when your included credits run out and resumes at the next reset.

- n8n Assistant only draws from extra credits after your included credits run out.
- Extra credits cost the same number of credits per message as included credits. Nothing changes in how n8n Assistant works.
- Extra credits carry over from month to month until they expire, 12 months after purchase.
- Only the instance owner can buy extra credits, and buying them requires an active paid subscription.

You can buy extra credits manually or set up auto top-up so n8n buys them for you. Refer to [Top up Assistant credits](top-up-assistant-credits.md) for details.

## Your Assistant credit balance

Each Cloud instance has one Assistant credit balance, shared by everyone who uses n8n Assistant on that instance. Included and extra credits both come from this shared balance.

You can see the balance in the editor, in the credits menu of the n8n Assistant panel, and on the **Assistant credits** tab in the [Cloud admin dashboard](../use-the-admin-dashboard.md). The dashboard also shows your spend over time and which users use the most credits. Refer to [Track Assistant credit spend](track-assistant-credit-spend.md) for details.

## When your Assistant credits run out

When your included credits and your extra credits are both used up, n8n Assistant pauses for everyone on the instance:

- In the editor, n8n Assistant shows **You've run out of AI credits**, and you can't send new messages.
- On the **Assistant credits** tab in the Cloud admin dashboard, a banner shows **The Assistant is paused for your workspace**.

If your credits run out in the middle of a message, n8n lets that message finish rather than stopping it partway through. Your usage can go slightly past your balance as a result.

To start using n8n Assistant again:

- On a paid plan, the instance owner can [buy extra credits](top-up-assistant-credits.md), or you can wait for your included credits to reset on the first day of the next month.
- On a free trial, upgrade to a paid plan.

Your workflows aren't affected. Workflows keep running when your Assistant credits run out, because running a workflow doesn't use Assistant credits.

## Credit expiry and forfeiture

Assistant credits follow the same expiry and forfeiture rules as Gateway credits:

- n8n uses included credits before extra credits. Among extra credits, n8n uses the credits that expire soonest first.
- Included credits expire when your allowance resets on the first day of the next month.
- Extra credits expire 12 months after purchase.
- Credits aren't cash and you can't transfer them to another account.
- Top-ups are final. n8n doesn't refund unused credits except where required by law.
- If you close your n8n account, you forfeit any remaining credits. Canceling your subscription doesn't forfeit extra credits while your account still exists.

## Assistant credits and Gateway credits

Assistant credits and Gateway credits are separate balances that pay for different things:

| | Assistant credits | Gateway credits |
|---|---|---|
| What they pay for | Your conversations with n8n Assistant, including when it builds a workflow or agent for you | AI models and tool services used by nodes in your workflows |
| What they don't pay for | AI model calls that your workflows or agents make when they run | n8n Assistant |
| What your plan includes | A monthly allowance that resets on the first day of every month | A small one-time amount of free credit at sign-up |
| Buying more | Extra credits, used only after your included credits run out | Top-ups that add to your balance |
| Where you manage them | The **Assistant credits** tab in the Cloud admin dashboard | The **Gateway credits** tab in the Cloud admin dashboard |

Topping up one doesn't add to the other. If n8n Assistant builds a workflow with a node that uses Gateway credits, running that node spends Gateway credits, not Assistant credits.

## n8n Assistant on self-hosted n8n

Self-hosted n8n doesn't use Assistant credits. On a self-hosted instance, n8n Assistant runs on AI models from your own provider account, which bills you directly. Refer to [Set up n8n Assistant](../../host-n8n/configure-n8n/set-up-n8n-assistant.md) for details.

## Related resources

- [Use n8n Cloud](../)
- [Try free then choose a plan](../start-your-free-trial.md)
- [Use the admin dashboard](../use-the-admin-dashboard.md)
- [Update your version](../update-your-version.md)
- [Configure Cloud](../configure-cloud/README.md)
- [Gateway credits](../gateway-credits/README.md)
- [Understand concurrency](../understand-concurrency.md)
- [Download workflows](../download-workflows.md)
- [Use n8n Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/n8n-assistant)
- [n8n plans and pricing](https://n8n.io/pricing/)
