# Paired items

!!! note "Programmatic-style nodes only"
    This guidance applies to programmatic-style nodes. If you're using declarative style, n8n handles paired items for you automatically.

An n8n node operation consumes input items and produces output items. n8n generates an output item from a single input item, except in the Merge node, or any other node that combines or sums items.

n8n needs to know which input item a given output item comes from. If this information is missing, expressions in other nodes may break.

You must provide item pairing information when returning the output of your operations. You can do this using the `pairedItem` key. 

A simplified `execute()` function returning some input data and its paired input item key:

```js
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData;

	for (let i = 0; i < items.length; i++) {
		returnData.push(
			...responseData.map(json => {
				return {
					json,
					pairedItem: {
						item: i,
					},
				}
			})
		);
	}
}
```