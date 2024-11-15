---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Tools AI Agent node documentation
description: Learn how to use the Tools Agent of the AI Agent node in n8n. Follow technical documentation to integrate the Tools Agent into your workflows.
contentType: integration
priority: critical
---

# Tools AI Agent node

The Tools Agent uses external tools and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. This agent helps integrate LLMs with various external services and databases.

This agent has an enhanced ability to work with tools and can ensure a standard output format.

The Tools Agent implements [Langchain's tool calling](https://js.langchain.com/docs/concepts/tool_calling/){:target=_blank .external-link} interface. This interface describes available tools and their schemas. The agent also has improved output parsing capabilities, as it passes the parser to the model as a formatting tool.

Refer to [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/) for more information on the AI Agent node itself.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

This agent supports the following chat models:

* [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/)
* [Groq Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq/)
* [Mistral Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud/)
* [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/)
* [Azure OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai/)

The Tools Agent can use the following tools:

* [Call n8n Workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/)
* [Code](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode/)
* [HTTP Request](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest/)
* [Airtable](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/)
* [Baserow](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/)
* [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator/)
* [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/)
* [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)
* [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googledocs/)
* [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/)
* [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
* [Hacker News](/integrations/builtin/app-nodes/n8n-nodes-base.hackernews/)
* [Jira Software](/integrations/builtin/app-nodes/n8n-nodes-base.jira/)
* [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/)
* [Microsoft SQL](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsql/)
* [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/)
* [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)
* [NocoDB](/integrations/builtin/app-nodes/n8n-nodes-base.nocodb/)
* [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
* [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
* [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis/)
* [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail/)
* [SerpApi (Google Search)](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi/)
* [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/)
* [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
* [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/)
* [Vector Store](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/)
* [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia/)
* [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha/)
* [WooCommerce](/integrations/builtin/app-nodes/n8n-nodes-base.woocommerce/)

## Node parameters

Configure the Tools Agent using the following parameters.

### Prompt

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/prompt.md"

### Require Specific Output Format

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/output-format.md"

## Node options

Refine the Tools Agent node's behavior using these options:

### System Message 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/system-message.md"

### Max Iterations

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/max-iterations.md"

### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

<!-- vale off -->
### Automatically Passthrough Binary Images
<!-- vale on -->

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/binary-images.md"

## Templates and examples

Refer to the main AI Agent node's [Templates and examples](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/#templates-and-examples) section.

## Dynamic parameters for tools with `$fromAI()`

To learn how to dynamically populate parameters for app node tools, refer to [Let AI specify tool parameters with `$fromAI()`](/advanced-ai/examples/using-the-fromai-function/).

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues/).

--8<-- "_glossary/ai-glossary.md"
