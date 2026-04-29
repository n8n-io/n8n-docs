---
contentType: reference
---

# Deprecated and versioned nodes

n8n improves its node library over time. This page lists removed nodes (fully removed), deprecated nodes (retired but still functional), and versioned nodes (active with multiple versions available).

## Deprecated nodes

n8n won't release further updates or bug fixes for deprecated nodes. Existing workflows that use them continue to run, but you should migrate to a supported alternative.

/// note | Migrate deprecated nodes
Replace deprecated nodes in your workflows before n8n removes them in a future release.
///

| Node | Final node version |
|------|:-----------------:|
| Binary Input Loader | 1 |
| Chat Messages Retriever | 1 |
| Convert to/from binary data | 1.1 |
| Cron | 1 |
| Embedding Dimensions | 1 |
| Function | 1 |
| Function Item | 1 |
| GitHub Document Loader | 1.1 |
| HTML Extract | 1 |
| HTTP Request Tool | 1.1 |
| iCalendar | 1 |
| In Memory Vector Store Insert | 1 |
| In Memory Vector Store Load | 1 |
| Interval | 1 |
| JSON Input Loader | 1 |
| Manual Chat Trigger | 1.1 |
| Motorhead | 1.4 |
| OpenAI Assistant | 1.1 |
| OpenAI Model | 1 |
| Options | 1 |
| Orbit | 1 |
| Pinecone: Insert | 1 |
| Pinecone: Load | 1 |
| Read Binary File | 1 |
| Read Binary Files | 1 |
| Read PDF | 1 |
| SerpApi (Google Search) | 1 |
| Simulate | 1 |
| Simulate Trigger | 1 |
| Supabase: Insert | 1 |
| Supabase: Load | 1 |
| Tool Executor | 1 |
| Workflow Trigger | 1 |
| Write Binary File | 1 |
| Zep | 1.4 |
| Zep Vector Store: Insert | 1 |
| Zep Vector Store: Load | 1 |

## Removed nodes

n8n removes nodes when the external service they connect to is no longer available. Workflows that use a removed node will fail.

/// warning | Update or remove affected workflows
If your workflows use any of these nodes, update them to use an alternative or remove them to avoid errors.
///

| Node | n8n version |
|------|:-----------:|
| Automizy | 2.0 |
| crowd.dev | 2.0 |
| Kitemaker | 2.0 |
| Spontit | 2.0 |

## Versioned nodes

When n8n makes significant improvements to a node, n8n releases a new default version and keeps older versions available. Existing workflows using an older version continue to work unchanged.

Always use the current version in new workflows to get the latest features and bug fixes.

