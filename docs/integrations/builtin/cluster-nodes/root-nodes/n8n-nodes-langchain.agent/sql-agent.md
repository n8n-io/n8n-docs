---
title: SQL AI Agent node documentation
description: >-
  Learn how to use the SQL Agent of the AI Agent node in n8n. Follow technical
  documentation to integrate the SQL Agent into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: SQL AI Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/sql-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/sql-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/sql-agent
layout:
  description:
    visible: false
---

# SQL AI Agent node <a href="#sql-ai-agent-node" id="sql-ai-agent-node"></a>

{% hint style="info" %}
**Feature removed**

n8n removed this functionality in February 2025.
{% endhint %}

The SQL Agent uses a SQL database as a data source. It can understand natural language questions, convert them into SQL queries, execute the queries, and present the results in a user-friendly format. This agent is valuable for building natural language interfaces to databases.

Refer to [AI Agent](README.md) for more information on the AI Agent node itself.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the SQL Agent using the following parameters.

### Data Source <a href="#data-source" id="data-source"></a>

Choose the database to use as a data source for the node. Options include:

* **MySQL**: Select this option to use a MySQL database.
    * Also select the **Credential for MySQL**.
* **SQLite**: Select this option to use a SQLite database.
    * You must add a [Read/Write File From Disk](../../../core-nodes/n8n-nodes-base.readwritefile.md) node before the Agent to read your SQLite file.
    * Also enter the **Input Binary Field** name of your SQLite file coming from the Read/Write File From Disk node.
* **Postgres**: Select this option to use a Postgres database.
    * Also select the **Credential for Postgres**.

{% hint style="warning" %}
**Postgres and MySQL Agents**

If you are using [Postgres](../../../credentials/postgres.md) or [MySQL](../../../credentials/mysql.md), this agent doesn't support the credential tunnel options.
{% endhint %}

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tALAgzlpmog5eZk893Ez/" %}

## Node options <a href="#node-options" id="node-options"></a>

Refine the SQL Agent node's behavior using these options:

### Ignored Tables <a href="#ignored-tables" id="ignored-tables"></a>

If you'd like the node to ignore any tables from the database, enter a comma-separated list of tables you'd like it to ignore.

If left empty, the agent doesn't ignore any tables.

### Include Sample Rows <a href="#include-sample-rows" id="include-sample-rows"></a>

Enter the number of sample rows to include in the prompt to the agent. Default is `3`.

Sample rows help the agent understand the schema of the database, but they also increase the number of tokens used.

### Included Tables <a href="#included-tables" id="included-tables"></a>

If you'd only like to include specific tables from the database, enter a comma-separated list of tables to include.

If left empty, the agent includes all tables.

### Prefix Prompt <a href="#prefix-prompt" id="prefix-prompt"></a>

Enter a message you'd like to send to the agent before the **Prompt** text. This initial message can provide more context and guidance to the agent about what it can and can't do, and how to format the response.

n8n fills this field with an example.

### Suffix Prompt <a href="#suffix-prompt" id="suffix-prompt"></a>

Enter a message you'd like to send to the agent after the **Prompt** text.

Available LangChain expressions:

* `{chatHistory}`: A history of messages in this conversation, useful for maintaining context.
* `{input}`: Contains the user prompt.
* `{agent_scratchpad}`: Information to remember for the next iteration.

n8n fills this field with an example.

### Limit <a href="#limit" id="limit"></a>

Enter the maximum number of results to return.

Default is `10`.

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8YMxu7WAgGuRiK8YvCjS/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](README.md#templates-and-examples) section.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).


