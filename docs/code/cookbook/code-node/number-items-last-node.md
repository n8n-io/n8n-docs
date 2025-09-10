---
contentType: howto
---

# Get number of items returned by the previous node

To get the number of items returned by the previous node:

=== "JavaScript"

	```js
	if (Object.keys(items[0].json).length === 0) {
	return [
		{
			json: {
				results: 0,
			}
		}
	]
	}
	return [
		{
			json: {
				results: items.length,
			}
		}
	];
	```

	The output will be similar to the following.

	```json
	[
		{
			"results": 8
		}
	]
	```
=== "Python"
	```python
	if len(items[0].json) == 0:
		return [
			{
				"json": {
					"results": 0,
				}
			}
		]
	else:
		return [
			{
				"json": {
					"results": items.length,
				}
			}
		]
	```
	The output will be similar to the following.

	```json
	[
		{
			"results": 8
		}
	]
	```
