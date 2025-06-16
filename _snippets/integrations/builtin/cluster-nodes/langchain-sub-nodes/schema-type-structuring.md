
1. **Generate from JSON Example**: Input an example JSON object to automatically generate the schema. The node uses the object property types and names. It ignores the actual values. n8n treats every field as mandatory when generating schemas from JSON examples.
2. **Define using JSON Schema**: Manually input the JSON schema. Read the JSON Schema [guides and examples](https://json-schema.org/learn/miscellaneous-examples) for help creating a valid JSON schema. Please note that we don't support references (using `$ref`) in JSON schemas. 
