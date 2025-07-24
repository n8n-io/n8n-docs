---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Prerequisites

--8<-- "_snippets/embed-license.md"

The requirements provided here are an example based on n8n Cloud and are for illustrative purposes only. Your requirements may vary depending on the number of users, workflows, and executions. Contact n8n for more information.

| Component | Sizing | Supported |
| :-------- | :----- | :-------- |
| CPU/vCPU  | Minimum 10 CPU cycles, scaling as needed | Any public or private cloud |
| Database  | 512 MB - 4 GB SSD | SQLite or PostgreSQL |
| Memory    | 320 MB - 2 GB | |

## CPU considerations

n8n isn't CPU intensive so even small instances (of providers such as AWS and GCP) should be enough for most use cases. Usually, memory requirements supersede CPU requirements, so focus resources there when planning your infrastructure.

## Database considerations

n8n uses its database to store [credentials](/glossary.md#credential-n8n), past executions, and workflows.

A core feature of n8n is the flexibility to choose a database. All the supported databases have different advantages and disadvantages, which you have to consider individually and pick the one that best suits your needs. By default n8n creates an SQLite database if no database exists at the given location.

n8n recommends that every n8n instance have a dedicated database. This helps to prevent dependencies and potential performance degradation. If it isn't possible to provide a dedicated database for every n8n instance, n8n recommends making use of Postgres's schema feature.

For Postgres, the database must already exist on the DB-instance. The database user for the n8n process needs to have full permissions on all tables that they're using or creating. n8n creates and maintains the database schema.

### Best practices

* SSD storage.
* In containerized cloud environments, ensure that the volume is persisted and mounted when stopping/starting a container. If not, all data is lost.
* If using Postgres, don't use the `tablePrefix` configuration option. It will be deprecated in the near future.
* Pay attention to the changelog of new versions and consider reverting migrations before downgrading.
* Set up at least the basic database security and stability mechanisms such as IP allow lists and backups.

## Memory considerations

An n8n instance doesn't typically require large amounts of available memory. For example an n8n Cloud instance at idle requires ~100MB. It's the nature of your workflows and the data being processed that determines your memory requirements.

For example, while most nodes just pass data to the next node in the workflow, the [Code node](/code/code-node.md) creates a pre-processing and post-processing copy of the data. When dealing will large binary files, this can consume all available resources.
