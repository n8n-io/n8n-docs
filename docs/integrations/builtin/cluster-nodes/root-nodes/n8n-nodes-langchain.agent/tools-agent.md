---
title: Tools AI Agent node documentation
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Tools AI Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent
description: >-
  Learn how to use the Tools Agent of the AI Agent node in n8n. Follow technical
  documentation to integrate the Tools Agent into your workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Tools Agent

The Tools Agent uses external tools[^1] and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. This agent helps integrate LLMs with various external services and databases.

This agent has an enhanced ability to work with tools and can ensure a standard output format.

The Tools Agent implements [Langchain's tool calling](https://js.langchain.com/docs/concepts/tool_calling/) interface. This interface describes available tools and their schemas. The agent also has improved output parsing capabilities, as it passes the parser to the model as a formatting tool.

Refer to [AI Agent](./) for more information on the AI Agent node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/cHtfs3gewkhPbGP31rjc/" %}

This agent supports the following chat models:

* [OpenAI Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatopenai/)
* [Groq Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatgroq.md)
* [Mistral Cloud Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md)
* [Anthropic Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatanthropic.md)
* [Azure OpenAI Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md)

<details>

<summary>The Tools Agent can use the following tools...</summary>

* [Call n8n Workflow](../../sub-nodes/n8n-nodes-langchain.toolworkflow.md)
* [Code](../../sub-nodes/n8n-nodes-langchain.toolcode.md)
* [HTTP Request](../../../core-nodes/n8n-nodes-base.httprequest/README.md)
* [Action Network](../../../app-nodes/n8n-nodes-base.actionnetwork.md)
* [ActiveCampaign](../../../app-nodes/n8n-nodes-base.activecampaign.md)
* [Affinity](../../../app-nodes/n8n-nodes-base.affinity.md)
* [Agile CRM](../../../app-nodes/n8n-nodes-base.agilecrm.md)
* [Airtable](../../../app-nodes/n8n-nodes-base.airtable/)
* [APITemplate.io](../../../app-nodes/n8n-nodes-base.apitemplateio.md)
* [Asana](../../../app-nodes/n8n-nodes-base.asana.md)
* [AWS Lambda](../../../app-nodes/n8n-nodes-base.awslambda.md)
* [AWS S3](../../../app-nodes/n8n-nodes-base.awss3.md)
* [AWS SES](../../../app-nodes/n8n-nodes-base.awsses.md)
* [AWS Textract](../../../app-nodes/n8n-nodes-base.awstextract.md)
* [AWS Transcribe](../../../app-nodes/n8n-nodes-base.awstranscribe.md)
* [Baserow](../../../app-nodes/n8n-nodes-base.baserow.md)
* [Bubble](../../../app-nodes/n8n-nodes-base.bubble.md)
* [Calculator](../../sub-nodes/n8n-nodes-langchain.toolcalculator.md)
* [ClickUp](../../../app-nodes/n8n-nodes-base.clickup.md)
* [CoinGecko](../../../app-nodes/n8n-nodes-base.coingecko.md)
* [Compression](../../../core-nodes/n8n-nodes-base.compression.md)
* [Crypto](../../../core-nodes/n8n-nodes-base.crypto.md)
* [DeepL](../../../app-nodes/n8n-nodes-base.deepl.md)
* [DHL](../../../app-nodes/n8n-nodes-base.dhl.md)
* [Discord](../../../app-nodes/n8n-nodes-base.discord/)
* [Dropbox](../../../app-nodes/n8n-nodes-base.dropbox.md)
* [Elasticsearch](../../../app-nodes/n8n-nodes-base.elasticsearch.md)
* [ERPNext](../../../app-nodes/n8n-nodes-base.erpnext.md)
* [Facebook Graph API](../../../app-nodes/n8n-nodes-base.facebookgraphapi.md)
* [FileMaker](../../../app-nodes/n8n-nodes-base.filemaker.md)
* [Ghost](../../../app-nodes/n8n-nodes-base.ghost.md)
* [Git](../../../core-nodes/n8n-nodes-base.git.md)
* [GitHub](../../../app-nodes/n8n-nodes-base.github.md)
* [GitLab](../../../app-nodes/n8n-nodes-base.gitlab.md)
* [Gmail](../../../app-nodes/n8n-nodes-base.gmail/)
* [Google Analytics](../../../app-nodes/n8n-nodes-base.googleanalytics.md)
* [Google BigQuery](../../../app-nodes/n8n-nodes-base.googlebigquery.md)
* [Google Calendar](../../../app-nodes/n8n-nodes-base.googlecalendar/)
* [Google Chat](../../../app-nodes/n8n-nodes-base.googlechat.md)
* [Google Cloud Firestore](../../../app-nodes/n8n-nodes-base.googlecloudfirestore.md)
* [Google Cloud Realtime Database](../../../app-nodes/n8n-nodes-base.googlecloudrealtimedatabase.md)
* [Google Contacts](../../../app-nodes/n8n-nodes-base.googlecontacts.md)
* [Google Docs](../../../app-nodes/n8n-nodes-base.googledocs.md)
* [Google Drive](../../../app-nodes/n8n-nodes-base.googledrive/)
* [Google Sheets](../../../app-nodes/n8n-nodes-base.googlesheets/)
* [Google Slides](../../../app-nodes/n8n-nodes-base.googleslides.md)
* [Google Tasks](../../../app-nodes/n8n-nodes-base.googletasks.md)
* [Google Translate](../../../app-nodes/n8n-nodes-base.googletranslate.md)
* [Google Workspace Admin](../../../app-nodes/n8n-nodes-base.gsuiteadmin.md)
* [Gotify](../../../app-nodes/n8n-nodes-base.gotify.md)
* [Grafana](../../../app-nodes/n8n-nodes-base.grafana.md)
* [GraphQL](../../../core-nodes/n8n-nodes-base.graphql.md)
* [Hacker News](../../../app-nodes/n8n-nodes-base.hackernews.md)
* [Home Assistant](../../../app-nodes/n8n-nodes-base.homeassistant.md)
* [HubSpot](../../../app-nodes/n8n-nodes-base.hubspot.md)
* [Jenkins](../../../app-nodes/n8n-nodes-base.jenkins.md)
* [Jira Software](../../../app-nodes/n8n-nodes-base.jira.md)
* [JWT](../../../core-nodes/n8n-nodes-base.jwt.md)
* [Kafka](../../../app-nodes/n8n-nodes-base.kafka.md)
* [LDAP](../../../core-nodes/n8n-nodes-base.ldap.md)
* [Line](../../../app-nodes/n8n-nodes-base.line.md)
* [LinkedIn](../../../app-nodes/n8n-nodes-base.linkedin.md)
* [Mailcheck](../../../app-nodes/n8n-nodes-base.mailcheck.md)
* [Mailgun](../../../app-nodes/n8n-nodes-base.mailgun.md)
* [Mattermost](../../../app-nodes/n8n-nodes-base.mattermost.md)
* [Mautic](../../../app-nodes/n8n-nodes-base.mautic.md)
* [Medium](../../../app-nodes/n8n-nodes-base.medium.md)
* [Microsoft Excel 365](../../../app-nodes/n8n-nodes-base.microsoftexcel.md)
* [Microsoft OneDrive](../../../app-nodes/n8n-nodes-base.microsoftonedrive.md)
* [Microsoft Outlook](../../../app-nodes/n8n-nodes-base.microsoftoutlook.md)
* [Microsoft SQL](../../../app-nodes/n8n-nodes-base.microsoftsql.md)
* [Microsoft Teams](../../../app-nodes/n8n-nodes-base.microsoftteams.md)
* [Microsoft To Do](../../../app-nodes/n8n-nodes-base.microsofttodo.md)
* [Monday.com](../../../app-nodes/n8n-nodes-base.mondaycom.md)
* [MongoDB](../../../app-nodes/n8n-nodes-base.mongodb.md)
* [MQTT](../../../app-nodes/n8n-nodes-base.mqtt.md)
* [MySQL](../../../app-nodes/n8n-nodes-base.mysql/)
* [NASA](../../../app-nodes/n8n-nodes-base.nasa.md)
* [Nextcloud](../../../app-nodes/n8n-nodes-base.nextcloud.md)
* [NocoDB](../../../app-nodes/n8n-nodes-base.nocodb.md)
* [Notion](../../../app-nodes/n8n-nodes-base.notion/)
* [Odoo](../../../app-nodes/n8n-nodes-base.odoo.md)
* [OpenWeatherMap](../../../app-nodes/n8n-nodes-base.openweathermap.md)
* [Pipedrive](../../../app-nodes/n8n-nodes-base.pipedrive.md)
* [Postgres](../../../app-nodes/n8n-nodes-base.postgres/)
* [Pushover](../../../app-nodes/n8n-nodes-base.pushover.md)
* [QuickBooks Online](../../../app-nodes/n8n-nodes-base.quickbooks.md)
* [QuickChart](../../../app-nodes/n8n-nodes-base.quickchart.md)
* [RabbitMQ](../../../app-nodes/n8n-nodes-base.rabbitmq.md)
* [Reddit](../../../app-nodes/n8n-nodes-base.reddit.md)
* [Redis](../../../app-nodes/n8n-nodes-base.redis.md)
* [RocketChat](../../../app-nodes/n8n-nodes-base.rocketchat.md)
* [S3](../../../app-nodes/n8n-nodes-base.s3.md)
* [Salesforce](../../../app-nodes/n8n-nodes-base.salesforce.md)
* [Send Email](../../../core-nodes/n8n-nodes-base.sendemail.md)
* [SendGrid](../../../app-nodes/n8n-nodes-base.sendgrid.md)
* [SerpApi (Google Search)](../../sub-nodes/n8n-nodes-langchain.toolserpapi.md)
* [Shopify](../../../app-nodes/n8n-nodes-base.shopify.md)
* [Slack](../../../app-nodes/n8n-nodes-base.slack.md)
* [Spotify](../../../app-nodes/n8n-nodes-base.spotify.md)
* [Stripe](../../../app-nodes/n8n-nodes-base.stripe.md)
* [Supabase](../../../app-nodes/n8n-nodes-base.supabase/)
* [Telegram](../../../app-nodes/n8n-nodes-base.telegram/)
* [Todoist](../../../app-nodes/n8n-nodes-base.todoist.md)
* [TOTP](../../../core-nodes/n8n-nodes-base.totp.md)
* [Trello](../../../app-nodes/n8n-nodes-base.trello.md)
* [Twilio](../../../app-nodes/n8n-nodes-base.twilio.md)
* [urlscan.io](../../../app-nodes/n8n-nodes-base.urlscanio.md)
* [Vector Store](../../sub-nodes/n8n-nodes-langchain.toolvectorstore.md)
* [Webflow](../../../app-nodes/n8n-nodes-base.webflow.md)
* [Wikipedia](../../sub-nodes/n8n-nodes-langchain.toolwikipedia.md)
* [Wolfram|Alpha](../../sub-nodes/n8n-nodes-langchain.toolwolframalpha.md)
* [WooCommerce](../../../app-nodes/n8n-nodes-base.woocommerce.md)
* [Wordpress](../../../app-nodes/n8n-nodes-base.wordpress.md)
* [X (Formerly Twitter)](../../../app-nodes/n8n-nodes-base.twitter.md)
* [YouTube](../../../app-nodes/n8n-nodes-base.youtube.md)
* [Zendesk](../../../app-nodes/n8n-nodes-base.zendesk.md)
* [Zoho CRM](../../../app-nodes/n8n-nodes-base.zohocrm.md)
* [Zoom](../../../app-nodes/n8n-nodes-base.zoom.md)

</details>

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the Tools Agent using the following parameters.

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ss9Y6clfLTwlXMx69w6E/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/IsHMhvgDA3Ok5qdqnHnJ/" %}

## Node options <a href="#node-options" id="node-options"></a>

Refine the Tools Agent node's behavior using these options:

### System Message <a href="#system-message" id="system-message"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ci5NMdJiVoyT9dtdTE9w/" %}

### Max Iterations <a href="#max-iterations" id="max-iterations"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8UflrA3Nx8LD5bKQn8Xc/" %}

### Return Intermediate Steps <a href="#return-intermediate-steps" id="return-intermediate-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/skA96E8hAnMMKG7c4Lta/" %}

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/GAsqtB1RVGEDrT5PMMLl/" %}

### Automatically Passthrough Binary Images <a href="#automatically-passthrough-binary-images" id="automatically-passthrough-binary-images"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2rKQZnqDH1pc3xlyYYdX/" %}

### Enable Streaming <a href="#enable-streaming" id="enable-streaming"></a>

When enabled, the AI Agent sends data back to the user in real-time as it generates the answer. This is useful for long-running generations. This is enabled by default.

{% hint style="info" %}
**Streaming requirements**

For streaming to work, your workflow must use a trigger that supports streaming responses, such as the [Chat Trigger](../../../core-nodes/n8n-nodes-base.compression/n8n-nodes-base.compression.md) or [Webhook](../../../core-nodes/n8n-nodes-base.webhook/) node with **Response Mode** set to **Streaming**.
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](./#templates-and-examples) section.

## Dynamic parameters for tools with `$fromAI()` <a href="#dynamic-parameters-for-tools-with-dollarfromai" id="dynamic-parameters-for-tools-with-dollarfromai"></a>

To learn how to dynamically populate parameters for app node tools, refer to [Let AI specify tool parameters with `$fromAI()`](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/use-ai-for-parameters).

## Human review for tool calls <a href="#human-review-for-tool-calls" id="human-review-for-tool-calls"></a>

You can require human approval before the AI Agent executes specific tools. This is useful for tools that perform sensitive actions like sending messages, modifying records, or deleting data.

To add a human review step:

1. Click the tool connector on the AI Agent node.
2. In the Tools Panel, find the **Human review** section.
3. Select your preferred approval channel (Chat, Slack, Telegram, and more) and configure it.
4. Connect the tools that require approval to the human review step.

When the AI wants to use a gated tool, the workflow pauses and sends an approval request through your chosen channel. The recipient can approve (tool executes) or deny (action canceled).

For detailed setup instructions and best practices, refer to [Human-in-the-loop for AI tool calls](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/human-in-the-loop-for-tools).

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).

[^1]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
