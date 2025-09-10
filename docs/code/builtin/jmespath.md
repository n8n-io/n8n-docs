---
description: A method for working with the JMESPath library in n8n.
contentType: reference
hide:
  - toc
---

# JMESPath method

This is an n8n-provided method for working with the [JMESPath](/code/cookbook/jmespath.md) library.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$jmespath()` | Perform a search on a JSON object using JMESPath. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_jmespath()` | Perform a search on a JSON object using JMESPath. | 
