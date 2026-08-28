---
description: >-
  Run AI models and third-party services in your n8n workflows with Gateway
  credits instead of setting up your own credentials.
layout:
  description:
    visible: false
---

# Use Gateway credits

Gateway credits let you run supported AI models and third-party services in your workflows without creating provider accounts or setting up [credentials](create-and-edit-credentials.md). n8n routes the requests through its own gateway and bills the usage from your instance's prepaid credit balance. For how billing works, refer to [Gateway credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits).

{% hint style="info" %}
**Feature availability**

Gateway credits are available on:

- **n8n Cloud:** Starter, Pro

They aren't available on n8n Cloud Enterprise or self-hosted n8n. Gateway credits are available from n8n 2.36.0.
{% endhint %}

## Use Gateway credits on a node

On a supported node, the credential field offers Gateway credits alongside your own credentials:

1. Open the node's settings.
1. In the credential field, select **Use Gateway credits**. The option shows your remaining balance.
1. Configure the rest of the node as usual, then run it.

That's the whole setup: no provider sign-up, no API key. n8n deducts the cost of each request from your balance at the rates on the [service pricing page](https://app.n8n.cloud/service-pricing).

To use your own account instead, select **Use my own credential** and pick or create a credential. You choose per node, so one workflow can mix Gateway credits on one node with your own credentials on another.

## Find supported nodes

The nodes panel highlights what you can run with Gateway credits:

- The **Included in n8n** section at the top of the AI model and tool lists shows supported nodes, with your remaining balance in the section header.
- Supported nodes show a credits tag in search results.

The tag and section header read either **Gateway credits** or **Free credits**, depending on whether you've already topped up.

The catalogue of supported services and models grows over time. For the current list, check the [service pricing page](https://app.n8n.cloud/service-pricing).

## Unsupported operations

Some nodes support Gateway credits for part of what they do. When you use Gateway credits on such a node, n8n hides the unsupported operations. If a node already has an unsupported operation selected when you switch it to Gateway credits, n8n keeps the operation and shows a warning instead. If you need an operation that isn't supported, switch that node to **Use my own credential**.

## When your balance runs out

Nodes using Gateway credits fail when your instance's balance reaches zero. The instance owner can [top up the balance](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits/top-up-gateway-credits) or set up auto top-up, and can [track spend by model or workflow](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits/track-gateway-credit-spend) in the Cloud admin dashboard. You can also switch the affected nodes to your own credentials at any time.

## Gateway credits versus your own API keys

Both approaches run the same nodes. The differences are in setup, billing, and coverage:

| | Gateway credits | Your own API keys |
|---|---|---|
| Setup | None: select and run | Create a provider account, generate a key, add a credential |
| Billing | One prepaid balance across all supported services, billed by n8n | Separate billing per provider, at your own rates and terms |
| Coverage | Supported services and models only | Any service or model n8n integrates with, including your own plan's rate limits and features |
| Spend visibility | One [spend view](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits/track-gateway-credit-spend) by model and workflow in n8n | Each provider's own dashboard |

You can switch a node between the two at any time without rebuilding the workflow.

## Control Gateway credits on your instance

Instance owners can turn Gateway credits off for everyone on the instance:

1. Open the [Cloud admin dashboard](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/use-the-admin-dashboard) and open **Workspace settings**.
1. Turn off **Enable Gateway credits**.
1. Save your workspace settings. The instance goes offline for one to two minutes while the new settings apply.

When it's off, the Gateway credits option doesn't appear on nodes for anyone on the instance.
