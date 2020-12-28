# Understanding Database

By default, n8n uses SQLite as the database. The credentials, workflows, executions and webhook all are decoupled and store in different tables.

## Credentials Entity

The credentials are stored in the `credentials_entity` table with the following fields.

| Column Name | Data Type | About |
|-------------|-----------|-------|
| id | INTEGER | auto-incremented and unique for each row |
| name | VARCHAR | stores the name of the credentials given by the user |
| data | Text | stores the encrypted data |
| type | VARCHAR | refers to the type of credentials of the node |
| nodeAccess | TEXT | stores the information of the nodes that have access to these credentials |
| createdAt | DATETIME | stroes the date and time when the credentials were created |
| updatedAt | DATETIME | stores the date and time when the credentials were updated |

## Workflow Entity

The saved workflows are stored in the `workdlow_entity` table with the following fields.

| Column Name | Data Type | About |
|-------------|-----------|-------|
| id | INTEGER | auto-incremented and unique for each row |
| name | VARCHAR | stores the name of the workflow given by the user |
| active | BOOLEAN | stores the information about the active state of the workflow |
| nodes | TEXT | stores the information of the nodes and thier configurations |
| connections | TEXT | stores the information about the connection between the nodes |
| createdAt | DATETIME | stroes the date and time when the workflow was created |
| updatedAt | DATETIME | stores the date and time when the workflow was updated |
| settings | TEXT | stores the information about additional settings of the workflow |
| staticData | TEXT | stores the static data of the workflow |

## Webhook Entity

## Migrations Entity