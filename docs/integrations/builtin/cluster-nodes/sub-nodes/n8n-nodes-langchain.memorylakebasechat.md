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

Refer to the [Databricks credentials documentation](../../credentials/databricks.md) for authentication information for this node. The node accepts a Databricks OAuth2 credential only, with [user login](../../credentials/databricks.md#using-oauth2-with-user-login) or a [service principal](../../credentials/databricks.md#using-oauth2-service-principal). A project owner can't use the Data API, so authenticate as an identity that doesn't own the Lakebase project.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Create the table

Unlike the [Postgres Chat Memory](n8n-nodes-langchain.memorypostgreschat.md) node, this node doesn't create its table. The Data API can't run `CREATE TABLE`, so you run the SQL once in the Lakebase SQL editor before the first run.

Before you create the table, follow [Set up Lakebase for the Data API](../../credentials/databricks.md#set-up-lakebase-for-the-data-api) to turn on the Data API, create a Postgres role for the identity your credential authenticates as, and grant it to `authenticator`. You can skip the OpenAPI specification step and the data grants there: this node doesn't list tables, and the SQL below includes the grants it needs. Then, signed in to Databricks as yourself rather than as the n8n identity, run this in the Lakebase SQL editor:

```sql
CREATE TABLE "public"."n8n_chat_histories" (id SERIAL PRIMARY KEY, session_id VARCHAR(255) NOT NULL, message JSONB NOT NULL);
CREATE INDEX ON "public"."n8n_chat_histories" (session_id, id);
GRANT USAGE ON SCHEMA "public" TO "your-role";
GRANT SELECT, INSERT, DELETE ON "public"."n8n_chat_histories" TO "your-role";
GRANT USAGE ON SEQUENCE "public"."n8n_chat_histories_id_seq" TO "your-role";
```

* Replace `"your-role"` with the Postgres role of the OAuth2 identity: the user's email address, or the application ID of the service principal. It's the role you created with `databricks_create_role` during setup.
* If you set **Schema** or **Table Name** to something other than `public` and `n8n_chat_histories`, replace them in every statement, including the sequence name, which is the table name followed by `_id_seq`.

## Node parameters

* **Project**: Select the Lakebase project from the list, or select **By ID** and enter its project ID.
* **Branch**: Select the branch of the project from the list, or select **By ID** and enter its name.
* **Database**: Select the Postgres database on the branch from the list, or select **By ID** and enter its name.
* **Schema**: The Postgres schema that holds the table. Defaults to `public`, and the list offers only `public`. For another schema, select **By ID** and enter its name. The Data API has to expose that schema.
* **Table Name**: Enter the name of the table to store the chat history in. Defaults to `n8n_chat_histories`. The node doesn't create the table. Refer to [Create the table](#create-the-table).
* **Session ID**: Select how the node finds the session ID:
	* **Connected Chat Trigger Node**: Reads the `sessionId` field from the input of a directly connected [Chat Trigger](../../core-nodes/n8n-nodes-langchain.chattrigger/README.md) node.
	* **Define below**: Enter the **Key** to use to store the session ID in the memory. Use the same key in several memory nodes to share one session between them.
* **Context Window Length**: Enter the number of previous interactions to consider for context. Defaults to `5`.

## Common issues

### The table is missing

The node fails with `Table <schema>.<table> does not exist`. You haven't created the table yet (`PGRST205`), or the Data API schema cache still lists a table you dropped (`42P01`). The error description holds the `CREATE TABLE`, `CREATE INDEX`, and `GRANT` statements for the schema and table you selected. Run them in the Lakebase SQL editor as described in [Create the table](#create-the-table).

### The role lacks a grant

The node fails with `The OAuth2 identity cannot use table <schema>.<table>`. The table exists, but the role lacks a grant on the schema, the table, or the sequence (`42501`). The error description holds the three `GRANT` statements. Run them as the table owner.

### The session is too large to read

The node fails with `The session holds more rows than one run can read (100000)`. The session has more than 100,000 rows, and the node fails rather than returning part of the history. Clear the session with the [Chat Memory Manager](n8n-nodes-langchain.memorymanager.md) node, or use a new **Session ID**.

### Setup errors

`invalid token permissions` (`PGRST301`) and `permission denied to set role` (`42501`) come from the Data API setup, not from the table. Refer to [Common Lakebase issues](../../app-nodes/n8n-nodes-base.databricks.md#common-lakebase-issues) on the Databricks node page.

## Related resources

Refer to the [Lakebase Data API documentation](https://docs.databricks.com/aws/en/oltp/projects/data-api) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Single memory instance

With **Session ID** set to **Connected Chat Trigger Node**, each Databricks Lakebase Chat Memory node scopes its session to its own node name, so two memory nodes in one workflow don't share a history. To share one history between memory nodes, set **Session ID** to **Define below** in each node and use the same **Key**. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](n8n-nodes-langchain.memorymanager.md) node.

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This lets you hold continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
