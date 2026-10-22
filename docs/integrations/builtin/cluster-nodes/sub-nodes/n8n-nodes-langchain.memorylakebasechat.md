---
description: >-
  Learn how to use the Databricks Lakebase Chat Memory node in n8n. Follow
  technical documentation to integrate Databricks Lakebase Chat Memory node
  into your workflows.
layout:
  description:
    visible: false
---

# Databricks Lakebase Chat Memory node

Use the Databricks Lakebase Chat Memory node to use a Databricks Lakebase table as a memory[^1] server for storing chat history. The node reads and writes the table over the [Lakebase Data API](https://docs.databricks.com/aws/en/oltp/projects/data-api), so it needs no connection string and no database driver.

On this page, you'll find the one-time table setup, the node parameters, the common issues, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Databricks credentials documentation](../../credentials/databricks.md) for authentication information for this node. The node accepts a Databricks OAuth2 credential only, with [user login](../../credentials/databricks.md#using-oauth2-with-user-login) or a [service principal](../../credentials/databricks.md#using-oauth2-service-principal). The Data API rejects personal access tokens, and it excludes the project owner, so use an identity that doesn't own the Lakebase project.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Create the table

Unlike the [Postgres Chat Memory](n8n-nodes-langchain.memorypostgreschat.md) node, this node doesn't create its table. The Data API can't run `CREATE TABLE`, so you run the SQL once in the Lakebase SQL editor before the first run. A run against a missing table fails with the same SQL in the error, so you can also copy it from there.

Before you create the table, the Lakebase project needs the Data API turned on, and the identity your credential authenticates as needs a Postgres role on the branch. Follow [Set up Lakebase for the Data API](../../credentials/databricks.md#set-up-lakebase-for-the-data-api) for those steps. Then run this in the Lakebase SQL editor:

```sql
CREATE TABLE "public"."n8n_chat_histories" (id SERIAL PRIMARY KEY, session_id VARCHAR(255) NOT NULL, message JSONB NOT NULL);
CREATE INDEX ON "public"."n8n_chat_histories" (session_id, id);
GRANT USAGE ON SCHEMA "public" TO "your-role";
GRANT SELECT, INSERT, DELETE ON "public"."n8n_chat_histories" TO "your-role";
GRANT USAGE ON SEQUENCE "public"."n8n_chat_histories_id_seq" TO "your-role";
```

* Replace `"your-role"` with the Postgres role of the OAuth2 identity: the user's email address, or the application ID of the service principal. It's the role you created with `databricks_create_role` during setup.
* If you set **Schema** or **Table Name** to something other than `public` and `n8n_chat_histories`, replace them in every statement, including the sequence name, which is the table name followed by `_id_seq`.

The table layout is the one the Postgres Chat Memory node creates, so the node reads a chat history that a Postgres Chat Memory node wrote into Lakebase.

## Node parameters

* **Project**: Select the Lakebase project from the list, or select **By ID** and enter its name.
* **Branch**: Select the branch of the project from the list, or select **By ID** and enter its name.
* **Database**: Select the Postgres database on the branch from the list, or select **By ID** and enter its name.
* **Schema**: The Postgres schema that holds the table. `public` by default. The list offers only `public`, because Databricks has no endpoint that lists Postgres schemas. For another schema, select **By ID** and enter its name. The Data API has to expose that schema.
* **Table Name**: Enter the name of the table to store the chat history in. Defaults to `n8n_chat_histories`. The node doesn't create the table. Refer to [Create the table](#create-the-table).
* **Session ID**: Select how the node finds the session ID:
	* **Connected Chat Trigger Node**: Reads the `sessionId` field from the input of a directly connected [Chat Trigger](../../core-nodes/n8n-nodes-langchain.chattrigger/README.md) node.
	* **Define below**: Enter the **Key** to use to store the session ID in the memory. Use the same key in several memory nodes to share one session between them.
* **Context Window Length**: Enter the number of previous interactions to consider for context. Defaults to `5`.

## Common issues

The node checks every parameter before it calls the Data API, so an empty **Project**, **Branch**, **Database**, or **Schema** fails in the memory node rather than inside the agent. These errors come from the table or the identity:

| Error | Cause and fix |
|-------|---------------|
| `Table <schema>.<table> does not exist` | The table was never created, or the Data API schema cache still lists a table you dropped (`PGRST205` or `42P01`). The error description holds the `CREATE TABLE`, `CREATE INDEX`, and `GRANT` statements for the schema and table you selected. Run them in the Lakebase SQL editor as described in [Create the table](#create-the-table). |
| `The OAuth2 identity cannot use table <schema>.<table>` | The table exists, but the role lacks one of the three grants: usage on the schema, `SELECT`, `INSERT`, and `DELETE` on the table, or usage on the sequence (`42501`). The error description holds the three `GRANT` statements. Run them as the table owner. |
| `The session holds more rows than one run can read (100000)` | The session has more than 100,000 rows. The node fails rather than return part of the history, because the context window takes the newest messages and the [Chat Memory Manager](n8n-nodes-langchain.memorymanager.md) node rewrites the session from what it read. Clear the session with the Chat Memory Manager node, or use a new **Session ID**. |
| `Lakebase requires OAuth2 authentication` | The credential is a personal access token. The Data API accepts OAuth2 only. Select a [Databricks OAuth2 credential](../../credentials/databricks.md#supported-authentication-methods) instead. |

A `permission denied to set role` error (`42501`) means the role isn't granted to the Data API, or the identity owns the project. Refer to [Set up Lakebase for the Data API](../../credentials/databricks.md#set-up-lakebase-for-the-data-api).

## Related resources

Refer to the [Lakebase Data API documentation](https://docs.databricks.com/aws/en/oltp/projects/data-api) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Single memory instance

If you add more than one Databricks Lakebase Chat Memory node to your workflow, all nodes access the same memory instance by default. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](n8n-nodes-langchain.memorymanager.md) node. If you want more than one memory instance in your workflow, set different session IDs in different memory nodes.

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
