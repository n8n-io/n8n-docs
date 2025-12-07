---
contentType: howto
---

# Execution data

Depending on your executions settings and volume, your n8n database can grow in size and run out of storage.

To avoid this, n8n recommends that you don't save unnecessary data, and enable pruning of old executions data.

To do this, configure the corresponding [environment variables](/hosting/configuration/environment-variables/executions.md).

## Reduce saved data

/// note | Configuration at workflow level
You can also configure these settings on an individual workflow basis using the [workflow settings](/workflows/settings.md).
///
You can select which executions data n8n saves. For example, you can save only executions that result in an `Error`.

```sh
# npm
# Save executions ending in errors
export EXECUTIONS_DATA_SAVE_ON_ERROR=all

# Don't save successful executions
export EXECUTIONS_DATA_SAVE_ON_SUCCESS=none

# Don't save node progress for each execution
export EXECUTIONS_DATA_SAVE_ON_PROGRESS=false

# Don't save manually launched executions
export EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false

```

```sh
# Docker
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_SAVE_ON_ERROR=all \
 -e EXECUTIONS_DATA_SAVE_ON_SUCCESS=none \
 -e EXECUTIONS_DATA_SAVE_ON_PROGRESS=true \
 -e EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false \
 docker.n8n.io/n8nio/n8n
```

```yaml
# Docker Compose
n8n:
    environment:
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
      - EXECUTIONS_DATA_SAVE_ON_PROGRESS=true
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
```

## Enable executions pruning

Executions pruning deletes finished executions along with their execution data and binary data on a regular schedule. n8n enables pruning by default. For performance reasons, pruning first marks targets for deletion, and then later permanently removes them.

n8n prunes executions when **either** of the following condition occur:

- **Age**: The execution finished more than `EXECUTIONS_DATA_MAX_AGE` hours ago (default: 336 hours -> 14 days).
- **Count**: The total number of executions exceeds `EXECUTIONS_DATA_PRUNE_MAX_COUNT` (default: 10,000). When this occurs, n8n deletes executions from oldest to newest.

Keep in mind:

- Executions with the `new`, `running`, or `waiting` status aren't eligible for pruning.
- Annotated executions (for example, executions with tags or ratings) are never pruned.
- Pruning honors a safety buffer period of `EXECUTIONS_DATA_HARD_DELETE_BUFFER` hours (default: 1h), to ensure recent data remains available while the user is building or debugging a workflow.

```sh
# Enable executions pruning
export EXECUTIONS_DATA_PRUNE=true

# How old (hours) a finished execution must be to qualify for soft-deletion
export EXECUTIONS_DATA_MAX_AGE=168

# Max number of finished executions to keep. May not strictly prune back down to the exact max count. Set to `0` for unlimited.
export EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

```sh
# Docker
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_PRUNE=true \
 -e EXECUTIONS_DATA_MAX_AGE=168 \
 docker.n8n.io/n8nio/n8n
```

```yaml
# Docker Compose
n8n:
    environment:
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
      - EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

/// note | SQLite
If you run n8n using the default SQLite database, the disk space of any pruned data isn't automatically freed up but rather reused for future executions data. To free up this space configure the `DB_SQLITE_VACUUM_ON_STARTUP` [environment variable](/hosting/configuration/environment-variables/database.md#sqlite) or manually run the [VACUUM](https://www.sqlite.org/lang_vacuum.html) operation.
///

--8<-- "_snippets/self-hosting/scaling/binary-data-pruning.md"
