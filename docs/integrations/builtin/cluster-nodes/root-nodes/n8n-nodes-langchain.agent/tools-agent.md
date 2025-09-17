---
title: Tools AI Agent node documentation
description: Learn how to use the Tools Agent of the AI Agent node in n8n. Follow technical documentation to integrate the Tools Agent into your workflows.
contentType: [integration, reference]
priority: critical
---

# Tools AI Agent node

The Tools Agent uses external [tools](/glossary.md#ai-tool) and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. This agent helps integrate LLMs with various external services and databases.

This agent has an enhanced ability to work with tools and can ensure a standard output format.

The Tools Agent implements [Langchain's tool calling](https://js.langchain.com/docs/concepts/tool_calling/) interface. This interface describes available tools and their schemas. The agent also has improved output parsing capabilities, as it passes the parser to the model as a formatting tool.

Refer to [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) for more information on the AI Agent node itself.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

This agent supports the following chat models:

* [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md)
* [Groq Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq.md)
* [Mistral Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md)
* [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic.md)
* [Azure OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md)

??? Details "The Tools Agent can use the following tools..."
    * [Call n8n Workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md)
    * [Code](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md)
    * [HTTP Request](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest.md)
    * [Action Network](/integrations/builtin/app-nodes/n8n-nodes-base.actionnetwork.md)
    * [ActiveCampaign](/integrations/builtin/app-nodes/n8n-nodes-base.activecampaign.md)
    * [Affinity](/integrations/builtin/app-nodes/n8n-nodes-base.affinity.md)
    * [Agile CRM](/integrations/builtin/app-nodes/n8n-nodes-base.agilecrm.md)
    * [Airtable](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md)
    * [APITemplate.io](/integrations/builtin/app-nodes/n8n-nodes-base.apitemplateio.md)
    * [Asana](/integrations/builtin/app-nodes/n8n-nodes-base.asana.md)
    * [AWS Lambda](/integrations/builtin/app-nodes/n8n-nodes-base.awslambda.md)
    * [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awss3.md)
    * [AWS SES](/integrations/builtin/app-nodes/n8n-nodes-base.awsses.md)
    * [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awstextract.md)
    * [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe.md)
    * [Baserow](/integrations/builtin/app-nodes/n8n-nodes-base.baserow.md)
    * [Bubble](/integrations/builtin/app-nodes/n8n-nodes-base.bubble.md)
    * [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator.md)
    * [ClickUp](/integrations/builtin/app-nodes/n8n-nodes-base.clickup.md)
    * [CoinGecko](/integrations/builtin/app-nodes/n8n-nodes-base.coingecko.md)
    * [Compression](/integrations/builtin/core-nodes/n8n-nodes-base.compression.md)
    * [Crypto](/integrations/builtin/core-nodes/n8n-nodes-base.crypto.md)
    * [DeepL](/integrations/builtin/app-nodes/n8n-nodes-base.deepl.md)
    * [DHL](/integrations/builtin/app-nodes/n8n-nodes-base.dhl.md)
    * [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md)
    * [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox.md)
    * [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch.md)
    * [ERPNext](/integrations/builtin/app-nodes/n8n-nodes-base.erpnext.md)
    * [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi.md)
    * [FileMaker](/integrations/builtin/app-nodes/n8n-nodes-base.filemaker.md)
    * [Ghost](/integrations/builtin/app-nodes/n8n-nodes-base.ghost.md)
    * [Git](/integrations/builtin/core-nodes/n8n-nodes-base.git.md)
    * [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github.md)
    * [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab.md)
    * [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md)
    * [Google Analytics](/integrations/builtin/app-nodes/n8n-nodes-base.googleanalytics.md)
    * [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googlebigquery.md)
    * [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/index.md)
    * [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googlechat.md)
    * [Google Cloud Firestore](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudfirestore.md)
    * [Google Cloud Realtime Database](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudrealtimedatabase.md)
    * [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googlecontacts.md)
    * [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googledocs.md)
    * [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/index.md)
    * [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md)
    * [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleslides.md)
    * [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googletasks.md)
    * [Google Translate](/integrations/builtin/app-nodes/n8n-nodes-base.googletranslate.md)
    * [Google Workspace Admin](/integrations/builtin/app-nodes/n8n-nodes-base.gsuiteadmin.md)
    * [Gotify](/integrations/builtin/app-nodes/n8n-nodes-base.gotify.md)
    * [Grafana](/integrations/builtin/app-nodes/n8n-nodes-base.grafana.md)
    * [GraphQL](/integrations/builtin/core-nodes/n8n-nodes-base.graphql.md)
    * [Hacker News](/integrations/builtin/app-nodes/n8n-nodes-base.hackernews.md)
    * [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant.md)
    * [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot.md)
    * [Jenkins](/integrations/builtin/app-nodes/n8n-nodes-base.jenkins.md)
    * [Jira Software](/integrations/builtin/app-nodes/n8n-nodes-base.jira.md)
    * [JWT](/integrations/builtin/core-nodes/n8n-nodes-base.jwt.md)
    * [Kafka](/integrations/builtin/app-nodes/n8n-nodes-base.kafka.md)
    * [LDAP](/integrations/builtin/core-nodes/n8n-nodes-base.ldap.md)
    * [Line](/integrations/builtin/app-nodes/n8n-nodes-base.line.md)
    * [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedin.md)
    * [Mailcheck](/integrations/builtin/app-nodes/n8n-nodes-base.mailcheck.md)
    * [Mailgun](/integrations/builtin/app-nodes/n8n-nodes-base.mailgun.md)
    * [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost.md)
    * [Mautic](/integrations/builtin/app-nodes/n8n-nodes-base.mautic.md)
    * [Medium](/integrations/builtin/app-nodes/n8n-nodes-base.medium.md)
    * [Microsoft Excel 365](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel.md)
    * [Microsoft OneDrive](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive.md)
    * [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook.md)
    * [Microsoft SQL](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsql.md)
    * [Microsoft Teams](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams.md)
    * [Microsoft To Do](/integrations/builtin/app-nodes/n8n-nodes-base.microsofttodo.md)
    * [Monday.com](/integrations/builtin/app-nodes/n8n-nodes-base.mondaycom.md)
    * [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb.md)
    * [MQTT](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt.md)
    * [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/index.md)
    * [NASA](/integrations/builtin/app-nodes/n8n-nodes-base.nasa.md)
    * [Nextcloud](/integrations/builtin/app-nodes/n8n-nodes-base.nextcloud.md)
    * [NocoDB](/integrations/builtin/app-nodes/n8n-nodes-base.nocodb.md)
    * [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/index.md)
    * [Odoo](/integrations/builtin/app-nodes/n8n-nodes-base.odoo.md)
    * [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap.md)
    * [Pipedrive](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive.md)
    * [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md)
    * [Pushover](/integrations/builtin/app-nodes/n8n-nodes-base.pushover.md)
    * [QuickBooks Online](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks.md)
    * [QuickChart](/integrations/builtin/app-nodes/n8n-nodes-base.quickchart.md)
    * [RabbitMQ](/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq.md)
    * [Reddit](/integrations/builtin/app-nodes/n8n-nodes-base.reddit.md)
    * [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis.md)
    * [RocketChat](/integrations/builtin/app-nodes/n8n-nodes-base.rocketchat.md)
    * [S3](/integrations/builtin/app-nodes/n8n-nodes-base.s3.md)
    * [Salesforce](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce.md)
    * [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail.md)
    * [SendGrid](/integrations/builtin/app-nodes/n8n-nodes-base.sendgrid.md)
    * [SerpApi (Google Search)](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi.md)
    * [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify.md)
    * [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md)
    * [Spotify](/integrations/builtin/app-nodes/n8n-nodes-base.spotify.md)
    * [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe.md)
    * [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/index.md)
    * [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md)
    * [Todoist](/integrations/builtin/app-nodes/n8n-nodes-base.todoist.md)
    * [TOTP](/integrations/builtin/core-nodes/n8n-nodes-base.totp.md)
    * [Trello](/integrations/builtin/app-nodes/n8n-nodes-base.trello.md)
    * [Twilio](/integrations/builtin/app-nodes/n8n-nodes-base.twilio.md)
    * [urlscan.io](/integrations/builtin/app-nodes/n8n-nodes-base.urlscanio.md)
    * [Vector Store](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md)
    * [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow.md)
    * [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia.md)
    * [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha.md)
    * [WooCommerce](/integrations/builtin/app-nodes/n8n-nodes-base.woocommerce.md)
    * [Wordpress](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress.md)
    * [X (Formerly Twitter)](/integrations/builtin/app-nodes/n8n-nodes-base.twitter.md)
    * [YouTube](/integrations/builtin/app-nodes/n8n-nodes-base.youtube.md)
    * [Zendesk](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk.md)
    * [Zoho CRM](/integrations/builtin/app-nodes/n8n-nodes-base.zohocrm.md)
    * [Zoom](/integrations/builtin/app-nodes/n8n-nodes-base.zoom.md)

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

### Enable Streaming

When enabled, the AI Agent sends data back to the user in real-time as it generates the answer. This is useful for long-running generations. This is enabled by default.

/// info | Streaming requirements
For streaming to work, your workflow must use a trigger that supports streaming responses, such as the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) or [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md) node with **Response Mode** set to **Streaming**.
///

## Templates and examples

Refer to the main AI Agent node's [Templates and examples](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md#templates-and-examples) section.

## Dynamic parameters for tools with `$fromAI()`

To learn how to dynamically populate parameters for app node tools, refer to [Let AI specify tool parameters with `$fromAI()`](/advanced-ai/examples/using-the-fromai-function.md).

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues.md).


