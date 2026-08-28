---
description: >-
  Use Gateway credits to run AI models and third-party services in your n8n
  workflows without provider accounts or API keys.
layout:
  description:
    visible: false
---

# Gateway credits

Gateway credits let you use supported AI models and third-party services in your workflows without creating provider accounts or managing API keys. Instead of setting up a credential, you select Gateway credits on a supported node, and n8n bills the usage from a prepaid credit balance.

{% hint style="info" %}
**Feature availability**

Gateway credits are available on:

- **n8n Cloud:** Starter, Pro

They aren't available on n8n Cloud Enterprise or self-hosted n8n. Gateway credits are available from n8n 2.36.0.
{% endhint %}

## How Gateway credits work

When you select **Use Gateway credits** on a supported node, n8n routes the node's requests through an n8n-managed gateway to the service provider. The gateway authenticates with the provider on n8n's behalf, so you don't need a provider account. n8n deducts the cost of each request from your credit balance.

n8n bills usage per request at the rates listed on the [service pricing page](https://app.n8n.cloud/service-pricing). Rates vary by model and service, and change as providers update their pricing, so the service pricing page is always the source of truth for current rates.

To learn how to select Gateway credits on a node and find supported nodes in the editor, see [Use Gateway credits](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/use-gateway-credits).

## Supported services

Gateway credits cover two categories of service:

- **AI models**: large language model providers such as OpenAI, Anthropic, and Google Gemini.
- **Tool services**: services for tasks like web search, web scraping, browser automation, and document parsing, such as Brave Search and Firecrawl.

The catalogue grows over time. For the current list of supported services and models, check the [service pricing page](https://app.n8n.cloud/service-pricing). In the editor, the **Included in n8n** section of the nodes panel shows the nodes you can use with Gateway credits.

Services that aren't in the catalogue still work in n8n the usual way: create a credential with your own API key. Refer to [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials) for details.

## Your credit balance

Each Cloud instance has one credit balance, shared by everyone who uses Gateway credits on that instance. You can see the balance in the editor next to the Gateway credits option on a node, and on the **Gateway credits** tab in the [Cloud admin dashboard](../use-the-admin-dashboard.md), which also shows your spend over time. Refer to [Track Gateway credit spend](track-gateway-credit-spend.md) for details.

New Cloud users receive a small amount of free credit at sign-up, so you can try supported services before you buy credits. Free trials include Gateway credits too: you can use them from your first workflow.

When your balance reaches zero, nodes using Gateway credits stop working until you add credit. Nodes using your own credentials aren't affected. If the balance runs out in the middle of an execution, n8n lets the in-flight requests finish rather than stopping them partway through, and deducts the difference from your next top-up. On a paid plan, you can [top up your balance](top-up-gateway-credits.md) manually or automatically. Topping up isn't available during a free trial, so if you use up your free credit while trialing, upgrade to a paid plan to add more.

### Credit expiry and forfeiture

- n8n uses free credits before top-up credits, and uses the credits that expire soonest first.
- Top-up credits expire 12 months after purchase.
- Credits aren't cash and you can't transfer them to another account.
- Top-ups are final. n8n doesn't refund unused credits except where required by law.
- If you close your n8n account, you forfeit any remaining credits. Canceling your subscription doesn't forfeit credits while your account still exists.

## Gateway credits and other credit types

n8n has more than one kind of credit. They have separate balances and pay for different things:

| Credit type | What it pays for | Where you see it |
|---|---|---|
| Gateway credits | AI models and tool services used by nodes in your workflows | On supported nodes, and on the **Gateway credits** tab in the Cloud admin dashboard |
| AI Assistant credits | Your usage of [n8n's AI Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/ai-assistant) and AI Workflow Builder | In the AI Assistant panel in the editor |
| Free OpenAI API credits | A legacy one-time OpenAI allowance for new Cloud users | Only on instances without Gateway credits |

Topping up Gateway credits doesn't add AI Assistant credits, and using the AI Assistant doesn't spend your Gateway credit balance.

## Data handling

When a node runs on Gateway credits, n8n sends the request through its gateway to the service provider under n8n's own provider account. The provider receives the content of the request, such as the prompt you send to a model or the text you send to a parser, but not your identity or n8n account details. For more on how n8n handles your data, refer to [Privacy](https://app.gitbook.com/s/ukPPOMQ6NId4gpAIkPXa/privacy) and n8n's terms of service.

## Related resources

- [Use Gateway credits](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/use-gateway-credits): select Gateway credits on a node and find supported nodes.
- [Top up Gateway credits](top-up-gateway-credits.md): add credit manually or automatically.
- [Track Gateway credit spend](track-gateway-credit-spend.md): monitor your balance, spend, and top-up history.
- [Service pricing page](https://app.n8n.cloud/service-pricing): current rates for all supported services and models.
