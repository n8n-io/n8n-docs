# Logging

n8n uses the [winston](https://www.npmjs.com/package/winston) logging library.

The logging level and output details can be customized by setting the following environment variables:

- `N8N_LOG_LEVEL`: The log output level. The available options, from highest to lowest, are error, warn, info, verbose, and debug. Info is used by default.
- `N8N_LOG_OUTPUT`: Where to output logs. The available options are console and file. Multiple values can be used separated by a comma (`,`). Console is used by default.
- `N8N_LOG_FILE_LOCATION`: The log file location, used only if log output is set to file. By default, `<n8nFolderPath>/logs/n8n.log` is used.
- `N8N_LOG_FILE_MAXSIZE`: The maximum size (in MB) for each log file. By default, 16 is used.
- `N8N_LOG_FILE_MAXCOUNT`: The maximum number of log files to keep. By default, 100 is used.

```bash
# Set the logging level to 'debug'
export N8N_LOG_LEVEL=debug

# Set log output to both console and a log file
export N8N_LOG_OUTPUT=console,file

# Set a save location for the log file
export N8N_LOG_FILE_LOCATION=/home/jim/n8n/logs/n8n.log

# Set a 50 MB maximum size for each log file
export N8N_LOG_FILE_MAXSIZE=50

# Set 60 as maximum number of log files to be kept
export N8N_LOG_FILE_MAXCOUNT=60
```

## Adding logs

Convenience methods are defined for all provided logging levels, so new logs can easily be added whenever needed using the format `Logger.<logLevel>('<message>', ...meta)` where `meta` represents any additional properties desired beyond `message`.

```js
// Info-level logging of a trigger function, with workflow name
// and workflow ID as additional metadata properties
Logger.info(`Polling trigger initiated for workflow "${workflow.name}"`, {workflowName: workflow.name, workflowId: workflow.id});

// Verbose-level logging of hook function execution, with execution
// ID, workflow ID, and session ID as metadata properties
Logger.verbose(`Executing hook (workflowExecuteBefore, hookFunctionsPush)`, {executionId: this.executionId, workflowId: this.workflowData.id, sessionId: this.sessionId});
```

When creating new loggers, some useful standards to keep in mind are:

- Craft log messages to be as easily human-readable as possible. For example, always wrap names in quotes.
- Duplicating information in the log message and metadata, like workflow name in the above example, can be useful as messages are easier to search and metadata enables easier filtering.
- Include multiple IDs (e.g. executionId, workflowId, and sessionId) throughout all logs.
- Use node types instead of node names (or both) as this is more consistent, and so easier to search.
