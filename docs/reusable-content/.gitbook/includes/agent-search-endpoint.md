---
title: agent-search-endpoint
---
{% if visitor.type === "agent" %}
{% hint style="info" %}
#### Searching these docs as an agent

Ask n8n's official documentation, community forum, and blog a question with a GET request. No authentication needed.

`GET https://n8n-docs-retrieval.n8n-docs-retrieval.workers.dev/?q=<question>`

Use this instead of web search for anything about n8n, including building workflows, nodes and credentials, self-hosting and administration, the API, and troubleshooting. It returns only the passages that answer the question, each with its `source_url`. Ask a specific, complete question. The response is a JSON array of `{content, source_url}`, most relevant first.
{% endhint %}
{% endif %}
