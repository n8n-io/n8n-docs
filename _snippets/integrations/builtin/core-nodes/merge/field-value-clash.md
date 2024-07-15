If multiple items at an index have a field with the same name, this is a clash. For example, if all items in both Input 1 and Input 2 have a field named `language`, these fields clash. By default, n8n prioritizes Input 2, meaning if `language` has a value in Input 2, n8n uses that value when merging the items. 

You can change this behavior by selecting **Options** > **Clash Handling**: 

- **When Field Values Clash**: Choose which input to prioritize, or choose **Always Add Input Number to Field Names** to keep all fields and values, with the input number appended to the field name to show which input it came from.
- **Merging Nested Fields**
    - **Deep Merge**: Merge properties at all levels of the items, including nested objects. This is useful when dealing with complex, nested data structures where you need to ensure the merging of all levels of nested properties.
    - **Shallow Merge**: Merge properties at the top level of the items only, without merging nested objects. This is useful when you have flat data structures or when you only need to merge top-level properties without worrying about nested properties.
