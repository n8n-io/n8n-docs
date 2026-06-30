---
title: tunnel
---
## n8n with tunnel <a href="#n8n-with-tunnel" id="n8n-with-tunnel"></a>

{% hint style="danger" %}
Use this for local development and testing. It isn't safe to use it in production.
{% endhint %}

{% hint style="warning" %}
**Development tooling**

The tunnel feature is a convenience tool for local development. The underlying implementation may change between n8n versions.
{% endhint %}

To use webhooks for trigger nodes of external services like GitHub, n8n has to be reachable from the web. n8n provides a tunnel service using [cloudflared](https://github.com/cloudflare/cloudflared) that redirects requests from the web to your local n8n instance. Docker must be installed for the tunnel to work.

There are two ways to use the tunnel, depending on how you run n8n:
