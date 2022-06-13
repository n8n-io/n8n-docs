# Prerequisites

The requirements provided here are an example based on our n8n.cloud and are for illustrative purposes only. Your requirements may vary depending on the number of users, workflows, and executions. Contact n8n for more information.

| Component | Sizing | Supported |
| :-------- | :----- | :-------- |
| CPU/vCPU  | Minimum 10 CPU cycles, scaling as needed | Any public or private cloud |
| Database  | 512 MB - 4 GB SSD | SQLite, PostgreSQL, MySQL, MariaDB |
| Memory    | 320 MB - 2 GB | |

## CPU considerations

n8n is not CPU intensive so even small instances (of AWS, GCP, etc.) should be sufficient for most use cases. Generally, memory requirements supersede CPU requirements, so focus resources there when planning your infrastructure.

## Database considerations

n8n uses its database to store credentials, past executions, and workflows.
A core feature of n8n is the flexibility to choose a database. All of the supported databases have different advantages and disadvantages, which you have to consider individually and pick the one that best suits your needs. **By default n8n creates a SQLite database if none is found at the given location.**

It is recommended that every n8n instance have a dedicated database. This helps to prevent dependencies and potential performance degradation. If it is not possible to provide an own database to every n8n instance we recommend making use of Postgres’s schema feature.

For Postgres, MySQL and MariaDB it is required that the database already exists on the DB-instance. The database user for the n8n process needs to have full permissions on all tables that they are using/creating. The database schema is created and maintained by n8n itself, no further actions are required.

### Best practices

* SSD storage is recommended.
* In containerized cloud environments, ensure that the volume is persisted and mounted when stopping/starting a container. If not, all data will be lost.
* If using Postgres, do not use the `tablePrefix` configuration option. It will be deprecated in the near future.
* Pay attention to the changelog of new versions and consider reverting migrations before downgrading.
* Implement at least the basic database security and stability mechanisms such as IP-whitelisting and backups.

## Memory considerations

An n8n instance does not typically require large amounts of available memory, for example an n8n.cloud instance at idle requires ~100MB. It is the nature of your workflows and the data being processed that will determine your ultimate memory requirements.

For example, while most nodes just pass data to the next node in the workflow, `Function` nodes create a pre- and post-processing copy of the data. When dealing will large binary files, this can quickly consume all available resources.