| Node | Current node version | Previous node versions |
|------|:--------------------:|:-----------------------|
| AI Agent | 3.1 | 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 3 |
| AI Agent Tool | 3 | 2.2 |
| Airtable | 2.2 | 1, 2, 2.1 |
| Airtop | 1.1 | 1 |
| Anthropic Chat Model | 1.4 | 1, 1.1, 1.2, 1.3 |
| AWS Bedrock Chat Model | 1.1 | 1 |
| AwsS3 | 2 | 1 |
| Baserow | 1.1 | 1 |
| Basic LLM Chain | 1.9 | 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8 |
| Bitbucket Trigger | 1.1 | 1 |
| Cal.com Trigger | 2 | 1 |
| Call n8n Sub-Workflow Tool | 2.2 | 1, 1.1, 1.2, 1.3, 2, 2.1 |
| Chat | 1.3 | 1, 1.1, 1.2 |
| Chat Memory Manager | 1.1 | 1 |
| Chat Trigger | 1.4 | 1, 1.1, 1.2, 1.3 |
| Coda | 1.1 | 1 |
| Code | 2 | 1 |
| Code Tool | 1.3 | 1, 1.1, 1.2 |
| Compare Datasets | 2.3 | 1, 2, 2.1, 2.2 |
| Compression | 1.1 | 1 |
| Convert to File | 1.1 | 1 |
| Crypto | 2 | 1 |
| Data table | 1.1 | 1 |
| Date & Time | 2 | 1 |
| Default Data Loader | 1.1 | 1 |
| Discord | 2 | 1 |
| Email Trigger (IMAP) | 2.1 | 1, 2 |
| Embeddings OpenAI | 1.2 | 1, 1.1 |
| Execute Sub-workflow | 1.3 | 1, 1.1, 1.2 |
| Execute Workflow Trigger | 1.1 | 1 |
| Execution Data | 1.1 | 1 |
| Extract from File | 1.1 | 1 |
| Filter | 2.3 | 1, 2, 2.1, 2.2 |
| Git | 1.1 | 1 |
| GitHub | 1.1 | 1 |
| Gmail | 2.2 | 1, 2, 2.1 |
| Gmail Trigger | 1.4 | 1, 1.1, 1.2, 1.3 |
| Google Analytics | 2 | 1 |
| Google BigQuery | 2.1 | 1, 2 |
| Google Books | 2 | 1 |
| Google Calendar | 1.3 | 1, 1.1, 1.2 |
| Google Cloud Firestore | 1.1 | 1 |
| Google Docs | 2 | 1 |
| Google Drive | 3 | 1, 2 |
| Google Gemini Chat Model | 1.1 | 1 |
| Google Sheets | 4.7 | 1, 2, 3, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6 |
| Google Slides | 2 | 1 |
| Google Translate | 2 | 1 |
| GraphQL | 1.1 | 1 |
| Guardrails | 2 | 1 |
| HighLevel | 2 | 1 |
| HTML | 1.2 | 1, 1.1 |
| HTTP Request | 4.4 | 1, 2, 3, 4, 4.1, 4.2, 4.3 |
| HubSpot | 2.2 | 1, 2, 2.1 |
| If | 2.3 | 1, 2, 2.1, 2.2 |
| Information Extractor | 1.2 | 1, 1.1 |
| Invoice Ninja | 2 | 1 |
| Invoice Ninja Trigger | 2 | 1 |
| Item Lists | 3.1 | 1, 2, 2.1, 2.2, 3 |
| Jira Trigger | 1.1 | 1 |
| Kafka Trigger | 1.3 | 1, 1.1, 1.2 |
| Lemlist | 2 | 1 |
| Linear | 1.1 | 1 |
| MailerLite | 2 | 1 |
| MailerLite Trigger | 2 | 1 |
| MCP Client Tool | 1.2 | 1, 1.1 |
| MCP Server Trigger | 2 | 1, 1.1 |
| Merge | 3.2 | 1, 2, 2.1, 3, 3.1 |
| Microsoft Agent 365 Trigger | 1.1 | 1 |
| Microsoft Excel 365 | 2.2 | 1, 2, 2.1 |
| Microsoft OneDrive | 1.1 | 1 |
| Microsoft Outlook | 2 | 1 |
| Microsoft SQL | 1.1 | 1 |
| Microsoft Teams | 2 | 1, 1.1 |
| Mindee | 3 | 1, 2 |
| MongoDB | 1.2 | 1, 1.1 |
| MongoDB Chat Memory | 1.1 | 1 |
| Moonshot Kimi Chat Model | 1.1 | 1 |
| MySQL | 2.5 | 1, 2, 2.1, 2.2, 2.3, 2.4 |
| n8n Form | 2.5 | 1, 2.3, 2.4 |
| n8n Form Trigger | 2.5 | 1, 2, 2.1, 2.2, 2.3, 2.4 |
| NocoDB | 3 | 1, 2 |
| Notion | 2.2 | 1, 2, 2.1 |
| OpenAI | 2.3 | 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2, 2.1, 2.2 |
| OpenAI Chat Model | 1.3 | 1, 1.1, 1.2 |
| Perplexity | 2 | 1 |
| Pipedrive | 2 | 1 |
| Pipedrive Trigger | 1.1 | 1 |
| Postgres | 2.6 | 1, 2, 2.1, 2.2, 2.3, 2.4, 2.5 |
| Postgres Chat Memory | 1.4 | 1, 1.1, 1.2, 1.3 |
| Question and Answer Chain | 1.7 | 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 |
| RabbitMQ | 1.1 | 1 |
| Read/Write Files from Disk | 1.1 | 1 |
| Redis Chat Memory | 1.6 | 1, 1.1, 1.2, 1.3, 1.4, 1.5 |
| Remove Duplicates | 2 | 1, 1.1 |
| Respond to Webhook | 1.5 | 1, 1.1, 1.2, 1.3, 1.4 |
| RSS Read | 1.2 | 1, 1.1 |
| Schedule Trigger | 1.3 | 1, 1.1, 1.2 |
| SeaTable | 2 | 1 |
| SeaTable Trigger | 2 | 1 |
| Send Email | 2.1 | 1, 2 |
| Sentiment Analysis | 1.1 | 1 |
| Set | 3.4 | 1, 2, 3, 3.1, 3.2, 3.3 |
| Simple Memory | 1.4 | 1, 1.1, 1.2, 1.3 |
| Slack | 2.4 | 1, 2, 2.1, 2.2, 2.3 |
| Split In Batches | 3 | 2 |
| Splunk | 2 | 1 |
| Spreadsheet File | 2 | 1 |
| Strava | 1.1 | 1 |
| Structured Output Parser | 1.3 | 1, 1.1, 1.2 |
| Summarization Chain | 2.1 | 1, 2 |
| Summarize | 1.1 | 1 |
| Switch | 3.4 | 1, 2, 3, 3.1, 3.2, 3.3 |
| Telegram | 1.2 | 1, 1.1 |
| Telegram Trigger | 1.2 | 1, 1.1 |
| Text Classifier | 1.1 | 1 |
| TheHive Trigger | 2 | 1 |
| Think Tool | 1.1 | 1 |
| Todoist | 2.2 | 1, 2, 2.1 |
| Typeform Trigger | 1.1 | 1 |
| Vector Store Question Answer Tool | 1.1 | 1 |
| Wait | 1.1 | 1 |
| Webflow | 2 | 1 |
| Webflow Trigger | 2 | 1 |
| Webhook | 2.1 | 1, 1.1, 2 |
| WhatsApp Business Cloud | 1.1 | 1 |
| Workflow Retriever | 1.1 | 1 |
| X (Formerly Twitter) | 2 | 1 |
| Xata | 1.5 | 1, 1.1, 1.2, 1.3, 1.4 |

