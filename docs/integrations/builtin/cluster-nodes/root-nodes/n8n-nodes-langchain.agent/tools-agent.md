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

??? Details "The Tools Agent can use the following tools..."
    * [Call n8n Workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/)
    * [Code](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode/)
    * [HTTP Request](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest/)
    * [Action Network](/integrations/builtin/app-nodes/n8n-nodes-base.actionNetwork/)
    * [ActiveCampaign](/integrations/builtin/app-nodes/n8n-nodes-base.activeCampaign/)
    * [Affinity](/integrations/builtin/app-nodes/n8n-nodes-base.affinity/)
    * [Agile CRM](/integrations/builtin/app-nodes/n8n-nodes-base.agileCrm/)
    * [Airtable](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/)
    * [APITemplate.io](/integrations/builtin/app-nodes/n8n-nodes-base.apiTemplateIo/)
    * [Asana](/integrations/builtin/app-nodes/n8n-nodes-base.asana/)
    * [AWS Lambda](/integrations/builtin/app-nodes/n8n-nodes-base.awsLambda/)
    * [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awsS3/)
    * [AWS SES](/integrations/builtin/app-nodes/n8n-nodes-base.awsSes/)
    * [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awsTextract/)
    * [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awsTranscribe/)
    * [Baserow](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/)
    * [Bubble](/integrations/builtin/app-nodes/n8n-nodes-base.bubble/)
    * [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator/)
    * [ClickUp](/integrations/builtin/app-nodes/n8n-nodes-base.clickUp/)
    * [CoinGecko](/integrations/builtin/app-nodes/n8n-nodes-base.coinGecko/)
    * [Compression](/integrations/builtin/app-nodes/n8n-nodes-base.compression/)
    * [Crypto](/integrations/builtin/app-nodes/n8n-nodes-base.crypto/)
    * [DeepL](/integrations/builtin/app-nodes/n8n-nodes-base.deepL/)
    * [DHL](/integrations/builtin/app-nodes/n8n-nodes-base.dhl/)
    * [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/)
    * [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/)
    * [E2E Test](/integrations/builtin/app-nodes/n8n-nodes-base.e2eTest/)
    * [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch/)
    * [ERPNext](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/)
    * [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookGraphApi/)
    * [FileMaker](/integrations/builtin/app-nodes/n8n-nodes-base.filemaker/)
    * [Ghost](/integrations/builtin/app-nodes/n8n-nodes-base.ghost/)
    * [Git](/integrations/builtin/app-nodes/n8n-nodes-base.git/)
    * [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/)
    * [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/)
    * [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/)
    * [Google Analytics](/integrations/builtin/app-nodes/n8n-nodes-base.googleAnalytics/)
    * [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googleBigQuery/)
    * [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)
    * [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googleChat/)
    * [Google Cloud Firestore](/integrations/builtin/app-nodes/n8n-nodes-base.googleFirebaseCloudFirestore/)
    * [Google Cloud Realtime Database](/integrations/builtin/app-nodes/n8n-nodes-base.googleFirebaseRealtimeDatabase/)
    * [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googleContacts/)
    * [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googledocs/)
    * [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/)
    * [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
    * [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleSlides/)
    * [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googleTasks/)
    * [Google Translate](/integrations/builtin/app-nodes/n8n-nodes-base.googleTranslate/)
    * [Google Workspace Admin](/integrations/builtin/app-nodes/n8n-nodes-base.gSuiteAdmin/)
    * [Gotify](/integrations/builtin/app-nodes/n8n-nodes-base.gotify/)
    * [Grafana](/integrations/builtin/app-nodes/n8n-nodes-base.grafana/)
    * [GraphQL](/integrations/builtin/app-nodes/n8n-nodes-base.graphql/)
    * [Hacker News](/integrations/builtin/app-nodes/n8n-nodes-base.hackernews/)
    * [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeAssistant/)
    * [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/)
    * [Jenkins](/integrations/builtin/app-nodes/n8n-nodes-base.jenkins/)
    * [Jira Software](/integrations/builtin/app-nodes/n8n-nodes-base.jira/)
    * [JWT](/integrations/builtin/app-nodes/n8n-nodes-base.jwt/)
    * [Kafka](/integrations/builtin/app-nodes/n8n-nodes-base.kafka/)
    * [LDAP](/integrations/builtin/app-nodes/n8n-nodes-base.ldap/)
    * [Line](/integrations/builtin/app-nodes/n8n-nodes-base.line/)
    * [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedIn/)
    * [Mailcheck](/integrations/builtin/app-nodes/n8n-nodes-base.mailcheck/)
    * [Mailgun](/integrations/builtin/app-nodes/n8n-nodes-base.mailgun/)
    * [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/)
    * [Mautic](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/)
    * [Medium](/integrations/builtin/app-nodes/n8n-nodes-base.medium/)
    * [Microsoft Excel 365](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftExcel/)
    * [Microsoft OneDrive](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/)
    * [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/)
    * [Microsoft SQL](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsql/)
    * [Microsoft Teams](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftTeams/)
    * [Microsoft To Do](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftToDo/)
    * [Monday.com](/integrations/builtin/app-nodes/n8n-nodes-base.mondayCom/)
    * [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/)
    * [MQTT](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt/)
    * [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)
    * [NASA](/integrations/builtin/app-nodes/n8n-nodes-base.nasa/)
    * [Nextcloud](/integrations/builtin/app-nodes/n8n-nodes-base.nextCloud/)
    * [NocoDB](/integrations/builtin/app-nodes/n8n-nodes-base.nocodb/)
    * [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
    * [Odoo](/integrations/builtin/app-nodes/n8n-nodes-base.odoo/)
    * [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openWeatherMap/)
    * [Pipedrive](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/)
    * [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
    * [Pushover](/integrations/builtin/app-nodes/n8n-nodes-base.pushover/)
    * [QuickBooks Online](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/)
    * [QuickChart](/integrations/builtin/app-nodes/n8n-nodes-base.quickChart/)
    * [RabbitMQ](/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq/)
    * [Reddit](/integrations/builtin/app-nodes/n8n-nodes-base.reddit/)
    * [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis/)
    * [RocketChat](/integrations/builtin/app-nodes/n8n-nodes-base.rocketchat/)
    * [S3](/integrations/builtin/app-nodes/n8n-nodes-base.s3/)
    * [Salesforce](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/)
    * [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail/)
    * [SendGrid](/integrations/builtin/app-nodes/n8n-nodes-base.sendGrid/)
    * [SerpApi (Google Search)](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi/)
    * [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/)
    * [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/)
    * [Spotify](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/)
    * [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe/)
    * [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
    * [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/)
    * [Todoist](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/)
    * [TOTP](/integrations/builtin/app-nodes/n8n-nodes-base.totp/)
    * [Trello](/integrations/builtin/app-nodes/n8n-nodes-base.trello/)
    * [Twilio](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/)
    * [urlscan.io](/integrations/builtin/app-nodes/n8n-nodes-base.urlScanIo/)
    * [Vector Store](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/)
    * [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow/)
    * [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia/)
    * [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha/)
    * [WooCommerce](/integrations/builtin/app-nodes/n8n-nodes-base.woocommerce/)
    * [Wordpress](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/)
    * [X (Formerly Twitter)](/integrations/builtin/app-nodes/n8n-nodes-base.twitter/)
    * [YouTube](/integrations/builtin/app-nodes/n8n-nodes-base.youTube/)
    * [Zendesk](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/)
    * [Zoho CRM](/integrations/builtin/app-nodes/n8n-nodes-base.zohoCrm/)
    * [Zoom](/integrations/builtin/app-nodes/n8n-nodes-base.zoom/)

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
