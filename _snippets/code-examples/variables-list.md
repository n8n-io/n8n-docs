n8n provides the following variables:

- `$binary`: incoming binary data from a node
- `$data`: incoming raw data from a node
- `$env`: contains environment variables
- `$json`: incoming JSON data from a node
- `$now`: a Luxon object containing the current timestamp. Equivalent to `DateTime.now()`.
- `$parameters`: parameters of the current node
- `$position`: the index of an item in a list of items
- `$resumeWebhookUrl`: the webhook URL to call to resume a waiting workflow.
- `$runIndex`: how many times the node has been executed. Zero-based (the first run is 0, the second is 1, and so on).
- `$today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`.
- `$workflow`: workflow metadata
