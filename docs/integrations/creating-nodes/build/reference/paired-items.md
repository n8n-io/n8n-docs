# Paired items

!!! note "Programmatic-style nodes only"
    This guidance applies to programmatic-style nodes. If you're using declarative style, n8n handles paired items for you automatically.

An n8n node operation consumes input items and produces output items. n8n generates an output item from a single input item, except in the Merge node, or any other node that combines or sums items.

n8n needs to know which input item a given output item comes from. If this information is missing, expressions in other nodes may break.

You must provide item pairing information when returning the output of your operations. You can do this using the `pairedItem` key. 

For example, assume there's a node that integrates with a ticket system such as JIRA or Trello, and you want to get a list of tickets by ID. Here is a simplified `execute()` function returning some output data and its paired input item key:

```js
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData;

	for (let i = 0; i < items.length; i++) {
		const ticketId = this.getNodeParameter('ticketId', i);
    responseData = await someApiRequest.call(this, 'GET', `/tickets/${ticketId}`);
		returnData.push({
				json: responseData,
				pairedItem: {
								item: i,
				},
			});
    }
  return returnData;
}
```