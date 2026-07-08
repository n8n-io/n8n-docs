---
contentType: howto
nodeTitle: Get number of items returned by last node
originalFilePath: code/cookbook/code-node/number-items-last-node.md
originalUrl: 'https://docs.n8n.io/code/cookbook/code-node/number-items-last-node'
url: >-
  https://docs.n8n.io/build/code-in-n8n/cookbook/code-node/get-number-of-items-returned-by-last-node
layout:
  description:
    visible: false
---

# Get number of items returned by the previous node <a href="#get-number-of-items-returned-by-the-previous-node" id="get-number-of-items-returned-by-the-previous-node"></a>

To get the number of items returned by the previous node:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="Python" %}
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
{% endtab %}
{% endtabs %}
