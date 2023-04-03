---
description: Variables allow you to store and reuse values in n8n workflows. 
---

# Variables

!!! info "Feature availability"
	* Available on Self-hosted Enterprise and Power Cloud plans.
	* You need access to the n8n instance owner account to create variables.

Variables allow you to store and reuse values in n8n workflows. 

## Create variables

## Use variables in workflows

You can use variables in the Code node and in expressions:

```js
// Access a variable
$vars.<variable-name>
```

All variables are strings.

During workflow execution, n8n replaces the variables with the variable value. If the variable has no value, n8n treats its value as `undefined`. Workflows don't automatically fail in this case.
