---
title: SQL Agent
description: Documentation for the SQL Agent node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# SQL Agent

The SQL Agent uses a SQL database as a data source. The agent builds a SQL query based on the natural language query in the prompt.

On this page, you'll find the node parameters for the SQL Agent node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->
	
## Node parameters

### Data Source

Options:

* MySQL
* SQLite
* Postgres

### Prompt

The query to run on the data.

### Options

Use the options to refine the agent's behavior.

* Ignored Tables
* Include Sample Rows
* Included Tables
* Prefix Prompt
* Suffix Prompt
* Top K

## Related resources

<!--
View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.
-->

Refer to [LangChain's documentation on querying SQL](https://python.langchain.com/docs/use_cases/qa_structured/sql){:target=_blank .external-link} for more information about the service. Note that this documentation is for LangChain's Python framework.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
