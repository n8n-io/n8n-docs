---
contentType: howto
---

# Logging in n8n

Logging is an important feature for debugging. n8n uses the [winston](https://www.npmjs.com/package/winston) logging library.

/// note | Log streaming
n8n Self-hosted Enterprise tier includes [Log streaming](/log-streaming.md), in addition to the logging options described in this document.
///
## Setup

To set up logging in n8n, you need to set the following environment variables (you can also set the values in the [configuration file](/hosting/configuration/environment-variables/index.md))

| Setting in the configuration file | Using environment variables | Description |
|-----------------------------------|-----------------------------|-------------|
| n8n.log.level | N8N_LOG_LEVEL | The log output level. The available options are (from lowest to highest level) are error, warn, info, and debug. The default value is `info`. You can learn more about these options [here](#log-levels). |
| n8n.log.output | N8N_LOG_OUTPUT | Where to output logs. The available options are `console` and `file`. Multiple values can be used separated by a comma (`,`). `console` is used by default. |
| n8n.log.file.location | N8N_LOG_FILE_LOCATION | The log file location, used only if log output is set to file. By default, `<n8nFolderPath>/logs/n8n.log` is used. |
| n8n.log.file.fileSizeMax | N8N_LOG_FILE_SIZE_MAX | The maximum size (in MB) for each log file. By default, n8n uses 16 MB. |
| n8n.log.file.fileCountMax | N8N_LOG_FILE_COUNT_MAX | The maximum number of log files to keep. The default value is 100. This value should be set when using workers. |


```bash
# Set the logging level to 'debug'
export N8N_LOG_LEVEL=debug

# Set log output to both console and a log file
export N8N_LOG_OUTPUT=console,file

# Set a save location for the log file
export N8N_LOG_FILE_LOCATION=/home/jim/n8n/logs/n8n.log

# Set a 50 MB maximum size for each log file
export N8N_LOG_FILE_SIZE_MAX=50

# Set 60 as the maximum number of log files to be kept
export N8N_LOG_FILE_COUNT_MAX=60
```

### Log levels

n8n uses standard log levels to report:

- `silent`: outputs nothing at all
- `error`: outputs only errors and nothing else
- `warn`: outputs errors and warning messages
- `info`: contains useful information about progress
- `debug`: the most verbose output. n8n outputs a lot of information to help you debug issues.


## Development

During development, adding log messages is a good practice. It assists in debugging errors. To configure logging for development, follow the guide below.

### Implementation details

n8n uses the `LoggerProxy` class, located in the `workflow` package. Calling the `LoggerProxy.init()` by passing in an instance of `Logger`, initializes the class before the usage.

The initialization process happens only once. The [`start.ts`](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/start.ts) file already does this process for you. If you are creating a new command from scratch, you need to initialize the `LoggerProxy` class.

Once the `Logger` implementation gets created in the `cli` package, it can be obtained by calling the `getInstance` convenience method from the exported module.

Check the [start.ts](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/start.ts) file to learn more about how this process works.

### Adding logs

Once the `LoggerProxy` class gets initialized in the project, you can import it to any other file and add logs.

Convenience methods are provided for all logging levels, so new logs can be added whenever needed using the format `Logger.<logLevel>('<message>', ...meta)`, where `meta` represents any additional properties desired beyond `message`.

In the example above, we use the standard log levels described [above](#log-levels). The `message` argument is a string, and `meta` is a data object.

```js
// You have to import the LoggerProxy. We rename it to Logger to make it easier

import {
	LoggerProxy as Logger
} from 'n8n-workflow';

// Info-level logging of a trigger function, with workflow name and workflow ID as additional metadata properties

Logger.info(`Polling trigger initiated for workflow "${workflow.name}"`, {workflowName: workflow.name, workflowId: workflow.id});
```

When creating new loggers, some useful standards to keep in mind are:

- Craft log messages to be as human-readable as possible. For example, always wrap names in quotes.
- Duplicating information in the log message and metadata, like workflow name in the above example, can be useful as messages are easier to search and metadata enables easier filtering.
- Include multiple IDs (for example, `executionId`, `workflowId`, and `sessionId`) throughout all logs.
- Use node types instead of node names (or both) as this is more consistent, and so easier to search.

## Front-end logs

As of now, front-end logs aren't available. Using `Logger` or `LoggerProxy` would yield errors in the `editor-ui` package. This functionality will get implemented in the future versions.
