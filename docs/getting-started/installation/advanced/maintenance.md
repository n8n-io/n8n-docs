# Maintenance

## Executions data

Depending on your executions settings and volume, your n8n database can quickly swell in size and eventually run out of storage. 

To avoid this and ensure continued proper functionality, it is recommended to ensure you are only saving the desired data and to enable pruning of old executions data.

This is done by [configuring](configuration.md) the corresponding [environment variables](../../../reference/environment-variables.md#executions).

### Saved data

You can select which executions data is saved, for example only those executions that result in an `Error`, so that only those records you want to keep are saved in the database.

<code-group>
<code-block title="npm">
```sh
// Save executions ending in errors
export EXECUTIONS_DATA_SAVE_ON_ERROR=all

// Save successful executions
export EXECUTIONS_DATA_SAVE_ON_SUCCESS=all

// Don't save node progress for each execution
export EXECUTIONS_DATA_SAVE_ON_PROGRESS=false

// Don't save manually launched executions
export EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
```
</code-block>

<code-block title="Docker">
```sh
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e EXECUTIONS_DATA_SAVE_ON_ERROR=all \
	-e EXECUTIONS_DATA_SAVE_ON_SUCCESS=none \
    -e EXECUTIONS_DATA_SAVE_ON_PROGRESS=true \
    -e EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false \
	n8nio/n8n
```
</code-block>

<code-block title="docker-compose.yaml">
```yaml
n8n:
    environment:
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
	  - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
      - EXECUTIONS_DATA_SAVE_ON_PROGRESS=true
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
```
</code-block>
</code-group>

::: tip 💡 Keep in mind
These settings can also be configured on an individual workflow basis via the [workflow settings](../../key-components/workflow.md#workflow-settings).
:::

### Enable data pruning

You can enable data pruning to automatically delete execution data older than a desired time period. If no `EXECUTIONS_DATA_MAX_AGE` is set, then 336 hours (14 days) is used by default.

<code-group>
<code-block title="npm">
```sh
// Activate automatic data pruning
export EXECUTIONS_DATA_PRUNE=true

// Number of hours after execution data will be deleted
export EXECUTIONS_DATA_MAX_AGE=168
```
</code-block>

<code-block title="Docker">
```sh
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e EXECUTIONS_DATA_PRUNE=true \
	-e EXECUTIONS_DATA_MAX_AGE=168 \
	n8nio/n8n
```
</code-block>

<code-block title="docker-compose.yaml">
```yaml
n8n:
    environment:
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
```
</code-block>
</code-group>

::: tip 💡 Keep in mind
If you are running n8n using the default SQLite database, the disk-space of any pruned data is not automatically freed up but rather reused for future executions data. To free up this space configure the `DB_SQLITE_VACUUM_ON_STARTUP` [environment variable](../../../reference/environment-variables.md#sqlite) or manually run the [VACUUM](https://www.sqlite.org/lang_vacuum.html) operation.
:::
