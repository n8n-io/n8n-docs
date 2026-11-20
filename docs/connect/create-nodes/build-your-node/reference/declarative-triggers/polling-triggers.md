---
description: Build a declarative polling trigger that checks an API on a schedule and uses a cursor to emit only new items.
status: preview
layout:
  description:
    visible: false
---

# Polling triggers

A declarative polling trigger sends one request on each poll, then uses a cursor to find the items that are new since the last poll and emits only those.

{% hint style="info" %}
**Preview status**

Declarative polling triggers are in Preview. The configuration format may change in a later n8n version, so don't rely on it for production nodes yet. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Declarative polling triggers are available from n8n 3.0.0. Your package must declare node API version `3.1`. Refer to [Declarative triggers](./) for the requirements.
{% endhint %}

You configure a polling trigger in the `trigger` object of the node description, with `type: 'polling'`. n8n builds the `poll()` method from this object, so your node class doesn't need one. n8n also sets `polling: true` on the node and adds the **Poll Times** parameter. Don't add them yourself.

## Polling trigger configuration

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `'polling'` | Yes | The trigger type. |
| `routing` | `INodePropertyRouting` | Yes | The poll request, with optional `output.postReceive` actions and pagination. Expressions can use `$cursor`. |
| `cursor` | object or function | Yes | How n8n finds the new items and the next cursor. Refer to [Polling trigger cursors](#polling-trigger-cursors). |
| `manual.maxResults` | number | No | The number of items a manual run returns. Default `1`. |

Each item that `routing` returns is one candidate item. Use `postReceive` actions such as `rootProperty` to turn the response into one item for each record.

A failed request fails the poll. This is also true when the user sets **On Error** to **Continue**, because a trigger can't output an error item.

## Polling trigger cursors

n8n stores the cursor in the node's static data. Expressions in `routing` read it as `$cursor`. There are two built-in cursors, `timestamp` and `id`. For anything else, write a cursor function.

### Timestamp cursor

```ts
cursor: { type: 'timestamp', field: 'updated_at' },
```

* An item is new when its `field` value is later than the stored cursor.
* The new cursor is the latest `field` value of the poll.
* The values must be dates that JavaScript `Date` can parse, for example ISO 8601 strings. A value that `Date` can't parse fails the poll. For numeric Unix timestamps, use the `id` cursor.
* The stored cursor is `{ value: <latest-value> }`.

### ID cursor

```ts
cursor: { type: 'id', field: 'id' },
```

* An item is new when its `field` value is greater than the stored cursor.
* Two numbers compare as numbers.
* Two strings of digits compare by numeric value. This also works for IDs larger than the JavaScript safe integer range.
* IDs with leading zeros don't compare correctly, because n8n compares the length first. For example, `"007"` sorts after `"10"`. Don't use the `id` cursor for these IDs.
* Other values compare as strings.
* The stored cursor is `{ value: <highest-value> }`.

### Rules for both built-in cursors

These rules apply to both the `timestamp` and `id` cursors:

* n8n skips an item whose `field` is missing, `null`, or an empty string. n8n doesn't emit the item, and the item doesn't move the cursor.
* The comparison is "later than" or "greater than". n8n doesn't emit an item with the same value as the cursor.
* n8n emits the new items in the order the request returns them.

### Cursor function

Use a function when the built-in cursors don't fit the API. The function gets the items from `routing` and the stored cursor. It returns the items to emit and the next cursor:

```ts
cursor: async function (this: IPollFunctions, items, cursor) {
	// `cursor` is the stored cursor, or `undefined` when there's none.
	const since = Number(cursor?.page ?? 0);
	const newItems = items.filter((item) => Number(item.json.sequence) > since);
	const last = newItems.at(-1);
	return {
		items: newItems,
		// Returning `undefined` keeps the stored cursor.
		cursor: last ? { page: last.json.sequence } : undefined,
	};
},
```

If the function returns `cursor: undefined`, n8n keeps the stored cursor.

## The `$cursor` expression key

`$cursor` is the stored cursor object, or `{}` when there's no cursor. For the built-in cursors, read the value as `$cursor.value`.

`$cursor` is available in the poll request, in pagination, and in `postReceive` actions. The usual keys, such as `$parameter` and `$credentials`, are also available in `routing`.

## First poll of a polling trigger

On the first production poll, no cursor exists yet. The first poll stores a starting cursor and emits nothing:

* **`timestamp` cursor:** n8n sends no request. It stores the current time of the n8n instance as the cursor. If the clocks of n8n and the service differ, the first polls can miss items or emit items again.
* **`id` cursor and cursor functions:** n8n sends the request and stores the cursor of the result. It emits nothing. If the poll finds no cursor value, for example because the request returns no items, n8n stores an empty cursor (`{}`). The next poll then emits all the items it gets.

{% hint style="warning" %}
**Items before the first scheduled poll**

On some instances, the first scheduled poll counts as the first poll again. It stores a new starting cursor and emits nothing, so the trigger can miss items that appear between publishing the workflow and the first scheduled poll.
{% endhint %}

## Manual runs of a polling trigger

When the user selects **Fetch Test Event** or runs the workflow manually:

* n8n doesn't read or store a cursor. `$cursor` is `{}`, so `$cursor.value` is `undefined`. n8n leaves out a query parameter whose value is `undefined`.
* The `timestamp` and `id` cursors don't filter the items.
* A cursor function runs with `cursor: undefined`, so it can still shape the items. n8n doesn't store the cursor it returns.
* n8n returns the last `manual.maxResults` items (default `1`), in the order the API returns them. A value of `0` or less returns no items.

If the API returns the newest item first, sort the items with a `postReceive` action. Otherwise the manual run shows the oldest items.

## Polling trigger example

This example uses a placeholder API at `api.example.com`. The API returns `{ "data": [...] }` and accepts an `updated_since` query parameter. In a manual run, `$cursor.value` is `undefined`, so n8n sends the request without `updated_since`.

```ts
import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class ExampleTaskTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Example Task Trigger',
		name: 'exampleTaskTrigger',
		icon: 'file:example.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when a task changes',
		subtitle: '={{ "Project " + $parameter.projectId }}',
		defaults: { name: 'Example Task Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'exampleApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.example.com/v1',
			headers: { Accept: 'application/json' },
		},
		properties: [
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
			},
		],
		trigger: {
			type: 'polling',
			routing: {
				request: {
					method: 'GET',
					url: '=/projects/{{ $parameter.projectId }}/tasks',
					// `$cursor.value` is the latest `updated_at` of the last poll.
					qs: { updated_since: '={{ $cursor.value }}' },
				},
				output: {
					// Make one item from each element of `data`.
					postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
				},
			},
			// An item is new when its `updated_at` is later than the stored cursor.
			cursor: { type: 'timestamp', field: 'updated_at' },
			// A manual run returns the last five items.
			manual: { maxResults: 5 },
		},
	};
}
```

This example reads only the first page of results, so the cursor skips items on later pages. For a real API, add pagination to `routing.operations`.

## Related resources

* [Declarative triggers](./)
* [Webhook triggers](webhook-triggers.md)
* [Declarative-style parameters](../base-files/declarative-style-parameters.md)
