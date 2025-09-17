---
contentType: howto
title: Use LangSmith with n8n
description: How to enable LangSmith for your self-hosted n8n instance.
---

# Use LangSmith with n8n

[LangSmith](https://www.langchain.com/langsmith) is a developer platform created by the LangChain team. You can connect your n8n instance to LangSmith to record and monitor runs in n8n, just as you can in a LangChain application.

/// info | Feature availability
Self-hosted n8n only.
///

## Connect your n8n instance to LangSmith

1. [Log in to LangSmith](https://smith.langchain.com/settings) and get your API key.
1. Set the LangSmith environment variables:

	| Variable | Value |
	| -------- | ----- |
	| LANGCHAIN_ENDPOINT | `"https://api.smith.langchain.com"` |
	| LANGCHAIN_TRACING_V2 | `true` |
	| LANGCHAIN_API_KEY | Set this to your API key |

	Set the variables so that they're available globally in the environment where you host your n8n instance. You can do this in the same way as the rest of your general configuration. These aren't n8n environment variables, so don't try to set them using the [n8n configuration file](/hosting/configuration/configuration-methods.md#set-environment-variables-using-a-file).

1. Restart n8n.

For information on using LangSmith, refer to [LangSmith's documentation](https://docs.smith.langchain.com/).
