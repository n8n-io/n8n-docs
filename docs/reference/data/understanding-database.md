# Understanding Database

By default, n8n uses SQLite as the database. The credentials, workflows, executions, and webhook are decoupled and store in different tables.

## Credentials Entity

The credentials get stored in the `credentials_entity` table with the following fields.

| Column Name | Data Type | Description |
|-------------|-----------|-------|
| id | INTEGER | auto-incremented and unique for each row |
| name | VARCHAR | stores the name of the credentials given by the user |
| data | Text | stores the encrypted data |
| type | VARCHAR | refers to the credential type used by the node |
| nodeAccess | TEXT | stores the information of the nodes that have access to these credentials |
| createdAt | DATETIME | stores the date and time when a credential gets created |
| updatedAt | DATETIME | stores the date and time when a credential gets updated |

## Workflow Entity

The saved workflows get stored in the `workflow_entity` table with the following fields.

| Column Name | Data Type | Description |
|-------------|-----------|-------|
| id | INTEGER | auto-incremented and unique for each row |
| name | VARCHAR | stores the name of the workflow given by the user |
| active | BOOLEAN | stores the information about the active state of the workflow (1=active) |
| nodes | TEXT | stores the information about nodes and their configurations in a workflow |
| connections | TEXT | stores the connection information between nodes in a workflow |
| createdAt | DATETIME | stores the date and time when a workflow gets created |
| updatedAt | DATETIME | stores the date and time when a workflow gets updated |
| settings | TEXT | stores the information about additional settings of a workflow |
| staticData | TEXT | stores the static data of the workflow |

## Webhook Entity

The information of active webhooks gets stored in the `webhook_entity` table with the following fields.

| Column Name | Data Type | Description |
|-------------|-----------|-------|
| workflowId | INTEGER | stores the ID of the workflow |
| webhookPath | VARCHAR | stores the webhook path |
| method | VARCHAR | stores the information about the HTTP Method |
| node | VARCHAR | stores the name of the trigger node |

## Migrations

The information of the migrations that ran gets stored in the `migrations` table with the following fields.

| Column Name | Data Type | Description |
|-------------|-----------|-------|
| id | INTEGER | auto-incremented and unique for each row |
| timestamp | BIGINT | stores the timestamp when the migration ran |
| name | VARCHAR | store the name of the migration that ran |
