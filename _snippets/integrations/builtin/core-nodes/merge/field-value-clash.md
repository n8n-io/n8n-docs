If both items at an index have a field with the same name, this is a clash. For example, if all items in both Input 1 and Input 2 have a field named `language`, these fields clash. By default, n8n prioritizes Input 2, meaning if `language` has a value in Input 2, n8n uses that value when merging the items. 

You can change this behavior:

1. Select **Add Option** > **Clash Handling**.
2. Choose which input to prioritize, or choose **Always Add Input Number to Field Names** to keep all fields and values, with the input number appended to the field name to show which input it came from.
